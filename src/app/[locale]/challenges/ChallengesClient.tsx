"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, CheckCircle, Clock } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import { dailyChallenges } from "@/content/challenges/daily-challenges";
import { getDailyChallengeIndex } from "@/lib/utils/date";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale } from "@/types";

interface ChallengesClientProps {
  locale: Locale;
}

export function ChallengesClient({ locale }: ChallengesClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);
  // null until the component mounts on the client (avoids prerender date access)
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    // Must run client-side only — getDailyChallengeIndex calls new Date()
    // which cannot be called during Next.js prerender.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayIndex(getDailyChallengeIndex(dailyChallenges.length));
  }, []);

  const streak = progress?.currentStreak ?? 0;
  const completed = progress?.dailyChallengesCompleted ?? [];

  // todayIndex is null during SSR/first render — show loading until it resolves
  const todayChallenge = todayIndex !== null ? (dailyChallenges[todayIndex] ?? null) : null;
  const todayDone = todayChallenge ? completed.includes(todayChallenge.id) : false;

  // Build "past challenges" from the two entries before today's index
  const pastChallenges =
    todayIndex !== null
      ? [1, 2].map((offset) => {
          const idx = (todayIndex - offset + dailyChallenges.length) % dailyChallenges.length;
          const challenge = dailyChallenges[idx];
          return {
            title: locale === "fr" ? challenge.titleFr : challenge.titleEn,
            subject: challenge.subjectId,
            completed: completed.includes(challenge.id),
            daysAgo: offset === 1 ? "Yesterday" : "2 days ago",
          };
        })
      : [];

  // Show empty state if no challenges are configured
  if (dailyChallenges.length === 0) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <EmptyState
          title="No challenges yet"
          description="Daily challenges will appear here once they are ready."
          illustration="no-content"
        />
      </PageTransition>
    );
  }

  // Show loading while todayIndex hasn't been resolved on the client yet
  if (todayIndex === null) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <LoadingState message="Loading today's challenge…" />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-2">
          Daily Challenges
        </h1>
        <p className="text-text/60 text-lg">
          A new challenge every day to keep your skills sharp.
        </p>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-3 bg-coral/10 rounded-2xl px-5 py-4 w-fit">
        <Flame size={22} className="text-coral" />
        <span className="font-heading font-bold text-text">
          {streak} day challenge streak
        </span>
      </div>

      {/* Today's challenge */}
      {todayChallenge && (
        <div className="bg-gradient-to-r from-primary to-blue rounded-3xl p-7 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-semibold mb-1">
                Today&apos;s Challenge
              </p>
              <h2 className="font-heading text-xl font-bold mb-2">
                {locale === "fr" ? todayChallenge.titleFr : todayChallenge.titleEn}
              </h2>
              <p className="text-white/80 text-sm mb-4 max-w-sm">
                {todayChallenge.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-semibold">
                  +{todayChallenge.bonusPoints} XP
                </span>
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <Clock size={12} />
                  {todayChallenge.questions.length * 2} min
                </span>
              </div>
            </div>
            {todayDone ? (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
                <CheckCircle size={18} />
                <span className="font-semibold text-sm">Done!</span>
              </div>
            ) : (
              <Link
                href={ROUTES.subject(locale, todayChallenge.subjectId)}
                className="shrink-0 px-5 py-2.5 bg-white text-primary rounded-2xl font-semibold text-sm hover:bg-white/90 transition-colors shadow"
              >
                Take Challenge
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Past challenges */}
      <div>
        <h2 className="font-heading text-xl font-bold text-text mb-4">
          Past Challenges
        </h2>
        <div className="space-y-3">
          {pastChallenges.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  c.completed ? "bg-mint/10" : "bg-gray-100"
                }`}
              >
                {c.completed ? (
                  <CheckCircle size={16} className="text-mint" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-text text-sm">{c.title}</p>
                <p className="text-text/40 text-xs">
                  {c.subject} · {c.daysAgo}
                </p>
              </div>
              {c.completed && (
                <span className="text-xs text-mint font-semibold">
                  Completed
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
