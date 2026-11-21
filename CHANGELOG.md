# Changelog

All notable changes to Sccuni are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions will follow [Semantic Versioning](https://semver.org/) once code ships.

## [Unreleased]

### Added — 2026-11-19 (Phase 0: Discovery and planning)

- Product Requirements Document (`docs/REQUIREMENTS.md`): vision, personas, journeys, functional requirements with priorities and releases, NFRs, gap analysis, risks, scope by release.
- Project plan with phases, dependency adjustments A1–A4, milestones and an indicative timeline (`docs/PROJECT_PLAN.md`).
- System architecture and stack recommendation, including the merit-engine design, verification/publish pipeline, rule resolution and SAFE/TARGET/REACH comparison rules (`docs/SYSTEM_ARCHITECTURE.md`).
- Logical database design with ERDs, table definitions, indexing, validation, migration and retention strategy (`docs/DATABASE_DESIGN.md`).
- Planned API surface (`docs/API_DOCUMENTATION.md`).
- Data collection and verification strategy (`docs/DATA_COLLECTION_STRATEGY.md`).
- Testing plan, including the first official golden test case (`docs/TESTING_PLAN.md`).
- Planned deployment guide and launch checklist (`docs/DEPLOYMENT_GUIDE.md`).
- Research evidence logs (`docs/research/`).
- Progress tracker (`docs/DEVELOPMENT_PROGRESS.md`) and README.

### Added — 2026-11-19 (plain-language plan)

- `docs/Sccuni_Complete_Plan_Simple.docx`: the whole plan in easy English for non-technical readers (21 pages): idea, MVP, architecture, merit calculator, SAFE/TARGET/REACH, data checking, phases, timeline, team, risks, decisions, glossary.
- Diagrams in `docs/assets/`: system architecture, student journey, data-checking flow, timeline.

### Added — 2026-11-20 (Phase 5: UI/UX design prototype)

- High-fidelity, clickable MVP design on a Design canvas: 12 desktop screens (home, search, program, calculator, Best Fit, compare, university, calendar, scholarships, sign-in, student dashboard, admin verification queue), a design-system page and 2 mobile screens. Sample data is fictional and labelled.
- `docs/DESIGN_SYSTEM.md`: direction ("Ink & Emerald"), tokens, components, screen inventory with requirement mapping, accessibility and content rules, open design decisions.

### Changed — 2026-11-21 (premium minimal design refresh)

- Home page redesigned:
  - centred hero with a gradient headline, a pill command-bar search, and a framed Best Fit preview over a curved hero edge;
  - alternating feature rows, a 3-step strip, a standards block and a centred call to action.
- New shared components: `PageHeader`, `SectionHeading`, `Eyebrow`, `ProductWindow`, `DetailSkeleton`.
- Inner pages use the new header. Pill navigation and pill buttons; hairline rings replace card borders.
- Header, program and university pages read the URL inside `<Suspense>` (fixes Cache Components dev warnings; the shell renders instantly).
- Fixed a feature row overflowing the screen on phones.
- `docs/DESIGN_SYSTEM.md` v0.3 and `docs/DEVELOPMENT_PROGRESS.md` updated.

### Added — 2026-11-20 (frontend code + brand)

- **`frontend/`**: the web app in Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4, with 12 screens as real routes (home, program search, program detail, university profile, merit calculator, Best Fit, compare, admission calendar, scholarships, sign-in, student dashboard, admin verification queue), plus 404, sitemap, robots, favicon and Open Graph image.
- **Merit engine** (`frontend/src/lib/merit/engine.ts`): formulas as data, exact decimal arithmetic (decimal.js), component and final rounding, required test score, SAFE/TARGET/REACH grouping. 11 unit tests, including the official UHS 2025-26 golden case.
- **Brand:** the founder's Sccuni logo (full, white, mark-only variants) and a palette taken from it (navy #001A3A, green #00987C; buttons use #007E67 for contrast).
- **Premium design upgrades:** aurora hero with a glass live-result card, bento feature grid, gradient hairline borders, shadow scale, scroll-reveal motion (off under reduced motion), self-hosted fonts.
- Sample data is fictional and labelled on every page.

### Changed — 2026-11-20

- `docs/DESIGN_SYSTEM.md` v0.2: logo-based palette with measured contrast, logo usage rules, handover status.
- `docs/SYSTEM_ARCHITECTURE.md` §4.0: the frontend currently lives in `frontend/` and maps to `apps/web` later.
- `docs/DEVELOPMENT_PROGRESS.md`: frontend build report with test results and known limitations.

No backend, database or real data yet. Those begin after the founder approves the plan.
