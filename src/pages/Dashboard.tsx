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
  ListTodo,
  TrendingUp,
  Flame,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Apple, Smartphone, Share2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { createGoal } from "@/firebase/goals";
import { generateShareCard, shareImage, type CardData } from "@/utils/shareCard";
import { createShare as saveShareRecord, buildGoalShareData } from "@/firebase/shares";
import { FREE_GOAL_LIMIT } from "@/constants/product";
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
import { calculateProgress } from "@/utils/progress";

const getDerivedProgress = (g: Goal): number => {
  return calculateProgress(g.checkpoints, g.progress);
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
  if (!g.endDate) return "bg-secondary text-muted-foreground";
  if (pct >= 100) return "bg-momentum/10 text-momentum";
  if (pct < 20) return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  if (pct < 50) return "bg-ember/10 text-ember";
  return "bg-primary/10 text-primary";
};

// A single, calm accent per state — not a rainbow gradient. Progress fills read as
// data, not decoration: momentum green once complete, primary blue otherwise.
const getProgressBarClass = (pct: number): string =>
  pct >= 100 ? "[&>div]:bg-momentum" : "[&>div]:bg-primary";

const getProgressStrokeColor = (pct: number): string =>
  pct >= 100 ? "hsl(var(--momentum))" : "hsl(var(--primary))";

