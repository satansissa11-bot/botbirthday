'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DarkEffectsProps {
  enabled?: boolean;
}

export default function DarkEffects({ enabled = true }: DarkEffectsProps) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Moving Stars */}
      <MovingStars />
      {/* Cosmic Particles */}
      <CosmicParticles />
      {/* Neon Effects */}
      <NeonEffects />
      {/* Dark Ambient Animations */}
      <DarkAmbient />
    </div>
  );
}

function MovingStars() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setStars(newStars);
  }, []);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Star 
            className="text-purple-400 fill-purple-400" 
            style={{ width: star.size * 4, height: star.size * 4 }}
          />
        </motion.div>
      ))}
    </>
  );
}

function CosmicParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
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
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

function NeonEffects() {
  return (
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: ['0 0 10px #8B5CF6', '0 0 20px #8B5CF6', '0 0 10px #8B5CF6'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: ['0 0 10px #8B5CF6', '0 0 20px #8B5CF6', '0 0 10px #8B5CF6'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}

function DarkAmbient() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-indigo-900/10"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
