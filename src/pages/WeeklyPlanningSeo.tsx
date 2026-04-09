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
          <h2 className="text-2xl font-bold text-gray-900">How to build a sustainable weekly planning habit</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              The best weekly planner is the one you'll actually use. Start small: pick one day per week (Sunday evening or Monday morning) 
              to plan. Spend 15-20 minutes reviewing last week, setting 1-3 priorities for the coming week, and scheduling time blocks 
              for your most important work.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Weekly planning checklist</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Review last week's completed tasks and unfinished items</li>
              <li>Check your calendar for meetings, deadlines, and commitments</li>
              <li>Identify your most important goal for this week</li>
              <li>Choose 1-3 weekly priorities that move that goal forward</li>
              <li>Break priorities into specific, startable tasks</li>
              <li>Time block 2-3 hours for deep work on priorities</li>
              <li>Schedule buffer time for unexpected tasks</li>
              <li>Set up daily reminders or check-ins</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Common weekly planning mistakes to avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Overplanning</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Trying to schedule every minute creates rigidity. Leave 30-40% of your week unscheduled for 
                flexibility, emergencies, and creative work.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">No time blocking</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Lists without time commitments rarely get done. If it's not on your calendar, 
                it probably won't happen. Block specific times for priorities.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Vague priorities</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                "Work on project" isn't actionable. "Draft project outline and email team for feedback" 
                is a priority you can actually execute.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Skipping the review</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Without weekly reviews, you lose the learning loop. Spend 10 minutes Friday 
                reflecting on what worked and what to adjust next week.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Start your week by week planning today</h2>
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              The best week by week planner combines simple structure with consistent execution. 
              Whether you prefer digital tools or paper planners, the principles remain the same: 
              clear priorities, time blocking, daily check-ins, and weekly reviews.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lifeplans makes weekly planning easier with built-in templates, priority tracking, 
              task management, and progress analytics. Start with our free tier and upgrade 
              when you're ready for unlimited goals and advanced features.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Start planning your week</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/articles">Read more planning guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default WeeklyPlanningSeo;
