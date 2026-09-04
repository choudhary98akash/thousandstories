# BP.md — Universal Project Boilerplate (Bootstrap Master)

> PURPOSE: This is the bootstrap master for ANY software project. It holds the
> full blueprint, universal rules, and every template. When an AI coding agent
> reads this file, it must scaffold all project context & rules files listed in
> the INITIALIZATION SEQUENCE below, then never re-read this file unless asked.
>
> TREAT THIS AS CODE. It is versioned, reviewed, and updated when a convention changes.

---

## 1. INITIALIZATION SEQUENCE (run in this order)

When starting a new project, run these steps in order. Gather facts from the
user (or from existing code/docs) FIRST, then generate files.

### Step 0 — Gather project facts (ask only what you cannot infer)
- [ ] Project name & one-line purpose
- [ ] Stack: language, framework, versions, package manager (e.g. pnpm 9, Node 20, Python 3.12)
- [ ] Build / test / lint / run commands (exact)
- [ ] Is there a UI? (if yes, capture brand colors for COLOR.md)
- [ ] Boundaries: any paths agents must never touch
- [ ] Is it a monorepo? (if yes, plan nested AGENTS.md files)

### Step 1 — Create `AGENTS.md`  (the router — always loaded, keep < 200 lines)
Read the AGENTS.md section below; generate a project-specific version.

### Step 2 — Create `rules.md` (behavioral rules — always loaded, keep < 150 lines)
Copy the UNIVERSAL RULES below, then add project-specific ones.

### Step 3 — Create `PRD.md` (product requirements — loaded when asked)
Fill from the PRD.md template.

### Step 4 — Create `STRUCTURE.md` (architecture map — loaded when navigation needed)
Fill from the STRUCTURE.md template.

### Step 5 — Create `COLOR.md` (design tokens — ONLY if the project has a UI)
Fill from the COLOR.md template. If headless/backend, skip entirely.

### Step 6 — Create `DECISIONS.md` (ADR index — append-only)
Seed with the first real architectural decision, or leave header + empty list.

### Step 7 — Create `PROJECT_STATUS.md` (volatile state — agent updates as it works)
Seed with current phase and first next-steps.

### Step 8 — Create `MEMORY.md` + `memory/` (agent episodic memory)
Create the index file ONLY. Never pre-fill content into memory files from this
template; that is the agent's job during real sessions.

### Step 9 — Wire the loader (opencode: `opencode.json`)
```
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": ["rules.md"]
}
```
NOTE: keep the always-on set minimal (`rules.md`). Reference others lazily via
AGENTS.md instructions (e.g. "when working on UI, Read COLOR.md first").

### Step 10 — Housekeeping files
- [ ] `.gitignore`  (never commit MEMORY data, secrets, env files, build output)
- [ ] `README.md`   (humans: what it is, quickstart → link AGENTS.md)
- [ ] `LICENSE`
- [ ] `.editorconfig` + linter/formatter config (so tooling, not prose, enforces style)

### Verification
After scaffolding, an agent must be able to answer "summarize the rules you
loaded." If any section is invisible, fix structure (bullets, not prose).

---

## 2. UNIVERSAL RULES (copy verbatim into `rules.md`)

### Permissions & boundaries
- Allowed: source directories, tests, docs you own
- ASK FIRST: schema/migrations, dependencies, infra/deploy changes, public API changes
- NEVER TOUCH: vendor/, generated files (`*.gen.*`, lockfile auto-updates by you), secrets
- NEVER commit secrets or keys. Env values live in `.env*` (gitignored) only.

### Behavior
- Run the canonical build command, then the canonical test command, before declaring any task done.
- Run lint/typecheck (exact commands) on every change. Fix, do not suppress.
- Never run deploy/release commands — CI-only.
- Ask before adding any dependency. Reason: dependency bloat is the #1 drift source.
- Prefer small focused changes over large refactors unless explicitly asked.
- Never edit generated output; regenerate it instead.
- When you learn a project-specific correction from the user, propose adding it to the relevant rules/context file in the same session.

### Formatting for rules
- Write rules as imperatives ("Use pnpm, DO NOT use npm"), not aspirations.
- Attach a one-line `Reason:` to every non-obvious rule.
- If a rule cannot be justified, delete it. Reason-less rules dilute adherence.
- Keep all always-loaded files under the listed line budgets. Context = tokens = attention.

---

## 3. AGENTS.md — Router Template

```
# <Project> — Agent Instructions

One paragraph: what this does, stack (with version pins), and the ONE
architectural fact that explains everything else.

## Read order (progressive disclosure)
- Always loaded: rules.md (this file's router content stays lean)
- Product context when asked or relevant: PRD.md
- Navigation/architecture: STRUCTURE.md
- UI/design work: Read COLOR.md first
- Decisions before changing architecture: DECISIONS.md
- Current phase & blockers: PROJECT_STATUS.md
- Session memory: consult MEMORY.md index, load matching topic files on demand

## Commands
- Install: <exact>
- Dev:     <exact>
- Test:    <exact>  (single file variant: <exact>)
- Lint:    <exact>
- Build:   <exact>
- NEVER run: <CI-only commands>

## Code style
- <only rules a competent dev would get wrong>;
  Reason: <one line>
- <...>

## Boundaries
- Allowed: <paths>
- Ask first: <paths>
- Never touch: <paths>

## Definition of Done
- [ ] build passes
- [ ] tests pass (relevant subset)
- [ ] lint/typecheck clean
- [ ] new convention discovered? added to rules/context file
```

