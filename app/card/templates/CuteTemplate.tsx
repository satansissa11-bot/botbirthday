'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, FloatingParticles, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Star, Heart, Gift, PartyPopper, Sparkles, Smile } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100">
      {/* Colorful gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-yellow-200/20" />
      
      {/* Cute floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 4 === 0 ? (
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" fill="currentColor" />
            ) : i % 4 === 1 ? (
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" />
            ) : i % 4 === 2 ? (
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            ) : (
              <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <FadeUp delay={0.2}>
          <div className="text-center mb-6 sm:mb-8">
            {/* Bouncing stars */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                >
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="currentColor" />
                </motion.div>
              ))}
            </div>

            {/* Happy Birthday - Fredoka font */}
            <TextReveal delay={0.4}>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4"
                style={{ 
                  fontFamily: 'var(--font-fredoka)',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                🎉 Happy Birthday! 🎉
              </motion.h1>
            </TextReveal>

            {/* Recipient Name - Baloo 2 font */}
            <TextReveal delay={0.6}>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                {card.recipient_name}! 🎈
              </motion.h2>
            </TextReveal>

            {/* Sender Section */}
            {card.sender_name && (
              <FadeUp delay={0.8}>
                <div className="mt-4 sm:mt-6">
                  <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border-4 border-pink-300 shadow-lg">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="currentColor" />
                    <span 
                      className="text-sm sm:text-base md:text-lg text-purple-700 font-semibold"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      From {card.sender_name} 💖
                    </span>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </FadeUp>

        {/* Photo Section - Scrapbook Style */}
        <PhotoReveal delay={1}>
          <div className="mb-6 sm:mb-8">
            <div className="max-w-4xl lg:max-w-5xl mx-auto">
              {/* Scrapbook-style photo container with stickers */}
              <div className="relative">
                {/* Sticker decorations */}
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -left-4 z-10"
                >
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 z-10"
                >
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                </motion.div>

                {/* Photo container */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-4 border-purple-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <PhotoLayout 
                    photos={card.photos} 
                    coverPhoto={card.cover_photo}
                  />
                </div>

                {/* Bottom stickers */}
                <motion.div
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 z-10"
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 z-10"
                >
                  <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </PhotoReveal>

        {/* Scrapbook Message Card */}
        <ScaleIn delay={1.2}>
          <div className="max-w-3xl lg:max-w-4xl mx-auto mb-6 sm:mb-8">
            {/* Scrapbook note style card */}
            <div className="relative">
              {/* Paper texture background */}
              <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border-4 border-pink-300 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Decorative stickers */}
                <div className="absolute -top-6 -left-6 z-10">
                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" />
                </div>
                <div className="absolute -top-6 -right-6 z-10">
                  <PartyPopper className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400" />
                </div>
                <div className="absolute -bottom-6 -left-6 z-10">
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                </div>
                <div className="absolute -bottom-6 -right-6 z-10">
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                </div>
                
                {/* Message with playful typography */}
                <TextReveal delay={1.4}>
                  <p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center leading-relaxed text-purple-800"
                    style={{ fontFamily: 'var(--font-baloo-2)' }}
                  >
                    {card.message}
                  </p>
                </TextReveal>
                
                {/* Decorative icons */}
                <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" fill="currentColor" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="currentColor" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Brand Footer */}
        <BrandFooter template="cute" />
      </div>
    </div>
  );
}
