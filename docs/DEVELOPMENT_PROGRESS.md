# Sccuni — Development Progress

- **Last updated:** 21 Nov 2026.
- **Current phase:** Phase 0 — Discovery and planning ✅ drafted, ⏳ **awaiting founder approval**. Phase 5 (design) and the frontend part of Phase 10 were started early at the founder's request.
- **Code status:** the web frontend exists in `frontend/` (Next.js), running on **fictional sample data**. No backend, database or real data yet.

## Phase status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Discovery and product planning | 🟡 Awaiting approval | Documentation set drafted (see below) |
| 1 | Requirements and feature specification | ⚪ Not started | Starts on approval |
| 2 | Competitor and market research | 🟡 Partially done | Eduvision live-checked; 3 international portals blocked automation (manual benchmark needed) |
| 3 | Data model and database architecture | 🟡 Logical design drafted | Physical Prisma schema after approval |
| 4 | Technical architecture | 🟡 Proposed | Stack recommendation awaiting approval |
| 5 | UI/UX and design system | 🟡 v0.2 in code, ready for review | Logo-based palette; see DESIGN_SYSTEM.md |
| 6–9 | — | ⚪ Not started | See PROJECT_PLAN |
| 10 | University search and frontend | 🟡 Frontend built on sample data | `frontend/`: 12 screens, merit engine + tests. Needs the API (Phases 6–9) for real data |
| 11–19 | — | ⚪ Not started | See PROJECT_PLAN |

Legend: ✅ done · 🟡 in progress / awaiting approval · ⚪ not started · 🔴 blocked

---

## Phase 0 report (19 Nov 2026)

### Completed

- Inspected the workspace. The repository was **empty** (no commits) on branch `claude/funny-hopper-wrc0ai`.
- Created the documentation set:
  - `docs/REQUIREMENTS.md` (PRD)
  - `docs/PROJECT_PLAN.md`
  - `docs/SYSTEM_ARCHITECTURE.md`
  - `docs/DATABASE_DESIGN.md`
  - `docs/API_DOCUMENTATION.md` (planned)
  - `docs/DATA_COLLECTION_STRATEGY.md`
  - `docs/TESTING_PLAN.md`
  - `docs/DEPLOYMENT_GUIDE.md` (planned)
  - `docs/DEVELOPMENT_PROGRESS.md`
  - `CHANGELOG.md`
  - `README.md`
  - `docs/research/OFFICIAL_SOURCES_RESEARCH.md`
  - `docs/research/COMPETITOR_ANALYSIS.md`
- **Research** (19 Nov 2026):
  - Live-read official pages: UHS 2025-26 prospectus, PU 2026-27 admission guidelines, FAST eligibility criteria, GIKI eligibility criteria, IBCC conversion table, HEC recognised universities and campuses lists, UET homepage (admissions host).
  - Search-index evidence (official domains, not live-confirmed): NUST, UET prospectus, PMDC regulations, COMSATS, PIEAS, PEC, accreditation bodies, scholarships, test bodies.
  - Competitor: eduvision.edu.pk navigation, sitemap patterns and calculator pages (live).
- **Verified a golden test case** for the merit engine from the official UHS worked example: 93.6033 requires component-level rounding; without it the result is 93.6030. Recomputed with exact decimals.

- Produced a **plain-language Word version** of the whole plan for non-technical readers: `docs/Sccuni_Complete_Plan_Simple.docx` (21 pages, 4 diagrams in `docs/assets/`). It was rendered and checked page by page, and it passes the Word file validation.

### Limitations (stated explicitly)

1. **The Sccuni Project Proposal PDF was not available.** It was not in the repo or the uploads folder. All planning is based on the master instruction.
2. **The network was initially blocked** for all research hosts. A personal cloud environment "Sccuni" was created (with founder approval via the platform prompt), allowing 20 research hosts. It applies to future sessions on this repository.
3. **Bot protection:** NUST, PEC, COMSATS, mastersportal, findamasters and universityguru return Cloudflare challenges to automated clients. These were not circumvented. Their findings are index-only or prior-knowledge only, and labelled as such.
4. The research figures are **design evidence, not production data**. They must be re-collected and verified through the data workflow.

