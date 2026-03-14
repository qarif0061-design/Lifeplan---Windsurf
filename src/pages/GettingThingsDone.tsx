import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const GettingThingsDone = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Getting Things Done (GTD) Method: David Allen Guide + Weekly System | Lifeplans"
        description="Learn the Getting Things Done method by David Allen and turn it into a weekly planning system: capture, clarify, organize, reflect, engage. Use Lifeplans to stay organized and get things done."
        canonicalPath="/getting-things-done"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Getting Things Done (GTD) Method",
          url: "https://goalplanner.io/getting-things-done",
          description:
            "Getting Things Done method by David Allen turned into a practical weekly planning system.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Getting Things Done (GTD)</h1>
          <p className="text-gray-600 text-lg">
            A practical guide to the Getting Things Done method (David Allen) — built into a weekly planning
            routine so you can take action and get things done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Try Lifeplans</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Browse Articles</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">What is the GTD method?</h2>
          <p className="text-gray-700 leading-relaxed">
            Getting Things Done is a productivity system popularized by David Allen (the Getting Things Done
            book). The core idea is simple: get tasks out of your head, clarify the next actions, and review
            weekly so you stay organized.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Capture</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Collect everything you need to do. Avoid “things get done” by luck — build a trusted system.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Clarify & organize</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Decide the next action, set a due date only when needed, and organize tasks into a weekly plan.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">GTD + weekly planning (the missing link)</h2>
          <p className="text-gray-700 leading-relaxed">
            Many people read the getting things done book and still struggle because they don’t convert it into
            a weekly planner routine. Weekly planning is where focus, time management, and consistency come
            from.
          </p>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900">Weekly review checklist</h3>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
              <li>Review open loops and projects</li>
              <li>Choose your weekly priorities (1–3)</li>
              <li>Time blocking for deep work and important tasks</li>
              <li>Track progress so motivation stays high</li>
              <li>Adjust the system, not your self-worth</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Keywords covered</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-2">
            <p className="text-gray-700">david allen getting things done</p>
            <p className="text-gray-700">getting things done book</p>
            <p className="text-gray-700">getting things done method</p>
            <p className="text-gray-700">getting things done allen david</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Related pages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Time management</h3>
              <p className="mt-2 text-gray-700">Time blocking, Pomodoro, and time management strategies.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/time-management">Open time management</Link>
              </Button>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">SMART goals</h3>
              <p className="mt-2 text-gray-700">SMART goals acronym + examples + templates.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/smart-goals">Open SMART goals</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default GettingThingsDone;
