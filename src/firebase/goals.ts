import { db } from "@/firebase/config";
import type { Goal, Priority, Timeframe } from "@/types";
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

const deepOmitUndefined = (value: unknown): unknown => {
  if (value === undefined) return undefined;
  if (value === null) return null;

  if (Array.isArray(value)) {
    const cleaned = value
      .map((v) => deepOmitUndefined(v))
      .filter((v) => v !== undefined);
    return cleaned;
  }

  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = deepOmitUndefined(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    return out;
  }

  return value;
};

const toIsoString = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();

  const anyValue: any = value as any;
  if (typeof anyValue?.toDate === "function") {
    const d = anyValue.toDate();
    if (d instanceof Date && !Number.isNaN(d.getTime())) return d.toISOString();
  }

  // Timestamp-like object (seconds/nanoseconds)
  if (typeof anyValue?.seconds === "number") {
    const ms = anyValue.seconds * 1000;
    const d = new Date(ms);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  // Fallback: try Date parsing
  const d = new Date(value as any);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

const normalizeGoalFromFirestore = (goalId: string, raw: unknown): Goal => {
  const data = (raw || {}) as Record<string, any>;

  const checkpoints = Array.isArray(data.checkpoints)
    ? data.checkpoints.map((c: any) => ({
        ...c,
        createdAt: toIsoString(c?.createdAt) ?? c?.createdAt,
        updatedAt: toIsoString(c?.updatedAt) ?? c?.updatedAt,
        completedAt: toIsoString(c?.completedAt) ?? c?.completedAt,
      }))
    : data.checkpoints;

  return {
    id: goalId,
    ...(data as Omit<Goal, "id">),
    // Normalize common date fields that may be written as Firestore Timestamp by mobile
    createdAt: toIsoString(data.createdAt) ?? (data.createdAt as any),
    updatedAt: toIsoString(data.updatedAt) ?? (data.updatedAt as any),
    startDate: toIsoString(data.startDate) ?? data.startDate,
    endDate: toIsoString(data.endDate) ?? data.endDate,
    dueAt: toIsoString(data.dueAt) ?? data.dueAt,
    checkpoints,
  } as Goal;
};

export const subscribeGoalsByUser = (
  userId: string,
  callback: (goals: Goal[]) => void,
): (() => void) => {
  const q = query(goalsCollection, where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const goals: Goal[] = snapshot.docs.map((d) => normalizeGoalFromFirestore(d.id, d.data()));
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

  const created = await addDoc(goalsCollection, deepOmitUndefined(goalBase) as any);
  return created.id;
};

export const getGoalById = async (goalId: string): Promise<Goal | null> => {
  const ref = doc(db, "goals", goalId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return normalizeGoalFromFirestore(snap.id, snap.data());
};

export const updateGoal = async (goalId: string, patch: Partial<Goal>): Promise<void> => {
  const ref = doc(db, "goals", goalId);
  const updatedAt = new Date().toISOString();
  const { id: _id, ...rest } = patch as Goal;
  const dueAtPatch = "endDate" in rest ? { dueAt: toDueAtFromEndDate((rest as Partial<Goal>).endDate) } : {};
  await updateDoc(ref, deepOmitUndefined({ ...rest, ...dueAtPatch, updatedAt }) as any);
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  const ref = doc(db, "goals", goalId);
  await deleteDoc(ref);
};
