import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const GoalPlanner = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between a goal planner and a goal tracker?",
      answer: "A goal planner helps you define goals and create action plans, while a goal tracker focuses on measuring progress. The best goal planner apps combine both: they help you plan the path forward AND track your progress. Think of it this way: a tracker tells you where you've been, while a planner helps you figure out where to go next."
    },
    {
      question: "How do I choose the right goals to focus on?",
      answer: "Start with your values and current life context. Ask: What would make the biggest positive impact right now? What goal would create momentum for other areas? For most people, 1-3 active goals is ideal—more creates diluted effort and decision fatigue. Consider rotating focus quarterly rather than trying to advance everything simultaneously."
    },
    {
      question: "What's the best way to break big goals into small actions?",
      answer: "Follow a simple hierarchy: Start with your big goal. Create quarterly milestones. Set monthly targets. Define weekly actions. Finally, identify daily steps. The key is making each daily action specific, time-bound, and small enough to complete even on busy days. For example: 'Run marathon' becomes 'Run 3x weekly' becomes 'Monday: 3-mile run after work.'"
    },
    {
      question: "How many goals should I track at once?",
      answer: "For most people, 1-3 active goals is ideal. Research shows that having too many goals creates diluted effort, decision fatigue, and constant guilt about what you're NOT working on. Start with one priority goal and build consistency first. If you have multiple areas of life to work on, consider rotating focus quarterly."
    },
    {
      question: "Do goal planner apps actually help with consistency?",
      answer: "Yes, when designed properly. Goal planner apps support consistency through: external reminders when motivation fades, streak tracking and pattern visualization that create positive reinforcement, breaking large goals into small daily actions that are easier to complete, immediate feedback on progress, and helping you learn from your patterns."
    },
    {
      question: "What are common mistakes in goal planning?",
      answer: "Common mistakes include: setting vague goals ('be healthier' instead of 'exercise 3x weekly'), focusing on outcomes instead of processes, not defining the next action, trying to change everything at once, setting unrealistic timelines, not tracking progress, and expecting perfect consistency."
    },
    {
      question: "Can a goal planner app help with ADHD or focus issues?",
      answer: "Goal planner apps can be particularly helpful for ADHD or executive function challenges when they reduce decision fatigue and provide external structure. Look for apps that: offer clear next actions instead of overwhelming options, provide time-based reminders and routine templates, give visual progress tracking for immediate feedback, and minimize distractions with clean interfaces."
    },
    {
      question: "Digital vs paper goal planners: which works better?",
      answer: "Digital goal planners offer reminders, searchability, progress tracking, easy editing, and cross-device access. Paper planners provide writing memory benefits, reduced screen time, creative freedom, and fewer distractions. Many people use both: paper for initial goal setting and reflection, digital for daily tracking and reminders."
    },
    {
      question: "How do I stay motivated when goals feel far away?",
      answer: "Focus on process goals rather than outcome goals. Instead of 'lose 20 pounds,' focus on 'exercise 3x this week.' Celebrate small wins and consistency rather than just final outcomes. Use visual progress tracking to see how far you've come. Connect daily actions to your deeper 'why'—the real reason the goal matters."
    },
    {
      question: "What features are essential in a goal planner app?",
      answer: "Essential features include: quick goal setup (goal + next action in minutes), daily/weekly planning connection, habit and routine tracking, reminders you control (not constant notifications), simple progress views (not overwhelming dashboards), and weekly review capabilities. Avoid apps that feel like administrative work or create complexity."
    }
  ];

  const features = [
    {
      title: "Quick Goal Setup",
      description: "Set goals and define next actions in minutes, not hours.",
      icon: "🎯"
    },
    {
      title: "Action Planning",
      description: "Break goals into weekly and daily steps that create progress.",
      icon: "📋"
    },
    {
      title: "Progress Tracking",
      description: "See how far you've come and what's working best.",
      icon: "📊"
    },
    {
      title: "Weekly Reviews",
      description: "Reflect and adjust so you improve over time.",
      icon: "🔄"
    },
    {
      title: "Habit Connection",
      description: "Link habits to the goals they support.",
      icon: "✅"
    },
    {
      title: "Daily Planning",
      description: "Connect goals to your daily schedule and priorities.",
      icon: "📅"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best Goal Planner 2026 | Set & Track Goals That Matter | GoalPlanner"
        description="The complete goal planner system for setting meaningful goals and actually achieving them. Break goals into daily actions, track progress, and stay consistent. Start free."
        canonicalPath="/goal-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Goal Planner",
          url: "https://goalplanner.io/goal-planner",
          description: "The complete goal planner system for setting and achieving meaningful goals.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Best Goal Planner for Achieving What Matters</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Set meaningful goals, break them into daily actions, and track progress with a complete goal planning system that actually works. Join thousands who've achieved their goals with GoalPlanner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Planning Goals Free
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#goal-setting">See How It Works</Link>
          </Button>
        </div>
      </section>

      {/* What Is Goal Planning */}
      <section className="space-y-6" id="goal-setting">
        <h2 className="text-3xl font-bold text-foreground">What Is a Goal Planner (And Why You Need One)</h2>
        <p className="text-lg text-muted-foreground">
          A goal planner is more than a place to write down what you want to achieve—it's a complete system for turning aspirations into daily actions. Unlike simple to-do lists, goal planning connects your big-picture vision to the small steps you take every day.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle className="text-foreground">🎯 Goal Setting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Define clear, meaningful goals that align with your values and current life context. GoalPlanner helps you identify what truly matters instead of chasing arbitrary objectives.
              </p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-foreground">📋 Action Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80">
                Break big goals into specific, achievable steps you can take daily or weekly. GoalPlanner automatically creates action plans from your goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Goal Achievement Framework */}
      <section className="space-y-6" id="framework">
        <h2 className="text-3xl font-bold text-foreground">The Goal Achievement Framework</h2>
        <p className="text-lg text-muted-foreground">
          Successful goal planning follows a simple but powerful process that turns vision into reality.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Set →</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Define clear, meaningful goals that matter to you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Break Down →</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create milestones and daily actions that build momentum</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Track →</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor progress and learn what works best for you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adjust →</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Review regularly and adapt your approach based on results</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SMART Goals Section */}
      <section className="space-y-6" id="smart-goals">
        <h2 className="text-3xl font-bold text-foreground">SMART Goals Made Simple</h2>
        <p className="text-lg text-muted-foreground">
          The SMART framework helps you set goals that are actually achievable rather than just wishful thinking.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center">S</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center"><strong>Specific</strong><br/>Clear and defined</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center">M</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center"><strong>Measurable</strong><br/>Trackable progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center">A</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center"><strong>Achievable</strong><br/>Realistic and possible</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center">R</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center"><strong>Relevant</strong><br/>Matters to you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-center">T</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center"><strong>Time-bound</strong><br/>Has a deadline</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="space-y-6" id="step-by-step">
        <h2 className="text-3xl font-bold text-foreground">How to Set and Achieve Goals: Step-by-Step</h2>
        <p className="text-lg text-muted-foreground">
          Follow this proven process to set goals you'll actually achieve with GoalPlanner.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                Define Your Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Start with your big-picture vision. What would make the biggest positive impact in your life right now? GoalPlanner helps you clarify what truly matters.</p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                Break Into Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Divide your big goal into quarterly and monthly milestones. GoalPlanner automatically breaks goals into manageable chunks.</p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                Plan Weekly Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Set specific weekly actions that move you toward your milestones. GoalPlanner connects goals to your weekly planning.</p>
            </CardContent>
          </Card>
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                Track & Adjust
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor progress weekly and adjust your approach. GoalPlanner shows what's working and what needs to change.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6" id="best-practices">
        <h2 className="text-3xl font-bold text-foreground">Goal Planning Best Practices</h2>
        <p className="text-lg text-muted-foreground">
          These proven strategies will help you set and achieve goals consistently.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">🎯 Focus Strategies</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">1-3 Active Goals Maximum</p>
                  <p className="text-muted-foreground text-sm">Focus your energy on what matters most</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Process Over Outcome</p>
                  <p className="text-muted-foreground text-sm">Focus on daily actions, not just results</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Weekly Reviews</p>
                  <p className="text-muted-foreground text-sm">Reflect and adjust your approach</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">📈 Success Habits</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Daily Check-ins</p>
                  <p className="text-muted-foreground text-sm">Review goals every morning for 2 minutes</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Celebrate Small Wins</p>
                  <p className="text-muted-foreground text-sm">Acknowledge progress, not just completion</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Habit Connection</p>
                  <p className="text-muted-foreground text-sm">Link daily habits to goal achievement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How GoalPlanner Helps */}
      <section className="space-y-6" id="how-goalplanner-helps">
        <h2 className="text-3xl font-bold text-foreground">How GoalPlanner Makes Goal Achievement Easier</h2>
        <p className="text-lg text-muted-foreground">
          GoalPlanner is designed specifically to help you overcome common goal-setting challenges and build momentum toward what matters most.
        </p>
        <div className="bg-gradient-to-r from-primary/5 to-momentum/5 rounded-2xl p-8 border border-primary/10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">🚀 Overcome Common Barriers</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• <strong>Analysis paralysis:</strong> Clear next actions eliminate overwhelm</li>
                <li>• <strong>Lost motivation:</strong> Visual progress keeps you inspired</li>
                <li>• <strong>Forgetting priorities:</strong> Daily reviews keep goals top of mind</li>
                <li>• <strong>No accountability:</strong> Built-in tracking creates commitment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">⚡ Build Success Systems</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• <strong>Automatic action planning:</strong> Goals become daily tasks</li>
                <li>• <strong>Progress visualization:</strong> See how far you've come</li>
                <li>• <strong>Habit integration:</strong> Connect goals to daily routines</li>
                <li>• <strong>Weekly insights:</strong> Learn what works for you</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="space-y-6" id="mistakes">
        <h2 className="text-3xl font-bold text-foreground">Common Goal Setting Mistakes</h2>
        <p className="text-lg text-muted-foreground">
          Avoid these common pitfalls that keep people stuck in the planning phase without ever taking action.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">❌ What Doesn't Work</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Vague Goals</p>
                  <p className="text-muted-foreground text-sm">"Be healthier" instead of "Exercise 3x weekly"</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">No Next Action</p>
                  <p className="text-muted-foreground text-sm">Goals without clear first steps</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                <div>
                  <p className="font-medium">Too Many Goals</p>
                  <p className="text-muted-foreground text-sm">Diluted effort across too many priorities</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground">✅ What Works</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Clear & Specific</p>
                  <p className="text-muted-foreground text-sm">"Exercise 3x weekly for 30 minutes"</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Immediate Next Step</p>
                  <p className="text-muted-foreground text-sm">Clear action you can take today</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                <div>
                  <p className="font-medium">Focused Priorities</p>
                  <p className="text-muted-foreground text-sm">1-3 active goals maximum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-6" id="features">
        <h2 className="text-3xl font-bold text-foreground">Goal Planner Features That Matter</h2>
        <p className="text-lg text-muted-foreground">
          The best goal planning tools focus on helping you take action, not just managing goals.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Who Needs This */}
      <section className="space-y-6" id="who-needs">
        <h2 className="text-3xl font-bold text-foreground">Who Needs a Goal Planner?</h2>
        <p className="text-lg text-muted-foreground">
          Goal planning isn't just for high achievers—it's for anyone who wants to make meaningful progress in important areas of life.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">👔 Professionals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Career advancement, skill development, and work-life balance goals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎓 Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Academic achievement, study habits, and personal growth objectives.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏃‍♂️ Life Builders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Health, relationships, learning, and personal development goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-primary/5 to-momentum/5 rounded-2xl p-8 border border-primary/10 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Achieve Your Goals?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start planning goals you'll actually achieve with GoalPlanner. Set meaningful objectives, break them into daily actions, and track your progress.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Goal Planning Free
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-bold text-foreground">Master Goal Planning & Related Skills</h2>
        <p className="text-lg text-muted-foreground">
          Explore specific goal planning techniques and connect with productivity systems that support goal achievement.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Setting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Learn frameworks and methods for setting effective goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-setting">Goal Setting Guide →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📅 Weekly Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Connect goals to weekly priorities and actions</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/weekly-planning">Weekly Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Goal Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Monitor progress and stay motivated with tracking systems</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-tracking">Goal Tracking →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏗️ Life Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Create a comprehensive vision for your life and future</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/life-planning">Life Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⚡ Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build systems that support goal achievement</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/productivity">Productivity Methods →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Protect time for working on important goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-management">Time Management →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 To-Do Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Organize daily tasks that support your goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list">To-Do List Methods →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧘 Self-Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Build personal skills that support goal success</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/self-improvement">Self-Improvement →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-bold text-foreground">Goal Planning FAQ</h2>
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

export default GoalPlanner;
