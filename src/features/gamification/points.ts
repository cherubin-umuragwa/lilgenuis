/** Base: 10 points per correct answer. Optional time bonus added on top. */
export function calculateQuizPoints(
  correctAnswers: number,
  totalQuestions: number,
  timeBonus = 0
): number {
  const base = correctAnswers * 10;
  return base + timeBonus;
}

/** Lesson completion bonus by difficulty. */
export function calculateLessonBonus(
  difficulty: "beginner" | "intermediate" | "advanced"
): number {
  const bonusMap: Record<"beginner" | "intermediate" | "advanced", number> = {
    beginner: 50,
    intermediate: 75,
    advanced: 100,
  };
  return bonusMap[difficulty];
}

/** Streak bonus: 25 * streakDays, capped at 250. */
export function calculateStreakBonus(streakDays: number): number {
  return Math.min(250, 25 * streakDays);
}
