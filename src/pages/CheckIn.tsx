import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Star, Droplets, Check, MessageSquare } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const CheckIn = () => {
  const [habits, setHabits] = useState({
    exercise: false,
    eating: false,
    hydration: false,
  });

  const toggleHabit = (key: keyof typeof habits) => {
    setHabits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    showSuccess("Daily check-in saved! Great job staying consistent.");
  };

  const completedCount = Object.values(habits).filter(Boolean).length;
  const progress = (completedCount / 3) * 100;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Daily Check-in</h1>
          <p className="text-gray-500">Small daily wins lead to massive long-term results.</p>
        </div>

        {/* Progress Card */}
        <Card className="border-none shadow-lg rounded-[2.5rem] overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * progress) / 100}
                    className="text-blue-600 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{completedCount}/3</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Done</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {progress === 100 ? "Perfect Day! 🎉" : "Keep it going!"}
                </h2>
                <p className="text-sm text-gray-500">You're on a 5-day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habit Toggles */}
        <div className="grid gap-4">
          {[
            { id: 'exercise', label: 'Exercise', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
            { id: 'eating', label: 'Healthy Eating', icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { id: 'hydration', label: 'Hydration', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
          ].map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id as keyof typeof habits)}
              className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${
                habits[habit.id as keyof typeof habits] 
                  ? 'bg-white border-blue-600 shadow-md' 
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${habit.bg} ${habit.color} flex items-center justify-center`}>
                  <habit.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold text-gray-900">{habit.label}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                habits[habit.id as keyof typeof habits] 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border-2 border-gray-200 text-transparent'
              }`}>
                <Check className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>

        {/* Notes Section */}
        <Card className="border-none shadow-sm rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              Daily Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              className="w-full min-h-[120px] rounded-2xl border-gray-100 p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50" 
              placeholder="How was your day? Any reflections or gratitude?"
            />
            <Button onClick={handleSave} className="w-full mt-4 bg-gray-900 hover:bg-black text-white rounded-xl h-12">
              Save Check-in
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CheckIn;