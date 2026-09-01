import { createGoal } from "@/firebase/goals";
import { trackGoalCreated } from "@/utils/analytics";
import { WIZARD_DRAFT_KEY, type WizardDraft } from "@/components/GoalWizard";
import type { GoalCheckpoint, Priority } from "@/types";

/** If the visitor arrived here from the homepage goal wizard, create the goal they
 * drafted now that they have an account, then send them straight to it instead of
 * the empty dashboard. Consumes (and clears) the sessionStorage draft either way. */
export const consumeWizardDraft = async (userId: string, navigate: (path: string) => void): Promise<boolean> => {
  const raw = sessionStorage.getItem(WIZARD_DRAFT_KEY);
  if (!raw) return false;
  sessionStorage.removeItem(WIZARD_DRAFT_KEY);
  try {
    const draft = JSON.parse(raw) as WizardDraft;
    if (!draft.name) return false;
    const now = new Date().toISOString();
    const checkpoints: GoalCheckpoint[] = draft.checkpointTitles.map((title) => ({
      id: crypto.randomUUID(),
      title,
      kind: "boolean",
      completed: false,
      createdAt: now,
      updatedAt: now,
    }));
    const goalId = await createGoal({
      userId,
      name: draft.name,
      category: draft.category,
      priority: "medium" as Priority,
      timeframe: draft.timeframe,
      timeframeValue: draft.timeframeValue,
      checkpoints,
    });
    trackGoalCreated(userId);
    navigate(`/goals/${goalId}`);
    return true;
  } catch {
    return false;
  }
};
