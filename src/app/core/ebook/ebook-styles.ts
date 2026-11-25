// Self-contained stylesheet for the generated eBook document.
// The design tokens are injected as a :root block by EbookService at build
// time, so this file only references the variables — it never hardcodes a
// colour. Keep the visual rules aligned with COLOR.md / story-detail.scss.

export const EBOOK_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,600&family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap");

@page {
  size: A4;
  margin: 18mm 16mm;
}

*,
*::before,
*::after { box-sizing: border-box; }

html {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-deep); }
img { display: block; max-width: 100%; }

/* ---------- Screen-only action bar ---------- */
.print-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 20px;
  background: var(--ink);
  color: var(--on-ink-muted);
  border-bottom: 1px solid var(--line);
  font-size: 13px;
}
.print-bar strong { color: #fff; font-weight: 600; }
.print-bar button {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 100px;
  padding: 8px 18px;
  cursor: pointer;
}
.print-bar button:hover { background: var(--accent-deep); border-color: var(--accent-deep); }
.print-bar button:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
.print-bar button.secondary {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.45);
}
.print-bar button.secondary:hover { border-color: #fff; }

/* ---------- Fixed covers ---------- */
.book-cover {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  background: var(--paper);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-1);
}
.cover-frame {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 40px;
}
.cover-frame::before {
  content: "";
  position: absolute;
  inset: 24px;
  border: 1px solid var(--line);
  pointer-events: none;
}
.cover-mark {
  width: 68px;
  height: 68px;
  color: var(--gold);
  margin-bottom: 30px;
}
.cover-mark svg { width: 100%; height: 100%; display: block; }
.cover-mark--small { width: 44px; height: 44px; margin-bottom: 22px; }
.cover-eyebrow {
  margin: 0 0 22px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--muted);
}
.cover-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(58px, 11vw, 108px);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: -0.03em;
  color: var(--ink);
}
.cover-author {
  margin: 20px 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 27px;
  color: var(--accent);
}
.cover-tagline {
  margin: 30px 0 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
}
.book-cover--front {
  break-before: auto;
  page-break-before: auto;
  break-after: page;
  page-break-after: always;
}
.book-cover--back {
  break-before: page;
  page-break-before: always;
  break-after: auto;
  page-break-after: auto;
}
.cover-frame--back { justify-content: flex-start; text-align: left; padding: 70px 64px; }
.cover-frame--back::before { inset: 24px; }
.cover-frame--back .cover-mark { margin-bottom: 26px; }
.back-title {
  margin: 0 0 18px;
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 900;
  color: var(--ink);
}
.back-intro {
  max-width: 560px;
  margin: 0;
  font-family: var(--font-reading);
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-soft);
}
.back-credit {
  margin: 20px 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 17px;
  color: var(--accent);
}
.disclaimer {
  align-self: stretch;
  max-width: 620px;
  margin-top: 52px;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}
.disclaimer h3 {
  margin: 0 0 10px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
}
.disclaimer p {
  margin: 0;
  font-size: 12px;
  line-height: 1.75;
  color: var(--muted);
}

/* ---------- Contents ---------- */
.contents {
  max-width: 760px;
  margin: 0 auto;
  padding: 64px 24px 40px;
  break-before: auto;
  page-break-before: auto;
}
.contents h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(38px, 6vw, 52px);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.contents-lead {
  margin: 10px 0 28px;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--muted);
}
.contents ol { list-style: none; margin: 0; padding: 0; }
.contents li { border-bottom: 1px solid var(--line); }
.contents a {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 15px 2px;
  color: var(--ink);
}
.contents a:hover { color: var(--accent); }
.toc-num {
  flex: 0 0 auto;
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--gold);
  font-variant-numeric: tabular-nums;
}
.toc-person { font-weight: 600; }
.toc-title {
  margin-left: auto;
  text-align: right;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 14px;
  color: var(--muted);
}

