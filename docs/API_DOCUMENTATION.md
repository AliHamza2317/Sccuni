# Sccuni — API Documentation

- **Status:** PLANNED. **No endpoint is implemented yet.** This document defines the intended v1 surface for approval. Once the API exists, the authoritative reference is the generated OpenAPI spec (`/v1/docs`), and this file summarises it.
- **Last updated:** 19 Nov 2026.

## 1. Conventions

| Topic | Convention |
|---|---|
| Base URL | `https://api.<domain>/v1` (staging: `https://api.staging.<domain>/v1`) |
| Format | JSON (UTF-8). Dates in ISO 8601; admission dates also carry `timezone: "Asia/Karachi"` |
| Numbers | Marks, aggregates and money are returned as **strings** (e.g. `"93.6033"`), to preserve exact decimal precision |
| Auth | Browser: `httpOnly` session cookie + CSRF token header (`X-CSRF-Token`) on mutations. Future mobile: bearer session token |
| Versioning | URI major version (`/v1`). Additive changes are non-breaking; breaking changes require `/v2` |
| Validation | Zod schemas (shared `packages/contracts`) → OpenAPI |
| Errors | RFC 9457 `application/problem+json`: `{ type, title, status, detail, instance, errors?: [{ path, message }] , requestId }` |
| Pagination | Public lists: `?page=1&pageSize=20` (max 50) → `{ data, page, pageSize, total }`. Admin feeds/logs: cursor `?cursor=…&limit=…` |
| Filtering/sorting | Query params, e.g. `?city=lahore&discipline=computer-science&sort=fee_asc` |
| Caching | Public GETs send `ETag` + `Cache-Control`; web uses ISR tags (`university:{id}` etc.) |
| Rate limits | Per IP/account; `429` with `Retry-After`. Stricter on auth, calculation and inquiry endpoints |
| Provenance | Every Tier-1/Tier-2 object includes `provenance: { verificationStatus, lastVerifiedAt, source: { title, url, publisher, academicYear }, locator }` |
| Visibility | Public endpoints return only `VERIFIED` data (plus labelled `OUTDATED` where documented) |

## 2. Public endpoints (no auth)

| Method | Path | Purpose | Req IDs |
|---|---|---|---|
| GET | `/universities` | Directory: `q, city, region, sector, discipline, level, test, admissionStatus, womenOnly, sort, page` | DISC-01…13 |
| GET | `/universities/{slug}` | Profile with campuses, HEC status, summaries, provenance | UNI-* |
| GET | `/universities/{slug}/programs` | Offerings grouped by discipline | UNI-04 |
| GET | `/search/offerings` | Programme search with facets (`facets=true`) | DISC-03…16 |
| GET | `/search/suggest?q=` | Typeahead (universities, programmes, cities) | DISC-02 |
| GET | `/offerings/{slug}` | Programme detail: eligibility, formula (current session), fees, merits, events, accreditation | PROG-* |
| GET | `/offerings/{slug}/merit-history` | Closing values by session × list × category (metric-typed) | HIST-* |
| GET | `/offerings/{slug}/fees?academicYear=` | Fee structures + estimate with assumptions | FEE-* |
| GET | `/intakes/{id}/rules` | Resolved formula version + eligibility rule version for the intake | MERIT-01, 07 |
| POST | `/merit/calculate` | Body: `{ intakeId, categoryId?, student }` → eligibility + aggregate + breakdown + historical comparison | MERIT-07…10 |
| POST | `/merit/calculate-batch` | Body: `{ intakeIds[], student }` → per-intake results (max N) | MERIT-10 |
| POST | `/merit/required-score` | Body: `{ intakeId, student, componentKey, target: "closing:<year>" \| value }` | MERIT-11 |
| POST | `/recommendations/best-fit` | Body: `{ student, preferences }` → grouped SAFE/TARGET/REACH/NO_DATA with explanations | FIT-* |
| GET | `/admissions/calendar` | Events: `from, to, city, discipline, university, test, type` | ADM-03, 04 |
| GET | `/admissions/calendar.ics` | iCalendar feed for a filter or subscription | ADM-06 |
| GET | `/entry-tests`, `/entry-tests/{code}` | Tests and editions (totals, dates) | ADM-02 |
| GET | `/scholarships`, `/scholarships/{slug}` | Directory and detail | SCH-* |
| GET | `/reference/{type}` | Regions, cities, disciplines, degree levels, qualification types, subjects | — |
| POST | `/comparisons` / GET `/comparisons/{shareToken}` | Create/read a shareable comparison | DISC-15 |
| POST | `/reports` | "Report incorrect information" `{ entityType, entityId, field?, message, email? }` | UNI-08 |
| POST | `/inquiries` | Student → university inquiry (consent required) | REP-01 |
| GET | `/content/{slug}` | Guides, FAQs, static pages | SEO-06 |

**Example — calculation result (shape only, ILLUSTRATIVE values):**

