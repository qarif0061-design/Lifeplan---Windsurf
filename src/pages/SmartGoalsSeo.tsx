import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicPageLayout from "@/components/PublicPageLayout";
import Seo from "@/components/Seo";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { ARTICLE_AUTHOR, ARTICLE_DATES, SITE_URL, getArticleTitle } from "@/seo/articleIndex";
import { SMART_GOALS_HUB } from "@/seo/smartGoalsHub";

const PAGE_PATH = "/smart-goals";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const TITLE = "SMART Goals: Meaning, Examples & Free Template (2026)";
const DESCRIPTION =
  "What are SMART goals? Learn what Specific, Measurable, Achievable, Relevant and Time-bound mean, how to write one in 5 steps, and copy 20 SMART goal examples plus a free template.";
const PUBLISHED = "2026-10-24";

const LETTERS = [
  {
    letter: "S",
    name: "Specific",
    question: "What exactly do I want to achieve, and who is involved?",
    text: "A specific goal names one clear result. \"Get fit\" could mean a hundred things; \"run a 5 km race without stopping\" means one. If two people could read your goal and picture different outcomes, it is not specific yet. Name the action, the result and, where it matters, the people or resources involved.",
    weak: "Improve my writing.",
    strong: "Publish one 1,000-word blog post every week.",
  },
  {
    letter: "M",
    name: "Measurable",
    question: "How will I know, with a number or a clear yes/no, that I am done?",
    text: "Measurable means you can track progress and recognise the finish line. Use a number (revenue, kilograms, pages, hours), a percentage, a count of completed items, or a clear yes/no milestone such as \"certificate received\". Decide how and how often you will check it, because a metric you never look at does not help.",
    weak: "Read more books.",
    strong: "Read 12 books this year, logging each one when I finish it.",
  },
  {
    letter: "A",
    name: "Achievable",
    question: "Can I realistically do this with the time, money and skills I have?",
    text: "An achievable goal stretches you without being fantasy. Look at your recent track record: if you have saved $50 a month so far, jumping to $2,000 a month is unlikely. Check your constraints (time, budget, skills, other commitments) and list what you would need to learn or change. Ambitious is good; impossible kills motivation by week three.",
    weak: "Become fluent in Japanese in one month.",
    strong: "Finish the first 30 lessons of a beginner Japanese course in 3 months.",
  },
  {
    letter: "R",
    name: "Relevant",
    question: "Why does this matter to me, and does it fit my bigger priorities now?",
    text: "Relevant (sometimes written as Realistic) asks whether the goal is worth doing at all. A relevant goal connects to something bigger: your career direction, your team's objectives, your health or your family. If you cannot explain in one sentence why the goal matters, it will be the first thing you drop when life gets busy.",
    weak: "Learn to code because everyone is doing it.",
    strong: "Learn SQL so I can build my own sales reports and apply for analyst roles.",
  },
  {
    letter: "T",
    name: "Time-bound",
    question: "When will this be finished, and what are the checkpoints?",
    text: "A deadline turns \"someday\" into a plan. Pick a target date and, for anything longer than a month, add checkpoints along the way (weekly or monthly). Deadlines create healthy urgency and give you natural moments to review whether the plan is working.",
    weak: "Save for a holiday.",
    strong: "Save $1,800 for a holiday by 30 June by setting aside $300 a month.",
  },
];

const STEPS = [
  {
    title: "Start with the outcome you actually want",
    text: "Write your goal in plain words first, even if it is vague: \"I want to get healthier\" or \"I want a better job\". Then ask \"what would that look like if it were true?\" until you reach one concrete result, such as \"lower my resting heart rate\" or \"land a data analyst role\".",
  },
  {
    title: "Add a number and a way to track it",
    text: "Choose the metric that best shows progress: a count, an amount, a percentage or a clear milestone. Write down where you are today (your baseline) so you can see change. For skills or habits, track the inputs you control, such as \"practice 30 minutes, 5 days a week\".",
  },
  {
    title: "Reality-check it",
    text: "Look at your calendar and budget. How many hours a week can you honestly give this goal? What could get in the way? If the goal needs more than you have, shrink the scope or extend the deadline rather than hoping for willpower.",
  },
  {
    title: "Write down why it matters",
    text: "One sentence is enough: \"so that I can...\". This is the line you will reread on the days motivation is low. If you are setting goals at work, connect it to a team or company objective.",
  },
  {
    title: "Set the deadline and the checkpoints",
    text: "Give the goal an end date, then break it into monthly milestones and a few weekly actions. A 90-day goal might have three monthly milestones and two or three actions you repeat every week. Put the first action on your calendar today.",
  },
];

