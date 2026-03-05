import { useEffect, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import { subscribeWeeklyPlansByUser, type WeeklyPlan } from "@/firebase/plans";

export const useWeeklyPlans = () => {
  const { user } = useUser();
  const [plans, setPlans] = useState<WeeklyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPlans([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeWeeklyPlansByUser(user.id, (next) => {
      setPlans(next);
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  return { plans, loading };
};
