import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Goal, Priority, Timeframe } from "@/types";

type CreateGoalInput = {
  userId: string;
  name: string;
  category: string;
  priority: Priority;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  checkpoints?: Goal["checkpoints"];
  timeframe?: Timeframe;
  timeframeValue?: number;
  description?: string;
  strategy?: Goal["strategy"];
  planning?: Goal["planning"];
};

const goalsCollection = collection(db, "goals");

const computeDueAtFromLegacy = (createdAtIso: string, timeframe: Timeframe, timeframeValue: number): string => {
  const d = new Date(createdAtIso);
  if (timeframe === "weeks") {
    d.setDate(d.getDate() + timeframeValue * 7);
  } else {
    d.setMonth(d.getMonth() + timeframeValue);
  }
  return d.toISOString();
};

const toDueAtFromEndDate = (endDate?: string): string | undefined => {
  if (!endDate) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) return undefined;
  return new Date(`${endDate}T23:59:59.999Z`).toISOString();
};

const omitUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      (out as Record<string, unknown>)[k] = v;
    }
  }
  return out;
};

export const subscribeGoalsByUser = (
  userId: string,
  callback: (goals: Goal[]) => void,
): (() => void) => {
  const q = query(goalsCollection, where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const goals: Goal[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Goal, "id">),
    }));
    goals.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
    callback(goals);
  });
};

export const createGoal = async (input: CreateGoalInput): Promise<string> => {
  const now = new Date().toISOString();

  const dueAt =
    toDueAtFromEndDate(input.endDate) ??
    (input.timeframe && input.timeframeValue ? computeDueAtFromLegacy(now, input.timeframe, input.timeframeValue) : undefined);

  const goalBase: Omit<Goal, "id"> = {
    userId: input.userId,
    name: input.name,
    category: input.category,
    priority: input.priority,
    startDate: input.startDate,
    endDate: input.endDate,
    dueAt,
    timeframe: input.timeframe,
    timeframeValue: input.timeframeValue,
    successMetric: { type: "yes-no" },
    status: "active",
    progress: 0,
    checkpoints: input.checkpoints,
    description: input.description,
    strategy: input.strategy,
    planning: input.planning,
    createdAt: now,
    updatedAt: now,
  };

  const created = await addDoc(goalsCollection, omitUndefined(goalBase));
  return created.id;
};

export const getGoalById = async (goalId: string): Promise<Goal | null> => {
  const ref = doc(db, "goals", goalId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Goal, "id">) };
};

export const updateGoal = async (goalId: string, patch: Partial<Goal>): Promise<void> => {
  const ref = doc(db, "goals", goalId);
  const updatedAt = new Date().toISOString();
  const { id: _id, ...rest } = patch as Goal;
  const dueAtPatch = "endDate" in rest ? { dueAt: toDueAtFromEndDate((rest as Partial<Goal>).endDate) } : {};
  await updateDoc(ref, omitUndefined({ ...rest, ...dueAtPatch, updatedAt }));
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  const ref = doc(db, "goals", goalId);
  await deleteDoc(ref);
};
