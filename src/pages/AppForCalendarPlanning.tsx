import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const AppForCalendarPlanning = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is the best app for calendar planning?","answer":"The best app for calendar planning combines event scheduling with task management and goal tracking. Goal Planner – LifePlans offers all of this in one integrated platform."},
    {"question":"How is calendar planning different from daily planning?","answer":"Calendar planning focuses on events and time slots, while daily planning focuses on task prioritization and execution. The best approach uses both together."},
    {"question":"Should I use a separate calendar and planner?","answer":"You can, but integrated solutions save time and reduce friction. An app that combines calendar views with task planning eliminates the need to switch between tools."},
    {"question":"What views should a good calendar planning app have?","answer":"Daily, weekly, and monthly views at minimum. Some people also benefit from quarterly and yearly overviews for long-term planning."},
    {"question":"Can I share my calendar with others?","answer":"Yes. The best calendar planning apps offer sharing features for team collaboration, family scheduling, and coordinating with others."},
    {"question":"Is calendar planning useful for students?","answer":"Very. Students benefit from scheduling classes, study sessions, assignment deadlines, and extracurricular activities in one place."}
  ];

  const features = [
    {"title":"Calendar Views","description":"Daily, weekly, and monthly views to see your time at a glance.","icon":"📅"},
    {"title":"Event + Task Planning","description":"Combine events and tasks in one view so nothing gets double-booked.","icon":"📝"},
    {"title":"Goal Integration","description":"See how your calendar serves your goals, not just your appointments.","icon":"🎯"},
    {"title":"Recurring Events","description":"Set up repeating events and tasks that automatically populate your calendar.","icon":"🔄"},
    {"title":"Smart Reminders","description":"Get notified before events and deadlines so you never miss what matters.","icon":"🔔"},
    {"title":"Time Analysis","description":"Understand how your calendar time is distributed across activities.","icon":"📊"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="App For Calendar Planning 2026 | An app for calendar planning combines event management with task scheduling so you can see your entire day, week, or month at a glance and plan accordingly | GoalPlanner"
        description="An app for calendar planning combines event management with task scheduling so you can see your entire day, week, or month at a glance and plan accordingly."
        canonicalPath="/app-for-calendar-planning"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "App For Calendar Planning",
          url: "https://goalplanner.io/app-for-calendar-planning",
          description: "An app for calendar planning combines event management with task scheduling so you can see your entire day, week, or month at a glance and plan accordingly.",
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
            <Badge variant="secondary" className="w-fit">Plan Your Calendar</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              App for Calendar Planning: See Your Time at a Glance
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              An app for calendar planning combines event management with task scheduling so you can see your entire day, week, or month at a glance and plan accordingly.
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
            <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <div className="space-y-4">
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Block fixed events</h4>
                    <p className="text-foreground/80">Add classes, meetings, and appointments that have fixed times.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Schedule priorities</h4>
                    <p className="text-foreground/80">Around fixed events, block time for your most important tasks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Add buffer time</h4>
                    <p className="text-foreground/80">Leave gaps between events for transitions, breaks, and unexpected tasks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Review weekly</h4>
                    <p className="text-foreground/80">Each week, review your calendar to ensure it reflects your priorities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
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
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
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

export default AppForCalendarPlanning;
