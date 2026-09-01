import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const GoogleKeepAlternatives = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "Why do people look for Google Keep alternatives?",
      answer: "Google Keep is great for quick notes, but it has real limitations: no true folders or nesting (labels only), basic task management with no recurring tasks or reminders that stick, weak search across large note collections, and no structured templates. If you use notes for daily planning, goal tracking, or project work, you quickly outgrow simple color-coded sticky notes. Alternatives add folders, tasks, templates, and better organization without losing the speed of capturing an idea fast."
    },
    {
      question: "Is there a free Google Keep alternative?",
      answer: "Yes. Several alternatives have free tiers: GoalPlanner (LifePlans) is free to start and combines notes, goals, and daily planning in one place. Notion has a generous free personal plan, Apple Notes is free on Apple devices, and Standard Notes has a free tier. Google Keep itself is free, but the cost of staying is the time you lose digging through notes and managing tasks by hand. Free tiers usually limit advanced features like analytics, unlimited projects, or collaboration."
    },
    {
      question: "What should I look for in a Google Keep replacement?",
      answer: "Look for four things: (1) fast capture — a notes app is useless if writing a note takes longer than a second; (2) organization that scales — folders, tags, and search that stay fast with hundreds of notes; (3) tasks that work — reminders, due dates, and recurring tasks; and (4) planning built in — the ability to turn a note into a daily task or a goal, not just store it. If the replacement can't help you act on the note, it's just a nicer looking pile of notes."
    },
    {
      question: "Can I move my Google Keep notes to another app?",
      answer: "Yes. Google Keep supports export through Google Takeout, which gives you your notes as HTML or JSON files. Notion and Evernote have built-in import tools. Most apps accept a simple copy-paste workflow for smaller collections. Plan the move in batches: export everything, then import into your new app, then spend a weekend organizing notes into folders. Labeling notes in Keep before export makes the import much cleaner."
    },
    {
      question: "Is Google Keep good for task management?",
      answer: "Google Keep is usable for lightweight to-dos, but it lacks the features people need for real task management: no recurring tasks, no subtasks, no priority levels, no project views, and no progress tracking. Checklists exist, but they don't roll up anywhere. If your tasks feed into daily planning or goals — like 'study 30 minutes' supporting a bigger career goal — a dedicated planner with tasks and tracking works far better than loose checklists in a notes app."
    },
    {
      question: "What's the difference between Google Keep and a planner app?",
      answer: "Google Keep is a note-capture tool: you store ideas, lists, and quick thoughts. A planner app like GoalPlanner (LifePlans) is a follow-through tool: you set goals, break them into weekly targets, turn targets into daily tasks, and track progress over time. Keep answers 'how do I remember this?'; a planner answers 'how do I actually get this done?' Most people need both, but the planner does the heavy lifting for consistency."
    },
    {
      question: "Which notes app is best for students?",
      answer: "For students, the best choice combines note organization with study planning. Notion is popular for its databases and note nesting. Apple Notes is clean and free on Mac/iPad. For students who also need to plan their week, schedule study blocks, and track assignments, a planner app that pairs notes with daily tasks — like GoalPlanner — removes the switching between a notes app and a to-do app. Pick the one that gets you to 'done' faster, not the one with the most features."
    },
    {
      question: "Does GoalPlanner replace Google Keep?",
      answer: "Not exactly — GoalPlanner replaces the task-management half of Google Keep while adding goal tracking, weekly planning, and progress analytics that Keep never had. It's ideal if your notes are mostly to-dos, plans, and goals. If you need a free-form digital notebook with heavy note-taking, pair GoalPlanner with a dedicated notes app. For most people, an app that turns plans into daily actions beats a pile of color-coded notes."
    }
  ];

  const alternatives = [
    {
      name: "GoalPlanner (LifePlans)",
      bestFor: "Turning notes into daily action",
      rating: "Best overall for planning",
      pros: ["Goals, tasks, and daily planning in one app", "Free to start", "Turns notes into next actions", "Progress tracking + weekly reviews"],
      cons: ["Not a full free-form notebook", "Newer app with a smaller user base"],
    },
    {
      name: "Notion",
      bestFor: "Flexible notes & databases",
      rating: "Best for power organizers",
      pros: ["Extremely flexible", "Databases, wikis, templates", "Great free plan"],
      cons: ["Steep learning curve", "Slow on large workspaces", "No offline-first focus"],
    },
    {
      name: "Evernote",
      bestFor: "Web clipping & scanning",
      rating: "Best for research & archiving",
      pros: ["Excellent search", "Web clipper", "Scans documents", "Cross-platform"],
      cons: ["Pricey paid plans", "Heavier than Keep", "Feels dated"],
    },
    {
      name: "Obsidian",
      bestFor: "Linked, local notes",
      rating: "Best for note-linkers",
      pros: ["Local-first and private", "Backlink graph", "Powerful plugins"],
      cons: ["Not beginner friendly", "No built-in tasks until plugins"],
    },
  ];

  const comparison = [
    { feature: "Fast note capture", keep: true, goalplanner: true },
    { feature: "Folders & organization", keep: false, goalplanner: true },
    { feature: "Recurring tasks & reminders", keep: false, goalplanner: true },
    { feature: "Turns notes into daily tasks", keep: false, goalplanner: true },
    { feature: "Goal setting & tracking", keep: false, goalplanner: true },
    { feature: "Weekly planning", keep: false, goalplanner: true },
    { feature: "Progress analytics", keep: false, goalplanner: true },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Google Keep Alternatives (2026): 7 Better Apps for Notes, Tasks & Planning | GoalPlanner"
        description="Looking for a Google Keep alternative? Compare the best apps for notes, tasks, and daily planning — including free options like GoalPlanner, Notion, and Evernote."
        canonicalPath="/google-keep-alternatives"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Google Keep Alternatives",
          url: "https://goalplanner.io/google-keep-alternatives",
          description: "A practical comparison of Google Keep alternatives for notes, tasks, and daily planning.",
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
            <Badge variant="secondary" className="w-fit">Notes & Tasks</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Google Keep Alternatives (2026): Stop Collecting Notes, Start Completing Them
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Google Keep is perfect for quick thoughts — but when your notes become to-dos, plans, and goals, a simple sticky-note app stops scaling. Here are the best Google Keep alternatives for notes, tasks, and daily planning in 2026.
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
            <p className="text-lg font-medium text-foreground mb-2">Quick answer: the best Google Keep alternative for most people</p>
            <ul className="space-y-2 text-foreground/80">
              <li>• <strong>Keep using Keep</strong> if you only need quick, disposable notes</li>
              <li>• <strong>Try Notion or Obsidian</strong> if you need a flexible digital notebook</li>
              <li>• <strong>Try GoalPlanner</strong> if your notes are really plans — goals, tasks, and daily priorities that need to become action</li>
            </ul>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Where Google Keep Falls Short</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">📁</span> No Real Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Labels and colors don't scale. With a few hundred notes, you'll spend more time scrolling than doing.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">✅</span> Weak Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recurring tasks, no subtasks, no priorities, and checklists don't roll up into a plan.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🗂️</span> Notes Stay Disconnected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A note about a goal never becomes a daily task. Capture is easy; follow-through doesn't exist.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">📊</span> No Planning or Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">There's no weekly planning, no goal tracking, no progress view — just a list of things you wrote down.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">The 4 Best Google Keep Alternatives (2026)</h2>
          <p className="text-lg text-muted-foreground">Ranked for real daily use — capture speed, organization, and whether they help you actually get things done.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {alternatives.map((alt, i) => (
              <Card key={i} className={i === 0 ? "border-primary/30 ring-2 ring-primary/10" : ""}>
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
          <h2 className="text-3xl font-bold text-foreground">Google Keep vs GoalPlanner: Feature Comparison</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Google Keep</th>
                  <th className="text-center py-4 px-6 font-semibold text-primary">GoalPlanner</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-secondary/40" : ""}`}>
                    <td className="py-3.5 px-6 text-foreground/80">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center">{row.keep ? "✓" : "—"}</td>
                    <td className="py-3.5 px-6 text-center text-primary font-medium">{row.goalplanner ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">How to Choose the Right Google Keep Alternative</h2>
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-xl font-semibold text-foreground mb-4">Match the tool to your actual job</h3>
              <div className="space-y-3 text-foreground/80">
                <p><strong>Quick thoughts & shopping lists</strong> → stay with Google Keep or Apple Notes.</p>
                <p><strong>Research, wikis, databases</strong> → Notion, Obsidian, or Evernote.</p>
                <p><strong>Plans, goals, tasks, and daily execution</strong> → a planner like GoalPlanner, because the job isn't storing the note — it's doing the thing.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">⚡ Capture must stay instant</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">If writing a note takes more than a few seconds, you'll stop writing it.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">🗂️ Organization must scale</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">Folders, search, and fast navigation matter once you pass a hundred notes.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">🎯 It must lead to action</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">The best alternative turns a note into a task, a plan, or a step you can take today.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Use Cases: What Each Alternative Is Actually Good At</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><span className="text-2xl">🎓</span> Student</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Goal:</strong> Pass 4 courses this semester</p>
                <p><strong>Notes:</strong> Class notes in Notion or Keep</p>
                <p><strong>Plan:</strong> Study blocks + assignment deadlines in a planner</p>
                <p><strong>Best pick:</strong> Notion for notes + GoalPlanner for study planning</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><span className="text-2xl">💼</span> Professional</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Goal:</strong> Lead a project to completion</p>
                <p><strong>Notes:</strong> Meeting notes + action items</p>
                <p><strong>Plan:</strong> Weekly priorities + daily next actions</p>
                <p><strong>Best pick:</strong> Evernote for archiving + GoalPlanner for weekly planning</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><span className="text-2xl">🏠</span> Busy Parent</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Goal:</strong> Stay on top of home + family tasks</p>
                <p><strong>Notes:</strong> Grocery lists, reminders</p>
                <p><strong>Plan:</strong> Daily priorities + routine tracking</p>
                <p><strong>Best pick:</strong> Keep for lists + GoalPlanner for daily routines</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Build Your Full System</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Daily Planning</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Turn notes into a daily schedule and priorities.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Task Management</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Manage tasks and to-dos that actually get done.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/todoist-alternatives">Todoist Alternatives →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Goals & Tracking</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set goals and track progress over time.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notes Are Only Half the Job</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              GoalPlanner (LifePlans) turns your notes into goals, weekly plans, and daily tasks — so you stop collecting ideas and start completing them. Free to start on web and mobile.
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

export default GoogleKeepAlternatives;
