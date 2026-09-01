import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const OnlineGoalPlanner = () => {
  const { openAuthModal } = useAuthModal();
  return (
    <>
      <Seo
        title="GoalPath: Free Online Goal Planner — Set & Track Goals"
        description="The best free online goal planner. Set SMART goals, build weekly plans with AI, and track daily progress. No download needed — start free in seconds."
        canonicalPath="/online-goal-planner"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-blue-100">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              The Free Online Goal Planner That Actually Works
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 mb-6">
              Plan your goals. Track your progress. All in your browser.
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Set goals, plan your week with AI, and track daily progress — all in your browser. No app needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openAuthModal({ intent: "signup" })}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg"
              >
                Start Planning Free →
              </button>
              <Link
                to="/download"
                className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-semibold rounded-full hover:bg-secondary/40 transition-colors shadow-lg border border-border"
              >
                Download the app →
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Create your goal</h3>
                <p className="text-muted-foreground">Set SMART goals with strategy built in</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-ember/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-ember">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Plan your week</h3>
                <p className="text-muted-foreground">AI builds your weekly schedule automatically</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-momentum/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-momentum">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Track daily</h3>
                <p className="text-muted-foreground">Check in every day and watch progress grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Smart Planning</h3>
                <p className="text-muted-foreground">Let AI build your weekly plans automatically</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Daily Planner & Journal</h3>
                <p className="text-muted-foreground">Plan your day and reflect on your progress</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Weekly PDCA Review</h3>
                <p className="text-muted-foreground">Plan, Do, Check, Act cycle for continuous improvement</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Goal Strategy Framework</h3>
                <p className="text-muted-foreground">Build strategy into every goal you set</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Progress Insights</h3>
                <p className="text-muted-foreground">Visualize your progress with detailed analytics</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Works on web, iOS, and Android</h3>
                <p className="text-muted-foreground">Access your goals from any device</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Take it with you — available on iOS and Android
            </h2>
            <p className="text-muted-foreground mb-8">Download the app to track your goals on the go</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com/app/goalpath"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.goalpath"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Get it on Google Play
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Is GoalPath really free?</h3>
                <p className="text-muted-foreground">
                  Yes — create up to 3 goals free forever. Premium unlocks unlimited goals, AI planning, and advanced analytics.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Do I need to download an app?</h3>
                <p className="text-muted-foreground">
                  No — GoalPath works fully in your browser. Apps are also available on iOS and Android if you prefer mobile.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">How is this different from a to-do list?</h3>
                <p className="text-muted-foreground">
                  GoalPath combines goal strategy, AI weekly planning, daily scheduling, and progress tracking in one place. It's built for achieving goals, not just listing tasks.
                </p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">Can I use it on my phone?</h3>
                <p className="text-muted-foreground">
                  Yes — the web app works on mobile browsers, and native apps are available on App Store and Google Play.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to achieve your goals?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Start planning for free today — no download needed</p>
            <button
              onClick={() => openAuthModal({ intent: "signup" })}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-full hover:bg-primary-foreground/90 transition-colors shadow-lg"
            >
              Start Planning Free →
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default OnlineGoalPlanner;
