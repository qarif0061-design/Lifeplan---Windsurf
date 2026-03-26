import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const PomodoroTechnique = () => {
  const faqData = [
    {
      question: "What exactly is the Pomodoro Technique?",
      answer: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the 1980s. You work in focused 25-minute intervals (called 'pomodoros') separated by 5-minute breaks. After four pomodoros, take a longer 15-30 minute break. This structure maintains high focus while preventing mental fatigue through regular breaks."
    },
    {
      question: "Why 25 minutes specifically?",
      answer: "Research shows 25 minutes is optimal for sustained focus - long enough to enter deep work, short enough to maintain attention. Longer sessions often lead to declining performance, while shorter sessions don't allow enough depth. The 5-minute break provides sufficient recovery without losing momentum. Many people adjust slightly (20-30 minutes) based on their personal focus span."
    },
    {
      question: "What should I do during the 5-minute breaks?",
      answer: "Breaks should be restorative, not productive. Stand up, stretch, walk around, get water, look out a window, or do light breathing exercises. Avoid checking emails or social media - this trains your brain that breaks are for recovery, not task switching. The goal is to return to work refreshed, not distracted."
    },
    {
      question: "How do I handle interruptions during pomodoros?",
      answer: "Note the interruption quickly, write it down, and return to your task. If it's urgent, handle it during your next break. For non-urgent interruptions, add them to your 'parking lot' - a list to address after your current pomodoro. Protect your focus time fiercely - most 'emergencies' can wait 25 minutes."
    },
    {
      question: "Can I adjust the Pomodoro times?",
      answer: "Yes! The 25/5 split is a starting point. Many people use 20/10, 50/10, or 90/20 splits. Longer focus periods work well for creative or complex tasks, shorter periods for administrative work. Experiment to find what works for your energy patterns and task types. Consistency matters more than the exact timing."
    },
    {
      question: "What if I finish a task early in a pomodoro?",
      answer: "Use remaining time for: reviewing your work, planning next steps, learning related skills, or lighter tasks. Avoid starting the next major task mid-pomodoro as this can create urgency and stress. Use early finishes as bonus time rather than pressure to fill every minute."
    },
    {
      question: "Does Pomodoro work for creative tasks?",
      answer: "Yes, but with adaptation. Creative work benefits from the structure's rhythm, but may need longer uninterrupted periods. Try extended pomodoros (45-60 minutes) for deep creative work, or use pomodoro for planning/research phases, then separate blocks for pure creative execution. The key is protecting the creative flow state."
    },
    {
      question: "What tools are best for Pomodoro?",
      answer: "Simple timers work best - physical kitchen timers, browser extensions, or dedicated Pomodoro apps. GoalPlanner integrates Pomodoro timing with task management. The best tool is one that's visible but not distracting. Avoid complex apps with too many features that create their own distractions."
    },
    {
      question: "Can Pomodoro help with ADHD or focus issues?",
      answer: "Absolutely. Pomodoro provides external structure that helps with executive function challenges. Use: visual timers for time awareness, shorter pomodoros (15-20 minutes) with more frequent breaks, body doubling (work with others), and physical activity during breaks. The routine reduces decision fatigue and creates predictable focus periods."
    },
    {
      question: "How do I track Pomodoro effectiveness?",
      answer: "Track completed pomodoros daily, note your energy levels, and measure task completion quality. Also track interruptions and their sources. Review weekly to identify your optimal session lengths and break activities. GoalPlanner's time tracking helps correlate Pomodoro sessions with actual productivity gains."
    }
  ];

  const pomodoroSteps = [
    {
      title: "Choose Your Task",
      description: "Select one specific task to focus on during the pomodoro",
      icon: "🎯"
    },
    {
      title: "Set Timer for 25 Minutes",
      description: "Start your timer and work without interruptions until it rings",
      icon: "⏰"
    },
    {
      title: "Work with Full Focus",
      description: "Eliminate distractions and concentrate only on your chosen task",
      icon: "🧘"
    },
    {
      title: "Take 5-Minute Break",
      description: "Step away, stretch, hydrate, and rest your mind",
      icon: "☕"
    },
    {
      title: "Repeat 4 Times",
      description: "Complete four pomodoros, then take a longer 15-30 minute break",
      icon: "🔄"
    },
    {
      title: "Plan Next Session",
      description: "Review progress and plan your next focus period",
      icon: "📋"
    }
  ];

  const bestPractices = [
    {
      title: "Use a Physical Timer",
      description: "Visible, separate from your computer to avoid digital distractions",
      icon: "⏲️"
    },
    {
      title: "Turn Off Notifications",
      description: "Silence phone, close email tabs, disable desktop notifications",
      icon: "🔕"
    },
    {
      title: "Plan Breaks in Advance",
      description: "Know what you'll do during breaks to avoid decision-making",
      icon: "📝"
    },
    {
      title: "Track Your Sessions",
      description: "Monitor completed pomodoros and identify patterns in your productivity",
      icon: "📊"
    },
    {
      title: "Adjust Timing for Your Needs",
      description: "Experiment with 20/10, 50/10, or custom splits based on your focus",
      icon: "⚙️"
    },
    {
      title: "Use Breaks for Recovery",
      description: "Physical movement, hydration, and mental rest, not more work",
      icon: "🏃‍♂️"
    }
  ];

  const commonMistakes = [
    {
      title: "Checking Distractions During Breaks",
      description: "Using break time to check email, social media, or news feeds",
      solution: "Keep breaks completely work-free and restorative"
    },
    {
      title: "Skipping Breaks",
      description: "Working through breaks to 'stay in the zone' or save time",
      solution: "Take every break - they prevent burnout and maintain long-term focus"
    },
    {
      title: "Multitasking During Pomodoros",
      description: "Trying to handle multiple tasks or interruptions during focus periods",
      solution: "Single-task only - protect your pomodoro time fiercely"
    },
    {
      title: "Inappropriate Task Selection",
      description: "Choosing tasks that are too big or undefined for 25-minute sessions",
      solution: "Break large tasks into pomodoro-sized chunks with clear objectives"
    },
    {
      title: "Not Planning Break Activities",
      description: "Wasting break time deciding what to do instead of having restorative activities ready",
      solution: "Pre-plan 2-3 break activities and rotate through them"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Pomodoro Technique Guide 2026 | Focus Timer Method | GoalPlanner"
        description="Master the Pomodoro Technique with proven strategies. Learn 25-minute focus sessions, break strategies, and productivity tips. Start free."
        canonicalPath="/pomodoro-technique"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pomodoro Technique",
          url: "https://goalplanner.io/pomodoro-technique",
          description: "Master the Pomodoro Technique with proven focus and productivity strategies.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Master the Pomodoro Technique</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your focus with the proven Pomodoro Technique. Work in 25-minute focused sprints with strategic breaks to achieve more while avoiding burnout. Join thousands who've mastered their attention.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-red-600 hover:bg-red-700">
            <Link to="/auth">Start Pomodoro Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#how-it-works">Learn How It Works</Link>
          </Button>
        </div>
      </section>

      {/* What Is Pomodoro */}
      <section className="space-y-6" id="what-is-pomodoro">
        <h2 className="text-3xl font-bold text-gray-900">What Is the Pomodoro Technique?</h2>
        <p className="text-lg text-gray-600">
          The Pomodoro Technique breaks your workday into focused 25-minute intervals separated by 5-minute breaks. This simple structure maintains high mental performance while preventing fatigue through regular recovery periods.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">🍅 The Pomodoro Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                25 minutes of focused work + 5-minute break. Repeat 4 times, then take a longer 15-30 minute break. This rhythm maintains peak performance throughout your day.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">🧘 Why It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Creates urgency to start, prevents burnout with regular breaks, trains your brain to focus in sprints, and builds momentum through consistent completion.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-6" id="how-it-works">
        <h2 className="text-3xl font-bold text-gray-900">How the Pomodoro Technique Works</h2>
        <p className="text-lg text-gray-600">
          Follow this simple process to implement Pomodoro effectively with GoalPlanner.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pomodoroSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{step.icon}</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6" id="best-practices">
        <h2 className="text-3xl font-bold text-gray-900">Pomodoro Best Practices</h2>
        <p className="text-lg text-gray-600">
          These proven strategies will make your Pomodoro sessions more effective and sustainable.
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
                <p className="text-gray-600">{practice.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6" id="mistakes">
        <h2 className="text-3xl font-bold text-gray-900">Common Pomodoro Mistakes</h2>
        <p className="text-lg text-gray-600">
          Avoid these pitfalls that can undermine your Pomodoro effectiveness and focus.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">❌ What Doesn't Work</h3>
            <div className="space-y-3">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">{mistake.title}</p>
                    <p className="text-gray-600 text-sm">{mistake.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">✅ What Works</h3>
            <div className="space-y-3">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
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
        <h2 className="text-3xl font-bold text-gray-900">How GoalPlanner Enhances Pomodoro</h2>
        <p className="text-lg text-gray-600">
          GoalPlanner provides specific features that make the Pomodoro Technique more effective and easier to track.
        </p>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-red-900 mb-4">🍅 Pomodoro Integration</h3>
              <ul className="space-y-2 text-red-800">
                <li>• <strong>Built-in Pomodoro timer:</strong> Automatic 25/5 timing with visual alerts</li>
                <li>• <strong>Session tracking:</strong> Monitor completed pomodoros and daily patterns</li>
                <li>• <strong>Task-pomodoro linking:</strong> Connect focus sessions to specific goals</li>
                <li>• <strong>Break planning:</strong> Pre-plan restorative break activities</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">⚡ Focus Enhancement</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• <strong>Distraction blocking:</strong> Protect Pomodoro sessions from interruptions</li>
                <li>• <strong>Progress visualization:</strong> See how Pomodoro advances your goals</li>
                <li>• <strong>Energy matching:</strong> Schedule pomodoros during your peak focus times</li>
                <li>• <strong>Habit integration:</strong> Connect Pomodoro success to daily routines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Master Your Focus?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start using the Pomodoro Technique with GoalPlanner. Build sustained focus, prevent burnout, and achieve more through strategic work-break cycles.
          </p>
          <Button asChild size="lg" className="rounded-full bg-red-600 hover:bg-red-700">
            <Link to="/auth">Start Pomodoro Free</Link>
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-gray-900">Master Focus & Productivity Skills</h2>
        <p className="text-lg text-gray-600">
          Explore specific focus techniques and connect with time management systems that support sustained attention.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Blocking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Schedule focused work sessions and protect your time</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-blocking">Time Blocking →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Focus & Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Improve concentration and mental clarity for better focus</p>
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
              <p className="text-gray-600 mb-4">Build systems that support sustained focus and achievement</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/productivity">Productivity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Deep Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Achieve flow state and maximize focus for complex tasks</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/deep-work">Deep Work →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Student Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Focus techniques for academic success and study sessions</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/student-planner">Student Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚫 ADHD Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Focus strategies specifically designed for neurodivergent minds</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/adhd-productivity">ADHD Strategies →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-gray-900">Pomodoro Technique FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PublicPageLayout>
  );
};

export default PomodoroTechnique;