/* ---------- Stories ---------- */
.story {
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 24px 24px;
  /* Stories flow on to reclaim space. A forced break on EVERY story makes
     Chrome emit an empty page whenever a story ends exactly at a page foot
     (the final gold ornament + break collide). Only the first story is
     forced below Contents; the rest start wherever there is room. */
  break-before: auto;
  page-break-before: auto;
}
.contents + .story {
  break-before: page;
  page-break-before: always;
}
.story-head {
  padding-bottom: 28px;
  margin-bottom: 42px;
  border-bottom: 1px solid var(--line);
}
.story-position {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}
.story-kicker {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--accent);
}
.story-name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(40px, 7vw, 64px);
  font-weight: 900;
  line-height: 1.02;
  letter-spacing: -0.02em;
}
.story-title {
  margin: 10px 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 22px;
  color: var(--muted);
}
.story-standfirst {
  margin: 20px 0 0;
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.story-portrait {
  margin: 28px 0 0;
  max-width: 260px;
  break-inside: avoid;
  page-break-inside: avoid;
}
.story-portrait img {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-1);
}
.story-portrait figcaption {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}
.chapter { margin-bottom: 46px; }
/* Chapters flow on: the next one starts on the current page whenever there
   is room, instead of burning a mostly-empty page. The chapter-opening group
   below is unbreakable, so Chrome moves the heading + opening paragraph to
   the next page only when they genuinely do not fit — which gives the
   "break when little space is left, continue when plenty is left" behaviour
   without needing an exact percentage (CSS cannot measure remaining space). */
.chapter + .chapter {
  break-before: auto;
  page-break-before: auto;
}
/* Keep the chapter's last line attached to the closing ornament so the
   mark can never be stranded alone at the top of a page. */
.chapter > :last-child {
  break-after: avoid;
  page-break-after: avoid;
}
/* The label and opening paragraph travel as a single unbreakable unit.
   This is the reliable way to stop a heading being stranded at a page bottom —
   break-after: avoid on a flex container is not honoured consistently. */
.chapter-opening {
  break-inside: avoid;
  page-break-inside: avoid;
}
/* Small centred gold end-of-chapter mark. Kept on screen too, so the web
   reading experience matches the printed book. */
