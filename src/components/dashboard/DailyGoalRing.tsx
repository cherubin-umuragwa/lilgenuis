"use client";

import React from "react";
import { motion } from "framer-motion";

interface DailyGoalRingProps {
  completed: number;
  total: number;
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DailyGoalRing({ completed, total }: DailyGoalRingProps) {
  const pct = total > 0 ? Math.min(1, completed / total) : 0;
  const offset = CIRCUMFERENCE * (1 - pct);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-4">
      <h3 className="font-heading font-bold text-text text-base">Daily Goal</h3>

      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
          {/* Background track */}
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          {/* Progress arc */}
          <motion.circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            stroke="#7656E8"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center">
          <span className="font-heading font-bold text-2xl text-text">
            {completed}
          </span>
          <span className="text-text/40 text-xs">of {total}</span>
        </div>
      </div>

      <p className="text-text/50 text-sm text-center">
        {completed >= total
          ? "Goal reached! Great work!"
          : `${total - completed} lesson${total - completed !== 1 ? "s" : ""} to go`}
      </p>
    </div>
  );
}
