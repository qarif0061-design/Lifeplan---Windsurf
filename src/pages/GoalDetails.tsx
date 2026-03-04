import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  Calendar, 
  ChevronLeft, 
  Edit3, 
  Trophy, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Shield,
  Plus,
  Trash2
} from "lucide-react";
import { showSuccess } from "@/utils/toast";
import confetti from "canvas-confetti";

const GoalDetails = () => {
  const { id } = useParams();
  const [newMilestone, setNewMilestone] = useState("");
  
  // Mock goal data with state for interactivity
  const [goal, setGoal] = useState({
    id,
    name: "Launch LifePlan Web",
    category: "Business",
    description: "Build and deploy the full-featured web version of the LifePlan application with premium features and AI integration.",
    progress: 65,
    status: "active",
    priority: "high",
    timeframe: "months",
    timeframeValue: 3,
    createdAt: "2024-08-15",
    successMetric: "100% feature completion and successful Vercel deployment.",
    milestones: [
      { id: "m1", title: "Core UI Components", completed: true },
      { id: "m2", title: "Authentication Flow", completed: true },
      { id: "m3", title: "Goal Management System", completed: true },
      { id: "m4", title: "Premium Gating Logic", completed: false },
      { id: "m5", title: "AI Integration", completed: false },
    ]
  });

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const toggleMilestone = (milestoneId: string) => {
    const updatedMilestones = goal.milestones.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    
    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
    
    if (newProgress === 100 && goal.progress < 100) {
      triggerCelebration();
      showSuccess("Congratulations! Goal completed! 🎉");
    } else {
      showSuccess("Milestone updated!");
    }
    
    setGoal({ ...goal, milestones: updatedMilestones, progress: newProgress });
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    const milestone = {
      id: Math.random().toString(36).substr(2, 9),
      title: newMilestone,
      completed: false
    };
    const updatedMilestones = [...goal.milestones, milestone];
    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
    
    setGoal({ ...goal, milestones: updatedMilestones, progress: newProgress });
    setNewMilestone("");
    showSuccess("Milestone added!");
  };

  const deleteMilestone = (milestoneId: string) => {
    const updatedMilestones = goal.milestones.filter(m => m.id !== milestoneId);
    const completedCount = updatedMilestones.filter(m => m.completed).length;
    const newProgress = updatedMilestones.length > 0 
      ? Math.round((completedCount / updatedMilestones.length) * 100) 
      : 0;
    
    setGoal({ ...goal, milestones: updatedMilestones, progress: newProgress });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        {/* Breadcrumbs / Back */}
        <Link to="/goals" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Goals
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-gray-900">{goal.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                goal.progress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {goal.progress === 100 ? 'Completed' : goal.status}
              </span>
            </div>
            <p className="text-gray-500 max-w-2xl">{goal.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Goal
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full" onClick={() => showSuccess("Progress synced!")}>
              Sync Progress
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Progress & Milestones */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <Card className="border-none shadow-sm rounded-[2.5rem] overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-end">
                  <span className={`text-5xl font-black ${goal.progress === 100 ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {goal.progress}%
                  </span>
                  <span className="text-sm font-medium text-gray-500">Target: 100%</span>
                </div>
                <Progress value={goal.progress} className={`h-4 bg-gray-100 ${goal.progress === 100 ? '[&>div]:bg-emerald-500' : ''}`} />
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Started</p>
                    <p className="font-bold text-gray-900">Aug 15</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Timeframe</p>
                    <p className="font-bold text-gray-900">3 Months</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Priority</p>
                    <p className="font-bold text-rose-600">High</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Milestones</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add milestone..." 
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                    className="rounded-full w-48"
                  />
                  <Button onClick={addMilestone} size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {goal.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <button 
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${milestone.completed ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-200 text-transparent hover:border-emerald-300'}`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <span className={`flex-1 font-medium ${milestone.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {milestone.title}
                    </span>
                    <Button onClick={() => deleteMilestone(milestone.id)} variant="ghost" size="icon" className="text-gray-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Strategy & Success Metric */}
          <div className="space-y-8">
            {/* Success Metric */}
            <Card className={`border-none shadow-sm rounded-[2.5rem] text-white transition-colors ${goal.progress === 100 ? 'bg-emerald-600' : 'bg-blue-600'}`}>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-200" />
                  Success Metric
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-50 leading-relaxed">
                  {goal.successMetric}
                </p>
              </CardContent>
            </Card>

            {/* Strategy Quick Link */}
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-purple-50 border border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-purple-900">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Goal Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-700">
                  You have defined a strategy for this goal. Review your "Why" to stay motivated.
                </p>
                <Button asChild variant="secondary" className="w-full bg-white text-purple-600 hover:bg-purple-100 rounded-xl">
                  <Link to="/strategy">View Strategy</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Time Remaining */}
            <Card className="border-none shadow-sm rounded-[2.5rem]">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-6">
                <div className="text-4xl font-black text-gray-900 mb-1">
                  {goal.progress === 100 ? '0' : '42'}
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Days Left</p>
                <div className={`mt-6 flex items-center justify-center gap-2 text-xs font-medium py-2 rounded-full ${
                  goal.progress === 100 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                }`}>
                  {goal.progress === 100 ? (
                    <><CheckCircle2 className="w-3 h-3" /> Goal achieved ahead of schedule!</>
                  ) : (
                    <><AlertCircle className="w-3 h-3" /> On track to finish by Nov 15</>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoalDetails;