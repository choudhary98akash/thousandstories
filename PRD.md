# A Thousand Stories — PRD

Core above all: A web-based storytelling platform featuring 1,000 real stories of real people from around the world. For students, young professionals, entrepreneurs, and anyone facing difficulty — showing that ordinary people achieve extraordinary things. No fiction. No fabricated stories. Only real stories supported by factual sources.

## Goals / Non-goals
- Goals:
  - Launch a static Angular site on GitHub Pages with 1,000 verified real stories
  - Enable discovery by geography, category, and time period
  - Provide a "Tell Me a Story" random discovery feature
  - Achieve strong SEO so individual stories are Google-discoverable
  - Deliver a mobile-first, accessible, editorial reading experience
- Non-goals (Phase 1):
  - User accounts, authentication, bookmarks
  - Backend, CMS, or database
  - Comments, reactions, or social features
  - Multi-language support
  - Audio stories or podcasts
  - Interactive maps or timeline visualizations

## Personas & User Journeys
- **Student/Young Professional** facing career difficulty → lands on homepage → clicks "Explore Stories" → filters by category (Resilience) → reads a story → discovers sources are linked → feels inspired
- **Teacher** preparing a lesson → searches for "India" → filters by Geography → finds stories from Maharashtra → shares story URL with class
- **Curious Reader** → clicks "Tell Me a Story" → gets a random story they've never heard → reads it → explores the person's other stories

## Functional Requirements
- FR-001: Browse all 1,000 stories via Explore page with filtering by Country, State/Region, Category, Time Period, Person
- FR-002: Search stories by keyword, person name, title, location, category, tag
- FR-003: View individual story detail pages with sections: Introduction, Challenge, Journey, Achievement, Impact, Lesson, Sources
- FR-004: Random story discovery ("Tell Me a Story" button)
- FR-005: People directory — alphabetical browse of all persons in the dataset
- FR-006: Collections — curated groupings of stories by theme or geography
- FR-007: Category listing pages (20 categories)
- FR-008: Country/region browsing pages
- FR-009: SEO metadata per story (title, meta description, Open Graph, canonical URL)
- FR-010: Source verification display on every story
- FR-011: Responsive design — mobile-first, tablet, desktop
- FR-012: Accessibility — semantic HTML, keyboard nav, screen readers, contrast, focus states
- FR-013: Story counter showing progress (e.g. "742 / 1,000")

## Feature Gates
- v0.1 — Static site scaffold with routing, 1 placeholder story, homepage layout
- v0.3 — 10 real stories, search, filtering, story detail pages working
- v0.5 — 100 stories, people directory, collections, random story feature
- v0.8 — All 1,000 stories, full SEO, GitHub Actions deployment
- v1.0 — Polish, performance audit, accessibility audit, launch

## Cross-cutting rules
- Accessibility: semantic HTML, keyboard nav, proper heading hierarchy, alt text, sufficient contrast, screen reader support, focus states, reduced-motion preferences
- Performance: lazy-loaded routes, lazy-loaded images, minimal JS, no unnecessary dependencies
- SEO: title, meta description, Open Graph, canonical URL, structured data per story page
- Truth-first: every story must have sources, never sacrifice truth for a better story
- Content: real photos only from public-domain sources (Wikimedia Commons, government archives, etc.)
