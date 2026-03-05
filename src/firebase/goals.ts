import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
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
  timeframe: Timeframe;
  timeframeValue: number;
  description?: string;
};

const goalsCollection = collection(db, "goals");

const computeDueAt = (createdAtIso: string, timeframe: Timeframe, timeframeValue: number): string => {
  const d = new Date(createdAtIso);
  if (timeframe === "weeks") {
    d.setDate(d.getDate() + timeframeValue * 7);
  } else {
    d.setMonth(d.getMonth() + timeframeValue);
  }
  return d.toISOString();
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
  const q = query(goalsCollection, where("userId", "==", userId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const goals: Goal[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Goal, "id">),
    }));
    callback(goals);
  });
};

export const createGoal = async (input: CreateGoalInput): Promise<string> => {
  const now = new Date().toISOString();
  const dueAt = computeDueAt(now, input.timeframe, input.timeframeValue);
  const goalBase: Omit<Goal, "id"> = {
    userId: input.userId,
    name: input.name,
    category: input.category,
    priority: input.priority,
    timeframe: input.timeframe,
    timeframeValue: input.timeframeValue,
    dueAt,
    successMetric: { type: "yes-no" },
    status: "active",
    progress: 0,
    description: input.description,
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
  await updateDoc(ref, omitUndefined({ ...rest, updatedAt }));
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  const ref = doc(db, "goals", goalId);
  await deleteDoc(ref);
};
