import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const DailyPlannerApp = () => {
  const faqData = [
    {
      question: "What's the difference between a daily planner app and a to-do list app?",
      answer: "A to-do list stores tasks. A daily planner app helps you prioritize, plan time, and build a realistic daily structure—so you're not just collecting tasks, you're executing them."
    },
    {
      question: "How do I plan my day when my schedule keeps changing?",
      answer: "Plan in blocks, not a minute-by-minute schedule. Use one focus block, one buffer block, and a midday check-in to adjust. A flexible plan survives change."
    },
    {
      question: "How many tasks should I plan per day?",
      answer: "Most people do best with 1–3 priorities plus a small set of supporting tasks. If you plan too many, you create guilt instead of clarity."
    },
    {
      question: "Are reminders helpful for daily planning?",
      answer: "Yes, when they support routines (check-ins, focus blocks, end-of-day review). Too many reminders usually backfire."
    },
    {
      question: "What's a good daily planning routine for beginners?",
      answer: "A simple routine is: morning—pick priorities, midday—adjust, evening—review and prep tomorrow. It's short, repeatable, and improves quickly."
    }
  ];

  const features = [
    {
      title: "Quick Task Capture",
      description: "Get tasks out of your head fast, reducing mental clutter.",
      icon: "📝"
    },
    {
      title: "Priority Setting",
      description: "Choose 1–3 priorities so everything doesn't feel urgent.",
      icon: "🎯"
    },
    {
      title: "Time Blocking",
      description: "Schedule focus blocks that protect your most important work.",
      icon: "⏰"
    },
    {
      title: "Smart Reminders",
      description: "Gentle check-ins and focus block reminders, not constant notifications.",
      icon: "🔔"
    },
    {
      title: "Daily Review",
      description: "Quick end-of-day review to close loops and prep tomorrow.",
      icon: "🔄"
    },
    {
      title: "Cross-Device Sync",
      description: "Plan on desktop, execute on mobile—your plan follows you.",
      icon: "📱"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Planner App – Plan Your Day, Prioritize Tasks, and Stay Focused | Goal Planner – LifePlans"
        description="A practical guide to choosing a daily planner app that helps you plan your day, prioritize tasks, use reminders well, and stay focused—plus how Goal Planner – LifePlans works on web and mobile."
        canonicalPath="/daily-planner-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Planner App",
          url: "https://goalplanner.io/daily-planner-app",
          description: "A practical guide to choosing a daily planner app that helps you plan your day, prioritize tasks, use reminders well, and stay focused.",
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
            <Badge variant="secondary" className="w-fit">Daily Planning Made Simple</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Daily Planner App: Plan Your Day With Less Stress (and Actually Finish What Matters)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              A lot of people don't need "more productivity." They need a day that feels <strong>intentional</strong> instead of reactive.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Your Day</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">What a daily planner app should help you do</p>
            <ul className="space-y-2 text-gray-700">
              <li>• quick task capture (so tasks stop living in your head)</li>
              <li>• prioritization (so everything isn't "urgent")</li>
              <li>• simple scheduling / time blocks</li>
              <li>• reminders that support your plan</li>
              <li>• daily routines and repeatable structure</li>
              <li>• a short review so you learn and improve</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Daily Planning in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Daily planning screen with priorities and time blocks</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Daily Planner App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A <strong>daily planner app</strong> (also called a day planner app, daily organizer app, or plan-your-day app) helps you build a workable plan for one day at a time.
            </p>
            <p>
              A solid daily planning tool typically supports:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">quick task capture</Badge>
              <Badge variant="outline">prioritization</Badge>
              <Badge variant="outline">simple scheduling</Badge>
              <Badge variant="outline">reminders</Badge>
              <Badge variant="outline">daily routines</Badge>
              <Badge variant="outline">short review</Badge>
            </div>
            <p className="mt-4">
              If a tool only stores tasks, it's a list. A planner helps you <strong>execute</strong>.
            </p>
          </div>
        </section>

        {/* Why Daily Planning Works */}
        <section className="space-y-6" id="why-it-works">
          <h2 className="text-3xl font-bold text-gray-900">Why Daily Planning Works (Even If You're Busy)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🧠</span> Reduces Decision Fatigue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>When you don't decide in advance, you decide all day—hundreds of micro-decisions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span> Prevents Context Switching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Jumping between tasks is expensive. A plan helps you stay in one mode longer.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span> Eliminates "Invisible Time"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Without a plan, your day fills up with small interruptions that add up.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Creates Realistic Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Daily planning isn't about packing your schedule. It's about creating a realistic path through your day.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">Key Features to Look For in the Best Daily Planner App</h2>
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

        {/* Calm Day Method */}
        <section className="space-y-6" id="calm-day-method">
          <h2 className="text-3xl font-bold text-gray-900">The "Calm Day" Method: How to Plan Your Day in 10 Minutes</h2>
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <p className="text-green-800 mb-6">Use this method daily or on weekdays. It's designed for real life.</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-green-900">Capture tasks fast (2 minutes)</h4>
                  <p className="text-green-700">Dump everything you're carrying: work tasks, personal errands, calls/messages, "don't forget" items.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-green-900">Choose 1–3 priorities (2 minutes)</h4>
                  <p className="text-green-700">Ask: "If I finish only three things today, what would make today a win?"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-green-900">Define next actions (2 minutes)</h4>
                  <p className="text-green-700">Turn "big tasks" into startable steps: "Finish proposal" → "Draft outline + 5 bullets"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-green-900">Add one focus block (2 minutes)</h4>
                  <p className="text-green-700">Pick a block: 25 minutes (quick win) or 50 minutes (deep work). Put it somewhere you can protect.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                <div>
                  <h4 className="font-semibold text-green-900">Add buffers + a reset point (2 minutes)</h4>
                  <p className="text-green-700">Reality needs space. Add a buffer block (for the unexpected) and a mid-day check-in (to adjust the plan).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prioritization Rules */}
        <section className="space-y-6" id="prioritization">
          <h2 className="text-3xl font-bold text-gray-900">Prioritization That Doesn't Feel Like a Productivity Lecture</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">🎯 The "one hard thing early" rule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">If your schedule allows, do one meaningful task early. It reduces background stress all day.</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900">⚖️ The "impact vs. effort" filter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800">High impact + low effort = do soon. High impact + high effort = schedule a focus block. Low impact = batch or postpone.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <p className="text-lg text-gray-600">Daily planning works best when connected to goals and habits.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set clear goals that give your daily planning direction</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistency & Routines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build habits that make daily planning easier</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Review your day and improve tomorrow's plan</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want Your Day to Feel More Intentional?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans to plan your day, pick priorities, protect focus time, and build simple routines—available on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Start Planning Free</Link>
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

export default DailyPlannerApp;
