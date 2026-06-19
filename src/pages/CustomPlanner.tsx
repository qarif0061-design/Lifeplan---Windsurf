import Layout from "@/components/Layout";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  RotateCcw,
  Copy,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  ListTodo,
  ArrowLeft,
  Pencil,
  Check,
  X,
  FilePlus,
  Minus,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useWeeklyPlans } from "@/hooks/useWeeklyPlans";
import {
  subscribeCustomPlanners,
  createCustomPlanner,
  deleteCustomPlanner,
  updateCustomPlanner,
  addTaskToDay,
  updateTaskInDay,
  deleteTaskFromDay,
  cloneCustomPlanner,
  resetCustomPlanner,
  addDaysToPlanner,
  removeDaysFromPlanner,
  type CustomPlanner,
  type CustomPlannerDay,
} from "@/firebase/customPlanner";
import { type WeeklyPlan, updateWeeklyPlan, deleteWeeklyPlan, resetWeeklyPlan } from "@/firebase/plans";
import { toast } from "sonner";

const DAY_PRESETS = [
  { label: "1 Week", value: 7 },
  { label: "2 Weeks", value: 14 },
  { label: "3 Weeks", value: 21 },
  { label: "1 Month", value: 30 },
  { label: "Custom", value: -1 },
];

const fmtWeekStart = (ws: unknown): string => {
  if (typeof ws === "string") return ws;
  if (ws && typeof ws === "object" && "seconds" in ws) {
    const d = new Date((ws as { seconds: number }).seconds * 1000);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return String(ws ?? "");
};

const fmtDisplay = (ws: unknown): string => {
  let d: Date;
  if (typeof ws === "string") {
    d = new Date(ws + "T00:00:00");
  } else if (ws && typeof ws === "object" && "seconds" in ws) {
    d = new Date((ws as { seconds: number }).seconds * 1000);
  } else {
    return String(ws ?? "");
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const toCustomPlanner = (plan: WeeklyPlan): CustomPlanner => {
  const data = plan as Record<string, unknown>;
  const ws = fmtWeekStart(data.weekStart);
  const title =
    (typeof data.title === "string" && data.title.trim()) ||
    (typeof data.name === "string" && data.name.trim()) ||
    (typeof data.planName === "string" && data.planName.trim()) ||
    (typeof data.planTitle === "string" && data.planTitle.trim()) ||
    (typeof data.plannerTitle === "string" && data.plannerTitle.trim()) ||
    (typeof data.plan_name === "string" && data.plan_name.trim()) ||
    `Plan - ${fmtDisplay(data.weekStart)}`;
  return {
    id: `${plan.id}__from_plans`,
    userId: plan.userId,
    title,
    dayCount: 1,
    days: [{
      dayNumber: 1,
      title: "Day 1",
      priorities: plan.priorities || [],
      tasks: (plan.tasks || []).map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
      })),
      notes: "",
    }],
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  };
};

