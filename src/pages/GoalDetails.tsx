import Layout from "@/components/Layout";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  ChevronLeft, 
  Edit3, 
  Trash2,
  Trophy,
  TrendingUp,
  Lock
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";
import type { Goal, GoalCheckpoint, Priority } from "@/types";
import { deleteGoal, getGoalById, updateGoal } from "@/firebase/goals";
import { useUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const newId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const getDerivedProgress = (g: Goal, checkpoints?: GoalCheckpoint[]): number => {
  const cps = checkpoints ?? g.checkpoints ?? [];
  if (cps.length > 0) {
    const done = cps.filter((c) => c.completed).length;
    return Math.round((done / cps.length) * 100);
  }
  return g.progress ?? 0;
};

const CircularProgress = ({ value, size = 64 }: { value: number; size?: number }) => {
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="text-gray-100"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="text-blue-600"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-900">
        {pct}%
      </div>
    </div>
  );
};

const GoalDetails = () => {
  const { isPremium } = useUser();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTarget, setEditTarget] = useState<"strategy" | "planning" | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false);
  const [isSavingPlanning, setIsSavingPlanning] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkpoints, setCheckpoints] = useState<GoalCheckpoint[]>([]);
  const [newCheckpointTitle, setNewCheckpointTitle] = useState("");

  const [strategyWhy, setStrategyWhy] = useState("");
  const [strategyWho, setStrategyWho] = useState("");
  const [strategyNo, setStrategyNo] = useState("");

  const [planningObstacles, setPlanningObstacles] = useState("");
  const [planningNextActions, setPlanningNextActions] = useState("");
  const [planningAiPreview, setPlanningAiPreview] = useState("");

  useEffect(() => {
    const goalId = id ?? "";
    if (!goalId) {
      setGoal(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getGoalById(goalId)
      .then((g) => {
        setGoal(g);
        if (g) {
          setName(g.name);
          setCategory(g.category);
          setDescription(g.description ?? "");
          setPriority(g.priority);
          setStartDate(g.startDate ?? "");
          setEndDate(g.endDate ?? "");
          setCheckpoints(g.checkpoints ?? []);

          setStrategyWhy(g.strategy?.whyMatters ?? "");
          setStrategyWho(g.strategy?.whoBenefits ?? "");
          setStrategyNo(g.strategy?.sayNoTo ?? "");

          setPlanningObstacles(g.planning?.obstacles ?? "");
          setPlanningNextActions(g.planning?.nextActions ?? "");
          setPlanningAiPreview(g.planning?.aiPreview ?? "");
        }
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Failed to load goal";
        showError(message);
        setGoal(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const state = location.state as { openEdit?: boolean } | null;
    if (state?.openEdit) {
      setEditMode(true);
      setEditTarget(null);
      setIsEditOpen(true);
    }
  }, [location.state]);

  const derivedProgress = useMemo(() => {
    if (!goal) return 0;
    return getDerivedProgress(goal, checkpoints);
  }, [goal, checkpoints]);

  const derivedCheckpointStats = useMemo(() => {
    const total = checkpoints.length;
    const done = checkpoints.filter((c) => c.completed).length;
    return { total, done };
  }, [checkpoints]);

  const handleSave = async () => {
    if (!goal) return;
    if (!name.trim() || !category.trim()) {
      showError("Please enter a goal name and category.");
      return;
    }

    setIsSaving(true);
    try {
      await updateGoal(goal.id, {
        name: name.trim(),
        category: category.trim(),
        description: description.trim() ? description.trim() : undefined,
        priority,
        startDate: startDate.trim() ? startDate.trim() : undefined,
        endDate: endDate.trim() ? endDate.trim() : undefined,
        checkpoints,
        progress: derivedProgress,
        status: checkpoints.length > 0 && derivedCheckpointStats.done === derivedCheckpointStats.total ? "completed" : "active",
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Goal updated!");
      setIsEditOpen(false);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update goal";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!isEditOpen) {
      setEditMode(false);
    }
  }, [isEditOpen]);

  const handleDelete = async () => {
    if (!goal) return;
    if (!window.confirm("Delete this goal? This cannot be undone.")) return;
    try {
      await deleteGoal(goal.id);
      showSuccess("Goal deleted.");
      navigate("/goals");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete goal";
      showError(message);
    }
  };

  const handleSaveStrategy = async () => {
    if (!goal) return;
    if (!isPremium) {
      showError("Strategy is a Premium feature. Upgrade to edit strategy.");
      return;
    }
    setIsSavingStrategy(true);
    try {
      await updateGoal(goal.id, {
        strategy: {
          whyMatters: strategyWhy.trim(),
          whoBenefits: strategyWho.trim(),
          sayNoTo: strategyNo.trim(),
        },
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Strategy saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save strategy";
      showError(message);
    } finally {
      setIsSavingStrategy(false);
    }
  };

  const generateLocalAiPreview = () => {
    const lines: string[] = [];
    if (goal) {
      lines.push(`Goal: ${goal.name}`);
      if (goal.startDate || goal.endDate) {
        lines.push(`Dates: ${goal.startDate ?? ""} → ${goal.endDate ?? ""}`.trim());
      }
      lines.push("");
    }
    lines.push("Suggested next actions:");
    lines.push("- 1 small action you can do today (15 minutes)");
    lines.push("- 1 medium action this week (60–90 minutes)");
    lines.push("- 1 accountability action (message someone / calendar block)");
    lines.push("");
    lines.push("Common obstacles to plan for:");
    lines.push("- Low energy / time constraints");
    lines.push("- Forgetting to start (use a calendar reminder)");
    lines.push("- Lack of clarity (define the very next step)");
    return lines.join("\n");
  };

  const handleSavePlanning = async () => {
    if (!goal) return;
    if (!isPremium) {
      showError("Planning is a Premium feature. Upgrade to edit planning.");
      return;
    }
    setIsSavingPlanning(true);
    try {
      await updateGoal(goal.id, {
        planning: {
          obstacles: planningObstacles.trim() ? planningObstacles.trim() : undefined,
          nextActions: planningNextActions.trim() ? planningNextActions.trim() : undefined,
          aiPreview: planningAiPreview.trim() ? planningAiPreview.trim() : undefined,
        },
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      showSuccess("Planning saved!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save planning";
      showError(message);
    } finally {
      setIsSavingPlanning(false);
    }
  };

  const handleMarkComplete = async () => {
    if (!goal) return;
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const cps = checkpoints.length
        ? checkpoints.map((c) => ({ ...c, completed: true, updatedAt: now }))
        : checkpoints;
      await updateGoal(goal.id, {
        checkpoints: cps,
        progress: 100,
        status: "completed",
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      setCheckpoints(cps);
      showSuccess("Goal marked as completed!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to mark complete";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const persistCheckpoints = async (next: GoalCheckpoint[]) => {
    if (!goal) return;
    setIsSaving(true);
    try {
      const done = next.filter((c) => c.completed).length;
      const total = next.length;
      const nextProgress = total > 0 ? Math.round((done / total) * 100) : (goal.progress ?? 0);
      await updateGoal(goal.id, {
        checkpoints: next,
        progress: nextProgress,
        status: total > 0 && done === total ? "completed" : "active",
      });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      setCheckpoints(next);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update checkpoints";
      showError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCheckpoint = async () => {
    const title = newCheckpointTitle.trim();
    if (!goal) return;
    if (!title) return;
    const now = new Date().toISOString();
    const next: GoalCheckpoint[] = [
      ...checkpoints,
      { id: newId(), title, completed: false, createdAt: now, updatedAt: now },
    ];
    setNewCheckpointTitle("");
    await persistCheckpoints(next);
  };

  const handleToggleCheckpoint = async (checkpointId: string) => {
    const now = new Date().toISOString();
    const next = checkpoints.map((c) =>
      c.id === checkpointId ? { ...c, completed: !c.completed, updatedAt: now } : c,
    );
    await persistCheckpoints(next);
  };

  const handleRenameCheckpoint = (checkpointId: string, title: string) => {
    const now = new Date().toISOString();
    setCheckpoints((prev) =>
      prev.map((c) => (c.id === checkpointId ? { ...c, title, updatedAt: now } : c)),
    );
  };

  const handleCommitRenameCheckpoint = async () => {
    await persistCheckpoints(checkpoints);
  };

  const handleDeleteCheckpoint = async (checkpointId: string) => {
    const next = checkpoints.filter((c) => c.id !== checkpointId);
    await persistCheckpoints(next);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <Link
          to="/goals"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Goals
        </Link>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : !goal ? (
          <div className="text-gray-600">Goal not found.</div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold text-gray-900">{goal.name}</h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      goal.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>
                {goal.description && <p className="text-gray-500 max-w-2xl">{goal.description}</p>}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setEditMode(true);
                    setIsEditOpen(true);
                  }}
                >
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Goal
                </Button>
                <Button variant="outline" className="rounded-full text-rose-600" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogContent className="sm:max-w-[640px] rounded-[2rem]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Edit Goal</DialogTitle>
                      <DialogDescription>Update goal details.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-5 py-2">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-name">Goal Name</Label>
                        <Input
                          id="edit-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Input
                          id="edit-category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-description">Description (optional)</Label>
                        <textarea
                          id="edit-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Priority</Label>
                          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditOpen(false)}
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl"
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleMarkComplete}
                  disabled={isSaving || goal.status === "completed"}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  Mark Completed
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Overall Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex justify-between items-end">
                      <span
                        className={`text-5xl font-black ${
                          goal.status === "completed" ? "text-emerald-600" : "text-gray-900"
                        }`}
                      >
                        {derivedProgress}%
                      </span>
                      <span className="text-sm font-medium text-gray-500">Target: 100%</span>
                    </div>
                    <Progress
                      value={derivedProgress}
                      className={`h-4 bg-gray-100 ${goal.status === "completed" ? "[&>div]:bg-emerald-500" : ""}`}
                    />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center justify-between">
                      <span>Checkpoints</span>
                      <span className="text-sm font-medium text-gray-500">
                        {derivedCheckpointStats.done}/{derivedCheckpointStats.total}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        value={newCheckpointTitle}
                        onChange={(e) => setNewCheckpointTitle(e.target.value)}
                        className="rounded-xl"
                        placeholder="Add a checkpoint (e.g., Week 1 complete)"
                      />
                      <Button
                        onClick={handleAddCheckpoint}
                        disabled={isSaving || !newCheckpointTitle.trim()}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700"
                      >
                        Add
                      </Button>
                    </div>

                    {checkpoints.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-600">
                        Add checkpoints to automatically calculate progress.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {checkpoints.map((c) => (
                          <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3">
                            <input
                              type="checkbox"
                              checked={c.completed}
                              onChange={() => handleToggleCheckpoint(c.id)}
                              className="h-4 w-4"
                            />
                            <Input
                              value={c.title}
                              onChange={(e) => handleRenameCheckpoint(c.id, e.target.value)}
                              onBlur={handleCommitRenameCheckpoint}
                              className="rounded-xl"
                            />
                            <Button
                              variant="outline"
                              className="rounded-xl text-rose-600"
                              onClick={() => handleDeleteCheckpoint(c.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardContent className="space-y-6">
                    {!goal.strategy && !goal.planning ? (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
                        <p className="font-semibold text-gray-900">No strategy or planning set for this goal yet.</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Add a simple “why” and a plan for the week to stay consistent. Use the buttons below to set it now.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {!!goal.strategy && (
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">Strategy</h4>
                              <p className="text-sm text-gray-500">Your motivation and focus.</p>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900">Why does this goal matter?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.whyMatters}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">Who benefits if you succeed?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.whoBenefits}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">What will you say “No” to?</p>
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.strategy.sayNoTo}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {!!goal.planning && (
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">Planning</h4>
                              <p className="text-sm text-gray-500">What could block you, and what you’ll do next.</p>
                            </div>

                            <div className="space-y-4">
                              {goal.planning.obstacles ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">Common obstacles</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.obstacles}</p>
                                </div>
                              ) : null}
                              {goal.planning.nextActions ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">Next actions for this week</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.nextActions}</p>
                                </div>
                              ) : null}
                              {goal.planning.aiPreview ? (
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">AI reflection</p>
                                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{goal.planning.aiPreview}</p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {editMode && (
                      <div className="space-y-6 pt-4 border-t">
                        {(editTarget === null || editTarget === "strategy") && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Strategy</h4>
                          <div className="space-y-3">
                            <div className="grid gap-2">
                              <Label>Why does this goal matter?</Label>
                              <textarea
                                value={strategyWhy}
                                onChange={(e) => setStrategyWhy(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>Who benefits if you succeed?</Label>
                              <textarea
                                value={strategyWho}
                                onChange={(e) => setStrategyWho(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>What will you say “No” to?</Label>
                              <textarea
                                value={strategyNo}
                                onChange={(e) => setStrategyNo(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        )}

                        {(editTarget === null || editTarget === "planning") && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Planning</h4>
                          <div className="space-y-3">
                            <div className="grid gap-2">
                              <Label>Common obstacles</Label>
                              <textarea
                                value={planningObstacles}
                                onChange={(e) => setPlanningObstacles(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>Next actions for this week</Label>
                              <textarea
                                value={planningNextActions}
                                onChange={(e) => setPlanningNextActions(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>AI-style preview (local)</Label>
                              <textarea
                                value={planningAiPreview}
                                onChange={(e) => setPlanningAiPreview(e.target.value)}
                                disabled={!editMode}
                                className="min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (!isPremium) {
                            showError("Strategy is a Premium feature. Upgrade to add/edit strategy.");
                            navigate("/pricing");
                            return;
                          }
                          setEditMode(true);
                          setEditTarget("strategy");
                        }}
                        className="rounded-full"
                      >
                        {!isPremium && <Lock className="w-4 h-4 mr-2" />}
                        {goal.strategy ? "Edit Strategy" : "Add Strategy"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (!isPremium) {
                            showError("Planning is a Premium feature. Upgrade to add/edit planning.");
                            navigate("/pricing");
                            return;
                          }
                          setEditMode(true);
                          setEditTarget("planning");
                        }}
                        className="rounded-full"
                      >
                        {!isPremium && <Lock className="w-4 h-4 mr-2" />}
                        {goal.planning ? "Edit Planning" : "Add Planning"}
                      </Button>
                      {editMode && (
                        <>
                          {(editTarget === null || editTarget === "strategy") && (
                            <Button
                              onClick={handleSaveStrategy}
                              disabled={isSavingStrategy}
                              className="rounded-full bg-blue-600 hover:bg-blue-700"
                            >
                              {isSavingStrategy ? "Saving..." : "Save Strategy"}
                            </Button>
                          )}
                          {(editTarget === null || editTarget === "planning") && (
                            <Button
                              onClick={handleSavePlanning}
                              disabled={isSavingPlanning}
                              className="rounded-full bg-blue-600 hover:bg-blue-700"
                            >
                              {isSavingPlanning ? "Saving..." : "Save Planning"}
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card
                  className={`border-none shadow-sm rounded-[2.5rem] text-white transition-colors ${
                    goal.status === "completed" ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-blue-200" />
                      Success Metric
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-50 leading-relaxed">
                      {goal.successMetric.type === "number" ? "Reach target" : "Complete goal"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-500" />
                      Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Category</span>
                      <span className="text-gray-900">{goal.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Priority</span>
                      <span className="text-gray-900">{goal.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Start</span>
                      <span className="text-gray-900">{goal.startDate ?? ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">End</span>
                      <span className="text-gray-900">{goal.endDate ?? ""}</span>
                    </div>
                    <div className="pt-3">
                      <CircularProgress value={derivedProgress} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default GoalDetails;