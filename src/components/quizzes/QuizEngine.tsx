"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, Trophy } from "lucide-react";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./TrueFalseQuestion";
import { FillInBlankQuestion } from "./FillInBlankQuestion";
import { MatchingPairsQuestion } from "./MatchingPairsQuestion";
import type { Question, Answer, Locale } from "@/types";

interface QuizEngineProps {
  questions: Question[];
  lessonId: string;
  locale: Locale;
  onComplete: (score: number, answers: Answer[]) => void;
}

const slideVariants = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
};

function feedbackMessage(pct: number): string {
  if (pct === 100) return "Perfect score! You nailed it!";
  if (pct >= 80) return "Excellent work! Keep it up!";
  if (pct >= 60) return "Good job! A bit more practice and you'll master it.";
  return "Keep practising — you're improving every time!";
}

export function QuizEngine({ questions, lessonId, locale, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; explanation?: string } | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalScore = answers.reduce((sum, a) => sum + a.pointsEarned, 0);
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex) / questions.length) * 100 : 0;

  function handleAnswer(userAnswer: string, isCorrect: boolean) {
    if (showFeedback) return;
    const q = currentQuestion;
    const answer: Answer = {
      questionId: q.id,
      userAnswer,
      isCorrect,
      pointsEarned: isCorrect ? q.points : 0,
      timestamp: new Date().toISOString(),
    };
    const explanation =
      locale === "fr" ? (q.explanationFr ?? q.explanation) : (q.explanationEn ?? q.explanation);

    setAnswers((prev) => [...prev, answer]);
    setLastAnswer({ isCorrect, explanation });
    setShowFeedback(true);
  }

  function handleNext() {
    setShowFeedback(false);
    setLastAnswer(null);
    if (currentIndex + 1 >= questions.length) {
      setIsComplete(true);
      const finalAnswers = answers;
      const score = finalAnswers.reduce((s, a) => s + a.pointsEarned, 0);
      onComplete(score, finalAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  // Summary screen
  if (isComplete) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return (
      <div className="flex flex-col items-center text-center gap-6 py-8">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Trophy size={36} className="text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-text">Quiz Complete!</h2>
        <p className="text-text/60 text-base max-w-xs">
          {feedbackMessage(pct)}
        </p>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-xs">
          <div className="text-4xl font-heading font-bold text-primary mb-1">
            {pct}%
          </div>
          <p className="text-text/50 text-sm">
            {correctCount} of {questions.length} correct
          </p>
          <p className="text-primary font-semibold text-sm mt-2">
            +{totalScore} points earned
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-text/50">
        No questions available for this quiz yet.
      </div>
    );
  }

  const questionText =
    locale === "fr" && currentQuestion.questionFr
      ? currentQuestion.questionFr
      : currentQuestion.questionEn;

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text/50 font-semibold">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-primary">
            {totalScore} pts
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-4"
        >
          {currentQuestion.type === "multiple-choice" && (
            <MultipleChoiceQuestion
              question={currentQuestion}
              locale={locale}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "true-false" && (
            <TrueFalseQuestion
              question={currentQuestion}
              locale={locale}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "fill-in-blank" && (
            <FillInBlankQuestion
              question={currentQuestion}
              locale={locale}
              onAnswer={handleAnswer}
            />
          )}
          {currentQuestion.type === "matching-pairs" && (
            <MatchingPairsQuestion
              question={currentQuestion}
              locale={locale}
              onAnswer={handleAnswer}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && lastAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl p-4 mb-4 flex items-start gap-3 ${
              lastAnswer.isCorrect
                ? "bg-mint/10 border border-mint/30"
                : "bg-coral/10 border border-coral/30"
            }`}
          >
            {lastAnswer.isCorrect ? (
              <CheckCircle size={20} className="text-mint shrink-0 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-coral shrink-0 mt-0.5" />
            )}
            <div>
              <p
                className={`font-semibold text-sm ${
                  lastAnswer.isCorrect ? "text-mint" : "text-coral"
                }`}
              >
                {lastAnswer.isCorrect ? "Correct!" : "Not quite right."}
              </p>
              {lastAnswer.explanation && (
                <p className="text-text/60 text-sm mt-1">
                  {lastAnswer.explanation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button */}
      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
