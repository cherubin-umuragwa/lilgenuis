"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizEngine as QuizEngineComponent } from "@/components/quizzes/QuizEngine";
import { PageTransition } from "@/components/shared/PageTransition";
import { useProfile } from "@/hooks/useProfile";
import { useGamification } from "@/hooks/useGamification";
import { getLessonById } from "@/content/subjects/index";
import type { Locale, Question, Answer } from "@/types";

// Demo questions used when no real content exists for the lesson yet
const demoQuestions: Question[] = [
  {
    id: "q1",
    lessonId: "",
    type: "multiple-choice",
    questionEn: "Which of the following best describes learning?",
    questionFr:
      "Lequel des éléments suivants décrit le mieux l'apprentissage?",
    options: [
      "Reading without thinking",
      "Gaining new knowledge and skills",
      "Memorising without understanding",
      "Avoiding challenges",
    ],
    correctAnswer: "Gaining new knowledge and skills",
    explanationEn:
      "Learning means actively gaining new knowledge, skills, and understanding.",
    explanationFr:
      "Apprendre signifie acquérir activement de nouvelles connaissances, compétences et compréhension.",
    points: 10,
  },
  {
    id: "q2",
    lessonId: "",
    type: "true-false",
    questionEn: "Making mistakes is a natural part of the learning process.",
    questionFr:
      "Faire des erreurs fait naturellement partie du processus d'apprentissage.",
    options: [],
    correctAnswer: "true",
    explanationEn:
      "Mistakes help us understand what we need to improve and learn from experience.",
    explanationFr:
      "Les erreurs nous aident à comprendre ce que nous devons améliorer.",
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
    explanationFr:
      "Paris est la capitale et la plus grande ville de France.",
    points: 10,
  },
];

interface QuizPageClientProps {
  locale: Locale;
  subjectId: string;
  lessonId: string;
}

export function QuizPageClient({
  locale,
  subjectId,
  lessonId,
}: QuizPageClientProps) {
  const router = useRouter();
  const { profile } = useProfile();
  const { processLessonCompletion } = useGamification();
  const hasCompletedRef = useRef(false);

  const lesson = getLessonById(subjectId, lessonId);
  const questions = (lesson ? [] : demoQuestions).map((q) => ({
    ...q,
    lessonId,
  }));

  // If the subject has real questions, try to get them from content
  let resolvedQuestions = questions;
  if (lesson) {
    // Attempt to load questions from the subject module
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const subjectModule = require(`@/content/subjects/${subjectId}`) as {
        [key: string]: Question[];
      };
      const allQuestions: Question[] = Object.values(subjectModule)
        .flat()
        .filter((v): v is Question => typeof v === "object" && "lessonId" in v);
      const lessonQuestions = allQuestions.filter(
        (q) => q.lessonId === lessonId
      );
      resolvedQuestions =
        lessonQuestions.length > 0 ? lessonQuestions : demoQuestions;
    } catch {
      resolvedQuestions = demoQuestions;
    }
  }

  function handleComplete(score: number, answers: Answer[]) {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    const totalQuestions = answers.length;

    if (profile?.id) {
      processLessonCompletion({
        lessonId,
        subjectId,
        difficulty: lesson?.difficulty ?? "beginner",
        quizScore: score,
        correctAnswers,
        totalQuestions,
      });
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

      <QuizEngineComponent
        questions={resolvedQuestions}
        lessonId={lessonId}
        locale={locale}
        onComplete={handleComplete}
      />
    </PageTransition>
  );
}
