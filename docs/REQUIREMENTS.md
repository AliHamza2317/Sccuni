# Sccuni — Product Requirements Document (PRD)

- **Status:** DRAFT v0.1, for founder approval. Nothing in this document is implemented yet.
- **Last updated:** 19 Nov 2026.
- **Author:** Claude Code (product/engineering), with the Founder.

> ⚠️ **Input gap:** the master instruction refers to an attached *Sccuni Project Proposal PDF*. **No PDF was found** in the repository or the session's uploads folder. This PRD is based entirely on the master instruction. When the PDF is provided, it will be reconciled against this document; differences, especially in the **business model**, will be listed in a "Reconciliation" section.

**Related documents:**
- [PROJECT_PLAN](./PROJECT_PLAN.md)
- [SYSTEM_ARCHITECTURE](./SYSTEM_ARCHITECTURE.md)
- [DATABASE_DESIGN](./DATABASE_DESIGN.md)
- [DATA_COLLECTION_STRATEGY](./DATA_COLLECTION_STRATEGY.md)
- Research: [Official sources](./research/OFFICIAL_SOURCES_RESEARCH.md), [Competitors](./research/COMPETITOR_ANALYSIS.md)

---

## 1. Product vision

**Sccuni is the most trusted place in Pakistan to answer "Where can I get admission, and what will it take?"**

A student enters their marks once. They see every programme they are actually eligible for, their exact aggregate under each university's official formula, how that compares with verified past closing merits, what it costs, and when to apply. Every fact is traceable to an official source.

**Long term:** the national admission and merit intelligence layer for Pakistani higher education, covering all levels, an AI advisor grounded in verified data, and a direct (but never ranking-distorting) channel between students and universities.

## 2. Problem statement

Every year, students finishing HSSC/A-Levels must choose among hundreds of universities, programmes, campuses and shifts. Today:

1. **Information is fragmented.** Formulas, eligibility, fees, deadlines and merit lists are spread across university websites, prospectus PDFs, notices and social media, published at different times.
2. **Formulas differ and change.** Weightages, Part-I rules, bonus marks, deductions, test totals and rounding differ by university, programme group, route and year. The research found splits such as 10/40/50, 17/50/33, 10/15/75 and 15/85, and rounding that changes results at the 4th decimal.
3. **Past merit data is hard to interpret.** Closing merits come per list, category and shift. Some universities publish *positions* (ranks), others *aggregates*. Students compare apples to oranges.
4. **Existing tools are opaque and stale.** Local calculators hide their formula, cite no source, mix years and hard-code totals (see competitor analysis).
5. **Eligibility mistakes are costly.** Students waste application fees and test registrations on programmes they are not eligible for (subject combinations, minimum %, age limits, domicile), or join campuses that HEC has not approved.

## 3. Goals, non-goals and success metrics

### 3.1 Goals (MVP)

- G1. Students can discover verified undergraduate programmes across a launch cohort of universities, by field, city, budget and test.
- G2. Students can calculate their aggregate for any covered programme with a transparent, sourced, session-specific formula.
- G3. Students see eligibility first, then a transparent comparison with verified historical closing merits (SAFE/TARGET/REACH).
- G4. Students never miss a deadline for programmes they care about.
- G5. A small data team can maintain the data with full provenance and review, without developers.

### 3.2 Non-goals (MVP)

- Not an application portal: Sccuni does not submit applications or collect fees on behalf of universities.
- Not a ranking publisher: no invented "best university" scores.
- No paid placements, consultations or lead sales in the MVP.
- Postgraduate programmes, schools and colleges are out of scope initially. The data model supports them.

### 3.3 Success metrics

| Area | Metric | MVP target (to calibrate after the pilot) |
|---|---|---|
| North star | Weekly students completing ≥1 calculation with a **verified** formula | Grows during the admission season |
| Activation | % of calculator users who run the multi-programme check (Best Fit) | Track |
| Retention | % of registered users with ≥1 saved item or deadline subscription | Track |
| Data trust | % of public Tier-1 facts with an official source and VERIFIED status | **100%** (hard rule) |
| Data freshness | % of launch-cohort intakes verified for the current session before applications open | ≥ 95% |
| Error handling | Median time to resolve a user-reported Tier-1 error, in season | < 48 h |
| SEO | Indexed university/programme/city pages; organic sessions | Track from launch |
| Performance | p75 mobile LCP on public pages | < 2.5 s |

## 4. Target audience and market context

- **Primary:** students who have completed (or are completing) 12th class or equivalent:
  - FSc Pre-Engineering
  - FSc Pre-Medical
  - ICS (including variants such as Physics/Statistics/Economics combinations)
  - I.Com
  - FA
  - General Science
  - A-Levels (via IBCC equivalence)
  - DAE
  - foreign high-school diplomas (IB, US/Canadian HSD)
