---
name: grill-ux
description: Grill target market, personas, jobs-to-be-done, competitive landscape, core user journeys, success metrics, constraints, and tone — the product-research decisions upstream of any visual or page design. Use when starting a new project or module and the target user or the job it's hired to do isn't pinned down yet, or when interface-design or grill-ui need that grounding and docs/ux/brief.md doesn't exist.
---

# Grill UX

Run this like `/grill-with-docs` — same cadence (batch every question that doesn't depend on another's answer; one-at-a-time only within a dependent chain; state derived decisions as a consequence instead of asking) and the same `/domain-modeling` ADR offering for calls that are hard to reverse, surprising without context, and a real trade-off. The difference: walk the checklist below instead of an open-ended plan, and maintain `docs/ux/brief.md` inline instead of stopping at shared understanding.

## Position in the pipeline

This runs before `interface-design` and `grill-ui`. Both should read `docs/ux/brief.md` instead of re-deriving what it already answers — see the pointers added to each. `grill-ui`'s "module's page list" is usually the Core User Journeys section below, once broken into pages.

## Checklist

1. **Target market & buyer-vs-user** — who pays or decides, who uses it day to day, are they the same person?
2. **Personas** — primary and secondary, by role: goals, pain points, technical literacy, frequency of use, physical context (desk all day, warehouse floor, phone in transit).
3. **Jobs-to-be-done** — per persona, the job this is hired for: functional, emotional, and social dimensions.
4. **Competitive / alternative landscape** — what they use today instead (a competitor, a spreadsheet, nothing), and why this replaces it.
5. **Core user journeys** — end-to-end task sequences, not pages yet (e.g. JO created → Trucking → Invoice → Payment).
6. **Success metrics** — what "working" means to the user and to the business.
7. **Constraints** — accessibility needs, regulatory/compliance, connectivity, device floor.
8. **Tone / feel** — in words that mean something, earned from 1–7, not asserted.

Skip a question only when the answer is already settled elsewhere (an existing brief, a prior module's answer that clearly carries over) — cite that instead of re-asking.

## Maintaining docs/ux/brief.md

Create it lazily, on the first item resolved. Update it inline as each item resolves — don't batch to the end, the same discipline `domain-modeling` applies to `CONTEXT.md`. The grill may run in Bahasa Indonesia; write the brief in English regardless (`docs/agents/language.md`).

One file per project by default. Split a second `docs/ux/<module>-brief.md` only when a module's target market is genuinely different from the rest — otherwise everything lives in the one file.

<brief-template>

# UX Brief — {Project or Module Name}

## Target Market

{Who buys or decides, who uses it day to day, same person or different}

## Personas

**{Name} (primary)**: {role, goals, pain points, technical literacy, frequency, physical context}

**{Name} (secondary)**: {...}

## Jobs-to-be-Done

- {Persona} hires this to {functional job}, so they feel {emotional/social job}

## Competitive / Alternative Landscape

{What they use today instead, and why this replaces it}

## Core User Journeys

1. {Journey name} — {step} → {step} → {step}

## Success Metrics

{What "working" means to the user and the business}

## Constraints

{Accessibility, regulatory, connectivity, device floor}

## Tone

{The feel this should have, and why — feeds interface-design directly}

</brief-template>

## Stop condition

Once the checklist is answered and `docs/ux/brief.md` reflects it, stop. Never propose a visual direction or a page list yourself — tell the user the grill is done and suggest `/interface-design` (visual system) and/or `/grill-ui` (once pages are broken out of the journeys) next.
