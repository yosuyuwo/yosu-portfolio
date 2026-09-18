---
name: ask-matt
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---

# Ask Matt

You don't remember every skill, so ask.

A **flow** is a path through the skills. Most paths run along one **main flow**, and two **on-ramps** merge onto it. Everything else is standalone, or a vocabulary layer that runs underneath.

## The main flow: idea → ship

The route most work travels. You have an idea and want it built.

1. **`/grill-with-docs`, project level** — sharpen the idea by interview, producing **phases/modules**, recorded in `CONTEXT.md` and ADRs. Start here when you **have a codebase** (no codebase? use `/grill-me` — see Standalone; both run the same `/grilling` primitive, `grill-with-docs` is the one that leaves a paper trail). If the project is too foggy to even name its modules in one sitting, don't force it — take the **`/wayfinder`** on-ramp instead (see On-ramps).
2. **Per module, fresh session** — each module gets its own session, started clean from the phase/module record `/grill-with-docs` left behind, not carried over from step 1:
   1. **`/grill-with-docs`, module level** — grill this one module for its page list (how many pages, what each is for).
   2. **`/grill-ui`, per page** — a lighter, batched checklist, not full `/grilling`, that pins down header/content/table-or-form/states per page in shadcn vocabulary, and — when the shape is genuinely in question or an existing page needs correcting — grills against a live `/prototype` it edits in place rather than describing decisions in prose. It checks the **real codebase** (`src/components/ui/`, `src/components/<area>/`) before proposing anything, so it reuses an existing component instead of inventing a near-duplicate, and flags **echoes** — a shape repeating across pages in this module — as a pause-and-design moment.
   3. **`/to-spec`** — collapses this module's grilled decisions + page-UI output into one buildable spec (UI, backend, frontend-backend connection legs).

   Keep 2.1–2.3 in **one unbroken context window** per module — don't compact or clear until the module's spec is done — so its page grilling and spec build on the same thinking. Crossing modules is a fresh start by design; nothing here assumes the whole project fits in one window. Watch the **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)** (~120k tokens): if a module's session approaches it before `/to-spec`, `/handoff` and continue in a fresh thread rather than push on degraded.
3. **`/to-tickets`** — split the module's spec into tracer-bullet tickets, each declaring its **blocking edges**. On a local tracker that's one file per ticket under `.scratch/<feature>/issues/`, worked blockers-first by hand; on a real tracker the edges become native blocking links, so any ticket whose blockers are done can be grabbed.
4. **`/implement`, per ticket, fresh context each time** — builds each issue by driving **`/tdd`** internally — one red-green slice at a time — then commits directly, leaving review to you. Reach for **`/tdd`** on its own when you just want to build a concrete behaviour test-first without a full spec, and **`/code-review`** on its own whenever you want to review a branch or PR against a fixed point.

### Branch — does a question need a runnable answer?

If settling a question requires state, business logic, or a UI you have to see rather than describe, detour through a prototype, bridged by **`/handoff`** in both directions (see Crossing sessions):
- **`/handoff`** out, then open a fresh session against that file,
- **`/prototype`** to answer the question with throwaway code,
- **`/handoff`** back what you learned, and reference it from the thread that hit the question.

## On-ramps

A starting situation that generates work, then merges onto the main flow.

- **Bugs and requests piling up** → **`/triage`**. It moves issues through triage roles and produces agent-ready issues, which **`/implement`** later picks up.

  Triage is only for issues **you didn't create** — bug reports, incoming feature requests, anything that arrives raw. Tickets that `/to-tickets` produced are already agent-ready, so **don't triage them**.

- **Something's broken** → **`/diagnosing-bugs`**. For the hard ones: the bug that resists a first glance, the intermittent flake, the regression that crept in between two known-good states. It refuses to theorise until it has a **tight feedback loop** — one command that already goes red on *this* bug — then fixes with a regression test. Its post-mortem hands off to **`/improve-codebase-architecture`** when the real finding is that there's no good seam to lock the bug down.

