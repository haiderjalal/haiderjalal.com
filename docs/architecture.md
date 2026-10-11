# Architecture

## Rendering

- Next.js 16 App Router with Cache Components enabled. The home page prerenders to static HTML.
- Server Components are the default. Client components are limited to interactive leaves: the project card fan, the motion wrappers, the navbar, the rotating role, the pausable ticker, and the experience timeline rail.
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
- Reveal, tilt, magnetic, spotlight, fan, and timeline effects all respect `prefers-reduced-motion`.
- The outline cycle on the hero name, the marquee, the hero entrance (`.rise`), and the contact glow (`.aurora`) are CSS-only, so they show before JavaScript loads. Each one is switched off under reduced motion by its own rule. The global `animation-duration: 0.01ms` override is deliberately not used, because it makes some animations more jarring.
- Auto-moving content has a way to stop it. The ticker has a visible pause button, which sets `data-paused` on its wrapper and pauses the marquee track (WCAG 2.2.2).
- The entrance and caption transitions use `transform` and `opacity` only, so they stay on the compositor.

## Navigation

- The navbar underlines the section in the middle band of the viewport. `useActiveSection` runs one `IntersectionObserver` over the nav targets and sets `aria-current="location"`.
- Below `md`, a menu toggle opens the section links. It exposes `aria-expanded` and `aria-controls`, closes on Escape, and closes when a link is chosen.

## Security

- `next.config.ts` sends one set of headers for every route: a Content-Security-Policy, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, a `Referrer-Policy`, and a `Permissions-Policy` that turns off camera, microphone, geolocation, payment, and USB.
- The policy keeps `'unsafe-inline'` for scripts and styles. Next.js hydration and the motion library's inline styles need it, and the site is prerendered, so per-request nonces are not available. The policy still blocks framing, plugins, `base-uri` changes, form posts to other origins, and any foreign script or stylesheet. `'unsafe-eval'` and `ws:` are added only in development, for React and HMR.
- `poweredByHeader` is off, so the framework name is not sent.
- The image optimizer rejects external sources, path traversal, and oversized widths. Re-check this after any change to `next/image` remote patterns.
- `npm audit` reports 5 high-severity advisories through `eslint-config-next`, via `braces` and `fast-glob`. They are dev-only and never run on the deployed site. The only automated fix is a major downgrade of `eslint-config-next`, so it is deferred. Revisit when the Next lint config updates.

## Icons

Phosphor icons are re-exported from `src/components/ui/icons.ts`, a client module. Phosphor calls `createContext` when it loads, which the server component graph cannot evaluate. Server components import icons through this module, so they can stay on the server.

## Decisions

- The hero was a WebGL wave field until the design moved to the card fan. The three.js packages were removed. The earlier version is in git history at commit `cca2862`.
- No contact form. Visitors reach out through LinkedIn, Facebook, Instagram, or the Musme website. A form would need an email provider and a server route.
- No CMS. Content is a typed file, which keeps the site fast and reviewable in pull requests.
- HTTPS is provided by the hosting platform after deployment.
