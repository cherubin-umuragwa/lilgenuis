import React from "react";
import { cn } from "@/lib/utils/cn";

type IllustrationType =
  | "no-content"
  | "no-results"
  | "no-achievements"
  | "start-learning";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: EmptyStateAction;
  illustration?: IllustrationType;
  className?: string;
}

function Illustration({ type }: { type: IllustrationType }) {
  switch (type) {
    case "no-results":
      return (
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="#F0EDFF" />
          <circle cx="52" cy="54" r="18" stroke="#7656E8" strokeWidth="4" fill="none" />
          <line x1="65" y1="67" x2="80" y2="82" stroke="#7656E8" strokeWidth="4" strokeLinecap="round" />
          <line x1="45" y1="49" x2="59" y2="49" stroke="#7656E8" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="56" x2="56" y2="56" stroke="#7656E8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "no-achievements":
      return (
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="#FFF9E6" />
          <polygon
            points="60,28 67,50 92,50 72,64 80,86 60,72 40,86 48,64 28,50 53,50"
            fill="#FFD65A"
            stroke="#F0B800"
            strokeWidth="2"
          />
        </svg>
      );

    case "start-learning":
      return (
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="#E8F7F2" />
          <rect x="38" y="40" width="44" height="52" rx="6" fill="#70DDB0" />
          <rect x="44" y="48" width="32" height="4" rx="2" fill="white" />
          <rect x="44" y="58" width="32" height="4" rx="2" fill="white" />
          <rect x="44" y="68" width="20" height="4" rx="2" fill="white" />
          <circle cx="78" cy="42" r="12" fill="#4395F5" />
          <polygon points="76,38 76,46 83,42" fill="white" />
        </svg>
      );

    // no-content (default)
    default:
      return (
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="60" cy="60" r="50" fill="#F5F3FF" />
          <rect x="36" y="36" width="48" height="56" rx="8" fill="#C4B8FA" />
          <rect x="44" y="52" width="32" height="4" rx="2" fill="white" />
          <rect x="44" y="62" width="24" height="4" rx="2" fill="white" />
          <circle cx="60" cy="42" r="6" fill="white" />
        </svg>
      );
  }
}

export function EmptyState({
  title,
  description,
  action,
  illustration = "no-content",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      )}
    >
      <Illustration type={illustration} />
      <h3 className="text-xl font-bold text-text font-heading">{title}</h3>
      {description && (
        <p className="text-gray-500 font-body max-w-xs">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