type Example = { area: string; goal: string; why: string };

const EXAMPLES: { heading: string; items: Example[] }[] = [
  {
    heading: "SMART goals for work",
    items: [
      { area: "Sales", goal: "Increase my monthly closed deals from 8 to 12 by 31 March by adding 10 extra prospecting calls per week and reviewing my pipeline every Friday.", why: "Specific metric, clear baseline, weekly action and a deadline." },
      { area: "Project management", goal: "Deliver the new client onboarding portal by 15 August, within the approved $40,000 budget, with weekly status updates to stakeholders every Monday.", why: "Defines scope, budget, deadline and how progress is communicated." },
      { area: "Customer service", goal: "Raise my customer satisfaction score from 82% to 90% by the end of Q2 by using the new call checklist on every call and reviewing two recorded calls with my lead each week.", why: "Measurable target with the specific behaviour that drives it." },
      { area: "Leadership", goal: "Hold a 30-minute one-to-one with each of my 6 direct reports every two weeks for the next 6 months, and record one action item from each meeting.", why: "Turns \"be a better manager\" into a trackable routine." },
      { area: "Professional development", goal: "Pass the PMP exam by 30 November by studying 6 hours a week and completing 4 full practice exams with a score of 75% or higher.", why: "Clear finish line plus leading indicators along the way." },
    ],
  },
  {
    heading: "SMART goals for students",
    items: [
      { area: "Grades", goal: "Raise my maths grade from a C to a B by the end of this semester by completing every homework set and attending the Thursday tutoring session each week.", why: "Specific subject, measurable grade, realistic actions." },
      { area: "Study habits", goal: "Study for 45 focused minutes, 5 days a week, using the Pomodoro method, and log each session in my planner for the next 8 weeks.", why: "Controls the input (study time) rather than hoping for results." },
      { area: "Applications", goal: "Submit applications to 6 universities by 15 January, finishing one personal statement draft per week from 1 November.", why: "Breaks a stressful deadline into weekly milestones." },
      { area: "Reading", goal: "Read 20 pages of a non-fiction book every weekday evening for 10 weeks, finishing at least 4 books.", why: "Small daily target that adds up to a meaningful result." },
    ],
  },
  {
    heading: "SMART goals for health and fitness",
    items: [
      { area: "Running", goal: "Run a 5 km race without walking by 1 May by following a 9-week beginner plan with three runs a week (Monday, Wednesday, Saturday).", why: "One clear outcome, a proven plan and fixed training days." },
      { area: "Nutrition", goal: "Eat at least 4 servings of vegetables on 6 days each week for the next 8 weeks, tracked with a simple check box in my planner.", why: "Specific and measurable without extreme dieting." },
      { area: "Sleep", goal: "Be in bed with screens off by 10:45 pm on at least 5 nights a week for the next 30 days to average 7.5 hours of sleep.", why: "A behaviour you control, with a measurable result." },
      { area: "Mental health", goal: "Practise a 10-minute guided breathing or meditation session every morning for 6 weeks and rate my stress from 1 to 10 each Sunday.", why: "Builds a habit and gives you data to see if it helps." },
    ],
  },
  {
    heading: "SMART goals for money and finance",
    items: [
      { area: "Emergency fund", goal: "Save $3,000 for an emergency fund by 31 December by automatically transferring $250 on the 1st of every month.", why: "Exact amount, automatic action, clear deadline." },
      { area: "Debt", goal: "Pay off my $2,400 credit card balance in 8 months by paying $300 a month and not adding new charges to that card.", why: "The maths is done up front, so the goal is realistic." },
      { area: "Spending", goal: "Cut takeaway and food delivery spending from $320 to $150 a month for the next 3 months by meal-prepping lunches every Sunday.", why: "Baseline, target and the habit that makes it possible." },
    ],
  },
  {
    heading: "SMART goals for personal growth",
    items: [
      { area: "Language", goal: "Hold a 10-minute conversation in Spanish with a native speaker by 30 September by practising 20 minutes daily and booking one online lesson each week.", why: "A real-world test of the skill rather than a vague \"learn Spanish\"." },
      { area: "Relationships", goal: "Call or meet one close friend or family member every week for the next 3 months, scheduling it every Sunday evening.", why: "Turns a value (staying connected) into a weekly action." },
      { area: "Habits", goal: "Reduce social media use from 3 hours to under 1 hour a day for 30 days using app time limits, checking the weekly screen-time report every Sunday.", why: "Measured automatically, with a clear target." },
      { area: "Side project", goal: "Launch a simple portfolio website with 5 finished projects by 31 July, working on it for 4 hours every Saturday morning.", why: "Defined deliverable, fixed time slot, deadline." },
    ],
  },
];

