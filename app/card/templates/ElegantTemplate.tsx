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
import { Crown, Sparkles, ArrowDown } from 'lucide-react';
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

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

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
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero with Recipient Name */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Elegant crown with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
            className="mb-10 sm:mb-14"
          >
            <div className="relative">
              <Crown className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-amber-500" />
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-amber-300 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-widest text-center mb-8 sm:mb-10 text-gray-900"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Elegant gold divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '300px', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10 sm:mb-14"
          />

          {/* Happy Birthday subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-700 tracking-wide text-center mb-10 sm:mb-14"
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
                  <div className="px-12 py-5 sm:px-16 sm:py-6 border-2 border-amber-300 bg-white/70 backdrop-blur-sm shadow-xl">
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-amber-600 tracking-[0.3em] uppercase"
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
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400"
            >
              <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Cinematic Cover Photo */}
        {allPhotos.length > 0 && (
          <div className="relative h-screen w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative h-full w-full"
            >
              <Image
                src={allPhotos[0]}
                alt="Cover photo"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent" />
              {/* Gold corner accents */}
              <div className="absolute top-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-l-4 border-amber-400" />
              <div className="absolute top-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-r-4 border-amber-400" />
              <div className="absolute bottom-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-l-4 border-amber-400" />
              <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-r-4 border-amber-400" />
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Premium Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="mb-16 sm:mb-20 last:mb-0"
                >
                  <div className="relative">
                    {/* Luxury gold frame */}
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-3 sm:p-4 shadow-2xl">
                      <div className="bg-white p-4 sm:p-6">
                        <div className="aspect-[16/9] rounded-sm overflow-hidden bg-gray-50">
                          <Image
                            src={photo}
                            alt={`Memory ${index + 2}`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Elegant corner accent */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-r-2 border-amber-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium paper texture with gold border */}
                <div className="bg-white shadow-2xl p-14 sm:p-20 md:p-28 lg:p-36 border border-amber-200">
                  
                  {/* Elegant gold corner accents */}
                  <div className="absolute top-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute top-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-amber-400" />
                  
                  {/* Decorative crown */}
                  <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Crown className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500 mx-auto" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-widest text-gray-700 mb-12 sm:mb-16 uppercase"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      Dear {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Emotional centerpiece */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-loose text-gray-800 mb-12 sm:mb-16"
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
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-700 tracking-wide italic"
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
                    className="flex justify-center mt-12 sm:mt-16"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Animated gold sparkles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 6)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
              </motion.div>
            ))}
            
            {/* Center crown */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Crown className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-amber-500" />
            </motion.div>

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center mt-12 sm:mt-16"
            >
              <motion.p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-700 tracking-wide"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                With warmest wishes
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="elegant" />
        </div>
      </div>
    </div>
  );
}
