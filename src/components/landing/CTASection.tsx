"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/types";

interface CTASectionProps {
  locale: Locale;
}

export function CTASection({ locale }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Learning Adventure?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Join thousands of children who are discovering the joy of learning
            with LilGenius.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/onboarding`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-2xl font-semibold text-lg hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
