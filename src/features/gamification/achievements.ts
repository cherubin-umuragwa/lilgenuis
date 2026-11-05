import type { Achievement, StudentProgress } from "@/types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    titleEn: "First Steps",
    titleFr: "Premiers Pas",
    description: "Complete your first lesson.",
    descriptionEn: "Complete your first lesson.",
    descriptionFr: "Terminez votre première leçon.",
    iconName: "Star",
    color: "text-yellow-500",
    condition: { type: "lessons_completed", threshold: 1 },
  },
  {
    id: "five-lessons",
    title: "Quick Learner",
    titleEn: "Quick Learner",
    titleFr: "Apprenant Rapide",
    description: "Complete 5 lessons.",
    descriptionEn: "Complete 5 lessons.",
    descriptionFr: "Terminez 5 leçons.",
    iconName: "Zap",
    color: "text-blue-500",
    condition: { type: "lessons_completed", threshold: 5 },
  },
  {
    id: "ten-lessons",
    title: "Knowledge Seeker",
    titleEn: "Knowledge Seeker",
    titleFr: "Chercheur de Connaissances",
    description: "Complete 10 lessons.",
    descriptionEn: "Complete 10 lessons.",
    descriptionFr: "Terminez 10 leçons.",
    iconName: "Brain",
    color: "text-purple-500",
    condition: { type: "lessons_completed", threshold: 10 },
  },
  {
    id: "perfect-score",
    title: "Perfectionist",
    titleEn: "Perfectionist",
    titleFr: "Perfectionniste",
    description: "Score 100% on a quiz.",
    descriptionEn: "Score 100% on a quiz.",
    descriptionFr: "Obtenez 100% à un quiz.",
    iconName: "Trophy",
    color: "text-yellow-400",
    condition: { type: "quiz_score", threshold: 100 },
  },
  {
    id: "three-day-streak",
    title: "On a Roll",
    titleEn: "On a Roll",
    titleFr: "Sur une Lancée",
    description: "Keep a 3-day learning streak.",
    descriptionEn: "Keep a 3-day learning streak.",
    descriptionFr: "Maintenez une série de 3 jours.",
    iconName: "Flame",
    color: "text-orange-500",
    condition: { type: "streak_days", threshold: 3 },
  },
  {
    id: "seven-day-streak",
    title: "Dedicated Learner",
    titleEn: "Dedicated Learner",
    titleFr: "Apprenant Dévoué",
    description: "Keep a 7-day learning streak.",
    descriptionEn: "Keep a 7-day learning streak.",
    descriptionFr: "Maintenez une série de 7 jours.",
    iconName: "Target",
    color: "text-red-500",
    condition: { type: "streak_days", threshold: 7 },
  },
  {
    id: "five-hundred-points",
    title: "Point Collector",
    titleEn: "Point Collector",
    titleFr: "Collectionneur de Points",
    description: "Earn 500 points.",
    descriptionEn: "Earn 500 points.",
    descriptionFr: "Gagnez 500 points.",
    iconName: "Award",
    color: "text-green-500",
    condition: { type: "points_earned", threshold: 500 },
  },
  {
    id: "one-thousand-points",
    title: "XP Champion",
    titleEn: "XP Champion",
    titleFr: "Champion XP",
    description: "Earn 1000 points.",
    descriptionEn: "Earn 1000 points.",
    descriptionFr: "Gagnez 1000 points.",
    iconName: "Crown",
    color: "text-yellow-600",
    condition: { type: "points_earned", threshold: 1000 },
  },
  {
    id: "three-subjects",
    title: "Curious Explorer",
    titleEn: "Curious Explorer",
    titleFr: "Explorateur Curieux",
    description: "Start 3 different subjects.",
    descriptionEn: "Start 3 different subjects.",
    descriptionFr: "Commencez 3 matières différentes.",
    iconName: "Compass",
    color: "text-teal-500",
    condition: { type: "subjects_started", threshold: 3 },
  },
  {
    id: "all-subjects",
    title: "Master of All",
    titleEn: "Master of All",
    titleFr: "Maître de Tout",
    description: "Start all 8 subjects.",
    descriptionEn: "Start all 8 subjects.",
    descriptionFr: "Commencez les 8 matières.",
    iconName: "Globe",
    color: "text-blue-600",
    condition: { type: "subjects_started", threshold: 8 },
  },
  {
    id: "daily-challenge",
    title: "Challenge Accepted",
    titleEn: "Challenge Accepted",
    titleFr: "Défi Accepté",
    description: "Complete a daily challenge.",
    descriptionEn: "Complete a daily challenge.",
    descriptionFr: "Terminez un défi quotidien.",
    iconName: "Shield",
    color: "text-indigo-500",
    condition: { type: "lessons_completed", threshold: 1 },
  },
  {
    id: "first-login",
    title: "Welcome, Genius!",
    titleEn: "Welcome, Genius!",
    titleFr: "Bienvenue, Génie !",
    description: "Log in for the first time.",
    descriptionEn: "Log in for the first time.",
    descriptionFr: "Connectez-vous pour la première fois.",
    iconName: "Heart",
    color: "text-pink-500",
    condition: { type: "first_login", threshold: 1 },
  },
];

/**
 * Returns the ids of achievements that are newly unlockable based on progress.
 * Only returns ids that are NOT already in progress.achievements.
 */
export function checkUnlockConditions(progress: StudentProgress): string[] {
  const alreadyUnlocked = new Set(progress.achievements);
  const subjectsStarted = Object.keys(progress.subjectProgress).length;
  const newlyUnlockable: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (alreadyUnlocked.has(achievement.id)) continue;

    const { type, threshold } = achievement.condition;
    let unlocked = false;

    switch (type) {
      case "lessons_completed":
        unlocked = progress.totalLessonsCompleted >= threshold;
        break;
      case "quiz_score":
        // quiz_score achievements are triggered per-quiz externally;
        // we treat totalPoints as a proxy here — callers pass actual score
        unlocked = false;
        break;
      case "streak_days":
        unlocked = progress.currentStreak >= threshold;
        break;
      case "points_earned":
        unlocked = progress.totalPoints >= threshold;
        break;
      case "subjects_started":
        unlocked = subjectsStarted >= threshold;
        break;
      case "first_login":
        // Always true once there is a progress record
        unlocked = true;
        break;
    }

    if (unlocked) {
      newlyUnlockable.push(achievement.id);
    }
  }

  return newlyUnlockable;
}

/** Returns the full Achievement objects for a list of unlocked ids. */
export function getUnlockedAchievements(unlockedIds: string[]): Achievement[] {
  const idSet = new Set(unlockedIds);
  return ACHIEVEMENTS.filter((a) => idSet.has(a.id));
}
