---
name: implement
description: "Implement a piece of work based on a spec or a plan of tickets."
disable-model-invocation: true
---

Implement the work described by the user in the spec or **plan**.

When given tickets from `/to-tickets`, take **one plan** and finish **every ticket in that plan** in this run — in dependency order, working the frontier as blockers land. A plan is already sized to avoid **comprehensive debt**; other plans are later `/implement` runs.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work.

Commit your work to the current branch.
