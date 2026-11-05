import type { StudentProgress, SubjectProgress } from "@/types";
import { StorageService } from "@/lib/storage";
import { STORAGE_KEYS } from "@/config/constants";
import { getTodayKey } from "@/lib/utils/date";

export class ProgressRepository {
  static getProgress(studentId: string): StudentProgress | null {
    const progress = StorageService.get<StudentProgress>(
      STORAGE_KEYS.PROGRESS
    );
    if (!progress || progress.studentId !== studentId) return null;
    return progress;
  }

  static saveProgress(progress: StudentProgress): void {
    StorageService.set<StudentProgress>(STORAGE_KEYS.PROGRESS, progress);
  }

  static updateSubjectProgress(
    studentId: string,
    subjectId: string,
    update: Partial<SubjectProgress>
  ): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;

    const existing = progress.subjectProgress[subjectId] ?? {
      subjectId,
      lessonsCompleted: [],
      totalLessons: 0,
      averageScore: 0,
      lastStudied: getTodayKey(),
    };

    ProgressRepository.saveProgress({
      ...progress,
      subjectProgress: {
        ...progress.subjectProgress,
        [subjectId]: { ...existing, ...update },
      },
    });
  }

  static addAchievement(studentId: string, achievementId: string): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;
    if (progress.achievements.includes(achievementId)) return;

    ProgressRepository.saveProgress({
      ...progress,
      achievements: [...progress.achievements, achievementId],
    });
  }

  static incrementStreak(studentId: string): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;

    const newStreak = progress.currentStreak + 1;
    ProgressRepository.saveProgress({
      ...progress,
      currentStreak: newStreak,
      longestStreak: Math.max(progress.longestStreak, newStreak),
      lastStudyDate: getTodayKey(),
    });
  }

  static resetStreak(studentId: string): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;

    ProgressRepository.saveProgress({
      ...progress,
      currentStreak: 0,
      lastStudyDate: getTodayKey(),
    });
  }

  static addPoints(studentId: string, points: number): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;

    ProgressRepository.saveProgress({
      ...progress,
      totalPoints: progress.totalPoints + points,
    });
  }

  static markDailyChallengeComplete(
    studentId: string,
    challengeId: string
  ): void {
    const progress = ProgressRepository.getProgress(studentId);
    if (!progress) return;
    if (progress.dailyChallengesCompleted.includes(challengeId)) return;

    ProgressRepository.saveProgress({
      ...progress,
      dailyChallengesCompleted: [
        ...progress.dailyChallengesCompleted,
        challengeId,
      ],
    });
  }
}