### Decisions awaiting the founder

See the Phase 0 summary in chat and REQUIREMENTS §9.2:
- approve the stack;
- launch cohort;
- data team;
- MVP business model;
- Urdu timing;
- brand/domain;
- budget;
- initial SAFE/TARGET/REACH thresholds (needed by Phase 15).

### Phase 5 design prototype (20 Nov 2026)

- Built at the founder's request ahead of plan approval, as a design-only deliverable (no application code).
- Canvas: https://claude.ai/artifact/WfsSxNW1nMwyKLkPw5xdR1 — 12 desktop pages, design system page, 2 mobile screens; working interactions (calculator, filters, Best Fit tabs, compare, reminders, admin approval checklist).
- **Not yet visually QA'd** by rendering or screenshots; the founder's review comes first. Responsive behaviour is built in but should be checked on a real phone during review.

### Frontend build (20 Nov 2026)

**Built** in `frontend/` with Next.js 16, React 19, TypeScript and Tailwind CSS 4 (the stack in SYSTEM_ARCHITECTURE):
- 12 screens as real routes: home, program search, program detail, university profile, merit calculator, Best Fit, compare, admission calendar, scholarships, sign-in, student dashboard, admin verification queue. Plus 404, sitemap, robots, favicon and Open Graph image.
- The founder's logo in four variants; palette taken from the logo.
- A real **merit engine** (`src/lib/merit/engine.ts`): formulas are data, exact decimal maths, component and final rounding, "what test score do I need", SAFE/TARGET/REACH grouping.

**Tested (results, not claims):**

| Check | Result |
|---|---|
| `pnpm test` | 11 of 11 pass, including the official UHS 2025-26 example (93.6033 with component rounding; 93.6030 without) |
| `pnpm lint` | No errors or warnings |
| `pnpm typecheck` | No errors (strict mode) |
| `pnpm build` | Succeeds; 41 pages generated |
| Screenshots of every route at 1440 px and 390 px | No browser console errors; no sideways scrolling |
| Colour contrast of the palette | All text pairs ≥ 4.5:1 (see DESIGN_SYSTEM §2.1) |

**Known limitations:**
1. **All data is fictional sample data** (6 made-up universities, 15 programs). A note in the footer says so. A top banner said so until 22 Nov 2026; it was removed at the founder's request.
2. Sign-in, saving, reminders, inquiries, compare and admin approval work only in the browser (no backend). Nothing is stored.
3. Unknown program or university URLs show the 404 page with `noindex`, but the HTTP status is 200, because Cache Components streams the page before `notFound()` runs. To fix with the API phase (for example, with a proxy check or a different rendering mode for those routes).
4. Not yet tested: keyboard-only and screen-reader passes, Lighthouse budgets, real phones, end-to-end tests. These belong to Phase 18.
5. SAFE/TARGET/REACH thresholds (+2 / −1.5 / −4) are placeholders until the founder decides them.

### Design refresh: premium minimal (21 Nov 2026)

**Done** at the founder's request (the home page and some pages still felt simple):
- New home page: centred hero, command-bar search, framed Best Fit preview, alternating feature rows, standards block and a centred final call to action.
- New shared `PageHeader` for Programs, Merit calculator, Compare, Calendar, Scholarships and Best Fit. Program and university pages got the same treatment.
- Pill navigation and pill buttons; hairline rings instead of grey borders on cards.
- Fixed two development-mode warnings:
  - the header read the URL outside `<Suspense>`;
  - program and university pages read `params` outside `<Suspense>`.

  Both now stream behind a skeleton, so the page shell shows instantly.
- Fixed a mobile layout bug found during the check: a feature row was wider than the screen.