---

## 4. rules.md — Behavioral Rules Template

```
# <Project> Rules

## Permissions
- Allowed: ...
- Ask first: ...
- Never touch: ... Reason: ...

## Must
- Run: <test> before finishing. Reason: ...
- Update docs/context in the same PR as the change.

## Must not
- DO NOT <X>. Reason: ...
- Never commit secrets or generated output.

## Workflow
- Ask before: dependencies, migrations, infra.
- <project-specific additions go here>
```

---

## 5. PRD.md — Product Requirements Template

```
# <Product> — PRD

Core above all: 2–3 sentences — who it is for, the ONE problem it solves, why now.

## Goals / Non-goals
- Goals: bullets that are measurable.
- Non-goals: what this version explicitly is NOT.

## Personas & User Journeys
- Who uses it; the 3 core journeys they take.

## Functional Requirements
- Numbered: FR-001, FR-002, ... Each = behavior + acceptance criteria.
- Format: "As a <role>, I want <action> so that <benefit>."

## Feature Gates (if multi-phase)
- v0.1 … v0.6 … v1.0 lifecycle, each with a Definition of Done gate.

## Cross-cutting rules (reference, don't restate)
- @docs/shared-requirements.md — auth, error handling, accessibility, security.
- API contracts live in docs/api-sources.md; reference by ID.

Rule: PRD is a gated workflow, not a one-shot document. Each stage advances
only when its Definition of Done is met. Reason: stops one-shot architecture
guesses and keeps code traceable to spec.
```

---

## 6. STRUCTURE.md — Architecture Map Template

```
# <Project> — Structure

## Directory layout
<tree of the actual repo; annotate the purpose of every non-obvious folder>

## Architecture pattern
- One-line summary + where each layer lives (e.g. "all state in Postgres; API layer stateless").

## Cross-cutting concerns
- Where shared code lives, how it is imported.
- Naming conventions for files/folders/packages.

Rule: update this file whenever the layout or module boundaries change, in the SAME PR.
```

---

## 7. COLOR.md — Design Tokens Template (UI projects only)

```
# <Product> — Design Tokens

## Palette
| Token | Hex | Usage |
| --- | --- | --- |
| --color-primary | #RRGGBB | buttons, links, active states |
| --color-surface  | #RRGGBB | backgrounds |
| --color-text     | #RRGGBB | body copy |
| --color-danger   | #RRGGBB | errors, destructive actions |
...

## Typography
- Font stack, scale (px/rem), weights, line-height.

## Spacing / Radius / Shadows
- Scale (4px base recommended), border radii, elevation tokens.

## Iconography & Logo
- Rules of use + file locations.

Rule: never invent new colors inline; extend tokens here first and reference them.
```

---

## 8. DECISIONS.md — Decision Record (ADR) Template

```
# Decision Records

APPEND-ONLY. Add entries when you make a durable architectural/policy decision.

## Index
| ID | Title | Date | Status |
| --- | --- | --- | --- |

## ADR-<ID>: <Title>
- Date / Status (Accepted | Proposed | Superseded)
- Context: why we needed a decision
- Decision: what we chose (one paragraph)
- Consequences: what this enables + what it costs
- Rejected alternatives: and why

Rule: agents reference IDs (e.g. "ADR-007"), never restate the decision inline.
Reason: one source of truth; the ID is a retrievable memory node.
```

---

## 9. PROJECT_STATUS.md — Live State Template

```
# <Project> — Status

- Phase: <current>
- Milestone: <current>
- Next steps: 1..3 focused bullets
- Blockers: <list or none>
- Last updated: YYYY-MM-DD (update on every substantial change)
```

---

## 10. MEMORY.md — Agent Memory Index Template

```
# Memory Index

INDEX ONLY — one-line pointers to topic files. No content bodies here.
Load a topic file only when relevant. Prune stale entries.

- <topic>: <one-line summary> → memory/<name>.md
- ...

## Topic file format (memory/<topic>.md)
---
name: <slug>
description: <specific, must drive relevance matching>
type: user | feedback | project | reference | learnings
---
<concise factual content>
```

Rules:
- MEMORY.md never exceeds ~200 lines / 25KB. Reason: everything past that is truncated.
- Agent writes memory files during sessions; does not invent them from this template.
- Treat memory as context to re-verify, not ground truth.

---

## 11. Universal agent rules (goes into BOTH AGENTS.md and rules.md implicitly)

1. Progressive disclosure: keep always-loaded files thin; push detail into referenced files.
2. One source of truth: never duplicate a fact across files; reference the owner.
3. Reasons beat preferences: every non-obvious rule carries a `Reason:`.
4. Treat context files as code: update in the same PR that changes the convention.
5. No secrets, no env values, no personal data in any committed context file.
6. When in doubt, ask the user instead of guessing project-specific conventions.

---

## 12. Monorepo rule (if applicable)

Root AGENTS.md = org-wide standards (versions, package manager, commit format).
Nested AGENTS.md per package/service = local conventions (nearest file wins;
overrides for its scope only). Do not nest deeper than one level.