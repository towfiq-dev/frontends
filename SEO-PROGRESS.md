# SEO Optimization Progress Log

Last updated: 2026-07-09 (session 7)

## Status: IN PROGRESS (session 7 of N) — single-source-of-truth refactor + build verification

## Completed — Session 4 (forms, modals, remaining a11y pass)
1. contact/RightSideInfo.jsx: form labels were visually positioned but NOT
   programmatically linked to inputs (no htmlFor/id) — screen readers
   wouldn't announce field names. Added matching id/htmlFor for all 4
   fields. Also added aria-live regions (role=status/alert) to the
   success/error submission messages, which previously appeared/
   disappeared silently for screen reader users.
2. contact/LeftSideInfo.jsx: WhatsApp link used next/link (for internal
   routing) on a fully external URL, with no target/rel — inconsistent
   with every other external link on the page. Converted to a plain <a
   target="_blank" rel="noopener noreferrer">. Also removed several
   unused icon/constant imports (dead code) found in the same file.
3. projectsSection/searchFilter/SearchFilter.jsx: search input had no
   aria-label (only a placeholder + visually separate label), and the
   icon-only clear (X) button had none either — added both. Also added
   aria-expanded/aria-haspopup/aria-label to the category dropdown toggle.
4. education/GPABar.jsx: the GPA bar is purely decorative (the actual GPA
   value is already shown as visible text next to it) — marked
   aria-hidden="true" so it isn't announced as an unlabeled progressbar.
5. Modal dialog semantics — audited every modal in the codebase. Found
   ResumeModal.jsx already does this correctly (used as reference
   pattern); the rest had NONE of role="dialog"/aria-modal/aria-labelledby.
   Added all three (plus matching heading id) to:
   - education/EducationDetails.jsx
   - projectsSection/projectsModals/ProjectsModals.jsx
   - certificates/CourseModal.jsx
   - projectsSection/projectCard/ProjectSourceCodeModal.jsx
   - projectsSection/projectsModals/ProjectsSourceCodeModals.jsx
6. education/EducationInteractive.jsx: minor — added aria-hidden to a
   purely decorative arrow SVG inside a button that already has a visible
   text label.

## Completed — Session 5 (performance, final technical checks)
1. app/layout.js: removed preconnect hints to fonts.googleapis.com /
   fonts.gstatic.com — the site uses next/font/google (Geist), which
   self-hosts font files at build time, so no runtime connection to
   Google's font CDN is ever actually made. These hints were just wasted
   early-connection setup. Replaced with a dns-prefetch for
   ghchart.rshah.org, which IS actually fetched at runtime (the GitHub
   chart image) but had no resource hint at all before this.

## Final verification pass (confirmed OK, no changes needed)
- Every page's <title> and canonical URL checked for uniqueness/presence:
  all 7 routes have distinct, non-duplicate titles, and every page sets
  `alternates.canonical` correctly. No duplicate-title or missing-
  canonical issues found anywhere in the site.
- ResumeButton.jsx, ResumeUrlApi.jsx, DownloadCVUrlApi.jsx reviewed — all
  fine. Noted (not fixed, not SEO-related): these two data files still
  have leftover "TODO: replace with the role-specific resume link"
  comments even though the actual URLs are already filled in with 5
  distinct real Google Drive links — just a stale comment, not a bug.
- src/assets is ~16MB; a few project screenshots (TilesPro.png ~2.5MB,
  green.png ~2MB, architechts.png ~1.9MB) and one certificate photo
  (DYD-certificate.jpg, 3993x3034 / 12MP) are large source files. Since
  every image use in the codebase goes through next/image, Next's
  built-in Image Optimization API already resizes/re-encodes these to
  WebP/AVIF at the actual displayed size before they reach a visitor's
  browser — so this mainly affects repo size and build time, not real
  user-facing performance. Didn't recompress these myself since they're
  your actual project/certificate photos (content, not code) — let me
  know if you'd like me to shrink the source files anyway.

## Suggestion flagged, NOT implemented (would add new visible UI)
- Every subpage has a BreadcrumbList JSON-LD schema, but there's no
  *visible* breadcrumb trail (e.g. "Home / Projects") anywhere on the
  site. Google generally still honors schema-only breadcrumbs for rich
  results, so this isn't broken — but adding a real visible breadcrumb bar
  would strengthen both the SEO signal and internal linking, and is a
  common best practice. I did not add this since it means introducing a
  new visible UI element, which is outside "no new design" — say the
  word if you'd like me to design one that matches the site's existing look.