.chapter::after {
  content: "◆";
  display: block;
  text-align: center;
  color: var(--gold);
  font-size: 12px;
  margin-top: 24px;
  break-before: avoid;
  page-break-before: avoid;
}
.chapter-label {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0 0 20px;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
}
.chapter-num {
  font-size: 11px;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--gold);
}
.chapter-text {
  margin: 0 0 1.35em;
  font-family: var(--font-reading);
  font-size: 19px;
  line-height: 1.85;
  color: var(--ink-soft);
  orphans: 3;
  widows: 3;
}
.chapter-text:last-child { margin-bottom: 0; }
.drop-cap::first-letter {
  float: left;
  margin: 0.05em 0.14em 0 0;
  font-family: var(--font-display);
  font-size: 3.4em;
  font-weight: 900;
  line-height: 0.78;
  color: var(--accent);
}
.chapter-figure {
  float: right;
  width: min(42%, 320px);
  margin: 8px 0 18px 24px;
  break-inside: avoid;
  page-break-inside: avoid;
}
.chapter-figure img {
  width: 100%;
  max-height: 82mm;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-1);
  background: var(--paper-deep);
}
.chapter-figure figcaption {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted);
}
.photo-credit { font-style: italic; }
.lesson-quote {
  margin: 0;
  padding: 6px 0 6px 26px;
  border-left: 4px solid var(--accent);
  font-family: var(--font-display);
  font-style: italic;
  font-size: 26px;
  line-height: 1.4;
  color: var(--ink);
  break-inside: avoid;
  page-break-inside: avoid;
}
/* ---------- References (all sources, grouped by story, at the end) ---------- */
.book-references {
  max-width: 760px;
  margin: 0 auto;
  padding: 64px 24px 40px;
  break-before: page;
  page-break-before: always;
}
.book-references h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(34px, 5vw, 46px);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.references-lead {
  margin: 10px 0 28px;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--muted);
}
.references-group {
  margin: 0 0 30px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
.references-group h2 {
  margin: 0 0 12px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.4;
}
.references-num {
  display: inline-block;
  margin-right: 10px;
  color: var(--gold);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}
.references-person { font-weight: 700; }
.references-title {
  display: block;
  margin-top: 2px;
  font-family: var(--font-body);
  font-size: 13px;
  font-style: italic;
  font-weight: 400;
  color: var(--muted);
}
.references-group ol { margin: 0; padding-left: 22px; }
.references-group li {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.6;
  break-inside: avoid;
  page-break-inside: avoid;
}
.source-meta { margin: 2px 0 0; font-size: 13px; color: var(--muted); }
.source-note { margin: 3px 0 0; font-size: 12px; color: var(--muted); font-style: italic; }
/* A heading must never be stranded at the bottom of a page without its
   content. Chapter labels and the story title lines are <p>, not <h2>, so
   they need to be named explicitly here. */
h1, h2, h3,
.story-position,
.story-kicker,
.story-name,
.story-title,
.story-standfirst,
.chapter-label,
.contents h1,
.references-group h2 {
  break-after: avoid;
  page-break-after: avoid;
}
/* Widow/orphan control on all prose, not just chapter paragraphs. */
.story-standfirst,
.back-intro,
.disclaimer p,
.source-meta,
.source-note {
  orphans: 3;
  widows: 3;
}

@media print {
  .print-bar { display: none !important; }

  /* One forced break per page unit: cover -> contents -> stories -> back.
     Flex and floats paginate unpredictably, so print uses plain block flow. */
  /* Covers size to their content and stay unbreakable. Fixed page-height
     covers overflow whenever the browser applies different print margins or
     scale, so they are deliberately avoided here. */
  .book-cover {
    display: block;
    width: 100%;
    height: auto;
    min-height: 0;
    margin: 0;
    border: 0;
    box-shadow: none;
    overflow: visible;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .cover-frame {
    display: block;
    height: auto;
    padding: 52mm 20mm 24mm;
    text-align: center;
  }
  .cover-frame::before { display: none; }
  .cover-mark { margin: 0 auto 8mm; }
  .cover-eyebrow { margin-bottom: 7mm; }
  .cover-title { font-size: 68px; }
  .cover-author { margin-top: 7mm; }
  .cover-tagline { margin-top: 9mm; }
  .cover-frame--back {
    height: auto;
    padding: 30mm 20mm 24mm;
    text-align: left;
  }
  .cover-frame--back .cover-mark { margin: 0 0 8mm; }
  .back-title { font-size: 30px; }
  .disclaimer { margin-top: 10mm; padding-top: 5mm; }

  .contents, .story, .book-references { padding-left: 0; padding-right: 0; }
  .contents, .story, .book-references { padding-top: 0; }

  /* Chrome paginates flex containers unpredictably. A plain block heading
     keeps break-after: avoid working, so it cannot be left at a page foot. */
  .chapter-label { display: block; }
  .chapter-num { margin-right: 12px; }

  /* No floats in print: a figure must stay exactly where it appears in the
     text, or Chrome defers it to a later page and the reading order breaks. */
  .chapter-figure {
    float: none;
    clear: both;
    width: 100%;
    margin: 6mm 0 8mm;
    text-align: center;
  }
  .chapter-figure img {
    width: auto;
    max-width: 100%;
    max-height: 82mm;
    margin: 0 auto;
    object-fit: contain;
  }
  .chapter-figure figcaption { text-align: center; }

  /* The references section and each story group may span many pages; only
     individual source entries are kept intact. */
  .chapter { break-inside: auto; page-break-inside: auto; }
  a { color: var(--ink); }
}

@media screen and (max-width: 640px) {
  .chapter-figure { float: none; clear: both; width: 100%; margin: 4px 0 20px; }
  .contents a { flex-wrap: wrap; gap: 6px 12px; }
  .toc-title { margin-left: 0; text-align: left; width: 100%; }
}
`;
