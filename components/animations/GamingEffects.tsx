'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GamingEffectsProps {
  enabled?: boolean;
}

export default function GamingEffects({ enabled = true }: GamingEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* RGB Neon Glow */}
      <RGBGlow />
      {/* Floating Gaming Particles */}
      <GamingParticles />
      {/* Futuristic HUD */}
      <HUDEffects />
      {/* Animated Borders */}
      <AnimatedBorders />
    </div>
  );
}

function RGBGlow() {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        boxShadow: [
          'inset 0 0 50px rgba(0, 255, 136, 0.1)',
          'inset 0 0 50px rgba(255, 0, 85, 0.1)',
          'inset 0 0 50px rgba(0, 136, 255, 0.1)',
          'inset 0 0 50px rgba(0, 255, 136, 0.1)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function GamingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-green-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
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

function HUDEffects() {
  return (
    <>
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-2 border-green-500/30"
        animate={{
          borderColor: ['rgba(0, 255, 136, 0.3)', 'rgba(0, 255, 136, 0.6)', 'rgba(0, 255, 136, 0.3)'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-2 border-green-500/30"
        animate={{
          borderColor: ['rgba(0, 255, 136, 0.3)', 'rgba(0, 255, 136, 0.6)', 'rgba(0, 255, 136, 0.3)'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 border-2 border-green-500/30"
        animate={{
          borderColor: ['rgba(0, 255, 136, 0.3)', 'rgba(0, 255, 136, 0.6)', 'rgba(0, 255, 136, 0.3)'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-16 h-16 border-2 border-green-500/30"
        animate={{
          borderColor: ['rgba(0, 255, 136, 0.3)', 'rgba(0, 255, 136, 0.6)', 'rgba(0, 255, 136, 0.3)'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </>
  );
}

function AnimatedBorders() {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  );
}
