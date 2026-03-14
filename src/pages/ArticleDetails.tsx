import React from "react";
import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";

const renderBody = (body: string): React.ReactElement[] => {
  const lines = body.split("\n");
  const out: React.ReactElement[] = [];
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
  "best-goal-planner-app-2024": {
    title: "Best Goal Planner App 2024: Complete Review and Comparison",
    body:
      "Choosing the right goal planner app can make or break your productivity. In 2024, several apps stand out for different needs.\n\n" +
      "## What makes a great goal planner app?\n" +
      "- Clear goal setting and tracking\n" +
      "- Progress visualization\n" +
      "- Mobile and web sync\n" +
      "- Reminders and accountability\n" +
      "- Affordable pricing\n\n" +
      "## Top contenders\n" +
      "1. **Goal Planner - Lifeplans**: Best for comprehensive goal management with strategy and planning features.\n" +
      "2. **App B**: Best for simple goal tracking.\n" +
      "3. **App C**: Best for team goals.\n\n" +
      "Keywords: goal planner app, productivity app, goal tracking, 2024 apps\n",
  },
  "top-goal-planner-apps-productivity": {
    title: "Top Goal Planner Apps to Boost Your Productivity",
    body:
      "Productivity isn't about doing more—it's about doing what matters. The right goal planner app helps you focus on high-impact activities.\n\n" +
      "## Features that drive productivity\n" +
      "- Priority-based goal setting\n" +
      "- Time tracking integration\n" +
      "- Progress analytics\n" +
      "- Habit stacking\n\n" +
      "## How to choose\n" +
      "Consider your workflow: Do you prefer daily check-ins or weekly reviews? Do you need team features or individual focus?\n\n" +
      "Keywords: productivity, goal planner, focus, time management\n",
  },
  "how-to-set-goals-beginners-guide": {
    title: "How to Set Goals: A Beginner's Guide to Success",
    body:
      "Setting goals for the first time can feel overwhelming. This guide breaks it down into simple, actionable steps.\n\n" +
      "## Start with your values\n" +
      "What matters most to you? Your goals should align with your personal values and long-term vision.\n\n" +
      "## Use the SMART framework\n" +
      "- **S**pecific: Clearly define what you want\n" +
      "- **M**easurable: How will you track progress?\n" +
      "- **A**chievable: Is this realistic?\n" +
      "- **R**elevant: Does this matter to you?\n" +
      "- **T**ime-bound: When will you achieve this?\n\n" +
      "## Write it down\n" +
      "Studies show that writing goals increases achievement likelihood by 42%. Use a journal or app like Lifeplans.\n\n" +
      "Keywords: goal setting, beginners, SMART goals, personal development\n",
  },
  "how-to-achieve-goals-consistently": {
    title: "How to Achieve Goals Consistently: Proven Strategies",
    body:
      "Consistent goal achievement isn't about motivation—it's about systems. Here's how to build them.\n\n" +
      "## 1. Create a weekly review ritual\n" +
      "Every Sunday, review progress, celebrate wins, and plan the week ahead.\n\n" +
      "## 2. Use implementation intentions\n" +
      "Instead of 'I will exercise more,' say 'I will exercise for 30 minutes at 7 AM on Monday, Wednesday, and Friday.'\n\n" +
      "## 3. Build accountability\n" +
      "Share goals with a friend or use an app with progress tracking.\n\n" +
      "## 4. Start ridiculously small\n" +
      "Want to write a book? Start with 100 words a day. Small wins build momentum.\n\n" +
      "Keywords: goal achievement, consistency, habits, accountability\n",
  },
  "how-to-set-targets-effectively": {
    title: "How to Set Targets That Drive Real Results",
    body:
      "Targets are the specific milestones that lead to goal achievement. Here's how to set them effectively.\n\n" +
      "## Targets vs Goals\n" +
      "- Goals are the destination\n" +
      "- Targets are the signposts along the way\n\n" +
      "## Set quarterly targets\n" +
      "Break annual goals into quarterly milestones. This creates urgency and makes progress measurable.\n\n" +
      "## Make targets visible\n" +
      "Display targets where you'll see them daily—on your desk, phone wallpaper, or bathroom mirror.\n\n" +
      "Keywords: targets, milestones, goal setting, quarterly planning\n",
  },
  "how-to-achieve-targets-easily": {
    title: "How to Achieve Targets Easily: Smart Approaches",
    body:
      "Achieving targets doesn't have to be complicated. These simple approaches make it easier.\n\n" +
      "## The 2-Minute Rule\n" +
      "If a target action takes less than 2 minutes, do it immediately.\n\n" +
      "## Batch Similar Tasks\n" +
      "Group similar target actions together to maintain focus and efficiency.\n\n" +
      "## Use Time Blocking\n" +
      "Schedule specific time blocks for target-related activities.\n\n" +
      "## Track Daily Progress\n" +
      "A simple yes/no check-in builds momentum and creates accountability.\n\n" +
      "Keywords: target achievement, productivity, time management, habits\n",
  },
  "how-to-gain-focus-deep-work": {
    title: "How to Gain Focus for Deep Work and Goal Achievement",
    body:
      "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that can be developed.\n\n" +
      "## Create a distraction-free environment\n" +
      "- Turn off notifications\n" +
      "- Use noise-cancelling headphones\n" +
      "- Close unnecessary tabs\n\n" +
      "## Time your focus sessions\n" +
      "Start with 25-minute Pomodoro sessions and gradually increase duration.\n\n" +
      "## Schedule deep work\n" +
      "Block specific times in your calendar for focused goal work.\n\n" +
      "Keywords: focus, deep work, concentration, productivity\n",
  },
  "goal-tracking-methods-that-work": {
    title: "Goal Tracking Methods That Actually Work",
    body:
      "Not all tracking methods are created equal. Here are the ones that actually drive progress.\n\n" +
      "## 1. Weekly Progress Percentage\n" +
      "Update your progress percentage weekly. This provides clear feedback without overwhelming detail.\n\n" +
      "## 2. Milestone Checkpoints\n" +
      "Break goals into 3-5 key milestones. Track completion of each.\n\n" +
      "## 3. Habit-Based Tracking\n" +
      "Track the habits that lead to goal achievement rather than the goal itself.\n\n" +
      "## 4. Visual Progress Boards\n" +
      "Use charts, graphs, or progress bars to visualize advancement.\n\n" +
      "Keywords: goal tracking, progress monitoring, milestones, habits\n",
  },
  "monthly-goal-setting-template": {
    title: "Monthly Goal Setting Template for Consistent Progress",
    body:
      "Use this template each month to set clear, achievable goals that build momentum.\n\n" +
      "## Monthly Review (Last month)\n" +
      "- What went well?\n" +
      "- What challenges did I face?\n" +
      "- What did I learn?\n\n" +
      "## This Month's Focus Areas\n" +
      "Choose 3-4 focus areas maximum.\n\n" +
      "## SMART Goals\n" +
      "Write 1-2 SMART goals for each focus area.\n\n" +
      "## Weekly Breakdown\n" +
      "Divide monthly goals into weekly actions.\n\n" +
      "## Success Metrics\n" +
      "Define how you'll measure success for each goal.\n\n" +
      "Keywords: monthly goals, goal template, planning, productivity\n",
  },
  "how-to-plan-your-goals-in-10-minutes": {
    title: "How to Plan Your Goals in 10 Minutes (A Simple Routine)",
    body:
      "If planning feels heavy, you don’t need a perfect system—you need a small repeatable ritual. This 10-minute routine helps you stay consistent without overthinking.\n\n" +
      "## 1) Pick 1–3 priorities for the week\n" +
      "Write only the outcomes that truly matter. In Goal Planner - Lifeplans, add them as weekly priorities.\n\n" +
      "## 2) Add 3–7 tasks you can actually start\n" +
      "Tasks should be small enough to begin in 15 minutes.\n\n" +
      "## 3) Decide the next action for each goal\n" +
      "If you can’t name the next action, the goal is still vague.\n\n" +
      "## 4) Update progress honestly\n" +
      "A truthful progress percentage is better than a motivational lie—it improves planning.\n\n" +
      "Keywords: weekly planning, goal planner app, weekly review\n",
  },
  "goal-setting-for-busy-people": {
    title: "Goal Setting for Busy People: The Minimum Effective Plan",
    body:
      "Busy schedules don’t require more motivation—they require smaller plans. The minimum effective plan is: one goal, one weekly priority, a few tasks, and a weekly review.\n\n" +
      "## Choose fewer goals\n" +
      "Start with 1–2 active goals.\n\n" +
      "## Plan your week in constraints\n" +
      "If you have 3 free hours, plan for 2. Leave buffer.\n\n" +
      "## Use Lifeplans as your weekly dashboard\n" +
      "Set the goal, add strategy (why/no), then keep weekly priorities small.\n\n" +
      "Keywords: goal setting for busy people, weekly planning, productivity\n",
  },
  "how-to-write-a-goal-strategy": {
    title: "How to Write a Goal Strategy (Why, Who, and No)",
    body:
      "A strategy is your ‘why’ plus your boundaries. When motivation drops, strategy keeps you moving.\n\n" +
      "## 1) Why does this goal matter?\n" +
      "Write one honest paragraph.\n\n" +
      "## 2) Who benefits if you succeed?\n" +
      "This creates meaning beyond the mood of the day.\n\n" +
      "## 3) What will you say no to?\n" +
      "Boundaries protect progress: distractions, overtime, scrolling.\n\n" +
      "In Lifeplans, use the Strategy section to store this so it’s visible during planning and reviews.\n\n" +
      "Keywords: goal strategy, motivation, boundaries, focus\n",
  },
  "weekly-planning-template-lifeplans": {
    title: "Weekly Planning Template You Can Copy Into Lifeplans",
    body:
      "Copy/paste template for a simple weekly plan.\n\n" +
      "## Weekly priorities (1–3)\n" +
      "- Priority 1:\n" +
      "- Priority 2:\n" +
      "- Priority 3:\n\n" +
      "## Tasks (3–7)\n" +
      "- Task A (15–45 min)\n" +
      "- Task B\n" +
      "- Task C\n\n" +
      "## Obstacles & counter-plan\n" +
      "- Obstacle: ____ → Counter-plan: ____\n\n" +
      "Use this inside Lifeplans Weekly Planning and keep the plan small enough to finish.\n\n" +
      "Keywords: weekly planning template, weekly goals, productivity\n",
  },
  "how-to-set-goals-without-burnout": {
    title: "How to Set Goals Without Burnout",
    body:
      "Burnout happens when you plan like a robot and live like a human. The fix is fewer priorities, more recovery, and shorter planning horizons.\n\n" +
      "## Use fewer weekly priorities\n" +
      "Pick 1–2 priorities if you’re already stressed.\n\n" +
      "## Track progress weekly, not obsessively\n" +
      "Weekly progress updates reduce anxiety and improve decisions.\n\n" +
      "## Build a fallback plan\n" +
      "Minimum actions keep the streak alive.\n\n" +
      "Keywords: burnout, sustainable goals, weekly planning\n",
  },
  "habit-goals-vs-outcome-goals": {
    title: "Habit Goals vs Outcome Goals: Which Should You Track?",
    body:
      "Outcome goals tell you what you want. Habit goals tell you what you’ll do. The best system uses both.\n\n" +
      "## Track outcomes weekly\n" +
      "Progress percentage or milestones.\n\n" +
      "## Track habits daily\n" +
      "Yes/no check-ins help consistency.\n\n" +
      "In Lifeplans, keep the goal outcome in Goals, and keep the habit-driven actions in Weekly Planning.\n\n" +
      "Keywords: habits vs goals, progress tracking\n",
  },
  "goal-setting-for-students": {
    title: "Goal Setting for Students: A Weekly Study System",
    body:
      "Students succeed when study becomes a weekly routine, not a last-minute sprint.\n\n" +
      "## Set one measurable outcome\n" +
      "Example: score 80%+ on a practice test in 6 weeks.\n\n" +
      "## Plan weekly sessions\n" +
      "Schedule 3–5 sessions and one review day.\n\n" +
      "## Track leading indicators\n" +
      "Hours studied, chapters completed, practice questions.\n\n" +
      "Keywords: study goals, weekly planning, exam preparation\n",
  },
  "goal-setting-for-career-growth": {
    title: "Goal Setting for Career Growth: A 12-Week Plan",
    body:
      "Career growth becomes easier when you plan it like a project. A 12-week plan is long enough for progress and short enough to stay focused.\n\n" +
      "## Pick one skill\n" +
      "Example: React, sales, writing, design.\n\n" +
      "## Set milestones\n" +
      "Portfolio project, certification module, interview practice.\n\n" +
      "## Execute weekly\n" +
      "Use Lifeplans weekly priorities and tasks to keep the plan realistic.\n\n" +
      "Keywords: career goals, 12 week year, weekly planning\n",
  },
  "how-to-set-financial-goals": {
    title: "How to Set Financial Goals That You’ll Actually Hit",
    body:
      "Financial goals work when you attach them to weekly actions.\n\n" +
      "## Make it measurable\n" +
      "Example: Save $500 in 10 weeks.\n\n" +
      "## Add weekly actions\n" +
      "Budget review on Sunday + automatic transfer.\n\n" +
      "## Track progress\n" +
      "Update the percentage weekly so you can adjust early.\n\n" +
      "Keywords: saving goals, budgeting, weekly review\n",
  },
  "how-to-recover-after-falling-off": {
    title: "How to Recover After Falling Off Your Goal Plan",
    body:
      "Falling off is normal. The only failure is not restarting.\n\n" +
      "## Step 1: Reduce scope\n" +
      "Make the plan smaller for one week.\n\n" +
      "## Step 2: Choose one next action\n" +
      "A single startable task rebuilds momentum.\n\n" +
      "## Step 3: Review weekly\n" +
      "Lifeplans works best when you adjust weekly based on real data.\n\n" +
      "Keywords: restart goals, consistency, weekly planning\n",
  },
  "goal-review-questions": {
    title: "Weekly Goal Review Questions (Use These Every Sunday)",
    body:
      "Use these questions in your weekly review to improve fast.\n\n" +
      "## Weekly review questions\n" +
      "- What did I complete?\n" +
      "- What did I avoid (and why)?\n" +
      "- What obstacle appeared most?\n" +
      "- What is the next best plan (smaller if needed)?\n\n" +
      "In Lifeplans, update your Weekly Planning and goal progress right after answering these.\n\n" +
      "Keywords: weekly review, reflection, planning\n",
  },
  "how-to-prioritize-goals": {
    title: "How to Prioritize Goals When Everything Feels Important",
    body:
      "If everything is important, nothing gets finished. Prioritization is choosing what to ignore this week.\n\n" +
      "## Use the 1–3 rule\n" +
      "Pick 1–3 priorities for the week maximum.\n\n" +
      "## Choose by impact\n" +
      "Ask: which goal improves everything else?\n\n" +
      "## Plan weekly, not yearly\n" +
      "Long plans become fantasy. Weekly planning stays real.\n\n" +
      "Keywords: prioritize goals, focus, weekly planning\n",
  },
  "goal-metrics-examples": {
    title: "Goal Metrics Examples: What to Measure (and What to Ignore)",
    body:
      "Good metrics create clarity. Bad metrics create stress.\n\n" +
      "## Fitness\n" +
      "Workouts/week, steps/day, sleep hours.\n\n" +
      "## Study\n" +
      "Practice questions, study sessions, mock test score.\n\n" +
      "## Business\n" +
      "Publishing cadence, outreach count, conversion rate.\n\n" +
      "Lifeplans is easiest when your goal has one primary metric and a weekly plan.\n\n" +
      "Keywords: goal metrics, progress tracking, targets\n",
  },
  "how-to-break-down-big-goals": {
    title: "How to Break Down Big Goals Into Weekly Targets",
    body:
      "Big goals become easy when you only focus on the next small target.\n\n" +
      "## Step 1: Define milestones\n" +
      "List 3–5 milestones.\n\n" +
      "## Step 2: Choose the next milestone\n" +
      "Ignore the rest for now.\n\n" +
      "## Step 3: Convert it to a weekly target\n" +
      "Then add tasks in Weekly Planning.\n\n" +
      "Keywords: break down goals, weekly targets, planning\n",
  },
  "how-to-build-discipline": {
    title: "How to Build Discipline (Without Relying on Motivation)",
    body:
      "Discipline is a system. If your system is good, your mood matters less.\n\n" +
      "## Reduce decisions\n" +
      "Plan weekly so daily choices are easier.\n\n" +
      "## Keep the plan small\n" +
      "Fewer tasks, higher completion rate.\n\n" +
      "## Review and adjust weekly\n" +
      "Use your weekly review to improve the system.\n\n" +
      "Keywords: discipline, consistency, weekly planning\n",
  },
  "goal-planning-checklist": {
    title: "Goal Planning Checklist: Set, Plan, Track, Review",
    body:
      "Use this checklist inside Goal Planner - Lifeplans.\n\n" +
      "## Checklist\n" +
      "- Define success (outcome + metric)\n" +
      "- Set timeframe (weeks/months)\n" +
      "- Write strategy (why/who/no)\n" +
      "- Plan weekly priorities + tasks\n" +
      "- Track progress weekly\n" +
      "- Review and adjust\n\n" +
      "Keywords: goal planning, checklist, goal planner app\n",
  },
  "how-to-plan-around-obstacles": {
    title: "How to Plan Around Obstacles (Time, Energy, Distractions)",
    body:
      "Obstacles are predictable. Planning for them is the difference between wishful thinking and a real strategy.\n\n" +
      "## Do a quick pre-mortem\n" +
      "Ask: what will stop me this week?\n\n" +
      "## Create a counter-plan\n" +
      "Obstacle: low energy → Counter: 10-minute minimum action.\n\n" +
      "## Store it in Lifeplans\n" +
      "Use Strategy/Planning fields so it stays visible.\n\n" +
      "Keywords: obstacles, planning, consistency\n",
  },
  "goal-setting-mistakes": {
    title: "10 Goal Setting Mistakes (and How to Fix Them)",
    body:
      "Most goals fail for simple reasons: too many goals, unclear next actions, and no weekly review.\n\n" +
      "## Top fixes\n" +
      "- Choose fewer goals\n" +
      "- Plan weekly actions\n" +
      "- Track progress honestly\n" +
      "- Review weekly and adjust\n\n" +
      "Goal Planner - Lifeplans is designed around these fixes: strategy + planning + progress.\n\n" +
      "Keywords: goal setting mistakes, consistency, planning\n",
  },
  "how-to-use-lifeplans-for-goals": {
    title: "How to Use Goal Planner - Lifeplans (Web + Mobile Workflow)",
    body:
      "A simple workflow that makes goals stick across web and mobile.\n\n" +
      "## Weekly rhythm\n" +
      "1) Plan the week (priorities + tasks)\n" +
      "2) Execute small tasks\n" +
      "3) Update goal progress %\n" +
      "4) Review and adjust\n\n" +
      "## Strategy keeps it meaningful\n" +
      "Write a short why/who/no so you don’t quit when it gets hard.\n\n" +
      "Keywords: goal planner, weekly planning, progress tracking\n",
  },
  "goal-setting-for-beginners-step-by-step": {
    title: "Goal Setting for Beginners: Step-by-Step (With Examples)",
    body:
      "If you’re new to goal setting, start simple: one goal, one timeframe, one plan.\n\n" +
      "## Step-by-step\n" +
      "1) Pick one outcome\n" +
      "2) Choose weeks or months\n" +
      "3) Add 1–3 weekly priorities\n" +
      "4) Track progress weekly\n\n" +
      "Use Lifeplans to keep the system in one place on web and mobile.\n\n" +
      "Keywords: beginner goals, goal planner app, weekly plan\n",
  },
  "how-to-set-goals-for-2026": {
    title: "How to Set Goals for 2026 (Quarterly + Weekly Plan)",
    body:
      "Your year improves when you plan in quarters and execute in weeks.\n\n" +
      "## Step 1: Choose 1–3 yearly themes\n" +
      "Health, career, learning, relationships.\n\n" +
      "## Step 2: Set a quarterly target\n" +
      "A 12-week goal is easier than a 12-month wish.\n\n" +
      "## Step 3: Plan weekly\n" +
      "Weekly priorities + tasks are where results happen.\n\n" +
      "Keywords: yearly goals, quarterly planning, weekly planning\n",
  },
  "how-to-set-goals-when-you-feel-lost": {
    title: "How to Set Goals When You Feel Lost",
    body:
      "When you feel lost, don’t commit to a huge plan. Commit to a small experiment.\n\n" +
      "## Use 2–4 week experiments\n" +
      "Example: try a routine, a course, or a project for one month.\n\n" +
      "## Track what you learn\n" +
      "Progress is clarity, not just results.\n\n" +
      "Lifeplans works well for experiments because you can set short timeframes and review weekly.\n\n" +
      "Keywords: unclear goals, experiment goals, motivation\n",
  },
  "how-to-stop-overplanning": {
    title: "How to Stop Overplanning and Start Doing",
    body:
      "Overplanning is often avoidance. The cure is smaller plans and immediate next actions.\n\n" +
      "## Use a 10-minute weekly plan\n" +
      "Pick priorities, add tasks, start.\n\n" +
      "## Make tasks startable\n" +
      "If you can’t start it today, it’s too big.\n\n" +
      "Keywords: overplanning, procrastination, weekly planning\n",
  },
  "goal-setting-for-adhd": {
    title: "Goal Setting for ADHD: Simple Systems That Work",
    body:
      "Goal setting for ADHD works best with low friction and high visibility.\n\n" +
      "## Make tasks tiny\n" +
      "10–20 minute tasks reduce resistance.\n\n" +
      "## Track progress weekly\n" +
      "Weekly updates prevent all-or-nothing thinking.\n\n" +
      "## Use one place for planning\n" +
      "Lifeplans combines goals, planning, and progress so you don’t lose the system.\n\n" +
      "Keywords: ADHD planning, focus, habits\n",
  },
  "goal-setting-for-anxiety": {
    title: "Goal Setting for Anxiety: Gentle Planning Without Pressure",
    body:
      "Anxiety-friendly planning is gentle and flexible. It focuses on small actions and realistic pacing.\n\n" +
      "## Choose minimum actions\n" +
      "A plan you can do on a hard day is the best plan.\n\n" +
      "## Keep the week small\n" +
      "One priority is enough.\n\n" +
      "Keywords: anxiety, gentle goals, consistency\n",
  },
  "how-to-set-goals-for-business": {
    title: "How to Set Goals for Business Growth (Without Chaos)",
    body:
      "Business goals succeed when you run them as weekly execution sprints.\n\n" +
      "## Set one outcome\n" +
      "Revenue, leads, launches—pick one.\n\n" +
      "## Define targets\n" +
      "Weekly outreach, publish cadence, sales calls.\n\n" +
      "## Review weekly\n" +
      "Use Lifeplans Weekly Planning + History to improve your system.\n\n" +
      "Keywords: business goals, targets, weekly planning\n",
  },
  "how-to-set-goals-for-content-creators": {
    title: "Goal Setting for Content Creators: Output + Process Targets",
    body:
      "Creators win by combining output targets (posts/week) with process targets (sessions/week).\n\n" +
      "## Example\n" +
      "Goal: publish 12 posts in 12 weeks.\n" +
      "Weekly plan: 3 writing sessions + 1 publish day.\n\n" +
      "Keywords: content goals, consistency, weekly planning\n",
  },
  "how-to-set-goals-for-learning": {
    title: "How to Set Goals for Learning (Languages, Skills, Courses)",
    body:
      "Learning goals work when you measure sessions, not feelings.\n\n" +
      "## Track leading indicators\n" +
      "Minutes practiced, lessons completed, conversations done.\n\n" +
      "## Plan weekly sessions\n" +
      "Put sessions on your calendar, then track progress weekly in Lifeplans.\n\n" +
      "Keywords: learning goals, language learning, weekly plan\n",
  },
  "how-to-create-a-goal-roadmap": {
    title: "How to Create a Goal Roadmap (Milestones + Weekly Targets)",
    body:
      "Roadmaps make big goals feel safe and structured.\n\n" +
      "## Roadmap steps\n" +
      "1) Milestones (3–5)\n" +
      "2) Next milestone\n" +
      "3) Weekly targets\n" +
      "4) Tasks\n\n" +
      "Keywords: goal roadmap, milestones, targets\n",
  },
  "how-to-set-goals-with-a-full-time-job": {
    title: "How to Set Goals With a Full-Time Job (Realistic Weekly Planning)",
    body:
      "With a full-time job, the plan must be smaller than your ambition.\n\n" +
      "## Use fewer priorities\n" +
      "One priority can be enough for a busy week.\n\n" +
      "## Build a weekly rhythm\n" +
      "Plan once, execute small tasks, review weekly.\n\n" +
      "Keywords: busy schedule, weekly planning, productivity\n",
  },
  "how-to-make-goal-progress-visible": {
    title: "How to Make Goal Progress Visible (So You Don’t Quit)",
    body:
      "When progress is invisible, motivation collapses. Make it visible and you’ll keep going.\n\n" +
      "## Use one progress metric\n" +
      "A simple percentage updated weekly is enough.\n\n" +
      "## Keep weekly history\n" +
      "Your weekly plans become proof of progress.\n\n" +
      "Keywords: progress tracking, motivation, goal planner\n",
  },
  "daily-planner-app": {
    title: "Daily Planner App: A Simple System to Plan Your Day (and Stick to It)",
    body:
      "A daily planner app should do one thing: help you decide what matters today and actually do it. The goal isn’t to plan more—it’s to take action with less friction.\n\n" +
      "In this guide, you’ll learn a simple daily planning routine you can use inside Goal Planner - Lifeplans (web + mobile). It’s designed for busy schedules and real life: you plan quickly, you stay organized, and you track progress without overwhelm.\n\n" +
      "## 1) Start with 1–3 daily priorities\n" +
      "If everything is important, nothing gets finished. Choose 1–3 priorities for the day. These are outcomes, not a long wish list.\n\n" +
      "Examples:\n" +
      "- Write 500 words\n" +
      "- 30-minute workout\n" +
      "- Review weekly plan and schedule tomorrow\n\n" +
      "## 2) Convert priorities into startable tasks\n" +
      "A good daily task is small enough to start in 2 minutes. Big tasks create procrastination.\n\n" +
      "Bad: ‘Work on project’\n" +
      "Good: ‘Open doc + outline 3 bullets’, ‘Send 1 email’, ‘Do 10 minutes’\n\n" +
      "## 3) Use time blocking for focus\n" +
      "Time blocking is the fastest way to protect focus. Put at least one focus block on your calendar for the most important task.\n\n" +
      "## 4) Track progress (daily + weekly)\n" +
      "Tracking is not pressure—it’s feedback. When you see progress, motivation becomes easier. In Lifeplans, you can track goal progress weekly and keep a daily planner list for execution.\n\n" +
      "## 5) Keep it sustainable (consistency wins)\n" +
      "Consistency beats intensity. If you can only do a small version today, do that. A system you can repeat every day beats a perfect plan you quit.\n\n" +
      "## A simple template you can copy\n" +
      "- Top priority:\n" +
      "- Task 1 (15–45 min):\n" +
      "- Task 2 (5–20 min):\n" +
      "- Task 3 (optional):\n" +
      "- Notes (1 sentence):\n\n" +
      "## Keywords\n" +
      "daily planner app, daily planning, stay organized, focus, time management, time blocking, track progress\n",
  },
  "daily-journal-app": {
    title: "Daily Journal App: The 5-Minute Habit That Improves Consistency",
    body:
      "A daily journal doesn’t need to be long. A 5-minute daily journal habit is enough to improve consistency, mindset, and progress—because it helps you notice patterns and make better decisions.\n\n" +
      "This guide shows a simple daily journal routine you can use alongside your Daily Planner tasks in Goal Planner - Lifeplans.\n\n" +
      "## 1) Keep your daily journal short\n" +
      "If journaling takes 20 minutes, you’ll stop. Keep it short and repeatable.\n\n" +
      "## 2) Use prompts that support action\n" +
      "Here are 3 prompts that work:\n" +
      "- What did I do today that moved my goal forward?\n" +
      "- What got in the way (time, energy, distractions)?\n" +
      "- What is the next smallest action for tomorrow?\n\n" +
      "## 3) Link journaling to your daily routine\n" +
      "Attach journaling to an existing habit: after coffee, after dinner, or before bed. This makes it automatic.\n\n" +
      "## 4) Use journaling to build a growth mindset\n" +
      "A growth mindset is the ability to learn from what happened, not judge yourself for it. Journaling turns ‘failure’ into feedback.\n\n" +
      "## 5) Combine journal + planner\n" +
      "The best system is both: plan the tasks, then reflect briefly. Planning helps you take action; journaling helps you improve the system.\n\n" +
      "## Keywords\n" +
      "daily journal app, daily journal, daily routine, mindset, growth mindset, consistency, motivation, self improvement\n",
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
