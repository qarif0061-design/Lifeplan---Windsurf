import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const MotivationQuotesSeo = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Motivation, Mindset, and Inspirational Quotes (Daily Routine) | Lifeplans"
        description="Motivation and mindset are easier when your plan is clear. Explore inspirational quotes, positive quotes, quote of the day ideas, and a simple daily routine to stay consistent with your goals."
        canonicalPath="/motivation"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Motivation and Inspirational Quotes",
          url: "https://goalplanner.io/motivation",
          description: "Motivation, mindset, and inspirational quotes for consistency and goal progress.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Motivation & mindset</h1>
          <p className="text-gray-600 text-lg">
            Motivation is not a personality trait — it’s a result of clarity, progress, and a repeatable weekly
            plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start tracking progress</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Read motivation guides</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">A daily routine that builds consistency</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Review your weekly priorities (1 minute)</li>
              <li>Do one small next action (10–30 minutes)</li>
              <li>Daily check-in: mark progress and write one note</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Inspirational quotes (use them correctly)</h2>
          <p className="text-gray-700 leading-relaxed">
            Inspirational quotes can help you reset your mindset, but the real growth mindset comes from weekly
            planning and honest progress tracking.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Quote of the day motivation</h3>
              <p className="mt-2 text-gray-700">
                Pick one quote, then pick one action. Don’t scroll for an hour.
              </p>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">Good morning motivation quotes</h3>
              <p className="mt-2 text-gray-700">
                Use them as a trigger for your routine: plan, focus block, check-in.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Keywords covered</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-2">
            <p className="text-gray-700">motivation</p>
            <p className="text-gray-700">mindset</p>
            <p className="text-gray-700">growth mindset</p>
            <p className="text-gray-700">positive quotes</p>
            <p className="text-gray-700">inspirational quotes about life</p>
            <p className="text-gray-700">inspirational quotes for work</p>
            <p className="text-gray-700">success quotes</p>
            <p className="text-gray-700">thought of the day</p>
            <p className="text-gray-700">good morning quotes inspirational</p>
            <p className="text-gray-700">monday motivation</p>
            <p className="text-gray-700">focus quotes</p>
            <p className="text-gray-700">words of encouragement</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Related pages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Life planning</h3>
              <p className="mt-2 text-gray-700">Plan your life week by week and track progress.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/life-planning">Open life planning</Link>
              </Button>
            </div>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Time management</h3>
              <p className="mt-2 text-gray-700">Time blocking and planning tools.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/time-management">Open time management</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default MotivationQuotesSeo;
