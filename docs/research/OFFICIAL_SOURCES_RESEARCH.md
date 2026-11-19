# Official Sources Research — Evidence Log

> **Purpose:** evidence used to *design* Sccuni's data model and merit engine.
> **This is NOT production data.** None of the values below may be loaded into Sccuni as verified data. Each must be re-collected from the official source by the data team and go through the verification workflow (see `../DATA_COLLECTION_STRATEGY.md`).

- **Research date:** 19 Nov 2026
- **Method:** web search restricted to official domains, plus live `curl` fetches of official pages where the hosts allowed automated access.

## Verification levels used in this file

| Label | Meaning |
|---|---|
| **LIVE** | Fetched live from the official page on 19 Nov 2026 and the text was read directly. |
| **INDEX** | Seen only in a search-engine copy of a page on the official domain. The live page was not read (blocked or not attempted). May be stale. |
| **UNVERIFIED** | Found only on third-party or press sources. |
| **CONFLICT** | Official sources disagree with each other. |

## Access limitations encountered (important for the data strategy)

- The session's default network policy initially blocked all research hosts. A dedicated "Sccuni" cloud environment was created with an allow-list of 20 hosts.
- Even with network access, these sites **returned HTTP 403 bot challenges (Cloudflare) to automated clients**:
  - nust.edu.pk
  - ugadmissions.nust.edu.pk
  - www.pec.org.pk
  - www.comsats.edu.pk
  - www.mastersportal.com
  - www.findamasters.com
  - www.universityguru.com
- These are the sites' own access policies. They were **not** circumvented.
- `pmdc.pk` returned 404 for the indexed Admissions Regulations PDF path, and `www.uhs.edu.pk` was refused by the proxy; the bare `uhs.edu.pk` host worked.
- `www.hec.gov.pk/robots.txt` returned 404 (no robots file published).

**Implication:** automated extraction cannot be the primary collection method for several top universities and regulators. See `DATA_COLLECTION_STRATEGY.md` §5.

---

## 1. Merit formulas and eligibility (design evidence)

### 1.1 UHS Punjab — MBBS/BDS, Session 2025-26 — **LIVE**

Source: `https://uhs.edu.pk/downloads/Prospectus25-26.pdf` (prospectus states "Session 2025-2026")

- **Weightage:** Matriculation/SSC/Equivalent 10%, F.Sc./HSSC Pre-Medical/equivalent 40%, MDCAT 50%.
- **Rounding:** "Final calculation in percentage will be rounded up to four decimal points."
- **Annexure-IV worked example:** each component is converted to a 1200-mark base and the component values are shown rounded to 2 decimals (e.g. `1038 × 1200 × 0.10 / 1100 = 113.24`).
  - Example 1 total: **93.6033%**.
  - Recomputing without the intermediate 2-decimal rounding gives 93.6030%.
  - **So per-component rounding on a stated base changes the published result at the 4th decimal.**
- **MDCAT total varies by year:** the examples use "MDCAT 2024 = 190/200" and "172/180".
- **No deduction for extra attempts:** "No marks will be deducted for extra attempts availed in HSSC/equivalent … beyond the period two years after passing SSC."
- **Tie-break order:**
  1. Senior in age
  2. Higher MDCAT
  3. Higher HSSC
  4. Higher SSC
  5. Earlier online application
- **Reserved seat categories in the table of contents:**
  - Students with Disabilities
  - Under-Developed Districts
  - Cholistan
  - Overseas Pakistanis/Dual Nationality
  - ICT/AJK/GB/Ex-FATA/Balochistan (incl. HEC Scholarship seats)
  - Goodwill seats appear in the seat table.

### 1.2 Punjab University (PU) — UG Admission Guidelines 2026-27 — **LIVE**

Source: `https://pu.edu.pk/images/image/Admission-Notices/Instructions-Eligibility-Criteria-2026-27.pdf`

- **Age limit:** at most 24 years on the form closing date for BS (FA/FSc entry). At most 26 for the 5th-semester (14-year) entry. **"No age limit for Self Supporting, Replica, Afternoon & Evening programs."**
- **Part-I basis:** admission is made provisionally on the Intermediate Part-I result (2025) for candidates awaiting Part-II (2026). It is auto-cancelled if the candidate fails Part-II.
- **Late-session deduction:** "Two marks will be deducted from percentage academic marks for each late session to a maximum of previous five (5) sessions/years". A mapping table of exam sessions to late-session numbers is given.
- **Reserved seats:**
  - Sports quota: 2% of seats, morning/regular programmes only.
  - Further reserved categories follow in the document.
