# Daily Story Workflow

One real story per day, added to the platform. Each story is:
- Introduced by a ~60-word catchy, curiosity-driven hook
- A detailed narrative of 600–1,000 words total (not a condensed summary)
- Backed by real, correct names, dates, places, and facts
- Referenced with verifiable sources
- Themed with categories + tags
- Illustrated with a free-license image

## Daily input format
```
HOOK (~60 words): <catchy teaser — the copy that pulls a reader into the story>
PERSON: <full name>
EXTRA (optional): <anything to focus on or personally known facts>
```

## Pipeline (runs each day, per story)
1. Read the hook; confirm which person it's about.
2. Research the person — real dates, places, events, achievements (web search; never invent).
3. Write the story using the `Story` schema (`src/app/core/models/story.model.ts`):
   - `shortDescription` / `introduction`: the day's ~60-word hook (refined copy)
   - `challenge`, `journey`, `achievement`, `impact`, `lesson`: detailed narrative
   - Total word count across all sections: 600–1,000
4. Append to `src/assets/data/stories.json`:
   - next `id` (current max + 1), unique `slug`, full location fields
   - `category` + `tags` reflecting the theme
   - `sources`: real, verifiable references (title, publisher, URL, date)
5. Add a free-license hero image:
   - source from Wikimedia Commons / government archives / open-footage sites
   - download to `src/assets/images/stories/<slug>.<ext>`, set `heroImage`
   - record the image's author + license as an additional source
6. Verify: run `ng lint` and `ng build --configuration production`.

## Hard rules
- Never fabricate facts, figures, or quotes. Research first, then write.
- Every claim about a named person must be traceable to a source.
- Images must carry an open/free license; record author + license.
- One story per day — quality over quantity.