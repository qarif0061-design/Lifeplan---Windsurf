# SEO Monitoring — goalplanner.io

Baseline snapshot taken from live Search Console (SC) and Google Analytics 4 (GA4) API data.

- **SC property:** `sc-domain:goalplanner.io` (owner: qarif0061@gmail.com)
- **GA4 property:** `lifeplans-f63f3` (ID `526486395`, measurement ID `G-81JE11TRLQ`)
- **Snapshot period:** SC = 2026-06-16 → 2026-09-17 (93 days). GA4 = 2026-08-21 → 2026-09-17 (28 days).
- **Data pulled via:** gcloud ADC OAuth client (`service-509005`), Search Console API v1 + GA4 Data API v1beta.
- **Raw exports:** `C:\Users\HAMZAC~1\AppData\Local\Temp\opencode\seo-data\sc-pages.csv`, `sc-queries.csv`, `ga4-landing-pages.csv`

## Headline numbers (baseline)

| Metric | Value |
|---|---|
| Search clicks (93 days) | **249** |
| Search impressions (93 days) | **16,564** |
| CTR | 1.5% |
| Avg position | 29.5 |
| Pages earning impressions | 668 |
| Distinct ranking queries | 599 |
| GA4 users / sessions (28 days) | 129 / 147 |
| GA4 organic users / sessions (28 days) | **65 / 69** |
| Indexed pages (SC Indexing report) | 1,110 indexed, 3,066 not indexed |

## Traffic by channel (GA4, 28 days)

| Channel | Users | Sessions |
|---|---|---|
| Organic Search | 65 | 69 |
| Direct | 56 | 68 |
| AI Assistant (chatgpt.com, perplexity.ai) | 6 | 7 |
| Referral | 1 | 2 |
| Unassigned | 1 | 1 |

## Top pages by clicks (SC, 93 days)

| Page | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| `/` (home) | 30 | 1,330 | 2.3% | 31.4 |
| `/articles/housekeeping-smart-goals-examples` | 16 | 829 | 1.9% | 11.3 |
| `/articles/examples-of-smart-goals-and-not-smart-goals` | 16 | 168 | 9.5% | 9.7 |
| `/articles/smart-goals-for-mechanical-engineers-examples` | 11 | 232 | 4.7% | 16.2 |
| `/articles/health-and-safety-smart-objectives-examples` | 10 | 131 | 7.6% | 24.9 |
| `/articles/doran-smart-goals` | 10 | 319 | 3.1% | 17.1 |
| `/articles/smart-goals-in-spanish` | 10 | 260 | 3.8% | 8.0 |
| `/articles/examples-of-smart-goals-for-security-manager` | 8 | 112 | 7.1% | 5.8 |
| `/articles/smart-goals-for-receptionist-examples` | 6 | 132 | 4.5% | 9.4 |
| `/articles/examples-of-smart-goals-for-medical-assistant` | 6 | 254 | 2.4% | 8.5 |
| `/articles/smart-goals-for-special-education-paraprofessionals` | 6 | 110 | 5.5% | 7.8 |
| `/articles/examples-of-smart-goals-for-law-students` | 5 | 118 | 4.2% | 10.6 |
| `/articles/smart-goals-for-warehouse-managers` | 5 | 290 | 1.7% | 25.7 |
| `/goal-planner-app` | 5 | 714 | 0.7% | 19.0 |

Block/segment breakdown (clicks / impressions):
- **Articles** (`/articles/*`): 217 clicks, 11,979 impr (616 rows)
- **Tools/planner pages**: 10 clicks, 986 impr (7 rows)
- **Everything else**: 24 clicks, 4,300 impr (45 rows)

## Critical finding: www vs non-www split

**Both host variants rank independently.** Google treats `https://goalplanner.io/...` and `https://www.goalplanner.io/...` as separate URLs:

| Variant | Rows | Clicks |
|---|---|---|
| `https://www.goalplanner.io/...` | 440 | 148 |
| `https://goalplanner.io/...` | 228 | 103 |

Combined 668 rows vs. ~2,292 sitemap URLs → signals, authority, and CTR are being split across two host names.

**Decision (2026-09-18): canonical host = `https://goalplanner.io` (non-www).** **Implemented & verified live:** Vercel project `lifeplan-windsurf-79bn` (account `qarif0061-4961`) had a domain-level apex→www redirect; flipped via API: apex now serves 200, `www.goalplanner.io` 301 → apex. `vercel.json` also carries a redundant host-conditional permanent redirect as defense-in-depth. Sitemap, canonicals, and OG/Twitter tags already emit the apex host. Expect the 668 rows to consolidate toward ~330 and both CTR and avg position to improve.

