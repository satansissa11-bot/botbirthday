'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import { motion } from 'framer-motion';

interface MinimalistTemplateProps {
  card: BirthdayCard;
}

export default function MinimalistTemplate({ card }: MinimalistTemplateProps) {
  const template = getTemplate('minimalist');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Clean white background with subtle texture */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_50%)]" />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Clean header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center pt-20 pb-8 px-4"
        >
          <h1 
            className="text-4xl md:text-6xl font-semibold mb-4 text-gray-900"
            style={{ 
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Happy Birthday
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl font-medium text-gray-700"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            {card.recipient_name}
          </motion.h2>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-500 mt-2"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              From {card.sender_name}
            </motion.p>
          )}
        </motion.div>

        {/* Clean photo gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex-1 px-4 pb-8"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-2">
              <div className="rounded-xl overflow-hidden">
                <Slideshow photos={card.photos} autoPlay={true} interval={6000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Minimal message card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="px-4 pb-16"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-10 md:p-14 shadow-sm border border-gray-100">
              <p
                className="text-xl md:text-2xl text-center leading-relaxed text-gray-800"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                {card.message}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center py-8 px-4"
        >
          <p className="text-gray-400 text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            Made with care
          </p>
        </motion.div>
      </div>
    </div>
  );
}
