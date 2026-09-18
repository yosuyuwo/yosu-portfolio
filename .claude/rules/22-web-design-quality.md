# Web Design Quality Standards

## Anti-Template Policy

Do not ship generic template-looking UI. Frontend output should look intentional, opinionated, and specific to the product.

### Banned Patterns

- Default card grids with uniform spacing and no hierarchy
- Stock hero section with centered headline, gradient blob, and generic CTA
- Unmodified library defaults passed off as finished design
- Flat layouts with no layering, depth, or motion
- Uniform radius, spacing, and shadows across every component
- Safe gray-on-white styling with one decorative accent color
- Dashboard-by-numbers layouts with sidebar + cards + charts and no point of view
- Default font stacks used without a deliberate reason

### Required Qualities

Every meaningful frontend surface should demonstrate at least four of these:

1. Clear hierarchy through scale contrast
2. Intentional rhythm in spacing, not uniform padding everywhere
3. Depth or layering through overlap, shadows, surfaces, or motion
4. Typography with character and a real pairing strategy
5. Color used semantically, not just decoratively
6. Hover, focus, and active states that feel designed
7. Grid-breaking editorial or bento composition where appropriate
8. Texture, grain, or atmosphere when it fits the visual direction
9. Motion that clarifies flow instead of distracting from it
10. Data visualization treated as part of the design system, not an afterthought

## Before Writing Frontend Code

1. Pick a specific style direction. Avoid vague defaults like "clean minimal".
2. Define a palette intentionally.
3. Choose typography deliberately.
4. Gather at least a small set of real references.
5. Use ECC design/frontend skills where relevant.

### Forms Specifically

Before laying out any form — new or a redesign — identify its goal and context first, then let that drive the layout. Do not default to a flat list of equally-weighted fields:

1. What decision or task is this form for? (e.g. a Quotation form's job is comparing an origin to a destination — that relationship is the point, not just two dropdowns among many.)
2. Who fills it and under what conditions? (Expert back-office user moving fast vs. an occasional user who needs guidance changes how much grouping/labeling help is warranted.)
3. Which fields are primary to that goal vs. supporting detail? Group and weight accordingly — primary fields get stronger visual contrast (size, spacing, grouping); secondary/detail fields recede.
4. For long or dense forms, use sectioning, contrast, and rhythm (see Required Qualities above) to show the structure — never let scale alone force a uniform vertical stack of same-weight inputs.

Skipping this and going straight to "one field after another in schema order" is exactly the flat, undifferentiated layout the Anti-Template Policy above rules out.

## Worthwhile Style Directions

- Editorial / magazine
- Neo-brutalism
- Glassmorphism with real depth
- Dark luxury or light luxury with disciplined contrast
- Bento layouts
- Scrollytelling
- 3D integration
- Swiss / International
- Retro-futurism

Do not default to dark mode automatically. Choose the visual direction the product actually wants.

## Component Checklist

- [ ] Does it avoid looking like a default Tailwind or shadcn template?
- [ ] Does it have intentional hover/focus/active states?
- [ ] Does it use hierarchy rather than uniform emphasis?
- [ ] Would this look believable in a real product screenshot?
- [ ] If it supports both themes, do both light and dark feel intentional?
