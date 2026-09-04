# Decision Records

APPEND-ONLY. Add entries when you make a durable architectural/policy decision.

## Index
| ID | Title | Date | Status |
| --- | --- | --- | --- |
| ADR-001 | Static JSON for Phase 1 data | 2026-09-04 | Accepted |

## ADR-001: Static JSON for Phase 1 data
- Date: 2026-09-04 | Status: Accepted
- Context: Phase 1 has no backend. Need to store 1,000 stories somewhere the Angular app can read them on GitHub Pages.
- Decision: Store all story data as static JSON files in `src/assets/data/`. Load via Angular services at build/runtime.
- Consequences: Simple deployment, no server costs, easy to maintain. Limits real-time updates; content changes require rebuild + redeploy.
- Rejected alternatives: Firebase (overkill for V1), Markdown files (harder to query/filter), headless CMS (not needed yet).

Rule: agents reference IDs (e.g. "ADR-001"), never restate the decision inline.
Reason: one source of truth; the ID is a retrievable memory node.
