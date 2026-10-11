"use client";

import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { Pause, Play } from "@/components/ui/icons";

interface PausableMarqueeProps {
  children: ReactNode;
}

// A looping ticker needs a visible pause control. Moving content that runs longer than five seconds must be stoppable (WCAG 2.2.2).
export function PausableMarquee({ children }: PausableMarqueeProps): ReactElement {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused} className="flex items-center gap-4 bg-foreground py-6 pr-4 md:pr-6">
      <div className="edge-fade min-w-0 flex-1 overflow-hidden">{children}</div>
      <button
        type="button"
        onClick={() => setPaused((current) => !current)}
        aria-label={paused ? "Play scrolling text" : "Pause scrolling text"}
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-background/30 text-background transition-colors duration-300 hover:border-accent hover:text-accent"
      >
        {paused ? (
          <Play aria-hidden="true" size={16} weight="fill" />
        ) : (
          <Pause aria-hidden="true" size={16} weight="fill" />
        )}
      </button>
    </div>
  );
}
