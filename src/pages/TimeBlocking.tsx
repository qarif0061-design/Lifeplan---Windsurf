import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const TimeBlocking = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between time blocking and time boxing?",
      answer: "Time blocking is scheduling specific blocks for focused work on your calendar. Time boxing is assigning a fixed time duration to complete a task. Time blocking is about protecting time for important work, while time boxing is about limiting time spent on specific tasks. Both help with focus, but time blocking is more flexible for deep work sessions."
    },
    {
      question: "How long should time blocks be?",
      answer: "Most people work best with 90-minute to 2-hour blocks for deep work, with 25-50 minute blocks for routine tasks. The key is matching block length to task complexity and your natural attention span. Start with shorter blocks and gradually increase as you build focus stamina. Include buffer time between blocks for transitions."
    },
    {
      question: "What do I do if I finish a time block early?",
      answer: "Have a 'next task' ready so you don't lose momentum. Use extra time for lower-energy tasks, planning, or quick wins. Avoid immediately starting another deep work block unless you have the energy. Some people use 'catch-up blocks' for unexpected tasks or overflow work."
    },
    {
      question: "How do I handle interruptions during time blocks?",
      answer: "Protect your blocks by: turning off notifications, setting clear boundaries with colleagues/family, using 'do not disturb' signals, and having a backup plan for unavoidable interruptions. For unavoidable breaks, get back on track quickly by noting where you left off and resuming within 2 minutes."
    },
    {
      question: "Can time blocking work for creative or unpredictable work?",
      answer: "Yes, with adaptations. For creative work: use 'exploration blocks' without rigid outcomes. For unpredictable work: leave buffer blocks between scheduled tasks, use 'flexible blocks' for catch-up work, and schedule review blocks to reorganize priorities. The key is structure with flexibility."
    },
    {
      question: "What tools are best for time blocking?",
      answer: "Digital calendars (Google Calendar, Outlook) work well for color-coded blocks. Time blocking apps like GoalPlanner provide dedicated features. Analog methods (planners, whiteboards) help with visual thinking. The best tool is one you'll consistently use and that integrates with your existing workflow."
    },
    {
      question: "How do I time block different types of work?",
      answer: "Match block type to work nature: Deep work blocks for focused tasks (90-120 min), Administrative blocks for routine tasks (30-60 min), Creative blocks for exploratory work (60-90 min), Learning blocks for skill development (45-75 min), and Review blocks for planning and reflection (15-30 min)."
    },
    {
      question: "What's the ideal number of time blocks per day?",
      answer: "Most people thrive with 3-6 focused blocks per day, plus buffer time. Too few blocks lead to underutilization, too many create decision fatigue. Quality matters more than quantity - 4-5 high-quality blocks often outperform 8-10 mediocre ones. Listen to your energy patterns and adjust accordingly."
    },
    {
      question: "How do I estimate time needed for tasks?",
      answer: "Track actual time spent for 2 weeks to build your personal baseline. Break tasks into smaller steps and estimate each step. Add 20-30% buffer for unexpected complications. Review estimates vs actual time weekly to improve accuracy. GoalPlanner's time tracking helps automate this learning process."
    },
    {
      question: "Can time blocking help with ADHD or focus challenges?",
      answer: "Absolutely. Time blocking provides external structure that reduces executive function load. Use: visual time blocks with color coding, consistent daily routines, shorter blocks (25-45 min) with frequent breaks, body doubling (work with others), and clear transition signals between blocks. The structure reduces decision fatigue and overwhelm."
    }
  ];

  const blockingTypes = [
    {
      title: "Deep Work Blocks",
      description: "90-120 minute focused sessions for complex, important tasks",
      icon: "🧘"
    },
    {
      title: "Administrative Blocks",
      description: "30-60 minute blocks for routine tasks and communication",
      icon: "📧"
    },
    {
      title: "Creative Blocks",
      description: "60-90 minute exploratory sessions for creative problem-solving",
      icon: "🎨"
    },
    {
      title: "Learning Blocks",
      description: "45-75 minute blocks for skill development and education",
      icon: "📚"
    },
    {
      title: "Review Blocks",
      description: "15-30 minute blocks for planning and reflection",
      icon: "🔄"
    },
    {
      title: "Buffer Blocks",
      description: "15-30 minute blocks between tasks for transitions and overflow",
      icon: "⏱️"
    }
  ];

  const bestPractices = [
    {
      title: "Color Code Your Calendar",
      description: "Use different colors for different types of work to see your day at a glance",
      icon: "🎨"
    },
    {
      title: "Block Realistically",
      description: "Schedule 70-80% of your time, leave buffer for unexpected tasks and breaks",
      icon: "⏰"
    },
    {
      title: "Include Transition Time",
      description: "Add 10-15 minutes between blocks for task switching and preparation",
      icon: "🔄"
    },
    {
      title: "Match Energy to Tasks",
      description: "Schedule demanding work during peak energy, routine tasks during low energy",
      icon: "⚡"
    },
    {
      title: "Protect Your Blocks",
      description: "Turn off notifications and set clear boundaries with others",
      icon: "🛡️"
    },
    {
      title: "Review Weekly",
      description: "Analyze what worked and adjust your blocking strategy",
      icon: "📊"
    }
  ];

  const commonMistakes = [
    {
      title: "Over-scheduling",
      description: "Filling every minute without buffer time for unexpected tasks or breaks",
      solution: "Block 70-80% of time, leave 20-30% for flexibility"
    },
    {
      title: "Wrong Block Lengths",
      description: "Using same block duration for all tasks regardless of complexity",
      solution: "Match block length to task complexity and energy levels"
    },
    {
      title: "No Transition Time",
      description: "Scheduling blocks back-to-back without time for task switching",
      solution: "Add 10-15 minute buffer blocks between different task types"
    },
    {
      title: "Ignoring Energy Patterns",
      description: "Scheduling deep work during low-energy periods or routine tasks during peak energy",
      solution: "Track your energy patterns and match tasks accordingly"
    },
    {
      title: "Too Rigid",
      description: "Not allowing flexibility for unexpected opportunities or interruptions",
      solution: "Include buffer blocks and maintain a 'next task' list"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Time Blocking Guide 2026 | Schedule Focused Work | GoalPlanner"
        description="Master time blocking with proven techniques. Learn to schedule focused work, protect deep time, and boost productivity. Start free."
        canonicalPath="/time-blocking"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Time Blocking",
          url: "https://goalplanner.io/time-blocking",
          description: "Master time blocking with proven techniques for focused work and productivity.",
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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Time Blocking: Master Your Focus</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transform your productivity with time blocking. Schedule focused work, protect deep time, and achieve more in less time. Join thousands who've mastered their schedule.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Time Blocking Free
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#types">Learn Techniques</Link>
          </Button>
        </div>
      </section>

      {/* What Is Time Blocking */}
      <section className="space-y-6" id="what-is-time-blocking">
        <h2 className="text-3xl font-display font-bold text-foreground">What Is Time Blocking?</h2>
        <p className="text-lg text-muted-foreground">
          Time blocking is scheduling specific blocks of time for focused work on your calendar. Instead of working from a to-do list, you protect dedicated time slots for important tasks, protecting them from interruptions and context switching.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle className="text-primary">🎯 Traditional Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/80">
                Reacting to tasks as they come up, constant context switching, and feeling busy but not productive.
              </p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-momentum">🧘 Time Blocking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-momentum/80">
                Proactively scheduling focused work, protecting deep time, and making consistent progress on important priorities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Types of Time Blocks */}
      <section className="space-y-6" id="types">
        <h2 className="text-3xl font-display font-bold text-foreground">Types of Time Blocks</h2>
        <p className="text-lg text-muted-foreground">
          Different types of work require different time block strategies. Match your blocks to the nature of your tasks.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockingTypes.map((type, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{type.icon}</span>
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="space-y-6" id="step-by-step">
        <h2 className="text-3xl font-display font-bold text-foreground">Time Blocking: Step-by-Step</h2>
        <p className="text-lg text-muted-foreground">
          Follow this process to implement time blocking effectively with GoalPlanner.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                Track Your Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor how you spend time for 1 week to understand patterns and identify time-wasters.</p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-momentum text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                Categorize Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Group tasks by type (deep work, administrative, creative, learning) to match appropriate block lengths.</p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                Schedule Blocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Block time on your calendar, starting with 2-3 focused blocks per day and building from there.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                Refine Weekly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Review what worked, adjust block lengths, and improve your system weekly.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6" id="best-practices">
        <h2 className="text-3xl font-display font-bold text-foreground">Time Blocking Best Practices</h2>
        <p className="text-lg text-muted-foreground">
          These proven strategies will make your time blocking more effective and sustainable.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestPractices.map((practice, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{practice.icon}</span>
                  {practice.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{practice.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6" id="mistakes">
        <h2 className="text-3xl font-display font-bold text-foreground">Common Time Blocking Mistakes</h2>
        <p className="text-lg text-muted-foreground">
          Avoid these pitfalls that can undermine your time blocking effectiveness.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">❌ What Doesn't Work</h3>
            <div className="space-y-3">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">{mistake.title}</p>
                    <p className="text-muted-foreground text-sm">{mistake.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">✅ What Works</h3>
            <div className="space-y-3">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">{mistake.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How GoalPlanner Helps */}
      <section className="space-y-6" id="how-goalplanner-helps">
        <h2 className="text-3xl font-display font-bold text-foreground">How GoalPlanner Enhances Time Blocking</h2>
        <p className="text-lg text-muted-foreground">
          GoalPlanner provides specific features that make time blocking more effective and easier to maintain.
        </p>
        <div className="bg-gradient-to-r from-primary/10 to-momentum/10 rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-4">🚀 Time Blocking Features</h3>
              <ul className="space-y-2 text-primary/80">
                <li>• <strong>Visual calendar blocks:</strong> Color-coded time blocks for at-a-glance scheduling</li>
                <li>• <strong>Task categorization:</strong> Automatic grouping by work type and complexity</li>
                <li>• <strong>Focus time protection:</strong> Dedicated deep work blocks with boundaries</li>
                <li>• <strong>Buffer time management:</strong> Automatic transition and overflow time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-momentum mb-4">⚡ Productivity Integration</h3>
              <ul className="space-y-2 text-momentum/80">
                <li>• <strong>Goal connection:</strong> Link time blocks directly to meaningful objectives</li>
                <li>• <strong>Progress tracking:</strong> See how time blocking advances your goals</li>
                <li>• <strong>Habit integration:</strong> Connect daily routines to time block success</li>
                <li>• <strong>Weekly insights:</strong> Learn your optimal time blocking patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Master Your Schedule?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start time blocking with GoalPlanner. Protect your focus, achieve more in less time, and build sustainable productivity systems.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Time Blocking Free
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-display font-bold text-foreground">Master Time Management Skills</h2>
        <p className="text-lg text-muted-foreground">
          Explore specific time management techniques and connect with productivity systems that support effective scheduling.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Comprehensive time management strategies and techniques</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-management">Time Management →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🍅 Pomodoro Technique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">25-minute focused sprints with strategic breaks</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/pomodoro-technique">Pomodoro →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Focus & Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Improve concentration and mental clarity for better focus</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/focus-and-mental-clarity">Focus & Clarity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build systems that support effective time management</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/productivity">Productivity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Set meaningful goals that drive your time blocking strategy</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🔄 Daily Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build routines that support your time blocking system</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/daily-routine-planner">Daily Routines →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-display font-bold text-foreground">Time Blocking FAQ</h2>
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

export default TimeBlocking;
