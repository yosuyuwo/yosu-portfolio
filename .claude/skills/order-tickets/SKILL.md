---
name: order-tickets
description: Create or update .scratch/ORDER.md, the flat dependency-ordered run-list /implement works ticket by ticket, inserting checkpoints so an unattended run pauses for a human to check in and test. Use when /to-tickets has just published new tickets and needs them folded in, when the user wants to rebuild or resync ORDER.md against the ticket files on disk, or when the user wants checkpoint cadence added or adjusted.
---

# Order Tickets

Keep `.scratch/ORDER.md` — the flat, dependency-ordered checklist `/implement` works top to bottom, one ticket per invocation — in sync with the ticket files on disk. The first unchecked entry is always the **frontier**.

## Process

1. **Not yet present** → create it from the template below.
2. **Determine the tickets to reconcile.**
   - Invoked with a specific set of newly published tickets (e.g. from `/to-tickets`) → use exactly those, in the dependency order they were published (blockers first).
   - Invoked standalone with no set given → scan every `.scratch/<feature-slug>/issues/*.md` file on disk.
3. **Fold them in**, feature by feature:
   - A ticket already listed in `ORDER.md` → leave its line and checked state untouched.
   - A ticket not yet listed → append it under its feature's `## <feature-slug>` heading (creating the heading at the end of the file if the feature has none yet), immediately after its blocker if that blocker is another already-listed ticket, otherwise at the end of that feature's block.
   - A line in `ORDER.md` whose ticket file no longer exists on disk → don't delete it silently; flag it to the user and ask whether to remove it.
4. **Insert checkpoints** among the tickets you just appended — never retroactively among untouched existing lines:
   - One at the end of every feature block you touched — a feature's tickets are a demoable unit, worth pausing on once complete.
   - One every 4 tickets within a block (the **checkpoint cadence** — use a different number if the user asks for one), so a long feature never runs unattended past that.
   - Skip a checkpoint that would land with zero tickets since the last one — e.g. the block-end checkpoint when the cadence checkpoint already landed on the last ticket.
   - Write each as its own file, `.scratch/<feature-slug>/issues/<NN>-checkpoint.md`, from the checkpoint template below — `<NN>` is the next unused number in that feature's `issues/` folder, independent of where the checkpoint sits in `ORDER.md`'s dependency order (existing blocks already list tickets out of numeric sequence; a checkpoint's file number is just an identifier, not a position). List it in `ORDER.md` exactly like a ticket line.
   - A checkpoint's `Status: ready-for-human` is what gives it teeth: `/implement-all` already stops the instant it hits that status and hands off to the user — no changes to `/implement` or `/implement-all` are needed.
5. Never reorder or check off an existing entry — checking a box is `/implement`'s job, done on completion of that ticket.

<order-template>

# Order

Flat, dependency-ordered run-list across every feature's tickets — blockers before what they block. `/implement` works it top to bottom, one ticket per invocation; the first unchecked box is the frontier.

## <feature-slug> — <one-line feature title>

- [ ] [<NN> — <ticket title>](<feature-slug>/issues/<NN>-<slug>.md)

</order-template>

<checkpoint-template>

# <NN> — Checkpoint: <feature-slug or scope>

**Not a build ticket.** Work through the checklist yourself, then check this line off in `ORDER.md` — don't hand it to `/implement`.

**Status:** ready-for-human

**Covers:** <NN–NN — titles of the tickets since the last checkpoint>

- [ ] Run `pnpm typecheck && pnpm lint && pnpm test`
- [ ] Smoke-test the above end to end
- [ ] Confirm ready to continue before starting the next ticket

</checkpoint-template>
