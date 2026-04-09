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
            <h2 className="text-xl font-bold text-gray-900">The Lifeplans story</h2>
            <p>
              Lifeplans was built out of frustration with overly complex productivity systems. We noticed that most goal-setting 
              tools asked users to spend hours configuring before doing any actual work. Our approach is different: start with one 
              goal, spend 10 minutes on strategy, and begin making progress immediately.
            </p>
            <p>
              The system combines insights from behavioral psychology, agile project management, and habit research. The result 
              is a tool that's powerful enough for complex goals but simple enough for daily use.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Our commitment to privacy</h2>
            <p>
              Your goals and personal data are yours. We don't sell user data to third parties, and we minimize data collection 
              to only what's necessary for the app to function. Your goals, notes, and progress stay private to your account.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Get in touch</h2>
            <p>
              Have questions, feedback, or suggestions? We'd love to hear from you. Reach out through our{' '}
              <a href="/contact" className="text-blue-600 hover:underline">contact page</a> or email us directly. 
              We read every message and use feedback to improve Lifeplans for everyone.
            </p>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Start using Lifeplans today</h2>
            <p className="mb-4">
              Whether you're a student, professional, entrepreneur, or anyone with goals to achieve, Lifeplans can help you 
              stay organized and make consistent progress.
            </p>
            <a 
              href="/auth" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Get started for free
            </a>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default About;
