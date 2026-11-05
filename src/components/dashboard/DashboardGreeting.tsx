"use client";

import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { useGamification } from "@/hooks/useGamification";
import { useProfile } from "@/hooks/useProfile";

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardGreeting() {
  const { profile } = useProfile();
  const { level, levelProgress, streak } = useGamification();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    setGreeting(getTimeOfDay());
  }, []);

  const name = profile?.name ?? "Explorer";
  const levelNum = level.current;
  const levelTitle = level.title;
  const currentXP = level.currentXP;
  const xpRequired = level.xpRequired;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text">
            {greeting}, {name}!
          </h1>
          <p className="text-text/50 text-sm mt-1">
            Ready to learn something new today?
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-coral/10 px-3 py-2 rounded-xl">
            <Flame size={18} className="text-coral" />
            <span className="font-bold text-coral text-sm">{streak}</span>
            <span className="text-text/50 text-xs">day streak</span>
          </div>
        </div>
      </div>

      {/* Level + XP bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary">
            Level {levelNum} — {levelTitle}
          </span>
          <span className="text-xs text-text/50">
            {currentXP} / {xpRequired > 0 ? xpRequired : "MAX"} XP
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
