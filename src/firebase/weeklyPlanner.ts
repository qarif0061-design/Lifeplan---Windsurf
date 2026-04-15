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
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export type DayTask = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type DayPlan = {
  date: string; // YYYY-MM-DD
  dayName: string; // Monday, Tuesday, etc.
  priorities: string[]; // Max 3
  tasks: DayTask[];
};

export type WeeklyPlanner = {
  id: string;
  userId: string;
  weekStart: string; // YYYY-MM-DD (Monday)
  weekEnd: string; // YYYY-MM-DD (Sunday)
  days: DayPlan[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

const weeklyPlannerCollection = collection(db, "weeklyPlanners");

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

const buildWeeklyTemplate = (): Partial<
  Record<(typeof dayNames)[number], Pick<DayPlan, "priorities" | "tasks">>
> => {
  return {
    Monday: {
      priorities: ["Review weekly goals", "Plan your top 3 priorities", "Schedule two focus blocks"],
      tasks: [
        { id: crypto.randomUUID(), title: "Write priorities for the week", completed: false },
        { id: crypto.randomUUID(), title: "Time block 2 important tasks", completed: false },
      ],
    },
    Tuesday: {
      priorities: ["Execute one high-impact task"],
      tasks: [{ id: crypto.randomUUID(), title: "Complete 1 focus session (25–50 min)", completed: false }],
    },
    Wednesday: {
      priorities: ["Make progress on main project", "Handle admin/emails"],
      tasks: [
        { id: crypto.randomUUID(), title: "Work on main goal project (45–60 min)", completed: false },
        { id: crypto.randomUUID(), title: "Clear inbox and respond to messages", completed: false },
      ],
    },
    Thursday: {
      priorities: ["Focus block for deep work", "Review progress mid-week"],
      tasks: [
        { id: crypto.randomUUID(), title: "Deep work session (60–90 min)", completed: false },
        { id: crypto.randomUUID(), title: "Check progress on weekly priorities", completed: false },
      ],
    },
    Friday: {
      priorities: ["Weekly review", "Plan next week"],
      tasks: [
        { id: crypto.randomUUID(), title: "Review wins + plan next week", completed: false },
        { id: crypto.randomUUID(), title: "Celebrate completed tasks", completed: false },
      ],
    },
    Saturday: {
      priorities: ["Personal development", "Rest and recharge"],
      tasks: [
        { id: crypto.randomUUID(), title: "Read or learn something new", completed: false },
        { id: crypto.randomUUID(), title: "Light activity or hobby", completed: false },
      ],
    },
    Sunday: {
      priorities: ["Prepare for the week ahead", "Family time or self-care"],
      tasks: [
        { id: crypto.randomUUID(), title: "Review calendar and set intentions", completed: false },
        { id: crypto.randomUUID(), title: "Meal prep or household tasks", completed: false },
      ],
    },
  };
};

export const getWeeklyTemplateDays = (weekStart: Date): DayPlan[] => {
  const template = buildWeeklyTemplate();
  const days: DayPlan[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    days.push({
      date: dateStr,
      dayName: dayNames[i],
      priorities: template[dayNames[i]]?.priorities ?? [],
      tasks: template[dayNames[i]]?.tasks ?? [],
    });
  }

  return days;
};

// Helper to get Monday of current week
export const getWeekStart = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(d.setDate(diff));
};

// Helper to generate 7 days from week start
export const generateWeekDays = (weekStart: Date): DayPlan[] => {
  const days: DayPlan[] = [];
  const template = buildWeeklyTemplate();

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    days.push({
      date: dateStr,
      dayName: dayNames[i],
      priorities: template[dayNames[i]]?.priorities ?? [],
      tasks: template[dayNames[i]]?.tasks ?? [],
    });
  }

  return days;
};

// Helper to format date for display
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Subscribe to weekly planner for a specific week
export const subscribeWeeklyPlanner = (
  userId: string,
  weekStart: string,
  callback: (planner: WeeklyPlanner | null) => void
): (() => void) => {
  const q = query(
    weeklyPlannerCollection,
    where("userId", "==", userId),
    where("weekStart", "==", weekStart)
  );

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(null);
      return;
    }

    const doc = snapshot.docs[0];
    const planner: WeeklyPlanner = {
      id: doc.id,
      ...(doc.data() as Omit<WeeklyPlanner, "id">),
    };
    callback(planner);
  });
};

// Get or create weekly planner
export const getOrCreateWeeklyPlanner = async (
  userId: string,
  weekStart: Date
): Promise<WeeklyPlanner> => {
  const weekStartStr = weekStart.toISOString().split("T")[0];
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const weekEndStr = weekEnd.toISOString().split("T")[0];

  // Check if planner exists
  const q = query(
    weeklyPlannerCollection,
    where("userId", "==", userId),
    where("weekStart", "==", weekStartStr)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...(doc.data() as Omit<WeeklyPlanner, "id">),
    };
  }

  // Create new planner
  const days = generateWeekDays(weekStart);
  const newPlanner = {
    userId,
    weekStart: weekStartStr,
    weekEnd: weekEndStr,
    days,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(weeklyPlannerCollection, newPlanner);
  return {
    id: docRef.id,
    ...newPlanner,
  };
};

// Update entire weekly planner
export const updateWeeklyPlanner = async (
  plannerId: string,
  updates: Partial<WeeklyPlanner>
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const { id: _id, ...rest } = updates as WeeklyPlanner;

  await updateDoc(ref, {
    ...rest,
    updatedAt: serverTimestamp(),
  });
};

// Update a specific day in the planner
export const updateDayPlan = async (
  plannerId: string,
  dayIndex: number,
  dayPlan: DayPlan
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as WeeklyPlanner;
  const updatedDays = [...planner.days];
  updatedDays[dayIndex] = dayPlan;

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

// Add task to a specific day
export const addTaskToDay = async (
  plannerId: string,
  dayIndex: number,
  task: Omit<DayTask, "id" | "createdAt" | "updatedAt">
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as WeeklyPlanner;
  const updatedDays = [...planner.days];
  const day = updatedDays[dayIndex];

  const newTask: DayTask = {
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

// Update task in a specific day
export const updateTaskInDay = async (
  plannerId: string,
  dayIndex: number,
  taskId: string,
  updates: Partial<DayTask>
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as WeeklyPlanner;
  const updatedDays = [...planner.days];
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

// Delete task from a specific day
export const deleteTaskFromDay = async (
  plannerId: string,
  dayIndex: number,
  taskId: string
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as WeeklyPlanner;
  const updatedDays = [...planner.days];
  const day = updatedDays[dayIndex];

  day.tasks = day.tasks.filter((t) => t.id !== taskId);

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};

// Update priorities for a specific day
export const updateDayPriorities = async (
  plannerId: string,
  dayIndex: number,
  priorities: string[]
): Promise<void> => {
  const ref = doc(db, "weeklyPlanners", plannerId);
  const plannerDoc = await getDoc(ref);

  if (!plannerDoc.exists()) {
    throw new Error("Planner not found");
  }

  const planner = plannerDoc.data() as WeeklyPlanner;
  const updatedDays = [...planner.days];
  updatedDays[dayIndex].priorities = priorities.slice(0, 3); // Max 3

  await updateDoc(ref, {
    days: updatedDays,
    updatedAt: serverTimestamp(),
  });
};
