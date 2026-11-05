"use client";

import Link from "next/link";
import { LilGeniusLogo } from "@/components/characters/MascotSVG";
import { ArrowLeft } from "lucide-react";

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <LilGeniusLogo size={60} className="mb-6" />

      <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>

      <h2 className="font-heading text-2xl font-bold text-text mb-3">
        Page Not Found
      </h2>

      <p className="text-text/60 text-base max-w-sm mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/en"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
      >
        <ArrowLeft size={16} />
        Go Home
      </Link>
    </div>
  );
}
