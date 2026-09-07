// Pre-renders a static story page for every story in stories.json so that
// link-preview scrapers (WhatsApp, Slack, Telegram, Discord, X, FB…)
// receive per-story OG/Twitter tags including the hero portrait.
//
// Pure Node — no dependencies. Run AFTER `ng build --configuration production`
// (reads the already-built index.html so base-href and hashed bundles are kept).
// Override the public site root with SITE_URL, otherwise it is inferred
// from `git remote get-url origin` (same as generate-sitemap.mjs).

import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DEFAULT_BANNER = "og-default.png";
const SITE_NAME = "A Thousand Stories";

// Resolve the location of the built app. Supports both CI layout
// (dist/thousandstories-app/browser with --output-path) and local builds.
function findBrowserDir() {
  const candidates = [
    path.join(root, "dist", "thousandstories-app", "browser"),
    path.join(root, "dist", "thousandstories-app"),
    path.join(root, "dist"),
  ];
  for (const dir of candidates) {
    if (existsSync(path.join(dir, "index.html"))) {
      return dir;
    }
  }
  throw new Error("Build output not found — run `ng build --configuration production` first.");
}

function inferSiteRoot() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, "");
  }
  try {
    const remote = execSync("git remote get-url origin", {
      cwd: root,
      encoding: "utf8",
    }).trim();
    const match = remote.match(/github\.com[/:]([^/]+)\/([^/.]+?)(?:\.git)?$/);
    if (match) {
      return `https://${match[1]}.github.io/${match[2]}`;
    }
  } catch {
    /* no remote configured */
  }
  return "https://YOUR-USERNAME.github.io/thousandstories";
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(value, max = 155) {
  const trimmed = String(value).trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

function absoluteImage(siteRoot, imagePath) {
  if (!imagePath) {
    return `${siteRoot}/${DEFAULT_BANNER}`;
  }
  if (/^https?:\/\//.test(imagePath)) {
    return imagePath;
  }
  const normalized = imagePath.replace(/^\/+/, "");
  return `${siteRoot}/${normalized}`;
}

// Managed tags are removed from the source head (we own them in index.html),
// then re-injected with per-story values so there are never duplicates.
const MANAGED = [
  '<title>',
  '<link rel="canonical"',
  '<meta name="description"',
  '<meta property="og:',
  '<meta name="twitter:',
  '<meta name="theme-color"',
  '<script type="application/ld+json"',
];

function stripManagedTags(html) {
  let out = html;
  for (const marker of MANAGED) {
    // remove every occurrence of the marker up to the closing '>'
    out = out.replace(new RegExp(`${marker.replace(/[^\w:=-]/g, "\\$&")}[^>]*>`, "g"), "");
  }
  return out;
}

function buildHeadBlock(story, canonical, image, siteRoot) {
  const title = story.title;
  const description = truncate(story.shortDescription);
  const imageAlt = `Portrait of ${story.personName}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    about: story.personName,
    author: { "@type": "Person", name: story.personName },
    datePublished: story.storyDate ?? String(story.birthYear ?? ""),
    image,
    mainEntityOfPage: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    `<script type="application/ld+json" id="story-jsonld">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");
}

const stories = JSON.parse(
  readFileSync(path.join(root, "src", "assets", "data", "stories.json"), "utf8"),
);

const siteRoot = inferSiteRoot();
const browserDir = findBrowserDir();
const sourceHtml = readFileSync(path.join(browserDir, "index.html"), "utf8");
const baseBody = stripManagedTags(sourceHtml);

const storiesDir = path.join(browserDir, "stories");
mkdirSync(storiesDir, { recursive: true });

// Remove pre-rendered slugs that are no longer in stories.json
const existing = existsSync(storiesDir)
  ? readdirSync(storiesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
  : [];
const wantedSlugs = new Set(stories.map((s) => s.slug));
for (const slug of existing) {
  if (!wantedSlugs.has(slug)) {
    rmSync(path.join(storiesDir, slug), { recursive: true, force: true });
    console.log(`Removed stale page: stories/${slug}`);
  }
}

let written = 0;
for (const story of stories) {
  const canonical = `${siteRoot}/stories/${story.slug}`;
  const image = absoluteImage(siteRoot, story.heroImage);
  const headBlock = buildHeadBlock(story, canonical, image, siteRoot);

  const pageHtml = baseBody.replace(
    /<\/head>/,
    `    ${headBlock}\n  </head>`,
  );

  const outDir = path.join(storiesDir, story.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), pageHtml);
  written += 1;
}

console.log(
  `Prerender: ${written} story page(s) -> ${path.relative(root, storiesDir)} (site root ${siteRoot})`,
);