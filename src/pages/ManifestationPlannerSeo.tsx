import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const ManifestationPlannerSeo = () => {
  const faqData = [
    { question: "What is a manifestation planner?", answer: "A manifestation planner combines goal setting with visualization and gratitude practices. It helps you clarify what you want, align your daily actions with your intentions, and track progress toward your dream life." },
    { question: "How is a manifestation planner different from a regular planner?", answer: "While regular planners focus on tasks and schedules, manifestation planners include space for affirmations, gratitude journaling, vision boards, intention setting, and reflecting on what you're attracting into your life." },
    { question: "What is a success planner?", answer: "A success planner is a structured system for achieving your biggest goals. It includes daily priorities, weekly reviews, milestone tracking, habit tracking, and regular reflection to ensure continuous progress toward your definition of success." },
    { question: "How do I use a manifestation planner for 2026?", answer: "Start by setting your intentions for the year. Create a vision board, write affirmations, set quarterly goals, and use monthly and weekly planning to take aligned action. Review and adjust based on what's working." },
    { question: "What is a success planner diary?", answer: "A success planner diary is a daily journal that combines planning with reflection. Each day includes space for priorities, affirmations, gratitude, and end-of-day reflection on wins and lessons learned." },
    { question: "Are manifestation planners free?", answer: "Many digital manifestation planners offer free tiers. Full-featured options include guided prompts, habit tracking, vision board integration, and weekly reflection templates." },
    { question: "Can I get a manifestation planner PDF?", answer: "Yes. Manifestation planner PDFs are available as printable downloads. They typically include vision board pages, monthly intention templates, weekly planning spreads, and daily gratitude logs." },
    { question: "Where can I buy a manifestation planner?", answer: "Manifestation planners are available on Amazon, Etsy, and as digital downloads. Digital versions offer the advantage of easy editing, cloud backup, and accessibility across devices." },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Manifestation & Success Planner: Achieve Your Dream Life | GoalPlanner"
        description="Use a manifestation planner to combine goal setting with visualization, affirmations, and intention-setting. Free templates and digital planner for 2026."
        canonicalPath="/manifestation-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Manifestation & Success Planner Guide",
          url: "https://goalplanner.io/manifestation-planner",
          description: "Guide to using manifestation and success planners for goal achievement.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Manifestation & Success Planner</h1>
          <p className="text-gray-600 text-lg">
            Combine intention with action. Use manifestation principles and structured planning to create the life you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start your success planner</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/goal-planner-app">Explore goal planner</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Key elements of a manifestation planner</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <CardHeader><CardTitle className="text-lg">Intention setting</CardTitle></CardHeader>
              <CardContent className="text-gray-700">Write clear intentions for each area of your life. Intentions guide your subconscious mind toward what you want to attract.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <CardHeader><CardTitle className="text-lg">Gratitude practice</CardTitle></CardHeader>
              <CardContent className="text-gray-700">Daily gratitude shifts your focus to abundance. Writing 3 things you're grateful for each day rewires your brain for positivity.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-gray-100 bg-white shadow-sm">
              <CardHeader><CardTitle className="text-lg">Aligned action</CardTitle></CardHeader>
              <CardContent className="text-gray-700">Manifestation without action is wishful thinking. Break your intentions into weekly priorities and daily tasks that move you forward.</CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">How to use a success planner effectively</h2>
          <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              <li><strong>Define your vision.</strong> What does success look like for you? Write a vivid description of your ideal life in 1 year, 3 years, and 5 years.</li>
              <li><strong>Set quarterly intentions.</strong> Choose 2-3 major intentions per quarter. Align them with your long-term vision.</li>
              <li><strong>Create monthly milestones.</strong> Break each intention into monthly outcomes. These bridge the gap between vision and action.</li>
              <li><strong>Plan weekly priorities.</strong> Each week, select 1-3 priorities that move your monthly milestones forward.</li>
              <li><strong>Daily alignment check.</strong> Each morning, review your intentions and choose today's most important actions.</li>
              <li><strong>Weekly reflection.</strong> Review what worked, what didn't, and what you learned. Adjust your approach for next week.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Success planner for different goals</h2>
          <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-7 shadow-sm space-y-3">
            <p className="text-gray-700"><strong>For NEET / exam preparation:</strong> Use a success planner to break your syllabus into weekly study targets, track mock test scores, and maintain consistent daily study habits.</p>
            <p className="text-gray-700"><strong>For career growth:</strong> Set quarterly career intentions, track skill development, network building, and project completions. Review progress with your manager.</p>
            <p className="text-gray-700"><strong>For personal transformation:</strong> Combine habit tracking, journaling, and goal setting. Use daily affirmations and weekly reviews to stay aligned with your growth path.</p>
            <p className="text-gray-700"><strong>For financial goals:</strong> Set savings targets, income milestones, and investment goals. Track monthly progress and celebrate each financial win.</p>
          </div>
          <div className="mt-4">
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Create your success plan</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default ManifestationPlannerSeo;
