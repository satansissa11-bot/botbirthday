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
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01),transparent_50%)]" />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-8 sm:mb-12">
            {/* Happy Birthday - Inter font */}
            <TextReveal delay={0.3}>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 text-gray-900"
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '-0.02em',
                }}
              >
                Happy Birthday
              </h1>
            </TextReveal>

            {/* Recipient Name - Inter */}
            <TextReveal delay={0.5}>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-700"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {card.recipient_name}
              </motion.h2>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={0.7}>
                <div className="mt-4 sm:mt-6">
                  <span 
                    className="text-sm sm:text-base md:text-lg text-gray-500"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    From {card.sender_name}
                  </span>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Clean and Minimal */}
        <PhotoReveal delay={0.9}>
          <div className="mb-8 sm:mb-12">
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              {/* Clean photo container */}
              <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-2 sm:p-3">
                <PhotoLayout 
                  photos={card.photos} 
                  coverPhoto={card.cover_photo}
                />
              </div>
            </div>
          </div>
        </PhotoReveal>

        {/* Apple-style Message Card */}
        <ScaleIn delay={1.1}>
          <div className="max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12">
            {/* Apple-style card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 shadow-sm border border-gray-100">
              {/* Message with clean typography */}
              <TextReveal delay={1.3}>
                <p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed text-gray-800"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.message}
                </p>
              </TextReveal>
            </div>
          </div>
        </ScaleIn>

        {/* Brand Footer */}
        <BrandFooter template="minimalist" />
      </div>
    </div>
  );
}
