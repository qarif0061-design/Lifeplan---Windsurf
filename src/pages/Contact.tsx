import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const Contact = () => {
  return (
    <PublicPageLayout>
      <Seo
        title="Contact Goal Planner Lifeplans | Support & Inquiries | GoalPlanner.io"
        description="Contact Goal Planner – Lifeplans for support, feedback, and inquiries. Email us at shumailasahervu@gmail.com. Response within 24-48 hours."
        canonicalPath="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Goal Planner Lifeplans",
          url: "https://goalplanner.io/contact",
          description: "Contact Goal Planner – Lifeplans for support and inquiries.",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Whether you have questions, feedback, or need support with Goal Planner – Lifeplans, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600">For general inquiries, technical support, or feedback:</p>
                <a href="mailto:shumailasahervu@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  shumailasahervu@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600">We typically respond within 24-48 hours during business days.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM (UTC+05:00)</p>
                <p className="text-gray-600">Weekend: Limited support</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Links</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Topics</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-blue-600 hover:text-blue-700">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/refund" className="text-blue-600 hover:text-blue-700">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-blue-600 hover:text-blue-700">
                      Pricing & Plans
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/goal-planner" className="text-blue-600 hover:text-blue-700">
                      Getting Started Guide
                    </a>
                  </li>
                  <li>
                    <a href="/productivity" className="text-blue-600 hover:text-blue-700">
                      Productivity Tips
                    </a>
                  </li>
                  <li>
                    <a href="/time-management" className="text-blue-600 hover:text-blue-700">
                      Time Management Strategies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How do I get started with Goal Planner?</h3>
              <p className="text-gray-600">Simply sign up for a free account, and you'll have access to our goal planning tools. Check out our getting started guide for step-by-step instructions.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for more details.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 14-day money-back guarantee for new subscriptions. Please review our Refund Policy for complete details.</p>
            </div>
          </div>
        </section>

        <div className="space-y-6 text-gray-700">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Social Media</h2>
            <p className="text-gray-600">Follow us for updates, tips, and community support:</p>
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
            <h2 className="text-2xl font-bold text-gray-900">App Support</h2>
            <p>
              If you're contacting us about a subscription, billing, or an account issue, please include your account email address so we can help faster.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">About Goal Planner – Lifeplans</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              Goal Planner – Lifeplans is a comprehensive goal planning and productivity platform designed to help you achieve your most important objectives. 
              Our mission is to provide the tools and guidance you need to transform your aspirations into actionable plans and measurable progress.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Whether you're planning personal goals, professional objectives, or academic achievements, our platform provides the structure, 
              accountability, and insights you need to succeed.
            </p>
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default Contact;
