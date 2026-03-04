import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Goal } from "@/types";

const Goals = () => {
  const [isPremium] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock goals data
  const goals: Goal[] = [
    {
      id: "1",
      userId: "u1",
      name: "Launch LifePlan Web",
      timeframe: "months",
      timeframeValue: 3,
      successMetric: { type: "yes-no" },
      status: "active",
      progress: 65,
      priority: "high",
      category: "Business",
      isFavorite: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "u1",
      name: "Run a Half Marathon",
      timeframe: "weeks",
      timeframeValue: 12,
      successMetric: { type: "number", target: 21, unit: "km" },
      status: "active",
      progress: 40,
      priority: "medium",
      category: "Health",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "u1",
      name: "Learn Advanced React",
      timeframe: "months",
      timeframeValue: 2,
      successMetric: { type: "yes-no" },
      status: "completed",
      progress: 100,
      priority: "medium",
      category: "Education",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const filteredGoals = goals.filter(goal => 
    goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    goal.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
            <p className="text-gray-500">Track and manage your long-term objectives.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                <Plus className="w-4 h-4 mr-2" /> Create New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Goal</DialogTitle>
                <DialogDescription>Define your objective and how you'll measure success.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input id="name" placeholder="e.g., Learn to play Piano" className="rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
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
                    <Select>
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
                    <Input type="number" placeholder="Value" className="rounded-xl" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-12">Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search goals..." 
              className="pl-10 rounded-2xl bg-white border-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-2xl border-gray-100 bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <Card key={goal.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-[2rem] overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    goal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {goal.status}
                  </div>
                  <div className="flex items-center gap-2">
                    {goal.isFavorite && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {goal.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{goal.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{goal.timeframeValue} {goal.timeframe}</span>
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
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State / Add New Card */}
          <button className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Add New Goal</p>
              <p className="text-sm text-gray-500">Start a new journey today</p>
            </div>
          </button>
        </div>

        {/* Free Tier Limit Notice */}
        {!isPremium && goals.length >= 3 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-amber-900">Goal Limit Reached</h4>
              <p className="text-sm text-amber-700">Free users can have up to 3 active goals. Upgrade to Premium for unlimited goals and advanced planning tools.</p>
              <Button variant="link" className="text-amber-700 p-0 h-auto font-bold mt-1">Upgrade Now →</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Goals;