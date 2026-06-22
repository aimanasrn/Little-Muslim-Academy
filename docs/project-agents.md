# Project Agents

This project includes local agent skills that we can actively involve while building `Little Muslim Preschool Learning`.

They are stored in `.agents/skills/` and tracked in `skills-lock.json`.

## Installed Agents

The current installed project agents are:

- `brandkit`
- `design-taste-frontend`
- `gpt-taste`
- `imagegen-frontend-web`

## What They Are Good For

### `brandkit`

Use for:

- Brand world exploration
- Logo and identity direction
- Brand-board style visual references
- Palette, mood, and presentation-system work

Best fit in this project:

- Establishing the visual identity for `Little Muslim Preschool Learning`
- Exploring how the preschool Islamic learning brand should feel for parents and children

### `design-taste-frontend`

Use for:

- Marketing page and landing page design direction
- Anti-template frontend layout decisions
- Stronger visual hierarchy for promotional surfaces

Best fit in this project:

- Landing page design
- Pricing page design
- Public-facing marketing sections

### `gpt-taste`

Use for:

- Premium motion-rich frontend composition
- GSAP-heavy storytelling sections
- Bolder editorial layout variation

Best fit in this project:

- High-impact homepage sections
- Premium conversion surfaces for parent-facing marketing pages

Note:

This agent is visually ambitious. We should use it selectively so preschool usability, readability, and accessibility remain the priority.

### `imagegen-frontend-web`

Use for:

- Section-by-section image references
- Visual concept generation for website sections
- Image-led direction before implementation

Best fit in this project:

- Hero exploration
- Feature module previews
- Landing page visual references
- Design comps for public marketing surfaces

## Recommended Workflow

We should involve these agents as support tools, not as replacements for product architecture or backend planning.

Recommended order:

1. Use the approved product spec as the source of truth.
2. Use `brandkit` to define identity direction for the project.
3. Use `design-taste-frontend` and `imagegen-frontend-web` when shaping landing and marketing surfaces.
4. Use `gpt-taste` only where stronger motion or more expressive composition genuinely improves the experience.
5. Implement the final chosen direction in code while preserving the requirements in the spec.

## Where They Fit In The Build

### Phase 1

Recommended usage:

- Brand direction
- Landing page visual language
- Shared UI mood and component styling

### Phase 2

Recommended usage:

- Module-specific presentation ideas
- Child-friendly visual polish
- Story, quiz, and learning-section layout refinement

### Phase 3

Recommended usage:

- Launch polish for public pages
- Final visual cleanup on parent-facing flows

## Guardrails

These agents should not override core project constraints. We still need to preserve:

- Bilingual Malay and English UI
- Arabic and Jawi learning content
- Parent-safe and child-friendly UX
- Responsive behavior
- Accessibility basics
- Secure auth and payment flows
- Admin usability

They are most valuable for visual direction, art direction, and frontend polish.

## Source Of Truth

For architecture, product behavior, and implementation scope, use:

- [Little Muslim Preschool Learning Design](C:/Users/ASUS/Documents/GitHub/Little-Muslim-Academy/docs/superpowers/specs/2026-06-22-little-muslim-preschool-learning-design.md:1)

For installed agent details, use:

- `.agents/skills/`
- `skills-lock.json`
