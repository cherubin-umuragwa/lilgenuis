import type { StudentProgress, Achievement, StudentLevel } from "@/types";
import { updateStreak } from "./streak";
import {
  calculateQuizPoints,
  calculateLessonBonus,
  calculateStreakBonus,
} from "./points";
import {
  checkUnlockConditions,
  getUnlockedAchievements,
  ACHIEVEMENTS,
} from "./achievements";
import { getLevelForXP } from "./levels";

export interface ProcessLessonParams {
  studentProgress: StudentProgress;
  lessonId: string;
  subjectId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  /** 0-100 percentage score on the quiz */
  quizScore: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface ProcessLessonResult {
  updatedProgress: StudentProgress;
  pointsEarned: number;
  newAchievements: Achievement[];
  leveledUp: boolean;
  newLevel?: StudentLevel;
}

/**
 * Orchestrates a lesson completion event:
 * 1. Update streak
 * 2. Calculate quiz + lesson + streak bonus points
 * 3. Record lesson and subject progress
 * 4. Check for perfect-score achievement
 * 5. Unlock any newly eligible achievements
 * 6. Detect level-up
 */
export function processLessonCompletion(
  params: ProcessLessonParams
): ProcessLessonResult {
  const {
    studentProgress,
    lessonId,
    subjectId,
    difficulty,
    quizScore,
    correctAnswers,
    totalQuestions,
  } = params;

  // 1. Update streak
  let updated = updateStreak(studentProgress);

  // 2. Calculate points
  const quizPoints = calculateQuizPoints(correctAnswers, totalQuestions);
  const lessonBonus = calculateLessonBonus(difficulty);
  const streakBonus = calculateStreakBonus(updated.currentStreak);
  const pointsEarned = quizPoints + lessonBonus + streakBonus;

  // 3. Record lesson completion (avoid duplicates)
  const existingSubject = updated.subjectProgress[subjectId] ?? {
    subjectId,
    lessonsCompleted: [],
    totalLessons: 0,
    averageScore: 0,
    lastStudied: new Date().toISOString().slice(0, 10),
  };

  const alreadyCompleted = existingSubject.lessonsCompleted.includes(lessonId);
  const newLessonsCompleted = alreadyCompleted
    ? existingSubject.lessonsCompleted
    : [...existingSubject.lessonsCompleted, lessonId];

  // Running average score
  const completedCount = newLessonsCompleted.length;
  const prevAvg = existingSubject.averageScore;
  const newAvgScore = alreadyCompleted
    ? prevAvg
    : Math.round(
        (prevAvg * (completedCount - 1) + quizScore) / completedCount
      );

  const updatedSubjectProgress = {
    ...existingSubject,
    lessonsCompleted: newLessonsCompleted,
    averageScore: newAvgScore,
    lastStudied: new Date().toISOString().slice(0, 10),
  };

  const totalLessonsCompleted = alreadyCompleted
    ? updated.totalLessonsCompleted
    : updated.totalLessonsCompleted + 1;

  updated = {
    ...updated,
    totalPoints: updated.totalPoints + pointsEarned,
    totalLessonsCompleted,
    subjectProgress: {
      ...updated.subjectProgress,
      [subjectId]: updatedSubjectProgress,
    },
  };

  // 4. Perfect-score achievement check (add quiz_score condition manually)
  const perfectScoreAchId = "perfect-score";
  if (
    quizScore >= 100 &&
    !updated.achievements.includes(perfectScoreAchId)
  ) {
    updated = {
      ...updated,
      achievements: [...updated.achievements, perfectScoreAchId],
    };
  }

  // 5. Check general unlock conditions
  const newIds = checkUnlockConditions(updated);
  if (newIds.length > 0) {
    updated = {
      ...updated,
      achievements: [...updated.achievements, ...newIds],
    };
  }

  // Gather all newly unlocked achievement objects
  const previousIds = new Set(studentProgress.achievements);
  const allNewIds = updated.achievements.filter((id) => !previousIds.has(id));
  const newAchievements = getUnlockedAchievements(allNewIds);

  // 6. Level-up detection
  const prevLevel = getLevelForXP(studentProgress.totalPoints);
  const newLevel = getLevelForXP(updated.totalPoints);
  const leveledUp = newLevel.current > prevLevel.current;

  return {
    updatedProgress: updated,
    pointsEarned,
    newAchievements,
    leveledUp,
    newLevel: leveledUp ? newLevel : undefined,
  };
}

export { ACHIEVEMENTS, checkUnlockConditions, getUnlockedAchievements };
export { getLevelForXP, getNextLevelXP, getLevelProgress, LEVELS } from "./levels";
export { updateStreak, getStreakStatus } from "./streak";
export {
  calculateQuizPoints,
  calculateLessonBonus,
  calculateStreakBonus,
} from "./points";
export { CHARACTER_OPTIONS, getUnlockedCharacters } from "./characters";
export type { CharacterOption } from "./characters";
