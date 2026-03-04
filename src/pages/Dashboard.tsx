import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Zap, CheckCircle2, TrendingUp, Star, Plus, ArrowRight, Crown, Shield, BarChart3, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const { user, isPremium } = useUser();

  if (!user) return null;

  const featuredGoal = {
    name: "Launch LifePlan Web",
    progress: 65,
    category: "Business",
    timeframe: "months"
  };

  const todayTasks = [
    { id: "1", title: "Complete Dashboard UI", completed: true },
    { id: "2", title: "Integrate Auth Flow", completed: false },
    { id: "3", title: "Review Weekly Plan", completed: false },
  ];

  // Mock streak data for visualization
  const streakDays = [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: true },
    { day: 'S', active: false },
    { day: 'S', active: false },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hello, {user.displayName}! 👋</h1>
            <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your goals today.</p>
          </div>
          <div className="flex items-center gap-3">
            {!isPremium && (
              <Button asChild variant="outline" className="rounded-full border-amber-200 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100">
                <Link to="/pricing"><Crown className="w-4 h-4 mr-2" /> Upgrade to Premium</Link>
              </Button>
            )}
            <Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full">
              <Link to="/goals"><Plus className="w-4 h-4 mr-2" /> New Goal</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Goals", value: user.stats.totalGoals, icon: Target, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Completed", value: user.stats.completedGoals, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Current Streak", value: `${user.stats.currentStreak} days`, icon: Zap, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { label: "Success Rate", value: "84%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl dark:bg-gray-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Goal */}
            <Card className="border-none shadow-md rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-blue-200 fill-blue-200" />
                      <span className="text-sm font-medium text-blue-100 uppercase tracking-wider">Featured Goal</span>
                    </div>
                    <h2 className="text-2xl font-bold">{featuredGoal.name}</h2>
                  </div>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium">
                    {featuredGoal.category}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{featuredGoal.progress}%</span>
                  </div>
                  <Progress value={featuredGoal.progress} className="h-2 bg-white/20" />
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-blue-100">Target: 3 {featuredGoal.timeframe}</p>
                    <Button asChild variant="secondary" size="sm" className="rounded-full bg-white text-blue-600 hover:bg-blue-50">
                      <Link to="/goals/1">Update Progress</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <Card className="border-none shadow-sm rounded-[2rem] dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold dark:text-white">Today's Focus</CardTitle>
                <Button asChild variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700">
                  <Link to="/planning">View Plan <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors group">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-700 group-hover:border-blue-400'}`}>
                      {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`flex-1 font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full rounded-xl border-dashed border-2 h-12 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Link to="/planning"><Plus className="w-4 h-4 mr-2" /> Add Task</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Streak Visualization */}
            <Card className="border-none shadow-sm rounded-[2rem] dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold dark:text-white">Weekly Streak</CardTitle>
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center gap-2">
                  {streakDays.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        d.active ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-2 border-amber-200 dark:border-amber-900/50' : 'bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-700 border-2 border-transparent'
                      }`}>
                        <Zap className={`w-5 h-5 ${d.active ? 'fill-amber-600 dark:fill-amber-400' : ''}`} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{d.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/50">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium text-center">
                    You're on fire! Complete today's check-in to keep the streak alive.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Check-in */}
            <Card className="border-none shadow-sm rounded-[2rem] dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold dark:text-white">Daily Check-in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Exercise", icon: Zap, color: "text-amber-500" },
                  { label: "Healthy Eating", icon: Star, color: "text-emerald-500" },
                  { label: "Hydration", icon: CheckCircle2, color: "text-blue-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    <Button asChild size="sm" variant="outline" className="rounded-full px-4">
                      <Link to="/check-in">Log</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-none shadow-sm rounded-[2rem] bg-blue-50/50 dark:bg-blue-900/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button asChild variant="secondary" className="flex flex-col h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all gap-2">
                  <Link to="/strategy" className="flex flex-col items-center justify-center w-full h-full">
                    <Shield className="w-6 h-6 text-purple-600" />
                    <span className="text-xs font-bold dark:text-white">Strategy</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="flex flex-col h-24 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all gap-2">
                  <Link to="/insights" className="flex flex-col items-center justify-center w-full h-full">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-bold dark:text-white">Insights</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;