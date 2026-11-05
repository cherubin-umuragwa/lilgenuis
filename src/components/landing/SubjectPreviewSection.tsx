"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import type { Locale, Subject } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

interface SubjectPreviewSectionProps {
  locale: Locale;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function SubjectPreviewSection({ locale }: SubjectPreviewSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-4">
            What Will You Discover Today?
          </h2>
          <p className="text-text/60 text-lg max-w-xl mx-auto">
            From numbers to nature, from maps to code — every curiosity has a
            home here.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {subjects.map((subject) => (
            <motion.div key={subject.id} variants={itemVariants}>
              <Link href={`/${locale}/subjects/${subject.id}`}>
                <div
                  className={`${subject.bgColor} rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow cursor-pointer h-full`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <SubjectIcon subjectId={subject.id} size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-text text-sm sm:text-base">
                    {subject.nameEn}
                  </h3>
                  <p className="text-text/60 text-xs sm:text-sm leading-relaxed">
                    {subject.descriptionEn}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
