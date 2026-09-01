// LIFEPLANS — Canonical Progress Calculation
// This is the SINGLE source of truth for all progress calculations.
// Both mobile and website MUST use this function.
// Do NOT duplicate progress logic elsewhere.

import type { GoalCheckpoint } from "@/types";

/**
 * Calculate goal progress from checkpoints.
 * This is the canonical implementation. Both mobile and website must produce
 * the same result for the same input data.
 *
 * Rules:
 * - If no checkpoints exist, return the stored `progress` value (fallback).
 * - For each checkpoint:
 *   - If kind === 'number' (or mode === 'number'): progress = min(1, current / target)
 *   - If kind === 'boolean' (or mode === 'simple'): progress = completed ? 1 : 0
 * - Final progress = (sum of individual progress / total checkpoints) * 100, rounded.
 * - Progress is clamped to [0, 100].
 */
export const calculateProgress = (
  checkpoints: GoalCheckpoint[] | undefined,
  fallbackProgress: number = 0,
): number => {
  const cps = checkpoints ?? [];
  if (cps.length === 0) return Math.min(100, Math.max(0, fallbackProgress));

  const total = cps.length;
  const sum = cps.reduce((acc, c) => {
    const isNumber =
      c.kind === "number" || (c as any).mode === "number";
    if (isNumber) {
      const target = typeof c.target === "number" && c.target > 0 ? c.target : 0;
      const current = typeof c.current === "number" && c.current >= 0 ? c.current : 0;
      return acc + (target > 0 ? Math.min(1, Math.max(0, current / target)) : 0);
    }
    return acc + (c.completed ? 1 : 0);
  }, 0);

  const progress = Math.round((sum / total) * 100);
  return Math.min(100, Math.max(0, progress));
};

/**
 * Derive goal status from progress percentage.
 * Both platforms must use this to determine status consistently.
 */
export const deriveGoalStatus = (
  progress: number,
): 'active' | 'completed' | 'not-started' => {
  if (progress >= 100) return 'completed';
  if (progress > 0) return 'active';
  return 'not-started';
};

/**
 * Calculate checkpoint-based progress and derive status in one call.
 * Use this when updating checkpoints to get both values atomically.
 */
export const calculateProgressAndStatus = (
  checkpoints: GoalCheckpoint[],
): { progress: number; status: 'active' | 'completed' | 'not-started' } => {
  const progress = calculateProgress(checkpoints, 0);
  const status = deriveGoalStatus(progress);
  return { progress, status };
};
