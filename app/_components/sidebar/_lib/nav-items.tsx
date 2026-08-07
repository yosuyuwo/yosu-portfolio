import { BriefcaseIcon, UserRoundIcon } from "lucide-react"

import type { SectionId } from "@/app/_types/section-id"

export const NAV_ITEMS: {
  id: SectionId
  label: string
  icon: React.ReactNode
}[] = [
  { id: "works", label: "Works", icon: <BriefcaseIcon /> },
  { id: "about", label: "About", icon: <UserRoundIcon /> },
]