**Tested:**

| Check | Result |
|---|---|
| `pnpm test` | 11 of 11 pass |
| `pnpm lint` and `pnpm typecheck` | No errors |
| `pnpm build` | Succeeds; 41 pages |
| Every route at 1440 px and 390 px (production server) | No console errors; no sideways scrolling |

**Interactive hero background (21 Nov 2026):** a WebGL background that follows the cursor (aurora light, glowing grid, parallax).

| Check | Result |
|---|---|
| WebGL starts in Chromium | Yes |
| Cursor tracking | The glow follows the cursor and fades out when the cursor leaves the hero |
| Reduced motion | One static frame; no cursor reaction |
| Console errors | None |
| Text contrast over the background (worst case, cursor on the text) | White ≥ 10.7:1; subtitle ≥ 5.9:1; headline green 2.9:1 at worst, just below the 3:1 large-text target |
| Smoothness | Headless test machine without a GPU (software rendering): 13 frames per second. Not yet measured on real phones or laptops with a GPU; to check during Phase 18 |

**Silk hero, second version (21 Nov 2026).** Built from the founder's reference video:
- a rounded hero card with WebGL silk that reacts to the cursor;
- a search box that types example searches;
- a moving strip of official source types.

| Check | Result |
|---|---|
| WebGL starts; console errors | Yes; none |
| Reduced motion | Static silk, no typing, strip still |
| Text contrast (worst case over time and cursor positions) | All text meets WCAG AA (details in DESIGN_SYSTEM §8a) |
| Smoothness on the test machine without a GPU | About 35 frames per second (the first version managed 13) |
| Mobile (390 px) | No sideways scrolling; no console errors |
| Demo video | Recorded for the founder (not committed) |

**Header and colour update (21 Nov 2026).** At the founder's request:
- The silk is back to the original navy and green.
- The hero now touches the header, with no gap.
- The header has a premium look: transparent at the top, then a floating glass capsule once you scroll.

| Check | Result |
|---|---|
| All routes at 1440 px and 390 px | No console errors; no sideways scrolling |
| Contrast over the silk | All text passes; see DESIGN_SYSTEM §8a |

**Fix: silk appeared late (21 Nov 2026).** The silk is now a poster image that shows before JavaScript loads; the canvas fades in on the same frame. The header colours are now set by CSS, so they are right on the first paint.

| Check | Result |
|---|---|
| JavaScript disabled | Silk poster, white logo and header shown |
| Scripts delayed by 4 s | Silk and header correct at 1.2 s |
| Timeline on the local production server | Plain navy before 150 ms; silk by 300 ms; poster request done in about 25 ms |
| Poster vs canvas first frame | Colour difference at most about 12/255 |
| All routes, desktop and mobile | No console errors; no sideways scrolling; 11/11 unit tests pass |

**Silk across the site (21 Nov 2026).** Redesigned these home sections:
- How it works;
- Popular this season;
- Explore;
- Closing soon;
- Our promise.

All inner page headers moved onto the silk (see DESIGN_SYSTEM §8b).

| Check | Result |
|---|---|
| Lint, typecheck, build, 11 unit tests | Pass |
| Console errors (all routes) | None |
| Sideways scrolling, desktop and mobile | None. A stricter check, element by element, also passes: it found that "Closing soon" was wider than a phone screen; fixed |
| Header text contrast over silk | White ≥ 10.2:1; `ink-200` ≥ 7.9:1 |

**Light silk corners and clearer sections (21 Nov 2026).** Founder feedback addressed:
- The silk is now only in the corners and in light tones.
- "Popular this season" and "Explore" now explain themselves.
- Cut-off descenders are fixed everywhere.
- The double logo in the navbar on light pages is fixed.

