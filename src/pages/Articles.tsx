import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
};

const ARTICLES: Article[] = [
  {
    slug: "how-to-set-goals-that-stick",
    title: "How to Set Goals That Stick",
    excerpt: "A practical framework for choosing goals, defining timeframes, and staying consistent.",
  },
  {
    slug: "weekly-planning-for-long-term-goals",
    title: "Weekly Planning for Long-Term Goals",
    excerpt: "Turn big goals into weekly actions you can actually complete.",
  },
  {
    slug: "how-to-build-a-daily-check-in-habit",
    title: "How to Build a Daily Check-in Habit",
    excerpt: "Simple routines to maintain streaks and stay accountable without burnout.",
  },
  {
    slug: "goal-setting-vs-habit-building",
    title: "Goal Setting vs Habit Building: What Actually Works?",
    excerpt: "Learn when to use outcome goals, when to use habits, and how to combine both for real progress.",
  },
  {
    slug: "time-blocking-for-goals",
    title: "Time Blocking for Goals: A Simple Weekly System",
    excerpt: "A step-by-step time blocking approach to protect focus and consistently move your goals forward.",
  },
  {
    slug: "how-to-stay-motivated",
    title: "How to Stay Motivated When Progress Feels Slow",
    excerpt: "Practical motivation strategies, progress tracking tips, and mindset shifts for long-term goals.",
  },
  {
    slug: "overcoming-procrastination",
    title: "Overcoming Procrastination: A Plan You Can Follow",
    excerpt: "Identify the real cause of procrastination and use small next steps to build momentum fast.",
  },
  {
    slug: "accountability-strategies",
    title: "Accountability Strategies That Don’t Feel Like Pressure",
    excerpt: "Build accountability using check-ins, weekly reviews, and social support—without burnout.",
  },
  {
    slug: "smart-goals-examples",
    title: "SMART Goals Examples (Fitness, Career, Study, Money)",
    excerpt: "High-quality SMART goal examples plus templates you can copy into Lifeplans.",
  },
  {
    slug: "track-progress-like-a-pro",
    title: "Track Progress Like a Pro: Metrics That Matter",
    excerpt: "Choose goal metrics, avoid vanity tracking, and create a simple progress score you can trust.",
  },
  {
    slug: "build-consistency",
    title: "How to Build Consistency (Even With a Busy Schedule)",
    excerpt: "Use micro-habits, planning, and check-ins to stay consistent when life gets chaotic.",
  },
  {
    slug: "reduce-distractions",
    title: "Reduce Distractions: A Focus System for High Achievers",
    excerpt: "A distraction-proof workflow using environment design, schedules, and a weekly planning routine.",
  },
  {
    slug: "weekly-review",
    title: "Weekly Review: The Fastest Way to Improve Your Results",
    excerpt: "A simple weekly review process to analyze progress, fix problems, and plan the next week.",
  },
  {
    slug: "morning-routine-for-goals",
    title: "Morning Routine for Goals: Start Your Day With Momentum",
    excerpt: "Create a short morning routine that supports focus, energy, and consistent goal progress.",
  },
];

const Articles = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500">Guides and insights to help you plan better and achieve more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
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
      </div>
    </Layout>
  );
};

export default Articles;
