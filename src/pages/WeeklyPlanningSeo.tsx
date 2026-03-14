import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const WeeklyPlanningSeo = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Weekly Planning: Week by Week Planner + Weekly Plan Template | Lifeplans"
        description="Weekly planning made practical: build a week by week planner, choose weekly priorities, time block your calendar, and track progress. Includes weekly planner templates and weekly meal planning tips."
        canonicalPath="/weekly-planning"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Weekly Planning",
          url: "https://goalplanner.io/weekly-planning",
          description: "Weekly planning templates and a week-by-week planner system.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Weekly planning</h1>
          <p className="text-gray-600 text-lg">
            Weekly planning is where goals become real. Build a weekly planner routine that you can repeat every
            week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Plan your week in Lifeplans</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles/weekly-planning-template-lifeplans">Weekly planning template</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Week by week planner: the simple structure</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Pick 1–3 weekly priorities</li>
              <li>Write 3–7 startable tasks</li>
              <li>Schedule time blocks (time management + focus)</li>
              <li>Track progress weekly</li>
              <li>Weekly review: adjust and repeat</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Weekly planner with meal planning</h2>
          <p className="text-gray-700 leading-relaxed">
            If your week falls apart because of food decisions, add a light meal plan. A weekly planner with meal
            planning can improve energy, consistency, and time management.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Week food planner</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Choose 5–7 repeatable meals, make a grocery list, and block one prep session. Keep it simple.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Execution tip</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Put meal prep on the calendar. Plans without time blocks don’t happen.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Keywords covered</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-2">
            <p className="text-gray-700">week planning</p>
            <p className="text-gray-700">week by week planner</p>
            <p className="text-gray-700">weekly planner with meal planning</p>
            <p className="text-gray-700">week food planner</p>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default WeeklyPlanningSeo;
