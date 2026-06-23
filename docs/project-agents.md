# Project Agents

This project includes local agent skills that should be involved while building `Little Muslim Learning Adventure`.

They are tracked in `skills-lock.json` and were previously installed under `.agents/skills/`.

## Installed Agents

The tracked project agents are:

- `brandkit`
- `design-taste-frontend`
- `gpt-taste`
- `imagegen-frontend-web`

## What They Are Good For

### `brandkit`

Use for:

- brand world exploration
- mascot and identity direction
- palette and mood definition
- parent-child brand tone alignment

Best fit in this project:

- establishing the identity of `Little Muslim Learning Adventure`
- defining how the game feels for preschool children while staying reassuring for parents

### `design-taste-frontend`

Use for:

- landing page direction
- pricing page composition
- anti-template frontend layout decisions
- stronger hierarchy for public-facing surfaces

Best fit in this project:

- marketing pages
- pricing and checkout-adjacent surfaces
- parent-facing conversion flows

### `gpt-taste`

Use for:

- premium motion-rich frontend composition
- bold editorial sections
- expressive page storytelling

Best fit in this project:

- selective homepage sections
- premium public-page polish

Note:

Use this agent carefully. Preschool clarity, accessibility, and parent trust should override visual ambition.

### `imagegen-frontend-web`

Use for:

- hero concept generation
- world-preview references
- section-by-section visual ideation
- image-led design exploration before implementation

Best fit in this project:

- landing page visuals
- mascot and world previews
- public marketing concept work

## Recommended Workflow

Use these agents as support tools, not as replacements for the approved architecture and product rules.

Recommended order:

1. Use the approved product spec as the source of truth.
2. Use `brandkit` to shape the identity system.
3. Use `design-taste-frontend` and `imagegen-frontend-web` to shape public-facing pages and visual references.
4. Use `gpt-taste` only where stronger motion or bolder composition genuinely improves the experience.
5. Implement the selected direction while preserving the technical and product constraints in the spec.

## Where They Fit In The Build

### Foundation phase

Recommended usage:

- brand direction
- shared UI mood
- landing-page identity

### Product phase

Recommended usage:

- world-specific visual refinement
- child-friendly interaction polish
- reward and map presentation ideas

### Launch phase

Recommended usage:

- final public-page polish
- high-visibility parent flow cleanup

## Guardrails

These agents should not override the core project constraints:

- bilingual Malay and English UI
- Arabic and Jawi learning content
- child-friendly interaction sizing
- responsive behavior
- accessibility basics
- secure auth and payment rules
- admin usability

## Current Status

The tracked agent definitions are currently missing from the working tree even though they remain referenced in git history and `skills-lock.json`. Before active implementation work that depends on them, restore or reinstall the `.agents/skills/` contents.

## Source Of Truth

For architecture, gameplay, scope, and delivery rules, use:

- [Little Muslim Learning Adventure Design](/C:/Users/ASUS/Documents/GitHub/Little-Muslim-Academy/docs/superpowers/specs/2026-06-23-little-muslim-learning-adventure-design.md)

For tracked agent details, use:

- `skills-lock.json`
