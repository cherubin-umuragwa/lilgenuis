"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import type { Locale } from "@/types";

interface LoginClientProps {
  locale: Locale;
}

export function LoginClient({ locale }: LoginClientProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Demo mode banner */}
        <div className="bg-yellow/20 border border-yellow/40 rounded-2xl px-4 py-3 text-center mb-6">
          <span className="text-text/70 text-sm font-semibold">
            Demo Mode — no real authentication required
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <LilGeniusLogo size={48} />
            <h1 className="font-heading text-2xl font-bold text-text mt-3">
              Welcome Back
            </h1>
            <p className="text-text/50 text-sm mt-1">
              Log in to continue your learning adventure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Any password (demo mode)"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3.5 bg-primary text-white rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-text/50 text-sm mt-6">
            New to LilGenius?{" "}
            <Link
              href={`/${locale}/register`}
              className="text-primary font-semibold hover:underline"
            >
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
