import React from "react";
import Layout from "@/components/Layout";
import { useId, useMemo, useState } from "react";
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
  Crown,
  Lock
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
import type { Goal, Priority } from "@/types";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { createGoal, deleteGoal, updateGoal } from "@/firebase/goals";
import { updateFeaturedGoalId } from "@/firebase/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const newId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const getProgressIndicatorClass = (pct: number): string => {
  if (pct >= 100) return "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-emerald-400 [&>div]:to-lime-400";
  if (pct < 20) return "[&>div]:bg-gradient-to-r [&>div]:from-rose-600 [&>div]:via-rose-500 [&>div]:to-amber-500";
  if (pct < 50) return "[&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:via-orange-500 [&>div]:to-yellow-400";
  if (pct < 80) return "[&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:via-blue-600 [&>div]:to-indigo-500";
  return "[&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:via-teal-500 [&>div]:to-sky-500";
};

const getProgressStroke = (pct: number): { from: string; to: string } => {
  if (pct >= 100) return { from: "#22c55e", to: "#a3e635" };
  if (pct < 20) return { from: "#e11d48", to: "#f59e0b" };
  if (pct < 50) return { from: "#f59e0b", to: "#fde047" };
  if (pct < 80) return { from: "#0ea5e9", to: "#4f46e5" };
  return { from: "#22c55e", to: "#0ea5e9" };
};

const getRemainingDaysText = (g: Goal): string => {
  const end = g.endDate?.trim();
  if (!end) return "No date set";
  const endAt = new Date(`${end}T23:59:59.999`).getTime();
  if (Number.isNaN(endAt)) return "No date set";
  const now = Date.now();
  const diffMs = endAt - now;
  const days = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  if (diffMs < 0) return `Overdue ${days}d`;
  return `${days}d left`;
};

const getRemainingDaysBadgeClass = (g: Goal, pct: number): string => {
  if (!g.endDate) return "bg-slate-100 text-slate-700";
  if (pct >= 100) return "bg-emerald-100 text-emerald-700";
  if (pct < 20) return "bg-rose-100 text-rose-700";
  if (pct < 50) return "bg-amber-100 text-amber-800";
  return "bg-blue-100 text-blue-700";
};

const getDerivedProgress = (g: Goal): number => {
  const cps = g.checkpoints ?? [];
  if (cps.length > 0) {
    const per = cps.map((c) => {
      if (c.kind === "number") {
        const target = Math.max(0, c.target ?? 0);
        const current = Math.max(0, c.current ?? 0);
        if (target <= 0) return 0;
        return Math.min(1, current / target);
      }
      return c.completed ? 1 : 0;
    });
    const avg = per.reduce((s, v) => s + v, 0) / cps.length;
    return Math.round(avg * 100);
  }
  return g.progress ?? 0;
};

