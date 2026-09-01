import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const VisionBoardSeo = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    { question: "What is a vision board?", answer: "A vision board is a visual collection of images, quotes, and goal representations that reflect what you want to achieve in life. It serves as a daily reminder of your aspirations and keeps you focused on your goals." },
    { question: "What is a vision board and how do you make one?", answer: "A vision board is created by gathering images and words that represent your goals and arranging them on a board or digital canvas. You can create one physically with a cork board and magazines, or digitally using tools like Pinterest, Canva, or mobile apps." },
    { question: "What is a vision board used for?", answer: "Vision boards are used to clarify goals, maintain focus, and reinforce motivation. They leverage visualization principles to help you stay aligned with your long-term objectives across career, health, relationships, and personal growth." },
    { question: "How to create a vision board on Pinterest?", answer: "Create a Pinterest board, search for goal-related images, and pin visual content that resonates with your aspirations. Organize by sections like career, health, travel, and relationships for a structured digital vision board." },
    { question: "How to create a vision board in Canva?", answer: "Use Canva's vision board templates, upload your own images or use the stock library, arrange them on a canvas, add motivational text, and download as a wallpaper or print." },
    { question: "How does a vision board work?", answer: "A vision board works by leveraging the reticular activating system (RAS) in your brain. By repeatedly viewing your goals visually, your brain becomes more attuned to opportunities and actions that align with those goals, increasing the likelihood of achievement." },
    { question: "Is there a vision board app for iPhone?", answer: "Yes. Several vision board apps are available for iPhone, including dedicated apps, Pinterest, and Canva. Goal Planner also helps you turn vision board goals into actionable plans with weekly tracking." },
    { question: "What is a vision board party?", answer: "A vision board party is a social gathering where people create vision boards together. Each person brings magazines, scissors, and a board, and the group works on their individual boards while sharing goals and inspiration." },
    { question: "What is a vision board workshop?", answer: "A vision board workshop is a guided session where a facilitator helps participants clarify their goals, select appropriate images, and build a vision board that reflects their personal or professional aspirations." },
    { question: "What is a vision board for kids?", answer: "A vision board for kids is a simplified version that uses pictures and words to help children express their dreams and goals. It can include goals for school, hobbies, friendships, and personal growth in a fun, visual format." },
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Vision Board: What It Is & How to Create One in 2026 | GoalPlanner"
        description="Learn what a vision board is, how to create one on Pinterest, Canva, or your phone, and how to turn your visual goals into actionable plans. Free tips & templates."
        canonicalPath="/vision-board"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Vision Board Guide",
          url: "https://goalplanner.io/vision-board",
          description: "Complete guide to vision boards including how to create one digitally or physically.",
        }}
      />

      <div className="space-y-10">
        <header className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground">Vision Board</h1>
          <p className="text-muted-foreground text-lg">
            A vision board turns your dreams into daily visual reminders. Here's how to create one that actually helps you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start turning your vision into action
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/goal-planner-app">Explore goal planner</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">How to create a vision board</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">On Pinterest</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Create a secret or public board, search for goal-related pins, and organize them into sections (career, health, travel). Pin daily to reinforce your vision.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">In Canva</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Use Canva's free vision board templates. Drag and drop images, add quotes, and export as a phone wallpaper or print. Easy to update as goals evolve.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">On Your Phone</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Use a vision board app or create a photo album on your iPhone/Android. Set your vision board as your lock screen for daily reinforcement.</CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-border bg-card shadow-sm">
              <CardHeader><CardTitle className="text-lg">On iPad / PowerPoint</CardTitle></CardHeader>
              <CardContent className="text-foreground/80">Use iPad apps like Canva or Pinterest. For PowerPoint, create a single slide with images and text, then save as a wallpaper or present regularly.</CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Vision board ideas for 2026</h2>
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Career vision board:</strong> Images of your dream role, certifications, workspace, and promotions.</li>
              <li><strong>Health & fitness:</strong> Pictures of your fitness goals, healthy meals, and wellness practices.</li>
              <li><strong>Travel board:</strong> Destinations you want to visit, experiences you want to have.</li>
              <li><strong>Financial freedom:</strong> Representations of your income goals, savings targets, and lifestyle.</li>
              <li><strong>Relationship & family:</strong> Images of the connections and community you want to build.</li>
              <li><strong>Personal growth:</strong> Books you want to read, skills you want to learn, habits to build.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">From vision board to action plan</h2>
          <div className="rounded-[2rem] border border-primary/20 bg-primary/10 p-7 shadow-sm">
            <p className="text-foreground/80 leading-relaxed mb-4">
              A vision board inspires you, but goals need a system. The most successful people use their vision board 
              to set SMART goals, then break them into weekly priorities and daily tasks.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
              <li>Pick one goal from your vision board</li>
              <li>Turn it into a SMART goal with a deadline</li>
              <li>Break it into monthly milestones and weekly priorities</li>
              <li>Schedule daily tasks that move the needle</li>
              <li>Review progress weekly and adjust</li>
            </ol>
            <div className="mt-6">
              <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Create your goal plan
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default VisionBoardSeo;
