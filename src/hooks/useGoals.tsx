import { useEffect, useMemo, useState } from "react";
import { subscribeGoalsByUser } from "@/firebase/goals";
import type { Goal } from "@/types";
import { useUser } from "@/contexts/UserContext";

const getDerivedProgress = (g: Goal): number => {
  const cps = g.checkpoints ?? [];
  if (cps.length > 0) {
    const done = cps.filter((c) => c.completed).length;
    return Math.round((done / cps.length) * 100);
  }
  return g.progress ?? 0;
};

export const useGoals = () => {
  const { user, loading: userLoading } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeGoalsByUser(user.id, (next) => {
      setGoals(next);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id, userLoading]);

  const stats = useMemo(() => {
    const now = Date.now();
    const active = goals.filter((g) => g.status === "active");
    const completed = goals.filter((g) => g.status === "completed");
    const failed = goals.filter((g) => {
      if (g.status === "completed") return false;
      if (!g.dueAt) return false;
      return new Date(g.dueAt).getTime() < now;
    });
    const avgProgress = goals.length
      ? Math.round(goals.reduce((sum, g) => sum + getDerivedProgress(g), 0) / goals.length)
      : 0;

    return {
      activeCount: active.length,
      completedCount: completed.length,
      failedCount: failed.length,
      avgProgress,
      active,
      completed,
      failed,
    };
  }, [goals]);

  return { goals, loading, stats };
};
