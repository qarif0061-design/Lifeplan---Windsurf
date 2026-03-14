import { useEffect, useMemo, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import {
  subscribeDailyTaskDaysByUser,
  type DailyTaskDay,
} from "@/firebase/dailyTasks";

export const useDailyTasks = () => {
  const { user, loading: userLoading, isPremium } = useUser();
  const [days, setDays] = useState<DailyTaskDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      setDays([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeDailyTaskDaysByUser(user.id, (next) => {
      setDays(next);
      setLoading(false);
    });

    return () => unsub();
  }, [user, userLoading]);

  const distinctDates = useMemo(() => {
    const withTasks = days.filter((d) => (d.tasks?.length ?? 0) > 0);
    return Array.from(new Set(withTasks.map((d) => d.date)));
  }, [days]);

  const freeLimit = 3;
  const canCreateNewDate = useMemo(() => {
    if (isPremium) return true;
    return distinctDates.length < freeLimit;
  }, [distinctDates.length, isPremium]);

  return { days, loading, distinctDates, freeLimit, canCreateNewDate };
};
