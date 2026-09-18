---
name: grill-ui
description: Grill what a new or existing page or component should show — header, primary content, table/form, states — in shadcn vocabulary, batched and terse, grounded in a live /prototype that changes as each answer lands rather than prose alone. Catches echoes, components repeating across pages, and pauses to design the shared component before continuing. Use once a module's page list exists and before locking its UI, or when an existing page or component needs correcting to nail the target.
---

# Grill UI

The design system is already decided — never ask about roundedness, spacing scale, or color. Before the first page, read this project's own source of truth for it: `CLAUDE.md`'s "Before writing any code" section names the canonical style doc (typically under `handoffs/`) and the primitive library it's built on. Treat whatever that doc says as settled and ask **structure and behavior** only, the way a senior frontend engineer reads a page before building it.

## Position in the pipeline

`/grill-with-docs` or `/wayfinder` solidify the idea or feature upstream — a module's page list, its decisions, its ADRs. This skill takes over once that list exists: it corrects and prepares the UI itself against something running, not just described, so the page or component nails the target before it's built for real. `interface-design` still owns the visual-craft call (states, tokens, hierarchy) once a shape is grounded here. `to-spec` collapses the resulting decisions — and cites the prototype directly where a snippet says it better than prose — into the buildable spec; `to-tickets` pulls the states/motion decisions into acceptance criteria.

Keep a **component ledger** at `.scratch/components.md` — one global file, not per-feature, since its whole job is catching echoes *across* modules, not just within one (create it on first use) — one line per named component: name, page it first appeared on, one-line shape description. The ledger tracks shapes proposed but **not yet built**; the codebase itself is the source of truth for what already exists.

## Process

For each page or component in scope, in order:

1. **Ask the checklist** (below) as one batched set of short, concrete questions — not one-at-a-time interrogation, this isn't `/grilling`. State a recommended answer for each, sourced from the closest analogous page or component already resolved, so the user confirms or corrects rather than authoring from scratch. Only branch into follow-up questions when an answer is genuinely ambiguous or contradicts a prior decision. Skip checklist items that don't apply to the unit in scope — a single-component correction has no page header.
2. **Ground every component this unit's answers named** (card, chip, panel, list-item — anything with its own visual shape) before it goes further:
   1. Glob/Grep `components/ui/` and `components/<area>/` for an existing match on name or shape. Found → cite that component directly; skip the ledger, there is nothing new to track.
   2. Not in the codebase → check the ledger. No match → append it. Match → that's an **echo**: stop and name it ("second time we're using X, first on `<page>`"), grill the shared shape once — props, variants, what changes between contexts — and record the resolution in the ledger entry instead of re-deciding it per page. This mirrors the codebase's own promote-on-second-use rule (`CLAUDE.md`, "Component file hygiene").
3. **Decide whether this needs a live build.** If every named component landed an already-grounded citation in step 2 and nothing in the checklist is genuinely in question — a page that's a straight reuse of settled shapes — skip to step 5; there's nothing here a build would settle that the bullets don't already say. Otherwise — a shape being decided for the first time, or an existing page/component that needs correcting to nail the target — run `/prototype` (the UI branch). Prefer its sub-shape A (adjustment to the existing route) so the unit is judged against the real header, sidebar, and data it'll actually sit in; reuse a prototype already running for this exact target instead of starting a second one.
4. **Grill against the build, not in the abstract.** Revisit the checklist's still-open items pointed at what's actually rendered — the switcher's variants, or the single converged build — instead of describing them in prose. As each item resolves, edit the prototype in place to match: merge the winning pieces across variants into one build (a header from one, a rail from another — this is the point of running variants at all), and fix whatever rough edge the grill surfaces along the way. Never let a decision sit noted only in a comment while the code beside it still shows the losing option — invoke `interface-design` for the visual-craft call (states, tokens, hierarchy) once a shape is grounded; this checklist stays structure/behavior only.
5. **Write the answers** into that unit's section of the module spec (or `.scratch/<feature>/` if no spec exists yet) as terse bullets under each checklist heading. Skip restating shadcn's own documented behavior — record only the unit-specific decision. When a prototype was run, cite its file path or route alongside the bullets so `/to-spec` can inline a snippet from it where prose falls short. The grill itself may run in Bahasa Indonesia; write the bullets in English regardless (`docs/agents/language.md`).

A page or component is done once the checklist is answered, every named component is grounded (ledgered or resolved as an echo), any live prototype reflects every decision landed against it — not just describes them — and the bullets are written. That's the shared understanding this skill exists to produce.

The prototype itself isn't captured or branched here — it stays live as the reference for `/to-spec` and `/implement`. Capture and cleanup (fold the winner in, park the rest on a throwaway branch) happen per `/prototype`'s own final step, once the real implementation lands.

## Checklist

1. **Purpose & entry point** — what triggers landing here (nav item, action from another page)? What's the one task this page or component must let the user finish?
2. **Page header** — title source (static vs. data-derived, e.g. JO number), breadcrumb needed?, primary action button(s), secondary actions (overflow menu?), status chip if the entity has a lifecycle state.
3. **Primary content region** — pick one dominant pattern: table (list/index page), form (create/edit), detail view (cards + read-only fields), or a hybrid (detail page with an embedded table, e.g. line items). Don't let two patterns compete for primary billing.
4. **If table** — columns (name + data type), default sort, filters, per-row actions, bulk actions, empty state copy, pagination vs. infinite scroll, row click behavior.
5. **If form** — fields grouped into sections, which are required, inline validation vs. submit-time, autosave vs. explicit save, cancel/discard behavior, what happens on success.
6. **Secondary regions** — sidebar, tabs, modals/sheets triggered from this page, and what data each needs.
7. **States** — loading (skeleton per the partial-skeleton rule in `CLAUDE.md`, "Hybrid structure"), empty, error, permission-denied (if RBAC-gated per role).
8. **Responsive/density notes** — only if this page has a real deviation from the default (e.g. a table collapsing to cards on mobile). Skip if nothing unusual.
