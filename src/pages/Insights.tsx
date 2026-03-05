import Layout from "@/components/Layout";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGoals } from "@/hooks/useGoals";
import { useCheckIns } from "@/hooks/useCheckIns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const Insights = () => {
  const { stats } = useGoals();
  const { checkIns, stats: checkInStats } = useCheckIns();

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
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
          <p className="text-gray-500">Real-time stats from your goals and daily check-ins.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.activeCount}</div>
              <div className="text-sm text-gray-500">Active Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{stats.completedCount}</div>
              <div className="text-sm text-gray-500">Completed Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-rose-600 mb-1">{stats.failedCount}</div>
              <div className="text-sm text-gray-500">Failed Goals</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">{stats.avgProgress}%</div>
              <div className="text-sm text-gray-500">Avg Goal Progress</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{checkInStats.streak}</div>
              <div className="text-sm text-gray-500">Check-in Streak</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{checkInStats.avgLast7CompletionPct}%</div>
              <div className="text-sm text-gray-500">Last 7 Days Completion</div>
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
                    <div className="w-full rounded-xl bg-gray-100 overflow-hidden h-24">
                      <div className="bg-blue-600 w-full" style={{ height: `${d.pct}%` }} />
                    </div>
                    <div className="text-[10px] text-gray-500">{d.date.slice(5)}</div>
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
                <div className="text-sm text-gray-500">No failed goals. Keep going.</div>
              ) : (
                stats.failed.slice(0, 6).map((g) => (
                  <div key={g.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-bold text-gray-900">{g.name}</div>
                      <Button asChild variant="ghost" className="rounded-full">
                        <Link to={`/goals/${g.id}`}>View</Link>
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Progress value={g.progress} className="h-2 bg-gray-100" />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Insights;