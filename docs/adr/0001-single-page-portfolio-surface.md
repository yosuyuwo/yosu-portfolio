# Single-page portfolio surface

Early research and the first wayfinder destination assumed separate routes (`/` Works list, `/works/[slug]` detail, `/about`). We locked one route (`/`) instead: Hero → Works → About as scroll sections, Work detail as a same-route near-fullscreen Dialog (copy left / gallery right), and hire contact as a Contact form bottom Sheet that builds a `mailto:` URL. The goal is a faster hire/collaborate skim with less IA and no marketing landing page — depth stays available without fragmenting the site into multiple URLs for this map.

## Considered options

- **Multi-route** (`/`, `/works/[slug]`, `/about`) — clearer deep links and shareable Work URLs; more chrome and navigation surface than we want for v1.
- **Single route + same-route detail (chosen)** — one URL, section anchors, near-fullscreen Dialog for Work detail + Contact form bottom Sheet; Work detail may graduate to a route later if shareable links become necessary.
- **Separate home/landing** — rejected; Hero is a compact preamble band on `/`, not its own page.

## Consequences

- Sidebar nav is in-page anchors (Works, About); logo scrolls to Hero (`#hero`).
- Contact is client-side mailto navigate only — no contact API or third-party form host on this map.
- Contact form opens as a bottom Sheet (not Dialog or side Sheet) from Hero and the mobile top bar.
- Work detail is a near-fullscreen Dialog with content left / gallery right (not Sheet or in-page expand); deep-linking a specific Work is out of scope until a Dialog→route decision is revisited.
- Works list uses a cover-led grid with `@container` / `@2xl` two-column layout.
