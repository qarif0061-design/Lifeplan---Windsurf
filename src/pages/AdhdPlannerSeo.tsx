import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const AdhdPlannerSeo = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    { question: "What is an ADHD planner?", answer: "An ADHD planner is designed specifically for neurodivergent brains. It uses shorter time blocks, visual cues, fewer priorities per day, built-in breaks, and simple tracking systems that work with ADHD rather than against it." },
    { question: "What features should a planner for ADHD have?", answer: "Key features include: limited daily priorities (max 3), time-blocking with breaks, visual progress tracking, simple task lists without overwhelm, reminder systems, and flexibility to adjust when focus fluctuates." },
    { question: "How does goal setting work for ADHD adults?", answer: "Goal setting for ADHD works best with shorter timeframes, external accountability, visual reminders, and frequent check-ins. Break large goals into tiny steps. Use body doubling and habit stacking to build consistency." },
    { question: "What is the best life planner for ADHD?", answer: "The best planner for ADHD combines simplicity with structure. Look for minimal daily entries, priority focus, time-blocking, and weekly reviews. Digital planners with notifications work well because they reduce the cognitive load of remembering." },
    { question: "How is goal setting for ADHD different?", answer: "ADHD brains struggle with executive function, so goal setting needs to be simpler, more visual, and more immediate. Use shorter deadlines, accountability partners, and reward systems. Avoid complex multi-step planning." },
    { question: "What is goal management training for ADHD?", answer: "Goal Management Training (GMT) is a structured program that helps people with ADHD improve executive function skills. It teaches goal selection, planning, monitoring, and adjustment strategies tailored to neurodivergent thinking patterns." },
    { question: "Can a goal tracker help with ADHD?", answer: "Yes. Goal trackers provide external structure, visual progress feedback, and reminders—all of which support executive function. The key is choosing a simple tracker that doesn't add cognitive load." },
    { question: "What are the best goal setting worksheets for ADHD?", answer: "ADHD-friendly worksheets focus on one goal at a time, use checkboxes rather than lines, include space for brain dumps, and break goals into micro-steps. Look for templates with built-in review periods." },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="ADHD Planner: Goal Setting & Planning for Neurodivergent Minds | GoalPlanner"
        description="Discover ADHD-friendly planning strategies, goal setting tips for adults with ADHD, and tools that work with your brain. Simple, effective systems for neurodivergent thinkers."
        canonicalPath="/adhd-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "ADHD Planner Guide",
          url: "https://goalplanner.io/adhd-planner",
          description: "ADHD-friendly planning and goal setting strategies for neurodivergent adults.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">ADHD Planner</h1>
          <p className="text-muted-foreground text-lg">
            Planning and goal setting designed for the ADHD brain. Simple systems that work with your mind, not against it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Try the ADHD-friendly planner
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles/goal-setting-for-adhd">Read ADHD goal setting guide</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why ADHD needs a different approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Simple priorities</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Limit to 3 priorities per day. Too many choices cause decision paralysis. Fewer options mean more action.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Time-boxed tasks</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Work in 25-45 minute blocks with scheduled breaks. Short sprints match ADHD attention cycles and reduce overwhelm.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Visual tracking</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">See progress at a glance. Visual checkboxes, progress bars, and streaks provide dopamine hits that sustain motivation.</CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">ADHD goal setting framework</h2>
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-3 text-foreground/80">
              <li><strong>One goal at a time.</strong> Pick one meaningful goal. ADHD brains scatter easily—focus is your superpower when protected.</li>
              <li><strong>Tiny first step.</strong> Make the first action so small it feels ridiculous. "Open the document" not "Write chapter 1."</li>
              <li><strong>External accountability.</strong> Tell someone your goal. Use an app with reminders. External structure replaces internal executive function.</li>
              <li><strong>Short deadlines.</strong> Set 1-week sprints instead of 3-month goals. ADHD brains thrive with urgency and clear end dates.</li>
              <li><strong>Forgive and adjust.</strong> Missed a day? Skip the guilt and just continue. Consistency over perfection always wins.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">ADHD-friendly planning tips</h2>
          <div className="rounded-[2rem] border border-primary/20 bg-primary/10 p-7 shadow-sm space-y-3">
            <p className="text-foreground/80"><strong>Use body doubling:</strong> Work alongside someone else, even virtually. Co-working sessions boost focus for ADHD brains.</p>
            <p className="text-foreground/80"><strong>Habit stack:</strong> Attach new habits to existing ones. "After I make coffee, I'll plan my day for 5 minutes."</p>
            <p className="text-foreground/80"><strong>Reduce friction:</strong> Make starting easy. Prepare your workspace, have materials ready, remove distractions before you begin.</p>
            <p className="text-foreground/80"><strong>Reward frequently:</strong> Celebrate every completed task. Small rewards release dopamine and train your brain to associate planning with pleasure.</p>
            <p className="text-foreground/80"><strong>Use the 2-minute rule:</strong> If a task takes less than 2 minutes, do it immediately. This prevents tiny tasks from piling up into overwhelm.</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default AdhdPlannerSeo;
