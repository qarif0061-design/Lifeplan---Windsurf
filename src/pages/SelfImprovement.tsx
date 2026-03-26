import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const SelfImprovement = () => {
  const faqData = [
    {
      question: "What's the difference between self-improvement and self-help?",
      answer: "Self-improvement is the active process of developing skills, habits, and qualities to become a better version of yourself. Self-help often refers to consuming content (books, courses, therapy) to address problems. Self-improvement is about taking consistent action—practicing skills, building habits, and measuring progress. Think of it this way: self-help provides the knowledge, self-improvement is applying that knowledge through daily practice."
    },
    {
      question: "How do I start a self-improvement journey without feeling overwhelmed?",
      answer: "Start with one area and build momentum. Choose one skill or habit that feels most important right now. Make it ridiculously small—so small it's almost impossible to fail. Track consistency rather than perfection. Focus on identity-based change ('I am someone who exercises') rather than outcome-based change ('I want to lose weight'). Remember: self-improvement is a marathon, not a sprint. Small, consistent actions compound over time into significant transformation."
    },
    {
      question: "What are the most important areas for self-improvement?",
      answer: "The most impactful areas vary by person, but generally include: physical health (energy, longevity), mental health (stress management, emotional regulation), skills and knowledge (career and personal growth), relationships (communication, empathy), and character (discipline, integrity, resilience). The key is choosing areas that align with your values and current life context rather than following someone else's blueprint."
    },
    {
      question: "How do I stay motivated with self-improvement when progress feels slow?",
      answer: "Focus on process over outcome. Track consistency (did I practice today?) rather than results (did I improve?). Celebrate small wins and streaks. Use visualization to remind yourself why this matters. Build accountability through sharing your journey. Also remember that plateaus are normal—progress often happens in bursts with periods of seeming stagnation. Trust the process and focus on showing up consistently."
    },
    {
      question: "Can self-improvement help with anxiety and depression?",
      answer: "Self-improvement can support mental health but shouldn't replace professional help when needed. Helpful practices include: building routines that provide structure, developing coping skills (mindfulness, journaling), improving physical health (exercise, sleep), setting and achieving small goals for confidence, and learning cognitive reframing techniques. However, if anxiety or depression is severe, seek professional help first—self-improvement works best as a complement to, not replacement for, professional treatment."
    },
    {
      question: "How much time should I dedicate to self-improvement daily?",
      answer: "Start with 15-30 minutes daily for focused practice. More important than duration is consistency. Some people prefer morning routines (meditation, reading, exercise), others prefer evening reflection. The key is making it a non-negotiable part of your day, like brushing your teeth. As you build momentum, you might naturally increase time, but don't start with ambitious goals that create pressure to quit."
    },
    {
      question: "What self-improvement habits have the biggest impact?",
      answer: "Research and experience point to several high-impact habits: daily exercise (physical and mental health), reading (knowledge and perspective), journaling (self-awareness and emotional processing), meditation/mindfulness (stress reduction and focus), and skill practice (deliberate improvement). The 'keystone habit' concept suggests that some habits (like exercise) naturally spill over into other areas of life, creating compound benefits."
    },
    {
      question: "How do I track self-improvement progress effectively?",
      answer: "Track both process and outcomes. Process metrics: consistency (days practiced), time spent, effort level. Outcome metrics: skill improvements, habit strength, life results. Use simple tools: habit trackers, journal entries, monthly assessments. Review weekly to adjust approach, monthly to see bigger patterns. Also track qualitative changes—how you feel, think, and relate to others. The best tracking systems are simple enough to maintain consistently."
    },
    {
      question: "Should I focus on strengths or weaknesses for self-improvement?",
      answer: "Both matter, but focus on strengths first. Developing your natural strengths creates confidence and momentum more quickly. Weakness improvement is valuable when weaknesses significantly limit your goals or happiness. A good approach: 80% focus on strengths (what you're good at and enjoy), 20% on critical weaknesses (what holds you back). Also consider that some 'weaknesses' might just be areas where you have different natural talents."
    },
    {
      question: "How do self-improvement and goal setting work together?",
      answer: "Self-improvement provides the capabilities to achieve goals, while goals give direction to your self-improvement efforts. Set goals first, then identify the skills, habits, and qualities needed to achieve them. Your self-improvement plan becomes the 'how' for your goals. For example: if your goal is career advancement, your self-improvement might focus on communication skills, industry knowledge, and leadership qualities. The two create a virtuous cycle—improvement enables goal achievement, which motivates further improvement."
    }
  ];

  const improvementAreas = [
    {
      title: "Physical Health",
      description: "Exercise, nutrition, sleep, and energy management for optimal performance.",
      icon: "🏃‍♂️"
    },
    {
      title: "Mental Health",
      description: "Stress management, emotional regulation, mindfulness, and psychological resilience.",
      icon: "🧠"
    },
    {
      title: "Skills & Knowledge",
      description: "Professional skills, learning strategies, and continuous personal development.",
      icon: "📚"
    },
    {
      title: "Character & Habits",
      description: "Discipline, integrity, consistency, and building positive daily routines.",
      icon: "✅"
    },
    {
      title: "Relationships",
      description: "Communication, empathy, social skills, and building meaningful connections.",
      icon: "👥"
    },
    {
      title: "Financial Growth",
      description: "Money management, career development, and building financial security.",
      icon: "💰"
    }
  ];

  const keystoneHabits = [
    {
      title: "Daily Exercise",
      description: "Physical activity that boosts energy, mood, and cognitive function.",
      icon: "🏃‍♂️"
    },
    {
      title: "Reading/Learning",
      description: "Consistent learning and knowledge acquisition for growth.",
      icon: "📖"
    },
    {
      title: "Journaling",
      description: "Self-reflection and emotional processing for self-awareness.",
      icon: "📝"
    },
    {
      title: "Meditation",
      description: "Mindfulness practice for stress reduction and mental clarity.",
      icon: "🧘"
    },
    {
      title: "Skill Practice",
      description: "Deliberate practice of specific skills for improvement.",
      icon: "🎯"
    },
    {
      title: "Sleep Optimization",
      description: "Consistent sleep schedule for recovery and performance.",
      icon: "😴"
    }
  ];

  const growthFramework = [
    {
      title: "Assess",
      description: "Honestly evaluate where you are now and where you want to be.",
      icon: "🔍"
    },
    {
      title: "Plan",
      description: "Create specific, actionable improvement plans with clear steps.",
      icon: "📋"
    },
    {
      title: "Practice",
      description: "Daily consistent action, even when motivation is low.",
      icon: "⚡"
    },
    {
      title: "Track",
      description: "Monitor progress and learn from both successes and failures.",
      icon: "📊"
    },
    {
      title: "Adjust",
      description: "Refine your approach based on what's working and what isn't.",
      icon: "🔄"
    },
    {
      title: "Compound",
      description: "Build on small wins to create exponential growth over time.",
      icon: "📈"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Self-Improvement Guide 2026 | Build Better Habits & Skills | GoalPlanner"
        description="Master self-improvement with proven strategies. Build better habits, develop skills, and create personal growth systems that last. Start your journey today."
        canonicalPath="/self-improvement"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Self-Improvement",
          url: "https://goalplanner.io/self-improvement",
          description: "Master self-improvement with proven strategies and sustainable growth systems.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Become Your Best Self</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master self-improvement with proven strategies for building better habits, developing valuable skills, and creating lasting personal growth. Transform your life one small action at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Start Self-Improvement Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#improvement-areas">Explore Areas</Link>
          </Button>
        </div>
      </section>

      {/* What Is Self-Improvement */}
      <section className="space-y-6" id="what-is-self-improvement">
        <h2 className="text-3xl font-bold text-gray-900">What Is Self-Improvement?</h2>
        <p className="text-lg text-gray-600">
          Self-improvement is the conscious process of developing yourself through consistent action and reflection.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">🌱 Growth Mindset</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Believing that your abilities can be developed through dedication and hard work. Seeing challenges as opportunities to grow rather than threats to avoid.
              </p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-indigo-900">🎯 Intentional Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-800">
                Taking deliberate, consistent steps toward becoming better rather than waiting for change to happen. Making growth a daily practice rather than an occasional effort.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Six Areas of Self-Improvement */}
      <section className="space-y-6" id="improvement-areas">
        <h2 className="text-3xl font-bold text-gray-900">Six Areas of Self-Improvement</h2>
        <p className="text-lg text-gray-600">
          Comprehensive personal development addresses all aspects of who you are and who you want to become.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {improvementAreas.map((area, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{area.icon}</span>
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Keystone Habits */}
      <section className="space-y-6" id="keystone-habits">
        <h2 className="text-3xl font-bold text-gray-900">Keystone Habits That Change Everything</h2>
        <p className="text-lg text-gray-600">
          Some habits create ripple effects that improve multiple areas of your life simultaneously.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keystoneHabits.map((habit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{habit.icon}</span>
                  {habit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{habit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Self-Improvement Framework */}
      <section className="space-y-6" id="framework">
        <h2 className="text-3xl font-bold text-gray-900">The Self-Improvement Framework</h2>
        <p className="text-lg text-gray-600">
          Follow this systematic approach to create lasting personal growth.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthFramework.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{step.icon}</span>
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Getting Started */}
      <section className="space-y-6" id="getting-started">
        <h2 className="text-3xl font-bold text-gray-900">How to Start Your Self-Improvement Journey</h2>
        <p className="text-lg text-gray-600">
          Begin with small, consistent actions that build momentum over time.
        </p>
        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">🎯 Choose Your Focus</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Pick one area that feels most important now</li>
                <li>• Choose a skill or habit that excites you</li>
                <li>• Make it specific and measurable</li>
                <li>• Ensure it aligns with your values</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">🚀 Start Ridiculously Small</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• 5 minutes is better than zero</li>
                <li>• Focus on consistency over intensity</li>
                <li>• Build the habit first, increase later</li>
                <li>• Make it impossible to fail</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Overcoming Common Challenges */}
      <section className="space-y-6" id="challenges">
        <h2 className="text-3xl font-bold text-gray-900">Overcoming Common Self-Improvement Challenges</h2>
        <p className="text-lg text-gray-600">
          Anticipate these obstacles and have strategies ready to overcome them.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">🧠 Mental Barriers</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-semibold">!</span>
                <div>
                  <p className="font-medium">Perfectionism</p>
                  <p className="text-gray-600 text-sm">Focus on progress, not perfect execution</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-semibold">!</span>
                <div>
                  <p className="font-medium">All-or-nothing thinking</p>
                  <p className="text-gray-600 text-sm">Small actions count more than doing nothing</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-semibold">!</span>
                <div>
                  <p className="font-medium">Comparison with others</p>
                  <p className="text-gray-600 text-sm">Focus on your own journey and progress</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">⚡ Practical Solutions</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Track consistency, not results</p>
                  <p className="text-gray-600 text-sm">Celebrate showing up daily</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Use the 2-minute rule</p>
                  <p className="text-gray-600 text-sm">Start with actions that take 2 minutes or less</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Build identity-based habits</p>
                  <p className="text-gray-600 text-sm">Become the type of person who does X</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Measuring Progress */}
      <section className="space-y-6" id="progress">
        <h2 className="text-3xl font-bold text-gray-900">Measuring Self-Improvement Progress</h2>
        <p className="text-lg text-gray-600">
          Track both the journey and the destination to stay motivated and adjust your approach.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">📊 Process Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">
                Track consistency, time spent, and effort level. These are within your control and show commitment regardless of immediate results.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">🎯 Outcome Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800">
                Measure skill improvements, habit strength, and life results. These show the impact of your efforts and guide adjustments.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">💫 Qualitative Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Notice how you feel, think, and relate to others. These subtle changes often indicate the most meaningful growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Long-Term Growth */}
      <section className="space-y-6" id="long-term">
        <h2 className="text-3xl font-bold text-gray-900">The Compound Effect of Self-Improvement</h2>
        <p className="text-lg text-gray-600">
          Small, consistent actions create exponential growth over time.
        </p>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-900 mb-4">📈 Why Small Actions Matter</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-purple-800 mb-3">Short Term (Weeks)</h4>
              <ul className="space-y-1 text-purple-700 text-sm">
                <li>• Building the habit foundation</li>
                <li>• Initial learning and awkwardness</li>
                <li>• Minimal visible results</li>
                <li>• Discipline over motivation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-3">Long Term (Months-Years)</h4>
              <ul className="space-y-1 text-purple-700 text-sm">
                <li>• Automatic habits and skills</li>
                <li>• Compound growth and mastery</li>
                <li>• Visible transformation</li>
                <li>• Motivation becomes self-sustaining</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Growth Journey?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Begin your self-improvement journey with proven systems and strategies. Build better habits, develop valuable skills, and create the life you want with GoalPlanner.
          </p>
          <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
            <Link to="/auth">Start Self-Improvement Free</Link>
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-gray-900">Master Personal Growth Skills</h2>
        <p className="text-lg text-gray-600">
          Explore specific self-improvement techniques and connect with related growth strategies.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Set and achieve meaningful personal goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✅ Habit Building</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create habits that support your growth</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/habit-tracker-app">Habit Tracking →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Focus & Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Develop mental clarity and concentration</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/focus-and-mental-clarity">Focus & Clarity →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Daily Journal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Reflect and track your personal growth</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/daily-journal-app">Daily Journal →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-gray-900">Self-Improvement FAQ</h2>
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

export default SelfImprovement;
