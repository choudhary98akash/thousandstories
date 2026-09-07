# A Thousand Stories — Status

- Phase: Phase 1 — Daily Story Pipeline
- Milestone: Angular scaffold + deploy live; daily story pipeline defined (see `docs/daily-story-workflow.md`)
- Content: 1 story in `src/assets/data/stories.json` — Abraham Lincoln (id 1), the first long-form narrative per `docs/daily-story-workflow.md`: 3,299 words (102-word intro + 8 flexible chapters), 5 free-license images with credits, full sources. Writing must follow the reader-first "orator's plan" (assume zero prior knowledge; orient before conveying). Prior short-form stories were removed by request; the legacy fixed-section fallback stays in the component for future back-compat.
- Editorial format (ADR-002): `StoryChapter { heading, paragraphs[], media? }` — chapter media floats beside text (inline figure, alternating sides), Source Serif 4 reading font + drop caps, numbered chapters. No separate image gallery.
- Reader feedback channel: `mailto:choudhary98akash@gmail.com` in the footer (all pages) and on the About page.
- Done today (2026-09-07):
  1. Long-form chapter format (model + story-detail rendering) and Lincoln as the only, fully long-form story
  2. Editorial layout redesign: inline floated chapter figures, Source Serif 4 body, drop caps, MQ reset
  3. Per-story SEO + prerendered story preview pages (`scripts/prerender-stories.mjs`) so shared links show the hero portrait; `og-default.png` brand banner fallback; sitemap/robots in CI
  4. Reader-first "orator's plan" writing rules added to `docs/daily-story-workflow.md` (mandatory), with a pipeline familiarity check
  5. Feedback email (footer + About); STRUCTURE.md/DECISIONS (ADR-002, ADR-003)/memory synced
- Next steps:
  1. Next story: id 2 (2/1000) per `docs/daily-story-workflow.md` — reader-first from the first line
  2. Optional later: @angular/ssr prerendering for strongest per-story indexability
  3. Visual QA on a real phone (header, footer grid, reader layout)
- Blockers: None
- Note: `ng lint` has no target configured (ESLint not installed). Definition of Done lint step skipped until we add angular-eslint (ask first before adding deps).
- Last updated: 2026-09-07