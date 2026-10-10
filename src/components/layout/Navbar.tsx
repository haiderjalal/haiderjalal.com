"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { ReactElement } from "react";

import { Waveform } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { contactCta, navigationLinks } from "@/lib/site";

// Fixed header. The glass backdrop fades in once the hero scrolls away, and a thin line tracks reading progress.
// Both are driven by motion values, so scrolling never re-renders React.
export function Navbar(): ReactElement {
  const { scrollY, scrollYProgress } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 96], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        className="glass absolute inset-0 border-b border-border"
        style={{ opacity: backdropOpacity }}
      />

      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6"
      >
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Waveform aria-hidden="true" size={22} weight="bold" className="text-accent" />
          {profile.name}
        </Link>

        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={contactCta.href}
            className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            {contactCta.label}
          </Link>
        </div>
      </nav>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
