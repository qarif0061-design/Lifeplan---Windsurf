import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const Productivity = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between productivity and busyness?",
      answer: "Productivity is making progress on what matters most. Busyness is being occupied with tasks, even if they're not important. Productive people focus on outcomes, not just activity. They protect time for important work and say no to distractions. Busy people often react to whatever comes up, while productive people proactively work toward meaningful goals."
    },
    {
      question: "How can I be more productive without burning out?",
      answer: "Focus on sustainable productivity: set realistic daily priorities (1-3 major tasks), include buffer time in your schedule, protect recovery time, use energy management (work during peak focus times), and take regular breaks. The key is recognizing that productivity is about consistent progress, not heroic effort. Some weeks are for growth, others for maintenance."
    },
    {
      question: "What are the most effective productivity techniques?",
      answer: "The most effective techniques include: time blocking (protecting specific blocks for deep work), the 2-minute rule (if something takes less than 2 minutes, do it immediately), energy matching (schedule demanding work during peak energy), and weekly reviews (plan and reflect weekly). The best technique depends on your personality and work style."
    },
    {
      question: "How do productivity systems reduce mental overload?",
      answer: "Productivity systems reduce mental load by: externalizing commitments (so your brain stops scanning for unfinished tasks), creating structure and predictability (reducing decision fatigue), providing trusted systems (so you don't have to remember everything), building automatic routines (reducing willpower needs), and offering closure mechanisms (completing planned items feels satisfying)."
    },
    {
      question: "What's the best way to organize tasks for maximum productivity?",
      answer: "Organize by priority and context, not just urgency. Use: daily priorities (1-3 most important), time blocks (when you'll work on each), energy matching (high-focus tasks during peak energy), context grouping (similar tasks together), and weekly themes (focus areas for each week). The key is focusing on what matters most without creating anxiety about everything else."
    },
    {
      question: "How do I stay focused in a world full of distractions?",
      answer: "Protect your focus with: time blocking for deep work, turning off notifications during focus periods, creating a dedicated workspace, using the Pomodoro technique (25-minute focused sprints), and setting clear boundaries with others. Also, identify your personal focus patterns and schedule important work during your natural peak times."
    },
    {
      question: "Can productivity apps actually help or do they create more work?",
      answer: "Productivity apps help when they reduce mental overhead and provide structure. They hurt when they create complexity, require constant maintenance, or fragment attention. The best productivity apps disappear into the background while helping you stay focused on what matters. Look for apps that simplify rather than complicate your workflow."
    },
    {
      question: "How do I measure productivity without just counting hours?",
      answer: "Focus on outcomes and impact rather than hours worked. Track: meaningful progress on key goals, completion of important tasks (not just any tasks), quality of work (not just quantity), and energy levels and satisfaction. Also consider the 80/20 rule: which 20% of your activities create 80% of your results?"
    },
    {
      question: "What role does energy management play in productivity?",
      answer: "Energy management is more important than time management. Your ability to focus, make decisions, and do quality work varies throughout the day and week. Track your energy patterns, schedule demanding work during peak energy periods, save easier tasks for low-energy times, include recovery activities, and respect your natural rhythms rather than fighting them."
    },
    {
      question: "How do I build productivity habits that stick?",
      answer: "Start with identity-based habits (become 'someone who is productive' rather than just 'trying to be productive'). Begin with small changes (2-minute rule), attach new habits to existing routines, track consistency rather than perfection, focus on systems rather than goals, and celebrate small wins. The key is making productive behaviors easier than unproductive ones."
    }
  ];

  const techniques = [
    {
      title: "Time Blocking",
      description: "Schedule specific blocks for focused work and protect that time.",
      icon: "⏰"
    },
    {
      title: "Pomodoro Technique",
      description: "Work in 25-minute focused sprints with 5-minute breaks.",
      icon: "🍅"
    },
    {
      title: "Energy Management",
      description: "Match task difficulty to your natural energy levels.",
      icon: "⚡"
    },
    {
      title: "2-Minute Rule",
      description: "If something takes less than 2 minutes, do it immediately.",
      icon: "⏱️"
    },
    {
      title: "Weekly Reviews",
      description: "Plan and reflect weekly to stay aligned with priorities.",
      icon: "🔄"
    },
    {
      title: "Priority Limits",
      description: "Focus on 1-3 major priorities per day to avoid overwhelm.",
      icon: "🎯"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Productivity Guide 2026 | Work Smarter, Not Harder | GoalPlanner"
        description="Master productivity with proven techniques. Learn time blocking, energy management, and focus strategies that work. Build sustainable productivity without burnout."
        canonicalPath="/productivity"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Productivity",
          url: "https://goalplanner.io/productivity",
          description: "Master productivity with proven techniques and sustainable systems.",
          mainEntity: {
            "@type": "FAQPage",
            mainEntity: faqData.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }
        }}
      />

      {/* Hero Section */}
      <section className="space-y-6 text-center py-12" id="hero">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Productivity Guide: Work Smarter, Not Harder</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master sustainable productivity with proven techniques. Learn time blocking, energy management, and focus strategies that work without burnout. Join thousands who've transformed their productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Being Productive Free
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#techniques">Learn Techniques</Link>
          </Button>
        </div>
      </section>

      {/* Productivity vs Busyness */}
      <section className="space-y-6" id="productivity-vs-busyness">
        <h2 className="text-3xl font-bold text-foreground">Productivity vs. Busyness</h2>
        <p className="text-lg text-muted-foreground">
          The biggest productivity mistake is confusing being busy with being productive.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">🏃‍♂️ Busyness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-red-800">
                <p>• Reacting to whatever comes up</p>
                <p>• Completing many low-value tasks</p>
                <p>• Constant context switching</p>
                <p>• Feeling exhausted but not accomplished</p>
                <p>• "I was busy all day but nothing important moved forward"</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-momentum">🎯 Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-foreground/80">
                <p>• Protecting time for important work</p>
                <p>• Making progress on meaningful outcomes</p>
                <p>• Maintaining focus and flow states</p>
                <p>• Feeling satisfied with daily progress</p>
                <p>• "I moved closer to what matters most today"</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Principles */}
      <section className="space-y-6" id="principles">
        <h2 className="text-3xl font-bold text-foreground">Core Productivity Principles</h2>
        <p className="text-lg text-muted-foreground">
          Sustainable productivity is built on a few key principles that work together.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Priority Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Do fewer things better. Focus on 1-3 major priorities per day.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Energy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Work with your natural energy patterns, not against them.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🛡️ Focus Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create systems that protect attention from distractions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 Consistency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build systems for regular progress rather than heroic effort.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step-by-Step Productivity System */}
      <section className="space-y-6" id="step-by-step">
        <h2 className="text-3xl font-bold text-foreground">Build Your Productivity System: Step-by-Step</h2>
        <p className="text-lg text-muted-foreground">
          Follow this process to create sustainable productivity that works for your specific situation.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                Assess Current State
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Track your time for 1 week to understand where your time actually goes. Identify your peak energy periods and biggest time-wasters.</p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                Define Priorities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Identify your 1-3 most important outcomes. Use GoalPlanner to connect daily tasks to these key priorities.</p>
            </CardContent>
          </Card>
          <Card className="border-ember/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-ember text-ember-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                Implement Techniques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Start with 1-2 techniques like time blocking and energy matching. Build consistency before adding more.</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                Review & Refine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Weekly reviews to see what's working. Adjust your system based on real results, not theory.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Productivity Best Practices */}
      <section className="space-y-6" id="best-practices">
        <h2 className="text-3xl font-bold text-foreground">Productivity Best Practices</h2>
        <p className="text-lg text-muted-foreground">
          These proven strategies help maintain high productivity without burnout.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">🎯 Daily Habits</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Plan Tomorrow Tonight</p>
                  <p className="text-muted-foreground text-sm">5-minute evening planning saves morning decision fatigue</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">First Things First</p>
                  <p className="text-muted-foreground text-sm">Tackle most important task during peak energy</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Protect Deep Work Time</p>
                  <p className="text-muted-foreground text-sm">Block 2-3 hour focus periods without interruptions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">🛡️ Protection Strategies</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Notification Management</p>
                  <p className="text-muted-foreground text-sm">Turn off notifications during focus blocks</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Boundary Setting</p>
                  <p className="text-muted-foreground text-sm">Communicate availability and protect your time</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Energy Recovery</p>
                  <p className="text-muted-foreground text-sm">Schedule breaks and recovery periods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How GoalPlanner Helps */}
      <section className="space-y-6" id="how-goalplanner-helps">
        <h2 className="text-3xl font-bold text-foreground">How GoalPlanner Boosts Your Productivity</h2>
        <p className="text-lg text-muted-foreground">
          GoalPlanner is specifically designed to eliminate productivity barriers and build systems for consistent progress.
        </p>
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">🚀 Eliminate Productivity Killers</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• <strong>Decision fatigue:</strong> Clear daily priorities eliminate constant choosing</li>
                <li>• <strong>Context switching:</strong> Time blocking creates focused work periods</li>
                <li>• <strong>Lost momentum:</strong> Progress tracking maintains motivation</li>
                <li>• <strong>Scattered focus:</strong> Goal connection keeps priorities visible</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">⚡ Build Productive Systems</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• <strong>Automatic prioritization:</strong> Goals drive daily task selection</li>
                <li>• <strong>Energy matching:</strong> Schedule tasks to your energy levels</li>
                <li>• <strong>Progress visualization:</strong> See your productivity patterns</li>
                <li>• <strong>Habit integration:</strong> Productive behaviors become automatic</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Techniques */}
      <section className="space-y-6" id="techniques">
        <h2 className="text-3xl font-bold text-foreground">Proven Productivity Techniques</h2>
        <p className="text-lg text-muted-foreground">
          These techniques work because they reduce friction and create structure for focused work.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{technique.icon}</span>
                  {technique.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{technique.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mental Load Reduction */}
      <section className="space-y-6" id="mental-load">
        <h2 className="text-3xl font-bold text-foreground">How Productivity Systems Reduce Mental Load</h2>
        <p className="text-lg text-muted-foreground">
          Good productivity systems don't add more work—they free up mental bandwidth.
        </p>
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">🧠 What Your Brain Stops Doing</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Constantly scanning for unfinished tasks</li>
                <li>• Making thousands of daily decisions</li>
                <li>• Remembering commitments and deadlines</li>
                <li>• Worrying about what you might forget</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">⚡ What You Gain Instead</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Creative thinking capacity</li>
                <li>• Better decision-making quality</li>
                <li>• Reduced stress and anxiety</li>
                <li>• Satisfaction from completed work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Productivity */}
      <section className="space-y-6" id="sustainable">
        <h2 className="text-3xl font-bold text-foreground">Sustainable Productivity</h2>
        <p className="text-lg text-muted-foreground">
          The most effective productivity systems are designed for the long term, not short-term bursts.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🌱 Growth Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When energy is high and conditions support it: take on challenges, learn new skills, push boundaries.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🛠️ Maintenance Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When life is busy or energy is low: maintain habits, complete essential tasks, preserve systems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 Recovery Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When you need rest: reduce expectations, focus on basics, allow yourself to recharge.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Build Your Productivity System?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start with a productivity system designed for real life. Focus on what matters, protect your time, and achieve more without burnout.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Build Your Productivity System
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-foreground">Master Productivity & Related Skills</h2>
        <p className="text-lg text-muted-foreground">
          Explore specific productivity techniques and connect with goal planning systems that support sustained achievement.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Master scheduling, prioritization, and time blocking</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-management">Time Management →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Focus & Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Improve concentration and mental clarity</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/focus-and-mental-clarity">Focus & Clarity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 Daily Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build routines that support productive work</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/daily-routine-planner">Daily Routines →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Set meaningful goals that drive productive action</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 To-Do Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Organize tasks for maximum productivity</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list">To-Do Lists →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Self-Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build personal skills that enhance productivity</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/self-improvement">Self-Improvement →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Student Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Productivity strategies for academic success</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/student-planner">Student Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚫 Procrastination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Overcome procrastination for better productivity</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/procrastination">Procrastination Help →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-foreground">Productivity FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PublicPageLayout>
  );
};

export default Productivity;
