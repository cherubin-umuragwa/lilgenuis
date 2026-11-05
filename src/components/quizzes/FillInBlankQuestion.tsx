"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import type { Question } from "@/types";

interface FillInBlankQuestionProps {
  question: Question;
  locale: "en" | "fr";
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

export function FillInBlankQuestion({
  question,
  locale,
  onAnswer,
}: FillInBlankQuestionProps) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct =
    Array.isArray(question.correctAnswer)
      ? question.correctAnswer[0]
      : question.correctAnswer;

  const isCorrect = value.trim().toLowerCase() === correct.toLowerCase();

  const questionText =
    locale === "fr" && question.questionFr
      ? question.questionFr
      : question.questionEn;

  function handleSubmit() {
    if (!value.trim() || submitted) return;
    setSubmitted(true);
    onAnswer(value.trim(), isCorrect);
  }

  return (
    <div>
      <p className="font-heading font-bold text-text text-lg mb-5">
        {questionText}
      </p>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={submitted}
          placeholder="Type your answer here..."
          className={`flex-1 px-4 py-3 rounded-2xl border-2 font-body text-text focus:outline-none transition-colors ${
            submitted
              ? isCorrect
                ? "border-mint bg-mint/10"
                : "border-coral bg-coral/10"
              : "border-gray-200 focus:border-primary"
          }`}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || submitted}
          className="px-5 py-3 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-2"
        >
          {submitted ? (
            isCorrect ? <Check size={18} /> : <X size={18} />
          ) : (
            "Submit"
          )}
        </button>
      </div>
      {submitted && (
        <p
          className={`mt-3 text-sm font-semibold ${
            isCorrect ? "text-mint" : "text-coral"
          }`}
        >
          {isCorrect
            ? "Correct! Well done."
            : `The correct answer is: ${correct}`}
        </p>
      )}
    </div>
  );
}
