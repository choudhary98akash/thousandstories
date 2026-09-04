# A Thousand Stories — Design Tokens

## Palette

| Token | Hex | Usage |
| --- | --- | --- |
| --color-primary | #1a1a2e | headlines, primary text |
| --color-secondary | #16213e | secondary headings, nav |
| --color-accent | #e94560 | CTAs, links, active states |
| --color-surface | #ffffff | page backgrounds |
| --color-surface-alt | #f5f5f5 | alternating sections, cards |
| --color-text | #2d2d2d | body copy |
| --color-text-muted | #6b7280 | captions, secondary text |
| --color-border | #e5e7eb | dividers, borders |
| --color-danger | #dc2626 | errors, destructive actions |
| --color-verified | #16a34a | verification badges |

## Typography

- Font stack: `'Georgia', 'Times New Roman', serif` for headings (editorial feel)
- Font stack: `'Inter', 'Segoe UI', system-ui, sans-serif` for body text
- Scale: 14px / 16px / 18px / 20px / 24px / 32px / 40px / 48px
- Weights: 400 (body), 600 (semi-bold headings), 700 (hero headings)
- Line-height: 1.6 (body), 1.2 (headings)

## Spacing / Radius / Shadows

- Spacing scale: 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96)
- Border radius: 4px (subtle), 8px (cards), 12px (modals)
- Shadows: `0 1px 3px rgba(0,0,0,0.1)` (cards), `0 4px 12px rgba(0,0,0,0.15)` (elevated)

## Iconography & Logo

- Use minimal iconography — the story is the hero, not icons
- SVG icons only, inline or from a lightweight set
- Logo: text-based wordmark "A Thousand Stories" in serif font

Rule: never invent new colors inline; extend tokens here and reference them.
