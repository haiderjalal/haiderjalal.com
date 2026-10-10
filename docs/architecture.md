# Architecture

## Rendering

- Next.js 16 App Router with Cache Components enabled. The home page prerenders to static HTML.
- Server Components are the default. Client components are limited to interactive leaves: the 3D hero, motion wrappers, the navbar, and the rotating role.
- Content comes from `src/data/profile.ts`, typed by `src/types/profile.ts`.
- With Cache Components, `new Date()` and `Math.random()` fail prerendering. The footer shows no year and the sitemap has no `lastModified` for this reason.

## 3D hero

- `HeroBackdrop` loads `HeroScene` with `next/dynamic` and `ssr: false`, so WebGL code never runs on the server.
- `WaveField` draws a tilted grid of points with a custom shader: layered sine swells plus a ripple that follows the pointer.
- `SignalShape` is a slowly turning wireframe that adds depth.
- The render loop pauses while the hero is off screen (`useInView`).
- `SceneBoundary` catches WebGL failures, so the hero keeps its gradient backdrop and text.
- Dark and light palettes follow `prefers-color-scheme`. Light mode uses normal blending so the points stay visible on pale backgrounds.

## Motion

- Pointer and scroll effects use motion values (`useMotionValue`, `useSpring`, `useScroll`), so they never re-render React.
- Reveal, tilt, magnetic, and spotlight effects all check `useReducedMotion`.
- The hero name and the marquee are CSS-only, so they show before JavaScript loads.

## Icons

Phosphor icons are re-exported from `src/components/ui/icons.ts`, a client module. Phosphor calls `createContext` when it loads, which the server component graph cannot evaluate. Server components import icons through this module, so they can stay on the server.

## Decisions

- No contact form. Visitors reach out through LinkedIn and Instagram. A form would need an email provider and a server route.
- No CMS. Content is a typed file, which keeps the site fast and reviewable in pull requests.
- Facebook, the agency website, email, and experience stay hidden until they are confirmed.
