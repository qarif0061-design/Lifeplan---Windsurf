import { useEffect, useMemo, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import { subscribeCheckInsByUser, type DailyCheckIn } from "@/firebase/checkins";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const computeStreakFromDates = (dateKeys: string[], todayKey?: string): number => {
  const set = new Set(dateKeys);
  const today = todayKey ?? toDateKeyLocal(new Date());

  let streak = 0;
  const cursor = new Date(`${today}T00:00:00`);
  while (true) {
    const key = toDateKeyLocal(cursor);
    if (!set.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const useCheckIns = () => {
  const { user, loading: userLoading } = useUser();
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      setCheckIns([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeCheckInsByUser(user.id, (next) => {
      setCheckIns(next);
      setLoading(false);
    });
    return () => unsub();
  }, [user, userLoading]);

  const stats = useMemo(() => {
    const dates = checkIns.map((c) => c.date);
    const streak = computeStreakFromDates(dates);

    const last7Keys: string[] = [];
    const cursor = new Date();
    for (let i = 0; i < 7; i += 1) {
      last7Keys.push(toDateKeyLocal(cursor));
      cursor.setDate(cursor.getDate() - 1);
    }
    const last7 = checkIns.filter((c) => last7Keys.includes(c.date));

    const completionScore = (c: DailyCheckIn) => {
      let score = 0;
      if (c.hydration) score += 1;
      if (c.healthyEating) score += 1;
      if (c.exercise) score += 1;
      return score;
    };

    const avgLast7 = last7.length
      ? Math.round((last7.reduce((sum, c) => sum + completionScore(c), 0) / (last7.length * 3)) * 100)
      : 0;

    return {
      streak,
      avgLast7CompletionPct: avgLast7,
      totalCheckIns: checkIns.length,
    };
  }, [checkIns]);

  return { checkIns, loading, stats };
};
