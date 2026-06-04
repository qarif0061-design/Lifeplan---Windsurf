import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const AgendaPlanningApp = () => {
  const faqData = [
    {"question":"What is an agenda planning app?","answer":"An agenda planning app helps you create meeting agendas, track action items, and organize your professional schedule around meetings and tasks."},
    {"question":"How is an agenda planner different from a daily planner?","answer":"An agenda planner focuses on meetings and their outcomes, while a daily planner covers your entire day including tasks, habits, and goals."},
    {"question":"Can I share agendas with meeting attendees?","answer":"Yes. Many agenda planning apps let you share agendas before meetings so everyone comes prepared."},
    {"question":"What features should I look for?","answer":"Agenda templates, action item tracking, meeting notes, reminder integration, and a combined view of meetings and tasks."},
    {"question":"Is an agenda planner useful for one-on-one meetings?","answer":"Very useful. You can create recurring agenda templates for one-on-ones and track discussion points over time."},
    {"question":"Can I track action items from multiple meetings?","answer":"Yes. A good agenda planner consolidates action items from all your meetings in one place for easy follow-up."}
  ];

  const features = [
    {"title":"Meeting Agendas","description":"Create structured agendas for meetings and track discussion points.","icon":"📝"},
    {"title":"Action Items","description":"Capture and assign action items that come out of meetings.","icon":"📋"},
    {"title":"Schedule View","description":"See your meetings and tasks together in one unified view.","icon":"📅"},
    {"title":"Priority Tasks","description":"Mark your most important tasks that need attention today.","icon":"🎯"},
    {"title":"Meeting Reminders","description":"Get reminders before meetings with the agenda attached.","icon":"🔔"},
    {"title":"Productivity Tracking","description":"Track how your time is distributed across meetings and work.","icon":"📊"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Agenda Planning App 2026 | An agenda planning app helps you organize meetings, set agendas, track action items, and plan your day around what matters most professionally | GoalPlanner"
        description="An agenda planning app helps you organize meetings, set agendas, track action items, and plan your day around what matters most professionally."
        canonicalPath="/agenda-planning-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Agenda Planning App",
          url: "https://goalplanner.io/agenda-planning-app",
          description: "An agenda planning app helps you organize meetings, set agendas, track action items, and plan your day around what matters most professionally.",
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
            <Badge variant="secondary" className="w-fit">Plan Your Agenda</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Agenda Planning App: Structure Your Meetings and Tasks
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              An agenda planning app helps you organize meetings, set agendas, track action items, and plan your day around what matters most professionally.
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
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="text-lg text-gray-600">Everything you need to stay organized and achieve your goals.</p>
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
          <h2 className="text-3xl font-bold text-gray-900">How to Get Started</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <div className="space-y-4">
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Create your agenda</h4>
                    <p className="text-blue-700">Before each meeting, create a structured agenda with topics and time allocations.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Capture notes</h4>
                    <p className="text-blue-700">During the meeting, take notes and capture key decisions.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Track action items</h4>
                    <p className="text-blue-700">Record action items with owners and deadlines during or right after meetings.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Follow up</h4>
                    <p className="text-blue-700">Review action items from previous meetings and track completion status.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans free today. Start on web or mobile.
            </p>
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Free</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">More Tools to Help You Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan each day with tasks, priorities, and reflection</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Set and track goals that matter</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 Habit Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build and maintain positive routines</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📋 Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Monitor your achievements over time</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/progress-tracker-app">Progress Tracker →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Journey Today</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              The right tools make all the difference. Try Goal Planner – LifePlans free and see what you can achieve.
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
              <AccordionItem key={index} value={String(index)}>
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

export default AgendaPlanningApp;
