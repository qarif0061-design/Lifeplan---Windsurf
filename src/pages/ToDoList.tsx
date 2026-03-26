import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const ToDoList = () => {
  const faqData = [
    {
      question: "What's the difference between a to-do list and a daily planner?",
      answer: "A to-do list captures what needs to be done. A daily planner organizes when and how you'll do it. To-do lists answer 'what?' while daily planners answer 'when?' and 'how?' The most effective systems combine both: capture tasks in a to-do list, then move the most important ones into your daily plan with specific time blocks."
    },
    {
      question: "How many tasks should I have on my daily to-do list?",
      answer: "Research suggests 1-3 major priorities plus 3-5 smaller tasks is optimal. More than that creates decision fatigue and reduces completion rates. The key isn't the number of tasks, but the total time and mental energy required. A good rule: if you can't realistically complete everything on a good day, your list is too long."
    },
    {
      question: "What's the best way to organize a to-do list?",
      answer: "Organize by priority and context, not just urgency. Use categories like: Must Do Today (1-3 items), Should Do Today (2-3 items), Could Do Today (optional), and Waiting On (blocked by others). Within each category, order by energy required or time of day. This structure helps you focus on what matters most rather than just checking off easy items."
    },
    {
      question: "Should I use digital or paper to-do lists?",
      answer: "Digital to-do lists offer reminders, searchability, easy editing, and cross-device access. Paper lists provide tactile satisfaction, fewer distractions, and creative freedom. Many people use both: paper for daily brain dumps and priority setting, digital for recurring tasks and reminders. Choose based on whether you value convenience and features or the physical act of writing."
    },
    {
      question: "How do I handle tasks that keep getting postponed?",
      answer: "First, ask why it's being postponed: too big, unclear, boring, or scary? Then either break it into smaller steps, clarify exactly what's needed, make it more enjoyable, or address the fear. If a task has been postponed multiple times, consider whether it's actually important or if someone else should do it."
    },
    {
      question: "What's the best to-do list method for students?",
      answer: "Students benefit from organizing by subject and urgency: Today's Classes (assignments due today), This Week (upcoming deadlines, study sessions), Long-term (exam prep, projects), and Personal (life admin, self-care). Also include buffer time for unexpected study needs and review sessions. Color-coding by subject can help with quick visual scanning."
    },
    {
      question: "How do I make to-do lists less overwhelming?",
      answer: "Use the 'rule of 3': choose only 3 most important tasks per day. Create a 'might do' list for everything else. Break large tasks into smaller, specific steps. Include time estimates to be realistic about what you can accomplish. Review your list at the end of each day and move unfinished items forward rather than letting them pile up."
    },
    {
      question: "Should I include personal tasks on work to-do lists?",
      answer: "Yes, but keep them separate and realistic. Create work and personal sections, or maintain separate lists. Include personal tasks that need to happen during work hours (appointments, important calls) but move purely personal items to evening or weekend lists. This prevents personal tasks from distracting from work priorities while ensuring nothing important falls through the cracks."
    },
    {
      question: "How often should I review and update my to-do list?",
      answer: "Daily review (evening): plan tomorrow's priorities. Weekly review (weekend): clear completed items, assess what's still relevant, and plan the week ahead. Monthly review: evaluate overall patterns and adjust your system. The key is consistency—regular reviews prevent lists from becoming overwhelming dumping grounds."
    },
    {
      question: "What features are essential in a to-do list app?",
      answer: "Essential features include: quick task capture, priority setting, due dates and reminders, simple organization (categories/projects), cross-device sync, and minimal complexity. Avoid apps with excessive features, complex organization systems, or constant notifications that create pressure. The best to-do app disappears into the background while helping you stay organized."
    }
  ];

  const methods = [
    {
      title: "Eisenhower Matrix",
      description: "Organize tasks by urgency and importance into four quadrants.",
      icon: "📊"
    },
    {
      title: "Ivy Lee Method",
      description: "Choose 6 most important tasks each day and complete them in order.",
      icon: "📝"
    },
    {
      title: "Eat That Frog",
      description: "Do your hardest, most important task first thing in the morning.",
      icon: "🐸"
    },
    {
      title: "Time Blocking",
      description: "Schedule specific time blocks for each task on your calendar.",
      icon: "⏰"
    },
    {
      title: "Must/Should/Could",
      description: "Categorize tasks by priority level to focus on what matters most.",
      icon: "🎯"
    },
    {
      title: "Two-Minute Rule",
      description: "If something takes less than 2 minutes, do it immediately.",
      icon: "⚡"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best To-Do List Methods 2026 | Organize Tasks & Get Things Done | GoalPlanner"
        description="Master to-do lists with proven methods. Learn Eisenhower Matrix, Ivy Lee method, and time blocking. Organize tasks, reduce overwhelm, and actually complete your list."
        canonicalPath="/to-do-list"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "To-Do List",
          url: "https://goalplanner.io/to-do-list",
          description: "Master to-do lists with proven methods and organizational strategies.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Master Your To-Do List</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn proven methods to organize tasks, reduce overwhelm, and actually complete what matters most. From Eisenhower Matrix to time blocking, find the system that works for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-orange-600 hover:bg-orange-700">
            <Link to="/auth">Organize Your Tasks</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#methods">See Methods</Link>
          </Button>
        </div>
      </section>

      {/* What Makes a Good To-Do List */}
      <section className="space-y-6" id="what-makes-good">
        <h2 className="text-3xl font-bold text-gray-900">What Makes a Good To-Do List?</h2>
        <p className="text-lg text-gray-600">
          A great to-do list doesn't just capture tasks—it helps you focus on what matters and actually get things done.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">✅ Effective Lists Have:</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Clear Priorities</p>
                  <p className="text-gray-600 text-sm">1-3 most important tasks stand out</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Realistic Scope</p>
                  <p className="text-gray-600 text-sm">Completable in a day or week</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Action-Oriented</p>
                  <p className="text-gray-600 text-sm">Each item starts with a verb</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Regular Review</p>
                  <p className="text-gray-600 text-sm">Updated daily/weekly</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">❌ Ineffective Lists Have:</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Too Many Items</p>
                  <p className="text-gray-600 text-sm">Creates overwhelm and decision fatigue</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Vague Tasks</p>
                  <p className="text-gray-600 text-sm">"Work on project" instead of specific actions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">No Prioritization</p>
                  <p className="text-gray-600 text-sm">Everything seems equally important</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Never Updated</p>
                  <p className="text-gray-600 text-sm">Becomes a graveyard of unfinished tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* To-Do List Methods */}
      <section className="space-y-6" id="methods">
        <h2 className="text-3xl font-bold text-gray-900">Proven To-Do List Methods</h2>
        <p className="text-lg text-gray-600">
          These methods work because they provide structure and help you focus on what matters most.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((method, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{method.icon}</span>
                  {method.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Eisenhower Matrix Explained */}
      <section className="space-y-6" id="eisenhower">
        <h2 className="text-3xl font-bold text-gray-900">Eisenhower Matrix: The Priority System</h2>
        <p className="text-lg text-gray-600">
          The Eisenhower Matrix helps you decide what to do now, schedule later, delegate, or eliminate.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">🔥 Urgent & Important (Do First)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                Crises, deadlines, problems. These require immediate attention and have significant consequences if not handled.
              </p>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">📅 Not Urgent & Important (Schedule)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Goal planning, relationship building, prevention, new opportunities. These drive long-term success.
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-900">📞 Urgent & Not Important (Delegate)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800">
                Some meetings, interruptions, many emails, popular activities. These feel urgent but don't advance your goals.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-gray-900">🗑️ Not Urgent & Not Important (Eliminate)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800">
                Trivial tasks, time wasters, some emails, some phone calls. These distract from what matters.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Digital vs Paper */}
      <section className="space-y-6" id="digital-vs-paper">
        <h2 className="text-3xl font-bold text-gray-900">Digital vs. Paper To-Do Lists</h2>
        <p className="text-lg text-gray-600">
          Choose the format that fits your workflow and personality.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">💻 Digital Advantages</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Reminders & Notifications</p>
                  <p className="text-gray-600 text-sm">Never forget important deadlines</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Search & Filter</p>
                  <p className="text-gray-600 text-sm">Find tasks quickly across projects</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Cross-Device Sync</p>
                  <p className="text-gray-600 text-sm">Access your list anywhere</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Easy Editing</p>
                  <p className="text-gray-600 text-sm">Reorganize and update quickly</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">📝 Paper Advantages</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Tactile Satisfaction</p>
                  <p className="text-gray-600 text-sm">Physical act of crossing off items</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Fewer Distractions</p>
                  <p className="text-gray-600 text-sm">No notifications or digital interruptions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Memory Enhancement</p>
                  <p className="text-gray-600 text-sm">Writing helps with retention</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Creative Freedom</p>
                  <p className="text-gray-600 text-sm">Draw, doodle, organize visually</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6" id="mistakes">
        <h2 className="text-3xl font-bold text-gray-900">Common To-Do List Mistakes</h2>
        <p className="text-lg text-gray-600">
          Avoid these pitfalls that turn to-do lists from productivity tools into sources of stress.
        </p>
        <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">🚫 What to Avoid</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• Making lists too long (causes overwhelm)</li>
                <li>• Including vague tasks (unclear what to do)</li>
                <li>• No time estimates (unrealistic planning)</li>
                <li>• Ignoring energy levels (wrong timing)</li>
                <li>• Never reviewing (accumulates stale items)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-900 mb-4">✅ What to Do Instead</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• Limit to 3 major priorities per day</li>
                <li>• Make every task specific and actionable</li>
                <li>• Include realistic time estimates</li>
                <li>• Match tasks to your energy patterns</li>
                <li>• Review and update daily/weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Tame Your To-Do List?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Start organizing tasks with a system that actually works. Set priorities, track progress, and complete what matters most with GoalPlanner.
          </p>
          <Button asChild size="lg" className="rounded-full bg-orange-600 hover:bg-orange-700">
            <Link to="/auth">Organize Your Tasks Free</Link>
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-gray-900">Master Task Organization</h2>
        <p className="text-lg text-gray-600">
          Explore specific to-do list techniques and templates for different situations and needs.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Daily Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Ready-to-use daily to-do list templates</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/daily-to-do-list-template">Daily Templates →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Student Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">To-do lists specifically for students</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list-for-students">Student Lists →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎨 Aesthetic Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Beautiful and inspiring to-do list designs</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/aesthetic-to-do-list">Aesthetic Lists →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Minimalist Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Simple, clean to-do list approaches</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/minimalist-to-do-list">Minimalist Lists →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-gray-900">To-Do List FAQ</h2>
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

export default ToDoList;
