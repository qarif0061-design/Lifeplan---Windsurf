import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type PlanTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type WeeklyPlan = {
  id: string;
  userId: string;
  weekStart: string; // YYYY-MM-DD (Monday)
  priorities: string[];
  tasks: PlanTask[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

const plansCollection = collection(db, "plans");

const omitUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      (out as Record<string, unknown>)[k] = v;
    }
  }
  return out;
};

export const subscribeWeeklyPlansByUser = (
  userId: string,
  callback: (plans: WeeklyPlan[]) => void,
): (() => void) => {
  const q = query(plansCollection, where("userId", "==", userId), orderBy("weekStart", "desc"));
  return onSnapshot(q, (snapshot) => {
    const plans: WeeklyPlan[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<WeeklyPlan, "id">),
    }));
    callback(plans);
  });
};

export const createWeeklyPlan = async (input: Omit<WeeklyPlan, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  const created = await addDoc(plansCollection, {
    ...omitUndefined(input),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
};

export const updateWeeklyPlan = async (planId: string, patch: Partial<WeeklyPlan>): Promise<void> => {
  const ref = doc(db, "plans", planId);
  const { id: _id, ...rest } = patch as WeeklyPlan;
  await updateDoc(ref, {
    ...omitUndefined(rest),
    updatedAt: serverTimestamp(),
  });
};
