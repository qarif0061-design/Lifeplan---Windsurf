import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, PieChart, Target, Calendar, Clock, Shield, Zap, Award, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";
import { Link } from "react-router-dom";

const Insights = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [insightsData, setInsightsData] = useState({
    goalsCompleted: 0,
    goalsInProgress: 0,
    completionRate: 0,
    averageStreak: 0,
    bestStreak: 0,
    categories: [],
    timeSpent: 0,
    productivityScore: 0,
  });

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setInsightsData({
        goalsCompleted: 12,
        goalsInProgress: 5,
        completionRate: 71,
        averageStreak: 14,
        bestStreak: 28,
        categories: [
          { name: "Health", value: 35, color: "bg-emerald-500" },
          { name: "Career", value: 25, color: "bg-blue-500" },
          { name: "Personal", value: 20, color: "bg-purple-500" },
          { name: "Finance", value: 12, color: "bg-yellow-500" },
          { name: "Other", value: 8, color: "bg-gray-500" },
        ],
        timeSpent: 128,
        productivityScore: 82,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insights</h1>
            <p className="text-gray-500">Data-driven insights to optimize your goal achievement</p>
          </div>
          <Button variant="outline" className="rounded-full h-10 w-10 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Goals Completed</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">71%</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">14</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Streak</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Best Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold dark:text-white">Goal Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {insightsData.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{category.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Productivity Over Time */}
          <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold dark:text-white">Productivity Score</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      strokeDasharray={Math.PI * 28}
                      strokeDashoffset={(Math.PI * 28) - ((Math.PI * 28) * insightsData.productivityScore) / 100}
                      className="text-blue-600 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{insightsData.productivityScore}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Score</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                Your productivity score based on goal completion and consistency
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Premium Insights */}
        <PremiumGate 
          isPremium={true} 
          featureName="Advanced Analytics"
          description="Unlock deep behavioral insights, correlation analysis, and AI-powered growth recommendations."
        >
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-blue-800 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">AI-Powered Insights</h2>
                  <p className="text-sm text-gray-400">Discover patterns and optimize your strategy with AI-driven recommendations.</p>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  onClick={() => showSuccess("Premium features unlocked!")}
                  variant="secondary" 
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-12"
                >
                  <Link to="/strategy">Explore Premium Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </PremiumGate>
      </div>
    </Layout>
  );
};

export default Insights;