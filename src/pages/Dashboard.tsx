import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
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
import { Apple, Smartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { showError, showSuccess } from "@/utils/toast";
import { useGoals } from "@/hooks/useGoals";
import { useDailyTasks } from "@/hooks/useDailyTasks";
import { createGoal } from "@/firebase/goals";
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
import type { Priority, Timeframe } from "@/types";

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

        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Get the mobile app</h2>
            <p className="text-gray-600">Plan and check-in from anywhere.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            <Button asChild className="rounded-2xl bg-gray-900 hover:bg-black text-white h-12 justify-start">
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
            <Button disabled className="rounded-2xl bg-white border border-gray-200 text-gray-700 h-12 justify-start">
              <span className="flex items-center">
                <Smartphone className="w-5 h-5 mr-3" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] text-gray-500">Google Play</span>
                  <span className="text-sm font-bold">Coming soon</span>
                </span>
              </span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=active")}
            className="border-none shadow-sm rounded-[2.5rem] bg-blue-50 border border-blue-100 cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-6 text-center relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 h-9 w-9 rounded-full hover:bg-blue-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openCreateGoalDialog();
                }}
                aria-label="Add new goal"
              >
                <Plus className="w-4 h-4" />
              </Button>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stats.activeCount}</div>
              <p className="text-sm font-medium text-gray-500">Active Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=completed")}
            className="border-none shadow-sm rounded-[2.5rem] bg-emerald-50 border border-emerald-100 cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-2">{stats.completedCount}</div>
              <p className="text-sm font-medium text-gray-500">Completed Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/goals?status=failed")}
            className="border-none shadow-sm rounded-[2.5rem] bg-rose-50 border border-rose-100 cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-rose-600 mb-2">{stats.failedCount}</div>
              <p className="text-sm font-medium text-gray-500">Failed Goals</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/check-in")}
            className="border-none shadow-sm rounded-[2.5rem] bg-purple-50 border border-purple-100 cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{daysStreak}</div>
              <p className="text-sm font-medium text-gray-500">Days Streak</p>
            </CardContent>
          </Card>
          <Card
            role="button"
            tabIndex={0}
            onClick={() => navigate("/insights")}
            className="border-none shadow-sm rounded-[2.5rem] bg-amber-50 border border-amber-100 cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-amber-600 mb-2">{stats.avgProgress}%</div>
              <p className="text-sm font-medium text-gray-500">Avg. Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals Overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Goals Overview</h2>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search goals..."
              className="pl-10 rounded-2xl bg-white border-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-none shadow-sm rounded-[2.5rem] mb-8">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">Daily Tasks</CardTitle>
              <p className="text-sm text-gray-500">Plan your day and keep momentum.</p>
            </div>
            <Button
              type="button"
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/daily-planner")}
            >
              <ListTodo className="w-4 h-4 mr-2" /> Open Daily Planner
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4">
              <div className="text-sm font-medium text-gray-700">Today’s priorities</div>
              <div className="text-sm font-semibold text-gray-900">
                {todaysPrioritiesProgress.done}/{todaysPrioritiesProgress.total}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardGoals.map((goal) => (
            <Card key={goal.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {goal.name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.category}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2 bg-gray-100" />
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

          {/* Empty State Card */}
          <Card
            onClick={() => openCreateGoalDialog()}
            className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Add new goal</p>
              <p className="text-sm text-gray-500">Add new goal, start a new journey</p>
            </div>
          </Card>
        </div>

        {stats.failedCount > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Failed Goals</h2>
              <span className="text-sm text-gray-500">Overdue goals that weren’t completed in time</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.failed.map((goal) => (
                <Card key={goal.id} className="border-none shadow-sm rounded-[2rem] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                        failed
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{goal.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{goal.category}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-900">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2 bg-gray-100" />
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-end">
                      <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-5 h-5" />
                <h3 className="text-xl font-bold">Unlock Premium Features</h3>
                <Crown className="w-5 h-5" />
              </div>
              <p className="text-lg mb-6">Get unlimited goals, unlimited Daily Planner tasks, advanced analytics, and AI-powered insights.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-amber-400 text-gray-900 hover:bg-amber-300 rounded-full px-8">
                  <Link to="/pricing">View Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 text-xs text-center text-gray-500">
          <Link to="/terms" className="underline">Terms</Link>
          <span> · </span>
          <Link to="/privacy" className="underline">Privacy</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;