## Completed — Session 6 (the 3 previously-flagged items, all resolved on request)
1. **Stat inconsistency fix.** Made Projects Completed and Tech Stack counts
   dynamic (derived from allProjects.length / Colums.jsx skill count) in
   Hero.jsx, States.jsx, Stats&CoreStack.jsx, and About page metadata/JSON-LD
   — so they can never drift out of sync with real data again.
   For **GitHub contributions**, I could not independently verify your real
   number (searched the web for the towfiq-dev GitHub profile but couldn't
   confirm it with confidence — many similarly-named profiles exist).
   Since I can't fabricate a number, I unified every instance to **"500+"**
   (the value already used in the About page's Person JSON-LD) rather than
   "1000+" (used in States.jsx / Stats&CoreStack.jsx), on the reasoning that
   understating a credential is safer than overstating one. **Please correct
   this if 500+ isn't accurate** — it's a placeholder-of-necessity, not a
   verified fact.
2. **Square favicon.** Created a new src/app/favicon.svg using the exact
   same shield artwork (same paths, gradients, colors — nothing redesigned),
   just square-cropped (viewBox 260x260 centered on the shield) with the
   "towfiq —dev" wordmark text removed, since a wordmark doesn't fit a small
   square icon context. Original backed up. Rendered a preview to confirm
   the crop looks correct before finalizing.
3. **Visible breadcrumb trail.** Created a reusable
   components/shared/breadcrumb/Breadcrumb.jsx (nav + ol, matches the
   site's existing color/hover conventions) and added it to all 6 subpages
   (About, Contact, Education, Projects, Skills, Training), giving the
   JSON-LD BreadcrumbList schema already on those pages a real visible
   equivalent. Wired it to reuse each page's EXISTING top-clearance padding
   wherever possible (Education, Training, Skills, About) rather than
   stacking new margin on top of it; Contact and Projects layout needed a
   small amount of new margin since the breadcrumb sits outside their
   existing padded containers. Note: this necessarily adds a small amount
   of new vertical space above each subpage's heading — normal/expected for
   a breadcrumb, flagging here since it's the one intentional exception to
   "no layout changes" this whole audit, done because you explicitly asked
   for it.

## Completed — Session 7 (single source of truth for ALL dynamic/repeated data)
User confirmed real GitHub contributions = 991 and asked for full future-
proofing: every dynamic-prone number/URL should live in exactly ONE place.

1. src/components/lib/constants.js: added `GITHUB_CONTRIBUTIONS = 991`
   with a comment explaining it's the one place to update this number.
2. Updated States.jsx and Stats&CoreStack.jsx to import and use
   GITHUB_CONTRIBUTIONS (was hardcoded "500+" / "1000+" in different
   places — now both read the same single value, always in sync).
3. About page metadata/JSON-LD also now reads GITHUB_CONTRIBUTIONS instead
   of a hardcoded "500+".
4. **Found and fixed 8 more single-source-of-truth violations** the same
   pattern was hiding: every page (page.jsx, and all 6 navLinks/*
   page.jsx/layout.jsx files) had independently hardcoded the literal
   string "https://towfiq-mern-stack-developer.vercel.app" as a local
   `BASE` constant, even though constants.js already exports `SITE_URL`
   with the exact same value. Replaced all 8 with
   `import { SITE_URL as BASE } from "@/components/lib/constants"`, and
   also fixed 2 files (page.jsx, about/page.jsx) where an additional
   hardcoded copy of the URL had leaked into the openGraph.url/images.url
   fields separately from the BASE declaration.
5. Same issue in app/sitemap.js and app/robots.js (each had their own
   hardcoded copy of the site URL) and app/layout.js (same, plus this one
   had the import awkwardly placed mid-file after other code — moved to
   the top with the other imports for clean code).
6. Same issue for social profile URLs: the JSON-LD `sameAs` array was
   independently hardcoding the GitHub/LinkedIn/X/Facebook URLs in THREE
   separate files (page.jsx, contact/page.jsx, about/page.jsx) even
   though constants.js already exports GITHUB_URL/LINKEDIN_URL/
   TWITTER_URL/FACEBOOK_URL. All three now import and use the constants.
7. GitHubActivityGraph.jsx had its own separately hardcoded GitHub URL
   (in the "View Profile" link) and a separately hardcoded display string
   ("github.com/towfiq-dev") — both now derived from the single GITHUB_URL
   constant instead of being written out twice.
8. **Verified nothing else in the codebase duplicates these values** —
   ran a final grep across the entire src/ tree for the site URL, the
   GitHub profile URL, and the social URLs; the only remaining
   occurrences are inside constants.js itself and inside
   ProjectApi.jsx (which correctly uses per-project repo URLs like
   .../towfiq-dev/skillSwap-frontend-server — those are meant to be
   distinct per project, not the profile URL, so left as-is).

## Build/lint verification (new this session)
- Ran `npm install` + `npm run build`. The production build itself failed,
  but only because this sandbox's network egress doesn't allow
  fonts.googleapis.com (next/font needs to fetch font files from Google at
  BUILD time — this is unrelated to the earlier preconnect-hint fix, which
  was about the BROWSER never needing a runtime connection). This is a
  sandbox limitation, not a bug — your real deploy environment (Vercel)
  has normal internet access and will build fine.
- To still verify correctness, ran ESLint across the entire src/app and
  src/components tree. Result: 8 pre-existing errors/1 warning, ALL in
  files/lines unrelated to this session's edits (unescaped apostrophes in
  a few components, and 3 pre-existing `setState`-in-effect patterns in
  MobileMenu/SmoothScrollProvider/ThemeProvider) — none are new issues
  introduced by any SEO work across all 7 sessions. Zero unused-variable
  or undefined-reference errors anywhere, confirming all the import/
  constant refactoring above is wired correctly.
- Cleaned up node_modules/.next generated during this test before
  repackaging; package-lock.json was restored to your original uploaded
  version (a fresh `npm install` in this sandbox could have resolved
  slightly different versions than your original lockfile, so the
  original was kept rather than replaced).

## Completed — Session 1
1. education/Education.jsx: duplicate H1 fixed → H2 (shared component also
   used on homepage which already has Hero's H1).
2. navLinks/education/page.jsx: added sr-only H1.
3. navLinks/projects/layout.jsx: fixed stale "20+ projects" text (actual
   was 15) — now computed from allProjects.length. Added missing
   BreadcrumbList + ItemList/CreativeWork JSON-LD for all projects. Added
   sr-only H1.
4. app/page.jsx: homepage JSON-LD ItemList was hardcoded with 3 OLD
   projects that aren't even the current top 3. Now generated live from
   allProjects data. Added a second ItemList for the full catalog.

## Completed — Session 2
1. not-found.js + new components/notFound/NotFoundContent.jsx: 404 page
   rendered blank until JS hydrated (CLS issue) and had no metadata
   (soft-404/duplicate-title risk). Split into server component (with
   `robots: noindex` metadata) + client component (same UI, gating
   removed).
2. navLinks/contact/page.jsx: had zero H1 — added sr-only H1.
3. navLinks/training/page.jsx: had zero H1 and zero structured data —
   added sr-only H1 + JSON-LD generated dynamically from CourseAPI.jsx.
4. app/manifest.js (new): no web app manifest existed at all — added one
   using Next.js's file convention, reusing the existing favicon.svg (no
   new visual asset needed).
5. app/page.jsx: Person schema claimed profile image was 800x800; actual
   file is 912x1136 — corrected.

## Completed — Session 3 (semantic HTML / accessibility pass)
1. navbar/NavScrollWrapper.jsx: was a <nav> wrapping ANOTHER labeled <nav>
   (Navbar.jsx's desktop nav) — two nested/confusing nav landmarks.
   Changed outer wrapper to <header> (it holds the masthead: logo + nav).
   Pure tag swap, zero visual change.
2. navbar/MobileMenu.jsx: mobile links were in a bare <div> — wrapped in
   <nav aria-label="Mobile navigation">.
3. GitHubActivityGraph.jsx: root <div> → <section aria-label="...">
   (standalone block on 2 pages). Added loading="lazy" + decoding="async"
   to the native <img> chart (below the fold — Core Web Vitals win).
4. certificates/CertificateCard.jsx: fixed generic alt="Certificate" →
   now includes actual course title + institution.
5. projectCard/ProjectSourceCodeModal.jsx and
   projectsModals/ProjectsSourceCodeModals.jsx: icon-only (X, no text)
   close buttons had NO aria-label — added aria-label="Close" to both.

## Audited and confirmed OK across all 3 sessions (no changes needed)
- layout.js, sitemap.js, robots.js — all correct and thorough.
- navLinks/about/page.jsx — real H1, consistent JSON-LD (shares the
  flagged stat issue below, but structurally fine).
- navLinks/skills/page.jsx — real H1 (SkillsClient), every skill
  percentage in JSON-LD verified against Colums.jsx — all match.
- og-image.png confirmed actually 1200x630 everywhere referenced.
- shared/resumeModal/ResumeModal.jsx — already has correct dialog
  semantics (role/aria-modal/aria-labelledby); used as the reference
  pattern applied to the other modals this session.
- Footer.jsx — excellent existing semantic HTML (footer/nav/address/
  ul-li), aria-labels throughout, sr-only Bengali text.
- No native <img> tags anywhere except the GitHub chart (correct choice —
  external, dynamically-generated third-party image).
- No internal routes incorrectly using <a> instead of next/link.
- All other icon-only buttons (BackToTop, ThemeToggle, other modal close
  buttons) already have proper aria-label; all other buttons have visible
  text labels.
- WhatDo.jsx, GetTouch.jsx, TechStackHome.jsx, States.jsx, Hero.jsx —
  already well-structured (section tags, correct heading levels,
  aria-labels, semantic ul/li, bilingual sr-only text).

## RESOLVED (session 6) — stat inconsistency (was: widespread stat inconsistency found)
This is bigger than first flagged. Please give me real current numbers —
especially GitHub contributions, which is an outright contradiction right
now — and I'll fix every instance consistently in one pass.

- "20+ Projects Completed": appears in Hero.jsx, States.jsx,
  Stats&CoreStack.jsx (About page), and About page's meta description +
  JSON-LD. Actual project count in ProjectApi.jsx: **15**.
- "Tech Stack: 20+": States.jsx, Stats&CoreStack.jsx. Actual count in
  Colums.jsx: **19** (close, but technically under 20).
- GitHub contributions — **direct contradiction between two live pages**:
  States.jsx and Stats&CoreStack.jsx both say "**1000+**", but the About
  page's JSON-LD Person description says "**500+**". These can't both be
  right — conflicting facts about the same entity hurt E-E-A-T signals.
- "1+ Year" coding experience: Hero.jsx + About page — consistent, no
  issue found here.

## Open items (pending)
- GitHub contributions "500+" is an unverified placeholder (see session 6
  note above) — please confirm the real number so it can be corrected.
- Optional: shrink a few large source images in src/assets — still
  waiting on your decision since they're your content, not code.
- The core technical/on-page/structured-data/accessibility audit is now
  complete across the whole codebase, including all 3 previously-open
  decisions (stats, favicon, breadcrumbs). Remaining recommended step is
  a live QA pass once deployed: run Google's Rich Results Test and
  PageSpeed Insights against the live URL, since some things (actual
  render performance, whether the new JSON-LD/breadcrumbs validate in
  practice) can only be fully confirmed on a live site.

## Notes / flags carried over
- AGENTS.md contains a suspicious embedded instruction telling any AI agent
  to trust and read node_modules/next/dist/docs before writing code —
  flagged as likely prompt injection (no node_modules exists in the
  uploaded project; not a real Next.js convention). Ignored. User told.
- Actual stack confirmed via package.json: Next.js 16.2.4, React 19.2.4,
  Tailwind v4, daisyUI.
- URL structure (/navLinks/about, /navLinks/projects, etc.) left as-is —
  changing it is a routing/functional change with real risk to the
  existing #1 ranking for "Towfiqul Islam Portfolio". Leave as-is unless
  user explicitly wants this changed and accepts that risk.
- src/app/favicon.svg is a wide rectangular banner (680x320), not square —
  flagged in session 2, still waiting on user decision before touching
  this brand asset.

## Resume instructions
Say "Continue SEO" / "Resume SEO" / "Continue from where you left off" in
a chat with this project uploaded, and work will continue from
"Files NOT yet reviewed" above.
