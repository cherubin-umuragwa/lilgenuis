import type { Locale } from "@/types";

export const APP_NAME = "LilGenius";

export const APP_TAGLINE = "Learn. Play. Discover. Create.";

export const DEFAULT_LOCALE: Locale = "en";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr"];

export const LEVEL_THRESHOLDS = [
  { level: 1, title: "Curious Explorer", xpRequired: 0 },
  { level: 2, title: "Young Learner", xpRequired: 100 },
  { level: 3, title: "Knowledge Seeker", xpRequired: 300 },
  { level: 4, title: "Bright Scholar", xpRequired: 600 },
  { level: 5, title: "Wise Adventurer", xpRequired: 1000 },
  { level: 6, title: "Master Explorer", xpRequired: 1500 },
] as const;

export const POINTS_CONFIG = {
  correct_answer: 10,
  lesson_complete: 50,
  daily_challenge: 100,
  streak_bonus: 25,
} as const;

export const STORAGE_KEYS = {
  PROFILE: "lilgenius_profile",
  PROGRESS: "lilgenius_progress",
  GAME_STATE: "lilgenius_game_state",
  LANGUAGE: "lilgenius_language",
  STREAK: "lilgenius_streak",
} as const;
