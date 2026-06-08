'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export default function FloatingParticles({ 
  count = 20, 
  color = '#FFFFFF', 
  size = 4,
  speed = 3 
}: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * speed,
    }));
    setParticles(newParticles);
  }, [count, speed]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: speed,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
