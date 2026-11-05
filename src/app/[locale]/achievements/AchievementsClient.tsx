"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { AchievementBadge } from "@/components/achievements/AchievementBadge";
import { CelebrationAnimation } from "@/components/achievements/CelebrationAnimation";
import { PageTransition } from "@/components/shared/PageTransition";
import { EmptyState } from "@/components/ui/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import { ACHIEVEMENTS } from "@/features/gamification/achievements";
import { getLevelForXP } from "@/features/gamification/levels";
import type { Locale } from "@/types";

interface AchievementsClientProps {
  locale: Locale;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export function AchievementsClient({ locale }: AchievementsClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);
  const [showCelebration, setShowCelebration] = useState(false);
  const prevUnlockedCount = useRef<number | null>(null);

  const unlockedIds = new Set(progress?.achievements ?? []);
  const totalXP = profile?.level.totalXP ?? 0;
  const level = getLevelForXP(totalXP);
  const currentXP = level.currentXP;
  const xpRequired = level.xpRequired;
  const levelNum = level.current;
  const xpPct = xpRequired > 0 ? Math.min(100, Math.round((currentXP / xpRequired) * 100)) : 100;
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length;

  // Trigger celebration when a new achievement is unlocked
  useEffect(() => {
    if (prevUnlockedCount.current !== null && unlockedCount > prevUnlockedCount.current) {
      setShowCelebration(true);
    }
    prevUnlockedCount.current = unlockedCount;
  }, [unlockedCount]);

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {showCelebration && (
        <CelebrationAnimation onDismiss={() => setShowCelebration(false)} />
      )}

      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-2">
        Achievements
      </h1>
      <p className="text-text/60 mb-8">
        Every milestone you reach earns a badge. Keep going to unlock more!
      </p>

      {/* Level progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-primary text-sm">
            Level {levelNum} — {level.title}
          </span>
          <span className="text-text/40 text-xs">
            {currentXP}/{xpRequired > 0 ? xpRequired : "MAX"} XP
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <p className="text-text/40 text-xs mt-2">
          {unlockedCount} of {ACHIEVEMENTS.length} achievements unlocked ·{" "}
          {totalXP} total XP
        </p>
      </div>

      {/* Badges grid */}
      {unlockedCount === 0 && progress !== null ? (
        <EmptyState
          title="No achievements yet"
          description="Complete lessons and quizzes to start earning badges!"
          illustration="no-achievements"
        />
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <motion.div key={achievement.id} variants={badgeVariants}>
              <AchievementBadge
                achievement={achievement}
                isUnlocked={unlockedIds.has(achievement.id)}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageTransition>
  );
}
