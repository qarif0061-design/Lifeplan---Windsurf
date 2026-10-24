import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const Download = () => {
  return (
    <Layout>
      <Seo
        title="Goal Planner - Lifeplans"
        description="Download the Lifeplans goal planner app for iPhone and Android. Plan goals, build weekly plans and track daily progress on the go, synced with the web app."
        canonicalPath="/download"
      />
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Get the Mobile App</h1>
          <p className="text-muted-foreground">Plan on the go with Lifeplans.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-2">iOS</h2>
            <p className="text-muted-foreground mb-6">Download from the App Store.</p>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
              <a
                href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on App Store
              </a>
            </Button>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-2">Android</h2>
            <p className="text-muted-foreground mb-6">Download on Google Play.</p>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
              <a
                href="https://play.google.com/store/apps/details?id=com.faran.lifeplans"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download on Google Play
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm space-y-4 text-foreground/80">
          <h2 className="text-xl font-bold text-foreground">What you can do in the Lifeplans app</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create goals with a deadline, a reason why, and a clear measure of success</li>
            <li>Turn each goal into a weekly plan with priorities and tasks</li>
            <li>Log a quick daily check-in and keep your streak going</li>
            <li>See progress for every goal at a glance</li>
          </ul>
          <p>
            The app uses the same account as the web version at goalplanner.io, so goals and plans you create on your phone
            are also available in your browser. You can start for free and upgrade later if you want Premium features; see{" "}
            <a href="/pricing" className="text-primary underline">pricing</a> for details.
          </p>
          <p>
            Need help installing or signing in? Email <a href="mailto:info@goalplanner.io" className="text-primary underline">info@goalplanner.io</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Download;
