# Daily Story Workflow

One real story per day, added to the platform. Each story is a long-form,
archive-quality narrative. The reader must feel they have sat down with the
person's whole life.

Data layout (ADR-004): every story lives in its own
`src/assets/data/stories/<slug>.json`; `stories/index.json` holds the card
summaries the app lists everywhere. After writing a story file, regenerate the
index with `node scripts/build-story-index.mjs`.

## Format requirements (mandatory)

- **Intro — ~100 words.** A 100-word opening that hooks the reader and sets the
  scene before the detail begins. Lives in the `introduction` field and renders
  as the "The beginning" chapter.
- **Total length — 2,500 to 3,500 words.** Counted across `introduction` +
  all `chapters`.
- **Per-story flow.** Each story chooses its own `chapters` and headings; they
  are NOT fixed templates. Typical arc (adjust to the life):
  1. Early life & family (detailed, grounded in places and dates)
  2. Education / formative years, and the path that changed everything
  3. Hardships, failures, setbacks (rendered honestly, with facts)
  4. Major works / the defining achievement (substantial detail)
  5. Legacy & impact
  6. Lesson (short, earned, never preachy)
- Every chapter: 2–4 paragraphs, ~300–600 words each. Names, dates, places,
  numbers must be real and traceable.
- **Multiple pictures — 3 to 5 free-license images.** Each reflects a different
  part of the story (early life / work / achievement / legacy), attached to the
  chapter it illustrates via `chapter.media` and rendered beside the text as a
  floated figure with caption + credit. The portrait lives in `heroImage`.
- **Real sources.** `sources[]` must cover both facts AND image attribution.

## Reader-first — the orator's plan (mandatory)

The reader may have no clue who this person is, what era, or what place they
lived in. The story must first *familiarize*, then *convey* — the way a good
speaker warms a room before making the point.

- **Assume zero prior knowledge.** Never open inside the person's world without
  first locating the reader. Test every paragraph: would someone hearing this
  name for the first time follow without re-reading?
- **Open with coordinates.** The intro + first chapter must establish, plainly:
  time, place, who this person was, and why their life matters — before any
  detail or jargon.
- **Anchor every name, place and term at first mention.** Tag it in line so the
  reading never breaks — "Fort Sumter, the federal fortress in Charleston
  harbour"; "milk sickness, a poisoning from cows that grazed on a bitter weed";
  "the Whig Party, a rival of the Democrats".
