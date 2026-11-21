# Sccuni — Design System and MVP Screens

- **Status:** v0.3 "premium minimal" refresh. The design is **built in code** in [`frontend/`](../frontend/README.md) (Next.js), using the founder's Sccuni logo and a palette taken from it.
- **Last updated:** 21 Nov 2026.
- **Source of truth:** the code. Tokens live in `frontend/src/app/globals.css`, components in `frontend/src/components/`.
- **Earlier design canvas (v0.1, superseded):** https://claude.ai/artifact/WfsSxNW1nMwyKLkPw5xdR1 — it still uses the older "Ink & Emerald" colours and the placeholder logo.
- **Related:** [REQUIREMENTS.md](./REQUIREMENTS.md) (MVP scope) · [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) §5.5 (rendering)

> **All universities, fees, merits and dates in the prototype are fictional samples.** Every screen carries a banner saying so. Real data enters only through the verification workflow.

---

## 1. Direction: "Navy & Emerald" (from the Sccuni logo)

A calm, premium, trustworthy look for high-stakes decisions. The colours come straight from the logo (navy cap, book and wordmark; green accents and dot):

- **Deep navy** for confidence and structure.
- **Emerald** for actions and progress.
- **Gold** only for attention.
- Generous white space, and one primary action per view.

**What makes it memorable:**
1. The **Merit Meter**: your aggregate (a dot) against past closing merits (ticks).
2. The **Source chip** on every important number.

**References:** used for ideas only, nothing copied.
- From mastersportal (functional patterns): the big search hero, faceted filters and key-fact blocks.
- From eduvision: the idea of a calculator and an admissions listing.
- The layout, look and components are original.

**Principles:**

| Principle | Meaning |
|---|---|
| Trust first | A source and a date on every important number |
| Show the working | Formulas, weights and rounding are always visible |
| Calm clarity | Generous space, one primary action, no clutter |
| Mobile first | Designed for 360 px phones on mobile data |

## 2. Tokens

### 2.1 Colour

Tailwind names in brackets (for example `bg-brand-600`, `text-ink-500`).

| Token | Hex | Use |
|---|---|---|
| ink 950 / 900 / 800 / 700 / 500 / 400 / 300 / 200 / 100 / 50 | #000F24 / **#001A3A** / #0B2A52 / #1F3A63 / #5A6B86 / #8A97AD / #B8C2D3 / #DCE3EE / #EDF1F7 / #F6F8FB | Navy from the logo (900). Text, dark surfaces, borders. 500 is the lightest allowed for body text on light backgrounds |
| paper / surface | #F5F7FA / #FFFFFF | Page and card backgrounds |
| brand 800 / 700 / 600 / 500 / 400 / 100 / 50 | #004F41 / #006653 / #007E67 / **#00987C** / #2DBA98 / #D9F5EE / #EEFAF6 | Green from the logo (500). Primary buttons (600), links (700), accents on dark (400), tints |
| gold 700 / 500 / 100 / 50 | #8A5A0B / #E9A23B / #FDF0D8 / #FFF8EA | Attention only: deadlines soon, warnings |
| danger | #B4232F on #FDECEE | Errors, rejected, closed |
| safe | #006653 on #DCF5EC | SAFE group |
| target | #2238A8 on #E6EBFD | TARGET group |
| reach | #B03A0A on #FDEBDF | REACH group |

- **Why buttons use brand-600, not the logo green (500):** white text on #00987C is only about 3.6:1. On #007E67 it is 5.0:1, which passes WCAG AA.
- Measured contrast (20 Nov 2026): white on brand-600 5.02 · brand-700 on white 6.94 · ink-500 on white 5.41, on paper 5.04 · safe 6.05 · target 8.03 · reach 5.25 · ink-400 on ink-900 5.88 · brand-400 on ink-900 7.10. All are ≥ 4.5:1.
- SAFE / TARGET / REACH differ in lightness as well as hue (green, blue, orange rather than green/red), and always carry a text label.

### 2.1a Logo

| File (`frontend/public/brand/`) | Use |
|---|---|
| `sccuni-logo.png` | Full logo on light backgrounds (header on light pages, sign-in) |
| `sccuni-logo-white.png` | Full logo on navy backgrounds (dark header, footer, admin). The navy parts become white; the green stays green |
| `sccuni-mark.png` / `sccuni-mark-white.png` | Icon only (cap + magnifier + book): app sidebar, small spaces |

- The favicon, Apple touch icon and Open Graph image are generated from the logo (`frontend/src/app/icon.png`, `apple-icon.png`, `opengraph-image.png`).
- Recommended minimum height: 32 px for the full logo (the header uses 40–44 px). Leave empty space around it.
- Never recolour, stretch, add effects to, or place the logo on busy photos.

### 2.2 Typography

