# Portfolio

Personal hire/collaborate portfolio: a single scroll surface with Hero, Works, and About, shared sidebar chrome with Socials. V1 ships with inlined content for speed; Supabase + admin come later for Works, About, and Socials.

## Language

**Hero**:
The first band on the site — a compact preamble row (short what-I-do line + support sentence) with a solid black Contact form CTA. Not a tall landing band, separate page, or nav destination.
_Avoid_: Home, landing, splash, intro section (when meaning this band; About still has its own intro); tall hero or multi-CTA marketing block

**Work**:
A published portfolio piece - list always shows cover, title, summary, and date; detail always adds description and gallery (gallery may be empty); role, year, links, and stack are optional meta. Detail opens as a near-fullscreen Dialog on the same route: copy + meta on the left, cover/gallery on the right (single-column scroll on small screens). Not a sheet, in-page expand, or separate URL. Works list is a cover-led grid that switches to two columns via container query at `@2xl`.
_Avoid_: Project, case study, post (unless a Work is explicitly framed as one); sheet or in-page expand for Work detail

**Works**:
The primary list of Works on the single-page site, below the Hero. It is not a separate route.
_Avoid_: Home, landing, gallery (as page names)

**About**:
The scroll section that presents who you are and why a visitor should hire or collaborate - intro, structured experience, grouped skills, with a sticky side portrait on md+. Experience is a stacked list; skill groups are a two-column definition list (comma-separated skills, not pills). Not a second works gallery and not its own route.
_Avoid_: Bio page, profile, resume (as the section name); dense table resume or timeline rail as the About layout

**Experience**:
A structured About entry: organization, role, dates, and blurb.
_Avoid_: Job, position, timeline item (as the domain name)

**Skill group**:
A named cluster of skills on About (e.g. Design, Eng, Tools) - not a flat tag cloud.
_Avoid_: Tags, tech stack (as the About section name)

**Contact form**:
Hire/collaborate inquiry fields (name, email, subject, message) that submit by building a `mailto:` URL and navigating to it. Opened as a bottom Sheet from the Hero CTA and the mobile top-bar CTA, not a Dialog, separate contact page, or inline About block.
_Avoid_: Contact page, lead form, newsletter signup; Dialog or side Sheet for Contact

**Social**:
A public contact or profile link shown in the sidebar footer - href plus an attached icon; not typed by platform kind. V1 ships email, GitHub, LinkedIn, Instagram as ordinary Socials.
_Avoid_: External link, nav item, kind/platform enum (Socials are footer chrome, not primary nav)

**Sidebar**:
The persistent chrome for logo wordmark with name (logo scrolls to Hero), primary navigation (Works, About) as in-page section anchors with icons for icon-collapsed mode, Socials with labels, and a footer with the sidebar collapse control. The WIB clock lives under the inset (end-reveal footer: analog on mobile, digital on desktop), not in the sidebar footer. Simple inset shell - not dashboard chrome. Mobile-only top bar carries SidebarTrigger plus the Contact form CTA.
_Avoid_: Nav bar, menu, drawer (unless referring to the mobile sheet behavior of the sidebar primitive)
