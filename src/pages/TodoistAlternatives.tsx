import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const TodoistAlternatives = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "Why look for a Todoist alternative?",
      answer: "Todoist is one of the most popular task managers, but it isn't right for everyone. The best features (reminders, labels, project views) sit behind a paid plan, it focuses on managing tasks rather than planning a day or a week, and there's no built-in goal tracking. People switch because they want a simpler to-do list, a free plan with the essentials, or a tool that connects tasks to bigger goals and daily planning — not just a place to store more tasks."
    },
    {
      question: "Is there a free Todoist alternative?",
      answer: "Yes. Several strong free alternatives exist. GoalPlanner (LifePlans) is free to start and combines tasks with daily planning and goal tracking. Microsoft To Do is free and syncs across Windows, Android, and iPhone. Google Tasks is free inside Google Workspace. TickTick has a generous free tier with reminders and a calendar. The best free option depends on whether you need simple task lists or a planner that connects your tasks to goals."
    },
    {
      question: "What's the difference between a to-do app and a daily planner?",
      answer: "A to-do app lists tasks — you decide what to work on each day. A daily planner schedules your day: it starts with priorities, time-blocks your most important work, and connects tasks to a weekly plan and longer-term goals. A planner reduces decision fatigue because the 'what should I do now?' question is already answered. If you have a long task list but struggle to make progress each day, the problem isn't task management — it's planning."
    },
    {
      question: "Does Todoist have a good free plan?",
      answer: "Todoist's free plan covers the basics: projects, tasks, due dates, and labels. The limits that push people to pay include a cap on active tasks, no reminders without extra setup, limited projects, and no recurring tasks on some platforms. If you only need a clean list of to-dos, the free plan can be enough. If you need recurring tasks, reminders, and progress views for free, an alternative like Microsoft To Do or GoalPlanner may serve you better."
    },
    {
      question: "Which app is best for daily task planning?",
      answer: "For daily planning, choose an app that (1) lets you set 1–3 priorities for the day, (2) schedules tasks into time blocks, (3) connects to a weekly plan, and (4) shows progress so you stay consistent. GoalPlanner does all four. TickTick also has strong daily planning features with a built-in calendar. If you want the simplest approach, combine a plain to-do app with a 10-minute weekly planning session — but a planner that connects both is more likely to be followed."
    },
    {
      question: "How do I migrate from Todoist to another app?",
      answer: "Todoist supports export through its settings (Export as CSV), and most apps accept CSV import. Microsoft To Do and TickTick both have importers that map projects, tasks, and due dates. Before switching, clean your list: archive or delete stale tasks, keep only active projects, and group tasks by goal or area. Migrating is a good moment to restructure, not just copy — many people find half their tasks are no longer relevant."
    },
    {
      question: "Is Todoist worth paying for?",
      answer: "For heavy task managers who live in projects and filters, Todoist's paid plan is solid value. But for most people, the tasks that matter are personal and daily — and a paid task manager doesn't fix the real problem: turning a list into a finished day. If you're paying for Todoist and still not making daily progress, consider a free planner that connects tasks to priorities, time blocks, and goals before spending more on task software."
    },
    {
      question: "Does GoalPlanner work as a Todoist replacement?",
      answer: "For daily and weekly planning, yes — GoalPlanner replaces the task list with a structured day: priorities, scheduled tasks, and a check-in to keep you consistent. It adds goal tracking and progress analytics that Todoist doesn't have. It's not a heavy project-management tool for teams (like Asana or Linear). If you manage a lot of collaborative projects, you may still use a project tool — and use GoalPlanner for your personal daily execution."
    }
  ];

  const alternatives = [
    {
      name: "GoalPlanner (LifePlans)",
      bestFor: "Tasks tied to daily planning & goals",
      rating: "Best for daily execution",
      pros: ["Priorities + tasks in a daily plan", "Goal tracking and progress analytics", "Free to start", "Weekly reviews built in"],
      cons: ["Not built for complex team projects"],
    },
    {
      name: "Microsoft To Do",
      bestFor: "Simple, free, cross-platform lists",
      rating: "Best free simple to-do",
      pros: ["Completely free", "Syncs with Outlook", "Clean and fast", "My Day view"],
      cons: ["Limited project views", "Basic planning features"],
    },
    {
      name: "TickTick",
      bestFor: "Tasks + calendar in one",
      rating: "Best calendar integration",
      pros: ["Built-in calendar", "Habit tracking", "Pomodoro timer", "Generous free tier"],
      cons: ["Can feel busy", "Calendar limited on free plan"],
    },
    {
      name: "Things 3",
      bestFor: "Polished, focused task manager",
      rating: "Best design (Apple only)",
      pros: ["Beautiful and fast", "Areas, projects, headings", "Great natural language"],
      cons: ["Mac/iOS only", "Paid per platform", "No web or Android"],
    },
  ];

  const comparison = [
    { feature: "Daily priorities", todoist: false, goalplanner: true },
    { feature: "Time-block scheduling", todoist: false, goalplanner: true },
    { feature: "Goal tracking", todoist: false, goalplanner: true },
    { feature: "Recurring tasks", todoist: true, goalplanner: true },
    { feature: "Reminders & due dates", todoist: true, goalplanner: true },
    { feature: "Weekly planning", todoist: false, goalplanner: true },
    { feature: "Progress analytics", todoist: false, goalplanner: true },
    { feature: "Generous free plan", todoist: false, goalplanner: true },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Todoist Alternatives (2026): 7 Best To-Do & Task Apps Compared | GoalPlanner"
        description="The best Todoist alternatives in 2026 — free and paid to-do apps compared. Find a simpler task manager that plans your day, not just lists tasks."
        canonicalPath="/todoist-alternatives"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Todoist Alternatives",
          url: "https://goalplanner.io/todoist-alternatives",
          description: "A practical comparison of the best Todoist alternatives for tasks and daily planning.",
          mainEntity: {
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        }}
      />

      <div className="space-y-16">
        <header className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Tasks & Planning</Badge>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground leading-tight">
              Todoist Alternatives (2026): To-Do Lists That Actually Get Finished
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Todoist is a great task manager — but a long list of tasks doesn't guarantee a productive day. These Todoist alternatives help you prioritize, plan your time, and track goals, so "done" stops being a moving target.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Try GoalPlanner Free
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-secondary/40 rounded-2xl p-8 border border-border">
            <p className="text-lg font-medium text-foreground mb-2">Quick answer: the best Todoist alternative</p>
            <ul className="space-y-2 text-foreground/80">
              <li>• <strong>Microsoft To Do</strong> if you want a clean, free to-do list with Outlook sync</li>
              <li>• <strong>TickTick</strong> if you want tasks + a built-in calendar</li>
              <li>• <strong>GoalPlanner</strong> if your tasks are really steps toward goals that need daily planning</li>
            </ul>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">The Real Problem With Todoist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">📋</span> It Manages Tasks, Not Days</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A to-do list answers "what's outstanding?" A planner answers "what should I work on right now?" Most people already know their tasks — they struggle to fit them into a real day.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🔒</span> Best Features Are Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reminders, labels, and project views sit behind the Pro plan. On the free tier you hit task limits and lose key features quickly.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🎯</span> No Connection to Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your tasks aren't tied to the goals they serve. When daily tasks don't connect to a bigger why, motivation fades and the list grows stale.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">📊</span> No Progress View</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Completing tasks feels like bailing water — you can't see trends, streaks, or whether you're actually moving forward on what matters.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">The 4 Best Todoist Alternatives (2026)</h2>
          <p className="text-lg text-muted-foreground">Rated for people who want to finish things — not just collect more tasks.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {alternatives.map((alt, i) => (
              <Card key={i} className={i === 0 ? "border-primary/20 ring-2 ring-primary/10" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {i === 0 && <span className="text-2xl">👑</span>} {alt.name}
                    </CardTitle>
                    <Badge variant={i === 0 ? "default" : "secondary"} className="shrink-0">{alt.rating}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground"><strong>Best for:</strong> {alt.bestFor}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-momentum mb-1">Pros</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {alt.pros.map((p, j) => <li key={j}>✓ {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600 mb-1">Cons</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {alt.cons.map((c, j) => <li key={j}>✗ {c}</li>)}
                    </ul>
                  </div>
                  {i === 0 && (
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                      Try GoalPlanner Free
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">Todoist vs GoalPlanner: Feature Comparison</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Todoist</th>
                  <th className="text-center py-4 px-6 font-semibold text-primary">GoalPlanner</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                    <td className="py-3.5 px-6 text-foreground/80">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center">{row.todoist ? "✓" : "—"}</td>
                    <td className="py-3.5 px-6 text-center text-primary font-medium">{row.goalplanner ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">How to Turn a To-Do List Into a Finished Day</h2>
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold text-primary mb-4">The 4-step daily plan</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Pick 1–3 priorities</h4>
                    <p className="text-foreground/80">Choose what finishing today actually means. If everything is a priority, nothing is.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Time-block the most important work</h4>
                    <p className="text-foreground/80">Assign a start time to your top priority so it happens before reactive work eats the day.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Connect tasks to a weekly plan</h4>
                    <p className="text-foreground/80">Daily tasks should roll up to a weekly target and a goal. That's what keeps them meaningful.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Check in and review</h4>
                    <p className="text-foreground/80">A 30-second check-in at the end of the day keeps you honest, and a weekly review keeps the plan realistic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">Build Your Full System</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Daily Planning</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Turn tasks into a daily schedule and priorities.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Notes & Capture</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Capture quick thoughts and lists instantly.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/google-keep-alternatives">Google Keep Alternatives →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Goals & Tracking</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Connect tasks to goals and track progress.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Don't Just List Tasks — Finish Days</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              GoalPlanner (LifePlans) connects your tasks to priorities, time blocks, weekly plans, and goals — with progress analytics to keep you consistent. Free to start on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Get Started Free
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-foreground">Frequently Asked Questions</h2>
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

export default TodoistAlternatives;
