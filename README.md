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

Media lives in `public/` (`works/`, `profile/`) and is mirrored to a Cloudflare R2 bucket under the same keys. `cdnUrl()` resolves a `public/` path to the CDN when `NEXT_PUBLIC_R2_CDN_URL` is set, and leaves it as a local path when it isn't — so dev works without R2.

```tsx
import { cdnUrl } from "@/lib/cdn"

<Image src={cdnUrl("/works/gaiana/cover.webp")} alt="..." fill />
```

Work media is resolved once in `app/_lib/works.ts`; keep plain `/works/...` paths in `lib/site-content.ts`.

### One-time setup

1. Cloudflare dashboard → R2 → create a bucket (e.g. `yosu-portfolio`).
2. Bucket → Settings → Public access: connect a custom domain (recommended) or enable the `r2.dev` URL.
3. R2 → Manage API tokens → create a token with **Object Read & Write** scoped to that bucket.
4. `rclone config` → new remote named `r2`, storage `s3`, provider `Cloudflare`, paste the token's access key + secret, endpoint `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`. Keys stay in rclone's config, never in this repo.
5. In `.env.local` (and your host's env): `NEXT_PUBLIC_R2_CDN_URL`, `R2_BUCKET`, optionally `R2_RCLONE_REMOTE`.

### Uploading

```bash
pnpm assets:sync -- --dry-run   # preview
pnpm assets:sync                # copy new/changed files (never deletes from the bucket)
```

Upload before deploying a build that references new media.

## Adding UI

```bash
pnpm dlx shadcn@latest add button
```
