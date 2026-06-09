'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ElegantTemplateProps {
  card: BirthdayCard;
}

export default function ElegantTemplate({ card }: ElegantTemplateProps) {
  const template = getTemplate('elegant');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle animated gold gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/60"
        style={{ y }}
      />
      
      {/* Elegant gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full Screen Luxury */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Elegant crown with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative">
              <Crown className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-amber-500" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-300 rounded-full blur-2xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - Centerpiece */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-widest text-center mb-4 sm:mb-6 text-gray-900"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Elegant gold divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200px', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6 sm:mb-8"
          />

          {/* Happy Birthday subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-700 tracking-wide text-center mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
            >
              Happy Birthday
            </motion.p>
          </FadeUp>

          {/* Sender signature */}
          {card.sender_name && (
            <FadeUp delay={1}>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="inline-block"
                >
                  <div className="px-8 py-3 sm:px-10 sm:py-4 border border-amber-300 bg-white/50 backdrop-blur-sm">
                    <span 
                      className="text-sm sm:text-base md:text-lg text-amber-600 tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      From {card.sender_name}
                    </span>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Photo Section - Magazine Style */}
        {card.cover_photo && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-5xl mx-auto">
              <ScaleIn delay={0.2}>
                <div className="relative">
                  {/* Luxury gold frame */}
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-2 sm:p-3 shadow-2xl">
                    <div className="bg-white p-4 sm:p-6">
                      <div className="aspect-video rounded-sm overflow-hidden">
                        <Image
                          src={card.cover_photo}
                          alt="Cover photo"
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute -bottom-3 -left-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-amber-400" />
                </div>
              </ScaleIn>
            </div>
          </div>
        )}

        {/* Photo Gallery - Elegant Grid */}
        {card.photos && card.photos.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {card.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white p-2 sm:p-3 shadow-xl">
                      <div className="aspect-square rounded-sm overflow-hidden bg-gray-50">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    {/* Elegant corner accent */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 border-t border-r border-amber-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Luxury Message Card - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium paper texture with gold border - larger and more prominent */}
                <div className="bg-white shadow-2xl p-12 sm:p-16 md:p-24 lg:p-32 border border-amber-200">
                  
                  {/* Elegant gold corner accents */}
                  <div className="absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 border-t border-l border-amber-400" />
                  <div className="absolute top-6 right-6 w-12 h-12 sm:w-16 sm:h-16 border-t border-r border-amber-400" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 sm:w-16 sm:h-16 border-b border-l border-amber-400" />
                  <div className="absolute bottom-6 right-6 w-12 h-12 sm:w-16 sm:h-16 border-b border-r border-amber-400" />
                  
                  {/* Decorative crown */}
                  <div className="text-center mb-10 sm:mb-14">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 mx-auto" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-widest text-gray-700 mb-10 sm:mb-14 uppercase"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      Dear {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - LARGER and more prominent */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-loose text-gray-800 mb-10 sm:mb-14"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Signature */}
                  {card.sender_name && (
                    <TextReveal delay={0.9}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-700 tracking-wide italic"
                          style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                        >
                          — {card.sender_name}
                        </motion.p>
                      </motion.div>
                    </TextReveal>
                  )}
                  
                  {/* Decorative sparkle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex justify-center mt-10 sm:mt-14"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* Final Wow Factor - Elegant Gold Sparkles */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated gold sparkles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                </motion.div>
              ))}
              
              {/* Center crown */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Crown className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-amber-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="elegant" />
      </div>
    </div>
  );
}
