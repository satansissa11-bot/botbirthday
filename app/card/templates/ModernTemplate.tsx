'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, ScaleIn, SlideInLeft, SlideInRight } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Zap, Sparkles, Cpu } from 'lucide-react';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-500/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '400% 400%',
        }}
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-6 sm:mb-8">
            {/* Rotating zap icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              className="flex justify-center mb-4 sm:mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-white" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Happy - Inter font */}
            <SlideInLeft delay={0.4}>
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-2 sm:mb-4 text-white"
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '-0.05em',
                }}
              >
                Happy
              </h1>
            </SlideInLeft>

            {/* Birthday - Poppins font with gradient */}
            <SlideInRight delay={0.5}>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-cyan-300"
                style={{ 
                  fontFamily: 'var(--font-poppins)',
                  letterSpacing: '-0.05em',
                }}
              >
                Birthday
              </h2>
            </SlideInRight>

            {/* Recipient Name - Inter */}
            <TextReveal delay={0.7}>
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6 text-white/90"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {card.recipient_name}
              </motion.h3>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={0.9}>
                <div className="mt-4 sm:mt-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/30">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                    <span 
                      className="text-sm sm:text-base md:text-lg text-white/90"
                      style={{ fontFamily: 'var(--font-poppins)' }}
                    >
                      From {card.sender_name}
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Bento Grid Style */}
        <PhotoReveal delay={1.1}>
          <div className="mb-6 sm:mb-8">
            <div className="max-w-5xl lg:max-w-6xl mx-auto">
              {/* Glassmorphism photo container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20"
              >
                <PhotoLayout 
                  photos={card.photos} 
                  coverPhoto={card.cover_photo}
                />
              </motion.div>
            </div>
          </div>
        </PhotoReveal>

        {/* Glassmorphism Message Card */}
        <ScaleIn delay={1.3}>
          <div className="max-w-4xl lg:max-w-5xl mx-auto mb-6 sm:mb-8">
            {/* Modern glassmorphism card */}
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-2xl border border-white/20 relative">
              {/* Decorative sparkle */}
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white/60" />
                </motion.div>
              </motion.div>
              
              {/* Message with modern typography */}
              <TextReveal delay={1.5}>
                <p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed text-white"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {card.message}
                </p>
              </TextReveal>
              
              {/* Decorative zap */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="flex justify-center mt-6 sm:mt-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" fill="currentColor" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </ScaleIn>

        {/* Brand Footer */}
        <BrandFooter template="modern" />
      </div>
    </div>
  );
}
