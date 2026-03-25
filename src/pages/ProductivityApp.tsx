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
      answer: "An effective productivity app supports the full loop: plan, execute, track consistency, and review. Most apps only store tasks, which increases overwhelm. The best productivity apps help you: prioritize what matters, protect time for deep work, build consistent routines, track meaningful progress, and learn from patterns. The key is reducing mental overhead while increasing focus on what actually moves you forward."
    },
    {
      question: "Do I need an all-in-one productivity app?",
      answer: "Not always, but many people benefit from one system for goals, tasks, habits, and reflection. The benefits include: reduced context switching between apps, better visibility of how different areas connect, fewer things to maintain and update, and integrated progress tracking. However, if you already have systems that work well, the cost of switching might outweigh the benefits. The key is whether your current tools create friction or flow in your daily work."
    },
    {
      question: "How can a productivity app help with focus and deep work?",
      answer: "Productivity apps help focus by: supporting time blocking (protecting blocks for deep work), limiting daily priorities (preventing overwhelm), providing gentle check-ins (not constant notifications), helping you say no to non-essential tasks, and tracking energy patterns (schedule deep work during peak focus times). The most effective focus features protect your attention rather than fragment it with excessive alerts and notifications."
    },
    {
      question: "What's the difference between a productivity app and a task management app?",
      answer: "Task management apps organize and track tasks. Productivity apps help you make consistent progress on what matters most. Task apps answer 'what needs to be done?' while productivity apps answer 'what should I focus on and how should I structure my day?' Productivity apps typically include: goal connection, time blocking, habit tracking, energy management, and weekly review—features that help you execute consistently rather than just organize tasks."
    },
    {
      question: "How do I avoid burnout with productivity tools?",
      answer: "Focus on sustainable progress rather than perfect productivity. Use fewer priorities (1-3 per day), plan realistic time blocks, maintain a small baseline habit (even on busy days), schedule weekly reviews to adjust, and protect recovery time. The best productivity apps support sustainable rhythms rather than constant intensity. Remember: productivity is about consistent progress, not heroic effort that leads to burnout."
    },
    {
      question: "What features should I look for in a simple productivity app?",
      answer: "For effective productivity management, look for: daily planning with priority setting, time blocking for focus work, habit tracking for consistency, goal connection for purpose, weekly review for improvement, simple task organization (not overwhelming lists), and minimal notifications (protect focus). Avoid apps with excessive analytics, complex project management, or constant alerts that fragment attention."
    },
    {
      question: "Can a productivity app help with work-life balance?",
      answer: "Yes, when designed intentionally. Look for apps that: support life area categorization (work, health, family, learning), help you schedule personal activities with the same seriousness as work, provide energy tracking (avoid scheduling deep work when you're tired), and include recovery time in your daily plans. The best productivity apps help you allocate time to all life domains, not just work tasks."
    },
    {
      question: "How do productivity systems reduce mental overload?",
      answer: "Productivity systems reduce mental load by: externalizing tasks and commitments (freeing working memory), creating structure and predictability (reducing decision fatigue), providing trusted systems (so you don't have to remember everything), building automatic routines (reducing willpower needs), and offering closure mechanisms (completing planned items feels satisfying). When you trust your system, your brain stops constantly scanning for unfinished tasks."
    },
    {
      question: "What's the best way to organize tasks in a productivity app?",
      answer: "Organize by priority and context, not just urgency. Use: daily priorities (1-3 most important), time blocks (when you'll work on them), energy matching (high-focus tasks during peak energy), context grouping (similar tasks together), and weekly themes (focus areas for the week). Avoid long, overwhelming task lists. The best organization helps you see what matters most without creating anxiety about everything else."
    },
    {
      question: "How do productivity apps help with procrastination?",
      answer: "Productivity apps help procrastination by: making tasks smaller and more specific (reducing activation energy), scheduling exact times (removing decision-making), creating accountability (through tracking and review), building momentum (with small wins), and identifying patterns (when and why you procrastinate). The key is making starting easier than avoiding, which good productivity systems do through structure and accountability."
    },
    {
      question: "Should I use a productivity app for team or personal productivity?",
      answer: "Personal productivity apps focus on individual effectiveness: personal goals, habits, energy management, and life balance. Team productivity apps focus on collaboration: shared projects, deadlines, communication, and resource allocation. While some apps try to serve both, most people work best with separate systems—one for personal organization, another for team collaboration. The key is using the right tool for the right context rather than forcing one app to serve all needs."
    },
    {
      question: "Why does GoalPlanner work as a simple productivity system?",
      answer: "GoalPlanner is designed specifically for sustainable personal productivity. Unlike complex systems that create overwhelm, it features: daily planning with realistic priorities, time blocking that adapts to real life, habit tracking for consistency, goal connection for purpose, simple weekly reviews, and minimal notifications. It recognizes that productivity is about consistent progress, not perfect execution. The app reduces friction while providing the structure needed for meaningful daily progress."
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

        {/* Best Productivity App Section */}
        <section className="space-y-6" id="best-productivity-app">
          <h2 className="text-3xl font-bold text-gray-900">Best Productivity App: What Actually Works</h2>
          <p className="text-lg text-gray-600">The best productivity apps don't just organize tasks—they help you make consistent progress on what matters most.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">🎯 What Makes Productivity Apps Effective</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Priority Protection</p>
                    <p className="text-gray-600 text-sm">Helps you focus on what moves you forward</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Consistency Support</p>
                    <p className="text-gray-600 text-sm">Builds routines that don't depend on willpower</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Mental Load Reduction</p>
                    <p className="text-gray-600 text-sm">Externalizes commitments so your brain can focus</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Pattern Recognition</p>
                    <p className="text-gray-600 text-sm">Shows what works so you can repeat success</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">⚠️ Why Most Productivity Apps Fail</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Task Overload</p>
                    <p className="text-gray-600 text-sm">Endless lists that create overwhelm</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">No Priority Limits</p>
                    <p className="text-gray-600 text-sm">Everything feels equally important</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Constant Notifications</p>
                    <p className="text-gray-600 text-sm">Fragments attention instead of protecting it</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Systems</p>
                    <p className="text-gray-600 text-sm">More overhead than the problems they solve</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All-in-One vs Separate Apps */}
        <section className="space-y-6" id="all-in-one-vs-separate">
          <h2 className="text-3xl font-bold text-gray-900">All-in-One Productivity App vs Using Multiple Apps</h2>
          <p className="text-lg text-gray-600">The right approach depends on your personality, goals, and how you work best.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <span className="text-2xl">🔄</span> All-in-One System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-800">
                  <p><strong>Best for:</strong> People who want simplicity and reduced context switching</p>
                  <p><strong>Key benefits:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• One place to manage everything</li>
                    <li>• Better visibility of connections between areas</li>
                    <li>• Fewer apps to maintain and update</li>
                    <li>• Integrated progress tracking</li>
                    <li>• Reduced mental overhead</li>
                  </ul>
                  <p><strong>When to choose:</strong> When you want to see how goals, habits, tasks, and reflection work together</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">🧩</span> Multiple Specialized Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-orange-800">
                  <p><strong>Best for:</strong> People who want best-in-class tools for each specific need</p>
                  <p><strong>Key benefits:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Optimized features for each use case</li>
                    <li>• More powerful specialized functionality</li>
                    <li>• Can pick the best tool for each job</li>
                    <li>• Flexibility to mix and match</li>
                    <li>• Often more advanced in specific areas</li>
                  </ul>
                  <p><strong>When to choose:</strong> When you have specific needs that require specialized tools</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 text-center">
              <strong>The reality:</strong> Most people start with multiple apps and eventually consolidate when they realize the cost of context switching.
            </p>
          </div>
        </section>

        {/* Productivity Systems Section */}
        <section className="space-y-6" id="productivity-systems">
          <h2 className="text-3xl font-bold text-gray-900">How Productivity Systems Reduce Mental Overload</h2>
          <p className="text-lg text-gray-600">Good productivity systems don't add more work—they free up mental bandwidth for what matters.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🧠 Mental Load Reduction</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Externalizes Commitments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">When you trust your system, your brain stops constantly scanning for unfinished tasks and deadlines.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Creates Predictability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Routines and structures reduce decision fatigue by making choices automatic.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Provides Closure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Completing planned items creates satisfaction and reduces the feeling of being perpetually behind.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">⚡ Focus Protection</h3>
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <p className="text-yellow-800 mb-3">The attention economy works against productivity:</p>
                  <ul className="space-y-2 text-yellow-700 ml-4">
                    <li>• Social media and notifications fragment attention</li>
                    <li>• Open loops and unfinished tasks create mental clutter</li>
                    <li>• Too many priorities create decision paralysis</li>
                    <li>• Context switching drains mental energy</li>
                  </ul>
                  <p className="text-yellow-800 mt-3">Good productivity systems protect your attention like a bodyguard.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Regular reviews prevent systems from becoming outdated and overwhelming.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Priority Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Limiting daily priorities prevents overwhelm and ensures focus on what matters.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Protecting time for important work prevents the day from being consumed by urgent but low-value tasks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-Life Productivity */}
        <section className="space-y-6" id="real-life-productivity">
          <h2 className="text-3xl font-bold text-gray-900">Personal Productivity System for Real Life</h2>
          <p className="text-lg text-gray-600">Productivity isn't about doing more—it's about making consistent progress on the right things.</p>
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">The Sustainable Productivity Framework</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-indigo-800 mb-3">🎯 Clear Goals</h4>
                  <p className="text-indigo-700 text-sm">Know what you're working toward so daily actions have purpose and meaning.</p>
                  <p className="text-indigo-600 text-sm mt-2">Example: "Complete certification" guides daily study priorities.</p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-3">📅 Daily Planning</h4>
                  <p className="text-indigo-700 text-sm">Structure each day with 1-3 priorities and protected focus time.</p>
                  <p className="text-indigo-600 text-sm mt-2">Example: "9-11am deep work on key project" prevents reactive work.</p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-3">✅ Consistent Habits</h4>
                  <p className="text-indigo-700 text-sm">Build routines that support your goals without requiring constant willpower.</p>
                  <p className="text-indigo-600 text-sm mt-2">Example: "Morning review" ensures daily alignment with goals.</p>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-800 mb-3">📝 Weekly Reflection</h4>
                  <p className="text-indigo-700 text-sm">Review progress, identify patterns, and adjust your approach for better results.</p>
                  <p className="text-indigo-600 text-sm mt-2">Example: "Friday review" reveals what's working and what needs adjustment.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💼 Work Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Focus on high-impact projects, protect deep work time, and limit meeting overload.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🏃‍♂️ Personal Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Allocate time for learning, skill development, and health alongside work priorities.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🏠 Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Schedule personal activities with the same seriousness as work commitments.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Focus and Follow-Through */}
        <section className="space-y-6" id="focus-follow-through">
          <h2 className="text-3xl font-bold text-gray-900">How to Stay Productive Without Burnout</h2>
          <p className="text-lg text-gray-600">Sustainable productivity comes from smart systems, not heroic effort and constant intensity.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🔥 The Burnout Prevention System</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Priority Limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Limit daily priorities to 1-3 items. Quality focus beats quantity every time.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Energy Matching</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Schedule demanding work during peak energy periods and easier tasks when energy is low.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">Recovery Protection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">Schedule rest and recovery with the same commitment as work activities.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">⚡ The Focus + Follow-Through Method</h3>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <p className="text-green-800 mb-3">Most productivity fails at execution:</p>
                  <ol className="space-y-2 text-green-700 ml-4">
                    <li>• Plan 1-3 priorities for the day</li>
                    <li>• Protect specific time blocks for each priority</li>
                    <li>• Eliminate distractions during focus time</li>
                    <li>• Track completion without shame for misses</li>
                    <li>• Review weekly and adjust based on reality</li>
                  </ol>
                  <p className="text-green-800 mt-3">The key is making starting easier than avoiding.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Focus on weekly consistency rather than daily perfection.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Adjust your system based on what actually works in your life.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Context Switching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Group similar tasks together to reduce mental switching costs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="space-y-6" id="mid-cta">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for a Productivity System That Actually Works?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for an all-in-one system that connects goals, daily planning, habits, and reflection without the overwhelm.
            </p>
            <Button asChild size="lg" className="rounded-full bg-green-600 hover:bg-green-700">
              <Link to="/auth">Start Your Productivity System Free</Link>
            </Button>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Complete Productivity System</h2>
          <p className="text-lg text-gray-600">The most effective productivity systems integrate all areas of your life and work.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set meaningful goals that give your daily productivity purpose and direction</p>
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
                <p className="text-gray-600 mb-4">Structure your day with realistic priorities and protected focus time</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Habit Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build consistent routines that support your productivity without willpower</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📝 Daily Reflection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Review progress and improve your productivity system through regular reflection</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal App →</Link>
                </Button>
              </CardContent>
            </Card>
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
