'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from '@/components/Confetti';

interface GiftOpeningProps {
  template: string;
  onOpen: () => void;
}

export default function GiftOpening({ template, onOpen }: GiftOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const getGiftStyle = () => {
    const styles: { [key: string]: { colors: string[]; icon: string } } = {
      'romantic': { colors: ['#ec4899', '#f472b6', '#fb7185'], icon: '❤️' },
      'romantic-new': { colors: ['#ec4899', '#f472b6', '#fb7185'], icon: '❤️' },
      'cute': { colors: ['#a855f7', '#c084fc', '#d8b4fe'], icon: '🎀' },
      'elegant': { colors: ['#d97706', '#f59e0b', '#fbbf24'], icon: '✨' },
      'dark-luxury': { colors: ['#b45309', '#d97706', '#f59e0b'], icon: '👑' },
      'modern': { colors: ['#3b82f6', '#60a5fa', '#93c5fd'], icon: '🎁' },
      'minimalist': { colors: ['#6b7280', '#9ca3af', '#d1d5db'], icon: '📦' },
      'anime': { colors: ['#ef4444', '#f97316', '#fbbf24'], icon: '🌸' },
      'gaming': { colors: ['#10b981', '#34d399', '#6ee7b7'], icon: '🎮' },
      'luxury': { colors: ['#d97706', '#f59e0b', '#fbbf24'], icon: '💎' },
      'dark': { colors: ['#6366f1', '#818cf8', '#a5b4fc'], icon: '🌙' },
    };
    return styles[template] || styles['modern'];
  };

  const giftStyle = getGiftStyle();

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setShowConfetti(true);
      setTimeout(() => {
        onOpen();
      }, 1500);
    }, 800);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Sparkle Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gift Box */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative"
          >
            {/* Gift Box */}
            <motion.div
              animate={isOpening ? {
                scale: [1, 1.2, 0],
                rotate: [0, 10, -10, 0],
                opacity: [1, 0],
              } : {
                y: [0, -10, 0],
              }}
              transition={isOpening ? { duration: 0.8 } : { duration: 2, repeat: Infinity }}
              onClick={!isOpening ? handleOpen : undefined}
              className="cursor-pointer"
            >
              {/* Box Body */}
              <div
                className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl shadow-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${giftStyle.colors[0]}, ${giftStyle.colors[1]})`,
                }}
              >
                {/* Ribbon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-8 h-full"
                    style={{ backgroundColor: giftStyle.colors[2] }}
                  />
                  <div
                    className="h-8 w-full absolute"
                    style={{ backgroundColor: giftStyle.colors[2] }}
                  />
                </div>

                {/* Gift Icon */}
                <motion.div
                  animate={isOpening ? {
                    scale: [1, 1.5, 0],
                    rotate: [0, 360],
                  } : {
                    scale: [1, 1.1, 1],
                  }}
                  transition={isOpening ? { duration: 0.6 } : { duration: 1.5, repeat: Infinity }}
                  className="text-6xl sm:text-8xl z-10"
                >
                  {giftStyle.icon}
                </motion.div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl" />
              </div>

              {/* Tap to Open Text */}
              {!isOpening && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white text-center"
                >
                  <span className="text-lg sm:text-xl font-semibold">Tap to Open</span>
                  <br />
                  <span className="text-sm opacity-70">A Special Gift For You</span>
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Opening Animation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-8xl sm:text-9xl"
          >
            🎉
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
