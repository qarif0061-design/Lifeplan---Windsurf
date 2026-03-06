import React from "react";
import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Crown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Timeframe } from "@/types";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { createGoal, deleteGoal, updateGoal } from "@/firebase/goals";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProgressDraftMap = Record<string, number>;
type ProgressSavingMap = Record<string, boolean>;

const Goals = () => {
  const { isPremium, user } = useUser();
  const { goals } = useGoals();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [goalName, setGoalName] = useState("");
  const [goalCategory, setGoalCategory] = useState("");
  const [goalPriority, setGoalPriority] = useState<Priority>("medium");
  const [goalTimeframe, setGoalTimeframe] = useState<Timeframe>("weeks");
  const [goalTimeframeValue, setGoalTimeframeValue] = useState<number>(4);
  const [goalDescription, setGoalDescription] = useState("");

  // Strategy fields
  const [strategyWhy, setStrategyWhy] = useState("");
  const [strategyWho, setStrategyWho] = useState("");
  const [strategyNo, setStrategyNo] = useState("");
  const [showStrategyFields, setShowStrategyFields] = useState(false);

  // Planning fields
  const [planningObstacles, setPlanningObstacles] = useState("");
  const [planningNextActions, setPlanningNextActions] = useState("");
  const [planningAiPreview, setPlanningAiPreview] = useState("");
  const [showPlanningFields, setShowPlanningFields] = useState(false);
  const [showAiReflectionField, setShowAiReflectionField] = useState(false);

  const [draftProgress, setDraftProgress] = useState<ProgressDraftMap>(() => ({}));
  const [savingProgress, setSavingProgress] = useState<ProgressSavingMap>(() => ({}));

  const handleCreateGoal = async () => {
    if (!user) {
      showError("Please sign in to create goals.");
      return;
    }
    if (!isPremium && goals.length >= 1) {
      showError("Free users can only create 1 goal. Upgrade to Premium for unlimited goals.");
      return;
    }
    if (!goalName.trim() || !goalCategory.trim()) {
      showError("Please enter a goal name and category.");
      return;
    }

    setIsCreating(true);
    try {
      await createGoal({
        userId: user.id,
        name: goalName.trim(),
        category: goalCategory.trim(),
        priority: goalPriority,
        timeframe: goalTimeframe,
        timeframeValue: goalTimeframeValue,
        description: goalDescription.trim() ? goalDescription.trim() : undefined,
        strategy: (strategyWhy.trim() || strategyWho.trim() || strategyNo.trim()) ? {
          whyMatters: strategyWhy.trim(),
          whoBenefits: strategyWho.trim(),
          sayNoTo: strategyNo.trim(),
        } : undefined,
        planning: (planningObstacles.trim() || planningNextActions.trim() || planningAiPreview.trim()) ? {
          obstacles: planningObstacles.trim(),
          nextActions: planningNextActions.trim(),
          aiPreview: planningAiPreview.trim(),
        } : undefined,
      });
      showSuccess("Goal created successfully!");
      setIsDialogOpen(false);
      // Reset all fields
      setGoalName("");
      setGoalCategory("");
      setGoalPriority("medium");
      setGoalTimeframe("weeks");
      setGoalTimeframeValue(4);
      setGoalDescription("");
      setStrategyWhy("");
      setStrategyWho("");
      setStrategyNo("");
      setPlanningObstacles("");
      setPlanningNextActions("");
      setPlanningAiPreview("");
      setShowStrategyFields(false);
      setShowPlanningFields(false);
      setShowAiReflectionField(false);
    } catch (e: unknown) {
      const raw = e instanceof Error ? e.message : "Failed to create goal";
      const message = raw.toLowerCase().includes("insufficient permissions")
        ? "Missing or insufficient permissions. Update your Firestore rules to allow authenticated users to write their own goals."
        : raw;
      showError(message);
    } finally {
      setIsCreating(false);
    }
  };

  const getDraft = (goalId: string, current: number) => {
    const v = draftProgress[goalId];
    return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : current;
  };

  const setDraft = (goalId: string, value: number) => {
    setDraftProgress((prev) => ({ ...prev, [goalId]: Math.min(100, Math.max(0, value)) }));
  };

  const handleSaveProgress = async (goalId: string, value: number) => {
    setSavingProgress((p) => ({ ...p, [goalId]: true }));
    try {
      await updateGoal(goalId, {
        progress: value,
        status: value === 100 ? "completed" : "active",
      });
      showSuccess("Progress updated!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update progress";
      showError(message);
    } finally {
      setSavingProgress((p) => ({ ...p, [goalId]: false }));
    }
  };

  const handleMarkComplete = async (goalId: string) => {
    await handleSaveProgress(goalId, 100);
  };

  const filteredGoals = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const statusFilter = (searchParams.get("status") ?? "all").trim().toLowerCase();

    const byStatus = (g: (typeof goals)[number]) => {
      if (!statusFilter) return true;
      if (statusFilter === "all") return true;
      if (statusFilter === "active") return g.status === "active";
      if (statusFilter === "completed") return g.status === "completed";
      return true;
    };

    const byQuery = (g: (typeof goals)[number]) => {
      if (!q) return true;
      return g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q);
    };

    return goals.filter((g) => byStatus(g) && byQuery(g));
  }, [goals, searchQuery, searchParams]);

  const handleDelete = async (goalId: string) => {
    if (!window.confirm("Delete this goal? This cannot be undone.")) return;
    try {
      await deleteGoal(goalId);
      showSuccess("Goal deleted.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to delete goal";
      showError(message);
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
            <p className="text-gray-500">Track and manage your long-term objectives.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={searchParams.get("status") ?? "all"}
              onValueChange={(value) => {
                const params = new URLSearchParams(searchParams);
                params.set("status", value);
                setSearchParams(params);
              }}
            >
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
                  onClick={() => {
                    if (!isPremium && goals.length >= 1) {
                      showError("Free users can only create 1 goal. Upgrade to Premium for unlimited goals.");
                      return;
                    }
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Create New Goal
                </Button>
              </DialogTrigger>
            <DialogContent className="w-[92vw] sm:max-w-[520px] md:w-[50vw] md:max-w-[720px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Goal</DialogTitle>
                <DialogDescription>Define your objective and how you'll measure success.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="rounded-xl"
                    placeholder="e.g., Run a 5K without stopping"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      value={goalCategory}
                      onChange={(e) => setGoalCategory(e.target.value)}
                      className="rounded-xl"
                      placeholder="e.g., Health"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={goalPriority} onValueChange={(v) => setGoalPriority(v as Priority)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timeframe</Label>
                    <Select value={goalTimeframe} onValueChange={(v) => setGoalTimeframe(v as Timeframe)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      type="number"
                      min={1}
                      value={goalTimeframeValue}
                      onChange={(e) => setGoalTimeframeValue(Number(e.target.value))}
                      className="rounded-xl"
                      placeholder="e.g., 4"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <textarea
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    className="min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Add context, motivation, or any notes you want to remember..."
                  />
                </div>

                <div className="border-t pt-4 space-y-3">
                  {!showStrategyFields ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-xl"
                      disabled={!isPremium}
                      onClick={() => {
                        if (!isPremium) {
                          showError("Strategy is a Premium feature. Upgrade to add strategy.");
                          return;
                        }
                        setShowStrategyFields(true);
                      }}
                    >
                      Add Strategy
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Strategy</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 px-2"
                          onClick={() => {
                            setShowStrategyFields(false);
                            setStrategyWhy("");
                            setStrategyWho("");
                            setStrategyNo("");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="strategy-why">Why does this goal matter?</Label>
                        <textarea
                          id="strategy-why"
                          value={strategyWhy}
                          onChange={(e) => setStrategyWhy(e.target.value)}
                          className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          placeholder="e.g., I want more energy and confidence"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="strategy-who">Who benefits if you succeed?</Label>
                        <textarea
                          id="strategy-who"
                          value={strategyWho}
                          onChange={(e) => setStrategyWho(e.target.value)}
                          className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          placeholder="e.g., Me and my family"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="strategy-no">What will you say "no" to?</Label>
                        <textarea
                          id="strategy-no"
                          value={strategyNo}
                          onChange={(e) => setStrategyNo(e.target.value)}
                          className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          placeholder="e.g., Late-night scrolling"
                        />
                      </div>
                    </div>
                  )}

                  {!showPlanningFields ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-xl"
                      disabled={!isPremium}
                      onClick={() => {
                        if (!isPremium) {
                          showError("Planning is a Premium feature. Upgrade to add planning.");
                          return;
                        }
                        setShowPlanningFields(true);
                      }}
                    >
                      Add Planning
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">Planning</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 px-2"
                          onClick={() => {
                            setShowPlanningFields(false);
                            setShowAiReflectionField(false);
                            setPlanningObstacles("");
                            setPlanningNextActions("");
                            setPlanningAiPreview("");
                          }}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="planning-obstacles">Potential obstacles</Label>
                        <textarea
                          id="planning-obstacles"
                          value={planningObstacles}
                          onChange={(e) => setPlanningObstacles(e.target.value)}
                          className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          placeholder="e.g., Busy schedule, low motivation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="planning-next">Next actions</Label>
                        <textarea
                          id="planning-next"
                          value={planningNextActions}
                          onChange={(e) => setPlanningNextActions(e.target.value)}
                          className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                          placeholder="e.g., Buy running shoes, schedule 3 runs/week"
                        />
                      </div>

                      {!showAiReflectionField ? (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full rounded-xl"
                          onClick={() => setShowAiReflectionField(true)}
                        >
                          Add AI Reflection
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="planning-ai">AI reflection</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              className="h-8 px-2"
                              onClick={() => {
                                setShowAiReflectionField(false);
                                setPlanningAiPreview("");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <textarea
                            id="planning-ai"
                            value={planningAiPreview}
                            onChange={(e) => setPlanningAiPreview(e.target.value)}
                            className="min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                            placeholder="e.g., Ask: What are the biggest risks to this plan?"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateGoal} disabled={isCreating} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12">
                  {isCreating ? "Creating..." : "Create Goal"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search goals..." 
              className="pl-10 rounded-2xl bg-white border-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-2xl border-gray-100 bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <Card key={goal.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600" aria-label="Goal actions">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => navigate(`/goals/${goal.id}`)}>View details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/goals/${goal.id}`, { state: { openEdit: true } })}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(goal.id)}
                          className="text-rose-600 focus:text-rose-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {goal.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{goal.timeframeValue} {goal.timeframe}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2 bg-gray-100" />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase">Quick Actions</span>
                    <span className="text-xs font-medium text-gray-500">{getDraft(goal.id, goal.progress)}%</span>
                  </div>
                  <Slider
                    value={[getDraft(goal.id, goal.progress)]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setDraft(goal.id, v[0] ?? 0)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={getDraft(goal.id, goal.progress)}
                      onChange={(e) => setDraft(goal.id, Number(e.target.value))}
                      className="rounded-xl"
                    />
                    <Button
                      onClick={() => handleSaveProgress(goal.id, getDraft(goal.id, goal.progress))}
                      disabled={savingProgress[goal.id] === true}
                      className="rounded-xl bg-blue-600 hover:bg-blue-700"
                    >
                      {savingProgress[goal.id] === true ? "Saving..." : "Save"}
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleMarkComplete(goal.id)}
                    disabled={savingProgress[goal.id] === true}
                    variant="outline"
                    className="w-full rounded-xl"
                  >
                    Mark Completed
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {goal.priority === 'high' && (
                      <div className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                        <AlertCircle className="w-3 h-3" /> High Priority
                      </div>
                    )}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                    <Link to={`/goals/${goal.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State / Add New Card */}
          <button 
            onClick={() => {
              if (!isPremium && goals.length >= 1) {
                showError("Free users can only create 1 goal. Upgrade to Premium for unlimited goals.");
                return;
              }
              setIsDialogOpen(true);
            }}
            className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Add New Goal</p>
              <p className="text-sm text-gray-500">Start a new journey today</p>
            </div>
          </button>
        </div>

        {/* Free Tier Limit Notice */}
        {!isPremium && goals.length >= 1 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900">Goal Limit Reached</h4>
              <p className="text-sm text-amber-700">Free users can have up to 1 goal. Upgrade to Premium for unlimited goals and advanced planning tools.</p>
              <Button asChild variant="link" className="text-amber-700 p-0 h-auto font-bold mt-1">
                <Link to="/pricing">Upgrade Now →</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Goals;