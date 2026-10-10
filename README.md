# Haider Jalal | Portfolio

Portfolio site for Haider Jalal, AI generalist and software engineer based in Islamabad, Pakistan.

Built with Next.js 16, React 19, Tailwind CSS v4, and Motion.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

Locally the site runs over plain HTTP. HTTPS comes from the hosting platform once the site is deployed.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run format` | Format the project with Prettier |

## Editing content

All copy, links, projects, and services live in `src/data/profile.ts`. Components read from that file, so most content changes need no component edits.

- Images: the portrait is in `public/images/`, and project screenshots are in `public/projects/`.
- Experience: leave `experience` empty to hide the section. Fill it in to show a timeline.
- Deployment: set `NEXT_PUBLIC_SITE_URL` to the live address before deploying. It feeds canonical links, Open Graph tags, and the sitemap.

## Structure

```
src/
  app/          routes, metadata, OG image, sitemap, robots
  components/
    layout/     navbar, footer, cursor spotlight
    sections/   hero with the project card fan, about, services, work, experience, contact
    ui/         reveal, tilt card, magnetic link, icon re-exports
  data/         portfolio content
  lib/          site-wide constants
  types/        content types
```

Rendering and motion decisions are described in [docs/architecture.md](docs/architecture.md).
