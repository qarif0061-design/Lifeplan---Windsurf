import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const TimeManagementSeo = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between time management and productivity?",
      answer: "Time management focuses on organizing and scheduling your time effectively. Productivity focuses on achieving meaningful outcomes with your time. Good time management creates the structure for productivity, but productivity also requires energy management, focus skills, and working on the right things. You can be well-organized but still unproductive if you're focusing on low-value tasks. The best approach combines both: manage your time well AND use it for high-impact work."
    },
    {
      question: "How do I manage time when my schedule is unpredictable?",
      answer: "Build flexibility into your time management system. Use time blocks with buffer periods, prioritize tasks by importance rather than strict timing, maintain a 'must-do' list of 1-3 critical items, and practice adaptive planning—review and adjust daily rather than weekly. Also identify your non-negotiable times (meetings, deep work blocks) and keep flexible time around them. The goal is structure that serves you, not rigid schedules that break when life happens."
    },
    {
      question: "What's the most effective time management technique?",
      answer: "The most effective technique is the one you'll actually use consistently. However, time blocking consistently ranks highest because it protects time for important work, reduces decision fatigue, and creates visible commitments. Time blocking works because it treats time as your most valuable resource and allocates it intentionally. Combine it with the 2-minute rule for small tasks and weekly reviews for planning, and you have a complete system."
    },
    {
      question: "How do I stop procrastinating and manage my time better?",
      answer: "Procrastination often happens when tasks feel overwhelming or unclear. Break tasks into specific 15-30 minute chunks, use the 2-minute rule for anything that takes less than 2 minutes, create time blocks for important work, and remove distractions during those blocks. Also identify what specifically triggers your procrastination—is it fear, boredom, or uncertainty? Address that root cause rather than just trying to force yourself to work."
    },
    {
      question: "Can time management help with work-life balance?",
      answer: "Yes, effective time management is essential for work-life balance. It helps you: schedule personal activities with the same seriousness as work, protect time for recovery and relationships, identify when you're overcommitted, create boundaries around work time, and ensure all important life areas get attention. Without good time management, work often expands to fill all available time, leaving little space for personal life."
    },
    {
      question: "How do I manage time as a student with multiple classes?",
      answer: "Student time management requires balancing classes, study, assignments, and personal life. Use: time blocking for study sessions around class schedules, the Pomodoro technique for focused study periods, weekly planning to map out assignment deadlines, and energy management (study difficult subjects during peak focus times). Also build in buffer time for unexpected study needs and protect sleep and recovery time."
    },
    {
      question: "What time management tools actually work?",
      answer: "Tools that reduce friction and provide structure work best: digital calendars for time blocking, simple to-do apps for task capture, time tracking apps to understand where time goes, and reminder systems for important commitments. Avoid tools that create complexity or require constant maintenance. Many people use a hybrid approach: digital for scheduling and reminders, paper for daily planning and reflection."
    },
    {
      question: "How do I manage time when working from home?",
      answer: "Home work requires intentional boundaries and structure. Create: dedicated work spaces, clear start/end times, time blocks for deep work, scheduled breaks to prevent burnout, and separation between work and personal areas. Also communicate your work hours to family/housemates and protect those boundaries. The key is creating structure that mimics office cues (commute, workspace, colleagues) even when you're at home."
    },
    {
      question: "Should I multitask or focus on one thing at a time?",
      answer: "Research consistently shows that single-tasking is more effective. Multitasking reduces productivity by up to 40%, increases errors, and creates mental fatigue. Instead, use time blocking to focus on one type of task at a time, batch similar tasks together, and protect deep work periods from interruptions. The only exception is combining low-focus tasks (like listening to podcasts while commuting) with activities that don't require full attention."
    },
    {
      question: "How do I handle interruptions and protect my time?",
      answer: "Protect your time with: clear communication of your availability and boundaries, specific office hours or focus times, buffering time between tasks for unexpected interruptions, systems for handling requests (email check times, message protocols), and physical or digital signals that you're in deep work mode. Also learn to say no politely but firmly to non-essential requests that conflict with your priorities."
    }
  ];

  const techniques = [
    {
      title: "Time Blocking",
      description: "Schedule specific blocks for focused work and protect that time.",
      icon: "⏰"
    },
    {
      title: "Pomodoro Technique",
      description: "Work in 25-minute focused sprints with 5-minute breaks.",
      icon: "🍅"
    },
    {
      title: "Eisenhower Matrix",
      description: "Organize tasks by urgency and importance to prioritize effectively.",
      icon: "📊"
    },
    {
      title: "Energy Management",
      description: "Match task difficulty to your natural energy levels.",
      icon: "⚡"
    },
    {
      title: "Batch Processing",
      description: "Group similar tasks together for efficiency.",
      icon: "📦"
    },
    {
      title: "Time Auditing",
      description: "Track where your time actually goes to find patterns.",
      icon: "🔍"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Time Management Guide 2026 | Master Your Schedule & Focus | GoalPlanner"
        description="Master time management with proven techniques. Learn time blocking, Pomodoro, and energy management. Organize your day, protect focus, and achieve more without stress."
        canonicalPath="/time-management"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Time Management",
          url: "https://goalplanner.io/time-management",
          description: "Master time management with proven techniques and sustainable systems.",
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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Master Your Time, Master Your Life</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn proven time management techniques that help you organize your day, protect your focus, and achieve what matters most without the stress and overwhelm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-teal-600 hover:bg-teal-700" onClick={() => openAuthModal({ intent: "signup" })}>
            Master Your Time
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#techniques">Learn Techniques</Link>
          </Button>
        </div>
      </section>

      {/* Time Management Techniques */}
      <section className="space-y-6" id="techniques">
        <h2 className="text-3xl font-display font-bold text-foreground">Proven Time Management Techniques</h2>
        <p className="text-lg text-muted-foreground">
          These techniques work because they provide structure and reduce decision fatigue.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techniques.map((technique, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{technique.icon}</span>
                  {technique.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{technique.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-8 border border-teal-100 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Master Your Time?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start organizing your schedule with proven time management techniques. Protect your focus, achieve your priorities, and create balance with GoalPlanner.
          </p>
          <Button size="lg" className="rounded-full bg-teal-600 hover:bg-teal-700" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Time Management Free
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-display font-bold text-foreground">Time Management FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </PublicPageLayout>
  );
};

export default TimeManagementSeo;
