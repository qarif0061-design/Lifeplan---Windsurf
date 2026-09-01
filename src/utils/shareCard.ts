import crypto from "crypto";

const THEME = {
  primary: "#2563eb",
  secondary: "#10b981",
  dark: "#1e293b",
  white: "#ffffff",
  gray: "#64748b",
  light: "#f8fafc",
  accent: "#f59e0b",
};

export interface CardData {
  type: "streak" | "goal" | "plan" | "daily" | "monthly" | "yearly" | "achievement";
  title: string;
  subtitle?: string;
  value?: string;
  metric?: string;
  userName?: string;
  avatarUrl?: string;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawStatRow(
  ctx: CanvasRenderingContext2D,
  y: number,
  label: string,
  value: string,
  W: number,
) {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "22px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText(label, 40, y);
  ctx.fillStyle = THEME.white;
  ctx.font = "bold 22px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(value, W - 40, y);
  ctx.textAlign = "left";
}

function drawProgressBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  pct: number,
) {
  const clamped = Math.min(100, Math.max(0, pct));
  // Track
  drawRoundedRect(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fill();
  // Fill
  if (clamped > 0) {
    const fillW = Math.max(h, (clamped / 100) * w);
    drawRoundedRect(ctx, x, y, fillW, h, h / 2);
    const grad = ctx.createLinearGradient(x, y, x + fillW, y);
    grad.addColorStop(0, THEME.secondary);
    grad.addColorStop(1, "#34d399");
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

export async function generateShareCard(data: CardData): Promise<Blob> {
  const W = 800;
  const H = data.type === "achievement" ? 600 : data.type === "streak" ? 600 : 500;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background gradient — slightly different per type
  const grad = ctx.createLinearGradient(0, 0, W, H);
  if (data.type === "achievement") {
    grad.addColorStop(0, "#7c3aed");
    grad.addColorStop(1, "#4f46e5");
  } else if (data.type === "daily") {
    grad.addColorStop(0, "#0ea5e9");
    grad.addColorStop(1, "#2563eb");
  } else if (data.type === "monthly" || data.type === "yearly") {
    grad.addColorStop(0, "#f59e0b");
    grad.addColorStop(1, "#d97706");
  } else {
    grad.addColorStop(0, THEME.primary);
    grad.addColorStop(1, "#1d4ed8");
  }
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  // Decorative circles
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  ctx.arc(W - 80, -40, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-60, H - 80, 140, 0, Math.PI * 2);
  ctx.fill();

  // Logo / Brand
  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);

  // Icon based on type
  const iconMap: Record<string, string> = {
    streak: "🔥",
    goal: "🎯",
    plan: "📋",
    daily: "📅",
    monthly: "📊",
    yearly: "🏆",
    achievement: "🎉",
  };
  ctx.font = "48px sans-serif";
  ctx.fillText(iconMap[data.type] || "🚀", W - 90, 70);

  // Title
  ctx.fillStyle = THEME.white;
  ctx.font = "bold 40px 'SF Pro Display', -apple-system, sans-serif";
  const titleLines = wrapText(ctx, data.title, W - 120);
  let yPos = 150;
  for (const line of titleLines) {
    ctx.fillText(line, 40, yPos);
    yPos += 48;
  }

  // Value metric (large number)
  if (data.value) {
    ctx.fillStyle = THEME.accent;
    ctx.font = "bold 72px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(data.value, 40, yPos + 70);
    if (data.metric) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = "24px 'SF Pro Display', -apple-system, sans-serif";
      ctx.fillText(data.metric, 40, yPos + 110);
    }
  }

  // Subtitle
  if (data.subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "20px 'SF Pro Display', -apple-system, sans-serif";
    const subLines = wrapText(ctx, data.subtitle, W - 80);
    for (const line of subLines) {
      ctx.fillText(line, 40, yPos + 60);
      yPos += 28;
    }
  }

  // Type-specific content
  if (data.type === "streak") {
    const heatX = 40;
    const heatY = H - 160;
    const cellSize = 18;
    const gap = 4;
    ctx.font = "12px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    const days = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
    days.forEach((d, i) => {
      ctx.fillText(d, heatX - 5, heatY - 12 + i * (cellSize + gap));
    });
    for (let w = 0; w < 12; w++) {
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "10px 'SF Pro Display', -apple-system, sans-serif";
      ctx.fillText(`W${w + 1}`, heatX + w * (cellSize + gap) + 2, heatY - 12);
      for (let d = 0; d < 7; d++) {
        const intensity = Math.random() < 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
        drawRoundedRect(ctx, heatX + w * (cellSize + gap), heatY + d * (cellSize + gap), cellSize, cellSize, 2);
        const colors = ["#e2e8f0", "#bbf7d0", "#86efac", "#22c55e", "#16a34a"];
        ctx.fillStyle = colors[Math.min(Math.floor(intensity), 4)];
        ctx.fill();
      }
    }
  }

  // User name at bottom
  if (data.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${data.userName}`, 40, H - 40);
  }

  // Brand URL
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);
  ctx.textAlign = "left";

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, "image/png");
  });
}

/**
 * Generate a daily plan share card with structured stat rows.
 */
export async function generateDailyShareCard(opts: {
  date: string;
  prioritiesCompleted: number;
  prioritiesTotal: number;
  completionPercent: number;
  userName?: string;
}): Promise<Blob> {
  const W = 800;
  const H = 500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#0ea5e9");
  grad.addColorStop(1, "#2563eb");
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath(); ctx.arc(W - 80, -40, 180, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(-60, H - 80, 140, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);
  ctx.font = "48px sans-serif";
  ctx.fillText("📅", W - 90, 70);

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 40px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("MY DAY", 40, 140);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "22px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText(opts.date, 40, 180);

  drawStatRow(ctx, 240, "Priorities", `${opts.prioritiesTotal}`, W);
  drawStatRow(ctx, 280, "Completed", `${opts.prioritiesCompleted}`, W);
  drawStatRow(ctx, 320, "Completion", `${opts.completionPercent}%`, W);

  drawProgressBar(ctx, 40, 370, W - 80, 16, opts.completionPercent);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "16px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${opts.completionPercent}%`, W - 40, 365);
  ctx.textAlign = "left";

  if (opts.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${opts.userName}`, 40, H - 40);
  }
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);

  return new Promise((resolve) => { canvas.toBlob((b) => resolve(b!), "image/png"); });
}

/**
 * Generate a goal progress share card.
 */
export async function generateGoalShareCard(opts: {
  goalName: string;
  progress: number;
  completedActions: number;
  remainingActions: number;
  totalActions: number;
  userName?: string;
}): Promise<Blob> {
  const W = 800;
  const H = 500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, THEME.primary);
  grad.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath(); ctx.arc(W - 80, -40, 180, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);
  ctx.font = "48px sans-serif";
  ctx.fillText("🎯", W - 90, 70);

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 40px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("GOAL", 40, 130);

  ctx.fillStyle = THEME.accent;
  ctx.font = "bold 36px 'SF Pro Display', -apple-system, sans-serif";
  const nameLines = wrapText(ctx, opts.goalName, W - 120);
  let yPos = 185;
  for (const line of nameLines) {
    ctx.fillText(line, 40, yPos);
    yPos += 44;
  }

  drawProgressBar(ctx, 40, yPos + 20, W - 80, 18, opts.progress);
  ctx.fillStyle = THEME.white;
  ctx.font = "bold 20px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${opts.progress}%`, W - 40, yPos + 17);
  ctx.textAlign = "left";

  drawStatRow(ctx, yPos + 70, "Completed", `${opts.completedActions} / ${opts.totalActions}`, W);
  drawStatRow(ctx, yPos + 110, "Remaining", `${opts.remainingActions}`, W);

  if (opts.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${opts.userName}`, 40, H - 40);
  }
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);

  return new Promise((resolve) => { canvas.toBlob((b) => resolve(b!), "image/png"); });
}

/**
 * Generate a weekly progress share card.
 */
export async function generateWeeklyShareCard(opts: {
  tasksCompleted: number;
  tasksTotal: number;
  goalsProgressed: number;
  streak: number;
  topAchievement?: string;
  userName?: string;
}): Promise<Blob> {
  const W = 800;
  const H = 500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, THEME.primary);
  grad.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath(); ctx.arc(W - 80, -40, 180, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);
  ctx.font = "48px sans-serif";
  ctx.fillText("📋", W - 90, 70);

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 40px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("MY WEEK", 40, 140);

  const pct = opts.tasksTotal > 0 ? Math.round((opts.tasksCompleted / opts.tasksTotal) * 100) : 0;
  ctx.fillStyle = THEME.accent;
  ctx.font = "bold 72px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText(`${pct}%`, 40, 240);
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "22px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("Completed", 40, 270);

  drawStatRow(ctx, 330, "Tasks completed", `${opts.tasksCompleted} / ${opts.tasksTotal}`, W);
  drawStatRow(ctx, 370, "Goals progressed", `${opts.goalsProgressed}`, W);
  drawStatRow(ctx, 410, "Streak", `${opts.streak} days`, W);

  if (opts.topAchievement) {
    drawStatRow(ctx, 450, "Top achievement", opts.topAchievement, W);
  }

  if (opts.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${opts.userName}`, 40, H - 40);
  }
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);

  return new Promise((resolve) => { canvas.toBlob((b) => resolve(b!), "image/png"); });
}

