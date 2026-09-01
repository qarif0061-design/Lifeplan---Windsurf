import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const ScheduleApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What is a schedule app?",
      answer: "A schedule app helps you organize your time by creating, managing, and tracking daily, weekly, or monthly schedules. Unlike a basic calendar, a good schedule app lets you plan tasks, set priorities, build routines, and track what you actually accomplish. The best schedule apps combine calendar views with task management, habit tracking, and goal planning in one place."
    },
    {
      question: "How is a schedule app different from a calendar app?",
      answer: "Calendar apps primarily show events and appointments at specific times. Schedule apps go further by helping you plan tasks, set priorities, build recurring routines, and track completion. A schedule app answers 'what should I do and when?' while a calendar answers 'what events are happening?' The best approach uses a schedule app that includes calendar views for complete time management."
    },
    {
      question: "What features should I look for in a schedule app?",
      answer: "Look for: daily/weekly/monthly views, task prioritization, recurring schedules, drag-and-drop rescheduling, habit tracking integration, goal connection, reminders, and progress tracking. The best schedule apps also offer cross-platform sync so your schedule is available on web and mobile. Avoid apps with complex setup that waste time before you can start planning."
    },
    {
      question: "Can I use a schedule app for daily planning?",
      answer: "Yes, daily planning is the core use case for schedule apps. A good schedule app helps you plan each day by blocking time for priorities, scheduling tasks, and reviewing what you accomplished. The most effective daily planning approach combines time-blocking for deep work with flexible slots for routine tasks and buffer time for unexpected changes."
    },
    {
      question: "How do I build an effective daily schedule?",
      answer: "Start by identifying your 3 most important tasks for the day. Schedule them during your peak energy hours. Then add routine tasks around them, leaving buffer time for interruptions. Review your schedule at the end of each day and adjust for tomorrow. The key is creating a schedule that's realistic, not optimistic—most people overestimate what they can do in a day."
    },
    {
      question: "Do I need a schedule app if I already use a calendar?",
      answer: "If you only need to track appointments and events, a calendar is sufficient. But if you want to plan tasks, build habits, track goals, and see how your time is actually spent, a dedicated schedule app offers features that calendars don't. Many people use both: a calendar for fixed events and a schedule app for task planning and time blocking."
    }
  ];

  const features = [
    {
      title: "Daily Schedule Planning",
      description: "Plan each day with time blocks, priorities, and task lists that adapt as your day changes.",
      icon: "📅"
    },
    {
      title: "Weekly Overview",
      description: "See your entire week at a glance and adjust your schedule proactively.",
      icon: "📋"
    },
    {
      title: "Priority Management",
      description: "Focus on what matters most by prioritizing tasks within your daily schedule.",
      icon: "🎯"
    },
    {
      title: "Habit Integration",
      description: "Build consistent routines by scheduling habits alongside your tasks and appointments.",
      icon: "🔄"
    },
    {
      title: "Goal Connection",
      description: "Link your daily schedule to larger goals so every day moves you forward.",
      icon: "⛓️"
    },
    {
      title: "Cross-Platform Sync",
      description: "Access and update your schedule on web and mobile, wherever you are.",
      icon: "☁️"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Schedule App 2026 | Plan Your Day, Week & Goals | GoalPlanner"
        description="The best schedule app for daily planning, weekly scheduling, and goal tracking. Plan your time, build routines, and accomplish more. Free to start."
        canonicalPath="/schedule-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Schedule App",
          url: "https://goalplanner.io/schedule-app",
          description: "Looking for a schedule app to organize your time? Learn how to plan your day, build routines, and track goals.",
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
        <header className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Plan Your Time Better</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground leading-tight">
              Schedule App: Plan Your Day Without Overcomplicating It
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              The best schedule app doesn't just show you a calendar—it helps you plan priorities, build routines, and track what actually gets done. Simple enough for daily use, powerful enough for your goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Planning Free
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">What Makes a Great Schedule App?</h2>
          <p className="text-lg text-muted-foreground">Not all schedule apps are created equal. The best ones help you plan realistically and adapt when life changes.</p>
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

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">How to Build a Schedule That Actually Works</h2>
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-primary">Start with priorities, not tasks</h4>
                    <p className="text-primary/80">Before adding anything to your schedule, identify the 1-3 things that matter most today. Everything else is secondary.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-primary">Time-block your priorities</h4>
                    <p className="text-primary/80">Assign specific time slots to your priorities. A task without a time slot is just a wish. Block time during your peak energy hours.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-primary">Add buffer time</h4>
                    <p className="text-primary/80">Realistic schedules leave 20-30% of time unscheduled for interruptions, delays, and rest. Overpacked schedules fail consistently.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-primary">Review and adjust daily</h4>
                    <p className="text-primary/80">Spend 5 minutes at the end of each day reviewing what worked and adjusting tomorrow's plan. This turns scheduling from a static plan into a dynamic system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">Schedule App vs Daily Planner vs Calendar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <span className="text-2xl">📅</span> Schedule App
                </CardTitle>
              </CardHeader>
              <CardContent className="text-primary/80 space-y-2">
                <p><strong>Best for:</strong> Planning tasks, blocking time, building routines</p>
                <p><strong>Key features:</strong> Time blocking, priorities, recurring schedules, habit tracking, goal connection</p>
                <p><strong>Use when:</strong> You need to plan what to do and when, and track what actually gets done</p>
              </CardContent>
            </Card>
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-momentum flex items-center gap-2">
                  <span className="text-2xl">📋</span> Daily Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="text-momentum/80 space-y-2">
                <p><strong>Best for:</strong> Detailed daily task management and tracking</p>
                <p><strong>Key features:</strong> Task lists, priorities, notes, daily reflection</p>
                <p><strong>Use when:</strong> You want a focused daily plan without the complexity of full scheduling</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <span className="text-2xl">📆</span> Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="text-purple-800 space-y-2">
                <p><strong>Best for:</strong> Fixed events, appointments, meetings</p>
                <p><strong>Key features:</strong> Event creation, shared calendars, reminders, time-based views</p>
                <p><strong>Use when:</strong> You primarily need to track events and avoid scheduling conflicts</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Take Control of Your Schedule?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for scheduling that connects your daily plan to your bigger goals. Start free on web and mobile.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Planning Free
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">More Tools for Better Planning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Plan each day with tasks, priorities, and reflection</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 Routine Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build morning, evening, and weekly routines</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-routine-planner">Routine Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Structure your day with focused time blocks</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/time-blocking">Time Blocking →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set goals that your daily schedule serves</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Schedule Smarter, Not Harder</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              The right schedule app adapts to your life, not the other way around. Try Goal Planner – LifePlans free today.
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

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default ScheduleApp;
