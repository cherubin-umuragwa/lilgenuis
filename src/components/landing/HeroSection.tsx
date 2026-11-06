"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ExplorerMascot,
  ScientistMascot,
  ArtistMascot,
  SunWithRays,
  CloudShape,
} from "@/components/characters/MascotSVG";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { ROUTES } from "@/lib/utils/routes";
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
    /* bg-sky gradient — pulls up behind the floating navbar with -mt */
    <section className="relative overflow-hidden bg-gradient-to-b from-sky to-blue pt-28 sm:pt-36 -mt-16">
      {/* Sun top-left — pushed down so it breathes below the navbar */}
      <SunWithRays className="pointer-events-none absolute top-16 left-4 lg:top-20 lg:left-8 w-28 h-28 lg:w-36 lg:h-36" />
      {/* Clouds scattered */}
      <CloudShape className="pointer-events-none absolute top-6 right-2 w-48 sm:w-64 opacity-90" />
      <CloudShape className="pointer-events-none absolute top-1/3 left-0 w-36 sm:w-44 opacity-80" />
      <CloudShape className="pointer-events-none absolute bottom-1/3 right-1/4 w-28 opacity-70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-12">
        {/* Text side */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Big Dreams Start With Little Discoveries.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 mb-8 font-body"
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
              href={ROUTES.onboarding(locale)}
              className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white rounded-full font-bold text-lg hover:brightness-105 transition shadow-lg shadow-coral/40"
            >
              Start Learning Free
            </Link>
            <Link
              href={ROUTES.subjects(locale)}
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow text-text rounded-full font-bold text-lg hover:brightness-105 transition shadow-lg shadow-yellow/40"
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
              <CurrentMascot className="w-full h-full drop-shadow-2xl" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Wavy transition into the white content section */}
      <WaveDivider fill="#FFFFFF" className="h-[60px] sm:h-[100px]" />
    </section>
  );
}
