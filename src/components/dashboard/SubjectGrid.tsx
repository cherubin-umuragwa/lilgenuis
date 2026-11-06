"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { getSubjectTheme } from "@/components/shared/subjectColors";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale, Subject, StudentProgress } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

interface SubjectGridProps {
  locale: Locale;
  progress: StudentProgress | null;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function SubjectGrid({ locale, progress }: SubjectGridProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="font-heading font-bold text-text text-lg mb-5">
        My Subjects
      </h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {subjects.map((subject) => {
          const subjectProgress = progress?.subjectProgress[subject.id];
          const completed = subjectProgress?.lessonsCompleted.length ?? 0;
          const total = subject.totalLessons;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const theme = getSubjectTheme(subject.id);

          return (
            <motion.button
              key={subject.id}
              variants={itemVariants}
              onClick={() => router.push(ROUTES.subject(locale, subject.id))}
              className={`${theme.band} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow text-center ${theme.bandText}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <SubjectIcon subjectId={subject.id} size={24} />
              </div>
              <span className="font-heading font-bold text-xs sm:text-sm leading-tight">
                {subject.nameEn}
              </span>
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs">{pct}%</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
