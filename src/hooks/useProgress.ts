"use client";

import { useState, useCallback } from "react";
import type { StudentProgress, SubjectProgress } from "@/types";
import { ProgressRepository } from "@/lib/repositories/progress.repository";
import { POINTS_CONFIG } from "@/config/constants";

interface UseProgressReturn {
  progress: StudentProgress | null;
  updateSubjectProgress: (
    subjectId: string,
    update: Partial<SubjectProgress>
  ) => void;
  addPoints: (points: number) => void;
  addAchievement: (achievementId: string) => void;
  completedLesson: (subjectId: string, lessonId: string) => void;
  completedChallenge: (challengeId: string) => void;
  isLoading: boolean;
}

/** Read progress from localStorage. Returns null on server or when not set. */
function readProgress(studentId: string | null): StudentProgress | null {
  if (typeof window === "undefined" || !studentId) return null;
  return ProgressRepository.getProgress(studentId);
}

export function useProgress(studentId: string | null): UseProgressReturn {
  // Lazy initializer runs once on client — no useEffect setState
  const [progress, setProgress] = useState<StudentProgress | null>(() =>
    readProgress(studentId)
  );
  const [isLoading] = useState(false);

  const refresh = useCallback(() => {
    setProgress(readProgress(studentId));
  }, [studentId]);

  const updateSubjectProgress = useCallback(
    (subjectId: string, update: Partial<SubjectProgress>) => {
      if (!studentId) return;
      ProgressRepository.updateSubjectProgress(studentId, subjectId, update);
      refresh();
    },
    [studentId, refresh]
  );

  const addPoints = useCallback(
    (points: number) => {
      if (!studentId) return;
      ProgressRepository.addPoints(studentId, points);
      refresh();
    },
    [studentId, refresh]
  );

  const addAchievement = useCallback(
    (achievementId: string) => {
      if (!studentId) return;
      ProgressRepository.addAchievement(studentId, achievementId);
      refresh();
    },
    [studentId, refresh]
  );

  const completedLesson = useCallback(
    (subjectId: string, lessonId: string) => {
      if (!studentId) return;
      const current = ProgressRepository.getProgress(studentId);
      const completed =
        current?.subjectProgress[subjectId]?.lessonsCompleted ?? [];
      if (!completed.includes(lessonId)) {
        ProgressRepository.updateSubjectProgress(studentId, subjectId, {
          lessonsCompleted: [...completed, lessonId],
          lastStudied: new Date().toISOString().slice(0, 10),
        });
        ProgressRepository.addPoints(studentId, POINTS_CONFIG.lesson_complete);
        refresh();
      }
    },
    [studentId, refresh]
  );

  const completedChallenge = useCallback(
    (challengeId: string) => {
      if (!studentId) return;
      ProgressRepository.markDailyChallengeComplete(studentId, challengeId);
      ProgressRepository.addPoints(studentId, POINTS_CONFIG.daily_challenge);
      refresh();
    },
    [studentId, refresh]
  );

  return {
    progress,
    updateSubjectProgress,
    addPoints,
    addAchievement,
    completedLesson,
    completedChallenge,
    isLoading,
  };
}
