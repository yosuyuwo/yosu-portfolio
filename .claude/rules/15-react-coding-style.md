# React Coding Style

## File Extensions

- `.tsx` for any file containing JSX, even one-liner snippets
- `.ts` for pure logic, custom hooks without JSX, type definitions, utilities
- `.test.tsx` / `.test.ts` mirroring the source file
- Use `.jsx` only when the project intentionally avoids TypeScript — flag every new untyped React file in review

## Naming

- Components: `PascalCase` for both the symbol and the file (`UserCard.tsx`, default export `UserCard`)
- Custom hooks: `useCamelCase` for the symbol, kebab-case for the file when the project convention is kebab-case (`use-debounce.ts` exports `useDebounce`)
- Context: `<Domain>Context` symbol, `<Domain>Provider` provider component, `use<Domain>` consumer hook
- Event handlers: `handleClick`, `handleSubmit` inside the component; the prop that receives it is `onClick`, `onSubmit`
- Boolean props: `isLoading`, `hasError`, `canSubmit` — never `loading` or `error` alone for booleans

## Component Shape

```tsx
type Props = {
  user: User;
  onSelect: (id: string) => void;
};

export function UserCard({ user, onSelect }: Props) {
  return (
    <button type="button" onClick={() => onSelect(user.id)}>
      {user.name}
    </button>
  );
}
```

- Prefer `type Props = {}` for closed component prop shapes
- Use `interface` only when the prop type is extended via declaration merging or exported as a public API extension point
- Always destructure props in the parameter list — no `props.user` access inside the body
- Type the return implicitly through JSX (`function Foo(): JSX.Element` only when the function returns conditionally and the union confuses inference)

## JSX

- Self-close tags with no children: `<img />`, `<UserCard user={u} />`
- Use fragments `<>...</>` over wrapper `<div>` when no DOM element is needed
- Conditional rendering: `{condition && <Foo />}` for booleans, ternary for either/or, early return for guard clauses
- Never put logic inline in JSX when it reads as multi-line — extract to a const above the return or a function

```tsx
// Prefer
const greeting = user.isAdmin ? "Welcome, admin" : `Hello ${user.name}`;
return <h1>{greeting}</h1>;

// Over
return <h1>{user.isAdmin ? "Welcome, admin" : `Hello ${user.name}`}</h1>;
```

## Server / Client Boundary (Next.js App Router, RSC)

- Default a new file to Server Component — only add `"use client"` when the file uses state, effects, refs, browser APIs, or event handlers
- Place the `"use client"` directive on line 1, before any imports
- Never import a Client Component file from inside a `"use server"` action file
- Never re-export server-only code through a client module — the bundler will silently include it

### Never put `"use client"` on `page.tsx`

`page.tsx` is a Next.js App Router entry point and almost always contains a mix of server-fetched data, static headings, layout structure, and one or two interactive regions. Marking the whole page as a client component forces every byte of it into the client bundle and breaks server-side data access.

**Instead:** keep `page.tsx` a Server Component and extract interactive regions into focused Client Components:

```tsx
// WRONG: entire page is client
"use client";
export default function OrdersPage() {
  const [filter, setFilter] = useState("all");
  // ...
}

// CORRECT: page is a Server Component
// app/orders/page.tsx
import { OrderFilterBar } from "./sections/order-filter/OrderFilterBar"; // "use client"

export default async function OrdersPage() {
  const orders = await fetchOrders();
  return (
    <>
      <h1>Orders</h1>
      <OrderFilterBar />          {/* Client Component — owns the filter state */}
      <OrderTable orders={orders} />  {/* Server Component — receives data as props */}
    </>
  );
}
```

If you find yourself reaching for `"use client"` on `page.tsx`, extract the interactive part into a sibling component first. The page itself should remain async and server-rendered.

## Prefer shadcn / Base UI Components Over Native HTML

Never use native HTML form elements or generic wrappers when a shadcn component exists in `src/components/ui/`. If no wrapper exists yet, create one that follows the `@base-ui/react` primitive pattern — see `checkbox.tsx` and `input.tsx` as the reference.

