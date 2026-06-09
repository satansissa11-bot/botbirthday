'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn, SlideInLeft, SlideInRight } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Sparkles, Cpu, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Modern animated gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        style={{ y }}
      />
      
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
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero with Recipient Name */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Rotating zap icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            className="mb-10 sm:mb-14"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 text-white" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Happy - Inter font */}
          <SlideInLeft delay={0.4}>
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-4 sm:mb-6 text-white tracking-tight"
              style={{ 
                fontFamily: 'var(--font-inter)',
                letterSpacing: '-0.05em',
              }}
            >
              Happy
            </motion.h1>
          </SlideInLeft>

          {/* Birthday - Poppins font with gradient */}
          <SlideInRight delay={0.5}>
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-cyan-300 tracking-tight"
              style={{ 
                fontFamily: 'var(--font-poppins)',
                letterSpacing: '-0.05em',
              }}
            >
              Birthday
            </motion.h2>
          </SlideInRight>

          {/* Recipient Name - Inter */}
          <TextReveal delay={0.7}>
            <motion.h3
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mt-8 sm:mt-12 text-white/90 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {card.recipient_name}
            </motion.h3>
          </TextReveal>

          {/* Sender Section */}
          {card.sender_name && (
            <FadeUp delay={0.9}>
              <div className="mt-8 sm:mt-12">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-white/30 shadow-xl">
                  <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-white/80" />
                  <span 
                    className="text-lg sm:text-xl md:text-2xl text-white/90"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    From {card.sender_name}
                  </span>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60"
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
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/50 via-transparent to-violet-900/50" />
              {/* Modern corner accents */}
              <div className="absolute top-8 left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl" />
              <div className="absolute top-8 right-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl" />
              <div className="absolute bottom-8 left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl" />
              <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl" />
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-4 sm:p-6 shadow-2xl border border-white/20"
                  >
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Memory ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-14 sm:p-20 md:p-28 lg:p-36 shadow-2xl border border-white/20 relative">
                {/* Decorative sparkle */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute top-10 right-10 sm:top-12 sm:right-12"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-white/60" />
                  </motion.div>
                </motion.div>
                
                {/* Greeting */}
                <TextReveal delay={0.5}>
                  <motion.p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/90 mb-12 sm:mb-16 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Hey {card.recipient_name}
                  </motion.p>
                </TextReveal>
                
                {/* Message body - Emotional centerpiece */}
                <TextReveal delay={0.7}>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-relaxed text-white mb-12 sm:mb-16"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {card.message}
                  </motion.p>
                </TextReveal>
                
                {/* Decorative zap */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex justify-center mt-12 sm:mt-16"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-16 h-16 sm:w-20 sm:h-20 text-white/80" fill="currentColor" />
                  </motion.div>
                </motion.div>
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
            {/* Animated energy particles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 6)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.6, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                {i % 2 === 0 ? (
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                ) : (
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
                )}
              </motion.div>
            ))}
            
            {/* Center zap */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Zap className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white" fill="currentColor" />
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Make it happen
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="modern" />
        </div>
      </div>
    </div>
  );
}
