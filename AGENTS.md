# A Thousand Stories — Agent Instructions

A factual storytelling platform: 1,000 real-world stories of real people, hosted on GitHub Pages.
Stack: Angular (latest stable), TypeScript, SCSS, Angular Router, RxJS. No backend in Phase 1 — all data is static JSON.
The ONE architectural fact: this is a fully static Angular SPA deployed to GitHub Pages; story data lives in `src/assets/data/*.json` and images in `src/assets/images/stories/`.

## Read order (progressive disclosure)
- Always loaded: rules.md (this file's router content stays lean)
- Product context when asked or relevant: PRD.md
- Navigation/architecture: STRUCTURE.md
- UI/design work: Read COLOR.md first
- Decisions before changing architecture: DECISIONS.md
- Current phase & blockers: PROJECT_STATUS.md
- Session memory: consult MEMORY.md index, load matching topic files on demand
- Daily story pipeline (input format, length, images, per-story flow): docs/daily-story-workflow.md — MANDATORY before writing any story

## Commands
- Install: npm install (or ng new — confirm package manager)
- Dev:     ng serve
- Test:    ng test
- Lint:    ng lint
- Build:   ng build --configuration production
- NEVER run: deploy commands — CI/CD via GitHub Actions only

## Code style
- Use Angular standalone components (default since Angular 19+). Reason: modern Angular pattern, no NgModule boilerplate.
- Use SCSS (not CSS). Reason: PRD specifies SCSS.
- Use Angular signals where applicable. Reason: modern reactivity model.
- Never use `any` type. Reason: TypeScript strictness.
- Lazy-load all routes. Reason: performance on static hosting.

## Boundaries
- Allowed: src/, docs/, .github/
- Ask first: angular.json, package.json deps, .github/workflows/
- Never touch: node_modules/, dist/, .angular/, *.generated.*, .env

## Definition of Done
- [ ] ng build passes
- [ ] ng test passes (relevant subset)
- [ ] ng lint clean
- [ ] new convention discovered? added to rules/context file
