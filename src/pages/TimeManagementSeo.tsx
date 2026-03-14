import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const TimeManagementSeo = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Time Management: Time Blocking, Planning Tools, and Daily Routine | Lifeplans"
        description="Time management that actually works: time blocking, Pomodoro, weekly planning, and daily planning templates. Use Lifeplans to stay organized, focus, and track progress."
        canonicalPath="/time-management"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Time Management",
          url: "https://goalplanner.io/time-management",
          description: "Time management strategies including time blocking and Pomodoro.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Time management</h1>
          <p className="text-gray-600 text-lg">
            Time management is easier when you plan weekly and execute daily. Use time blocking and simple
            routines to stay focused.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start time blocking</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/weekly-planning">Weekly planning</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Time blocking</h2>
          <p className="text-gray-700 leading-relaxed">
            Time blocking means scheduling your priorities before your day gets hijacked. It improves focus and
            reduces decision fatigue.
          </p>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Pick one outcome for the day</li>
              <li>Block 1–2 focus sessions</li>
              <li>Batch small tasks into one admin block</li>
              <li>Leave buffer time so the plan survives reality</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Pomodoro time management</h2>
          <p className="text-gray-700 leading-relaxed">
            Pomodoro helps when you feel unmotivated or distracted. Work in short sprints, then rest.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Default sprint</h3>
              <p className="mt-2 text-gray-700">25 minutes work + 5 minutes break.</p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">For deep work</h3>
              <p className="mt-2 text-gray-700">50 minutes work + 10 minutes break.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Keywords covered</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-2">
            <p className="text-gray-700">time management</p>
            <p className="text-gray-700">time management tools</p>
            <p className="text-gray-700">time management strategies</p>
            <p className="text-gray-700">time management skills</p>
            <p className="text-gray-700">time blocking</p>
            <p className="text-gray-700">pomodoro time management</p>
            <p className="text-gray-700">daily planning</p>
            <p className="text-gray-700">daily routine</p>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default TimeManagementSeo;
