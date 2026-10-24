import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <Layout>
      <Seo
        title="Disclaimer | Goal Planner - Lifeplans"
        description="Goal Planner – Lifeplans articles and tools are general information, not professional advice. Read how we create content, how ads work on this site and our liability limits."
        canonicalPath="/disclaimer"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-display font-bold text-foreground">Disclaimer</h1>
        <p className="text-muted-foreground">Last updated: October 24, 2026</p>

        <div className="space-y-4 text-foreground/80">
          <h2 className="text-xl font-display font-bold text-foreground">1. General information only</h2>
          <p>
            The articles, examples, templates and tools on goalplanner.io (Goal Planner – Lifeplans) are provided for general
            information and educational purposes. They are not professional advice. Nothing on this website is medical,
            mental health, financial, legal, career or educational advice, and it should not replace advice from a qualified
            professional who knows your situation.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">2. Examples are illustrations</h2>
          <p>
            SMART goal examples, targets and numbers in our articles are illustrations. Adjust them to your own role,
            workload, employer policies and circumstances before you use them. Results depend on many factors, and we do not
            promise any particular outcome from following a guide or using the app.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">3. How our content is made</h2>
          <p>
            Articles are written and reviewed by the{" "}
            <Link to="/about#editorial-team" className="text-primary underline">Lifeplans Editorial Team</Link>. Each article
            shows its publish and update dates. We review and update content regularly, but information can become out of date.
            If you find a mistake, email <a href="mailto:info@goalplanner.io" className="text-primary underline">info@goalplanner.io</a>.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">4. Advertising</h2>
          <p>
            This website shows ads served by Google AdSense, which helps keep our articles free. Ads are clearly separate from
            our content, and advertisers do not review or approve what we write. Mentions of third-party apps or products are
            our own opinion and are not paid endorsements unless we clearly say so. See our{" "}
            <Link to="/privacy" className="text-primary underline">Privacy Policy</Link> for how advertising cookies work.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">5. External links</h2>
          <p>
            Some pages link to other websites. We do not control those websites and are not responsible for their content,
            availability or privacy practices.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">6. Limitation of liability</h2>
          <p>
            You use the information and tools on this website at your own risk. To the extent allowed by law, Goal Planner –
            Lifeplans is not liable for any loss or damage arising from your use of, or reliance on, this website. Use of the
            app itself is covered by our <Link to="/terms" className="text-primary underline">Terms of Service</Link>.
          </p>

          <h2 className="text-xl font-display font-bold text-foreground">7. Contact</h2>
          <p>
            Questions about this disclaimer? Email{" "}
            <a href="mailto:info@goalplanner.io" className="text-primary underline">info@goalplanner.io</a> or visit our{" "}
            <Link to="/contact" className="text-primary underline">contact page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;
