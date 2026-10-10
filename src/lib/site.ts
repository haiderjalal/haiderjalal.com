export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface NavigationLink {
  label: string;
  href: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export const navigationLinks: readonly NavigationLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
];

// One label per intent, reused across nav, hero and footer, so the same action always reads the same.
export const primaryCta: CallToAction = { label: "View work", href: "#work" };
export const contactCta: CallToAction = { label: "Get in touch", href: "#contact" };
