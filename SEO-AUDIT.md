# SEO Audit — goalplanner.io (Lifeplans Web)

Date: 2026-09-18
Scope: repository `D:\Website Goal Planner\vigilant-eagle-drift` + publicly accessible site
Baseline: Google Search Central documentation (people-first content, spam policies). No Search Console/analytics access was available inside this repo, so everything marked `[verify]` must be confirmed with real index/data once Google Search Console is connected (see `SEO-MONITORING.md`).

> Note: `SEO-AUDIT-REPORT.md` (existing) is out of date. It claims "A- (Excellent)", "no duplicate content", and a 1,079-URL sitemap, but it predates the current keyword-generation system, the 2,292-URL sitemap, and the robots.txt/sitemap conflicts found below. It should be archived, not treated as current.

---

## 1. Architecture (biggest constraint)

- Vite + React SPA, **client-side rendering only**. No SSR, SSG, or prerendering dependency exists (`package.json` has no react-snap / vite-ssg / prerender plugin).
- The ONLY server output per route is `index.html` (`dist/index.html`, 3.5 KB): a bare shell with hardcoded homepage title, description, canonical `https://goalplanner.io/`, and default OG tags.
- Every other page's title/description/canonical/JSON-LD is injected at runtime by `src/components/Seo.tsx` via `useEffect`.
- `vercel.json` and `netlify.toml` rewrite `/(.*)` → `/index.html` (standard SPA fallback).
- **Consequences**: until JS runs, Googlebot/Bingbot see the homepage's title/description/canonical on *every* URL. Canonical and meta conflict with the dedicated `Seo.tsx` output that appears only after JS execution. This makes indexing dependent on successful JS rendering for the entire crawlable surface (~2,292 URLs).

Severity: **CRITICAL / HIGH** — remediation options are in §7 (prerender selected pages (e.g. `react-snap`, `prerender-cli`, or Vercel RSC/Edge prerender) rather than a full app rewrite).

## 2. Sitemap audit (live, confirmed)

1. **2,292 `<loc>` entries**; **2,216 are `/articles/*`**; only 76 are other pages.
2. **~2,140 auto-generated article URLs** come from `src/seo/keywords.json` (2,140 keywords → 2,140 slugs, `scripts/generate-sitemap.mjs` lines 134–142). These are the mass-generated thin-content cluster (see §4).
3. **96 pillar articles are missing from the sitemap** though they exist in `src/seo/pillars.ts` (1,064 pillar slugs; 968 are in the sitemap).
4. **Redirect sources are listed instead of destinations.** `vercel.json` permanently 301s `/getting-things-done`, `/life-planning`, `/time-management`, `/smart-goals`, `/motivation` to `/articles/...` pillar pages — and all 5 of those **source URLs are in the sitemap**, while 0 of their 5 `[verify]` destinations (`how-to-get-things-done-system-2026`, `how-to-set-goals-and-actually-achieve-them`, `time-management-tips-and-strategies-2026`, `smart-goals-template-and-examples-2026`, `best-motivational-quotes-2026`) are in it. Sitemaps should list final (canonical) URLs only.
5. **Malformed first entry**: `<loc>    https://goalplanner.io/weekly-planner</loc>` (leading spaces from a copy/paste in `basePages`, line 87 of the generator).
6. No `<lastmod>`, `<changefreq>`, `<priority>`; single flat sitemap of 6,879 lines (acceptable for now, but a news/priority layer will help when fresh content ships).
7. `robots.txt` `Sitemap:` directive is present and correct.

Fix scope: rewrite `scripts/generate-sitemap.mjs` to emit (a) non-redirecting profiles, (b) all pillar articles, (c) curated "supporting" generated pages only where they add real value, and (d) drop keyword-spam variants.

## 3. robots.txt vs sitemap consistency

`public/robots.txt` (confirmed identical on live site) **disallows** `/daily-planner`, `/daily-planner/history`, `/strategy`, `/social`, `/dashboard`, `/goals`, `/check-in`, etc. But the sitemap **includes** `/daily-planner`, `/daily-planner/history`, `/strategy`, `/social`.

Google's guidance: don't submit to a sitemap URLs you're disallowing. Decide intent and make them agree:
- If these are app/auth-gated product pages, exclude them from the sitemap (they already have noindex where used as app UI).
- `/daily-planner`, `/weekly-planner`, `/strategy` are also **product features** (routes exist). Blocking crawlers from them is defensible (private user data) — but they must then be removed from the sitemap.

Severity: **HIGH** (conflicting signals; wasted crawl + possible soft-404/indexing confusion).

## 4. Content quality — scaled/thin content (critical)

`src/seo/articles.ts` (`buildBody`, lines 89–112) generates every keyword page from a **single ~250-word template**: the same "3-step system", the same "practical routine you can copy", the same "common mistakes to avoid", the same "How Lifeplans helps" paragraph, differing only by the inserted keyword. `ArticleDetails.tsx` renders these as indexable pages:

