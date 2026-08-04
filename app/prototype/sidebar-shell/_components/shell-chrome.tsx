"use client"

import Image from "next/image"
import { MailIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

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
    id: "email",
    href: "mailto:yosuayuwono@gmail.com",
    label: "Email",
    icon: <MailIcon />,
  },
  {
    id: "github",
    href: "https://github.com/yosuyuwo",
    label: "GitHub",
    icon: <GitHubIcon className="size-4" />,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/yosuyuwo",
    label: "LinkedIn",
    icon: <LinkedInIcon className="size-4" />,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/yosuyuwo/",
    label: "Instagram",
    icon: <InstagramIcon className="size-4" />,
  },
]

function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.svg"
      alt="Yosu"
      width={54}
      height={45}
      className={cn("h-7 w-auto dark:invert", className)}
      priority
    />
  )
}

function PrimaryNav({ active = "works" }: { active?: "works" | "about" }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={active === "works"} render={<a href="#" />}>
          <span>Works</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={active === "about"} render={<a href="#" />}>
          <span>About</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function SocialFooter() {
  return (
    <SidebarMenu className="flex-row gap-1 px-2">
      {socials.map((social) => (
        <SidebarMenuItem key={social.id} className="flex-1">
          <SidebarMenuButton
            size="sm"
            tooltip={social.label}
            className="justify-center"
            render={<a href={social.href} target="_blank" rel="noreferrer" />}
          >
            {social.icon}
            <span className="sr-only">{social.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

/** A - research-faithful stripped inset shell */
export function VariantASidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader className="px-4 pt-4 pb-2">
        <a href="#" className="inline-flex">
          <LogoMark />
        </a>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4">
        <PrimaryNav />
      </SidebarContent>
      <SidebarFooter className="pb-3">
        <SocialFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export function ContentStub({ note }: { note: string }) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Prototype content stub
        </p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight">Works</h1>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">{note}</p>
      </div>
      <div className="flex flex-col gap-8">
        {["Northline Dashboard", "Atelier Storefront", "Studio CMS"].map(
          (title) => (
            <div key={title} className="flex gap-4">
              <div className="aspect-4/3 w-36 shrink-0 rounded-md bg-muted" />
              <div className="min-w-0 pt-1">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-medium">{title}</h2>
                  <span className="text-xs text-muted-foreground">2025</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Placeholder summary for shell density checks.
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
