'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface KenBurnsImageProps {
  src: string;
  alt: string;
  duration?: number;
  scale?: number;
  className?: string;
}

export default function KenBurnsImage({
  src,
  alt,
  duration = 10,
  scale = 1.1,
  className = ''
}: KenBurnsImageProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        animate={{
          scale: [1, scale, 1],
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </motion.div>
  );
}
