import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { BACK_COVER_HTML, FRONT_COVER_HTML } from "../ebook/ebook-covers";
import { EBOOK_CSS } from "../ebook/ebook-styles";
import { Story } from "../models/story.model";
import { StoryService } from "./story.service";

const BATCH_SIZE = 6;

const TOKEN_NAMES = [
  "--ink",
  "--ink-soft",
  "--paper",
  "--paper-deep",
  "--line",
  "--accent",
  "--accent-deep",
  "--muted",
  "--gold",
  "--on-ink-muted",
  "--font-display",
  "--font-reading",
  "--font-body",
  "--radius-md",
  "--shadow-1",
];

const DOCUMENT_SCRIPT = `
<script>
function printEbook() {
  var printed = false;
  function go() { if (!printed) { printed = true; window.print(); } }
  function imagesReady() {
    var images = Array.prototype.slice.call(document.images);
    return Promise.all(images.map(function (img) {
      if (img.complete) { return Promise.resolve(); }
      return new Promise(function (resolve) {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      });
    }));
  }
  var fonts = document.fonts && document.fonts.ready
    ? document.fonts.ready : Promise.resolve();
  Promise.all([fonts, imagesReady()]).then(go, go);
  setTimeout(go, 5000);
}
function downloadEbook() {
  var copy = document.documentElement.cloneNode(true);
  var bar = copy.querySelector('.print-bar');
  if (bar) { bar.parentNode.removeChild(bar); }
  var scripts = copy.querySelectorAll('script');
  for (var i = scripts.length - 1; i >= 0; i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  var markup = '<!doctype html>\\n' + copy.outerHTML;
  var blob = new Blob([markup], { type: 'text/html;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = 'a-thousand-stories-selected-edition.html';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
}
<\/script>`;

@Injectable({ providedIn: "root" })
export class EbookService {
  private readonly storyService = inject(StoryService);

  /** Must be called synchronously from the click handler to beat pop-up blockers. */
  openTab(): Window | null {
    return window.open("", "_blank");
  }

  showPreparing(tab: Window): void {
    tab.document.open();
    tab.document.write(
      '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
        "<title>Preparing your eBook — A Thousand Stories</title></head>" +
        '<body style="margin:0;background:#faf7f2;color:#191714;font-family:system-ui,sans-serif;' +
        'display:flex;align-items:center;justify-content:center;min-height:100vh">' +
        "<p>Preparing your eBook…</p></body></html>",
    );
    tab.document.close();
  }

  showError(tab: Window): void {
    tab.document.open();
    tab.document.write(
      '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
        "<title>eBook unavailable — A Thousand Stories</title></head>" +
        '<body style="margin:0;background:#faf7f2;color:#191714;font-family:system-ui,sans-serif;' +
        'display:flex;align-items:center;justify-content:center;min-height:100vh">' +
        "<p>We could not build this eBook. Please close this tab and try again.</p>" +
        "</body></html>",
    );
    tab.document.close();
  }

  writeToTab(tab: Window, html: string): void {
    tab.document.open();
    tab.document.write(html);
    tab.document.close();
  }

  async buildDocument(
    slugs: string[],
    onProgress?: (done: number, total: number) => void,
  ): Promise<string> {
    const stories: Story[] = [];
    let done = 0;

    for (let i = 0; i < slugs.length; i += BATCH_SIZE) {
      const batch = slugs.slice(i, i + BATCH_SIZE);
      const loaded = await Promise.all(
        batch.map((slug) =>
          firstValueFrom(this.storyService.getStoryBySlug(slug)).catch(
            () => undefined,
          ),
        ),
      );
      for (const story of loaded) {
        if (story) {
          stories.push(story);
        }
      }
      done += batch.length;
      onProgress?.(Math.min(done, slugs.length), slugs.length);
    }

    return this.render(stories);
  }

