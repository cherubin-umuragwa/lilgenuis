import type { Locale } from "@/types";

// ─── Internal helper ──────────────────────────────────────────────────────────
/** Returns today as YYYY-MM-DD string (used internally and by repositories). */
export function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Format a Date object for display, defaulting to en-GB style.
 * Example: "12 June 2025"
 */
export function formatDate(d: Date): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return d.toDateString();
  }
}

/**
 * Format a date string for display with a specific locale.
 * Used by components that have locale context.
 */
export function formatDateLocalized(date: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

/** Number of full days between `d` and today (always >= 0). */
export function getDaysSinceDate(d: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffMs = today.getTime() - target.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/** True when two Date values fall on the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Returns a deterministic index into a challenge array based on today's date.
 * The same calendar day always returns the same index.
 */
export function getDailyChallengeIndex(challengeCount: number): number {
  if (challengeCount <= 0) return 0;
  const today = getTodayKey();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) >>> 0;
  }
  return hash % challengeCount;
}

/**
 * Legacy overload used by ProgressRepository: accepts an explicit date string
 * and a total count. Kept for backward compatibility.
 */
export function getDailyChallengeIndexForDate(
  date: string,
  total: number
): number {
  if (total <= 0) return 0;
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) >>> 0;
  }
  return hash % total;
}

/**
 * Determine whether a study streak is still active or should be reset.
 * - `isActive`     — the student studied today or yesterday
 * - `shouldReset`  — the last study date is more than 1 day ago
 */
export function getStreakStatus(lastStudyDate: string | null): {
  isActive: boolean;
  shouldReset: boolean;
} {
  if (!lastStudyDate) return { isActive: false, shouldReset: false };

  const today = new Date(getTodayKey());
  const last = new Date(lastStudyDate);
  const diffMs = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    isActive: diffDays <= 1,
    shouldReset: diffDays > 1,
  };
}

/** @deprecated Use getStreakStatus instead */
export function getStreakDays(lastStudyDate: string): number {
  if (!lastStudyDate) return 0;
  const today = new Date(getTodayKey());
  const last = new Date(lastStudyDate);
  const diffMs = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays <= 1 ? 1 : 0;
}
