'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimeEffectsProps {
  enabled?: boolean;
}

export default function AnimeEffects({ enabled = true }: AnimeEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Falling Sakura Petals */}
      <SakuraPetals />
      {/* Floating Sparkles */}
      <Sparkles />
      {/* Anime Glow Effect */}
      <AnimeGlow />
    </div>
  );
}

function SakuraPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-20px',
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.sin(petal.id) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-4 h-4 bg-pink-300 rounded-full opacity-70" />
        </motion.div>
      ))}
    </>
  );
}

function Sparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
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
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

function AnimeGlow() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
