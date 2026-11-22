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

### Fixed — 2026-11-22 (blank hero after navigating back)

- The hero silk creates a fresh canvas on each mount and removes it on cleanup. Reusing one canvas after releasing its WebGL context left a blank canvas over the hero when you came back from another page (and in React Strict Mode). A lost context also falls back to the poster.
- In search bars, the dropdown chevron sits right after the text ("Any city ⌄"). The city boxes are slightly narrower.

### Changed — 2026-11-22 (sign-in page, closer to the mockup)

- Background: a light mist on the right behind the card, a deep-teal shade on the left that fades before the building, a soft shade behind the headline, and a large glowing emerald arc. The cap and books stay bright.
- Mockup-style logo: an all-teal mark (`public/brand/sccuni-mark-teal.png`) with "Sccuni" in medium weight. Semibold headline; teal glass feature bar with "Get Expert Guidance"; dark "Back to home".
- Larger card (562 px) with 56 px pill inputs, a 44 px heading and a bigger gradient button; compact toggle on phones.

### Changed — 2026-11-22 (sign-in page to the founder's mockup)

- New design to the founder's mockup, on the founder's campus artwork. The logo and tagline baked into the artwork were removed with `frontend/scripts/clean-sign-in-background.py` and are now live text.
- Left side:
  - headline with "saved" in green;
  - subtitle;
  - glass feature bar linking to Programs, Merit calculator and Best Fit;
  - the tagline "Build a brighter future" in Sacramento (`@fontsource/sacramento`).
- Right side, on a frosted card:
  - icon switch with a sliding dark-green pill;
  - "Welcome back 👋";
  - pill inputs;
  - dark-green gradient button;
  - Google and Apple buttons.
- "Get Expert Guidance" from the mockup reads "Find Your Best Fit" (no expert-guidance service exists). The Apple button needs a plan decision.

### Changed — 2026-11-22 (sign-in page, second version)

- The live green silk now fills the whole sign-in page, and the form sits on a floating white card with a glass layer behind it.
- Sliding mode switch; gentle fade when switching modes; green gradient submit button.
- Glass trust pills below the card.

### Changed — 2026-11-22 (sign-in page redesign)

- The sign-in / create-account page has a live green silk panel, with small glass previews of the Best Fit list and a reminder.
- New form design:
  - pill mode switch;
  - Google button with the real "G" mark;
  - icon inputs with a green focus state;
  - password strength meter;
  - an under-18 switch that reveals the guardian email;
  - navy pill submit button;
  - "Back to home" link.
- On phones, the silk becomes a compact band above the form.

### Changed — 2026-11-22 (top banner removed)

- Removed the "Design prototype…" top bar from all pages (founder's request).
- The sample-data notice now sits in the site footer: "Prototype: universities, fees and merit figures on this site are sample data, not real."

### Added — 2026-11-22 (styled dropdowns)

- `Select`: an accessible, styled dropdown (WAI-ARIA select-only combobox, type-ahead, portal menu that never gets clipped and flips upwards). It replaces all six native `<select>` elements: hero city, Programs city and sort, calculator program, and calendar city and field.
- The Programs city filter and the calendar city and field filters now filter. The hero search opens the program list searched by the typed text or the chosen city.

### Changed — 2026-11-21 (greener hero)

- Hero silk is now mostly emerald green; deep navy appears only at the far edges. The poster was regenerated; inner headers use it too.
- The headline's mint gradient is lighter (darkest stop `#8FE3CB`) for contrast on green.

### Changed — 2026-11-21 (hero lighter in the middle; dark silk headers restored)

- Home hero: the darkest navy stays at the edges. The shadows lift towards the middle and the shade behind the headline was reduced. The poster was regenerated to match.
- Reverted the light silk corners: inner page headers, "Our promise" and the calculator card are on dark silk again. Removed `SilkCorners` and `silk-light.webp`.
- Kept the clearer Popular and Explore sections, the descender fix, the double-logo fix and the URL filters.
- Hero small texts (badge, chips, strip, subtitle) have a navy wash or a lighter colour, for contrast over the lighter middle.
- The light floating navbar is more opaque, so it stays visible over white content.

### Changed — 2026-11-21 (light silk corners, clearer sections)

- Every page header except the home hero, and the "Our promise" section, are now light: white backgrounds with the silk only in two corners. This uses `SilkCorners` and `silk-light.webp`, a light-toned version generated from the shader. The calculator result card is light too.
- "Popular this season" cards explain themselves:
  - closing merit with year and list;
  - trend since the first year;
  - a chart with year labels;
  - fee, last date and entry test;
  - "View program" and "Check my chances".
- "Explore" became eight clear field cards with program counts or "Coming soon". The links open the program list already filtered (`?field=`, `?q=`).
- Fixed cut-off descenders in gradient headings. Fixed the double logo in the navbar on light pages.

### Changed — 2026-11-21 (silk across the site)

- `SilkBackdrop`: the hero's silk as a still, slowly drifting background.
- Inner page headers (Programs, Merit calculator, Best Fit, Compare, Calendar, Scholarships, program and university pages) now use the silk, with large white titles and rounded bottom corners.
- Program and university "on this page" links are now a floating sticky pill (they used to stop sticking after the header). Best Fit tabs use the same pill.
- Calculator result card uses the silk.
- Home sections redesigned:
  - How it works: UI previews in each step;
  - Popular: silk cards with sparklines;
  - Explore: bento grid with city pills;
  - Closing soon: day strip and timeline;
  - Our promise: silk with glass stat cards.
- Fixed "Closing soon" overflowing on phones.

### Fixed — 2026-11-21 (silk appeared late)

- Hero shows a pre-rendered poster of the silk at once (high priority, inline blur placeholder). The WebGL canvas fades in on exactly the same frame, because the shader now crops like `object-fit: cover`. The poster is generated by `frontend/scripts/render-silk-poster.mjs`.
- Header colours are now set by CSS (`data-header-theme="dark"` plus the `on-dark:` variant), so they are right before JavaScript loads.
- Logo images are generated at display size, not 3840 px.
- Replaced the Next.js 16-deprecated `priority` prop with `preload`.

### Changed — 2026-11-21 (premium header, hero attached, navy-green silk)

- New header:
  - transparent over each page's first section at the top;
  - a floating glass capsule after scrolling (navy on dark pages, frosted white on light pages);
  - white or navy "Find my best fit" pill;
  - rounded mobile menu panel; Escape closes it.
- The home hero is full width and starts directly under the header, with no gap and rounded bottom corners.
- Silk colours back to the logo's navy and emerald (no royal blue). Headline gradient lightened to keep ≥ 3:1.
- First sections of all pages are padded for the floating header.

### Changed — 2026-11-21 (silk hero, based on the founder's reference video)

- The home hero is now a rounded card with a WebGL "silk" background (navy and royal blue, mint sheen) that reacts to the cursor; the home header is light.
- The search box types example searches (`HeroSearch`); a slow, endless strip lists official source types (`SourceMarquee`).
- Replaced the aurora, line grid and noise layers. Text colours on the hero were re-checked for contrast.
- Static under reduced motion; pauses off screen; 450k-pixel budget.

### Added — 2026-11-21 (interactive hero background)

- WebGL hero background (`HeroBackground`): a slow aurora in brand colours that bends and glows around the cursor; the line grid has parallax and lights up near the cursor.
- Falls back to CSS when WebGL is unavailable. Static under reduced motion. Pauses off screen. Limited to 450,000 shaded pixels per frame.
- Hero helper text raised to `ink-300` for contrast over the moving background.

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
