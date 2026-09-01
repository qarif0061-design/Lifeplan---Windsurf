import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyScheduleApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is a daily schedule app?","answer":"A daily schedule app lets you plan your day hour by hour, assigning tasks and activities to specific time slots. It's more structured than a simple to-do list."},
    {"question":"How is a daily schedule app different from a calendar?","answer":"Calendars track events; schedule apps help you plan tasks, block time for deep work, build routines, and track what you actually accomplish."},
    {"question":"What is the best way to plan a daily schedule?","answer":"Start with your top 1-3 priorities, schedule them during peak energy hours, then fill in routine tasks and buffer time for interruptions."},
    {"question":"Should I schedule every minute of my day?","answer":"No. Leave 20-30% buffer time for unexpected tasks, breaks, and transitions. Over-scheduling leads to frustration and abandonment of the system."},
    {"question":"Can a daily schedule app help with productivity?","answer":"Yes. Research shows that time-blocking and scheduled task execution significantly improve productivity compared to unstructured to-do lists."},
    {"question":"Is a daily schedule app good for remote work?","answer":"Especially useful for remote workers. It provides structure, separates work from personal time, and helps maintain boundaries when working from home."}
  ];

  const features = [
    {"title":"Time Blocking","description":"Schedule focused blocks for deep work, meetings, and breaks.","icon":"⏰"},
    {"title":"Task Planning","description":"Assign specific tasks to time slots so nothing falls through the cracks.","icon":"📋"},
    {"title":"Recurring Schedules","description":"Create daily and weekly routines that repeat automatically.","icon":"🔄"},
    {"title":"Priority Setting","description":"Mark your most important activities and schedule them first.","icon":"🎯"},
    {"title":"Time Analytics","description":"See where your time actually goes and optimize your schedule.","icon":"📊"},
    {"title":"Sync Everywhere","description":"Access your schedule from web and mobile, updated in real time.","icon":"☁️"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Schedule App 2026 | A daily schedule app helps you plan each hour, prioritize what matters, and actually follow through | GoalPlanner"
        description="A daily schedule app helps you plan each hour, prioritize what matters, and actually follow through. Stop reacting to the day and start directing it."
        canonicalPath="/daily-schedule-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Schedule App",
          url: "https://goalplanner.io/daily-schedule-app",
          description: "A daily schedule app helps you plan each hour, prioritize what matters, and actually follow through. Stop reacting to the day and start directing it.",
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
            <Badge variant="secondary" className="w-fit">Plan Your Day Well</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Daily Schedule App: Take Control of Your Time
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A daily schedule app helps you plan each hour, prioritize what matters, and actually follow through. Stop reacting to the day and start directing it.
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
          <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to stay organized and achieve your goals.</p>
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
          <h2 className="text-3xl font-bold text-foreground">How to Get Started</h2>
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <div className="space-y-4">
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Identify priorities</h4>
                    <p className="text-foreground/80">Before scheduling, know your top 1-3 priorities for the day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Time-block your day</h4>
                    <p className="text-foreground/80">Assign each priority to a specific time slot during your peak focus hours.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Add routines and breaks</h4>
                    <p className="text-foreground/80">Schedule recurring routines and intentional breaks to maintain energy throughout the day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Review and adjust</h4>
                    <p className="text-foreground/80">At day's end, review what worked and adjust tomorrow's schedule accordingly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans free today. Start on web or mobile.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Planning Free
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">More Tools to Help You Succeed</h2>
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
                <CardTitle className="text-lg">🎯 Goal Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set and track goals that matter</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 Habit Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build and maintain positive routines</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Monitor your achievements over time</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/progress-tracker-app">Progress Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              The right tools make all the difference. Try Goal Planner – LifePlans free and see what you can achieve.
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
              <AccordionItem key={index} value={String(index)}>
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

export default DailyScheduleApp;
