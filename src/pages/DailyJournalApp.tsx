import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const DailyJournalApp = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the best daily journal app for beginners?",
      answer: "The best daily journal app for beginners focuses on consistency over features. Look for: low-friction writing (start typing immediately), optional prompts (when you don't know what to write), reminders you control (gentle nudges, not pressure), easy review and search (find patterns over time), privacy-first design (your thoughts stay private), and cross-device sync (journal anywhere). The goal is building a reflection habit, not creating another task. Many people abandon journal apps that feel like work—choose one that disappears into your routine."
    },
    {
      question: "How long should I journal each day?",
      answer: "3-10 minutes is ideal for most people. Consistency matters more than length. The key is making journaling feel like a gift to yourself, not another obligation. Some people prefer 3-minute 'pattern check-ins' (what worked, what didn't, what's next), while others enjoy 10-minute deeper reflections. Start small (3-5 minutes) and increase only if it feels natural. Remember: a daily 3-minute journal is infinitely better than a weekly 30-minute journal that never happens."
    },
    {
      question: "What should I write about if my day felt boring?",
      answer: "Boring days often reveal the most important patterns. Instead of focusing on events, focus on energy and awareness: What drained your energy today? What gave you energy? When did you feel most focused? When did you feel distracted? What did you avoid and why? What do you want tomorrow to feel like? These 'boring' insights often lead to the biggest breakthroughs because they reveal your patterns, triggers, and natural rhythms."
    },
    {
      question: "Can journaling help with anxiety and overthinking?",
      answer: "Yes, journaling is one of the most effective tools for managing anxiety and overthinking. It works by: externalizing racing thoughts (getting them out of your head), creating distance from emotions (seeing them objectively), identifying thought patterns (recognizing anxiety loops), processing emotions instead of avoiding them, and finding solutions through structured thinking. The 'brain dump' technique—writing everything you're thinking without judgment—can immediately reduce mental overload and create clarity."
    },
    {
      question: "Is digital journaling safe and private?",
      answer: "Digital journaling can be very secure if you choose the right tools. Look for: end-to-end encryption (only you can read your entries), strong password protection, two-factor authentication, clear privacy policy (no data selling), and local storage options (entries stored on your device). Avoid free apps that monetize through data mining. For sensitive topics, consider apps that offer local-only storage or encrypted cloud backup. Remember: if a service is free, you're often the product."
    },
    {
      question: "What's the difference between digital and paper journaling?",
      answer: "Digital journals offer searchability, accessibility (journal anywhere), easy editing, secure backups, and optional prompts. Paper journals provide tactile writing experience, no digital distractions, creative freedom (drawings, mind maps), and privacy through physical control. Many people use both: paper for deep reflection and creative work, digital for daily check-ins and pattern tracking. The choice depends on whether you value searchability and convenience over the tactile writing experience."
    },
    {
      question: "How do I start a daily journaling habit?",
      answer: "Start ridiculously small and attach it to an existing routine. The 2-minute rule works perfectly: 'After my morning coffee, write for 2 minutes.' Set a specific time and trigger (after coffee, before bed, during lunch). Use a simple template at first (one win, one challenge, one next step). Don't worry about quality—focus on consistency. Most importantly, forgive yourself for missed days and get back on track immediately. The habit is more important than any individual entry."
    },
    {
      question: "What should I write in a daily journal?",
      answer: "Use a flexible framework that adapts to your needs. Start with: 1) One highlight (what went well), 2) One challenge (what was hard), 3) One insight (what you learned), 4) One intention (what tomorrow needs). As you build the habit, add: energy levels, emotional patterns, goal progress, habit observations, gratitude, or creative ideas. The key is writing whatever helps you understand yourself better—there's no wrong way to journal."
    },
    {
      question: "Can journaling help with goals and habits?",
      answer: "Absolutely. Journaling connects goals and habits to reality. For goals: Track progress, identify obstacles, celebrate small wins, and adjust your approach. For habits: Notice what triggers good habits and what derails them, identify patterns that support consistency, and learn from slips without shame. The most powerful approach is connecting journal entries to your actual daily experiences with your goals and habits—this creates feedback loops that accelerate improvement."
    },
    {
      question: "What features are essential in a journal app?",
      answer: "For effective daily journaling, look for: quick entry (start writing immediately), optional prompts (when you're stuck), flexible reminders (gentle nudges, not pressure), easy review and search (find patterns over time), privacy and security (your thoughts stay private), cross-device sync (journal anywhere), and simple organization (tags, categories, dates). Avoid apps with excessive features, social pressure, or complex organization that creates friction. The best journal app disappears into your routine."
    }
  ];

  const features = [
    {
      title: "Low-Friction Writing",
      description: "Start writing quickly without complex formatting or setup.",
      icon: "✍️"
    },
    {
      title: "Smart Prompts",
      description: "Optional guided prompts when you don't know what to write.",
      icon: "💭"
    },
    {
      title: "Flexible Reminders",
      description: "Gentle reminders that fit your routine, not disrupt it.",
      icon: "🔔"
    },
    {
      title: "Pattern Discovery",
      description: "Review entries to spot patterns in energy, mood, and productivity.",
      icon: "🔍"
    },
    {
      title: "Privacy First",
      description: "Your journal is personal—keep it secure and under your control.",
      icon: "🔒"
    },
    {
      title: "Goal Connection",
      description: "Link reflections to your goals and habits for deeper insight.",
      icon: "🎯"
    }
  ];

  const promptTemplates = [
    {
      title: "The 3-Minute Template",
      prompts: [
        "One win: What went well today?",
        "One challenge: What was hard today?",
        "One next step: What would make tomorrow easier?"
      ]
    },
    {
      title: "The Pattern Finder",
      prompts: [
        "What drained my energy today?",
        "What gave me energy today?",
        "What triggered stress or avoidance?"
      ]
    },
    {
      title: "The Goal & Habit Template",
      prompts: [
        "What action did I take toward my goal today?",
        "What habit helped (or hurt) me?",
        "What's the smallest improvement I can make tomorrow?"
      ]
    },
    {
      title: "The Decision Clarity Template",
      prompts: [
        "What am I avoiding?",
        "What's the real fear or friction?",
        "What's the smallest step I can take?"
      ]
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best Daily Journal App 2026 | Reflection, Clarity & Growth | GoalPlanner"
        description="The best daily journal app for mental clarity and self-awareness. Reflect with prompts, track patterns, and reduce overthinking. Start journaling free."
        canonicalPath="/daily-journal-app"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Daily Journal App",
          url: "https://goalplanner.io/daily-journal-app",
          description: "A practical guide to choosing a daily journal app for reflection, clarity, and growth.",
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
            <Badge variant="secondary" className="w-fit">Reflect & Grow Consistently</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              Daily Journal App: Clear Your Mind, Notice Patterns, and Keep Growing (Without Writing Pages)
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Journaling isn't just for "deep thinkers." It's for anyone who wants their life to feel less random. A few minutes of reflection can do what hours of pushing can't: reduce mental clutter, reveal patterns you keep repeating, and make the next step obvious.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Journaling
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/download">Download Mobile App</Link>
            </Button>
          </div>

          <div className="bg-secondary/40 rounded-2xl p-8 border border-border">
            <p className="text-lg font-medium text-foreground mb-2">Why a daily journal app helps</p>
            <ul className="space-y-2 text-foreground/80">
              <li>• always with you (phone)</li>
              <li>• easier to start (prompts)</li>
              <li>• easier to review (search + history)</li>
              <li>• connects reflection to action</li>
              <li>• builds consistency with reminders</li>
            </ul>
          </div>
        </header>

        {/* Screenshot Placeholder */}
        <section className="space-y-6" id="app-preview">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">See Journaling in Action</h2>
            <div className="bg-secondary rounded-2xl p-12 border-2 border-dashed border-border">
              <p className="text-muted-foreground text-lg">📱 App Screenshot Placeholder</p>
              <p className="text-muted-foreground/70 text-sm mt-2">Journaling screen with prompts and reflection entries</p>
            </div>
          </div>
        </section>

        {/* What Is Section */}
        <section className="space-y-6" id="what-is">
          <h2 className="text-3xl font-bold text-foreground">What Is a Daily Journal App?</h2>
          <div className="prose prose-lg max-w-none text-foreground/80">
            <p>
              A <strong>daily journal app</strong> (digital journal app, personal journal app, journaling app, daily diary app) helps you write and reflect consistently—without needing a perfect routine.
            </p>
            <p>
              A great journaling app supports:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">fast entries</Badge>
              <Badge variant="outline">optional prompts</Badge>
              <Badge variant="outline">reminders</Badge>
              <Badge variant="outline">searchable entries</Badge>
              <Badge variant="outline">pattern review</Badge>
              <Badge variant="outline">privacy-first</Badge>
            </div>
            <p className="mt-4">
              If you're building a broader self-improvement system, a journal becomes even more useful when it connects to goals and habits.
            </p>
          </div>
        </section>

        {/* Digital vs Paper */}
        <section className="space-y-6" id="digital-vs-paper">
          <h2 className="text-3xl font-bold text-foreground">Digital Journal vs Paper Journal</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-foreground">📖 Paper Journaling</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• slower thinking</p>
                  <p>• creativity and sketching</p>
                  <p>• fewer distractions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground">📱 Digital Journal App</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• journaling anywhere</p>
                  <p>• quick daily reflection</p>
                  <p>• reminders and prompts</p>
                  <p>• searchable entries</p>
                  <p>• reviewing patterns over time</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-secondary/40 rounded-xl p-4 border border-border">
            <p className="text-foreground/80 text-center">
              You don't have to choose forever. Many people use digital for consistency and paper for deeper sessions.
            </p>
          </div>
        </section>

        {/* Best Daily Journal App Section */}
        <section className="space-y-6" id="best-daily-journal-app">
          <h2 className="text-3xl font-bold text-foreground">Best Daily Journal App: What to Look For</h2>
          <p className="text-lg text-muted-foreground">When searching for the best daily journal app, focus on features that support consistent reflection, not just writing.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-foreground">🎯 Essential Features That Build Consistency</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Quick Entry</p>
                    <p className="text-muted-foreground text-sm">Start writing immediately without complex setup</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Optional Prompts</p>
                    <p className="text-muted-foreground text-sm">Guided questions when you don't know what to write</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Easy Review</p>
                    <p className="text-muted-foreground text-sm">Search and find patterns over time</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-momentum/10 text-momentum rounded-full flex items-center justify-center text-sm font-semibold">✓</span>
                  <div>
                    <p className="font-medium">Privacy First</p>
                    <p className="text-muted-foreground text-sm">Your thoughts stay private and secure</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-foreground">⚠️ Features That Often Create Pressure</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Complex Organization</p>
                    <p className="text-muted-foreground text-sm">Too many tags, folders, and categories</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Social Pressure</p>
                    <p className="text-muted-foreground text-sm">Public sharing and comparison features</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Excessive Analytics</p>
                    <p className="text-muted-foreground text-sm">Word counts, sentiment analysis, mood tracking</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-sm font-semibold">✗</span>
                  <div>
                    <p className="font-medium">Gamification</p>
                    <p className="text-muted-foreground text-sm">Streaks, points, and achievement systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Journaling Helps Section */}
        <section className="space-y-6" id="why-journaling-helps">
          <h2 className="text-3xl font-bold text-foreground">Why Journaling Helps with Clarity and Consistency</h2>
          <p className="text-lg text-muted-foreground">Journaling isn't just writing—it's a tool for mental clarity and emotional intelligence.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/10">
              <CardHeader>
                <CardTitle className="text-foreground">🧠 Mental Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• Externalizes racing thoughts</p>
                  <p>• Creates distance from emotions</p>
                  <p>• Reduces mental overload</p>
                  <p>• Organizes scattered ideas</p>
                  <p>• Reveals thought patterns</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-momentum/20 bg-momentum/10">
              <CardHeader>
                <CardTitle className="text-foreground">🎯 Emotional Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-foreground/80">
                  <p>• Processes emotions instead of avoiding them</p>
                  <p>• Identifies emotional triggers</p>
                  <p>• Builds self-awareness</p>
                  <p>• Develops empathy for self</p>
                  <p>• Creates emotional regulation</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <p className="text-foreground/80 text-center">
              <strong>The science:</strong> Journaling activates the prefrontal cortex, helping you think more clearly and make better decisions. It's like a workout for your brain.
            </p>
          </div>
        </section>

        {/* Digital vs Paper Section */}
        <section className="space-y-6" id="digital-vs-paper">
          <h2 className="text-3xl font-bold text-foreground">Digital Journal vs Paper Journal</h2>
          <p className="text-lg text-muted-foreground">Both approaches work beautifully—the choice depends on your personality and goals.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <span className="text-2xl">📱</span> Digital Journal Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-purple-800">
                  <p><strong>Best for:</strong> Daily consistency, pattern tracking, accessibility</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Searchable entries and tags</li>
                    <li>• Cross-device synchronization</li>
                    <li>• Secure cloud backups</li>
                    <li>• Optional guided prompts</li>
                    <li>• Easy editing and organization</li>
                    <li>• Pattern recognition tools</li>
                  </ul>
                  <p><strong>When to use:</strong> When you want to journal daily and track patterns over time</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center gap-2">
                  <span className="text-2xl">📓</span> Paper Journals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-orange-800">
                  <p><strong>Best for:</strong> Deep reflection, creative expression, tactile experience</p>
                  <p><strong>Key features:</strong></p>
                  <ul className="space-y-1 ml-4">
                    <li>• Writing enhances memory and processing</li>
                    <li>• No digital distractions</li>
                    <li>• Creative freedom (drawings, mind maps)</li>
                    <li>• Privacy through physical control</li>
                    <li>• Tangible satisfaction</li>
                    <li>• No battery or connectivity needed</li>
                  </ul>
                  <p><strong>When to use:</strong> When you want deeper reflection or enjoy the physical writing experience</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <p className="text-foreground/80 text-center">
              <strong>Hybrid approach:</strong> Many successful journalers use both—paper for deep work, digital for daily check-ins.
            </p>
          </div>
        </section>

        {/* Journaling for Goals Section */}
        <section className="space-y-6" id="journaling-for-goals">
          <h2 className="text-3xl font-bold text-foreground">Journaling for Goals, Habits, and Personal Growth</h2>
          <p className="text-lg text-muted-foreground">Journaling connects your daily experiences to your bigger aspirations and growth journey.</p>
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">The Growth Connection Framework</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">🎯 Goals</h4>
                  <p className="text-foreground/80 text-sm">Track progress, identify obstacles, celebrate wins, adjust strategies, maintain motivation through challenges.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "Today I worked on my goal for 25 minutes and realized I need to break it into smaller steps."</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">✅ Habits</h4>
                  <p className="text-foreground/80 text-sm">Notice triggers and derailers, identify supportive patterns, learn from slips without shame, build consistency awareness.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "I skipped my morning habit because I stayed up too late—need to adjust bedtime routine."</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">🌱 Growth</h4>
                  <p className="text-foreground/80 text-sm">Recognize personal patterns, develop self-awareness, process emotions, make values-based decisions, continuous improvement.</p>
                  <p className="text-muted-foreground text-sm mt-2">Example: "I noticed I get anxious when I don't plan my day—structure helps me feel calm."</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Weekly Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Look back at your week's entries to identify themes, progress, and areas for improvement.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Pattern Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Notice recurring thoughts, emotional triggers, and decision patterns over time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Connect daily actions to bigger outcomes and celebrate meaningful progress.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What to Write Section */}
        <section className="space-y-6" id="what-to-write">
          <h2 className="text-3xl font-bold text-foreground">What to Write in a Daily Journal</h2>
          <p className="text-lg text-muted-foreground">A flexible framework that adapts to your needs makes journaling sustainable.</p>
          <div className="space-y-6">
            <div className="bg-momentum/10 rounded-2xl p-8 border border-momentum/20">
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">The Daily Reflection Framework</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">One Highlight</h4>
                    <p className="text-foreground/80">What went well today? What are you proud of or grateful for?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">One Challenge</h4>
                    <p className="text-foreground/80">What was difficult? What obstacle did you face or overcome?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">One Insight</h4>
                    <p className="text-foreground/80">What did you learn about yourself or your patterns?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-momentum text-momentum-foreground rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">One Intention</h4>
                    <p className="text-foreground/80">What would make tomorrow better or easier?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚡ Energy & Mood</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Track your energy levels and emotional state throughout the day.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Decision Making</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Note important decisions and your thought process behind them.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Creative Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Capture insights, solutions, and creative thoughts as they arise.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Daily Reflection Prompts */}
        <section className="space-y-6" id="daily-reflection-prompts">
          <h2 className="text-3xl font-bold text-foreground">Daily Reflection Prompts for Real Life</h2>
          <p className="text-lg text-muted-foreground">Use these prompts when you're stuck or want to deepen your reflection practice.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">🌅 Morning Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• What kind of day do I want to have?</li>
                  <li>• What's my top priority today?</li>
                  <li>• What would make today successful?</li>
                  <li>• What am I grateful for this morning?</li>
                  <li>• What do I need to let go of from yesterday?</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-900">🌆 Evening Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-800 text-sm">
                  <li>• What was my biggest learning today?</li>
                  <li>• When did I feel most like myself?</li>
                  <li>• What drained my energy today?</li>
                  <li>• What am I proud of accomplishing?</li>
                  <li>• What do I want to carry into tomorrow?</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-900">🤔 Challenge Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-800 text-sm">
                  <li>• What am I avoiding and why?</li>
                  <li>• What belief is holding me back?</li>
                  <li>• What would I do if I weren't afraid?</li>
                  <li>• What pattern keeps repeating?</li>
                  <li>• What do I need to forgive myself for?</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">💼 Growth Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• How did I grow today?</li>
                  <li>• What skill did I practice or improve?</li>
                  <li>• How did I handle a difficult situation?</li>
                  <li>• What boundary did I set or maintain?</li>
                  <li>• What am I becoming through my daily choices?</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Journaling for Anxiety Section */}
        <section className="space-y-6" id="journaling-for-anxiety">
          <h2 className="text-3xl font-bold text-foreground">Journaling for Overthinking, Focus, and Self-Awareness</h2>
          <p className="text-lg text-muted-foreground">Journaling is one of the most effective tools for managing anxiety and breaking overthinking cycles.</p>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">🧠 How Journaling Calms Anxiety</h3>
                <div className="space-y-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">External Racing Thoughts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Getting anxious thoughts out of your head and onto paper reduces their power over you.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Creates Distance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Seeing worries written down helps you observe them objectively rather than being consumed by them.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Identifies Patterns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">You can see what triggers your anxiety and prepare for those situations.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">⚡ The Brain Dump Technique</h3>
                <div className="bg-ember/10 rounded-xl p-6 border border-ember/20">
                  <p className="text-foreground mb-3">When overwhelmed, try this:</p>
                  <ol className="space-y-2 text-foreground/80 ml-4">
                    <li>Set a timer for 5-10 minutes</li>
                    <li>Write everything you're thinking without judgment</li>
                    <li>Don't worry about grammar or organization</li>
                    <li>Keep writing until the timer goes off</li>
                    <li>Read back and highlight any insights</li>
                  </ol>
                  <p className="text-foreground mt-3">This immediately reduces mental overload and creates clarity.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Worry Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Schedule 15 minutes to write down all your worries, then move on with your day.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Solution Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">After writing about a problem, write one small action you can take.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📈 Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Note when anxiety decreases and what helped you manage it.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6" id="features">
          <h2 className="text-3xl font-bold text-foreground">Key Features to Look For in the Best Daily Journal App</h2>
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
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Prompt Templates */}
        <section className="space-y-6" id="prompt-templates">
          <h2 className="text-3xl font-bold text-foreground">What to Write: Practical Daily Reflection Prompts</h2>
          <p className="text-lg text-muted-foreground">If you don't know what to write, use structure. Here are prompt sets that work for real life.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {promptTemplates.map((template, index) => (
              <Card key={index} className="border-primary/20 bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-foreground">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-foreground/80">
                    {template.prompts.map((prompt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Journaling for Goals */}
        <section className="space-y-6" id="journaling-for-goals">
          <h2 className="text-3xl font-bold text-foreground">Journaling for Goals: The Missing Layer Most People Skip</h2>
          <div className="bg-ember/10 rounded-2xl p-8 border border-ember/20">
            <p className="text-foreground mb-4">A goal journal app isn't about writing affirmations all day. It's about keeping goals connected to reality.</p>
            <div className="space-y-3 text-foreground">
              <p><strong>Useful goal journaling questions:</strong></p>
              <ul className="space-y-2 ml-4">
                <li>• What did I do this week that moved the goal forward?</li>
                <li>• What got in the way—time, energy, fear, confusion?</li>
                <li>• What's one adjustment I can make next week?</li>
                <li>• What's my next action?</li>
              </ul>
              <p className="mt-4">
                This is why GoalPlanner's journaling is valuable: it can sit next to your goals, habits, and daily plan—so reflection turns into action.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="space-y-6" id="mid-cta">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for More Clarity and Growth?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for daily reflection that connects to your goals and habits. Start with just 5 minutes of journaling today.
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start Journaling Free
            </Button>
          </div>
        </section>

        {/* Internal Links */}
        <section className="space-y-6" id="related-topics">
          <h2 className="text-3xl font-bold text-foreground">Build Your Complete Reflection System</h2>
          <p className="text-lg text-muted-foreground">Daily journaling works best when connected to your goals and daily structure.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎯 Goal Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Set meaningful goals that give your journaling purpose and direction</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/goal-planner-app">Goal Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📅 Daily Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Structure your day and protect time for reflection</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/daily-planner-app">Daily Planner App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">✅ Habit Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build routines that support your reflection practice</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/habit-tracker-app">Habit Tracker App →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🔄 All-in-One System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Combine journaling, goals, planning, and habits in one place</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/productivity-app">Productivity App →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="space-y-6" id="get-started">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Want More Clarity Without Overthinking?</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try Goal Planner – LifePlans for quick daily reflections that connect naturally to your goals, habits, and daily plan—on web and mobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
                Start Journaling Free
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/download">Download Mobile App</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6" id="faq">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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

export default DailyJournalApp;
