import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { useUser } from "@/contexts/UserContext";
import {
  updateDailyTaskDay,
  updateDailyTaskDayTasks,
  type DailyCallEmailItem,
  type DailyPriorityItem,
  type DailyTaskItem,
} from "@/firebase/dailyTasks";
import { showError, showSuccess } from "@/utils/toast";
import { Calendar as CalendarIcon, History, Pencil, Plus, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const toDateKeyLocal = (d: Date): string => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const toDisplayDate = (key: string): string => {
  const [yyyy, mm, dd] = key.split("-");
  return `${dd}/${mm}/${yyyy}`;
};

const newTaskId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const scheduleHours = Array.from({ length: 18 }, (_, i) => String(i + 6).padStart(2, "0") + ":00");

const normalizeTop3 = (items?: DailyPriorityItem[]): DailyPriorityItem[] => {
  const now = new Date().toISOString();
  const base = items ? [...items] : [];
  while (base.length < 3) {
    base.push({ id: newTaskId(), title: "", completed: false, createdAt: now, updatedAt: now });
  }
  return base.slice(0, 3);
};

const normalizeCallEmail3 = (items?: DailyCallEmailItem[]): DailyCallEmailItem[] => {
  const now = new Date().toISOString();
  const base = items ? [...items] : [];
  while (base.length < 3) {
    base.push({ id: newTaskId(), title: "", completed: false, createdAt: now, updatedAt: now });
  }
  return base.slice(0, 3);
};

const DailyPlanner = () => {
  const { user, isPremium } = useUser();
  const { days, distinctDates, freeLimit, canCreateNewDate } = useDailyTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFromQuery = searchParams.get("date") ?? undefined;

  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => {
    if (dateFromQuery && /^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)) return dateFromQuery;
    return toDateKeyLocal(new Date());
  });

  useEffect(() => {
    if (!dateFromQuery) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateFromQuery)) return;
    setSelectedDateKey(dateFromQuery);
  }, [dateFromQuery]);

  const selectedDay = useMemo(
    () => days.find((d) => d.date === selectedDateKey),
    [days, selectedDateKey],
  );

  const selectedTasks = selectedDay?.tasks ?? [];

  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [priorities, setPriorities] = useState<DailyPriorityItem[]>(() => normalizeTop3(undefined));
  const [reminder, setReminder] = useState("");
  const [callEmail, setCallEmail] = useState<DailyCallEmailItem[]>(() => normalizeCallEmail3(undefined));
  const [forTomorrow, setForTomorrow] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [notes, setNotes] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingTaskId(null);
    setTaskTitle("");
    setDialogOpen(true);
  };

  const openEdit = (t: DailyTaskItem) => {
    setEditingTaskId(t.id);
    setTaskTitle(t.title);
    setDialogOpen(true);
  };

  const canWriteToSelectedDate = useMemo(() => {
    if (isPremium) return true;
    if (distinctDates.includes(selectedDateKey)) return true;
    return canCreateNewDate;
  }, [isPremium, distinctDates, selectedDateKey, canCreateNewDate]);

  const limitMessage = useMemo(() => {
    if (isPremium) return null;
    if (canWriteToSelectedDate) return null;
    return `Free users can add daily tasks for up to ${freeLimit} days. Upgrade to Premium for unlimited daily tasks.`;
  }, [isPremium, canWriteToSelectedDate, freeLimit]);

  const persistTasks = async (nextTasks: DailyTaskItem[]) => {
    if (!user) {
      showError("Please sign in to manage your daily tasks.");
      return;
    }
    setSaving(true);
    try {
      await updateDailyTaskDayTasks(user.id, selectedDateKey, nextTasks);
    } catch (e: unknown) {
      const raw = e instanceof Error ? e.message : "Failed to save daily tasks";
      const message = raw.toLowerCase().includes("insufficient permissions")
        ? "Missing or insufficient permissions. Update your Firestore rules to allow authenticated users to write their own daily tasks."
        : raw;
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  const persistDay = async () => {
    if (!user) {
      showError("Please sign in to manage your daily planner.");
      return;
    }

    if (!canWriteToSelectedDate) {
      showError(limitMessage ?? "Upgrade to Premium to add more daily tasks.");
      return;
    }

    setSaving(true);
    try {
      await updateDailyTaskDay(user.id, selectedDateKey, {
        schedule,
        priorities,
        reminder: reminder.trim() ? reminder.trim() : "",
        callEmail,
        forTomorrow: forTomorrow.trim() ? forTomorrow.trim() : "",
        affirmation: affirmation.trim() ? affirmation.trim() : "",
        notes: notes.trim() ? notes.trim() : "",
      });
      showSuccess("Daily planner saved.");
    } catch (e: unknown) {
      const raw = e instanceof Error ? e.message : "Failed to save daily planner";
      const message = raw.toLowerCase().includes("insufficient permissions")
        ? "Missing or insufficient permissions. Update your Firestore rules to allow authenticated users to write their own daily tasks."
        : raw;
      showError(message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const nextSchedule: Record<string, string> = {};
    for (const h of scheduleHours) {
      nextSchedule[h] = selectedDay?.schedule?.[h] ?? "";
    }
    setSchedule(nextSchedule);
    setPriorities(normalizeTop3(selectedDay?.priorities));
    setReminder(selectedDay?.reminder ?? "");
    setCallEmail(normalizeCallEmail3(selectedDay?.callEmail));
    setForTomorrow(selectedDay?.forTomorrow ?? "");
    setAffirmation(selectedDay?.affirmation ?? "");
    setNotes(selectedDay?.notes ?? "");
  }, [selectedDateKey, selectedDay]);

  const handleSaveTask = async () => {
    if (!taskTitle.trim()) {
      showError("Please enter a task.");
      return;
    }

    if (!canWriteToSelectedDate) {
      showError(limitMessage ?? "Upgrade to Premium to add more daily tasks.");
      return;
    }

    const now = new Date().toISOString();
    const next: DailyTaskItem[] = [...selectedTasks];

    if (editingTaskId) {
      const idx = next.findIndex((t) => t.id === editingTaskId);
      if (idx === -1) {
        showError("Task not found.");
        return;
      }
      next[idx] = { ...next[idx], title: taskTitle.trim(), updatedAt: now };
    } else {
      next.push({ id: newTaskId(), title: taskTitle.trim(), completed: false, createdAt: now, updatedAt: now });
    }

    await persistTasks(next);
    setDialogOpen(false);
    showSuccess(editingTaskId ? "Task updated." : "Task added.");
  };

  const handleToggle = async (taskId: string) => {
    const now = new Date().toISOString();
    const next = selectedTasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed, updatedAt: now } : t));
    await persistTasks(next);
  };

  const handleDelete = async (taskId: string) => {
    const next = selectedTasks.filter((t) => t.id !== taskId);
    await persistTasks(next);
    showSuccess("Task deleted.");
  };

  const selectedDateObj = useMemo(() => {
    const [yyyy, mm, dd] = selectedDateKey.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
  }, [selectedDateKey]);

  const headerSubtitle = useMemo(() => {
    if (isPremium) return "Plan your day and track what matters.";
    return `Free plan: daily tasks for up to ${freeLimit} days. Upgrade for unlimited.`;
  }, [isPremium, freeLimit]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daily Planner</h1>
            <p className="text-gray-500">{headerSubtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/daily-planner/history">
                <History className="w-4 h-4 mr-2" /> History
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={persistDay}
              disabled={!canWriteToSelectedDate || saving}
            >
              {saving ? "Saving..." : "Save Day"}
            </Button>
            <Button onClick={openAdd} className="rounded-full bg-blue-600 hover:bg-blue-700" disabled={!canWriteToSelectedDate || saving}>
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Date</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row md:items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {toDisplayDate(selectedDateKey)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateObj}
                  onSelect={(d) => {
                    if (!d) return;
                    const key = toDateKeyLocal(d);
                    setSelectedDateKey(key);
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.set("date", key);
                      return next;
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {!canWriteToSelectedDate && (
              <div className="text-sm text-gray-600">
                {limitMessage} <Link className="text-blue-600 hover:underline" to="/pricing">Upgrade</Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduleHours.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <div className="w-14 text-xs font-semibold text-gray-500">{h}</div>
                    <Input
                      value={schedule[h] ?? ""}
                      onChange={(e) =>
                        setSchedule((prev) => ({
                          ...prev,
                          [h]: e.target.value,
                        }))
                      }
                      className="rounded-xl"
                      placeholder=""
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[160px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Top 3 Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {priorities.map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={p.completed}
                      onChange={() => {
                        const now = new Date().toISOString();
                        setPriorities((prev) =>
                          prev.map((x) => (x.id === p.id ? { ...x, completed: !x.completed, updatedAt: now } : x)),
                        );
                      }}
                      disabled={saving}
                    />
                    <Input
                      value={p.title}
                      onChange={(e) => {
                        const now = new Date().toISOString();
                        setPriorities((prev) =>
                          prev.map((x, i) => (i === idx ? { ...x, title: e.target.value, updatedAt: now } : x)),
                        );
                      }}
                      className="rounded-xl"
                      placeholder={idx === 0 ? "Priority 1" : idx === 1 ? "Priority 2" : "Priority 3"}
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Reminder</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">To Call / Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {callEmail.map((c, idx) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={c.completed}
                      onChange={() => {
                        const now = new Date().toISOString();
                        setCallEmail((prev) =>
                          prev.map((x) => (x.id === c.id ? { ...x, completed: !x.completed, updatedAt: now } : x)),
                        );
                      }}
                      disabled={saving}
                    />
                    <Input
                      value={c.title}
                      onChange={(e) => {
                        const now = new Date().toISOString();
                        setCallEmail((prev) =>
                          prev.map((x, i) => (i === idx ? { ...x, title: e.target.value, updatedAt: now } : x)),
                        );
                      }}
                      className="rounded-xl"
                      placeholder={idx === 0 ? "Person / action" : idx === 1 ? "Person / action" : "Person / action"}
                      disabled={saving}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">For Tomorrow</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={forTomorrow}
                  onChange={(e) => setForTomorrow(e.target.value)}
                  className="min-h-[120px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Daily Affirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={affirmation}
                  onChange={(e) => setAffirmation(e.target.value)}
                  className="min-h-[80px] w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm"
                  placeholder=""
                  disabled={saving}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!selectedTasks.length && <div className="text-sm text-gray-500">No tasks for this date yet.</div>}

            {selectedTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <input type="checkbox" checked={t.completed} onChange={() => handleToggle(t.id)} disabled={saving} />
                  <div className="min-w-0">
                    <div className={`font-medium text-gray-900 ${t.completed ? "line-through opacity-70" : ""} truncate`}>
                      {t.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openEdit(t)} disabled={saving}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => handleDelete(t.id)} disabled={saving}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="w-[92vw] sm:max-w-[520px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{editingTaskId ? "Edit task" : "Add task"}</DialogTitle>
              <DialogDescription>
                {editingTaskId ? "Update your daily task." : "Add a task for the selected date."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="daily-task-title">Task</Label>
                <Input
                  id="daily-task-title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="rounded-xl"
                  placeholder="e.g., 30 minutes reading"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" className="rounded-full" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={handleSaveTask} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DailyPlanner;
