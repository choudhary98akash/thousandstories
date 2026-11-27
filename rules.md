# A Thousand Stories Rules

## Permissions
- Allowed: src/, docs/, story data JSON files, components, services, models
- Ask first: angular.json, package.json, .github/workflows/, deployment config
- Never touch: node_modules/, dist/, .angular/, .env, secrets, lockfile auto-updates. Reason: build artifacts and secrets must never be committed.

## Must
- Run ng lint before finishing any task. Reason: catch errors early.
- Run ng build --configuration production to verify build passes.
- Keep story data in `src/assets/data/`. Reason: static hosting on GitHub Pages.
- Every story must have sources. Reason: project identity is truth-first.
- Write with **human touch flow**: scene-led, relatable and enjoyable, with facts arriving through a person's choices, losses and small acts of dignity. Reason: the user has repeatedly required stories that are lived through, not dumped as fact sheets.
- Write every story in **plain, novice-level English**: short sentences, everyday words, one idea per sentence. Explain any special or old term the first time it appears. Reason: the user asked for language that reads easily for a first-time reader; sophisticated wording is a failure even when the facts are right. Simplifying words never means changing a fact, scene or source.
- Use semantic HTML and proper ARIA attributes. Reason: accessibility is a core requirement.
- Include alt text on all images. Reason: accessibility.
- Support mobile-first responsive design. Reason: story-reading optimized for mobile.
- Match selector specificity when overriding base styles in media queries (nest under the same parent, e.g. `.featured-story .featured-grid`, `.site-footer .footer-top`). Reason: a lower-specificity mobile rule is silently ignored, leaving the desktop layout on phones.

## Must not
- DO NOT use AI-generated images of people. Reason: truth-first principle — real photos only from public-domain or freely-licensed sources (GODL/CC BY(-SA), always credited). Godl/CC images require the author/source + license in the credit, exactly as stored in `src/assets/data/*.json`.
- DO NOT fabricate or fictionalize stories. Reason: the platform's credibility is the product.
- DO NOT hand over a draft that merely states facts or reads like a report or résumé. Reason: a first-time reader must be able to follow, relate and enjoy; fix the flow before presenting it.
- DO NOT add dependencies without asking. Reason: dependency bloat is the #1 drift source.
- DO NOT run deploy commands. Reason: CI-only via GitHub Actions.
- DO NOT edit generated output (dist/). Reason: regenerate instead.

## Workflow
- Ask before: dependencies, migrations, workflow changes.
- Update STRUCTURE.md in the same PR if layout or module boundaries change.
- Story content must be factually grounded with sources — never invent details.
