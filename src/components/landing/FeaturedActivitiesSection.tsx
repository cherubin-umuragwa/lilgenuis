"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import type { Locale } from "@/types";

interface FeaturedActivitiesSectionProps {
  locale: Locale;
}

const activities = [
  {
    subject: "mathematics",
    subjectName: "Mathematics",
    title: "Counting to 100",
    difficulty: "Beginner",
    difficultyColor: "bg-mint/20 text-mint",
    duration: 10,
    lessonId: "counting-100",
  },
  {
    subject: "science",
    subjectName: "Science",
    title: "The Water Cycle",
    difficulty: "Intermediate",
    difficultyColor: "bg-blue/20 text-blue",
    duration: 15,
    lessonId: "water-cycle",
  },
  {
    subject: "geography",
    subjectName: "Geography",
    title: "Continents and Oceans",
    difficulty: "Beginner",
    difficultyColor: "bg-mint/20 text-mint",
    duration: 12,
    lessonId: "continents-oceans",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function FeaturedActivitiesSection({ locale }: FeaturedActivitiesSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            Featured Activities
          </h2>
          <p className="text-text/60 text-lg max-w-xl mx-auto">
            Discover what children are loving right now.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.lessonId}
              variants={itemVariants}
              className="bg-background rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <SubjectIcon subjectId={activity.subject} size={20} />
                </div>
                <span className="text-text/50 text-sm font-semibold">{activity.subjectName}</span>
              </div>

              <h3 className="font-heading font-bold text-text text-lg">
                {activity.title}
              </h3>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${activity.difficultyColor}`}>
                  {activity.difficulty}
                </span>
                <span className="flex items-center gap-1 text-text/50 text-xs">
                  <Clock size={12} />
                  {activity.duration} min
                </span>
              </div>

              <Link
                href={`/${locale}/subjects/${activity.subject}/lessons/${activity.lessonId}`}
                className="mt-auto inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Try It
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
