"use client";

import React from "react";
import { Trophy, Lock } from "lucide-react";
import type { Achievement } from "@/types";

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
  locale: "en" | "fr";
}

export function AchievementBadge({
  achievement,
  isUnlocked,
  locale,
}: AchievementBadgeProps) {
  const title =
    locale === "fr" ? (achievement.titleFr ?? achievement.title) : (achievement.titleEn ?? achievement.title);
  const description =
    locale === "fr"
      ? (achievement.descriptionFr ?? achievement.description)
      : (achievement.descriptionEn ?? achievement.description);

  const unlockDate = achievement.unlockedAt
    ? new Date(achievement.unlockedAt).toLocaleDateString()
    : null;

  return (
    <div
      className={`rounded-2xl border p-5 flex flex-col items-center text-center gap-3 transition-all ${
        isUnlocked
          ? "bg-white border-primary/20 shadow-sm"
          : "bg-gray-50 border-gray-100 opacity-60"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isUnlocked ? "bg-primary/10" : "bg-gray-100"
        }`}
      >
        {isUnlocked ? (
          <Trophy size={26} className="text-primary" />
        ) : (
          <Lock size={22} className="text-gray-300" />
        )}
      </div>

      <div>
        <h3
          className={`font-heading font-bold text-sm mb-1 ${
            isUnlocked ? "text-text" : "text-text/40"
          }`}
        >
          {title}
        </h3>
        <p className="text-text/50 text-xs leading-relaxed">{description}</p>
      </div>

      {isUnlocked && unlockDate && (
        <span className="text-xs text-primary font-semibold">
          Earned {unlockDate}
        </span>
      )}
      {!isUnlocked && (
        <span className="text-xs text-text/30">Locked</span>
      )}
    </div>
  );
}
