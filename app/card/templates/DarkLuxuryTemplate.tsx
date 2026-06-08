'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import DarkEffects from '@/components/animations/DarkEffects';
import { motion } from 'framer-motion';
import { Crown, Gem } from 'lucide-react';

interface DarkLuxuryTemplateProps {
  card: BirthdayCard;
}

export default function DarkLuxuryTemplate({ card }: DarkLuxuryTemplateProps) {
  const template = getTemplate('dark-luxury');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Dark luxury background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Gold particle effects */}
      <DarkEffects enabled />
      
      {/* Cinematic vignette */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-60" />
      
      {/* Gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Cinematic header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center pt-24 pb-12 px-4"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Crown className="w-16 h-16 text-amber-500" />
            </motion.div>
          </div>
          <h1 
            className="text-5xl md:text-8xl font-light mb-8 tracking-widest"
            style={{ 
              fontFamily: 'Cinzel, Georgia, serif',
              background: 'linear-gradient(135deg, #ffd700, #b8860b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
            }}
          >
            HAPPY BIRTHDAY
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"
          />
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wider text-amber-400"
            style={{ fontFamily: 'Cinzel, Georgia, serif' }}
          >
            {card.recipient_name}
          </motion.h2>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="text-lg sm:text-xl md:text-2xl font-light tracking-wider text-amber-300 mt-3"
              style={{ fontFamily: 'Cinzel, Georgia, serif' }}
            >
              From {card.sender_name}
            </motion.p>
          )}
        </motion.div>

        {/* Luxury photo gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
          className="flex-1 px-4 pb-12"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 border border-amber-500/30 shadow-2xl">
              <div className="border border-amber-500/20">
                <Slideshow photos={card.photos} autoPlay={true} interval={7000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Luxury message card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
          className="px-4 pb-24"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm p-12 md:p-16 border border-amber-500/30 shadow-2xl relative">
              {/* Gold corner ornaments */}
              <div className="absolute top-6 left-6">
                <Gem className="w-8 h-8 text-amber-500" />
              </div>
              <div className="absolute top-6 right-6">
                <Gem className="w-8 h-8 text-amber-500" />
              </div>
              <div className="absolute bottom-6 left-6">
                <Gem className="w-8 h-8 text-amber-500" />
              </div>
              <div className="absolute bottom-6 right-6">
                <Gem className="w-8 h-8 text-amber-500" />
              </div>
              
              <p
                className="text-xl md:text-2xl text-center leading-loose text-amber-100"
                style={{ fontFamily: 'Cinzel, Georgia, serif' }}
              >
                {card.message}
              </p>
              
              <div className="flex justify-center mt-12">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-10 h-10 text-amber-500" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center py-8 px-4"
        >
          <p className="text-amber-600 text-sm tracking-widest uppercase" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
            A celebration of elegance
          </p>
        </motion.div>
      </div>
    </div>
  );
}
