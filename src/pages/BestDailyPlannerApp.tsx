import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const BestDailyPlannerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is the best daily planner app in 2026?","answer":"Goal Planner – LifePlans is widely considered among the best, combining daily planning, goal setting, habit tracking, and progress analytics in one integrated platform."},
    {"question":"What makes a daily planner app the best?","answer":"The best daily planner is easy to use, flexible, and includes priority setting, time blocking, goal connection, and progress tracking without being overwhelming."},
    {"question":"Is the best daily planner app free?","answer":"Many top apps offer free tiers. Goal Planner – LifePlans is free to start with premium features available for power users."},
    {"question":"Can the best daily planner replace a calendar?","answer":"The best daily planners include calendar views, so you can often replace a separate calendar app with your all-in-one planner."},
    {"question":"How do I choose the best daily planner for me?","answer":"Look for the features you need most: task management, scheduling, habit tracking, or goal planning. Choose an app that does your must-haves well."},
    {"question":"What is the most important feature in a daily planner?","answer":"Priority setting. Without clear priorities, a daily planner is just a list. The best planners help you identify and focus on what matters most."}
  ];

  const features = [
    {"title":"Comprehensive Planning","description":"Plan daily tasks, schedule, habits, and goals in one place.","icon":"📝"},
    {"title":"Time Blocking","description":"Schedule focused work blocks and protect your most important time.","icon":"⏰"},
    {"title":"Goal Integration","description":"Connect your daily plans to weekly milestones and yearly goals.","icon":"🎯"},
    {"title":"Habit Tracking","description":"Build and maintain habits that support your daily productivity.","icon":"🔄"},
    {"title":"Progress Analytics","description":"Track your planning consistency and daily completion rates.","icon":"📊"},
    {"title":"Web + Mobile","description":"Use on any device with automatic cloud sync.","icon":"📱"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best Daily Planner App 2026 | Looking for the best daily planner app? Compare features, read about what makes a planner truly effective, and see why Goal Planner – LifePlans is the top choice | GoalPlanner"
        description="Looking for the best daily planner app? Compare features, read about what makes a planner truly effective, and see why Goal Planner – LifePlans is the top choice."
        canonicalPath="/best-daily-planner-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Best Daily Planner App",
          url: "https://goalplanner.io/best-daily-planner-app",
          description: "Looking for the best daily planner app? Compare features, read about what makes a planner truly effective, and see why Goal Planner – LifePlans is the top choice.",
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
            <Badge variant="secondary" className="w-fit">Top Daily Planner</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Best Daily Planner App: Your Search Ends Here
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Looking for the best daily planner app? Compare features, read about what makes a planner truly effective, and see why Goal Planner – LifePlans is the top choice.
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
                    <h4 className="font-semibold text-foreground">Identify your planning style</h4>
                    <p className="text-foreground/80">Do you prefer time-blocking, task lists, or a combination?</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Choose your app</h4>
                    <p className="text-foreground/80">Pick a daily planner that matches your preferred planning style.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Set up your system</h4>
                    <p className="text-foreground/80">Configure priorities, create templates, and set up recurring items.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Use it daily</h4>
                    <p className="text-foreground/80">Commit to daily planning for 2-3 weeks to establish the habit.</p>
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

export default BestDailyPlannerApp;
