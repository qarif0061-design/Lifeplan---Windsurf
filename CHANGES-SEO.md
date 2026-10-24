# SEO & AdSense readiness changes (branch `seo-adsense-fixes`)

The branch is built on WIP commit 7903aaa. **Nothing has been pushed or deployed.**

## 1. Prerendering and real 404s
- `pnpm build` now runs a client build, then an SSR build (`src/entry-server.tsx`), then `scripts/prerender.mjs`.
- 494 public pages are written as static HTML. Each one has its own title, meta description, canonical (`https://goalplanner.io`, non-www), H1 and body text.
- Unknown URLs, including unknown `/articles/*` slugs, serve `404.html` with a real 404 status. The old catch-all rewrite to index.html has been removed.
- App routes (dashboard, planner, etc.) are rewritten to `app-shell.html`, which is noindex.
- `sitemap.xml` is generated at build time. It lists 356 indexable, self-canonical URLs with real lastmod dates (from git dates; articles use their updated date). It includes /contact and /disclaimer. /custom-planner and noindex pages are left out.

## 2. Meta and canonicals
- No page falls back to the homepage canonical.
- Meta descriptions are written from the article text; none start with `#`.
- The 6 blank articles now have content. The 3 shortest were expanded to roughly 450–600 words.

## 3. Markdown and links
- Markdown now renders as proper headings, lists and bold text, with no visible `#` or `**`.
- The "Keywords covered" blocks and the bare-URL "Related guides" lists are removed. In their place are titled internal links, rendered with React Router links.

## 4. Ads
- The Monetag and Adsterra scripts were removed (index.html in the WIP commit; the unused `MonetagBanner.tsx` in this branch). `dist` contains no non-Google ad-network strings.
- `ads.txt` and `app-ads.txt` list only Google (`google.com, pub-..., DIRECT, f08c47fec0942fa0`).

## 5. Redirects
- 301s added in `vercel.json` for URLs in gsc-urls-now-404.csv that have clicks or 10+ impressions. Every target exists and there are no redirect chains.
- 59 protected pages that the WIP commit had redirected were restored as real pages.
- 8 protected URLs were already returning 404 on the live site, so they now 301 to the closest live page. Their keywords are preserved on the target page.

## 6. Noindex and sitemap
- 138 rendered pages are noindex: thin or templated articles with no impressions, template landing pages, the mindtools pages, /templates and /custom-planner. Protected pages are never noindexed.
- The "App B / App C" placeholders were replaced with real comparisons (Strides, Todoist, Notion).

