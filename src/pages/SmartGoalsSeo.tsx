import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const SmartGoalsSeo = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="SMART Goals: Acronym, Examples, Templates, and Framework | Lifeplans"
        description="SMART goals explained: SMART goals acronym, criteria, examples, templates, and a SMART framework for goal setting. Use Lifeplans to plan weekly and track progress."
        canonicalPath="/smart-goals"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SMART Goals",
          url: "https://goalplanner.io/smart-goals",
          description: "SMART goals acronym, examples, templates, and framework for goal setting.",
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
          <h2 className="text-2xl font-bold text-gray-900">Keywords covered</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm space-y-2">
            <p className="text-gray-700">smart goals</p>
            <p className="text-gray-700">smart method goals</p>
            <p className="text-gray-700">objective smart goals</p>
            <p className="text-gray-700">smart criteria for goals</p>
            <p className="text-gray-700">smart objectives</p>
            <p className="text-gray-700">smart goal templates</p>
            <p className="text-gray-700">smart goals examples</p>
            <p className="text-gray-700">smart goal framework</p>
            <p className="text-gray-700">smart goals explained</p>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default SmartGoalsSeo;
