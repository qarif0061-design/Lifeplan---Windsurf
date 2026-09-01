import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyPlannerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between a daily planner and to-do list app?",
      answer: "A to-do list app is essentially a digital container for tasks—it helps you remember what needs to be done. A daily planner app goes further by helping you prioritize those tasks, allocate time blocks, build structure around your day, and create a realistic execution plan. While to-do lists answer 'what do I need to do?', daily planners answer 'when and how will I do it?' The best daily planner apps combine both: task capture plus intentional scheduling and prioritization."
    },
    {
      question: "How many tasks should I plan per day?",
      answer: "Research suggests 1-3 major priorities plus 3-5 smaller supporting tasks is optimal for most people. More than that creates decision fatigue and reduces completion rates. The key isn't the number of tasks, but the total time and mental energy required. A good daily planner app helps you estimate time commitments and warns when you're over-planning. Remember: completing 3 important tasks feels better than starting 8 and finishing none."
    },
    {
      question: "How do I plan my day when my schedule keeps changing?",
      answer: "Build flexibility into your daily plan. Instead of minute-by-minute scheduling, use time blocks with buffer periods. For example: morning focus block (2-3 hours), afternoon buffer block (1 hour for unexpected tasks), and evening wrap-up. Include a midday check-in to reassess priorities based on what's actually happened. This adaptive approach means your plan serves you, rather than you serving the plan."
    },
    {
      question: "What's the best way to prioritize daily tasks?",
      answer: "Use a simple prioritization framework instead of complex systems. The Eisenhower method works well: urgent+important = do now, important+not urgent = schedule, urgent+not important = delegate, neither = eliminate. Alternatively, use the '1 big, 2 medium, 3 small' approach. A good daily planner app should have built-in prioritization tools that help you categorize tasks visually without adding administrative overhead."
    },
    {
      question: "Do reminders actually help with daily planning?",
      answer: "Reminders are helpful when they support routines rather than interrupt flow. Effective reminders include: morning planning prompt, midday priority check, end-of-day review trigger, and pre-meeting preparation nudges. What's not helpful are constant task notifications that create anxiety. The best daily planner apps let you customize reminder types and timing to match your natural rhythm."
    },
    {
      question: "How do I handle days when nothing goes as planned?",
      answer: "Imperfect days are normal, not failures. Have a 'minimum viable day' approach: what's the one thing that would make today feel productive even if everything else goes wrong? Daily planner apps that support priority reshuffling help you adapt when plans change. Also, practice the 'rule of 3': if you complete your top 3 priorities (even if different from original), count the day as a win. This prevents all-or-nothing thinking."
    },
    {
      question: "What's the difference between daily planner and calendar app?",
      answer: "Calendar apps are primarily for scheduling appointments and meetings with others—they're time-specific and often rigid. Daily planner apps are more flexible, focusing on personal productivity, task management, and priority setting. While calendars answer 'where do I need to be when?', daily planners answer 'what should I focus on and how should I structure my day?' Many use both: calendar for external commitments, daily planner for personal priorities."
    },
    {
      question: "Can daily planning help with work-life balance?",
      answer: "Yes, when used intentionally. Daily planner apps help by making you consciously allocate time to different life domains rather than letting work expand to fill all available time. They also help you set boundaries by scheduling personal activities with the same seriousness as work commitments. Look for apps that support life area categorization and time tracking so you can see if you're actually spending time on what matters to you."
    },
    {
      question: "How do I start a daily planning routine?",
      answer: "Start simple with a 3-part routine: Morning (5 minutes): review yesterday's completion, choose 1-3 priorities, schedule focus blocks. Midday (2 minutes): check progress, adjust afternoon plan if needed. Evening (3 minutes): review what got done, capture loose ends for tomorrow, prep tomorrow's priorities. This takes just 10 minutes total but provides structure without overwhelm. Many daily planner apps have templates to guide beginners."
    },
    {
      question: "What features are essential in a daily planner app?",
      answer: "For effective daily planning, look for: quick task capture, priority setting (1-3 most important), time blocking, daily review, cross-device sync, and minimal notifications. Avoid apps with overly complex features, excessive analytics, or gamification that doesn't serve your actual productivity. The best daily planner app disappears into the background while helping you stay focused on what matters."
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
        title="Best Daily Planner App 2026 | Plan Your Day with Focus & Calm | GoalPlanner"
        description="The best daily planner app for organizing your day without overwhelm. Daily task planning, time blocking, and priority setting. Plan realistic days."
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
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Daily Planner App: Plan Your Day With Less Stress (and Actually Finish What Matters)
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A lot of people don't need "more productivity." They need a day that feels <strong>intentional</strong> instead of reactive.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Planning Your Day
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-secondary/40 rounded-2xl p-8 border border-border">
            <p className="text-lg font-medium text-foreground mb-2">What a daily planner app should help you do</p>
            <ul className="space-y-2 text-foreground/80">
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
            <h2 className="text-3xl font-bold text-foreground mb-4">See Daily Planning in Action</h2>
            <div className="bg-secondary rounded-2xl p-12 border-2 border-dashed border-border">
              <p className="text-muted-foreground text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Daily planning screen with priorities and time blocks</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-foreground">What Is a Daily Planner App?</h2>
          <div className="prose prose-lg max-w-none text-foreground/80">
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
          <h2 className="text-3xl font-bold text-foreground">Why Daily Planning Works (Even If You're Busy)</h2>
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
          <h2 className="text-3xl font-bold text-foreground">Key Features to Look For in the Best Daily Planner App</h2>
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

        {/* Best Daily Planner App Section */}
        <section className="space-y-6" id="best-daily-planner-app">
          <h2 className="text-3xl font-bold text-foreground">Best Daily Planner App: What to Look For</h2>
          <p className="text-lg text-muted-foreground">When searching for the best daily planner app, focus on features that actually help you execute, not just organize.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-foreground">🎯 Essential Features That Drive Results</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Quick Task Capture</p>
                    <p className="text-muted-foreground text-sm">Get tasks out of your head in seconds, not minutes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Priority Setting Tools</p>
                    <p className="text-muted-foreground text-sm">Visual ways to mark 1-3 most important tasks</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Time Blocking</p>
                    <p className="text-muted-foreground text-sm">Protect focus time with scheduled blocks</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Daily Review</p>
                    <p className="text-muted-foreground text-sm">Quick evening wrap-up to close loops</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-foreground">⚠️ Features That Often Distract</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Over-Complicated Analytics</p>
                    <p className="text-muted-foreground text-sm">Charts and metrics that don't drive action</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Excessive Notifications</p>
                    <p className="text-muted-foreground text-sm">Constant alerts that fragment attention</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Project Management</p>
                    <p className="text-muted-foreground text-sm">Features better suited for team tools</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Gamification Elements</p>
                    <p className="text-muted-foreground text-sm">Points and badges that replace real progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Daily Planning Works Section */}
        <section className="space-y-6" id="why-daily-planning-works">
          <h2 className="text-3xl font-bold text-foreground">Why Daily Planning Works Better Than Random To-Do Lists</h2>
          <p className="text-lg text-muted-foreground">The difference between a planned day and a reactive day isn't just productivity—it's mental clarity and reduced stress.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-foreground">📋 Random To-Do Lists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• Create urgency without priority</p>
                  <p>• No time allocation or structure</p>
                  <p>• Easy to add, hard to complete</p>
                  <p>• Create decision fatigue</p>
                  <p>• Often end with guilt about unfinished items</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground">📅 Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• Creates intention and focus</p>
                  <p>• Allocates time realistically</p>
                  <p>• Protects important work from interruptions</p>
                  <p>• Reduces mental overhead</p>
                  <p>• Ends with completion and satisfaction</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <p className="text-foreground/80 text-center">
              <strong>The key insight:</strong> To-do lists tell you what to do. Daily planning tells you when and how to do it, which makes execution dramatically more likely.
            </p>
          </div>
        </section>

        {/* How to Plan Without Overplanning */}
        <section className="space-y-6" id="plan-without-overplanning">
          <h2 className="text-3xl font-bold text-foreground">How to Plan Your Day Without Overplanning</h2>
          <p className="text-lg text-muted-foreground">Overplanning creates rigidity that breaks when life happens. Here's how to plan effectively without creating a fragile schedule.</p>
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <h3 className="text-xl font-semibold text-orange-900 mb-4">The Flexible Planning Framework</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-orange-800 mb-3">✅ Do Plan</h4>
                  <ul className="space-y-2 text-orange-700">
                    <li>• 1-3 top priorities (what matters most)</li>
                    <li>• Time blocks for focused work</li>
                    <li>• Buffer time for unexpected tasks</li>
                    <li>• Daily review and reset points</li>
                    <li>• Flexible task categories (work, personal, health)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-800 mb-3">❌ Don't Plan</h4>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Every minute of your day</li>
                    <li>• More than 5-7 total tasks</li>
                    <li>• Exact completion times</li>
                    <li>• Back-to-back meetings without breaks</li>
                    <li>• Perfect productivity (it doesn't exist)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Schedule 2-3 focus blocks per day, leaving gaps between them for flexibility and overflow.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Priority Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Never have more than 3 priorities. Everything else is optional or can wait.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Daily Reset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">End each day by reviewing what worked and adjusting tomorrow's plan based on reality.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Daily Planner for Different Life Areas */}
        <section className="space-y-6" id="daily-planner-life-areas">
          <h2 className="text-3xl font-bold text-foreground">Daily Planner App for Work, Study, and Personal Life</h2>
          <p className="text-lg text-muted-foreground">Different life areas need different planning approaches. Here's how daily planning adapts to various contexts.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💼</span> Work Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Focus:</strong> Deep work blocks, meeting preparation, follow-ups</p>
                  <p><strong>Structure:</strong> Morning deep work, afternoon meetings, evening wrap-up</p>
                  <p><strong>Tools:</strong> Priority tags, time blocking, project integration</p>
                  <p><strong>Key:</strong> Protect focus time from constant interruptions</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span> Study Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Focus:</strong> Study sessions, assignments, review periods</p>
                  <p><strong>Structure:</strong> Pomodoro blocks, subject rotation, regular breaks</p>
                  <p><strong>Tools:</strong> Subject categories, progress tracking, reminder scheduling</p>
                  <p><strong>Key:</strong> Balance intensity with sustainable pacing</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Personal Life
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Focus:</strong> Health, relationships, hobbies, personal growth</p>
                  <p><strong>Structure:</strong> Morning routines, evening wind-down, weekend planning</p>
                  <p><strong>Tools:</strong> Habit integration, life area categories, gentle reminders</p>
                  <p><strong>Key:</strong> Protect personal time from work creep</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Prioritization Section */}
        <section className="space-y-6" id="prioritization">
          <h2 className="text-3xl font-bold text-foreground">How to Prioritize Tasks Without Feeling Overwhelmed</h2>
          <p className="text-lg text-muted-foreground">Good prioritization isn't about doing more—it's about doing what matters most, consistently.</p>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">Simple Prioritization Methods That Work</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-purple-800 mb-3">🎯 The "Rule of 3" Method</h4>
                  <p className="text-purple-700 mb-2">Choose exactly 3 priorities per day:</p>
                  <ul className="space-y-1 text-purple-600 ml-4">
                    <li>• 1 big priority (most important)</li>
                    <li>• 2 medium priorities (should get done)</li>
                    <li>• Everything else is optional</li>
                  </ul>
                  <p className="text-purple-700 mt-3">This creates focus without rigidity.</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-800 mb-3">📊 Eisenhower Matrix</h4>
                  <p className="text-purple-700 mb-2">Categorize tasks by urgency/importance:</p>
                  <ul className="space-y-1 text-purple-600 ml-4">
                    <li>• Urgent + Important = Do now</li>
                    <li>• Important + Not Urgent = Schedule</li>
                    <li>• Urgent + Not Important = Delegate</li>
                    <li>• Neither = Eliminate</li>
                  </ul>
                  <p className="text-purple-700 mt-3">Prevents constant firefighting mode.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚡ Energy-Based Prioritization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Match tasks to your energy levels: high-energy work during peak hours, low-energy tasks when tired.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🕐 Time-Based Prioritization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Estimate time requirements and prioritize tasks that fit available time blocks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Daily Planner vs To-Do List */}
        <section className="space-y-6" id="daily-planner-vs-todo">
          <h2 className="text-3xl font-bold text-foreground">Daily Planner App vs To-Do List App</h2>
          <p className="text-lg text-muted-foreground">Understanding the difference helps you choose the right tool for the right job.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <span className="text-2xl">📅</span> Daily Planner App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>Best for:</strong> Structuring your day, protecting focus time, building routines</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Time blocking and scheduling</li>
                    <li>• Priority setting and ranking</li>
                    <li>• Daily review and planning routines</li>
                    <li>• Integration with goals and habits</li>
                    <li>• Flexible planning for changing schedules</li>
                  </ul>
                  <p><strong>When to use:</strong> When you need to organize your entire day, not just track tasks</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">📝</span> To-Do List App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-orange-800">
                  <p><strong>Best for:</strong> Capturing tasks, simple task tracking, shopping lists</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Quick task capture and organization</li>
                    <li>• Due dates and reminders</li>
                    <li>• Simple check-off completion</li>
                    <li>• List categorization</li>
                    <li>• Sharing and collaboration</li>
                  </ul>
                  <p><strong>When to use:</strong> When you just need to remember what needs to get done</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <p className="text-foreground/80 text-center">
              <strong>Pro tip:</strong> Many successful people use both—capture tasks in a to-do list, then plan them in a daily planner.
            </p>
          </div>
        </section>

        {/* Mental Clutter Section */}
        <section className="space-y-6" id="mental-clutter">
          <h2 className="text-3xl font-bold text-foreground">How Daily Planning Reduces Mental Clutter</h2>
          <p className="text-lg text-muted-foreground">The mental freedom from daily planning comes from trusting your system instead of carrying everything in your head.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">🧠 The Mental Load Problem</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Before Daily Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Constant mental scanning for forgotten tasks</li>
                        <li>• Decision fatigue from constant prioritizing</li>
                        <li>• Anxiety about dropping important commitments</li>
                        <li>• Difficulty focusing due to mental clutter</li>
                        <li>• Stress from feeling overwhelmed</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">✨ The Mental Freedom Solution</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">After Daily Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Trust that important tasks won't be forgotten</li>
                        <li>• Clear priorities reduce decision-making</li>
                        <li>• Structure creates calm predictability</li>
                        <li>• Focus improves with reduced mental noise</li>
                        <li>• Satisfaction from completing planned work</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <div className="bg-momentum/10 rounded-xl p-6 border border-momentum/20">
              <p className="text-foreground/80">
                <strong>The science:</strong> When you externalize tasks and create a trusted system, your brain stops the "background processing" that consumes mental energy. This is why people often feel less stressed after implementing daily planning—even when their workload hasn't changed.
              </p>
            </div>
          </div>
        </section>

        {/* Why GoalPlanner Section */}
        <section className="space-y-6" id="why-goalplanner-daily">
          <h2 className="text-3xl font-bold text-foreground">Why GoalPlanner Works for Busy Days</h2>
          <p className="text-lg text-muted-foreground">GoalPlanner is designed for real days—the ones with unexpected meetings, sick kids, and last-minute changes.</p>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">🔄 Built for Flexibility</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Time blocks that can be reshuffled when plans change</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Priority-based planning (focus on what matters most)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Buffer blocks built into every day's schedule</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">⚡ Designed for Speed</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Daily planning takes 5-10 minutes, not hours</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Quick task capture from anywhere (phone, desktop)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-foreground/80">Templates for common daily routines</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-momentum/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">The GoalPlanner Difference for Daily Planning</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">🎯 Priority-First Design</h4>
                  <p className="text-foreground/80 text-sm">Focus on what matters most, not completing the longest list</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">🔄 Adaptive Planning</h4>
                  <p className="text-foreground/80 text-sm">Easily reshuffle when life happens without starting over</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">🔗 Connected System</h4>
                  <p className="text-foreground/80 text-sm">Daily tasks connect to goals and habits for bigger context</p>
                </div>
              </div>
              <p className="text-foreground mt-6 text-center font-medium">
                GoalPlanner works because it's built for imperfect days, not perfect productivity fantasies.
              </p>
            </div>
          </div>
        </section>

        {/* Calm Day Method */}
        <section className="space-y-6" id="calm-day-method">
          <h2 className="text-3xl font-bold text-foreground">The "Calm Day" Method: How to Plan Your Day in 10 Minutes</h2>
          <div className="bg-momentum/10 rounded-2xl p-8 border border-momentum/20">
            <p className="text-foreground/80 mb-6">Use this method daily or on weekdays. It's designed for real life.</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground">Capture tasks fast (2 minutes)</h4>
                  <p className="text-foreground/80">Dump everything you're carrying: work tasks, personal errands, calls/messages, "don't forget" items.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground">Choose 1–3 priorities (2 minutes)</h4>
                  <p className="text-foreground/80">Ask: "If I finish only three things today, what would make today a win?"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground">Define next actions (2 minutes)</h4>
                  <p className="text-foreground/80">Turn "big tasks" into startable steps: "Finish proposal" → "Draft outline + 5 bullets"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-foreground">Add one focus block (2 minutes)</h4>
                  <p className="text-foreground/80">Pick a block: 25 minutes (quick win) or 50 minutes (deep work). Put it somewhere you can protect.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">5</div>
                <div>
                  <h4 className="font-semibold text-foreground">Add buffers + a reset point (2 minutes)</h4>
                  <p className="text-foreground/80">Reality needs space. Add a buffer block (for the unexpected) and a mid-day check-in (to adjust the plan).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prioritization Rules */}
        <section className="space-y-6" id="prioritization">
          <h2 className="text-3xl font-bold text-foreground">Prioritization That Doesn't Feel Like a Productivity Lecture</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground">🎯 The "one hard thing early" rule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">If your schedule allows, do one meaningful task early. It reduces background stress all day.</p>
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

        {/* Mid-Page CTA */}
        <section className="space-y-6" id="mid-cta">
          <div className="bg-gradient-to-r from-momentum/5 to-primary/5 rounded-2xl p-8 border border-momentum/10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Plan Your Day With Less Stress?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for quick daily planning that adapts to your real life. Start with just 5 minutes in the morning.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Try Daily Planning Free
            </Button>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-foreground">Build Your Complete Daily System</h2>
          <p className="text-lg text-muted-foreground">Daily planning works best when connected to your bigger picture and supporting routines.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set clear goals that give your daily planning direction and purpose</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Habit Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build routines that make daily planning automatic and effortless</p>
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
                <p className="text-muted-foreground mb-4">Review your day and improve tomorrow's planning with journaling</p>
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
                <p className="text-muted-foreground mb-4">Combine planning, goals, habits, and reflection in one place</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productivity-app">Productivity App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-momentum/5 to-primary/5 rounded-2xl p-8 border border-momentum/10 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Want Your Day to Feel More Intentional?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans to plan your day, pick priorities, protect focus time, and build simple routines—available on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Start Planning Free
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

export default DailyPlannerApp;
