import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const ProductivityApp = () => {
  const faqData = [
    {
      question: "What makes a productivity app actually effective?",
      answer: "An effective productivity app supports the full loop: plan, execute, track consistency, and review. Tools that only store tasks often increase overwhelm instead of reducing it."
    },
    {
      question: "Do I need an all-in-one productivity app?",
      answer: "Not always—but many people benefit from one system for goals, tasks, habits, and reflection because it reduces context switching and helps you stay consistent."
    },
    {
      question: "How can a productivity app help with focus?",
      answer: "Focus improves when the app supports time blocking, clear next actions, and reminders that protect deep work—not constant notifications."
    },
    {
      question: "What's the difference between a productivity app and a task management app?",
      answer: "Task management apps organize tasks. Productivity apps help you make progress by connecting tasks to priorities, goals, and consistent routines—plus review."
    },
    {
      question: "How do I avoid burnout with productivity tools?",
      answer: "Use fewer priorities, plan realistically, maintain a small baseline habit, and review weekly. Productivity is about sustainable progress, not intensity."
    }
  ];

  const features = [
    {
      title: "Daily Planning",
      description: "Plan your day with clear priorities and protected focus time.",
      icon: "📅"
    },
    {
      title: "Goal Management",
      description: "Set meaningful goals and connect them to daily actions.",
      icon: "🎯"
    },
    {
      title: "Habit Tracking",
      description: "Build consistency with routines that support your productivity.",
      icon: "✅"
    },
    {
      title: "Task Organization",
      description: "Keep tasks organized without overwhelming lists.",
      icon: "📋"
    },
    {
      title: "Focus Protection",
      description: "Time blocking and reminders that protect deep work.",
      icon: "🔒"
    },
    {
      title: "Weekly Reviews",
      description: "Reflect and adjust so you improve over time.",
      icon: "🔄"
    }
  ];

  const productivityLoop = [
    {
      title: "Plan",
      description: "Decide what matters before the day runs you.",
      icon: "📝"
    },
    {
      title: "Execute",
      description: "Do fewer things, with more intention.",
      icon: "⚡"
    },
    {
      title: "Track",
      description: "Track consistency, not perfection.",
      icon: "📊"
    },
    {
      title: "Review",
      description: "Make the next week easier than the last.",
      icon: "🔍"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Productivity App – Organize Goals, Tasks, Habits & Reflection in One Place | Goal Planner – LifePlans"
        description="Looking for a productivity app that actually reduces overwhelm? Learn what to look for (planning, focus, task management, habits, reviews) and how Goal Planner – LifePlans combines it into one calm system on web and mobile."
        canonicalPath="/productivity-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Productivity App",
          url: "https://goalplanner.io/productivity-app",
          description: "Looking for a productivity app that actually reduces overwhelm? Learn what to look for.",
          mainEntity: {
            "@type": "FAQPage",
            mainEntity: faqData.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        }}
      />

      <div className="space-y-16">
        {/* Hero Section */}
        <header className="space-y-6" id="hero">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">All-in-One Productivity System</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Productivity App: A Calm System for Focus, Organization, and Follow-Through
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              If you've tried a dozen productivity apps and still feel behind, you're not broken. Most tools fail for a simple reason: they help you <strong>collect tasks</strong>, but they don't help you <strong>run a system</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Organizing Your Life</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">Real productivity isn't:</p>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="font-medium text-red-600 mb-2">❌ What it's not:</p>
                <ul className="space-y-1">
                  <li>• doing more</li>
                  <li>• cramming your schedule</li>
                  <li>• optimizing every minute</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-600 mb-2">✅ What it is:</p>
                <ul className="space-y-1">
                  <li>• choosing what matters</li>
                  <li>• doing the next right thing</li>
                  <li>• staying consistent long enough to see results</li>
                  <li>• reviewing so you improve</li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See the All-in-One System in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Dashboard showing goals, tasks, habits, and reflections</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Productivity App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A productivity app is a tool that helps you organize work and life so you can make progress with less stress.
            </p>
            <p>
              People search for this as:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">best productivity app</Badge>
              <Badge variant="outline">personal productivity app</Badge>
              <Badge variant="outline">focus planner app</Badge>
              <Badge variant="outline">organize your life app</Badge>
              <Badge variant="outline">all in one planner app</Badge>
              <Badge variant="outline">task management app personal</Badge>
              <Badge variant="outline">app to stay organized</Badge>
            </div>
            <p className="mt-4">
              But here's the key: "productivity" isn't one feature. It's a <strong>loop</strong>.
            </p>
          </div>
        </section>

        {/* Productivity vs Busyness */}
        <section className="space-y-6" id="productivity-vs-busyness">
          <h2 className="text-3xl font-bold text-gray-900">Productivity vs. Busyness (Why You Can Be Busy and Still Stuck)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900">🏃‍♂️ Busyness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-red-800">
                  <p>• lots of tasks completed</p>
                  <p>• constant switching</p>
                  <p>• "I did things all day" but nothing meaningful moved</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">🎯 Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-800">
                  <p>• priorities protected</p>
                  <p>• focused execution</p>
                  <p>• consistent habits and review</p>
                  <p>• fewer open loops in your head</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-gray-600 italic">The best productivity tools guide you toward progress, not just motion.</p>
        </section>

        {/* The 4-Part Loop */}
        <section className="space-y-6" id="productivity-loop">
          <h2 className="text-3xl font-bold text-gray-900">The 4-Part Productivity Loop (Simple, Repeatable, Effective)</h2>
          <p className="text-lg text-gray-600">A practical productivity system has four parts:</p>
          <div className="grid md:grid-cols-4 gap-4">
            {productivityLoop.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{step.icon}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-blue-800 text-center">
              GoalPlanner is designed around this loop so productivity becomes a skill you build, not a mood you chase.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">What to Look For in the Best Productivity App</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why All-in-One Matters */}
        <section className="space-y-6" id="all-in-one">
          <h2 className="text-3xl font-bold text-gray-900">Why "All-in-One" Matters (When It's Done Right)</h2>
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
            <p className="text-purple-800 mb-4">An all in one planner app is valuable when it reduces mental overhead.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-900 mb-3">🔴 When your system is scattered:</h3>
                <ul className="space-y-1 text-purple-700">
                  <li>• you forget goals</li>
                  <li>• habits drift</li>
                  <li>• tasks multiply</li>
                  <li>• reflection disappears</li>
                  <li>• you feel overwhelmed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 mb-3">🟢 When your system is unified:</h3>
                <ul className="space-y-1 text-purple-700">
                  <li>• goals connect to tasks</li>
                  <li>• habits reinforce progress</li>
                  <li>• reflections improve planning</li>
                  <li>• you do less "system management"</li>
                </ul>
              </div>
            </div>
            <p className="text-purple-900 mt-4">
              GoalPlanner is built to keep the core pieces together without feeling heavy.
            </p>
          </div>
        </section>

        {/* Practical Use Cases */}
        <section className="space-y-6" id="use-cases">
          <h2 className="text-3xl font-bold text-gray-900">Practical Use Cases (How People Actually Use a Productivity App)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💼</span> Work and Study
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• set 1–3 priorities</p>
                  <p>• time-block focus work</p>
                  <p>• track consistent effort</p>
                  <p>• review weekly to improve</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Home and Life
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• errands and responsibilities in one place</p>
                  <p>• routines that reduce chaos</p>
                  <p>• reminders used sparingly but effectively</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span> Personal Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• link tasks to outcomes</p>
                  <p>• habit tracking for consistency</p>
                  <p>• reflection to learn what works</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Simple Starting System */}
        <section className="space-y-6" id="starting-system">
          <h2 className="text-3xl font-bold text-gray-900">A Simple Starting System (If You're Overwhelmed)</h2>
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <p className="text-green-800 mb-4">If you want a system you can maintain, start here:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <p className="text-green-900"><strong>Capture:</strong> write down tasks and open loops</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <p className="text-green-900"><strong>Prioritize:</strong> choose 1–3 priorities</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <p className="text-green-900"><strong>Focus:</strong> schedule one focus block</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <p className="text-green-900"><strong>Baseline:</strong> keep one small habit daily</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                <p className="text-green-900"><strong>Review:</strong> do a 5-minute weekly reset</p>
              </div>
            </div>
            <p className="text-green-900 mt-4">That's enough to create progress without pressure.</p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Explore Each Component</h2>
          <p className="text-lg text-gray-600">Dive deeper into each part of the productivity system:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set clear outcomes</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Structure your day</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build consistency</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📝 Journal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Reflect and learn</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want a Calmer Productivity System in One Place?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans to plan your day, manage tasks, build habits, and reflect—so you stay organized and follow through on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6" id="faq">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default ProductivityApp;
