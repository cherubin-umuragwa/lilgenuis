"use client";

import { useCallback } from "react";
import { useProfile } from "./useProfile";
import { useProgress } from "./useProgress";
import {
  getLevelForXP,
  getLevelProgress,
  getUnlockedAchievements,
  processLessonCompletion,
} from "@/features/gamification";
import { ProgressRepository } from "@/lib/repositories/progress.repository";
import type { StudentLevel, Achievement } from "@/types";
import type { ProcessLessonParams, ProcessLessonResult } from "@/features/gamification/index";

export interface UseGamificationReturn {
  level: StudentLevel;
  levelProgress: number;
  achievements: typeof import("@/features/gamification/achievements")["ACHIEVEMENTS"];
  unlockedAchievements: Achievement[];
  streak: number;
  totalPoints: number;
  processLessonCompletion: (
    params: Omit<ProcessLessonParams, "studentProgress">
  ) => ProcessLessonResult | null;
}

export function useGamification(): UseGamificationReturn {
  const { profile, updateProfile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  const totalPoints = profile?.level.totalXP ?? 0;
  const level = getLevelForXP(totalPoints);
  const levelProgress = getLevelProgress(totalPoints);

  const unlockedIds = progress?.achievements ?? [];
  const unlockedAchievements = getUnlockedAchievements(unlockedIds);

  const streak = progress?.currentStreak ?? 0;

  // Lazy import of ACHIEVEMENTS to avoid circular deps at module level
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { ACHIEVEMENTS } = require("@/features/gamification/achievements") as {
    ACHIEVEMENTS: typeof import("@/features/gamification/achievements")["ACHIEVEMENTS"];
  };

  const handleLessonCompletion = useCallback(
    (
      params: Omit<ProcessLessonParams, "studentProgress">
    ): ProcessLessonResult | null => {
      if (!profile || !progress) return null;

      const result = processLessonCompletion({
        ...params,
        studentProgress: progress,
      });

      // Persist updated progress
      ProgressRepository.saveProgress(result.updatedProgress);

      // Sync level back to profile
      const newLevel = getLevelForXP(result.updatedProgress.totalPoints);
      updateProfile({ level: newLevel });

      return result;
    },
    [profile, progress, updateProfile]
  );

  return {
    level,
    levelProgress,
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    streak,
    totalPoints,
    processLessonCompletion: handleLessonCompletion,
  };
}
