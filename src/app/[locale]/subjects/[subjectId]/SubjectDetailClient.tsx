"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { LessonCard } from "@/components/lessons/LessonCard";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProgress } from "@/hooks/useProgress";
import { useProfile } from "@/hooks/useProfile";
import type { Locale, Subject } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

// Demo lessons for subjects without real content yet
const demoLessons = [
  {
    id: "lesson-1",
    title: "Introduction",
    titleEn: "Introduction",
    titleFr: "Introduction",
    description: "Get started with the basics of this subject.",
    duration: 10,
    difficulty: "beginner" as const,
    order: 1,
    content: [],
    subjectId: "",
    topicId: "intro",
  },
  {
    id: "lesson-2",
    title: "Core Concepts",
    titleEn: "Core Concepts",
    titleFr: "Concepts Fondamentaux",
    description: "Explore the key ideas and principles.",
    duration: 15,
    difficulty: "beginner" as const,
    order: 2,
    content: [],
    subjectId: "",
    topicId: "core",
  },
  {
    id: "lesson-3",
    title: "Practice and Apply",
    titleEn: "Practice and Apply",
    titleFr: "Pratiquer et Appliquer",
    description: "Put your knowledge into action with exercises.",
    duration: 12,
    difficulty: "intermediate" as const,
    order: 3,
    content: [],
    subjectId: "",
    topicId: "practice",
  },
];

interface SubjectDetailClientProps {
  locale: Locale;
  subjectId: string;
}

export function SubjectDetailClient({ locale, subjectId }: SubjectDetailClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <PageTransition className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-text/60">Subject not found.</p>
        <Link href={`/${locale}/subjects`} className="text-primary hover:underline">
          Back to Subjects
        </Link>
      </PageTransition>
    );
  }

  const lessons = subject.lessons.length > 0
    ? subject.lessons
    : demoLessons.map((l) => ({ ...l, subjectId: subject.id }));

  const completedLessons =
    progress?.subjectProgress[subjectId]?.lessonsCompleted ?? [];
  const completedCount = completedLessons.length;
  const total = lessons.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        href={`/${locale}/subjects`}
        className="inline-flex items-center gap-2 text-text/50 hover:text-primary text-sm font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        All Subjects
      </Link>

      {/* Hero */}
      <div className={`${subject.bgColor} rounded-3xl p-8 mb-8 flex items-start gap-6`}>
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
          <SubjectIcon subjectId={subject.id} size={32} />
        </div>
        <div className="flex-1">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-text mb-2">
            {subject.nameEn}
          </h1>
          <p className="text-text/60 text-base mb-4">{subject.descriptionEn}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden max-w-xs">
              <div
                className="h-full bg-text/40 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-text/50 text-sm shrink-0">
              {completedCount}/{total} lessons
            </span>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <h2 className="font-heading text-xl font-bold text-text mb-4">Lessons</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            locale={locale}
            isCompleted={completedLessons.includes(lesson.id)}
          />
        ))}
      </div>
    </PageTransition>
  );
}