const CustomPlannerPage = () => {
  const { user } = useUser();
  const { plans: weeklyPlans, loading: weeklyPlansLoading } = useWeeklyPlans();
  const [planners, setPlanners] = useState<CustomPlanner[]>([]);
  const [selectedPlanner, setSelectedPlanner] = useState<CustomPlanner | null>(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);

  const isFromPlans = (id: string) => id.endsWith("__from_plans");

  const [showCreate, setShowCreate] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createDays, setCreateDays] = useState(7);
  const [createCustomDays, setCreateCustomDays] = useState(21);
  const [createPreset, setCreatePreset] = useState("7");

  const [editingTitle, setEditingTitle] = useState(false);
  const [editTitleVal, setEditTitleVal] = useState("");

  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, string>>({});
  const [editingPriorities, setEditingPriorities] = useState<Record<string, string[]>>({});
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [savingDay, setSavingDay] = useState<Record<string, boolean>>({});

  const [showDelete, setShowDelete] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showAddDays, setShowAddDays] = useState(false);
  const [addDaysCount, setAddDaysCount] = useState(7);
  const [showRemoveDays, setShowRemoveDays] = useState(false);
  const [removeDaysCount, setRemoveDaysCount] = useState(7);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    const unsub = subscribeCustomPlanners(
      user.id,
      (data) => {
        setPlanners(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    return unsub;
  }, [user?.id]);

  const convertedPlans = useMemo(() => {
    const seen = new Map<string, CustomPlanner>();
    for (const plan of weeklyPlans) {
      const cp = toCustomPlanner(plan);
      const key = cp.days[0].title;
      const existing = seen.get(key);
      if (!existing) {
        seen.set(key, cp);
      } else {
        const existingTasks = existing.days[0].tasks.length;
        const newTasks = cp.days[0].tasks.length;
        if (newTasks > existingTasks) {
          seen.set(key, cp);
        }
      }
    }
    return Array.from(seen.values());
  }, [weeklyPlans]);

  const allPlanners = useMemo(() => {
    const merged = [...planners, ...convertedPlans];
    merged.sort((a, b) => {
      const aTime = (a.createdAt as any)?.toMillis?.() ?? 0;
      const bTime = (b.createdAt as any)?.toMillis?.() ?? 0;
      return bTime - aTime;
    });
    return merged;
  }, [planners, convertedPlans]);

  useEffect(() => {
    if (selectedPlanner) {
      const updated = allPlanners.find((p) => p.id === selectedPlanner.id);
      if (updated) setSelectedPlanner(updated);
    }
  }, [allPlanners]);

  const handleCreate = useCallback(async () => {
    if (!user?.id || !createTitle.trim()) return;
    const dayCount = createPreset === "-1" ? createCustomDays : parseInt(createPreset);
    try {
      const planner = await createCustomPlanner(user.id, createTitle.trim(), dayCount);
      setPlanners((prev) => [planner, ...prev]);
      setSelectedPlanner(planner);
      setShowCreate(false);
      setCreateTitle("");
      setCreatePreset("7");
      toast.success("Custom planner created!");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("createCustomPlanner failed:", msg);
      toast.error(`Failed to create planner: ${msg}`);
    }
  }, [user?.id, createTitle, createPreset, createCustomDays]);

  const handleDelete = useCallback(async () => {
    if (!selectedPlanner) return;
    try {
      if (isFromPlans(selectedPlanner.id)) {
        await deleteWeeklyPlan(originalPlanId(selectedPlanner.id));
      } else {
        await deleteCustomPlanner(selectedPlanner.id);
      }
      setSelectedPlanner(null);
      setShowDelete(false);
      toast.success("Planner deleted");
    } catch (e) {
      console.error("delete failed:", e);
      toast.error("Failed to delete planner");
    }
  }, [selectedPlanner]);

  const handleClone = useCallback(async () => {
    if (!selectedPlanner || !user?.id) return;
    try {
      await cloneCustomPlanner(selectedPlanner.id, user.id);
      toast.success("Planner cloned!");
    } catch (e) {
      console.error("cloneCustomPlanner failed:", e);
      toast.error("Failed to clone planner");
    }
  }, [selectedPlanner, user?.id]);

  const handleReset = useCallback(async () => {
    if (!selectedPlanner) return;
    try {
      if (isFromPlans(selectedPlanner.id)) {
        await resetWeeklyPlan(originalPlanId(selectedPlanner.id));
      } else {
        await resetCustomPlanner(selectedPlanner.id);
      }
      setShowReset(false);
      toast.success("Planner reset");
    } catch (e) {
      console.error("reset failed:", e);
      toast.error("Failed to reset planner");
    }
  }, [selectedPlanner]);

  const handleSaveTitle = useCallback(async () => {
    if (!selectedPlanner || !editTitleVal.trim()) return;
    try {
      await updateCustomPlanner(selectedPlanner.id, { title: editTitleVal.trim() });
      setEditingTitle(false);
      toast.success("Title updated");
    } catch (e) {
      console.error("saveTitle failed:", e);
      toast.error("Failed to update title");
    }
  }, [selectedPlanner, editTitleVal]);

  const handleAddDays = useCallback(async () => {
    if (!selectedPlanner) return;
    try {
      await addDaysToPlanner(selectedPlanner.id, addDaysCount);
      setShowAddDays(false);
      toast.success(`Added ${addDaysCount} days`);
    } catch (e) {
      console.error("addDaysToPlanner failed:", e);
      toast.error("Failed to add days");
    }
  }, [selectedPlanner, addDaysCount]);

  const handleRemoveDays = useCallback(async () => {
    if (!selectedPlanner) return;
    try {
      await removeDaysFromPlanner(selectedPlanner.id, removeDaysCount);
      setShowRemoveDays(false);
      toast.success(`Removed ${removeDaysCount} days`);
    } catch (e) {
      console.error("removeDaysFromPlanner failed:", e);
      toast.error("Failed to remove days");
    }
  }, [selectedPlanner, removeDaysCount]);

  const toggleDay = (dayIndex: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayIndex)) next.delete(dayIndex);
      else next.add(dayIndex);
      return next;
    });
  };

  const originalPlanId = (id: string) => id.replace("__from_plans", "");

  const handleAddTask = useCallback(
    async (dayIndex: number) => {
      if (!selectedPlanner) return;
      const key = `${selectedPlanner.id}-${dayIndex}`;
      const title = (newTaskInputs[key] || "").trim();
      if (!title) return;

      try {
        if (isFromPlans(selectedPlanner.id)) {
          const pid = originalPlanId(selectedPlanner.id);
          const day = selectedPlanner.days[dayIndex];
          if (!day) return;
          const newTask = { id: crypto.randomUUID(), title, completed: false };
          await updateWeeklyPlan(pid, { tasks: [...day.tasks, newTask] });
        } else {
          await addTaskToDay(selectedPlanner.id, dayIndex, { title, completed: false });
        }
        setNewTaskInputs((prev) => ({ ...prev, [key]: "" }));
      } catch {
        toast.error("Failed to add task");
      }
    },
    [selectedPlanner, newTaskInputs]
  );

  const handleToggleTask = useCallback(
    async (dayIndex: number, taskId: string, completed: boolean) => {
      if (!selectedPlanner) return;
      try {
        if (isFromPlans(selectedPlanner.id)) {
          const pid = originalPlanId(selectedPlanner.id);
          const day = selectedPlanner.days[dayIndex];
          if (!day) return;
          await updateWeeklyPlan(pid, {
            tasks: day.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !completed } : t
            ),
          });
        } else {
          await updateTaskInDay(selectedPlanner.id, dayIndex, taskId, { completed: !completed });
        }
      } catch {
        toast.error("Failed to update task");
      }
    },
    [selectedPlanner]
  );

  const handleDeleteTask = useCallback(
    async (dayIndex: number, taskId: string) => {
      if (!selectedPlanner) return;
      try {
        if (isFromPlans(selectedPlanner.id)) {
          const pid = originalPlanId(selectedPlanner.id);
          const day = selectedPlanner.days[dayIndex];
          if (!day) return;
          await updateWeeklyPlan(pid, {
            tasks: day.tasks.filter((t) => t.id !== taskId),
          });
        } else {
          await deleteTaskFromDay(selectedPlanner.id, dayIndex, taskId);
        }
      } catch {
        toast.error("Failed to delete task");
      }
    },
    [selectedPlanner]
  );

  const handleSaveDay = useCallback(
    async (dayIndex: number) => {
      if (!selectedPlanner) return;
      const dayKey = `${selectedPlanner.id}-${dayIndex}`;
      const day = selectedPlanner.days[dayIndex];
      if (!day) return;

      setSavingDay((prev) => ({ ...prev, [dayKey]: true }));
      try {
        const priorities = editingPriorities[dayKey] ?? day.priorities;

        if (isFromPlans(selectedPlanner.id)) {
          const pid = originalPlanId(selectedPlanner.id);
          await updateWeeklyPlan(pid, { priorities: priorities.slice(0, 3) });
        } else {
          const notes = editingNotes[dayKey] ?? day.notes;
          await updateCustomPlanner(selectedPlanner.id, {
            days: selectedPlanner.days.map((d, i) =>
              i === dayIndex ? { ...d, priorities: priorities.slice(0, 3), notes } : d
            ),
          });
        }
        toast.success("Day saved");
      } catch {
        toast.error("Failed to save day");
      } finally {
        setSavingDay((prev) => ({ ...prev, [dayKey]: false }));
      }
    },
    [selectedPlanner, editingPriorities, editingNotes]
  );

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12 text-slate-500">Please sign in to use the Custom Planner.</div>
      </Layout>
    );
  }

  if (loading || weeklyPlansLoading) {
    return (
      <Layout>
        <div className="text-center py-12 text-slate-500">Loading planners...</div>
      </Layout>
    );
  }

  if (selectedPlanner) {
    const planner = selectedPlanner;
    const fromMobile = isFromPlans(planner.id);
    const completedTasks = planner.days.reduce(
      (sum, d) => sum + d.tasks.filter((t) => t.completed).length,
      0
    );
    const totalTasks = planner.days.reduce((sum, d) => sum + d.tasks.length, 0);
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="ghost" size="icon" onClick={() => setSelectedPlanner(null)} className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>

            {!fromMobile && editingTitle ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Input
                  value={editTitleVal}
                  onChange={(e) => setEditTitleVal(e.target.value)}
                  className="max-w-xs"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") setEditingTitle(false);
                  }}
                />
                <Button size="sm" variant="ghost" onClick={handleSaveTitle}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingTitle(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                {planner.title}
                {fromMobile && <Badge variant="secondary" className="text-xs">From Mobile App</Badge>}
              </h2>
            )}

            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {planner.dayCount} days
              </Badge>
              <Badge variant="outline" className="text-xs">
                {completedTasks}/{totalTasks} tasks
              </Badge>
              {progress > 0 && (
                <Badge className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {progress}% done
                </Badge>
              )}

              <>
                <Button variant="outline" size="sm" onClick={() => setPreview(!preview)}>
                  {preview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                  {preview ? "Edit" : "Preview"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleClone}>
                  <Copy className="w-4 h-4 mr-1" /> Clone
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowReset(true)}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
                {!fromMobile && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setShowAddDays(true)}>
                      <Plus className="w-4 h-4 mr-1" /> Add Days
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowRemoveDays(true)}>
                      <Minus className="w-4 h-4 mr-1" /> Remove Days
                    </Button>
                  </>
                )}
                <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </>
            </div>
          </div>

          {preview ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {planner.days.map((day, idx) => (
                <Card key={idx} className="bg-white/50">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-semibold text-slate-700">
                      {day.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-2">
                    {day.priorities.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {day.priorities.map((p, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {day.tasks.length > 0 ? (
                      <ul className="space-y-1">
                        {day.tasks.map((task) => (
                          <li key={task.id} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className={task.completed ? "line-through text-slate-400" : ""}>
                              {task.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No tasks</p>
                    )}
                    {day.notes && (
                      <p className="text-xs text-slate-500 italic line-clamp-2">{day.notes}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {planner.days.map((day, idx) => {
                const dayKey = `${planner.id}-${idx}`;
                const isExpanded = expandedDays.has(idx);
                const dayTasks = day.tasks || [];
                const dayCompleted = dayTasks.filter((t) => t.completed).length;
                const priorities = editingPriorities[dayKey] ?? day.priorities;
                const notes = editingNotes[dayKey] ?? day.notes;
                const isSaving = savingDay[dayKey];

                return (
                  <Card key={idx} className="bg-white/50">
                    <div
                      className="flex items-center gap-3 p-4 cursor-pointer select-none"
                      onClick={() => toggleDay(idx)}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="font-medium text-slate-700 text-sm">{day.title}</span>
                      {dayTasks.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {dayCompleted}/{dayTasks.length}
                        </Badge>
                      )}
                      {day.notes && (
                        <span className="text-xs text-slate-400 italic truncate max-w-[200px]">
                          {day.notes}
                        </span>
                      )}
                    </div>

                    {isExpanded && (
                      <CardContent className="p-4 pt-0 space-y-4">
                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">
                            Priorities (max 3)
                          </label>
                          <div className="space-y-1">
                            {[0, 1, 2].map((i) => (
                              <Input
                                key={i}
                                placeholder={`Priority ${i + 1}`}
                                value={priorities[i] || ""}
                                onChange={(e) => {
                                  const next = [...priorities];
                                  next[i] = e.target.value;
                                  setEditingPriorities((prev) => ({ ...prev, [dayKey]: next }));
                                }}
                                className="h-8 text-sm"
                                disabled={preview}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-medium text-slate-500 mb-1 block">
                            Tasks
                          </label>
                          <div className="space-y-1">
                            {dayTasks.map((task) => (
                              <div key={task.id} className="flex items-center gap-2 group">
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={() => handleToggleTask(idx, task.id, task.completed)}
                                  className="rounded border-slate-300"
                                />
                                <span
                                  className={`flex-1 text-sm ${
                                    task.completed ? "line-through text-slate-400" : "text-slate-700"
                                  }`}
                                >
                                  {task.title}
                                </span>
                                {!preview && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100"
                                    onClick={() => handleDeleteTask(idx, task.id)}
                                  >
                                    <Trash2 className="w-3 h-3 text-red-400" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                          {!preview && (
                            <div className="flex items-center gap-2 mt-2">
                              <Input
                                placeholder="Add a task..."
                                value={newTaskInputs[dayKey] || ""}
                                onChange={(e) =>
                                  setNewTaskInputs((prev) => ({ ...prev, [dayKey]: e.target.value }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleAddTask(idx);
                                }}
                                className="h-8 text-sm flex-1"
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAddTask(idx)}
                                disabled={!newTaskInputs[dayKey]?.trim()}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {!fromMobile && (
                          <div>
                            <label className="text-xs font-medium text-slate-500 mb-1 block">
                              Notes
                            </label>
                            <Textarea
                              placeholder="Notes for this day..."
                              value={notes}
                              onChange={(e) =>
                                setEditingNotes((prev) => ({ ...prev, [dayKey]: e.target.value }))
                              }
                              className="text-sm min-h-[60px]"
                              disabled={preview}
                            />
                          </div>
                        )}

                        {!preview && (
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleSaveDay(idx)}
                              disabled={isSaving}
                            >
                              {isSaving ? "Saving..." : "Save Day"}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Dialog open={showDelete} onOpenChange={setShowDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Planner</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{planner.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showReset} onOpenChange={setShowReset}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Planner</DialogTitle>
              <DialogDescription>
                This will clear all tasks, priorities, and notes from "{planner.title}". The day structure will be preserved.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReset(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                Reset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddDays} onOpenChange={setShowAddDays}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Days</DialogTitle>
              <DialogDescription>
                How many days would you like to add to this planner?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select
                value={String(addDaysCount)}
                onValueChange={(v) => setAddDaysCount(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 3, 7, 14, 21, 30].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} day{n > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDays(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDays}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showRemoveDays} onOpenChange={setShowRemoveDays}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Days</DialogTitle>
              <DialogDescription>
                How many days to remove from the end of this planner?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Select
                value={String(removeDaysCount)}
                onValueChange={(v) => setRemoveDaysCount(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 3, 7, 14].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} day{n > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRemoveDays(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRemoveDays}>
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Custom Planner</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create reusable planners for any duration — 3 weeks, 1 month, or your own custom length.
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Planner
          </Button>
        </div>

        {allPlanners.length === 0 ? (
          <Card className="bg-white/50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-500 mb-2">No custom planners yet</p>
              <p className="text-sm text-slate-400 mb-4">
                Create a planner for a 3-week challenge, a 30-day goal, or any duration you need.
              </p>
              <Button onClick={() => setShowCreate(true)}>
                <Plus className="w-4 h-4 mr-2" /> Create Your First Planner
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPlanners.map((planner) => {
              const completed = planner.days.reduce(
                (s, d) => s + d.tasks.filter((t) => t.completed).length,
                0
              );
              const total = planner.days.reduce((s, d) => s + d.tasks.length, 0);
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <Card
                  key={planner.id}
                  className="bg-white/50 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPlanner(planner)}
                >
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-base font-semibold text-slate-800 truncate">
                      {planner.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {planner.dayCount} days
                      </span>
                      <span className="flex items-center gap-1">
                        <ListTodo className="w-4 h-4" />
                        {completed}/{total}
                      </span>
                    </div>
                    {total > 0 && (
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Planner</DialogTitle>
              <DialogDescription>
                Set a name and choose how many days your planner should cover.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Planner Name</label>
                <Input
                  placeholder="e.g. 30-Day Fitness Challenge"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Duration</label>
                <Select value={createPreset} onValueChange={setCreatePreset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAY_PRESETS.map((p) => (
                      <SelectItem key={p.value} value={String(p.value)}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {createPreset === "-1" && (
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Number of Days
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    value={createCustomDays}
                    onChange={(e) => setCreateCustomDays(parseInt(e.target.value) || 1)}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!createTitle.trim()}>
                <FilePlus className="w-4 h-4 mr-2" /> Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CustomPlannerPage;
