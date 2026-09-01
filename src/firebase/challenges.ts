// LIFEPLANS — Challenges Service (Website)
// Group challenges: a creator starts one from a small set of category presets and
// shares an invite code/link; anyone who joins gets a participant doc tracking their
// own progress. Mirrors the patterns in src/firebase/shares.ts and
// src/firebase/templates.ts (generated code, addDoc/getDocs/onSnapshot helpers).

import { db } from "@/firebase/config";
import { COLLECTIONS } from "@/constants/product";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// ─── TYPES ────────────────────────────────────────────────────

export type ChallengeCategory = "goal" | "fitness" | "study" | "business" | "habit" | "custom";

export interface Challenge {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  durationDays: number;
  startDate: string; // YYYY-MM-DD
  inviteCode: string;
  goalId?: string;
  participantCount: number;
  active: boolean;
  createdAt: unknown;
}

export interface ChallengeParticipant {
  id: string; // == userId
  userId: string;
  displayName: string;
  joinedAt: unknown;
  progress: number; // 0-100
  completedAt?: unknown;
}

// A small, reusable set of category presets rather than dozens of bespoke challenge types.
export interface ChallengePreset {
  category: ChallengeCategory;
  label: string;
  icon: string;
  defaultDurationDays: number;
  description: string;
}

export const CHALLENGE_PRESETS: readonly ChallengePreset[] = [
  { category: "goal", label: "Goal Sprint", icon: "🎯", defaultDurationDays: 30, description: "Push a specific goal forward together." },
  { category: "habit", label: "Habit Streak", icon: "🔥", defaultDurationDays: 21, description: "Build a daily habit and keep each other honest." },
  { category: "fitness", label: "Fitness Challenge", icon: "💪", defaultDurationDays: 30, description: "Move every day and track consistency." },
  { category: "study", label: "Study Sprint", icon: "📚", defaultDurationDays: 14, description: "Study or learn something new together." },
  { category: "business", label: "Business Push", icon: "📈", defaultDurationDays: 30, description: "Ship on a project or business goal." },
  { category: "custom", label: "Custom Challenge", icon: "✨", defaultDurationDays: 30, description: "Define your own challenge." },
] as const;

// ─── HELPERS ──────────────────────────────────────────────────

export const generateInviteCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

const challengesCol = collection(db, COLLECTIONS.CHALLENGES);
const participantsCol = (challengeId: string) =>
  collection(db, COLLECTIONS.CHALLENGES, challengeId, "participants");

// ─── CREATE ───────────────────────────────────────────────────

export const createChallenge = async (
  userId: string,
  displayName: string,
  title: string,
  description: string,
  category: ChallengeCategory,
  durationDays: number,
  startDate: string,
  goalId?: string,
): Promise<string> => {
  const inviteCode = generateInviteCode();
  const challengeData = {
    userId,
    title,
    description,
    category,
    durationDays,
    startDate,
    inviteCode,
    // Firestore rejects `undefined` field values outright, so only include goalId
    // when the challenge is actually tied to one.
    ...(goalId ? { goalId } : {}),
    participantCount: 1,
    active: true,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(challengesCol, challengeData);

  // Creator auto-joins as the first participant.
  await setDoc(doc(participantsCol(ref.id), userId), {
    userId,
    displayName,
    joinedAt: serverTimestamp(),
    progress: 0,
  });

  return ref.id;
};

// ─── READ ─────────────────────────────────────────────────────

export const getChallengeById = async (challengeId: string): Promise<Challenge | null> => {
  const snap = await getDoc(doc(challengesCol, challengeId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Challenge;
};

export const getChallengeByInviteCode = async (inviteCode: string): Promise<Challenge | null> => {
  const q = query(challengesCol, where("inviteCode", "==", inviteCode), where("active", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Challenge;
};

export const getUserChallenges = async (userId: string): Promise<Challenge[]> => {
  const q = query(challengesCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Challenge));
};

export const subscribeUserChallenges = (
  userId: string,
  callback: (challenges: Challenge[]) => void,
): (() => void) => {
  const q = query(challengesCol, where("userId", "==", userId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Challenge)));
  });
};

// Public directory of joinable challenges (excludes the viewer's own — filter that in
// the UI) so people can discover a challenge to join without needing an invite link.
export const getDiscoverableChallenges = async (limitCount = 30): Promise<Challenge[]> => {
  const q = query(challengesCol, where("active", "==", true), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.slice(0, limitCount).map((d) => ({ id: d.id, ...d.data() } as Challenge));
};

export const getParticipants = async (challengeId: string): Promise<ChallengeParticipant[]> => {
  const snap = await getDocs(participantsCol(challengeId));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChallengeParticipant));
};

