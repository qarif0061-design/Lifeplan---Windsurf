import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const SmartGoalsSeo = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="SMART Goals: Free Template & Examples for 2026 | GoalPlanner"
        description="Free SMART goals template with real examples for work, students, managers & more. Learn the SMART acronym and start setting goals you'll actually achieve."
        canonicalPath="/smart-goals"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SMART Goals: Free Template & Examples",
          url: "https://goalplanner.io/smart-goals",
          description: "Free SMART goals template with real examples for work, students, managers and more.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">SMART goals</h1>
          <p className="text-gray-600 text-lg">
            A clear SMART goal turns intention into execution. Use the SMART criteria to set goals that you can
            actually track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Create a SMART goal</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles/smart-goals-examples">SMART goals examples</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">SMART goals acronym</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Specific</li>
              <li>Measurable</li>
              <li>Achievable</li>
              <li>Relevant</li>
              <li>Time-bound</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">SMART goal templates</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Template</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                I will [specific outcome] measured by [metric] by [date], by doing [weekly actions].
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Weekly breakdown</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                A SMART framework works best with weekly planning. Convert the goal into 1–3 weekly priorities
                and track progress weekly.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">SMART goals examples for different areas of life</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Career SMART goal</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                <strong>Not SMART:</strong> "Get better at my job"<br />
                <strong>SMART:</strong> "Complete the Project Management certification course by June 30, 
                and apply the frameworks to lead the Q3 product launch, measured by on-time delivery 
                and team feedback scores."
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Health SMART goal</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                <strong>Not SMART:</strong> "Exercise more"<br />
                <strong>SMART:</strong> "Run 3 times per week (Monday, Wednesday, Friday mornings) for 
                30 minutes each session, tracking distance and pace in the app, with a target of 
                completing a 5K race by October 15."
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Financial SMART goal</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                <strong>Not SMART:</strong> "Save money"<br />
                <strong>SMART:</strong> "Save $5,000 for an emergency fund by December 31 by transferring 
                $417 monthly to a high-yield savings account, starting this month, and tracking progress 
                weekly in my budget app."
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Learning SMART goal</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                <strong>Not SMART:</strong> "Learn Spanish"<br />
                <strong>SMART:</strong> "Complete the intermediate Spanish course (30 lessons) by August 31, 
                practicing 20 minutes daily using the app, and hold a 10-minute conversation with a 
                native speaker by September 30."
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">How to turn SMART goals into weekly actions</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              Setting a SMART goal is just the beginning. The real progress happens when you break it down 
              into weekly priorities and daily tasks. Here's how to bridge the gap between your big goal 
              and your daily actions:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li>
                <strong>Divide your goal into milestones.</strong> If your goal is 6 months out, 
                what should be accomplished each month? What about each week?
              </li>
              <li>
                <strong>Set weekly priorities.</strong> Each week, choose 1-3 priorities that move 
                your SMART goal forward. These should be specific outcomes, not just "work on goal."
              </li>
              <li>
                <strong>Create startable tasks.</strong> Break each priority into 3-7 tasks that 
                take 15-60 minutes each. Make them so clear you could hand them to someone else.
              </li>
              <li>
                <strong>Schedule time blocks.</strong> Put your priority tasks on your calendar. 
                If they're not scheduled, they won't happen.
              </li>
              <li>
                <strong>Review and adjust weekly.</strong> Every Friday, review what worked and 
                what didn't. Adjust your approach for next week based on what you learned.
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Common SMART goal mistakes and how to fix them</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-gray-900">Mistake: Making it too complex</h3>
              <p className="text-gray-700 mt-1">
                <strong>Fix:</strong> Keep your SMART goal statement to 1-2 sentences. If you need a paragraph 
                to explain it, it's probably too complicated. Simplify.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-gray-900">Mistake: Ignoring the Relevant criteria</h3>
              <p className="text-gray-700 mt-1">
                <strong>Fix:</strong> Ask yourself "Why does this matter?" and "Is this the right time?" 
                A goal that doesn't connect to your broader life direction will lose momentum quickly.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-gray-900">Mistake: Setting the deadline too far out</h3>
              <p className="text-gray-700 mt-1">
                <strong>Fix:</strong> While some goals need months, try to create 30-90 day versions first. 
                Momentum comes from seeing progress quickly.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-bold text-gray-900">Mistake: No tracking system</h3>
              <p className="text-gray-700 mt-1">
                <strong>Fix:</strong> Define exactly how you'll measure progress from day one. Use a journal, 
                app, or spreadsheet—but have a system.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Create your first SMART goal today</h2>
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              The SMART framework isn't just an acronym—it's a practical tool for turning vague intentions 
              into achievable outcomes. Whether you're setting career goals, health goals, financial goals, 
              or learning goals, the SMART criteria help you clarify what you want and how you'll get there.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Start with one goal. Make it Specific, Measurable, Achievable, Relevant, and Time-bound. 
              Then break it down into weekly priorities and daily tasks using a simple planner system.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lifeplans helps you set SMART goals, break them into weekly plans, track your progress, 
              and review what works. Start with our free tier to create your first goal and see how 
              weekly planning transforms your approach.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Create a SMART goal</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/articles">Read more goal setting guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default SmartGoalsSeo;
