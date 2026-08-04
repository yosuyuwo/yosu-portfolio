# Coding standards

Agent-facing rules live in [`.cursor/rules/`](../../.cursor/rules/). Always-on rules cover common style, workflow, security, portfolio stack, and file organization. TypeScript/React rules activate by glob when editing matching files.

| Rule | Topic |
|------|--------|
| `03-common-coding-style` | Immutability, KISS/DRY/YAGNI, comments |
| `04-common-development-workflow` | Research → plan → TDD → review via project skills |
| `09-common-security` | Secrets, commit checklist |
| `11-ts-coding-style` | Types, Zod, errors |
| `13-ts-patterns` | tRPC/hooks/repository patterns |
| `14-ts-security` | Env/secrets in TS |
| `15-react-coding-style` | RSC, shadcn, naming |
| `16-react-hooks` | Hooks discipline |
| `17-react-patterns` | Suspense, forms, data fetching |
| `18-react-security` | XSS, URLs, server trust |
| `20-portfolio-stack` | TanStack Form, Zod, GSAP, nuqs, Supabase, tRPC, R2; shadcn-first UI |
| `21-file-organization` | Colocate → lift; kebab-case; skeletons |

**UI hard rule:** never invent UI components from scratch. Add the shadcn primitive (`pnpm dlx shadcn@latest add …`) and compose/extend it.

Stack scaffolding:

- `server/db/supabase.ts` — server Supabase client
- `server/trpc/` — tRPC init, routers, RSC proxy
- `app/api/trpc/[trpc]/route.ts` — HTTP handler
- `lib/trpc/client.tsx` — client provider + `useTRPC`
- `lib/cdn.ts` — R2 CDN URL helper
- `types/work.ts` — shared Zod schemas for works
- `components/error-boundary.tsx` — `react-error-boundary` wrapper for Suspense pairs
