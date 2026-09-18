---
name: grill-fixes-with-docs
description: A relentless interview to sharpen a bug fix or correction, which also creates docs (ADR's and glossary) as we go.
disable-model-invocation: true
---

Run a `/grilling-fixes` session, using the `/domain-modeling` skill.

Once the grill reaches shared understanding, stop there. Never draft a spec or tickets yourself — tell the user the grill is done and suggest they run `/to-spec` or `/to-tickets` next, whichever fits what was just grilled. This session's context is a **fix** — `/to-spec` and `/to-tickets` pick that up and tag the result accordingly, so `/order-tickets` queues it ahead of already-queued work.
