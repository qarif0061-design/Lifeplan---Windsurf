import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const GoalSettingSeo = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    { question: "What is goal setting and why is it important?", answer: "Goal setting is the process of identifying something you want to accomplish and creating measurable steps to achieve it. It's important because it provides direction, motivation, and a way to track progress. Research shows people who set specific goals are significantly more likely to succeed." },
    { question: "Why goal setting is important in life?", answer: "Goal setting gives your life direction and purpose. It helps you focus your energy on what matters, measure progress, overcome procrastination, and build confidence as you achieve milestones. Without goals, it's easy to drift without meaningful progress." },
    { question: "Why goal setting is important for students?", answer: "Students who set goals perform better academically, manage their time more effectively, and develop self-discipline. Goal setting teaches planning, prioritization, and persistence—skills that benefit lifelong learning and career success." },
    { question: "Why goal setting is important for personal development?", answer: "Personal development goals help you grow intentionally rather than by accident. Setting goals for skills, habits, and mindset ensures continuous improvement and helps you become the person you want to be." },
    { question: "Why do people fail to achieve their goals?", answer: "Common reasons include: setting vague goals without measurement, lack of a specific plan, trying to change too much at once, not tracking progress, giving up after setbacks, and not having accountability. The SMART framework and weekly planning help overcome these." },
    { question: "How to set goals in life?", answer: "Start by identifying what matters most to you across different life areas. Use the SMART framework to make goals specific and measurable. Break each goal into monthly milestones and weekly priorities. Write them down and review progress regularly." },
    { question: "How to set goals and achieve them?", answer: "1) Define a clear SMART goal. 2) Break it into weekly actions. 3) Schedule those actions in your calendar. 4) Track progress daily or weekly. 5) Review and adjust at the end of each week. 6) Celebrate small wins to maintain momentum." },
    { question: "What are the best goal setting apps?", answer: "The best goal setting apps include Goal Planner – LifePlans for integrated goal tracking and daily planning, along with apps that offer SMART goal frameworks, habit tracking, progress visualization, and weekly review features." },
    { question: "What is the best way to set goals to achieve the best results?", answer: "The most effective approach combines SMART goals with weekly planning. Set specific, measurable goals with deadlines, then create weekly priorities and daily tasks. Review progress weekly and adjust. This bridges the gap between intention and execution." },
    { question: "What mistakes do we make while setting common goals?", answer: "Common mistakes include: setting too many goals at once, making goals too vague, ignoring the 'why' behind the goal, setting unrealistic deadlines, not breaking goals into actionable steps, and never reviewing or adjusting the plan." },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Goal Setting: How to Set Goals & Achieve Them in 2026 | GoalPlanner"
        description="Learn how to set goals in life, why goal setting matters, common mistakes to avoid, and how to actually achieve what you set out to do. Free goal setting tips and templates."
        canonicalPath="/goal-setting"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Goal Setting Guide",
          url: "https://goalplanner.io/goal-setting",
          description: "Complete guide to goal setting including SMART goals, common mistakes, and how to achieve your goals.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">Goal Setting</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to set goals that stick and build a system to achieve them. From SMART goals to weekly action plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start setting your goals
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/articles">Read goal setting guides</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why goal setting matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Direction</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Goals give you a clear destination. Instead of wandering, every decision moves you toward what matters most.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Motivation</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Written goals create commitment. Each small win releases dopamine, keeping you motivated for the next step.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Measurement</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">What gets measured gets done. Goals let you track progress and know when you've arrived.</CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">The goal achievement system</h2>
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-3 text-foreground/80">
              <li><strong>Set SMART goals.</strong> Specific, Measurable, Achievable, Relevant, Time-bound. Write each goal in one sentence.</li>
              <li><strong>Break into milestones.</strong> Divide a 6-month goal into monthly and weekly outcomes.</li>
              <li><strong>Create weekly priorities.</strong> Each week, choose 1-3 priorities that move your goal forward.</li>
              <li><strong>Schedule daily tasks.</strong> Assign specific tasks to specific days. If it's not scheduled, it's not real.</li>
              <li><strong>Track and review.</strong> Check progress daily and do a weekly review. Adjust what isn't working.</li>
              <li><strong>Stay focused.</strong> Protect your priorities from distractions. One goal at a time works best.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why people fail at goals (and how to fix it)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Too vague</CardTitle></CardHeader>
              <CardContent className="text-foreground/80"><strong>Fix:</strong> Use SMART. "Get fit" becomes "Run 3x/week for 30 minutes."</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">No plan</CardTitle></CardHeader>
              <CardContent className="text-foreground/80"><strong>Fix:</strong> Break goals into weekly tasks. Plan each week on Sunday or Monday.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">Too many goals</CardTitle></CardHeader>
              <CardContent className="text-foreground/80"><strong>Fix:</strong> Focus on 1-3 goals per quarter. Finish before adding more.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">No tracking</CardTitle></CardHeader>
              <CardContent className="text-foreground/80"><strong>Fix:</strong> Use a goal tracking app or weekly planner. Review progress every Friday.</CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Goal setting for different areas</h2>
          <div className="rounded-[2rem] border border-primary/20 bg-primary/10 p-7 shadow-sm space-y-4">
            <p className="text-foreground/80"><strong>For work:</strong> Set goals using the SMART framework during performance reviews. Align personal goals with team and company objectives.</p>
            <p className="text-foreground/80"><strong>For students:</strong> Set academic, skill, and personal development goals. Use a student planner to track assignments and study targets.</p>
            <p className="text-foreground/80"><strong>For ADHD:</strong> Keep goals simple, visible, and time-boxed. Use short deadlines, accountability partners, and habit stacking for better follow-through.</p>
            <p className="text-foreground/80"><strong>For personal development:</strong> Set goals across health, relationships, learning, and finances. Use a life planner to keep everything balanced.</p>
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

export default GoalSettingSeo;
