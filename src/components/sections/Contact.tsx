import type { ReactElement } from "react";

import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowUpRight,
  FacebookLogo,
  Globe,
  InstagramLogo,
  LinkedinLogo,
  type Icon,
} from "@/components/ui/icons";
import type { SocialIconName, SocialLink } from "@/types/profile";

const socialIcons: Record<SocialIconName, Icon> = {
  linkedin: LinkedinLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  website: Globe,
};

interface ContactProps {
  socials: readonly SocialLink[];
}

export function Contact({ socials }: ContactProps): ReactElement {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-7xl px-6 pb-28 md:pb-36"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface p-8 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 size-[28rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
          />

          <h2
            id="contact-heading"
            className="relative max-w-3xl text-4xl font-semibold tracking-[-0.035em] md:text-6xl"
          >
            I take on AI consultancy and remote projects.
          </h2>
          <p className="relative mt-6 max-w-2xl text-lg text-muted">
            Reach out on LinkedIn, Facebook, Instagram, or through the Musme website to start
            a conversation.
          </p>

          <ul className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socials.map((social) => {
              const SocialIcon = socialIcons[social.icon];

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-h-44 flex-col justify-between gap-8 rounded-[20px] border border-border bg-background/60 p-6 transition-colors duration-300 hover:border-accent"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <SocialIcon
                        aria-hidden="true"
                        size={30}
                        weight="duotone"
                        className="text-accent-text"
                      />
                      <ArrowUpRight
                        aria-hidden="true"
                        size={20}
                        className="shrink-0 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{social.label}</span>
                      <span className="break-all text-sm text-muted">{social.handle}</span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
