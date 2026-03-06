import type { IncomingMessage, ServerResponse } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import admin from "firebase-admin";

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

export default async function handler(req: IncomingMessage & { method?: string; headers: Record<string, any> }, res: ServerResponse & any) {
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

    const payload = JSON.parse(raw || "{}") as any;
    const eventName = String(payload?.meta?.event_name ?? req.headers["x-event-name"] ?? "");
    const userId = String(payload?.meta?.custom_data?.user_id ?? "");

    if (!userId) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing meta.custom_data.user_id" }));
      return;
    }

    const status = String(payload?.data?.attributes?.status ?? "");
    const isActive = status === "active";
    const isCancelledLike = status === "cancelled" || status === "expired";

    let nextIsPremium: boolean | null = null;

    if (eventName.startsWith("subscription_")) {
      if (isActive) nextIsPremium = true;
      else if (isCancelledLike) nextIsPremium = false;
    }

    if (nextIsPremium === null) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true, ignored: true, eventName }));
      return;
    }

    ensureAdmin();
    const db = admin.firestore();

    await db.collection("users").doc(userId).set(
      {
        isPremium: nextIsPremium,
      },
      { merge: true },
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, userId, isPremium: nextIsPremium, eventName, status }));
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: e?.message ?? "Webhook error" }));
  }
}
