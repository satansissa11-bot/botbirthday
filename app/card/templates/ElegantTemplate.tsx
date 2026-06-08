'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';

interface ElegantTemplateProps {
  card: BirthdayCard;
}

export default function ElegantTemplate({ card }: ElegantTemplateProps) {
  const template = getTemplate('elegant');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle gold gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-50" />
      
      {/* Gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Elegant header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center pt-20 pb-10 px-4"
        >
          <div className="flex justify-center mb-6">
            <Crown className="w-12 h-12 text-amber-500" />
          </div>
          <h1 
            className="text-5xl md:text-7xl font-light mb-6 tracking-wider"
            style={{ 
              fontFamily: 'Playfair Display, Georgia, serif',
              color: '#1a1a1a',
            }}
          >
            Happy Birthday
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-32 h-0.5 bg-amber-400 mx-auto mb-6"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-amber-700"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {card.recipient_name}
          </motion.h2>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-base sm:text-lg md:text-xl font-light tracking-wide text-amber-600 mt-3"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              From {card.sender_name}
            </motion.p>
          )}
        </motion.div>

        {/* Minimal photo gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
          className="flex-1 px-4 pb-10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-2xl p-3">
              <div className="border border-amber-200">
                <Slideshow photos={card.photos} autoPlay={true} interval={6000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elegant message card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease: 'easeOut' }}
          className="px-4 pb-20"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-2xl p-10 md:p-16 relative">
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400" />
              
              <p
                className="text-xl md:text-2xl text-center leading-loose text-gray-800"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                {card.message}
              </p>
              
              <div className="flex justify-center mt-10">
                <Sparkles className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="text-center py-8 px-4"
        >
          <p className="text-gray-600 text-sm tracking-widest uppercase" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            With warmest wishes
          </p>
        </motion.div>
      </div>
    </div>
  );
}
