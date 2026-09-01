import { Button } from "@/components/ui/button";
import { Target, Zap, Shield, BarChart3, ArrowRight, CheckCircle2, Star, MessageSquare, HelpCircle, Apple, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckpointPath from "@/components/CheckpointPath";
import GoalWizard from "@/components/GoalWizard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const Landing = () => {
  const { openAuthModal } = useAuthModal();
  const features = [
    {
      title: "Goal Management",
      description: "Set, track, and achieve your long-term goals with precision.",
      icon: Target,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Strategy System",
      description: "Define your 'Why' and build a solid foundation for success.",
      icon: Shield,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Weekly Planning",
      description: "Break down goals into actionable weekly plans and tasks.",
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Smart Analytics",
      description: "Visualize your progress with detailed insights and streaks.",
      icon: BarChart3,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Product Designer",
      content: "LifePlan changed how I approach my career goals. The strategy system is a game-changer.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Marcus Chen",
      role: "Entrepreneur",
      content: "The weekly planning keeps me focused on what actually moves the needle. Highly recommended.",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    {
      name: "Elena Rodriguez",
      role: "Student",
      content: "I love the daily check-ins. It's so satisfying to see my streaks grow every day!",
      avatar: "https://i.pravatar.cc/150?u=elena"
    }
  ];

  const faqs = [
    {
      question: "How does the Strategy System work?",
      answer: "The Strategy System helps you define your 'Why', identify beneficiaries, and decide what to say 'No' to, creating a solid foundation for your goals."
    },
    {
      question: "Can I use LifePlan on my phone?",
      answer: "Yes. LifePlan works on mobile web, and we also offer native mobile app versions in the iOS App Store and Google Play Store."
    },
    {
      question: "How do weekly plans help me hit long-term goals?",
      answer: "Weekly planning turns big goals into small priorities and tasks you can actually finish. You plan once per week, then track progress and adjust in a weekly review."
    },
    {
      question: "Can I track habits and daily routines?",
      answer: "Yes. Use daily check-ins and tasks to track habits (like exercise, hydration, study sessions) and keep streaks visible."
    },
    {
      question: "Does LifePlan sync across devices?",
      answer: "Yes. Your account syncs your goals and plans so you can use LifePlan on web and mobile without losing progress."
    },
    {
      question: "Is my data private and secure?",
      answer: "We treat your goals and notes as private. Access is tied to your account, and we follow best practices to keep data protected."
    },
    {
      question: "How do I get started in 5 minutes?",
      answer: "Create one goal, choose a timeframe, write a short strategy (why it matters), then set 1–3 weekly priorities. That’s enough to begin building consistency."
    }
  ];

  return (
    <div className="min-h-screen">
      <Seo
        title="Goal Planner - Lifeplans: Free Goal Setting & Daily Planning App"
        description="Plan your goals, build weekly plans, and track daily progress. Free goal planner app for iOS and Android. Trusted by students and professionals."
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Goal Planner - Lifeplans",
          url: "https://goalplanner.io/",
          applicationCategory: "Productivity Application",
          operatingSystem: "Web, iOS, Android",
        }}
      />
      <Navbar />

      {/* Hero Section — the checkpoint path is the thesis, not decoration */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-momentum/10 text-momentum px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-momentum opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-momentum" />
              </span>
              <span>Your goal system on web + mobile</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-foreground tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Every goal is a path.
              <br />
              <span className="text-primary">Walk it one checkpoint at a time.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Lifeplans turns a goal into checkpoints, checkpoints into weekly priorities, and priorities into today's tasks — so progress is something you can see, not just hope for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Button
                size="lg"
                onClick={() => document.getElementById("start-goal")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-primary/20"
              >
                Start with your goal <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* The signature, made interactive: walk your own goal through the checkpoint wizard */}
          <div id="start-goal" className="mt-16 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500 scroll-mt-24">
            <GoalWizard />
          </div>

          <div className="mt-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700">
            <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-7">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Mobile Apps</p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-display font-bold text-foreground">Take the path with you</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Plan, check in, and stay consistent from anywhere.</p>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full md:w-auto">
                  <Button asChild className="rounded-2xl bg-foreground hover:bg-foreground/90 text-background h-14 justify-start">
                    <a
                      href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center min-w-0"
                    >
                      <Apple className="w-5 h-5 mr-3" />
                      <span className="flex flex-col items-start leading-none min-w-0">
                        <span className="text-xs opacity-80 truncate">Download on the</span>
                        <span className="text-sm font-bold truncate">App Store</span>
                      </span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-2xl h-14 justify-start">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.faran.lifeplans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center min-w-0"
                    >
                      <Smartphone className="w-5 h-5 mr-3" />
                      <span className="flex flex-col items-start leading-none min-w-0">
                        <span className="text-xs text-muted-foreground truncate">Download on the</span>
                        <span className="text-sm font-bold truncate">Google Play</span>
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground">Examples you can copy</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              If you're new, use these as a starting point. Keep it simple and adjust as you go.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Sample Goal</div>
              <h3 className="mt-2 text-xl font-display font-bold text-foreground">Improve fitness in 8 weeks</h3>
              <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4 text-sm text-foreground/80">
                <div className="font-semibold text-foreground mb-2 font-tabular text-xs uppercase tracking-wide">Checkpoints</div>
                <div className="space-y-1">
                  <div>3 workouts/week</div>
                  <div>8k steps/day (average)</div>
                  <div>Meal plan 3 days/week</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                  Create your goal
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/how-to-set-goals-that-stick">Read guide</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-ember">Sample Weekly Plan</div>
              <h3 className="mt-2 text-xl font-display font-bold text-foreground">This week's priorities</h3>
              <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4 text-sm text-foreground/80">
                <div className="font-semibold text-foreground mb-2 font-tabular text-xs uppercase tracking-wide">Top 3 priorities</div>
                <div className="space-y-1">
                  <div>Finish one important task (deep work)</div>
                  <div>Move the body 3x</div>
                  <div>Plan the next week on Friday</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                  Plan your week
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/weekly-planning-for-long-term-goals">Read guide</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-momentum">Sample Daily Plan</div>
              <h3 className="mt-2 text-xl font-display font-bold text-foreground">Today (30–60 minutes)</h3>
              <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4 text-sm text-foreground/80">
                <div className="font-semibold text-foreground mb-2 font-tabular text-xs uppercase tracking-wide">Do this first</div>
                <div className="space-y-1">
                  <div>25–50 min focus session</div>
                  <div>10 min admin / messages</div>
                  <div>5 min prepare tomorrow</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                  Open daily planner
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/daily-planner-template">Get template</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — a real sequence, so it's drawn as a connected path, not disconnected cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground">How Lifeplans works</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Start simple. Create one goal, plan the week, then execute one day at a time.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-10">
            <CheckpointPath
              className="w-full h-auto mb-4"
              waypoints={[
                { label: "Create a goal", sublabel: "Step 1", done: false },
                { label: "Plan your week", sublabel: "Step 2", done: false },
                { label: "Run your day", sublabel: "Step 3", done: false },
              ]}
            />
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div>
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Write one clear goal and add checkpoints so progress is measurable.
                </p>
                <Button asChild variant="link" className="px-0 mt-2 text-primary">
                  <Link to="/goals">Open Goals <ArrowRight className="ml-1 w-3.5 h-3.5" /></Link>
                </Button>
              </div>
              <div>
                <div className="w-10 h-10 bg-ember/10 text-ember rounded-xl flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose 1–3 weekly priorities and break them into startable tasks.
                </p>
                <Button asChild variant="link" className="px-0 mt-2 text-primary">
                  <Link to="/weekly-planner">Open Weekly Planner <ArrowRight className="ml-1 w-3.5 h-3.5" /></Link>
                </Button>
              </div>
              <div>
                <div className="w-10 h-10 bg-momentum/10 text-momentum rounded-xl flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use the Daily Planner to focus on today's schedule and tasks.
                </p>
                <Button asChild variant="link" className="px-0 mt-2 text-primary">
                  <Link to="/daily-planner">Open Daily Planner <ArrowRight className="ml-1 w-3.5 h-3.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Everything you need to succeed</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Powerful tools designed to keep you focused, motivated, and on track to reaching your full potential.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Loved by high achievers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex items-center gap-1 text-ember mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/85 mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/40 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;