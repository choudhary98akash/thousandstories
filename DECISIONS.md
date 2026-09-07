# Decision Records

APPEND-ONLY. Add entries when you make a durable architectural/policy decision.

## Index
| ID | Title | Date | Status |
| --- | --- | --- | --- |
| ADR-001 | Static JSON for Phase 1 data | 2026-09-04 | Accepted |
| ADR-002 | Long-form flexible-chapter story format | 2026-09-07 | Accepted |

## ADR-001: Static JSON for Phase 1 data
- Date: 2026-09-04 | Status: Accepted
- Context: Phase 1 has no backend. Need to store 1,000 stories somewhere the Angular app can read them on GitHub Pages.
- Decision: Store all story data as static JSON files in `src/assets/data/`. Load via Angular services at build/runtime.
- Consequences: Simple deployment, no server costs, easy to maintain. Limits real-time updates; content changes require rebuild + redeploy.
- Rejected alternatives: Firebase (overkill for V1), Markdown files (harder to query/filter), headless CMS (not needed yet).

## ADR-002: Long-form flexible-chapter story format
- Date: 2026-09-07 | Status: Accepted
- Context: Early condensed stories (~600–1,000 words in fixed sections) felt too thin. The reader experience is meant to be immersive, archive-quality, per-person.
- Decision: `Story` grows optional `chapters: StoryChapter[]` (each `{ heading, paragraphs[] }`) and `images: StoryImage[]` (gallery with caption + credit). New stories are 2,500–3,500 words total with a ~100-word `introduction` hook and 3–5 free-license images with full attribution. The fixed legacy sections stay as a fallback so existing stories keep rendering unchanged.
- Consequences: Richer storytelling and stronger long-tail content; larger JSON per story; story-detail renders chapter headings in the story's own order and shows a photo gallery.
- Rejected alternatives: Rewriting old stories now (too costly; migrate on demand), per-story HTML files (breaks the single JSON data source, ADR-001).

Rule: agents reference IDs (e.g. "ADR-001"), never restate the decision inline.
Reason: one source of truth; the ID is a retrievable memory node.
