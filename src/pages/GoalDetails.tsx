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
  TrendingUp
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";
import { Slider } from "@/components/ui/slider";
import type { Goal, Priority, Timeframe } from "@/types";
import { deleteGoal, getGoalById, updateGoal } from "@/firebase/goals";
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

const GoalDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingStrategy, setIsSavingStrategy] = useState(false);
  const [isSavingPlanning, setIsSavingPlanning] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [timeframe, setTimeframe] = useState<Timeframe>("weeks");
  const [timeframeValue, setTimeframeValue] = useState<number>(4);
  const [progress, setProgress] = useState<number>(0);

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
          setTimeframe(g.timeframe);
          setTimeframeValue(g.timeframeValue);
          setProgress(g.progress ?? 0);

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
      setIsEditOpen(true);
    }
  }, [location.state]);

  const clampedProgress = useMemo(
    () => Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0)),
    [progress],
  );

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
        timeframe,
        timeframeValue,
        progress: clampedProgress,
        status: clampedProgress === 100 ? "completed" : goal.status,
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
      lines.push(`Timeframe: ${goal.timeframeValue} ${goal.timeframe}`);
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
      await updateGoal(goal.id, { progress: 100, status: "completed" });
      const refreshed = await getGoalById(goal.id);
      setGoal(refreshed);
      setProgress(100);
      showSuccess("Goal marked as completed!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to mark complete";
      showError(message);
    } finally {
      setIsSaving(false);
    }
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
                      <DialogDescription>Update goal details and progress.</DialogDescription>
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
                          <Label>Timeframe</Label>
                          <Select value={timeframe} onValueChange={(v) => setTimeframe(v as Timeframe)}>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weeks">Weeks</SelectItem>
                              <SelectItem value="months">Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="edit-duration">Duration</Label>
                        <Input
                          id="edit-duration"
                          type="number"
                          min={1}
                          value={timeframeValue}
                          onChange={(e) => setTimeframeValue(Number(e.target.value))}
                          className="rounded-xl"
                        />
                      </div>

                      <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <Label>Progress</Label>
                          <span className="text-sm font-medium text-gray-600">{clampedProgress}%</span>
                        </div>
                        <Slider
                          value={[clampedProgress]}
                          max={100}
                          step={1}
                          onValueChange={(v) => setProgress(v[0] ?? 0)}
                        />
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={clampedProgress}
                          onChange={(e) => setProgress(Number(e.target.value))}
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
                        {goal.progress}%
                      </span>
                      <span className="text-sm font-medium text-gray-500">Target: 100%</span>
                    </div>
                    <Progress
                      value={goal.progress}
                      className={`h-4 bg-gray-100 ${goal.status === "completed" ? "[&>div]:bg-emerald-500" : ""}`}
                    />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Strategy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <div className="flex items-center gap-3">
                      {editMode && (
                        <Button
                          onClick={handleSaveStrategy}
                          disabled={isSavingStrategy}
                          className="rounded-full bg-blue-600 hover:bg-blue-700"
                        >
                          {isSavingStrategy ? "Saving..." : "Save Strategy"}
                        </Button>
                      )}
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/strategy">Open Strategy Page</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm rounded-[2.5rem]">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Weekly Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setPlanningAiPreview(generateLocalAiPreview())}
                        className="rounded-full"
                      >
                        Generate Preview
                      </Button>
                      {editMode && (
                        <Button
                          onClick={handleSavePlanning}
                          disabled={isSavingPlanning}
                          className="rounded-full bg-blue-600 hover:bg-blue-700"
                        >
                          {isSavingPlanning ? "Saving..." : "Save Planning"}
                        </Button>
                      )}
                      <Button asChild variant="outline" className="rounded-full">
                        <Link to="/planning">Open Weekly Planning</Link>
                      </Button>
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
                      <span className="font-medium text-gray-500">Timeframe</span>
                      <span className="text-gray-900">
                        {goal.timeframeValue} {goal.timeframe}
                      </span>
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