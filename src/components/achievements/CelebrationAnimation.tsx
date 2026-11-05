"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_COLORS = [
  "#7656E8",
  "#4395F5",
  "#36CFC9",
  "#FF786B",
  "#FFD65A",
  "#FF91B8",
  "#70DDB0",
  "#7656E8",
  "#4395F5",
  "#FF786B",
  "#FFD65A",
  "#36CFC9",
];

interface Particle {
  color: string;
  x: number;
  y: number;
  size: number;
}

function buildParticles(): Particle[] {
  return PARTICLE_COLORS.map((color, i) => {
    const angle = (i / PARTICLE_COLORS.length) * 2 * Math.PI;
    const distance = 120 + Math.random() * 80;
    return {
      color,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 10 + Math.random() * 12,
    };
  });
}

interface CelebrationAnimationProps {
  onDismiss?: () => void;
}

export function CelebrationAnimation({ onDismiss }: CelebrationAnimationProps) {
  const [visible, setVisible] = useState(true);
  // Particles computed once on mount — not during render
  const [particles] = useState<Particle[]>(buildParticles);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: [0, 1.2, 0.8],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: i * 0.04,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
