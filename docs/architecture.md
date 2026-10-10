# Architecture

## Rendering

- Next.js 16 App Router with Cache Components enabled. The home page prerenders to static HTML.
- Server Components are the default. Client components are limited to interactive leaves: the project card fan, the motion wrappers, the navbar, and the rotating role.
- Content comes from `src/data/profile.ts`, typed by `src/types/profile.ts`.
- With Cache Components, `new Date()` and `Math.random()` fail prerendering. The footer shows no year and the sitemap has no `lastModified` for this reason.

## Hero card fan

- `ProjectFan` is a client component. Each project is a card on an arc that pivots below the viewport. The agency card sits in the centre, and the projects split evenly on either side.
- Each card's pose is a motion value. Idle sway, drag, arrow keys, and the entrance animation update those values directly, so the fan does not re-render React while it moves.
- React state holds only the active card index, which changes once per card.
- The `.fan-stage` CSS variables size the cards and the arc from the viewport, so the arc stays on screen on phones and laptops.
- Reduced motion stops the sway and the entrance animation, and the fan jumps straight to its final pose.

## Motion

- Pointer and scroll effects use motion values (`useMotionValue`, `useSpring`, `useScroll`), so they never re-render React.
- Reveal, tilt, magnetic, spotlight, and fan effects all respect `prefers-reduced-motion`.
- The outline cycle on the hero name and the marquee are CSS-only, so they show before JavaScript loads.

## Icons

Phosphor icons are re-exported from `src/components/ui/icons.ts`, a client module. Phosphor calls `createContext` when it loads, which the server component graph cannot evaluate. Server components import icons through this module, so they can stay on the server.

## Decisions

- The hero was a WebGL wave field until the design moved to the card fan. The three.js packages were removed. The earlier version is in git history at commit `cca2862`.
- No contact form. Visitors reach out through LinkedIn, Facebook, Instagram, or the Musme website. A form would need an email provider and a server route.
- No CMS. Content is a typed file, which keeps the site fast and reviewable in pull requests.
- HTTPS is provided by the hosting platform after deployment.