  downloadHtml(html: string): void {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "a-thousand-stories-selected-edition.html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private render(stories: Story[]): string {
    const contents = stories
      .map(
        (story, index) => `<li>
      <a href="#story-${this.escape(story.slug)}">
        <span class="toc-num">${this.number(index)}</span>
        <span class="toc-person">${this.escape(story.personName)}</span>
        <span class="toc-title">${this.escape(story.title)}</span>
      </a>
    </li>`,
      )
      .join("\n");

    const articles = stories
      .map((story, index) => this.renderStory(story, index, stories.length))
      .join("\n");

    const references = this.renderReferences(stories);

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>A Thousand Stories — Selected Edition</title>
<style>
${EBOOK_CSS}
${this.rootTokens()}
</style>
</head>
<body>
<div class="print-bar" role="toolbar" aria-label="eBook actions">
  <strong>A Thousand Stories</strong>
  <span>${stories.length} ${stories.length === 1 ? "story" : "stories"} selected</span>
  <button type="button" onclick="printEbook()">Print / Save as PDF</button>
  <button type="button" class="secondary" onclick="downloadEbook()">Download HTML</button>
</div>
${FRONT_COVER_HTML}
<nav class="contents" aria-label="Contents">
  <h1>Contents</h1>
  <p class="contents-lead">${stories.length} ${stories.length === 1 ? "story" : "stories"} from A Thousand Stories</p>
  <ol>${contents}</ol>
</nav>
${articles}
${references}
${BACK_COVER_HTML}
${DOCUMENT_SCRIPT}
</body>
</html>`;
  }

  private renderStory(story: Story, index: number, total: number): string {
    const hero = story.heroImage
      ? `<figure class="story-portrait">
        <img src="${this.absoluteUrl(story.heroImage)}" alt="Image of ${this.escape(story.personName)}" />
        <figcaption>Image credit is listed in the references at the end of this edition.</figcaption>
      </figure>`
      : "";

    const chapters = story.chapters?.length
      ? story.chapters
          .map((chapter, chapterIndex) => {
            const media = chapter.media
              ? `<figure class="chapter-figure">
          <img src="${this.absoluteUrl(chapter.media.src)}" alt="${this.escape(chapter.media.alt)}" />
          <figcaption>${this.escape(chapter.media.caption ?? "")}${
            chapter.media.credit
              ? ` <span class="photo-credit">&middot; ${this.escape(chapter.media.credit)}</span>`
              : ""
          }</figcaption>
        </figure>`
              : "";
            const paragraphs = chapter.paragraphs ?? [];
            // Label + opening paragraph travel as one unbreakable group: Chrome
            // ignores break-after: avoid on the flex label when a large image
            // follows. The figure is placed AFTER this group, never inside it.
            const openingParagraph = paragraphs[0]
              ? `<p class="chapter-text drop-cap">${this.escape(paragraphs[0])}</p>`
              : "";
            const rest = paragraphs
              .slice(1)
              .map(
                (paragraph) =>
                  `<p class="chapter-text">${this.escape(paragraph)}</p>`,
              )
              .join("\n");
            return `<section class="chapter">
        <div class="chapter-opening">
          <p class="chapter-label"><span class="chapter-num">${this.number(chapterIndex)}</span>${this.escape(chapter.heading)}</p>
          ${openingParagraph}
        </div>
        ${media}
        ${rest}
      </section>`;
          })
          .join("\n")
      : this.legacyChapters(story);

    return `<article class="story" id="story-${this.escape(story.slug)}">
  <header class="story-head">
    <p class="story-position">Story ${this.number(index)} of ${this.number(total - 1)}</p>
    <p class="story-kicker">The story of</p>
    <h1 class="story-name">${this.escape(story.personName)}</h1>
    <p class="story-title">${this.escape(story.title)}</p>
    <p class="story-standfirst">${this.escape(story.shortDescription)}</p>
    ${hero}
  </header>
  ${chapters}
</article>`;
  }

  /** All sources in one section at the end of the book, grouped by story so
      each reference keeps its attribution. Replaces the per-story lists. */
  private renderReferences(stories: Story[]): string {
    const groups = stories
      .map((story, index) => {
        const sources = story.sources
          .map(
            (source) => `<li>
        <a href="${this.escape(source.url)}">${this.escape(source.title)}</a>
        <p class="source-meta">${this.escape(source.publisher)}${
          source.publishedDate ? ` &middot; ${this.escape(source.publishedDate)}` : ""
        }</p>
        ${source.note ? `<p class="source-note">${this.escape(source.note)}</p>` : ""}
      </li>`,
          )
          .join("\n");
        return `<div class="references-group">
    <h2><span class="references-num">${this.number(index)}</span><span class="references-person">${this.escape(story.personName)}</span><span class="references-title">${this.escape(story.title)}</span></h2>
    <ol>${sources}</ol>
  </div>`;
      })
      .join("\n");

    return `<section class="book-references" aria-label="References">
  <h1>References</h1>
  <p class="references-lead">Sources for all ${stories.length} ${
    stories.length === 1 ? "story" : "stories"
  } in this edition, grouped by story.</p>
  ${groups}
</section>`;
  }

  private legacyChapters(story: Story): string {
    const sections: Array<[string, string]> = [
      ["The challenge", story.challenge],
      ["The journey", story.journey],
      ["What happened", story.achievement],
      ["The impact", story.impact],
    ];
    const body = sections
      .map(
        ([heading, text], index) => `<section class="chapter">
      <div class="chapter-opening">
        <p class="chapter-label"><span class="chapter-num">${this.number(index)}</span>${heading}</p>
        <p class="chapter-text${index === 0 ? " drop-cap" : ""}">${this.escape(text)}</p>
      </div>
    </section>`,
      )
      .join("\n");
    return `${body}
<section class="chapter">
  <div class="chapter-opening">
    <p class="chapter-label"><span class="chapter-num">${this.number(sections.length)}</span>What we can learn</p>
    <blockquote class="lesson-quote">${this.escape(story.lesson)}</blockquote>
  </div>
</section>`;
  }

  private rootTokens(): string {
    const computed = getComputedStyle(document.documentElement);
    const declarations = TOKEN_NAMES.map((name) => {
      const value = computed.getPropertyValue(name).trim();
      return value ? `  ${name}: ${value};` : "";
    }).filter(Boolean);
    return `:root {\n${declarations.join("\n")}\n}`;
  }

  private absoluteUrl(src: string): string {
    if (!src) {
      return "";
    }
    try {
      return new URL(src, document.baseURI).href;
    } catch {
      return src;
    }
  }

  private escape(value: string | number | undefined): string {
    if (value === undefined || value === null) {
      return "";
    }
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  private number(index: number): string {
    return String(index + 1).padStart(2, "0");
  }
}
