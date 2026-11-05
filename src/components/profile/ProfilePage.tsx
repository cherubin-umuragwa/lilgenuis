"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import {
  ExplorerMascot,
  ScientistMascot,
  ArtistMascot,
} from "@/components/characters/MascotSVG";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { CHARACTER_OPTIONS } from "@/features/gamification/characters";
import type { Locale, CharacterType, Subject } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

const mascotMap: Record<CharacterType, React.ElementType> = {
  explorer: ExplorerMascot,
  scientist: ScientistMascot,
  artist: ArtistMascot,
};

interface ProfilePageProps {
  locale: Locale;
}

export function ProfilePage({ locale: _locale }: ProfilePageProps) {
  const { profile, updateProfile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-text/60 text-lg">
          No profile found. Complete onboarding first.
        </p>
      </div>
    );
  }

  const CurrentMascot = mascotMap[profile.character] ?? ExplorerMascot;
  const totalLessons = progress?.totalLessonsCompleted ?? 0;
  const streak = progress?.currentStreak ?? 0;
  const achievementsCount = progress?.achievements.length ?? 0;
  const totalXP = profile.level.totalXP;
  const currentXP = profile.level.currentXP;
  const xpRequired = profile.level.xpRequired;
  const xpPct =
    xpRequired > 0
      ? Math.min(100, Math.round((currentXP / xpRequired) * 100))
      : 100;

  function switchCharacter(c: CharacterType) {
    updateProfile({ character: c });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Character card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col sm:flex-row items-center gap-8"
      >
        <div className="w-32 h-32 shrink-0">
          <CurrentMascot className="w-full h-full" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-heading text-2xl font-bold text-text">
            {profile.name}
          </h1>
          <p className="text-primary font-semibold text-sm mt-1">
            Level {profile.level.current} — {profile.level.title}
          </p>
          <p className="text-text/40 text-xs mt-0.5">{totalXP} total XP</p>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text/50">
                {currentXP}/{xpRequired > 0 ? xpRequired : "MAX"} XP to next level
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Lessons", value: totalLessons },
          { label: "Day Streak", value: streak },
          { label: "Achievements", value: achievementsCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-1"
          >
            <span className="font-heading text-2xl font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-text/50 text-xs text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Character customisation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-heading font-bold text-text mb-4">
          Change Character
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {CHARACTER_OPTIONS.map((option) => {
            const Mascot = mascotMap[option.id];
            const isUnlocked = totalXP >= option.xpRequired;
            const isActive = profile.character === option.id;

            return (
              <button
                key={option.id}
                onClick={() => isUnlocked && switchCharacter(option.id)}
                disabled={!isUnlocked}
                aria-label={
                  isUnlocked
                    ? `Select ${option.nameEn}`
                    : `${option.nameEn} — ${option.unlockCondition}`
                }
                className={`relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : isUnlocked
                    ? "border-gray-200 hover:border-primary/40 cursor-pointer"
                    : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock size={12} className="text-text/30" />
                  </div>
                )}
                <motion.div
                  key={`${option.id}-${isActive}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  <Mascot className="w-14 h-14" />
                </motion.div>
                <span className="font-heading font-bold text-text text-xs capitalize">
                  {option.nameEn}
                </span>
                {!isUnlocked && (
                  <span className="text-text/40 text-xs text-center leading-tight">
                    {option.unlockCondition}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject completion */}
      {subjects.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-text mb-4">
            Subject Progress
          </h2>
          <div className="space-y-3">
            {subjects.map((subject) => {
              const completed =
                progress?.subjectProgress[subject.id]?.lessonsCompleted
                  .length ?? 0;
              const total = subject.totalLessons;
              const pct =
                total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <div key={subject.id} className="flex items-center gap-3">
                  <SubjectIcon subjectId={subject.id} size={18} />
                  <span className="text-sm text-text/60 w-36 shrink-0">
                    {subject.nameEn}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-text/40 w-8 text-right shrink-0">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
