// LIFEPLANS — Canonical Adaptive Execution Calculation
// Both mobile and website MUST use this function. Do not duplicate this logic elsewhere.
//
// Compares what was planned for a week against what was actually completed, and
// turns that into the insight messaging shown after a week ends: execution %, how
// many actions need to move forward, and — only when the data actually supports it —
// an honest read on whether the goal's deadline is still realistic at the user's
// actual pace. Never fabricates progress and never promises a deadline the numbers
// don't support.

export interface TaskLike {
  completed: boolean;
  isDistraction?: boolean;
}

export interface WeeklyExecutionSummary {
  planned: number;
  completed: number;
  executionPct: number;
  carriedOverCount: number;
}

export const computeWeeklyExecution = (tasks: TaskLike[] | undefined): WeeklyExecutionSummary => {
  const relevant = (tasks ?? []).filter((t) => !t.isDistraction);
  const planned = relevant.length;
  const completed = relevant.filter((t) => t.completed).length;
  const executionPct = planned > 0 ? Math.round((completed / planned) * 100) : 0;
  return { planned, completed, executionPct, carriedOverCount: Math.max(0, planned - completed) };
};

/** The exact insight lines shown to the user after a week ends, e.g. "Planned 8 actions". */
export const buildExecutionInsights = (summary: WeeklyExecutionSummary): string[] => {
  const lines: string[] = [
    `Planned ${summary.planned} action${summary.planned === 1 ? '' : 's'}`,
    `Completed ${summary.completed}`,
    `${summary.executionPct}% execution`,
  ];
  if (summary.carriedOverCount > 0) {
    lines.push(`${summary.carriedOverCount} action${summary.carriedOverCount === 1 ? '' : 's'} moved to next week`);
  }
  return lines;
};

// ─── PACE PROJECTION ────────────────────────────────────────────
// Deliberately conservative: says "not enough data" rather than guessing, and never
// silently rewrites the goal's actual deadline — that decision stays with the user.

export interface CheckpointLike {
  completed: boolean;
}

export type PaceStatus = 'no-deadline' | 'insufficient-data' | 'on-track' | 'at-risk';

export interface PaceProjection {
  status: PaceStatus;
  message: string;
  weeksElapsed?: number;
  weeksRemaining?: number;
  paceCheckpointsPerWeek?: number;
  weeksNeededAtPace?: number;
}

export const projectGoalPace = (
  checkpoints: CheckpointLike[] | undefined,
  createdAt: string | number | Date,
  dueAt: string | number | Date | undefined | null,
): PaceProjection => {
  if (!dueAt) {
    return { status: 'no-deadline', message: 'No deadline set for this goal — pace can\'t be measured against a target.' };
  }

  const created = new Date(createdAt).getTime();
  const due = new Date(dueAt).getTime();
  const now = Date.now();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;

  if (!Number.isFinite(created) || !Number.isFinite(due)) {
    return { status: 'insufficient-data', message: 'Not enough history yet to project your pace.' };
  }

  const weeksElapsed = Math.max(0.1, (now - created) / msPerWeek);
  const weeksRemaining = Math.max(0, (due - now) / msPerWeek);

  const list = checkpoints ?? [];
  const completedCount = list.filter((c) => c.completed).length;
  const remaining = list.length - completedCount;

  if (remaining <= 0) {
    return { status: 'on-track', message: 'All checkpoints complete.', weeksElapsed, weeksRemaining, weeksNeededAtPace: 0 };
  }

  if (completedCount < 2 || weeksElapsed < 1) {
    return {
      status: 'insufficient-data',
      message: 'Not enough history yet to project your pace — keep completing checkpoints and check back next week.',
      weeksElapsed,
      weeksRemaining,
    };
  }

  const paceCheckpointsPerWeek = completedCount / weeksElapsed;
  const weeksNeededAtPace = paceCheckpointsPerWeek > 0 ? remaining / paceCheckpointsPerWeek : Infinity;

  if (weeksNeededAtPace <= weeksRemaining) {
    return {
      status: 'on-track',
      message: 'At your current pace, you\'re on track to hit your deadline.',
      weeksElapsed,
      weeksRemaining,
      paceCheckpointsPerWeek,
      weeksNeededAtPace,
    };
  }

  const weeksOver = Math.max(1, Math.ceil(weeksNeededAtPace - weeksRemaining));
  return {
    status: 'at-risk',
    message: `At your current pace (${paceCheckpointsPerWeek.toFixed(1)} checkpoints/week), you're projected to finish about ${weeksOver} week${weeksOver === 1 ? '' : 's'} past your deadline. Consider increasing weekly capacity or adjusting the deadline.`,
    weeksElapsed,
    weeksRemaining,
    paceCheckpointsPerWeek,
    weeksNeededAtPace,
  };
};

// ─── CARRY-OVER ─────────────────────────────────────────────────
// The actual "recalibration": incomplete, non-distraction tasks from an ending week
// move into the next week's plan so nothing silently falls through. This only moves
// what the user already committed to — it never invents new tasks.

export const buildCarriedOverTasks = <T extends TaskLike & { title: string }>(
  previousWeekTasks: T[] | undefined,
): Array<Omit<T, 'completed'> & { completed: false; carriedOver: true }> => {
  return (previousWeekTasks ?? [])
    .filter((t) => !t.completed && !t.isDistraction)
    .map((t) => ({ ...t, completed: false as const, carriedOver: true as const }));
};
