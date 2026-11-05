"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number; // 0–100
  max?: number;
  color?: string; // CSS color or leave undefined for primary
  label?: string;
  showPercentage?: boolean;
  height?: number; // px
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color,
  label,
  showPercentage = false,
  height = 10,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-semibold text-text">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full bg-gray-100 rounded-full overflow-hidden"
        style={{ height }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: color ?? "var(--color-primary)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated
              ? { duration: 0.8, ease: "easeOut" }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  );
}
