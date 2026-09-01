import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyHabitTrackerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is a daily habit tracker app?","answer":"It's an app designed specifically for tracking habits on a daily basis. Unlike general productivity apps, it focuses on consistent behavior tracking."},
    {"question":"How many habits should I track daily?","answer":"Start with 2-4 habits. Tracking too many at once leads to burnout and inconsistency. You can add more once the first ones become automatic."},
    {"question":"What time of day should I log habits?","answer":"Log habits immediately after completing them. If that's not possible, set aside 2 minutes at the end of your day for habit logging."},
    {"question":"What if I miss a day?","answer":"Missing one day doesn't break your progress. Focus on getting back on track the next day. Consistency over months matters more than perfection every single day."},
    {"question":"Can I track habit quality, not just completion?","answer":"Yes. The best daily habit trackers let you add notes or ratings to each habit entry for more detailed tracking."},
    {"question":"How long until daily habits feel automatic?","answer":"Research suggests 18-254 days depending on the habit. Simple habits like drinking water become automatic faster than complex habits like exercise."}
  ];

  const features = [
    {"title":"Daily Logging","description":"Quick one-tap habit logging that takes seconds per day.","icon":"✅"},
    {"title":"Streak Counter","description":"Visual streak counters that motivate you to never break the chain.","icon":"🔥"},
    {"title":"Weekly Reports","description":"See your weekly habit completion rate and identify patterns.","icon":"📊"},
    {"title":"Custom Reminders","description":"Set specific times for habit reminders that match your routine.","icon":"⏰"},
    {"title":"Habit Goals","description":"Set target completion rates and work toward habit mastery.","icon":"🎯"},
    {"title":"Mobile Widget","description":"Track habits from your home screen without opening the app.","icon":"📱"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Habit Tracker App 2026 | A daily habit tracker app makes it simple to log, track, and maintain your habits every single day | GoalPlanner"
        description="A daily habit tracker app makes it simple to log, track, and maintain your habits every single day. Consistency has never been easier."
        canonicalPath="/daily-habit-tracker-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Habit Tracker App",
          url: "https://goalplanner.io/daily-habit-tracker-app",
          description: "A daily habit tracker app makes it simple to log, track, and maintain your habits every single day. Consistency has never been easier.",
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
            <Badge variant="secondary" className="w-fit">Track Habits Daily</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Daily Habit Tracker App: Small Daily Actions, Big Results
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A daily habit tracker app makes it simple to log, track, and maintain your habits every single day. Consistency has never been easier.
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
                    <h4 className="font-semibold text-foreground">Pick 2-4 habits</h4>
                    <p className="text-foreground/80">Choose habits that align with your goals and are specific enough to track.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Set a daily reminder</h4>
                    <p className="text-foreground/80">Schedule a reminder at a time when you're most likely to complete the habit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Log immediately</h4>
                    <p className="text-foreground/80">Right after completing each habit, log it. The act reinforces the behavior.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Review weekly</h4>
                    <p className="text-foreground/80">Check your weekly completion rates and adjust your approach as needed.</p>
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

export default DailyHabitTrackerApp;
