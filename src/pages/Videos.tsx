import Layout from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Play, Clock, Eye } from "lucide-react";

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const videos = [
    {
      id: "1",
      title: "How to Set Achievable Goals in 5 Steps",
      description: "Learn a proven framework to set goals you can actually accomplish. This step-by-step guide covers SMART goals, breaking down objectives, and tracking progress effectively.",
      duration: "12:34",
      views: "15.2K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "2",
      title: "Top 10 Goal Planner Apps Compared",
      description: "We review the best goal planning apps of 2024, comparing features, pricing, and usability. Find out which app suits your productivity style.",
      duration: "18:45",
      views: "22.1K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "3",
      title: "Stay Focused: Techniques for Deep Work",
      description: "Master the art of concentration with these science-backed techniques. Learn how to eliminate distractions and achieve flow state consistently.",
      duration: "15:20",
      views: "9.8K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "4",
      title: "From Targets to Achievements: A Complete Guide",
      description: "Transform your vague targets into concrete achievements. This comprehensive guide covers planning, execution, and review cycles.",
      duration: "22:10",
      views: "11.5K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "5",
      title: "Weekly Planning That Actually Works",
      description: "Stop wasting time on ineffective planning. Learn how to structure your week for maximum productivity and goal progress.",
      duration: "14:55",
      views: "7.3K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "6",
      title: "Building Better Habits for Goal Success",
      description: "Discover the science of habit formation and how to build routines that support your long-term goals.",
      duration: "16:40",
      views: "13.7K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "7",
      title: "Overcoming Procrastination: Practical Strategies",
      description: "Break free from procrastination with these actionable strategies. Understand the psychology behind delay and how to overcome it.",
      duration: "19:15",
      views: "18.9K",
      thumbnail: "/api/placeholder/320/180",
    },
    {
      id: "8",
      title: "The Best Goal Setting Frameworks Explained",
      description: "Compare SMART, OKRs, WOOP, and other popular goal-setting frameworks. Choose the right approach for your needs.",
      duration: "21:30",
      views: "10.2K",
      thumbnail: "/api/placeholder/320/180",
    },
  ];

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
            <p className="text-gray-500">Learn goal planning and productivity strategies.</p>
          </div>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search videos..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Button size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full w-12 h-12 bg-white/90 hover:bg-white text-black">
                    <Play className="w-5 h-5 ml-1" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Videos;
