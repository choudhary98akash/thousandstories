# Daily Story Workflow

One real story per day, added to the platform. Each story is a long-form,
archive-quality narrative. The reader must feel they have sat down with the
person's whole life.

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

## Daily input format
```
HOOK (~100 words): <the opening hook to be refined, or a seed for it>
PERSON: <full name>
EXTRA (optional): <anything specifically worth covering>
```

## Pipeline (runs each day, per story)
1. Read the hook and confirm the person.
2. Research: dates, places, family, education, hardships, works, legacy — web
   search + archives. Never invent.
3. Write the story into `src/assets/data/stories.json` with the `Story` schema:
   - `shortDescription`: short card teaser (1–2 lines)
   - `introduction`: ~100-word hook
   - `chapters: [{ heading, paragraphs[], media? }]` with the story's own flow;
     `media` = the image (src/alt/caption/credit) for that chapter
   - `country/state/city`, `category` + `tags` (themes)
   - `heroImage` (portrait) + `chapter.media` images with captions and credits
   - `sources[]`: verifiable references incl. image credits
4. Add free-license images (≥3):
   - source from Wikimedia Commons / government archives / open-footage sites
   - download to `src/assets/images/stories/<slug>/` (one folder per story)
   - record author + license per image in `sources[]`
5. Word-count check: total 2,500–3,500 (intro ~100). Adjust until in range.
6. Verify: `ng build --configuration production` passes (lint target not
   configured yet).

## Hard rules
- Never fabricate facts, figures, or quotes. Research first, then write.
- Every claim about a named person is traceable to a source.
- Images must carry an open/free license; record author + license.
- Keep the reader's trust: when facts are uncertain, say so — never invent
  drama.
- One story per day — the length is the point, so quality over quantity.