| Role | Font | Size / weight |
|---|---|---|
| Display | Plus Jakarta Sans | clamp(40–70 px) / 800, tracking −0.04em |
| H1 | Plus Jakarta Sans | clamp(32–48 px) / 800 |
| H2 | Plus Jakarta Sans | clamp(26–38 px) / 800 |
| H3 | Plus Jakarta Sans | 20 px / 700 |
| Body | Inter | 16 px / 400, line-height 1.55 |
| Fonts are self-hosted | `@fontsource-variable/inter` and `@fontsource-variable/plus-jakarta-sans` | No request to Google at runtime (faster on mobile data, better privacy) |
| Small / caption | Inter | 14 px / 12.5 px |
| Numbers | Tabular figures everywhere | Aggregates in Jakarta 800 |

### 2.3 Shape, depth, spacing

- **Radius:**
  - 10 px: small elements
  - 14 px: inputs and buttons
  - 20 px: cards
  - 28 px: feature panels
  - pills: 999 px
- **Shadows (four levels):**
  - xs: buttons
  - sm: resting cards
  - md: hover
  - lg: floating trays
  - All are tinted with ink, never pure black.
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **Layout:** max width 1240 px, 28 px gutters.
- **Motion:**
  - one orchestrated rise-in on the hero, plus hover lifts;
  - everything is disabled under `prefers-reduced-motion`.

## 3. Components

| Group | Components |
|---|---|
| Navigation | Glass header (light and dark), mobile menu, breadcrumb, sticky in-page tabs, app sidebar (light for students, dark for admin), phone tab bar |
| Actions | Buttons: primary, dark, light, ghost, on-dark, danger; sizes 54 / 44 / 36 px |
| Labels | Chip (default, active, on-dark), tag (neutral, emerald, gold, blue, danger), group pills (Safe, Target, Reach, No data), Verified badge, Outdated badge, admission status dots |
| Forms | Input, select, "obtained out of total" pair, segmented control, checkbox, switch, range slider, inline validation notice |
| Data | Result card, key-fact grid, grid-based tables (horizontal scroll on phones), compare grid, calendar month grid, timeline, KPI tile, progress bar |
| Signature | **Merit Meter**, **Source chip**, date tile, university monogram (used until logo permission exists), weight bar (formula split) |
| Page structure (v0.3) | `PageHeader` (light or dark top section for inner pages), `SectionHeading` + `Eyebrow` (pill label with a dot), `ProductWindow` (framed app preview on the home page), `DetailSkeleton` (loading state) |
| Feedback | Neutral and gold notices (no left-border accents, no gradients behind text), empty state, success state |

## 4. MVP screens in the canvas

| # | Screen | Requirement IDs it covers | Interactive in the prototype |
|---|---|---|---|
| 1 | Home | DISC, SEO landing, trust messaging | Search tabs, mobile menu |
| 2 | Program search | DISC-01…17 | Field chips, sector, fee slider, open-now, sorting, save, compare tray, empty state |
| 3 | Program detail | PROG-01…12, HIST, FEE | Formula by route (FSc / A-Level / DAE), merits by category, save, reminders |
| 4 | Merit calculator | MERIT-03…14, 17 | Live aggregate, Part-I vs full, program switch changes the formula, validation, "what score do I need?" |
| 5 | Best Fit Finder | FIT-01…09 | Safe / Target / Reach / No-data tabs, not-eligible reasons |
| 6 | Compare | DISC-15 | Remove columns, highlight the best, share |
| 7 | University profile | UNI-01…10, REP-01 | Program filter, HEC campus status, consent-gated inquiry form |
| 8 | Admission calendar | ADM-01…08 | Type filters, reminder switches |
| 9 | Scholarships | SCH-01, 02, 04 | Type filters, open-now, save |
| 10 | Sign in / create account | ACC-01, ACC-09 | Mode switch, show password, under-18 guardian flow |
| 11 | Student dashboard | ACC-03…10 | Mark updates read |
| 12 | Admin · verification queue | DATA-05…08, ADMIN 15 | Select a change request, reviewer checklist gates "Approve & publish" (four-eyes) |
| 13 | Design system | — | — |
| 14–15 | Mobile: Home, Your result | Mobile-first proof | Navigation |

All desktop screens are fluid pages. Grids collapse to one column, menus stack, and wide tables scroll inside their own box on phones.

## 5. Accessibility rules carried into development

- Real `button`, `a`, `input` and `label` elements.
- `aria-label` on icon-only buttons; decorative SVGs marked `aria-hidden`.
- Touch targets ≥ 44 px.
- Focus ring: 3 px emerald, offset 2 px.
- Group colours always paired with text.
- Charts have table equivalents.
- Live results announced with `aria-live="polite"`.

## 6. Content voice

| Do | Don't |
|---|---|
| "Past merit is a guide, not a guarantee." | "You will get admission here." |
| "87.41% · final list · open merit · 2025" | "Last merit: 87" |
| "Not eligible: requires FSc Pre-Medical." | "Sorry, you can't apply." |
| "Formula not yet verified for Fall 2027." | Silently showing last year's formula |

