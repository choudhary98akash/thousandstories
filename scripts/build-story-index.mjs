// Regenerates src/assets/data/stories/index.json from the per-story JSON files
// in src/assets/data/stories/. Every story lives in its own file
// (stories/<slug>.json) exactly like its images live in images/stories/<slug>/,
// so story pages lazy-load only the ~20 KB file they need. The index is the ONLY
// payload the app always fetches — it feeds home / explore / people / collections.
//
// Pure Node — no dependencies. Run via: npm run stories:index
// (after writing/editing a story file; NOT on a schedule — run it and commit).

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storiesDir = path.join(__dirname, "..", "src", "assets", "data", "stories");

const SUMMARY_KEYS = [
  "id",
  "slug",
  "personName",
  "title",
  "shortDescription",
  "country",
  "state",
  "city",
  "category",
  "birthYear",
  "deathYear",
  "storyDate",
  "heroImage",
  "tags",
  "verified",
];

const REQUIRED = ["id", "slug", "personName", "title", "shortDescription", "country", "category", "heroImage"];

const files = readdirSync(storiesDir)
  .filter((f) => f.endsWith(".json") && f !== "index.json")
  .sort();

const summaries = [];
const errors = [];

for (const file of files) {
  const full = path.join(storiesDir, file);
  if (!statSync(full).isFile()) continue;

  const story = JSON.parse(readFileSync(full, "utf8"));
  for (const key of REQUIRED) {
    if (story[key] === undefined || story[key] === null || story[key] === "") {
      errors.push(`${file}: missing required field '${key}'`);
    }
  }
  if (!Array.isArray(story.sources) || story.sources.length === 0) {
    errors.push(`${file}: needs at least one source`);
  }
  if (story.slug !== file.replace(".json", "")) {
    errors.push(`${file}: slug '${story.slug}' does not match filename`);
  }

  const summary = {};
  for (const key of SUMMARY_KEYS) {
    if (story[key] !== undefined) {
      summary[key] = story[key];
    }
  }
  summaries.push(summary);
}

if (errors.length > 0) {
  for (const err of errors) {
    console.error(`error: ${err}`);
  }
  console.error(`index build aborted (${errors.length} problem(s)).`);
  process.exit(1);
}

summaries.sort((a, b) => a.id - b.id);
const ids = summaries.map((s) => s.id);
if (new Set(ids).size !== ids.length) {
  console.error("error: duplicate story ids in index.");
  process.exit(1);
}

writeFileSync(
  path.join(storiesDir, "index.json"),
  `${JSON.stringify(summaries, null, 2)}\n`,
);

console.log(`story index: ${summaries.length} story summary (ies) -> stories/index.json`);