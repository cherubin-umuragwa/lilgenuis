"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import type { Question } from "@/types";

interface MultipleChoiceQuestionProps {
  question: Question;
  locale: "en" | "fr";
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

export function MultipleChoiceQuestion({
  question,
  locale,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = question.options ?? [];
  const correct = Array.isArray(question.correctAnswer)
    ? question.correctAnswer[0]
    : question.correctAnswer;

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);
    onAnswer(option, option === correct);
  }

  const questionText =
    locale === "fr" && question.questionFr
      ? question.questionFr
      : question.questionEn;

  return (
    <div>
      <p className="font-heading font-bold text-text text-lg mb-5">
        {questionText}
      </p>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrectOpt = option === correct;
          let style =
            "border-2 border-gray-200 text-text hover:border-primary/50";
          if (isSelected) {
            style = isCorrectOpt
              ? "border-2 border-mint bg-mint/10 text-mint"
              : "border-2 border-coral bg-coral/10 text-coral";
          } else if (selected !== null && isCorrectOpt) {
            style = "border-2 border-mint/50 bg-mint/5 text-mint";
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`w-full px-5 py-3.5 rounded-2xl font-semibold text-left flex items-center justify-between transition-all ${style} disabled:cursor-default`}
            >
              <span>{option}</span>
              {isSelected &&
                (isCorrectOpt ? (
                  <Check size={18} className="text-mint" />
                ) : (
                  <X size={18} className="text-coral" />
                ))}
              {!isSelected && selected !== null && isCorrectOpt && (
                <Check size={18} className="text-mint" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