## 7. Trust
- New `/disclaimer` page, linked from the footer and from every article.
- Articles show an author byline ("Lifeplans Editorial Team", linked to /about#editorial-team), a published date and an updated date. These also appear in the Article JSON-LD.
- `info@goalplanner.io` is now the only support email (Contact, About, Privacy, Terms, Refund).
- Refund wording is the same on Contact and Refund Policy. There is no automatic money-back guarantee; billing errors and technical issues are reviewed, and app-store purchases are refunded through Apple or Google.
- The Privacy Policy lists the services actually used: Firebase, Google Analytics, AdSense, the Google Ads tag, Google Fonts, Lemon Squeezy, RevenueCat and the app stores, and Vercel.
- "GoalPath" was replaced with Lifeplans in the body of /online-goal-planner. **The page title still says "GoalPath" because the page is protected.** Changing it is your call.

## Verification
- Build passes.
- Lint: the 31 errors are all in code that was already there (Dashboard, WeeklyPlanner, shareCard, CustomPlanner `any`, etc.). The new SEO files add no lint errors.
- In dist: no duplicate titles or descriptions, every page has an H1, every canonical points to itself, there is no visible markdown, and there are no ad-network hits.

## Not done
- Thin articles with impressions (about 80–150 words, e.g. /articles/weekly-review) still need to be expanded to 800+ words. This is an editorial task.
- The client uses `createRoot` rather than `hydrateRoot`. That is fine for SEO; switching is a possible later improvement.
- Old TypeScript and lint errors in the app code are unchanged.

## Protected pages (102)
OK = same URL, title, H1 and keyword. MISMATCH = /articles/daily-planner-app was blank on the live site and now has a proper title and H1.

| URL | Clicks | Status | Words | Title |
|---|---|---|---|---|
| /articles/housekeeping-smart-goals-examples | 29 | OK | 385 | Housekeeping SMART Goals Examples (2026) – Facility Excellence / Lifeplans |
| / | 21 | OK | 442 | Goal Planner - Lifeplans: Free Goal Setting & Daily Planning App |
| /articles/examples-of-smart-goals-and-not-smart-goals | 16 | OK | 388 | Examples of SMART Goals and Not SMART Goals (2026) – Comparison Guide / Lifeplans |
| /articles/smart-goals-for-mechanical-engineers-examples | 14 | OK | 382 | SMART Goals for Mechanical Engineers Examples (2026) – Technical Success / Lifeplans |
| /articles/smart-goals-in-spanish | 13 | OK | 376 | SMART Goals in Spanish (2026) – Metas Inteligentes / Lifeplans |
| /articles/health-and-safety-smart-objectives-examples | 11 | OK | 391 | Health and Safety SMART Objectives Examples (2026) – Workplace Safety / Lifeplans |
| /articles/examples-of-smart-goals-for-security-manager | 11 | OK | 385 | Examples of SMART Goals for Security Manager (2026) – Safety Excellence / Lifeplans |
| /articles/smart-goals-for-special-education-paraprofessionals | 11 | OK | 391 | SMART Goals for Special Education Paraprofessionals (2026) – Support Excellence / Lifeplans |
| /articles/engineering-smart-goals-examples | 10 | OK | 376 | Engineering SMART Goals Examples (2026) – Technical Success / Lifeplans |
| /articles/smart-goals-for-purchasing-department-examples | 10 | OK | 382 | SMART Goals for Purchasing Department Examples (2026) – Procurement Excellence / Lifeplans |
| /articles/doran-smart-goals | 7 | OK | 364 | Doran SMART Goals (2026) – George Doran's Original Framework / Lifeplans |
| /articles/examples-of-smart-goals-for-medical-assistant | 6 | OK | 385 | Examples of SMART Goals for Medical Assistant (2026) – Healthcare Support / Lifeplans |
| /articles/data-analyst-smart-goals-examples | 5 | OK | 379 | Data Analyst SMART Goals Examples (2026) – Analytics Excellence / Lifeplans |
| /articles/graphic-designer-smart-goals-examples | 5 | OK | 379 | Graphic Designer SMART Goals Examples (2026) – Creative Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-receptionist | 5 | OK | 372 | Examples of SMART Goals for Receptionist (2026) – Front Desk Excellence / Lifeplans |
| /articles/accounts-receivable-smart-goals-examples | 5 | OK | 379 | Accounts Receivable SMART Goals Examples (2026) – Financial Management / Lifeplans |
| /goal-planner-app | 4 | OK | 2179 | Best Goal Planner App 2026 / Set & Achieve Meaningful Goals / GoalPlanner |
| /articles/smart-goals-for-warehouse-managers | 4 | OK | 394 | SMART Goals for Warehouse Managers (2026) – Efficiency and Safety Goals / Lifeplans |
| /articles/examples-of-smart-goals-for-law-students | 4 | OK | 385 | Examples of SMART Goals for Law Students (2026) – Legal Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-attendance | 4 | OK | 391 | Examples of SMART Goals for Attendance (2026) – Punctuality Excellence / Lifeplans |
| /online-goal-planner | 4 | OK | 302 | GoalPath: Free Online Goal Planner — Set & Track Goals |
| /articles/smarter-goals-michael-hyatt | 4 | OK | 352 | Smarter Goals Michael Hyatt (2026) – Advanced Framework / Lifeplans |
| /articles/smart-goals-for-food-service-workers | 4 | OK | 371 | SMART Goals for Food Service Workers (2026) – Restaurant Excellence / Lifeplans |
| /articles/smart-goals-for-retail-store-manager | 3 | OK | 373 | SMART Goals for Retail Store Manager (2026) – Sales and Customer Service / Lifeplans |
| /planner-apps | 3 | OK | 345 | Planner Apps 2026 / Planner apps help you organize your daily life, set goals, track habits, and manage time / GoalPlanner |
| /articles/smart-goals-for-receptionist-examples | 3 | OK | 369 | SMART Goals for Receptionist Examples (2026) – Front Desk Success / Lifeplans |
| /articles/procurement-smart-goals-examples | 3 | OK | 377 | Procurement SMART Goals Examples (2026) – Supply Chain and Purchasing / Lifeplans |
| /articles/smart-goals-for-personal-hygiene | 3 | OK | 389 | SMART Goals for Personal Hygiene (2026) – Health Excellence / Lifeplans |
| /articles/examples-list-of-smart-goals-for-administrative-assistants | 3 | OK | 385 | Examples List of SMART Goals for Administrative Assistants (2026) / Lifeplans |
| /articles/brand-awareness-smart-goals-examples | 3 | OK | 364 | Brand Awareness SMART Goals Examples (2026) – Marketing Excellence / Lifeplans |
| /articles/costco-smart-goals | 3 | OK | 363 | Costco SMART Goals (2026) – Retail Excellence Targets / Lifeplans |
| /articles/smart-goals-to-improve-communication-skills | 2 | OK | 381 | SMART Goals to Improve Communication Skills (2026) – Interpersonal Excellence / Lifeplans |
| /articles/list-of-smart-goals-for-administrative-assistants | 2 | OK | 374 | List of SMART Goals for Administrative Assistants (2026) – Office Excellence / Lifeplans |
| /articles/daily-planner-app | 2 | MISMATCH | 350 | Goal Planner - Lifeplans |
| /articles/examples-of-smart-goals-for-research | 2 | OK | 383 | Examples of SMART Goals for Research (2026) – Scientific Excellence / Lifeplans |
| /articles/executive-assistant-smart-goals-examples | 2 | OK | 368 | Executive Assistant SMART Goals Examples (2026) – Support Excellence / Lifeplans |
| /articles/5-year-smart-goals-examples | 2 | OK | 368 | 5 Year SMART Goals Examples (2026) – Long-term Planning / Lifeplans |
| /articles/examples-of-smart-goals-for-healthcare-professionals | 2 | OK | 374 | Examples of SMART Goals for Healthcare Professionals (2026) – Medical Excellence / Lifeplans |
| /articles/spiritual-smart-goals-examples | 2 | OK | 377 | Spiritual SMART Goals Examples (2026) – Personal Growth and Mindfulness / Lifeplans |
| /articles/examples-of-good-and-bad-smart-goals-for-students | 2 | OK | 380 | Examples of Good and Bad SMART Goals for Students (2026) – Learning Guide / Lifeplans |
| /articles/examples-of-smart-goals-for-effective-communication | 2 | OK | 384 | Examples of SMART Goals for Effective Communication (2026) – Interpersonal Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-a-farm | 2 | OK | 374 | Examples of SMART Goals for a Farm (2026) – Agricultural Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-technicians | 2 | OK | 371 | Examples of SMART Goals for Technicians (2026) – Technical Excellence / Lifeplans |
| /download | 1 | OK | 162 | Goal Planner - Lifeplans |
| /apps-to-make-schedules | 1 | OK | 373 | Apps To Make Schedules 2026 / Apps to make schedules transform your chaotic days into well-organized plans / GoalPlanner |
| /articles/concrete-goals-examples | 1 | OK | 364 | Concrete Goals Examples (2026) – Specific and Clear Targets / Lifeplans |
| /articles/smart-goals-what-are-they | 1 | OK | 368 | SMART Goals What Are They (2026) – Framework Guide / Lifeplans |
| /apps-to-help-with-daily-routine | 1 | OK | 367 | Apps To Help With Daily Routine 2026 / Looking for apps to help with daily routine? Find tools that make it easy to plan, follow, and maintain productive daily patterns without the overwhelm / GoalPlanner |
| /articles/examples-of-smart-goals-for-self-confidence | 1 | OK | 384 | Examples of SMART Goals for Self Confidence (2026) – Personal Growth / Lifeplans |
| /progress-tracker-app | 1 | OK | 545 | Progress Tracker App 2026 / Track Goals, Habits & Milestones / GoalPlanner |
| /structured-daily-planner-app | 1 | OK | 359 | Structured Daily Planner App 2026 / A structured daily planner app gives you the framework to plan every day with purpose / GoalPlanner |
| /articles/doran-1981-smart-goals | 1 | OK | 354 | Doran 1981 SMART Goals (2026) – Original Framework and History / Lifeplans |
| /goal-tracker-app | 1 | OK | 387 | Goal Tracker App 2026 / The best goal tracker app helps you set meaningful goals, track daily progress, and stay motivated / GoalPlanner |
| /schedule-app | 1 | OK | 591 | Schedule App 2026 / Plan Your Day, Week & Goals / GoalPlanner |
| /habit-tracker-app | 1 | OK | 1693 | Best Habit Tracker App 2026 / Build Consistent Habits That Stick / GoalPlanner |
| /articles/smart-goals-for-teens | 1 | OK | 379 | SMART Goals for Teens (2026) – Youth and Adolescent Goal Setting / Lifeplans |
| /articles/smart-objectives-of-amazon | 1 | OK | 361 | SMART Objectives of Amazon (2026) – Amazon Excellence / Lifeplans |
| /articles/smart-goals-for-receptionist | 1 | OK | 366 | SMART Goals for Receptionist (2026) – Front Desk Excellence / Lifeplans |
| /articles/smart-goals-for-project-engineers | 1 | OK | 368 | SMART Goals for Project Engineers (2026) – Engineering Excellence / Lifeplans |
| /articles/smart-goals-for-internship-examples | 1 | OK | 380 | SMART Goals for Internship Examples (2026) – Learning and Development / Lifeplans |
| /articles/examples-of-smart-goals-for-hr-coordinator | 1 | OK | 375 | Examples of SMART Goals for HR Coordinator (2026) – Human Resources Excellence / Lifeplans |
| /articles/emotional-smart-goals-examples | 1 | OK | 375 | Emotional SMART Goals Examples (2026) – Emotional Wellness / Lifeplans |
| /articles/smart-goals-for-lawyers-examples | 1 | OK | 368 | SMART Goals for Lawyers Examples (2026) – Legal Excellence / Lifeplans |
| /articles/smart-pr-objectives-examples | 1 | OK | 362 | SMART PR Objectives Examples (2026) – Public Relations Excellence / Lifeplans |
| /articles/c-smart-objectives | 1 | OK | 362 | C SMART Objectives (2026) – Challenging and Clear Targets / Lifeplans |
| /articles/smart-objective-for-clothing-business | 1 | OK | 373 | SMART Objective for Clothing Business (2026) – Fashion Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-administrative-assistants | 1 | OK | 374 | Examples of SMART Goals for Administrative Assistants (2026) – Office Excellence / Lifeplans |
| /articles/academic-smart-goals-examples-for-students | 1 | OK | 382 | Academic SMART Goals Examples for Students (2026) – Educational Success / Lifeplans |
| /articles/smart-marketing-objectives-examples-for-a-new-product | 1 | OK | 384 | SMART Marketing Objectives Examples for a New Product (2026) – Launch Goals / Lifeplans |
| /articles/examples-of-smart-goals-for-medical-students | 1 | OK | 374 | Examples of SMART Goals for Medical Students (2026) – Medical Education / Lifeplans |
| /articles/diversity-equity-and-inclusion-smart-goals-examples | 1 | OK | 374 | Diversity Equity and Inclusion SMART Goals Examples (2026) – DEI Excellence / Lifeplans |
| /articles/smart-goals-for-restaurants | 1 | OK | 362 | SMART Goals for Restaurants (2026) – Food Service Excellence / Lifeplans |
| /articles/action-oriented-smart-goals | 1 | OK | 377 | Action Oriented SMART Goals (2026) – Implementation-Focused Targets / Lifeplans |
| /online-daily-planner | 1 | OK | 374 | Online Daily Planner 2026 / An online daily planner lets you plan your day from any device with internet access / GoalPlanner |
| /articles/smart-goals-for-mentoring-examples | 1 | OK | 369 | SMART Goals for Mentoring Examples (2026) – Mentorship Success / Lifeplans |
| /daily-tracker-app | 1 | OK | 363 | Daily Tracker App 2026 / A daily tracker app lets you monitor your daily habits, goals, tasks, and progress in one place / GoalPlanner |
| /articles/examples-of-smart-goals-for-quality-improvement | 1 | OK | 374 | Examples of SMART Goals for Quality Improvement (2026) – Process Excellence / Lifeplans |
| /articles/smart-goals-table-example | 1 | OK | 352 | SMART Goals Table Example (2026) – Structure Template / Lifeplans |
| /articles/smart-objectives-to-increase-brand-awareness-examples | 1 | OK | 372 | SMART Objectives to Increase Brand Awareness Examples (2026) – Brand Excellence / Lifeplans |
| /articles/smart-quality-objectives-examples | 1 | OK | 374 | SMART Quality Objectives Examples (2026) – Quality Excellence / Lifeplans |
| /articles/tangible-goals-examples | 1 | OK | 362 | Tangible Goals Examples (2026) – Concrete Success / Lifeplans |
| /articles/examples-of-academic-smart-goals | 1 | OK | 368 | Examples of Academic SMART Goals (2026) – Educational Excellence / Lifeplans |
| /articles/brand-awareness-smart-objectives-examples | 1 | OK | 364 | Brand Awareness SMART Objectives Examples (2026) – Marketing Targets / Lifeplans |
| /articles/smart-sustainable-measurable-attainable | 1 | OK | 352 | SMART Sustainable Measurable Attainable (2026) – Sustainable Excellence / Lifeplans |
| /articles/examples-of-smart-goals-for-clinical-research-coordinator | 1 | OK | 388 | Examples of SMART Goals for Clinical Research Coordinator (2026) – Research Excellence / Lifeplans |
| /articles/smart-goals-for-operations-managers | 1 | OK | 392 | SMART Goals for Operations Managers (2026) – Efficiency and Process / Lifeplans |
| /articles/best-planner-setup-for-daily-tasks | 1 | REDIRECT->/articles/daily-planner-guide-2026 |  |  |
| /articles/smart-goals-for-content-marketing-examples | 1 | OK | 378 | SMART Goals for Content Marketing Examples (2026) – Content Strategy / Lifeplans |
| /articles/daily-productivity-routine-for-success-step-by-step | 1 | REDIRECT->/articles/daily-productivity-routine |  |  |
| /articles/smart-goals-sustainability | 1 | OK | 362 | SMART Goals Sustainability (2026) – Environmental Excellence / Lifeplans |
| /articles/smart-objectives-examples-project-management | 1 | OK | 377 | SMART Objectives Examples Project Management (2026) – Project Excellence / Lifeplans |
| /articles/theres-a-smart-way-to-write-managements-goals-and-objectives | 1 | OK | 392 | There's a SMART Way to Write Managements Goals and Objectives (2026) – Management Excellence / Lifeplans |
| /articles/creating-smart-goals | 1 | OK | 363 | Creating SMART Goals (2026): Step-by-Step Guide With Examples / Lifeplans |
| /articles/smart-goal-formula-example | 1 | OK | 365 | SMART Goal Formula Example (2026) – Practical Application / Lifeplans |
| /articles/smarte-goals-acronym | 1 | REDIRECT->/articles/smarter-goals-michael-hyatt |  |  |
| /articles/simple-ways-to-improve-your-daily-routine | 1 | REDIRECT->/articles/how-to-build-a-consistent-daily-routine |  |  |
| /articles/goal-tracker-ai | 1 | REDIRECT->/goal-tracker-app |  |  |
| /articles/best-productivity-tips-for-daily-life-for-busy-people | 1 | REDIRECT->/articles/best-productivity-tips-for-daily-life-2026 |  |  |
| /articles/self-improvement-books-in-urdu | 1 | REDIRECT->/self-improvement |  |  |
| /articles/smart-learning-objective | 1 | OK | 360 | SMART Learning Objective (2026) – Educational Target / Lifeplans |
| /articles/michael-hyatt-smarter-goals | 1 | REDIRECT->/articles/smarter-goals-michael-hyatt |  |  |
| /articles/smart-goals-for-training-and-development | 1 | OK | 382 | SMART Goals for Training and Development (2026) – Skill Building Programs / Lifeplans |
