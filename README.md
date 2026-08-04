# yosu-portfolio

Next.js portfolio with shadcn/ui, R2 CDN assets, Supabase-backed works, and tRPC.

## Setup

```bash
pnpm install
cp .env.example .env.local
# Fill R2 + Supabase values
pnpm dev
```

## Stack

| Concern | Library |
|---------|---------|
| UI | shadcn / Base UI |
| Forms | TanStack Form + Zod |
| URL state | nuqs |
| Motion | GSAP |
| Works data | Supabase (via tRPC) |
| API | tRPC + TanStack Query |
| Assets | Cloudflare R2 CDN (consume-only) |

See [docs/guides/coding-standards.md](docs/guides/coding-standards.md) and [`.cursor/rules/`](.cursor/rules/).

## R2 CDN

```tsx
import Image from "next/image"
import { cdnUrl } from "@/lib/cdn"

<Image src={cdnUrl("portfolio/hero.webp")} alt="..." width={1200} height={800} />
```

## Adding UI

```bash
pnpm dlx shadcn@latest add button
```
