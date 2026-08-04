# Portfolio

Personal hire/collaborate portfolio: Works as the entry surface, About for who and fit, shared sidebar chrome with social links. V1 ships with inlined content for speed; Supabase + admin come later for Works, About, and Socials.

## Language

**Work**:
A published portfolio piece - list shows cover, title, summary, and date; detail adds description, gallery, and meta (role, year, links, stack).
_Avoid_: Project, case study, post (unless a Work is explicitly framed as one)

**Works**:
The primary surface that lists Works. It is the site entry at `/` (no separate home, no `/works` index). Detail lives at `/works/[slug]`.
_Avoid_: Home, landing, gallery (as page names)

**About**:
The page that presents who you are and why a visitor should hire or collaborate - intro, structured experience, grouped skills, and contact. Not a second works gallery.
_Avoid_: Bio page, profile, resume (as the page name)

**Experience**:
A structured About entry: organization, role, dates, and blurb.
_Avoid_: Job, position, timeline item (as the domain name)

**Skill group**:
A named cluster of skills on About (e.g. Design, Eng, Tools) - not a flat tag cloud.
_Avoid_: Tags, tech stack (as the About section name)

**Social**:
A public contact or profile link shown in the sidebar footer. V1 set: email, GitHub, LinkedIn, Instagram.
_Avoid_: External link, nav item (Socials are footer chrome, not primary nav)

**Sidebar**:
The persistent chrome for logo wordmark, primary navigation (Works, About), and Socials. Simple inset shell - not dashboard chrome.
_Avoid_: Nav bar, menu, drawer (unless referring to the mobile sheet behavior of the sidebar primitive)
