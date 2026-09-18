---
name: implement
description: "Implement every ticket up to the next checkpoint as one merged unit, picking up from .scratch/ORDER.md."
disable-model-invocation: true
---

# Implement

Build every ticket between the frontier and the next checkpoint as **one merged unit**, then stop. This skill is meant to be re-invoked fresh after a `/clear` — one checkpoint-to-checkpoint cycle per invocation.

## Process

1. **Pick the batch.** If the user named specific ticket(s), use exactly those. Otherwise open `.scratch/ORDER.md` and, starting at the frontier (the first unchecked entry), collect every consecutive ticket up to but not including the next checkpoint (or through the end of the file, if none remains) — that's this invocation's batch. If `.scratch/ORDER.md` doesn't exist, ask the user which ticket(s) to work from instead of guessing.
2. **Read every ticket file in the batch** before writing any code.
3. **Build the batch as one unit.** Treat the batch's combined acceptance criteria as the target, not each ticket in isolation — look for shared seams across tickets and build through them once rather than repeating work per ticket. Use `/tdd` where possible, at pre-agreed seams. Run typechecking regularly, single test files regularly, and the full test suite once at the end.
4. **Check off** each satisfied acceptance criterion in every ticket file touched, then mark each ticket's line `- [x]` in `.scratch/ORDER.md`.
5. **If the next entry in `.scratch/ORDER.md` after this batch is a checkpoint**, invoke `/domain-modeling` before moving on — reconcile `CONTEXT.md` (and an ADR, if warranted) against what this batch just built: new or resolved terms, contradictions between code and glossary, decisions worth recording. A checkpoint is the natural sync point since a human is about to review the work anyway. Skip this step when the batch instead ends because `.scratch/ORDER.md` simply ran out of tickets.
6. **Commit** the whole batch to the current branch as one commit. Review is the user's, not this skill's — don't run `/code-review` first.
7. **Summarize.** Report every file touched and what changed, across every ticket in the batch. This is what the user reads before deciding to `/clear` and move past the checkpoint.

Stop after step 7 regardless of how much frontier remains in `.scratch/ORDER.md`. If more tickets are ready beyond the checkpoint, name them in the summary — do not start one.
