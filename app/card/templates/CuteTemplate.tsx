'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import { motion } from 'framer-motion';
import { Star, Heart, Gift, PartyPopper } from 'lucide-react';

interface CuteTemplateProps {
  card: BirthdayCard;
}

export default function CuteTemplate({ card }: CuteTemplateProps) {
  const template = getTemplate('cute');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
            ) : (
              <PartyPopper className="w-6 h-6 text-purple-400" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Playful header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center pt-12 pb-6 px-4"
        >
          <div className="flex justify-center gap-4 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              >
                <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
              </motion.div>
            ))}
          </div>
          <h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-purple-600"
            style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
          >
            🎉 Happy Birthday! 🎉
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-pink-500"
            style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
          >
            {card.recipient_name}! 🎈
          </motion.h2>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600 mt-2"
              style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            >
              From {card.sender_name} 💖
            </motion.p>
          )}
        </motion.div>

        {/* Rounded photo gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex-1 px-4 pb-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border-4 border-purple-200">
              <div className="rounded-[1.5rem] overflow-hidden">
                <Slideshow photos={card.photos} autoPlay={true} interval={4000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Playful message card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="px-4 pb-12"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-[2rem] p-8 md:p-10 shadow-xl border-4 border-pink-200 relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6">
                <Gift className="w-16 h-16 text-purple-400" />
              </div>
              <div className="absolute -top-6 -right-6">
                <PartyPopper className="w-16 h-16 text-pink-400" />
              </div>
              
              <p
                className="text-xl md:text-2xl text-center leading-relaxed text-purple-800"
                style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
              >
                {card.message}
              </p>
              
              <div className="flex justify-center gap-4 mt-6">
                <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
                <Star className="w-10 h-10 text-yellow-400" fill="currentColor" />
                <Heart className="w-10 h-10 text-pink-500" fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center py-6 px-4"
        >
          <p className="text-purple-600 text-lg" style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            Made with 💖 and sparkles ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}
