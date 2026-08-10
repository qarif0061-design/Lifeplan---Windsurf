import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const NotionAlternatives = () => {
  const faqData = [
    {
      question: "Why do people switch from Notion?",
      answer: "Notion is incredibly flexible, and that flexibility has a cost. Common complaints: a steep learning curve, slow performance on large workspaces, constant feature changes, and a setup process that feels like building software instead of planning a day. Many people spend more time designing their Notion workspace than using it. Simpler alternatives let you capture a note or plan a day in seconds without assembling pages, databases, and views first."
    },
    {
      question: "Is there a free Notion alternative?",
      answer: "Yes. Notion's free plan is generous, but several alternatives are also free to start. GoalPlanner (LifePlans) is free to start and focuses on goals, daily planning, and tasks rather than databases. Obsidian is free for personal use with local notes. Apple Notes is free on Apple devices. Evernote and Todoist have free tiers. The right free alternative depends on whether you need a database tool or a planning tool."
    },
    {
      question: "What can I use instead of Notion for daily planning?",
      answer: "If you use Notion mainly to plan your day and track goals, a dedicated planner is faster and simpler. GoalPlanner gives you daily priorities, scheduled tasks, weekly plans, and goal tracking out of the box — no templates to build. TickTick combines tasks and a calendar. For a hybrid, Obsidian with a daily-note template gives flexibility like Notion but lives on your device. Choose by what you'll actually open daily: the tool you don't have to set up."
    },
    {
      question: "Is Notion good for task management?",
      answer: "Notion can manage tasks, but it's a general workspace, not a task manager first. You assemble task lists with databases, filters, and views, which is powerful once built and heavy to maintain. There are no built-in recurring reminders the way dedicated to-do apps have them, and notifications are limited. For most people's daily task management, a purpose-built app is faster to use and easier to stay consistent with."
    },
    {
      question: "How do I migrate my Notion pages to another app?",
      answer: "Notion can export workspaces as Markdown, HTML, or CSV. Markdown exports import cleanly into Obsidian, Logseq, and most note apps. For planning apps, export the page and re-enter only what's active. Migration is a great time to simplify: most Notion workspaces contain hundreds of pages you rarely open. Keep the 10% you actually use, and set up your new app around your real workflow, not a copy of the old one."
    },
    {
      question: "What's the best Notion alternative for students?",
      answer: "For students, the best alternative balances note-taking with study planning. Obsidian is popular for linked class notes that live locally. For students who need to plan study sessions, track assignment deadlines, and see weekly progress, a planner like GoalPlanner adds the structure Notion's blank canvas lacks. Many students use both: Obsidian for lecture notes, GoalPlanner for weekly study plans and deadlines."
    },
    {
      question: "Is Obsidian better than Notion?",
      answer: "'Better' depends on your needs. Obsidian is faster, private (notes live on your device), and great for linked, long-term knowledge — but it has no built-in collaboration and weaker database features. Notion is better for team wikis, databases, and browser-based access anywhere. If you feel Notion is slow or over-engineered for personal notes, Obsidian is a strong alternative. If you want to stop assembling tools and start planning days, a planner app fits better."
    },
    {
      question: "Can I use Notion and a planner together?",
      answer: "Yes — and many people do. Use Notion for knowledge work: class notes, research, wikis, and reference material. Use a planner for execution: daily priorities, tasks, weekly plans, and goal tracking. The trap is duplicating everything in both tools. Assign a clear job to each: Notion stores, the planner acts. If you find yourself rebuilding Notion instead of using it, replace it rather than adding another layer of setup."
    }
  ];

  const alternatives = [
    {
      name: "GoalPlanner (LifePlans)",
      bestFor: "Planning days, weeks & goals",
      rating: "Best for daily planning",
      pros: ["Ready-to-use daily/weekly planning", "Goal tracking and progress analytics", "Free to start", "Zero setup — no templates to build"],
      cons: ["Not a flexible database tool", "Not built for team wikis"],
    },
    {
      name: "Obsidian",
      bestFor: "Local, linked notes",
      rating: "Best for note-linking",
      pros: ["Private, local-first", "Fast on large vaults", "Powerful graph & plugins", "Free for personal use"],
      cons: ["No built-in collaboration", "Learning curve for plugins"],
    },
    {
      name: "Evernote",
      bestFor: "Search, clipping & scanning",
      rating: "Best for archiving",
      pros: ["Strong search", "Web clipper", "Document scanning"],
      cons: ["Paid plans get pricey", "Heavier app"],
    },
    {
      name: "Logseq",
      bestFor: "Outliner + knowledge graph",
      rating: "Best for structured thinking",
      pros: ["Outliner workflow", "Local-first", "Backlinks built in"],
      cons: ["Steep learning curve", "Smaller community"],
    },
  ];

  const comparison = [
    { feature: "Ready-to-use daily planner", notion: false, goalplanner: true },
    { feature: "Weekly planning built in", notion: false, goalplanner: true },
    { feature: "Goal tracking & analytics", notion: false, goalplanner: true },
    { feature: "Notes & wikis", notion: true, goalplanner: false },
    { feature: "Databases & views", notion: true, goalplanner: false },
    { feature: "Works without setup", notion: false, goalplanner: true },
    { feature: "Free to start", notion: true, goalplanner: true },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Notion Alternatives (2026): 7 Simpler Apps for Notes, Tasks & Planning | GoalPlanner"
        description="The best Notion alternatives in 2026 — simpler, faster apps for notes, tasks, and planning. Compare Notion vs Obsidian, Evernote, GoalPlanner, and more."
        canonicalPath="/notion-alternatives"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Notion Alternatives",
          url: "https://goalplanner.io/notion-alternatives",
          description: "A practical comparison of the best Notion alternatives for notes, tasks, and daily planning.",
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
            <Badge variant="secondary" className="w-fit">Notes & Planning</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Notion Alternatives (2026): Build Less, Get More Done
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Notion is powerful — and that's the problem for many people. The best Notion alternatives give you the notes, tasks, and planning you actually use, without spending hours building a workspace first.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Try GoalPlanner Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">Quick answer: the best Notion alternative</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Obsidian</strong> if you want a fast, private, linked notes app</li>
              <li>• <strong>Evernote</strong> if you clip articles and scan documents</li>
              <li>• <strong>GoalPlanner</strong> if your Notion is mostly plans, tasks, and goals — not a database</li>
            </ul>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">The Hidden Cost of "Anything Possible"</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">⚙️</span> Setup Trap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A blank canvas that can do everything invites you to build everything — and planning your day becomes a project of its own.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🐢</span> Slow at Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Large pages, many databases, and sync delays make Notion feel sluggish exactly when you're trying to move fast.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🔁</span> Constant Rebuilding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Features change, templates break, and you spend evenings re-organizing instead of executing. The tool becomes the hobby.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><span className="text-2xl">🧭</span> No Daily Direction</CardTitle>
              </CardContent>
              <CardContent>
                <p className="text-gray-600">Notion stores information; it doesn't tell you what to do today. Without a built-in daily plan, the "what now?" question stays open.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">The 4 Best Notion Alternatives (2026)</h2>
          <p className="text-lg text-gray-600">Rated for getting things done — not for assembling the perfect system.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {alternatives.map((alt, i) => (
              <Card key={i} className={i === 0 ? "border-blue-200 ring-2 ring-blue-100" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {i === 0 && <span className="text-2xl">👑</span>} {alt.name}
                    </CardTitle>
                    <Badge variant={i === 0 ? "default" : "secondary"} className="shrink-0">{alt.rating}</Badge>
                  </div>
                  <p className="text-sm text-gray-500"><strong>Best for:</strong> {alt.bestFor}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">Pros</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {alt.pros.map((p, j) => <li key={j}>✓ {p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-600 mb-1">Cons</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {alt.cons.map((c, j) => <li key={j}>✗ {c}</li>)}
                    </ul>
                  </div>
                  {i === 0 && (
                    <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                      <Link to="/auth">Try GoalPlanner Free</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Notion vs GoalPlanner: Feature Comparison</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Notion</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-600">GoalPlanner</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                    <td className="py-3.5 px-6 text-gray-700">{row.feature}</td>
                    <td className="py-3.5 px-6 text-center">{row.notion ? "✓" : "—"}</td>
                    <td className="py-3.5 px-6 text-center text-blue-600 font-medium">{row.goalplanner ? "✓" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Which Alternative Matches Your Job?</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Match the tool to the work</h3>
              <div className="space-y-3 text-blue-800">
                <p><strong>Class notes & research</strong> → Obsidian (local, linked) or Evernote (clipping, scanning).</p>
                <p><strong>Team wikis & shared databases</strong> → stay with Notion, or use its lighter competitor ClickUp.</p>
                <p><strong>Daily planning, goals & tasks</strong> → GoalPlanner. The job here is execution, and a purpose-built planner beats an assembled workspace.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">🎓 Student</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Notes:</strong> Obsidian or Notion</p>
                  <p><strong>Study plan:</strong> GoalPlanner weekly blocks</p>
                  <p><strong>Deadlines:</strong> Planner tasks with reminders</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">💼 Professional</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Reference:</strong> Evernote web clipper</p>
                  <p><strong>Weekly plan:</strong> GoalPlanner priorities</p>
                  <p><strong>Projects:</strong> Keep a dedicated project tool</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">🏠 Personal</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Lists:</strong> Keep or Apple Notes</p>
                  <p><strong>Daily routine:</strong> GoalPlanner check-ins</p>
                  <p><strong>Goals:</strong> Goal tracking with streaks</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Daily Planning</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan your day in minutes, not hours of setup.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Tasks & To-Dos</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Manage tasks that roll up into a weekly plan.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/todoist-alternatives">Todoist Alternatives →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Goals & Tracking</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Track progress and stay consistent over time.</p>
                <Button asChild variant="outline" className="w-full rounded-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You Don't Need a Bigger System — You Need a Simpler One</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              GoalPlanner (LifePlans) is ready to use the moment you open it: goals, weekly plans, daily priorities, and progress tracking — no assembly required. Free to start on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default NotionAlternatives;
