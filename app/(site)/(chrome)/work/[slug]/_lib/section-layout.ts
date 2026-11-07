import type { WorkSection } from "@/app/_lib/work-item"

export type SectionLayout = "split" | "statement" | "wide" | "panel" | "gallery"

const ROTATION: readonly SectionLayout[] = ["statement", "wide", "split"]

function isGallery(section: WorkSection): boolean {
  return !section.body && !section.figures?.length
}

function isDecisionLog(section: WorkSection): boolean {
  return section.figures?.some((figure) => figure.kind === "decisions") ?? false
}

export function assignSectionLayouts(
  sections: readonly WorkSection[]
): SectionLayout[] {
  let turn = 0
  return sections.map((section, index) => {
    if (isGallery(section)) return "gallery"
    if (index === 0) return "split"
    if (isDecisionLog(section)) return "panel"
    const layout = ROTATION[turn % ROTATION.length]
    turn += 1
    return layout
  })
}
