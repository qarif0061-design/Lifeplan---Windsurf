/**
 * Build-time prerender (static site generation) for every public page.
 *
 * Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
 * For each public route it renders the React tree to HTML and writes
 * dist/<route>.html with its own <title>, meta description, canonical, robots,
 * JSON-LD and the full page text inside #root, so crawlers that do not run
 * JavaScript (and AdSense reviewers) see real content. Vercel serves these
 * files via `cleanUrls`; unknown URLs get dist/404.html with HTTP 404.
 * Also writes dist/sitemap.xml (indexable pages only) and dist/app-shell.html
 * (the plain SPA shell used for signed-in app routes).
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SSR_DIR = path.join(ROOT, "dist-ssr");
const SITE = "https://goalplanner.io";

// Public, crawlable non-article pages. App (signed-in) routes are NOT listed here.
const STATIC_ROUTES = [
  "/", "/about", "/contact", "/career", "/pricing", "/terms", "/privacy", "/refund", "/disclaimer",
  "/articles", "/questions", "/download",
  "/goal-planner", "/weekly-planning", "/productivity", "/procrastination", "/to-do-list", "/student-planner",
  "/self-improvement", "/focus-and-mental-clarity", "/daily-routine-planner", "/time-blocking", "/pomodoro-technique",
  "/eisenhower-matrix", "/online-goal-planner", "/goal-planner-app", "/daily-planner-app", "/habit-tracker-app",
  "/daily-journal-app", "/productivity-app", "/schedule-app", "/progress-tracker-app", "/goals-calendar-app",
  "/calendar-planner-app", "/goal-tracker-app", "/daily-goals-app", "/daily-schedule-app", "/best-habit-tracker-app",
  "/routine-creator-app", "/app-for-calendar-planning", "/structured-daily-planner-app", "/app-for-schedule-planning",
  "/app-to-check-off-daily-goals", "/apps-to-make-schedules", "/daily-habit-tracker-app", "/day-organizer-app",
  "/good-day-planner-apps", "/habits-app", "/online-daily-planner", "/routine-app", "/work-planner",
  "/agenda-planning-app", "/apps-for-daily-routine", "/apps-to-help-with-daily-routine", "/best-daily-planner-app",
  "/best-habit-trackers", "/daily-digital-planner", "/daily-tracker-app", "/digital-daily-planner",
  "/digital-planner-app", "/goal-planners", "/planner-apps", "/smart-goals", "/vision-board", "/goal-setting",
  "/adhd-planner", "/manifestation-planner", "/goal-tracking-software", "/google-keep-alternatives",
  "/todoist-alternatives", "/notion-alternatives", "/life-planning", "/time-management",
];

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
const redirected = new Set(
  (vercel.redirects ?? []).filter((r) => !r.has).map((r) => r.source.replace(/\/+$/, "") || "/"),
);

const robots = fs.readFileSync(path.join(ROOT, "public", "robots.txt"), "utf8");
const robotRules = [...robots.matchAll(/^\s*(Allow|Disallow):\s*(\S*)/gm)]
  .map((m) => ({ type: m[1], path: m[2] }))
  .filter((r) => r.path && r.path !== "/");
const robotsBlocked = (p) => {
  const hits = robotRules.filter((r) => p === r.path || p.startsWith(r.path));
  if (!hits.length) return false;
  hits.sort((a, b) => b.path.length - a.path.length);
  return hits[0].type === "Disallow";
};

const gitDate = (files) => {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.map((f) => `"${f}"`).join(" ")}`, {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
};

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
// Plain SPA shell for signed-in app routes (robots-disallowed, never indexed).
fs.writeFileSync(
  path.join(DIST, "app-shell.html"),
  template.replace("<head>", '<head>\n    <meta name="robots" content="noindex" />'),
);

const stripHead = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/i, "")
    .replace(/<link rel="canonical"[^>]*>\s*/i, "")
    .replace(/<meta property="og:(title|description|url|image|type)"[\s\S]*?\/>\s*/gi, "")
    .replace(/<meta name="twitter:(title|description|image|card)"[\s\S]*?\/>\s*/gi, "");

const baseTemplate = stripHead(template);

const buildPage = ({ html, head }, route) => {
  const title = head.title || "Goal Planner - Lifeplans";
  const description = head.description || "";
  const canonical = head.canonical || `${SITE}${route === "/" ? "/" : route}`;
  const image = head.imageUrl || `${SITE}/brand/lifeplans_og_social_image.png`;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    head.noIndex ? `<meta name="robots" content="noindex,follow" />` : "",
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    head.jsonLd
      ? `<script type="application/ld+json" id="jsonld">${JSON.stringify(head.jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");
  return baseTemplate
    .replace("</head>", `    ${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

const outFile = (route) => (route === "/" ? path.join(DIST, "index.html") : path.join(DIST, `${route.slice(1)}.html`));

const main = async () => {
  const entry = fs.readdirSync(SSR_DIR).find((f) => /^entry-server\.m?js$/.test(f));
  const mod = await import(pathToFileURL(path.join(SSR_DIR, entry)).href);
  const { render, listArticleEntries } = mod;

  const routes = [
    ...STATIC_ROUTES.filter((r) => !redirected.has(r)),
    ...listArticleEntries()
      .map((a) => `/articles/${a.slug}`)
      .filter((r) => !redirected.has(r)),
  ];

  const sitemap = [];
  const articlesDate = "2026-10-24";
  const problems = [];
  let count = 0;

  for (const route of routes) {
    let result;
    try {
      result = render(route);
    } catch (e) {
      problems.push(`${route}: render error ${e?.message ?? e}`);
      continue;
    }
    if (result.head.notFound) {
      problems.push(`${route}: rendered 404`);
      continue;
    }
    if (!result.head.title) problems.push(`${route}: no <Seo> title (falls back to default)`);
    const file = outFile(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buildPage(result, route));
    count++;

    const canonicalPath = (result.head.canonical || "").replace(SITE, "") || route;
    if (!result.head.noIndex && canonicalPath === route && !robotsBlocked(route)) {
      sitemap.push({ loc: `${SITE}${route === "/" ? "/" : route}`, route });
    }
  }

  // Real 404 page (served by Vercel with HTTP 404 for unknown URLs).
  const nf = render("/__page-not-found__");
  fs.writeFileSync(path.join(DIST, "404.html"), buildPage(nf, "/404"));

  // Sitemap with honest lastmod: articles = last content revision; pages = last git change of their source.
  const pageSource = (route) => {
    const app = fs.readFileSync(path.join(ROOT, "src", "App.tsx"), "utf8");
    const m = app.match(new RegExp(`path="${route.replace(/[-/]/g, "\\$&")}" element={<(\\w+)`));
    if (!m) return undefined;
    const f = path.join("src", "pages", `${m[1]}.tsx`);
    return fs.existsSync(path.join(ROOT, f)) ? f : undefined;
  };
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemap
      .sort((a, b) => a.loc.localeCompare(b.loc))
      .map(({ loc, route }) => {
        let lastmod;
        if (route.startsWith("/articles/")) lastmod = articlesDate;
        else {
          const src = route === "/" ? "src/pages/Landing.tsx" : pageSource(route);
          lastmod = src ? gitDate([src]) : undefined;
        }
        return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml);

  console.log(`Prerendered ${count} pages, sitemap: ${sitemap.length} URLs, 404.html + app-shell.html written.`);
  if (problems.length) {
    console.log(`Prerender notes (${problems.length}):\n  ${problems.join("\n  ")}`);
  }
  fs.rmSync(SSR_DIR, { recursive: true, force: true });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
