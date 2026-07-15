# Dashboard + Backend — Setup Guide

This adds a Dashboard (`/dashboard`) to the existing portfolio for managing
**Skills, Projects, Education, and Training**, backed by a separate Express
API (`/backend`, deploy separately). No existing design/UI/animation was
changed — only data went from static files to API-driven.

## ⚠️ Rotate your credentials first

The MongoDB password, Google Client Secret, and Better Auth secret were
shared in plain text earlier. Rotate all three before deploying for real
(new Atlas password, new Google Client Secret, new random `BETTER_AUTH_SECRET`).

## What changed in the frontend

- **New**: `src/app/dashboard/*` (login, sidebar layout, Skills/Projects/
  Education/Training managers), `src/components/dashboard/*` (generic
  reusable CRUD form + table), `src/components/lib/getPortfolioData.js`
  (server-side fetchers), `src/components/lib/dashboardApi.js` +
  `authClient.js` (browser-side dashboard calls), `src/components/lib/
  skillIconMap.js` + `colorThemes.js`.
- **Modified**: every page/component that used to `import` the static data
  in `src/components/allAPI/*` and `src/components/skillsClient/Colums.jsx`
  now fetches it instead (Hero, States, Stats&CoreStack, ProjectSection,
  Education, CertificatesSection, TrainingSection, SkillsClient, and the
  Home/About/Projects/Education/Training/Skills pages). The original static
  files are left in place untouched — nothing reads them anymore, but
  deleting them is optional/up to you.
- **`src/middleware.js`**: extended (not replaced) to also redirect
  unauthenticated visitors away from `/dashboard/*`.
- **`next.config.mjs`**: image `remotePatterns` widened to `https://**`,
  since Dashboard images are now pasted URLs from anywhere, not local files.

## Environment variables to add (frontend)

Add to your `.env` (alongside the existing EmailJS/reCAPTCHA vars):

```
NEXT_PUBLIC_API_URL=https://<your-backend-domain>.vercel.app
```

For local development, point it at your local backend instead:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend

See `/backend/README.md` for full backend setup — install, env vars, local
run, and Vercel deployment.

## Two known technical caveats (read before adding lots of custom colors)

1. **Tailwind + database colors don't mix freely.** Tailwind only generates
   CSS for class names it can see as literal text at build time. Education/
   Training color fields (`gradient`, `borderColor`, etc.) are now database
   values — typing a brand-new class combo in the Dashboard that was never
   part of the build won't render any color. Use the **"Quick Theme" preset
   buttons** in those forms (6 curated presets each) — they're safelisted in
   `src/components/lib/colorThemes.js` specifically so they always work. To
   add a genuinely new preset, add it to that file and redeploy.
2. **Skill icons are picked from a fixed set**, for the same reason real
   JSX components can't be stored in MongoDB. The icon picker in the Skill
   form only offers the ~18 icons already used across the site
   (`src/components/lib/skillIconMap.js`). Add more by importing them there.

## Testing locally

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
npm install && npm run dev
```
Visit `http://localhost:3000/dashboard/login`, sign in, and try adding a
Skill — it should appear on `http://localhost:3000/navLinks/skills`
immediately (no caching, per the "instant update" requirement).

## Verified

- `npm run build` on the frontend completes successfully; every route that
  needs live data is correctly marked dynamic (ƒ) rather than statically
  cached, so Dashboard edits show up immediately.
- The backend boots cleanly (`node server.js`), Better Auth mounts at
  `/api/auth/*`, and all CRUD routes are wired — verified with a mocked
  environment (a real MongoDB Atlas connection is needed for actual data
  operations, which I couldn't run in this sandbox).

## Audit pass (bug fixes only, no new features/design changes)

A full review afterward found and fixed these real issues:

1. **Critical — login would appear to work but never actually persist.**
   The frontend and backend are on different domains, so the session
   cookie is inherently cross-site. Fixed in `backend/lib/auth.js`
   (`sameSite: "none"`, `secure: true` in production) — without this, the
   browser silently drops the cookie and every dashboard action looks
   "logged out" right after a successful login.
2. **Critical — the dashboard route gate could never work as originally
   written.** Because the auth cookie is scoped to the *backend's* domain,
   `src/middleware.js` (running on the frontend) can never see it — so a
   cookie check there would always redirect to login, even right after
   signing in, permanently locking you out. Removed that check; the real
   gate is the client-side `useSession()` check in
   `src/app/dashboard/layout.jsx` (which talks to the backend directly and
   does see the cookie) plus the backend's `requireAuth` middleware on
   every write.
3. **Bug — Google login redirected to a broken URL.** `callbackURL` was a
   relative `/dashboard`, which resolves against the backend's own domain
   (since that's where the final OAuth redirect is issued from), not the
   frontend. Fixed to use an absolute URL in `dashboard/login/page.jsx`.
4. **Security — CORS defaulted open.** If `FRONTEND_URL` was ever left
   unset, the backend used to reflect *any* origin (with credentials
   enabled), letting any website make authenticated requests. Now fails
   closed instead.
5. **Reliability — a database hiccup could hang requests for ~30s**,
   risking Vercel's serverless execution limit before our own error
   handler even ran. Capped Mongo's `serverSelectionTimeoutMS` to 8s and
   fixed a related bug where one failed connection attempt would leave a
   warm serverless instance permanently stuck (never retrying) even after
   the database came back.
6. **Bug — a Training/Course entry saved without an Institution Logo URL
   would crash that item on the live Training page** (`<Image>` has no
   empty-source guard there, unlike the Certificate image). Made
   `institutionLogo` required for Training, matching the guarantee the
   original static data always provided.
7. **Missing `.gitignore` in `/backend`** — a `git init` there would have
   committed your real `.env` (secrets) and `node_modules`. Added one.
8. **Form validation gap** — the Skill icon picker had no required-field
   check, so submitting one empty just surfaced a raw database error with
   no visible message (compounded by bug #9, which hid it entirely). Added
   a proper validation message.
9. **Bug — failed Add/Edit submissions showed no visible error.** The
   error banner rendered on the page *behind* the open modal, so a failed
   save looked like it silently did nothing. Now shown inside the modal.
10. Minor: parallelized a couple of sequential data-fetching calls
    (Projects count + Skills count) that didn't depend on each other.

Verified after these fixes: `npm run build` still completes cleanly with
the same route structure, and the backend still boots and responds
correctly (tested against a mocked environment — a real MongoDB Atlas
connection is needed to exercise actual login/CRUD, which isn't available
in this sandbox).

