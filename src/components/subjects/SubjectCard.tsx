"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { getSubjectTheme } from "@/components/shared/subjectColors";
import type { Locale, Subject } from "@/types";

interface SubjectCardProps {
  subject: Subject;
  locale: Locale;
  completedLessons?: number;
}

export function SubjectCard({
  subject,
  locale,
  completedLessons = 0,
}: SubjectCardProps) {
  const router = useRouter();
  const total = subject.totalLessons;
  const pct = total > 0 ? Math.round((completedLessons / total) * 100) : 0;

  const theme = getSubjectTheme(subject.id);
  const lessonCountClass =
    theme.bandText === "text-white" ? "text-white/80" : "text-text/70";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => router.push(`/${locale}/subjects/${subject.id}`)}
      className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className={`${theme.band} p-5 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
          <SubjectIcon subjectId={subject.id} size={28} />
        </div>
        <div className="min-w-0">
          <h3 className={`font-heading font-bold ${theme.bandText}`}>
            {subject.nameEn}
          </h3>
          <p className={`${lessonCountClass} text-xs`}>{total} lessons</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-text/60 text-sm leading-relaxed mb-4">
          {subject.descriptionEn}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-text/40 text-xs shrink-0">{pct}%</span>
        </div>
      </div>
    </motion.div>
  );
}
