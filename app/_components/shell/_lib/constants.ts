import type { SectionId } from "@/app/_types/section-id"

export const SECTIONS = ["works", "about"] as const satisfies readonly SectionId[]
export const END_REVEAL_PX = 112
