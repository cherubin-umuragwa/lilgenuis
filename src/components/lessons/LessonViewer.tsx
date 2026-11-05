"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, Lightbulb, PenLine, HelpCircle } from "lucide-react";
import type { Locale, Lesson } from "@/types";

interface LessonViewerProps {
  lesson: Lesson;
  locale: Locale;
  subjectId: string;
}

type Step = "intro" | "explanation" | "example" | "practice" | "quiz";

const steps: { id: Step; label: string; Icon: React.ElementType }[] = [
  { id: "intro", label: "Intro", Icon: BookOpen },
  { id: "explanation", label: "Learn", Icon: Lightbulb },
  { id: "example", label: "Example", Icon: BookOpen },
  { id: "practice", label: "Practice", Icon: PenLine },
  { id: "quiz", label: "Quiz", Icon: HelpCircle },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

export function LessonViewer({ lesson, locale, subjectId }: LessonViewerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentStep = steps[stepIndex];

  function goNext() {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function goPrev() {
    setDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  // Build step content
  function stepContent(step: Step) {
    switch (step) {
      case "intro":
        return (
          <div>
            <h2 className="font-heading text-2xl font-bold text-text mb-3">
              {lesson.titleEn}
            </h2>
            <p className="text-text/70 text-base leading-relaxed mb-4">
              {lesson.description || "Welcome to this lesson! Get ready to explore and discover."}
            </p>
            <div className="bg-primary/5 rounded-2xl p-5">
              <p className="text-text/60 text-sm">
                In this lesson, you will learn the key concepts and practice with examples.
                By the end, you will be ready for a quick quiz to test your knowledge.
              </p>
            </div>
          </div>
        );
      case "explanation":
        return (
          <div>
            <h2 className="font-heading text-xl font-bold text-text mb-4">
              Let's Learn
            </h2>
            {lesson.content.length > 0 ? (
              lesson.content.filter((c) => c.type === "text").map((c, i) => (
                <div key={i} className="mb-4">
                  {c.title && (
                    <h3 className="font-heading font-bold text-text mb-2">{c.title}</h3>
                  )}
                  <p className="text-text/70 text-base leading-relaxed">{c.body}</p>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                <p className="text-text/70 text-base leading-relaxed">
                  Every great subject starts with curiosity. In{" "}
                  <strong>{lesson.titleEn}</strong>, we begin by understanding
                  the core idea and why it matters in everyday life.
                </p>
                <div className="bg-blue/5 border border-blue/20 rounded-2xl p-5">
                  <p className="font-semibold text-text mb-1">Key Idea</p>
                  <p className="text-text/60 text-sm">
                    Learning happens step by step. Take your time with each
                    concept, and ask questions whenever something is unclear.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case "example":
        return (
          <div>
            <h2 className="font-heading text-xl font-bold text-text mb-4">
              See It in Action
            </h2>
            <div className="bg-yellow/10 border border-yellow/30 rounded-2xl p-5 mb-4">
              <p className="font-semibold text-text mb-2">Example</p>
              <p className="text-text/70 text-base leading-relaxed">
                Let's walk through a concrete example together. Pay attention to
                each step and think about how it connects to what you just learned.
              </p>
            </div>
            <div className="bg-mint/10 border border-mint/30 rounded-2xl p-5">
              <p className="font-semibold text-text mb-2">Your Turn</p>
              <p className="text-text/60 text-sm">
                Can you think of another real-life example? Write it down or
                share it with a friend!
              </p>
            </div>
          </div>
        );
      case "practice":
        return (
          <div>
            <h2 className="font-heading text-xl font-bold text-text mb-4">
              Practice Time
            </h2>
            <p className="text-text/70 text-base leading-relaxed mb-5">
              Now it's your chance to practice what you have learned. Try the
              exercises below and remember — mistakes are how we grow!
            </p>
            <div className="space-y-3">
              {[
                "Think about one thing you learned today.",
                "Can you explain it in your own words?",
                "How could you use this knowledge in real life?",
              ].map((q, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-background rounded-xl p-4"
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-text/70 text-sm">{q}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "quiz":
        return (
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
              <HelpCircle size={36} className="text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-text">
              Ready for the Quiz?
            </h2>
            <p className="text-text/60 text-base max-w-sm">
              You have covered all the material. Now test your knowledge and
              earn your lesson badge!
            </p>
            <Link
              href={`/${locale}/subjects/${subjectId}/lessons/${lesson.id}/quiz`}
              className="px-8 py-3.5 bg-primary text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              Start Quiz
            </Link>
          </div>
        );
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => {
          const isDone = i < stepIndex;
          const isActive = i === stepIndex;
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : isDone
                      ? "bg-mint text-white"
                      : "bg-gray-100 text-text/30"
                  }`}
                >
                  <s.Icon size={16} />
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:block ${
                    isActive ? "text-primary" : isDone ? "text-mint" : "text-text/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                    i < stepIndex ? "bg-mint" : "bg-gray-100"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Content area */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-64 p-8 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {stepContent(currentStep.id)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-2xl font-semibold text-text hover:bg-gray-50 disabled:opacity-30 transition-all"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {stepIndex < steps.length - 1 && (
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
          >
            Next
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
