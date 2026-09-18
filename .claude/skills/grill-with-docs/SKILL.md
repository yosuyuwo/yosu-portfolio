---
name: grill-with-docs
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

For target market, personas, jobs-to-be-done, or user journeys, use `/grill-ux` instead — it keeps its own doc (`docs/ux/brief.md`). This skill covers everything else that needs ADR + glossary capture: architecture, schema, integration, and technical/feature trade-offs.

The interview may run in Bahasa Indonesia; the ADR and glossary entries it produces stay in English regardless (`docs/agents/language.md`).

Run a `/grilling` session, using the `/domain-modeling` skill, with two overrides:

- **Cadence** — batch every question in the current branch that doesn't depend on another's answer, ask them together, and wait for one reply covering all of them. Keep asking one-at-a-time only within a **dependent chain**, where the next question's framing changes based on the prior answer. Still surface a recommended answer per question.
- **Derived decisions** — before asking a question, check whether it still has a real alternative given what's already been decided. If a foundational decision leaves only one reasonable answer downstream, that answer is **derived**: state it as a consequence of the foundational call instead of asking ("given X, Y follows: ..."), and move on without waiting for confirmation. Only re-open a derived decision if the user objects to it later. Keep asking, normally, whenever a genuine alternative survives the foundational decision.

Once the grill reaches shared understanding, stop there. Never draft a spec or tickets yourself — tell the user the grill is done and suggest they run `/to-spec` or `/to-tickets` next, whichever fits what was just grilled.
