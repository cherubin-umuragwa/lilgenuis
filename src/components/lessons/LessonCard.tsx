"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import type { Locale, Lesson } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  locale: Locale;
  isCompleted?: boolean;
}

const difficultyStyles: Record<string, string> = {
  beginner: "bg-mint/20 text-mint",
  intermediate: "bg-blue/20 text-blue",
  advanced: "bg-coral/20 text-coral",
};

export function LessonCard({ lesson, locale, isCompleted = false }: LessonCardProps) {
  const diffStyle = difficultyStyles[lesson.difficulty] ?? "bg-gray-100 text-text";

  return (
    <div
      className={`bg-white rounded-2xl border ${
        isCompleted ? "border-mint/40 bg-mint/5" : "border-gray-100"
      } p-5 flex items-center gap-4`}
    >
      {/* Completion indicator */}
      <div className="shrink-0">
        {isCompleted ? (
          <CheckCircle size={24} className="text-mint" />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-bold text-text truncate">{lesson.titleEn}</h3>
        <p className="text-text/50 text-sm truncate">{lesson.description}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${diffStyle}`}>
            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
          </span>
          <span className="flex items-center gap-1 text-text/40 text-xs">
            <Clock size={11} />
            {lesson.duration} min
          </span>
        </div>
      </div>

      {/* Action */}
      <Link
        href={`/${locale}/subjects/${lesson.subjectId}/lessons/${lesson.id}`}
        className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <PlayCircle size={15} />
        {isCompleted ? "Review" : "Start"}
      </Link>
    </div>
  );
}