- **Orient before diving deep.** Open each chapter with a linking sentence that
  re-anchors time and place ("By the winter of 1864…", "Meanwhile, a thousand
  miles away…") so the reader always knows where the story stands.
- **Clarity over ornament.** Short sentences, plain words, active verbs, one
  idea per paragraph, concrete numbers with familiar comparisons. Cut anything
  that makes a reader re-read. The point must carry — never hide it behind
  flourish.
- **Orator's test.** Read the chapter aloud. If a sentence stumbles, rewrite it.

## Narrative flow — feel it, don't dump it (mandatory)

Facts are the material, not the delivery. A verified fact must arrive inside a
scene, a choice or a consequence — never as a standalone inventory item. The
reader should feel they have followed one life, not read a file.

- **No information dumping.** Never run a string of bare facts in sequence
  ("He did X. He did Y. He did Z."). Group them around a single human beat —
  a decision, a loss, a risk, a small detail that carries meaning — and let the
  facts support that beat.
- **Give the person interiority.** What did they want, fear, choose, refuse,
  regret? When a letter, speech or memoir records a feeling, use it. When it
  does not, show the feeling through what the person *did* — never invent a
  thought or emotion.
- **Scenes, then meaning.** Open a moment in a real place with concrete detail,
  then draw the reflection from it. Do not state the theme first and illustrate
  it afterwards.
- **Vary the rhythm.** Short sentences for impact, longer ones for reflection.
  Break up lists. Read aloud: if a paragraph sounds like a résumé or a report,
  rewrite it.
- **Keep the source ledger out of the story.** Source conflicts, hedges and
  myth-debunking belong in the research notes and `sources[]` notes, not in the
  reader-facing prose. State only what is established, and state it warmly.
- **Flow test.** For each chapter, ask: does this read like a life unfolding, or
  like facts being delivered? If it is the latter, find the human thread and
  lead with that.

### Human touch flow — non-negotiable user rule (2026-11-25)

This is the rule the user has had to repeat. A factually correct draft is not
finished if it reads like a fact sheet. Before a story is handed over, every
chapter must pass all of these:

- **Relatability before information.** Open with a problem a reader can feel —
  a closed door, a returned dime, a question about a child, a washboard, or
  an impossible ticket — then bring in the date and number. Never lead with the
  inventory.
- **One human turn per chapter.** Each chapter must contain a choice, a refusal,
  a risk, a loss or a small act of dignity. If a chapter can be summarised as
  'she did X, then Y, then Z', rewrite it around the human turn.
- **Sourced emotion only.** Use recorded words or actions for feeling. Do not
  write 'she felt proud/afraid/determined' unless a source records it; show it
  through what the person said or did.
- **Warmth and rhythm.** Alternate short, concrete sentences with longer
  reflective ones. Prefer verbs to abstract nouns. End a chapter on an image or
  a consequence, not a statistic.
- **Enjoyment test.** Read one chapter aloud to someone who has never heard the
  name. If they want to skip, the chapter is not done.
- **No plain-facts handover.** 'Stating the facts' is the failure mode, not the
  goal. The facts are the material; the reader must come away having shared a
  life.

## Daily input format
```
HOOK (~100 words): <the opening hook to be refined, or a seed for it>
PERSON: <full name>
EXTRA (optional): <anything specifically worth covering>
```

## Step 0 — choosing the person (when the user asks for a name round)

Pitch 6–8 names at once, never one at a time. Every pitch must clear four gates
*before* it is offered.

**1. Archetype filter — the default target is self-made ascent.** Prioritise
people who started with nothing and reached a national or global peak on their
own work:
- **Rags to riches** — a materially poor start, self-made, no family capital,
  no elite education, no patron. This is the default preference.
- **The overlooked striver** — first, only, or among the very first from their
  group, region, caste, community, or generation to do it.
- **The person the record skipped** — credited only to a partner, an employer,
  an institution, or a patron; or dropped from the official account entirely.

The one question a candidate must be able to answer in a single line: *how did
someone with nothing end up with everything?* A pitch without that is not ready.

**Standing user preference (set 2026-09-26).** Default the round to
**India** and to the rags-to-riches archetype unless the user says otherwise.
Where the archetype and the coverage filter disagree, say so in one line and
let the user choose — do not silently substitute a different region.

**2. Coverage filter — close the zero cells.** Read the coverage gaps in
PROJECT_STATUS.md and weight the round toward empty categories and regions (as
of 2026-09-26: Europe 0/15, Medicine 0/15, Environment 0/15, East Asia 0/15,
Africa 2/15, Technology 1/15). The archetype never overrides a zero cell — a
candidate that is both self-made *and* from an uncovered region goes first.
Aims and near-misses from the user are recorded; if a suggestion round is
declined twice, re-pitch it later rather than dropping it.

**3. Image pre-check — never pitch an unlicensable name.** For each candidate
before offering it: list Commons files (`list=search srnamespace=6`, or
`list=categorymembers cmtype=file` for a full sweep), then batch-verify licence
+ author in ONE call (`prop=imageinfo&iiprop=extmetadata`). Reject the name if
it does not have ≥3 individually verified PD / CC BY / CC BY-SA files. Put the
licence and author per file in the pitch so the check is never repeated during
writing.

**4. Truth pre-check.** Reject the name if the famous version contains a claim
that fails verification (misattributed firsts, invented quotes, fabricated
episodes, disputes presented as settled). Log every rejected fact in the session
memory file so it is never resurrected.

## Pipeline (runs each day, per story)
1. Read the hook and confirm the person. If the user asked for a name round
   instead of giving a name, run Step 0 first and wait for the pick.
2. Research: dates, places, family, education, hardships, works, legacy — web
   search + archives. Never invent.
3. Write the story into `src/assets/data/stories/<slug>.json` (one file per
   story — mirror of `src/assets/images/stories/<slug>/`) with the
   `Story` schema (ADR-004). Include the canonical fields where available:
   `slugKey: "stories/<slug>"`, `person: { name, bornLabel }`, `verifiedAt`: 
   - `id`: next free id (current max + 1)
   - `shortDescription`: short card teaser (1–2 lines)
   - `introduction`: ~100-word hook that also sets time, place, person, stakes
   - `chapters: [{ heading, paragraphs[], media? }]` with the story's own flow;
     `media` = the image (src/alt/caption/credit) for that chapter
   - `country/state/city`, `category` + `tags` (themes)
   - `heroImage` (portrait) + `chapter.media` images with captions and credits
   - `sources[]`: verifiable references incl. image credits
   3.5. Regenerate the list index (keeps the app's always-loaded payload in
   sync): `node scripts/build-story-index.mjs` — it validates slug/filename,
   required fields and source count, then rewrites `stories/index.json`.
   3.5. Familiarity check (reader-first): scan for names/places/terms introduced
   without context; confirm coordinates (time/place/who/why) are set in the
   opening and each chapter re-anchors the reader.
4. Add free-license images (≥3):
   - source from Wikimedia Commons / government archives / open-footage sites
   - download to `src/assets/images/stories/<slug>/` (one folder per story)
   - record author + license per image in `sources[]`
5. Word-count check: total 2,500–3,500 (intro ~100). Adjust until in range.
6. Verify: `ng build --configuration production` passes; `node scripts/build-story-index.mjs` clean; sitemap + prerender scripts still succeed (lint target not
   configured yet).

## Hard rules
- Never fabricate facts, figures, or quotes. Research first, then write.
- Every claim about a named person is traceable to a source.
- Images must carry an open/free license; record author + license.
- Keep the reader's trust: when facts are uncertain, say so — never invent
  drama.
- One story per day — the length is the point, so quality over quantity.