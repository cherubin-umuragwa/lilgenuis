import type { StudentLevel } from "@/types";
import { LEVEL_THRESHOLDS } from "@/config/constants";

export const LEVELS = LEVEL_THRESHOLDS;

/**
 * Returns the highest level whose xpRequired <= totalXP.
 * Fills in currentXP (XP since the current level threshold)
 * and xpRequired (XP needed to reach the *next* level, or 0 at max).
 */
export function getLevelForXP(totalXP: number): StudentLevel {
  let current: (typeof LEVEL_THRESHOLDS)[number] = LEVEL_THRESHOLDS[0];
  for (const threshold of LEVEL_THRESHOLDS) {
    if (totalXP >= threshold.xpRequired) {
      current = threshold;
    } else {
      break;
    }
  }

  const currentLevelIndex = LEVEL_THRESHOLDS.findIndex(
    (t) => t.level === current.level
  );
  const next = LEVEL_THRESHOLDS[currentLevelIndex + 1];

  const xpRequiredForNext = next ? next.xpRequired - current.xpRequired : 0;
  const currentXP = next
    ? totalXP - current.xpRequired
    : current.xpRequired; // at max level show full bar

  return {
    current: current.level as StudentLevel["current"],
    title: current.title,
    xpRequired: xpRequiredForNext,
    currentXP: Math.max(0, currentXP),
    totalXP,
  };
}

/** Returns XP needed for next level, or Infinity at max level. */
export function getNextLevelXP(currentLevel: number): number {
  const idx = LEVEL_THRESHOLDS.findIndex((t) => t.level === currentLevel);
  const next = LEVEL_THRESHOLDS[idx + 1];
  return next ? next.xpRequired : Infinity;
}

/** Returns 0-100 percentage progress toward next level. */
export function getLevelProgress(totalXP: number): number {
  const level = getLevelForXP(totalXP);
  if (level.xpRequired === 0) return 100;
  return Math.min(100, Math.round((level.currentXP / level.xpRequired) * 100));
}