## 7. Open design decisions for the founder

1. ~~**Brand:** is there an existing logo to adopt?~~ **Resolved 20 Nov 2026:** the founder's Sccuni logo is adopted and the palette now comes from it. Still open: the domain name and a vector (SVG) master of the logo, which would give sharper rendering than PNG.
2. **Hero headline and tone:** the current line is "Know where you'll get admission — before you apply."
3. **Recommendation thresholds** shown in Best Fit: the prototype uses ±2.00 / −1.50 / −4.00 only as **placeholders** (REQUIREMENTS FIT-03).
4. **Urdu UI** (Release 2): the layout must support RTL, so mirroring rules will be added when Urdu starts.

## 8. Design upgrades in the coded version (v0.2)

- **Hero:** dark navy with soft moving light ("aurora"), a fine grid, and a glass result card that shows a live Merit Meter, with floating "SAFE" and "deadline" cards.
- **Depth:** a five-step shadow scale (xs, soft, lift, float, glow) and gradient hairline borders (`.ring-gradient`) on premium cards.
- **Bento feature grid**, featured programs, fields, cities and "closing soon" sections on the home page.
- **Gentle motion:** sections rise in as you scroll; cards lift on hover. All motion turns off under `prefers-reduced-motion`.
- **Merit Meter:** year labels move to a second row when ticks are close, so they never overlap on phones.
- **Checked on screens:** every route was screenshotted at 1440 px and 390 px wide: no console errors and no sideways scrolling.

## 8a. Premium minimal refresh (v0.3, 21 Nov 2026)

The founder said the home page and some pages still felt simple. The refresh keeps the same colours and makes everything calmer and more refined:

| Area | Before | After |
|---|---|---|
| Home hero | Text on the left, card on the right, floating chips | Centred hero: one big two-line headline (white, then a green gradient), one short sentence, one search bar |
| Hero background | Dotted grid and colour blobs | A soft light from the top, a fine line grid that fades out, light film grain, and a curved bottom edge |
| Product preview | Small glass card | A large framed "app window" of Best Fit that overlaps the hero and the page below |
| Search | Tabs + three boxes | One pill-shaped command bar: what, where, Search |
| Navigation | Plain links | Links inside one pill; short labels (Programs, Merit calculator, Best Fit, Calendar, Scholarships) |
| Buttons | Rounded rectangles | Full pills, with a soft top highlight |
| Cards | Grey borders | Hairline rings and soft shadows |
| Home sections | Many coloured boxes | Fewer sections: three alternating feature rows, a 3-step strip, featured programs, fields + cities, closing soon, a dark "promise" block with four standards, and a centred final call to action |
| Inner pages | Plain white title bands | One shared `PageHeader`: soft green/blue light, fine grid, pill eyebrow, large gradient title |

**Interactive hero background (added 21 Nov 2026).** Code: `frontend/src/components/home/hero-background.tsx`.

| Layer | Behaviour |
|---|---|
| WebGL aurora | Navy, emerald and a little blue light that drifts slowly. Near the cursor the light bends gently and a soft mint glow appears |
| Line grid | Moves a few pixels opposite the cursor (parallax). Around the cursor the same grid lines light up in mint |
| Fallback | Without WebGL, the earlier CSS glows stay and the grid and cursor spotlight still react |

**Accessibility and performance rules:**
- Text never moves.
- Under `prefers-reduced-motion` the aurora is drawn once and does not follow the cursor.
- The animation pauses when the hero is off screen or the tab is hidden.
- At most 450,000 pixels are shaded per frame (reduced resolution; the image is soft, so this is not visible).
- Measured text contrast over the moving background, with the cursor on the text: white ≥ 10.7:1 and the subtitle grey ≥ 5.9:1. The darkest green of the headline gradient measured 2.9:1 at worst. That is just below the 3:1 target for large text, so this needs a fix.

**Rules kept:**
- One primary action per view.
- Sample data stays labelled. The "Sample" tag is also shown in the product window.
- The four numbers in the promise block (2 people verify, 0 paid placements, 100% sourced, 1 profile) are **product standards from the plan**, not usage statistics.
- All new text colours were checked against the palette's contrast pairs.

## 9. Handover to development

**Done (20 Nov 2026):** the screens are Next.js routes in `frontend/src/app`, the tokens are Tailwind v4 `@theme` variables, and the components are in `frontend/src/components`.

**Still to do:**
- When the monorepo is set up (ADR-001), move tokens and components to `packages/ui` and the engine to `packages/merit-engine`.
- Use Radix primitives for the complex widgets (select, dialog, menu) when they are added.
- The sample logic (grouping thresholds, first-year cost estimate) is **illustrative only**. The merit engine itself is real and tested (`frontend/src/lib/merit/engine.test.ts`, including the official UHS golden case).
