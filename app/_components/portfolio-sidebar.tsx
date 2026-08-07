"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import gsap from "gsap"
import { Flip } from "gsap/Flip"
import {
  BriefcaseIcon,
  ExternalLinkIcon,
  MailIcon,
  PanelLeftIcon,
  UserRoundIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

gsap.registerPlugin(Flip)

export type SectionId = "works" | "about"
type FlipTargetId =
  | SectionId
  | "email"
  | "github"
  | "linkedin"
  | "instagram"
  | "collapse"

type FlipHighlightContextValue = {
  active: SectionId
  hovered: FlipTargetId | null
  setHovered: (id: FlipTargetId | null) => void
  registerTarget: (id: FlipTargetId, node: HTMLElement | null) => void
}

const FlipHighlightContext = createContext<FlipHighlightContextValue | null>(
  null,
)

function useFlipHighlight() {
  const ctx = useContext(FlipHighlightContext)
  if (!ctx) {
    throw new Error("useFlipHighlight must be used within FlipHighlightProvider")
  }
  return ctx
}

function useFlipTarget(id: FlipTargetId) {
  const { hovered, setHovered, registerTarget, active } = useFlipHighlight()
  const highlighted = hovered === id || (hovered === null && active === id)

  return {
    highlighted,
    setRef: useCallback(
      (node: HTMLElement | null) => registerTarget(id, node),
      [id, registerTarget],
    ),
    onMouseEnter: useCallback(() => setHovered(id), [id, setHovered]),
  }
}

function FlipHighlightProvider({
  active,
  children,
}: {
  active: SectionId
  children: React.ReactNode
}) {
  const { state: sidebarState } = useSidebar()
  const [hovered, setHovered] = useState<FlipTargetId | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const targetsRef = useRef<Partial<Record<FlipTargetId, HTMLElement | null>>>(
    {},
  )
  const firstFlip = useRef(true)
  const target = hovered ?? active

  const registerTarget = useCallback(
    (id: FlipTargetId, node: HTMLElement | null) => {
      targetsRef.current[id] = node
    },
    [],
  )

  useLayoutEffect(() => {
    const pill = pillRef.current
    const container = containerRef.current
    const item = targetsRef.current[target]
    if (!pill || !container || !item) return

    const ctx = gsap.context(() => {
      const state = Flip.getState(pill)
      const cRect = container.getBoundingClientRect()
      const bRect = item.getBoundingClientRect()

      gsap.set(pill, {
        x: bRect.left - cRect.left,
        y: bRect.top - cRect.top,
        width: bRect.width,
        height: bRect.height,
      })

      if (firstFlip.current) {
        firstFlip.current = false
        return
      }

      Flip.from(state, {
        duration: 0.45,
        ease: "power2.out",
      })
    }, container)

    return () => ctx.revert()
  }, [target, sidebarState])

  const value = useMemo(
    () => ({ active, hovered, setHovered, registerTarget }),
    [active, hovered, registerTarget],
  )

  return (
    <FlipHighlightContext.Provider value={value}>
      <div
        ref={containerRef}
        className="relative flex h-full min-h-0 flex-1 flex-col"
        onMouseLeave={() => setHovered(null)}
      >
        <div
          ref={pillRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-0 rounded-md bg-sidebar-accent"
        />
        {children}
      </div>
    </FlipHighlightContext.Provider>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.53 2.865 8.372 6.839 9.725.5.094.683-.222.683-.486 0-.24-.009-.875-.014-1.718-2.782.618-3.37-1.37-3.37-1.37-.454-1.18-1.11-1.494-1.11-1.494-.908-.636.069-.623.069-.623 1.004.072 1.532 1.057 1.532 1.057.892 1.566 2.341 1.114 2.91.852.091-.662.35-1.114.636-1.37-2.22-.259-4.555-1.138-4.555-5.066 0-1.119.39-2.033 1.029-2.75-.103-.258-.446-1.302.098-2.714 0 0 .84-.275 2.75 1.05A9.36 9.36 0 0 1 12 7.14c.85.004 1.705.117 2.504.344 1.909-1.325 2.747-1.05 2.747-1.05.546 1.412.203 2.456.1 2.714.64.717 1.028 1.631 1.028 2.75 0 3.939-2.339 4.804-4.566 5.058.36.318.68.945.68 1.905 0 1.374-.012 2.482-.012 2.82 0 .266.18.585.688.485A10.28 10.28 0 0 0 22 12.253C22 6.586 17.523 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const socials = [
  {
    id: "email" as const,
    href: "mailto:yosuayuwono@gmail.com",
    label: "Email",
    icon: <MailIcon />,
  },
  {
    id: "github" as const,
    href: "https://github.com/yosuyuwo",
    label: "GitHub",
    icon: <GitHubIcon className="size-4" />,
  },
  {
    id: "linkedin" as const,
    href: "https://www.linkedin.com/in/yosuyuwo",
    label: "LinkedIn",
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    id: "instagram" as const,
    href: "https://www.instagram.com/yosuyuwo/",
    label: "Instagram",
    icon: <InstagramIcon className="size-4" />,
  },
]

const NAV_ITEMS: {
  id: SectionId
  label: string
  icon: React.ReactNode
}[] = [
  { id: "works", label: "Works", icon: <BriefcaseIcon /> },
  { id: "about", label: "About", icon: <UserRoundIcon /> },
]

const flipHitClass =
  "relative z-10 hover:bg-transparent data-active:bg-transparent"

function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.svg"
      alt=""
      width={54}
      height={54}
      className={cn("h-6.5 w-auto dark:invert", className)}
      priority
    />
  )
}

export function BrandLockup({
  className,
  href = "#hero",
  hideTextWhenCollapsed = false,
}: {
  className?: string
  href?: string
  hideTextWhenCollapsed?: boolean
}) {
  return (
    <a
      href={href}
      className={cn(
        "relative z-10 flex min-w-0 items-center justify-start gap-2 overflow-hidden",
        className,
      )}
    >
      <LogoMark className="shrink-0" />
      <span
        className={cn(
          "flex min-w-0 flex-col",
          hideTextWhenCollapsed && "group-data-[collapsible=icon]:hidden",
        )}
      >
        <span className="truncate text-sm font-bold leading-none!">Yosua</span>
        <span className="truncate text-sm font-bold leading-none!">Yuwono</span>
      </span>
      <span className="sr-only">Yosua Yuwono</span>
    </a>
  )
}

function BrandHeader() {
  return (
    <BrandLockup className="px-2 py-1" hideTextWhenCollapsed />
  )
}

function PrimaryNavItem({
  item,
}: {
  item: (typeof NAV_ITEMS)[number]
}) {
  const { active, hovered } = useFlipHighlight()
  const { highlighted, setRef, onMouseEnter } = useFlipTarget(item.id)
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <SidebarMenuItem className="relative z-10">
      <div ref={setRef} onMouseEnter={onMouseEnter}>
        <SidebarMenuButton
          tooltip={item.label}
          isActive={active === item.id && hovered === null}
          className={cn(
            flipHitClass,
            highlighted && "font-medium text-sidebar-accent-foreground",
          )}
          render={
            <a
              href={`#${item.id}`}
              onClick={() => {
                if (isMobile) setOpenMobile(false)
              }}
            />
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </SidebarMenuButton>
      </div>
    </SidebarMenuItem>
  )
}

function PrimaryNav() {
  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <PrimaryNavItem key={item.id} item={item} />
      ))}
    </SidebarMenu>
  )
}

