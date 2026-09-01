import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";

const StudentPlanner = () => {
  const { openAuthModal } = useAuthModal();
  const faqData = [
    {
      question: "What's the difference between a student planner and regular planner?",
      answer: "Student planners are specifically designed for academic life with features like: class schedules, assignment tracking, exam planning, study session organization, and grade tracking. Regular planners focus more on general life and work tasks. Student planners also account for the unique rhythm of academic life—semesters, breaks, exam periods, and the need to balance multiple subjects simultaneously."
    },
    {
      question: "How do I balance studying with social life and extracurriculars?",
      answer: "Use time blocking with clear boundaries: schedule study blocks during peak focus times, protect social time by scheduling it like any other important activity, and include buffer time for unexpected opportunities. Also prioritize activities based on your goals and values—it's okay to say no to things that don't align with your priorities. The key is intentional scheduling rather than trying to fit everything in."
    },
    {
      question: "What's the best study schedule for students?",
      answer: "The best schedule matches your natural energy patterns and class schedule. Generally: study difficult subjects during peak focus hours, use 25-50 minute study sessions with breaks, schedule review sessions shortly after class, protect sleep and exercise time, and include buffer periods for unexpected study needs. Also vary study methods (reading, practice problems, group work) to maintain engagement."
    },
    {
      question: "How do I plan for exams without cramming?",
      answer: "Start exam planning 3-4 weeks in advance: break material into study chunks, schedule specific topics for each study session, include review sessions for previously covered material, practice with past exams or practice problems, and schedule lighter study days before the exam. Also create a study environment that minimizes distractions and use active study methods rather than passive reading."
    },
    {
      question: "Can a student planner help with time management?",
      answer: "Absolutely. Student planners help by: visualizing your entire schedule (classes, study, activities), preventing double-booking and conflicts, ensuring adequate study time for each subject, tracking assignment deadlines to avoid last-minute panic, and creating routines that reduce decision fatigue. Good planning turns academic chaos into manageable systems."
    },
    {
      question: "How do I track assignments and deadlines effectively?",
      answer: "Use a master assignment tracker with: assignment name, subject, due date, estimated time required, and completion status. Review this weekly and transfer upcoming assignments to your daily planner. Also break large assignments into smaller milestones with their own deadlines. Color-coding by subject or priority level helps with quick visual scanning."
    },
    {
      question: "What should I include in my daily student planner?",
      answer: "Include class schedule, study blocks (specific subjects/topics), assignment work time, breaks and meals, exercise/movement time, social activities, sleep schedule, and buffer time. Also track energy levels, mood, and study effectiveness to identify your optimal patterns. Keep it simple enough to use daily but comprehensive enough to capture all commitments."
    },
    {
      question: "How do I stay motivated with student planning?",
      answer: "Connect daily tasks to bigger goals (career, grades, personal growth), celebrate small wins (completed study sessions, assignment submissions), use visual progress tracking (streaks, completion charts), build accountability through study groups or check-ins, and remember your 'why'—the reasons you're pursuing your education. Also plan rewards for reaching important milestones."
    },
    {
      question: "Can student planning help with ADHD or focus challenges?",
      answer: "Yes, student planning is especially helpful for ADHD because it provides external structure and reduces cognitive load. Use: visual planners with color coding, time blocking to create structure, reminder systems for important deadlines, body doubling (studying with others), and breaking tasks into very small steps. Also include movement breaks and vary study methods to maintain engagement."
    },
    {
      question: "How do I plan for different types of classes (lecture vs lab vs discussion)?",
      answer: "Match planning to class type: lectures need pre-class reading and post-class review, labs require preparation time and cleanup/buffer periods, discussion classes need reading completion beforehand, and project-based classes need milestone planning. Also account for different energy requirements—schedule demanding classes during peak focus times when possible."
    }
  ];

  const planningAreas = [
    {
      title: "Academic Schedule",
      description: "Class times, study blocks, and assignment deadlines.",
      icon: "📚"
    },
    {
      title: "Time Management",
      description: "Balancing study, social life, and personal time effectively.",
      icon: "⏰"
    },
    {
      title: "Study Strategies",
      description: "Effective study methods and exam preparation techniques.",
      icon: "🧠"
    },
    {
      title: "Goal Setting",
      description: "Academic goals and personal development objectives.",
      icon: "🎯"
    },
    {
      title: "Habit Building",
      description: "Consistent study routines and productive habits.",
      icon: "✅"
    },
    {
      title: "Wellness Balance",
      description: "Sleep, exercise, nutrition, and mental health.",
      icon: "🏃‍♂️"
    }
  ];

  const studyStrategies = [
    {
      title: "Pomodoro Technique",
      description: "25-minute focused study sessions with 5-minute breaks.",
      icon: "🍅"
    },
    {
      title: "Active Recall",
      description: "Test yourself on material instead of just re-reading.",
      icon: "🔄"
    },
    {
      title: "Spaced Repetition",
      description: "Review material at increasing intervals over time.",
      icon: "📈"
    },
    {
      title: "Feynman Technique",
      description: "Explain concepts in simple terms to test understanding.",
      icon: "💡"
    },
    {
      title: "Study Groups",
      description: "Collaborative learning and teaching others.",
      icon: "👥"
    },
    {
      title: "Mind Mapping",
      description: "Visual organization of concepts and connections.",
      icon: "🗺️"
    }
  ];

  return (
    <PublicPageLayout>
      <Seo
        title="Best Student Planner 2026 | Study Smarter, Balance Life | GoalPlanner"
        description="The ultimate student planner for academic success. Organize classes, study sessions, and assignments. Balance studying with social life. Start planning free."
        canonicalPath="/student-planner"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Student Planner",
          url: "https://goalplanner.io/student-planner",
          description: "The ultimate student planner for academic success and balanced life.",
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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">Study Smarter, Not Harder</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The ultimate student planner for academic success. Organize your classes, study sessions, and assignments while balancing school with life. Achieve your goals without the burnout.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Student Planning Free
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="#planning-areas">Explore Features</Link>
          </Button>
        </div>
      </section>

      {/* Why Student Planning Matters */}
      <section className="space-y-6" id="why-matters">
        <h2 className="text-3xl font-display font-bold text-foreground">Why Student Planning Changes Everything</h2>
        <p className="text-lg text-muted-foreground">
          Good planning isn't about being perfect—it's about being intentional with your time and energy.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">😰 Without Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">
                Last-minute cramming, missed deadlines, constant stress, poor sleep, social isolation, and feeling overwhelmed by competing demands.
              </p>
            </CardContent>
          </Card>
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-momentum">🎯 With Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-momentum/80">
                Consistent progress, balanced schedule, reduced stress, better grades, time for friends and activities, and confidence in your academic journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Student Planning Areas */}
      <section className="space-y-6" id="planning-areas">
        <h2 className="text-3xl font-display font-bold text-foreground">Six Areas of Student Planning</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive student planning addresses all aspects of academic and personal success.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planningAreas.map((area, index) => (
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

      {/* Study Strategies */}
      <section className="space-y-6" id="study-strategies">
        <h2 className="text-3xl font-display font-bold text-foreground">Effective Study Strategies</h2>
        <p className="text-lg text-muted-foreground">
          These research-backed techniques help you learn more effectively in less time.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyStrategies.map((strategy, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{strategy.icon}</span>
                  {strategy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{strategy.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Daily Student Routine */}
      <section className="space-y-6" id="daily-routine">
        <h2 className="text-3xl font-display font-bold text-foreground">Sample Daily Student Schedule</h2>
        <p className="text-lg text-muted-foreground">
          A balanced schedule that supports academic success and personal wellbeing.
        </p>
        <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">🌅 Morning (6:00-9:00)</h3>
              <ul className="space-y-1 text-primary/80 text-sm">
                <li>• Wake up & hydrate</li>
                <li>• Light exercise or walk</li>
                <li>• Breakfast & review today's schedule</li>
                <li>• Quick review of yesterday's notes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">☀️ Midday (9:00-15:00)</h3>
              <ul className="space-y-1 text-primary/80 text-sm">
                <li>• Classes & labs</li>
                <li>• Study blocks between classes</li>
                <li>• Lunch with friends</li>
                <li>• Assignment work time</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">🌙 Evening (15:00-22:00)</h3>
              <ul className="space-y-1 text-primary/80 text-sm">
                <li>• Focused study session</li>
                <li>• Dinner & social time</li>
                <li>• Extracurricular activities</li>
                <li>• Wind-down & sleep prep</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assignment Planning */}
      <section className="space-y-6" id="assignment-planning">
        <h2 className="text-3xl font-display font-bold text-foreground">Assignment Planning System</h2>
        <p className="text-lg text-muted-foreground">
          Never miss a deadline with this systematic approach to assignment management.
        </p>
        <div className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">📝 Capture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Record every assignment immediately with due date and requirements</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">📊 Break Down</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Divide large assignments into smaller milestones</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">📅 Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Block time in your calendar for each milestone</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">✅ Track</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">Monitor progress and adjust as needed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exam Preparation */}
      <section className="space-y-6" id="exam-prep">
        <h2 className="text-3xl font-display font-bold text-foreground">Exam Preparation Timeline</h2>
        <p className="text-lg text-muted-foreground">
          Study systematically instead of cramming for better retention and reduced stress.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-momentum/20 bg-momentum/10">
            <CardHeader>
              <CardTitle className="text-momentum">4 Weeks Out</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-momentum/80">
                Create study schedule, gather materials, break topics into study chunks.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle className="text-primary">2-3 Weeks Out</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary/80">
                Daily study sessions, practice problems, review difficult concepts.
              </p>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-900">1 Week Out</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-800">
                Practice exams, group study, final review of all material.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-900">Exam Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800">
                Light review, good breakfast, arrive early, stay calm.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Balance and Wellness */}
      <section className="space-y-6" id="balance">
        <h2 className="text-3xl font-display font-bold text-foreground">Academic Success Needs Balance</h2>
        <p className="text-lg text-muted-foreground">
          Your brain works best when your body and social needs are met too.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-900">🏃‍♂️ Physical Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800">
                Schedule exercise like any other appointment. Even 20 minutes daily improves focus, memory, and stress management.
              </p>
            </CardContent>
          </Card>
          <Card className="border-pink-200 bg-pink-50">
            <CardHeader>
              <CardTitle className="text-pink-900">👥 Social Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pink-800">
                Protect time for friends and activities. Social support reduces stress and prevents burnout.
              </p>
            </CardContent>
          </Card>
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-indigo-900">😴 Sleep Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-800">
                Protect 7-9 hours of sleep. All-nighters destroy memory consolidation and focus.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="space-y-6" id="cta">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Ready to Ace Your Studies?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start organizing your academic life with a student planner designed for real success. Balance studying with life, achieve your goals, and enjoy your journey with GoalPlanner.
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
            Start Student Planning Free
          </Button>
        </div>
      </section>

      {/* Related Topics */}
      <section className="space-y-6" id="related-topics">
        <h2 className="text-3xl font-display font-bold text-foreground">Master Student Success Skills</h2>
        <p className="text-lg text-muted-foreground">
          Explore specific student planning techniques and academic success strategies.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">⏰ Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Master scheduling and prioritization</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/time-management">Time Management →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 To-Do Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Organize assignments and tasks effectively</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/to-do-list">To-Do Lists →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎯 Goal Setting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Set and achieve academic goals</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/goal-planner">Goal Planning →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧠 ADHD Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Strategies for focus and executive function</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/adhd-productivity">ADHD Strategies →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6" id="faq">
        <h2 className="text-3xl font-display font-bold text-foreground">Student Planning FAQ</h2>
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

export default StudentPlanner;
