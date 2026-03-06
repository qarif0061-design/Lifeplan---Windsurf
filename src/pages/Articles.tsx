import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topics: string[];
};

const TOPICS = [
  "goal_planning",
  "strategy",
  "weekly_planning",
  "targets",
  "motivation",
  "habits",
  "productivity",
] as const;

type Topic = (typeof TOPICS)[number];

const topicLabel = (t: Topic) =>
  t
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

const ARTICLES: Article[] = [
  {
    slug: "how-to-set-goals-that-stick",
    title: "How to Set Goals That Stick",
    excerpt: "A practical framework for choosing goals, defining timeframes, and staying consistent.",
    topics: ["goal_planning", "strategy"],
  },
  {
    slug: "weekly-planning-for-long-term-goals",
    title: "Weekly Planning for Long-Term Goals",
    excerpt: "Turn big goals into weekly actions you can actually complete.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    slug: "how-to-build-a-daily-check-in-habit",
    title: "How to Build a Daily Check-in Habit",
    excerpt: "Simple routines to maintain streaks and stay accountable without burnout.",
    topics: ["habits", "motivation"],
  },
  {
    slug: "goal-setting-vs-habit-building",
    title: "Goal Setting vs Habit Building: What Actually Works?",
    excerpt: "Learn when to use outcome goals, when to use habits, and how to combine both for real progress.",
    topics: ["goal_planning", "habits"],
  },
  {
    slug: "time-blocking-for-goals",
    title: "Time Blocking for Goals: A Simple Weekly System",
    excerpt: "A step-by-step time blocking approach to protect focus and consistently move your goals forward.",
    topics: ["productivity", "weekly_planning"],
  },
  {
    slug: "how-to-stay-motivated",
    title: "How to Stay Motivated When Progress Feels Slow",
    excerpt: "Practical motivation strategies, progress tracking tips, and mindset shifts for long-term goals.",
    topics: ["motivation", "goal_planning"],
  },
  {
    slug: "overcoming-procrastination",
    title: "Overcoming Procrastination: A Plan You Can Follow",
    excerpt: "Identify the real cause of procrastination and use small next steps to build momentum fast.",
    topics: ["productivity", "motivation"],
  },
  {
    slug: "accountability-strategies",
    title: "Accountability Strategies That Don’t Feel Like Pressure",
    excerpt: "Build accountability using check-ins, weekly reviews, and social support—without burnout.",
    topics: ["strategy", "habits"],
  },
  {
    slug: "smart-goals-examples",
    title: "SMART Goals Examples (Fitness, Career, Study, Money)",
    excerpt: "High-quality SMART goal examples plus templates you can copy into Lifeplans.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "track-progress-like-a-pro",
    title: "Track Progress Like a Pro: Metrics That Matter",
    excerpt: "Choose goal metrics, avoid vanity tracking, and create a simple progress score you can trust.",
    topics: ["targets", "productivity"],
  },
  {
    slug: "build-consistency",
    title: "How to Build Consistency (Even With a Busy Schedule)",
    excerpt: "Use micro-habits, planning, and check-ins to stay consistent when life gets chaotic.",
    topics: ["habits", "weekly_planning"],
  },
  {
    slug: "reduce-distractions",
    title: "Reduce Distractions: A Focus System for High Achievers",
    excerpt: "A distraction-proof workflow using environment design, schedules, and a weekly planning routine.",
    topics: ["productivity", "strategy"],
  },
  {
    slug: "weekly-review",
    title: "Weekly Review: The Fastest Way to Improve Your Results",
    excerpt: "A simple weekly review process to analyze progress, fix problems, and plan the next week.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    slug: "morning-routine-for-goals",
    title: "Morning Routine for Goals: Start Your Day With Momentum",
    excerpt: "Create a short morning routine that supports focus, energy, and consistent goal progress.",
    topics: ["habits", "motivation"],
  },
  {
    slug: "best-goal-planner-app-2024",
    title: "Best Goal Planner App 2024: Complete Review and Comparison",
    excerpt: "Discover the top goal planner apps of 2024. We compare features, pricing, and user experience to help you choose the best app for achieving your goals.",
    topics: ["goal_planning", "productivity"],
  },
  {
    slug: "top-goal-planner-apps-productivity",
    title: "Top Goal Planner Apps to Boost Your Productivity",
    excerpt: "Explore the most effective goal planner apps that help professionals and students increase productivity and achieve their objectives faster.",
    topics: ["productivity", "goal_planning"],
  },
  {
    slug: "how-to-set-goals-beginners-guide",
    title: "How to Set Goals: A Beginner's Guide to Success",
    excerpt: "Learn the fundamentals of goal setting with this step-by-step guide. Perfect for beginners who want to start achieving their dreams.",
    topics: ["goal_planning"],
  },
  {
    slug: "how-to-achieve-goals-consistently",
    title: "How to Achieve Goals Consistently: Proven Strategies",
    excerpt: "Master the art of consistent goal achievement with these research-backed strategies and practical tips for long-term success.",
    topics: ["strategy", "habits"],
  },
  {
    slug: "how-to-set-targets-effectively",
    title: "How to Set Targets That Drive Real Results",
    excerpt: "Transform vague ambitions into clear, actionable targets. Learn the difference between goals and targets and how to set both effectively.",
    topics: ["targets", "goal_planning"],
  },
  {
    slug: "how-to-achieve-targets-easily",
    title: "How to Achieve Targets Easily: Smart Approaches",
    excerpt: "Discover simple yet powerful methods to achieve your targets without overwhelm. Includes practical examples and templates.",
    topics: ["targets", "productivity"],
  },
  {
    slug: "how-to-gain-focus-deep-work",
    title: "How to Gain Focus for Deep Work and Goal Achievement",
    excerpt: "Learn proven techniques to improve concentration, eliminate distractions, and enter flow state for maximum productivity.",
    topics: ["productivity", "motivation"],
  },
  {
    slug: "goal-tracking-methods-that-work",
    title: "Goal Tracking Methods That Actually Work",
    excerpt: "Explore different goal tracking systems and find the perfect method to monitor your progress and stay motivated.",
    topics: ["targets", "productivity"],
  },
  {
    slug: "monthly-goal-setting-template",
    title: "Monthly Goal Setting Template for Consistent Progress",
    excerpt: "Use this proven monthly goal setting template to break down big objectives into manageable monthly milestones.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    slug: "how-to-plan-your-goals-in-10-minutes",
    title: "How to Plan Your Goals in 10 Minutes (A Simple Routine)",
    excerpt: "A short weekly routine to set priorities, decide next actions, and keep Lifeplans updated.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    slug: "goal-setting-for-busy-people",
    title: "Goal Setting for Busy People: The Minimum Effective Plan",
    excerpt: "A realistic approach to planning goals when your schedule is full and unpredictable.",
    topics: ["goal_planning", "productivity"],
  },
  {
    slug: "how-to-write-a-goal-strategy",
    title: "How to Write a Goal Strategy (Why, Who, and No)",
    excerpt: "Turn motivation into a plan with a strategy you can reuse for every goal.",
    topics: ["strategy", "goal_planning"],
  },
  {
    slug: "weekly-planning-template-lifeplans",
    title: "Weekly Planning Template You Can Copy Into Lifeplans",
    excerpt: "A copy/paste template for priorities, tasks, and obstacles that keeps your week focused.",
    topics: ["weekly_planning", "targets"],
  },
  {
    slug: "how-to-set-goals-without-burnout",
    title: "How to Set Goals Without Burnout",
    excerpt: "Prevent burnout by choosing fewer priorities, shorter planning horizons, and honest progress tracking.",
    topics: ["motivation", "habits"],
  },
  {
    slug: "habit-goals-vs-outcome-goals",
    title: "Habit Goals vs Outcome Goals: Which Should You Track?",
    excerpt: "A practical decision guide for choosing the right metric for your goal.",
    topics: ["habits", "targets"],
  },
  {
    slug: "goal-setting-for-students",
    title: "Goal Setting for Students: A Weekly Study System",
    excerpt: "Set study goals, build a weekly plan, and avoid last-minute panic with a simple routine.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    slug: "goal-setting-for-career-growth",
    title: "Goal Setting for Career Growth: A 12-Week Plan",
    excerpt: "A structured approach to building skills, projects, and momentum in your career.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "how-to-set-financial-goals",
    title: "How to Set Financial Goals That You’ll Actually Hit",
    excerpt: "Make saving goals measurable and attach weekly actions so the plan survives real life.",
    topics: ["targets", "weekly_planning"],
  },
  {
    slug: "how-to-recover-after-falling-off",
    title: "How to Recover After Falling Off Your Goal Plan",
    excerpt: "A reset framework: reduce scope, rebuild consistency, and restart with small wins.",
    topics: ["motivation", "weekly_planning"],
  },
  {
    slug: "goal-review-questions",
    title: "Weekly Goal Review Questions (Use These Every Sunday)",
    excerpt: "A short set of questions to diagnose what worked, what didn’t, and how to adjust.",
    topics: ["weekly_planning", "strategy"],
  },
  {
    slug: "how-to-prioritize-goals",
    title: "How to Prioritize Goals When Everything Feels Important",
    excerpt: "A practical method for choosing what to focus on this quarter and this week.",
    topics: ["productivity", "goal_planning"],
  },
  {
    slug: "goal-metrics-examples",
    title: "Goal Metrics Examples: What to Measure (and What to Ignore)",
    excerpt: "Examples of good goal metrics for fitness, study, business, and personal growth.",
    topics: ["targets", "productivity"],
  },
  {
    slug: "how-to-break-down-big-goals",
    title: "How to Break Down Big Goals Into Weekly Targets",
    excerpt: "A step-by-step breakdown method that turns an overwhelming goal into a weekly plan.",
    topics: ["targets", "weekly_planning"],
  },
  {
    slug: "how-to-build-discipline",
    title: "How to Build Discipline (Without Relying on Motivation)",
    excerpt: "Discipline is a system: fewer decisions, better defaults, and weekly planning.",
    topics: ["habits", "strategy"],
  },
  {
    slug: "goal-planning-checklist",
    title: "Goal Planning Checklist: Set, Plan, Track, Review",
    excerpt: "A simple checklist you can follow inside Lifeplans to stay consistent from week 1.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    slug: "how-to-plan-around-obstacles",
    title: "How to Plan Around Obstacles (Time, Energy, Distractions)",
    excerpt: "Use a pre-mortem and a fallback plan so your goal strategy survives busy weeks.",
    topics: ["strategy", "weekly_planning"],
  },
  {
    slug: "goal-setting-mistakes",
    title: "10 Goal Setting Mistakes (and How to Fix Them)",
    excerpt: "The most common reasons goals fail and the exact adjustments that make them stick.",
    topics: ["goal_planning", "strategy"],
  },
  {
    slug: "how-to-use-lifeplans-for-goals",
    title: "How to Use Goal Planner - Lifeplans (Web + Mobile Workflow)",
    excerpt: "A simple weekly rhythm to keep your goals, strategy, planning, and progress in sync.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    slug: "goal-setting-for-beginners-step-by-step",
    title: "Goal Setting for Beginners: Step-by-Step (With Examples)",
    excerpt: "A beginner-friendly flow: choose one goal, set a timeframe, plan weekly actions, and track progress.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "how-to-set-goals-for-2026",
    title: "How to Set Goals for 2026 (Quarterly + Weekly Plan)",
    excerpt: "A simple yearly planning approach: pick 1–3 priorities, set quarterly targets, then plan weekly.",
    topics: ["goal_planning", "weekly_planning"],
  },
  {
    slug: "how-to-set-goals-when-you-feel-lost",
    title: "How to Set Goals When You Feel Lost",
    excerpt: "Use small experiments and short timeframes to find clarity without pressure.",
    topics: ["motivation", "goal_planning"],
  },
  {
    slug: "how-to-stop-overplanning",
    title: "How to Stop Overplanning and Start Doing",
    excerpt: "A practical system to reduce planning time and increase execution with a weekly rhythm.",
    topics: ["productivity", "weekly_planning"],
  },
  {
    slug: "goal-setting-for-adhd",
    title: "Goal Setting for ADHD: Simple Systems That Work",
    excerpt: "Reduce friction with smaller tasks, visible progress, and weekly planning you can maintain.",
    topics: ["habits", "productivity"],
  },
  {
    slug: "goal-setting-for-anxiety",
    title: "Goal Setting for Anxiety: Gentle Planning Without Pressure",
    excerpt: "Choose kinder goals, minimum actions, and flexible weekly planning to protect consistency.",
    topics: ["motivation", "habits"],
  },
  {
    slug: "how-to-set-goals-for-business",
    title: "How to Set Goals for Business Growth (Without Chaos)",
    excerpt: "Set one outcome, define targets, then run weekly execution sprints.",
    topics: ["targets", "productivity"],
  },
  {
    slug: "how-to-set-goals-for-content-creators",
    title: "Goal Setting for Content Creators: Output + Process Targets",
    excerpt: "A realistic plan for posts, sessions, and weekly reviews that keep you publishing.",
    topics: ["targets", "weekly_planning"],
  },
  {
    slug: "how-to-set-goals-for-learning",
    title: "How to Set Goals for Learning (Languages, Skills, Courses)",
    excerpt: "Measure leading indicators, plan weekly sessions, and track progress without overwhelm.",
    topics: ["habits", "weekly_planning"],
  },
  {
    slug: "how-to-create-a-goal-roadmap",
    title: "How to Create a Goal Roadmap (Milestones + Weekly Targets)",
    excerpt: "Build a roadmap with milestones, then convert the next milestone into weekly targets.",
    topics: ["targets", "goal_planning"],
  },
  {
    slug: "how-to-set-goals-with-a-full-time-job",
    title: "How to Set Goals With a Full-Time Job (Realistic Weekly Planning)",
    excerpt: "A minimum effective system for busy schedules: fewer priorities, smaller tasks, weekly reviews.",
    topics: ["productivity", "weekly_planning"],
  },
  {
    slug: "how-to-make-goal-progress-visible",
    title: "How to Make Goal Progress Visible (So You Don’t Quit)",
    excerpt: "Progress visibility creates momentum. Learn which metrics to track and how often.",
    topics: ["targets", "motivation"],
  },
];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "all">("all");

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const topicOk = selectedTopic === "all" ? true : article.topics.includes(selectedTopic);
      if (!topicOk) return false;
      if (!q) return true;
      return article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q);
    });
  }, [searchQuery, selectedTopic]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-500">Guides and insights to help you plan better and achieve more.</p>
          </div>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedTopic === "all" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setSelectedTopic("all")}
          >
            All Topics
          </Button>
          {TOPICS.map((t) => (
            <Button
              key={t}
              type="button"
              variant={selectedTopic === t ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedTopic(t)}
            >
              {topicLabel(t)}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((a) => (
            <Card key={a.slug} className="border-none shadow-sm rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  <Link to={`/articles/${a.slug}`} className="hover:text-blue-600 transition-colors">
                    {a.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{a.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Articles;
