# Coding Style

## Immutability (CRITICAL)

ALWAYS create new objects, NEVER mutate existing ones:

```
// Pseudocode
WRONG:  modify(original, field, value) → changes original in-place
CORRECT: update(original, field, value) → returns new copy with change
```

Rationale: Immutable data prevents hidden side effects, makes debugging easier, and enables safe concurrency.

## Core Principles

### KISS (Keep It Simple)

- Prefer the simplest solution that actually works
- Avoid premature optimization
- Optimize for clarity over cleverness

### DRY (Don't Repeat Yourself)

- Extract repeated logic into shared functions or utilities
- Avoid copy-paste implementation drift
- Introduce abstractions when repetition is real, not speculative

### YAGNI (You Aren't Gonna Need It)

- Do not build features or abstractions before they are needed
- Avoid speculative generality
- Start simple, then refactor when the pressure is real

## File Organization

MANY SMALL FILES > FEW LARGE FILES:
- High cohesion, low coupling
- 200-400 lines typical, 800 max
- Extract utilities from large modules
- Organize by feature/domain, not by type

## Error Handling

ALWAYS handle errors comprehensively:
- Handle errors explicitly at every level
- Provide user-friendly error messages in UI-facing code
- Log detailed error context on the server side
- Never silently swallow errors

## Input Validation

ALWAYS validate at system boundaries:
- Validate all user input before processing
- Use schema-based validation where available
- Fail fast with clear error messages
- Never trust external data (API responses, user input, file content)

## Naming Conventions

- Variables and functions: `camelCase` with descriptive names
- Booleans: prefer `is`, `has`, `should`, or `can` prefixes
- Interfaces, types, and components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Custom hooks: `camelCase` with a `use` prefix

## Comments (HARD RULE)

Default to **no comments**. Code should read clearly enough from naming and structure that it doesn't need narration.

Only add a comment when it captures something the code itself cannot:

- A non-obvious **why** — a hidden constraint, a workaround for a specific bug/API quirk, a business rule that isn't derivable from the surrounding code
- A subtle invariant or edge case a future editor could easily break without warning

Never add a comment that:

- Restates **what** the code already says (`// increment counter` above `counter++`)
- Duplicates something already covered in `ARCHITECTURE.md`, `CONTEXT.md`, an ADR, or a docstring elsewhere — link/reference the doc if context is genuinely needed, don't re-explain it inline
- References the current task, ticket, or PR (`// fix for issue #123`, `// added for the quotation flow`) — this belongs in the commit message/PR description, not the file, and rots as the code evolves
- Is a multi-line block or paragraph explaining a function. If a function needs a paragraph to explain itself, the function is doing too much — split it or rename it instead of writing around the problem with a comment.

Keep any comment that does pass this bar to **one line**. If it doesn't fit on one line, the logic likely needs restructuring (extracted function, better name), not more prose.

Before adding a comment, ask: if I deleted this, would a future reader be confused or misled? If no, delete it.

## Code Smells to Avoid

### Deep Nesting

Prefer early returns over nested conditionals once the logic starts stacking.

### Magic Numbers

Use named constants for meaningful thresholds, delays, and limits.

### Long Functions

Split large functions into focused pieces with clear responsibilities.

## Code Quality Checklist

Before marking work complete:
- [ ] Code is readable and well-named
- [ ] Functions are small (<50 lines)
- [ ] Files are focused (<800 lines)
- [ ] No deep nesting (>4 levels)
- [ ] Proper error handling
- [ ] No hardcoded values (use constants or config)
- [ ] No mutation (immutable patterns used)
- [ ] No redundant/narrating comments; any comment present is one line and explains a non-obvious why
