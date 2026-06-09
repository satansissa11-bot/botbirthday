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
          className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-0 relative overflow-hidden"
        >
          {/* Premium gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-transparent to-violet-950/60 pointer-events-none" />
          
          {/* Rotating zap icon - extremely subtle to let name dominate */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring' }}
            className="mb-1 sm:mb-2 relative z-10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-22 lg:w-22 text-white" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Happy - Inter font - smaller to create hierarchy */}
          <SlideInLeft delay={0.4}>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-0 sm:mb-1 text-white tracking-tight relative z-10"
              style={{ 
                fontFamily: 'var(--font-inter)',
                letterSpacing: '-0.05em',
              }}
            >
              Happy
            </motion.h1>
          </SlideInLeft>

          {/* Birthday - Poppins font with gradient - smaller to create hierarchy */}
          <SlideInRight delay={0.5}>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-cyan-300 tracking-tight relative z-10"
              style={{ 
                fontFamily: 'var(--font-poppins)',
                letterSpacing: '-0.05em',
              }}
            >
              Birthday
            </motion.h2>
          </SlideInRight>

          {/* Recipient Name - ABSOLUTE DOMINANT VISUAL CENTERPIECE */}
          <TextReveal delay={0.7}>
            <motion.h3
              className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold mt-1 sm:mt-2 text-white/90 tracking-tight leading-none px-1 sm:px-2"
              style={{ fontFamily: 'var(--font-inter)', filter: 'drop-shadow(0 0 100px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 150px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 200px rgba(255, 255, 255, 0.15))' }}
            >
              {card.recipient_name}
            </motion.h3>
          </TextReveal>

          {/* Sender Section - elegant and minimal */}
          {card.sender_name && (
            <FadeUp delay={0.9}>
              <div className="mt-1 sm:mt-2 relative z-10">
                <div className="inline-flex items-center gap-4 sm:gap-5 bg-white/10 backdrop-blur-2xl px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                  <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-white/80" />
                  <span 
                    className="text-lg sm:text-xl md:text-2xl text-white/90"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    {card.sender_name}
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
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/80"
            >
              <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8" />
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

        {/* SECTION 3: Premium Editorial Photo Sections - EDGE-TO-EDGE 90% VIEWPORT */}
        {allPhotos.length > 1 && (
          <div className="py-2 sm:py-3 lg:py-4 px-0 sm:px-1 lg:px-2 bg-gradient-to-b from-violet-950 to-purple-950">
            <div className="w-full max-w-[1800px] mx-auto px-1 sm:px-2 lg:px-4">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 120 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-200px' }}
                  transition={{ duration: 1.5, delay: index * 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-6 sm:mb-8 last:mb-0"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-2xl rounded-4xl sm:rounded-5xl p-4 sm:p-5 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)] border border-white/40"
                  >
                    <div className="aspect-[14/9] sm:aspect-[16/9] md:aspect-[18/9] lg:aspect-[20/9] xl:aspect-[22/9] rounded-3xl overflow-hidden">
                      <Image
                        src={photo}
                        alt={`Memory ${index + 2}`}
                        fill
                        className="object-cover transition-transform duration-1200 hover:scale-105"
                        sizes="100vw"
                      />
                    </div>
                    {/* Premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950/60 via-transparent to-violet-950/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-950/40 via-transparent to-violet-950/40" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - DRAMATICALLY LARGER 300% */}
        <div className="min-h-screen flex items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-purple-950 to-indigo-950">
          <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
            <ScaleIn delay={0.2}>
              <div className="bg-white/25 backdrop-blur-3xl rounded-5xl sm:rounded-6xl md:rounded-7xl lg:rounded-8xl p-12 sm:p-16 md:p-28 lg:p-36 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.7)] border border-white/50 relative">
                {/* Decorative sparkle - larger */}
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
                    <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:w-18 text-white/70" />
                  </motion.div>
                </motion.div>
                
                {/* Greeting - DRAMATICALLY LARGER */}
                <TextReveal delay={0.5}>
                  <motion.p
                    className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-white/90 mb-10 sm:mb-12 tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-inter)', filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 120px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 180px rgba(255, 255, 255, 0.1))' }}
                  >
                    Hey {card.recipient_name}
                  </motion.p>
                </TextReveal>
                
                {/* Message body - DRAMATICALLY LARGER and emotional centerpiece */}
                <TextReveal delay={0.7}>
                  <motion.p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-relaxed text-white mb-10 sm:mb-12"
                    style={{ fontFamily: 'var(--font-poppins)', lineHeight: '1.7' }}
                  >
                    {card.message}
                  </motion.p>
                </TextReveal>
                
                {/* Decorative zap - larger */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex justify-center mt-10 sm:mt-12"
                >
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:w-20 lg:w-22 lg:w-22 text-white/80" fill="currentColor" />
                  </motion.div>
                </motion.div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-indigo-950 to-violet-950 relative overflow-hidden">
          {/* Animated energy particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${4 + (i * 3.5)}%`,
                top: `${8 + (i % 5) * 18}%`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
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
          
          {/* Center zap with glow - larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center mb-10 sm:mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="relative"
            >
              <Zap className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:w-56 text-white" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl"
              />
            </motion.div>
          </motion.div>

          {/* Final message - LARGER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center mb-12 sm:mb-14"
          >
            <motion.p
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-white/90 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)', filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 120px rgba(255, 255, 255, 0.2))' }}
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
            className="flex flex-col sm:flex-row gap-5 sm:gap-7 items-center justify-center mb-10 sm:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-white/50 text-white hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xl sm:text-2xl font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-white/50 text-white hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <Download className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xl sm:text-2xl font-medium">Save</span>
            </motion.button>
          </motion.div>

          {/* QR Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="bg-white/15 backdrop-blur-2xl rounded-4xl p-8 sm:p-10 border border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="text-center">
              <motion.p
                className="text-lg sm:text-xl text-white/70 mb-5"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                <div className="text-white/60 text-base sm:text-lg">
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
            className="mt-12 sm:mt-14 text-center"
          >
            <motion.p
              className="text-xl sm:text-2xl text-white/80"
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
