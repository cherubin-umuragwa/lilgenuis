"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import type { Locale } from "@/types";

interface DailyChallengeBannerProps {
  locale: Locale;
  bonusPoints?: number;
  title?: string;
}

export function DailyChallengeBanner({
  locale,
  bonusPoints = 100,
  title = "Daily Challenge",
}: DailyChallengeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-primary to-blue rounded-3xl p-6 text-white shadow-lg shadow-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-yellow" />
            <span className="text-white/80 text-sm font-semibold">
              Daily Challenge
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl mb-1">{title}</h3>
          <p className="text-white/70 text-sm">
            Complete today's challenge and earn{" "}
            <span className="text-yellow font-bold">+{bonusPoints} bonus XP</span>
          </p>
        </div>

        <Link
          href={`/${locale}/challenges`}
          className="shrink-0 px-5 py-2.5 bg-white text-primary rounded-2xl font-semibold text-sm hover:bg-white/90 transition-colors shadow"
        >
          Take Challenge
        </Link>
      </div>
    </div>
  );
}
