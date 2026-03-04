import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Plus, Trash2, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import PremiumGate from "@/components/PremiumGate";

const Planning = () => {
  const [isPremium] = useState(false);
  const [tasks, setTasks] = useState([
    { id: "1", title: "Draft project proposal", completed: false, isDistraction: false },
    { id: "2", title: "Morning run 5km", completed: true, isDistraction: false },
    { id: "3", title: "Scroll social media", completed: false, isDistraction: true },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Weekly Planning</h1>
            <p className="text-gray-500">Break down your goals into actionable steps.</p>
          </div>
          <div className="flex items-center bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="mx-4 font-bold text-sm">Oct 21 - Oct 27, 2024</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Priorities & Tasks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top 3 Priorities */}
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Top 3 Priorities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {i}
                    </span>
                    <Input placeholder={`Priority #${i}...`} className="rounded-xl border-gray-100" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Task List */}
            <Card className="border-none shadow-sm rounded-[2rem]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Weekly Tasks</CardTitle>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Task
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      task.isDistraction ? 'bg-rose-50/50 border border-rose-100' : 'bg-gray-50'
                    }`}
                  >
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => toggleTask(task.id)}
                      className="rounded-md border-gray-300 data-[state=checked]:bg-blue-600"
                    />
                    <span className={`flex-1 font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.title}
                    </span>
                    {task.isDistraction && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                        Distraction
                      </span>
                    )}
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: PDCA Review */}
          <div className="space-y-8">
            <PremiumGate 
              isPremium={isPremium} 
              featureName="PDCA Review"
              description="The Plan-Do-Check-Act cycle is a premium framework for continuous improvement."
            >
              <Card className="border-none shadow-sm rounded-[2rem] bg-gradient-to-b from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">PDCA Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-gray-500">What worked?</Label>
                    <textarea className="w-full min-h-[80px] rounded-2xl border-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Reflect on your wins..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-gray-500">What didn't work?</Label>
                    <textarea className="w-full min-h-[80px] rounded-2xl border-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Identify obstacles..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-gray-500">What should change?</Label>
                    <textarea className="w-full min-h-[80px] rounded-2xl border-gray-100 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Plan for next week..." />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">Complete Review</Button>
                </CardContent>
              </Card>
            </PremiumGate>

            <Card className="border-none shadow-sm rounded-[2rem] bg-blue-600 text-white p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-blue-100 font-medium">Weekly Progress</p>
                  <p className="text-xl font-bold">4/12 Tasks Done</p>
                </div>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[33%]" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Planning;