- **Engineering:** accepts ECAT (UET) or PU-E/PU-M/PU-CSP tests; refers to the Admission Regulations Book.
- **Not found in this document:** a "75% academic / 25% test" split and "Hafiz +20 marks".
  - These were reported by an earlier INDEX search as coming from other PU documents.
  - Status: **INDEX (unconfirmed live).**

### 1.3 FAST-NUCES — Eligibility Criteria page — **LIVE**

Source: `https://www.nu.edu.pk/Admissions/EligibilityCriteria` ("Last Updated on: 10-Aug-2026", "Prospectus 2026")

| Programme group | Test | HSSC | SSC | Minimums |
|---|---|---|---|---|
| Engineering (Civil, Electrical, Computer Eng.) | 33% | 50% | 17% | SSC 60%, HSSC 60% |
| Computing (AI, CS, Cyber, DS, SE) | 50% | 40% | 10% | SSC 60%, HSSC 50% |
| Business (BBA, BS A&F, BA, FinTech) | 50% | 40% | 10% | SSC 60%, HSSC 50% |

- The applicant must select **only one** of three test options: the FAST-NUCES test, SAT, or NTS NAT. The accepted NAT variants differ by programme group (NAT-IE; NAT-IE/ICS; NAT-IE/ICS/ICOM/IGS).
- **HSSC component:** "Marks obtained in HSSC part I and II", or "HSSC part I if HSSC part II not available", or the IBCC equivalence of A-level / O-level.
- "Merit cut-off marks to be determined by the University."

### 1.4 GIKI — Eligibility and Assessment Criteria — **LIVE**

Source: `https://giki.edu.pk/admissions/admissions-undergraduates/eligibility-criteria/` (no session year stated on the page)

- **Merit weightage:** Admission Test **85%**, plus 15% from *one* of:
  - SSC/Equivalent;
  - O-level (for A/O-level background);
  - the last completed qualification (High School diploma, IB, B.Sc. or DAE).
- **Subject-level minimums:** "60% or above marks each in Mathematics, Physics & Overall" for engineering. Pre-Medical candidates need Additional Mathematics.
- **Qualification routes listed:**
  - HSSC Pre-Eng
  - ICS
  - Pre-Medical + Additional Maths
  - A-Level (with D-or-above in Maths & Physics, plus 8 O-Levels for local or 5 for abroad applicants)
  - American/Canadian HS Diploma / IB (via IBCC equivalence)
  - DAE
- **Provisional admission** is allowed for candidates awaiting results.
- **Earlier INDEX conflict resolved:** a search copy suggested "HSSC Part-I + SSC (10% + 5%)". The live page states the 15% comes from one SSC/equivalent-type component.

### 1.5 IBCC — Conversion for Equivalence — **LIVE**

Source: `https://ibcc.edu.pk/conversion-for-equivalence/`

- **Letter grades → Pakistani marks:**

  | Grade | A* | A | B | C | D | E | F, G |
  |---|---|---|---|---|---|---|---|
  | Marks | "Above 90 (from Examination Session 2021 onwards)" | 85 | 75 | 65 | 55 | 45 | not applicable |

- **A second 9–1 numeric grade scale also exists:**

  | Grade | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 |
  |---|---|---|---|---|---|---|---|---|---|
  | Marks | Above 90 | 87 | 82 | 77 | 70 | 60 | 50 | 40 | not applicable |

- **A\* equivalent marks are subject-wise and published per examination session** (separate tables for 2022, 2024 and 2026).
- **Implication:** conversion tables are versioned data (by session and subject), never code constants. MVP should accept the student's IBCC equivalence figure as input rather than compute it.

### 1.6 NUST — **INDEX** (live site blocks automated access)

Sources (official domain, search copies):
- `nust.edu.pk/admissions/undergraduates/merit-criteria-for-admission-on-net-basis/`
- `ugadmissions.nust.edu.pk/result/closingmerit.aspx`
- the 2025 prospectus PDF

- **Weightage:** NET 75%, SSC/O-Level 10%, HSSC Part-I/HSSC/A-Level/equivalent 15%.
- **Eligibility:** above 60% in SSC and HSSC is mandatory. On joining, at least 60% in the complete FSc.
- Best NET score counts when there are multiple attempts. A separate ACT/SAT route exists with its own merit lists.
- **NET internal subject split changed between cycles** (Maths/Physics/English vs Maths/Physics/Chemistry), which shows test composition is versioned.
- **Closing merit is published as "Closing Merit Positions" (rank), not aggregate.**

