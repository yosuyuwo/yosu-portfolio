"use client"

import { ExternalLinkIcon, MailIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SITE_SOCIALS } from "@/lib/site-content"
import { cn } from "@/lib/utils"

import { useFlipTarget } from "../_hooks/use-flip-highlight"
import { flipHitClass } from "../_lib/flip-hit-class"
import type { FlipTargetId } from "../_lib/flip-target-id"

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

const SOCIAL_ICONS: Record<
  (typeof SITE_SOCIALS)[number]["id"],
  React.ReactNode
> = {
  email: <MailIcon />,
  github: <GitHubIcon className="size-4" />,
  linkedin: <LinkedInIcon className="size-4" />,
  instagram: <InstagramIcon className="size-4" />,
}

type Social = (typeof SITE_SOCIALS)[number] & {
  icon: React.ReactNode
}

function SocialNavItem({ social }: { social: Social }) {
  const { highlighted, setRef, onMouseEnter } = useFlipTarget(
    social.id as FlipTargetId,
  )
  const { isMobile } = useSidebar()
  const isMailto = social.href.startsWith("mailto:")

  return (
    <SidebarMenuItem className="relative z-10">
      <div ref={setRef} onMouseEnter={isMobile ? undefined : onMouseEnter}>
        <SidebarMenuButton
          tooltip={social.label}
          className={cn(
            "group/social pr-2",
            flipHitClass,
            !isMobile &&
              highlighted &&
              "font-medium text-sidebar-accent-foreground",
          )}
          render={
            <a
              href={social.href}
              {...(isMailto ? {} : { target: "_blank", rel: "noreferrer" })}
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

export function SocialNav() {
  return (
    <SidebarMenu>
      {SITE_SOCIALS.map((social) => (
        <SocialNavItem
          key={social.id}
          social={{ ...social, icon: SOCIAL_ICONS[social.id] }}
        />
      ))}
    </SidebarMenu>
  )
}
