"use client";

import React from "react";
import {
  Calculator,
  FlaskConical,
  Globe,
  BookOpen,
  MessageSquare,
  Lightbulb,
  Brain,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SubjectIconProps {
  subjectId: string;
  size?: number;
  className?: string;
}

const iconMap: Record<string, { Icon: React.ElementType; colorClass: string }> = {
  mathematics: { Icon: Calculator, colorClass: "text-primary" },
  science: { Icon: FlaskConical, colorClass: "text-turquoise" },
  geography: { Icon: Globe, colorClass: "text-blue" },
  history: { Icon: BookOpen, colorClass: "text-coral" },
  languages: { Icon: MessageSquare, colorClass: "text-pink" },
  "general-knowledge": { Icon: Lightbulb, colorClass: "text-yellow" },
  logic: { Icon: Brain, colorClass: "text-mint" },
  programming: { Icon: Code, colorClass: "text-primary" },
};

export function SubjectIcon({ subjectId, size = 24, className }: SubjectIconProps) {
  const entry = iconMap[subjectId] ?? { Icon: BookOpen, colorClass: "text-primary" };
  const { Icon, colorClass } = entry;
  // If a className is passed it overrides the default colorClass
  return <Icon size={size} className={className ?? colorClass} />;
}
