import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar, TrendingUp, CheckCircle2, Award, Zap, ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";
import { useUser } from "@/contexts/UserContext";
import { showSuccess } from "@/utils/toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isPremium } = useUser();
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Your central hub for goal tracking and progress visualization</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="rounded-full h-10 w-10 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="secondary" className="rounded-full h-10 w-10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </Button>
            <Button variant="secondary" className="rounded-full h-10 w-10 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Key Metrics */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold dark:text-white">Key Metrics</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-gray-500">Completed Goals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">3</span>
                      <span className="text-sm font-bold text-gray-500">of 5</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-500">Target Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">50%</span>
                      <span className="text-sm font-bold text-gray-500">of 5 goals</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Features */}
          <div className="lg:col-span-2">
            <PremiumGate 
              isPremium={isPremium} 
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
                      asChild
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

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-sm rounded-[2.5rem] dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-xl font-bold dark:text-white">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-400">Completed Goal</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Launch LifePlan Web - 100% complete</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-400">Added New Goal</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Set up 3 new goals for Q3</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl bg-gray-50 dark:bg-gray-900">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-400">Updated Strategy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Refined goal-setting process</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Premium Feature 1 */}
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-gradient-to-br from-amber-50 to-orange-50 text-white">
            <CardHeader className="flex items-center gap-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI-Powered Strategy</h3>
                <p className="text-sm text-gray-400">Get personalized strategy recommendations based on your goals.</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-400">Unlock advanced analytics and AI-driven insights to optimize your goal-setting process.</p>
              <Button asChild variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-12">
                <Link to="/strategy">Explore Strategy System</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Feature 2 */}
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-blue-800 text-white">
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 bg-amber-100 text-amber-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">PDCA Review</h3>
                <p className="text-sm text-gray-400">Track your progress through the Plan-Do-Check-Act cycle.</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-400">Unlock advanced review capabilities with AI-powered insights and recommendations.</p>
              <Button asChild variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-12">
                <Link to="/strategy">Explore PDCA System</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Feature 3 */}
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-blue-800 text-white">
            <CardHeader className="flex flex-row items-center gap-2">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Loader2 className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Behavioral Analysis</h3>
                <p className="text-sm text-gray-400">Discover patterns in your goal-setting behavior and optimize your approach.</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-400">Unlock advanced behavioral insights with AI-powered analysis of your goal-setting patterns.</p>
              <Button asChild variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-12">
                <Link to="/strategy">Explore Behavioral Insights</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;