import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyTrackerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is a daily tracker app?","answer":"A daily tracker app helps you record and monitor various aspects of your daily life including habits, goals, tasks, moods, and metrics."},
    {"question":"What should I track daily?","answer":"Track habits you're building, goals you're working toward, tasks you need to complete, and any metrics that matter to your growth."},
    {"question":"How is a daily tracker different from a habit tracker?","answer":"Daily trackers are broader - they can track habits, goals, tasks, moods, and custom metrics. Habit trackers focus specifically on behavior consistency."},
    {"question":"How many things should I track daily?","answer":"Start with 3-5 items. Tracking too many things at once leads to burnout and abandonment of the tracking system."},
    {"question":"Can I track quantitative metrics?","answer":"Yes. Many daily trackers support numeric tracking for things like water intake, hours slept, pages read, or minutes exercised."},
    {"question":"What is the best time to do daily tracking?","answer":"Evening is ideal for most people - you can review the entire day and log everything at once. Some people prefer logging throughout the day."}
  ];

  const features = [
    {"title":"Multi-Category Tracking","description":"Track habits, goals, tasks, and metrics all in one app.","icon":"📊"},
    {"title":"Daily Check-Ins","description":"Quick daily check-ins to log your progress on everything.","icon":"✅"},
    {"title":"Consistency Streaks","description":"Build streaks that visually show your tracking consistency.","icon":"🔥"},
    {"title":"Trend Analytics","description":"See your tracking data trends over days, weeks, and months.","icon":"📈"},
    {"title":"Goal Progress","description":"Track daily actions that contribute to larger goals.","icon":"🎯"},
    {"title":"One-Tap Logging","description":"Log everything with minimal taps for maximum consistency.","icon":"📱"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Tracker App 2026 | A daily tracker app lets you monitor your daily habits, goals, tasks, and progress in one place | GoalPlanner"
        description="A daily tracker app lets you monitor your daily habits, goals, tasks, and progress in one place. Track anything that matters and watch your consistency grow."
        canonicalPath="/daily-tracker-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Tracker App",
          url: "https://goalplanner.io/daily-tracker-app",
          description: "A daily tracker app lets you monitor your daily habits, goals, tasks, and progress in one place. Track anything that matters and watch your consistency grow.",
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
            <Badge variant="secondary" className="w-fit">Track Daily Progress</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Daily Tracker App: Measure What Matters Every Day
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A daily tracker app lets you monitor your daily habits, goals, tasks, and progress in one place. Track anything that matters and watch your consistency grow.
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
                    <h4 className="font-semibold text-foreground">Decide what to track</h4>
                    <p className="text-foreground/80">Choose 3-5 things you want to track daily that align with your goals.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Set up your trackers</h4>
                    <p className="text-foreground/80">Configure each tracker with a name, type, and target.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Log consistently</h4>
                    <p className="text-foreground/80">Set a daily reminder to log your items at the same time each day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Review trends</h4>
                    <p className="text-foreground/80">Check your analytics weekly to see patterns and adjust.</p>
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

export default DailyTrackerApp;
