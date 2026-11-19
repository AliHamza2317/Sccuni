# Sccuni

**Pakistan's University Admission & Merit Intelligence Platform.** It helps students find programmes they are eligible for, calculate their aggregate under each university's official formula, compare it with verified past closing merits, and never miss a deadline. Every fact is traceable to an official source.

> **Status:** Phase 0 (discovery and planning), awaiting approval. No application code yet.

## Documentation

| Document | Purpose |
|---|---|
| [Requirements (PRD)](docs/REQUIREMENTS.md) | What we are building and why |
| [Project plan](docs/PROJECT_PLAN.md) | Phases, milestones, dependencies |
| [Development progress](docs/DEVELOPMENT_PROGRESS.md) | Live status and phase reports |
| [System architecture](docs/SYSTEM_ARCHITECTURE.md) | Stack, components, merit engine, publishing pipeline |
| [Database design](docs/DATABASE_DESIGN.md) | ERDs, tables, indexes, migrations |
| [API documentation](docs/API_DOCUMENTATION.md) | Planned REST API |
| [Data collection strategy](docs/DATA_COLLECTION_STRATEGY.md) | Sources, verification, quality, operations |
| [Testing plan](docs/TESTING_PLAN.md) | Test strategy and quality gates |
| [Deployment guide](docs/DEPLOYMENT_GUIDE.md) | Environments, CI/CD, launch checklist |
| [Changelog](CHANGELOG.md) | Notable changes |
| [Research](docs/research/) | Official-source evidence and competitor analysis |

## Product principles

1. Accuracy matters more than the quantity of data.
2. Every important admission fact has a traceable source.
3. Historical merit is stored separately by academic year.
4. Every university can have its own merit formula, as data rather than code.
5. Eligibility is checked before anything is recommended.
6. Students can see how their aggregate was calculated.
7. Recommendations are transparent.
8. Outdated information is labelled.
9. Admins can correct data without developers.
10. The platform is mobile-first.
11. The platform stays maintainable as it grows.
12. Paid promotion never manipulates organic recommendations.
