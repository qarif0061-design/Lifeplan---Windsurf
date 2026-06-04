import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const SITE = "https://goalplanner.io";

const readStaticArticleSlugs = () => {
  const articlesPath = path.join(ROOT, "src", "pages", "Articles.tsx");
  const raw = fs.readFileSync(articlesPath, "utf8");

  const slugs = [];
  const re = /\bslug:\s*"([a-z0-9-]+)"/g;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    slugs.push(m[1]);
  }

  return Array.from(new Set(slugs)).sort();
};

const buildUrlset = (urls) => {
  const unique = Array.from(new Set(urls));
  unique.sort();

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join("\n") +
    `\n</urlset>\n`
  );
};

const readKeywords = () => {
  const keywordsPath = path.join(ROOT, "src", "seo", "keywords.json");
  const raw = fs.readFileSync(keywordsPath, "utf8");
  const keywords = JSON.parse(raw);
  return Array.isArray(keywords) ? keywords : [];
};

const slugify = (input) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[''']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const main = () => {
  const basePages = [
    `${SITE}/`,
    `${SITE}/life-planning`,
    `${SITE}/getting-things-done`,
    `${SITE}/weekly-planning`,
    `${SITE}/time-management`,
    `${SITE}/smart-goals`,
    `${SITE}/motivation`,
    `${SITE}/pricing`,
    `${SITE}/terms`,
    `${SITE}/privacy`,
    `${SITE}/refund`,
    `${SITE}/articles`,
    `${SITE}/questions`,
    `${SITE}/download`,
    `${SITE}/about`,
    `${SITE}/contact`,
    `${SITE}/productivity`,
    `${SITE}/procrastination`,
    `${SITE}/to-do-list`,
    `${SITE}/student-planner`,
    `${SITE}/self-improvement`,
    `${SITE}/focus-and-mental-clarity`,
    `${SITE}/daily-routine-planner`,
    `${SITE}/time-blocking`,
    `${SITE}/pomodoro-technique`,
    `${SITE}/eisenhower-matrix`,
    `${SITE}/online-goal-planner`,
    `${SITE}/goal-planner`,
    `${SITE}/goal-planner-app`,
    `${SITE}/daily-planner-app`,
    `${SITE}/daily-planner`,
    `${SITE}/daily-planner/history`,
    `${SITE}/habit-tracker-app`,
    `${SITE}/daily-journal-app`,
    `${SITE}/productivity-app`,
    `    ${SITE}/weekly-planner`,
    `${SITE}/strategy`,
    `${SITE}/social`,
    `${SITE}/schedule-app`,
    `${SITE}/progress-tracker-app`,
    `${SITE}/goals-calendar-app`,
    `${SITE}/calendar-planner-app`,
    `${SITE}/goal-tracker-app`,
    `${SITE}/daily-goals-app`,
    `${SITE}/daily-schedule-app`,
    `${SITE}/best-habit-tracker-app`,
    `${SITE}/routine-creator-app`,
    `${SITE}/app-for-calendar-planning`,
    `${SITE}/structured-daily-planner-app`,
    `${SITE}/app-for-schedule-planning`,
    `${SITE}/app-to-check-off-daily-goals`,
    `${SITE}/apps-to-make-schedules`,
    `${SITE}/daily-habit-tracker-app`,
    `${SITE}/day-organizer-app`,
    `${SITE}/good-day-planner-apps`,
    `${SITE}/habits-app`,
    `${SITE}/online-daily-planner`,
    `${SITE}/routine-app`,
    `${SITE}/work-planner`,
    `${SITE}/agenda-planning-app`,
    `${SITE}/apps-for-daily-routine`,
    `${SITE}/apps-to-help-with-daily-routine`,
    `${SITE}/best-daily-planner-app`,
    `${SITE}/best-habit-trackers`,
    `${SITE}/daily-digital-planner`,
    `${SITE}/daily-tracker-app`,
    `${SITE}/digital-daily-planner`,
    `${SITE}/digital-planner-app`,
    `${SITE}/goal-planners`,
    `${SITE}/planner-apps`,
  ];

  const staticSlugs = readStaticArticleSlugs();
  const staticArticleUrls = staticSlugs.map((s) => `${SITE}/articles/${s}`);

  const keywords = readKeywords();
  const seen = new Map();
  const generatedSlugs = keywords.map((k) => {
    const base = slugify(k);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  });
  const generatedArticleUrls = generatedSlugs.map((s) => `${SITE}/articles/${s}`);

  const xml = buildUrlset([...basePages, ...staticArticleUrls, ...generatedArticleUrls]);
  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  process.stdout.write(
    `Generated sitemap with ${new Set([...basePages, ...staticArticleUrls, ...generatedArticleUrls]).size} URLs (base + static + generated articles) -> public/sitemap.xml\n`,
  );
};

main();
