import { useEffect, useMemo, useState } from "react";
import { subscribeGoalsByUser } from "@/firebase/goals";
import type { Goal } from "@/types";
import { useUser } from "@/contexts/UserContext";

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
  }, [user, userLoading]);

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
      ? Math.round(goals.reduce((sum, g) => sum + (g.progress ?? 0), 0) / goals.length)
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
