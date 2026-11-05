"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import type { Question } from "@/types";

interface TrueFalseQuestionProps {
  question: Question;
  locale: "en" | "fr";
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

export function TrueFalseQuestion({
  question,
  locale,
  onAnswer,
}: TrueFalseQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const correct =
    (Array.isArray(question.correctAnswer)
      ? question.correctAnswer[0]
      : question.correctAnswer
    ).toLowerCase();

  const questionText =
    locale === "fr" && question.questionFr
      ? question.questionFr
      : question.questionEn;

  function handleSelect(value: string) {
    if (selected !== null) return;
    setSelected(value);
    onAnswer(value, value === correct);
  }

  return (
    <div>
      <p className="font-heading font-bold text-text text-lg mb-6">
        {questionText}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {(["true", "false"] as const).map((val) => {
          const isSelected = selected === val;
          const isCorrectOpt = val === correct;
          let style = "border-2 border-gray-200 text-text hover:border-primary/50";
          if (isSelected) {
            style = isCorrectOpt
              ? "border-2 border-mint bg-mint/10 text-mint"
              : "border-2 border-coral bg-coral/10 text-coral";
          } else if (selected !== null && isCorrectOpt) {
            style = "border-2 border-mint/50 bg-mint/5 text-mint";
          }

          return (
            <button
              key={val}
              onClick={() => handleSelect(val)}
              disabled={selected !== null}
              className={`py-6 rounded-2xl font-heading font-bold text-xl flex flex-col items-center gap-2 transition-all ${style} disabled:cursor-default`}
            >
              {isSelected &&
                (isCorrectOpt ? <Check size={22} /> : <X size={22} />)}
              {val === "true" ? "True" : "False"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
