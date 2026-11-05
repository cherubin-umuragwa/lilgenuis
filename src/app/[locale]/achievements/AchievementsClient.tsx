"use client";

import React from "react";
import { AchievementBadge } from "@/components/achievements/AchievementBadge";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import type { Locale, Achievement } from "@/types";

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_login",
    title: "First Step",
    titleEn: "First Step",
    titleFr: "Premier Pas",
    description: "Logged in for the first time.",
    descriptionEn: "Logged in for the first time.",
    descriptionFr: "Connecté pour la première fois.",
    iconName: "Star",
    color: "text-primary",
    condition: { type: "first_login", threshold: 1 },
  },
  {
    id: "lessons_5",
    title: "Quick Learner",
    titleEn: "Quick Learner",
    titleFr: "Apprenant Rapide",
    description: "Completed 5 lessons.",
    descriptionEn: "Completed 5 lessons.",
    descriptionFr: "Complété 5 leçons.",
    iconName: "BookOpen",
    color: "text-blue",
    condition: { type: "lessons_completed", threshold: 5 },
  },
  {
    id: "lessons_10",
    title: "Scholar",
    titleEn: "Scholar",
    titleFr: "Érudit",
    description: "Completed 10 lessons.",
    descriptionEn: "Completed 10 lessons.",
    descriptionFr: "Complété 10 leçons.",
    iconName: "GraduationCap",
    color: "text-turquoise",
    condition: { type: "lessons_completed", threshold: 10 },
  },
  {
    id: "streak_3",
    title: "On a Roll",
    titleEn: "On a Roll",
    titleFr: "En Route",
    description: "Studied 3 days in a row.",
    descriptionEn: "Studied 3 days in a row.",
    descriptionFr: "Étudié 3 jours de suite.",
    iconName: "Flame",
    color: "text-coral",
    condition: { type: "streak_days", threshold: 3 },
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    titleEn: "Week Warrior",
    titleFr: "Guerrier de la Semaine",
    description: "Studied 7 days in a row.",
    descriptionEn: "Studied 7 days in a row.",
    descriptionFr: "Étudié 7 jours de suite.",
    iconName: "Flame",
    color: "text-coral",
    condition: { type: "streak_days", threshold: 7 },
  },
  {
    id: "points_100",
    title: "Point Collector",
    titleEn: "Point Collector",
    titleFr: "Collectionneur de Points",
    description: "Earned 100 points.",
    descriptionEn: "Earned 100 points.",
    descriptionFr: "Gagné 100 points.",
    iconName: "Trophy",
    color: "text-yellow",
    condition: { type: "points_earned", threshold: 100 },
  },
];

interface AchievementsClientProps {
  locale: Locale;
}

export function AchievementsClient({ locale }: AchievementsClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  const unlockedIds = new Set(progress?.achievements ?? []);
  const totalXP = profile?.level.totalXP ?? 0;
  const currentXP = profile?.level.currentXP ?? 0;
  const xpRequired = profile?.level.xpRequired ?? 100;
  const levelNum = profile?.level.current ?? 1;
  const xpPct = xpRequired > 0 ? Math.min(100, Math.round((currentXP / xpRequired) * 100)) : 0;
  const unlockedCount = ALL_ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length;

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
            Level {levelNum} — {profile?.level.title ?? "Curious Explorer"}
          </span>
          <span className="text-text/40 text-xs">
            {currentXP}/{xpRequired} XP
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <p className="text-text/40 text-xs mt-2">
          {unlockedCount} of {ALL_ACHIEVEMENTS.length} achievements unlocked · {totalXP} total XP
        </p>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ALL_ACHIEVEMENTS.map((achievement) => (
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