| Instead of | Use | Import path |
|---|---|---|
| `<input>` | `Input` | `@/components/ui/input` |
| `<button>` | `Button` | `@/components/ui/button` |
| `<input type="checkbox">` | `Checkbox` | `@/components/ui/checkbox` |
| `<select>` / `<option>` | `Select` + `Select.Item` | `@/components/ui/select` |
| `<hr>` | `Separator` | `@/components/ui/separator` |
| `<label>` in a form field | `Field` + `FieldLabel` | `@/components/ui/field` |

### Field pattern for labelled form inputs

Do not wire labels to inputs with bare `<label htmlFor>` + `id` pairs. Use `Field` + `FieldLabel` + `FieldError` from `@/components/ui/field` instead — Base UI's `Field.Root` handles the association automatically.

Combined with TanStack Form (`form.Field` render prop):

```tsx
<Field>
  <FieldLabel>Email</FieldLabel>
  <form.Field
    name="email"
    validators={{ onChange: ({ value }) => !value ? "Required" : undefined }}
  >
    {(f) => (
      <>
        <Input
          value={f.state.value}
          onChange={(e) => f.handleChange(e.target.value)}
          onBlur={f.handleBlur}
          aria-invalid={f.state.meta.isTouched && f.state.meta.errors.length > 0}
        />
        {f.state.meta.isTouched && f.state.meta.errors.length > 0 && (
          <FieldError>{f.state.meta.errors[0]}</FieldError>
        )}
      </>
    )}
  </form.Field>
</Field>
```

### Icon-only buttons always need a Tooltip

A button that renders only an icon (no visible text label) **must** be wrapped in a `Tooltip` from `@/components/ui/tooltip`. Without it, the button's purpose is invisible to sighted users who hover and completely opaque to screen-reader and keyboard users.

```tsx
// WRONG: icon-only button with no tooltip
<Button variant="ghost" size="icon" onClick={handleDelete}>
  <Trash2 className="size-4" />
</Button>

// CORRECT: wrap in Tooltip, describe the action
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon" onClick={handleDelete} aria-label="Delete">
      <Trash2 className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Delete</TooltipContent>
</Tooltip>
```

Rules:
- `aria-label` on the `Button` and the `TooltipContent` text must match exactly — the tooltip surfaces what the label already declares.
- Use `asChild` on `TooltipTrigger` so the button element is the real DOM trigger (not a nested wrapper).
- The tooltip label must describe the **action**, not the icon (`"Delete"`, not `"Trash icon"`).
- This applies to any clickable icon element — `Button`, `IconButton`, or a bare `<button>` — whenever no text label is co-located in the DOM.

### Inputs always need a placeholder

Every `Input` (and `Textarea`) must set a `placeholder`, even when a `FieldLabel` is already present. The label says what the field is; the placeholder shows the expected format/example so the user doesn't have to guess before typing.

```tsx
// WRONG: no placeholder
<Input type="number" value={days} onChange={(e) => setDays(e.target.value)} />

// CORRECT: example value as placeholder
<Input type="number" placeholder="e.g. 14" value={days} onChange={(e) => setDays(e.target.value)} />
```

A blank-means-something field (e.g. "as per billed") still gets a placeholder — use it to say what the blank means (`placeholder="Blank = as per billed"`), not just an example value.

### Number inputs never show the native spin buttons

`<Input type="number" />` (`@/components/ui/input`) suppresses the browser's increment/decrement spinner globally via `inputVariants` — don't re-add it per call site, and don't hand-roll the `[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none` trio locally, it's already baked into the shared component.

### Editable table/ledger cells need a visual affordance

An editable cell (`Input`/`Select` with `variant="ledger"`, used in dense line-item tables — see `quotation-line-items-columns.tsx`) must look visibly different from a read-only cell showing the same kind of value. Never let an editable cell render as plain, unstyled text indistinguishable from a non-editable one — the user shouldn't have to click every cell to discover which ones respond. The shared `LEDGER_CELL_CLASSES` (`@/components/ui/ledger-cell`) carries this affordance (currently a dashed underline) for both `Input` and `SelectTrigger`'s `ledger` variant — extend that shared constant rather than styling one cell's `renderCell` differently from its siblings.