- Slug that maps to a pillar (`getPillarForKeyword`) → `noindex` + canonical to the pillar. Good behavior, but the canonical pillar URLs are largely **absent from the sitemap** (see §2.3).
- Slug that does **not** map to a pillar → self-canonical, **indexable**, thin, template body. Many such slugs exist (e.g. `a-in-smart-goals`, `contoh-smart-goals`, `acronym-of-smart-goals`, `doran-1981-smart-goals`, `apa-itu-smart-goals`, `full-focus-planner-smarter-goals`, ...).

This is textbook **scaled content abuse** under Google's spam policies (content generated primarily to match search queries at scale without added value). It sits beside the thousands of *legitimate, high-effort* pillar articles (`pillars.ts` — 1,064 real guides with FAQ schema, internal linking, examples) that actually deserve the crawl budget.

Severity: **CRITICAL** — highest-priority fix. Recommendation (aligns with "don't mass-publish" rule):
1. Treat `keywords.json` as a *keyword research dump*, not a page inventory.
2. Publish only pages with unique, real, people-first content (the pillars + hand-written supporting articles).
3. `noindex` (or remove from sitemap + `noindex`) the generated template pages — either directly in the data or by limiting generation to a curated subset.
4. **Do not ship content with "Keywords: ..." lines** in the rendered copy (`buildBody` footer; `weekly-planning-for-long-term-goals` body also ends with a keywords paragraph) — visible keyword dumps are a spam-signal and read as SEO-bait to humans.

## 5. Duplicate/template pages and keyword cannibalization

- ~30 `*-app` pages (e.g. `AppForCalendarPlanning.tsx`, `AgendaPlanningApp.tsx`, `AppsForDailyRoutine.tsx`...) share an **identical layout** — same "How to Get Started" section at line 99, same internal-link grid, same CTAs. High cross-page similarity → doorway-style risk if not differentiated with unique substance.
- Multiple near-duplicate slugs compete for the same intent (`smart-goals-examples`, `smart-goals-examples-for-work`, `smart-goals-project-managers`, `examples-of-smart-goals-*`, `goal-planner-app` vs `goal-planner-io-articles`, ... 100+ measurable duplicates). Each weakens the cluster.
- Fix: cluster keyword→ one canonical pillar each; consolidate or 301 duplicates; give each `*-app` page a genuinely distinct value proposition, section, or downloadable asset.

## 6. Homepage / template SEO quality

1. **Fabricated testimonials.** `Landing.tsx` lines 41–60 contain invented personas ("Sarah Jenkins", "Marcus Chen", "Elena Rodriguez") with placeholder `pravatar.cc` avatars. This violates your stated rule (never fabricate testimonials) and Google's E-E-A-T expectations. **Remove or replace with real, attributable users.** Do not add `Review`/`aggregateRating` schema.
2. **Homepage internal linking is nearly empty.** `Landing.tsx` has only 6 internal links: 3 article links + `/goals`, `/weekly-planner`, `/daily-planner`. The **footer has zero links to articles/pillars/blog** (`Footer.tsx`: about/career/contact/legal/social only). The Navbar **only links "Articles" for logged-in users** (`Navbar.tsx` line 47 is inside `{user && ...}`). Net effect: of the 2,216 article URLs, most are discoverable *only* via sitemap — no in-site link graph supports them.
3. `index.html` hardcodes the homepage canonical/title for every route (see §1).
4. JSON-LD on homepage is a clean `WebApplication` (no fake ratings — good). Article pages emit `Article` JSON-LD with headline/url/description only — no `datePublished`/`dateModified`/`author`/`publisher`/`image` (minor schema completeness gap, matters for rich results).
5. OG/Twitter card output: `og:url` per page comes from `Seo.tsx` (good). `twitter:card` is `summary` rather than `summary_large_image` in `Seo.tsx` (line 68) even though `index.html` declares `summary_large_image` — inconsistent; crawler sees `summary`, social scrapers see `summary_large_image`.
6. AdSense script + gtag (Ads `AW-18206119493`) with **Consent Mode v2 default-deny** — correct setup. GA4 (`measurementId G-81JE11TRLQ`) is initialized client-side via Firebase `getAnalytics`; worth confirming [verify] that pageview/`route_change` events fire on every route (SPA pageviews are often under-reported without a route-change hook).

## 7. www vs non-www canonicalization (confirmed live, real data)

Search Console (93d, `sc-domain:goalplanner.io`) shows **both hosts ranking independently**:

| Variant | Rows | Clicks |
|---|---|---|
| `https://www.goalplanner.io/...` | 440 | 148 |
| `https://goalplanner.io/...` | 228 | 103 |

This splits link equity, CTR, and average position across two URL spaces and inflates the "not indexed" total. **Decision (made): canonical host = `https://goalplanner.io` (non-www).**

