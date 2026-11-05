"use client";

import React, { useState, useEffect } from "react";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { DailyGoalRing } from "@/components/dashboard/DailyGoalRing";
import { SubjectGrid } from "@/components/dashboard/SubjectGrid";
import { DailyChallengeBanner } from "@/components/dashboard/DailyChallengeBanner";
import { AchievementsPreview } from "@/components/dashboard/AchievementsPreview";
import { RecommendationsWidget } from "@/components/dashboard/RecommendationsWidget";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import type { Locale } from "@/types";

interface DashboardClientProps {
  locale: Locale;
}

export function DashboardClient({ locale }: DashboardClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);
  const [dailyCompleted, setDailyCompleted] = useState(0);

  useEffect(() => {
    // Count lessons completed today by checking each subject's lastStudied date
    const today = new Date().toISOString().slice(0, 10);
    let todayCount = 0;
    if (progress) {
      for (const sp of Object.values(progress.subjectProgress)) {
        if (sp.lastStudied === today) {
          // Approximation: each subject studied today contributes its completed count
          todayCount += 1;
        }
      }
    }
    setDailyCompleted(Math.min(todayCount, 5));
  }, [progress]);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <DashboardGreeting />

      <DailyChallengeBanner locale={locale} bonusPoints={100} title="Today's Brain Challenge" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SubjectGrid locale={locale} progress={progress} />
          <RecommendationsWidget locale={locale} progress={progress} />
        </div>
        <div className="space-y-6">
          <DailyGoalRing completed={dailyCompleted} total={5} />
          <AchievementsPreview
            locale={locale}
            achievementIds={progress?.achievements}
          />
        </div>
      </div>
    </PageTransition>
  );
}