function SocialNavItem({ social }: { social: (typeof socials)[number] }) {
  const { highlighted, setRef, onMouseEnter } = useFlipTarget(social.id)
  const isMailto = social.href.startsWith("mailto:")

  return (
    <SidebarMenuItem className="relative z-10">
      <div ref={setRef} onMouseEnter={onMouseEnter}>
        <SidebarMenuButton
          tooltip={social.label}
          className={cn(
            "group/social pr-2",
            flipHitClass,
            highlighted && "font-medium text-sidebar-accent-foreground",
          )}
          render={
            <a
              href={social.href}
              {...(isMailto
                ? {}
                : { target: "_blank", rel: "noreferrer" })}
            />
          }
        >
          {social.icon}
          <span className="flex-1">{social.label}</span>
          {isMailto ? null : (
            <ExternalLinkIcon className="ml-auto size-3.5! translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover/social:translate-y-0 group-hover/social:opacity-100 group-data-[collapsible=icon]:hidden" />
          )}
        </SidebarMenuButton>
      </div>
    </SidebarMenuItem>
  )
}

function SocialNav() {
  return (
    <SidebarMenu>
      {socials.map((social) => (
        <SocialNavItem key={social.id} social={social} />
      ))}
    </SidebarMenu>
  )
}

function SidebarCollapseControl() {
  const { toggleSidebar, state } = useSidebar()
  const { highlighted, setRef, onMouseEnter } = useFlipTarget("collapse")
  const collapsed = state === "collapsed"
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar"

  return (
    <div ref={setRef} onMouseEnter={onMouseEnter} className="relative z-10">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2 px-2 hover:bg-transparent group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:min-w-8! group-data-[collapsible=icon]:px-2!",
                highlighted && "text-sidebar-accent-foreground",
              )}
              onClick={toggleSidebar}
              aria-label={label}
            >
              <PanelLeftIcon />
              <span className="group-data-[collapsible=icon]:hidden">
                Collapse Sidebar
              </span>
            </Button>
          }
        />
        <TooltipContent side="right" align="center" hidden={!collapsed}>
          {label}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export function PortfolioSidebar({
  activeSection,
}: {
  activeSection: SectionId
}) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <FlipHighlightProvider active={activeSection}>
        <SidebarHeader className="relative z-10 hidden px-2 pt-3 md:flex">
          <BrandHeader />
        </SidebarHeader>
        <SidebarContent className="relative z-10 gap-4 px-2 pt-6 md:pt-2">
          <PrimaryNav />
        </SidebarContent>
        <SidebarFooter className="relative z-10 gap-2 px-2 pb-3">
          <SocialNav />
          <div className="hidden md:block">
            <SidebarCollapseControl />
          </div>
        </SidebarFooter>
      </FlipHighlightProvider>
      <SidebarRail />
    </Sidebar>
  )
}

export function useActiveSection(
  sectionIds: readonly SectionId[],
  root: HTMLElement | null,
): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0] ?? "works")

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]?.target.id
        if (top === "works" || top === "about") {
          setActive(top)
        }
      },
      {
        root,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [root, sectionIds])

  return active
}
