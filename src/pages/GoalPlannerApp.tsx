import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";

const GoalPlannerApp = () => {
  const faqData = [
    {
      question: "What's the difference between a goal planner and goal tracker?",
      answer: "Goal trackers focus on measurement—recording progress, checking completions, and showing statistics. Goal planners help you define the goal and create the action plan—especially breaking goals into weekly and daily steps that create progress. The best goal planner apps combine both: they help you plan the path forward AND track your progress along that path. Think of it this way: a tracker tells you where you've been, while a planner helps you figure out where to go next."
    },
    {
      question: "How do I choose the right goals to focus on?",
      answer: "Start with your values and current life context rather than abstract ambitions. Ask: What would make the biggest positive impact in my life right now? What goal would create momentum for other areas? What feels both challenging and achievable? For most people, 1-3 active goals is ideal—more creates diluted effort and decision fatigue. Consider rotating focus quarterly rather than trying to advance everything simultaneously. The key is ensuring your goals don't compete for the same limited resources like time, energy, or willpower."
    },
    {
      question: "What's the best way to break big goals into small actions?",
      answer: "Follow a simple hierarchy: Start with your big goal. Create quarterly milestones. Set monthly targets. Define weekly actions. Finally, identify daily steps. The key is making each daily action specific, time-bound, and small enough to complete even on busy days. If a daily action takes more than 30 minutes, consider breaking it further. For example: 'Run marathon' becomes 'Run 3x weekly' becomes 'Monday: 3-mile run after work.' Remember: some days will only support maintenance actions, and that's still progress."
    },
    {
      question: "How many goals should I track at once?",
      answer: "For most people, 1-3 active goals is ideal. Research shows that having too many goals creates diluted effort, decision fatigue, and constant guilt about what you're NOT working on. Start with one priority goal and build consistency first. If you have multiple areas of life to work on, consider rotating focus quarterly. Some people use a 'primary goal + maintenance goals' approach: one major focus area while maintaining small habits in other areas. Quality trumps quantity every time."
    },
    {
      question: "Do goal planner apps actually help with consistency?",
      answer: "Yes, when designed properly. Goal planner apps support consistency through: external reminders when motivation fades, streak tracking and pattern visualization that create positive reinforcement, breaking large goals into small daily actions that are easier to complete, immediate feedback on progress, accountability through visible tracking, and helping you learn from your patterns. The key is that consistency comes from systems, not willpower. A good app reduces mental overhead while providing the structure needed for lasting change."
    },
    {
      question: "What are common mistakes in goal planning?",
      answer: "The most common mistakes include: setting vague goals ('be healthier' instead of 'exercise 3x weekly'), focusing on outcomes instead of processes (wanting to 'lose 20 pounds' instead of 'walk 30 minutes daily'), not defining the next action, trying to change everything at once, setting unrealistic timelines, not tracking progress, and expecting perfect consistency. Another major mistake is not accounting for real life—busy periods, low motivation days, unexpected obstacles. Successful goal planners build flexibility and 'minimum viable days' into their plans."
    },
    {
      question: "Can a goal planner app help with ADHD or focus issues?",
      answer: "Goal planner apps can be particularly helpful for ADHD or executive function challenges when they reduce decision fatigue and provide external structure. Look for apps that: offer clear next actions instead of overwhelming options, provide time-based reminders and routine templates, give visual progress tracking for immediate feedback, allow flexible planning for variable schedules, and minimize distractions with clean interfaces. The app serves as an external brain—storing information, providing prompts, and maintaining structure when internal executive functions are challenged. However, remember that an app is a support tool, not a replacement for comprehensive ADHD management."
    },
    {
      question: "Digital vs paper goal planners: which works better?",
      answer: "Digital goal planners offer reminders, searchability, progress tracking, easy editing, and cross-device access. Paper planners provide writing memory benefits, reduced screen time, creative freedom, and fewer distractions. Digital excels at tracking data over time and sending timely reminders. Paper often leads to deeper thinking during the planning process. Many people use both: paper for initial goal setting and reflection, digital for daily tracking and reminders. The best choice depends on whether you value data tracking and convenience or the tactile experience and reduced digital distractions."
    },
    {
      question: "How do I stay motivated when goals feel far away?",
      answer: "Focus on process goals rather than outcome goals. Instead of 'lose 20 pounds,' focus on 'exercise 3x this week.' Celebrate small wins and consistency rather than just final outcomes. Use visual progress tracking to see how far you've come. Connect daily actions to your deeper 'why'—the real reason the goal matters. Build accountability through tracking or sharing progress. Remember: motivation follows action, not the other way around. Small, consistent actions create momentum that builds motivation naturally."
    },
    {
      question: "What features are essential in a goal planner app?",
      answer: "Essential features include: quick goal setup (goal + next action in minutes), daily/weekly planning connection, habit and routine tracking, reminders you control (not constant notifications), simple progress views (not overwhelming dashboards), and weekly review capabilities. Avoid apps that feel like administrative work or create complexity. The best goal planner apps help you take daily action rather than just managing goals. If an app feels like too much overhead, you won't stick with it. Try free trials to see what fits your workflow before committing."
    }
  ];

  const features = [
    {
      title: "Quick Goal Setup",
      description: "Set goals and define next actions in minutes, not hours.",
      icon: "🎯"
    },
    {
      title: "Daily Planning Integration",
      description: "Connect goals to your daily tasks and focus time.",
      icon: "📅"
    },
    {
      title: "Habit & Routine Tracking",
      description: "Build consistency with habits that support your goals.",
      icon: "✅"
    },
    {
      title: "Smart Reminders",
      description: "Gentle reminders that protect your routines, not nag you.",
      icon: "🔔"
    },
    {
      title: "Progress Tracking",
      description: "See your progress without complicated metrics.",
      icon: "📊"
    },
    {
      title: "Weekly Reviews",
      description: "Reflect and adjust so you improve over time.",
      icon: "🔄"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best Goal Planner App 2026 | Set & Achieve Meaningful Goals | GoalPlanner"
        description="Achieve your goals with the best goal planner app. Set SMART goals, break them into daily actions, and track progress. Free goal planning tools."
        canonicalPath="/goal-planner-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Goal Planner App",
          url: "https://goalplanner.io/goal-planner-app",
          description: "A practical guide to choosing a goal planner app that helps you follow through.",
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
        {/* Hero Section */}
        <header className="space-y-6" id="hero">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit">Free Goal Planner App</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Goal Planner App: The Practical Way to Set Goals, Take Daily Action, and Stay Consistent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              If you've ever set a goal you genuinely cared about—then watched it fade under a busy week—you're not alone. Most "goal failure" isn't a motivation problem. It's a systems problem.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
              <Link to="/auth">Start Planning Goals</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-lg font-medium text-gray-900 mb-2">Quick answer: What a goal planner app should help you do</p>
            <ul className="space-y-2 text-gray-700">
              <li>• set goals clearly (so "done" is obvious)</li>
              <li>• break goals into milestones and next actions</li>
              <li>• plan weekly and daily steps you can actually complete</li>
              <li>• track progress (without over-measuring)</li>
              <li>• stay consistent with reminders and routines</li>
              <li>• review progress so you improve over time</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Goal Planning in Action</h2>
            <div className="bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Goal setting screen with milestones and daily actions</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-gray-900">What Is a Goal Planner App?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              A <strong>goal planner app</strong> is a tool for setting, organizing, and achieving goals by turning them into <strong>actionable steps</strong> you can schedule and repeat.
            </p>
            <p>
              People also search for this as:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">goal setting app</Badge>
              <Badge variant="outline">goal tracker app</Badge>
              <Badge variant="outline">goal management app</Badge>
              <Badge variant="outline">personal goal planner</Badge>
              <Badge variant="outline">daily goal planner</Badge>
              <Badge variant="outline">SMART goals app</Badge>
            </div>
            <p className="mt-4">
              The best apps support <strong>follow-through</strong>, not just planning.
            </p>
          </div>
        </section>

        {/* Why People Don't Reach Goals */}
        <section className="space-y-6" id="why-people-fail">
          <h2 className="text-3xl font-bold text-gray-900">Why People Don't Reach Goals (Even When They're Serious)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📍</span> Not Connected to Your Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>If the goal never becomes a calendar block, a daily task, or a routine, it competes with everything else.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span> Unclear Next Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>"Get healthier" sounds good. But what do you do today at 6pm? Goals need <strong>next actions</strong>.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span> Overplanning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Many systems create "perfect plans" that collapse in the first real week. The best systems are built for imperfect days.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span> Not Enough Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Without tracking, you can't tell if you're moving forward—so motivation drops.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-gray-900">Key Features to Look For in the Best Goal Planner App</h2>
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

        {/* How to Set Goals Section */}
        <section className="space-y-6" id="how-to-set-goals">
          <h2 className="text-3xl font-bold text-gray-900">How to Set Goals in a Way That Leads to Action</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">The GoalPlanner Approach</h3>
              <p className="text-blue-800 mb-4">
                You don't need more goals. You need a clearer plan for the goals you already care about.
              </p>
              <p className="text-blue-700">
                Instead of pushing complexity, it helps you keep a small, repeatable system: define goals → connect them to weekly targets → convert targets into daily actions → track habits and progress → reflect and adjust.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Step-by-Step Method</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Choose one meaningful goal (per season)</h4>
                    <p className="text-gray-600">Ask: If I make progress on one thing, what will matter most?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Define the finish line</h4>
                    <p className="text-gray-600">Make it testable: "Complete 12 lessons," "Save $3,000," "Run 3x/week for 8 weeks"</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Set a timeframe</h4>
                    <p className="text-gray-600">Deadlines shape plans without shaming you.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Break into milestones</h4>
                    <p className="text-gray-600">Milestones keep you from drifting and help you measure progress.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                  <div>
                    <h4 className="font-semibold">Convert to daily actions</h4>
                    <p className="text-gray-600">Daily actions should be small, clear, and tied to a time or trigger.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Goal Planner App Section */}
        <section className="space-y-6" id="best-goal-planner-app">
          <h2 className="text-3xl font-bold text-gray-900">Best Goal Planner App: What Actually Matters</h2>
          <p className="text-lg text-gray-600">When searching for the best goal planner app, look beyond flashy features and focus on what drives real results.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">🎯 Essential Features That Matter</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Clear Next Actions</p>
                    <p className="text-gray-600 text-sm">The app should always show you what to do next, not just what you want to achieve</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Daily Planning Integration</p>
                    <p className="text-gray-600 text-sm">Goals should connect to your daily tasks and calendar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Progress Without Overwhelm</p>
                    <p className="text-gray-600 text-sm">Simple tracking that shows trends without complicated dashboards</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Flexible Scheduling</p>
                    <p className="text-gray-600 text-sm">Adapts to busy weeks, travel, and life's unpredictability</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">⚠️ Features That Often Distract</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Over-Complicated Analytics</p>
                    <p className="text-gray-600 text-sm">Too many charts and metrics that don't drive action</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Gamification Over Substance</p>
                    <p className="text-gray-600 text-sm">Points and badges that replace real progress</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Constant Notifications</p>
                    <p className="text-gray-600 text-sm">Alerts that create anxiety rather than support</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Setup Requirements</p>
                    <p className="text-gray-600 text-sm">Apps that require hours of configuration before you can start</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free vs Paid Section */}
        <section className="space-y-6" id="free-vs-paid">
          <h2 className="text-3xl font-bold text-gray-900">Free Goal Planner App vs Paid Tools</h2>
          <p className="text-lg text-gray-600">You don't need to pay for effective goal planning—but understanding the trade-offs helps you choose wisely.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <span className="text-2xl">🆓</span> Free Goal Planner Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-green-800">
                  <p><strong>What you typically get:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Goal setting and basic categorization</li>
                    <li>• Progress tracking and completion checkmarks</li>
                    <li>• Simple reminders and notifications</li>
                    <li>• Basic progress visualization</li>
                    <li>• Limited number of active goals</li>
                  </ul>
                  <p className="mt-3"><strong>Best for:</strong> Personal goal planning, habit building, and anyone starting their goal-setting journey.</p>
                  <p className="mt-2"><strong>Limitations:</strong> Advanced analytics, unlimited goals, team features, detailed reporting.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <span className="text-2xl">💎</span> Paid Goal Planner Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-800">
                  <p><strong>What you typically get:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Unlimited goals and projects</li>
                    <li>• Advanced analytics and insights</li>
                    <li>• Team collaboration features</li>
                    <li>• Custom reporting and data export</li>
                    <li>• Priority support and integrations</li>
                  </ul>
                  <p className="mt-3"><strong>Best for:</strong> Power users, teams, business goals, and data-driven planners who need detailed tracking.</p>
                  <p className="mt-2"><strong>Consider:</strong> Many paid apps offer free trials—test before committing to ensure the features justify the cost.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 text-center">
              <strong>Our recommendation:</strong> Start with a free app. If you outgrow its features and can clearly identify how paid features would help you achieve more, then upgrade.
            </p>
          </div>
        </section>

        {/* Digital vs Paper Section */}
        <section className="space-y-6" id="digital-vs-paper">
          <h2 className="text-3xl font-bold text-gray-900">Digital Goal Planner vs Paper Goal Planner</h2>
          <p className="text-lg text-gray-600">Both approaches work—the choice depends on your personality, preferences, and what helps you stay consistent.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <span className="text-2xl">📱</span> Digital Goal Planner Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-purple-800">
                  <p><strong>Key advantages:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Automatic reminders and notifications</li>
                    <li>• Easy to edit and reorganize goals</li>
                    <li>• Progress tracking and data visualization</li>
                    <li>• Searchable history and notes</li>
                    <li>• Cross-device sync (phone, tablet, computer)</li>
                    <li>• Can integrate with calendar and other apps</li>
                  </ul>
                  <p className="mt-3"><strong>Best for:</strong> People who appreciate data, need reminders, or want to track progress over long periods.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">📓</span> Paper Goal Planners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-orange-800">
                  <p><strong>Key advantages:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Writing enhances memory and commitment</li>
                    <li>• No digital distractions or notifications</li>
                    <li>• Creative freedom (drawings, mind maps)</li>
                    <li>• Tangible satisfaction of physical completion</li>
                    <li>• No battery or connectivity required</li>
                    <li>• Can be more relaxing and mindful</li>
                  </ul>
                  <p className="mt-3"><strong>Best for:</strong> People who enjoy writing, want to reduce screen time, or find physical planning more satisfying.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <p className="text-blue-800 text-center">
              <strong>Hybrid approach:</strong> Many people use paper for initial goal setting and weekly reviews, then digital for daily tracking and reminders.
            </p>
          </div>
        </section>

        {/* Who Should Use Section */}
        <section className="space-y-6" id="who-should-use">
          <h2 className="text-3xl font-bold text-gray-900">Who Should Use a Goal Planner App?</h2>
          <p className="text-lg text-gray-600">Goal planner apps aren't just for "high achievers"—they're for anyone who wants to turn intentions into actions.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💼</span> Professionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Career development, skill building, project milestones, performance goals, work-life balance targets.</p>
                  <p className="text-gray-600">Benefit: Structure for long-term career growth with busy work schedules.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎓</span> Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Academic targets, study habits, skill acquisition, research deadlines, personal development goals.</p>
                  <p className="text-gray-600">Benefit: Breaking large academic projects into manageable daily tasks.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏃</span> Fitness Enthusiasts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Training consistency, performance targets, habit formation, nutrition tracking, recovery goals.</p>
                  <p className="text-gray-600">Benefit: Maintaining motivation through plateaus and busy periods.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span> Creatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Project completion, skill development, portfolio building, creative habits, networking goals.</p>
                  <p className="text-gray-600">Benefit: Structure for creative work that doesn't feel restrictive.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Life Planners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Home organization, family goals, personal development, financial targets, relationship improvements.</p>
                  <p className="text-gray-600">Benefit: Balancing multiple life areas without dropping important priorities.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span> Habit Builders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Breaking old patterns, building new routines, consistency tracking, milestone celebrations.</p>
                  <p className="text-gray-600">Benefit: Accountability and progress visibility for long-term behavior change.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Consistency Section */}
        <section className="space-y-6" id="consistency-help">
          <h2 className="text-3xl font-bold text-gray-900">How a Goal Planner App Helps You Stay Consistent</h2>
          <p className="text-lg text-gray-600">Consistency isn't about perfect discipline—it's about having the right support system when motivation fades.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <span className="text-xl">🧠</span> External Memory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800">The app remembers your goals and next steps when your brain is busy or tired. No more "I forgot what I was supposed to work on."</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    <span className="text-xl">⏰</span> Timely Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">Gentle nudges at the right moment protect your time and energy, preventing important tasks from getting lost in daily chaos.</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center gap-2">
                    <span className="text-xl">📊</span> Visual Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800">Seeing your progress creates momentum and reinforces the habit, especially on days when motivation is low.</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900 flex items-center gap-2">
                    <span className="text-xl">🔄</span> Pattern Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-800">The app helps you see what works (and what doesn't) so you can adjust your approach instead of quitting.</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700">
                <strong>The key insight:</strong> Consistency comes from systems, not willpower. A goal planner app provides the external structure that keeps you moving forward through busy weeks, low motivation, and unexpected obstacles.
              </p>
            </div>
          </div>
        </section>

        {/* Breaking Goals Section */}
        <section className="space-y-6" id="breaking-goals">
          <h2 className="text-3xl font-bold text-gray-900">How to Break Big Goals into Daily Actions</h2>
          <p className="text-lg text-gray-600">The gap between "I want to achieve X" and "Today I will do Y" is where most goals die. Here's how to bridge it.</p>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-6">The Goal Decomposition Framework</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Start with the Big Outcome</h4>
                  <p className="text-blue-800">Define your destination clearly: "Complete marathon in under 4 hours" not "get better at running."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Work Backward with Milestones</h4>
                  <p className="text-blue-800">Create quarterly checkpoints: Month 3: 10 miles, Month 6: 15 miles, Month 9: 20 miles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Define Weekly Targets</h4>
                  <p className="text-blue-800">Break milestones into weekly actions: "Week 1: Run 3x, 2 miles each. Week 2: Run 3x, 2.5 miles each."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Identify Daily Actions</h4>
                  <p className="text-blue-800">Convert weekly targets to specific daily tasks: "Monday: 3-mile run after work. Tuesday: 20-minute stretching."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">5</div>
                <div>
                  <h4 className="font-semibold text-blue-900">Make Actions "Too Easy to Skip"</h4>
                  <p className="text-blue-800">Ensure each daily action is small enough to complete even on your worst day: "Put on running shoes" is better than "run 5 miles."</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tip: Time-Based Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Attach actions to specific times: "Run Monday/Wednesday/Friday at 6pm" rather than "run 3x this week."</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Pro Tip: Trigger-Based Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Link to existing habits: "After morning coffee, review goal progress" or "After dinner, plan tomorrow's goal action."</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 Pro Tip: Weekly Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Every Sunday, adjust next week's actions based on what worked, what didn't, and upcoming challenges.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="space-y-6" id="common-mistakes">
          <h2 className="text-3xl font-bold text-gray-900">Common Goal-Setting Mistakes That Keep People Stuck</h2>
          <p className="text-lg text-gray-600">Understanding these pitfalls is half the battle. Most goal failures aren't motivation problems—they're planning problems.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 flex items-center gap-2">
                    <span className="text-xl">🌫️</span> Vague Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-800"><strong>The mistake:</strong> "Get healthier," "be more productive," "learn something new"</p>
                  <p className="text-red-700 mt-2"><strong>The fix:</strong> Make goals specific and measurable: "Exercise 3x weekly," "complete online course," "read 20 pages daily"</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Outcome-Only Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-800"><strong>The mistake:</strong> Focusing only on the result (lose 20 pounds) without defining the process</p>
                  <p className="text-orange-700 mt-2"><strong>The fix:</strong> Define daily/weekly actions that lead to the outcome: "walk 30 minutes daily," "meal prep Sundays"</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-900 flex items-center gap-2">
                    <span className="text-xl">📋</span> No Next Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-800"><strong>The mistake:</strong> Knowing what you want but not what to do right now</p>
                  <p className="text-yellow-700 mt-2"><strong>The fix:</strong> Always have a clear, immediate next step: "Email professor about research opportunity" not "advance career"</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-900 flex items-center gap-2">
                    <span className="text-xl">⚡</span> Too Much, Too Soon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800"><strong>The mistake:</strong> Trying to change everything at once</p>
                  <p className="text-purple-700 mt-2"><strong>The fix:</strong> Start with one habit or goal for 2-3 weeks before adding more. Build momentum gradually.</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    <span className="text-xl">📅</span> Unrealistic Timelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800"><strong>The mistake:</strong> Expecting major changes in weeks</p>
                  <p className="text-blue-700 mt-2"><strong>The fix:</strong> Set realistic timeframes and celebrate small milestones along the way</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <span className="text-xl">🔄</span> No Tracking or Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800"><strong>The mistake:</strong> Setting goals and never checking progress</p>
                  <p className="text-green-700 mt-2"><strong>The fix:</strong> Weekly reviews to adjust plans based on real experience and obstacles</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700">
              <strong>The pattern:</strong> Most goal-setting mistakes come from focusing on the destination instead of the journey. A good goal planner app helps you focus on daily actions while keeping the destination in sight.
            </p>
          </div>
        </section>

        {/* Why GoalPlanner Section */}
        <section className="space-y-6" id="why-goalplanner">
          <h2 className="text-3xl font-bold text-gray-900">Why GoalPlanner is Useful for Real Daily Life</h2>
          <p className="text-lg text-gray-600">Most goal planning systems assume you have perfect discipline and unlimited time. GoalPlanner is built for reality.</p>
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🏠 Built for Real Life Constraints</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Quick setup that fits into busy schedules</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Flexible planning for travel, sick days, and unexpected events</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Recognizes some weeks are for maintenance, not growth</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">🔗 Integrated System Approach</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Goals connect directly to daily planning and habits</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">No context switching between multiple apps</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">✓</span>
                    <p className="text-gray-700">Weekly reviews that actually improve your plans</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">The GoalPlanner Difference</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">🎯 Focus on Action</h4>
                  <p className="text-blue-700 text-sm">Always shows you what to do next, not just what you want to achieve</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">🔄 Sustainable Pacing</h4>
                  <p className="text-blue-700 text-sm">Helps you maintain momentum through busy periods and low motivation</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">📊 Simple Progress</h4>
                  <p className="text-blue-700 text-sm">Shows trends without overwhelming analytics or complicated dashboards</p>
                </div>
              </div>
              <p className="text-blue-900 mt-6 text-center font-medium">
                GoalPlanner works because it's designed for people who have jobs, families, and other commitments—helping you make steady progress without requiring life to be perfect first.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-6" id="use-cases">
          <h2 className="text-3xl font-bold text-gray-900">Real Examples: How People Use a Goal Planner App</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💼</span> Career Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Pass certification by September</p>
                  <p><strong>Weekly:</strong> 2 modules + 1 practice test</p>
                  <p><strong>Daily:</strong> 30 minutes after dinner</p>
                  <p><strong>Tracking:</strong> Sessions + weekly notes</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏃</span> Fitness Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Train 3x/week for 8 weeks</p>
                  <p><strong>Weekly:</strong> 3 sessions</p>
                  <p><strong>Daily:</strong> Workout Tue/Thu/Sat</p>
                  <p><strong>Habit:</strong> 10-minute mobility on off days</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span> Financial Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Goal:</strong> Save $3,000</p>
                  <p><strong>Weekly:</strong> Transfer $75 + track spending 5 days</p>
                  <p><strong>Daily:</strong> Log spending at 9pm</p>
                  <p><strong>Review:</strong> What caused overspending?</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-gray-900">Build Your Full System</h2>
          <p className="text-lg text-gray-600">Goal planning works best when connected to daily execution and consistency.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Execution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan your day and protect focus time</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consistency & Routines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Build habits that support your goals</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>All-in-One System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Goals + tasks + habits + reflections</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productivity-app">Productivity App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Prefer a Simple System Over "Motivation"?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans on web or mobile. Start with one goal and one next action today—no complicated setup, just a calm place to plan, track, and stay consistent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6" id="faq">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </PublicPageLayout>
  );
};

export default GoalPlannerApp;
