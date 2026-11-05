"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { ProfileRepository } from "@/lib/repositories/profile.repository";
import {
  ExplorerMascot,
  ScientistMascot,
  ArtistMascot,
} from "@/components/characters/MascotSVG";
import type { Locale, CharacterType, StudentProfile } from "@/types";

interface OnboardingWizardProps {
  locale: Locale;
}

const TOTAL_STEPS = 7;

const INTERESTS = [
  "Math",
  "Science",
  "Geography",
  "History",
  "Languages",
  "General Knowledge",
  "Logic",
  "Programming",
];

type AgeGroup = "6-8" | "9-10" | "11-12";
type LevelType = "beginner" | "intermediate" | "advanced";

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function OnboardingWizard({ locale }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Selections
  const [language, setLanguage] = useState<Locale>(locale);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("9-10");
  const [level, setLevel] = useState<LevelType>("beginner");
  const [interests, setInterests] = useState<string[]>([]);
  const [character, setCharacter] = useState<CharacterType>("explorer");
  const [name, setName] = useState("");

  function next() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function back() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  function finish() {
    const ageNum: Record<AgeGroup, number> = { "6-8": 7, "9-10": 9, "11-12": 11 };
    const profile: StudentProfile = {
      id: generateId(),
      name: name.trim() || "Explorer",
      age: ageNum[ageGroup],
      ageGroup,
      level: {
        current: 1,
        title: "Curious Explorer",
        xpRequired: 100,
        currentXP: 0,
        totalXP: 0,
      },
      language,
      character,
      interests,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    ProfileRepository.saveProfile(profile);
    router.push(`/${locale}/dashboard`);
  }

  const characterOptions: { id: CharacterType; label: string; desc: string; Mascot: React.ElementType }[] = [
    {
      id: "explorer",
      label: "Explorer",
      desc: "Curious, adventurous, and loves discovering new worlds.",
      Mascot: ExplorerMascot,
    },
    {
      id: "scientist",
      label: "Scientist",
      desc: "Analytical, methodical, and loves experiments.",
      Mascot: ScientistMascot,
    },
    {
      id: "artist",
      label: "Artist",
      desc: "Creative, expressive, and sees beauty in everything.",
      Mascot: ArtistMascot,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="font-heading text-2xl font-bold text-text">
            Welcome to LilGenius!
          </h1>
          <p className="text-text/50 text-sm mt-1">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        <ProgressBar step={step} total={TOTAL_STEPS} />

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[360px] flex flex-col">
          <div className="flex-1 p-8 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 p-8 flex flex-col"
              >
                {/* Step 1 — Language */}
                {step === 1 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-6">
                      Choose your language
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {(["en", "fr"] as Locale[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`p-6 rounded-2xl border-2 font-heading font-bold text-lg transition-all ${
                            language === lang
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-gray-200 text-text hover:border-primary/40"
                          }`}
                        >
                          {lang === "en" ? "English" : "Français"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Age Group */}
                {step === 2 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-6">
                      How old are you?
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                      {(["6-8", "9-10", "11-12"] as AgeGroup[]).map((ag) => (
                        <button
                          key={ag}
                          onClick={() => setAgeGroup(ag)}
                          className={`p-4 rounded-2xl border-2 font-semibold text-left transition-all ${
                            ageGroup === ag
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-gray-200 text-text hover:border-primary/40"
                          }`}
                        >
                          {ag === "6-8"
                            ? "6–8 years"
                            : ag === "9-10"
                            ? "9–10 years"
                            : "11–12 years"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 — Level */}
                {step === 3 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-6">
                      Choose your level
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                      {(["beginner", "intermediate", "advanced"] as LevelType[]).map((lv) => (
                        <button
                          key={lv}
                          onClick={() => setLevel(lv)}
                          className={`p-4 rounded-2xl border-2 font-semibold text-left capitalize transition-all ${
                            level === lv
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-gray-200 text-text hover:border-primary/40"
                          }`}
                        >
                          {lv.charAt(0).toUpperCase() + lv.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 — Interests */}
                {step === 4 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-2">
                      What do you love to learn about?
                    </h2>
                    <p className="text-text/50 text-sm mb-5">
                      Pick as many as you like.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                            interests.includes(interest)
                              ? "border-primary bg-primary text-white"
                              : "border-gray-200 text-text hover:border-primary/40"
                          }`}
                        >
                          {interests.includes(interest) && (
                            <Check size={12} className="inline mr-1" />
                          )}
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5 — Character */}
                {step === 5 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-6">
                      Choose your character
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                      {characterOptions.map(({ id, label, desc, Mascot }) => (
                        <button
                          key={id}
                          onClick={() => setCharacter(id)}
                          className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                            character === id
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 hover:border-primary/40"
                          }`}
                        >
                          <Mascot className="w-16 h-16" />
                          <span className="font-heading font-bold text-text text-sm">
                            {label}
                          </span>
                          <span className="text-text/50 text-xs text-center leading-tight">
                            {desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6 — Name */}
                {step === 6 && (
                  <div>
                    <h2 className="font-heading text-xl font-bold text-text mb-6">
                      What's your name?
                    </h2>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      maxLength={40}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text text-base"
                      onKeyDown={(e) => e.key === "Enter" && name.trim() && next()}
                    />
                  </div>
                )}

                {/* Step 7 — Ready */}
                {step === 7 && (
                  <div className="flex flex-col items-center text-center gap-4">
                    {characterOptions.find((c) => c.id === character) && (
                      <div className="w-28 h-28">
                        {React.createElement(
                          characterOptions.find((c) => c.id === character)!.Mascot,
                          { className: "w-full h-full" }
                        )}
                      </div>
                    )}
                    <h2 className="font-heading text-2xl font-bold text-text">
                      You're all set, {name.trim() || "Explorer"}!
                    </h2>
                    <p className="text-text/60 text-sm">
                      Language: <strong>{language === "en" ? "English" : "Français"}</strong>
                      {" · "}
                      Age: <strong>{ageGroup} years</strong>
                      {" · "}
                      Level: <strong className="capitalize">{level}</strong>
                    </p>
                    <p className="text-text/60 text-sm">
                      Your character: <strong className="capitalize">{character}</strong>
                    </p>
                    {interests.length > 0 && (
                      <p className="text-text/60 text-xs">
                        Interests: {interests.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 flex gap-3">
            {step > 1 && (
              <button
                onClick={back}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl font-semibold text-text hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < TOTAL_STEPS ? (
              <button
                onClick={next}
                disabled={step === 6 && !name.trim()}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Next
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex-1 px-4 py-3 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
              >
                Let's Go!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