- **Secondary:** parents and guardians (budget, safety, fees, scholarships); school/college counsellors.
- **Tertiary (later):** university admission offices (representative portal).
- **Context that drives requirements:**
  - **Mobile-first.** Most users are on Android phones over mobile data. Pages must be light and work at 320 px width.
  - **Seasonal demand.** Entry tests run in series over many months (e.g. NUST NET in several series). Most undergraduate applications cluster in the summer for Fall intakes, and merit lists are released in rounds. **Traffic will spike around test results and merit list days.**
  - **Language.** English is the language of admissions documents. Urdu is helpful for parents (Release 2).
  - **Minors.** Many users are under 18. Privacy and consent rules apply (see NFR-PRIV).
  - **Centralised admissions** exist for some programmes. For example, public-sector MBBS/BDS in Punjab is run by UHS across many colleges, with province-level quotas.

## 5. User personas

> Personas are illustrative composites for design decisions, not real people.

| Persona | Profile | Goals | Pain points |
|---|---|---|---|
| **Ahsan, the engineering aspirant** | FSc Pre-Eng, Lahore. Has Part-I marks; preparing for ECAT and NET | Know where they qualify; compare UET, NUST, FAST, COMSATS; know what test score is needed | Each university's formula is different; unsure whether Part-I or full marks count |
| **Ayesha, the medical aspirant** | FSc Pre-Med, Faisalabad. MDCAT candidate; family budget is limited | Know their MBBS/BDS chances in public colleges; alternatives (Pharm-D, DPT, BS Nursing) if MDCAT goes badly | Quotas and merit lists are confusing; private college fees are opaque |
| **Bilal, the computing student on a budget** | ICS, Multan. Interested in CS/AI/SE in Punjab or Islamabad; budget ceiling per year | Affordable eligible programmes; scholarships; evening/self-supporting options | Fee pages are hard to compare; doesn't know about need-based aid |
| **Zara, the A-Level student** | A-Levels, Karachi | Understand how their grades map to Pakistani marks and which universities accept them | IBCC equivalence and university rules are confusing |
| **Mr. Tariq, the parent** | Parent of an FSc student, limited time | Understand fees, safety (HEC-recognised, approved campus), deadlines | Fake or unapproved campuses; hidden costs |
| **Sana, the data reviewer (internal)** | Sccuni staff | Verify prospectus data quickly and correctly | Long PDFs, changing rules, keeping track of what changed |
| **Admissions officer (Release 3)** | University representative | Keep the university's information correct; answer student inquiries | Outdated third-party information about their university |

## 6. Core user journeys

**J1 — Search → programme → calculate (anonymous to registered)**
1. Ahsan googles "UET Lahore electrical engineering merit" and lands on the Sccuni programme page (server-rendered, fast).
2. He sees key facts, the Fall 2026 formula with its official source link, and closing aggregates for the last 3 years by list and category.
3. He taps "Calculate my aggregate", enters Matric, Part-I and an expected ECAT score, and sees the breakdown plus "past closing aggregates: your margin per year".
4. He taps "Save" and is asked to sign up (Google or email). The calculation is saved as an immutable snapshot.

**J2 — Best Fit Finder (the core value)**
1. The student enters their academic profile once (SSC, Part-I/HSSC, test scores, actual or expected, domicile, preferences: fields, cities, budget, sector).
2. Sccuni evaluates eligibility for every covered intake. Ineligible programmes are excluded, and the student can see why ("requires Mathematics at HSSC").
3. Eligible programmes are grouped into SAFE / TARGET / REACH / NO HISTORICAL DATA, each with a "why" and the years compared.
4. The student compares up to 4, shortlists, and subscribes to deadlines.

**J3 — "What test score do I need?"**
Before the entry test, the student picks target programmes. For each one, Sccuni shows the test score needed to match each of the last verified closing aggregates, under that year's formula, labelled as indicative.

**J4 — Deadline tracking**
The admission calendar is filtered by field, city or university, with "closing this week" first. The student adds dates to their calendar (.ics) or gets email reminders.

**J5 — Parent's cost and safety check**
Mr. Tariq compares 3 programmes. He sees verified fee breakdowns (academic year shown) with first-year estimates, HEC recognition and campus approval status, professional-council accreditation, and matching scholarships with deadlines.

**J6 — Data operations (internal)**
1. The data manager uploads the new prospectus PDF as a Source.
2. They create the session, events, formula version (routes, components, rounding) and eligibility rules.
3. They run the formula tester against the prospectus's worked example, which must match exactly.
4. They submit. A different reviewer verifies against the source pages and approves.
5. Public pages and the search index update automatically.

