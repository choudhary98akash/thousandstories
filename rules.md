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
- Use semantic HTML and proper ARIA attributes. Reason: accessibility is a core requirement.
- Include alt text on all images. Reason: accessibility.
- Support mobile-first responsive design. Reason: story-reading optimized for mobile.

## Must not
- DO NOT use AI-generated images of people. Reason: truth-first principle — real photos only from public-domain sources.
- DO NOT fabricate or fictionalize stories. Reason: the platform's credibility is the product.
- DO NOT add dependencies without asking. Reason: dependency bloat is the #1 drift source.
- DO NOT run deploy commands. Reason: CI-only via GitHub Actions.
- DO NOT edit generated output (dist/). Reason: regenerate instead.

## Workflow
- Ask before: dependencies, migrations, workflow changes.
- Update STRUCTURE.md in the same PR if layout or module boundaries change.
- Story content must be factually grounded with sources — never invent details.
