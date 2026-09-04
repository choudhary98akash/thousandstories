# A Thousand Stories — Structure

## Directory layout

```
thousandstories/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   ├── story.model.ts          # Story, Source interfaces
│   │   │   │   └── category.model.ts
│   │   │   └── services/
│   │   │       ├── story.service.ts         # Loads/filters/searches stories
│   │   │       └── seo.service.ts           # Dynamic meta tags
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── story-card/              # Reusable story card
│   │   │   │   ├── search-bar/              # Search input
│   │   │   │   ├── filter-panel/            # Category/country filters
│   │   │   │   └── story-counter/           # Progress counter
│   │   │   └── pipes/
│   │   │       └── truncate.pipe.ts
│   │   ├── pages/
│   │   │   ├── home/                        # Homepage
│   │   │   ├── explore/                     # All stories + filters
│   │   │   ├── story-detail/                # Individual story
│   │   │   ├── people/                      # People directory
│   │   │   ├── collections/                 # Curated collections
│   │   │   ├── about/                       # About page
│   │   │   └── methodology/                 # Sources & methodology
│   │   ├── app.routes.ts                    # Route definitions
│   │   └── app.component.ts                 # Root component
│   ├── assets/
│   │   ├── data/
│   │   │   ├── stories.json                 # All 1,000 stories
│   │   │   ├── categories.json              # Category definitions
│   │   │   └── countries.json               # Country/region data
│   │   └── images/
│   │       └── stories/                     # Story photographs
│   ├── styles.scss                          # Global styles + design tokens
│   └── index.html
├── .github/
│   └── workflows/
│       └── deploy.yml                       # GitHub Pages deployment
├── docs/                                    # Project docs (PRD, etc.)
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture pattern
- Fully static Angular SPA — no backend, no API calls, no database
- All story data loaded from JSON files at build/runtime via Angular services
- Lazy-loaded routes for every page
- Component-based architecture: core (models + services), shared (reusable UI), pages (routes)
- Deployed to GitHub Pages via GitHub Actions

## Cross-cutting concerns
- Shared code lives in `src/app/shared/` — imported by pages as needed
- Models in `src/app/core/models/` — used across all layers
- Services in `src/app/core/services/` — singleton services for data access
- Styles: global SCSS tokens in `src/styles.scss`, component-level SCSS
- File naming: `kebab-case` for components, `camelCase` for services/models
- Lazy loading: every route module loaded on demand

Rule: update this file whenever the layout or module boundaries change, in the SAME PR.
