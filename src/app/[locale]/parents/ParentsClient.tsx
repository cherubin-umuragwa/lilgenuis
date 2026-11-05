"use client";

import React from "react";
import Link from "next/link";
import { PageTransition } from "@/components/shared/PageTransition";
import { ShieldCheck, BarChart2, Languages, Users } from "lucide-react";
import type { Locale } from "@/types";

interface ParentsClientProps {
  locale: Locale;
}

const sections = [
  {
    Icon: ShieldCheck,
    title: "Safe by Design",
    body: "LilGenius contains no advertisements, no in-app purchases, and no social features. Your child learns in a fully closed, age-appropriate environment. We do not collect unnecessary personal data and we never share information with third parties.",
  },
  {
    Icon: BarChart2,
    title: "Track Every Step",
    body: "See which subjects your child has explored, how many lessons they have completed, and which achievements they have unlocked. Progress is saved automatically so you can check in at any time.",
  },
  {
    Icon: Languages,
    title: "Two Languages, One Platform",
    body: "Switch between English and French at any time. Your child's progress carries across both languages, so they can learn and reinforce concepts in either tongue.",
  },
  {
    Icon: Users,
    title: "Age-Appropriate Content",
    body: "Lessons are tailored to three age groups — 6–8, 9–10, and 11–12 — so the difficulty always matches your child's stage of development.",
  },
];

const faqs = [
  {
    q: "Is LilGenius free?",
    a: "Yes. The core experience is completely free. We are committed to keeping learning accessible for every family.",
  },
  {
    q: "Does my child need an account?",
    a: "A lightweight profile (first name, age group, and preferred language) is all we need. No email address is required.",
  },
  {
    q: "Can I monitor my child's progress?",
    a: "Yes. Log in to your child's account to view their progress dashboard and recent achievements.",
  },
];

export function ParentsClient({ locale }: ParentsClientProps) {
  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
          For Parents
        </h1>
        <p className="text-text/60 text-xl max-w-xl mx-auto">
          Everything you need to support your child's learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon size={22} className="text-primary" />
            </div>
            <h2 className="font-heading font-bold text-text text-lg">{title}</h2>
            <p className="text-text/60 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-text mb-6">
          Frequently Asked Questions
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

      {/* CTA */}
      <div className="text-center bg-primary/5 rounded-3xl p-8">
        <h2 className="font-heading text-2xl font-bold text-text mb-4">
          Help Your Child Get Started
        </h2>
        <p className="text-text/60 mb-6">
          It takes less than two minutes to set up a child profile.
        </p>
        <Link
          href={`/${locale}/onboarding`}
          className="inline-flex items-center px-8 py-3.5 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          Create a Free Profile
        </Link>
      </div>
    </PageTransition>
  );
}
