import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Shield
} from "lucide-react";

const GoalDetails = () => {
  const { id } = useParams();

  // Mock goal data for the specific ID
  const goal = {
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
      { title: "Core UI Components", completed: true },
      { title: "Authentication Flow", completed: true },
      { title: "Goal Management System", completed: true },
      { title: "Premium Gating Logic", completed: false },
      { title: "AI Integration", completed: false },
    ]
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
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {goal.status}
              </span>
            </div>
            <p className="text-gray-500 max-w-2xl">{goal.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Goal
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
              Update Progress
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
                  <span className="text-5xl font-black text-gray-900">{goal.progress}%</span>
                  <span className="text-sm font-medium text-gray-500">Target: 100%</span>
                </div>
                <Progress value={goal.progress} className="h-4 bg-gray-100" />
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
              <CardHeader>
                <CardTitle className="text-xl font-bold">Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goal.milestones.map((milestone, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-200 text-transparent'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className={`font-medium ${milestone.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {milestone.title}
                    </span>
                  </div>
                ))}
                <Button variant="ghost" className="w-full rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 h-12">
                  + Add Milestone
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Strategy & Success Metric */}
          <div className="space-y-8">
            {/* Success Metric */}
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-blue-600 text-white">
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
                <div className="text-4xl font-black text-gray-900 mb-1">42</div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Days Left</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 py-2 rounded-full">
                  <AlertCircle className="w-3 h-3" /> On track to finish by Nov 15
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