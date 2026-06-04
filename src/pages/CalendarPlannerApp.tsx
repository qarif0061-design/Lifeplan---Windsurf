import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const CalendarPlannerApp = () => {
  const faqData = [
    {
      question: "What is a calendar planner app?",
      answer: "A calendar planner app combines calendar scheduling with task planning so you can see events and tasks in one view. Unlike separate calendar and to-do list apps, a calendar planner shows everything together, helping you plan realistically around your fixed commitments. Calendar planners are especially useful for people who want to time-block their tasks alongside existing appointments."
    },
    {
      question: "How is a calendar planner different from a regular calendar?",
      answer: "A regular calendar primarily shows events and appointments. A calendar planner also shows your tasks, priorities, and goals alongside your events. This unified view helps you plan your day more realistically because you can see both your commitments and your available time in one place. Calendar planners also typically offer task prioritization, recurring schedules, and progress tracking that regular calendars don't."
    },
    {
      question: "Can a calendar planner help with time management?",
      answer: "Yes, a calendar planner is one of the most effective time management tools available. By seeing your tasks alongside your events, you can identify your available time, block time for important work, and avoid overcommitting. The visual nature of calendar planning makes time more tangible—you can literally see where your time goes and make better decisions about how to use it."
    },
    {
      question: "How do I choose the best calendar planner app?",
      answer: "Look for: combined calendar and task views, drag-and-drop scheduling, recurring task scheduling, priority management, cross-platform sync, and goal integration. The best calendar planner apps also offer weekly and monthly overviews, flexible views (day, week, month), and the ability to color-code different types of activities. Choose one that matches your planning style—some people prefer detailed daily views while others prefer weekly overviews."
    },
    {
      question: "Should I use a digital or paper calendar planner?",
      answer: "Digital calendar planners offer advantages: automatic reminders, cross-device sync, easy rescheduling, recurring events, and integration with other tools. Paper planners offer: no distractions, tactile satisfaction, forced reflection, and simplicity. Many people use both—digital for scheduled events and meetings, paper for daily planning and reflection. The best choice depends on your personal preference and lifestyle."
    },
    {
      question: "How do I plan my week with a calendar planner?",
      answer: "Start each week by reviewing your goals and identifying 1-3 key priorities. Block time for these priorities first, then add existing appointments and meetings, then fill remaining time with routine tasks. Leave buffer time (20-30%) for unexpected items. At week end, review what worked and what didn't. This weekly rhythm turns calendar planning from a scheduling exercise into a strategic tool for achieving your priorities."
    }
  ];

  const features = [
    {
      title: "Unified Calendar View",
      description: "See events, tasks, and priorities together in one integrated daily or weekly view.",
      icon: "📅"
    },
    {
      title: "Task Scheduling",
      description: "Drag and drop tasks onto your calendar to time-block your priorities effectively.",
      icon: "📋"
    },
    {
      title: "Recurring Schedules",
      description: "Set up daily, weekly, or monthly recurring tasks and events that auto-populate your calendar.",
      icon: "🔄"
    },
    {
      title: "Priority Management",
      description: "Mark tasks by priority level and see how your time allocation matches your priorities.",
      icon: "🎯"
    },
    {
      title: "Weekly Overview",
      description: "Plan and review your entire week at a glance with clear visual layouts.",
      icon: "📊"
    },
    {
      title: "Goal Integration",
      description: "Link scheduled tasks to your goals so every planned activity has clear purpose.",
      icon: "⛓️"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Calendar Planner App 2026 | Plan Events & Tasks Together | GoalPlanner"
        description="The best calendar planner app for combining events, tasks, and goals in one view. Plan your time with a unified calendar and task system. Free to start."
        canonicalPath="/calendar-planner-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Calendar Planner App",
          url: "https://goalplanner.io/calendar-planner-app",
          description: "Looking for a calendar planner app? Learn how to combine events, tasks, and goals in one unified planning view.",
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

      <div className="space-y-16">
        <header className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Plan Everything in One Place</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Calendar Planner App: Combine Events, Tasks & Goals in One View
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              A calendar planner app brings everything together—your events, your tasks, your priorities. No more switching between a calendar for appointments and a separate app for to-dos. See it all, plan it all, and make sure your time goes where it matters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Why a Calendar Planner Beats Separate Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">🔄 See Everything Together</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800">When events and tasks are in separate apps, you can't see the full picture. A calendar planner shows your commitments and available time in one view, so you can plan realistically.</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">⏰ Time-Block Effectively</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800">Drag tasks directly onto your calendar to schedule them around existing appointments. Time blocking becomes effortless when your tasks live on your calendar.</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900">🎯 Align with Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800">See at a glance whether your scheduled time matches your priorities. A calendar planner makes misalignment visible so you can correct it.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Key Features of the Best Calendar Planner App</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{feature.icon}</span>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">How to Plan Your Week with a Calendar Planner</h2>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Start with your fixed commitments</h4>
                  <p className="text-blue-700">Add all meetings, appointments, and fixed events for the week first. This creates the container your tasks need to fit around.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Add your top priorities as time blocks</h4>
                  <p className="text-blue-700">Identify your 1-3 most important tasks and block dedicated time for them. Schedule these during your peak energy hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Fill remaining time with routine tasks</h4>
                  <p className="text-blue-700">Once priorities are blocked, schedule routine tasks and smaller items in the remaining available time slots.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Leave buffer time</h4>
                  <p className="text-blue-700">Always leave 20-30% of your time unscheduled. This buffer absorbs interruptions, delays, and last-minute changes without derailing your plan.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Review and adjust daily</h4>
                  <p className="text-blue-700">Spend 5 minutes at end of each day reviewing what worked and adjusting tomorrow's calendar plan. This turns planning into a dynamic, responsive system.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Plan with Everything in One Place?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for calendar planning that combines events, tasks, and goals in one integrated view. Free on web and mobile.
            </p>
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Free</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">More Planning Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Schedule App</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan tasks, routines, and time blocks in one place</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/schedule-app">Schedule App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set goals that your calendar plan serves</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Track progress toward your calendar-planned goals</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/progress-tracker-app">Progress Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 Weekly Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Structure your weeks with a strategic planning approach</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/weekly-planning">Weekly Planning →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Everything in One App</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Goal Planner – LifePlans combines your calendar, tasks, and goals so you can plan with clarity and purpose. Start free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Start Planning Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default CalendarPlannerApp;