**J7 — Error report**
1. A student taps "Report incorrect information" on a fee table.
2. A data-quality issue is opened with a link.
3. A reviewer checks the official source, fixes it through a change request, and the reporter is notified.

**J8 — Representative update (Release 3)**
A verified university representative proposes a deadline change. It becomes a change request requiring Sccuni review. Nothing goes live unreviewed.

---

## 7. Functional requirements

**Priority:** **M** = Must, **S** = Should, **C** = Could, **F** = Future.
**Release:** **R1** = MVP, **R2** = Release 2 (Intelligence), **R3** = Release 3 (Ecosystem).
"Development phases" (0–19) are separate from product releases; see PROJECT_PLAN.

### 7.1 University Discovery (DISC)

| ID | Requirement | P | Rel |
|---|---|---|---|
| DISC-01 | Universities directory with pagination; only verified, non-archived records | M | R1 |
| DISC-02 | Search by university name, including aliases/abbreviations ("UET", "PU") and typo tolerance | M | R1 |
| DISC-03 | Search by programme/discipline (canonical titles + official titles) | M | R1 |
| DISC-04 | Filter by city and province/region | M | R1 |
| DISC-05 | Filter by sector (public/private) | M | R1 |
| DISC-06 | Filter by degree level (UG at launch; the filter is structural) | M | R1 |
| DISC-07 | Filter by field/discipline | M | R1 |
| DISC-08 | Filter by annual fee range (verified fees only; unverified-fee items clearly labelled) | M | R1 |
| DISC-09 | Filter by entry test accepted/required | M | R1 |
| DISC-10 | Filter by admission status (open, upcoming, closed) for the current session | M | R1 |
| DISC-11 | Filter by shift, women-only, HEC-approved campus, professional-council accreditation | S | R1 |
| DISC-12 | Sort by relevance, name, fee, nearest deadline | M | R1 |
| DISC-13 | SEO-friendly, shareable URLs for searches and pages | M | R1 |
| DISC-14 | Facet counts per filter value | S | R1 |
| DISC-15 | Side-by-side comparison of up to 4 universities or programmes; shareable link | S | R1 |
| DISC-16 | Zero-result handling with suggestions; anonymised logging of zero-result queries | S | R1 |
| DISC-17 | "Last verified" freshness indicator on cards | M | R1 |

### 7.2 University Profile (UNI)

| ID | Requirement | P | Rel |
|---|---|---|---|
| UNI-01 | Profile page: name, short name, overview, sector, chartered by, established year, official website, contact, address, city/province | M | R1 |
| UNI-02 | HEC recognition status with link to the HEC list and the date checked | M | R1 |
| UNI-03 | Campuses with **HEC campus approval status** (approved / admissions banned / validity date) | M | R1 |
| UNI-04 | Departments and offered programmes (grouped by field), linking to programme pages | M | R1 |
| UNI-05 | Summaries: fee range (with academic year), admission timeline, entry tests accepted, scholarships | M | R1 |
| UNI-06 | Official application/admission links | M | R1 |
| UNI-07 | Every section shows its source(s) and last-verified date | M | R1 |
| UNI-08 | "Report incorrect information" on every section | S | R1 |
| UNI-09 | Logo shown only where usage is permitted; otherwise a neutral monogram | C | R1 |
| UNI-10 | Women-only indicator | M | R1 |

### 7.3 Degree Programme (PROG)

| ID | Requirement | P | Rel |
|---|---|---|---|
| PROG-01 | Dedicated page per offering (programme × campus × shift × funding type) with a stable URL | M | R1 |
| PROG-02 | Title, university, campus, department, degree level, duration, credit hours (if published) | M | R1 |
| PROG-03 | Eligibility criteria (machine-checked conditions + verbatim notes), required subjects, minimum marks | M | R1 |
| PROG-04 | Accepted entry tests and test details | M | R1 |
| PROG-05 | Merit formula for the session: components, weights, routes, bonuses/deductions, rounding, **source + session** | M | R1 |
| PROG-06 | Historical closing merits by year × list × category × shift. Metric type always labelled (aggregate vs position) | M | R1 |
| PROG-07 | Fee structure breakdown with academic year and source; first-year estimate with stated assumptions | M | R1 |
| PROG-08 | Seats per category, only if officially published | S | R1 |
| PROG-09 | Admission status, key dates, how to apply, required documents, application fee | M | R1 |
| PROG-10 | Inline "Calculate my aggregate" and "What do I need?" | M | R1 |
| PROG-11 | Professional-council accreditation status (e.g. PEC) | S | R1 |
| PROG-12 | Similar programmes at other universities | S | R1 |

### 7.4 Merit Calculation Engine (MERIT)

