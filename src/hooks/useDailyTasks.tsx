import { useEffect, useMemo, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import { auth } from "@/firebase/config";
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

    const uid = auth.currentUser?.uid ?? user.id;
    if (!uid) {
      setDays([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeDailyTaskDaysByUser(
      uid,
      (next) => {
        setDays(next);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to subscribe daily tasks", err);
        setDays([]);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [user, userLoading]);

  const distinctDates = useMemo(() => {
    const hasAnyContent = (d: DailyTaskDay) => {
      const hasTasks = (d.tasks?.length ?? 0) > 0;
      const hasSchedule = Object.values(d.schedule ?? {}).some((v) => (v ?? "").trim().length > 0);
      const hasPriorities = (d.priorities ?? []).some((p) => (p.title ?? "").trim().length > 0);
      const hasReminder = (d.reminder ?? "").trim().length > 0;
      const hasCallEmail = (d.callEmail ?? []).some((c) => (c.title ?? "").trim().length > 0);
      const hasForTomorrow = (d.forTomorrow ?? "").trim().length > 0;
      const hasAffirmation = (d.affirmation ?? "").trim().length > 0;
      const hasNotes = (d.notes ?? "").trim().length > 0;
      return (
        hasTasks ||
        hasSchedule ||
        hasPriorities ||
        hasReminder ||
        hasCallEmail ||
        hasForTomorrow ||
        hasAffirmation ||
        hasNotes
      );
    };

    const withContent = days.filter(hasAnyContent);
    return Array.from(new Set(withContent.map((d) => d.date)));
  }, [days]);

  const freeLimit = 3;
  const canCreateNewDate = useMemo(() => {
    if (isPremium) return true;
    return distinctDates.length < freeLimit;
  }, [distinctDates.length, isPremium]);

  return { days, loading, distinctDates, freeLimit, canCreateNewDate };
};