| Check | Result |
|---|---|
| Headings with descenders on the home page | Captured and checked: "y", "g" and "p" are complete |
| `/programs?field=engineering`, `/programs?q=Lahore` | 4 and 6 programs, with the matching chip active |
| Dark text over light silk | Titles ≥ 11.8:1; descriptions ≥ 5.1:1 |
| All routes, desktop and mobile | No console errors; no sideways scrolling (page-level and element-level checks) |
| Lint, typecheck, build, 11 unit tests | Pass |

**Correction (21 Nov 2026).** The founder clarified that the "lighter, at the edges" request was about the home hero, not the page headers.

What changed:
- The light silk corners were reverted. Inner headers, "Our promise" and the calculator card are back on dark silk.
- The hero's dark navy is now lighter in the middle and stays at the edges.
- Kept from the last round:
  - the clearer Popular and Explore sections;
  - the descender fix;
  - the double-logo fix;
  - the `?field=` and `?q=` filters.
- The light floating navbar is now more opaque, so it is visible over white content.

| Check | Result |
|---|---|
| Hero text contrast with the lighter middle | All text passes. Small texts got a navy wash or a lighter colour |
| Inner silk headers | White ≥ 9.5:1; `ink-200` ≥ 7.4:1 |
| Navbar at the top and after scrolling (home, Programs, program page) | Visible on all |
| All routes | No console errors; no sideways scrolling; 11/11 tests pass |

**Greener hero (21 Nov 2026).** At the founder's request:
- The hero silk is now mostly emerald green; navy shows only at the far edges.
- The poster was regenerated to match.
- The headline's mint gradient is lighter, so it stands out on green.

| Check | Result |
|---|---|
| Hero text contrast, measured | All pass. The subtitle is the tightest at 4.9:1 |
| Inner headers | White ≥ 8.2:1 |
| Console errors | None |

**Styled dropdowns (22 Nov 2026).** All six native dropdowns were replaced by an accessible, styled Select (see DESIGN_SYSTEM §8c). The Programs city filter and the calendar city and field filters now actually filter.

| Check (browser test) | Result |
|---|---|
| Mouse: open, choose | Works; the menu closes and keeps the value |
| Keyboard | Arrow Down twice + Enter → Rawalpindi. Typing "l" → Lahore. Escape closes without changing the value |
| Programs header | Menu extends past the header (not clipped). City Lahore → 15 to 6 programs. Sort works |
| Calculator | Switching program changes the aggregate (86.8636% → 88.1445%) |
| Calendar | 12 events → Lahore 8 → Lahore + Medicine 7 |
| Phone (390 px) | Tap to open and choose works; the menu opens upwards when needed |
| Console errors, sideways scrolling, unit tests | None, none, 11/11 |

**Top banner removed (22 Nov 2026).** At the founder's request, the "Design prototype…" bar was removed from all pages (site, account, admin). The sample-data notice now sits in the footer, in line with the rule "never present sample data as real".

| Check | Result |
|---|---|
| Home, Programs, Sign-in, Dashboard, Admin | No banner; the pages start at the top |
| Footer | Shows the note |
| Console errors | None |

**Sign-in page redesign (22 Nov 2026).** Second version, after founder feedback: a floating card on full-page silk (see DESIGN_SYSTEM §8d). The same browser checks were run again and all pass.

| Check (browser test) | Result |
|---|---|
| Password "Admission2027" | Strength shows "Good" |
| Under-18 switch | Shows the guardian email field |
| Switching to Sign in | Heading changes to "Welcome back"; "Forgot password?" and "Keep me signed in" show |
| Phone (390 px) | Silk band on top, form below; no sideways scrolling |
| Console errors, lint, typecheck, build | None, clean, clean, passes |

**Still open:** unknown program/university URLs still return HTTP 200 with the 404 page (see limitation 3 above).

### Next phase

**Phase 1 — Requirements and feature specification:**
- acceptance criteria for every MVP requirement;
- the RBAC permission matrix;
- page inventory;
- content and disclaimer copy list.

Phase 1 also includes issuing the **data templates v1** early, so data collection can begin in parallel (Plan adjustment A3).
