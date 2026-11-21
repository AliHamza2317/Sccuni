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
1. **All data is fictional sample data** (6 made-up universities, 15 programs). A banner on every page says so.
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

**Still open:** unknown program/university URLs still return HTTP 200 with the 404 page (see limitation 3 above).

### Next phase

**Phase 1 — Requirements and feature specification:**
- acceptance criteria for every MVP requirement;
- the RBAC permission matrix;
- page inventory;
- content and disclaimer copy list.

Phase 1 also includes issuing the **data templates v1** early, so data collection can begin in parallel (Plan adjustment A3).
