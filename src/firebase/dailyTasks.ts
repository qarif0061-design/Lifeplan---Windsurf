import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type DailyTaskItem = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DailyTaskDay = {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  tasks: DailyTaskItem[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

const dailyTasksCollection = collection(db, "daily_tasks");

const omitUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
};

export const dailyTaskDayId = (userId: string, date: string) => `${userId}_${date}`;

export const subscribeDailyTaskDaysByUser = (
  userId: string,
  callback: (days: DailyTaskDay[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  const q = query(dailyTasksCollection, where("userId", "==", userId));
  return onSnapshot(
    q,
    (snapshot) => {
      const days: DailyTaskDay[] = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as Omit<DailyTaskDay, "id">),
        }))
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
      callback(days);
    },
    (err) => {
      onError?.(err as Error);
    },
  );
};

export const upsertDailyTaskDay = async (input: Omit<DailyTaskDay, "id">): Promise<string> => {
  const ref = doc(db, "daily_tasks", dailyTaskDayId(input.userId, input.date));
  await setDoc(
    ref,
    {
      ...omitUndefined(input),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
  return ref.id;
};

export const updateDailyTaskDayTasks = async (
  userId: string,
  date: string,
  tasks: DailyTaskItem[],
): Promise<void> => {
  const ref = doc(db, "daily_tasks", dailyTaskDayId(userId, date));
  await setDoc(
    ref,
    {
      userId,
      date,
      tasks,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};
