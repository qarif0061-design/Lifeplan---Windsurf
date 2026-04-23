import Layout from "@/components/Layout";
import { useEffect, useMemo, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Eye,
  Calendar,
  Target,
  CheckCircle2,
  Circle,
  X,
  Save,
  Copy,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import {
  type WeeklyPlanner,
  type DayPlan,
  type DayTask,
  getWeekStart,
  formatDate,
  getWeeklyTemplateDays,
  subscribeWeeklyPlanner,
  getOrCreateWeeklyPlanner,
  updateDayPriorities,
  addTaskToDay,
  updateTaskInDay,
  deleteTaskFromDay,
  updateWeeklyPlanner,
} from "@/firebase/weeklyPlanner";

const WeeklyPlannerPage = () => {
  const { user } = useUser();
  const [currentWeek, setCurrentWeek] = useState<Date>(getWeekStart());
  const [planner, setPlanner] = useState<WeeklyPlanner | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Local state for editing
  const [editingPriorities, setEditingPriorities] = useState<Record<number, string[]>>({});
  const [newTaskInputs, setNewTaskInputs] = useState<Record<number, string>>({});
  const [editingTasks, setEditingTasks] = useState<Record<string, string>>({});

  // Debounce timeouts
  const prioritiesDebounceRef = useRef<Record<number, NodeJS.Timeout>>({});
  const tasksDebounceRef = useRef<Record<string, NodeJS.Timeout>>({});

  const plannerRef = useRef<WeeklyPlanner | null>(null);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    plannerRef.current = planner;
  }, [planner]);

  useEffect(() => {
    userIdRef.current = user?.id ?? null;
  }, [user?.id]);

  const weekStartStr = useMemo(() => currentWeek.toISOString().split("T")[0], [currentWeek]);

  // Cleanup debounce timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(prioritiesDebounceRef.current).forEach(clearTimeout);
      Object.values(tasksDebounceRef.current).forEach(clearTimeout);
    };
  }, []);

  // Subscribe to weekly planner
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // First get or create the planner
    getOrCreateWeeklyPlanner(user.id, currentWeek)
      .then(async (initialPlanner) => {
        setPlanner(initialPlanner);
        setLoading(false);

        const isCurrentWeek = weekStartStr === getWeekStart().toISOString().split("T")[0];

        // Auto-apply template for the CURRENT week (overwrite existing content)
        if (isCurrentWeek) {
          try {
            await updateWeeklyPlanner(initialPlanner.id, {
              days: getWeeklyTemplateDays(currentWeek),
            });
          } catch {
            // Ignore (rules/offline). Planner UI will still render.
          }
        }

        // Then subscribe to updates
        const unsub = subscribeWeeklyPlanner(user.id, weekStartStr, (updatedPlanner) => {
          if (updatedPlanner) {
            setPlanner(updatedPlanner);
          }
        });

        return () => unsub();
      })
      .catch(() => {
        setLoading(false);
      });
  }, [user, currentWeek, weekStartStr]);

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek);
    if (direction === "prev") {
      newWeek.setDate(newWeek.getDate() - 7);
    } else {
      newWeek.setDate(newWeek.getDate() + 7);
    }
    setCurrentWeek(newWeek);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(getWeekStart());
  };

  const handlePriorityChange = (dayIndex: number, priorityIndex: number, value: string) => {
    const currentPriorities = editingPriorities[dayIndex] || planner?.days[dayIndex]?.priorities || [];
    const updatedPriorities = [...currentPriorities];
    updatedPriorities[priorityIndex] = value;
    setEditingPriorities({ ...editingPriorities, [dayIndex]: updatedPriorities });

    // Clear existing debounce for this day
    if (prioritiesDebounceRef.current[dayIndex]) {
      clearTimeout(prioritiesDebounceRef.current[dayIndex]);
    }

    // Set new debounce to autosave after 1.5 seconds
    prioritiesDebounceRef.current[dayIndex] = setTimeout(async () => {
      const p = plannerRef.current;
      const uid = userIdRef.current;
      if (!p || !uid) return;
      setIsSaving(true);
      const nonEmptyPriorities = updatedPriorities.filter((p) => p.trim() !== "");
      try {
        await updateDayPriorities(p.id, dayIndex, nonEmptyPriorities);
        setLastSaved(new Date());
        // Clear editing state
        setEditingPriorities((prev) => {
          const next = { ...prev };
          delete next[dayIndex];
          return next;
        });
      } catch (error) {
        showError("Failed to save priorities");
      } finally {
        setIsSaving(false);
      }
    }, 1500);
  };

  const savePriorities = async (dayIndex: number) => {
    if (!planner || !user) return;

    const priorities = editingPriorities[dayIndex] || [];
    const nonEmptyPriorities = priorities.filter((p) => p.trim() !== "");

    try {
      await updateDayPriorities(planner.id, dayIndex, nonEmptyPriorities);
      showSuccess("Priorities saved!");
      // Clear editing state
      const newEditing = { ...editingPriorities };
      delete newEditing[dayIndex];
      setEditingPriorities(newEditing);
    } catch (error) {
      showError("Failed to save priorities");
    }
  };

  const addPriority = (dayIndex: number) => {
    const currentPriorities = editingPriorities[dayIndex] || planner?.days[dayIndex]?.priorities || [];
    if (currentPriorities.length >= 3) {
      showError("Maximum 3 priorities allowed per day");
      return;
    }
    setEditingPriorities({
      ...editingPriorities,
      [dayIndex]: [...currentPriorities, ""],
    });
  };

  const removePriority = (dayIndex: number, priorityIndex: number) => {
    const currentPriorities = editingPriorities[dayIndex] || planner?.days[dayIndex]?.priorities || [];
    const updatedPriorities = currentPriorities.filter((_, i) => i !== priorityIndex);
    setEditingPriorities({ ...editingPriorities, [dayIndex]: updatedPriorities });
  };

  const handleAddTask = async (dayIndex: number) => {
    if (!planner || !user) return;

    const title = newTaskInputs[dayIndex]?.trim();
    if (!title) return;

    try {
      setIsSaving(true);
      await addTaskToDay(planner.id, dayIndex, {
        title,
        completed: false,
      });
      setNewTaskInputs({ ...newTaskInputs, [dayIndex]: "" });
      setLastSaved(new Date());
      showSuccess("Task added!");
    } catch (error) {
      showError("Failed to add task");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleTask = async (dayIndex: number, task: DayTask) => {
    if (!planner || !user) return;

    try {
      setIsSaving(true);
      await updateTaskInDay(planner.id, dayIndex, task.id, {
        completed: !task.completed,
      });
      setLastSaved(new Date());
    } catch (error) {
      showError("Failed to update task");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditTask = (taskId: string, currentTitle: string) => {
    setEditingTasks({ ...editingTasks, [taskId]: currentTitle });
  };

  const handleTaskEditChange = (taskId: string, dayIndex: number, value: string) => {
    setEditingTasks({ ...editingTasks, [taskId]: value });

    // Clear existing debounce for this task
    if (tasksDebounceRef.current[taskId]) {
      clearTimeout(tasksDebounceRef.current[taskId]);
    }

    // Set new debounce to autosave after 1.5 seconds
    tasksDebounceRef.current[taskId] = setTimeout(async () => {
      const p = plannerRef.current;
      const uid = userIdRef.current;
      if (!p || !uid) return;
      const newTitle = value.trim();
      if (!newTitle) return;
      setIsSaving(true);
      try {
        await updateTaskInDay(p.id, dayIndex, taskId, {
          title: newTitle,
        });
        setLastSaved(new Date());
        setEditingTasks((prev) => {
          const next = { ...prev };
          delete next[taskId];
          return next;
        });
      } catch (error) {
        showError("Failed to update task");
      } finally {
        setIsSaving(false);
      }
    }, 1500);
  };

  const handleSaveTaskEdit = async (dayIndex: number, taskId: string) => {
    if (!planner || !user) return;

    const newTitle = editingTasks[taskId]?.trim();
    if (!newTitle) return;

    try {
      await updateTaskInDay(planner.id, dayIndex, taskId, {
        title: newTitle,
      });
      const newEditing = { ...editingTasks };
      delete newEditing[taskId];
      setEditingTasks(newEditing);
      showSuccess("Task updated!");
    } catch (error) {
      showError("Failed to update task");
    }
  };

  const handleDeleteTask = async (dayIndex: number, taskId: string) => {
    if (!planner || !user) return;

    try {
      setIsSaving(true);
      await deleteTaskFromDay(planner.id, dayIndex, taskId);
      setLastSaved(new Date());
      showSuccess("Task deleted!");
    } catch (error) {
      showError("Failed to delete task");
    } finally {
      setIsSaving(false);
    }
  };

  const cloneToNextWeek = async () => {
    if (!planner || !user) return;
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);

    setIsSaving(true);
    try {
      const nextPlanner = await getOrCreateWeeklyPlanner(user.id, nextWeek);
      const nextDays = nextPlanner.days.map((d, idx) => {
        const src = planner.days[idx];
        const nowIso = new Date().toISOString();
        return {
          ...d,
          priorities: (src?.priorities ?? []).slice(0, 3),
          tasks: (src?.tasks ?? []).map((t) => ({
            ...t,
            id: crypto.randomUUID(),
            completed: false,
            createdAt: nowIso,
            updatedAt: nowIso,
          })),
        };
      });

      await updateWeeklyPlanner(nextPlanner.id, { days: nextDays });
      setLastSaved(new Date());
      showSuccess("Cloned to next week!");
      setCurrentWeek(nextWeek);
    } catch (e) {
      showError("Failed to clone to next week");
    } finally {
      setIsSaving(false);
    }
  };

  const isCurrentWeek = useMemo(() => {
    const today = getWeekStart();
    return weekStartStr === today.toISOString().split("T")[0];
  }, [weekStartStr]);

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Please sign in to access the Weekly Planner.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-8 h-8 text-blue-600" />
              Weekly Planner
            </h1>
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                <Save className="w-4 h-4 animate-pulse" />
                Saving...
              </div>
            )}
            {!isSaving && lastSaved && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Save className="w-4 h-4" />
                Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
            <p className="text-gray-500 mt-1">
              Plan your week day by day with priorities and tasks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek("prev")}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={isCurrentWeek ? "default" : "outline"}
              size="sm"
              onClick={goToCurrentWeek}
              className={`rounded-full ${isCurrentWeek ? "bg-blue-600 hover:bg-blue-700" : ""}`}
            >
              {isCurrentWeek ? "This Week" : "Back to Current"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek("next")}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Week Range Display */}
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm px-4 py-2 rounded-full">
            {formatDate(weekStartStr)} - {formatDate(planner?.weekEnd || weekStartStr)}
          </Badge>
          <div className="flex items-center gap-2">
            <Button onClick={cloneToNextWeek} variant="outline" className="rounded-full" disabled={isSaving}>
              <Copy className="w-4 h-4 mr-2" />
              Clone to next week
            </Button>
            <Button onClick={() => setShowPreview(true)} variant="outline" className="rounded-full">
              <Eye className="w-4 h-4 mr-2" />
              Preview Week
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading your weekly planner...</p>
          </div>
        )}

        {/* 7-Day Grid */}
        {!loading && planner && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {planner.days.map((day, dayIndex) => (
              <Card
                key={day.date}
                className={`border-none shadow-sm rounded-[2rem] ${
                  day.date === new Date().toISOString().split("T")[0]
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {day.dayName}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{formatDate(day.date)}</p>
                    </div>
                    {day.date === new Date().toISOString().split("T")[0] && (
                      <Badge className="bg-blue-600 text-white rounded-full">Today</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Top Priorities Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Target className="w-4 h-4 text-amber-500" />
                      Top Priorities
                      <span className="text-xs text-gray-400">
                        (
                        {(editingPriorities[dayIndex] || day.priorities).length}
                        /3)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {(editingPriorities[dayIndex] || day.priorities).map(
                        (priority, priorityIndex) => (
                          <div key={priorityIndex} className="flex items-center gap-2">
                            <Input
                              value={priority}
                              onChange={(e) =>
                                handlePriorityChange(dayIndex, priorityIndex, e.target.value)
                              }
                              onBlur={() => savePriorities(dayIndex)}
                              placeholder={`Priority ${priorityIndex + 1}`}
                              className="flex-1 rounded-xl text-sm"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePriority(dayIndex, priorityIndex)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )
                      )}

                      {(editingPriorities[dayIndex] || day.priorities).length < 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addPriority(dayIndex)}
                          className="w-full rounded-xl text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Priority
                        </Button>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Tasks Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Tasks
                      <span className="text-xs text-gray-400">
                        ({day.tasks.filter((t) => t.completed).length}/{day.tasks.length})
                      </span>
                    </div>

                    <div className="space-y-2">
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-2 group p-2 rounded-xl hover:bg-gray-50"
                        >
                          <button
                            onClick={() => handleToggleTask(dayIndex, task)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                          </button>

                          {editingTasks[task.id] !== undefined ? (
                            <Input
                              value={editingTasks[task.id]}
                              onChange={(e) =>
                                handleTaskEditChange(task.id, dayIndex, e.target.value)
                              }
                              onBlur={() => handleSaveTaskEdit(dayIndex, task.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveTaskEdit(dayIndex, task.id);
                                }
                              }}
                              autoFocus
                              className="flex-1 rounded-xl text-sm"
                            />
                          ) : (
                            <span
                              onClick={() => handleEditTask(task.id, task.title)}
                              className={`flex-1 text-sm cursor-pointer ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : "text-gray-700"
                              }`}
                            >
                              {task.title}
                            </span>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(dayIndex, task.id)}
                            className="h-6 w-6 p-0 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}

                      {/* Add New Task Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <Input
                          value={newTaskInputs[dayIndex] || ""}
                          onChange={(e) =>
                            setNewTaskInputs({ ...newTaskInputs, [dayIndex]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddTask(dayIndex);
                            }
                          }}
                          placeholder="Add a task..."
                          className="flex-1 rounded-xl text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddTask(dayIndex)}
                          disabled={!newTaskInputs[dayIndex]?.trim()}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 disabled:text-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                Week Preview
              </DialogTitle>
              <DialogDescription>
                {formatDate(weekStartStr)} - {formatDate(planner?.weekEnd || weekStartStr)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {planner?.days.map((day) => (
                <div key={day.date} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-lg text-gray-900">{day.dayName}</h3>
                    <span className="text-sm text-gray-500">{formatDate(day.date)}</span>
                    {day.date === new Date().toISOString().split("T")[0] && (
                      <Badge className="bg-blue-600 text-white rounded-full">Today</Badge>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Priorities Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                        <Target className="w-4 h-4" />
                        Top Priorities
                      </div>
                      {day.priorities.length > 0 ? (
                        <ul className="space-y-1">
                          {day.priorities.map((priority, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-amber-500 font-bold">{i + 1}.</span>
                              {priority}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No priorities set</p>
                      )}
                    </div>

                    {/* Tasks Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        Tasks ({day.tasks.filter((t) => t.completed).length}/{day.tasks.length})
                      </div>
                      {day.tasks.length > 0 ? (
                        <ul className="space-y-1">
                          {day.tasks.map((task) => (
                            <li
                              key={task.id}
                              className={`text-sm flex items-center gap-2 ${
                                task.completed ? "text-gray-400 line-through" : "text-gray-700"
                              }`}
                            >
                              {task.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-300" />
                              )}
                              {task.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No tasks added</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowPreview(false)} className="rounded-full">
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default WeeklyPlannerPage;
