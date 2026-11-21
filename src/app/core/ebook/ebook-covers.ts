// Fixed front and back cover pages for every generated eBook.
// These are authored once and injected around the selected-story content —
// no per-selection layout, no build step, no external asset.

const INFINITY_SVG = `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916z"/></svg>`;

export const FRONT_COVER_HTML = `
<section class="book-cover book-cover--front" aria-label="Front cover">
  <div class="cover-frame">
    <div class="cover-mark">${INFINITY_SVG}</div>
    <p class="cover-eyebrow">A living archive of real lives</p>
    <h1 class="cover-title">A Thousand<br />Stories</h1>
    <p class="cover-author">by alfadev</p>
    <p class="cover-tagline">No fiction &middot; Just people who lived</p>
  </div>
</section>`;

export const BACK_COVER_HTML = `
<section class="book-cover book-cover--back" aria-label="Back cover">
  <div class="cover-frame cover-frame--back">
    <div class="cover-mark cover-mark--small">${INFINITY_SVG}</div>
    <h2 class="back-title">A Thousand Stories</h2>
    <p class="back-intro">
      Real people, real lives, documented from the world as it happened —
      never invented, never dressed up. Every story carries the sources
      it was built from.
    </p>
    <p class="back-credit">by alfadev</p>
    <div class="disclaimer">
      <h3>Disclaimer</h3>
      <p>
        The stories, images and other material in this collection have been
        gathered from publicly available sources on the internet. No copyright
        or ownership is claimed over this compilation, and it is shared for
        inspiration and information purposes only. All original sources and
        image credits remain with their respective authors and publishers and
        are listed in the references at the end of this edition. If you are a
        rights holder with a concern
        about any material here, please contact choudhary98akash@gmail.com.
      </p>
    </div>
  </div>
</section>`;
