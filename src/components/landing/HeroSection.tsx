"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ExplorerMascot,
  ScientistMascot,
  ArtistMascot,
} from "@/components/characters/MascotSVG";
import type { Locale } from "@/types";

interface HeroSectionProps {
  locale: Locale;
}

const mascots = [ExplorerMascot, ScientistMascot, ArtistMascot];

export function HeroSection({ locale }: HeroSectionProps) {
  const [mascotIndex, setMascotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMascotIndex((i) => (i + 1) % mascots.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const CurrentMascot = mascots[mascotIndex];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-blue/5 py-16 sm:py-24">
      {/* Background decorative circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Text side */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Trusted by families across Africa
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6"
          >
            Big Dreams Start With Little Discoveries.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text/70 max-w-xl mx-auto lg:mx-0 mb-8 font-body"
          >
            LilGenius is the colorful learning universe where curious kids aged
            6–12 explore math, science, geography, history, languages, and more
            — through play.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href={`/${locale}/onboarding`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              Start Learning Free
            </Link>
            <Link
              href={`/${locale}/subjects`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-2xl font-semibold text-lg hover:bg-primary/10 transition-colors"
            >
              Explore Subjects
            </Link>
          </motion.div>
        </motion.div>

        {/* Mascot side */}
        <div className="flex-1 flex items-center justify-center w-full max-w-sm lg:max-w-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={mascotIndex}
              initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-64 h-64 sm:w-80 sm:h-80"
            >
              <CurrentMascot className="w-full h-full drop-shadow-xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