## Top queries by impressions (SC, 93 days)

(Full list in `sc-queries.csv`.) Notable clusters: `smart goals ...` (occupation/life-role variants drive most impressions), `smart goals examples`, `doran smart goals`, and long-tail `examples of smart goals for <audience>`.

## Traffic quality (GA4 cash-focus)

- 45% of sessions are Direct — session attribution weak; recommend link tagging on external placements.
- AI Assistant already sends ~5% of sessions (chatgpt.com + perplexity.ai) — opportunity to grow with fact-dense, quotable content.
- No referral build-out yet; the homepage is the main landing page (28 users), followed by top article slugs.

## How to refresh this data

```powershell
# SC page data (93d window)
$body = '{"startDate":"2026-06-18","endDate":"2026-09-19","dimensions":["page"],"rowLimit":25000}'
# POST to https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain:goalplanner.io/searchAnalytics/query
# GA4 landing pages (28d): POST to https://analyticsdata.googleapis.com/v1beta/properties/526486395:runReport
```

Use the gcloud ADC profile documented in the SEO audit's "Access" section.

## Success gates (check at next snapshot)

1. www / non-www rows collapsed to a single host: expect `https://www.goalplanner.io/...` rows to drop to 0-1 as the apex host consolidates (668 total expected to fall toward ~330 with merged metrics).
2. CTR ≥ 3% (from 1.5%) and avg position ≤ 20.
3. Indexed pages grow toward 2,000+ while Not-indexed shrinks from 3,066.
4. AI Assistant traffic continues to grow; organic users/month trend up.

## Indexing audit (2026-09-18)

Re-checked live. Findings:

- **Sitemap is healthy**: `https://goalplanner.io/sitemap.xml` serves exactly **1,212 apex-host URLs** (0 `www.` entries, 0 non-https). Generated keyword pages (thin, `noindex`) are correctly excluded; only base pages + static articles + pillars are included (see `scripts/generate-sitemap.mjs`).
- **SC sitemap row is STALE**: SC reports `submitted=2292 indexed=0` for `https://goalplanner.io/sitemap.xml`. That is the old pre-cleanup sitemap (2,292 URLs). The served file is 1,212. `indexed=0` is the SC index-recheck lag, not a real value. Action: re-submit the sitemap once write access is available (or click "Resubmit" in SC UI). This should converge SC's doc count to the live 1,212.
- **Indexed vs not-indexed (SC Indexing report)**: 1,110 indexed / 3,066 not-indexed. Live sitemap is 1,212 URLs, so indexed coverage of the intentional indexable surface is **~91%**. The 3,066 "not indexed" are dominated by legacy/removed URLs (old keyword-dump pages that are now `noindex` or deleted, www duplicates now 301'd, pre-cleanup slugs) — the count will trend down as Google recrawls.
- **Raw shell limitation (confirmed live)**: every route (`/articles/*`, `/pricing`, `/about`, `/productivity`, …) returns the identical 3.9 KB `index.html` SPA shell with the homepage `<title>`, homepage `canonical`, and homepage OG tags, until client JS runs. `Seo.tsx` corrects all tags client-side (Googlebot's JS-rendering path is fine — that's why 1,110 pages index), but **non-JS crawlers and social/link scrapers (LinkedIn, X, WhatsApp, Discord) see every URL as the homepage** — wrong title, wrong preview, homepage canonical. This is the single biggest indexability risk remaining. Fix path: build-time prerender of per-route HTML shells (title/canonical/description/OG/JSON-LD) so every served route exposes its own document identity without JS.
- **Missing-from-SC sitemap URLs**: 768 of 1,212 sitemap URLs have zero SC impressions in 93 days (749 `/articles/*`, 19 top-level e.g. `/pricing`, `/terms`, `/about`, `/productivity`, `/weekly-planning`, `/goal-setting`, `/vision-board`). These are indexed-but-no-impressions (authority/ranking gap), not indexing failures — they also include recently removed/rebuilt pages. Prioritize internal linking + prerender meta for the top-level pages.
- **Live checks**: www → apex 301 verified (followed to `https://goalplanner.io/...` 200). Article canonical/title correct only after JS (see raw-shell note).

### Indexing-action checklist (next snapshot gates)

- [ ] Prerender per-route shell HTML at build (title/canonical/description/OG + JSON-LD) so non-JS requests expose real document identity.
- [ ] Re-submit sitemap in SC UI (or obtain `webmasters` write scope and POST `/sitemaps`) so submitted count reflects 1,212.
- [ ] Confirm SC "Not indexed" bucket falls as legacy/removed URLs recrawl; watch for the 19 top-level pages earning impressions.
- [ ] Keep canonical host apex-only; monitor www rows → 0.