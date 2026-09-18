---
name: nextjs-perf-review
description: Review Next.js + tRPC + tanstack query code for performance issues — caching strategy, server vs client fetch boundary, Suspense streaming, waterfalls, over-fetching. Use when the user asks to review/audit/optimize component or page performance, or mentions caching, hydration, Suspense, or "why is this slow".
---

# Next.js / tRPC / Tanstack Query Performance Review

Scan the target file(s) or diff and flag issues in these categories. For each finding: file:line, what's wrong, why it costs perf, and a concrete fix (code snippet, not just advice).

## 1. Server vs Client fetch boundary

- Flag Server Components fetching data for content that's below the fold / not needed for LCP. Suggest moving to a Client Component with `useQuery` (lazy, fires on mount/intersection) instead of blocking the server render.
- Flag Client Components (`"use client"`) that fetch data belonging to content needed immediately (above fold, SEO-relevant, or blocking layout) — should be server-fetched instead so it's in the initial HTML.
- Rule of thumb: above-the-fold / SEO-critical / needed-for-first-paint → server fetch + stream via Suspense. Below-the-fold / interaction-triggered / user-specific-and-non-critical → client fetch with tanstack query, optionally `useInView` / IntersectionObserver to defer the query entirely.

## 2. Suspense for server fetch

- Flag server data fetches that block the whole page/layout render instead of being isolated in their own `<Suspense>` boundary with a `loading.tsx` or inline fallback.
- Each independent server data dependency should get its own Suspense boundary so fast parts of the page stream first (don't let one slow query gate the whole page).
- Check for `await` chains in a Server Component that could instead be parallelized (`Promise.all`) or split into siblings each wrapped in Suspense.

## 3. Waterfalls

- Flag sequential `await trpc.x()` then `await trpc.y()` in a server component/route when y doesn't depend on x's result — should be `Promise.all`.
- On the client: flag dependent `useQuery` calls that could be combined into a single tRPC router call, or run in parallel via separate hooks (tanstack fires them concurrently by default — verify `enabled` flags aren't accidentally serializing them).
- Check tRPC routers themselves for N+1 patterns (looping DB calls per item instead of a single batched query).

## 4. Caching

- **Next.js fetch/route cache**: check `fetch()` calls or route segment config — is `cache: 'force-cache'`, `revalidate`, or `cache: 'no-store'` intentional or just default? Flag `no-store` used on data that's actually cacheable.
- **tRPC + Next caching**: check for `unstable_cache` or React `cache()` wrapping expensive/shared server-side calls (e.g. session lookups, shared reference data) to dedupe across the request.
- **Tanstack query**: check every `useQuery`/`trpc.x.useQuery` has deliberate `staleTime`/`gcTime` — flag defaults (`staleTime: 0`) left on data that rarely changes (causes refetch-on-focus/mount storms). Suggest values based on data volatility (e.g. static lookups: `staleTime: Infinity` or long; user-specific frequently-changing: short/default).
- Flag missing `queryClient` prefetch + `HydrationBoundary` pattern when a page already knows what the client will need — prefetch on server, dehydrate, hydrate on client, avoids duplicate fetch + waterfall on mount.
- Flag React Query invalidation that's broader than necessary (`invalidateQueries()` with no key = nukes whole cache) vs scoped `invalidateQueries({ queryKey: [...] })`.

## 5. Over-fetching / payload size

- Check tRPC procedures return only fields the component needs — flag `select *`-equivalent (returning full DB row) when the UI uses 2 fields.
- Flag missing pagination/cursor on list procedures that could grow unbounded.
- Check `select` option on `useQuery` to shape/trim data client-side instead of re-rendering on every field change.

## 6. Re-render / memoization (secondary, only if relevant)

- Flag inline object/array literals passed as tRPC/query input inside render (breaks query key stability → refetch loop). Input objects must be stable (memoized or primitive) since tanstack query hashes them into the key.
- Flag missing `useMemo`/`useCallback` only where it's actually breaking memoized children or causing measurable extra query calls — don't flag it reflexively.

## 7. Reference patterns (from NextFaster / high-perf Next.js templates)

Assume self-hosted (Node server via `next start`, or containerized) with an external object storage + CDN in front for assets — not Vercel's managed image/edge pipeline. Assume Tailwind + shadcn/ui (no CSS-in-JS, no runtime styling engine). Keep all suggestions vendor-neutral — talk in terms of "CDN", "object storage", "reverse proxy" rather than naming a specific provider, since the underlying stack can vary per project.

Flag when these are missing and applicable to the codebase:

- **PPR**: if `next.config` lacks `experimental.ppr`, and pages mix static shell + per-request dynamic data (cart, user greeting, etc.), suggest enabling PPR so the shell prerenders once while dynamic slices stream via Suspense. Works self-hosted (`next build && next start`) — the static shell is served from your own server/reverse-proxy rather than a managed edge network, so pair it with whatever CDN or reverse-proxy cache sits in front if you want the shell served without hitting Node at all. Requires Next 15+; each dynamic slice needs its own Suspense boundary (ties back to #2).
- **React Compiler**: if `next.config` lacks `reactCompiler: true` and the codebase has heavy manual `useMemo`/`useCallback`, flag as a candidate to enable (removes hand-rolled memoization, reduces bugs from stale deps arrays). Fully host-agnostic. Verify installed Next/React version supports it before recommending.
- **Inline critical CSS**: `experimental.inlineCss: true` inlines whatever CSS your build produces — works the same with Tailwind's generated stylesheet as any other CSS. Gains are smaller than for heavier CSS setups since Tailwind's JIT output is already fairly lean, but still removes one render-blocking request on first load. Worth flagging for image/content-heavy landing pages specifically.
- **Image delivery**: check whether images route through `next/image` with a `loader` pointed at the CDN/object storage in use (vs `unoptimized` or raw `<img>` tags bypassing optimization entirely), and check `images.minimumCacheTTL` in `next.config` — flag short/default TTLs for product/content images that don't change once uploaded. If asset URLs are content-addressed or versioned (hash in filename/path), recommend far-future cache headers at the CDN layer since invalidation is a non-issue. If URLs are reused/mutable (same path, changing content), flag that as a caching risk and suggest either content-addressing the path or a short TTL with explicit purge on update.
- **Mutations via Server Actions vs tRPC mutation**: for simple form-style mutations (no need for the tRPC client elsewhere), a Server Action skips a network hop client→tRPC-router→DB. Only flag this as a _suggestion_, not a rewrite — tRPC mutations are fine when the same procedure is reused across client and server or needs tanstack query's optimistic-update/cache-invalidation machinery; don't recommend ripping out tRPC just to match this template.
- **Don't over-fetch on the client for prefetch**: Next's `<Link>` already prefetches viewport/hover by default — flag `prefetch={false}` used without a specific reason (e.g. deliberately deferring cost on a huge link list), since disabling it silently kills the "instant nav" feel this whole review is chasing.

## Output format

Group findings by category above. Skip categories with no issues — don't pad the report. For each issue give: location, one-line problem statement, fix as a code diff/snippet. End with a priority order (fix first = biggest perf win, usually waterfalls and missing Suspense boundaries before micro-optimizations like memoization).
