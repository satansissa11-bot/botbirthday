'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LuxuryEffectsProps {
  enabled?: boolean;
}

export default function LuxuryEffects({ enabled = true }: LuxuryEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gold Shimmer Animation */}
      <GoldShimmer />
      {/* Elegant Sparkles */}
      <LuxurySparkles />
      {/* Premium Transitions */}
      <PremiumGlow />
    </div>
  );
}

function GoldShimmer() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
      animate={{
        x: ['-100%', '200%'],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function LuxurySparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2.5,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-3 h-3 bg-yellow-400 rotate-45" />
        </motion.div>
      ))}
    </>
  );
}

function PremiumGlow() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
