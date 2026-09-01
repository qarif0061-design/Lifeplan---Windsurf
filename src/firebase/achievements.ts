import { db } from "@/firebase/config";
import { AchievementDefinition, ACHIEVEMENTS } from "@/constants/product";
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    Timestamp,
    where,
} from "firebase/firestore";

export interface UserAchievement {
    id: string;
    userId: string;
    achievementId: string;
    earnedAt?: Timestamp;
}

export interface UserStats {
    goalsCreated: number;
    goalsCompleted: number;
    tasksCompleted: number;
    daysActive: number;
    sharesCreated: number;
    referralsMade: number;
}

const ACHIEVEMENT_RULES: Record<string, (stats: UserStats) => boolean> = {
    first_goal: (s) => s.goalsCreated >= 1,
    first_week: (s) => s.daysActive >= 7,
    streak_7: (s) => s.daysActive >= 7,
    streak_30: (s) => s.daysActive >= 30,
    goal_completed: (s) => s.goalsCompleted >= 1,
    goals_10: (s) => s.goalsCreated >= 10,
    tasks_100: (s) => s.tasksCompleted >= 100,
    first_share: (s) => s.sharesCreated >= 1,
    first_referral: (s) => s.referralsMade >= 1,
};

const toUserAchievement = (id: string, data: Record<string, unknown>): UserAchievement => ({
    id,
    userId: (data.userId as string) ?? "",
    achievementId: (data.achievementId as string) ?? "",
    earnedAt: (data.earnedAt as Timestamp) ?? undefined,
});

export const getUserAchievements = async (userId: string): Promise<UserAchievement[]> => {
    const q = query(collection(db, "achievements"), where("userId", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => toUserAchievement(d.id, d.data()));
};

export const awardAchievement = async (userId: string, achievementId: string): Promise<void> => {
    const existing = await getUserAchievements(userId);
    if (existing.some((a) => a.achievementId === achievementId)) return;
    await addDoc(collection(db, "achievements"), {
        userId,
        achievementId,
        earnedAt: serverTimestamp(),
    });
};

export const checkAndAwardAchievements = async (
    userId: string,
    stats: UserStats
): Promise<string[]> => {
    const existing = await getUserAchievements(userId);
    const earnedIds = new Set(existing.map((a) => a.achievementId));
    const newlyEarned: string[] = [];

    for (const def of ACHIEVEMENTS as readonly AchievementDefinition[]) {
        const rule = ACHIEVEMENT_RULES[def.id];
        if (!rule || earnedIds.has(def.id)) continue;
        if (rule(stats)) {
            await awardAchievement(userId, def.id);
            newlyEarned.push(def.id);
        }
    }
    return newlyEarned;
};

export const subscribeUserAchievements = (
    userId: string,
    callback: (achievements: UserAchievement[]) => void
): (() => void) => {
    const q = query(collection(db, "achievements"), where("userId", "==", userId));
    return onSnapshot(q, (snap) => {
        callback(snap.docs.map((d) => toUserAchievement(d.id, d.data())));
    });
};
