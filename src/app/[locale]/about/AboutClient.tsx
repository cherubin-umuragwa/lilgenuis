"use client";

import React from "react";
import { PageTransition } from "@/components/shared/PageTransition";
import { ShieldCheck, Heart, Star, BookCheck } from "lucide-react";

const values = [
  {
    Icon: Heart,
    title: "Inclusive",
    desc: "Built for all children, everywhere, regardless of background or location.",
  },
  {
    Icon: ShieldCheck,
    title: "Safe",
    desc: "No ads, no tracking, no inappropriate content — ever.",
  },
  {
    Icon: Star,
    title: "Joyful",
    desc: "Learning should feel like play. We design every lesson with that in mind.",
  },
  {
    Icon: BookCheck,
    title: "Rigorous",
    desc: "Content that meets real educational standards and is reviewed by educators.",
  },
];

export function AboutClient() {
  return (
    <PageTransition className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
          About LilGenius
        </h1>
        <p className="text-text/60 text-xl max-w-2xl mx-auto">
          A joyful learning universe built for curious minds aged 6 to 12.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-primary/5 rounded-3xl p-8">
        <h2 className="font-heading text-2xl font-bold text-text mb-4">
          Our Mission
        </h2>
        <p className="text-text/70 text-lg leading-relaxed">
          LilGenius was created to give every child — regardless of where they
          live — access to joyful, high-quality learning. We believe curiosity
          is the greatest engine of achievement, and our platform is built to
          keep that flame burning. Starting with English and French, we are
          expanding to serve every young learner across Africa and beyond.
        </p>
      </div>

      {/* Story */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-text mb-4">
          Our Story
        </h2>
        <p className="text-text/70 text-lg leading-relaxed">
          LilGenius was founded by educators and technologists who saw firsthand
          how children across Africa hunger for engaging, relevant learning
          experiences. Traditional textbooks alone are not enough. Children need
          interactive, visual, playful tools that meet them where they are.
          Every mascot, every animation, every quiz has been crafted to delight
          and inspire the next generation of thinkers, scientists, artists, and
          explorers.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-text mb-6">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-text mb-1">{title}</h3>
                <p className="text-text/60 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-blue/5 rounded-3xl p-8">
        <h2 className="font-heading text-2xl font-bold text-text mb-4">
          Built with Heart
        </h2>
        <p className="text-text/70 text-lg leading-relaxed">
          Every lesson, every mascot, every animation has been crafted to
          delight and inspire children aged 6 to 12. We work alongside
          educators to ensure our content is accurate, curriculum-aligned, and
          genuinely fun. We are a small, passionate team on a big mission.
        </p>
      </div>
    </PageTransition>
  );
}
