"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizEngine } from "@/components/quizzes/QuizEngine";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import type { Locale, Question } from "@/types";

// Demo questions when no real content exists yet
const demoQuestions: Question[] = [
  {
    id: "q1",
    lessonId: "",
    type: "multiple-choice",
    questionEn: "Which of the following best describes learning?",
    questionFr: "Lequel des éléments suivants décrit le mieux l'apprentissage?",
    options: [
      "Reading without thinking",
      "Gaining new knowledge and skills",
      "Memorising without understanding",
      "Avoiding challenges",
    ],
    correctAnswer: "Gaining new knowledge and skills",
    explanationEn: "Learning means actively gaining new knowledge, skills, and understanding.",
    explanationFr: "Apprendre signifie acquérir activement de nouvelles connaissances, compétences et compréhension.",
    points: 10,
  },
  {
    id: "q2",
    lessonId: "",
    type: "true-false",
    questionEn: "Making mistakes is a natural part of the learning process.",
    questionFr: "Faire des erreurs fait naturellement partie du processus d'apprentissage.",
    options: [],
    correctAnswer: "true",
    explanationEn: "Mistakes help us understand what we need to improve and learn from experience.",
    explanationFr: "Les erreurs nous aident à comprendre ce que nous devons améliorer.",
    points: 10,
  },
  {
    id: "q3",
    lessonId: "",
    type: "fill-in-blank",
    questionEn: "Complete the sentence: The capital of France is ___.",
    questionFr: "Complétez la phrase: La capitale de la France est ___.",
    options: [],
    correctAnswer: "Paris",
    explanationEn: "Paris is the capital and largest city of France.",
    explanationFr: "Paris est la capitale et la plus grande ville de France.",
    points: 10,
  },
];

interface QuizPageClientProps {
  locale: Locale;
  subjectId: string;
  lessonId: string;
}

export function QuizPageClient({ locale, subjectId, lessonId }: QuizPageClientProps) {
  const router = useRouter();
  const { profile } = useProfile();
  const { addPoints, completedLesson } = useProgress(profile?.id ?? null);

  const questions = demoQuestions.map((q) => ({ ...q, lessonId }));

  function handleComplete(score: number) {
    if (profile?.id) {
      addPoints(score);
      completedLesson(subjectId, lessonId);
    }
    setTimeout(() => {
      router.push(`/${locale}/subjects/${subjectId}`);
    }, 2500);
  }

  return (
    <PageTransition className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href={`/${locale}/subjects/${subjectId}/lessons/${lessonId}`}
        className="inline-flex items-center gap-2 text-text/50 hover:text-primary text-sm font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Lesson
      </Link>

      <h1 className="font-heading text-2xl font-bold text-text mb-6">
        Lesson Quiz
      </h1>

      <QuizEngine
        questions={questions}
        lessonId={lessonId}
        locale={locale}
        onComplete={handleComplete}
      />
    </PageTransition>
  );
}
