import React from "react";
import { cn } from "@/lib/utils/cn";

interface WaveDividerProps {
  /** CSS color the wave should blend into (the *next* section's background). */
  fill?: string;
  className?: string;
}

/**
 * A full-width SVG wave used as the last block child of a section to create a
 * smooth transition into the next differently-colored section. The `fill` prop
 * must match the next section's background hex so the wave blends seamlessly.
 *
 * Server-safe: no client hooks, so it renders anywhere.
 */
export function WaveDivider({ fill = "#FFFFFF", className }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block w-full h-[60px] sm:h-[100px]", className)}
    >
      <path
        d="M0,64 C240,120 480,8 720,48 C960,88 1200,16 1440,64 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}
