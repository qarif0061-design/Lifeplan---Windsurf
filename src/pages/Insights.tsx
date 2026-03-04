import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { TrendingUp, Calendar, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";
import { useState } from "react";

const Insights = () => {
  const [isPremium] = useState(false);

  const weeklyData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 5 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 6 },
    { name: 'Sat', tasks: 3 },
    { name: 'Sun', tasks: 2 },
  ];

  const progressData = [
    { month: 'Jan', progress: 20 },
    { month: 'Feb', progress: 35 },
    { month: 'Mar', progress: 45 },
    { month: 'Apr', progress: 60 },
    { month: 'May', progress: 75 },
    { month: 'Jun', progress: 85 },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insights & Analytics</h1>
            <p className="text-gray-500">Visualize your journey and track your growth.</p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            <Button variant="ghost" size="sm" className="rounded-lg bg-blue-50 text-blue-600">7 Days</Button>
            <Button variant="ghost" size="sm" className="rounded-lg">30 Days</Button>
            <Button variant="ghost" size="sm" className="rounded-lg">All Time</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Completion Rate", value: "78%", trend: "+12%", up: true },
            { label: "Avg. Daily Tasks", value: "5.4", trend: "+0.8", up: true },
            { label: "Focus Score", value: "92/100", trend: "-2%", up: false },
            { label: "Longest Streak", value: "14 days", trend: "New Record!", up: true },
          ].map((metric, i) => (
            <Card key={i} className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <div className={`flex items-center text-xs font-bold ${metric.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {metric.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                    {metric.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Task Activity Chart */}
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Weekly Task Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="tasks" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Goal Progress Chart */}
          <Card className="border-none shadow-sm rounded-[2rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Overall Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="progress" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Premium Insights Section */}
        <PremiumGate 
          isPremium={isPremium} 
          featureName="Advanced Analytics"
          description="Unlock deep behavioral insights, correlation analysis, and AI-powered growth recommendations."
        >
          <Card className="border-none shadow-sm rounded-[2rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                <Zap className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">AI Behavioral Analysis</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Our AI has detected that your productivity peaks on Tuesday mornings. We recommend scheduling your most difficult tasks for this window.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Peak Focus</p>
                  <p className="text-lg font-bold">9:00 AM - 11:30 AM</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Best Category</p>
                  <p className="text-lg font-bold">Business</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Consistency</p>
                  <p className="text-lg font-bold">High (94%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </PremiumGate>
      </div>
    </Layout>
  );
};

export default Insights;