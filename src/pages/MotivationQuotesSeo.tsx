import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const MotivationQuotesSeo = () => {
  const { openAuthModal } = useAuthModal();
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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">Motivation & mindset</h1>
          <p className="text-muted-foreground text-lg">
            Motivation is not a personality trait — it’s a result of clarity, progress, and a repeatable weekly
            plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start tracking progress
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Read motivation guides</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">A daily routine that builds consistency</h2>
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
              <li>Review your weekly priorities (1 minute)</li>
              <li>Do one small next action (10–30 minutes)</li>
              <li>Daily check-in: mark progress and write one note</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Inspirational quotes (use them correctly)</h2>
          <p className="text-foreground/80 leading-relaxed">
            Inspirational quotes can help you reset your mindset, but the real growth mindset comes from weekly
            planning and honest progress tracking.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">Quote of the day motivation</h3>
              <p className="mt-2 text-foreground/80">
                Pick one quote, then pick one action. Don’t scroll for an hour.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
              <h3 className="text-xl font-bold text-foreground">Good morning motivation quotes</h3>
              <p className="mt-2 text-foreground/80">
                Use them as a trigger for your routine: plan, focus block, check-in.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Building sustainable motivation through systems</h2>
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Motivation isn't something you wait for—it's something you build through consistent systems.
              While inspirational quotes can provide a momentary boost, lasting motivation comes from
              clarity, progress, and repeatable routines.
            </p>
            <h3 className="text-xl font-bold text-foreground mb-3">The motivation system framework</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground">1. Clarity</h4>
                <p className="text-foreground/80 text-sm">
                  Know exactly what you're working toward and why it matters. Vague goals create vague motivation.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground">2. Progress</h4>
                <p className="text-foreground/80 text-sm">
                  Nothing sustains motivation like seeing progress. Track your wins, no matter how small.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-foreground">3. Routine</h4>
                <p className="text-foreground/80 text-sm">
                  Motivation follows action, not the other way around. Build routines that make starting automatic.
                </p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              When you have all three—clear goals, visible progress, and consistent routines—motivation
              becomes a byproduct rather than a prerequisite.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Growth mindset vs. fixed mindset in practice</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-red-100 bg-red-50 p-7 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-3">Fixed mindset patterns</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>"I'm just not good at this"</li>
                <li>Avoiding challenges to prevent failure</li>
                <li>Giving up when things get hard</li>
                <li>Seeing effort as a sign of weakness</li>
                <li>Ignoring useful feedback</li>
                <li>Feeling threatened by others' success</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-momentum/20 bg-momentum/10 p-7 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-3">Growth mindset patterns</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>"I can improve with practice"</li>
                <li>Embracing challenges as opportunities</li>
                <li>Persisting through setbacks</li>
                <li>Seeing effort as the path to mastery</li>
                <li>Learning from criticism and feedback</li>
                <li>Being inspired by others' success</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Related pages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Life planning</h3>
              <p className="mt-2 text-foreground/80">Plan your life week by week and track progress.</p>
              <Button asChild variant="outline" className="mt-4 rounded-full">
                <Link to="/life-planning">Open life planning</Link>
              </Button>
            </div>
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Time management</h3>
              <p className="mt-2 text-foreground/80">Time blocking and planning tools.</p>
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
