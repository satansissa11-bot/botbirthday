'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, ScaleIn } from '@/components/animations/PremiumAnimations';
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
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-40" />
      
      {/* Elegant gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-8 sm:mb-12">
            {/* Elegant crown */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring' }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <div className="relative">
                <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500" />
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-amber-300 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            {/* Happy Birthday - Playfair Display */}
            <TextReveal delay={0.5}>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 tracking-wider text-gray-900"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                Happy Birthday
              </h1>
            </TextReveal>

            {/* Gold divider line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6 sm:mb-8"
            />

            {/* Recipient Name - Cormorant Garamond */}
            <TextReveal delay={0.9}>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-amber-700"
                style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
              >
                {card.recipient_name}
              </motion.h2>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={1.1}>
                <div className="mt-6 sm:mt-8">
                  <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-amber-300">
                    <span 
                      className="text-sm sm:text-base md:text-lg text-amber-600 tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      From {card.sender_name}
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Luxury Framed */}
        <PhotoReveal delay={1.3}>
          <div className="mb-8 sm:mb-12">
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              {/* Luxury framed photo container */}
              <div className="relative">
                {/* Outer gold frame */}
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-1 sm:p-2 shadow-2xl">
                  {/* Inner white frame */}
                  <div className="bg-white p-3 sm:p-4">
                    {/* Photo */}
                    <PhotoLayout 
                      photos={card.photos} 
                      coverPhoto={card.cover_photo}
                    />
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-amber-400" />
              </div>
            </div>
          </div>
        </PhotoReveal>

        {/* Luxury Invitation Message Card */}
        <ScaleIn delay={1.5}>
          <div className="max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12">
            {/* Luxury invitation style card */}
            <div className="relative">
              {/* Paper texture background */}
              <div className="bg-white shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20">
                
                {/* Elegant gold corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 sm:w-12 sm:h-12 border-t border-l border-amber-400" />
                <div className="absolute top-4 right-4 w-8 h-8 sm:w-12 sm:h-12 border-t border-r border-amber-400" />
                <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-12 sm:h-12 border-b border-l border-amber-400" />
                <div className="absolute bottom-4 right-4 w-8 h-8 sm:w-12 sm:h-12 border-b border-r border-amber-400" />
                
                {/* Message with premium typography */}
                <TextReveal delay={1.7}>
                  <p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-loose text-gray-800"
                    style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                  >
                    {card.message}
                  </p>
                </TextReveal>
                
                {/* Decorative sparkle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.8 }}
                  className="flex justify-center mt-8 sm:mt-10"
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </motion.div>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Brand Footer */}
        <BrandFooter template="elegant" />
      </div>
    </div>
  );
}
