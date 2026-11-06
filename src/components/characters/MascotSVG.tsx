"use client";

import React from "react";

// ─── Explorer Mascot ──────────────────────────────────────────────────────────
export function ExplorerMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-label="Explorer mascot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="60" y="100" width="80" height="70" rx="30" fill="#7656E8" />
      {/* Head */}
      <circle cx="100" cy="78" r="38" fill="#FFF3E0" />
      {/* Explorer hat brim */}
      <ellipse cx="100" cy="44" rx="44" ry="10" fill="#4395F5" />
      {/* Hat crown */}
      <rect x="72" y="20" width="56" height="28" rx="14" fill="#4395F5" />
      {/* Hat band */}
      <rect x="72" y="38" width="56" height="8" rx="4" fill="#FFD65A" />
      {/* White sparkle dot on head */}
      <path
        d="M100 14 L102 21 L109 23 L102 25 L100 32 L98 25 L91 23 L98 21 Z"
        fill="white"
      />
      {/* Eyes */}
      <circle cx="87" cy="80" r="7" fill="white" />
      <circle cx="113" cy="80" r="7" fill="white" />
      <circle cx="89" cy="80" r="4" fill="#272747" />
      <circle cx="115" cy="80" r="4" fill="#272747" />
      {/* Eye shine */}
      <circle cx="91" cy="78" r="1.5" fill="white" />
      <circle cx="117" cy="78" r="1.5" fill="white" />
      {/* Smile */}
      <path
        d="M88 94 Q100 105 112 94"
        stroke="#272747"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cheeks */}
      <circle cx="80" cy="92" r="7" fill="#FFB8A0" opacity="0.6" />
      <circle cx="120" cy="92" r="7" fill="#FFB8A0" opacity="0.6" />
      {/* Arms */}
      <rect
        x="18"
        y="105"
        width="46"
        height="22"
        rx="11"
        fill="#7656E8"
        transform="rotate(-20 40 116)"
      />
      <rect
        x="136"
        y="105"
        width="46"
        height="22"
        rx="11"
        fill="#7656E8"
        transform="rotate(20 160 116)"
      />
      {/* Feet */}
      <ellipse cx="82" cy="172" rx="18" ry="10" fill="#4395F5" />
      <ellipse cx="118" cy="172" rx="18" ry="10" fill="#4395F5" />
    </svg>
  );
}

// ─── Scientist Mascot ─────────────────────────────────────────────────────────
export function ScientistMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-label="Scientist mascot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lab coat body */}
      <rect x="58" y="102" width="84" height="68" rx="28" fill="white" />
      {/* Coat lapels */}
      <path d="M100 110 L75 130 L85 130 Z" fill="#36CFC9" />
      <path d="M100 110 L125 130 L115 130 Z" fill="#36CFC9" />
      {/* Head */}
      <circle cx="100" cy="76" r="38" fill="#FFF3E0" />
      {/* White sparkle dot on head */}
      <path
        d="M100 40 L102 47 L109 49 L102 51 L100 58 L98 51 L91 49 L98 47 Z"
        fill="white"
      />
      {/* Goggles frame */}
      <rect x="68" y="64" width="64" height="26" rx="13" fill="#36CFC9" />
      <circle cx="86" cy="77" r="9" fill="white" />
      <circle cx="114" cy="77" r="9" fill="white" />
      <circle cx="86" cy="77" r="5" fill="#272747" />
      <circle cx="114" cy="77" r="5" fill="#272747" />
      {/* Eye shine */}
      <circle cx="88" cy="75" r="1.5" fill="white" />
      <circle cx="116" cy="75" r="1.5" fill="white" />
      {/* Goggle strap */}
      <rect x="62" y="73" width="8" height="6" rx="3" fill="#36CFC9" />
      <rect x="130" y="73" width="8" height="6" rx="3" fill="#36CFC9" />
      {/* Smile */}
      <path
        d="M88 96 Q100 107 112 96"
        stroke="#272747"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arms */}
      <rect
        x="18"
        y="107"
        width="44"
        height="20"
        rx="10"
        fill="white"
        transform="rotate(-18 40 117)"
      />
      <rect
        x="138"
        y="107"
        width="44"
        height="20"
        rx="10"
        fill="white"
        transform="rotate(18 160 117)"
      />
      {/* Flask in right hand */}
      <rect x="165" y="118" width="14" height="22" rx="5" fill="#4395F5" opacity="0.8" />
      <rect x="162" y="115" width="20" height="6" rx="3" fill="#4395F5" />
      {/* Feet */}
      <ellipse cx="82" cy="172" rx="18" ry="10" fill="#36CFC9" />
      <ellipse cx="118" cy="172" rx="18" ry="10" fill="#36CFC9" />
    </svg>
  );
}

