# Sccuni — Testing Plan

- **Status:** DRAFT v0.1. Strategy approved together with the plan; test suites are written alongside each phase.
- **Last updated:** 19 Nov 2026.

## 1. Principles

- A feature is **not done** until its expected behaviour is covered by tests that pass in CI.
- Test the riskiest logic hardest: merit engine, eligibility, rule resolution, verification and publishing, authorisation.
- Tests use **real PostgreSQL** (not mocks) for repository and integration tests.
- Test fixtures are labelled **ILLUSTRATIVE** and never loaded into production.

## 2. Test pyramid and tools

| Level | Scope | Tools |
|---|---|---|
| Unit | Pure functions: merit engine, validators, mappers | Vitest (+ fast-check property tests) |
| Integration | API modules with a real DB: repositories, services, guards, workflows | Vitest + Supertest + Postgres (Docker service in CI / Testcontainers) |
| Contract | API responses match the Zod/OpenAPI contracts | Shared Zod schemas; OpenAPI diff check in CI |
| Component | UI components, forms, calculator widgets | Vitest + Testing Library |
| End-to-end | Critical user journeys on web and admin | Playwright (Chromium; mobile viewport projects), `--trace off` by default |
| Accessibility | Automated a11y checks on key pages | @axe-core/playwright + manual audit (Phase 18) |
| Performance | Web vitals budgets; API latency; load | Lighthouse CI (mobile, throttled); k6 load tests (Phase 18) |
| Security | Dependencies, secrets, common web vulnerabilities | `pnpm audit`, GitHub secret scanning/CodeQL, OWASP ZAP baseline scan on staging |

## 3. Merit engine test matrix (Phase 8)

**Coverage gate:** 100% branch coverage of `packages/merit-engine`.

| Area | Cases |
|---|---|
| **Golden examples** | Reproduce official worked examples exactly. **First golden case: UHS MBBS/BDS 2025-26, Annexure-IV** — Example 1 must yield `93.6033` (component rounding to 2 dp on a 1200 base, final to 4 dp); Example 2 `93.8808`. A test also asserts that *disabling* component rounding gives `93.6030`, proving the rounding configuration is honoured. More cases are added from every prospectus that publishes an example |
| Formula structures | Single route; multiple routes (FSc / A-Level / DAE / SAT); route selection by qualification and test; no matching route → clear error |
| Part-I policies | ALWAYS_PART1 with full HSSC present; FULL_ELSE_PART1 with and without full HSSC; FULL_ONLY with only Part-I → UNKNOWN |
| Test inputs | Edition-specific totals (e.g. /200 vs /180); percentile input; best-of-attempts vs latest; expired validity window; alternative accepted tests; test below minimum-to-qualify |
| Adjustments | Fixed bonus; range bonus → min/max band; per-late-session deduction with cap; exemptions; bonus excluded from eligibility thresholds |
| Rounding | HALF_UP vs TRUNCATE; component vs final; 4 and 5 decimal outputs |
| Eligibility | Qualification type in/out; required subjects; overall and per-subject minimums; MAX_AGE on the closing date with exemptions (evening/self-supporting); gender; domicile; equivalence required; CONDITIONAL (deficiency) outcomes; UNKNOWN when inputs are missing |
| Invalid input | Obtained > total; negative marks; zero totals; non-numeric strings; missing mandatory components |
| Reserved categories | Category-specific rule sets and closing merits resolved correctly |
| Campus/programme-specific | Resolver picks the most specific assignment; equal-specificity overlap rejected; no assignment → "formula unavailable" |
| History comparison | Uses the formula of each historical year; rank-based closings never compared; "not comparable" when formulas differ without the equivalence flag |
| Classification | SAFE/TARGET/REACH boundaries exactly at the thresholds; NO_DATA with fewer than the minimum comparable years; policy version recorded |
| Reverse calculation | Required score found; infeasible target (> total) reported; consistency: plugging the required score back in reaches the target |
| Properties (fast-check) | Aggregate is monotonic non-decreasing in each component; aggregate within [0, base + max bonus]; determinism; decimal stability |
| Snapshots | Saved calculation unchanged after a new formula version or engine release |

