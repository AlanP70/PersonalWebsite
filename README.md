# Alan Pipko — Personal Website

Personal/portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Standout visual components (Aurora Background, Floating Navbar, Timeline, Bento Grid, Marquee) are sourced from Aceternity UI and Magic UI, dark navy-blue theme throughout.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # eslint
```

## Before deploying

- Drop your resume at `public/resume.pdf` (linked from the nav and hero CTAs).
- Content lives in `lib/data/{experience,projects,skills,links}.ts` — review any `[add metric]` / `[add dates]` placeholders and fill them in.
- `.env.local` holds `API_KEY_21ST` (used only at install-time by the shadcn CLI to pull components from 21st.dev's registry — not read at runtime, safe to omit in production).

## Deploying to Vercel

1. Push this repo to GitHub (already wired to `github.com/AlanP70/PersonalWebsite`):
   ```bash
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import the `AlanP70/PersonalWebsite` GitHub repo.
3. Vercel auto-detects Next.js — leave the default build command (`next build`) and output settings as-is.
4. No environment variables are required at runtime (the `.env.local` API key is only used locally when installing new shadcn/21st.dev components).
5. Click **Deploy**. Vercel gives you a `*.vercel.app` URL immediately; add a custom domain under Project → Settings → Domains if you have one.
6. Every push to `main` auto-deploys; pushes to other branches get preview URLs.

## Project structure

```
app/                  Routes, layout, metadata, generated icon/OG image
components/
  ui/                 shadcn primitives + Aceternity/Magic UI components
  sections/           Page sections (Hero, Experience, Projects, Skills, About, Contact)
  nav.tsx, footer.tsx
lib/data/             Content — experience, projects, skills, contact links
_archive/old-site/    Previous static HTML/CSS/JS build, kept for reference
```
