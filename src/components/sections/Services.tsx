import Image from "next/image";
import type { ReactElement } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { Browser, FlowArrow, Lightbulb, PenNib, type Icon } from "@/components/ui/icons";
import type { ServiceIconName, ServiceItem } from "@/types/profile";

const serviceIcons: Record<ServiceIconName, Icon> = {
  consultancy: Lightbulb,
  automation: FlowArrow,
  content: PenNib,
  websites: Browser,
};

// Column span sets the bento shape. It belongs on the grid item (the Reveal wrapper), not the inner card.
const cardSpans: Record<ServiceIconName, string> = {
  consultancy: "md:col-span-2",
  automation: "",
  content: "",
  websites: "md:col-span-2",
};

// Each card gets its own surface so the bento grid reads as deliberate rather than a row of identical tiles.
const cardSurfaces: Record<ServiceIconName, string> = {
  consultancy: "bg-[radial-gradient(90%_120%_at_0%_0%,var(--glow),transparent_70%)]",
  automation: "dot-grid",
  content: "bg-[linear-gradient(160deg,var(--glow),transparent_65%)]",
  websites: "md:grid md:grid-cols-2 md:gap-8",
};

interface ServicesProps {
  items: readonly ServiceItem[];
}

export function Services({ items }: ServicesProps): ReactElement {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-7xl px-6 py-28 md:py-36"
    >
      <Reveal>
        <h2
          id="services-heading"
          className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl"
        >
          What I do
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((service, index) => {
          const ServiceIcon = serviceIcons[service.icon];

          return (
            <Reveal
              key={service.title}
              delay={index * 0.06}
              className={`h-full ${cardSpans[service.icon]}`}
            >
              <article
                className={`flex h-full flex-col justify-between gap-10 rounded-[20px] border border-border bg-surface p-7 md:min-h-72 md:p-8 ${cardSurfaces[service.icon]}`}
              >
                <div>
                  <ServiceIcon
                    aria-hidden="true"
                    size={32}
                    weight="duotone"
                    className="text-accent-text"
                  />
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>

                {service.image ? (
                  <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[16px] border border-border md:mt-0 md:aspect-auto md:min-h-64">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