## Imports

- React imports first: `import { useState } from "react"`
- Then third-party libs, then absolute project imports, then relative
- Type-only imports: `import type { ReactNode } from "react"` — never mix runtime and type imports in one statement when ESLint's `consistent-type-imports` is configured

## Hooks Discipline

See `16-react-hooks.md` for the full ruleset. Style highlights:

- Custom hooks must start with `use` — enforced by `eslint-plugin-react-hooks`
- Group all hook calls at the top of the component, before any conditional logic
- Avoid creating ad-hoc hooks for one-line wrappers — inline the call instead

## State

- Local first (`useState`), lift only when shared
- Context for cross-cutting state read by many components (theme, auth, i18n) — not for high-frequency updates
- External store (Zustand, Jotai, Redux Toolkit) when state must persist across route changes, sync across tabs, or be debugged via devtools
- Never duplicate state that can be derived — compute during render

## Class Components

Forbidden in new code. Convert legacy class components to function components when touching them for non-trivial changes.

## File Organization (Next.js App Router)

### Hybrid Structure (Hard Rule)

Three locations, three purposes:

| Location | Purpose | Scope |
|----------|---------|-------|
| `components/ui/` | shadcn primitives + atomic UI | Reusable across all pages |
| `components/<area>/` | Shared feature components | Cross-page features (promoted on 2nd use) |
| `app/<route>/sections/<name>/` | Page-specific sections | Single page only |

Page-level utilities, hooks, and data dirs sit at the route root: `app/<route>/{utils,hooks,data}/`

### Page Sections Pattern

Each section is a named slice of a page under `app/<route>/sections/<name>/` and follows the three-file pattern:

**index.tsx** — Section shell
```tsx
// Async data fetch + Suspense boundary
export default async function BrandStripSection() {
  const brands = await fetchBrands();
  return (
    <Suspense fallback={<BrandStripSkeleton />}>
      <BrandStrip brands={brands} />
    </Suspense>
  );
}
```

**skeleton.tsx** — Loading fallback
- Same layout as the loaded state (no reflow)
- `animate-pulse` only
- **Partial skeleton rule:** Skeleton only the data-dependent leaf items (cards, images, API text). Never skeleton structural elements (headings, nav labels, section titles) — these always render real content to keep the page legible and interactive containers (carousels, marquees) scrollable

**error.tsx** — Error fallback
- Calm, warm tone
- Short message + retry button
- Use `error-state.tsx` only when Next.js's reserved `error.tsx` semantics conflict

Sub-components in the section follow the same pattern:
```
app/<route>/sections/<name>/
  index.tsx              # async + Suspense
  skeleton.tsx           # loading fallback
  error.tsx              # error fallback
  components/
    BrandCard/
      index.tsx          # async + Suspense
      skeleton.tsx
      error.tsx
```

Section-local utilities extract to `sections/<name>/utils/<domain>.ts` (e.g., `filters.ts`, `params.ts`, `transforms.ts`) when ≥2 files justify it; single helpers stay inline.

### Naming Rule

The primary file in every folder is always `index.tsx` — never `brand-strip/brand-strip.tsx`. The folder name is the component name.

### Shared Component Promotion

A section component is promoted to `components/<area>/` **only when a second page imports it**. On first import, leave it in `sections/<name>/`. Do not pre-emptively abstract.

### Component File Hygiene

Reuse potential gates every merge. Before inlining a child into its parent's `index.tsx`, ask:
- Could this be reused on another page or section?
- Is it purely presentational and specific to this exact parent?

If reuse is plausible, keep it a standalone file. Inline only children that are presentational and specific to one parent.

- **No vanity barrels.** Do not add a barrel `index.ts` for re-exports; import the file directly.
- **Grouping leaf modules is not inlining.** Collapsing same-domain modules that share a type (e.g., SVG icons) into one file is fine — nothing reusable gets buried.
- **shadcn primitives stay one-per-file** in `components/ui/` regardless of usage frequency.
