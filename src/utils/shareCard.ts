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
  type: "streak" | "goal" | "plan";
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

function drawHeatmapCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  intensity: number // 0-4
) {
  const colors = ["#e2e8f0", "#bbf7d0", "#86efac", "#22c55e", "#16a34a"];
  const color = colors[Math.min(Math.floor(intensity), 4)];
  drawRoundedRect(ctx, x, y, size, size, 2);
  ctx.fillStyle = color;
  ctx.fill();
}

export async function generateShareCard(data: CardData): Promise<Blob> {
  const W = 800;
  const H = data.type === "streak" ? 600 : 500;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, THEME.primary);
  grad.addColorStop(1, "#1d4ed8");
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
  ctx.fillText("GoalPlanner", 40, 60);

  // Icon based on type
  const iconMap: Record<string, string> = {
    streak: "🔥",
    goal: "🎯",
    plan: "📋",
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

  // Value metric
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

  // Streak heatmap
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
        drawHeatmapCell(
          ctx,
          heatX + w * (cellSize + gap),
          heatY + d * (cellSize + gap),
          cellSize,
          intensity
        );
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