### 1.7 UET Lahore — Fall 2026 UG prospectus — **INDEX**

Source: `admission.uet.edu.pk/uploads/prospectus/UG-2026-1_…pdf`. Live host confirmed: `uet.edu.pk/home/` links to `https://admission.uet.edu.pk/`.

- **Intermediate route:** ECAT 33% + First-Year (Part-I) 50% + Matric 17%. Part-I is used even when the candidate has completed intermediate.
- **Other routes:**
  - non-ECAT programmes: Matric 25% + Part-I 75%;
  - O/A-Level: test 33% + equivalence 67%;
  - DAE: test 33% + years 1+2 at 67%;
  - reciprocal seats: 70/30.
- **ECAT** total 400; pass mark 33% for PEC-accredited programmes.
- **Hafiz-e-Quran:** 0–20 marks awarded by a verification committee.
- **Categories** (A1/A2/AP/NM …) by domicile. Closing aggregates are published to **5 decimals**, split by campus × discipline × category × shift × merit list number.

### 1.8 PMDC — Admissions Regulations 2025 — **INDEX** (indexed PDF path returned 404 live)

- **Weightage:** MDCAT 50% + HSSC 40% + SSC 10%.
- **Eligibility:** HSSC at least 60%.
- **MDCAT pass marks:** 55% (MBBS) / 50% (BDS).
- A one-time 2025-26 relaxation of the pass threshold, to fill vacant seats, was reported on pmdc.pk (INDEX). This shows **thresholds can change mid-cycle.**

### 1.9 COMSATS, PIEAS, PEC — **INDEX**

- **COMSATS 2025-26:** Matric 10 / Inter 40 / NTS 50; NTS score at least 33% for engineering; NTS validity 1 year.
- **PIEAS (Jan 2026 leaflet):** 0.60 × **test percentile** + 0.25 × HSSC Part-I % + 0.15 × SSC %. This shows a percentile-based input.
- **PEC:**
  - Engineering admission needs HSSC Pre-Eng at least 60%; entry-test pass at least 33%; test weight in merit at least 33%.
  - **CONFLICT:** DAE seats are "reserved" in the Regulations but "open merit" in the FAQ.
  - Admission of Pre-Medical students to engineering with a Math course is reported (UNVERIFIED).

## 2. Regulatory and reference sources

| Source | URL | Level | Format / notes |
|---|---|---|---|
| HEC recognised universities | `hec.gov.pk/english/universities/Pages/recognised.aspx` | **LIVE** | HTML list with filters: Sector (Public/Private), Chartered By (Federal/Punjab/Sindh/KP/Balochistan/AJK), Discipline (General, Engineering & Technology, Medical …), Province, City; sort A–Z. Rows: name + province. Total count rendered client-side (not in static HTML) |
| HEC recognised campuses | `hec.gov.pk/english/universities/Pages/DAIs/HEC-recognized-Campuses.aspx` | **LIVE** | HTML. "Total No. of Campuses (Both Public and Private) = 96+55=151". Rows carry lifecycle notes: "valid up to <date>", "Admissions Banned w.e.f. Fall 2024", "upgraded to University of X w.e.f. <date>", approval limited to listed programmes |
| HEC illegal/fake institutions | `hec.gov.pk/english/universities/Pages/Illegal-Fake-HEIs-DAIs.aspx` | INDEX | HTML by province |
| PEC accredited programmes | `pec.org.pk/accredition/programs-under-level-1/` (and level-2) | INDEX | Per programme × campus × accredited intake years. Site blocks bots |
| NCEAC (computing) | `nceac.org.pk/accreditation/accreditInstitutes` | INDEX | Per programme |
| PMDC colleges | `pmdc.pk/Colleges/PublicMedicalColleges` (+ Private / Dental) | INDEX | Per college with seats |
| Pakistan Bar Council | `pakistanbarcouncil.org/legal-education/pakistani_universities` | INDEX | Per university/college with recognition status |
| Pharmacy Council | `pharmacycouncil.org.pk/PI.php` | INDEX | Per institution |
| PNMC (nursing) | `pnmc.gov.pk/recognized-institutes` | INDEX | Per institution with approved programmes |
| NBEAC (business) | `nbeac.org.pk/…/list-of-accredited-schools` | INDEX | Per school/campus with status and validity |
| HEC Need-Based Scholarship | `hec.gov.pk/english/scholarshipsgrants/NBS/` | INDEX | Applied via the university's financial aid office |
| BISP/Benazir Undergraduate Scholarship | `hec.gov.pk/english/scholarshipsgrants/Ehsaas/` | INDEX | Current portal URL UNVERIFIED |
| Provincial endowment funds | PEEF, SEEF (`seef.sindh.gov.pk`), KP CMEEF, BEEF | INDEX / UNVERIFIED | — |
| HEC ETC test calendar 2026 (USAT/HAT) | `hec.gov.pk/…/Test Calendar for Year 2026 - Revsied on 25.08.2026.pdf` | INDEX | Shows USAT still operating |
| Entry test bodies | NUST NET (`ugadmissions.nust.edu.pk`), ECAT (`admission.uet.edu.pk`), MDCAT (pmdc.pk notices), NTS (`nts.org.pk`), ETEA (`etea.edu.pk`) | INDEX | All publish schedules; NET runs in multiple series per year |
| HEC higher-education statistics | `hec.gov.pk/english/universities/hes/` | INDEX | Annual reports (PDF). **No official HEC API found** |

