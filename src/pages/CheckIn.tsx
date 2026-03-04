import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Star, Droplets, Check, MessageSquare, Calendar, TrendingUp, Award } from "lucide-react";
import { showSuccess } from "@/utils/toast";
import confetti from "canvas-confetti";

const CheckIn = () => {
  const [habits, setHabits] = useState({
    exercise: false,
    eating: false,
    hydration: false,
  });

  const [dailyNote, setDailyNote] = useState("");
  const [streakCount, setStreakCount] = useState(5);
  const [lastCheckIn, setLastCheckIn] = useState(new Date().toISOString().split('T')[0]);

  const toggleHabit = (key: keyof typeof habits) => {
    const newHabits = { ...habits, [key]: !habits[key] };
    setHabits(newHabits);
    
    // Trigger confetti if all habits are completed
    if (Object.values(newHabits).every(Boolean)) {
      triggerCelebration();
      showSuccess("Perfect day! You've completed all your habits! 🎉");
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#f59e0b']
    });
  };

  const handleSave = () => {
    showSuccess("Daily check-in saved! Great job staying consistent.");
    // Update streak if this is a new day
    const today = new Date().toISOString().split('T')[0];
    if (lastCheckIn !== today) {
      setStreakCount(streakCount + 1);
      setLastCheckIn(today);
    }
  };

  const completedCount = Object.values(habits).filter(Boolean).length;
  const progress = (completedCount / 3) * 100;

  // Mock habit data for the week
  const weekHabits = [
    { day: 'Mon', exercise: true, eating: true, hydration: true },
    { day: 'Tue', exercise: true, eating: true, hydration: false },
    { day: 'Wed', exercise: false, eating: true, hydration: true },
    { day: 'Thu', exercise: true, eating: false, hydration: true },
    { day: 'Fri', exercise: true, eating: true, hydration: true },
    { day: 'Sat', exercise: false, eating: false, hydration: false },
    { day: 'Sun', exercise: false, eating: true, hydration: false },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daily Check-in</h1>
          <p className="text-gray-500 dark:text-gray-400">Small daily wins lead to massive long-term results.</p>
        </div>

        {/* Progress Card */}
        <Card className="border-none shadow-lg rounded-[2.5rem] overflow-hidden bg-white dark:bg-gray-800">
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
                    className="text-gray-100 dark:text-gray-700"
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
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{completedCount}/3</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Done</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {progress === 100 ? "Perfect Day! 🎉" : "Keep it going!"}
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">You're on a {streakCount}-day streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Overview */}
        <Card className="border-none shadow-sm rounded-[2rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <Calendar className="w-5 h-5 text-blue-600" />
              This Week's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weekHabits.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-gray-400">{day.day}</span>
                  <div className="grid grid-cols-3 gap-1">
                    <div className={`w-3 h-3 rounded-full ${day.exercise ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    <div className={`w-3 h-3 rounded-full ${day.eating ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    <div className={`w-3 h-3 rounded-full ${day.hydration ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Exercise</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Eating</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Hydration</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habit Toggles */}
        <div className="grid gap-4">
          {[
            { id: 'exercise', label: 'Exercise', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            { id: 'eating', label: 'Healthy Eating', icon: Star, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
            { id: 'hydration', label: 'Hydration', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          ].map((habit) => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id as keyof typeof habits)}
              className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${
                habits[habit.id as keyof typeof habits] 
                  ? 'bg-white dark:bg-gray-800 border-blue-600 shadow-md' 
                  : 'bg-gray-50 dark:bg-gray-900 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${habit.bg} ${habit.color} flex items-center justify-center`}>
                  <habit.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{habit.label}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                habits[habit.id as keyof typeof habits] 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-transparent'
              }`}>
                <Check className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>

        {/* Notes Section */}
        <Card className="border-none shadow-sm rounded-[2rem] dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2 dark:text-white">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              Daily Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea 
              value={dailyNote}
              onChange={(e) => setDailyNote(e.target.value)}
              className="w-full min-h-[120px] rounded-2xl border-gray-100 dark:border-gray-700 p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 dark:bg-gray-900/50 dark:text-white" 
              placeholder="How was your day? Any reflections or gratitude?"
            />
            <Button onClick={handleSave} className="w-full mt-4 bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-xl h-12">
              Save Check-in
            </Button>
          </CardContent>
        </Card>

        {/* Streak Achievement */}
        {streakCount >= 7 && (
          <Card className="border-none shadow-sm rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Amazing Streak!</h3>
              <p className="text-amber-100">You've maintained your habits for {streakCount} days straight!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CheckIn;