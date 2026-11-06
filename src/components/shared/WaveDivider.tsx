import React from "react";
import { cn } from "@/lib/utils/cn";

interface WaveDividerProps {
  /** CSS color the wave shape is filled with. For a bottom wave this should
   *  match the *next* section's background. For a top wave (flip=true) this
   *  should match the *previous* section's background. */
  fill?: string;
  /** When true the wave is flipped vertically so it curves upward — use this
   *  at the TOP of a section to continue the curve from the section above. */
  flip?: boolean;
  className?: string;
}

/**
 * Full-width SVG wave divider.
 *
 * Usage:
 *   Bottom of section A  →  <WaveDivider fill={nextSectionBg} />
 *   Top    of section B  →  <WaveDivider fill={prevSectionBg} flip />
 *
 * Both together produce a seamless S-curve transition.
 */
export function WaveDivider({ fill = "#FFFFFF", flip = false, className }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "block w-full",
        flip ? "h-[50px] sm:h-[80px] scale-y-[-1]" : "h-[50px] sm:h-[80px]",
        className
      )}
    >
      <path
        d="M0,40 C180,90 360,10 540,50 C720,90 900,10 1080,50 C1260,90 1360,30 1440,50 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  );
}
