import React from "react";
import { cn } from "@/lib/utils/cn";

interface WaveDividerProps {
  /** Fill color — must match the NEXT section's background exactly. */
  fill?: string;
  className?: string;
}

/**
 * Full-width SVG wave placed at the BOTTOM of a section.
 * Set `fill` to the background color of the section that follows.
 * One wave per boundary — no top waves needed.
 */
export function WaveDivider({ fill = "#FFFFFF", className }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block w-full h-[60px] sm:h-[90px] -mb-px", className)}
    >
      <path
        d="M0,40 C180,90 360,10 540,50 C720,90 900,10 1080,50 C1260,90 1360,30 1440,50 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  );
}
