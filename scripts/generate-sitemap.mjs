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

const readPillarSlugs = () => {
  const pillarsPath = path.join(ROOT, "src", "seo", "pillars.ts");
  const raw = fs.readFileSync(pillarsPath, "utf8");

  const slugs = [];
  const re = /^\s*slug:\s*"([a-z0-9-]+)"/gm;
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

  const now = new Date();
  const lastmod = now.toISOString().slice(0, 10);

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n") +
    `\n</urlset>\n`
  );
};

const readRobotsDisallowed = () => {
  const robotsPath = path.join(ROOT, "public", "robots.txt");
  const raw = fs.readFileSync(robotsPath, "utf8");
  const disallowed = [];
  const re = /^\s*Disallow:\s*(\S+)/gm;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    disallowed.push(m[1]);
  }
  return disallowed.filter((d) => d !== "/" && d.length > 1).map((d) => d.replace(/\/+$/, ""));
};

const readRedirectSources = () => {
  const vercelPath = path.join(ROOT, "vercel.json");
  const raw = fs.readFileSync(vercelPath, "utf8");
  const config = JSON.parse(raw);
  return (config.redirects ?? [])
    .filter((r) => r.permanent)
    .map((r) => r.source.replace(/^\/|\/$/g, ""));
};

const main = () => {
  const robotsDisallowed = readRobotsDisallowed();
  const redirectSources = readRedirectSources();

  const isIndexablePath = (pathname) => {
    const clean = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    if (redirectSources.includes(clean.replace(/^\//, ""))) return false;
    return !robotsDisallowed.some((d) => clean === d || clean.startsWith(`${d}/`));
  };

  const basePages = [
    `${SITE}/`,
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
    `${SITE}/habit-tracker-app`,
    `${SITE}/daily-journal-app`,
    `${SITE}/productivity-app`,
    `${SITE}/weekly-planning`,
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
    `${SITE}/custom-planner`,
    `${SITE}/smart-goals`,
    `${SITE}/vision-board`,
    `${SITE}/goal-setting`,
    `${SITE}/adhd-planner`,
    `${SITE}/manifestation-planner`,
    `${SITE}/goal-tracking-software`,
  ].filter((url) => {
    const pathname = new URL(url).pathname;
    return isIndexablePath(pathname) || url === `${SITE}/`;
  });

  const staticSlugs = readStaticArticleSlugs();
  const pillarSlugs = readPillarSlugs();
  const articleSlugs = Array.from(new Set([...staticSlugs, ...pillarSlugs])).sort();
  const articleUrls = articleSlugs.map((s) => `${SITE}/articles/${s}`);

  const xml = buildUrlset([...basePages, ...articleUrls]);
  const outPath = path.join(ROOT, "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  process.stdout.write(
    `Generated sitemap with ${new Set([...basePages, ...articleUrls]).size} URLs (base + static articles + pillars, generated keyword pages noindexed) -> public/sitemap.xml\n`,
  );
};

main();
