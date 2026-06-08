'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface RomanticTemplateProps {
  card: BirthdayCard;
}

export default function RomanticTemplate({ card }: RomanticTemplateProps) {
  const template = getTemplate('romantic');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Romantic gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-red-200" />
      
      {/* Floating hearts effect */}
      <RomanticEffects enabled />
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with elegant typography */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-16 pb-8 px-4"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-red-500 animate-pulse" fill="currentColor" />
          </div>
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ 
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #dc2626, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Happy Birthday
          </h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-5xl font-semibold text-rose-600"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {card.recipient_name}
          </motion.h2>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-rose-500 mt-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              From {card.sender_name}
            </motion.p>
          )}
        </motion.div>

        {/* Glassmorphism photo gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 px-4 pb-8"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/50">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Slideshow photos={card.photos} autoPlay={true} interval={5000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism message card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="px-4 pb-16"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Decorative sparkles */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-rose-400 opacity-60" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Sparkles className="w-6 h-6 text-pink-400 opacity-60" />
              </div>
              
              <p
                className="text-xl md:text-2xl text-center leading-relaxed text-rose-900"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {card.message}
              </p>
              
              <div className="flex justify-center mt-8">
                <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-center py-8 px-4"
        >
          <p className="text-rose-700 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
            Made with love ❤️
          </p>
        </motion.div>
      </div>
    </div>
  );
}
