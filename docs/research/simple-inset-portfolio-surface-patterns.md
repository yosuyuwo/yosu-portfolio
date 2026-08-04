# Research: simple inset portfolio surface patterns

**Question:** What concrete layout, density, typography, and content-pattern cues should define our simple Works + About + inset sidebar portfolio — and what should we deliberately avoid for a non-Awwwards, hire-ready site?

**Chrome mechanics (implementation reference only):**

- shadcn sidebar-08 block: https://ui.shadcn.com/blocks/sidebar (“An inset sidebar with secondary navigation”; `npx shadcn add sidebar-08`)
- Sidebar `inset` + `SidebarInset` docs: https://ui.shadcn.com/docs/components/radix/sidebar

**Locked portfolio context (do not reopen):** hire/collaborate Works + About; inset sidebar with logo + Works + About + Socials; `/` Works list; `/works/[slug]` detail; About = intro / Experience / Skill groups / contact; CSS-only motion; non-Awwwards bar. Domain: `CONTEXT.md`.

---

## 1. Sidebar / chrome vs content

### Target relationship

| Cue | Intent |
| --- | --- |
| Two-column shell: fixed-width chrome + scrollable content | Sidebar stays thin; content owns the page |
| Quieter outer shell, inset content plane | Soft outer field; content surface slightly inset (radius + light border) |
| Sidebar not flush full-bleed | Small outer margin around chrome on desktop |
| Chrome stack: brand → primary nav → socials/email at bottom | Logo up top; Works + About only; Socials pinned to footer |
| Active + hover = soft fill, not loud chrome | Muted zinc-adjacent fills |
| Mobile: content stays primary; sidebar becomes overlay sheet | Match shadcn sheet behavior; no separate mobile IA |

### Transfer vs our inset shell

- Keep the mental model: **calm outer field + bordered, slightly inset content surface** that owns the page scroll.
- Keep **sidebar as thin chrome**: wordmark/logo up top, **two** primary routes (Works, About), **Socials pinned to the footer** (email, GitHub, LinkedIn, Instagram per lock).
- Soft active/hover fills on nav labels; **light-leaning** default.

**Do not ship** multi-product nav, count chips, collapse-to-icon as a product requirement, or promo/announcement strips in the chrome.

### Contrast: shadcn sidebar-08 (chrome only)

[sidebar-08](https://ui.shadcn.com/blocks/sidebar) is an **inset** shell with **dashboard** density: nested “Platform” groups, Projects list, Support/Feedback secondary nav, user menu footer, and an inset **header with SidebarTrigger + breadcrumbs**. Use it for the **inset variant / `SidebarInset` mechanics** ([docs](https://ui.shadcn.com/docs/components/radix/sidebar)). Strip the dashboard furniture so chrome stays portfolio-simple (`CONTEXT.md` Sidebar: “Simple inset shell — not dashboard chrome”).

---

## 2. Works list presentation

### Patterns to aim for

1. **Page opener, not a dashboard header** — Optional short, calm framing line — not a marketing hero.
2. **Vertical stack of rows, not a card grid** — Full-width list rhythm with generous vertical gap.
3. **Row anatomy** — Cover + **title** + muted **date** + locked **summary**.
4. **Gallery on detail, not index** — Multi-image belongs on `/works/[slug]`.
5. **Hire/contact CTA** — Belongs on **About** (contact), not under the Works list.

### What not to put on the Works index

- Dual outbound CTAs (preview/download style) as the primary interaction — Works navigate to `/works/[slug]`.
- Index-level carousels or autoplay media rails.
- Newsletter / signup / animated marketing blocks above the list.

---

## 3. About surface

About is a first-class hire narrative — not a second gallery and not a product landing.

**Include:** calm intro, structured Experience rows, Skill groups, short contact CTA (mailto or copy-email).

**Avoid:** placeholder home witty copy, product marketing sections, submit forms, or decorative site footers as a substitute for About (`CONTEXT.md`).

---

## 4. Spacing, type, color hierarchy

**Color (light-leaning neutrals)**

- Near-white / light gray shell (`#FAFAFA`–`#F5F5F5` range), soft stroke, near-black text, muted subtext.
- Soft active fill on chrome (light gray), not saturated accents.
- Avoid purple-as-brand / glow / dark-default identity for V1.

**Type**

- Clear title vs muted date/subtext hierarchy.
- Expressive heading + quiet body pairing is fine; keep existing stack fonts (IBM Plex Sans / Geist Mono) unless a later ticket changes them.
- Prefer readable scale over display theatrics.

**Spacing**

- Generous side margins and airy list gaps; craft through whitespace.

**Motion (restraint)**

- CSS transitions for hover/active only — aligns with **CSS-only** lock. No scroll storytelling or continuous decorative animation on V1.

---

## 5. Do / don’t (aligned to non-Awwwards bar)

### Do

1. **Inset relationship** — quiet outer chrome + bordered, rounded content plane that scrolls the page.
2. **Thin sidebar** — logo wordmark, Works + About only, Socials in footer (email + profiles).
3. **Works as a calm list** — cover, title, summary, date; airy vertical rhythm; muted dates.
4. **Detail owns gallery** — multi-image / rich media on `/works/[slug]`, not on the index.
5. **About = structured hire narrative** — intro, Experience rows, Skill groups, short contact CTA.
6. **Light-leaning neutrals + soft active fills** — craft through spacing and type, not spectacle.
7. **CSS-only micro-interaction** — hover/active; no scroll theatre.

### Don’t

1. **Don’t** ship sidebar-08’s dashboard furniture (breadcrumbs bar, nested platform nav, projects tree, user avatar menu) as portfolio chrome.
2. **Don’t** invent multi-product IA or marketing promo strips in the sidebar.
3. **Don’t** put carousels, download pills, or marketing CTAs on the Works index.
4. **Don’t** chase Awwwards motion, full-bleed experimental layouts, or constant decorative animation.
5. **Don’t** lean on purple/glow/dark-default looks — prefer **light gray craft**.
6. **Don’t** invent a separate marketing home — `/` stays Works (`CONTEXT.md`).

---

## 6. One-line gist (for map)

Inset light chrome + airy media/title/date list density and hire-contact CTA calm — not product IA, index carousels, or dashboard-08 furniture.

---

## Sources checklist

- https://ui.shadcn.com/blocks/sidebar
- https://ui.shadcn.com/docs/components/radix/sidebar
- Repo: `CONTEXT.md`, Wayfinder map #1 locked decisions