**Deployed and verified live (2026-09-18):**
- Vercel project `lifeplan-windsurf-79bn` (account `qarif0061-4961`) owns both domains. Old domain-level setting redirected apex → www (307).
- Flipped via Vercel API: apex redirect removed, `www.goalplanner.io` now 301 → `goalplanner.io` (verified: apex 200, www 301).
- `vercel.json` has a redundant host-conditional permanent redirect `www.goalplanner.io/* → goalplanner.io/:path*` as defense-in-depth.

Sitemap, canonicals, and OG/Twitter tags all already emit `https://goalplanner.io`. Success gate: SC rows ~668 → ~330, www rows 440 → ~0.

Severity: **HIGH** (data-confirmed).

## 8. Prioritized action plan (maps to phases)

### P0 — stop the bleeding (do first)
1. **Remove/fix fabricated testimonials** on `Landing.tsx`. Replace with real user quotes only ([never fabricate]).
2. **Prune the keyword-generated cluster**: `getGeneratedArticleBySlug` pages that don't map to a pillar → `noindex,follow`; strip "Keywords:" litter from all generated bodies; stop adding new keywords as pages.
3. **Fix sitemap**: exclude redirect-source URLs, exclude robots-disallowed URLs, include all 1,064 pillar articles, fix the `${SITE}/weekly-planner` whitespace bug, add `lastmod` (from git/build time).
4. **Reconcile robots.txt vs sitemap** for `/daily-planner`, `/daily-planner/history`, `/strategy`, `/social`.
5. **Canonical host chosen: `https://goalplanner.io`** (non-www). **DONE (2026-09-18)**: Vercel domain setting flipped (www→apex 301) on the owning account + `vercel.json` host-conditional 301 as defense. Verified live (apex 200, www 301). Sitemap resubmission pending Google's periodic re-fetch or manual resubmit.

### P1 — crawlability & indexation
5. **Prerender the top pages** (homepage + pillar articles + `/articles` indexing page) so crawlers get real HTML without JS. Smallest viable: prerender at build time via `react-snap` or a `--prerender` list into `dist`, keeping SPA behavior for app routes.
6. **Add an articles hub with crawlable links**: footer + anonymous navbar entry pointing to `/articles`, big-topic hub linking the 11 pillars, each pillar linking 6–8 related pillars (already modeled via `relatedSlugs` — surface them as visible links, not just schema).
7. Add a `route_change` GA4 event; verify events in GA [verify].
8. Set `twitter:card=summary_large_image` consistently in `Seo.tsx`.

### P2 — maximize existing real content
9. **Consolidate keyword cannibalization**: map the 2,140 keywords → pillar coverage; produce `KEYWORD-MAP.csv`; 301 or noindex duplicates. **DONE**: `KEYWORD-MAP.csv` built (2,140 base keywords → primary pillar URL + matched slugs + 90-day SC impressions); 96.8% covered (2,071). The 69 uncovered cluster into 3 real gaps: (a) **vision board** theme (~17: what is a vision board, vision board ideas/template/app/maker/meaning), (b) competitor "**X alternative**" comparisons (~15: notion, trello, clickup, todoist, ticktick, habitica, microsoft to do, google keep, evernote, any.do, goodnotes, notability, penly...), (c) niche profession SMART-goal variants (electrical engineer, senior accountant, coffee shop, beauty salon, claims adjusters, cleaning services, corporate trainers, tech lead, travel agency, delivery drivers, conflict resolution...). List of profession variants still unmatched — candidates to fold into existing SMART-goal spans with an FAQ, not new URLs, unless SV grows.
10. **Differentiate the ~30 `*-app` pages** with unique structure, FAQs, comparables, or downloadable assets; ensure each has its own `<Seo>` title/desc/canonical (check current coverage [verify]).
11. Complete `Article` JSON-LD (datePublished/dateModified/author/publisher) and WebPage/FAQPage on all pillars (already present per `SEO-AUDIT-REPORT.md`; verify live [verify]).

### P3 — measurement & re-verify
12. Submit final sitemap in Search Console, run URL Inspection on top 20 URLs, and capture CWV + index status. Then update `SEO-MONITORING.md` with real numbers (search console + GA4). Do not fabricate metrics either here or in opportunity docs.

## 9. Assumptions / things requiring real data ([verify])
- Live crawl shows identical robots.txt + sitemap.xml to the repo, so repo == deployed for these files.
- Search Console + GA4 access is now configured (OAuth client `service-509005`, gcloud ADC). Baseline numbers are in `SEO-MONITORING.md` (real API pulls). Index/impression/backlink/opportunity numbers still to pull per phase.

## 10. Open decisions for you
- Confirm whether `*-app`, `/goal-planner`, `/productivity`, `/procrastination`, `/time-blocking`, etc. are intended to stay as separate indexable pages vs. consolidating into pillars.
- Confirm whether `/daily-planner`, `/strategy`, `/weekly-planner`, `/social` app features should be fully noindex'd (recommended: yes, keep them usable but out of the sitemap).
- Confirm you can share Search Console + GA4 access for the audit to produce real numbers (blocks P3).