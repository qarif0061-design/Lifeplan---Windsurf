// LIFEPLANS — Server-rendered Open Graph image for /progress/:publicId share pages.
// Reads the `shares` Firestore doc via firebase-admin and renders a PNG that mirrors
// the visual design in src/utils/shareCard.ts (gradient + progress bar + branding per
// share type), using @vercel/og (satori) so social crawlers get a real preview image
// instead of the static app icon fallback.

import type { IncomingMessage, ServerResponse } from "node:http";
import admin from "firebase-admin";
import { unstable_createNodejsStream } from "@vercel/og";

type HeadersLike = Record<string, string | string[] | undefined>;

type VercelReq = IncomingMessage & {
  method?: string;
  headers: HeadersLike;
  url?: string;
};

type VercelRes = ServerResponse & {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (data?: string) => void;
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

// ─── VISUAL THEME (mirrors src/utils/shareCard.ts) ─────────────────────────

const WIDTH = 1200;
const HEIGHT = 630;

const TYPE_THEME: Record<string, { from: string; to: string; label: string }> = {
  goal: { from: "#2563eb", to: "#1d4ed8", label: "GOAL PROGRESS" },
  daily: { from: "#0ea5e9", to: "#2563eb", label: "DAILY CHECK-IN" },
  weekly: { from: "#2563eb", to: "#1d4ed8", label: "WEEKLY REVIEW" },
  month: { from: "#f59e0b", to: "#d97706", label: "MONTHLY REVIEW" },
  year: { from: "#f59e0b", to: "#d97706", label: "YEARLY REVIEW" },
  achievement: { from: "#7c3aed", to: "#4f46e5", label: "ACHIEVEMENT" },
};

const DEFAULT_THEME = TYPE_THEME.goal;

type ShareData = Record<string, unknown>;

const num = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;
const str = (v: unknown): string | undefined => (typeof v === "string" && v ? v : undefined);

const getProgress = (type: string, data: ShareData): number | null => {
  if (type === "goal") return num(data.goalProgress) ?? null;
  if (type === "daily") return num(data.completionPercent) ?? null;
  if (type === "weekly") {
    const total = num(data.tasksTotal);
    const completed = num(data.tasksCompleted);
    if (total && total > 0 && completed !== undefined) return Math.round((completed / total) * 100);
    return null;
  }
  if (type === "month" || type === "year") return num(data.avgExecution) ?? null;
  return null;
};

const buildMetrics = (type: string, data: ShareData): { label: string; value: string }[] => {
  const metrics: { label: string; value: string }[] = [];
  const add = (label: string, value?: number | string) => {
    if (value === undefined || value === null || value === "" || metrics.length >= 3) return;
    metrics.push({ label, value: String(value) });
  };

  if (type === "goal") {
    add("Completed", num(data.completedActions));
    add("Remaining", num(data.remainingActions));
    add("Total", num(data.totalActions));
  } else if (type === "daily") {
    add("Done", num(data.prioritiesCompleted));
    add("Total", num(data.prioritiesTotal));
  } else if (type === "weekly") {
    add("Tasks", data.tasksTotal !== undefined ? `${num(data.tasksCompleted) ?? 0}/${num(data.tasksTotal) ?? 0}` : undefined);
    add("Streak", num(data.streak));
    add("Goals", num(data.goalsProgressed));
  } else if (type === "month" || type === "year") {
    add("Created", num(data.goalsCreated));
    add("Completed", num(data.goalsCompleted));
    add("Active days", num(data.productiveDays));
  }

  return metrics;
};

// ─── SATORI ELEMENT TREE (no JSX / no react import required) ──────────────

type Node = { type: string; props: Record<string, unknown> };

const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const buildCard = (opts: {
  type: string;
  title: string;
  subtitle?: string;
  data: ShareData;
}): Node => {
  const theme = TYPE_THEME[opts.type] ?? DEFAULT_THEME;
  const progress = getProgress(opts.type, opts.data);
  const metrics = buildMetrics(opts.type, opts.data);

  const children: unknown[] = [
    // Top row: brand + type pill
    el(
      "div",
      { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" },
      [
        el("div", { display: "flex", flexDirection: "row", alignItems: "center" }, [
          el(
            "div",
            {
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: "rgba(255,255,255,0.18)",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
              fontSize: 24,
              fontWeight: 700,
              color: "#ffffff",
            },
            "L"
          ),
          el("div", { display: "flex", fontSize: 32, fontWeight: 700, color: "#ffffff" }, "Lifeplans"),
        ]),
        el(
          "div",
          {
            display: "flex",
            backgroundColor: "rgba(255,255,255,0.16)",
            color: "#ffffff",
            fontSize: 20,
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: 999,
            letterSpacing: 1,
          },
          theme.label
        ),
      ]
    ),
    // Middle: title + subtitle
    el("div", { display: "flex", flexDirection: "column", maxWidth: 1000 }, [
      el(
        "div",
        {
          display: "flex",
          fontSize: 64,
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
        },
        opts.title
      ),
      ...(opts.subtitle
        ? [
            el(
              "div",
              { display: "flex", fontSize: 28, color: "rgba(255,255,255,0.78)", marginTop: 16 },
              opts.subtitle
            ),
          ]
        : []),
    ]),
    // Bottom block: progress bar + metrics
    el("div", { display: "flex", flexDirection: "column", width: "100%" }, [
      ...(progress !== null
        ? [
            el(
              "div",
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 12,
              },
              [
                el("div", { display: "flex", fontSize: 22, color: "rgba(255,255,255,0.75)" }, "Progress"),
                el(
                  "div",
                  { display: "flex", fontSize: 22, fontWeight: 700, color: "#ffffff" },
                  `${Math.min(100, Math.max(0, progress))}%`
                ),
              ]
            ),
            el(
              "div",
              {
                display: "flex",
                width: "100%",
                height: 20,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginBottom: metrics.length > 0 ? 28 : 0,
              },
              [
                el("div", {
                  display: "flex",
                  width: `${Math.min(100, Math.max(0, progress))}%`,
                  height: 20,
                  borderRadius: 999,
                  backgroundImage: "linear-gradient(90deg, #10b981, #34d399)",
                }),
              ]
            ),
          ]
        : []),
      ...(metrics.length > 0
        ? [
            el(
              "div",
              { display: "flex", flexDirection: "row", width: "100%" },
              metrics.map((m, i) =>
                el(
                  "div",
                  {
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    borderRadius: 20,
                    padding: "18px 28px",
                    marginRight: i < metrics.length - 1 ? 20 : 0,
                    minWidth: 160,
                  },
                  [
                    el("div", { display: "flex", fontSize: 36, fontWeight: 800, color: "#ffffff" }, m.value),
                    el(
                      "div",
                      { display: "flex", fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 4 },
                      m.label
                    ),
                  ]
                )
              )
            ),
          ]
        : []),
    ]),
    // Footer
    el(
      "div",
      {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      [
        el("div", { display: "flex", fontSize: 18, color: "rgba(255,255,255,0.55)" }, "Free goal planner · Web + mobile"),
        el("div", { display: "flex", fontSize: 18, color: "rgba(255,255,255,0.55)" }, "goalplanner.io"),
      ]
    ),
  ];

  return el(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: WIDTH,
      height: HEIGHT,
      padding: 64,
      backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
      fontFamily: "sans-serif",
      position: "relative",
    },
    children
  );
};

const buildFallbackCard = (): Node =>
  buildCard({
    type: "goal",
    title: "Track your goals with Lifeplans",
    subtitle: "Plan, share, and follow through — free to start.",
    data: {},
  });

// ─── HANDLER ────────────────────────────────────────────────────────────────

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    const publicId = url.searchParams.get("publicId");

    let card: Node;

    if (!publicId) {
      card = buildFallbackCard();
    } else {
      ensureAdmin();
      const db = admin.firestore();
      const snap = await db
        .collection("shares")
        .where("publicId", "==", publicId)
        .where("active", "==", true)
        .limit(1)
        .get();

      if (snap.empty) {
        card = buildFallbackCard();
      } else {
        const share = snap.docs[0].data() as Record<string, unknown>;
        const type = str(share.type) ?? "goal";
        const title = str(share.title) ?? "Shared Progress";
        const subtitle = str(share.subtitle);
        const data = (share.data as ShareData) ?? {};
        card = buildCard({ type, title, subtitle, data });
      }
    }

    const stream = await unstable_createNodejsStream(card as never, {
      width: WIDTH,
      height: HEIGHT,
    });

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400");
    stream.pipe(res);
  } catch (e: unknown) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    const message = e instanceof Error ? e.message : "OG image error";
    res.end(JSON.stringify({ error: message }));
  }
}
