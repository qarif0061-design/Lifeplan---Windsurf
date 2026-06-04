import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const WorkPlanner = () => {
  const faqData = [
    {"question":"What is a work planner?","answer":"A work planner helps professionals organize their daily tasks, manage projects, track deadlines, and align daily work with larger career goals."},
    {"question":"How is a work planner different from a personal planner?","answer":"A work planner focuses on professional tasks, projects, meetings, and career goals. It often includes features like project tracking and deadline management."},
    {"question":"Can I use a work planner for multiple projects?","answer":"Yes. The best work planners support organizing tasks across multiple projects with clear categorization and priority levels."},
    {"question":"What features should a good work planner have?","answer":"Task management, deadline tracking, meeting notes, project overview, priority setting, and integration with your daily schedule."},
    {"question":"Is a work planner useful for remote work?","answer":"Especially useful for remote workers. It provides structure, helps separate work from personal time, and keeps you organized without office cues."},
    {"question":"How much time should I spend on work planning?","answer":"5-10 minutes at the start of your workday and 5 minutes at the end. Weekly planning takes 15-30 minutes on Sunday or Monday."}
  ];

  const features = [
    {"title":"Task Management","description":"Organize work tasks by project, priority, and deadline.","icon":"📋"},
    {"title":"Schedule Integration","description":"Plan work tasks around meetings and fixed commitments.","icon":"📅"},
    {"title":"Goal Alignment","description":"Connect daily work to quarterly and yearly professional goals.","icon":"🎯"},
    {"title":"Productivity Insights","description":"Track your work output and identify productivity patterns.","icon":"📊"},
    {"title":"Project Overview","description":"See all your projects and their progress at a glance.","icon":"🔄"},
    {"title":"Cross-Device Sync","description":"Access your work planner from office, home, or on the go.","icon":"☁️"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Work Planner 2026 | A work planner helps you manage projects, deadlines, meetings, and daily tasks all in one place | GoalPlanner"
        description="A work planner helps you manage projects, deadlines, meetings, and daily tasks all in one place. Stay organized, meet deadlines, and advance your career."
        canonicalPath="/work-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Work Planner",
          url: "https://goalplanner.io/work-planner",
          description: "A work planner helps you manage projects, deadlines, meetings, and daily tasks all in one place. Stay organized, meet deadlines, and advance your career.",
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
            <Badge variant="secondary" className="w-fit">Plan Your Work</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Work Planner: Organize Your Professional Life
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              A work planner helps you manage projects, deadlines, meetings, and daily tasks all in one place. Stay organized, meet deadlines, and advance your career.
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
                    <h4 className="font-semibold text-blue-900">Review your projects</h4>
                    <p className="text-blue-700">Start by reviewing your active projects and their current status.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Set daily work priorities</h4>
                    <p className="text-blue-700">Identify 1-3 work outcomes that matter most today.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Schedule focused work</h4>
                    <p className="text-blue-700">Block time for your priorities around meetings and obligations.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">End with review</h4>
                    <p className="text-blue-700">Review completed work, update project status, and plan tomorrow's focus.</p>
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

export default WorkPlanner;
