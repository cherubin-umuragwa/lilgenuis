"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { SubjectCard } from "@/components/subjects/SubjectCard";
import { PageTransition } from "@/components/shared/PageTransition";
import { EmptyState } from "@/components/ui/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";
import type { Locale, Subject } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

interface SubjectsClientProps {
  locale: Locale;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function SubjectsClient({ locale }: SubjectsClientProps) {
  const { profile } = useProfile();
  const { progress } = useProgress(profile?.id ?? null);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-2">
          Choose a Subject
        </h1>
        <p className="text-text/60 text-lg">
          Pick any subject and dive right in.
        </p>
      </div>

      {subjects.length === 0 ? (
        <EmptyState
          title="No subjects available"
          description="Subjects are being loaded. Please check back soon."
          illustration="no-content"
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subjects.map((subject) => {
            const completedLessons =
              progress?.subjectProgress[subject.id]?.lessonsCompleted.length ?? 0;
            return (
              <motion.div key={subject.id} variants={itemVariants}>
                <SubjectCard
                  subject={subject}
                  locale={locale}
                  completedLessons={completedLessons}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </PageTransition>
  );
}