const CircularProgress = ({ value, size = 54 }: { value: number; size?: number }) => {
  const gradId = useId();
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * circumference;
  const strokeColors = getProgressStroke(pct);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={strokeColors.from} />
            <stop offset="100%" stopColor={strokeColors.to} />
          </linearGradient>
        </defs>
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
          stroke={`url(#${gradId})`}
          fill="transparent"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
        {pct}%
      </div>
    </div>
  );
};

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
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalEndDate, setGoalEndDate] = useState("");
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
        startDate: goalStartDate.trim() ? goalStartDate.trim() : undefined,
        endDate: goalEndDate.trim() ? goalEndDate.trim() : undefined,
        checkpoints: [],
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
      setGoalStartDate("");
      setGoalEndDate("");
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

  const handleToggleFavorite = async (g: Goal) => {
    try {
      await updateGoal(g.id, { isFavorite: !g.isFavorite });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update favorite";
      showError(message);
    }
  };

  const handleSetFeatured = async (goalId?: string) => {
    if (!user) return;
    try {
      await updateFeaturedGoalId(user.id, goalId);
      showSuccess(goalId ? "Featured goal updated." : "Featured goal cleared.");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update featured goal";
      showError(message);
    }
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

  const featuredGoal = useMemo(() => {
    const featuredId = user?.featuredGoalId;
    if (!featuredId) return null;
    return goals.find((g) => g.id === featuredId) ?? null;
  }, [goals, user?.featuredGoalId]);

  const favoriteGoals = useMemo(() => goals.filter((g) => g.isFavorite), [goals]);

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
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={goalStartDate}
                      onChange={(e) => setGoalStartDate(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={goalEndDate}
                      onChange={(e) => setGoalEndDate(e.target.value)}
                      className="rounded-xl"
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
                      onClick={() => {
                        if (!isPremium) {
                          showError("Strategy is a Premium feature. Upgrade to add strategy.");
                          navigate("/pricing");
                          return;
                        }
                        setShowStrategyFields(true);
                      }}
                    >
                      {!isPremium && <Lock className="w-4 h-4 mr-2" />}
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
                      onClick={() => {
                        if (!isPremium) {
                          showError("Planning is a Premium feature. Upgrade to add planning.");
                          navigate("/pricing");
                          return;
                        }
                        setShowPlanningFields(true);
                      }}
                    >
                      {!isPremium && <Lock className="w-4 h-4 mr-2" />}
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

        {featuredGoal && (
          <div className="rounded-[2.5rem] border border-amber-100 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <div className="text-sm font-bold text-amber-800">Featured Goal</div>
                </div>
                <div className="mt-2 text-xl font-extrabold text-gray-900 truncate">{featuredGoal.name}</div>
                <div className="text-sm text-gray-600 truncate">{featuredGoal.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress value={getDerivedProgress(featuredGoal)} size={64} />
                <Button variant="outline" className="rounded-full" onClick={() => handleSetFeatured(undefined)}>
                  Clear
                </Button>
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/goals/${featuredGoal.id}`)}>
                  View
                </Button>
              </div>
            </div>
          </div>
        )}

        {favoriteGoals.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Favorites</h2>
              <div className="text-sm text-gray-500">{favoriteGoals.length}</div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteGoals.map((goal) => {
                const prog = getDerivedProgress(goal);
                const isFeatured = Boolean(user?.featuredGoalId && user.featuredGoalId === goal.id);
                return (
                  <Card key={goal.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => handleToggleFavorite(goal)} aria-label="Toggle favorite">
                              <Star className={`w-4 h-4 ${goal.isFavorite ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                            </button>
                            <h3 className="text-lg font-bold text-gray-900 truncate">{goal.name}</h3>
                            {isFeatured && <Crown className="w-4 h-4 text-amber-600" />}
                          </div>
                          <div className="text-sm text-gray-500 truncate">{goal.category}</div>
                          <div
                            className={`mt-3 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold ${getRemainingDaysBadgeClass(
                              goal,
                              prog,
                            )}`}
                          >
                            {getRemainingDaysText(goal)}
                          </div>
                        </div>
                        <CircularProgress value={prog} />
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <Button variant="outline" className="rounded-full" onClick={() => handleSetFeatured(isFeatured ? undefined : goal.id)}>
                          <Crown className="w-4 h-4 mr-2" /> {isFeatured ? "Unfeature" : "Feature"}
                        </Button>
                        <Button className="rounded-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/goals/${goal.id}`)}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

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
          {filteredGoals.map((goal) => {
            const prog = getDerivedProgress(goal);
            const isFeatured = Boolean(user?.featuredGoalId && user.featuredGoalId === goal.id);
            return (
            <Card key={goal.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleToggleFavorite(goal)} aria-label="Toggle favorite">
                      <Star className={`w-4 h-4 ${goal.isFavorite ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600" aria-label="Goal actions">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => handleSetFeatured(isFeatured ? undefined : goal.id)}>
                          {isFeatured ? "Remove featured" : "Set as featured"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleFavorite(goal)}>
                          {goal.isFavorite ? "Remove favorite" : "Add to favorites"}
                        </DropdownMenuItem>
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

                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 min-w-0 truncate group-hover:text-blue-600 transition-colors">
                    {goal.name}
                  </h3>
                  <div
                    className={`shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold ${getRemainingDaysBadgeClass(
                      goal,
                      prog,
                    )}`}
                  >
                    {getRemainingDaysText(goal)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.category}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900">{prog}%</span>
                  </div>
                  <Progress value={prog} className={`h-2 bg-gray-100 ${getProgressIndicatorClass(prog)}`} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {goal.priority === 'high' && (
                      <div className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                        <AlertCircle className="w-3 h-3" /> High Priority
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isFeatured && <Crown className="w-4 h-4 text-amber-600" />}
                    <CircularProgress value={prog} />
                    <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                      <Link to={`/goals/${goal.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}

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