import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const GoalsCalendarApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What is a goals calendar app?",
      answer: "A goals calendar app combines goal tracking with calendar planning so you can see your goals alongside your daily schedule. Unlike separate goal tracking and calendar tools, a goals calendar app shows how your daily time allocation serves your bigger objectives. This connection between daily actions and long-term goals is what makes goals calendar apps more effective than using separate tools."
    },
    {
      question: "How is a goals calendar different from a regular calendar?",
      answer: "A regular calendar shows events and appointments. A goals calendar shows how those events and tasks connect to your larger objectives. It helps you answer: 'does my calendar reflect my priorities?' and 'am I spending time on what matters?' Goals calendars add goal-linked tasks, progress indicators, and priority alignment to standard calendar functionality."
    },
    {
      question: "How do I use a goals calendar for monthly planning?",
      answer: "Start each month by setting 1-3 key goals. Then review your calendar and block time for goal-related activities before adding routine tasks. During the month, use your goals calendar to track progress and adjust. At month end, review what moved your goals forward and what didn't. This monthly rhythm turns a calendar from a scheduling tool into a goal achievement system."
    },
    {
      question: "Can a goals calendar replace my task manager?",
      answer: "A goals calendar works best alongside task management, not as a replacement. Use your goals calendar for time blocking, priority alignment, and progress visibility. Use your task manager for detailed task lists and tracking. The best systems integrate both: tasks feed into your calendar blocks, and your calendar shows how tasks serve your goals."
    },
    {
      question: "What features should I look for in a goals calendar app?",
      answer: "Key features include: goal-linked task creation, time blocking for priorities, weekly and monthly progress views, drag-and-drop scheduling, habit tracking integration, milestone tracking, and cross-platform sync. The best goals calendar apps make it easy to connect any scheduled activity to a specific goal and see your goal progress alongside your calendar."
    }
  ];

  const features = [
    {
      title: "Goal-Linked Scheduling",
      description: "Create tasks and events that connect directly to your goals so every plan has purpose.",
      icon: "🎯"
    },
    {
      title: "Progress Overview",
      description: "See your goal completion rates alongside your calendar for constant priority alignment.",
      icon: "📊"
    },
    {
      title: "Weekly Goal Review",
      description: "Review each week's progress toward goals and plan the next week's priorities.",
      icon: "🔄"
    },
    {
      title: "Time Blocking",
      description: "Block dedicated time for goal-related work and protect it from less important tasks.",
      icon: "⏰"
    },
    {
      title: "Milestone Tracking",
      description: "Mark key milestones on your calendar and celebrate progress along the way.",
      icon: "🏆"
    },
    {
      title: "Priority Alignment",
      description: "Ensure your daily calendar reflects your actual priorities, not just urgent requests.",
      icon: "⚡"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Goals Calendar App 2026 | Plan Your Goals on a Calendar | GoalPlanner"
        description="The best goals calendar app for linking your daily schedule to your bigger objectives. Plan, track, and achieve your goals with a calendar that shows what matters."
        canonicalPath="/goals-calendar-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Goals Calendar App",
          url: "https://goalplanner.io/goals-calendar-app",
          description: "Looking for a goals calendar app? Learn how to connect your daily schedule to your bigger objectives.",
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
            <Badge variant="secondary" className="w-fit">Connect Calendar to Goals</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Goals Calendar App: Your Calendar Should Serve Your Goals, Not the Other Way Around
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Most people use a calendar for events and a separate tool for goals. A goals calendar app brings them together so you can see—at a glance—whether your time is going where it matters.
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
          <h2 className="text-3xl font-bold text-foreground">Why You Need a Goals Calendar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">🔄 Align Time with Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">A goals calendar reveals the gap between what you say matters and where your time actually goes. It makes misalignment visible so you can fix it.</p>
              </CardContent>
            </Card>
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-momentum">📊 See Progress in Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Goal progress makes more sense when viewed alongside your calendar. 'I completed 60% of my goal' becomes 'I completed 60% while managing a busy work month.'</p>
              </CardContent>
            </Card>
            <Card className="border-ember/20 bg-ember/10">
              <CardHeader>
                <CardTitle className="text-ember">🎯 Make Better Trade-offs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">When you see a calendar event next to your goal deadline, you can make conscious decisions about where your time is best spent.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Key Features of the Best Goals Calendar App</h2>
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
          <h2 className="text-3xl font-bold text-foreground">How to Use a Goals Calendar Effectively</h2>
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground">Set monthly objectives, not just daily tasks</h4>
                  <p className="text-foreground/80">Start each month by defining 1-3 key goals. These become the lens through which you evaluate your calendar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground">Block goal time first</h4>
                  <p className="text-foreground/80">Schedule goal-related work before adding meetings, errands, or routine tasks. Your best hours go to your priorities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground">Review weekly, not daily</h4>
                  <p className="text-foreground/80">A weekly review of your goals calendar is more effective than daily micro-managing. Look for patterns, not perfection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-foreground">Adjust and iterate</h4>
                  <p className="text-foreground/80">Your goals calendar is a living tool. If something isn't working, adjust your approach rather than abandoning the system.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Align Your Calendar with Your Goals?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for a goals calendar that connects your daily schedule to the things that matter most. Free on web and mobile.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Planning Free
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">More Goal Planning Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set clear, measurable goals to guide your calendar</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Plan daily actions that serve your larger goals</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Weekly Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Structure your weeks around goal-driven priorities</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/weekly-planning">Weekly Planning →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Protect time for your goals with focused blocks</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/time-blocking">Time Blocking →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Calendar, Your Goals, One App</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Goal Planner – LifePlans brings your goals and calendar together so you can plan with purpose. Start free today.
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
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
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

export default GoalsCalendarApp;
