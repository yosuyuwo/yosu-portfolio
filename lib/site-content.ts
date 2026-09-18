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
  greeting: "I'm Yosua",
  title: "Product Engineer & Frontend Developer",
  bio: "I mold initial ideas into launch-ready products. I work to bridge the gap between what you want and what your users need.",
  ctaLabel: "Let's have a chat",
} as const

export const HERO_PORTRAIT = {
  src: "/profile/portrait.webp",
  alt: "Portrait of Yosua Yuwono",
  width: 960,
  height: 1280,
} as const

export const CONTACT = {
  dialogTitle: "Contact",
  dialogDescription:
    "Tell me about your idea or the role you're looking to fill. Submitting opens a draft in your email client, addressed straight to me.",
  ctaLabel: "Contact",
} as const

export const ABOUT_INTRO =
  "Began as a Frontend and UI/UX developer in 2020. Since 2023, I have been a full-stack product engineer. I'm not only care about your products but also finding the correct tools and processes that make them possible."

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
    blurb: "Full-time; started on UI/frontend, moved into product engineering.",
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
      "HTML",
      "CSS",
      "TypeScript",
      "JavaScript",
      "PHP",
      "jQuery",
      "Java",
      "C",
      "C++",
      "C#",
      "SQL",
      "Dart",
    ],
  },
  {
    id: "s2",
    name: "Framework",
    skills: [
      "React",
      "Next.js",
      "Vue",
      "Nuxt",
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
    "Products I've helped build, solo and in small teams. Each one taught me something about closing the gap between an idea and something people actually use.",
} as const

export const WORKS = [
  {
    id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    slug: "wilmots",
    title: "Wilmot's Warehouse",
    summary:
      "Promotional landing page for the board game Wilmot's Warehouse, built for a landing page design competition.",
    coverPath: "/works/wilmots/cover.png",
    coverVideoPath: "/works/wilmots/cover.webm",
    publishedAt: "2026-08-03",
    sections: [
      {
        heading: "Overview",
        body: "Built a promotional landing page for the co-op board game Wilmot's Warehouse as a competition entry, working in a two-person team split by section. Two weeks start to finish, animated with GSAP.",
        images: [
          { src: "/works/wilmots/cover.png", alt: "Wilmot's Warehouse cover" },
        ],
      },
      {
        heading: "The brief",
        body: "DUMMY — Placeholder for the competition brief writeup. The section split meant each of us owned a full page section end to end, from motion timing to responsive behavior, rather than dividing by layer.",
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse section detail",
          },
          {
            src: "/works/wilmots/cover.png",
            alt: "Wilmot's Warehouse cover repeat",
          },
        ],
      },
      {
        heading: "Layout, mirrored",
        body: 'DUMMY — Same text+image shape as the sections above, but with imageSide set to "left" so the hero image sits before the paragraph on desktop instead of after it.',
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse mirrored layout demo",
          },
        ],
        imageSide: "left",
      },
      {
        heading: "Motion approach",
        body: "DUMMY — Placeholder paragraph, text-only section with no accompanying image, to show how a section renders when there's nothing visual to pair with the writeup.",
      },
      {
        heading: "Final screens",
        images: [
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse final screen",
          },
          {
            src: "/works/wilmots/cover.png",
            alt: "Wilmot's Warehouse cover repeat 2",
          },
          {
            src: "/works/wilmots/1.webp",
            alt: "Wilmot's Warehouse final screen repeat",
          },
        ],
      },
    ],
    role: "Frontend",
    year: 2026,
    liveSite: {
      status: "live",
      href: "https://wilmots-warehouse-landing.vercel.app/",
    },
    github: {
      status: "live",
      href: "https://github.com/WeCipta/Wilmots-warehouse-landing",
    },
    stack: ["Next.js", "GSAP", "Nuqs", "Zod", "Claude"],
  },
  {
    id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    slug: "gaiana",
    title: "Gaiana",
    summary:
      "Dress rental and sale storefront in Surabaya. Full storefront and admin panel, solo freelance build.",
    coverPath: "/works/gaiana/cover.webp",
    publishedAt: "2026-06-30",
    sections: [
      {
        heading: "Overview",
        body: "Built the whole storefront and admin panel for a dress rental and sale platform solo, as a freelance project outside of Morfolabs. New arrivals go up weekly, so the admin panel had to make listing and catalogue management fast for the team running it day to day. Still an ongoing project.",
        images: [{ src: "/works/gaiana/cover.webp", alt: "Gaiana cover" }],
      },
    ],
    role: "Frontend & Backend",
    year: 2026,
    liveSite: {
      status: "in-progress",
      href: "https://gaiana-ecommerce.vercel.app",
    },
    stack: ["Next.js", "shadcn/ui", "Prisma", "tRPC", "Nuqs", "Zod", "Claude"],
  },
  {
    id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    slug: "morfolabs",
    title: "Morfolabs",
    summary:
      "Marketing site for a blockchain consulting and marketing agency in Indonesia.",
    coverPath: "/works/morfolabs/cover.webp",
    coverVideoPath: "/works/morfolabs/cover.webm",
    publishedAt: "2026-01-20",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing site for Morfolabs, a blockchain consulting and marketing agency, at the request of the company's owner. Solo build.",
        images: [
          { src: "/works/morfolabs/cover.webp", alt: "Morfolabs cover" },
        ],
      },
    ],
    role: "Frontend",
    year: 2026,
    liveSite: { status: "live", href: "https://morfolabs.io" },
    stack: ["Next.js", "GSAP", "Sanity CMS", "Nuqs", "Zod"],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    slug: "abi",
    title: "Asosiasi Blockchain Indonesia",
    summary:
      "Landing site and reporting portal for a non-profit blockchain industry association in Indonesia.",
    coverPath: "/works/abi/cover.webp",
    coverVideoPath: "/works/abi/cover.webm",
    publishedAt: "2025-12-01",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing site and reporting portal for Asosiasi Blockchain Indonesia (ABI), a non-profit mobilizing blockchain actors across Indonesia, through Morfolabs. No access to the reporting portal post-handoff. Also reviewed quality on the outsourced admin panel. Team of two, frontend end to end with a tech lead on backend.",
        images: [
          {
            src: "/works/abi/cover.webp",
            alt: "Asosiasi Blockchain Indonesia cover",
          },
        ],
      },
    ],
    role: "Frontend",
    year: 2025,
    liveSite: { status: "live", href: "https://asosiasiblockchain.co.id" },
    stack: [
      "Next.js",
      "Mantine",
      "GSAP",
      "TanStack Query",
      "Payload CMS",
      "Nuqs",
      "Zod",
    ],
  },
  {
    id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    slug: "elevate",
    title: "Elevate Former",
    summary:
      "Booking site for a Slow Resistance Training studio. Full feature ownership, client gave complete trust on scope.",
    coverPath: "/works/elevate/cover.webp",
    coverVideoPath: "/works/elevate/cover.webm",
    publishedAt: "2024-12-24",
    sections: [
      {
        heading: "Overview",
        body: "Built the landing and booking experience for a Slow Resistance Training (SRT) fitness studio. The client gave full trust on feature decisions, not just structure and layout. Used TanStack Query instead of tRPC here since the backend just exposed an external API, so a lighter data-fetching setup made more sense. Also reviewed quality on the outsourced admin panel. Logo design was handled by an external designer.",
        images: [
          { src: "/works/elevate/cover.webp", alt: "Elevate Former cover" },
        ],
      },
    ],
    role: "Frontend",
    year: 2024,
    liveSite: { status: "live", href: "https://elevate-former.vercel.app/" },
    stack: ["Next.js", "Mantine", "TanStack Query", "Nuqs", "Zod"],
  },
] as const

export const RESUME_FILE = {
  href: "/resume/yosua-yuwono-resume.pdf",
  label: "Download CV",
} as const

export const FOOTER_COPYRIGHT_NAME = SITE_NAME
