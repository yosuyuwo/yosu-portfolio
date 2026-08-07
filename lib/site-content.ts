export const SITE_GIVEN_NAME = "Yosua"
export const SITE_FAMILY_NAME = "Yuwono"
export const SITE_NAME = `${SITE_GIVEN_NAME} ${SITE_FAMILY_NAME}`
export const SITE_SHORT_NAME = SITE_GIVEN_NAME

export const CONTACT_EMAIL = "yosuayuwono@gmail.com"
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

export const SITE_LOGO = {
  src: "/brand/logo.svg",
  alt: SITE_NAME,
  width: 54,
  height: 54,
} as const

export const SITE_METADATA = {
  title: SITE_NAME,
  description:
    "Hi — I'm Yosua. Glad you're here. Have a look at my work, and reach out if you'd like to build something together.",
} as const

export const SITE_SOCIALS = [
  { id: "email", href: CONTACT_MAILTO, label: "Email" },
  { id: "github", href: "https://github.com/yosuyuwo", label: "GitHub" },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/yosuyuwo",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/yosuyuwo/",
    label: "Instagram",
  },
] as const

export const HERO = {
  line: "Product / Frontend Engineer — Converting ideas into interfaces.",
  support: "Open to hire and collaborate. Tell me what you're building.",
  ctaLabel: "Contact",
} as const

export const CONTACT = {
  dialogTitle: "Contact",
  dialogDescription:
    "Fills a mailto draft — your email client opens on submit.",
  ctaLabel: "Contact",
} as const

export const ABOUT_INTRO =
  "Developer since 2020, with the strongest focus on UI/UX and frontend. Since 2023 I have worked as a full-stack product engineer, shipping interfaces end to end and shaping the product around them. I also design APIs and database structure when the work calls for it."

export const ABOUT_PORTRAIT = {
  src: "/profile/portrait.webp",
  alt: "Portrait of Yosua Yuwono",
  width: 320,
  height: 427,
} as const

export const EXPERIENCE = [
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
] as const

export const SKILL_GROUPS = [
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
] as const

export const WORKS_SECTION = {
  title: "Works",
  description:
    "Selected product and frontend work. Placeholder inventory for layout.",
} as const

export const WORKS = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "northline-dashboard",
    title: "Northline Dashboard",
    summary:
      "Ops dashboard for a fictional logistics team - filters, tables, calm density.",
    coverPath: "/works/northline/cover.jpg",
    publishedAt: "2025-11-01",
    description:
      "A calm operations surface for triage and routing. Emphasis on scannable tables, quiet filters, and a density that still feels hire-ready rather than dashboard-noisy.",
    gallery: [
      { src: "/works/northline/g1.jpg", alt: "Filter bar and table" },
      { src: "/works/northline/g2.jpg", alt: "Detail drawer" },
    ],
    role: "Product Engineer",
    year: 2025,
    stack: ["Next.js", "Postgres"],
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "atelier-storefront",
    title: "Atelier Storefront",
    summary:
      "Commerce-adjacent browse/detail flow with a quiet product grid.",
    coverPath: "/works/atelier/cover.jpg",
    publishedAt: "2024-06-15",
    description:
      "Browse and detail for a small catalog. Cover-led grid on the index, restrained product page, no promo chrome competing with the work.",
    gallery: [
      { src: "/works/atelier/g1.jpg", alt: "Product grid" },
      { src: "/works/atelier/g2.jpg", alt: "Product detail" },
    ],
    role: "Frontend",
    year: 2024,
    stack: ["Next.js"],
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    slug: "studio-cms",
    title: "Studio CMS",
    summary:
      "Editorial CMS shell - lists, editors, publish states without the noise.",
    coverPath: "/works/studio/cover.jpg",
    publishedAt: "2023-09-01",
    description:
      "List → editor → publish states for editorial teams. Focused on clear status and a quiet writing surface.",
    gallery: [
      { src: "/works/studio/g1.jpg", alt: "Content list" },
      { src: "/works/studio/g2.jpg", alt: "Editor" },
    ],
    role: "Full-stack",
    year: 2023,
    stack: ["Next.js", "Payload"],
  },
] as const

export const FOOTER_COPYRIGHT_NAME = SITE_NAME
