import Layout from "@/components/Layout";
import { useId, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Plus,
  Search,
  Star,
  AlertCircle,
  Crown,
  Lock,
  ListTodo
} from "lucide-react";
import { Apple, Smartphone, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { createGoal } from "@/firebase/goals";
import { generateShareCard, shareImage, type CardData } from "@/utils/shareCard";
import type { Goal } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority } from "@/types";

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

const getRemainingDaysText = (g: Goal): string => {
  const endValue = (g as unknown as { endDate?: unknown }).endDate;
  const end = typeof endValue === "string" ? endValue.trim() : "";
  if (!end) return "No date set";
  const parsedEnd = new Date(end);
  const endAt = Number.isNaN(parsedEnd.getTime())
    ? new Date(`${end}T23:59:59.999`).getTime()
    : parsedEnd.getTime();
  if (Number.isNaN(endAt)) return "No date set";
  const now = Date.now();
  const diffMs = endAt - now;
  const days = Math.ceil(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  if (diffMs < 0) return `Overdue ${days}d`;
  return `${days}d left`;
};

  const getRemainingDaysBadgeClass = (g: Goal): string => {
    const pct = getDerivedProgress(g);
    if (!g.endDate) return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
    if (pct >= 100) return "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300";
    if (pct < 20) return "bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300";
    if (pct < 50) return "bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300";
    return "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300";
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

const CircularProgress = ({ value, size = 64 }: { value: number; size?: number }) => {
  const gradId = useId();
  const stroke = 12;
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
          className="text-white/60"
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
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-900 dark:text-white">
        {pct}%
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, isPremium } = useUser();
  const { goals, stats } = useGoals();
  const { days: dailyTaskDays } = useDailyTasks();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

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

  const daysStreak = user?.stats?.currentStreak ?? 0;

  const todayKey = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const todaysPrioritiesProgress = useMemo(() => {
    const day = dailyTaskDays.find((d) => d.date === todayKey);
    const total = (day?.priorities ?? []).filter((p) => (p.title ?? "").trim().length > 0).length;
    const done = (day?.priorities ?? []).filter((p) => p.completed && (p.title ?? "").trim().length > 0).length;
    return { total, done };
  }, [dailyTaskDays, todayKey]);

  const openCreateGoalDialog = () => {
    if (!isPremium && goals.length >= 1) {
      showError("Free users can only create 1 goal. Upgrade to Premium for unlimited goals.");
      return;
    }
    setIsDialogOpen(true);
  };

  const shareStreakCard = async () => {
    if (!user) return;
    try {
      const data: CardData = {
        type: "streak",
        title: `${daysStreak}-Day Streak`,
        subtitle: "on GoalPlanner",
        value: `${daysStreak}`,
        metric: "consecutive days",
        userName: user.displayName || user.email,
      };
      const blob = await generateShareCard(data);
      await shareImage(blob, `streak-${daysStreak}.png`);
    } catch {}
  };

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
      const message = e instanceof Error ? e.message : "Failed to create goal";
      showError(message);
    } finally {
      setIsCreating(false);
    }
  };

  const dashboardGoals = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return goals;
    return goals.filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q));
  }, [goals, searchQuery]);

  const effectiveFeaturedGoal = useMemo(() => {
    const featuredId = user?.featuredGoalId;
    const byId = featuredId ? goals.find((g) => g.id === featuredId) : undefined;
    return byId ?? goals[0] ?? null;
  }, [goals, user?.featuredGoalId]);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Track your progress and stay on top of your goals.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
                onClick={() => {
                  openCreateGoalDialog();
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
                        <Label htmlFor="strategy-no">What will you say \"no\" to?</Label>
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

        <div className="rounded-[2.5rem] border border-gray-100 dark:border-slate-700/50 bg-white dark:bg-slate-900/80 p-8 shadow-sm dark:shadow-slate-900/50 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Get the mobile app</h2>
            <p className="text-gray-600 dark:text-slate-400">Plan and check-in from anywhere.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            <Button asChild className="rounded-2xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white h-12 justify-start transition-all duration-200 hover:scale-105">
              <a
                href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Apple className="w-5 h-5 mr-3" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] opacity-80">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </span>
              </a>
            </Button>
            <Button asChild className="rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 h-12 justify-start hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-105">
              <a
                href="https://play.google.com/store/apps/details?id=com.faran.lifeplans"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Smartphone className="w-5 h-5 mr-3" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">Google Play</span>
                  <span className="text-sm font-bold">Download on Google Play</span>
                </span>
              </a>
            </Button>
          </div>
        </div>

        {effectiveFeaturedGoal && (
          <Card className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] mb-8 overflow-hidden animate-fade-up">
            <CardContent className="p-8 bg-gradient-to-br from-amber-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-amber-100 dark:border-slate-700/50 rounded-[2.5rem] transition-colors duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                    <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <div className="text-xs font-extrabold uppercase tracking-wider">Featured Goal</div>
                    {!user?.featuredGoalId && (
                      <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">(auto)</div>
                    )}
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="text-3xl font-black text-gray-900 dark:text-white truncate">{effectiveFeaturedGoal.name}</div>
                    <div
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold ${getRemainingDaysBadgeClass(
                        effectiveFeaturedGoal,
                      )}`}
                    >
                      {getRemainingDaysText(effectiveFeaturedGoal)}
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-600 dark:text-slate-400 truncate">{effectiveFeaturedGoal.category}</div>
                  {(effectiveFeaturedGoal.startDate || effectiveFeaturedGoal.endDate) && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-slate-400">
                      <span className="font-semibold text-gray-700 dark:text-slate-300">Dates:</span>{" "}
                      {effectiveFeaturedGoal.startDate ?? ""} → {effectiveFeaturedGoal.endDate ?? ""}
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-gray-700 dark:text-slate-300">Progress</span>
                      <span className="text-gray-900 dark:text-white">
                        {(() => {
                          const cps = effectiveFeaturedGoal.checkpoints ?? [];
                          if (cps.length === 0) return `${getDerivedProgress(effectiveFeaturedGoal)}%`;
                          const done = cps.filter((c) => {
                            if (c.kind === "number") {
                              const target = Math.max(0, c.target ?? 0);
                              const current = Math.max(0, c.current ?? 0);
                              return target > 0 && current >= target;
                            }
                            return c.completed;
                          }).length;
                          return `${done}/${cps.length} (${getDerivedProgress(effectiveFeaturedGoal)}%)`;
                        })()}
                      </span>
                    </div>
                    <Progress
                      value={getDerivedProgress(effectiveFeaturedGoal)}
                      className={`h-6 bg-white ${getProgressIndicatorClass(getDerivedProgress(effectiveFeaturedGoal))}`}
                    />
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      className="rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate(`/goals/${effectiveFeaturedGoal.id}`)}
                    >
                      View Goal
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => openCreateGoalDialog()}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Goal
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-start lg:justify-end gap-5">
                  <CircularProgress value={getDerivedProgress(effectiveFeaturedGoal)} size={198} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=active")}
            className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/30 cursor-pointer hover:shadow-md dark:hover:shadow-blue-900/30 hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6 text-center relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openCreateGoalDialog();
                }}
                aria-label="Add new goal"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.activeCount}</div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Active Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=completed")}
            className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/30 cursor-pointer hover:shadow-md dark:hover:shadow-emerald-900/30 hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{stats.completedCount}</div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Completed Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=failed")}
            className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800/30 cursor-pointer hover:shadow-md dark:hover:shadow-rose-900/30 hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">{stats.failedCount}</div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Failed Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/check-in")}
            className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/30 cursor-pointer hover:shadow-md dark:hover:shadow-purple-900/30 hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6 text-center relative">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{daysStreak}</div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Days Streak</p>
              <button
                onClick={(e) => { e.stopPropagation(); shareStreakCard(); }}
                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800/50 transition"
                title="Share streak"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400 dark:text-purple-300" />
              </button>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/insights")}
            className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/30 cursor-pointer hover:shadow-md dark:hover:shadow-amber-900/30 hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">{stats.avgProgress}%</div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Avg. Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goals Overview</h2>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
            <Input
              placeholder="Search goals..."
              className="pl-10 rounded-2xl bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2.5rem] mb-8 animate-fade-up">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Daily Tasks</CardTitle>
              <p className="text-sm text-gray-500 dark:text-slate-400">Plan your day and keep momentum.</p>
            </div>
            <Button
              type="button"
              className="rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105"
              onClick={() => navigate("/daily-planner")}
            >
              <ListTodo className="w-4 h-4 mr-2" /> Open Daily Planner
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-colors duration-300">
              <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Today's priorities</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {todaysPrioritiesProgress.done}/{todaysPrioritiesProgress.total}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardGoals.map((goal) => (
            <Card key={goal.id} className="border-none shadow-sm dark:shadow-slate-900/50 hover:shadow-md dark:hover:shadow-slate-800/50 transition-all duration-300 rounded-[2rem] overflow-hidden animate-fade-up">
              <CardContent className="p-6 bg-white dark:bg-slate-900 transition-colors duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white min-w-0 truncate">{goal.name}</h3>
                  <div
                    className={`shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold ${getRemainingDaysBadgeClass(
                      goal,
                    )}`}
                  >
                    {getRemainingDaysText(goal)}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.category}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500 dark:text-slate-400">Progress</span>
                    <span className="text-gray-900 dark:text-white">{getDerivedProgress(goal)}%</span>
                  </div>
                  <Progress
                    value={getDerivedProgress(goal)}
                    className={`h-2 bg-gray-100 dark:bg-slate-700 ${getProgressIndicatorClass(getDerivedProgress(goal))}`}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {goal.priority === 'high' && (
                      <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-bold">
                        <AlertCircle className="w-3 h-3" /> High Priority
                      </div>
                    )}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-full transition-all duration-200">
                    <Link to={`/goals/${goal.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State Card */}
          <Card
            onClick={() => openCreateGoalDialog()}
            className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-200 group cursor-pointer animate-fade-up"
          >
            <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              <Plus className="w-6 h-6 text-gray-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 dark:text-white">Add new goal</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">Add new goal, start a new journey</p>
            </div>
          </Card>
        </div>

        {stats.failedCount > 0 && (
          <div className="mt-10 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Failed Goals</h2>
              <span className="text-sm text-gray-500 dark:text-slate-400">Overdue goals that weren't completed in time</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.failed.map((goal) => (
                <Card key={goal.id} className="border-none shadow-sm dark:shadow-slate-900/50 rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6 bg-white dark:bg-slate-900 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                        failed
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{goal.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{goal.category}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-500 dark:text-slate-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{getDerivedProgress(goal)}%</span>
                      </div>
                      <Progress
                        value={getDerivedProgress(goal)}
                        className={`h-2 bg-gray-100 dark:bg-slate-700 ${getProgressIndicatorClass(getDerivedProgress(goal))}`}
                      />
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-700/50 flex items-center justify-end">
                      <Button asChild variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-full transition-all duration-200">
                        <Link to={`/goals/${goal.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Premium Features */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-[3rem] p-8 text-white shadow-lg dark:shadow-purple-900/30 animate-fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-5 h-5" />
                <h3 className="text-xl font-bold">Unlock Premium Features</h3>
                <Crown className="w-5 h-5" />
              </div>
              <p className="text-lg mb-6">Get unlimited goals, unlimited Daily Planner tasks, advanced analytics, and AI-powered insights.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-amber-400 text-gray-900 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 rounded-full px-8 transition-all duration-200 hover:scale-105">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 text-xs text-center text-gray-500 dark:text-slate-400">
          <Link to="/terms" className="underline">Terms</Link>
          <span> · </span>
          <Link to="/privacy" className="underline">Privacy</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;