import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";

const renderBody = (body: string) => {
  const lines = body.split("\n");
  const out: JSX.Element[] = [];
  let list: string[] = [];

  const flushList = (keyBase: string) => {
    if (!list.length) return;
    out.push(
      <ul key={`${keyBase}-ul`} className="list-disc pl-6 space-y-2 text-gray-700">
        {list.map((t, idx) => (
          <li key={`${keyBase}-li-${idx}`}>{t}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();

    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }

    flushList(`l-${i}`);

    if (!line.trim()) {
      out.push(<div key={`sp-${i}`} className="h-2" />);
      return;
    }

    if (line.startsWith("## ")) {
      out.push(
        <h2 key={`h2-${i}`} className="text-xl font-extrabold text-gray-900 mt-6">
          {line.slice(3)}
        </h2>,
      );
      return;
    }

    out.push(
      <p key={`p-${i}`} className="text-gray-700 leading-relaxed">
        {line}
      </p>,
    );
  });

  flushList("end");
  return out;
};

const CONTENT: Record<string, { title: string; body: string }> = {
  "how-to-set-goals-that-stick": {
    title: "How to Set Goals That Stick",
    body:
      "Setting goals is easy. Setting goals that actually stick—goals you follow through on, track consistently, and finish—is the real skill.\n\n" +
      "In this guide, you’ll learn a practical goal-setting framework you can use inside Lifeplans (Goal Planner) to create clear goals, choose a realistic timeframe, and build a system for progress tracking, accountability, and motivation.\n\n" +
      "## 1) Start with a clear outcome (what does success look like?)\n" +
      "A goal that sticks has a specific outcome. Avoid vague targets like ‘get healthier’ or ‘be more productive’. Instead, define a concrete result:\n" +
      "- Lose 5 kg in 8 weeks\n" +
      "- Run 5 km without stopping within 6 weeks\n" +
      "- Publish 12 high-quality articles in 3 months\n\n" +
      "Keywords to keep in mind: SMART goals, goal clarity, measurable outcome, success criteria, goal tracking.\n\n" +
      "## 2) Choose the right timeframe (weeks vs months)\n" +
      "Timeframe drives behavior. A short timeframe increases urgency but can cause burnout. A long timeframe reduces urgency and can lead to procrastination.\n\n" +
      "A simple rule:\n" +
      "- Use **weeks** for habit-building and quick wins\n" +
      "- Use **months** for bigger transformations and multi-step projects\n\n" +
      "Inside Lifeplans, set your timeframe and duration so you can see exactly when the goal becomes overdue and what ‘on-track’ progress looks like.\n\n" +
      "## 3) Break the goal into weekly actions\n" +
      "Big goals fail when they stay big. Weekly planning turns a long-term goal into small tasks you can actually complete.\n\n" +
      "Examples of weekly actions:\n" +
      "- Fitness goal: schedule 3 workouts + 2 walks\n" +
      "- Business goal: publish 1 landing page + 1 email campaign\n" +
      "- Study goal: 5 study sessions + 1 practice test\n\n" +
      "## 4) Track progress (and make it visible)\n" +
      "Progress tracking is motivation. When you see progress, you continue. When you don’t, you quit.\n\n" +
      "Use a progress percentage that reflects reality. If you’re halfway through, set progress to ~50%. The point isn’t perfection—it’s honest feedback.\n\n" +
      "## 5) Use a daily check-in to protect consistency\n" +
      "Consistency beats intensity. A daily check-in creates accountability without adding friction.\n\n" +
      "In Lifeplans, your daily check-in can include hydration, healthy eating, exercise, and notes. Over time you’ll build a streak and a reliable rhythm.\n\n" +
      "## 6) Plan for obstacles (strategy)\n" +
      "Most goals fail for predictable reasons: time, energy, distractions, unclear next steps. Write a simple strategy:\n" +
      "- Why this goal matters\n" +
      "- Who benefits if you succeed\n" +
      "- What you will say ‘no’ to\n\n" +
      "## Summary: the goal-setting checklist\n" +
      "- Clear outcome\n" +
      "- Realistic timeframe\n" +
      "- Weekly plan\n" +
      "- Progress tracking\n" +
      "- Daily check-in habit\n" +
      "- Strategy for obstacles\n",
  },
  "weekly-planning-for-long-term-goals": {
    title: "Weekly Planning for Long-Term Goals",
    body:
      "Weekly planning is the bridge between long-term goals and daily execution. If you’ve ever set a goal and then ‘got busy’, weekly planning is the missing layer.\n\n" +
      "This article explains a simple weekly planning system you can use inside Lifeplans to convert big goals into weekly priorities, realistic tasks, and consistent progress.\n\n" +
      "## Why weekly planning works\n" +
      "Long-term goals fail when they compete with daily life. Weekly planning creates a weekly commitment you can actually keep.\n\n" +
      "Benefits:\n" +
      "- Clear focus (what matters this week)\n" +
      "- Better time management\n" +
      "- Less overwhelm\n" +
      "- Consistent progress tracking\n\n" +
      "## Step 1: Pick 1–3 weekly priorities\n" +
      "A priority is not a wish list. It’s the most important outcomes for this week. If you pick 10, you picked none.\n\n" +
      "Examples:\n" +
      "- Finish outline + first draft of one article\n" +
      "- Complete 3 workouts\n" +
      "- Save $100 and review spending\n\n" +
      "## Step 2: Turn priorities into tasks\n" +
      "Each priority needs tasks that fit your real schedule. Good tasks are specific and small enough to start.\n\n" +
      "Bad task: ‘Work on my goal’\n" +
      "Good tasks: ‘Write 500 words’, ‘Book gym session for Tuesday 6pm’, ‘Meal prep Sunday 30 minutes’.\n\n" +
      "## Step 3: Assign when you’ll do it\n" +
      "Weekly planning fails when tasks have no time. Even a simple calendar block improves follow-through.\n\n" +
      "## Step 4: Review and adjust weekly\n" +
      "At the end of the week, review: what worked, what didn’t, and why. Then adjust.\n\n" +
      "## Keywords to naturally include in your planning\n" +
      "- weekly planning template\n" +
      "- weekly goals\n" +
      "- goal progress tracking\n" +
      "- productivity planning\n" +
      "- time blocking\n\n" +
      "## Summary\n" +
      "Weekly planning is simple: priorities → tasks → schedule → review. Do it consistently and your long-term goals become inevitable.\n",
  },
  "how-to-build-a-daily-check-in-habit": {
    title: "How to Build a Daily Check-in Habit",
    body:
      "A daily check-in habit is one of the fastest ways to improve consistency, build self-awareness, and stay accountable to your goals. It works because it makes progress visible and reduces the ‘I forgot’ problem.\n\n" +
      "In Lifeplans, daily check-ins track hydration, healthy eating, exercise, and notes—simple signals that compound into results.\n\n" +
      "## 1) Make it frictionless (60 seconds or less)\n" +
      "If your check-in takes 10 minutes, you won’t do it every day. Keep it short. A checkbox habit is perfect because it’s fast and clear.\n\n" +
      "## 2) Attach it to an existing routine\n" +
      "Habit stacking is powerful. Link your daily check-in to something you already do:\n" +
      "- After brushing teeth\n" +
      "- After morning coffee\n" +
      "- Before bed\n\n" +
      "## 3) Use streaks as momentum (not pressure)\n" +
      "Streaks create motivation. But don’t let streaks turn into shame. If you miss a day, you didn’t fail—you learned something about your routine.\n\n" +
      "## 4) Track what matters for your goals\n" +
      "The best daily check-in metrics are the leading indicators of your goal. For most people:\n" +
      "- Hydration supports energy and focus\n" +
      "- Healthy eating supports body composition and mood\n" +
      "- Exercise supports confidence and performance\n\n" +
      "## 5) Write one sentence of notes when needed\n" +
      "Notes help you spot patterns: stress eating, low sleep, busy weeks, motivation dips. Over time, you’ll know what helps and what hurts.\n\n" +
      "## Keywords (for SEO + clarity)\n" +
      "- daily check-in habit\n" +
      "- habit tracker\n" +
      "- streak tracking\n" +
      "- accountability system\n" +
      "- daily routine\n\n" +
      "## Summary\n" +
      "Build a daily check-in habit by making it fast, attaching it to an existing routine, and using streaks for momentum. Small daily actions create big results.\n",
  },
  "goal-setting-vs-habit-building": {
    title: "Goal Setting vs Habit Building: What Actually Works?",
    body:
      "If you’ve tried goal setting and felt motivated for a week… then stopped, you’re not alone. The most effective system is not ‘goals vs habits’—it’s using both together.\n\n" +
      "This guide explains the difference, when each works best, and how to combine outcome goals, process habits, and progress tracking in Lifeplans.\n\n" +
      "## What is goal setting?\n" +
      "Goal setting is choosing a clear outcome you want to achieve by a deadline. It gives direction and helps you prioritize.\n\n" +
      "## What is habit building?\n" +
      "Habit building is creating repeatable behaviors (the process) that makes the outcome likely. Habits reduce decision fatigue and increase consistency.\n\n" +
      "## When goals work best\n" +
      "Goals are great when you need clarity and a finish line—launching a project, reaching a target weight, passing an exam.\n\n" +
      "## When habits work best\n" +
      "Habits are best when the path is long and motivation will fluctuate—fitness, learning, content creation, saving money.\n\n" +
      "## Combine them: the winning formula\n" +
      "- Set a clear outcome goal (what)\n" +
      "- Choose 1–3 habits that drive it (how)\n" +
      "- Review weekly and adjust\n\n" +
      "## Keywords\n" +
      "goal setting, habit building, consistency, progress tracking, accountability, weekly planning\n",
  },
  "time-blocking-for-goals": {
    title: "Time Blocking for Goals: A Simple Weekly System",
    body:
      "Time blocking is one of the best productivity methods for goal achievement because it converts ‘I should’ into ‘It’s scheduled’.\n\n" +
      "## Step 1: Choose one weekly priority\n" +
      "Pick the single most important outcome for this week.\n\n" +
      "## Step 2: Break it into 2–5 sessions\n" +
      "Instead of one huge task, create small sessions you can start.\n\n" +
      "- 30 minutes research\n" +
      "- 45 minutes drafting\n" +
      "- 20 minutes review\n\n" +
      "## Step 3: Block time on your calendar\n" +
      "Put the sessions on your calendar before the week starts.\n\n" +
      "## Step 4: Weekly review\n" +
      "At the end of the week, review what got done and what needs a new plan.\n\n" +
      "Keywords: time blocking, weekly planning, productivity, focus, deep work\n",
  },
  "how-to-stay-motivated": {
    title: "How to Stay Motivated When Progress Feels Slow",
    body:
      "Motivation is not a constant feeling—it’s a result of clarity and momentum. When progress feels slow, you need better feedback, smaller steps, and a stronger strategy.\n\n" +
      "## Use smaller progress milestones\n" +
      "If your goal is big, create smaller wins every week.\n\n" +
      "## Track leading indicators\n" +
      "Track what you can control daily (habits), not only the final outcome.\n\n" +
      "- Check in daily\n" +
      "- Plan weekly\n" +
      "- Measure progress honestly\n\n" +
      "## Build an environment that makes progress easier\n" +
      "Remove friction: prepare workouts, pre-plan meals, block time, reduce distractions.\n\n" +
      "Keywords: motivation, discipline, consistency, progress tracking, habits\n",
  },
  "overcoming-procrastination": {
    title: "Overcoming Procrastination: A Plan You Can Follow",
    body:
      "Procrastination isn’t laziness—it’s usually fear, overwhelm, or unclear next steps.\n\n" +
      "## Make the next step tiny\n" +
      "Your brain avoids big tasks. Make the next action so small you can’t say no.\n\n" +
      "- Open the document\n" +
      "- Write one paragraph\n" +
      "- Walk for 5 minutes\n\n" +
      "## Use time-boxing\n" +
      "Set a 10–20 minute timer. When the timer ends, you can stop. This reduces resistance.\n\n" +
      "Keywords: procrastination, productivity, overwhelm, next step, momentum\n",
  },
  "accountability-strategies": {
    title: "Accountability Strategies That Don’t Feel Like Pressure",
    body:
      "Accountability works best when it’s supportive, not shame-based.\n\n" +
      "## Use daily check-ins\n" +
      "Daily check-ins create awareness and consistency.\n\n" +
      "## Use weekly reviews\n" +
      "Weekly reviews turn mistakes into improvements.\n\n" +
      "## Add a simple social layer\n" +
      "Tell a friend what you’re working on or share a weekly update.\n\n" +
      "Keywords: accountability, habit tracker, streak, weekly review, consistency\n",
  },
  "smart-goals-examples": {
    title: "SMART Goals Examples (Fitness, Career, Study, Money)",
    body:
      "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. Here are examples you can copy into Lifeplans.\n\n" +
      "## Fitness SMART goal example\n" +
      "Lose 3 kg in 6 weeks by doing 3 workouts per week and tracking daily check-ins.\n\n" +
      "## Career SMART goal example\n" +
      "Build a portfolio with 4 projects in 3 months by completing 1 project every 3 weeks.\n\n" +
      "## Study SMART goal example\n" +
      "Score 80%+ on a practice exam within 8 weeks by studying 45 minutes/day, 5 days/week.\n\n" +
      "## Money SMART goal example\n" +
      "Save $500 in 10 weeks by reducing spending and reviewing finances weekly.\n\n" +
      "Keywords: SMART goals examples, goal setting template, measurable goals\n",
  },
  "track-progress-like-a-pro": {
    title: "Track Progress Like a Pro: Metrics That Matter",
    body:
      "The right metrics make progress obvious. The wrong metrics create confusion.\n\n" +
      "## Use one primary metric\n" +
      "Choose one main progress number that best reflects success.\n\n" +
      "## Add leading indicators\n" +
      "Daily check-ins are leading indicators that predict outcomes.\n\n" +
      "Keywords: progress tracking, goal metrics, habit tracker, analytics\n",
  },
  "build-consistency": {
    title: "How to Build Consistency (Even With a Busy Schedule)",
    body:
      "Consistency comes from making the minimum version of the habit non-negotiable.\n\n" +
      "## Use the 2-minute rule\n" +
      "Start with a version of the habit that takes 2 minutes.\n\n" +
      "## Plan your week before it starts\n" +
      "Weekly planning is where consistency is created.\n\n" +
      "Keywords: consistency, busy schedule, habits, time management\n",
  },
  "reduce-distractions": {
    title: "Reduce Distractions: A Focus System for High Achievers",
    body:
      "Focus is a skill and a system. Reduce distractions and your goals become easier.\n\n" +
      "## Environment design\n" +
      "Make distractions harder to access and your goal tools easier to access.\n\n" +
      "## Use scheduled focus blocks\n" +
      "Time blocking prevents random tasks from stealing your day.\n\n" +
      "Keywords: focus, distractions, productivity, deep work, time blocking\n",
  },
  "weekly-review": {
    title: "Weekly Review: The Fastest Way to Improve Your Results",
    body:
      "A weekly review is where you turn experience into progress.\n\n" +
      "## Review the facts\n" +
      "What did you do? What did you skip? What worked?\n\n" +
      "## Adjust the plan\n" +
      "Update your weekly priorities based on what you learned.\n\n" +
      "Keywords: weekly review, planning, progress, reflection, improvement\n",
  },
  "morning-routine-for-goals": {
    title: "Morning Routine for Goals: Start Your Day With Momentum",
    body:
      "Your morning doesn’t need to be perfect—it needs to be consistent.\n\n" +
      "## A simple 10-minute routine\n" +
      "- Review today’s priorities\n" +
      "- Do one small action for your goal\n" +
      "- Complete your daily check-in\n\n" +
      "Keywords: morning routine, habits, consistency, productivity\n",
  },
};

const ArticleDetails = () => {
  const { slug } = useParams();
  const article = slug ? CONTENT[slug] : undefined;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
        <Link to="/articles" className="text-sm font-medium text-gray-500 hover:text-blue-600">
          Back to Articles
        </Link>

        {!article ? (
          <div className="text-gray-600">Article not found.</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
              <div className="space-y-3">{renderBody(article.body)}</div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ArticleDetails;
