import type { StudentProgress } from "@/types";
import { getTodayKey } from "@/lib/utils/date";

/**
 * Returns streak status for a given lastStudyDate.
 * - isActive: true if the student studied today or yesterday
 * - daysCount: current streak day count (1 if active, 0 if not)
 * - shouldReset: true if more than 1 day has passed since last study
 */
export function getStreakStatus(lastStudyDate: string | null): {
  isActive: boolean;
  daysCount: number;
  shouldReset: boolean;
} {
  if (!lastStudyDate) {
    return { isActive: false, daysCount: 0, shouldReset: false };
  }

  const today = new Date(getTodayKey());
  const last = new Date(lastStudyDate);
  const diffMs = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    isActive: diffDays <= 1,
    daysCount: diffDays === 0 ? 1 : 0,
    shouldReset: diffDays > 1,
  };
}

/**
 * Updates the streak fields in a StudentProgress object based on today's date.
 * - If last study date was yesterday: increment streak
 * - If last study date is today: no change
 * - If more than 1 day ago (or null): reset streak to 1
 * Returns the updated progress object (does not mutate the input).
 */
export function updateStreak(progress: StudentProgress): StudentProgress {
  const today = getTodayKey();
  const lastStudyDate = progress.lastStudyDate;

  if (!lastStudyDate) {
    return {
      ...progress,
      currentStreak: 1,
      longestStreak: Math.max(progress.longestStreak, 1),
      lastStudyDate: today,
    };
  }

  const todayDate = new Date(today);
  const lastDate = new Date(lastStudyDate);
  const diffMs = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already studied today — no change
    return progress;
  }

  if (diffDays === 1) {
    // Yesterday — increment streak
    const newStreak = progress.currentStreak + 1;
    return {
      ...progress,
      currentStreak: newStreak,
      longestStreak: Math.max(progress.longestStreak, newStreak),
      lastStudyDate: today,
    };
  }

  // More than 1 day ago — reset streak to 1
  return {
    ...progress,
    currentStreak: 1,
    longestStreak: Math.max(progress.longestStreak, 1),
    lastStudyDate: today,
  };
}
