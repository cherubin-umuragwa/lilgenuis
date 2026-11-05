"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { PageTransition } from "@/components/shared/PageTransition";
import { EmptyState } from "@/components/ui/EmptyState";
import { ROUTES } from "@/lib/utils/routes";
import type { Locale, Subject } from "@/types";

let subjects: Subject[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  subjects = require("@/content/subjects/index").default ?? [];
} catch {
  subjects = [];
}

// Demo activity cards
const allActivities = subjects.flatMap((subject) => [
  {
    id: `${subject.id}-intro`,
    subjectId: subject.id,
    subjectName: subject.nameEn,
    title: `${subject.nameEn} Introduction`,
    difficulty: "beginner" as const,
    duration: 10,
  },
  {
    id: `${subject.id}-core`,
    subjectId: subject.id,
    subjectName: subject.nameEn,
    title: `${subject.nameEn} Core Concepts`,
    difficulty: "intermediate" as const,
    duration: 15,
  },
]);

const difficultyColors: Record<string, string> = {
  beginner: "bg-mint/20 text-mint",
  intermediate: "bg-blue/20 text-blue",
  advanced: "bg-coral/20 text-coral",
};

interface ExploreClientProps {
  locale: Locale;
}

export function ExploreClient({ locale }: ExploreClientProps) {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");

  const filtered = allActivities.filter((a) => {
    const matchesQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(query.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || a.subjectId === subjectFilter;
    const matchesDiff = diffFilter === "all" || a.difficulty === diffFilter;
    return matchesQuery && matchesSubject && matchesDiff;
  });

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text mb-2">
        Explore
      </h1>
      <p className="text-text/60 text-lg mb-8">
        Browse lessons, topics, and activities from all subjects.
      </p>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons and topics..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none font-body text-text"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-sm font-semibold text-text bg-white"
        >
          <option value="all">All Subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nameEn}
            </option>
          ))}
        </select>

        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-sm font-semibold text-text bg-white"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No lessons found"
          description="Try a different search term or adjust the filters."
          illustration="no-results"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <SubjectIcon subjectId={activity.subjectId} size={18} />
                <span className="text-text/50 text-xs font-semibold">
                  {activity.subjectName}
                </span>
              </div>
              <h3 className="font-heading font-bold text-text">{activity.title}</h3>
              <div className="flex items-center gap-2 mt-auto">
                <span
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                    difficultyColors[activity.difficulty]
                  }`}
                >
                  {activity.difficulty.charAt(0).toUpperCase() +
                    activity.difficulty.slice(1)}
                </span>
                <span className="flex items-center gap-1 text-text/40 text-xs">
                  <Clock size={11} />
                  {activity.duration} min
                </span>
              </div>
              <Link
                href={ROUTES.lesson(locale, activity.subjectId, activity.id)}
                className="w-full text-center py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Start
              </Link>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
