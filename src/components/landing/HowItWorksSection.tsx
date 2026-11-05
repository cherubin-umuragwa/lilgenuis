"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { BookOpen, Zap, Brain, Trophy } from "lucide-react";

const steps = [
  {
    number: "01",
    Icon: BookOpen,
    title: "Choose Your Subject",
    description:
      "Browse eight subjects — from mathematics to programming — and pick the one that sparks your curiosity today.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    number: "02",
    Icon: Zap,
    title: "Learn at Your Pace",
    description:
      "Each lesson breaks learning into short, playful steps. Go fast or take it slow — LilGenius adapts to you.",
    color: "text-blue",
    bg: "bg-blue/10",
  },
  {
    number: "03",
    Icon: Brain,
    title: "Test Your Knowledge",
    description:
      "Take a quick quiz at the end of each lesson to check what you have learned and earn your points.",
    color: "text-turquoise",
    bg: "bg-turquoise/10",
  },
  {
    number: "04",
    Icon: Trophy,
    title: "Earn Achievements",
    description:
      "Complete lessons, keep your streak alive, and unlock shiny achievement badges to show off your progress.",
    color: "text-yellow",
    bg: "bg-yellow/10",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            How LilGenius Works
          </h2>
          <p className="text-text/60 text-lg max-w-xl mx-auto">
            Four simple steps to spark a lifelong love of learning.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center`}
                >
                  <step.Icon size={28} className={step.color} />
                </div>
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-text text-white text-xs font-bold flex items-center justify-center font-body">
                  {step.number}
                </span>
              </div>
              <h3 className="font-heading font-bold text-text text-lg">
                {step.title}
              </h3>
              <p className="text-text/60 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
