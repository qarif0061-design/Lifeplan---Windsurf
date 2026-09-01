import Layout from "@/components/Layout";

const RefundPolicy = () => {
  return (
    <Layout>
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

          <h2 className="text-xl font-display font-bold text-foreground">3. How to request a refund</h2>
          <p>
            Email <span className="font-semibold">info@goalplanner.io</span> with:
          </p>
          <div className="space-y-2">
            <p>- Your account email</p>
            <p>- The date of purchase</p>
            <p>- A short description of the issue</p>
          </div>

          <h2 className="text-xl font-display font-bold text-foreground">4. Contact</h2>
          <p>
            For billing questions, contact <span className="font-semibold">info@goalplanner.io</span>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
