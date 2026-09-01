import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const ProductivityApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between a productivity app and a task manager?",
      answer: "Task managers organize what needs to be done. Productivity apps help you decide what should be done and when. A task manager is a digital to-do list, while a productivity app is a complete system for making consistent progress on what matters most. Productivity apps include goal connection, time blocking, habit tracking, and reflection features that task managers lack. Think of it this way: task managers help you remember tasks, productivity apps help you achieve outcomes."
    },
    {
      question: "Do I really need an all-in-one productivity system?",
      answer: "You need one if you're tired of switching between apps and losing track of connections between different areas of your life. An all-in-one system reduces context switching, shows how goals connect to daily tasks, tracks how habits support your objectives, and provides unified progress insights. However, if you already have systems that work well together, adding another app might create more complexity. The key is whether your current approach creates flow or friction in your daily work."
    },
    {
      question: "How do productivity apps reduce mental overload?",
      answer: "Productivity apps reduce mental load by externalizing commitments so your brain stops constantly scanning for unfinished tasks. They create predictable structures that reduce decision fatigue, provide trusted systems for follow-through, build automatic routines that don't require willpower, and offer closure mechanisms that create satisfaction. When you trust your productivity system, your working memory is free for creative thinking and problem-solving rather than remembering what you're supposed to do next."
    },
    {
      question: "What features are essential in a complete productivity app?",
      answer: "Essential features include: goal setting and milestone tracking, daily planning with priority limits, time blocking for focus work, habit tracking for consistency, reflection tools for pattern recognition, weekly review capabilities, and minimal notifications that protect rather than fragment attention. Avoid apps with excessive analytics, complex project management, or gamification that doesn't serve actual productivity. The best productivity apps disappear into the background while helping you stay focused on what matters."
    },
    {
      question: "Can a productivity app help with work-life balance?",
      answer: "Yes, when designed for life integration rather than just work optimization. Look for apps that support life area categorization (work, health, family, learning), help you schedule personal activities with the same seriousness as work, provide energy tracking to avoid scheduling demanding tasks during low-energy periods, and include recovery time in your daily plans. The best productivity apps help you allocate time to all life domains, not just work tasks."
    },
    {
      question: "How do I avoid burnout with productivity tools?",
      answer: "Focus on sustainable progress rather than perfect productivity. Use apps that support: priority limits (1-3 major priorities per day), realistic time blocking with buffer periods, energy-aware scheduling, weekly reviews to adjust based on reality, and recovery time protection. The best productivity apps recognize that some weeks are for maintenance, others for growth. Avoid apps that create pressure through constant notifications, streak tracking, or social comparison. Productivity is about consistent progress, not heroic effort."
    },
    {
      question: "What's the best way to organize tasks across life areas?",
      answer: "Organize by priority and context rather than just category. Use: daily priorities (1-3 most important items), time blocks (when you'll work on each priority), energy matching (high-focus tasks during peak energy), context grouping (similar tasks together), and weekly themes (focus areas for each week). The key is seeing how different life areas connect rather than treating them as separate buckets. Good organization helps you focus on what matters most without creating anxiety about everything else."
    },
    {
      question: "How do productivity systems help with focus and deep work?",
      answer: "Productivity systems protect focus by: supporting time blocking (protecting specific blocks for deep work), limiting daily priorities (preventing overwhelm), providing gentle check-ins (not constant notifications), helping you say no to non-essential tasks, and tracking energy patterns (so you can schedule deep work during peak focus times). The most effective focus features protect your attention rather than fragment it with excessive alerts and analytics. Think of your productivity app as a focus bodyguard."
    },
    {
      question: "Should I use separate apps or one productivity system?",
      answer: "Start with one system if you're new to productivity organization. Separate apps work well when you have very specific needs (like complex project management) or when you've already built systems that work together. The cost of multiple apps is context switching and missed connections between life areas. The cost of one system is potentially fewer specialized features. Most people benefit from starting with an integrated approach and only adding specialized tools if specific needs emerge."
    },
    {
      question: "What makes GoalPlanner different from other productivity apps?",
      answer: "GoalPlanner is designed specifically for sustainable personal productivity, not corporate project management. It features: realistic priority limits (not endless task lists), flexible time blocking that adapts to real life, habit tracking that supports rather than competes with goals, simple reflection tools for pattern recognition, weekly reviews that adjust based on reality, and minimal notifications that protect focus. It recognizes that productivity is about consistent progress, not perfect execution, and provides the structure needed for meaningful daily progress without creating pressure."
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
        title="Best Productivity App 2026 | All-in-One System for Work & Life | GoalPlanner"
        description="The complete productivity app that organizes goals, tasks, habits, and reflection. Reduce mental overload and stay productive without burnout. Try free."
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
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Productivity App: A Calm System for Focus, Organization, and Follow-Through
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              If you've tried a dozen productivity apps and still feel behind, you're not broken. Most tools fail for a simple reason: they help you <strong>collect tasks</strong>, but they don't help you <strong>run a system</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Organizing Your Life
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-secondary/40 rounded-2xl p-8 border border-border">
            <p className="text-lg font-medium text-foreground mb-2">Real productivity isn't:</p>
            <div className="grid md:grid-cols-2 gap-6 text-foreground/80">
              <div>
                <p className="font-medium text-red-600 mb-2">❌ What it's not:</p>
                <ul className="space-y-1">
                  <li>• doing more</li>
                  <li>• cramming your schedule</li>
                  <li>• optimizing every minute</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-momentum mb-2">✅ What it is:</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">See the All-in-One System in Action</h2>
            <div className="bg-secondary rounded-2xl p-12 border-2 border-dashed border-border">
              <p className="text-muted-foreground text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Dashboard showing goals, tasks, habits, and reflections</p>
            </div>
          </div>
        </section>

        {/* Best Productivity App Section */}
        <section className="space-y-6" id="best-productivity-app">
          <h2 className="text-3xl font-bold text-foreground">Best Productivity App: What Actually Works</h2>
          <p className="text-lg text-muted-foreground">The best productivity apps don't just organize tasks—they help you make consistent progress on what matters most.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">🎯 What Makes Productivity Apps Effective</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Priority Protection</p>
                    <p className="text-muted-foreground text-sm">Helps you focus on what moves you forward</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Consistency Support</p>
                    <p className="text-muted-foreground text-sm">Builds routines that don't depend on willpower</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Mental Load Reduction</p>
                    <p className="text-muted-foreground text-sm">Externalizes commitments so your brain can focus</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Pattern Recognition</p>
                    <p className="text-muted-foreground text-sm">Shows what works so you can repeat success</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">⚠️ Why Most Productivity Apps Fail</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Task Overload</p>
                    <p className="text-muted-foreground text-sm">Endless lists that create overwhelm</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">No Priority Limits</p>
                    <p className="text-muted-foreground text-sm">Everything feels equally important</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Constant Notifications</p>
                    <p className="text-muted-foreground text-sm">Fragments attention instead of protecting it</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Systems</p>
                    <p className="text-muted-foreground text-sm">More overhead than the problems they solve</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All-in-One vs Separate Apps */}
        <section className="space-y-6" id="all-in-one-vs-separate">
          <h2 className="text-3xl font-bold text-foreground">All-in-One Productivity App vs Using Multiple Apps</h2>
          <p className="text-lg text-muted-foreground">The right approach depends on your personality, goals, and how you work best.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <span className="text-2xl">🔄</span> All-in-One System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-foreground/80">
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
            <Card className="border-ember/20 bg-ember/10">
              <CardHeader>
                <CardTitle className="text-ember flex items-center gap-2">
                  <span className="text-2xl">🧩</span> Multiple Specialized Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-foreground/80">
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
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <p className="text-foreground/80 text-center">
              <strong>The reality:</strong> Most people start with multiple apps and eventually consolidate when they realize the cost of context switching.
            </p>
          </div>
        </section>

        {/* Productivity Systems Section */}
        <section className="space-y-6" id="productivity-systems">
          <h2 className="text-3xl font-bold text-foreground">How Productivity Systems Reduce Mental Overload</h2>
          <p className="text-lg text-muted-foreground">Good productivity systems don't add more work—they free up mental bandwidth for what matters.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">🧠 Mental Load Reduction</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Externalizes Commitments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">When you trust your system, your brain stops constantly scanning for unfinished tasks and deadlines.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Creates Predictability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Routines and structures reduce decision fatigue by making choices automatic.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Provides Closure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Completing planned items creates satisfaction and reduces the feeling of being perpetually behind.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">⚡ Focus Protection</h3>
                <div className="bg-ember/10 rounded-xl p-6 border border-ember/20">
                  <p className="text-foreground/80 mb-3">The attention economy works against productivity:</p>
                  <ul className="space-y-2 text-foreground/80 ml-4">
                    <li>• Social media and notifications fragment attention</li>
                    <li>• Open loops and unfinished tasks create mental clutter</li>
                    <li>• Too many priorities create decision paralysis</li>
                    <li>• Context switching drains mental energy</li>
                  </ul>
                  <p className="text-foreground/80 mt-3">Good productivity systems protect your attention like a bodyguard.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Regular reviews prevent systems from becoming outdated and overwhelming.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Priority Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Limiting daily priorities prevents overwhelm and ensures focus on what matters.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Protecting time for important work prevents the day from being consumed by urgent but low-value tasks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-Life Productivity */}
        <section className="space-y-6" id="real-life-productivity">
          <h2 className="text-3xl font-bold text-foreground">Personal Productivity System for Real Life</h2>
          <p className="text-lg text-muted-foreground">Productivity isn't about doing more—it's about making consistent progress on the right things.</p>
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold text-foreground mb-4">The Sustainable Productivity Framework</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">🎯 Clear Goals</h4>
                  <p className="text-foreground/80 text-sm">Know what you're working toward so daily actions have purpose and meaning.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "Complete certification" guides daily study priorities.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">📅 Daily Planning</h4>
                  <p className="text-foreground/80 text-sm">Structure each day with 1-3 priorities and protected focus time.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "9-11am deep work on key project" prevents reactive work.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">✅ Consistent Habits</h4>
                  <p className="text-foreground/80 text-sm">Build routines that support your goals without requiring constant willpower.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "Morning review" ensures daily alignment with goals.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">📝 Weekly Reflection</h4>
                  <p className="text-foreground/80 text-sm">Review progress, identify patterns, and adjust your approach for better results.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "Friday review" reveals what's working and what needs adjustment.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💼 Work Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Focus on high-impact projects, protect deep work time, and limit meeting overload.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🏃‍♂️ Personal Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Allocate time for learning, skill development, and health alongside work priorities.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🏠 Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Schedule personal activities with the same seriousness as work commitments.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Focus and Follow-Through */}
        <section className="space-y-6" id="focus-follow-through">
          <h2 className="text-3xl font-bold text-foreground">How to Stay Productive Without Burnout</h2>
          <p className="text-lg text-muted-foreground">Sustainable productivity comes from smart systems, not heroic effort and constant intensity.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">🔥 The Burnout Prevention System</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Priority Limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Limit daily priorities to 1-3 items. Quality focus beats quantity every time.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Energy Matching</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Schedule demanding work during peak energy periods and easier tasks when energy is low.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Recovery Protection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Schedule rest and recovery with the same commitment as work activities.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">⚡ The Focus + Follow-Through Method</h3>
                <div className="bg-momentum/10 rounded-xl p-6 border border-momentum/20">
                  <p className="text-foreground/80 mb-3">Most productivity fails at execution:</p>
                  <ol className="space-y-2 text-foreground/80 ml-4">
                    <li>• Plan 1-3 priorities for the day</li>
                    <li>• Protect specific time blocks for each priority</li>
                    <li>• Eliminate distractions during focus time</li>
                    <li>• Track completion without shame for misses</li>
                    <li>• Review weekly and adjust based on reality</li>
                  </ol>
                  <p className="text-foreground/80 mt-3">The key is making starting easier than avoiding.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Focus on weekly consistency rather than daily perfection.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Adjust your system based on what actually works in your life.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Context Switching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Group similar tasks together to reduce mental switching costs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="space-y-6" id="mid-cta">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for a Productivity System That Actually Works?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for an all-in-one system that connects goals, daily planning, habits, and reflection without the overwhelm.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Your Productivity System Free
            </Button>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-foreground">Build Your Complete Productivity System</h2>
          <p className="text-lg text-muted-foreground">The most effective productivity systems integrate all areas of your life and work.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set meaningful goals that give your daily productivity purpose and direction</p>
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
                <p className="text-muted-foreground mb-4">Structure your day with realistic priorities and protected focus time</p>
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
                <p className="text-muted-foreground mb-4">Build consistent routines that support your productivity without willpower</p>
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
                <p className="text-muted-foreground mb-4">Review progress and improve your productivity system through regular reflection</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-foreground">What Is a Productivity App?</h2>
          <div className="prose prose-lg max-w-none text-foreground/80">
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
          <h2 className="text-3xl font-bold text-foreground">Productivity vs. Busyness (Why You Can Be Busy and Still Stuck)</h2>
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
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-momentum">🎯 Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• priorities protected</p>
                  <p>• focused execution</p>
                  <p>• consistent habits and review</p>
                  <p>• fewer open loops in your head</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground italic">The best productivity tools guide you toward progress, not just motion.</p>
        </section>

        {/* The 4-Part Loop */}
        <section className="space-y-6" id="productivity-loop">
          <h2 className="text-3xl font-bold text-foreground">The 4-Part Productivity Loop (Simple, Repeatable, Effective)</h2>
          <p className="text-lg text-muted-foreground">A practical productivity system has four parts:</p>
          <div className="grid md:grid-cols-4 gap-4">
            {productivityLoop.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{step.icon}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <p className="text-foreground/80 text-center">
              GoalPlanner is designed around this loop so productivity becomes a skill you build, not a mood you chase.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-foreground">What to Look For in the Best Productivity App</h2>
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
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why All-in-One Matters */}
        <section className="space-y-6" id="all-in-one">
          <h2 className="text-3xl font-bold text-foreground">Why "All-in-One" Matters (When It's Done Right)</h2>
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <p className="text-foreground/80 mb-4">An all in one planner app is valuable when it reduces mental overhead.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">🔴 When your system is scattered:</h3>
                <ul className="space-y-1 text-foreground/80">
                  <li>• you forget goals</li>
                  <li>• habits drift</li>
                  <li>• tasks multiply</li>
                  <li>• reflection disappears</li>
                  <li>• you feel overwhelmed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">🟢 When your system is unified:</h3>
                <ul className="space-y-1 text-foreground/80">
                  <li>• goals connect to tasks</li>
                  <li>• habits reinforce progress</li>
                  <li>• reflections improve planning</li>
                  <li>• you do less "system management"</li>
                </ul>
              </div>
            </div>
            <p className="text-foreground mt-4">
              GoalPlanner is built to keep the core pieces together without feeling heavy.
            </p>
          </div>
        </section>

        {/* Practical Use Cases */}
        <section className="space-y-6" id="use-cases">
          <h2 className="text-3xl font-bold text-foreground">Practical Use Cases (How People Actually Use a Productivity App)</h2>
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
          <h2 className="text-3xl font-bold text-foreground">A Simple Starting System (If You're Overwhelmed)</h2>
          <div className="bg-momentum/10 rounded-2xl p-8 border border-momentum/20">
            <p className="text-foreground/80 mb-4">If you want a system you can maintain, start here:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <p className="text-foreground"><strong>Capture:</strong> write down tasks and open loops</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <p className="text-foreground"><strong>Prioritize:</strong> choose 1–3 priorities</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <p className="text-foreground"><strong>Focus:</strong> schedule one focus block</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <p className="text-foreground"><strong>Baseline:</strong> keep one small habit daily</p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                <p className="text-foreground"><strong>Review:</strong> do a 5-minute weekly reset</p>
              </div>
            </div>
            <p className="text-foreground mt-4">That's enough to create progress without pressure.</p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-foreground">Explore Each Component</h2>
          <p className="text-lg text-muted-foreground">Dive deeper into each part of the productivity system:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set clear outcomes</p>
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
                <p className="text-muted-foreground mb-4">Structure your day</p>
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
                <p className="text-muted-foreground mb-4">Build consistency</p>
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
                <p className="text-muted-foreground mb-4">Reflect and learn</p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/daily-journal-app">Daily Journal →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Want a Calmer Productivity System in One Place?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans to plan your day, manage tasks, build habits, and reflect—so you stay organized and follow through on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Get Started Free
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6" id="faq">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
