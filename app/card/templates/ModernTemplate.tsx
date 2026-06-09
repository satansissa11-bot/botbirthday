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
import { Zap, Sparkles, Cpu } from 'lucide-react';
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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full Screen Apple Style */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Rotating zap icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            className="mb-8 sm:mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Happy - Inter font */}
          <SlideInLeft delay={0.4}>
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold mb-2 sm:mb-4 text-white tracking-tight"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mt-6 sm:mt-8 text-white/90 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {card.recipient_name}
            </motion.h3>
          </TextReveal>

          {/* Sender Section */}
          {card.sender_name && (
            <FadeUp delay={0.9}>
              <div className="mt-6 sm:mt-8">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/30">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                  <span 
                    className="text-base sm:text-lg md:text-xl text-white/90"
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Photo Section - Large Display */}
        {card.cover_photo && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <ScaleIn delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-4 sm:p-6 shadow-2xl border border-white/20"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src={card.cover_photo}
                      alt="Cover photo"
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </motion.div>
              </ScaleIn>
            </div>
          </div>
        )}

        {/* Photo Gallery - Bento Grid Style */}
        {card.photos && card.photos.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {card.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border border-white/20">
                      <div className="aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Glassmorphism Message Card - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl sm:rounded-4xl p-12 sm:p-16 md:p-24 lg:p-32 shadow-2xl border border-white/20 relative">
                {/* Decorative sparkle */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute top-8 right-8 sm:top-10 sm:right-10"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-white/60" />
                  </motion.div>
                </motion.div>
                
                {/* Greeting */}
                <TextReveal delay={0.5}>
                  <motion.p
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 mb-10 sm:mb-14 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Hey {card.recipient_name}
                  </motion.p>
                </TextReveal>
                
                {/* Message body - LARGER and more prominent */}
                <TextReveal delay={0.7}>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-relaxed text-white mb-10 sm:mb-14"
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
                  className="flex justify-center mt-10 sm:mt-14"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-white/80" fill="currentColor" />
                  </motion.div>
                </motion.div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* Final Wow Factor - Modern Energy Particles */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated energy particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
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
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  ) : (
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                  )}
                </motion.div>
              ))}
              
              {/* Center zap */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Zap className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white" fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="modern" />
      </div>
    </div>
  );
}
