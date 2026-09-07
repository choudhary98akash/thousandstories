// Generates public/sitemap.xml and public/robots.txt from stories.json.
// Pure Node — no dependencies. Run via: npm run generate:sitemap
// Override the public site root with SITE_URL, otherwise it is inferred
// from `git remote get-url origin` (GitHub Pages project-site layout).

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function inferSiteRoot() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, "");
  }
  try {
    const remote = execSync("git remote get-url origin", {
      cwd: root,
      encoding: "utf8",
    }).trim();
    const match = remote.match(
      /github\.com[/:]([^/]+)\/([^/.]+?)(?:\.git)?$/,
    );
    if (match) {
      return `https://${match[1]}.github.io/${match[2]}`;
    }
  } catch {
    /* no remote configured */
  }
  return "https://YOUR-USERNAME.github.io/thousandstories";
}

function xmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const stories = JSON.parse(
  readFileSync(path.join(root, "src", "assets", "data", "stories.json"), "utf8"),
);

const siteRoot = inferSiteRoot();
const today = new Date().toISOString().slice(0, 10);

const staticPaths = ["", "stories", "people", "collections", "about", "methodology"];
const urls = [
  ...staticPaths.map((p) => `${siteRoot}/${p}`),
  ...stories.map((story) => `${siteRoot}/stories/${story.slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteRoot}/sitemap.xml
`;

writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap);
writeFileSync(path.join(root, "public", "robots.txt"), robots);

console.log(`Sitemap: ${urls.length} URLs (${stories.length} stories) -> public/sitemap.xml`);
console.log(`Robots:  -> public/robots.txt`);