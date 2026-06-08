'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RomanticEffectsProps {
  enabled?: boolean;
}

export default function RomanticEffects({ enabled = true }: RomanticEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Hearts */}
      <FloatingHearts />
      {/* Love Particle System */}
      <LoveParticles />
      {/* Romantic Fade Animations */}
      <RomanticGlow />
      {/* Soft Glow Effects */}
      <SoftGlow />
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 30],
            rotate: [0, 15, -15, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
        </motion.div>
      ))}
    </>
  );
}

function LoveParticles() {
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
          className="absolute w-2 h-2 bg-pink-300 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
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

function RomanticGlow() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-pink-500/10"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function SoftGlow() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-pink-500/5"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
