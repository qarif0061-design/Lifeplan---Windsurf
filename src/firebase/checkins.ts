import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type DailyCheckIn = {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  hydration: boolean;
  healthyEating: boolean;
  exercise: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type UpsertDailyCheckInInput = Omit<DailyCheckIn, "id" | "createdAt" | "updatedAt">;

const checkinsCollection = collection(db, "checkins");

type StoredCheckIn = Omit<DailyCheckIn, "id" | "date" | "hydration" | "healthyEating" | "exercise"> & {
  date?: string;
  dateKey?: string;
  hydration?: boolean | { done?: boolean };
  healthyEating?: boolean | { done?: boolean };
  exercise?: boolean | { done?: boolean };
};

const completed = (value: StoredCheckIn["hydration"]): boolean =>
  typeof value === "boolean" ? value : value?.done === true;

// Mobile stores each habit as { done, notes? }; older website documents used booleans.
// Keep the web-facing model simple while accepting both representations during rollout.
const fromStoredCheckIn = (id: string, data: StoredCheckIn): DailyCheckIn => ({
  id,
  userId: data.userId,
  date: data.date ?? data.dateKey ?? id.slice(data.userId.length + 1),
  hydration: completed(data.hydration),
  healthyEating: completed(data.healthyEating),
  exercise: completed(data.exercise),
  notes: data.notes,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

const omitUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      (out as Record<string, unknown>)[k] = v;
    }
  }
  return out;
};

export const upsertDailyCheckIn = async (input: UpsertDailyCheckInInput): Promise<string> => {
  const now = new Date().toISOString();
  const id = `${input.userId}_${input.date}`;
  const ref = doc(db, "checkins", id);

  const payload = {
    userId: input.userId,
    date: input.date,
    // This is the canonical cross-platform shape. The web normalizes it back to
    // booleans for its existing UI, while mobile can retain per-habit notes.
    dateKey: input.date,
    hydration: { done: input.hydration },
    healthyEating: { done: input.healthyEating },
    exercise: { done: input.exercise },
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(ref, omitUndefined(payload), { merge: true });
  return id;
};

export const subscribeCheckInsByUser = (
  userId: string,
  callback: (checkIns: DailyCheckIn[]) => void,
): (() => void) => {
  const q = query(checkinsCollection, where("userId", "==", userId), orderBy("date", "desc"));
  return onSnapshot(q, (snapshot) => {
    const checkIns = snapshot.docs.map((d) => fromStoredCheckIn(d.id, d.data() as StoredCheckIn));
    callback(checkIns);
  });
};
