import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const AppToCheckOffDailyGoals = () => {
  const faqData = [
    {"question":"Why is checking off goals satisfying?","answer":"Completing and checking off a goal releases dopamine, the brain's reward chemical. This reinforces the behavior and motivates future completion."},
    {"question":"How many daily goals should I check off?","answer":"Aim for 1-3 meaningful goals per day. Checking off 3 important goals is more satisfying than checking off 10 trivial tasks."},
    {"question":"What happens if I don't complete all my goals?","answer":"Don't worry about perfection. The best approach is to move uncompleted goals to tomorrow and focus on progress, not perfection."},
    {"question":"Can I check off goals from previous days?","answer":"Yes, but the most valuable approach is to check off goals on the day you complete them. This gives accurate tracking data."},
    {"question":"How do daily goal check-offs connect to bigger goals?","answer":"Each daily goal should be a step toward a larger objective. Checking off daily goals shows you're making progress on what matters."},
    {"question":"Is there a best time of day to check off goals?","answer":"Check off as you complete them throughout the day, and do a final review in the evening to ensure nothing was missed."}
  ];

  const features = [
    {"title":"One-Tap Check Off","description":"Mark goals complete with a single tap for instant satisfaction.","icon":"✅"},
    {"title":"Daily Goal List","description":"See all your daily goals in one clear, organized list.","icon":"📝"},
    {"title":"Completion Streaks","description":"Build streaks of completed days that motivate consistency.","icon":"🔥"},
    {"title":"Progress Stats","description":"Track your daily completion rate over weeks and months.","icon":"📊"},
    {"title":"Goal Prioritization","description":"Reorder your daily goals so the most important ones come first.","icon":"🎯"},
    {"title":"Widget Support","description":"Check off goals from your home screen without opening the app.","icon":"📱"}
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="App To Check Off Daily Goals 2026 | An app to check off daily goals gives you the satisfying feeling of completing what you set out to do | GoalPlanner"
        description="An app to check off daily goals gives you the satisfying feeling of completing what you set out to do. Small daily wins that build unstoppable momentum."
        canonicalPath="/app-to-check-off-daily-goals"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "App To Check Off Daily Goals",
          url: "https://goalplanner.io/app-to-check-off-daily-goals",
          description: "An app to check off daily goals gives you the satisfying feeling of completing what you set out to do. Small daily wins that build unstoppable momentum.",
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
            <Badge variant="secondary" className="w-fit">Check Off Success</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              App to Check Off Daily Goals: Feel the Satisfaction of Done
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              An app to check off daily goals gives you the satisfying feeling of completing what you set out to do. Small daily wins that build unstoppable momentum.
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
                    <h4 className="font-semibold text-blue-900">Set today's goals</h4>
                    <p className="text-blue-700">Each morning, write down 1-3 goals that would make today successful.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Focus and execute</h4>
                    <p className="text-blue-700">Work on one goal at a time. Single-tasking leads to higher completion rates.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Check off as you go</h4>
                    <p className="text-blue-700">The moment you complete a goal, check it off. Savor the feeling of done.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Review at day's end</h4>
                    <p className="text-blue-700">Celebrate what you accomplished and carry forward any incomplete goals.</p>
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

export default AppToCheckOffDailyGoals;
