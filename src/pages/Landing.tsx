import { Button } from "@/components/ui/button";
import { Target, Zap, Shield, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Now available on Web</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Master Your Life with <span className="text-blue-600">LifePlan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The comprehensive goal planning and life management platform designed to help you achieve what matters most.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-blue-200">
              <Link to="/auth">Start Planning Free <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg font-semibold border-gray-200">
              View Premium Plans
            </Button>
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

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Unlock your full potential with Premium</h2>
                <ul className="space-y-4 mb-8">
                  {[
                    "Unlimited active goals",
                    "AI-powered Smart Planning",
                    "Full Strategy System access",
                    "Advanced PDCA weekly reviews",
                    "Detailed progress analytics"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 w-full md:w-80">
                <div className="text-center">
                  <span className="text-blue-200 font-medium uppercase tracking-wider text-sm">Most Popular</span>
                  <div className="mt-2 mb-4">
                    <span className="text-4xl font-bold">$4.99</span>
                    <span className="text-blue-200">/month</span>
                  </div>
                  <p className="text-sm text-blue-100 mb-6">Perfect for individuals committed to long-term growth.</p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-full">Get Started</Button>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Target className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-gray-900">LifePlan</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 LifePlan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;