'use client';

import { useState, useEffect, useRef } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn, SlideInLeft, SlideInRight } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Sparkles, Cpu, ArrowDown, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const coverScale = useTransform(scrollY, [300, 600], [1, 1.15]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Modern animated gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950"
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
        <motion.div 
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative"
        >
          {/* Rotating zap icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            className="mb-6 sm:mb-8"
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
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-3 sm:mb-4 text-white tracking-tight"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-cyan-300 tracking-tight"
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
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/30 shadow-xl">
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
              <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SECTION 2: Cinematic Cover Photo with Parallax */}
        {allPhotos.length > 0 && (
          <motion.div 
            ref={coverRef}
            style={{ scale: coverScale }}
            className="relative h-screen w-full"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-violet-950/80" />
              
              {/* Floating text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center px-4"
                >
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-tight"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Level up your celebration
                  </motion.p>
                </motion.div>
              </div>

              {/* Modern corner accents */}
              <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl" />
              <div className="absolute top-8 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl" />
              <div className="absolute bottom-8 left-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-xl" />
            </motion.div>
          </motion.div>
        )}

        {/* SECTION 3: Premium Editorial Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-950 to-purple-950">
            <div className="max-w-6xl mx-auto">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-8 sm:mb-12 last:mb-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/20"
                  >
                    <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Memory ${index + 2}`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        sizes="100vw"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - 200% Larger */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-purple-950 to-indigo-950">
          <div className="max-w-6xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl sm:rounded-4xl md:rounded-5xl p-8 sm:p-12 md:p-20 lg:p-28 shadow-2xl border border-white/20 relative">
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
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white/60" />
                  </motion.div>
                </motion.div>
                
                {/* Greeting - Much larger */}
                <TextReveal delay={0.5}>
                  <motion.p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white/90 mb-8 sm:mb-12 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Hey {card.recipient_name}
                  </motion.p>
                </TextReveal>
                
                {/* Message body - Significantly larger and emotional centerpiece */}
                <TextReveal delay={0.7}>
                  <motion.p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-relaxed text-white mb-8 sm:mb-12"
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
                  className="flex justify-center mt-8 sm:mt-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-white/80" fill="currentColor" />
                  </motion.div>
                </motion.div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-indigo-950 to-violet-950 relative overflow-hidden">
          {/* Animated energy particles */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${5 + (i * 4)}%`,
                top: `${10 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.6, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
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
          
          {/* Center zap with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="relative"
            >
              <Zap className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-white" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl"
              />
            </motion.div>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/90 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Make it happen
            </motion.p>
          </motion.div>

          {/* Share & Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-8 sm:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/30 text-white hover:bg-white/20 transition-all shadow-xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/30 text-white hover:bg-white/20 transition-all shadow-xl"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Save</span>
            </motion.button>
          </motion.div>

          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          >
            <div className="text-center">
              <motion.p
                className="text-sm sm:text-base text-white/70 mb-4"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-white/60 text-xs sm:text-sm">
                  QR Code
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 sm:mt-14 text-center"
          >
            <motion.p
              className="text-base sm:text-lg text-white/60"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Created with <span className="text-cyan-400">❤️</span> by Spectre
            </motion.p>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="modern" />
        </div>
      </div>
    </div>
  );
}
