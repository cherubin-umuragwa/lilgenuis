import React from "react";
import type { CharacterType } from "@/types";
import { cn } from "@/lib/utils/cn";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name: string;
  character?: CharacterType;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { dim: string; text: string; svgSize: number }> =
  {
    sm: { dim: "w-8 h-8", text: "text-xs", svgSize: 28 },
    md: { dim: "w-12 h-12", text: "text-sm", svgSize: 44 },
    lg: { dim: "w-16 h-16", text: "text-base", svgSize: 60 },
    xl: { dim: "w-24 h-24", text: "text-xl", svgSize: 90 },
  };

const characterColors: Record<CharacterType, { bg: string; initials: string }> =
  {
    explorer: { bg: "bg-primary", initials: "text-white" },
    scientist: { bg: "bg-turquoise", initials: "text-white" },
    artist: { bg: "bg-coral", initials: "text-white" },
  };

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CharacterIcon({
  character,
  size,
}: {
  character: CharacterType;
  size: number;
}) {
  const fills: Record<CharacterType, { body: string; detail: string }> = {
    explorer: { body: "#7656E8", detail: "#FFD65A" },
    scientist: { body: "#36CFC9", detail: "#4395F5" },
    artist: { body: "#FF786B", detail: "#FF91B8" },
  };

  const { body, detail } = fills[character];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {/* Body */}
      <circle cx="20" cy="20" r="18" fill={body} />
      {/* Face */}
      <circle cx="20" cy="16" r="7" fill="#FFF3E0" />
      {/* Eyes */}
      <circle cx="17" cy="15" r="1.4" fill="#272747" />
      <circle cx="23" cy="15" r="1.4" fill="#272747" />
      {/* Smile */}
      <path
        d="M17 18.5 Q20 21 23 18.5"
        stroke="#272747"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hat / detail per character */}
      {character === "explorer" && (
        <path
          d="M12 13 Q20 6 28 13"
          stroke={detail}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {character === "scientist" && (
        <>
          <rect x="16" y="7" width="8" height="5" rx="2" fill={detail} />
          <line
            x1="20"
            y1="7"
            x2="20"
            y2="9"
            stroke={body}
            strokeWidth="1.5"
          />
        </>
      )}
      {character === "artist" && (
        <circle cx="20" cy="9" r="3" fill={detail} />
      )}
    </svg>
  );
}

export function Avatar({ name, character, size = "md", className }: AvatarProps) {
  const { dim, text, svgSize } = sizeMap[size];

  if (character) {
    return (
      <div
        className={cn(
          dim,
          "rounded-full overflow-hidden flex items-center justify-center",
          characterColors[character].bg,
          className
        )}
        aria-label={`${character} avatar`}
      >
        <CharacterIcon character={character} size={svgSize} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        dim,
        "rounded-full bg-primary flex items-center justify-center",
        className
      )}
      aria-label={`${name} avatar`}
    >
      <span className={cn("font-bold text-white font-heading", text)}>
        {getInitials(name)}
      </span>
    </div>
  );
}
