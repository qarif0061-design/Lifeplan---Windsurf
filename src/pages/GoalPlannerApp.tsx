import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const GoalPlannerApp = () => {
  const faqData = [
    {
      question: "What's the difference between a goal planner app and a goal tracker app?",
      answer: "A goal tracker app is mainly about measurement (recording progress). A goal planner app helps you define the goal and plan the steps—especially the weekly and daily actions that create progress. The best tools do both: plan + track + review."
    },
    {
      question: "How do I choose the best goal planner app for me?",
      answer: "Choose the app you'll realistically use every week. Look for quick setup (goal + next action), daily planning integration, habit/routine tracking, reminders you control, and simple progress views. If it feels like too much administration, you won't stick with it."
    },
    {
      question: "Is a free goal planner app good enough to achieve goals?",
      answer: "Often, yes—if it supports consistent action. The biggest determinant isn't price; it's whether the tool helps you plan and follow through on small steps week after week."
    },
    {
      question: "How many goals should I track at once?",
      answer: "For most people, 1–3 active goals is ideal. Too many goals creates diluted effort and constant guilt. Start with one priority goal and build consistency first."
    },
    {
      question: "Can a goal planner app help with ADHD or overwhelm?",
      answer: "It can help by reducing decision fatigue: clarifying the next action, limiting priorities, and using reminders to protect routines. A tool is support—not diagnosis or treatment."
    },
    {
      question: "What if I keep falling off goals after a few days?",
      answer: "That's usually a signal to shrink the plan, not abandon the goal: reduce the daily baseline, attach the habit to a consistent trigger, and review weekly to remove friction. Consistency comes from design."
    }
  ];

  const features = [
    {
      title: "Quick Goal Setup",
      description: "Set goals and define next actions in minutes, not hours.",
      icon: "🎯"
    },
    {
      title: "Daily Planning Integration",
      description: "Connect goals to your daily tasks and focus time.",
      icon: "📅"
    },
    {
      title: "Habit & Routine Tracking",
      description: "Build consistency with habits that support your goals.",
      icon: "✅"
    },
    {
      title: "Smart Reminders",
      description: "Gentle reminders that protect your routines, not nag you.",
      icon: "🔔"
    },
    {
      title: "Progress Tracking",
      description: "See your progress without complicated metrics.",
      icon: "📊"
    },
    {
      title: "Weekly Reviews",
      description: "Reflect and adjust so you improve over time.",
      icon: "🔄"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Goal Planner App (Free) – Plan Goals, Break Them Into Daily Actions, Track Progress | Goal Planner – LifePlans"
        description="A practical guide to choosing a goal planner app that helps you follow through. Learn how to set goals, turn them into daily actions, track progress, and stay consistent with Goal Planner – LifePlans (web + mobile)."
        canonicalPath="/goal-planner-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Goal Planner App",
          url: "https://goalplanner.io/goal-planner-app",
          description: "A practical guide to choosing a goal planner app that helps you follow through.",
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
            <Badge variant="secondary" className="w-fit">Free Goal Planner App</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Goal Planner App: The Practical Way to Set Goals, Take Daily Action, and Stay Consistent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              If you've ever set a goal you genuinely cared about—then watched it fade under a busy week—you're not alone. Most "goal failure" isn't a motivation problem. It's a systems problem.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Goals</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">Quick answer: What a goal planner app should help you do</p>
            <ul className="space-y-2 text-gray-700">
              <li>• set goals clearly (so "done" is obvious)</li>
              <li>• break goals into milestones and next actions</li>
              <li>• plan weekly and daily steps you can actually complete</li>
              <li>• track progress (without over-measuring)</li>
              <li>• stay consistent with reminders and routines</li>
              <li>• review progress so you improve over time</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Goal Planning in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Goal setting screen with milestones and daily actions</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Goal Planner App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A <strong>goal planner app</strong> is a tool for setting, organizing, and achieving goals by turning them into <strong>actionable steps</strong> you can schedule and repeat.
            </p>
            <p>
              People also search for this as:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">goal setting app</Badge>
              <Badge variant="outline">goal tracker app</Badge>
              <Badge variant="outline">goal management app</Badge>
              <Badge variant="outline">personal goal planner</Badge>
              <Badge variant="outline">daily goal planner</Badge>
              <Badge variant="outline">SMART goals app</Badge>
            </div>
            <p className="mt-4">
              The best apps support <strong>follow-through</strong>, not just planning.
            </p>
          </div>
        </section>

        {/* Why People Don't Reach Goals */}
        <section className="space-y-6" id="why-people-fail">
          <h2 className="text-3xl font-bold text-gray-900">Why People Don't Reach Goals (Even When They're Serious)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📍</span> Not Connected to Your Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>If the goal never becomes a calendar block, a daily task, or a routine, it competes with everything else.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span> Unclear Next Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>"Get healthier" sounds good. But what do you do today at 6pm? Goals need <strong>next actions</strong>.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span> Overplanning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Many systems create "perfect plans" that collapse in the first real week. The best systems are built for imperfect days.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span> Not Enough Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Without tracking, you can't tell if you're moving forward—so motivation drops.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">Key Features to Look For in the Best Goal Planner App</h2>
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

        {/* How to Set Goals Section */}
        <section className="space-y-6" id="how-to-set-goals">
          <h2 className="text-3xl font-bold text-gray-900">How to Set Goals in a Way That Leads to Action</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">The GoalPlanner Approach</h3>
              <p className="text-blue-800 mb-4">
                You don't need more goals. You need a clearer plan for the goals you already care about.
              </p>
              <p className="text-blue-700">
                Instead of pushing complexity, it helps you keep a small, repeatable system: define goals → connect them to weekly targets → convert targets into daily actions → track habits and progress → reflect and adjust.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Step-by-Step Method</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Choose one meaningful goal (per season)</h4>
                    <p className="text-gray-600">Ask: If I make progress on one thing, what will matter most?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Define the finish line</h4>
                    <p className="text-gray-600">Make it testable: "Complete 12 lessons," "Save $3,000," "Run 3x/week for 8 weeks"</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Set a timeframe</h4>
                    <p className="text-gray-600">Deadlines shape plans without shaming you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Break into milestones</h4>
                    <p className="text-gray-600">Milestones keep you from drifting and help you measure progress.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                  <div>
                    <h4 className="font-semibold">Convert to daily actions</h4>
                    <p className="text-gray-600">Daily actions should be small, clear, and tied to a time or trigger.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-6" id="use-cases">
          <h2 className="text-3xl font-bold text-gray-900">Real Examples: How People Use a Goal Planner App</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💼</span> Career Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Pass certification by September</p>
                  <p><strong>Weekly:</strong> 2 modules + 1 practice test</p>
                  <p><strong>Daily:</strong> 30 minutes after dinner</p>
                  <p><strong>Tracking:</strong> Sessions + weekly notes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏃</span> Fitness Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Train 3x/week for 8 weeks</p>
                  <p><strong>Weekly:</strong> 3 sessions</p>
                  <p><strong>Daily:</strong> Workout Tue/Thu/Sat</p>
                  <p><strong>Habit:</strong> 10-minute mobility on off days</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span> Financial Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Save $3,000</p>
                  <p><strong>Weekly:</strong> Transfer $75 + track spending 5 days</p>
                  <p><strong>Daily:</strong> Log spending at 9pm</p>
                  <p><strong>Review:</strong> What caused overspending?</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <p className="text-lg text-gray-600">Goal planning works best when connected to daily execution and consistency.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan your day and protect focus time</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistency & Routines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build habits that support your goals</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>All-in-One System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Goals + tasks + habits + reflections</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productivity-app">Productivity App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prefer a Simple System Over "Motivation"?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans on web or mobile. Start with one goal and one next action today—no complicated setup, just a calm place to plan, track, and stay consistent.
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

export default GoalPlannerApp;
