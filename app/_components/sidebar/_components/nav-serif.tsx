import { NAV_ITEMS, type NavSectionId } from "@/app/_lib/nav"
import { cn } from "@/lib/utils"

const LAYER_CLASS =
  "absolute bottom-1.5 left-0 origin-bottom-left whitespace-nowrap transition-[opacity,translate,scale,filter,color] duration-slow ease-out-expo"

export function NavSerif({ active }: { active: NavSectionId }) {
  return (
    <ul className="flex flex-col">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active
        return (
          <li key={item.id} data-enter>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className="group relative block h-9 focus-visible:outline-none"
            >
              <span
                className={cn(
                  LAYER_CLASS,
                  "text-[15px] leading-none text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground",
                  isActive
                    ? "translate-y-1 opacity-0 blur-[2px]"
                    : "translate-y-0 opacity-100 blur-none group-hover:translate-x-1"
                )}
              >
                {item.label}
              </span>
              <span
                aria-hidden
                className={cn(
                  LAYER_CLASS,
                  "-bottom-px font-serif text-[1.75rem] leading-none text-brand italic",
                  isActive
                    ? "translate-y-0 scale-100 opacity-100 blur-none"
                    : "translate-y-1 scale-75 opacity-0 blur-[2px]"
                )}
              >
                {item.label}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