export const subscribeParticipants = (
  challengeId: string,
  callback: (participants: ChallengeParticipant[]) => void,
): (() => void) => {
  return onSnapshot(participantsCol(challengeId), (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChallengeParticipant)));
  });
};

export const getParticipant = async (
  challengeId: string,
  userId: string,
): Promise<ChallengeParticipant | null> => {
  const snap = await getDoc(doc(participantsCol(challengeId), userId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as ChallengeParticipant;
};

// A challenge a given user created or already joined (checked via user's own
// created list + a direct participant-doc lookup, since Firestore has no "my
// subcollection docs across N challenges" query).
export const getChallengesCreatedOrJoined = async (
  userId: string,
  createdChallenges: Challenge[],
): Promise<{ challenge: Challenge; participant: ChallengeParticipant | null }[]> => {
  const results = await Promise.all(
    createdChallenges.map(async (challenge) => ({
      challenge,
      participant: await getParticipant(challenge.id, userId),
    })),
  );
  return results;
};

// ─── JOIN / PROGRESS ────────────────────────────────────────────

export const joinChallenge = async (
  challengeId: string,
  userId: string,
  displayName: string,
): Promise<void> => {
  const existing = await getParticipant(challengeId, userId);
  if (existing) return; // already joined

  await setDoc(doc(participantsCol(challengeId), userId), {
    userId,
    displayName,
    joinedAt: serverTimestamp(),
    progress: 0,
  });
  await updateDoc(doc(challengesCol, challengeId), {
    participantCount: increment(1),
  });
  // Track joined challenges on the user's own profile — there's no cheap way to query
  // "all challenges/*/participants subcollections containing my uid" without a
  // collection-group index, so we keep a small reverse-index on the user doc instead.
  await updateDoc(doc(db, "users", userId), {
    joinedChallengeIds: arrayUnion(challengeId),
  });
};

// Fetch a batch of challenges by id (used to resolve a user's joinedChallengeIds).
export const getChallengesByIds = async (ids: string[]): Promise<Challenge[]> => {
  const unique = [...new Set(ids)];
  const results = await Promise.all(
    unique.map(async (id) => {
      const snap = await getDoc(doc(challengesCol, id));
      return snap.exists() ? ({ id: snap.id, ...snap.data() } as Challenge) : null;
    }),
  );
  return results.filter((c): c is Challenge => c !== null);
};

export const updateParticipantProgress = async (
  challengeId: string,
  userId: string,
  progress: number,
): Promise<void> => {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));
  const ref = doc(participantsCol(challengeId), userId);
  await setDoc(
    ref,
    {
      progress: clamped,
      ...(clamped >= 100 ? { completedAt: serverTimestamp() } : {}),
    },
    { merge: true },
  );
};

export const leaveChallenge = async (challengeId: string, userId: string): Promise<void> => {
  await deleteDoc(doc(participantsCol(challengeId), userId));
  await updateDoc(doc(challengesCol, challengeId), {
    participantCount: increment(-1),
  });
  await updateDoc(doc(db, "users", userId), {
    joinedChallengeIds: arrayRemove(challengeId),
  });
};