- **A huge, foggy effort — a greenfield project or a huge feature build, too big for one session** → **`/wayfinder`**, the most cognitively demanding flow here. When the way from here to the destination isn't visible yet, it charts a **shared map** of **decision tickets** on the issue tracker and resolves them one at a time — producing **decisions, not deliverables** — until the fog is pushed back and the way is clear. Where **`/grill-with-docs`** sharpens an idea you can hold in one session, wayfinder is for the idea you can't — and it's slower and denser, so save it for exactly that, never a well-scoped feature.

  When the map clears, **it hands off, it doesn't build**: merge onto the main flow at **`/to-spec`**, which collapses the map's linked decisions into a buildable plan, then `/to-tickets` and `/implement` as usual. Looping the map straight into `/implement` skips that collapse and throws the linked detail away — go straight to `/implement` only when the effort turned out genuinely small.

## Codebase health

Not feature work — upkeep.

- **`/improve-codebase-architecture`** — run whenever you have a spare moment to keep the codebase good for agents to operate in. It surfaces **deepening opportunities**; picking one _generates an idea_ you can take into the main flow at `/grill-with-docs`. It's the survey that finds the candidates; **`/codebase-design`** (below) is the bench you design the chosen one on.

## Vocabulary underneath

Two model-invoked references that run *beneath* the other skills — each the single source of truth for its vocabulary. Reach for them directly when the **words**, not the process, are the problem; or let the skills above pull them in.

- **`/domain-modeling`** — sharpen the project's *domain* language: challenge a fuzzy term, resolve an overloaded word ("account" doing three jobs), record a hard-to-reverse decision as an ADR. It's the active discipline `/grill-with-docs` drives to keep `CONTEXT.md` a clean glossary.
- **`/codebase-design`** — the deep-module vocabulary (module, interface, depth, seam, adapter, leverage, locality) for designing a module's *shape*: a lot of behaviour behind a small interface at a clean seam. `/tdd` and `/improve-codebase-architecture` both speak it.

## Crossing sessions

- **`/handoff`** — when a thread is full or you need to branch off (e.g. into a `/prototype` session), this compacts the conversation into a markdown file. You don't continue in place — you **open a new session and reference that file** to carry the context across. It's the bridge between context windows, in either direction. Use it when you want a **fresh session** but need the **current conversation preserved**.
- **`/compact`** (built-in) — stay in the **same conversation**, letting the earlier turns be summarized. Use it at **intentional breaks between phases**, when you don't mind losing the verbatim history. Don't compact mid-phase — the agent can lose its way. `/handoff` forks; `/compact` continues.

## Standalone

Off the main flow entirely.

- **`/grill-me`** — the same relentless interview as `/grill-with-docs`, but for when you have **no codebase**. Stateless: it saves nothing locally, builds no `CONTEXT.md`. Reach for it to sharpen any plan or design that doesn't live in a repo.
- **`/prototype`** — a small, throwaway program that answers one design question: does this state model feel right, or what should this UI look like. Throwaway from day one — keep the answer, delete the code. It's the detour in step 2 of the main flow, but reach for it any time a design question is hard to settle on paper.
- **`/research`** — delegate reading legwork to a **background agent**: it investigates a question against **primary sources**, then leaves a cited Markdown file in the repo. Keep working while it reads. The file it produces is something to take *into* the main flow at `/grill-with-docs` — research feeds the thinking, it doesn't replace it.
- **`/teach`** — learn a concept over multiple sessions, using the current directory as a stateful workspace.
- **`/writing-great-skills`** — reference for writing and editing skills well.

## Precondition

**`/setup-matt-pocock-skills`** — run before your first engineering flow to configure the issue tracker, triage labels, and doc layout the other skills assume. Custom issue trackers also work.
