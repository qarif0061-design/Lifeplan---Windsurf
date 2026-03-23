import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const Contact = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Contact Lifeplans | GoalPlanner.io"
        description="Contact Lifeplans (Goal Planner). For support and inquiries, email info@goalplanner.io or reach us on our official social channels."
        canonicalPath="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Lifeplans",
          url: "https://www.goalplanner.io/contact",
          description: "Contact Lifeplans for support and inquiries.",
        }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
          <p className="text-gray-600">
            Need help, want to share feedback, or have a partnership request? You can contact us using the details below.
          </p>
        </div>

        <div className="space-y-6 text-gray-700">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Email</h2>
            <p>
              <span className="font-semibold">info@goalplanner.io</span>
            </p>
            <p className="text-gray-600">
              We usually reply within 1–2 business days.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Social</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Facebook: <a className="text-blue-600 underline" href="https://www.facebook.com/goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.facebook.com/goalplannerlifeplans</a>
              </li>
              <li>
                Instagram: <a className="text-blue-600 underline" href="https://www.instagram.com/goalplannerlifeplans/" target="_blank" rel="noreferrer">https://www.instagram.com/goalplannerlifeplans/</a>
              </li>
              <li>
                LinkedIn: <a className="text-blue-600 underline" href="https://www.linkedin.com/company/goal-planner-lifeplans/" target="_blank" rel="noreferrer">https://www.linkedin.com/company/goal-planner-lifeplans/</a>
              </li>
              <li>
                YouTube: <a className="text-blue-600 underline" href="https://www.youtube.com/@goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.youtube.com/@goalplannerlifeplans</a>
              </li>
              <li>
                TikTok: <a className="text-blue-600 underline" href="https://www.tiktok.com/@goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.tiktok.com/@goalplannerlifeplans</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">App support</h2>
            <p>
              If you’re contacting us about a subscription, billing, or an account issue, please include your account email address so
              we can help faster.
            </p>
          </div>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default Contact;
