// Shared vivid subject color theme.
//
// Educational content files (src/content/subjects/*) carry only pale `bgColor`
// (`bg-*/10`) and `text-*` `color` fields that must not be edited. To give every
// subject a distinct, vivid toy-shop identity without touching content, this
// module maps each `subject.id` to a vivid solid Tailwind background band plus
// matching text/border/ring classes. Reused by SubjectCard, the dashboard
// SubjectGrid, and the landing SubjectPreviewSection.

export interface SubjectTheme {
  /** Vivid solid background class for the header band / tile. */
  band: string;
  /** Text color class to use on top of `band` (white or dark for legibility). */
  bandText: string;
  /** Matching border color class (used for top accent borders). */
  border: string;
  /** Matching ring color class (focus styles). */
  ring: string;
}

export const subjectTheme: Record<string, SubjectTheme> = {
  mathematics: {
    band: "bg-primary",
    bandText: "text-white",
    border: "border-primary",
    ring: "ring-primary",
  },
  science: {
    band: "bg-turquoise",
    bandText: "text-white",
    border: "border-turquoise",
    ring: "ring-turquoise",
  },
  geography: {
    band: "bg-blue",
    bandText: "text-white",
    border: "border-blue",
    ring: "ring-blue",
  },
  history: {
    band: "bg-coral",
    bandText: "text-white",
    border: "border-coral",
    ring: "ring-coral",
  },
  languages: {
    band: "bg-pink",
    bandText: "text-white",
    border: "border-pink",
    ring: "ring-pink",
  },
  "general-knowledge": {
    band: "bg-yellow",
    bandText: "text-text",
    border: "border-yellow",
    ring: "ring-yellow",
  },
  logic: {
    band: "bg-mint",
    bandText: "text-text",
    border: "border-mint",
    ring: "ring-mint",
  },
  programming: {
    band: "bg-sky",
    bandText: "text-white",
    border: "border-sky",
    ring: "ring-sky",
  },
};

const fallback = subjectTheme.mathematics;

export function getSubjectTheme(id: string): SubjectTheme {
  return subjectTheme[id] ?? fallback;
}
