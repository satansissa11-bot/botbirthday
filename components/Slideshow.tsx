'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SlideshowProps {
  photos: string[];
  autoPlay?: boolean;
  interval?: number;
  kenBurns?: boolean;
  coverPhoto?: string;
}

export default function Slideshow({ photos, autoPlay = true, interval = 3000, kenBurns = true, coverPhoto }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Reorder photos to put cover photo first
  const orderedPhotos = coverPhoto && photos.includes(coverPhoto)
    ? [coverPhoto, ...photos.filter(p => p !== coverPhoto)]
    : photos;

  useEffect(() => {
    if (!autoPlay || orderedPhotos.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % orderedPhotos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, orderedPhotos.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + orderedPhotos.length) % orderedPhotos.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % orderedPhotos.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1,
    }),
  };

  if (orderedPhotos.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No photos uploaded</p>
      </div>
    );
  }

  if (orderedPhotos.length === 1) {
    return (
      <div className="w-full h-full">
        {kenBurns ? (
          <KenBurnsImage src={orderedPhotos[0]} alt="Birthday photo" duration={10} scale={1.1} />
        ) : (
          <img
            src={orderedPhotos[0]}
            alt="Birthday photo"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={currentIndex}
          src={orderedPhotos[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            kenBurns && 'ken-burns'
          )}
          style={kenBurns ? {
            animation: `kenBurns ${interval * 2}ms ease-in-out infinite alternate`,
          } : {}}
        />
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 z-10"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 z-10"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {orderedPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
            )}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function KenBurnsImage({ src, alt, duration = 10, scale = 1.1 }: { src: string; alt: string; duration?: number; scale?: number }) {
  return (
    <motion.div
      className="w-full h-full"
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
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