## 4. Search tests (Phase 10)

- **Accuracy:** a fixture corpus with expected top results for queries including abbreviations ("UET", "PU"), typos ("comsat", "nust islambad"), programme names ("bscs", "software engineering"), and city + discipline.
- **Filters:** each filter alone and in combinations; fee range edge values; admission status by date.
- **Sorting:** stable ordering; ties broken deterministically.
- **Pagination:** totals correct; no duplicates or gaps across pages; page beyond the end.
- **Visibility:** unverified, archived and draft records never appear.
- **Performance:** p95 < 300 ms on a production-sized synthetic dataset.

## 5. Data management tests (Phases 6, 9, 13)

- **CSV/XLSX import:** valid file; wrong headers; bad codes/slugs; obtained > total; duplicate rows within the file; duplicates against the DB (exact + trigram); partial-failure report; re-upload idempotency.
- **Approval workflow:**
  - draft → submit → approve/reject;
  - **reviewer ≠ submitter** for Tier-1;
  - a Tier-1 record cannot be verified without a source;
  - no automated origin can approve;
  - concurrent edits detected (`base_revision`).
- **Historical preservation:**
  - verified formula versions cannot be mutated (DB trigger test);
  - revisions written on every approval;
  - the audit log is append-only (UPDATE/DELETE denied for the app role).
- **Freshness:** the OUTDATED sweep marks records at session end; source-hash change opens issues.

## 6. Application tests

| Area | Tests |
|---|---|
| Authentication | Register, verify email, login/logout, wrong password backoff, reset flow, Google OAuth (mocked provider), session expiry/rotation/revocation, MFA required for staff routes |
| Authorisation | **Role × endpoint matrix** generated from the permission map: every protected endpoint tested for allowed and denied roles; representatives limited to their university (R3) |
| API | Contract tests; problem+json error shape; rate-limit responses; CSRF enforcement on mutations |
| Mobile responsiveness | Playwright projects at 360×800 (Android), 390×844 (iPhone), 768, 1280; key journeys J1–J5 |
| Accessibility | axe: no serious/critical violations on key pages; keyboard-only calculator flow; screen-reader labels; colour contrast AA |
| Performance | Lighthouse CI budgets (REQUIREMENTS NFR-PERF); bundle-size budget check |
| Security | ZAP baseline on staging; dependency audit; secret scan; upload type/size validation; XSS payloads in user-supplied fields (reports, inquiries); SQL injection probes on search params |
| Privacy | Account deletion removes or pseudonymises data; export contains all user data; inquiries only shared with consent |

## 7. End-to-end journeys (must pass before launch)

- **J1:** search → programme page → calculate → sign up → saved calculation visible.
- **J2:** Best Fit with a complete profile → grouped results → compare → shortlist → subscribe to deadlines.
- **J3:** required-score calculation for 3 programmes.
- **J4:** calendar filter → .ics download; reminder email sent (test mailbox).
- **J6:** data manager creates a formula → tester passes → submits → a different reviewer approves → the public page shows the new formula (after revalidation).
- **J7:** error report → issue in the admin queue → fix via change request → resolved.

## 8. Environments and data for testing

| Env | Data |
|---|---|
| Local/CI | ILLUSTRATIVE fixtures generated by factories; golden cases from official worked examples (inputs and outputs only) |
| Staging | Reference data + a copy of verified institutional data + synthetic test accounts. **No real student data** |
| Production | Smoke tests only (read-only checks, synthetic monitoring) |

## 9. CI quality gates (every PR)

1. Lint + format check
2. Typecheck (strict)
3. Unit + integration tests (with Postgres service)
4. Merit engine coverage = 100% branches
5. Migration check (fresh DB `migrate deploy` + drift check)
6. Build all apps
7. E2E smoke on a preview deploy (key journeys)
8. Lighthouse CI on preview (public pages)

## 10. Reporting

- Each phase report in `DEVELOPMENT_PROGRESS.md` lists the test suites added and the pass status, linked to the CI run.
- Known gaps are listed explicitly, never hidden.