| ID | Requirement | P | Rel |
|---|---|---|---|
| MERIT-01 | Formulas are **versioned data** (no university-specific code), tied to an admission session, with effective dates | M | R1 |
| MERIT-02 | Multiple **routes** per formula, selected by the student's qualification type, the test taken and the seat type | M | R1 |
| MERIT-03 | Component sources: SSC, HSSC Part-I, full HSSC, O/A-Level equivalence, DAE years, entry test, other. **Part-I policies:** always Part-I / full only / full else Part-I | M | R1 |
| MERIT-04 | Test inputs: marks with **edition-specific totals**, percentage, percentile; best-attempt or latest; validity window; alternative accepted tests | M | R1 |
| MERIT-05 | Adjustments: fixed bonus (e.g. Hafiz-e-Quran where officially applicable), range bonus (committee-graded, giving a result band), deductions per late session with cap and exemptions | M | R1 |
| MERIT-06 | Decimal arithmetic with configurable computation base, **component-level and final rounding** | M | R1 |
| MERIT-07 | Eligibility evaluated **before** the aggregate. Three-valued outcome (eligible / not eligible / unknown) plus "conditional", with reasons | M | R1 |
| MERIT-08 | Result shows: aggregate, per-component contribution, adjustments, applied formula and route, session, source link, verification status | M | R1 |
| MERIT-09 | Comparison with verified historical closing **aggregates** using each year's formula (or a reviewer-approved equivalent). Rank-based merits shown as information only | M | R1 |
| MERIT-10 | "Enter marks once": compute for many programmes at once (powers Best Fit) | M | R1 |
| MERIT-11 | Reverse calculation: the test score needed to reach a target aggregate | S | R1 |
| MERIT-12 | Calculations work without an account; saving requires an account | M | R1 |
| MERIT-13 | Saved calculations are immutable snapshots (inputs, formula definition, result, engine version) | M | R1 |
| MERIT-14 | Honest "formula not yet verified for this session" state; never fall back silently to an old formula | M | R1 |
| MERIT-15 | Admin formula tester: run official worked examples and edge cases before submitting for review | M | R1 |
| MERIT-16 | IBCC grade-to-marks equivalence estimator (versioned tables per exam session) | C | R2 |
| MERIT-17 | Persistent disclaimer: past merit is an indicator, not a guarantee | M | R1 |

### 7.5 Previous Merit Intelligence (HIST)

| ID | Requirement | P | Rel |
|---|---|---|---|
| HIST-01 | Store closing values per intake (university, campus, programme, shift, funding type, session) × category × list number | M | R1 |
| HIST-02 | Separate metric types: closing aggregate, opening aggregate, closing position, closing test score. Never mixed or compared | M | R1 |
| HIST-03 | Multiple merit lists per session, including left-over or special rounds | M | R1 |
| HIST-04 | Preserve official precision (e.g. 5 decimals) and source per list | M | R1 |
| HIST-05 | Trend view across years (chart + table) | S | R1 |
| HIST-06 | No personal data from merit lists is ever stored (names, CNIC, roll numbers) | M | R1 |

### 7.6 Admissions (ADM)

| ID | Requirement | P | Rel |
|---|---|---|---|
| ADM-01 | Admission sessions per university or **admission authority** (e.g. a centralised medical admission body) | M | R1 |
| ADM-02 | Events: applications open, deadline, late deadline, test registration, test date, result, merit lists (numbered), interviews, fee deadline, classes start, each with a tentative flag | M | R1 |
| ADM-03 | Admission calendar (list + month views), filterable by field, city, university, test | M | R1 |
| ADM-04 | "Closing soon" and "opening soon" highlights | M | R1 |
| ADM-05 | Application instructions, required documents, application fee, official link | M | R1 |
| ADM-06 | Add to calendar (.ics) | S | R1 |
| ADM-07 | Email reminders for subscribed intakes/events | S | R1 |
| ADM-08 | Admission status per intake (upcoming/open/closed), derived from events with a manual override | M | R1 |

### 7.7 Fees and Scholarships (FEE / SCH)

| ID | Requirement | P | Rel |
|---|---|---|---|
| FEE-01 | Fee structures per offering and academic year, by category (e.g. open merit vs self-finance), with itemised charges and billing basis | M | R1 |
| FEE-02 | Normalised estimates (first year; full programme) with assumptions stated, labelled "estimate" | M | R1 |
| FEE-03 | Academic year and source always shown | M | R1 |
| SCH-01 | Scholarship directory: provider, type (need/merit/regional), coverage, eligibility, applicable universities/programmes, official link | M | R1 |
| SCH-02 | Scholarship deadlines per academic year in the calendar | M | R1 |
| SCH-03 | Scholarship matching against the student profile (structured criteria) | C | R2 |
| SCH-04 | Financial assistance guides (how need-based aid works) | S | R1 |

