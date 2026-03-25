import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const HabitTrackerApp = () => {
  const faqData = [
    {
      question: "What's the best habit tracker app?",
      answer: "The best habit tracker app is the one you'll use consistently. Look for simple tracking, flexible scheduling, reminders you control, and a way to learn from patterns—not just chase streaks."
    },
    {
      question: "How many habits should I track at once?",
      answer: "Start with 1–3. If you track too many, it becomes a guilt list. Build one stable routine first, then add more."
    },
    {
      question: "Do streaks help or hurt?",
      answer: "They can help early on, but they can also create all-or-nothing thinking. A better target is weekly consistency (e.g., 4–5 days/week) with a small baseline."
    },
    {
      question: "How do I build a habit when I have no time?",
      answer: "Shrink the habit until it fits: 2–5 minutes is enough to maintain identity and momentum. Consistency beats intensity—especially in busy seasons."
    },
    {
      question: "Can habit tracking help break bad habits?",
      answer: "Yes—especially when you track triggers and replacements. The goal isn't never slipping; it's understanding what causes the behavior and designing a better default."
    }
  ];

  const features = [
    {
      title: "Simple Habit Creation",
      description: "Define habits clearly and set what counts as completion.",
      icon: "✅"
    },
    {
      title: "Flexible Scheduling",
      description: "Track daily, weekly, or on custom schedules that fit your life.",
      icon: "📅"
    },
    {
      title: "Consistency Tracking",
      description: "See patterns beyond just streaks—weekly rates and trends.",
      icon: "📊"
    },
    {
      title: "Smart Reminders",
      description: "Gentle reminders that act as triggers, not interruptions.",
      icon: "🔔"
    },
    {
      title: "Pattern Insights",
      description: "Notes and reflections to understand what works and what doesn't.",
      icon: "🔍"
    },
    {
      title: "Goal Connection",
      description: "Link habits to the goals they support for better motivation.",
      icon: "🎯"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Habit Tracker App – Build Routines, Stay Consistent, and Make Progress | Goal Planner – LifePlans"
        description="Looking for a habit tracker app that helps you stay consistent? Learn how to build habits with a practical system (triggers, routines, streaks, reviews) and how Goal Planner – LifePlans connects habits to goals and daily planning."
        canonicalPath="/habit-tracker-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Habit Tracker App",
          url: "https://goalplanner.io/habit-tracker-app",
          description: "Looking for a habit tracker app that helps you stay consistent? Learn how to build habits with a practical system.",
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
            <Badge variant="secondary" className="w-fit">Build Habits That Last</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Habit Tracker App: Build Habits That Survive Busy Weeks (Not Just "Perfect" Weeks)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Most habit advice breaks down in real life. It's easy to "be consistent" when you have energy, time, and a clear schedule. The real test is what happens when you're stressed, traveling, working late, or mentally tired.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Building Habits</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">What a great habit tracker app helps you do</p>
            <ul className="space-y-2 text-gray-700">
              <li>• build routines you can repeat</li>
              <li>• keep momentum through imperfect days</li>
              <li>• understand what actually makes your habits stick</li>
              <li>• turn identity into action ("I'm the kind of person who...")</li>
              <li>• learn from patterns instead of guessing</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Habit Tracking in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Habit tracking screen with streaks and consistency view</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Habit Tracker App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A <strong>habit tracker app</strong> (daily habit tracker, routine tracker app, habit planner) helps you track repeated behaviors—so you can build consistency over time.
            </p>
            <p>
              A good habit tracker helps you:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">define habits clearly</Badge>
              <Badge variant="outline">track completion daily</Badge>
              <Badge variant="outline">see patterns over time</Badge>
              <Badge variant="outline">use reminders as triggers</Badge>
              <Badge variant="outline">reflect and adjust</Badge>
            </div>
            <p className="mt-4">
              Tracking turns "I think I'm doing okay" into real feedback.
            </p>
          </div>
        </section>

        {/* Why Habits Matter */}
        <section className="space-y-6" id="why-habits-matter">
          <h2 className="text-3xl font-bold text-gray-900">Why Habits Matter More Than Motivation</h2>
          <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Motivation is Unstable</h3>
                <p className="text-orange-800 space-y-2">
                  Motivation depends on:
                  <br />• mood
                  <br />• stress
                  <br />• sleep
                  <br />• environment
                  <br />• competing priorities
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Habits Are Designed</h3>
                <p className="text-orange-800 space-y-2">
                  Habits can work even when motivation is low, if they're:
                  <br />• small enough
                  <br />• tied to a trigger
                  <br />• easy to start
                  <br />• reinforced by identity
                </p>
              </div>
            </div>
            <p className="text-orange-900 mt-6 font-medium">
              A build habits app should help you make the habit easier than skipping it.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">Key Features to Look For in the Best Habit Tracker App</h2>
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

        {/* Habit Building System */}
        <section className="space-y-6" id="habit-building-system">
          <h2 className="text-3xl font-bold text-gray-900">The Habit Building System That Works</h2>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <p className="text-purple-800 mb-6">Simple + Realistic approach that survives busy weeks.</p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Pick habits with clear payoff</h4>
                    <p className="text-purple-700">Instead of "be better," choose behaviors you can feel: "10-minute walk after lunch," "plan tomorrow in 3 minutes," "write 200 words."</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Define "what counts"</h4>
                    <p className="text-purple-700">Ambiguity kills habits. Bad: "exercise." Better: "20 minutes walking or workout video."</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Start smaller than your ambition</h4>
                    <p className="text-purple-700">Make it "too easy to fail": 5 minutes, 1 page, 1 sentence, 1 short session. You can scale later. Consistency first.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Attach it to a trigger</h4>
                    <p className="text-purple-700">After coffee → plan the day. After lunch → short walk. After brushing teeth → journal reflection.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Reduce friction</h4>
                    <p className="text-purple-700">Make starting effortless: clothes ready, tools open, environment prepared, reminders scheduled at the right moment.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">6</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Track and review weekly</h4>
                    <p className="text-purple-700">A weekly check-in turns slips into learning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breaking Bad Habits */}
        <section className="space-y-6" id="breaking-bad-habits">
          <h2 className="text-3xl font-bold text-gray-900">Breaking Bad Habits (Without Shame)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900">🔍 Notice the Trigger</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-800">Time, mood, situation. What happens right before the behavior?</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">🔄 Replace the Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">Swap, don't just "stop." Late-night scrolling → short reading habit + wind-down routine.</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">⬆️ Increase Friction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800">Make the bad habit harder: charge phone outside bedroom, put junk food out of sight.</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">⬇️ Decrease Friction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">Make the good habit easier: workout clothes ready, book on pillow, app open on phone.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <p className="text-lg text-gray-600">Habits stick better when they have direction and support.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Give your habits purpose by connecting them to meaningful goals</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Schedule habits into your day so they actually happen</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>All-in-One System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Goals + tasks + habits + reflections in one place</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productivity-app">Productivity App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want a Calmer Way to Build Consistency?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans to track habits, set gentle reminders, and connect routines to your goals—on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
                <Link to="/auth">Start Building Habits</Link>
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

export default HabitTrackerApp;
