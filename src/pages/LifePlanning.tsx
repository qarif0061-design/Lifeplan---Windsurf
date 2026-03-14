import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const LifePlanning = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Life Planning: Plan Your Life, Take Action, Get Things Done | Lifeplans"
        description="Life planning made simple: set goals, build a weekly plan, track progress, and stay consistent. Take action and get things done with Lifeplans (Goal Planner - Lifeplans)."
        canonicalPath="/life-planning"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Life Planning",
          url: "https://goalplanner.io/life-planning",
          description:
            "Life planning made simple: set goals, build a weekly plan, track progress, and stay consistent.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Life planning</h1>
          <p className="text-gray-600 text-lg">
            A simple system to plan your life, take action, and get things done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Free</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Read Guides</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">What life planning means (in practice)</h2>
          <p className="text-gray-700 leading-relaxed">
            Life planning is not just writing goals. It’s choosing what matters, turning it into weekly actions,
            and tracking progress so you stay organized and consistent.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Plan week by week</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Weekly planning keeps your goals realistic. A week by week planner helps you pick priorities,
                schedule time blocks, and avoid overwhelm.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Stay organized & track progress</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Progress tracking makes motivation visible. Update your goal progress weekly and use daily
                routine check-ins to protect consistency.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Core keywords we cover</h2>
          <p className="text-gray-700 leading-relaxed">
            These topics match how people search for life planning and goal planning systems.
          </p>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Life planning & execution</h3>
                <p className="mt-2 text-gray-700">life planning, take action, get things done</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Organization & progress</h3>
                <p className="mt-2 text-gray-700">stay organized, track progress, focus, consistency</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Next steps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Getting Things Done</h3>
              <p className="mt-2 text-gray-700">Learn the GTD method and how to apply it in a weekly plan.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/getting-things-done">Open GTD page</Link>
              </Button>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Weekly planning</h3>
              <p className="mt-2 text-gray-700">Build a weekly planner system that you can repeat.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/weekly-planning">Open weekly planning</Link>
              </Button>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Time management</h3>
              <p className="mt-2 text-gray-700">Time blocking and planning tools that support execution.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/time-management">Open time management</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <p className="text-xs text-gray-500">
            Note: “Great West Life” is a separate brand. If you were looking for financial services, you may not
            be looking for a goal planner.
          </p>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default LifePlanning;
