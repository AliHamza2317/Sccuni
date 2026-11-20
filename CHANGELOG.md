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

No application code yet. Implementation begins after the founder approves the plan.
