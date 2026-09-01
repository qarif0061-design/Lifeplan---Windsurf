import Layout from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showSuccess } from "@/utils/toast";
import { useUser } from "@/contexts/UserContext";
import { createWeeklyPlan, updateWeeklyPlan, type WeeklyPlan } from "@/firebase/plans";
import { useWeeklyPlans } from "@/hooks/useWeeklyPlans";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return String(yyyy) + "-" + mm + "-" + dd;
};

const weekStartMonday = (date: Date): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return toDateKeyLocal(d);
};

const Planning = () => {
  const { user, isPremium } = useUser();
  const navigate = useNavigate();
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
  const [showEditor, setShowEditor] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const mergedPlan: WeeklyPlan | null = useMemo(() => {
    if (!currentPlan) return null;
    return currentPlan;
  }, [currentPlan]);

  useEffect(() => {
    if (!mergedPlan) return;
    setPriority1(mergedPlan.priorities?.[0] ?? "");
    setPriority2(mergedPlan.priorities?.[1] ?? "");
    setPriority3(mergedPlan.priorities?.[2] ?? "");
  }, [mergedPlan?.id]);

  const openEditor = () => {
    setShowEditor(true);
  };

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
          <h1 className="text-3xl font-bold text-foreground">Weekly Planning</h1>
          <p className="text-muted-foreground">Turn goals into weekly actions.</p>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Preview Weekly Planning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!mergedPlan ? (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-5">
                <p className="font-semibold text-foreground">No weekly plan set yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Set your weekly priorities and tasks to stay on track.</p>
                <Button onClick={openEditor} className="mt-4 rounded-full bg-primary hover:bg-primary/90">
                  Set Weekly Plan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Week of</p>
                    <p className="text-lg font-bold text-foreground">{mergedPlan.weekStart}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-full" onClick={openEditor}>
                      Edit Weekly Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        if (!isPremium) {
                          showError("Weekly plan history is a Premium feature. Upgrade to access your past plans.");
                          navigate("/pricing");
                          return;
                        }
                        setIsHistoryOpen(true);
                      }}
                    >
                      {!isPremium && <Lock className="w-4 h-4 mr-2" />}
                      History
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Top priorities</p>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {(mergedPlan.priorities ?? []).length ? (
                        (mergedPlan.priorities ?? []).map((p, idx) => (
                          <div key={String(idx) + "-" + p} className="whitespace-pre-wrap">{idx + 1}. {p}</div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">No priorities yet.</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">Tasks</p>
                    <div className="mt-2 space-y-2">
                      {(mergedPlan.tasks ?? []).length ? (
                        (mergedPlan.tasks ?? []).slice(0, 6).map((t) => (
                          <div key={t.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                            <span className={t.completed ? "text-muted-foreground/70 line-through" : "text-foreground"}>{t.title}</span>
                            <span className="text-xs font-medium text-muted-foreground">{t.completed ? "Done" : "Pending"}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">No tasks yet.</div>
                      )}
                      {(mergedPlan.tasks ?? []).length > 6 && (
                        <div className="text-sm text-muted-foreground">+{(mergedPlan.tasks ?? []).length - 6} more</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={isHistoryOpen}
          onOpenChange={(next) => {
            if (next && !isPremium) {
              showError("Weekly plan history is a Premium feature. Upgrade to access your past plans.");
              navigate("/pricing");
              return;
            }
            setIsHistoryOpen(next);
          }}
        >
          <DialogContent className="sm:max-w-[720px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle>Weekly Plan History</DialogTitle>
              <DialogDescription>Review your previous weekly plans.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-y-auto space-y-4 pr-2">
              {plans.length ? (
                plans.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Week of</p>
                        <p className="font-bold text-foreground">{p.weekStart}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          if (p.weekStart === currentWeekStart) {
                            openEditor();
                            setIsHistoryOpen(false);
                            return;
                          }
                          setPriority1(p.priorities?.[0] ?? "");
                          setPriority2(p.priorities?.[1] ?? "");
                          setPriority3(p.priorities?.[2] ?? "");
                          setIsHistoryOpen(false);
                          setShowEditor(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground space-y-1">
                      {(p.priorities ?? []).length ? (
                        (p.priorities ?? []).map((pr, idx) => (
                          <div key={p.id + "-p-" + String(idx)} className="whitespace-pre-wrap">{idx + 1}. {pr}</div>
                        ))
                      ) : (
                        <div className="text-muted-foreground">No priorities saved.</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
                  No weekly plans yet.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {showEditor && (
          <Card className="border-none shadow-sm rounded-[2.5rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Week of {currentWeekStart}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label>Top Priorities (1-3)</Label>
                <Input value={priority1} onChange={(e) => setPriority1(e.target.value)} className="rounded-xl" placeholder="Priority 1" />
                <Input value={priority2} onChange={(e) => setPriority2(e.target.value)} className="rounded-xl" placeholder="Priority 2" />
                <Input value={priority3} onChange={(e) => setPriority3(e.target.value)} className="rounded-xl" placeholder="Priority 3" />
                <Button onClick={handleSavePriorities} disabled={saving} className="rounded-full bg-primary hover:bg-primary/90 w-fit">
                  Save Priorities
                </Button>
              </div>

              <div className="pt-2 border-t border-border" />

              <div className="grid gap-3">
                <Label>Tasks</Label>
                <div className="flex gap-2">
                  <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="rounded-xl" placeholder="Add a task" />
                  <Button onClick={handleAddTask} disabled={saving} className="rounded-xl bg-primary hover:bg-primary/90">
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {(mergedPlan?.tasks ?? []).map((t) => (
                    <label key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                      <input type="checkbox" checked={t.completed} onChange={() => handleToggleTask(t.id)} />
                      <span className={t.completed ? "text-muted-foreground/70 line-through" : "text-foreground"}>{t.title}</span>
                    </label>
                  ))}
                  {!mergedPlan?.tasks?.length && <div className="text-sm text-muted-foreground">No tasks yet.</div>}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Planning;