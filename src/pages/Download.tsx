import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Download = () => {
  return (
    <Layout>
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
      </div>
    </Layout>
  );
};

export default Download;
