import "server-only"

import { INTRO } from "@/app/_lib/copy"
import { formatRange } from "@/app/_lib/format-range"
import type { WorkItem } from "@/app/_lib/work-item"
import { WORK_ITEMS } from "@/app/_lib/works"
import {
  ABOUT_INTRO,
  ABOUT_WORKFLOW,
  CONTACT_EMAIL,
  EDUCATION,
  EXPERIENCE,
  RESUME,
  SITE_LOCATION,
  SITE_NAME,
  SITE_SOCIALS,
  SKILL_GROUPS,
} from "@/lib/site-content"
import { absoluteUrl } from "@/lib/site-url"

import { PERSONAL_FACTS } from "./personal-facts"
import { privateFacts } from "./private-facts"

function experienceFacts(): string {
  return EXPERIENCE.map((job) => {
    const highlights = job.highlights.map((line) => `  - ${line}`).join("\n")
    return `- ${job.role} at ${job.organization} (${formatRange(job.startDate, job.endDate)}): ${job.blurb}\n${highlights}`
  }).join("\n")
}

function educationFacts(): string {
  return EDUCATION.map(
    (entry) =>
      `- ${entry.credential}, ${entry.institution} (${formatRange(entry.startDate, entry.endDate)})`
  ).join("\n")
}

function skillFacts(): string {
  return SKILL_GROUPS.map(
    (group) => `- ${group.name}: ${group.skills.join(", ")}`
  ).join("\n")
}

function workFacts(work: WorkItem): string {
  const details = work.sections
    .filter((section) => section.body)
    .map((section) => `  - ${section.heading}: ${section.body}`)
    .join("\n")
  const links = [work.liveSite, work.github]
    .filter((link) => link?.href)
    .map((link) => link?.href)
    .join(", ")
  const meta = [
    work.role && `Role: ${work.role}`,
    work.year && `Year: ${work.year}`,
    work.stack && `Stack: ${work.stack.join(", ")}`,
    links && `Links: ${links}`,
  ]
    .filter(Boolean)
    .join(" | ")

  return `- ${work.title}: ${work.summary}\n  ${meta}\n${details}`
}

function profileFacts(): string {
  return SITE_SOCIALS.filter((social) => social.id !== "email")
    .map((social) => `- ${social.label}: ${social.href}`)
    .join("\n")
}

function personalSection(now: Date, visitorText: string): string {
  const personal = PERSONAL_FACTS.map((fact) => `- ${fact}`).join("\n")
  const notes = privateFacts(now, visitorText)
  if (!notes) return personal
  return `${personal}\n\n## Private notes (only what this visitor asked about)\n${notes}`
}

function learnedSection(answers: readonly string[]): string {
  if (answers.length === 0) return ""
  const lines = answers.map((answer) => `- ${answer}`).join("\n")
  return `\n\n## Added later by me (as true as everything above; use when relevant)\n${lines}`
}

export function buildKnowledge(
  now: Date,
  visitorText: string,
  learnedAnswers: readonly string[] = []
): string {
  return `## Today
Today's date: ${now.toISOString().slice(0, 10)}

## Summary
${RESUME.summary}

${ABOUT_INTRO}

${ABOUT_WORKFLOW.headline} ${ABOUT_WORKFLOW.process}

## Basics
- Name: ${SITE_NAME}
- Location: ${SITE_LOCATION}
- Availability: ${INTRO.availability}
- Email: ${CONTACT_EMAIL}
- Website: ${absoluteUrl("/")}

## Experience
${experienceFacts()}

## Education
${educationFacts()}

## Skills
${skillFacts()}

## Selected work
${WORK_ITEMS.map(workFacts).join("\n")}

## Profiles
${profileFacts()}

## About me: interests and opinions
${personalSection(now, visitorText)}${learnedSection(learnedAnswers)}`
}
