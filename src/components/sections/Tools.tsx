import Image from "next/image";
import type { ReactElement } from "react";

import { CheckCircle } from "@/components/ui/icons";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import type { ToolItem } from "@/types/profile";

interface ToolsProps {
  tools: readonly ToolItem[];
}

// The owner's own tools get a dark spotlight band, so they stand apart from client work.
// Each card's image and text sit at different depths, so tilting the card shows real depth.
// With an odd count, the last card spans both columns, so the grid never leaves an empty cell.
export function Tools({ tools }: ToolsProps): ReactElement {
  const lastSpansRow = tools.length % 2 === 1;

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -left-40 top-16 size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent)] opacity-30"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
        <Reveal>
          <h2
            id="tools-heading"
            className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl"
          >
            Tools I built
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-background/75">
            Tools I designed and built myself.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {tools.map((tool, index) => {
            const fullRow = lastSpansRow && index === tools.length - 1;

            return (
              <Reveal
                key={tool.name}
                delay={index * 0.12}
                className={fullRow ? "md:col-span-2" : "h-full"}
              >
                <TiltCard preserveDepth className="h-full rounded-[20px]">
                  <article
                    className="flex h-full flex-col gap-6 rounded-[20px] border border-background/20 bg-background/5 p-5 transition-colors duration-500 hover:border-accent md:p-7"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[16px] border border-background/15 ${
                        fullRow ? "aspect-[21/9]" : "aspect-[16/10]"
                      }`}
                      style={{ transform: "translateZ(36px)" }}
                    >
                      <Image
                        src={tool.image.src}
                        alt={tool.image.alt}
                        fill
                        sizes={
                          fullRow ? "100vw" : "(min-width: 768px) 50vw, 100vw"
                        }
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div
                      className="flex flex-1 flex-col gap-5"
                      style={{ transform: "translateZ(56px)" }}
                    >
                      <div>
                        <span className="inline-flex rounded-full border border-background/30 px-3 py-1 font-mono text-xs text-background/85">
                          {tool.badge}
                        </span>
                        <h3 className="mt-4 font-display text-3xl font-bold uppercase leading-none tracking-tight md:text-4xl">
                          {tool.name}
                        </h3>
                        <p className="mt-3 text-xl leading-snug text-background/90">
                          {tool.tagline}
                        </p>
                        <p className="mt-3 leading-relaxed text-background/70">
                          {tool.summary}
                        </p>
                      </div>

                      <ul className="grid gap-3 text-sm text-background/85">
                        {tool.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <CheckCircle
                              aria-hidden="true"
                              size={18}
                              weight="fill"
                              className="mt-0.5 shrink-0 text-accent"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-2">
                        <MagneticLink href={tool.url} variant="primary" external>
                          Visit {tool.name}
                        </MagneticLink>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
