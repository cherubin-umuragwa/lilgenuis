// ─── Locale ───────────────────────────────────────────────────────────────────
export type Locale = "en" | "fr";

// ─── Exercise / Question types ────────────────────────────────────────────────
export type ExerciseType =
  | "multiple-choice"
  | "true-false"
  | "fill-in-blank"
  | "matching-pairs";

// ─── Lesson Content ───────────────────────────────────────────────────────────
export interface LessonContent {
  type: "text" | "image" | "video" | "interactive";
  title?: string;
  body?: string;
  imageUrl?: string;
  alt?: string;
}

// ─── Lesson ───────────────────────────────────────────────────────────────────
export interface Lesson {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  titleEn: string;
  titleFr: string;
  description: string;
  content: LessonContent[];
  duration: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
}

// ─── Topic ────────────────────────────────────────────────────────────────────
export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  description: string;
}

// ─── Subject ──────────────────────────────────────────────────────────────────
export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  icon: string; // Lucide icon name string
  color: string; // Tailwind class
  bgColor: string; // Tailwind class
  lessons: Lesson[];
  totalLessons: number;
  estimatedMinutes: number;
}

// ─── Question / Answer ────────────────────────────────────────────────────────
export interface Question {
  id: string;
  lessonId: string;
  type: ExerciseType;
  questionEn: string;
  questionFr: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  explanationEn?: string;
  explanationFr?: string;
  points: number;
}

export interface Answer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
  timestamp: string;
}

// ─── Learning Path ────────────────────────────────────────────────────────────
export interface LearningPath {
  id: string;
  studentId: string;
  subjectId: string;
  lessons: string[];
  currentLessonId: string;
  completedLessons: string[];
  progress: number; // 0–100
}

// ─── Achievement / Badge ──────────────────────────────────────────────────────
export interface AchievementCondition {
  type:
    | "lessons_completed"
    | "quiz_score"
    | "streak_days"
    | "points_earned"
    | "subjects_started"
    | "first_login";
  threshold: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleEn: string;
  titleFr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  iconName: string;
  color: string;
  condition: AchievementCondition;
  unlockedAt?: Date;
}

// Badge is an alias for Achievement (UI chip widget is a separate component)
export type Badge = Achievement;

// ─── Daily Challenge ──────────────────────────────────────────────────────────
export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  subjectId: string;
  lessonId: string;
  title: string;
  titleEn: string;
  titleFr: string;
  description: string;
  questions: Question[];
  bonusPoints: number;
  completed?: boolean;
}

// ─── Student Profile ──────────────────────────────────────────────────────────
export type CharacterType = "explorer" | "scientist" | "artist";

export interface StudentLevel {
  current: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  xpRequired: number;
  currentXP: number;
  totalXP: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  ageGroup: "6-8" | "9-10" | "11-12";
  level: StudentLevel;
  language: Locale;
  character: CharacterType;
  interests: string[];
  createdAt: string;
  lastActiveAt: string;
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export interface SubjectProgress {
  subjectId: string;
  lessonsCompleted: string[];
  totalLessons: number;
  averageScore: number;
  lastStudied: string;
}

export interface StudentProgress {
  studentId: string;
  subjectProgress: Record<string, SubjectProgress>;
  totalLessonsCompleted: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
  achievements: string[];
  dailyChallengesCompleted: string[];
}

// ─── Game State ───────────────────────────────────────────────────────────────
export interface GameState {
  currentLessonId?: string;
  currentQuestionIndex: number;
  answers: Answer[];
  score: number;
  isComplete: boolean;
  startedAt: string;
}

// ─── Translations ─────────────────────────────────────────────────────────────
export interface Translation {
  [key: string]: string | Translation;
}
