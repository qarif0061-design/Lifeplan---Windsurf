import type { IncomingMessage, ServerResponse } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import admin from "firebase-admin";

type HeadersLike = Record<string, string | string[] | undefined>;

type VercelReq = IncomingMessage & {
  method?: string;
  headers: HeadersLike;
};

type VercelRes = ServerResponse & {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (data?: string) => void;
};

const isRecord = (v: unknown): v is Record<string, unknown> => {
  return typeof v === "object" && v !== null;
};

const getRawBody = async (req: IncomingMessage): Promise<string> => {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", (err) => reject(err));
  });
};

const ensureAdmin = () => {
  if (admin.apps.length) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase admin credentials env vars.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
};

const hexToBuffer = (hex: string): Buffer => {
  const normalized = hex.trim().toLowerCase();
  return Buffer.from(normalized, "hex");
};

const safeEqualHex = (aHex: string, bHex: string): boolean => {
  const a = hexToBuffer(aHex);
  const b = hexToBuffer(bHex);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
};

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const signingSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!signingSecret) throw new Error("Missing LEMONSQUEEZY_WEBHOOK_SECRET env var.");

    const signature = String(req.headers["x-signature"] ?? "");
    if (!signature) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing signature" }));
      return;
    }

    const raw = await getRawBody(req);
    const digest = createHmac("sha256", signingSecret).update(raw, "utf8").digest("hex");

    if (!safeEqualHex(digest, signature)) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid signature" }));
      return;
    }

    const parsed: unknown = JSON.parse(raw || "{}");
    const payload = isRecord(parsed) ? parsed : {};
    const meta = isRecord(payload.meta) ? payload.meta : {};
    const customData = isRecord(meta.custom_data) ? meta.custom_data : {};
    const data = isRecord(payload.data) ? payload.data : {};
    const attributes = isRecord(data.attributes) ? data.attributes : {};

    const eventName = String(meta.event_name ?? req.headers["x-event-name"] ?? "");
    const userId = String(customData.user_id ?? "");

    if (!userId) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing meta.custom_data.user_id" }));
      return;
    }

    const status = String(attributes.status ?? "");
    const isActive = status === "active";
    const isOnTrial = status === "on_trial";
    const isCancelledLike = status === "cancelled" || status === "expired";

    // Lifetime is a one-time LemonSqueezy order, not a subscription — it fires
    // order_created/order_refunded, never subscription_*. Once the Lifetime variant
    // exists in LemonSqueezy, set LEMONSQUEEZY_LIFETIME_VARIANT_ID so only that
    // specific product grants a permanent entitlement here; until it's configured,
    // any successfully paid one-time order is treated as Lifetime (this webhook has
    // no other one-time product to confuse it with today).
    const lifetimeVariantId = process.env.LEMONSQUEEZY_LIFETIME_VARIANT_ID;
    const variantId = String(
      (isRecord(attributes.first_order_item) ? attributes.first_order_item.variant_id : attributes.variant_id) ?? ""
    );
    const matchesLifetimeVariant = !lifetimeVariantId || variantId === lifetimeVariantId;

    let nextIsPremium: boolean | null = null;
    let isLifetime = false;

    if (eventName.startsWith("subscription_")) {
      if (isActive || isOnTrial) nextIsPremium = true;
      else if (isCancelledLike) nextIsPremium = false;
    } else if (eventName === "order_created" && matchesLifetimeVariant) {
      const orderStatus = String(attributes.status ?? "");
      if (orderStatus === "paid") {
        nextIsPremium = true;
        isLifetime = true;
      }
    } else if (eventName === "order_refunded" && matchesLifetimeVariant) {
      nextIsPremium = false;
    }

    if (nextIsPremium === null) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true, ignored: true, eventName }));
      return;
    }

    const trialEndsAt = isRecord(attributes.trial_ends_at)
      ? null
      : (attributes.trial_ends_at as string | null);
    const endsAt = isRecord(attributes.ends_at)
      ? null
      : (attributes.ends_at as string | null);
    // Lifetime never expires — deliberately omit premiumExpiresAt (never set it, never clear
    // an existing one) so it reads as "no expiry" the same way a RevenueCat lifetime purchase does.
    const premiumExpiresAt = isLifetime ? null : trialEndsAt || endsAt || null;

    ensureAdmin();
    const db = admin.firestore();

    const updateData: Record<string, unknown> = {
      isPremium: nextIsPremium,
    };
    if (isLifetime) {
      updateData.premiumSource = "lemonsqueezy-lifetime";
    } else if (premiumExpiresAt) {
      updateData.premiumExpiresAt = premiumExpiresAt;
    }
    if (!nextIsPremium) {
      updateData.premiumExpiresAt = null;
    }

    await db.collection("users").doc(userId).set(updateData, { merge: true });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, userId, isPremium: nextIsPremium, eventName, status }));
  } catch (e: unknown) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    const message = e instanceof Error ? e.message : "Webhook error";
    res.end(JSON.stringify({ error: message }));
  }
}
