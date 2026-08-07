import Image from "next/image"

export type Experience = {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string | null
  blurb: string
}

export type SkillGroup = {
  id: string
  name: string
  skills: string[]
}

const ABOUT_INTRO =
  "Developer since 2020, with the strongest focus on UI/UX and frontend. Since 2023 I have worked as a full-stack product engineer, shipping interfaces end to end and shaping the product around them. I also design APIs and database structure when the work calls for it."

const PORTRAIT = {
  src: "/profile/portrait.webp",
  alt: "Portrait of Yosua Yuwono",
  width: 320,
  height: 427,
} as const

const EXPERIENCE: Experience[] = [
  {
    id: "e1",
    organization: "Freelance",
    role: "Product / frontend engineer",
    startDate: "2026-05-01",
    endDate: null,
    blurb: "Working on freelance product and frontend projects.",
  },
  {
    id: "e2",
    organization: "Morfolabs",
    role: "UI & Frontend Engineer → Product Engineer",
    startDate: "2023-08-01",
    endDate: "2026-05-01",
    blurb:
      "Full-time; started on UI/frontend, moved into product engineering.",
  },
  {
    id: "e3",
    organization: "Centrum Ivan Merz",
    role: "Frontend Developer (freelance)",
    startDate: "2022-04-01",
    endDate: "2022-10-01",
    blurb: "Built an LMS from scratch.",
  },
  {
    id: "e4",
    organization: "Kantin Sehat (outclass.id)",
    role: "Frontend Developer (internship)",
    startDate: "2021-06-01",
    endDate: "2021-10-01",
    blurb: "Frontend internship.",
  },
  {
    id: "e5",
    organization: "Widya Mandala Accounting Games",
    role: "Game Designer & Frontend Developer",
    startDate: "2020-02-01",
    endDate: "2020-05-01",
    blurb:
      "Design + frontend for the accounting games project (event ran in 2021).",
  },
]

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "s1",
    name: "Programming",
    skills: [
      "HTML & CSS",
      "TypeScript",
      "JavaScript",
      "PHP",
      "jQuery",
      "Java",
      "C / C++ / C#",
      "SQL",
      "Dart",
    ],
  },
  {
    id: "s2",
    name: "Framework",
    skills: [
      "React / Next.js",
      "Vue / Nuxt",
      "Express",
      "Laravel",
      "Flutter",
      "Astro",
    ],
  },
  {
    id: "s3",
    name: "UI",
    skills: [
      "Tailwind",
      "CSS Modules",
      "Vanilla CSS",
      "GSAP",
      "Motion (formerly Framer Motion)",
    ],
  },
  {
    id: "s4",
    name: "Data & CMS",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Oracle",
      "Firebase",
      "Supabase",
      "Sanity",
      "Payload",
    ],
  },
  {
    id: "s5",
    name: "Design",
    skills: ["Figma", "UI Design", "Wireframing", "Prototyping"],
  },
  {
    id: "s6",
    name: "Tools",
    skills: ["Cursor", "Claude (Code, Cowork, Design)"],
  },
]

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number)
  if (!y || !m) return iso
  return `${MONTHS[m - 1]} ${y}`
}

function formatRange(startDate: string, endDate: string | null): string {
  const start = formatMonthYear(startDate)
  if (!endDate) return `${start} – Present`
  return `${start} – ${formatMonthYear(endDate)}`
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-full shrink-0 flex-col gap-10 border-t bg-background p-6 md:flex-row md:items-start md:gap-12 md:p-8"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">About</h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {ABOUT_INTRO}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Experience
          </h2>
          <ul className="flex flex-col gap-5">
            {EXPERIENCE.map((row) => (
              <li key={row.id} className="max-w-prose">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-medium">{row.organization}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRange(row.startDate, row.endDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{row.role}</p>
                <p className="mt-1 text-sm">{row.blurb}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Skills
          </h2>
          <dl className="grid gap-5 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id} className="max-w-prose">
                <dt className="text-sm font-medium">{group.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {group.skills.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Image
        src={PORTRAIT.src}
        alt={PORTRAIT.alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
        quality={100}
        className="aspect-3/4 w-full max-w-80 shrink-0 self-center rounded-lg object-cover md:sticky md:top-8 md:self-start"
      />
    </section>
  )
}
