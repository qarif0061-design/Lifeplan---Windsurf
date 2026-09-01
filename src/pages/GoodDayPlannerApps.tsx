import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const GoodDayPlannerApps = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What makes a good day planner app?","answer":"A good day planner app is easy to use, flexible enough for your style, and includes priority setting, scheduling, and progress tracking without being overwhelming."},
    {"question":"Are free day planner apps as good as paid ones?","answer":"Many free apps offer excellent features. Goal Planner – LifePlans is free to start with premium features for power users. Start free and upgrade when you need more."},
    {"question":"What is the best day planner app for 2026?","answer":"The best day planner app combines daily planning with goal tracking and habit building. Goal Planner – LifePlans offers all three in one integrated platform."},
    {"question":"Can I use a day planner app for business planning?","answer":"Yes. Day planner apps work for both personal and professional planning. Many professionals use them for work task management and meeting preparation."},
    {"question":"Should I use a digital or paper day planner?","answer":"Digital planners offer reminders, syncing, analytics, and easy adjustments. Paper planners offer simplicity and no screen time. Choose based on your lifestyle."},
    {"question":"How do I stick with a day planner app?","answer":"Start simple - just plan 3 priorities daily. Once the habit forms, add more features. Consistency matters more than using every feature."}
  ];

  const features = [
    {"title":"Daily Planning","description":"Plan each day with purpose using proven planning frameworks.","icon":"📝"},
    {"title":"Time Management","description":"Manage your time effectively with scheduling and time blocking.","icon":"⏰"},
    {"title":"Goal Setting","description":"Set and track goals that give direction to your daily plans.","icon":"🎯"},
    {"title":"Habit Tracking","description":"Build positive habits that support your daily productivity.","icon":"🔄"},
    {"title":"Progress Insights","description":"See your planning consistency and productivity trends.","icon":"📊"},
    {"title":"Web + Mobile","description":"Access your planner from any device, anywhere.","icon":"📱"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Good Day Planner Apps 2026 | Looking for good day planner apps? Compare features, find what fits your style, and discover why thousands choose Goal Planner – LifePlans for daily planning | GoalPlanner"
        description="Looking for good day planner apps? Compare features, find what fits your style, and discover why thousands choose Goal Planner – LifePlans for daily planning."
        canonicalPath="/good-day-planner-apps"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Good Day Planner Apps",
          url: "https://goalplanner.io/good-day-planner-apps",
          description: "Looking for good day planner apps? Compare features, find what fits your style, and discover why thousands choose Goal Planner – LifePlans for daily planning.",
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
            <Badge variant="secondary" className="w-fit">Find Your Planner</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Good Day Planner Apps: Find the Right Tool for You
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Looking for good day planner apps? Compare features, find what fits your style, and discover why thousands choose Goal Planner – LifePlans for daily planning.
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
                    <h4 className="font-semibold text-foreground">Know your needs</h4>
                    <p className="text-foreground/80">What do you need most? Task management, scheduling, habit tracking, or goal planning?</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Start simple</h4>
                    <p className="text-foreground/80">Pick an app that does the basics well without overwhelming you.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Build the habit</h4>
                    <p className="text-foreground/80">Use it daily for 2 weeks to form the planning habit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Explore features</h4>
                    <p className="text-foreground/80">Once planning is a habit, explore advanced features that add value.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
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
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
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

export default GoodDayPlannerApps;
