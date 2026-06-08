'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import DarkEffects from '@/components/animations/DarkEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, ScaleIn, Glow } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Crown, Gem, Sparkles } from 'lucide-react';

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
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-70" />
      
      {/* Animated gold border */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 border-2 border-amber-500/30"
        />
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
            {/* Rotating crown with glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, type: 'spring' }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <Glow color="#ffd700">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Crown className="w-14 h-14 sm:w-16 sm:h-16 text-amber-500" />
                </motion.div>
              </Glow>
            </motion.div>

            {/* Happy Birthday - Cinzel font */}
            <TextReveal delay={0.5}>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-4 sm:mb-6 tracking-widest"
                style={{ 
                  fontFamily: 'var(--font-cinzel)',
                  background: 'linear-gradient(135deg, #ffd700, #b8860b, #ffd700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 60px rgba(255, 215, 0, 0.5)',
                }}
              >
                HAPPY BIRTHDAY
              </h1>
            </TextReveal>

            {/* Gold divider line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '150px' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6 sm:mb-8"
            />

            {/* Recipient Name - Montserrat */}
            <TextReveal delay={0.9}>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-amber-400"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                {card.recipient_name}
              </motion.h2>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={1.1}>
                <div className="mt-6 sm:mt-8">
                  <div className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-amber-500/50 bg-black/50 backdrop-blur-sm">
                    <span 
                      className="text-sm sm:text-base md:text-lg text-amber-300 tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      From {card.sender_name}
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Premium Gallery */}
        <PhotoReveal delay={1.3}>
          <div className="mb-8 sm:mb-12">
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              {/* Luxury framed photo container */}
              <div className="relative">
                {/* Outer gold border */}
                <div className="bg-gradient-to-br from-amber-900/30 to-black/50 backdrop-blur-sm p-1 sm:p-2 border border-amber-500/50 shadow-2xl">
                  {/* Inner dark frame */}
                  <div className="bg-gray-900/80 p-3 sm:p-4 border border-amber-500/30">
                    {/* Photo */}
                    <PhotoLayout 
                      photos={card.photos} 
                      coverPhoto={card.cover_photo}
                    />
                  </div>
                </div>

                {/* Animated gold corner ornaments */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -left-2"
                >
                  <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-2 -right-2"
                >
                  <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -left-2"
                >
                  <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-2 -right-2"
                >
                  <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </motion.div>
              </div>
            </div>
          </div>
        </PhotoReveal>

        {/* VIP Invitation Message Card */}
        <ScaleIn delay={1.5}>
          <div className="max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-12">
            {/* VIP invitation style card */}
            <div className="relative">
              {/* Premium black card with gold glow */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-sm p-8 sm:p-12 md:p-16 lg:p-20 border border-amber-500/40 shadow-2xl">
                
                {/* Gold corner ornaments */}
                <div className="absolute top-4 left-4">
                  <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <div className="absolute top-4 right-4">
                  <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                
                {/* Message with premium typography */}
                <TextReveal delay={1.7}>
                  <p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-loose text-amber-100"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    {card.message}
                  </p>
                </TextReveal>
                
                {/* Decorative crown with glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.8 }}
                  className="flex justify-center mt-8 sm:mt-10"
                >
                  <Glow color="#ffd700">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
                    </motion.div>
                  </Glow>
                </motion.div>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Brand Footer */}
        <BrandFooter template="dark-luxury" />
      </div>
    </div>
  );
}
