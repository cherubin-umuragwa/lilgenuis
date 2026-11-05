"use client";

import React from "react";
import Link from "next/link";
import { PageTransition } from "@/components/shared/PageTransition";
import { BookOpen, BarChart2, Languages, FileText } from "lucide-react";
import type { Locale } from "@/types";

interface TeachersClientProps {
  locale: Locale;
}

const sections = [
  {
    Icon: BookOpen,
    title: "Classroom Ready",
    body: "Every subject on LilGenius is aligned to primary school curricula. Use lessons as warm-ups, homework tasks, or revision activities. Content is reviewed against curricula across African education systems and benchmarked internationally.",
  },
  {
    Icon: BarChart2,
    title: "Track Student Progress",
    body: "See which topics each student has studied, where they excelled, and where they may need extra support. Progress is visible at a glance on each student's dashboard.",
  },
  {
    Icon: Languages,
    title: "Bilingual Support",
    body: "Perfect for bilingual classrooms. Students can switch between English and French without losing any progress, making LilGenius ideal for immersion and dual-language programs.",
  },
  {
    Icon: FileText,
    title: "Educator Resources",
    body: "We provide lesson summaries and topic guides so teachers can preview content before assigning it to students. Upcoming features will include direct assignment and class management tools.",
  },
];

const faqs = [
  {
    q: "Can I assign specific lessons?",
    a: "Students can navigate freely to any lesson. We are working on a teacher dashboard to enable direct assignment.",
  },
  {
    q: "Is the content curriculum-aligned?",
    a: "Yes. All content is reviewed against primary school curricula across African education systems and benchmarked internationally.",
  },
];

export function TeachersClient({ locale }: TeachersClientProps) {
  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
          For Teachers
        </h1>
        <p className="text-text/60 text-xl max-w-xl mx-auto">
          Use LilGenius to complement your classroom and inspire independent
          learners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-turquoise/10 flex items-center justify-center">
              <Icon size={22} className="text-turquoise" />
            </div>
            <h2 className="font-heading font-bold text-text text-lg">{title}</h2>
            <p className="text-text/60 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-text mb-6">
          Teacher FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-background rounded-2xl p-5">
              <h3 className="font-heading font-bold text-text mb-2">{q}</h3>
              <p className="text-text/60 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Get in touch */}
      <div className="bg-turquoise/5 rounded-3xl p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-text mb-3">
          Get in Touch
        </h2>
        <p className="text-text/60 mb-6 max-w-md mx-auto">
          Interested in using LilGenius with your class? We would love to hear
          from you.
        </p>
        <Link
          href={`/${locale}/about`}
          className="inline-flex items-center px-8 py-3.5 bg-turquoise text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          Contact Us
        </Link>
      </div>
    </PageTransition>
  );
}
