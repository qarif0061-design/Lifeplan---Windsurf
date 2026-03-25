import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const DailyJournalApp = () => {
  const faqData = [
    {
      question: "What's the best daily journal app?",
      answer: "The best daily journal app is the one you'll use consistently. Look for low-friction writing, optional prompts, reminders you control, and the ability to review entries over time."
    },
    {
      question: "How long should I journal each day?",
      answer: "3–10 minutes is enough for most people. Consistency matters more than long entries."
    },
    {
      question: "What should I write about if my day felt 'boring'?",
      answer: "Write about patterns, not events: what drained you, what energized you, what you avoided, and what you want tomorrow to feel like."
    },
    {
      question: "Can journaling help with goals and habits?",
      answer: "Yes. Journaling improves awareness, helps you learn from setbacks, and makes the next action clearer—especially when connected to your goal and habit system."
    },
    {
      question: "Is digital journaling safe?",
      answer: "It depends on the app and your habits. Use strong passwords and be mindful about storing highly sensitive information. Choose tools that respect privacy."
    }
  ];

  const features = [
    {
      title: "Low-Friction Writing",
      description: "Start writing quickly without complex formatting or setup.",
      icon: "✍️"
    },
    {
      title: "Smart Prompts",
      description: "Optional guided prompts when you don't know what to write.",
      icon: "💭"
    },
    {
      title: "Flexible Reminders",
      description: "Gentle reminders that fit your routine, not disrupt it.",
      icon: "🔔"
    },
    {
      title: "Pattern Discovery",
      description: "Review entries to spot patterns in energy, mood, and productivity.",
      icon: "🔍"
    },
    {
      title: "Privacy First",
      description: "Your journal is personal—keep it secure and under your control.",
      icon: "🔒"
    },
    {
      title: "Goal Connection",
      description: "Link reflections to your goals and habits for deeper insight.",
      icon: "🎯"
    }
  ];

  const promptTemplates = [
    {
      title: "The 3-Minute Template",
      prompts: [
        "One win: What went well today?",
        "One challenge: What was hard today?",
        "One next step: What would make tomorrow easier?"
      ]
    },
    {
      title: "The Pattern Finder",
      prompts: [
        "What drained my energy today?",
        "What gave me energy today?",
        "What triggered stress or avoidance?"
      ]
    },
    {
      title: "The Goal & Habit Template",
      prompts: [
        "What action did I take toward my goal today?",
        "What habit helped (or hurt) me?",
        "What's the smallest improvement I can make tomorrow?"
      ]
    },
    {
      title: "The Decision Clarity Template",
      prompts: [
        "What am I avoiding?",
        "What's the real fear or friction?",
        "What's the smallest step I can take?"
      ]
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Journal App – Reflect, Learn Patterns, and Stay Consistent | Goal Planner – LifePlans"
        description="A practical guide to choosing a daily journal app for reflection, clarity, and growth. Learn what to write, how to build a journaling habit, and how Goal Planner – LifePlans connects journaling with goals and daily planning."
        canonicalPath="/daily-journal-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Journal App",
          url: "https://goalplanner.io/daily-journal-app",
          description: "A practical guide to choosing a daily journal app for reflection, clarity, and growth.",
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
            <Badge variant="secondary" className="w-fit">Reflect & Grow Consistently</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Daily Journal App: Clear Your Mind, Notice Patterns, and Keep Growing (Without Writing Pages)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Journaling isn't just for "deep thinkers." It's for anyone who wants their life to feel less random. A few minutes of reflection can do what hours of pushing can't: reduce mental clutter, reveal patterns you keep repeating, and make the next step obvious.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Journaling</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">Why a daily journal app helps</p>
            <ul className="space-y-2 text-gray-700">
              <li>• always with you (phone)</li>
              <li>• easier to start (prompts)</li>
              <li>• easier to review (search + history)</li>
              <li>• connects reflection to action</li>
              <li>• builds consistency with reminders</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Journaling in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Journaling screen with prompts and reflection entries</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Daily Journal App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A <strong>daily journal app</strong> (digital journal app, personal journal app, journaling app, daily diary app) helps you write and reflect consistently—without needing a perfect routine.
            </p>
            <p>
              A great journaling app supports:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">fast entries</Badge>
              <Badge variant="outline">optional prompts</Badge>
              <Badge variant="outline">reminders</Badge>
              <Badge variant="outline">searchable entries</Badge>
              <Badge variant="outline">pattern review</Badge>
              <Badge variant="outline">privacy-first</Badge>
            </div>
            <p className="mt-4">
              If you're building a broader self-improvement system, a journal becomes even more useful when it connects to goals and habits.
            </p>
          </div>
        </section>

        {/* Digital vs Paper */}
        <section className="space-y-6" id="digital-vs-paper">
          <h2 className="text-3xl font-bold text-gray-900">Digital Journal vs Paper Journal</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">📖 Paper Journaling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-800">
                  <p>• slower thinking</p>
                  <p>• creativity and sketching</p>
                  <p>• fewer distractions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">📱 Digital Journal App</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-blue-800">
                  <p>• journaling anywhere</p>
                  <p>• quick daily reflection</p>
                  <p>• reminders and prompts</p>
                  <p>• searchable entries</p>
                  <p>• reviewing patterns over time</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-700 text-center">
              You don't have to choose forever. Many people use digital for consistency and paper for deeper sessions.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">Key Features to Look For in the Best Daily Journal App</h2>
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

        {/* Prompt Templates */}
        <section className="space-y-6" id="prompt-templates">
          <h2 className="text-3xl font-bold text-gray-900">What to Write: Practical Daily Reflection Prompts</h2>
          <p className="text-lg text-gray-600">If you don't know what to write, use structure. Here are prompt sets that work for real life.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {promptTemplates.map((template, index) => (
              <Card key={index} className="border-indigo-200 bg-indigo-50">
                <CardHeader>
                  <CardTitle className="text-indigo-900">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-indigo-800">
                    {template.prompts.map((prompt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-600">•</span>
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Journaling for Goals */}
        <section className="space-y-6" id="journaling-for-goals">
          <h2 className="text-3xl font-bold text-gray-900">Journaling for Goals: The Missing Layer Most People Skip</h2>
          <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-100">
            <p className="text-yellow-800 mb-4">A goal journal app isn't about writing affirmations all day. It's about keeping goals connected to reality.</p>
            <div className="space-y-3 text-yellow-900">
              <p><strong>Useful goal journaling questions:</strong></p>
              <ul className="space-y-2 ml-4">
                <li>• What did I do this week that moved the goal forward?</li>
                <li>• What got in the way—time, energy, fear, confusion?</li>
                <li>• What's one adjustment I can make next week?</li>
                <li>• What's my next action?</li>
              </ul>
              <p className="mt-4">
                This is why GoalPlanner's journaling is valuable: it can sit next to your goals, habits, and daily plan—so reflection turns into action.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <p className="text-lg text-gray-600">Journaling works best when it's connected to action and consistency.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Keep goals visible and learn from setbacks</p>
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
                <p className="text-gray-600 mb-4">Plan your day with insights from your reflections</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build habits that support your growth</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want More Clarity Without Overthinking?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for quick daily reflections that connect naturally to your goals, habits, and daily plan—on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/auth">Start Journaling Free</Link>
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

export default DailyJournalApp;
