import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const Procrastination = () => {
  const faqData = [
    {
      question: "Why do I procrastinate even when I know it's bad for me?",
      answer: "Procrastination isn't laziness—it's an emotional regulation problem. You procrastinate when a task triggers negative emotions (boredom, anxiety, frustration, self-doubt). Your brain seeks immediate relief by doing something else, even though you know it creates more stress later. Understanding this helps: procrastination is your mind's attempt to protect you from discomfort, not a character flaw."
    },
    {
      question: "What's the most effective way to stop procrastinating?",
      answer: "Start ridiculously small. The 2-minute rule works: if a task takes less than 2 minutes, do it immediately. For bigger tasks, shrink the first step to 2 minutes or less. 'Write report' becomes 'Open document and write one sentence.' This reduces the activation energy needed to start. Once you begin, momentum often carries you forward. The key is making starting easier than avoiding."
    },
    {
      question: "Can procrastination actually be useful sometimes?",
      answer: "Yes, but only if it's strategic rather than reactive. 'Productive procrastination' means delaying low-priority tasks to focus on what matters most. Sometimes your subconscious needs time to process complex problems. However, if procrastination consistently causes stress, missed deadlines, or reduced quality of life, it's no longer serving you. The goal is to procrastinate on the right things, not on everything."
    },
    {
      question: "How is procrastination different from laziness?",
      answer: "Laziness is choosing inaction when you're capable of action. Procrastination is actively choosing to do something else instead of the important task. Lazy people are content doing nothing; procrastinators are often busy doing less important things. Procrastination creates internal conflict and anxiety, while laziness doesn't. Most people who think they're lazy are actually procrastinating—they want to be productive but feel blocked."
    },
    {
      question: "What causes procrastination in people with ADHD?",
      answer: "ADHD procrastination often stems from executive function challenges: difficulty with task initiation, time blindness (understanding how long things take), and working memory issues. The brain's reward system also works differently, making it harder to stay motivated for delayed gratification. Strategies that help: external structure, clear next steps, immediate rewards, body doubling (working with others), and medication when prescribed by a doctor."
    },
    {
      question: "How do I handle procrastination on big, overwhelming projects?",
      answer: "Break the project into micro-steps so small they feel ridiculous. Instead of 'build website,' start with 'create one folder.' Use the 'salami slice' method: cut one thin slice at a time. Also, identify what specifically feels overwhelming—is it the scope, complexity, or fear of failure? Address that specific fear. Sometimes just clarifying the next physical action reduces overwhelm enough to start."
    },
    {
      question: "What role does anxiety play in procrastination?",
      answer: "Anxiety and procrastination often create a vicious cycle. You feel anxious about a task, so you avoid it. Avoiding creates more anxiety (about deadlines, consequences), making it even harder to start. Breaking this cycle requires addressing both the anxiety and the procrastination. Techniques: mindfulness to reduce anxiety, breaking tasks to reduce overwhelm, and self-compassion to reduce perfectionism and self-criticism."
    },
    {
      question: "How can I tell if I'm procrastinating or just need rest?",
      answer: "Ask yourself: Am I avoiding this specific task, or do I genuinely need recovery? Procrastination often involves switching to other 'productive' activities to avoid guilt. Rest feels intentional and restorative. If you're scrolling social media while feeling anxious about what you should be doing—that's procrastination. If you're taking a walk and feel genuinely refreshed—that's rest. Both are valid, but they serve different purposes."
    },
    {
      question: "What productivity tools help with procrastination?",
      answer: "Tools that reduce friction and provide structure work best: apps with clear next steps and deadlines, time blocking tools that protect focus time, habit trackers for building consistent routines, and accountability systems (sharing goals with others). Avoid complex tools that create more work. The best tool is one that makes starting easier and provides gentle accountability without adding pressure."
    },
    {
      question: "How long does it take to overcome chronic procrastination?",
      "answer": "Overcoming procrastination is like building any habit—it takes consistent practice, but you can see improvement quickly. Most people notice changes within 2-3 weeks of consistent strategy use. However, deep-seated patterns may take months to fully rewire. The key is progress, not perfection. Some days you'll procrastinate less, others more. Focus on the trend line, not individual days. Celebrate small wins and be patient with the process."
    }
  ];

  const strategies = [
    {
      title: "2-Minute Rule",
      description: "If it takes less than 2 minutes, do it immediately.",
      icon: "⏱️"
    },
    {
      title: "Task Decomposition",
      description: "Break overwhelming tasks into tiny, specific steps.",
      icon: "🔪"
    },
    {
      title: "Environment Design",
      description: "Remove distractions and make starting easier.",
      icon: "🏗️"
    },
    {
      title: "Implementation Intentions",
      description: "Use 'When X happens, I will do Y' statements.",
      icon: "📝"
    },
    {
      title: "Body Doubling",
      description: "Work alongside others (even virtually) for accountability.",
      icon: "👥"
    },
    {
      title: "Reward System",
      description: "Create immediate rewards for completing difficult tasks.",
      icon: "🎁"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="How to Stop Procrastinating 2026 | Proven Strategies That Work | GoalPlanner"
        description="Stop procrastinating with proven psychological strategies. Learn why you procrastinate, how to break the cycle, and build habits of consistent action. Start today."
        canonicalPath="/procrastination"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Procrastination",
          url: "https://goalplanner.io/procrastination",
          description: "Proven strategies to stop procrastinating and build consistent action habits.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Stop Procrastinating, Start Living</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Break free from the procrastination cycle with proven strategies. Understand why you delay, learn practical techniques, and build habits of consistent action.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Beat Procrastination Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#why-it-happens">Understand Why</Link>
          </Button>
        </div>
      </section>

      {/* Why We Procrastinate */}
      <section className="space-y-6" id="why-it-happens">
        <h2 className="text-3xl font-bold text-gray-900">Why We Procrastinate</h2>
        <p className="text-lg text-gray-600">
          Procrastination isn't a character flaw—it's an emotional response to tasks that trigger discomfort.
        </p>
        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">🧠 The Psychology Behind Procrastination</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-purple-800 mb-3">What Triggers It</h4>
              <ul className="space-y-2 text-purple-700">
                <li>• Tasks that feel boring or overwhelming</li>
                <li>• Fear of failure or judgment</li>
                <li>• Perfectionism and high standards</li>
                <li>• Unclear next steps or instructions</li>
                <li>• Delayed gratification (no immediate reward)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-3">What Your Brain Does</h4>
              <ul className="space-y-2 text-purple-700">
                <li>• Seeks immediate mood repair</li>
                <li>• Chooses easier, more rewarding alternatives</li>
                <li>• Rationalizes the delay</li>
                <li>• Creates temporary relief (but long-term stress)</li>
                <li>• Forms a pattern that gets harder to break</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Procrastination Types */}
      <section className="space-y-6" id="types">
        <h2 className="text-3xl font-bold text-gray-900">Common Types of Procrastination</h2>
        <p className="text-lg text-gray-600">
          Understanding your procrastination pattern helps you choose the right strategy.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">😰 The Perfectionist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                Delays starting because conditions aren't perfect or fear of not meeting high standards.
              </p>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-900">😴 The Overwhelmed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800">
                Avoids tasks that feel too big, complex, or unclear where to begin.
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-900">🎯 The Thrill-Seeker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800">
                Waits until the last minute for the adrenaline rush of working under pressure.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">🤔 The Analyzer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Spends too much time researching and planning, never actually starting.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">😪 The Avoider</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Puts off tasks that trigger anxiety, discomfort, or difficult emotions.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">🔄 The Busy Procrastinator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Stays busy with less important tasks to avoid the main priority.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Proven Strategies */}
      <section className="space-y-6" id="strategies">
        <h2 className="text-3xl font-bold text-gray-900">Proven Strategies to Stop Procrastinating</h2>
        <p className="text-lg text-gray-600">
          These techniques work because they reduce the emotional barriers to starting.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{strategy.icon}</span>
                  {strategy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{strategy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Breaking the Cycle */}
      <section className="space-y-6" id="breaking-cycle">
        <h2 className="text-3xl font-bold text-gray-900">Breaking the Procrastination Cycle</h2>
        <p className="text-lg text-gray-600">
          The cycle looks like this: Task → Anxiety → Avoidance → Temporary Relief → More Anxiety. Here's how to interrupt it.
        </p>
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">1. Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">Recognize when you're avoiding and what emotion it's triggering</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">2. Accept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">Acknowledge the discomfort without judgment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">3. Shrink</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">Make the next step ridiculously small (2-minute rule)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">4. Start</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">Take the tiny step immediately, before your brain can object</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Environment Design */}
      <section className="space-y-6" id="environment">
        <h2 className="text-3xl font-bold text-gray-900">Design Your Environment for Action</h2>
        <p className="text-lg text-gray-600">
          Your environment can either support or sabotage your best intentions.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">🛡️ Remove Friction</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Prepare in advance</p>
                  <p className="text-gray-600 text-sm">Lay out workout clothes the night before</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Clear distractions</p>
                  <p className="text-gray-600 text-sm">Use apps to block social media during focus time</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Create triggers</p>
                  <p className="text-gray-600 text-sm">Leave important documents on your desk</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">⚡ Add Momentum</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Accountability partners</p>
                  <p className="text-gray-600 text-sm">Share your goals with someone who checks in</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Visual progress tracking</p>
                  <p className="text-gray-600 text-sm">Use calendars or apps to see your streak</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Immediate rewards</p>
                  <p className="text-gray-600 text-sm">Celebrate small wins immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Break Free from Procrastination?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start building habits of consistent action with GoalPlanner. Break tasks into manageable steps, track your progress, and get the accountability you need.
          </p>
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Start Taking Action Today</Link>
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-gray-900">Master Procrastination Strategies</h2>
        <p className="text-lg text-gray-600">
          Explore specific procrastination challenges and solutions for different situations.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧠 ADHD & Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Strategies specifically for ADHD-related procrastination</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/adhd-productivity">ADHD Strategies →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Student Success</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Beat study procrastination and academic delays</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/student-planner">Student Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💼 Work Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Overcome workplace procrastination and delays</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/productivity-at-work">Work Productivity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Build better to-do lists and task systems</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list">To-Do Lists →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-gray-900">Procrastination FAQ</h2>
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

export default Procrastination;
