import React from "react";
import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function Spinner({ size = 32, color, className }: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={cn("animate-spin", className)}
      fill="none"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color ?? "var(--color-primary)"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="80 31"
        opacity="0.9"
      />
    </svg>
  );
}
