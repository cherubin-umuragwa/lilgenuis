"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { BookCheck, Gamepad2, Languages, ShieldCheck, BarChart2, Star } from "lucide-react";

const benefits = [
  {
    Icon: BookCheck,
    title: "Curriculum-Aligned Content",
    description:
      "Every lesson is reviewed against primary school curricula across Africa and benchmarked internationally.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    Icon: Gamepad2,
    title: "Gamified Learning",
    description:
      "Points, streaks, achievements, and level-ups keep children motivated to come back every single day.",
    color: "text-blue",
    bg: "bg-blue/10",
  },
  {
    Icon: Languages,
    title: "Bilingual (EN / FR)",
    description:
      "Full English and French support so every child can learn in their strongest language.",
    color: "text-turquoise",
    bg: "bg-turquoise/10",
  },
  {
    Icon: ShieldCheck,
    title: "Safe and Ad-Free",
    description:
      "No advertisements, no in-app purchases, no social features. A clean environment built entirely for children.",
    color: "text-mint",
    bg: "bg-mint/10",
  },
  {
    Icon: BarChart2,
    title: "Progress Tracking",
    description:
      "Parents and teachers can see exactly which subjects and lessons each child has completed.",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    Icon: Star,
    title: "Fun Challenges",
    description:
      "A fresh daily challenge every morning to sharpen knowledge and reward consistency.",
    color: "text-yellow",
    bg: "bg-yellow/10",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function BenefitsSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            Why Choose LilGenius?
          </h2>
          <p className="text-text/60 text-lg max-w-xl mx-auto">
            Built with educators and parents to support real learning outcomes.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex gap-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center shrink-0`}
              >
                <benefit.Icon size={22} className={benefit.color} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-text mb-2">
                  {benefit.title}
                </h3>
                <p className="text-text/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
