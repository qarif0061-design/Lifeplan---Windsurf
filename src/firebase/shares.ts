// LIFEPLANS — Sharing Service (Website)
// Handles creating, reading, and managing public share records.
// Both mobile and website use the same Firestore collection: 'shares'.

import { db } from "@/firebase/config";
import type { ShareType } from "@/constants/product";
import { COLLECTIONS } from "@/constants/product";
import type { GoalCheckpoint } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

// ─── TYPES ────────────────────────────────────────────────────

export interface ShareData {
  goalName?: string;
  goalProgress?: number;
  completedActions?: number;
  remainingActions?: number;
  totalActions?: number;

  date?: string;
  prioritiesCompleted?: number;
  prioritiesTotal?: number;
  completionPercent?: number;

  weekLabel?: string;
  tasksCompleted?: number;
  tasksTotal?: number;
  goalsProgressed?: number;
  streak?: number;
  topAchievement?: string;

  monthLabel?: string;
  yearLabel?: string;
  goalsCreated?: number;
  goalsCompleted?: number;
  productiveDays?: number;
  avgExecution?: number;

  achievementTitle?: string;
  achievementIcon?: string;
  achievementDescription?: string;

  currentStreak?: number;

  // Snapshot of the source goal's structure, captured at share-creation time so
  // "Copy this goal" can clone it without needing read access to the (private)
  // original goals/{goalId} doc.
  goalCategory?: string;
  goalCheckpoints?: GoalCheckpoint[];
}

export interface ShareRecord {
  id: string;
  userId: string;
  type: ShareType;
  title: string;
  subtitle?: string;
  data: ShareData;
  publicId: string;
  active: boolean;
  createdAt: unknown;
}

// ─── BUILDERS ─────────────────────────────────────────────────

export const buildGoalShareData = (
  goalName: string,
  goalProgress: number,
  completedActions: number,
  remainingActions: number,
  totalActions: number,
  goalStructure?: { category?: string; checkpoints?: GoalCheckpoint[] },
): ShareData => ({
  goalName,
  goalProgress,
  completedActions,
  remainingActions,
  totalActions,
  // Firestore rejects `undefined` field values, so only attach these when present.
  ...(goalStructure?.category ? { goalCategory: goalStructure.category } : {}),
  ...(goalStructure?.checkpoints ? { goalCheckpoints: goalStructure.checkpoints } : {}),
});

// ─── HELPERS ──────────────────────────────────────────────────

const generatePublicId = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

const sharesCol = collection(db, COLLECTIONS.SHARES);

// Firestore rejects `undefined` field values, including nested ones — and
// normalizeGoalFromFirestore() (goals.ts) leaves fields like `completedAt: undefined`
// on checkpoints that never completed. Strip those recursively before any write here,
// since ShareData can now carry a full checkpoints snapshot (see goalCheckpoints).
const deepOmitUndefined = (value: unknown): unknown => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (Array.isArray(value)) {
    return value.map((v) => deepOmitUndefined(v)).filter((v) => v !== undefined);
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

// ─── CREATE ───────────────────────────────────────────────────

export const createShare = async (
  userId: string,
  type: ShareType,
  title: string,
  data: ShareData,
  subtitle?: string,
): Promise<string> => {
  const publicId = generatePublicId();
  const shareData = {
    userId,
    type,
    title,
    subtitle,
    data: deepOmitUndefined(data),
    publicId,
    active: true,
    createdAt: serverTimestamp(),
  };
  await addDoc(sharesCol, shareData);
  return publicId;
};

// ─── READ ─────────────────────────────────────────────────────

export const getShareByPublicId = async (publicId: string): Promise<ShareRecord | null> => {
  const q = query(sharesCol, where("publicId", "==", publicId), where("active", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as ShareRecord;
};

export const getUserShares = async (userId: string): Promise<ShareRecord[]> => {
  const q = query(sharesCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ShareRecord));
};

export const subscribeUserShares = (
  userId: string,
  callback: (shares: ShareRecord[]) => void,
): (() => void) => {
  const q = query(sharesCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const shares = snap.docs.map((d) => ({ id: d.id, ...d.data() } as ShareRecord));
    callback(shares);
  });
};

// ─── DELETE / REVOKE ──────────────────────────────────────────

export const revokeShare = async (shareId: string): Promise<void> => {
  const ref = doc(db, COLLECTIONS.SHARES, shareId);
  await deleteDoc(ref);
};
