# A Thousand Stories — Status

- Phase: Phase 1 — Daily Story Pipeline
- Milestone: Angular scaffold + deploy live; daily story pipeline defined (see `docs/daily-story-workflow.md`)
- Content: 10 stories in `src/assets/data/stories.json` — Lincoln (id 1), Kalam (2), Jobs (3), Oprah (4), Satyarthi (5), Murad (6), Malala (7), Yunus (8), Keller (9), Mandela (10). All follow the long-form narrative per `docs/daily-story-workflow.md`: reader-first "orator's plan" (assume zero prior knowledge; orient before conveying), 2,500–3,500 words, free-license images with credits, full sources. The legacy fixed-section fallback stays in the component for back-compat.
- Editorial format (ADR-002): `StoryChapter { heading, paragraphs[], media? }` — chapter media floats beside text (inline figure, alternating sides), Source Serif 4 reading font + drop caps, numbered chapters. No separate image gallery.
- Reader feedback channel: `mailto:choudhary98akash@gmail.com` in the footer (all pages) and on the About page.
- Done today (2026-09-07):
  1. Long-form chapter format (model + story-detail rendering) and Lincoln as the only, fully long-form story
  2. Editorial layout redesign: inline floated chapter figures, Source Serif 4 body, drop caps, MQ reset
  3. Per-story SEO + prerendered story preview pages (`scripts/prerender-stories.mjs`) so shared links show the hero portrait; `og-default.png` brand banner fallback; sitemap/robots in CI
  4. Reader-first "orator's plan" writing rules added to `docs/daily-story-workflow.md` (mandatory), with a pipeline familiarity check
  5. Feedback email (footer + About); STRUCTURE.md/DECISIONS (ADR-002, ADR-003)/memory synced
- Done today (2026-09-15):
  1. Cloudflare Web Analytics script added to `src/index.html` (module script, data-cf-beacon token) — loads on every SPA page including stories
  2. Story 10 (10/1000): Nelson Mandela — 3,463 words (109-word intro + 7 flexible chapters): Transkei boyhood → Clarkebury/Fort Hare → ANC Youth League & Defiance Campaign → Umkhonto we Sizwe & Rivonia → 27 years (Robben Island/Pollsmoor/Victor Verster) → release & 1994 presidency → single-term legacy. 6 Commons-verified images: hero `Nelson Mandela 1994.jpg` (CC BY-SA 2.0, Kingkongphoto); Qunu (CC BY 2.0, Salym Fayad); Fort Hare (CC BY-SA 4.0, Vysotsky); burn-pass 1960 (PD); Robben cell (CC BY 3.0); Clinton-in-cell 1998 (PD, White House). 13 sources; build green + all 10 story pages prerendered
- Next steps:
  1. Next story: id 11 (11/1000) per `docs/daily-story-workflow.md` — reader-first from the first line
  2. Optional later: @angular/ssr prerendering for strongest per-story indexability
  3. Visual QA on a real phone (header, footer grid, reader layout)
- Blockers: None
- Note: `ng lint` has no target configured (ESLint not installed). Definition of Done lint step skipped until we add angular-eslint (ask first before adding deps).
- Last updated: 2026-09-15