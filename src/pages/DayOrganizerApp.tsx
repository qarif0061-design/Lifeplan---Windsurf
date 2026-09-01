import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DayOrganizerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is a day organizer app?","answer":"A day organizer app helps you plan and manage your entire day in one place - combining tasks, schedule, notes, and goals."},
    {"question":"How is a day organizer different from a planner?","answer":"A planner focuses on scheduling, while a day organizer is broader - it includes task management, notes, goal tracking, and scheduling in one integrated tool."},
    {"question":"What should I include in my daily organization?","answer":"Priorities for the day, scheduled time blocks, task list, key notes, and at least one goal-related action."},
    {"question":"Can a day organizer replace multiple apps?","answer":"Yes. A good day organizer can replace separate calendar, to-do list, notes, and habit tracker apps with one unified system."},
    {"question":"How much time does daily organization take?","answer":"5-10 minutes in the morning to set up your day, and 5 minutes in the evening for review."},
    {"question":"Is a day organizer good for busy professionals?","answer":"Especially useful for busy professionals who need to manage tasks, meetings, and priorities across multiple projects."}
  ];

  const features = [
    {"title":"Task Organization","description":"Organize tasks by priority, category, or project.","icon":"📋"},
    {"title":"Day View","description":"See your entire day's plan at a glance.","icon":"📅"},
    {"title":"Quick Notes","description":"Capture ideas and notes alongside your daily plan.","icon":"📝"},
    {"title":"Goal Tracking","description":"Keep your daily goals visible and track progress.","icon":"🎯"},
    {"title":"Smart Alerts","description":"Get reminders for time-sensitive tasks and events.","icon":"🔔"},
    {"title":"Always Synced","description":"Your day organizer is available on web and mobile.","icon":"☁️"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Day Organizer App 2026 | A day organizer app helps you organize tasks, appointments, notes, and goals in one place | GoalPlanner"
        description="A day organizer app helps you organize tasks, appointments, notes, and goals in one place. Stop juggling multiple tools and simplify your day."
        canonicalPath="/day-organizer-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Day Organizer App",
          url: "https://goalplanner.io/day-organizer-app",
          description: "A day organizer app helps you organize tasks, appointments, notes, and goals in one place. Stop juggling multiple tools and simplify your day.",
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
            <Badge variant="secondary" className="w-fit">Organize Your Day</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Day Organizer App: Bring Order to Your Daily Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A day organizer app helps you organize tasks, appointments, notes, and goals in one place. Stop juggling multiple tools and simplify your day.
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
                    <h4 className="font-semibold text-foreground">Morning setup</h4>
                    <p className="text-foreground/80">Spend 5 minutes organizing your day: set priorities, review tasks, check schedule.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Execute and adjust</h4>
                    <p className="text-foreground/80">Follow your plan but stay flexible. Adjust as the day evolves.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Capture as you go</h4>
                    <p className="text-foreground/80">Add new tasks and notes throughout the day so nothing is forgotten.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Evening review</h4>
                    <p className="text-foreground/80">Review what you accomplished, update task status, and prepare for tomorrow.</p>
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

export default DayOrganizerApp;
