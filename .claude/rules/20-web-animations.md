# Web Animation Rules

## Three mechanisms, three purposes

Pick based on what's animating, not preference. Apply them in this order of precedence.

| Mechanism | Use for | Why |
|---|---|---|
| CSS transitions (`duration-*`/`ease-*` tokens) | Interactive *state* changes (`:hover`, `:focus-within`, `:placeholder-shown`, a `data-*` attribute toggling) | Interruptible — retargets smoothly if state flips mid-animation. **First choice for simple state reactions.** |
| **GSAP** (`gsap` + `useGSAP` from `@gsap/react`) | Timelines, sequences, continuous loops, scroll-linked motion, staggered entrances, runtime playback control (pause/resume/reverse) | The **designated JS animation tool**. Reference: `components/marquee/index.tsx` for a continuous loop with hover pause/resume using `gsap.quickTo()`. |
| Keyframes (`tw-animate-css` `animate-in`/`animate-out`) | **Base UI open/close transitions only** — popup open/close wired via `data-open`/`data-closed` attributes | Reserved for shadcn/Base UI component internals (Select, Dropdown, Drawer). Do not write new keyframe CSS when GSAP would be cleaner. |

**When to reach for GSAP:** any animation that needs a timeline, runs continuously, responds to scroll, requires playback control, or stages multiple elements in sequence. Do not write new CSS keyframes for these cases. Always honor `prefers-reduced-motion` via `gsap.matchMedia()`.

## Token reference

| Token | Value | Use for |
|---|---|---|
| `duration-fast` | 150ms | Micro-interactions, exits, backdrop fades |
| `duration-normal` | 300ms | Default interactive transitions, entrances |
| `duration-slow` | 500ms | Larger/slower settling motion (e.g. the floating label) |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances/settling — snappier deceleration than the default ease |
| `ease-icon` | `cubic-bezier(0.2, 0, 0, 1)` | Contextual icon cross-fades only (exact curve, see below) |

Reuse Tailwind's *built-in* `ease-out`/`ease-in`/`ease-in-out` for everything else — don't invent a named token for a curve Tailwind already ships. Never hardcode a raw `duration-200`/`ease-[cubic-bezier(...)]` value inline.

## Asymmetric enter/exit

Exits should be shorter and softer than entrances — don't use the same timing both directions. For any base-ui-driven open/close component (Drawer, Dialog, Popover, etc.), use the `data-ending-style` attribute to override timing only on the way out:

```tsx
// components/ui/drawer.tsx — the reference implementation
"transition-transform duration-normal ease-out-expo data-starting-style:duration-0 data-ending-style:duration-fast data-ending-style:ease-in"
```

`data-starting-style:duration-0` skips the transition on initial mount; `data-ending-style:duration-fast data-ending-style:ease-in` makes the close faster and gives it an accelerating feel.

## `tap-scale` utility

A single opt-in class for scale-press feedback (`scale(0.96)`, never lower):
```tsx
<button className="tap-scale">...</button>
```

**Don't retrofit this onto a component that already has its own intentional press style.**

## Icon cross-fade pattern

When an icon swaps based on state (play→pause, like→liked), cross-fade with `ease-icon`:

```tsx
function IconToggle({ isActive, ActiveIcon, InactiveIcon }: Props) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-[opacity,scale,filter] duration-normal ease-icon",
          isActive ? "scale-100 opacity-100 blur-none" : "scale-25 opacity-0 blur-sm"
        )}
      >
        <ActiveIcon />
      </div>
      <div
        className={cn(
          "transition-[opacity,scale,filter] duration-normal ease-icon",
          isActive ? "scale-25 opacity-0 blur-sm" : "scale-100 opacity-100 blur-none"
        )}
      >
        <InactiveIcon />
      </div>
    </div>
  )
}
```

Scale `0.25` → `1`, opacity `0` → `1`, blur `4px` → `0` — exact values, don't deviate.

## Split/staggered page-content enter

For multi-element content that should enter in sequence, prefer GSAP with `gsap.from()` + `stagger`.

## Never `transition: all`

Always list exact properties. Example:
```
// Before
transition-all

// After
transition-[color,background-color,border-color,box-shadow,translate]
```

Tailwind's `transition-transform` is an acceptable exception — it covers exactly `transform, translate, scale, rotate`.
