---
name: implement-all
description: "Work every ticket in .scratch/ORDER.md to completion, one fresh subagent per ticket."
disable-model-invocation: true
---

# Implement All

Drive `.scratch/ORDER.md` to empty: repeatedly dispatch `/implement` for the frontier ticket until none remain. `/clear` isn't a tool this session can invoke on itself mid-run — the harness-level clear is a user action, not something exposed to you. A fresh **Agent** call is the mechanical equivalent: it starts cold, with no memory of any prior ticket, which is exactly what "implement on clear context" requires. So each ticket gets its own subagent instead of a manual clear-and-reinvoke cycle.

## Process

1. **Load the list.** Read `.scratch/ORDER.md`. Missing → tell the user to run `/order-tickets` first; don't build one blind.
2. **Loop, one ticket at a time:**
   a. Take the first unchecked entry — the frontier.
   b. Open its ticket file and check the `Status:` line. `needs-info`, `ready-for-human`, or `wontfix` → stop the loop here and hand it to the user; these need a human, not another subagent.
   c. Dispatch **one foreground** `Agent` call (`run_in_background: false`, no `worktree` isolation) with a self-contained prompt: invoke the `implement` skill, passing this ticket's path as its argument, and run its full process end to end. Foreground and sequential is load-bearing — every ticket shares `ORDER.md`, the ticket files, and the branch, so two running at once would race on the same commits.
   d. On return, **post the subagent's summary to the user as its own message before dispatching anything else** — that's the one place its work is visible; nothing about this ticket carries forward into your own context otherwise.
   e. Re-read `ORDER.md`'s line for that ticket. Checked → it's done, continue to the next frontier entry. Still unchecked → the subagent didn't finish; stop the loop (the summary just posted already explains why).
3. **Stop** when the frontier is empty (post a final one-line-per-ticket roll call) or a ticket needs a human (name it). Never batch more than one ticket into a single subagent call, and never let a second one start before the previous one's summary has been posted.
