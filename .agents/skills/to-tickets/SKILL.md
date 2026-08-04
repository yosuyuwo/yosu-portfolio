---
name: to-tickets
description: Break a plan, spec, or the current conversation into tracer-bullet tickets partitioned into implement plans — each plan sized so /implement can finish every ticket in it in one run.
disable-model-invocation: true
---

# To Tickets

Break a plan, spec, or conversation into **tickets** — tracer-bullet vertical slices, each declaring the tickets that **block** it — then partition those tickets into **plans**. A **plan** is the unit `/implement` consumes: every ticket in the plan, one run.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Process

### 1. Gather context

Work from whatever is already in the conversation context. If the user passes a reference (a spec path, an issue number or URL) as an argument, fetch it and read its full body and comments.

### 2. Explore the codebase (optional)

If you have not already explored the codebase, do so to understand the current state of the code. Ticket titles and descriptions should use the project's domain glossary vocabulary, and respect ADRs in the area you're touching.

Look for opportunities to prefactor the code to make the implementation easier. "Make the change easy, then make the easy change."

### 3. Draft vertical slices

Break the work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cuts a narrow but COMPLETE path through every layer (schema, API, UI, tests) — vertical, NOT a horizontal slice of one layer
- A completed slice is demoable or verifiable on its own
- Each slice is sized to fit in a single fresh context window
- Any prefactoring should be done first

</vertical-slice-rules>

Give each ticket its **blocking edges** — the other tickets that must complete before it can start. A ticket with no blockers can start immediately.

**Wide refactors are the exception to vertical slicing.** A **wide refactor** is one mechanical change — rename a column, retype a shared symbol — whose **blast radius** fans across the whole codebase, so a single edit breaks thousands of call sites at once and no vertical slice can land green. Don't force it into a tracer bullet; sequence it as **expand–contract**. First expand: add the new form beside the old so nothing breaks. Then migrate the call sites over in batches sized by blast radius (per package, per directory), each batch its own ticket blocked by the expand, keeping CI green batch to batch because the old form still exists. Finally contract: delete the old form once no caller remains, in a ticket blocked by every migrate batch. When even the batches can't stay green alone, keep the sequence but let them share an integration branch that all block a final integrate-and-verify ticket — green is promised only there.

### 4. Partition into plans

Group the draft tickets into **plans** — each plan is one `/implement` run that owns **every** ticket in that plan end-to-end (TDD, review, commit).

Size each plan so `/implement` can finish every ticket in it inside one fresh session without **comprehensive debt** — the unfinished thoroughness and context decay that piles up when one run tries to carry more tickets than a sharp window can hold. Prefer a short related chain (often a handful of tickets). When the draft overflows that bound, split into sequential plans and put blocking edges *between* plans (later plans blocked by earlier ones) the same way tickets block each other.

Plans are ordered work packages, not optional labels: every ticket belongs to exactly one plan.

### 5. Quiz the user

Present the proposed breakdown grouped by plan. For each plan, list its tickets; for each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must complete first
- **What it delivers**: the end-to-end behaviour this ticket makes work

Ask the user:

- Does each plan look finishable in one `/implement` run, or should any plan split further?
- Does the ticket granularity feel right? (too coarse / too fine)
- Are the blocking edges correct — within and across plans?
- Should any tickets be merged, split, or moved between plans?

Iterate until the user approves the breakdown.

### 6. Publish the tickets to the configured tracker

Publish the approved plans and their tickets. **How** depends on the tracker `/setup-matt-pocock-skills` configured — the tickets are the same either way, only the shape of the blocking edges changes:

- **Local files** → write under `.scratch/<feature-slug>/plans/<MM>-<plan-slug>/issues/<NN>-<slug>.md`, plans numbered from `01` and tickets within each plan numbered from `01` in dependency order (blockers first). Each file's "Plan" names its plan; "Blocked by" lists the tickets it depends on (including cross-plan blockers by plan + ticket). Use the per-ticket file template below — one ticket per file, never a single combined file.
- **A real issue tracker (GitHub, Linear, …)** → publish one parent issue (or equivalent epic) per plan, then one child issue per ticket in dependency order (blockers first) so each ticket's blocking edges can reference real identifiers. Use the platform's native blocking / sub-issue relationship where it has one; otherwise set each ticket's "Blocked by" to the blocking issues. Name or label each ticket with its plan so `/implement` can grab a whole plan. Apply the `ready-for-agent` triage label unless instructed otherwise — the tickets are agent-grabbable by construction.

Work the **frontier**: any ticket whose blockers are all done. For a purely linear chain that means top to bottom. Kick off `/implement` **per plan**, finishing every ticket in that plan.

Do NOT close or modify any parent issue beyond creating the plan parents above.

<local-ticket-template>

# <NN> — <Ticket title>

**Plan:** <MM> — <plan title>

**What to build:** the end-to-end behaviour this ticket makes work, from the user's perspective — not a layer-by-layer implementation list.

**Blocked by:** the numbers/titles of the tickets that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

<issue-template>

## Parent

A reference to the parent plan issue on the tracker (and to any higher parent if the source was an existing issue).

## Plan

The plan name this ticket belongs to — the unit one `/implement` run finishes entirely.

## What to build

The end-to-end behaviour this ticket makes work, from the user's perspective — not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- A reference to each blocking ticket, or "None — can start immediately".

</issue-template>

In either form, avoid specific file paths or code snippets — they go stale fast. Exception: if a prototype produced a snippet that encodes a decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly that it came from a prototype. Trim to the decision-rich parts — not a working demo, just the important bits.
