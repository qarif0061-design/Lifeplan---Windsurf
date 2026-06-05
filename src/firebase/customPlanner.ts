import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";

export type CustomPlannerTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CustomPlannerDay = {
  dayNumber: number;
  title: string;
  priorities: string[];
  tasks: CustomPlannerTask[];
  notes: string;
};

export type CustomPlanner = {
  id: string;
  userId: string;
  title: string;
  dayCount: number;
  days: CustomPlannerDay[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

const customPlannerCollection = collection(db, "customPlanners");

export const generateEmptyDays = (dayCount: number): CustomPlannerDay[] => {
  const days: CustomPlannerDay[] = [];
  for (let i = 1; i <= dayCount; i++) {
    days.push({
      dayNumber: i,
      title: `Day ${i}`,
      priorities: [],
      tasks: [],
      notes: "",
    });
  }
  return days;
};

export const createCustomPlanner = async (
  userId: string,
  title: string,
  dayCount: number
): Promise<CustomPlanner> => {
  const days = generateEmptyDays(dayCount);
  const newPlanner = {
    userId,
    title,
    dayCount,
    days,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(customPlannerCollection, newPlanner);
  return {
    id: docRef.id,
    ...newPlanner,
  } as unknown as CustomPlanner;
};

export const subscribeCustomPlanner = (
  plannerId: string,
  callback: (planner: CustomPlanner | null) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const ref = doc(db, "customPlanners", plannerId);
  return onSnapshot(
    ref,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      const planner: CustomPlanner = {
        id: snapshot.id,
        ...(snapshot.data() as Omit<CustomPlanner, "id">),
      };
      callback(planner);
    },
    onError
  );
};

export const subscribeCustomPlanners = (
  userId: string,
  callback: (planners: CustomPlanner[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const q = query(
    customPlannerCollection,
    where("userId", "==", userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const planners = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CustomPlanner, "id">),
      })) as CustomPlanner[];
      planners.sort((a, b) => {
        const aTime = (a.createdAt as any)?.toMillis?.() ?? 0;
        const bTime = (b.createdAt as any)?.toMillis?.() ?? 0;
        return bTime - aTime;
      });
      callback(planners);
    },
    onError
  );
};

export const updateCustomPlanner = async (
  plannerId: string,
  updates: Partial<Omit<CustomPlanner, "id" | "userId" | "createdAt">>
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteCustomPlanner = async (
  plannerId: string
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  await deleteDoc(ref);
};

export const updateDayPlan = async (
  plannerId: string,
  dayIndex: number,
  dayPlan: CustomPlannerDay
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const updatedDays = [...(planner.days || [])];
  updatedDays[dayIndex] = dayPlan;

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

export const addTaskToDay = async (
  plannerId: string,
  dayIndex: number,
  task: Omit<CustomPlannerTask, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const updatedDays = [...(planner.days || [])];
  const day = updatedDays[dayIndex];

  const newTask: CustomPlannerTask = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  day.tasks.push(newTask);

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

export const updateTaskInDay = async (
  plannerId: string,
  dayIndex: number,
  taskId: string,
  updates: Partial<CustomPlannerTask>
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const updatedDays = [...(planner.days || [])];
  const day = updatedDays[dayIndex];

  const taskIndex = day.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  day.tasks[taskIndex] = {
    ...day.tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTaskFromDay = async (
  plannerId: string,
  dayIndex: number,
  taskId: string
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const updatedDays = [...(planner.days || [])];
  const day = updatedDays[dayIndex];

  day.tasks = day.tasks.filter((t) => t.id !== taskId);

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

export const cloneCustomPlanner = async (
  plannerId: string,
  userId: string
): Promise<CustomPlanner> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as Omit<CustomPlanner, "id">;

  const clonedDays = (planner.days || []).map((day) => ({
    ...day,
    tasks: day.tasks.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  }));

  const newPlanner = {
    userId,
    title: `${planner.title} (Copy)`,
    dayCount: planner.dayCount,
    days: clonedDays,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(customPlannerCollection, newPlanner);
  return {
    id: docRef.id,
    ...newPlanner,
  } as unknown as CustomPlanner;
};

export const resetCustomPlanner = async (
  plannerId: string
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const resetDays = (planner.days || []).map((day) => ({
    ...day,
    priorities: [],
    tasks: [],
    notes: "",
  }));

  await updateDoc(ref, {
    days: resetDays,
    updatedAt: serverTimestamp(),
  });
};

export const addDaysToPlanner = async (
  plannerId: string,
  count: number
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const currentDays = planner.days || [];
  const startDay = currentDays.length + 1;

  const newDays: CustomPlannerDay[] = [];
  for (let i = 0; i < count; i++) {
    newDays.push({
      dayNumber: startDay + i,
      title: `Day ${startDay + i}`,
      priorities: [],
      tasks: [],
      notes: "",
    });
  }

  await updateDoc(ref, {
    days: [...currentDays, ...newDays],
    dayCount: (planner.dayCount || 0) + count,
    updatedAt: serverTimestamp(),
  });
};

export const removeDaysFromPlanner = async (
  plannerId: string,
  count: number
): Promise<void> => {
  const ref = doc(db, "customPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as CustomPlanner;
  const currentDays = planner.days || [];

  if (currentDays.length <= count) {
    throw new Error("Cannot remove all days from planner");
  }

  const remainingDays = currentDays.slice(0, currentDays.length - count);

  await updateDoc(ref, {
    days: remainingDays,
    dayCount: (planner.dayCount || 0) - count,
    updatedAt: serverTimestamp(),
  });
};
