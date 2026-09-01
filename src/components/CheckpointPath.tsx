import { Check } from "lucide-react";

type Waypoint = {
  label: string;
  sublabel?: string;
  done: boolean;
};

type CheckpointPathProps = {
  waypoints: Waypoint[];
  className?: string;
};

/**
 * The product's actual mental model, drawn: a goal is a path of checkpoints you
 * walk toward completion. Used as the hero visual and as the connective device
 * for sequential content (e.g. "how it works") instead of a disconnected card grid.
 */
const CheckpointPath = ({ waypoints, className = "" }: CheckpointPathProps) => {
  const n = waypoints.length;
  const width = 1000;
  const height = 280;
  const padX = 70;
  const usable = width - padX * 2;

  const points = waypoints.map((w, i) => {
    const x = padX + (usable * i) / (n - 1);
    const t = i / (n - 1);
    // gentle ascending arc, higher toward the end (the "summit")
    const y = height - 40 - Math.pow(t, 1.15) * (height - 100);
    return { ...w, x, y };
  });

  const lastDoneIndex = points.reduce((acc, p, i) => (p.done ? i : acc), -1);

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={`Progress path: ${waypoints.filter((w) => w.done).length} of ${n} checkpoints complete`}
    >
      <path d={pathD} fill="none" stroke="hsl(var(--border))" strokeWidth={3} strokeLinecap="round" />
      {lastDoneIndex > 0 && (
        <path
          d={points
            .slice(0, lastDoneIndex + 1)
            .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
            .join(" ")}
          fill="none"
          stroke="hsl(var(--momentum))"
          strokeWidth={3}
          strokeLinecap="round"
        />
      )}

      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r={i === n - 1 ? 15 : 11}
            fill={p.done ? "hsl(var(--momentum))" : "hsl(var(--card))"}
            stroke={p.done ? "hsl(var(--momentum))" : "hsl(var(--border))"}
            strokeWidth={2.5}
          />
          {p.done && (
            <foreignObject x={p.x - 7} y={p.y - 7} width={14} height={14}>
              <Check className="w-3.5 h-3.5 text-momentum-foreground" strokeWidth={3} />
            </foreignObject>
          )}
          {i === n - 1 && !p.done && (
            <circle cx={p.x} cy={p.y} r={5} fill="hsl(var(--ember))" />
          )}
          <text
            x={p.x}
            y={p.y - 26}
            textAnchor="middle"
            className="fill-foreground font-display font-semibold"
            style={{ fontSize: 15 }}
          >
            {p.label}
          </text>
          {p.sublabel && (
            <text
              x={p.x}
              y={p.y + (i === n - 1 ? 34 : 30)}
              textAnchor="middle"
              className="fill-muted-foreground font-mono"
              style={{ fontSize: 12 }}
            >
              {p.sublabel}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

export default CheckpointPath;
