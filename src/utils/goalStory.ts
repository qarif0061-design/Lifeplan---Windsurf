// LIFEPLANS — Goal Progress Story Builder (Website)
// Mirrors mobile utils/goalStory.ts. Derives the narrative payload for a Goal
// Progress Story from real goal data: starting point, milestones (checkpoints),
// completed actions, achievement, and final result. Tracks actual completion
// events — it never invents progress.

export interface StorySourceGoal {
  name: string;
  description?: string;
  progress: number;
  startDate?: string; // ISO or YYYY-MM-DD
  endDate?: string; // ISO or YYYY-MM-DD
  whyMatters?: string;
  completedActions?: { title: string; completed: boolean }[];
  milestones?: { label: string; completed: boolean }[];
}

export interface GoalStoryParts {
  chapter: string;
  startTitle?: string;
  milestones: { label: string; completed: boolean }[];
  actions: string[];
  achievement: string;
  result: string;
  startedAt?: string;
  completedAt?: string;
}

const toDisplayDate = (d: string | undefined): string | undefined => {
  if (!d) return undefined;
  const parsed = new Date(d.includes("T") ? d : `${d}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return d;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const chapterFor = (pct: number): string => {
  if (pct >= 100) return "GOAL COMPLETE";
  if (pct >= 75) return "FINAL STRETCH";
  if (pct >= 50) return "BUILDING MOMENTUM";
  if (pct >= 25) return "MAKING PROGRESS";
  return "THE BEGINNING";
};

const clamp = (n: number): number => Math.max(0, Math.min(100, Math.round(n)));

/**
 * Build the story parts from a goal. `progress` must come from actual
 * checkpoint/task completion counts — never fabricated.
 */
export const buildGoalStory = (
  goal: StorySourceGoal,
  opts: { startedAt?: string; completedAt?: string } = {},
): GoalStoryParts => {
  const pct = clamp(goal.progress);
  const milestones = goal.milestones ?? [];
  const actions = (goal.completedActions ?? [])
    .filter((a) => a.completed && a.title)
    .map((a) => a.title as string);
  const done = milestones.filter((m) => m.completed).length;
  const total = milestones.length;

  const actionSummary =
    actions.length > 0
      ? actions.length === 1
        ? `${actions.length} action completed`
        : `${actions.length} actions completed`
      : total > 0
        ? `${done} of ${total} milestones reached`
        : "";

  const achievement =
    pct >= 100
      ? "Goal Completed"
      : total > 0 && done === total
        ? "All Milestones Reached"
        : done > 0
          ? `${done} Milestone${done === 1 ? "" : "s"} Reached`
          : actionSummary || "On the Way";

  const countLine =
    total > 0
      ? `${done}/${total} milestones checked off`
      : actions.length > 0
        ? `${actions.length} real actions completed`
        : "";

  const result =
    pct >= 100
      ? (goal.whyMatters?.trim() ??
        goal.description?.trim() ??
        "From day one to the finish line — built for good.")
      : (goal.description?.trim() ??
        goal.whyMatters?.trim() ??
        "Small consistent steps, real measurable progress.");

  const startTitle = goal.whyMatters?.trim() || goal.description?.trim() || "A new goal, set in motion";

  const startedAt = toDisplayDate(opts.startedAt) ?? toDisplayDate(goal.startDate);
  const completedAt = toDisplayDate(opts.completedAt) ?? toDisplayDate(goal.endDate);

  return {
    chapter: chapterFor(pct),
    startTitle,
    milestones: milestones.slice(0, 8),
    actions: actions.slice(0, 6),
    achievement: countLine ? `${achievement} • ${countLine}` : achievement,
    result,
    startedAt,
    completedAt,
  };
};