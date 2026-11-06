"use client";

import React from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import type { Locale } from "@/types";

interface AchievementsPreviewProps {
  locale: Locale;
  achievementIds?: string[];
}

// Vivid solid badge colours cycling
const BADGE_COLORS = [
  "bg-primary text-white",
  "bg-turquoise text-white",
  "bg-coral text-white",
];

const DEMO_ACHIEVEMENTS = [
  { id: "first_login", title: "First Step", desc: "Logged in for the first time" },
  { id: "lesson_1", title: "Quick Learner", desc: "Completed your first lesson" },
  { id: "streak_3", title: "On a Roll", desc: "Studied 3 days in a row" },
];

export function AchievementsPreview({ locale, achievementIds }: AchievementsPreviewProps) {
  const hasEarned = achievementIds && achievementIds.length > 0;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-bold text-text text-lg">
          Recent Achievements
        </h3>
        <Link
          href={`/${locale}/achievements`}
          className="text-primary text-sm font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      {hasEarned ? (
        <div className="flex flex-col gap-3">
          {DEMO_ACHIEVEMENTS.slice(0, 3).map((a, i) => (
            <div key={a.id} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl ${BADGE_COLORS[i % BADGE_COLORS.length]} flex items-center justify-center`}
              >
                <Trophy size={18} />
              </div>
              <div>
                <p className="font-semibold text-text text-sm">{a.title}</p>
                <p className="text-text/50 text-xs">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center py-4 gap-2">
          <Trophy size={32} className="text-gray-200" />
          <p className="text-text/40 text-sm">
            Complete lessons to earn your first achievement!
          </p>
        </div>
      )}
    </div>
  );
}