const MISTAKES = [
  { title: "Writing a wish instead of a goal", text: "\"Be happier\" or \"grow the business\" are directions, not goals. Keep asking \"how would I measure that?\" until a number or a clear milestone appears." },
  { title: "Measuring the wrong thing", text: "Some outcomes are not fully in your control (a promotion, a race time, a sale). Pair the outcome with an input you do control, such as hours practised or calls made, so you can still make progress on bad weeks." },
  { title: "Setting too many SMART goals at once", text: "Five big goals in one quarter usually means none get finished. Pick one to three, and park the rest on a \"later\" list." },
  { title: "No checkpoints between today and the deadline", text: "A 12-month goal with nothing in between is easy to ignore until month eleven. Add monthly milestones and a weekly review." },
  { title: "Making it unrealistic to look ambitious", text: "An achievable stretch is motivating; an impossible target is discouraging. Base the target on your recent results plus a sensible step up." },
  { title: "Never revisiting the goal", text: "SMART goals are not set in stone. If your situation changes, adjust the target or the date on purpose rather than quietly abandoning it." },
];

const FAQS = [
  { q: "What does SMART stand for in SMART goals?", a: "SMART stands for Specific, Measurable, Achievable, Relevant and Time-bound. Some versions use Attainable instead of Achievable, Realistic instead of Relevant, or Time-based / Timely instead of Time-bound, but the idea is the same: a goal should be clear, trackable, realistic, worthwhile and have a deadline." },
  { q: "Who created SMART goals?", a: "The SMART acronym was first published by George T. Doran in the November 1981 issue of Management Review, in an article titled \"There's a S.M.A.R.T. way to write management's goals and objectives\". His original letters were Specific, Measurable, Assignable, Realistic and Time-related. The framework later spread widely and the letters evolved into the version most people use today." },
  { q: "What is an example of a SMART goal?", a: "\"Save $3,000 for an emergency fund by 31 December by transferring $250 on the 1st of every month.\" It is specific (an emergency fund), measurable ($3,000), achievable ($250 a month), relevant (financial security) and time-bound (31 December)." },
  { q: "What is the difference between SMART and SMARTER goals?", a: "SMARTER goals add two extra steps to the SMART criteria, most commonly Evaluate and Review (or Readjust). The extra letters remind you to check progress regularly and adjust the plan, which is helpful for long or complex goals." },
  { q: "Are SMART goals still useful in 2026?", a: "Yes. SMART goals remain one of the most widely used goal-setting frameworks in workplaces, schools and coaching because they turn vague intentions into a plan you can track. They work best when combined with a weekly review and small daily actions." },
  { q: "How many SMART goals should I set at once?", a: "For most people, one to three active goals at a time works best. Fewer goals mean more focus, and you can add the next goal once one is finished or running on autopilot as a habit." },
  { q: "What is a SMART goal template?", a: "A simple template is: \"I will [specific result] measured by [metric] by [date], by doing [weekly actions], because [why it matters].\" Fill in each bracket and you have a goal that meets all five SMART criteria." },
];

