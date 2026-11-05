"use client";

import React from "react";
import Link from "next/link";
import { PlayCircle, Clock } from "lucide-react";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import type { Locale, StudentProgress } from "@/types";

interface RecommendationsWidgetProps {
  locale: Locale;
  progress: StudentProgress | null;
}

const DEFAULT_RECOMMENDATION = {
  subjectId: "mathematics",
  subjectName: "Mathematics",
  lessonId: "counting-100",
  title: "Counting to 100",
  duration: 10,
};

export function RecommendationsWidget({ locale, progress }: RecommendationsWidgetProps) {
  // Find first subject with incomplete lessons, or fallback
  const rec = DEFAULT_RECOMMENDATION;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-heading font-bold text-text text-lg mb-5">
        Continue Where You Left Off
      </h3>

      <div className="flex items-center gap-4 p-4 bg-background rounded-2xl">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <SubjectIcon subjectId={rec.subjectId} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text/50 text-xs font-semibold mb-0.5">
            {rec.subjectName}
          </p>
          <p className="font-heading font-bold text-text text-sm truncate">
            {rec.title}
          </p>
          <span className="flex items-center gap-1 text-text/40 text-xs mt-0.5">
            <Clock size={11} />
            {rec.duration} min
          </span>
        </div>
        <Link
          href={`/${locale}/subjects/${rec.subjectId}/lessons/${rec.lessonId}`}
          className="shrink-0 flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <PlayCircle size={14} />
          Go
        </Link>
      </div>
    </div>
  );
}
