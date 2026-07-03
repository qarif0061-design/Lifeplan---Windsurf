import {
  addDoc, collection, doc, getDocs, getDoc, deleteDoc, setDoc,
  query, where, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import type { CustomPlanner } from "@/firebase/customPlanner";

export interface PublishedTemplate {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  dayCount: number;
  days: CustomPlanner["days"];
  category: string;
  tags: string[];
  cloneCount: number;
  createdAt: unknown;
}

const templatesCol = collection(db, "templates");

export async function publishTemplate(
  userId: string,
  userName: string,
  planner: CustomPlanner,
  description: string,
  category: string,
  tags: string[]
): Promise<string> {
  const data = {
    userId,
    userName,
    title: planner.title,
    description,
    dayCount: planner.dayCount,
    days: planner.days,
    category,
    tags,
    cloneCount: 0,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(templatesCol, data);
  return ref.id;
}

export async function unpublishTemplate(templateId: string): Promise<void> {
  await deleteDoc(doc(templatesCol, templateId));
}

export async function getTemplates(filters?: {
  category?: string;
  search?: string;
}): Promise<PublishedTemplate[]> {
  let q = query(templatesCol, orderBy("cloneCount", "desc"));
  const snap = await getDocs(q);
  let results = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as PublishedTemplate[];

  if (filters?.category) {
    results = results.filter((t) => t.category === filters.category);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(s) ||
        t.description.toLowerCase().includes(s) ||
        t.tags.some((tag) => tag.toLowerCase().includes(s))
    );
  }
  return results;
}

export async function getTemplateById(id: string): Promise<PublishedTemplate | null> {
  const snap = await getDoc(doc(templatesCol, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as PublishedTemplate;
}

export async function cloneTemplate(
  template: PublishedTemplate,
  userId: string
): Promise<string> {
  const days = template.days.map((d) => ({
    ...d,
    tasks: d.tasks.map((t) => ({
      ...t,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  }));

  const newPlanner = {
    userId,
    title: template.title,
    dayCount: template.dayCount,
    days,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "customPlanners"), newPlanner);

  // Increment clone count
  const tRef = doc(templatesCol, template.id);
  const tSnap = await getDoc(tRef);
  if (tSnap.exists()) {
    const current = tSnap.data().cloneCount ?? 0;
    await setDoc(tRef, { cloneCount: current + 1 }, { merge: true });
  }

  return ref.id;
}

export async function getUserTemplates(userId: string): Promise<PublishedTemplate[]> {
  const q = query(templatesCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PublishedTemplate));
}

export const subscribeTemplates = (
  callback: (templates: PublishedTemplate[]) => void
) => {
  const q = query(templatesCol, orderBy("cloneCount", "desc"));
  return import("firebase/firestore").then(({ onSnapshot }) =>
    onSnapshot(q, (snap) => {
      const results = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as PublishedTemplate[];
      callback(results);
    })
  );
};
