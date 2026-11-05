"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import type { Question } from "@/types";

interface MatchingPairsQuestionProps {
  question: Question;
  locale: "en" | "fr";
  onAnswer: (answer: string, isCorrect: boolean) => void;
}

// Options expected as: ["A:1", "B:2", "C:3", ...] — left:right pairs
function parsePairs(options: string[]): { left: string; right: string }[] {
  return options.map((opt) => {
    const [left, right] = opt.split(":");
    return { left: left ?? opt, right: right ?? "" };
  });
}

export function MatchingPairsQuestion({
  question,
  locale,
  onAnswer,
}: MatchingPairsQuestionProps) {
  const options = question.options ?? [];
  const pairs = parsePairs(options);
  const lefts = pairs.map((p) => p.left);
  const rights = pairs.map((p) => p.right).sort(() => Math.random() - 0.5);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allMatched = Object.keys(matched).length === pairs.length;

  function handleLeft(left: string) {
    if (submitted || matched[left]) return;
    setSelectedLeft((prev) => (prev === left ? null : left));
  }

  function handleRight(right: string) {
    if (!selectedLeft || submitted) return;
    if (Object.values(matched).includes(right)) return;
    const newMatched = { ...matched, [selectedLeft]: right };
    setMatched(newMatched);
    setSelectedLeft(null);

    if (Object.keys(newMatched).length === pairs.length) {
      // Check all correct
      const allCorrect = pairs.every((p) => newMatched[p.left] === p.right);
      setSubmitted(true);
      onAnswer(JSON.stringify(newMatched), allCorrect);
    }
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
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text/40 mb-2 uppercase tracking-wide">Column A</p>
          {lefts.map((left) => {
            const isSelected = selectedLeft === left;
            const isMatched = !!matched[left];
            return (
              <button
                key={left}
                onClick={() => handleLeft(left)}
                disabled={submitted || isMatched}
                className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-sm text-left transition-all ${
                  isMatched
                    ? "border-mint bg-mint/10 text-mint"
                    : isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 text-text hover:border-primary/40"
                }`}
              >
                <span className="flex items-center justify-between">
                  {left}
                  {isMatched && <Check size={14} />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text/40 mb-2 uppercase tracking-wide">Column B</p>
          {rights.map((right) => {
            const isPaired = Object.values(matched).includes(right);
            return (
              <button
                key={right}
                onClick={() => handleRight(right)}
                disabled={submitted || isPaired}
                className={`w-full px-4 py-3 rounded-xl border-2 font-semibold text-sm text-left transition-all ${
                  isPaired
                    ? "border-mint bg-mint/10 text-mint"
                    : selectedLeft
                    ? "border-blue/40 bg-blue/5 text-text hover:border-blue"
                    : "border-gray-200 text-text"
                }`}
              >
                {right}
              </button>
            );
          })}
        </div>
      </div>
      {submitted && (
        <p className="mt-4 text-sm font-semibold text-mint text-center">
          {allMatched ? "All pairs matched!" : ""}
        </p>
      )}
    </div>
  );
}
