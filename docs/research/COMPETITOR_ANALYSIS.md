# Competitor Analysis

- **Status:** Phase 0 draft.
- **Research date:** 19 Nov 2026.
- **Rule followed:** competitors are functional and UX references only. Sccuni does not copy any design, layout, branding or interface.

## Research coverage and limitations (read first)

| Platform | Live access | What this document contains |
|---|---|---|
| eduvision.edu.pk | ✅ Live. robots.txt allows crawling (only `/cgi-bin/` disallowed). A small number of pages fetched | Observed facts (§1) |
| mastersportal.com | ❌ HTTP 403 bot challenge to automated clients | General functional patterns from prior knowledge, **not verified this session** (§2) |
| findamasters.com | ❌ HTTP 403 bot challenge | Same as above |
| universityguru.com | ❌ HTTP 403 bot challenge | Same as above |

**Action:** before Phase 5 (UI/UX), the founder (or a designer) should browse these three sites manually in a normal browser and record screenshots and notes in `docs/research/`. That completes the UX benchmark without automated scraping.

---

## 1. EduVision (eduvision.edu.pk) — the main local incumbent — LIVE observations

### 1.1 Information architecture (from the homepage navigation)

- **Programs:** grouped by field at bachelor level (Engineering, Medical, Social Sciences, Biological & Life Sciences, Physics & Numerical, Chemical, Agriculture, CS & IT, Management).
- **Institutions:**
  - search by name, city and level;
  - shortcuts (Engineering Universities, Medical Colleges, Cadet Colleges, city lists);
  - "Recognized" lists: HEC, PMDC, PEC, Pharmacy Council, NCEAC.
- **Admissions:** latest admissions, filtered by discipline, level and city.
- **Ranking:** top inter colleges and matric schools by city/province.
- **Scholarships:** HEC local, HEC overseas, latest.
- **Merit Calculator** (separate section).
- **Career planning:** counselling, workshops, seminars. Paid counselling is advertised at **PKR 4,000** per session, booked via WhatsApp.
- **Blog, Videos.**

### 1.2 SEO footprint (sitemap.txt, 3,446 URLs)

- About **2,660 programmatic pages** with the pattern `institutions-offering-{program}-with-field-{field}-at-{level}-level-in-pakistan…`
- About 568 ranking pages and 219 career-planning pages.
- **Lesson:** "who offers program X at level Y" pages are the core organic acquisition channel in this market. Sccuni needs equivalent indexable pages, but with real depth (verified fees, merits, deadlines) to avoid thin content.

### 1.3 Merit calculators

- Six hand-built calculators: UET Lahore + Punjab engineering universities; medical colleges; NUST; COMSATS Islamabad; UET Peshawar; IST.
- **Staleness signals:**
  - the calculator index page title says "Merit 2022";
  - the footer says "© 2023";
  - the UET page title says "UPDATED 2026".
- **UET calculator inputs:**
  - "1st year (Out of 505)";
  - "Marks in Matric";
  - "Expected Entrance Test Marks (out of 400)".
  - **Totals are hard-coded in the form**, even though board totals vary (the UHS prospectus example uses SSC /1100 and HSSC /1200).
- The page markets itself as an "Admission Probability Calculator" and "compares your aggregate with the last merit".
- **No formula, weightage, official source or academic session is shown in the page text.**
- **Lesson:** a merit calculator alone is not a differentiator. A *transparent, sourced, versioned* calculator that covers many universities through configuration (not hand-built pages) is.

### 1.4 Monetisation and technology signals

- Google AdSense on calculator pages.
- Legacy Universal Analytics tag (UA-…). UA stopped processing data in 2023, which suggests a maintenance lag.
- Paid career counselling.

### 1.5 Gaps Sccuni can address

1. **Trust:** no visible source citations, verification labels or "last verified" dates on calculators.
2. **Freshness:** mixed-year labelling ("2022" vs "2026").
3. **Coverage model:** one page per calculator does not scale to hundreds of universities and programmes.
4. **Personalisation:** no observed account-based saving, deadline tracking or eligibility-first recommendations. Accounts were not confirmed either way.
5. **Separation of concerns:** "admission probability" framing without stating assumptions. Sccuni must use transparent SAFE/TARGET/REACH rules and explicit "not a guarantee" messaging.
6. **Ads inside decision tools:** Sccuni should keep calculators and recommendations ad-free and clearly separate any sponsored content.

---

## 2. International study portals — functional patterns (prior knowledge, NOT verified live)

> The three sites below blocked automated access during this session. These notes describe commonly known functionality of this class of portal. They must be checked manually before being relied on.

### Mastersportal (Studyportals family)

- **Discovery:** search by discipline and country, with faceted filters (discipline, location, tuition range, duration, attendance/format, language, degree type). Result cards show key facts: tuition, duration, start date, location.
- **Programme page:** key-facts block, overview, programme structure, admission requirements, tuition and costs, scholarships, CTA to visit or apply.
- **SEO:** large sets of country × discipline landing pages.

### FindAMasters (FindAUniversity group)

- **Discovery:** course search with subject/location/study-type filters; institution profiles with lists of courses.
- **Conversion:** "request information" lead forms and visit-website CTAs, with featured or enhanced listings paid for by institutions.

### UniversityGuru

- **Discovery:** global directory of universities by country, with subject-based browsing and rankings-style lists, and university profile pages listing programmes.

### Patterns worth adopting (adapted to Pakistan)

- Faceted search with result counts.
- A key-facts block at the top of programme pages.
- Country/discipline → city/discipline landing pages for SEO.
- Shortlists.
- Clearly labelled sponsored listings.

### Patterns to avoid

- Lead-generation CTAs that look like application buttons.
- Sponsored ordering mixed into organic results.
- Thin auto-generated pages.

---

## 3. Competitive positioning for Sccuni

| Dimension | Typical incumbent | Sccuni |
|---|---|---|
| Merit calculation | Per-university hand-built pages; formula hidden | One configurable engine; formula, weightages, session and **source shown** |
| Historical merit | "Last merit" comparison, unclear year/list/category | Per year × list × shift × category; aggregate vs position never mixed |
| Eligibility | Implicit | Checked first; reasons shown; ineligible programmes never recommended |
| Trust | Few citations | Every critical fact carries a source, session and last-verified date |
| Recommendations | "Admission probability" | Transparent SAFE/TARGET/REACH rules with explanations and a disclaimer |
| Monetisation impact | Ads inside tools | Tools ad-free; sponsored content separated and labelled; never affects ranking |
| Coverage strategy | Breadth first | Depth first: fully verified launch cohort, expand by demand |
