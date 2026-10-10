# Haider Jalal | Portfolio

Portfolio site for Haider Jalal, AI generalist and software engineer based in Islamabad, Pakistan.

Built with Next.js 16, React 19, Tailwind CSS v4, Motion, and React Three Fiber.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

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

- Images: the portrait is in `public/images/` and project screenshots are in `public/projects/`.
- Experience: leave `experience` empty to hide the section. Fill it in to show a timeline.
- Deployment: set `NEXT_PUBLIC_SITE_URL` to the live domain before deploying. It feeds canonical links, Open Graph tags, and the sitemap.

## Structure

```
src/
  app/          routes, metadata, OG image, sitemap, robots
  components/
    layout/     navbar, footer, cursor spotlight
    sections/   hero, about, services, work, experience, contact
    three/      WebGL hero scene (client only)
    ui/         reveal, tilt card, magnetic link, icon re-exports
  data/         portfolio content
  hooks/        client hooks
  lib/          site-wide constants
  types/        content types
```

Rendering and motion decisions are described in [docs/architecture.md](docs/architecture.md).
