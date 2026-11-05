"use client";

import React from "react";
import { AchievementBadge } from "@/components/achievements/AchievementBadge";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import { ACHIEVEMENTS } from "@/features/gamification/achievements";
import { getLevelForXP } from "@/features/gamification/levels";
import type { Locale } from "@/types";

interface AchievementsClientProps {
  locale: Locale;
}

export function AchievementsClient({ locale }: AchievementsClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  const unlockedIds = new Set(progress?.achievements ?? []);
  const totalXP = profile?.level.totalXP ?? 0;
  const level = getLevelForXP(totalXP);
  const currentXP = level.currentXP;
  const xpRequired = level.xpRequired;
  const levelNum = level.current;
  const xpPct = xpRequired > 0 ? Math.min(100, Math.round((currentXP / xpRequired) * 100)) : 100;
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length;

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-2">
        Achievements
      </h1>
      <p className="text-text/60 mb-8">
        Every milestone you reach earns a badge. Keep going to unlock more!
      </p>

      {/* Level progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-primary text-sm">
            Level {levelNum} — {level.title}
          </span>
          <span className="text-text/40 text-xs">
            {currentXP}/{xpRequired > 0 ? xpRequired : "MAX"} XP
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <p className="text-text/40 text-xs mt-2">
          {unlockedCount} of {ACHIEVEMENTS.length} achievements unlocked ·{" "}
          {totalXP} total XP
        </p>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            isUnlocked={unlockedIds.has(achievement.id)}
            locale={locale}
          />
        ))}
      </div>
    </PageTransition>
  );
}
