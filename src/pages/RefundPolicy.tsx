import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <Layout>
      <Seo
        title="Refund Policy | Goal Planner - Lifeplans"
        description="When Goal Planner – Lifeplans refunds a subscription (billing errors and technical problems that block Premium), how to request one, and how app store purchases are handled."
        canonicalPath="/refund"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Refund Policy</h1>
        <p className="text-muted-foreground">
          This Refund Policy applies to subscriptions and purchases for Goal Planner - Lifeplans.
        </p>

        <div className="space-y-4 text-foreground/80">
          <h2 className="text-xl font-display font-bold text-foreground">1. Digital service</h2>
          <p>
            Goal Planner - Lifeplans is a pre-made digital product (software) that is available instantly after purchase. We do not
            offer consultations, coaching, or custom deliverables.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">2. Refund eligibility</h2>
          <p>
            If you believe you were billed in error or experienced a technical issue that prevented you from accessing Premium
            features, please contact us and we will review your request.
          </p>

          <p>
            We do not offer an automatic money-back guarantee. Each request is reviewed individually, and approved refunds
            are returned to the original payment method.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">3. App store purchases</h2>
          <p>
            Subscriptions bought through the Apple App Store or Google Play are billed by Apple or Google. Refunds for those
            purchases must be requested from the store, under its own refund rules.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">4. How to request a refund</h2>
          <p>
            Email <span className="font-semibold">info@goalplanner.io</span> with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your account email</li>
            <li>The date of purchase</li>
            <li>A short description of the issue</li>
          </ul>
          <p>We typically respond within 24-48 hours on business days.</p>

          <h2 className="text-xl font-display font-bold text-foreground">5. Contact</h2>
          <p>
            For billing questions, contact <span className="font-semibold">info@goalplanner.io</span> or use our{" "}
            <Link to="/contact" className="text-primary underline">contact page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
