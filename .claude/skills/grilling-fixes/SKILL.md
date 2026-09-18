---
name: grilling-fixes
description: Grill the user relentlessly about how to fix a bug or correct an implementation mistake. Use when the user wants to stress-test a proposed fix or correction, or uses any 'grill' trigger phrases about a bug or mistake.
---

Interview me relentlessly about every aspect of the fix until we reach a shared understanding. Assume the root cause is already known — finding it is `/diagnosing-bugs`'s job, not this one. Walk down each branch of the decision tree: what correct behavior looks like, which approach fixes it, why the alternatives lose, its blast radius, and how we'll know it's actually fixed. Resolve dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a *fact* can be found by exploring the environment (filesystem, tools, etc.), look it up rather than asking me. The *decisions*, though, are mine — put each one to me and wait for my answer.

Do not act on it until I confirm we have reached a shared understanding.