### 7.8 Student Accounts (ACC)

| ID | Requirement | P | Rel |
|---|---|---|---|
| ACC-01 | Register/login with email+password and Google; email verification; password reset | M | R1 |
| ACC-02 | Academic profile: SSC, HSSC Part-I, HSSC, equivalences, DAE, test attempts (actual/expected), domicile, optional DOB/gender (explained as eligibility-only) | M | R1 |
| ACC-03 | Saved calculations, universities, programmes, scholarships | M | R1 |
| ACC-04 | Saved comparisons | S | R1 |
| ACC-05 | Deadline tracker (subscriptions + dashboard) | S | R1 |
| ACC-06 | Preferences (fields, cities, budget, sector, shift) | M | R1 |
| ACC-07 | Personalised recommendations on the dashboard (from Best Fit) | M | R1 |
| ACC-08 | Account deletion and data export | M | R1 |
| ACC-09 | Under-18 handling: age declaration; guardian-consent flow where legally required | M | R1 (legal confirmation pending) |
| ACC-10 | In-app notifications | S | R1 |

### 7.9 Best Fit Finder (FIT)

| ID | Requirement | P | Rel |
|---|---|---|---|
| FIT-01 | Inputs: academic profile + preferences (fields, cities, budget, sector, degree level) | M | R1 |
| FIT-02 | Mandatory eligibility gate: ineligible programmes are never recommended; reasons are viewable | M | R1 |
| FIT-03 | SAFE / TARGET / REACH classification from a versioned, admin-configurable policy over comparable historical closing aggregates | M | R1 |
| FIT-04 | NO HISTORICAL DATA group for eligible programmes without comparable data (including rank-only merits) | M | R1 |
| FIT-05 | Plain-language explanation per result (margin per year, years used, formula/session, sources) | M | R1 |
| FIT-06 | Preference filters and transparent ordering within groups (explained) | M | R1 |
| FIT-07 | Compare and shortlist recommended programmes | S | R1 |
| FIT-08 | Paid promotions never affect inclusion or order (architecturally enforced) | M | R1 |
| FIT-09 | Support expected (not yet taken) test scores, clearly labelled | M | R1 |

### 7.10 AI Admission Advisor (AI) — Release 2

| ID | Requirement | P | Rel |
|---|---|---|---|
| AI-01 | Answers questions about universities, programmes, eligibility, formulas, merits, fees, scholarships, deadlines, tests and procedures **from Sccuni's verified data** | M | R2 |
| AI-02 | Every answer cites records (with official source URLs and last-verified dates) | M | R2 |
| AI-03 | Separates verified facts from unavailable information; says "not available" rather than guessing; never invents policies | M | R2 |
| AI-04 | Uses the merit engine for any calculation (the model never does the maths) | M | R2 |
| AI-05 | Provider-agnostic LLM integration | M | R2 |
| AI-06 | Rate limiting, abuse protection, feedback (helpful / not helpful), evaluation set | M | R2 |
| AI-07 | Core search and calculators work without the AI | M | R1 |

### 7.11 University Representatives (REP)

| ID | Requirement | P | Rel |
|---|---|---|---|
| REP-01 | Student inquiry/contact form per university, with explicit consent to share; admin-triaged | S | R1 |
| REP-02 | Representative accounts with verification (official email domain + documents) | M | R3 |
| REP-03 | Representative dashboard: inquiries, response notifications, lead list (consented only) | M | R3 |
| REP-04 | Profile and data updates as **change requests** requiring Sccuni review | M | R3 |
| REP-05 | Live chat | C | R3 |
| REP-06 | Paid consultations, promotions, lead packages, subscriptions | F | Future (explicit approval needed) |

### 7.12 Data Collection and Verification (DATA)

