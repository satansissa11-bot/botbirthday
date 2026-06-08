'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, FloatingParticles, Parallax } from '@/components/animations/PremiumAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-100 to-red-50">
      {/* Rose gold gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-200/30 via-pink-100/20 to-red-200/30" />
      
      {/* Floating hearts effect */}
      <RomanticEffects enabled />
      
      {/* Soft rose gold particles */}
      <FloatingParticles count={30} color="#B76E79" />
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-6 sm:mb-8">
            {/* Decorative heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
              className="flex justify-center mb-4 sm:mb-6"
            >
              <div className="relative">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose-500" fill="currentColor" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-rose-400 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            {/* Happy Birthday - Great Vibes font */}
            <TextReveal delay={0.4}>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4"
                style={{ 
                  fontFamily: 'var(--font-great-vibes)',
                  background: 'linear-gradient(135deg, #dc2626, #ec4899, #f43f5e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Happy Birthday
              </h1>
            </TextReveal>

            {/* Recipient Name - Playfair Display */}
            <TextReveal delay={0.6}>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-rose-700"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                {card.recipient_name}
              </motion.h2>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={0.8}>
                <div className="mt-4 sm:mt-6">
                  <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-rose-200/50 shadow-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                    <span 
                      className="text-sm sm:text-base md:text-lg text-rose-600"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      With love from {card.sender_name}
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Adaptive Layout */}
        <PhotoReveal delay={1}>
          <div className="mb-6 sm:mb-8">
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              {/* Polaroid-style photo container */}
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <PhotoLayout 
                  photos={card.photos} 
                  coverPhoto={card.cover_photo}
                />
              </div>
            </div>
          </div>
        </PhotoReveal>

        {/* Love Letter Message Card */}
        <Parallax speed={0.3}>
          <FadeUp delay={1.2}>
            <div className="max-w-3xl lg:max-w-4xl mx-auto mb-6 sm:mb-8">
              {/* Love letter style card */}
              <div className="relative">
                {/* Paper texture background */}
                <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border-2 border-rose-200/50">
                  
                  {/* Rose gold decorative corners */}
                  <div className="absolute top-3 left-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-rose-300/50 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-rose-300/50 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-rose-300/50 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-rose-300/50 rounded-br-lg" />

                  {/* Decorative sparkles */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 opacity-60" />
                  </div>
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                    <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400 opacity-60" />
                  </div>
                  
                  {/* Message with elegant typography */}
                  <TextReveal delay={1.4}>
                    <p
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed text-rose-900"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      {card.message}
                    </p>
                  </TextReveal>
                  
                  {/* Decorative heart */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.6, duration: 0.8, type: 'spring' }}
                    className="flex justify-center mt-6 sm:mt-8"
                  >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeUp>
        </Parallax>

        {/* Brand Footer */}
        <BrandFooter template="romantic" />
      </div>
    </div>
  );
}
