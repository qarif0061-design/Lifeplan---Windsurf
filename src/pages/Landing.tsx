import { Button } from "@/components/ui/button";
import { Target, Zap, Shield, BarChart3, ArrowRight, CheckCircle2, Star, MessageSquare, HelpCircle, Apple, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Landing = () => {
  const features = [
    {
      title: "Goal Management",
      description: "Set, track, and achieve your long-term goals with precision.",
      icon: Target,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Strategy System",
      description: "Define your 'Why' and build a solid foundation for success.",
      icon: Shield,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Weekly Planning",
      description: "Break down goals into actionable weekly plans and tasks.",
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Smart Analytics",
      description: "Visualize your progress with detailed insights and streaks.",
      icon: BarChart3,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Product Designer",
      content: "LifePlan changed how I approach my career goals. The strategy system is a game-changer.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Marcus Chen",
      role: "Entrepreneur",
      content: "The weekly planning keeps me focused on what actually moves the needle. Highly recommended.",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    {
      name: "Elena Rodriguez",
      role: "Student",
      content: "I love the daily check-ins. It's so satisfying to see my streaks grow every day!",
      avatar: "https://i.pravatar.cc/150?u=elena"
    }
  ];

  const faqs = [
    {
      question: "How does the Strategy System work?",
      answer: "The Strategy System helps you define your 'Why', identify beneficiaries, and decide what to say 'No' to, creating a solid foundation for your goals."
    },
    {
      question: "Can I use LifePlan on my phone?",
      answer: "Yes. LifePlan works on mobile web, and we also offer native mobile app versions in the iOS App Store and Google Play Store."
    },
    {
      question: "How do weekly plans help me hit long-term goals?",
      answer: "Weekly planning turns big goals into small priorities and tasks you can actually finish. You plan once per week, then track progress and adjust in a weekly review."
    },
    {
      question: "Can I track habits and daily routines?",
      answer: "Yes. Use daily check-ins and tasks to track habits (like exercise, hydration, study sessions) and keep streaks visible."
    },
    {
      question: "Does LifePlan sync across devices?",
      answer: "Yes. Your account syncs your goals and plans so you can use LifePlan on web and mobile without losing progress."
    },
    {
      question: "Is my data private and secure?",
      answer: "We treat your goals and notes as private. Access is tied to your account, and we follow best practices to keep data protected."
    },
    {
      question: "How do I get started in 5 minutes?",
      answer: "Create one goal, choose a timeframe, write a short strategy (why it matters), then set 1–3 weekly priorities. That’s enough to begin building consistency."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Your goal system on web + mobile</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Plan your goals. Organize your week. Win your day.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Lifeplans is a simple planning app that helps you turn goals into weekly priorities and daily tasks so you can stay consistent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-blue-200">
              <Link to="/auth">Start Planning Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>

          <div className="mt-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
            <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] shadow-xl shadow-blue-200/40">
              <div className="rounded-[2.5rem] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-white/40 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Mobile Apps</p>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">Download the mobile applications</h3>
                    <p className="mt-2 text-gray-600">Plan, check-in, and stay consistent from anywhere.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 w-full md:w-auto">
                    <Button asChild className="rounded-2xl bg-gray-900 hover:bg-black text-white h-16 justify-start">
                      <a
                        href="https://apps.apple.com/us/app/goal-planner-lifeplans/id6756404940"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center min-w-0"
                      >
                        <Apple className="w-6 h-6 mr-3" />
                        <span className="flex flex-col items-start leading-none min-w-0">
                          <span className="text-xs opacity-80 truncate">Download on the</span>
                          <span className="text-base font-bold truncate">App Store</span>
                        </span>
                      </a>
                    </Button>
                    <Button asChild className="rounded-2xl bg-white border border-gray-200 text-gray-700 h-16 justify-start hover:bg-gray-50">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.faran.lifeplans"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center min-w-0"
                      >
                        <Smartphone className="w-6 h-6 mr-3" />
                        <span className="flex flex-col items-start leading-none min-w-0">
                          <span className="text-xs text-gray-500 truncate">Download on the</span>
                          <span className="text-base font-bold truncate">Google Play</span>
                        </span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Examples you can copy</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              If you’re new, use these as a starting point. Keep it simple and adjust as you go.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-700">Sample Goal</div>
              <h3 className="mt-2 text-xl font-bold text-gray-900">Improve fitness in 8 weeks</h3>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <div className="font-semibold text-gray-900 mb-2">Checkpoints</div>
                <div className="space-y-1">
                  <div>3 workouts/week</div>
                  <div>8k steps/day (average)</div>
                  <div>Meal plan 3 days/week</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link to="/auth">Create your goal</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/how-to-set-goals-that-stick">Read guide</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-700">Sample Weekly Plan</div>
              <h3 className="mt-2 text-xl font-bold text-gray-900">This week’s priorities</h3>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <div className="font-semibold text-gray-900 mb-2">Top 3 priorities</div>
                <div className="space-y-1">
                  <div>Finish one important task (deep work)</div>
                  <div>Move the body 3x</div>
                  <div>Plan the next week on Friday</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link to="/auth">Plan your week</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/weekly-planning-for-long-term-goals">Read guide</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">Sample Daily Plan</div>
              <h3 className="mt-2 text-xl font-bold text-gray-900">Today (30–60 minutes)</h3>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <div className="font-semibold text-gray-900 mb-2">Do this first</div>
                <div className="space-y-1">
                  <div>25–50 min focus session</div>
                  <div>10 min admin / messages</div>
                  <div>5 min prepare tomorrow</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link to="/auth">Open daily planner</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/articles/daily-planner-template">Get template</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">How Lifeplans works (3 steps)</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Start simple. Create one goal, plan the week, then execute one day at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">1) Create a goal</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Write one clear goal and add checkpoints so progress is measurable.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/goals">Open Goals</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2) Plan your week</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Choose 1-3 weekly priorities and break them into startable tasks.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/weekly-planner">Open Weekly Planner</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">3) Run your day</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                Use the Daily Planner to focus on today's schedule and tasks.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/daily-planner">Open Daily Planner</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Powerful tools designed to keep you focused, motivated, and on track to reaching your full potential.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Loved by high achievers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 mb-8 italic">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-gray-100 rounded-2xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-gray-900 hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <img
              src="/HI_RES_ICON-9160.png"
              alt="LifePlan"
              className="w-7 h-7 rounded"
            />
            <span className="text-lg font-bold text-gray-900">LifePlan</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm mb-4">
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/refund" className="text-gray-600 hover:text-blue-600 transition-colors">Refund Policy</Link>
          </div>
          <p className="text-gray-500 text-sm">© 2024 LifePlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;