<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Coding standards

Follow [`.cursor/rules/`](.cursor/rules/) (summary: [`docs/guides/coding-standards.md`](docs/guides/coding-standards.md)).

Hard rules for this repo:

- File organization: colocate then lift — see `21-file-organization.mdc` (supersedes hybrid `sections/` layouts)
- Stack: TanStack Form + Zod, GSAP, nuqs, Supabase (works), tRPC (API), R2 CDN consume-only — see `20-portfolio-stack.mdc`

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `yosuyuwo/yosu-portfolio` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
