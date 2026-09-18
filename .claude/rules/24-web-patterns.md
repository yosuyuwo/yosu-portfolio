# Web Patterns

## Page Architecture (Next.js App Router)

### Sections with Suspense Boundaries

Pages are built from named sections, each with its own async boundary and error handling. See `15-react-coding-style.md` for the full file organization — this describes the pattern.

Each section wraps async data fetching and UI in a Suspense boundary:

```tsx
// app/products/page.tsx
import { ProductGrid } from "./sections/product-grid";
import { FeaturedBrands } from "./sections/featured-brands";

export default function ProductsPage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <FeaturedBrands />
    </>
  );
}

// app/products/sections/product-grid/index.tsx
export default async function ProductGrid() {
  const products = await fetchProducts();
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridContent products={products} />
    </Suspense>
  );
}
```

Key points:

- Section is async-first, fetches data at the section level
- Suspense boundary shows a skeleton during data load
- Error boundary above Suspense catches fetch errors
- Skeleton only data-dependent items, never structural content
- Sub-sections follow the same pattern for nested async boundaries

This avoids the "waterfall" problem: multiple sections can fetch in parallel, each showing its skeleton independently.

### Component Composition

## Component Composition (Continued)

### Compound Components

Use compound components when related UI shares state and interaction semantics:

```tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
  <Tabs.Content value="settings">...</Tabs.Content>
</Tabs>
```

- Parent owns state
- Children consume via context
- Prefer this over prop drilling for complex widgets

### Render Props / Slots

- Use render props or slot patterns when behavior is shared but markup must vary
- Keep keyboard handling, ARIA, and focus logic in the headless layer

### Container / Presentational Split

- Container components own data loading and side effects
- Presentational components receive props and render UI
- Presentational components should stay pure

## State Management

Treat these separately:

| Concern      | Tooling                                             |
| ------------ | --------------------------------------------------- |
| Server state | TanStack Query, SWR, tRPC                           |
| Client state | Zustand, Jotai, signals                             |
| URL state    | search params, route segments                       |
| Form state   | TanStack Form (`@tanstack/react-form-nextjs`) + Zod |

- Do not duplicate server state into client stores
- Derive values instead of storing redundant computed state

## URL As State

Persist shareable state in the URL:

- filters
- sort order
- pagination
- active tab
- search query

## Data Fetching

### Stale-While-Revalidate

- Return cached data immediately
- Revalidate in the background
- Prefer existing libraries instead of rolling this by hand

### Optimistic Updates

- Snapshot current state
- Apply optimistic update
- Roll back on failure
- Emit visible error feedback when rolling back

### Parallel Loading

- Fetch independent data in parallel
- Avoid parent-child request waterfalls
- Prefetch likely next routes or states when justified