const SmartGoalsSeo = () => {
  const { openAuthModal } = useAuthModal();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      mainEntityOfPage: PAGE_URL,
      url: PAGE_URL,
      datePublished: PUBLISHED,
      dateModified: ARTICLE_DATES.updated > PUBLISHED ? ARTICLE_DATES.updated : PUBLISHED,
      author: { "@type": "Organization", name: ARTICLE_AUTHOR.name, url: ARTICLE_AUTHOR.url },
      publisher: {
        "@type": "Organization",
        name: "Lifeplans",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/lifeplans_og_social_image.png` },
      },
      image: `${SITE_URL}/brand/lifeplans_og_social_image.png`,
      about: { "@type": "Thing", name: "SMART goals" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "SMART Goals", item: PAGE_URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const card = "rounded-[2rem] border border-border bg-card p-7 shadow-sm";
  const h2 = "text-2xl sm:text-3xl font-display font-bold text-foreground";
  const p = "text-foreground/80 leading-relaxed";
  let n = 0;

  return (
    <PublicPageLayout>
      <Seo title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} jsonLd={jsonLd} />

      <article className="space-y-12 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
          <span className="text-foreground">SMART Goals</span>
        </nav>

        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground">
            SMART Goals: Meaning, Examples and a Free Template
          </h1>
          <p className="text-sm text-muted-foreground">
            By <Link to="/about#editorial-team" className="underline">{ARTICLE_AUTHOR.name}</Link>
            {" | "}Published <time dateTime={PUBLISHED}>24 October 2026</time>
            {" | "}Updated <time dateTime={ARTICLE_DATES.updated}>{ARTICLE_DATES.updated}</time>
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            <strong>SMART goals</strong> are goals that are <strong>Specific, Measurable, Achievable, Relevant and
            Time-bound</strong>. The five criteria turn a vague wish like "get in shape" into a clear plan such as
            "run a 5 km race without walking by 1 May, training three times a week". This guide explains what each
            letter means, where the method came from, how to write your own SMART goal in five steps, and gives you a
            copy-and-paste template plus 20 real SMART goal examples for work, school, health, money and personal life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Create a SMART goal in Lifeplans (free)
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="#smart-goal-examples">Jump to the examples</a>
            </Button>
          </div>
        </header>

        <nav aria-label="Contents" className={card}>
          <h2 className="text-lg font-semibold text-foreground mb-3">On this page</h2>
          <ol className="list-decimal pl-6 space-y-1 text-foreground/80">
            <li><a className="hover:text-primary underline" href="#what-are-smart-goals">What are SMART goals?</a></li>
            <li><a className="hover:text-primary underline" href="#smart-meaning">What SMART stands for (each letter explained)</a></li>
            <li><a className="hover:text-primary underline" href="#history">Where SMART goals came from</a></li>
            <li><a className="hover:text-primary underline" href="#smart-vs-smarter">SMART vs SMARTER goals</a></li>
            <li><a className="hover:text-primary underline" href="#how-to-write">How to write a SMART goal in 5 steps</a></li>
            <li><a className="hover:text-primary underline" href="#template">Free SMART goal template</a></li>
            <li><a className="hover:text-primary underline" href="#smart-goal-examples">20 SMART goal examples</a></li>
            <li><a className="hover:text-primary underline" href="#mistakes">Common mistakes</a></li>
            <li><a className="hover:text-primary underline" href="#guides">SMART goals by role and topic</a></li>
            <li><a className="hover:text-primary underline" href="#faq">FAQ</a></li>
          </ol>
        </nav>

        <section id="what-are-smart-goals" className="space-y-4">
          <h2 className={h2}>What are SMART goals?</h2>
          <p className={p}>
            A SMART goal is a goal written so that anyone could read it and know exactly what success looks like, how
            it will be measured and when it is due. The acronym is a checklist: if your goal passes all five tests, it
            is much more likely to be finished than a goal that only describes a feeling or a direction.
          </p>
          <p className={p}>
            Most goals fail not because people are lazy, but because the goal was never clear enough to act on. "Be
            more productive" gives you nothing to do on Monday morning. "Finish the quarterly report two days before
            the deadline by blocking 9-11 am every Tuesday and Thursday" tells you exactly what to do and when. That
            gap between intention and action is what the SMART framework closes.
          </p>
          <p className={p}>
            SMART goals are used by managers writing performance objectives, teachers and students setting academic
            targets, therapists and coaches planning behaviour change, and individuals working on fitness, money or
            personal projects. The method is simple enough to learn in five minutes, and it works for a one-week goal
            as well as a five-year plan.
          </p>
        </section>

        <section id="smart-meaning" className="space-y-5">
          <h2 className={h2}>What SMART stands for: each letter explained</h2>
          <p className={p}>
            Each letter is a question you ask about your goal. Below you will find what it means, the question to ask
            yourself and a weak versus strong version so you can see the difference.
          </p>
          <div className="space-y-5">
            {LETTERS.map((l) => (
              <div key={l.letter} className={card}>
                <h3 className="text-xl font-display font-bold text-foreground">
                  <span className="text-primary">{l.letter}</span> = {l.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Ask yourself: {l.question}</p>
                <p className={`mt-3 ${p}`}>{l.text}</p>
                <p className="mt-3 text-foreground/80">
                  <strong>Weak:</strong> "{l.weak}"<br />
                  <strong>Better:</strong> "{l.strong}"
                </p>
              </div>
            ))}
          </div>
          <p className={p}>
            You will also see variations of the letters: <strong>A</strong> for Attainable, Agreed or Assignable,{" "}
            <strong>R</strong> for Realistic or Resourced, and <strong>T</strong> for Time-based, Timely or Trackable.
            They all point at the same idea. Use whichever version your school or workplace uses, and focus on whether
            the goal is clear and trackable rather than on the exact words.
          </p>
        </section>

        <section id="history" className="space-y-4">
          <h2 className={h2}>Where SMART goals came from: George Doran, 1981</h2>
          <p className={p}>
            The SMART acronym was first published by consultant <strong>George T. Doran</strong> in the November 1981
            issue of <em>Management Review</em>, in a short article titled "There's a S.M.A.R.T. way to write
            management's goals and objectives". Doran wanted managers to stop writing fuzzy objectives and suggested
            that a good objective should be <strong>Specific, Measurable, Assignable</strong> (it says who will do it),{" "}
            <strong>Realistic and Time-related</strong>.
          </p>
          <p className={p}>
            Doran also noted that not every objective needs all five criteria; the acronym was meant as a helpful
            guide, not a rigid rule. Over the following decades the idea spread from management into education,
            healthcare, coaching and personal development, and "Assignable" was gradually replaced by "Achievable" or
            "Attainable" as the framework was used by individuals rather than only by managers. Read more in our guides
            to <Link className="underline hover:text-primary" to="/articles/doran-smart-goals">Doran's original SMART goals</Link>{" "}
            and <Link className="underline hover:text-primary" to="/articles/doran-1981-smart-goals">the 1981 article</Link>.
          </p>
        </section>

        <section id="smart-vs-smarter" className="space-y-4">
          <h2 className={h2}>SMART vs SMARTER goals</h2>
          <p className={p}>
            <strong>SMARTER</strong> goals add two letters to the end of the acronym. The most common version is{" "}
            <strong>E = Evaluate</strong> and <strong>R = Review</strong> (or Readjust): you schedule regular check-ins
            to look at progress and adjust the plan. Author Michael Hyatt popularised a different version where the
            letters stand for Specific, Measurable, Actionable, Risky, Time-keyed, Exciting and Relevant, with an
            emphasis on goals that stretch and motivate you.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border border-border rounded-xl">
              <thead className="bg-muted/50">
                <tr><th className="p-3">Framework</th><th className="p-3">Letters</th><th className="p-3">Best for</th></tr>
              </thead>
              <tbody className="text-foreground/80">
                <tr className="border-t border-border"><td className="p-3 font-medium">SMART</td><td className="p-3">Specific, Measurable, Achievable, Relevant, Time-bound</td><td className="p-3">Most personal, school and work goals</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-medium">SMARTER</td><td className="p-3">SMART + Evaluate, Review/Readjust</td><td className="p-3">Long or complex goals that need regular check-ins</td></tr>
                <tr className="border-t border-border"><td className="p-3 font-medium">SMARTER (Hyatt)</td><td className="p-3">Specific, Measurable, Actionable, Risky, Time-keyed, Exciting, Relevant</td><td className="p-3">Ambitious personal goals where motivation matters</td></tr>
              </tbody>
            </table>
          </div>
          <p className={p}>
            In practice, the "ER" step is what makes SMART goals work over months: a short weekly review where you ask
            what moved, what got stuck and what you will do next week. See our guide to{" "}
            <Link className="underline hover:text-primary" to="/articles/smarter-goals-michael-hyatt">Michael Hyatt's SMARTER goals</Link>{" "}
            for the full method.
          </p>
        </section>

        <section id="how-to-write" className="space-y-5">
          <h2 className={h2}>How to write a SMART goal in 5 steps</h2>
          <p className={p}>
            You do not need to get it perfect on the first try. Start rough and sharpen it with these five steps,
            which follow the order of the acronym.
          </p>
          <ol className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className={card}>
                <h3 className="text-lg font-display font-bold text-foreground">Step {i + 1}: {s.title}</h3>
                <p className={`mt-2 ${p}`}>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className={card}>
            <h3 className="text-lg font-display font-bold text-foreground">Worked example: from vague to SMART</h3>
            <ul className="mt-3 space-y-2 text-foreground/80 list-disc pl-6">
              <li><strong>Vague:</strong> "I want to get better at public speaking."</li>
              <li><strong>Specific:</strong> "Give a confident presentation at the quarterly team meeting."</li>
              <li><strong>Measurable:</strong> "...a 10-minute presentation, rated 4/5 or higher in the feedback form."</li>
              <li><strong>Achievable:</strong> "...after practising with a speaking club twice a month."</li>
              <li><strong>Relevant:</strong> "...because presenting well is a requirement for the team lead role I want."</li>
              <li><strong>Time-bound:</strong> "...at the 15 March meeting."</li>
            </ul>
            <p className="mt-3 text-foreground/80">
              <strong>Final SMART goal:</strong> "Deliver a 10-minute presentation at the 15 March team meeting and
              score 4/5 or higher on the feedback form, after practising at a speaking club twice a month, so I am ready
              to apply for the team lead role."
            </p>
          </div>
        </section>

        <section id="template" className="space-y-4">
          <h2 className={h2}>Free SMART goal template</h2>
          <p className={p}>Copy this one-line template into your notes, planner or the Lifeplans app and fill in the brackets:</p>
          <div className="rounded-[2rem] border border-primary/30 bg-primary/5 p-7">
            <p className="font-mono text-foreground">
              I will [specific result] measured by [metric] by [date], by doing [weekly actions], because [why it matters].
            </p>
          </div>
          <p className={p}>For bigger goals, use the longer worksheet version:</p>
          <div className={card}>
            <ul className="space-y-2 text-foreground/80">
              <li><strong>Goal (one sentence):</strong> ____________________</li>
              <li><strong>Specific:</strong> What exactly will be done? Who is involved? ____________________</li>
              <li><strong>Measurable:</strong> Metric, starting point and target: ____________________</li>
              <li><strong>Achievable:</strong> Time and resources I have, obstacles and how I will handle them: ____________________</li>
              <li><strong>Relevant:</strong> Why this matters now: ____________________</li>
              <li><strong>Time-bound:</strong> Deadline and monthly milestones: ____________________</li>
              <li><strong>Weekly actions:</strong> 1-3 things I will do every week: ____________________</li>
              <li><strong>Review:</strong> When I will check progress (e.g. every Sunday): ____________________</li>
            </ul>
          </div>
          <p className={p}>
            Want more formats, including a table version? See our{" "}
            <Link className="underline hover:text-primary" to="/articles/smart-goals-template-and-examples-2026">SMART goals template and examples</Link>{" "}
            and the{" "}
            <Link className="underline hover:text-primary" to="/articles/smart-goals-table-example">SMART goals table example</Link>.
          </p>
        </section>

        <section id="smart-goal-examples" className="space-y-6">
          <h2 className={h2}>20 SMART goal examples</h2>
          <p className={p}>
            Each example below meets all five criteria. Use them as a starting point and change the numbers and dates
            to fit your situation; a goal only works if it is realistic for you.
          </p>
          {EXAMPLES.map((group) => (
            <div key={group.heading} className="space-y-3">
              <h3 className="text-xl font-display font-bold text-foreground">{group.heading}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {group.items.map((ex) => {
                  n += 1;
                  return (
                    <div key={ex.goal} className={card}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Example {n}: {ex.area}
                      </p>
                      <p className="mt-2 text-foreground">"{ex.goal}"</p>
                      <p className="mt-2 text-sm text-muted-foreground">Why it works: {ex.why}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <p className={p}>
            For side-by-side comparisons of weak and strong goals, see{" "}
            <Link className="underline hover:text-primary" to="/articles/examples-of-smart-goals-and-not-smart-goals">examples of SMART goals and not SMART goals</Link>.
          </p>
        </section>

        <section id="mistakes" className="space-y-4">
          <h2 className={h2}>Common SMART goal mistakes (and how to fix them)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {MISTAKES.map((m) => (
              <div key={m.title} className={card}>
                <h3 className="font-bold text-foreground">{m.title}</h3>
                <p className={`mt-2 ${p}`}>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className={h2}>How to actually achieve your SMART goal</h2>
          <p className={p}>
            Writing the goal is the easy part. What makes the difference is the system around it. Break the goal into
            monthly milestones, choose one to three priorities each week, and turn each priority into small tasks you
            can start in under five minutes. Put those tasks on your calendar, because tasks without a time slot tend
            to slide.
          </p>
          <p className={p}>
            Then hold a 15-minute weekly review: look at your metric, note what worked and what did not, and set next
            week's actions. If you fall behind, adjust the plan or the deadline on purpose instead of quietly giving
            up. This review habit is the "Evaluate and Review" part of SMARTER goals, and it is the single biggest
            predictor of whether a goal gets finished.
          </p>
        </section>

        <section id="guides" className="space-y-6">
          <h2 className={h2}>SMART goals by role and topic</h2>
          <p className={p}>
            Looking for goals for a specific job, course or life area? Our editorial team has written focused guides
            with examples for each of these.
          </p>
          {SMART_GOALS_HUB.map((group) => (
            <div key={group.id} className="space-y-2">
              <h3 className="text-lg font-display font-bold text-foreground">{group.label}</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link to={`/articles/${slug}`} className="text-foreground/80 hover:text-primary underline-offset-2 hover:underline">
                      {(getArticleTitle(slug) || slug.replace(/-/g, " ")).replace(/\s*\(2026\)/, "").split(/\s+[-\u2013\u2014|]\s+/)[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="faq" className="space-y-4">
          <h2 className={h2}>SMART goals FAQ</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className={card}>
                <h3 className="font-bold text-foreground">{f.q}</h3>
                <p className={`mt-2 ${p}`}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-primary/20 bg-primary/10 p-7 shadow-sm space-y-4">
          <h2 className={h2}>Turn your SMART goal into a weekly plan</h2>
          <p className={p}>
            Lifeplans is a free goal planner app that helps you write SMART goals, break them into milestones and
            weekly priorities, plan your day and review your progress every week, all in one place. Create your first
            goal in a couple of minutes and see how much easier it is to follow through.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90" onClick={() => openAuthModal({ intent: "signup" })}>
              Start free with Lifeplans
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/download">Download the app</Link>
            </Button>
          </div>
        </section>

        <p className="text-xs text-muted-foreground">
          This guide is general information, not professional, medical or financial advice. See our{" "}
          <Link to="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      </article>
    </PublicPageLayout>
  );
};

export default SmartGoalsSeo;
