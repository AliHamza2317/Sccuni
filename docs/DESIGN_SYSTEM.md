# Sccuni — Design System and MVP Screens

- **Status:** v0.3 "premium minimal" refresh. The design is **built in code** in [`frontend/`](../frontend/README.md) (Next.js), using the founder's Sccuni logo and a palette taken from it.
- **Last updated:** 21 Nov 2026.
- **Source of truth:** the code. Tokens live in `frontend/src/app/globals.css`, components in `frontend/src/components/`.
- **Earlier design canvas (v0.1, superseded):** https://claude.ai/artifact/WfsSxNW1nMwyKLkPw5xdR1 — it still uses the older "Ink & Emerald" colours and the placeholder logo.
- **Related:** [REQUIREMENTS.md](./REQUIREMENTS.md) (MVP scope) · [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) §5.5 (rendering)

> **All universities, fees, merits and dates in the prototype are fictional samples.** A note in the site footer says so. The top banner was removed at the founder's request on 22 Nov 2026. Real data enters only through the verification workflow.

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
| Forms | Input, select, "obtained out of total" pair, segmented control, checkbox, switch, range slider, inline validation notice, **Select** (styled dropdown, `frontend/src/components/ui/select.tsx`) |
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

**Interactive "silk" hero (21 Nov 2026, second version).** The founder shared a reference video of a hero with flowing silk and a typing search box. We built the same kind of motion in Sccuni's own colours and content; no reference branding is used.

| Part | Behaviour | Code |
|---|---|---|
| Hero | Full width, starting at the very top of the page. The header floats on top of it (no gap). Rounded bottom corners | `frontend/src/app/(site)/page.tsx` |
| Silk background (WebGL) | Smooth satin folds in the logo colours: deep navy shadows and emerald-teal on the lit folds, with a faint mint sheen. They drift and change shape slowly. The light leans towards the cursor, and the cloth dips gently under it. (A royal-blue version was tried first; the founder chose the original navy and green) | `frontend/src/components/home/hero-background.tsx` |
| Typing search | The empty search box types example searches ("BS Computer Science in Lahore", "MBBS merit lists in Punjab"…), pauses, deletes, and moves on. It stops when the box is focused or has text | `frontend/src/components/home/hero-search.tsx` |
| Sources strip | An endless, slow strip of official source types (prospectuses, merit lists, HEC lists, fee schedules, IBCC rules…). It pauses on hover. These are source *types*, not partner logos, so we make no false claims | `frontend/src/components/home/source-marquee.tsx` |

**Accessibility and performance rules:**
- Text never moves.
- Under `prefers-reduced-motion`:
  - the silk is drawn once and does not follow the cursor;
  - the search shows one example without typing;
  - the strip stands still.
- Screen readers get a normal labelled search box. The typed example is decorative, and the strip's second copy is hidden.
- The animation pauses when the hero is off screen or the tab is hidden.
- At most 450,000 pixels are shaded per frame.
- Without WebGL, a still CSS gradient is shown.

**Measured text contrast over the moving navy silk.** Worst 2% of background pixels, across 6 moments and 3 cursor positions:

| Text | Contrast |
|---|---|
| White headline | ≥ 6.8:1 |
| Mint headline gradient, darkest stop `#5FD0B0` | ≥ 3.6:1 (large text) |
| Subtitle (`ink-200`) | ≥ 5.3:1 |
| Small labels (white) | ≥ 6.2:1 |
| Header links (white at 70%) | ≥ 7.3:1 |

**No more "plain first, silk later" (21 Nov 2026).** The founder noticed that the hero first showed a plain background, and the silk canvas appeared only some time later. The canvas waits for the page's JavaScript to load, and in development that takes seconds. The fix:

| Step | What happens |
|---|---|
| Poster image | A still image of the silk's first frame (`silk-poster.webp`, 30 KB, 1700×1000) is in the page HTML. It has an inline blurred placeholder and is fetched with high priority, so the silk shows before any JavaScript runs |
| Exact match | The shader crops to the poster's aspect ratio the way CSS `object-fit: cover` does, and starts at the poster's time. When the canvas fades in (0.5 s), it lands on the same frame: the colour difference is at most about 12/255 in the darkest areas |
| Re-creating the poster | Generated from the shader by `frontend/scripts/render-silk-poster.mjs` |
| Header | Its colours now come from CSS. A navy top section carries `data-header-theme="dark"`, and the `on-dark:` variant switches the header to light-on-dark. Before, the header briefly showed its light style (dark logo on navy) until JavaScript loaded |
| Logo | Images are now generated at display size (256/384 px wide instead of 3840 px), so they load fast |

