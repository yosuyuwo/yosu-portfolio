# Next.js template

This is a Next.js template with shadcn/ui and Cloudflare R2 CDN (consume-only).

## Setup

```bash
pnpm install
cp .env.example .env.local
# Set NEXT_PUBLIC_R2_CDN_URL to your public R2 custom domain
pnpm dev
```

## R2 CDN

Use `cdnUrl()` from `@/lib/cdn` with `next/image` for portfolio assets. The CDN hostname must match `images.remotePatterns` in `next.config.ts`.

```tsx
import Image from "next/image"
import { cdnUrl } from "@/lib/cdn"

<Image src={cdnUrl("portfolio/hero.webp")} alt="..." width={1200} height={800} />
```

## Adding components

```bash
pnpm dlx shadcn@latest add button
```
