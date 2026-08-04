# Research: kolejain public surface patterns

**Question:** What concrete layout, density, typography, and content-pattern cues from [kolejain.com](https://www.kolejain.com/) (and list-style pages like `/resources`) should transfer into our simple Works + About + inset sidebar portfolio — and what should we deliberately not copy?

**Primary sources (fetched 2026-08-04):**

- https://www.kolejain.com/
- https://www.kolejain.com/resources
- https://www.kolejain.com/stash
- https://www.kolejain.com/submit
- Global tokens/type from first-party CSS: `https://www.kolejain.com/_app/immutable/assets/Stash.COzXD62a.css`
- Layout/chrome CSS: `https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css`
- Home content CSS: `https://www.kolejain.com/_app/immutable/assets/2.CHUmsAui.css`
- Resources list CSS: `https://www.kolejain.com/_app/immutable/assets/5.IKptrUWy.css`

**Chrome contrast only (not inspiration):**

- shadcn sidebar-08 block: https://ui.shadcn.com/blocks/sidebar (“An inset sidebar with secondary navigation”; `npx shadcn add sidebar-08`)
- Sidebar `inset` + `SidebarInset` docs: https://ui.shadcn.com/docs/components/radix/sidebar

**Locked portfolio context (do not reopen):** hire/collaborate Works + About; inset sidebar with logo + Works + About + Socials; `/` Works list; `/works/[slug]` detail; About = intro / Experience / Skill groups / contact; CSS-only motion; non-Awwwards bar. Domain: `CONTEXT.md`.

---

## 1. Sidebar / chrome vs content

### What kolejain does

| Cue | Evidence |
| --- | --- |
| Two-column shell: fixed-width chrome + scrollable content | Layout grid `232px 1fr` (collapsed `79px 1fr`) in `0.p-mS5E0n.css` (`.layout.svelte-12qhfyh`) |
| Quieter outer shell, inset content plane | Outer uses `bg-2`; content wrapper has `border-top-left-radius: var(--md)`, `border-left` + `border-top` thin stroke, `margin-top: var(--xs)`, height `calc(100dvh - var(--xs))` ([layout CSS](https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css); DOM on [home](https://www.kolejain.com/)) |
| Sidebar sits in an outer margin, not flush full-bleed | `.sidebar` `margin: var(--outer-margin)` (20px desktop; 16px ≤930px), height `calc(100vh - 40px)`, panel width ~192px, radius `--md` ([sidebar CSS](https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css); tokens in [Stash CSS](https://www.kolejain.com/_app/immutable/assets/Stash.COzXD62a.css)) |
| Chrome stack: brand → collapse → primary nav → socials/email at bottom | [Home DOM](https://www.kolejain.com/): logo.svg + “Kole Jain”; Collapse; Home / Resources (count chip “22”) / Stash / Submit; then Youtube (68.5k) / Instagram / LinkedIn / email with copy affordance |
| Active + hover = soft fill, not loud chrome | Active nav `background-color: var(--bg-3)`; desktop `.label:hover` → `--bg-3` ([0 CSS](https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css), [Stash CSS](https://www.kolejain.com/_app/immutable/assets/Stash.COzXD62a.css)) |
| Mobile: content stays primary; sidebar becomes overlay sheet | ≤930px: single-column layout; sidebar fixed overlay; content can translate off ([0 CSS](https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css)) |

### Transfer vs our inset shell

**Transfer the relationship, not the product IA.**

- Keep the mental model: **calm outer field + bordered, slightly inset content surface** that owns the page scroll.
- Keep **sidebar as thin chrome**: wordmark/logo up top, **two** primary routes (Works, About), **Socials pinned to the footer** (email, GitHub, LinkedIn, Instagram per lock).
- Soft active/hover fills on nav labels (zinc-adjacent, light-leaning — map already notes kolejain is light-leaning).

**Do not copy** kolejain’s multi-product nav (Home / Resources / Stash / Submit), count chips, Collapse-to-icon complexity as a product requirement, or YouTube promo announcement strip in the chrome ([home](https://www.kolejain.com/)).

### Contrast: shadcn sidebar-08 (chrome only)

[sidebar-08](https://ui.shadcn.com/blocks/sidebar) is an **inset** shell with **dashboard** density: nested “Platform” groups, Projects list, Support/Feedback secondary nav, user menu footer, and an inset **header with SidebarTrigger + breadcrumbs**. Use it for the **inset variant / `SidebarInset` mechanics** ([docs](https://ui.shadcn.com/docs/components/radix/sidebar)). Strip the dashboard furniture so chrome stays portfolio-simple (`CONTEXT.md` Sidebar: “Simple inset shell — not dashboard chrome”).

---

## 2. List-style presentation (`/resources` → Works list cues)

`/resources` is the closest first-party **list surface** ([resources](https://www.kolejain.com/resources); styles in [5.IKptrUWy.css](https://www.kolejain.com/_app/immutable/assets/5.IKptrUWy.css)).

### Patterns observed

1. **Page opener, not a dashboard header** — Centered `h1` intro (“A growing collection…”), `max-width: 500px`, large top margin (`margin: 10vh auto` on `.title`).
2. **Vertical stack of rows, not a card grid** — `.resource-cont` uses `gap: 80px`; each `.resource` is a full-width column capped around `max-width: 1236px` with horizontal `--side-margin` (100px → 32px → 16px by breakpoint).
3. **Row anatomy** — Left: small thumbnail (120px desktop / 80px mobile) with play affordance linking out; middle: **title (`h2`) + date (`h4.text-sub`)**; right: Preview (underlined subtext) + Download (pill / near-black button).
4. **Secondary media rail under each row** — Horizontal 16:9 frames (`width: 300px` / `240px` mobile), `border: 1px solid var(--stroke)`, `border-radius: var(--sm)`, snap carousel — gallery density on the **index**, not only detail.
5. **Closing hire/contact CTA** — “Have a project or role in mind?” + short line + Compose / Copy email (`cta` ~80vh; [resources](https://www.kolejain.com/resources)).

### What transfers to Works at `/`

| Transfer | How it maps |
| --- | --- |
| Media + title + date in a **row / list rhythm** | Cover + title + date (+ our locked **summary**) |
| Quiet date as **subtext** | `text-sub` / muted zinc, not competing with title |
| Generous vertical spacing between items | Aim for airy list density (~large gap), not a tight feed |
| Optional short page framing line | One calm Works intro if needed — not a marketing hero |
| Contact CTA pattern | Belongs on **About** (contact), not necessarily under Works |

### What not to copy for Works list

- Per-item **Preview / Download** dual CTAs and outbound YouTube thumbs as the primary interaction (our Works navigate to `/works/[slug]`).
- **Index-level carousels** and autoplay video wheels — gallery belongs on detail; list stays cover + text.
- Newsletter / “Join 5900+ Designers” signup + animated component wheel above the list ([resources](https://www.kolejain.com/resources)).

---

## 3. About-like sections (kolejain has no About page)

Observed substitutes:

| Surface | Role | Cite |
| --- | --- | --- |
| `/` home | Placeholder witty headline + chip links to other products; not a portfolio intro | [home](https://www.kolejain.com/), [2 CSS](https://www.kolejain.com/_app/immutable/assets/2.CHUmsAui.css) |
| `/resources` footer CTA | Closest “open to roles / chat” + email | [resources](https://www.kolejain.com/resources) |
| `/stash`, `/submit` | Product / submission marketing | [stash](https://www.kolejain.com/stash), [submit](https://www.kolejain.com/submit) |

**Transfer:** calm contact block (short invitation + email action) and structured, readable sections — not a second gallery.

**Do not transfer:** home-as-placeholder, product landing sections, submit forms, or “made with ♥ and ☕” content footer as a substitute for About (`CONTEXT.md` About = intro, Experience, Skill groups, contact).

---

## 4. Spacing, type, color hierarchy

From [Stash.COzXD62a.css](https://www.kolejain.com/_app/immutable/assets/Stash.COzXD62a.css) and page HTML:

**Color (light-leaning neutrals)**

- `--bg-1: #FAFAFA`, `--bg-2: #F5F5F5`, `--bg-3: #EBEBEB`
- `--stroke: #E0E0E0`, `--text: #1A1A1A`, `--subtext: #7D7D7D`, `--button: #161618`
- `theme-color` meta `#FAFAFA` on [home](https://www.kolejain.com/)
- Purple `--purple: #6430FF` exists in tokens but is **not** the chrome identity

**Type**

- Display/headings `h1–h3`: **Geist** weight 600
- Body / `h4+`: **DM Sans** 400 (600 for `.bold`)
- Scale (desktop): h1 32px (`letter-spacing: -2.5%`), h2 22px, h3 16px, h4 14px, h5 12px; tightens at ≤1150px
- Fonts preloaded on every page: `dm-sans_regular`, `dm-sans_semibold`, `geist_semibold`

**Spacing tokens**

- `--xxxs` 2 → `--xxxl` 64; content `--side-margin` 100 / 32 / 16; chrome `--outer-margin` 20 / 16

**Motion (restraint)**

- Mostly CSS transitions (≈0.3–0.4s, `--transition: cubic-bezier(.075, .82, .165, 1)`), label hover fills, small icon nudge on hover — not scroll storytelling ([Edit CSS](https://www.kolejain.com/_app/immutable/assets/Edit.BJJrFFqG.css), layout transitions in [0 CSS](https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css)). Aligns with our **CSS-only** lock; still skip their continuous carousel/wheel animations on our V1 Works list.

**Transfer:** light neutral shell, clear title/subtext hierarchy, dual sans pairing idea (expressive heading + quiet body — we need not clone Geist/DM Sans if stack tokens differ), generous side margins, subtle hover. **Don’t** adopt purple-as-brand or dense dashboard type.

---

## 5. Do / don’t (aligned to non-Awwwards bar)

### Do

1. **Inset relationship** — quiet outer chrome + bordered, rounded content plane that scrolls the page.
2. **Thin sidebar** — logo wordmark, Works + About only, Socials in footer (email + profiles).
3. **Works as a calm list** — cover, title, summary, date; airy vertical rhythm; muted dates.
4. **Detail owns gallery** — multi-image / rich media on `/works/[slug]`, not on the index.
5. **About = structured hire narrative** — intro, Experience rows, Skill groups, short contact CTA (Compose/copy-or-mailto spirit without copying kolejain chrome).
6. **Light-leaning neutrals + soft active fills** — craft through spacing and type, not spectacle.
7. **CSS-only micro-interaction** — hover/active; no scroll theatre.

### Don’t

1. **Don’t** ship sidebar-08’s dashboard furniture (breadcrumbs bar, nested platform nav, projects tree, user avatar menu) as portfolio chrome.
2. **Don’t** mirror kolejain IA (Resources / Stash / Submit / YouTube promo / newsletter wheel).
3. **Don’t** put carousels, download pills, or marketing CTAs on the Works index.
4. **Don’t** chase Awwwards motion, full-bleed experimental layouts, or constant decorative animation.
5. **Don’t** lean on purple/glow/dark-default looks; kolejain’s identity here is **light gray craft**, not accent theatrics.
6. **Don’t** invent a separate marketing home — `/` stays Works (`CONTEXT.md`).

---

## 6. One-line gist (for map)

Borrow kolejain’s inset light chrome + airy media/title/date list density and hire-contact CTA calm — not its product IA, index carousels, or dashboard-08 furniture.

---

## Sources checklist

- https://www.kolejain.com/
- https://www.kolejain.com/resources
- https://www.kolejain.com/stash
- https://www.kolejain.com/submit
- https://www.kolejain.com/_app/immutable/assets/Stash.COzXD62a.css
- https://www.kolejain.com/_app/immutable/assets/0.p-mS5E0n.css
- https://www.kolejain.com/_app/immutable/assets/2.CHUmsAui.css
- https://www.kolejain.com/_app/immutable/assets/5.IKptrUWy.css
- https://www.kolejain.com/_app/immutable/assets/Edit.BJJrFFqG.css
- https://ui.shadcn.com/blocks/sidebar
- https://ui.shadcn.com/docs/components/radix/sidebar
- Repo: `CONTEXT.md`, Wayfinder map #1 locked decisions