## 3. Legal context

- **Pakistan personal data protection law:** secondary sources (Chambers 2026 guide; a practice guide dated Oct 2026) indicate the Personal Data Protection Bill is **still not enacted**. Official drafts exist (MoITT final draft, May 2023), and a 2025 consultation draft was reported. **Status: UNVERIFIED; legal counsel must confirm before launch.**
- The 2023 draft includes **parental/guardian consent for children's data** and restrictions on profiling and targeted advertising aimed at children.
- **Design decision:** build for consent, data minimisation, deletion and age-aware handling now, because many 12th-grade users are under 18.

## 4. Structural variations the engine and data model MUST support

Derived from the evidence above. The numbers are examples of *variety*, not data.

1. **Different component sets.** Components include SSC, HSSC Part-I, full HSSC, entry test, O/A-Level equivalence, DAE years, CGPA and interview. Weight splits seen: 10/40/50, 17/50/33, 10/15/75, 15/85, 15/25/60, 25/75, 70/30.
2. **Formula chosen by route.** The route depends on the student's qualification (FSc/ICS/A-Level/DAE/foreign diploma), the programme group (engineering/computing/business at the same university), the seat type (national/international/reciprocal), and **which of several accepted tests** the student took.
3. **Part-I policies differ:**
   - always Part-I (UET);
   - Part-I only if Part-II is unavailable (FAST);
   - Part-I for merit but full HSSC checked at joining (NUST, PU).
4. **Rounding and scale.** Component-level rounding on a stated marks base (UHS: 1200-mark base, 2 decimals), final rounding to 4 or 5 decimals.
5. **Test inputs vary:**
   - raw marks with **edition-specific totals** (MDCAT 200 vs 180);
   - percentiles (PIEAS);
   - best of several attempts;
   - validity windows (NTS 1 year; MDCAT results from earlier years accepted);
   - alternative tests (SAT/ACT/NAT).
6. **Eligibility conditions include:**
   - overall % and per-subject % (GIKI Maths/Physics);
   - qualification type and subject combination;
   - **maximum age** (PU), with programme-type exemptions (evening/self-supporting);
   - test pass marks;
   - domicile.
7. **Bonuses** may be fixed (+20) or committee-graded (0–20), and can be enabled or disabled per cycle.
8. **Deductions** may be per late session with a cap (PU: 2 marks per session, max 5). Others explicitly have none (UHS).
9. **Thresholds can change mid-cycle** (PMDC relaxation). Rule sets need effective dates *within* a session.
10. **Closing merit is published as rank** (NUST positions) **or aggregate** (UET, 5 decimals). These must never be mixed or compared.
11. **Seat splits** by domicile/category (A1/A2/AP/NM), special quotas (disability, under-developed districts, sports 2% morning-only, overseas), shift, campus, and **multiple numbered merit lists** plus left-over rounds.
12. **Tie-break rules** differ (UHS: age first; KMU: test score). These are informational only for students.
13. **Upstream conversions** (IBCC) change by session and subject.
14. **Everything is session-versioned.** Even test composition changes between cycles.
