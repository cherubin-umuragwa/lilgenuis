"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LessonViewer } from "@/components/lessons/LessonViewer";
import { PageTransition } from "@/components/shared/PageTransition";
import type { Locale, Subject, Lesson } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

const demoLesson: Lesson = {
  id: "demo",
  subjectId: "",
  topicId: "intro",
  title: "Introduction",
  titleEn: "Introduction",
  titleFr: "Introduction",
  description: "Get started with the basics of this subject.",
  content: [],
  duration: 10,
  difficulty: "beginner",
  order: 1,
};

interface LessonPageClientProps {
  locale: Locale;
  subjectId: string;
  lessonId: string;
}

export function LessonPageClient({ locale, subjectId, lessonId }: LessonPageClientProps) {
  const subject = subjects.find((s) => s.id === subjectId);
  const lesson: Lesson =
    subject?.lessons.find((l) => l.id === lessonId) ??
    { ...demoLesson, id: lessonId, subjectId, titleEn: lessonId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Link
          href={`/${locale}/subjects/${subjectId}`}
          className="inline-flex items-center gap-2 text-text/50 hover:text-primary text-sm font-semibold mb-4 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {subject?.nameEn ?? "Subject"}
        </Link>
      </div>
      <LessonViewer lesson={lesson} locale={locale} subjectId={subjectId} />
    </PageTransition>
  );
}
