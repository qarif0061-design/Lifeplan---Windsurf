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
      question: "What's the best habit tracker app for beginners?",
      answer: "The best habit tracker app for beginners focuses on simplicity and consistency over features. Look for: one-tap completion (no complex forms), flexible scheduling (daily, specific days, custom patterns), gentle reminders (not constant notifications), pattern insights (weekly rates, best days, trouble spots), simple progress visualization (not overwhelming charts), and optional notes (for learning from slips). Avoid apps with excessive gamification, complex analytics, or social features that create pressure. The best habit tracker app makes tracking effortless and learning from patterns easy."
    },
    {
      question: "How many habits should I track at once?",
      answer: "Start with 1-3 habits maximum. Research shows that trying to build more than 3 new habits simultaneously dramatically reduces success rates for all of them. Focus on building one solid routine first, then gradually add more. Some people use a 'primary habit + maintenance habits' approach: one new habit you're actively building, plus 2-3 existing habits you're maintaining. The key is ensuring your habits don't compete for the same time, energy, or triggers. Quality trumps quantity every time."
    },
    {
      question: "Do streaks help or hurt habit building?",
      answer: "Streaks are a double-edged sword. They help initially by creating momentum and visual progress, but they can create all-or-nothing thinking that leads to quitting after one missed day. A better approach is focusing on weekly consistency (e.g., 5-7 days per week) rather than daily perfection. Many successful habit trackers now show weekly rates and trends instead of just streak counters. The psychology matters: streaks can motivate but also shame—weekly consistency feels achievable and forgiving while still driving results."
    },
    {
      question: "How do I build habits when I have no time?",
      answer: "Shrink the habit until it fits. The '2-minute rule' works: make your habit so small you can do it in 2 minutes or less. 'Exercise' becomes 'put on workout clothes.' 'Read more' becomes 'read one page.' 'Meditate' becomes 'sit and breathe for 60 seconds.' Consistency beats intensity, especially during busy seasons. Once the tiny habit is automatic, you can gradually increase the duration. Many people fail because they start with ambitious habits that collapse during busy weeks—start ridiculously small and build from there."
    },
    {
      question: "Can habit tracking help break bad habits?",
      answer: "Yes, but you need to track the right things. Instead of just tracking 'didn't do bad habit,' track triggers and replacement behaviors. For example: track 'felt urge to scroll social media' and 'did 5 deep breaths instead.' This helps you understand patterns and build replacement routines. The key is tracking what you want to do, not just what you want to avoid. Many habit tracker apps support notes and reflections so you can identify triggers, test replacement behaviors, and learn from slips without judgment."
    },
    {
      question: "What's the difference between habit tracker and routine planner?",
      answer: "Habit tracker apps focus on individual behaviors and consistency—did you do the thing today? Routine planner apps focus on sequences of actions and timing—morning routine, evening routine, work startup routine. Habit tracking answers 'did I do it?' while routine planning answers 'how should I do it and when?' The best systems combine both: track individual habits while organizing them into meaningful routines. Many people use habit tracking for consistency and routine planning for structure."
    },
    {
      question: "How do I track habits without obsessing over perfection?",
      answer: "Focus on weekly patterns instead of daily perfection. Aim for 80% consistency (4-5 days per week for daily habits) rather than 100%. Use habit tracker apps that show trends and weekly rates rather than just streak counters. Practice 'never miss twice'—if you miss one day, get back on track the next day, but don't let one miss become two. Remember: habits are built through repetition over time, not perfect performance. Some days are for maintenance, not growth—and that's normal and sustainable."
    },
    {
      question: "How do habits connect to goals and daily planning?",
      answer: "Habits are the daily actions that achieve your goals. Goals set the destination, habits create the path. For example: Goal 'run marathon' → Habit 'run 3x weekly'. Goal 'learn Spanish' → Habit 'study 15 minutes daily'. Daily planning provides the structure to ensure habits happen: schedule habit time, protect it from conflicts, review what worked. The most effective systems connect all three: goals give purpose, habits provide consistency, daily planning creates execution."
    },
    {
      question: "What features are essential in a habit tracker app?",
      answer: "For effective habit tracking, look for: one-tap completion (no complex forms), flexible scheduling (daily, specific days, custom patterns), gentle reminders (not constant notifications), pattern insights (weekly rates, best days, trouble spots), simple progress visualization (not overwhelming charts), and optional notes (for learning from slips). Avoid apps with excessive gamification, complex analytics, or social features that create pressure. The best habit tracker app makes tracking effortless and learning from patterns easy."
    },
    {
      question: "Can habit tracking help with ADHD or focus issues?",
      answer: "Habit tracking can be particularly helpful for ADHD or executive function challenges because it provides external structure and reduces cognitive load. Look for apps with: clear visual progress (immediate feedback), simple interface (minimal decision fatigue), flexible scheduling (adapt to variable energy), gentle reminders (external prompts), and pattern insights (understanding what works). The app serves as an external brain—remembering habits, providing prompts, and tracking progress when internal executive functions are challenged. However, remember that an app is a support tool, not a replacement for comprehensive ADHD management."
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
        title="Best Habit Tracker App 2026 | Build Consistent Habits That Stick | GoalPlanner"
        description="The best habit tracker app for building sustainable routines. Track habits, build consistency, and make progress without burnout. Start building habits free."
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

        {/* Best Habit Tracker App Section */}
        <section className="space-y-6" id="best-habit-tracker-app">
          <h2 className="text-3xl font-bold text-gray-900">Best Habit Tracker App: What Actually Helps</h2>
          <p className="text-lg text-gray-600">When searching for the best habit tracker app, focus on features that support consistency, not just tracking.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">🎯 Essential Features That Build Consistency</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">One-Tap Tracking</p>
                    <p className="text-gray-600 text-sm">Mark completion with a single tap, no complex forms</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Flexible Scheduling</p>
                    <p className="text-gray-600 text-sm">Daily, weekly, or custom patterns that fit your life</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Pattern Insights</p>
                    <p className="text-gray-600 text-sm">See what works, not just whether you did it</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Gentle Reminders</p>
                    <p className="text-gray-600 text-sm">Helpful nudges, not constant notifications</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">⚠️ Features That Often Create Pressure</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Excessive Gamification</p>
                    <p className="text-gray-600 text-sm">Points, badges, and leaderboards that create pressure</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Social Pressure Features</p>
                    <p className="text-gray-600 text-sm">Public sharing and comparison that create shame</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Perfect Streak Emphasis</p>
                    <p className="text-gray-600 text-sm">All-or-nothing thinking that leads to quitting</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Analytics</p>
                    <p className="text-gray-600 text-sm">Overwhelming data that doesn't drive action</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Habits Matter Section */}
        <section className="space-y-6" id="why-habits-matter">
          <h2 className="text-3xl font-bold text-gray-900">Why Habits Matter More Than Motivation</h2>
          <p className="text-lg text-gray-600">Motivation is unreliable. Habits are the systems that work when motivation fades.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">🔥 Motivation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-orange-800">
                  <p>• Unstable and unpredictable</p>
                  <p>• Depends on mood, energy, circumstances</p>
                  <p>• High at start, fades with difficulty</p>
                  <p>• Creates pressure to "feel motivated"</p>
                  <p>• Leads to all-or-nothing thinking</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">⚙️ Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-800">
                  <p>• Consistent and reliable</p>
                  <p>• Work regardless of mood or energy</p>
                  <p>• Build momentum over time</p>
                  <p>• Reduce decision fatigue</p>
                  <p>• Create automatic progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 text-center">
              <strong>The truth:</strong> Successful people don't have more motivation. They have better habits and systems that work when motivation disappears.
            </p>
          </div>
        </section>

        {/* Habit Tracker vs Routine Planner */}
        <section className="space-y-6" id="habit-tracker-vs-routine">
          <h2 className="text-3xl font-bold text-gray-900">Habit Tracker App vs Routine Planner</h2>
          <p className="text-lg text-gray-600">Understanding the difference helps you choose the right approach for your needs.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Habit Tracker Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-purple-800">
                  <p><strong>Best for:</strong> Individual behaviors, consistency tracking, building new routines</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Daily completion tracking</li>
                    <li>• Streak and pattern visualization</li>
                    <li>• Flexible scheduling options</li>
                    <li>• Progress insights and trends</li>
                    <li>• Simple reminder system</li>
                  </ul>
                  <p><strong>When to use:</strong> When you're building specific behaviors and need to track consistency over time</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <span className="text-2xl">🔄</span> Routine Planners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-800">
                  <p><strong>Best for:</strong> Sequencing actions, time-based routines, morning/evening schedules</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Time-based scheduling</li>
                    <li>• Action sequencing</li>
                    <li>• Routine templates</li>
                    <li>• Duration tracking</li>
                    <li>• Checklist completion</li>
                  </ul>
                  <p><strong>When to use:</strong> When you need to organize multiple actions into structured time blocks</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 text-center">
              <strong>Pro tip:</strong> Many successful people use both—habit trackers for consistency, routine planners for structure.
            </p>
          </div>
        </section>

        {/* How to Build Habits Section */}
        <section className="space-y-6" id="build-habits">
          <h2 className="text-3xl font-bold text-gray-900">How to Build Habits That Actually Stick</h2>
          <p className="text-lg text-gray-600">The secret to habit building isn't willpower—it's design. Design habits that are easier than skipping them.</p>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-6">The Habit Design Framework</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Start Identity-Based</h4>
                    <p className="text-purple-700">Instead of "I want to exercise," become "someone who exercises." Identity drives long-term consistency.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Make It Ridiculously Small</h4>
                    <p className="text-purple-700">2-minute rule: shrink habits until they're impossible to fail. "Read one page" not "read for 30 minutes."</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Attach to Existing Triggers</h4>
                    <p className="text-purple-700">Link new habits to things you already do: after coffee, before bed, during lunch break.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Design the Environment</h4>
                    <p className="text-purple-700">Make good habits easy and visible, bad habits hard and invisible. Remove friction, add convenience.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Plan for Imperfection</h4>
                    <p className="text-purple-700">Build in flexibility for busy days, low motivation, unexpected obstacles. Never miss twice.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Clear Definition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Define exactly what counts as completion. "Exercise" becomes "20 minutes walking or workout video."</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⏰ Time Anchoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Attach habits to specific times or existing routines for automatic triggers.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Track Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Focus on weekly consistency and learning from misses, not perfect daily streaks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tracking Without Obsession */}
        <section className="space-y-6" id="tracking-without-obsession">
          <h2 className="text-3xl font-bold text-gray-900">How to Track Habits Without Obsessing Over Streaks</h2>
          <p className="text-lg text-gray-600">Healthy habit tracking supports growth without creating pressure or shame around imperfection.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🔄 Weekly Consistency Focus</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Instead of Daily Perfection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Aim for 80% consistency (4-5 days/week)</li>
                        <li>• Focus on trends, not individual days</li>
                        <li>• Plan for maintenance days</li>
                        <li>• Celebrate weekly patterns</li>
                        <li>• Learn from misses without shame</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">⚡ The "Never Miss Twice" Rule</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Sustainable Mindset</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-gray-600">
                        <li>• One miss is normal, two is a pattern</li>
                        <li>• Get back on track immediately</li>
                        <li>• Analyze what caused the miss</li>
                        <li>• Adjust the habit if needed</li>
                        <li>• Focus on long-term consistency</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <p className="text-green-800">
                <strong>The psychology:</strong> Weekly consistency feels achievable and forgiving while still driving results. It prevents the all-or-nothing thinking that makes people quit after one missed day.
              </p>
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

        {/* Habits Connect to Goals Section */}
        <section className="space-y-6" id="habits-goals-connection">
          <h2 className="text-3xl font-bold text-gray-900">How Habits Connect to Goals and Daily Planning</h2>
          <p className="text-lg text-gray-600">The most effective systems connect habits to your bigger picture and daily execution.</p>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">The Connection Triangle</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-blue-800 mb-3">🎯 Goals Set Direction</h4>
                  <p className="text-blue-700 text-sm">Goals provide the "why" - the destination you're working toward. They give habits purpose and meaning.</p>
                  <p className="text-blue-600 text-sm mt-2">Example: "Run marathon" → "Exercise 3x weekly"</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-3">✅ Habits Create Consistency</h4>
                  <p className="text-blue-700 text-sm">Habits are the daily actions that accumulate into goal achievement. They turn intentions into automatic progress.</p>
                  <p className="text-blue-600 text-sm mt-2">Example: "Morning run" becomes automatic routine</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-3">📅 Planning Ensures Execution</h4>
                  <p className="text-blue-700 text-sm">Daily planning protects time for habits and adjusts when life happens.</p>
                  <p className="text-blue-600 text-sm mt-2">Example: Schedule 6am run, protect from conflicts</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Review how habits supported goals this week and adjust next week's plan.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Identity Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Choose habits that match the person you want to become.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚡ Energy Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Schedule habits when you have the energy and motivation for them.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why GoalPlanner Section */}
        <section className="space-y-6" id="why-goalplanner-habits">
          <h2 className="text-3xl font-bold text-gray-900">Why GoalPlanner Helps with Consistency</h2>
          <p className="text-lg text-gray-600">GoalPlanner is designed specifically for the messy reality of building and maintaining habits.</p>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🔄 Flexible by Design</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Adapt schedules when life gets busy</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Weekly consistency focus, not daily perfection</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">No guilt or shame around missed days</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🎯 Purpose-Driven</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Connect habits to meaningful goals</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">See how daily actions create bigger outcomes</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Build identity-based habits that last</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">The GoalPlanner Difference for Habit Building</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">✅ Simple Tracking</h4>
                  <p className="text-purple-700 text-sm">One-tap completion that disappears into your routine</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">📊 Pattern Insights</h4>
                  <p className="text-purple-700 text-sm">Learn what works without overwhelming data</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">🔗 Connected System</h4>
                  <p className="text-purple-700 text-sm">Habits link to goals and daily planning for full context</p>
                </div>
              </div>
              <p className="text-purple-900 mt-6 text-center font-medium">
                GoalPlanner works because it's built for real habit building, not perfect tracking fantasies.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="space-y-6" id="mid-cta">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Habits That Last?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for habit tracking that adapts to your real life. Start with just one small habit today.
            </p>
            <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
              <Link to="/auth">Start Building Habits Free</Link>
            </Button>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Complete Habit System</h2>
          <p className="text-lg text-gray-600">Habit building works best when connected to your goals and daily structure.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set meaningful goals that give your habits purpose and direction</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Schedule and protect time for your habits to ensure consistency</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📝 Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Review habit progress and learn from your patterns with journaling</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 All-in-One System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Combine habits, goals, planning, and reflection in one place</p>
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
