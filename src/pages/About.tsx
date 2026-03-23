import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const About = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="About Lifeplans (Goal Planner) | GoalPlanner.io"
        description="Learn what Lifeplans is, who it’s for, and how our goal planning + weekly planning system helps you take action, stay consistent, and track progress."
        canonicalPath="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Lifeplans",
          url: "https://www.goalplanner.io/about",
          description:
            "About Lifeplans (Goal Planner): a practical goal planning and weekly planning system for staying consistent and tracking progress.",
        }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">About Lifeplans</h1>
          <p className="text-gray-600">
            Lifeplans is a goal planning and weekly planning system built to help you take action, stay consistent, and track progress
            without overthinking.
          </p>
        </div>

        <div className="space-y-6 text-gray-700">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">What we help you do</h2>
            <p>
              Most people don’t fail because they don’t want success — they fail because the plan is unclear, the next step isn’t
              obvious, and tracking is inconsistent. Lifeplans helps you build a simple system:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Turn big goals into weekly priorities and tasks</li>
              <li>Stay focused with simple routines and check-ins</li>
              <li>Track progress with metrics that actually matter</li>
              <li>Review weekly so you keep improving</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Who Lifeplans is for</h2>
            <p>
              Lifeplans is designed for students, professionals, and anyone who wants structure without complexity. If you want a clear
              weekly plan and a consistent routine, you’ll fit right in.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Our content approach</h2>
            <p>
              Our public guides are written to be practical: clear steps, real examples, and FAQs. We also keep pages organized so you
              can quickly find what you need.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Contact</h2>
            <p>
              If you have questions, feedback, or business inquiries, email us at <span className="font-semibold">info@goalplanner.io</span>{" "}
              or visit our contact page.
            </p>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default About;
