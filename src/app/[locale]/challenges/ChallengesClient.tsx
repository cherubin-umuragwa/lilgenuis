"use client";

import React from "react";
import Link from "next/link";
import { Flame, CheckCircle, Clock } from "lucide-react";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import type { Locale } from "@/types";

const TODAY_CHALLENGE = {
  id: "challenge_today",
  title: "Math Sprint",
  subject: "Mathematics",
  description:
    "Answer 5 math questions as quickly as you can and earn bonus XP for today.",
  bonusPoints: 100,
  duration: 8,
};

const PAST_CHALLENGES = [
  { date: "Yesterday", title: "Science Explorer", subject: "Science", completed: true },
  { date: "2 days ago", title: "Geography Quest", subject: "Geography", completed: true },
  { date: "3 days ago", title: "Language Challenge", subject: "Languages", completed: false },
];

interface ChallengesClientProps {
  locale: Locale;
}

export function ChallengesClient({ locale }: ChallengesClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  const streak = progress?.currentStreak ?? 0;
  const completed = progress?.dailyChallengesCompleted ?? [];
  const todayDone = completed.includes(TODAY_CHALLENGE.id);

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
      <div className="bg-gradient-to-r from-primary to-blue rounded-3xl p-7 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-semibold mb-1">
              Today's Challenge
            </p>
            <h2 className="font-heading text-xl font-bold mb-2">
              {TODAY_CHALLENGE.title}
            </h2>
            <p className="text-white/80 text-sm mb-4 max-w-sm">
              {TODAY_CHALLENGE.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-semibold">
                +{TODAY_CHALLENGE.bonusPoints} XP
              </span>
              <span className="flex items-center gap-1 text-white/60 text-xs">
                <Clock size={12} />
                {TODAY_CHALLENGE.duration} min
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
              href={`/${locale}/subjects/mathematics`}
              className="shrink-0 px-5 py-2.5 bg-white text-primary rounded-2xl font-semibold text-sm hover:bg-white/90 transition-colors shadow"
            >
              Take Challenge
            </Link>
          )}
        </div>
      </div>

      {/* Past challenges */}
      <div>
        <h2 className="font-heading text-xl font-bold text-text mb-4">
          Past Challenges
        </h2>
        <div className="space-y-3">
          {PAST_CHALLENGES.map((c, i) => (
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
                  {c.subject} · {c.date}
                </p>
              </div>
              {c.completed && (
                <span className="text-xs text-mint font-semibold">Completed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
