import type { ReactElement } from "react";

import { Reveal } from "@/components/ui/Reveal";
import type { EducationItem, ExperienceItem } from "@/types/profile";

interface ExperienceProps {
  experience: readonly ExperienceItem[];
  education: readonly EducationItem[];
}

// Rendered only when the profile has career or education entries, so an empty history never shows as a blank section.
export function Experience({ experience, education }: ExperienceProps): ReactElement {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-7xl px-6 py-28 md:py-36"
    >
      <Reveal>
        <h2
          id="experience-heading"
          className="text-4xl font-semibold tracking-[-0.035em] md:text-5xl"
        >
          Experience
        </h2>
      </Reveal>

      {experience.length > 0 ? (
        <ol className="mt-14 space-y-12 md:space-y-16">
          {experience.map((item) => (
            <li
              key={`${item.organization}-${item.role}-${item.period}`}
              className="grid gap-3 md:grid-cols-[14rem_1fr] md:gap-10"
            >
              <p className="font-mono text-sm text-muted">{item.period}</p>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{item.role}</h3>
                <p className="mt-1 text-accent-text">{item.organization}</p>
                {item.summary ? (
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {item.summary}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {education.length > 0 ? (
        <div className="mt-20 md:mt-24">
          <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
          <ol className="mt-8 space-y-10">
            {education.map((item) => (
              <li
                key={`${item.school}-${item.period}`}
                className="grid gap-3 md:grid-cols-[14rem_1fr] md:gap-10"
              >
                <p className="font-mono text-sm text-muted">{item.period}</p>
                <div>
                  <h4 className="text-xl font-semibold tracking-tight">{item.school}</h4>
                  <p className="mt-1 text-muted">{item.degree}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
