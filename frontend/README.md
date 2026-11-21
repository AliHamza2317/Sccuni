# Sccuni — Frontend (web app)

The public website, student dashboard and admin console for Sccuni, built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4**, as planned in [`docs/SYSTEM_ARCHITECTURE.md`](../docs/SYSTEM_ARCHITECTURE.md).

> **Status: design-quality prototype.** Every page reads from a typed data layer (`src/lib/data`) that currently returns **fictional SAMPLE data**. A banner on every page says so. When the backend API exists, only `src/lib/data/index.ts` changes; pages and components stay the same.

## Run it

```bash
pnpm install
```

```bash
pnpm dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `pnpm dev` | Development server with hot reload |
| `pnpm build` then `pnpm start` | Production build and server |
| `pnpm test` | Merit-engine unit tests (Vitest), including the official UHS 2025-26 worked example |
| `pnpm lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | Route type generation + TypeScript strict check |

## Pages

| Route | Screen |
|---|---|
| `/` | Home: hero search, live result preview, features, fields, cities, deadlines |
| `/programs` | Program search with filters, sorting, save and a compare tray |
| `/programs/[slug]` | Program detail: eligibility, formula, past merits, fees, dates, how to apply |
| `/universities/[slug]` | University profile with HEC campus status and an inquiry form |
| `/merit-calculator` | Live calculator using the shared merit engine |
| `/best-fit` | Best Fit Finder: Safe / Target / Reach / No data, not-eligible reasons |
| `/compare` | Side-by-side comparison with "best in row" highlights |
| `/admissions-calendar` | Month and list views, filters, reminder switches |
| `/scholarships` | Scholarship directory |
| `/sign-in` | Sign in / create account (with the under-18 guardian flow) |
| `/dashboard` | Student dashboard |
| `/admin/verification` | Admin verification queue (four-eyes approval) |

`sitemap.xml`, `robots.txt`, the favicon and the Open Graph image are generated from `src/app`.

## Structure

```
src/
  app/
    (site)/        public pages with header and footer
    (account)/     sign-in and student dashboard
    admin/         admin console (noindex)
    globals.css    design tokens (Tailwind @theme) derived from the Sccuni logo
  components/
    ui/            Button, badges (Tag, GroupPill, Verified, SourceChip, Monogram, DateTile), controls, MeritMeter
    site/          Header, footer, logo
    home/ programs/ merit/ calendar/ account/   feature components
  lib/
    merit/engine.ts   configurable merit engine (decimal.js) + tests
    data/             data access layer (SAMPLE data today)
    types.ts          domain types
public/brand/       logo variants (full, white-on-navy, mark)
```

## Rules for contributors

- **Never hard-code a university formula.** Formulas are data (`Formula` in `src/lib/types.ts`) evaluated by `src/lib/merit/engine.ts`.
- **Never present sample data as real.** Keep the prototype banner until real, verified data is connected.
- Keep each page responsive down to 360 px; check with `pnpm build && pnpm start`.
- **Header colours:** if a page's top section is navy, add `data-header-theme="dark"` to it. The header then switches to its light-on-dark style using CSS alone (the `on-dark:` variant in `globals.css`), so it is right on the first paint.
- **Silk images:**
  - `src/components/home/silk-poster.webp` is the first frame of the WebGL silk. It shows before JavaScript loads.
  - `src/components/site/silk-light.webp` is the same frame in light tones, used for the corner accents (`SilkCorners`).

  Both come from the shader. If you change the shader, `POSTER_ASPECT` or `POSTER_TIME` in `src/components/home/hero-background.tsx`, regenerate them. Run this from `frontend/`; it needs Playwright with Chromium:

  ```bash
  NODE_PATH="$(npm root -g)" node scripts/render-silk-poster.mjs
  ```
- **Gradient text:** use the `.text-gradient-*` classes in `globals.css`; they leave room for descenders. Do not add `background-clip: text` by hand.
- **Program list links:** `/programs?field=<computing|engineering|medicine|business>` and `/programs?q=<text>` open the list already filtered.
- Next.js 16 has breaking changes. Read `node_modules/next/dist/docs/` before using an unfamiliar API (see `AGENTS.md`). This app uses **Cache Components**: dynamic routes need `generateStaticParams`.
