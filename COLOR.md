# A Thousand Stories — Design Tokens

Source of truth for the visual system. Never invent colors inline; extend tokens here and reference them.

## Palette

Warm editorial palette: near-black ink on warm cream paper, brick accent, muted gold.

| Token | Hex | Usage |
| --- | --- | --- |
| --ink | #191714 | hero/header backgrounds, deepest text |
| --ink-soft | #2b2823 | secondary headings, nav text |
| --paper | #faf7f2 | page background |
| --paper-deep | #f1ece2 | alternating sections, chip backgrounds |
| --card | #ffffff | cards on paper |
| --line | #e2dccf | dividers, borders |
| --accent | #a23b2e | links, CTAs, active states, labels |
| --accent-deep | #7c2b21 | link/CTA hover |
| --muted | #6f665b | captions, secondary text (AA ≥ 4.5:1 on paper) |
| --gold | #b08d3e | eyebrows, index numbers, dark-hero accents |
| --on-ink-muted | rgba(255,255,255,0.62) | secondary text on --ink surfaces |

## Typography

- Font stack: `'Playfair Display', Georgia, 'Times New Roman', serif` for headings (`--font-display`)
- Font stack: `'Inter', 'Segoe UI', system-ui, sans-serif` for body (`--font-body`)
- Weights: 400/500/600/700 body, 700/800/900 headings, italic 500–600 for editorial accents
- Line-height: 1.6–1.75 (body), 1.0–1.12 (headings)
- Sizes: fluid via `clamp()` where editorial; base 17px body, 12px uppercase labels/small

## Spacing / Radius / Shadows

- Spacing scale: 4px base (4, 8, 12, 16, 24, 28, 32, 40, 48, 56, 64, 96)
- Radius: `--radius-sm: 6px` (controls, chips), `--radius-md: 12px` (cards, images)
- Shadows: `--shadow-1` (cards: subtle 0 4px 16px @ 5%), `--shadow-2` (elevated: 0 10px 40px -12px @ 25%)
- Container: `--container: 1200px`, gutters `clamp(20px, 5vw, 48px)`

## Iconography & Logo

- Minimal iconography — the story is the hero, not icons
- SVG icons only, inline or from a lightweight set
- Logo: text-based wordmark "A Thousand Stories" in Playfair Display (font-display), 22px/900; tagline "No fiction · Just people who lived" in 10px tracked uppercase (accent)

## Contrast rules

- Body text on paper: ink / ink-soft
- Secondary text on paper: --muted (#6f665b, AA ≥ 4.5:1 at 12px+)
- Text on ink surfaces: #fff for primary, --on-ink-muted for secondary (never below 0.6 alpha)
- Links: --accent on paper (AA ≥ 4.5:1); --accent-deep on hover