const CircularProgress = ({ value, size = 64, trackClassName = "text-secondary" }: { value: number; size?: number; trackClassName?: string }) => {
  const gradId = useId();
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, value));
  const dash = (pct / 100) * circumference;
  const color = getProgressStrokeColor(pct);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className={trackClassName}
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          stroke={color}
          fill="transparent"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          id={gradId}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-foreground">
        {pct}%
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, isPremium } = useUser();
  const greetingName = user?.displayName?.trim() ? user.displayName.trim() : "";
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
    if (!isPremium && goals.length >= FREE_GOAL_LIMIT) {
      showError(`Free users can only create ${FREE_GOAL_LIMIT} goals. Upgrade to Premium for unlimited goals.`);
      navigate("/pricing");
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
      const shareData = buildGoalShareData(`${daysStreak}-Day Streak`, 100, daysStreak, 0, daysStreak);
      await saveShareRecord(user.uid, 'streak', `${daysStreak}-Day Streak`, shareData, `on GoalPlanner`);
    } catch {}
  };

  const handleCreateGoal = async () => {
    if (!user) {
      showError("Please sign in to create goals.");
      return;
    }
    if (!isPremium && goals.length >= FREE_GOAL_LIMIT) {
      showError(`Free users can only create ${FREE_GOAL_LIMIT} goals. Upgrade to Premium for unlimited goals.`);
      navigate("/pricing");
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

  const greeting = greetingName
    ? `Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, ${greetingName}`
    : 'Welcome to Goal Planner';

  const otherCount = Math.max(0, goals.length - stats.activeCount - stats.completedCount - stats.failedCount);
  const goalStatusData = [
    { name: "Active", value: stats.activeCount, color: "hsl(var(--primary))" },
    { name: "Completed", value: stats.completedCount, color: "hsl(var(--momentum))" },
    { name: "Failed", value: stats.failedCount, color: "#e11d48" },
    { name: "Other", value: otherCount, color: "hsl(var(--muted-foreground))" },
  ].filter((d) => d.value > 0);

  const statCards = [
    { label: "Active", value: stats.activeCount, icon: Target, onClick: () => navigate("/goals?status=active") },
    { label: "Completed", value: stats.completedCount, icon: CheckCircle2, onClick: () => navigate("/goals?status=completed") },
    { label: "Day streak", value: daysStreak, icon: Flame, onClick: () => navigate("/check-in"), share: true },
    { label: "Avg. progress", value: `${stats.avgProgress}%`, icon: TrendingUp, onClick: () => navigate("/insights") },
    { label: "Failed", value: stats.failedCount, icon: AlertCircle, onClick: () => navigate("/goals?status=failed"), muted: true },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header — a calm, information-first bar rather than a marketing hero */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="text-sm text-muted-foreground font-mono">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight mt-1">
              {greeting}
            </h1>
            <p className="text-muted-foreground mt-1.5 max-w-xl">
              {effectiveFeaturedGoal
                ? <>Focus today: <span className="text-foreground font-medium">{effectiveFeaturedGoal.name}</span> — {getDerivedProgress(effectiveFeaturedGoal)}% complete</>
                : 'Set your goals, track your progress, achieve more.'}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 h-11 font-semibold shrink-0"
                onClick={() => openCreateGoalDialog()}
              >
                <Plus className="w-4 h-4 mr-2" /> New Goal
              </Button>
            </DialogTrigger>
          <DialogContent className="w-[92vw] sm:max-w-[520px] md:w-[50vw] md:max-w-[720px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold">Create New Goal</DialogTitle>
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
                      <h4 className="font-semibold text-foreground">Strategy</h4>
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
                      <h4 className="font-semibold text-foreground">Planning</h4>
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
              <Button onClick={handleCreateGoal} disabled={isCreating} className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12">
                {isCreating ? "Creating..." : "Create Goal"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>

        {/* Stats — uniform data tiles, one small colored badge each, not full-tint cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {statCards.map((s) => (
            <Card
              key={s.label}
              role="button"
              tabIndex={0}
              onClick={s.onClick}
              className="border border-border shadow-none rounded-xl bg-card cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all duration-150 relative"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.muted ? "bg-rose-500/10" : "bg-primary/10"}`}>
                    <s.icon className={`w-4 h-4 ${s.muted ? "text-rose-600 dark:text-rose-400" : "text-primary"}`} />
                  </div>
                  {s.share && (
                    <button
                      onClick={(e) => { e.stopPropagation(); shareStreakCard(); }}
                      className="text-muted-foreground/50 hover:text-foreground transition-colors"
                      title="Share streak"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="text-2xl font-bold font-mono text-foreground mt-3 tabular-nums">{s.value}</div>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Goals by status — a real pie chart, not another stat tile */}
        {goals.length > 0 && (
          <Card className="border border-border shadow-none rounded-2xl animate-fade-up">
            <CardHeader>
              <CardTitle className="text-base font-bold text-foreground">Goals by Status</CardTitle>
              <p className="text-sm text-muted-foreground">How your {goals.length} goal{goals.length === 1 ? "" : "s"} break down right now.</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={goalStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {goalStatusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 12,
                        fontSize: 13,
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={32}
                      formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured goal — a calm, precise card, not a full-bleed gradient hero */}
        {effectiveFeaturedGoal && (
          <Card className="border border-border shadow-none rounded-2xl overflow-hidden animate-fade-up">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-ember">
                    <Crown className="w-3.5 h-3.5" />
                    <div className="text-xs font-bold uppercase tracking-widest">Featured Goal</div>
                    {!user?.featuredGoalId && (
                      <div className="text-xs font-medium text-muted-foreground">(auto)</div>
                    )}
                  </div>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="text-2xl md:text-3xl font-display font-bold text-foreground truncate">{effectiveFeaturedGoal.name}</div>
                    <div
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold w-fit ${getRemainingDaysBadgeClass(
                        effectiveFeaturedGoal,
                      )}`}
                    >
                      {getRemainingDaysText(effectiveFeaturedGoal)}
                    </div>
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground truncate">{effectiveFeaturedGoal.category}</div>
                  {(effectiveFeaturedGoal.startDate || effectiveFeaturedGoal.endDate) && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Dates:</span>{" "}
                      {effectiveFeaturedGoal.startDate ?? ""} → {effectiveFeaturedGoal.endDate ?? ""}
                    </div>
                  )}
                  <div className="mt-6 space-y-2 max-w-md">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-mono">
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
                    className={`h-2 bg-secondary ${getProgressBarClass(getDerivedProgress(effectiveFeaturedGoal))}`}
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    className="rounded-xl bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/goals/${effectiveFeaturedGoal.id}`)}
                  >
                    View Goal
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => openCreateGoalDialog()}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Goal
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-start lg:justify-end">
                <CircularProgress value={getDerivedProgress(effectiveFeaturedGoal)} size={116} />
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Mobile App */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-none transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Get the mobile app</h3>
              <p className="text-sm text-muted-foreground">Plan and check-in from anywhere.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button asChild className="rounded-xl bg-foreground hover:bg-foreground/90 text-background h-10 px-4 text-sm flex-1 md:flex-none">
              <a
                href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Apple className="w-4 h-4 mr-2" /> App Store
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-xl h-10 px-4 text-sm flex-1 md:flex-none">
              <a
                href="https://play.google.com/store/apps/details?id=com.faran.lifeplans"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="w-4 h-4 mr-2" /> Google Play
              </a>
            </Button>
          </div>
        </div>

        {/* Goals Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-up">
          <h2 className="text-xl font-display font-bold text-foreground">Goals Overview</h2>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
            <Input
              placeholder="Search goals..."
              className="pl-10 rounded-xl bg-card border-border text-foreground placeholder:text-muted-foreground/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border border-border shadow-none rounded-2xl animate-fade-up">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold text-foreground">Daily Tasks</CardTitle>
              <p className="text-sm text-muted-foreground">Plan your day and keep momentum.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => navigate("/daily-planner")}
            >
              <ListTodo className="w-4 h-4 mr-2" /> Open Daily Planner
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4">
              <div className="text-sm font-medium text-foreground/80">Today's priorities</div>
              <div className="text-sm font-semibold text-foreground font-mono">
                {todaysPrioritiesProgress.done}/{todaysPrioritiesProgress.total}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboardGoals.map((goal) => (
            <Card key={goal.id} className="border border-border shadow-none hover:border-primary/40 hover:shadow-sm transition-all duration-150 rounded-2xl bg-card overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-momentum/10 text-momentum' : 'bg-primary/10 text-primary'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.isFavorite && <Star className="w-3.5 h-3.5 text-ember fill-ember" />}
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">{goal.name}</h3>

                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>{goal.category}</span>
                  </div>
                  <span className="text-muted-foreground/50">·</span>
                  <span className={getRemainingDaysBadgeClass(goal).split(' ').slice(0, 2).join(' ')}>
                    {getRemainingDaysText(goal)}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-semibold font-mono">{getDerivedProgress(goal)}%</span>
                  </div>
                  <Progress
                    value={getDerivedProgress(goal)}
                    className={`h-1.5 bg-secondary ${getProgressBarClass(getDerivedProgress(goal))}`}
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  {goal.priority === 'high' ? (
                    <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                      <AlertCircle className="w-3 h-3" /> High
                    </div>
                  ) : (
                    <div />
                  )}
                  <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg text-xs h-8 px-3">
                    <Link to={`/goals/${goal.id}`}>View <ArrowRight className="w-3 h-3 ml-1" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Empty State Card */}
          <Card
            onClick={() => openCreateGoalDialog()}
            className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 group cursor-pointer animate-fade-up"
          >
            <div className="w-11 h-11 bg-secondary/40 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus className="w-5 h-5 text-muted-foreground/70 group-hover:text-primary" />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground text-sm">Add new goal</p>
              <p className="text-sm text-muted-foreground">Start a new journey</p>
            </div>
          </Card>
        </div>

        {stats.failedCount > 0 && (
          <div className="animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-foreground">Failed Goals</h2>
              <span className="text-sm text-muted-foreground">Overdue goals that weren't completed in time</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.failed.map((goal) => (
                <Card key={goal.id} className="border border-border shadow-none rounded-2xl overflow-hidden bg-card hover:border-rose-500/30 hover:shadow-sm transition-all duration-150">
                  <CardContent className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        failed
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">{goal.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Target className="w-3 h-3" />
                      <span>{goal.category}</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-semibold font-mono">{getDerivedProgress(goal)}%</span>
                      </div>
                      <Progress
                        value={getDerivedProgress(goal)}
                        className={`h-1.5 bg-secondary ${getProgressBarClass(getDerivedProgress(goal))}`}
                      />
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-end">
                      <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg text-xs h-8 px-3">
                        <Link to={`/goals/${goal.id}`}>View <ArrowRight className="w-3 h-3 ml-1" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Premium Features — a quiet, bordered card rather than a loud gradient block */}
        {!isPremium && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 animate-fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-ember" />
                <h3 className="text-lg font-display font-bold text-foreground">Unlock Premium Features</h3>
              </div>
              <p className="text-muted-foreground">Get unlimited goals, unlimited Daily Planner tasks, advanced analytics, and AI-powered insights.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl px-6">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 text-xs text-center text-muted-foreground">
          <Link to="/terms" className="underline">Terms</Link>
          <span> · </span>
          <Link to="/privacy" className="underline">Privacy</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