/**
 * Generate a monthly achievement share card.
 */
export async function generateMonthlyShareCard(opts: {
  monthLabel: string;
  goalsCreated: number;
  goalsCompleted: number;
  productiveDays: number;
  avgExecution: number;
  userName?: string;
}): Promise<Blob> {
  const W = 800;
  const H = 500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#f59e0b");
  grad.addColorStop(1, "#d97706");
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath(); ctx.arc(W - 80, -40, 180, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);
  ctx.font = "48px sans-serif";
  ctx.fillText("📊", W - 90, 70);

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 40px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("MY MONTH", 40, 140);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "22px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText(opts.monthLabel, 40, 180);

  drawStatRow(ctx, 240, "Goals created", `${opts.goalsCreated}`, W);
  drawStatRow(ctx, 280, "Goals completed", `${opts.goalsCompleted}`, W);
  drawStatRow(ctx, 320, "Productive days", `${opts.productiveDays}`, W);

  drawProgressBar(ctx, 40, 380, W - 80, 16, opts.avgExecution);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "16px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${opts.avgExecution}% avg execution`, W - 40, 375);
  ctx.textAlign = "left";

  if (opts.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${opts.userName}`, 40, H - 40);
  }
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);

  return new Promise((resolve) => { canvas.toBlob((b) => resolve(b!), "image/png"); });
}

/**
 * Generate an achievement share card.
 */
export async function generateAchievementShareCard(opts: {
  achievementTitle: string;
  achievementIcon: string;
  achievementDescription: string;
  userName?: string;
}): Promise<Blob> {
  const W = 800;
  const H = 500;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#7c3aed");
  grad.addColorStop(1, "#4f46e5");
  ctx.fillStyle = grad;
  drawRoundedRect(ctx, 0, 0, W, H, 24);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath(); ctx.arc(W - 80, -40, 180, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 28px 'SF Pro Display', -apple-system, sans-serif";
  ctx.fillText("LifePlans", 40, 60);

  // Large emoji
  ctx.font = "80px sans-serif";
  ctx.fillText(opts.achievementIcon, W / 2 - 40, 200);

  ctx.fillStyle = THEME.white;
  ctx.font = "bold 36px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(opts.achievementTitle, W / 2, 280);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "20px 'SF Pro Display', -apple-system, sans-serif";
  const descLines = wrapText(ctx, opts.achievementDescription, W - 120);
  let yPos = 330;
  for (const line of descLines) {
    ctx.fillText(line, W / 2, yPos);
    yPos += 28;
  }
  ctx.textAlign = "left";

  if (opts.userName) {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "18px 'SF Pro Display', -apple-system, sans-serif";
    ctx.fillText(`— ${opts.userName}`, 40, H - 40);
  }
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "14px 'SF Pro Display', -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("goalplanner.io", W - 40, H - 40);

  return new Promise((resolve) => { canvas.toBlob((b) => resolve(b!), "image/png"); });
}

export async function shareImage(blob: Blob, filename: string) {
  const file = new File([blob], filename, { type: "image/png" });

  if (navigator.share && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: filename,
      });
      return;
    } catch {}
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
