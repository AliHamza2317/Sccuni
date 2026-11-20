# Sccuni — Design System and MVP Screens

- **Status:** v0.1 design prototype, for founder review (Phase 5 deliverable).
- **Last updated:** 20 Nov 2026.
- **Live design canvas:** https://claude.ai/artifact/WfsSxNW1nMwyKLkPw5xdR1 — private to the owner until shared from its Share menu.
- **Related:** [REQUIREMENTS.md](./REQUIREMENTS.md) (MVP scope) · [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) §5.5 (rendering)

> **All universities, fees, merits and dates in the prototype are fictional samples.** Every screen carries a banner saying so. Real data enters only through the verification workflow.

---

## 1. Direction: "Ink & Emerald"

A calm, premium, trustworthy look for high-stakes decisions:

- **Deep ink** for confidence and structure.
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

| Token | Hex | Use |
|---|---|---|
| ink-950 / 900 / 700 / 500 / 300 / 100 / 50 | #070D1A / #0B1324 / #243049 / #5B6475 / #B9C0CC / #ECEFF4 / #F5F7FA | Text, dark surfaces, borders, muted text (500 is the lightest allowed for body text) |
| paper / surface | #F6F7F9 / #FFFFFF | Page and card backgrounds |
| emerald 800 / 700 / 600 / 500 / 400 / 100 / 50 | #06513F / #086450 / #0A7A60 / #139572 / #3DB894 / #D3F1E6 / #ECF8F3 | Primary buttons (600), links (700), accents on dark (400), tints |
| gold 500 / 700 / 100 | #E9A23B / #8A5A0B / #FDF0D8 | Attention: deadlines soon, warnings |
| danger | #B4232F (bg #FDECEE) | Errors, rejected, closed |
| safe | #08664F on #E3F5EE | SAFE group |
| target | #2238A8 on #E6EBFD | TARGET group |
| reach | #B03A0A on #FDEBDF | REACH group |

- Text contrast targets ≥ 4.5:1. The pairs above were checked when the palette was chosen.
- SAFE / TARGET / REACH differ in lightness as well as hue (green, blue, orange rather than green/red), and always carry a text label.

### 2.2 Typography

| Role | Font | Size / weight |
|---|---|---|
| Display | Plus Jakarta Sans | clamp(40–70 px) / 800, tracking −0.04em |
| H1 | Plus Jakarta Sans | clamp(32–48 px) / 800 |
| H2 | Plus Jakarta Sans | clamp(26–38 px) / 800 |
| H3 | Plus Jakarta Sans | 20 px / 700 |
| Body | Inter | 16 px / 400, line-height 1.55 |
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

1. **Brand:** keep "Ink & Emerald", or adjust the colours or logo? Is there an existing logo to adopt?
2. **Hero headline and tone:** the current line is "Know where you'll get admission — before you apply."
3. **Recommendation thresholds** shown in Best Fit: the prototype uses ±2.00 / −1.50 / −4.00 only as **placeholders** (REQUIREMENTS FIT-03).
4. **Urdu UI** (Release 2): the layout must support RTL, so mirroring rules will be added when Urdu starts.

## 8. Handover to development (Phase 10+)

- Tokens map 1:1 to a Tailwind preset in `packages/config`.
- Components become `packages/ui` (on Radix primitives).
- Screens become Next.js routes per SYSTEM_ARCHITECTURE §5.5.
- The prototype's sample logic (calculator, grouping) is **illustrative only**. Production logic lives in `packages/merit-engine` with golden tests.