```jsonc
{
  "intakeId": "…",
  "eligibility": { "status": "ELIGIBLE", "checks": [{ "type": "MIN_PERCENT", "result": "PASS", "message": "HSSC ≥ X%" }] },
  "route": { "key": "intermediate", "label": "FSc / ICS" },
  "aggregate": "XX.XXXX",
  "range": null,                                  // { min, max } when a committee-graded bonus applies
  "components": [{ "key": "ssc", "label": "Matric", "obtained": "…", "total": "…", "weight": "…", "contribution": "…" }],
  "adjustments": [],
  "formula": { "versionId": "…", "session": "Fall 2026", "provenance": { "…": "…" } },
  "history": [{ "session": "Fall 2025", "list": "Final", "category": "Open Merit", "metric": "CLOSING_AGGREGATE",
                "closing": "…", "studentAggregateUnderThatYearsFormula": "…", "margin": "…", "comparable": true }],
  "engineVersion": "1.0.0",
  "disclaimer": "Past closing merit is an indicator, not a guarantee of admission."
}
```

## 3. Authentication endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/auth/register` | Email + password; sends a verification email |
| POST | `/auth/login` / `/auth/logout` | Session cookie create/revoke |
| GET | `/auth/google` / `/auth/google/callback` | OAuth |
| POST | `/auth/verify-email` | Token |
| POST | `/auth/password/forgot` / `/auth/password/reset` | Reset flow |
| POST | `/auth/mfa/setup` / `/auth/mfa/verify` | TOTP (required for staff) |
| GET | `/auth/csrf` | CSRF token |
| GET | `/auth/sessions` / DELETE `/auth/sessions/{id}` | Manage sessions |

## 4. Student endpoints (`/me`, role STUDENT)

| Method | Path | Purpose |
|---|---|---|
| GET/PATCH | `/me` | Account |
| GET/PUT | `/me/profile` | Student profile (domicile, stage, optional DOB/gender) |
| GET/POST/PATCH/DELETE | `/me/academic-records` | SSC, Part-I, HSSC, equivalences, DAE |
| GET/POST/PATCH/DELETE | `/me/test-scores` | Test attempts (actual/expected) |
| GET/PUT | `/me/preferences` | Fields, cities, budget, sector |
| GET/POST | `/me/calculations` | List/save (immutable). GET `/me/calculations/{id}` |
| GET/POST/DELETE | `/me/saved-items` | Universities, offerings, scholarships |
| GET/POST/DELETE | `/me/deadline-subscriptions` | Reminders |
| GET/PATCH | `/me/notifications` | List/mark read |
| GET | `/me/recommendations` | Best Fit for the saved profile |
| POST | `/me/export` / DELETE `/me` | Data export / account deletion |
| POST | `/me/consents` | Record consents (incl. guardian) |

## 5. Admin endpoints (`/admin/*`, staff roles, MFA required)

| Area | Endpoints (CRUD unless noted) |
|---|---|
| Institutions | `/admin/universities`, `/admin/campuses`, `/admin/departments`, `/admin/aliases`, `/admin/accreditations`, `/admin/admission-authorities` |
| Programmes | `/admin/programs`, `/admin/program-groups`, `/admin/offerings`, `/admin/intakes`, `/admin/seat-allocations` |
| Admissions | `/admin/admission-sessions`, `/admin/admission-events`, `/admin/admission-categories`, `/admin/application-guides` |
| Tests | `/admin/entry-tests`, `/admin/entry-test-editions` |
| Merit rules | `/admin/formulas`, `/admin/formula-versions` (+ `/routes`, `/components`, `/adjustments`), `POST /admin/formula-versions/{id}/test` (formula tester), `/admin/formula-assignments`, `GET /admin/admission-sessions/{id}/resolved-rules` (preview), `/admin/eligibility-rule-sets`, `/admin/eligibility-versions`, `/admin/eligibility-assignments` |
| History | `/admin/merit-lists`, `/admin/merit-closings` |
| Fees and scholarships | `/admin/fee-structures`, `/admin/fee-items`, `/admin/scholarship-providers`, `/admin/scholarships`, `/admin/scholarship-cycles` |
| Sources | `/admin/sources`, `POST /admin/assets/upload-url` (presigned), `/admin/source-monitors` |
| Verification | `GET /admin/change-requests?status=PENDING_REVIEW`, `POST /admin/change-requests/{id}/submit\|approve\|reject\|withdraw`, `GET /admin/{entity}/{id}/revisions` |
| Imports | `POST /admin/imports` (upload), `GET /admin/imports/{id}` (validation report), `POST /admin/imports/{id}/apply` |
| Quality | `/admin/data-quality-issues`, `/admin/reports` (user error reports), `/admin/coverage` |
| Users and roles | `/admin/users`, `/admin/users/{id}/roles` (Super Admin/Admin only) |
| Inquiries | `/admin/inquiries` |
| Content | `/admin/content-pages` |
| Settings | `/admin/settings`, `/admin/recommendation-policies` |
| Audit | `GET /admin/audit-logs` (read-only) |

**Mutation rule:** admin `POST/PATCH/DELETE` on verifiable entities create or modify **change requests**. They never change live records directly.

## 6. Internal endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/health/live`, `/health/ready` | Liveness/readiness (DB, queue) |
| POST | (web) `/api/revalidate` | Called by the worker with a signed secret to revalidate ISR tags |

## 7. Release 2/3 (reserved)

- `POST /advisor/conversations`, `POST /advisor/conversations/{id}/messages` (streaming), with citations and tool traces.
- `/rep/*`: representative dashboard, inquiries, change-request submissions.
