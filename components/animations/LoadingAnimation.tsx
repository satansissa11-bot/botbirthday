'use client';

import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  size?: number;
  color?: string;
}

export default function LoadingAnimation({ size = 40, color = '#8B5CF6' }: LoadingAnimationProps) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-4"
            style={{
              borderColor: color,
              borderTopColor: 'transparent',
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