| ID | Requirement | P | Rel |
|---|---|---|---|
| DATA-01 | Source registry: URL, type, publisher, academic year, retrieval date, archived private copy, content hash | M | R1 |
| DATA-02 | Manual admin entry for all entities | M | R1 |
| DATA-03 | CSV/XLSX import with templates, row validation, duplicate detection and a preview; applied rows become change requests | M | R1 |
| DATA-04 | PDF document management (upload, link to records, page locators) | M | R1 |
| DATA-05 | Verification workflow: Draft → Pending Review → Verified / Rejected; Outdated; four-eyes for Tier-1 | M | R1 |
| DATA-06 | Revision history and audit trail on every record | M | R1 |
| DATA-07 | Data-quality reports: missing fields, suspected duplicates, invalid values, stale data, source changed | M | R1 |
| DATA-08 | Freshness monitoring: automatic OUTDATED marking by session end or effective date; review queues | M | R1 |
| DATA-09 | Assisted PDF extraction (text/tables → draft change requests) | S | R2 |
| DATA-10 | Scheduled, robots-respecting source monitoring (change detection only) | S | R1 |
| DATA-11 | Automated web extraction (only where the site's terms and robots allow) — drafts only | C | R2 |
| DATA-12 | No automated path can publish Tier-1 data | M | R1 |

### 7.13 Admin Dashboard (ADMIN)

| Module | P / Rel | Notes |
|---|---|---|
| 1 Dashboard overview (coverage, queues, freshness) | M / R1 | |
| 2–5 University, campus, department, programme management | M / R1 | |
| 6 Eligibility criteria management | M / R1 | |
| 7 Merit formula management + tester + resolved-rules preview | M / R1 | |
| 8 Historical merit management | M / R1 | |
| 9 Fee management | M / R1 | |
| 10 Scholarship management | M / R1 | |
| 11 Admission session management | M / R1 | |
| 12 Admission calendar management | M / R1 | |
| 13 Entry test management | M / R1 | |
| 14 Source management | M / R1 | |
| 15 Data verification queue | M / R1 | |
| 16 CSV/Excel imports | M / R1 | |
| 17 PDF document management | M / R1 | |
| 18 User management | M / R1 | |
| 19 Representative management | M / R3 | |
| 20 Inquiry management | S / R1 | |
| 21 Website content management (guides, FAQs, pages) | S / R1 | |
| 22 Analytics (product + data coverage) | S / R1 | Basic in R1 |
| 23 Audit logs | M / R1 | |
| 24 System settings (incl. recommendation policy) | M / R1 | |

**Roles:** Super Admin, Admin, Data Manager, Data Reviewer, University Representative, Student. The full permission matrix is produced in Phase 6. Staff accounts require MFA.

### 7.14 SEO (SEO)

| ID | Requirement | P | Rel |
|---|---|---|---|
| SEO-01 | Indexable pages: universities, programmes/offerings, cities, disciplines, discipline × city, entry tests, admission calendar, scholarships, guides | M | R1 |
| SEO-02 | SSR/ISR, dynamic metadata, canonical URLs, Open Graph, XML sitemaps, robots.txt | M | R1 |
| SEO-03 | Structured data where appropriate (`CollegeOrUniversity`, `EducationalOccupationalProgram`, `BreadcrumbList`, `FAQPage` on guides) | M | R1 |
| SEO-04 | Thin-page control: `noindex` pages below a content threshold; no index bloat from filter combinations | M | R1 |
| SEO-05 | Internal linking (university ↔ programmes ↔ city ↔ discipline ↔ tests) | M | R1 |
| SEO-06 | Admission guides ("How the X aggregate is calculated, session Y"), sourced | S | R1 |

---

## 8. Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-PERF | Performance | Public pages: p75 mobile LCP < 2.5 s, CLS < 0.1, INP < 200 ms. API reads p95 < 300 ms. Client calculation < 100 ms |
| NFR-AVAIL | Availability | 99.5% monthly at MVP; graceful degradation (static pages stay up if the API is degraded); peak-season readiness |
| NFR-SCALE | Scalability | Survive 10× normal traffic on result/merit-list days through CDN caching of public pages; stateless API horizontally scalable |
| NFR-SEC | Security | OWASP ASVS Level 2 as the target; see Architecture §6 |
| NFR-PRIV | Privacy | Data minimisation; purpose-limited sensitive fields; explicit consent before sharing with any university; no sale of personal data; deletion/export; under-18 handling with guardian consent where the law requires. **Final legal basis to be confirmed by Pakistani counsel** (the PDP Bill appears not to be enacted; see research §3) |
| NFR-A11Y | Accessibility | WCAG 2.2 AA; keyboard navigation; screen-reader labels on calculators and charts (with tabular alternatives) |
| NFR-I18N | Internationalisation | English at MVP; all UI strings externalised; Urdu with RTL in R2 |
| NFR-COMPAT | Compatibility | Latest two versions of Chrome/Android WebView, Safari iOS, Firefox, Edge; from 320 px width; usable on low-end Android over 3G-class connections |
| NFR-DATA | Data accuracy | 100% of public Tier-1 facts VERIFIED with an official source; Tier-1 re-verified every admission cycle; outdated data always labelled |
| NFR-OBS | Observability | Error tracking (web+API), structured logs with request IDs, uptime alerts, job failure alerts |
| NFR-MAINT | Maintainability | TypeScript strict; lint + typecheck + tests in CI; 100% branch coverage on the merit engine; documentation updated with every phase |
| NFR-LEGAL | Legal | Terms of use; privacy policy; "not affiliated with any university" disclaimer; correction/takedown process; source attribution |

---

## 9. Gaps, ambiguities, risks and improvements

### 9.1 Missing requirements identified (now added above)

| # | Gap | Resolution |
|---|---|---|
| 1 | Proposal PDF unavailable | Reconcile when provided |
| 2 | **Admission routes:** A-Level, DAE, IB/US diplomas, SAT/ACT routes follow different formulas | MERIT-02 |
| 3 | **Part-I vs full HSSC;** students "awaiting result" | MERIT-03, ACC-02 |
| 4 | **Quotas/categories:** domicile (e.g. A1/A2/AP), disability, sports, overseas, under-developed districts | `admission_categories`, eligibility DOMICILE_IN |
| 5 | **Age limits** with programme-type exemptions (found live in PU 2026-27) | Eligibility MAX_AGE |
| 6 | **Subject combinations and per-subject minimums** (e.g. Maths/Physics 60% each at GIKI) | Eligibility conditions |
| 7 | **Women-only universities / gender-specific seats** | UNI-10, eligibility GENDER_IN |
| 8 | **Self-supporting/evening programmes** with different fees/rules | `funding_type` on offerings |
| 9 | **Test editions, multiple attempts, validity windows** | MERIT-04 |
| 10 | **Rank-only closing merits** (e.g. NUST positions) cannot be classified against aggregates | HIST-02, FIT-04 |
| 11 | **Formula changes across years** make naive comparison misleading | MERIT-09 |
| 12 | **HEC campus approval and professional-council accreditation** are key trust and safety signals | UNI-03, PROG-11 |
| 13 | **Canonical programme taxonomy** ("BSCS" vs "BS Computer Science") | `canonical_title` + disciplines |
| 14 | **Centralised admission authorities** (e.g. UHS for Punjab public MBBS/BDS across many colleges) | `admission_authorities` + institution kinds (DATABASE_DESIGN §4.13) |
| 15 | **"What score do I need?"** is the most useful question before the test | MERIT-11 |
| 16 | **User error reporting** | UNI-08, J7 |
| 17 | **Liability for wrong guidance** | Disclaimers, sources, ToS (NFR-LEGAL) |
| 18 | **Personal data in published merit lists** | HIST-06 |
| 19 | **Seasonality:** launch timing matters | PROJECT_PLAN milestones |

### 9.2 Ambiguities to resolve with the founder

1. **Launch cohort:** which universities, fields and regions are first? Recommendation in §10.1.
2. **Data team:** who collects and verifies data, and how many hours per week? This is the binding constraint on coverage.
3. **Business model in the MVP:** none (recommended) vs ads vs others? The proposal PDF may specify this.
4. **Urdu at launch?** Recommended: Release 2.
5. **Notification channels:** email only at MVP (recommended); WhatsApp/SMS later (cost).
6. **Brand assets:** existing logo, colours, domain (e.g. sccuni.pk / .com)?
7. **Budget for hosting and services** (monthly).
8. **Postgraduate scope timing.**

### 9.3 Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Data collection effort exceeds team capacity | High | High | Depth-first launch cohort; import templates; prioritise by search demand; measure throughput in the pilot |
| Wrong formula or merit published | Medium | High | Four-eyes review; golden tests against official worked examples; source required; error reporting; fast correction SLA |
| Key sources block automation (observed: Cloudflare challenges) | High | Medium | Manual collection is the primary method; monitoring only where allowed; representative partnerships later |
| Students treat indicators as guarantees | Medium | High | Persistent disclaimers; transparent rules; "indicator" language; no "probability %" |
| Legal/regulatory change (data protection, minors) | Medium | Medium | Privacy-by-design now; counsel review before launch |
| Missing the admission season | Medium | High | Milestone plan targets a public beta before the main summer application period |
| SEO competition from incumbents | High | Medium | Depth and trust on pages, structured data, guides, fast pages |
| Scope creep (AI, reps, monetisation) | High | Medium | Strict release boundaries; phase gates |
| Peak traffic outages | Medium | High | CDN/ISR, load tests, graceful degradation |
| Logo/trademark/copyright complaints | Low | Medium | Logos only with permission; link to (not rehost) public PDFs; takedown process |

### 9.4 Improvements proposed beyond the brief

1. "What score do I need?" reverse calculator (MERIT-11).
2. HEC campus-approval and fake-institution warnings on profiles.
3. Professional-council accreditation display (PEC/PMDC/NCEAC/PBC…).
4. "Report incorrect information" on every section.
5. Merit guides per university and session as SEO content, generated from verified data and reviewed.
6. Zero-result search logging to drive data collection priorities.
7. Shareable comparison links (students decide with family over WhatsApp).
8. Admin formula tester with official worked examples as regression tests.

---

## 10. Scope by release

### 10.1 Release 1 — MVP ("Launch")

**Launch cohort recommendation:** depth-first, about 25–40 institutions with **complete Tier-1 data** for the current session plus the last 2–3 years of closing merits where available. Prioritise by student demand:
1. engineering and computing in Punjab + ICT;
2. the centralised public medical admission process in Punjab;
3. major KP and Sindh universities.

Exact list to be agreed.

**In scope:**
- Discovery: DISC-01…17
- Profiles: UNI-01…10
- Programmes: PROG-01…12
- Merit engine: MERIT-01…15, 17
- History: HIST-01…06
- Admissions: ADM-01…08
- Fees: FEE-01…03
- Scholarships: SCH-01, 02, 04
- Accounts: ACC-01…10
- Best Fit: FIT-01…09
- REP-01 (inquiry form)
- Data: DATA-01…08, 10, 12
- Admin modules 1–18, 20–24
- SEO-01…06
- All NFRs

### 10.2 Release 2 — "Intelligence"

- AI Admission Advisor (AI-01…06)
- Assisted PDF extraction (DATA-09)
- Allowed web extraction (DATA-11)
- IBCC estimator (MERIT-16)
- Scholarship matching (SCH-03)
- Urdu UI
- Postgraduate programmes
- Richer analytics
- WhatsApp/SMS reminders (cost-gated)

### 10.3 Release 3 — "Ecosystem"

- Representative accounts, verification, dashboard, inquiry inbox, consented leads, profile change requests (REP-02…04)
- Live chat (REP-05)

### 10.4 Future (explicit approval required)

- Paid consultations
- University promotions (clearly labelled, never affecting organic ranking)
- Lead packages and subscriptions
- Native mobile apps
- Affiliated-college coverage
- School-level guidance

## 11. Competitor analysis (summary)

See [research/COMPETITOR_ANALYSIS.md](./research/COMPETITOR_ANALYSIS.md).

- **Main local incumbent (eduvision.edu.pk, live-checked):**
  - broad directory with about 2,660 programmatic "institutions offering X" SEO pages;
  - six hand-built merit calculators that show **no formula, weights, source or session**, with mixed year labels ("Merit 2022" / "UPDATED 2026") and hard-coded totals;
  - AdSense inside tools;
  - paid career counselling.
- **International portals** (mastersportal, findamasters, universityguru) block automated access. Their patterns (faceted search, key-facts blocks, landing pages, shortlists, labelled sponsorship) come from prior knowledge and must be checked manually.
- **Sccuni's differentiation:** a transparent, sourced, versioned merit engine; eligibility-first recommendations; per-list/category merit history; trust signals on every fact; ad-free decision tools.

## 12. Business model notes

Pending the proposal PDF. The master instruction indicates future revenue from representative services (consultations, promotions, lead packages, subscriptions). **Constraints already fixed:**
- no paid features in the MVP without explicit approval;
- paid promotion must never manipulate organic merit-based recommendations (FIT-08).

## 13. Assumptions and dependencies

- Official sources remain publicly accessible to human collectors.
- The founder (or a hired team) provides data-operations capacity.
- A domain and brand assets will be provided before Phase 5.
- Hosting budget is approved before Phase 19.
- Legal counsel reviews privacy/terms before launch.

## 14. Glossary

| Term | Meaning |
|---|---|
| SSC / Matric | Secondary School Certificate (10th grade) |
| HSSC / Intermediate | Higher Secondary School Certificate (11th–12th). Part-I = 11th, Part-II = 12th |
| FSc Pre-Eng / Pre-Med, ICS, I.Com, FA | HSSC streams |
| A-Level / O-Level | Cambridge qualifications; need **IBCC** equivalence for Pakistani admissions |
| IBCC | Inter Boards Coordination Commission (issues equivalence certificates) |
| DAE | Diploma of Associate Engineering |
| HEC | Higher Education Commission (recognises universities and campuses) |
| PEC, PMDC, NCEAC, PBC, PCP, PNMC, NBEAC, NAEAC | Professional councils / accreditation bodies |
| NET, ECAT, MDCAT, NAT, USAT, SAT | Entry tests |
| Aggregate | Weighted score computed by a university's formula |
| Closing merit | The last admitted candidate's aggregate (or position) in a merit list |
| Merit list | A numbered round of admission offers |
| Open merit / reserved / self-finance | Seat categories |
| Domicile | Official province/district of residence, used for quotas |
| Session | An admission cycle (e.g. Fall 2026) |
| Intake | A programme offering admitting in a specific session |
| Tier-1 data | Critical admission facts: formulas, eligibility, closing merits, fees, deadlines |