// ─── Artist Mascot ────────────────────────────────────────────────────────────
export function ArtistMascot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-label="Artist mascot"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="60" y="100" width="80" height="70" rx="30" fill="#FF786B" />
      {/* Apron */}
      <rect x="72" y="108" width="56" height="58" rx="16" fill="#FF91B8" />
      {/* Head */}
      <circle cx="100" cy="76" r="38" fill="#FFF3E0" />
      {/* Beret */}
      <ellipse cx="100" cy="42" rx="36" ry="12" fill="#FF786B" />
      <circle cx="100" cy="36" r="18" fill="#FF786B" />
      <circle cx="116" cy="34" r="5" fill="#FFD65A" />
      {/* White sparkle dot on head */}
      <path
        d="M92 18 L94 25 L101 27 L94 29 L92 36 L90 29 L83 27 L90 25 Z"
        fill="white"
      />
      {/* Eyes */}
      <circle cx="87" cy="78" r="7" fill="white" />
      <circle cx="113" cy="78" r="7" fill="white" />
      <circle cx="87" cy="78" r="4" fill="#272747" />
      <circle cx="113" cy="78" r="4" fill="#272747" />
      {/* Eye shine */}
      <circle cx="89" cy="76" r="1.5" fill="white" />
      <circle cx="115" cy="76" r="1.5" fill="white" />
      {/* Happy mouth */}
      <path
        d="M88 94 Q100 108 112 94"
        stroke="#272747"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cheeks */}
      <circle cx="80" cy="90" r="7" fill="#FF91B8" opacity="0.6" />
      <circle cx="120" cy="90" r="7" fill="#FF91B8" opacity="0.6" />
      {/* Arms */}
      <rect
        x="18"
        y="105"
        width="46"
        height="22"
        rx="11"
        fill="#FF786B"
        transform="rotate(-20 40 116)"
      />
      <rect
        x="136"
        y="105"
        width="46"
        height="22"
        rx="11"
        fill="#FF786B"
        transform="rotate(20 160 116)"
      />
      {/* Paintbrush in right hand */}
      <rect x="166" y="110" width="6" height="30" rx="3" fill="#70DDB0" />
      <ellipse cx="169" cy="108" rx="5" ry="8" fill="#7656E8" />
      {/* Feet */}
      <ellipse cx="82" cy="172" rx="18" ry="10" fill="#FF91B8" />
      <ellipse cx="118" cy="172" rx="18" ry="10" fill="#FF91B8" />
    </svg>
  );
}

// ─── LilGenius Logo SVG ───────────────────────────────────────────────────────
export function LilGeniusLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-label="LilGenius logo"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Star */}
      <polygon
        points="20,4 23,14 34,14 25,21 28,32 20,25 12,32 15,21 6,14 17,14"
        fill="#7656E8"
      />
      {/* Book pages (bottom of star, overlapping) */}
      <rect x="13" y="22" width="14" height="10" rx="3" fill="#4395F5" />
      <rect x="15" y="24" width="10" height="2" rx="1" fill="white" />
      <rect x="15" y="28" width="8" height="2" rx="1" fill="white" />
      {/* Shine on star */}
      <circle cx="23" cy="10" r="1.5" fill="#FFD65A" />
    </svg>
  );
}

// ─── Sun With Rays (hero decoration) ───────────────────────────────────────────
export function SunWithRays({
  className,
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  const cx = 100;
  const cy = 100;
  const inner = 50;
  const outer = 80;
  const half = 7 * (Math.PI / 180); // ray half-width in radians

  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const a1 = angle - half;
    const a2 = angle + half;
    const x1 = cx + inner * Math.cos(a1);
    const y1 = cy + inner * Math.sin(a1);
    const x2 = cx + outer * Math.cos(angle);
    const y2 = cy + outer * Math.sin(angle);
    const x3 = cx + inner * Math.cos(a2);
    const y3 = cy + inner * Math.sin(a2);
    return `${x1.toFixed(1)},${y1.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}`;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rays.map((points, i) => (
        <polygon key={i} points={points} fill="#FFD93D" />
      ))}
      <circle cx={cx} cy={cy} r="46" fill="#FFD93D" />
    </svg>
  );
}

// ─── Cloud Shape (hero / section decoration & dividers) ────────────────────────
export function CloudShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 160"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="white">
        <circle cx="120" cy="92" r="58" />
        <ellipse cx="232" cy="100" rx="82" ry="56" />
        <circle cx="345" cy="86" r="66" />
        <ellipse cx="466" cy="100" rx="78" ry="52" />
        <circle cx="544" cy="100" r="44" />
        <rect x="62" y="100" width="506" height="60" rx="30" />
      </g>
    </svg>
  );
}
