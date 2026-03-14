import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { History } from "lucide-react";
import { Link } from "react-router-dom";

const toDisplayDate = (key: string): string => {
  const [yyyy, mm, dd] = key.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

const DailyPlannerHistory = () => {
  const { days, loading } = useDailyTasks();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daily Tasks History</h1>
            <p className="text-gray-500">Review and revisit previous days.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/daily-planner">
              <History className="w-4 h-4 mr-2" /> Back to planner
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loading && (
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardContent className="p-6 text-gray-500">Loading...</CardContent>
            </Card>
          )}

          {!loading && !days.length && (
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardContent className="p-6 text-gray-500">No daily tasks yet.</CardContent>
            </Card>
          )}

          {!loading &&
            days.map((d) => {
              const total = d.tasks?.length ?? 0;
              const done = d.tasks?.filter((t) => t.completed).length ?? 0;
              return (
                <Card key={d.id} className="border-none shadow-sm rounded-[2rem]">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{toDisplayDate(d.date)}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-gray-600">
                      {done}/{total} completed
                    </div>
                    <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                      <Link to={`/daily-planner?date=${encodeURIComponent(d.date)}`}>Open</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default DailyPlannerHistory;
