import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const LifePlanning = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between life planning and goal setting?",
      answer: "Goal setting focuses on specific achievements (run a marathon, get a promotion). Life planning is broader—it creates a vision for your entire life and ensures different areas work together harmoniously. Life planning answers 'What kind of life do I want?' while goal setting answers 'What do I want to achieve?' The best approach combines both: use life planning to create your vision, then goal setting to make it happen."
    },
    {
      question: "How often should I review my life plan?",
      answer: "Review quarterly for big picture alignment and monthly for practical adjustments. Quarterly reviews check if you're still moving toward your vision and if your values have changed. Monthly reviews assess what's working, what isn't, and what needs to change in your daily approach. Also do an annual deep review to update your vision based on growth and life changes. The key is regular reflection without becoming rigid—life plans should guide you, not imprison you."
    },
    {
      question: "What areas of life should I include in my life plan?",
      answer: "Comprehensive life planning typically includes: Career/Work (purpose, growth, impact), Health & Wellness (physical, mental, emotional), Relationships (family, friends, community), Personal Growth (learning, skills, experiences), Finances (security, freedom, goals), and Contribution/legacy (how you want to help others). Some people also include spirituality, creativity, or environment. The key is choosing areas that matter to you rather than following a template."
    },
    {
      question: "How do I create a life vision that actually motivates me?",
      answer: "Start with values, not achievements. Ask: What kind of person do I want to be? How do I want to feel each day? What impact do I want to have? Then imagine your ideal day in detail—where you live, who you're with, what you do, how you feel. Make it specific and emotional. A motivating vision connects to your deepest values and creates positive emotions when you think about it. If your vision doesn't excite you, it's probably not aligned with your true values."
    },
    {
      question: "Can life planning help with major life decisions?",
      answer: "Yes, life planning provides a framework for making decisions aligned with your vision and values. When facing a big decision, ask: Does this move me closer to or further from my ideal life? Does this align with my core values? Will this choice support or hinder other important life areas? Life planning helps you see trade-offs clearly and make choices that serve your long-term vision rather than just solving immediate problems."
    },
    {
      question: "How do I balance ambitious life plans with current reality?",
      answer: "Use the 'gap and bridge' method. Identify the gap between your current reality and ideal vision, then build bridges: small, consistent actions that gradually close the gap. Also practice 'dual thinking'—hold your big vision while taking practical steps today. Break your life plan into phases: what you can start now, what you can work toward in 1-3 years, and what's long-term. This prevents overwhelm while maintaining direction."
    },
    {
      question: "What if my life plan changes as I grow?",
      answer: "Life plans should evolve with you. Regular reviews help you recognize when your values, priorities, or circumstances have changed. It's normal—and healthy—to update your vision as you learn and grow. The key is distinguishing between temporary setbacks (stick with the plan) and genuine evolution (update the plan). Some people keep a 'planning journal' to track how their thinking changes over time."
    },
    {
      question: "How do life planning and daily planning connect?",
      answer: "Life planning provides the 'why' and 'what,' while daily planning provides the 'how' and 'when.' Your life vision informs your yearly goals, which break into quarterly milestones, monthly targets, and finally daily actions. Each day, you should be able to connect your tasks to your bigger life vision. This connection creates motivation and meaning in daily activities. Without this connection, daily planning can feel like random busyness."
    },
    {
      question: "What tools help with life planning?",
      answer: "For vision work: journaling, vision boards, mind mapping. For tracking: goal planners, habit trackers, progress reviews. For structure: life planning frameworks, quarterly planning systems, accountability partnerships. Digital tools offer convenience and reminders, while paper tools provide tactile engagement and creative freedom. Many people use both: paper for vision work and reflection, digital for tracking and reminders."
    },
    {
      question: "How do I stay motivated when my life plan feels far away?",
      answer: "Focus on progress, not perfection. Track small wins and weekly improvements. Create 'milestone celebrations' for reaching important waypoints. Use visualization techniques to keep your vision vivid and emotionally connected. Also build accountability through sharing your journey with supportive people. Remember that meaningful life change takes time—focus on direction, not speed. Some weeks you'll make huge progress, others you'll just maintain—both are part of the journey."
    }
  ];

  const lifeAreas = [
    {
      title: "Career & Work",
      description: "Purpose, growth, impact, and financial contribution through meaningful work.",
      icon: "💼"
    },
    {
      title: "Health & Wellness", 
      description: "Physical vitality, mental clarity, emotional balance, and sustainable energy.",
      icon: "🏃‍♂️"
    },
    {
      title: "Relationships",
      description: "Family, friends, community, and meaningful connections with others.",
      icon: "👥"
    },
    {
      title: "Personal Growth",
      description: "Learning, skills development, experiences, and becoming your best self.",
      icon: "📚"
    },
    {
      title: "Finances",
      description: "Financial security, freedom, and resources to support your vision.",
      icon: "💰"
    },
    {
      title: "Contribution & Legacy",
      description: "How you want to help others and make a positive impact.",
      icon: "🌍"
    }
  ];

  const planningSteps = [
    {
      title: "Discover Your Values",
      description: "Identify what matters most to you and what you want your life to represent.",
      icon: "🔍"
    },
    {
      title: "Create Your Vision",
      description: "Imagine and describe your ideal life in vivid, emotional detail.",
      icon: "👁️"
    },
    {
      title: "Assess Current Reality",
      description: "Honestly evaluate where you are now compared to where you want to be.",
      icon: "📊"
    },
    {
      title: "Set Life Goals",
      description: "Define specific outcomes that move you toward your vision.",
      icon: "🎯"
    },
    {
      title: "Create Action Plans",
      description: "Break goals into quarterly milestones and daily actions.",
      icon: "📋"
    },
    {
      title: "Review & Adjust",
      description: "Regularly check progress and update your plan as you grow.",
      icon: "🔄"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Life Planner 2026 | Design Your Ideal Life & Achieve Goals | GoalPlanner"
        description="Create a comprehensive life plan that aligns your goals, values, and daily actions. Build the life you want with strategic planning and consistent progress."
        canonicalPath="/life-planning"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Life Planning",
          url: "https://goalplanner.io/life-planning",
          description: "Create a comprehensive life plan that aligns your goals, values, and daily actions.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Design Your Ideal Life</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Create a comprehensive life plan that aligns your values, goals, and daily actions. Build the life you truly want with intentional planning and consistent progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Life Planning Free
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#life-areas">Explore Life Areas</Link>
          </Button>
        </div>
      </section>

      {/* Life Areas */}
      <section className="space-y-6" id="life-areas">
        <h2 className="text-3xl font-bold text-foreground">The Six Life Areas</h2>
        <p className="text-lg text-muted-foreground">
          A balanced life plan addresses all important areas of your life, ensuring they work together harmoniously.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifeAreas.map((area, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{area.icon}</span>
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Life Planning Process */}
      <section className="space-y-6" id="planning-process">
        <h2 className="text-3xl font-bold text-foreground">The Life Planning Process</h2>
        <p className="text-lg text-muted-foreground">
          Follow these six steps to create a comprehensive life plan that guides your decisions and actions.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{step.icon}</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Design Your Ideal Life?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start building a comprehensive life plan that aligns your values, vision, and daily actions. Create the life you truly want with GoalPlanner.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Life Planning Free
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-foreground">Life Planning FAQ</h2>
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

export default LifePlanning;
