"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import { ProfileRepository } from "@/lib/repositories/profile.repository";
import type { Locale, StudentProfile } from "@/types";

interface RegisterClientProps {
  locale: Locale;
}

type AgeGroup = "6-8" | "9-10" | "11-12";

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function RegisterClient({ locale }: RegisterClientProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("9-10");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

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
      language: locale,
      character: "explorer",
      interests: [],
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    ProfileRepository.saveProfile(profile);

    setTimeout(() => {
      router.push(`/${locale}/onboarding`);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Demo mode banner */}
        <div className="bg-yellow/20 border border-yellow/40 rounded-2xl px-4 py-3 text-center mb-6">
          <span className="text-text/70 text-sm font-semibold">
            Demo Mode — account is saved locally on this device
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <LilGeniusLogo size={48} />
            <h1 className="font-heading text-2xl font-bold text-text mt-3">
              Create Your Account
            </h1>
            <p className="text-text/50 text-sm mt-1">
              Join thousands of young learners and start exploring today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="reg-name"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                First Name
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
              />
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                Email (optional)
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
              />
            </div>

            <div>
              <label
                htmlFor="reg-age"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                Age Group
              </label>
              <select
                id="reg-age"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text bg-white"
              >
                <option value="6-8">6–8 years</option>
                <option value="9-10">9–10 years</option>
                <option value="11-12">11–12 years</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-password"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="Create a password (demo mode)"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3.5 bg-primary text-white rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-text/40 text-xs mt-4">
            By creating an account you agree to our Terms of Service and Privacy
            Policy.
          </p>

          <p className="text-center text-text/50 text-sm mt-4">
            Already have an account?{" "}
            <Link
              href={`/${locale}/login`}
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
