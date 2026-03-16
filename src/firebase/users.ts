import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export const updateUserStreak = async (userId: string, currentStreak: number, longestStreak: number): Promise<void> => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, {
    "stats.currentStreak": currentStreak,
    "stats.longestStreak": longestStreak,
  });
};

export const updateFeaturedGoalId = async (userId: string, featuredGoalId?: string): Promise<void> => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, {
    featuredGoalId: featuredGoalId ?? null,
  });
};
