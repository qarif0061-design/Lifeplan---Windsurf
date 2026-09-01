import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const ProgressTrackerApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What is a progress tracker app?",
      answer: "A progress tracker app helps you measure and visualize your advancement toward goals, habits, and projects. Unlike simple to-do lists, progress trackers show trends, streaks, completion rates, and patterns over time. The best progress tracker apps connect daily actions to bigger goals so you can see how small efforts accumulate into meaningful results."
    },
    {
      question: "How is a progress tracker different from a to-do list?",
      answer: "To-do lists focus on what needs to be done today. Progress trackers focus on how you're advancing over time toward larger objectives. A to-do list answers 'what's next?' while a progress tracker answers 'how am I doing?' Progress tracking shows trends, streaks, and patterns that to-do lists don't capture. The best systems combine both: daily tasks tracked as part of larger progress."
    },
    {
      question: "What should I track with a progress tracker?",
      answer: "Track anything you want to improve consistently: goal milestones (percentage complete, checkpoints reached), habits (streaks, weekly consistency rates), projects (tasks completed, time spent), skills (sessions completed, levels achieved), health metrics (workouts, steps, sleep), learning (chapters read, courses completed), and financial goals (savings milestones, debt reduction)."
    },
    {
      question: "How do I build a progress tracking habit?",
      answer: "Start small: pick one goal or habit to track. Set a weekly review time to check your progress. Use a tracker that makes updating easy—one-tap or quick input. Focus on trends, not perfection. The key is consistency over time, not perfect tracking. A progress tracker that's 80% complete consistently is more valuable than one that's perfectly updated for a week then abandoned."
    },
    {
      question: "What features make the best progress tracker app?",
      answer: "Look for: visual progress display (charts, bars, or rings), customizable tracking (goals, habits, projects), trend analysis (weekly/monthly patterns), streak tracking, milestone celebrations, goal linking (connect daily actions to bigger objectives), cross-platform sync, and simple input methods. Avoid apps that require complex setup or make updating progress feel like work."
    },
    {
      question: "Can progress tracking help with motivation?",
      answer: "Yes, progress tracking directly supports motivation by making invisible progress visible. When you see that you've completed 60% of a goal, exercised 4 days this week, or maintained a 2-week streak, that visible evidence of progress reinforces your motivation to continue. This is called the 'progress principle'—seeing forward movement is one of the strongest motivators."
    }
  ];

  const features = [
    {
      title: "Goal Progress Tracking",
      description: "Track percentage completion, milestones, and checkpoints for each of your goals.",
      icon: "🎯"
    },
    {
      title: "Habit Consistency",
      description: "See weekly rates, streaks, and patterns for daily habits and routines.",
      icon: "✅"
    },
    {
      title: "Visual Dashboards",
      description: "Clear charts and progress bars that show your advancement at a glance.",
      icon: "📊"
    },
    {
      title: "Trend Analysis",
      description: "Understand your patterns over weeks and months to optimize your approach.",
      icon: "📈"
    },
    {
      title: "Weekly Reviews",
      description: "Built-in reflection prompts to review progress and plan adjustments.",
      icon: "🔄"
    },
    {
      title: "Goal-Habit Connection",
      description: "See how daily habits and tasks accumulate toward your bigger goals.",
      icon: "⛓️"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Progress Tracker App 2026 | Track Goals, Habits & Milestones | GoalPlanner"
        description="The best progress tracker app for goals, habits, and projects. Visualize your advancement, spot trends, and stay motivated. Free to start."
        canonicalPath="/progress-tracker-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Progress Tracker App",
          url: "https://goalplanner.io/progress-tracker-app",
          description: "Looking for a progress tracker app? Learn how to track goals, habits, and milestones with clear visual feedback.",
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
            <Badge variant="secondary" className="w-fit">See Your Progress Clearly</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Progress Tracker App: See How Far You've Come
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A progress tracker app does what your memory can't—it shows you the real story of your effort over time. Not just what you did today, but the trend, the streak, the momentum you're building.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Tracking Free
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Why Progress Tracking Changes Everything</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-momentum">🎯 Makes Progress Visible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">When progress is invisible, motivation fades. A progress tracker shows you the concrete evidence of your effort—streaks, percentages, and trends that keep you going.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">🔍 Reveals Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Spot trends you'd otherwise miss: your best days of the week, habits that slip during busy periods, what actually moves your goals forward. Pattern awareness enables better decisions.</p>
              </CardContent>
            </Card>
            <Card className="border-ember/20 bg-ember/10">
              <CardHeader>
                <CardTitle className="text-ember">⚡ Fuels Momentum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">Seeing your progress creates a feedback loop: progress → motivation → more action → more progress. This is the 'progress principle'—forward momentum is self-reinforcing.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Key Features of the Best Progress Tracker App</h2>
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
          <h2 className="text-3xl font-bold text-foreground">How to Track Progress Without Obsessing</h2>
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground">Set a weekly review, not daily check</h4>
                  <p className="text-foreground/80">Daily checking creates anxiety. Weekly reviews build sustainable awareness. Pick one time each week to review your progress trends.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground">Focus on trends, not perfection</h4>
                  <p className="text-foreground/80">Ask 'am I improving over time?' not 'was today perfect?' Weekly trends are more meaningful than daily streaks. 4 out of 7 days consistently is success.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground">Track input, not just output</h4>
                  <p className="text-foreground/80">Track the actions you control (sessions completed, time spent) not just results you can't fully control (weight, sales, rankings). Input tracking is empowering.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-foreground">Celebrate milestones</h4>
                  <p className="text-foreground/80">Acknowledge progress along the way. A good progress tracker app helps you see and celebrate incremental wins, not just the final goal completion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to See Your Real Progress?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for progress tracking that connects your daily actions to your biggest goals. Free on web and mobile.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Tracking Free
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">More Tracking Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set clear, measurable goals worth tracking</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Habit Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build consistent habits that move your goals forward</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Plan daily actions that accumulate into real progress</p>
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
                <p className="text-muted-foreground mb-4">Review and plan your progress week by week</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/weekly-planning">Weekly Planning →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Track What Matters</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Goal Planner – LifePlans combines progress tracking with goal setting, habit building, and daily planning in one integrated system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Start Tracking Free
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

export default ProgressTrackerApp;