**Header (21 Nov 2026).** Code: `frontend/src/components/site/header.tsx`.
- At the top of every page the header is transparent and sits on the page's first section. On dark pages it uses white text and a white "Find my best fit" pill; on light pages, dark text and a navy pill.
- Once you scroll, it turns into a floating glass capsule with rounded ends, a soft shadow and a slightly smaller logo: navy on dark pages, frosted white on light pages.
- On phones, the menu opens as a rounded panel under the capsule, with large tap targets. Escape closes it.
- Each page's first section is padded so its content starts below the header.

**Rules kept:**
- One primary action per view.
- Sample data stays labelled. The "Sample" tag is also shown in the product window.
- The four numbers in the promise block (2 people verify, 0 paid placements, 100% sourced, 1 profile) are **product standards from the plan**, not usage statistics.
- All new text colours were checked against the palette's contrast pairs.

## 8b. Silk on every page header, clearer home sections (21 Nov 2026)

**How we got here.** The founder asked for more premium inner pages and home sections, so the silk went onto every page header. Next, the founder said the dark shade should be lighter and stay at the edges. We misread that as "make the page headers light", tried light silk corners, and then reverted: the request was about the **home hero**.

**Final state:**

| Where | Design |
|---|---|
| Home hero | Live WebGL silk, **mostly emerald green** (founder's choice). Deep navy appears only at the far edges. The shade behind the headline is light, so no dark patch drifts across the text. The poster image was regenerated to match |
| Inner page headers (`PageHeader`), program and university pages | Dark silk: a still, slowly drifting poster (`SilkBackdrop`) with a readability shade, white type, rounded bottom corners |
| Home · Our promise, calculator result card | Dark silk, as above |
| Home · How it works, Closing soon | As designed in the earlier round (UI previews; two-week day strip with timeline) |
| Home · Popular this season | Plain white cards that explain themselves: closing merit with year and list, a trend badge, a chart with years, fee, last date, test, and "View program" / "Check my chances" |
| Home · Explore | Eight field cards with program counts or "Coming soon". The links open the program list already filtered (`?field=`, `?q=`) |
| Navbar | Transparent on dark headers at the top; a navy capsule after scrolling. On any light page, the capsule is a nearly opaque white with a stronger ring and shadow, so it stays visible over white content |

**Descenders.** Every `.text-gradient-*` class leaves room for "g", "y" and "p" (padding with a matching negative margin), so they are no longer cut off.

**Contrast (measured):**

| Where | Text | Contrast |
|---|---|---|
| Home hero, green silk (worst 2% of pixels over time and cursor positions) | White headline | ≥ 4.9:1 (large text) |
| | Mint headline gradient, darkest stop `#8FE3CB` | ≥ 3.3:1 (large text) |
| | Subtitle (`ink-100`) | ≥ 4.9:1 |
| | Strip text, labels (white) | ≥ 5.5:1 |
| | Popular chips (white on a navy wash) | ≥ 10.9:1 |
| | "Admission season" badge | ≥ 5.0:1 |
| | Header links (white at 70%) | ≥ 5.7:1 |
| Inner silk headers (same poster) | White | ≥ 8.2:1 |
| | `ink-200` | ≥ 6.3:1 |

## 8c. Dropdowns (22 Nov 2026)

All six browser dropdowns (`<select>`) were replaced by one styled **Select** component.

| Where | Dropdown |
|---|---|
| Hero search | City |
| Programs | City, Sort by |
| Merit calculator | Program |
| Admission calendar | City, Field |

**Look.**
- Closed: a white field with a soft ring, or borderless inside search bars, with a chevron that turns when open.
- Open: a white card with rounded corners and a soft shadow.
- Options: a pale highlight on hover or keyboard focus, a green ✓ on the chosen option, and optional counts on the right ("Lahore 6").
- Long names wrap instead of being cut off.

**Behaviour.**
- The WAI-ARIA "select-only combobox" pattern. Keys: Arrow keys, Home/End, Page Up/Down, Enter/Space, Escape, Tab, and type-ahead (type "l" for Lahore).
- The menu renders in a portal with fixed positioning, so headers with `overflow: hidden` never clip it. It opens upwards when there is no room below, follows the page on scroll, and is never wider than the screen.

**Now connected.** Three dropdowns used to do nothing; they now filter:
- the City filter on Programs;
- the City and Field filters on the calendar. Each event takes its city and field from the program or university it links to; nationwide events always show.

The hero search opens the program list searched by the typed text, or else by the chosen city.

## 8d. Sign in / create account (22 Nov 2026, founder's mockup, second pass)

Built to match the founder's mockup as closely as the supplied artwork allows. Code: `frontend/src/app/(account)/sign-in/page.tsx` and `frontend/src/components/account/auth-form.tsx`.

**Layers, back to front (wide screens):**

| Layer | What it is |
|---|---|
| 1. Artwork | `sign-in-bg.webp`, the founder's campus artwork. The logo and tagline painted into the original were removed with `frontend/scripts/clean-sign-in-background.py`. From 1280 px up, a blurred copy fills the page. On top of it sits the sharp photo at 69% of the page width, anchored to the bottom, with the university building centred at about 41% of the width (between the headline and the card) and the cap and books at the lower left. The photo's edges feather into the blur |
| 2. Mist | A soft mist on the far right only, so the scene still shows behind the card instead of a white wash (changed 22 Nov 2026 at the founder's request) |
| 3. Left shade | A deep-teal shade from the left edge, fading before the building, plus a soft local shade behind the headline. Both get lighter at the bottom so the cap and books stay bright |
| 4. Arc | A large glowing emerald arc. It enters at the top centre and sweeps down behind the card, clear of the headline |

**Content:**

| Part | Design |
|---|---|
| Logo | The mockup's style: an all-teal mark (`public/brand/sccuni-mark-teal.png`, made from the real mark) and "Sccuni" in Plus Jakarta Sans medium |
| Left | Semibold headline with "saved" in teal (#3FD3B2). Subtitle. A teal glass bar: Search Universities, Calculate Merit, Get Expert Guidance. Tagline "Build a brighter future" in Sacramento with a teal swash and a soft dark halo |
| Right | "Back to home" in dark text. A 562 px frosted card with:<br>• icon toggle with a sliding dark-green pill;<br>• "Welcome back 👋";<br>• 56 px pill inputs with icons;<br>• under-18 switch and Terms (sign-up);<br>• dark-green gradient button;<br>• "or continue with" Google and Apple |
| Phones | Artwork with an even dark wash; headline above the card; feature bar and tagline hidden; compact toggle |

**Where it still differs from the mockup, and why:**
1. **Composition of the artwork.** The supplied image puts the graduation cap right next to the building and larger than in the mockup, so the bottom-left differs. A version of the artwork with the cap further left and smaller would match exactly.
2. **Fields per mode.** The mockup shows "Sign in" selected but sign-up fields (full name, under 18, terms, "Create account"). The page shows email and password for Sign in, and the full sign-up form under Create account, so each mode works.
3. **"Get Expert Guidance"** is shown as in the mockup (founder's choice) and links to Best Fit. Sccuni has no expert-guidance service yet; the AI advisor is planned for Release 2. The label should match a real service at launch.
4. **"Continue with Apple"** is shown as in the mockup. Apple sign-in is not in the plan (ADR-009); decide before launch.

**Measured contrast on the left** (each text line separately, worst 2% of the background):

| Text | Contrast |
|---|---|
| Headline line 1 (white) | ≥ 5.1:1 |
| Headline line 2 (white) | ≥ 8.0:1 |
| "saved" (teal) | ≥ 4.2:1 (large text) |
| Subtitle | ≥ 8.3:1 |
| Feature labels | ≥ 7.9:1 |

## 9. Handover to development

**Done (20 Nov 2026):** the screens are Next.js routes in `frontend/src/app`, the tokens are Tailwind v4 `@theme` variables, and the components are in `frontend/src/components`.

**Still to do:**
- When the monorepo is set up (ADR-001), move tokens and components to `packages/ui` and the engine to `packages/merit-engine`.
- Use Radix primitives for the complex widgets (select, dialog, menu) when they are added.
- The sample logic (grouping thresholds, first-year cost estimate) is **illustrative only**. The merit engine itself is real and tested (`frontend/src/lib/merit/engine.test.ts`, including the official UHS golden case).
