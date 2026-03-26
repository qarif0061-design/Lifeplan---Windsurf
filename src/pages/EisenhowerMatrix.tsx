import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const EisenhowerMatrix = () => {
  const faqData = [
    {
      question: "What exactly is the Eisenhower Matrix?",
      answer: "The Eisenhower Matrix is a time management tool that helps you prioritize tasks based on urgency and importance. It divides tasks into four quadrants: Urgent & Important (Do First), Important & Not Urgent (Schedule), Urgent & Not Important (Delegate), and Not Urgent & Not Important (Eliminate). This method ensures you focus on what truly matters rather than just what's loudest."
    },
    {
      question: "How do I determine if a task is urgent vs important?",
      answer: "Urgent means it requires immediate attention (has deadline or consequences for delay). Important means it aligns with your long-term goals and values. Ask: 'What happens if I don't do this today?' (urgency) and 'Does this move me closer to my goals?' (importance). Some tasks are both, some are neither - be honest about the distinction."
    },
    {
      question: "What goes in each quadrant?",
      answer: "Quadrant 1 (Urgent & Important): Crises, deadlines, problems. Quadrant 2 (Important & Not Urgent): Goal planning, relationship building, skill development. Quadrant 3 (Urgent & Not Important): Interruptions, some meetings, others' priorities. Quadrant 4 (Not Urgent & Not Important): Time wasters, busywork, unnecessary tasks."
    },
    {
      question: "How often should I review my Eisenhower Matrix?",
      answer: "Daily for planning, weekly for reflection. Start each day by reviewing Quadrant 1 tasks. Schedule time for Quadrant 2 tasks. Process Quadrant 3 tasks quickly (delegate or say no). Eliminate Quadrant 4 tasks. Weekly review helps improve your categorization accuracy and planning effectiveness."
    },
    {
      question: "What if everything is urgent and important?",
      answer: "This usually indicates poor planning or boundary issues. Triage ruthlessly: what truly needs today vs this week? Delegate anything someone else can do. Say no to non-essential requests. Use the matrix to communicate your priorities to others. Consider if you're overcommitting or need to renegotiate deadlines."
    },
    {
      question: "How do I handle tasks in Quadrant 3 (Delegate)?",
      answer: "For delegation: choose the right person, provide clear instructions and deadlines, follow up without micromanaging, and accept that done is better than perfect. If you can't delegate, ask if the task is truly necessary or if it can be automated/simplified. Sometimes 'delegate' means saying no or teaching someone else."
    },
    {
      question: "Should I eliminate all Quadrant 4 tasks?",
      answer: "Not necessarily. Some 'waste' serves recovery (social media, casual reading). Others are genuinely unnecessary. Distinguish between recovery and true time-wasting. Be realistic about what you're willing to eliminate vs what you need for mental health. Start with the obvious time-wasters first."
    },
    {
      question: "Can the Eisenhower Matrix work with creative projects?",
      answer: "Yes, but adapt it. Creative work often falls in Quadrant 2 (Important & Not Urgent) - it's valuable but rarely has true deadlines. Schedule protected creative time. Break large projects into smaller tasks that can fit in the matrix. Don't force artificial urgency on creative work - let it marinate and develop naturally."
    },
    {
      question: "What tools are best for the Eisenhower Matrix?",
      answer: "Simple tools work best: whiteboard/corkboard with four quadrants, digital apps like GoalPlanner, or even paper. The key is easy updating and visual clarity. Avoid complex tools that take more time to manage than the tasks themselves. Update your matrix daily, not weekly."
    },
    {
      question: "How do I combine Eisenhower with other methods?",
      answer: "Eisenhower works great with time blocking (schedule Quadrant 1 tasks), Pomodoro (focus on one matrix task at a time), and weekly planning (review and adjust quadrants). Use it as your daily filter - ask 'where does this task belong?' before starting. The matrix guides what to do, other methods guide how to do it."
    }
  ];

  const quadrants = [
    {
      title: "Do First",
      description: "Urgent & Important - Crises, deadlines, critical problems",
      color: "red",
      icon: "🔥",
      examples: "Client emergencies, project deadlines, critical bugs, family emergencies"
    },
    {
      title: "Schedule",
      description: "Important & Not Urgent - Goal planning, skill development, relationship building",
      color: "blue",
      icon: "🎯",
      examples: "Long-term projects, exercise, learning, strategic planning, health activities"
    },
    {
      title: "Delegate",
      description: "Urgent & Not Important - Interruptions, meetings, others priorities",
      color: "yellow",
      icon: "👥",
      examples: "Some meetings, quick requests, helping colleagues, routine emails"
    },
    {
      title: "Eliminate",
      description: "Not Urgent & Not Important - Time wasters, busywork, unnecessary tasks",
      color: "gray",
      icon: "🗑️",
      examples: "Social media scrolling, unnecessary meetings, perfectionism, busywork"
    }
  ];

  const bestPractices = [
    {
      title: "Review Daily",
      description: "Start each day reviewing and categorizing new tasks",
      icon: "📅"
    },
    {
      title: "Be Honest About Importance",
      description: "Distinguish between truly important vs merely urgent tasks",
      icon: "🎯"
    },
    {
      title: "Schedule Quadrant 2 Time",
      description: "Protect time for important but not urgent activities",
      icon: "🗓️"
    },
    {
      title: "Process Quadrant 3 Quickly",
      description: "Handle delegate tasks immediately or say no firmly",
      icon: "⚡"
    },
    {
      title: "Eliminate Ruthlessly",
      description: "Regularly remove time-wasters from your life and schedule",
      icon: "🗑️"
    },
    {
      title: "Use with Time Blocking",
      description: "Schedule focused blocks for matrix tasks",
      icon: "🧘"
    },
    {
      title: "Review Weekly",
      description: "Analyze patterns and improve your categorization accuracy",
      icon: "📊"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Eisenhower Matrix Guide 2026 | Priority Management | GoalPlanner"
        description="Master the Eisenhower Matrix for effective priority management. Learn to categorize tasks, focus on what matters, and eliminate time wasters. Start free."
        canonicalPath="/eisenhower-matrix"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Eisenhower Matrix",
          url: "https://goalplanner.io/eisenhower-matrix",
          description: "Master the Eisenhower Matrix for effective task prioritization and time management.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Master the Eisenhower Matrix</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform your productivity with the Eisenhower Matrix. Learn to prioritize tasks by urgency and importance, focus on what truly matters, and eliminate time wasters. Join thousands who've mastered their priorities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Start Priority Management Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#quadrants">Learn the Matrix</Link>
          </Button>
        </div>
      </section>

      {/* What Is Eisenhower Matrix */}
      <section className="space-y-6" id="what-is-eisenhower">
        <h2 className="text-3xl font-bold text-gray-900">What Is the Eisenhower Matrix?</h2>
        <p className="text-lg text-gray-600">
          The Eisenhower Matrix is a simple but powerful tool for prioritizing tasks based on two questions: Is it urgent? Is it important? This creates four quadrants that guide you to focus on what truly matters.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">🎯 Traditional Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Reacting to whatever seems most urgent, constant firefighting, and feeling busy but not productive.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">📋 Eisenhower Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Systematically categorizing tasks, focusing on important goals, and eliminating what doesn't advance your priorities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Four Quadrants */}
      <section className="space-y-6" id="quadrants">
        <h2 className="text-3xl font-bold text-gray-900">The Four Eisenhower Quadrants</h2>
        <p className="text-lg text-gray-600">
          Understanding each quadrant helps you make better decisions about where to focus your time and energy.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {quadrants.map((quadrant, index) => (
            <Card key={index} className={`border-${quadrant.color}-200 bg-${quadrant.color}-50`}>
              <CardHeader>
                <CardTitle className={`text-${quadrant.color}-900 flex items-center gap-2`}>
                  <span className="text-2xl">{quadrant.icon}</span>
                  {quadrant.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-${quadrant.color}-800`}>{quadrant.description}</p>
                <div className="mt-3">
                  <p className="font-semibold">Examples:</p>
                  <p className="text-sm">{quadrant.examples}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Step-by-Step Implementation */}
      <section className="space-y-6" id="step-by-step">
        <h2 className="text-3xl font-bold text-gray-900">Using the Eisenhower Matrix: Step-by-Step</h2>
        <p className="text-lg text-gray-600">
          Follow this daily process to master priority management with GoalPlanner.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                List All Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Write down everything you need to do without filtering yet.</p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                Categorize Each Task
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ask: Is this urgent? Is this important? Place in the correct quadrant.</p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                Execute by Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Tackle Quadrant 1 first, then schedule time for Quadrant 2.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                Review Weekly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Analyze your patterns and improve your categorization accuracy.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6" id="best-practices">
        <h2 className="text-3xl font-bold text-gray-900">Eisenhower Matrix Best Practices</h2>
        <p className="text-lg text-gray-600">
          These proven strategies will make your priority management more effective and consistent.
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

      {/* How GoalPlanner Helps */}
      <section className="space-y-6" id="how-goalplanner-helps">
        <h2 className="text-3xl font-bold text-gray-900">How GoalPlanner Enhances Priority Management</h2>
        <p className="text-lg text-gray-600">
          GoalPlanner provides specific features that make the Eisenhower Matrix more effective and easier to implement daily.
        </p>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">🎯 Matrix Features</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• <strong>Visual quadrant display:</strong> Drag and drop tasks into four priority quadrants</li>
                <li>• <strong>Automatic categorization:</strong> Quick urgency/importance assessment</li>
                <li>• <strong>Priority scheduling:</strong> Focus on high-impact tasks first</li>
                <li>• <strong>Progress tracking:</strong> See how matrix tasks advance your goals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">⚡ Productivity Integration</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• <strong>Goal connection:</strong> Link matrix tasks to meaningful objectives</li>
                <li>• <strong>Time blocking integration:</strong> Schedule focused blocks for priority tasks</li>
                <li>• <strong>Weekly planning:</strong> Review and adjust your weekly priorities</li>
                <li>• <strong>Habit building:</strong> Connect daily decisions to your priority system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Master Your Priorities?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start using the Eisenhower Matrix with GoalPlanner. Focus on what truly matters, eliminate time wasters, and achieve your most important goals.
          </p>
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Start Priority Management Free</Link>
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-gray-900">Master Priority Management Skills</h2>
        <p className="text-lg text-gray-600">
          Explore specific prioritization techniques and connect with time management systems that support effective decision-making.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Comprehensive time management strategies and techniques</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-management">Time Management →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Time Blocking</CardTitle>
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
              <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Set meaningful goals that drive your priority decisions</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Build systems that support effective priority management</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/productivity">Productivity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 To-Do Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Organize tasks effectively with proven methods</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list">To-Do Lists →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Student Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Priority management for academic success and study sessions</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/student-planner">Student Planning →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-gray-900">Eisenhower Matrix FAQ</h2>
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

export default EisenhowerMatrix;
