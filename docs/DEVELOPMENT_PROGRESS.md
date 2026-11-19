# Sccuni — Development Progress

- **Last updated:** 19 Nov 2026.
- **Current phase:** Phase 0 — Discovery and planning ✅ drafted, ⏳ **awaiting founder approval**.
- **Code status:** no application code exists yet (by design, until the plan is approved).

## Phase status

| Phase | Name | Status | Notes |
|---|---|---|---|
| 0 | Discovery and product planning | 🟡 Awaiting approval | Documentation set drafted (see below) |
| 1 | Requirements and feature specification | ⚪ Not started | Starts on approval |
| 2 | Competitor and market research | 🟡 Partially done | Eduvision live-checked; 3 international portals blocked automation (manual benchmark needed) |
| 3 | Data model and database architecture | 🟡 Logical design drafted | Physical Prisma schema after approval |
| 4 | Technical architecture | 🟡 Proposed | Stack recommendation awaiting approval |
| 5–19 | — | ⚪ Not started | See PROJECT_PLAN |

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

### Next phase

**Phase 1 — Requirements and feature specification:**
- acceptance criteria for every MVP requirement;
- the RBAC permission matrix;
- page inventory;
- content and disclaimer copy list.

Phase 1 also includes issuing the **data templates v1** early, so data collection can begin in parallel (Plan adjustment A3).
