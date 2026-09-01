import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyRoutinePlanner = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between a routine and a schedule?",
      answer: "A routine is a sequence of activities you do regularly, often at the same time each day. A schedule is time-based planning of when specific activities will happen. Routines create automaticity and reduce decision fatigue, while schedules provide structure and time boundaries. The most effective systems combine both: routines for consistency and schedules for time management."
    },
    {
      question: "How long does it take to build a daily routine?",
      answer: "Research shows it takes an average of 66 days to form a habit, but this varies widely based on complexity and consistency. Simple routines (like making your bed) might become automatic in 21 days, while complex routines (morning exercise + meditation + planning) might take 3-4 months. The key is consistency—missing days significantly increases the time needed. Focus on showing up daily rather than perfect execution."
    },
    {
      question: "Should I have the same routine every day or vary it?",
      answer: "Both approaches have benefits. Consistent routines create strong habits and reduce decision fatigue. Variable routines prevent boredom and adapt to different days (workdays vs weekends, high-energy vs low-energy days). Many successful people use a consistent 'anchor routine' (first 30 minutes) with flexibility for the rest of the day. The key is having enough structure for consistency while allowing room for life's natural variations."
    },
    {
      question: "What should I include in a morning routine?",
      answer: "Effective morning routines typically include: hydration (drink water upon waking), movement (stretching, exercise, or walk), mindfulness (meditation, journaling, or quiet reflection), planning (review day's priorities), and nutrition (protein-rich breakfast). Keep it simple enough to complete consistently—5-30 minutes is better than an elaborate routine you abandon after a week."
    },
    {
      question: "How do I create a night routine that improves sleep?",
      answer: "Create a wind-down routine that signals to your body it's time to sleep. Include: screen-free time (no devices 30-60 minutes before bed), dim lighting, light stretching or gentle movement, reading (physical books preferred), journaling or reflection, and consistent bedtime. Also avoid caffeine after 2pm and heavy meals within 3 hours of bedtime. The routine should relax rather than stimulate your nervous system."
    },
    {
      question: "Can routines help with anxiety and stress?",
      answer: "Yes, routines are one of the most effective tools for managing anxiety. They create predictability which reduces uncertainty, provide structure when feeling overwhelmed, include self-care activities that regulate your nervous system, and establish healthy boundaries (like saying no to evening commitments). Routines also give you a sense of control when life feels chaotic."
    },
    {
      question: "How do I stick to routines when my schedule is unpredictable?",
      answer: "Create 'anchor routines' that happen regardless of your schedule (first 10 minutes of your day, last 10 minutes before bed). Have flexible backup routines for different situations (travel days, sick days, busy work days). Focus on consistency rather than perfection—if you miss your full routine, do the most important parts. Also plan routines around your energy patterns rather than strict clock times."
    },
    {
      question: "What's the best way to track routine consistency?",
      answer: "Use simple tracking methods that don't create extra work: habit tracker apps, habit calendars, or simple checklists. Track consistency rather than perfection—mark days complete even if you only did part of the routine. Also track how you feel after completing your routine to reinforce the benefits. Weekly reviews help you see patterns and adjust your routine as needed."
    },
    {
      question: "Should routines be the same on weekdays and weekends?",
      answer: "This depends on your goals and lifestyle. Some people prefer identical routines for maximum consistency. Others use slightly different weekend routines that allow more flexibility while maintaining key habits. A common approach: keep your anchor routines (morning and night) consistent but allow more flexibility in the middle of weekend days. The key is ensuring weekend routines still support your goals rather than completely abandoning healthy habits."
    },
    {
      question: "How do I modify routines when my life circumstances change?",
      answer: "Treat routine changes as experiments. Start by identifying what's no longer working and what new elements you need. Make one change at a time and test it for 1-2 weeks before adding more. Keep successful elements and discard or modify what doesn't work. Remember that routines should serve your current life, not the other way around. Be willing to completely redesign routines during major life transitions."
    }
  ];

  const routineTypes = [
    {
      title: "Morning Routine",
      description: "Start your day with intention, energy, and focus.",
      icon: "🌅"
    },
    {
      title: "Work Routine",
      description: "Structure your workday for productivity and balance.",
      icon: "💼"
    },
    {
      title: "Evening Routine",
      description: "Wind down, reflect, and prepare for restorative sleep.",
      icon: "🌙"
    },
    {
      title: "Weekend Routine",
      description: "Recharge, plan, and enjoy while maintaining healthy habits.",
      icon: "🎉"
    },
    {
      title: "Self-Care Routine",
      description: "Regular activities that maintain your physical and mental health.",
      icon: "🧘"
    },
    {
      title: "Learning Routine",
      description: "Consistent time for skill development and personal growth.",
      icon: "📚"
    }
  ];

  const routineElements = [
    {
      title: "Hydration",
      description: "Start with water to rehydrate after sleep and kickstart metabolism.",
      icon: "💧"
    },
    {
      title: "Movement",
      description: "Light exercise, stretching, or walking to energize your body.",
      icon: "🏃‍♂️"
    },
    {
      title: "Mindfulness",
      description: "Meditation, breathing exercises, or quiet reflection.",
      icon: "🧘"
    },
    {
      title: "Planning",
      description: "Review priorities and set intentions for the day.",
      icon: "📋"
    },
    {
      title: "Nutrition",
      description: "Healthy breakfast to fuel your body and brain.",
      icon: "🥗"
    },
    {
      title: "Learning",
      description: "Reading, skill practice, or educational content.",
      icon: "📖"
    }
  ];

  const buildingSteps = [
    {
      title: "Start Small",
      description: "Begin with 2-3 essential elements that take 10-15 minutes total.",
      icon: "🌱"
    },
    {
      title: "Anchor Your Day",
      description: "Create consistent morning and evening routines regardless of schedule.",
      icon: "⚓"
    },
    {
      title: "Track Consistency",
      description: "Focus on showing up daily rather than perfect execution.",
      icon: "📊"
    },
    {
      title: "Adjust as Needed",
      description: "Modify routines based on what works and your changing needs.",
      icon: "🔄"
    },
    {
      title: "Build Gradually",
      description: "Add new elements once existing ones become automatic.",
      icon: "📈"
    },
    {
      title: "Maintain Flexibility",
      description: "Have backup routines for different situations and energy levels.",
      icon: "🌊"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Daily Routine Planner 2026 | Build Better Habits | GoalPlanner"
        description="Master daily routines for morning, evening, work, and weekends. Build habits that stick, improve consistency, and transform your life one day at a time. Start free."
        canonicalPath="/daily-routine-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Routine Planner",
          url: "https://goalplanner.io/daily-routine-planner",
          description: "Master daily routines for building better habits and consistent personal growth.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Build Routines That Transform Your Life</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master daily routines for morning success, productive workdays, restful evenings, and recharging weekends. Build habits that stick and create the life you want, one day at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Building Routines
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#routine-types">Explore Routines</Link>
          </Button>
        </div>
      </section>

      {/* Why Routines Matter */}
      <section className="space-y-6" id="why-routines">
        <h2 className="text-3xl font-bold text-foreground">Why Daily Routines Change Everything</h2>
        <p className="text-lg text-muted-foreground">
          Routines reduce decision fatigue, create consistency, and build the foundation for lasting change.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-900">🔄 Without Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800">
                Decision fatigue, inconsistent energy levels, forgotten priorities, stress from uncertainty, and starting each day reactive rather than proactive.
              </p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-foreground">✅ With Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Mental energy saved for important decisions, consistent energy and focus, automatic progress toward goals, reduced stress, and starting each day with intention and purpose.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Types of Routines */}
      <section className="space-y-6" id="routine-types">
        <h2 className="text-3xl font-bold text-foreground">Six Types of Daily Routines</h2>
        <p className="text-lg text-muted-foreground">
          Different routines serve different purposes and times of day.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routineTypes.map((type, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{type.icon}</span>
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Essential Routine Elements */}
      <section className="space-y-6" id="elements">
        <h2 className="text-3xl font-bold text-foreground">Essential Routine Elements</h2>
        <p className="text-lg text-muted-foreground">
          These components create effective routines for any time of day.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routineElements.map((element, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{element.icon}</span>
                  {element.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{element.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample Morning Routine */}
      <section className="space-y-6" id="morning-routine">
        <h2 className="text-3xl font-bold text-foreground">Sample Morning Routine (20 minutes)</h2>
        <p className="text-lg text-muted-foreground">
          A proven structure that starts your day with energy and intention.
        </p>
        <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-900">6:30 AM - Wake & Hydrate</h3>
              <p className="text-orange-800 text-sm">Drink a glass of water immediately upon waking to rehydrate and kickstart metabolism.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-900">6:35 AM - Movement</h3>
              <p className="text-orange-800 text-sm">5-10 minutes of stretching, yoga, or light exercise to energize your body.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-900">6:45 AM - Mindfulness</h3>
              <p className="text-orange-800 text-sm">5 minutes of meditation, breathing exercises, or quiet reflection.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-orange-900">6:50 AM - Planning</h3>
              <p className="text-orange-800 text-sm">Review your day's priorities and set 1-3 main intentions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Evening Routine */}
      <section className="space-y-6" id="evening-routine">
        <h2 className="text-3xl font-bold text-foreground">Sample Evening Routine (30 minutes)</h2>
        <p className="text-lg text-muted-foreground">
          Wind down effectively for restorative sleep and tomorrow's success.
        </p>
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">9:00 PM - Digital Sunset</h3>
              <p className="text-foreground/80 text-sm">Turn off screens and dim lights to signal bedtime to your brain.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">9:15 PM - Tidy Up</h3>
              <p className="text-foreground/80 text-sm">5 minutes to organize your space for a fresh start tomorrow.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">9:20 PM - Reflection</h3>
              <p className="text-foreground/80 text-sm">10 minutes of journaling or reviewing your day's wins and lessons.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">9:30 PM - Relaxation</h3>
              <p className="text-foreground/80 text-sm">Light reading, gentle stretching, or calming activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Building Routines That Stick */}
      <section className="space-y-6" id="building-routines">
        <h2 className="text-3xl font-bold text-foreground">Building Routines That Stick</h2>
        <p className="text-lg text-muted-foreground">
          Follow this systematic approach to create lasting habits.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildingSteps.map((step, index) => (
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

      {/* Routine Flexibility */}
      <section className="space-y-6" id="flexibility">
        <h2 className="text-3xl font-bold text-foreground">Adapting Routines to Real Life</h2>
        <p className="text-lg text-muted-foreground">
          Life isn't predictable—your routines need to bend without breaking.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-ember/20 bg-ember/10">
            <CardHeader>
              <CardTitle className="text-foreground">🌅 Energy-Based Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Match routine intensity to your energy levels. Have 'minimum viable days' for low-energy times and 'power routines' for high-energy periods.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">🔄 Backup Routines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Have 5-minute versions for busy days, travel routines for different locations, and weekend variations for different schedules.
              </p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-foreground">⚡ Seasonal Adjustments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Modify routines for different seasons, life phases, and energy patterns. What works in summer might need adjustment in winter.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Routine Mistakes */}
      <section className="space-y-6" id="mistakes">
        <h2 className="text-3xl font-bold text-foreground">Common Routine Mistakes to Avoid</h2>
        <p className="text-lg text-muted-foreground">
          These pitfalls often cause people to abandon their routines.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">❌ What to Avoid</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Starting Too Big</p>
                  <p className="text-muted-foreground text-sm">Trying to implement too many habits at once</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">All-or-Nothing Thinking</p>
                  <p className="text-muted-foreground text-sm">Abandoning routines after missing one day</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">No Flexibility</p>
                  <p className="text-muted-foreground text-sm">Rigid routines that break with life changes</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">✅ What to Do Instead</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Start Small</p>
                  <p className="text-muted-foreground text-sm">Begin with 2-3 essential elements</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Focus on Consistency</p>
                  <p className="text-muted-foreground text-sm">Show up daily, even imperfectly</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Build in Flexibility</p>
                  <p className="text-muted-foreground text-sm">Have backup plans for different situations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Build Life-Changing Routines?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start building daily routines that stick and transform your life. Create morning success, productive days, restful nights, and recharging weekends with GoalPlanner.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Building Routines Free
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-foreground">Master Routine Building Skills</h2>
        <p className="text-lg text-muted-foreground">
          Explore specific routine strategies and connect with related habit-building techniques.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✅ Habit Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Track and maintain your routine consistency</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/habit-tracker-app">Habit Tracking →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Align routines with your bigger goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📅 Daily Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Plan your days around your routines</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/daily-planner-app">Daily Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Focus & Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build mental clarity into your routines</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/focus-and-mental-clarity">Focus & Clarity →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-foreground">Daily Routine FAQ</h2>
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

export default DailyRoutinePlanner;
