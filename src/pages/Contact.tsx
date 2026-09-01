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
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you! Whether you have questions, feedback, or need support with Goal Planner – Lifeplans, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
            
            <div className="bg-secondary/40 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
                <p className="text-muted-foreground">For general inquiries, technical support, or feedback:</p>
                <a href="mailto:shumailasahervu@gmail.com" className="text-primary hover:text-primary/80 font-medium">
                  shumailasahervu@gmail.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground">We typically respond within 24-48 hours during business days.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (UTC+05:00)</p>
                <p className="text-muted-foreground">Weekend: Limited support</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Quick Links</h2>
            
            <div className="bg-secondary/40 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Common Topics</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/privacy" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/refund" className="text-primary hover:text-primary/80">
                      Refund Policy
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-primary hover:text-primary/80">
                      Pricing & Plans
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Help Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/goal-planner" className="text-primary hover:text-primary/80">
                      Getting Started Guide
                    </a>
                  </li>
                  <li>
                    <a href="/productivity" className="text-primary hover:text-primary/80">
                      Productivity Tips
                    </a>
                  </li>
                  <li>
                    <a href="/time-management" className="text-primary hover:text-primary/80">
                      Time Management Strategies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">How do I get started with Goal Planner?</h3>
              <p className="text-muted-foreground">Simply sign up for a free account, and you'll have access to our goal planning tools. Check out our getting started guide for step-by-step instructions.</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Is my data secure?</h3>
              <p className="text-muted-foreground">Yes, we use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for more details.</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Do you offer refunds?</h3>
              <p className="text-muted-foreground">We offer a 14-day money-back guarantee for new subscriptions. Please review our Refund Policy for complete details.</p>
            </div>
          </div>
        </section>

        <div className="space-y-6 text-foreground/80">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Social Media</h2>
            <p className="text-muted-foreground">Follow us for updates, tips, and community support:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Facebook: <a className="text-primary underline" href="https://www.facebook.com/goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.facebook.com/goalplannerlifeplans</a>
              </li>
              <li>
                Instagram: <a className="text-primary underline" href="https://www.instagram.com/goalplannerlifeplans/" target="_blank" rel="noreferrer">https://www.instagram.com/goalplannerlifeplans/</a>
              </li>
              <li>
                LinkedIn: <a className="text-primary underline" href="https://www.linkedin.com/company/goal-planner-lifeplans/" target="_blank" rel="noreferrer">https://www.linkedin.com/company/goal-planner-lifeplans/</a>
              </li>
              <li>
                YouTube: <a className="text-primary underline" href="https://www.youtube.com/@goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.youtube.com/@goalplannerlifeplans</a>
              </li>
              <li>
                TikTok: <a className="text-primary underline" href="https://www.tiktok.com/@goalplannerlifeplans" target="_blank" rel="noreferrer">https://www.tiktok.com/@goalplannerlifeplans</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">App Support</h2>
            <p>
              If you're contacting us about a subscription, billing, or an account issue, please include your account email address so we can help faster.
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">About Goal Planner – Lifeplans</h2>
          
          <div className="bg-primary/10 p-6 rounded-lg">
            <p className="text-foreground/80 leading-relaxed">
              Goal Planner – Lifeplans is a comprehensive goal planning and productivity platform designed to help you achieve your most important objectives. 
              Our mission is to provide the tools and guidance you need to transform your aspirations into actionable plans and measurable progress.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
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
