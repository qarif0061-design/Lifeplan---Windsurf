import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { useUser } from "@/contexts/UserContext";
import { createWeeklyPlan, updateWeeklyPlan, type WeeklyPlan } from "@/firebase/plans";
import { useWeeklyPlans } from "@/hooks/useWeeklyPlans";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const weekStartMonday = (date: Date): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return toDateKeyLocal(d);
};

const Planning = () => {
  const { user } = useUser();
  const { plans } = useWeeklyPlans();

  const currentWeekStart = useMemo(() => weekStartMonday(new Date()), []);
  const currentPlan = useMemo(
    () => plans.find((p) => p.weekStart === currentWeekStart),
    [plans, currentWeekStart],
  );

  const [priority1, setPriority1] = useState("");
  const [priority2, setPriority2] = useState("");
  const [priority3, setPriority3] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const mergedPlan: WeeklyPlan | null = useMemo(() => {
    if (!currentPlan) return null;
    return currentPlan;
  }, [currentPlan]);

  const handleSavePriorities = async () => {
    if (!user) {
      showError("Please sign in to plan your week.");
      return;
    }

    const priorities = [priority1, priority2, priority3].map((p) => p.trim()).filter(Boolean);
    setSaving(true);
    try {
      if (!mergedPlan) {
        await createWeeklyPlan({
          userId: user.id,
          weekStart: currentWeekStart,
          priorities,
          tasks: [],
        });
      } else {
        await updateWeeklyPlan(mergedPlan.id, { priorities });
      }
      showSuccess("Weekly priorities saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save priorities";
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!user) {
      showError("Please sign in to plan your week.");
      return;
    }
    if (!taskTitle.trim()) return;

    setSaving(true);
    try {
      const nextTask = { id: crypto.randomUUID(), title: taskTitle.trim(), completed: false };
      if (!mergedPlan) {
        await createWeeklyPlan({
          userId: user.id,
          weekStart: currentWeekStart,
          priorities: [],
          tasks: [nextTask],
        });
      } else {
        await updateWeeklyPlan(mergedPlan.id, { tasks: [...mergedPlan.tasks, nextTask] });
      }
      setTaskTitle("");
      showSuccess("Task added!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to add task";
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!mergedPlan) return;
    setSaving(true);
    try {
      const next = mergedPlan.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      await updateWeeklyPlan(mergedPlan.id, { tasks: next });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update task";
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weekly Planning</h1>
          <p className="text-gray-500">Turn goals into weekly actions.</p>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Week of {currentWeekStart}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3">
              <Label>Top Priorities (1–3)</Label>
              <Input value={priority1} onChange={(e) => setPriority1(e.target.value)} className="rounded-xl" placeholder="Priority 1" />
              <Input value={priority2} onChange={(e) => setPriority2(e.target.value)} className="rounded-xl" placeholder="Priority 2" />
              <Input value={priority3} onChange={(e) => setPriority3(e.target.value)} className="rounded-xl" placeholder="Priority 3" />
              <Button onClick={handleSavePriorities} disabled={saving} className="rounded-full bg-blue-600 hover:bg-blue-700 w-fit">
                Save Priorities
              </Button>
            </div>

            <div className="pt-2 border-t border-gray-100" />

            <div className="grid gap-3">
              <Label>Tasks</Label>
              <div className="flex gap-2">
                <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="rounded-xl" placeholder="Add a task" />
                <Button onClick={handleAddTask} disabled={saving} className="rounded-xl bg-blue-600 hover:bg-blue-700">
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {(mergedPlan?.tasks ?? []).map((t) => (
                  <label key={t.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                    <input type="checkbox" checked={t.completed} onChange={() => handleToggleTask(t.id)} />
                    <span className={t.completed ? "text-gray-400 line-through" : "text-gray-900"}>{t.title}</span>
                  </label>
                ))}
                {!mergedPlan?.tasks?.length && <div className="text-sm text-gray-500">No tasks yet.</div>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Planning;