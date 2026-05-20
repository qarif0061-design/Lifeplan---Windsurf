import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { PILLARS } from "@/seo/pillars";

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
  "time_management",
  "focus",
  "mindset",
  "self_improvement",
  "daily_routines",
] as const;

type Topic = (typeof TOPICS)[number];

const topicLabel = (t: Topic) =>
  t
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

const derivedTopics = (a: Article): Set<Topic> => {
  const text = `${a.title} ${a.excerpt} ${a.slug}`.toLowerCase();
  const out = new Set<Topic>();

  if (/(time management|time block|time blocking|schedule|calendar)/.test(text)) out.add("time_management");
  if (/(focus|deep work|distraction|concentration|pomodoro)/.test(text)) out.add("focus");
  if (/(mindset|confidence|resilience|attitude|growth)/.test(text)) out.add("mindset");
  if (/(self improvement|self-improvement|personal growth|self growth|improve yourself)/.test(text))
    out.add("self_improvement");
  if (/(routine|daily|morning|evening|check-in|habit)/.test(text)) out.add("daily_routines");

  return out;
};

const STATIC_ARTICLES: Article[] = [
  {
    slug: "how-to-set-goals-that-stick",
    title: "How to Set Goals That Stick",
    excerpt: "A practical framework for choosing goals, defining timeframes, and staying consistent.",
    topics: ["goal_planning", "strategy"],
  },
  {
    slug: "daily-planner-template",
    title: "Daily Planner Template: A Simple Day Plan You Can Repeat",
    excerpt: "A practical daily planning template (schedule + priorities + tasks) with examples you can copy into Lifeplans.",
    topics: ["daily_routines", "productivity"],
  },
  {
    slug: "weekly-planning-for-long-term-goals",
    title: "Weekly Planning for Long-Term Goals",
    excerpt: "Turn big goals into weekly actions you can actually complete.",
    topics: ["weekly_planning", "productivity"],
  },
  {
    slug: "weekly-planner-template",
    title: "Weekly Planner Template: Priorities, Tasks, and a Weekly Review",
    excerpt: "A simple weekly planner template for turning goals into priorities, tasks, and time blocks (with a quick weekly review).",
    topics: ["weekly_planning", "time_management"],
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
    slug: "smart-goals-complete-guide",
    title: "SMART Goals: The Complete Guide (2026)",
    excerpt: "Master SMART goals: what they are, why they work, 50+ examples, and how to use them with GoalPath for real results.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "smart-goals-project-managers",
    title: "SMART Goals for Project Managers (50 Examples)",
    excerpt: "50 proven SMART goal examples for project management, including objectives, deadlines, and KPIs you can use today.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "best-goal-tracking-apps-2026",
    title: "Best Goal Tracking Apps in 2026 (Ranked)",
    excerpt: "Compare the top goal tracking apps of 2026. Features, pricing, and why GoalPath is the #1 choice for serious achievers.",
    topics: ["goal_planning", "productivity"],
  },
  {
    slug: "smart-marketing-goals-examples",
    title: "SMART Marketing Goals: 40 Examples That Work",
    excerpt: "40 actionable SMART marketing goal examples for campaigns, content, lead generation, and brand awareness.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "short-term-smart-goals-students",
    title: "Short Term SMART Goals: 100 Examples for Students",
    excerpt: "100 short-term SMART goal examples for students covering study, fitness, productivity, and personal growth.",
    topics: ["goal_planning", "targets"],
  },
  {
    slug: "how-to-track-goals-online",
    title: "How to Track Your Goals Online (Free Tools + Apps)",
    excerpt: "Discover the best free tools and apps for online goal tracking, plus how GoalPath simplifies the entire process.",
    topics: ["targets", "productivity"],
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
  {
    slug: "daily-planner-app",
    title: "Daily Planner App: A Simple System to Plan Your Day (and Stick to It)",
    excerpt: "How to use a daily planner app to stay organized, focus, and track progress—without overplanning.",
    topics: ["productivity", "habits"],
  },
  {
    slug: "daily-journal-app",
    title: "Daily Journal App: The 5-Minute Habit That Improves Consistency",
    excerpt: "A practical daily journal routine to build mindset, reduce overwhelm, and stay consistent with goals.",
    topics: ["habits", "motivation"],
  },
  {
    slug: "best-motivational-quotes-for-daily-life",
    title: "Best Motivational Quotes for Daily Life (Use Them to Take Action)",
    excerpt: "A practical list of daily-life motivation quotes plus a tiny routine to turn inspiration into progress.",
    topics: ["motivation"],
  },
  {
    slug: "short-inspirational-quotes-to-start-your-day",
    title: "Short Inspirational Quotes to Start Your Day (Morning Momentum)",
    excerpt: "Short morning quotes to reset your mindset, choose a priority, and start a focus block.",
    topics: ["motivation", "productivity"],
  },
  {
    slug: "positive-quotes-to-stay-motivated-at-work",
    title: "Positive Quotes to Stay Motivated at Work (Without Burnout)",
    excerpt: "Work motivation quotes plus a simple focus system you can repeat daily.",
    topics: ["motivation", "productivity"],
  },
  {
    slug: "motivational-life-quotes-for-students",
    title: "Motivational Life Quotes for Students (Study Consistency)",
    excerpt: "Student motivation quotes plus a weekly study plan to stay consistent.",
    topics: ["motivation", "weekly_planning"],
  },
  {
    slug: "daily-encouragement-quotes-for-personal-growth",
    title: "Daily Encouragement Quotes for Personal Growth (With a Tiny Action)",
    excerpt: "Encouragement quotes for personal growth and a 10-minute action you can do today.",
    topics: ["motivation", "habits"],
  },
  {
    slug: "inspirational-quotes-to-overcome-challenges",
    title: "Inspirational Quotes to Overcome Challenges (Resilience + Next Step)",
    excerpt: "Resilience quotes plus a reset framework for hard weeks.",
    topics: ["motivation"],
  },
  {
    slug: "best-quotes-for-positive-mindset-and-attitude",
    title: "Best Quotes for Positive Mindset and Attitude (Daily Reset)",
    excerpt: "Positive mindset quotes plus a 60-second daily reset for focus and consistency.",
    topics: ["motivation"],
  },
  {
    slug: "motivational-words-of-encouragement-for-teens",
    title: "Motivational Words of Encouragement for Teens (Confidence + Consistency)",
    excerpt: "Encouragement for teens plus a simple goal system that builds confidence.",
    topics: ["motivation"],
  },
  {
    slug: "short-success-quotes-for-daily-inspiration",
    title: "Short Success Quotes for Daily Inspiration (Daily Focus)",
    excerpt: "Short success quotes you can use as a daily focus cue.",
    topics: ["motivation"],
  },
  {
    slug: "quotes-to-boost-self-confidence-and-courage",
    title: "Quotes to Boost Self-Confidence and Courage (Action Builds Confidence)",
    excerpt: "Confidence quotes plus an action plan to build courage through small wins.",
    topics: ["motivation", "habits"],
  },
  {
    slug: "positive-good-morning-quotes-for-a-productive-day",
    title: "Positive Good Morning Quotes for a Productive Day (Morning Routine)",
    excerpt: "Good morning quotes plus a 10-minute routine to start with momentum.",
    topics: ["motivation", "productivity"],
  },
  {
    slug: "motivational-thoughts-for-achieving-goals",
    title: "Motivational Thoughts for Achieving Goals (Systems > Mood)",
    excerpt: "Motivational thoughts that help you plan weekly and execute daily.",
    topics: ["motivation", "goal_planning"],
  },
  {
    slug: "inspirational-quotes-for-women-in-career",
    title: "Inspirational Quotes for Women in Career (Focus + Confidence)",
    excerpt: "Career inspiration quotes plus a routine to build confidence through consistency.",
    topics: ["motivation", "targets"],
  },
  {
    slug: "best-quotes-to-stay-focused-and-motivated",
    title: "Best Quotes to Stay Focused and Motivated (Distraction-Proof)",
    excerpt: "Focus quotes plus a simple distraction-proof work system.",
    topics: ["motivation", "productivity"],
  },
  {
    slug: "encouraging-quotes-for-hard-times-and-struggles",
    title: "Encouraging Quotes for Hard Times and Struggles (Keep Going)",
    excerpt: "Encouragement for hard times plus a minimum-action week plan.",
    topics: ["motivation"],
  },
  {
    slug: "daily-positive-affirmations-for-self-improvement",
    title: "Daily Positive Affirmations for Self-Improvement (Pair With Action)",
    excerpt: "Daily affirmations that support self-improvement — plus a quick action pairing routine.",
    topics: ["motivation", "habits"],
  },
  {
    slug: "uplifting-quotes-to-start-your-day-right",
    title: "Uplifting Quotes to Start Your Day Right (Energy + Focus)",
    excerpt: "Uplifting quotes plus a short checklist for starting the day with focus.",
    topics: ["motivation", "productivity"],
  },
  {
    slug: "motivational-quotes-for-personal-growth-journey",
    title: "Motivational Quotes for Personal Growth Journey (Compounding Wins)",
    excerpt: "Personal growth quotes plus a weekly system for compounding progress.",
    topics: ["motivation", "weekly_planning"],
  },
  {
    slug: "best-inspirational-quotes-for-leaders-and-teams",
    title: "Best Inspirational Quotes for Leaders and Teams (Execution Culture)",
    excerpt: "Leadership inspiration quotes plus a simple weekly execution culture routine.",
    topics: ["motivation", "strategy"],
  },
  {
    slug: "quotes-about-persistence-and-never-giving-up",
    title: "Quotes About Persistence and Never Giving Up (Keep Showing Up)",
    excerpt: "Persistence quotes plus a practical plan to keep going when motivation drops.",
    topics: ["motivation"],
  },
];

const PILLAR_LISTING: Article[] = PILLARS.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  topics: p.topics,
}));

const ARTICLES: Article[] = (() => {
  const bySlug = new Map<string, Article>();
  [...STATIC_ARTICLES, ...PILLAR_LISTING].forEach((a) => {
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, a);
  });
  return Array.from(bySlug.values());
})();

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | "all">("all");

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const topicOk =
        selectedTopic === "all"
          ? true
          : article.topics.includes(selectedTopic) || derivedTopics(article).has(selectedTopic);
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

        <div className="text-sm text-gray-500">Showing {filteredArticles.length} articles.</div>

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
