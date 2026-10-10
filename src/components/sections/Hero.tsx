import { Fragment } from "react";
import type { ReactElement } from "react";

import { HeroBackdrop } from "@/components/three/HeroBackdrop";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { contactCta, primaryCta } from "@/lib/site";
import type { Profile } from "@/types/profile";

import { RotatingRole } from "./RotatingRole";

// Words rise in one after another. The animation is CSS-only, so the name is visible before JavaScript loads.
const WORD_REVEAL_START_S = 0.15;
const WORD_REVEAL_STEP_S = 0.12;

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps): ReactElement {
  const words = profile.name.split(" ");

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <HeroBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-background to-transparent"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-24 md:pb-28">
        <p className="sr-only">{profile.description}</p>
        <RotatingRole roles={profile.roles} />
        <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground md:text-6xl">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                <span
                  className="word-rise inline-block"
                  style={{
                    animationDelay: `${WORD_REVEAL_START_S + index * WORD_REVEAL_STEP_S}s`,
                  }}
                >
                  {word}
                </span>
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          {profile.intro}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticLink href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </MagneticLink>
          <MagneticLink href={contactCta.href} variant="secondary">
            {contactCta.label}
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
