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

  const payload: Omit<DailyCheckIn, "id"> = {
    userId: input.userId,
    date: input.date,
    hydration: input.hydration,
    healthyEating: input.healthyEating,
    exercise: input.exercise,
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
    const checkIns: DailyCheckIn[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<DailyCheckIn, "id">),
    }));
    callback(checkIns);
  });
};
