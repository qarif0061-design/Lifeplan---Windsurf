import Layout from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGoals } from "@/hooks/useGoals";
import { useCheckIns } from "@/hooks/useCheckIns";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Lock } from "lucide-react";
import { getWeekStart, subscribeWeeklyPlanner, type WeeklyPlanner } from "@/firebase/weeklyPlanner";
import { computeWeeklyExecution, buildExecutionInsights, projectGoalPace } from "@/utils/adaptiveExecution";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const Insights = () => {
  const { user, isPremium, loading } = useUser();
  const navigate = useNavigate();
  const { goals, stats } = useGoals();
  const { checkIns, stats: checkInStats } = useCheckIns();
  const [weekPlanner, setWeekPlanner] = useState<WeeklyPlanner | null>(null);

  useEffect(() => {
    if (!loading && !isPremium) {
      navigate("/pricing");
    }
  }, [loading, isPremium, navigate]);

  useEffect(() => {
    if (!user) {
      setWeekPlanner(null);
      return;
    }
    const weekStartStr = getWeekStart().toISOString().split("T")[0];
    const unsub = subscribeWeeklyPlanner(user.id, weekStartStr, setWeekPlanner);
    return () => unsub();
  }, [user]);

  const weeklyExecutionInsights = useMemo(() => {
    const summary = computeWeeklyExecution(weekPlanner?.days.flatMap((d) => d.tasks) ?? []);
    return buildExecutionInsights(summary);
  }, [weekPlanner]);

  const goalPaceProjections = useMemo(
    () =>
      stats.active.map((g) => ({
        goal: g,
        pace: projectGoalPace(g.checkpoints, g.createdAt, g.dueAt ?? g.endDate ?? null),
      })),
    [stats.active],
  );

  const last7 = useMemo(() => {
    const keys: string[] = [];
    const cursor = new Date();
    for (let i = 0; i < 7; i += 1) {
      keys.push(toDateKeyLocal(cursor));
      cursor.setDate(cursor.getDate() - 1);
    }
    const byKey = new Map(checkIns.map((c) => [c.date, c] as const));
    return keys
      .slice()
      .reverse()
      .map((k) => {
        const c = byKey.get(k);
        const score = c ? (c.hydration ? 1 : 0) + (c.healthyEating ? 1 : 0) + (c.exercise ? 1 : 0) : 0;
        return { date: k, pct: Math.round((score / 3) * 100) };
      });
  }, [checkIns]);

  return (
    <Layout>
      <div className="relative">
        <div
          className={`space-y-8 animate-in fade-in duration-500 ${
            isPremium ? "" : "blur-sm select-none pointer-events-none"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Insights</h1>
            <p className="text-muted-foreground">Real-time stats from your goals and daily check-ins.</p>
          </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.activeCount}</div>
              <div className="text-sm text-muted-foreground">Active Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-momentum mb-1">{stats.completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-rose-600 mb-1">{stats.failedCount}</div>
              <div className="text-sm text-muted-foreground">Failed Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-ember mb-1">{stats.avgProgress}%</div>
              <div className="text-sm text-muted-foreground">Avg Goal Progress</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{checkInStats.streak}</div>
              <div className="text-sm text-muted-foreground">Check-in Streak</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{checkInStats.avgLast7CompletionPct}%</div>
              <div className="text-sm text-muted-foreground">Last 7 Days Completion</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">This Week's Execution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weekPlanner ? (
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {weeklyExecutionInsights.map((line) => (
                    <span key={line}>
                      {line.split(/(\d+%?)/).map((part, i) =>
                        /^\d+%?$/.test(part) ? (
                          <span key={i} className="font-mono font-semibold text-foreground">
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        ),
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No weekly plan set yet.</div>
              )}
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/weekly-planner">Open Weekly Planner</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Goal Pace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {goalPaceProjections.length === 0 ? (
                <div className="text-sm text-muted-foreground">No active goals yet.</div>
              ) : (
                goalPaceProjections.map(({ goal, pace }) => (
                  <div key={goal.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-4">
                      <Link to={`/goals/${goal.id}`} className="font-bold text-foreground hover:underline">
                        {goal.name}
                      </Link>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        pace.status === "at-risk" ? "text-amber-600" : "text-muted-foreground"
                      }`}
                    >
                      {pace.message}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Daily Check-ins (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-2 items-end">
                {last7.map((d) => (
                  <div key={d.date} className="flex flex-col items-center gap-2">
                    <div className="w-full rounded-xl bg-secondary overflow-hidden h-24">
                      <div className="bg-primary w-full" style={{ height: `${d.pct}%` }} />
                    </div>
                    <div className="text-[10px] text-muted-foreground">{d.date.slice(5)}</div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/check-in">Open Check-in</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Overdue / Failed Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.failedCount === 0 ? (
                <div className="text-sm text-muted-foreground">No failed goals. Keep going.</div>
              ) : (
                stats.failed.slice(0, 6).map((g) => (
                  <div key={g.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-bold text-foreground">{g.name}</div>
                      <Button asChild variant="ghost" className="rounded-full">
                        <Link to={`/goals/${g.id}`}>View</Link>
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={g.progress}
                        className={`h-2 bg-secondary ${
                          g.progress >= 100
                            ? "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-emerald-400 [&>div]:to-lime-400"
                            : g.progress < 20
                              ? "[&>div]:bg-gradient-to-r [&>div]:from-rose-600 [&>div]:via-rose-500 [&>div]:to-amber-500"
                              : g.progress < 50
                                ? "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:via-orange-500 [&>div]:to-yellow-400"
                                : g.progress < 80
                                  ? "[&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:via-blue-600 [&>div]:to-indigo-500"
                                  : "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-teal-500 [&>div]:to-sky-500"
                        }`}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
        </div>

        {!isPremium && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-xl mx-auto bg-card/80 backdrop-blur-md border border-border shadow-lg rounded-[2.5rem] p-8 text-center">
              <div className="flex items-center justify-center gap-2 text-foreground mb-3">
                <Lock className="w-5 h-5" />
                <h2 className="text-xl font-bold">Premium feature</h2>
              </div>
              <p className="text-muted-foreground mb-6">Upgrade to Premium to unlock full Insights and analytics.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
                  <Link to="/pricing">Upgrade to Premium</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Insights;