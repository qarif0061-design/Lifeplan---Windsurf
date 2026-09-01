import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const OnlineDailyPlanner = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {"question":"What is an online daily planner?","answer":"An online daily planner is a web-based tool for organizing your day that works in your browser without requiring any software installation."},
    {"question":"Is an online daily planner as good as a desktop app?","answer":"Modern online planners are just as capable as desktop apps, with the added benefit of being accessible from any device without installation."},
    {"question":"Do I need internet access to use an online planner?","answer":"Yes, you need internet to access and save your plans. Some online planners offer offline mode for limited functionality without internet."},
    {"question":"Is my data safe with an online daily planner?","answer":"Reputable online planners use encryption and secure cloud storage. Goal Planner – LifePlans follows industry-standard security practices to protect your data."},
    {"question":"Can I use an online daily planner for free?","answer":"Yes. Goal Planner – LifePlans offers a free tier that includes daily planning, goal setting, and habit tracking."},
    {"question":"What features should an online daily planner have?","answer":"Look for daily and weekly views, priority setting, task management, habit tracking, goal connection, and cloud sync."}
  ];

  const features = [
    {"title":"Browser-Based","description":"Access your planner from any browser, no installation needed.","icon":"🌐"},
    {"title":"Daily Planning","description":"Plan priorities, tasks, and schedule in an intuitive interface.","icon":"📝"},
    {"title":"Auto-Save","description":"Your plans save automatically to the cloud, never lose a plan.","icon":"☁️"},
    {"title":"Weekly View","description":"See the whole week and plan ahead with an online weekly view.","icon":"📅"},
    {"title":"Real-Time Sync","description":"Changes sync instantly across all your devices.","icon":"🔄"},
    {"title":"Secure & Private","description":"Your daily plans are private and securely stored in the cloud.","icon":"🔒"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Online Daily Planner 2026 | An online daily planner lets you plan your day from any device with internet access | GoalPlanner"
        description="An online daily planner lets you plan your day from any device with internet access. No downloads, no syncing issues. Just open and plan."
        canonicalPath="/online-daily-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Online Daily Planner",
          url: "https://goalplanner.io/online-daily-planner",
          description: "An online daily planner lets you plan your day from any device with internet access. No downloads, no syncing issues. Just open and plan.",
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
            <Badge variant="secondary" className="w-fit">Plan Online</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Online Daily Planner: Your Day, Anywhere
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              An online daily planner lets you plan your day from any device with internet access. No downloads, no syncing issues. Just open and plan.
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
                    <h4 className="font-semibold text-foreground">Open your planner</h4>
                    <p className="text-foreground/80">Open Goal Planner – LifePlans in any browser to start planning.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Set your priorities</h4>
                    <p className="text-foreground/80">Identify and write down your top 1-3 priorities for the day.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Schedule your time</h4>
                    <p className="text-foreground/80">Block time for each priority and add routine tasks around them.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Track and review</h4>
                    <p className="text-foreground/80">Throughout the day, check off completed items and review at day's end.</p>
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

export default OnlineDailyPlanner;
