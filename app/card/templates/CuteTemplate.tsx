'use client';

import { useState, useEffect, useRef } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Heart, Gift, PartyPopper, Sparkles, Smile, Cake, ArrowDown, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface CuteTemplateProps {
  card: BirthdayCard;
}

export default function CuteTemplate({ card }: CuteTemplateProps) {
  const template = getTemplate('cute');
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
          title: `Happy Birthday ${card.recipient_name}! 🎂`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-950 via-pink-950 to-yellow-950">
      {/* Animated colorful gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-yellow-900/30"
        style={{ y }}
      />
      
      {/* Cute floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 25, -25, 0],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 5 === 0 ? (
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" fill="currentColor" />
            ) : i % 5 === 1 ? (
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" />
            ) : i % 5 === 2 ? (
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            ) : i % 5 === 3 ? (
              <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
            ) : (
              <Cake className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
            )}
          </motion.div>
        ))}
      </div>

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
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-purple-950/60 pointer-events-none" />
          
          {/* Bouncing decorations - extremely subtle to let name dominate */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-1 sm:mb-2 relative z-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -12, 0], rotate: [0, 12, -12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                {i % 2 === 0 ? (
                  <Star className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-yellow-400/80" fill="currentColor" />
                ) : (
                  <Heart className="w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 text-pink-400/80" fill="currentColor" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Recipient Name - ABSOLUTE DOMINANT VISUAL CENTERPIECE */}
          <TextReveal delay={0.3}>
            <motion.h1
              className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold text-center mb-0 sm:mb-1 leading-none tracking-tight px-1 sm:px-2"
              style={{ 
                fontFamily: 'var(--font-fredoka)',
                background: 'linear-gradient(135deg, #fff5f5 0%, #f9a8d4 15%, #c084fc 30%, #fbbf24 50%, #f9a8d4 70%, #fff5f5 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 6s ease infinite',
                filter: 'drop-shadow(0 0 100px rgba(192, 132, 252, 0.8)) drop-shadow(0 0 150px rgba(192, 132, 252, 0.5)) drop-shadow(0 0 200px rgba(192, 132, 252, 0.3))',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Happy Birthday subtitle - elegant and refined */}
          <FadeUp delay={0.5}>
            <motion.div
              className="flex items-center justify-center gap-4 sm:gap-5 mb-1 sm:mb-2 relative z-10"
            >
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-200 font-light tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-baloo-2)', letterSpacing: '0.2em' }}
              >
                Happy Birthday!
              </motion.p>
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
            </motion.div>
          </FadeUp>

          {/* Sender signature - elegant and minimal */}
          {card.sender_name && (
            <FadeUp delay={0.7}>
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, type: 'spring' }}
                  className="inline-block"
                >
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl px-8 py-4 sm:px-10 sm:py-5 rounded-full border-2 border-pink-400/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400" fill="currentColor" />
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-purple-100 font-light tracking-wide"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      {card.sender_name}
                    </span>
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  </div>
                </motion.div>
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
              className="text-purple-300/90"
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
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/40 to-purple-950/60" />
              
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
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-100 font-light"
                    style={{ fontFamily: 'var(--font-baloo-2)' }}
                  >
                    Let&apos;s celebrate together! 🎉
                  </motion.p>
                </motion.div>
              </div>

              {/* Cute stickers overlay */}
              <div className="absolute top-8 left-8">
                <motion.div
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-14 h-14 sm:w-16 sm:h-16 text-yellow-400" fill="currentColor" />
                </motion.div>
              </div>
              <div className="absolute top-8 right-8">
                <motion.div
                  animate={{ rotate: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-pink-400" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SECTION 3: Premium Editorial Photo Sections - EDGE-TO-EDGE 90% VIEWPORT */}
        {allPhotos.length > 1 && (
          <div className="py-2 sm:py-3 lg:py-4 px-0 sm:px-1 lg:px-2 bg-gradient-to-b from-purple-950 to-pink-950">
            <div className="w-full max-w-[1800px] mx-auto px-1 sm:px-2 lg:px-4">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 120, rotate: index % 2 === 0 ? -5 : 5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-200px' }}
                  transition={{ duration: 1.5, delay: index * 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-6 sm:mb-8 last:mb-0"
                >
                  <div className="relative group">
                    {/* Premium polaroid frame - edge-to-edge feeling, 90% viewport width */}
                    <div className="relative overflow-hidden rounded-4xl sm:rounded-5xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)] border border-white/20 bg-white/5 backdrop-blur-2xl p-5 sm:p-6 pb-10 sm:pb-12">
                      <div className="aspect-[14/9] sm:aspect-[16/9] md:aspect-[18/9] lg:aspect-[20/9] xl:aspect-[22/9] rounded-3xl overflow-hidden bg-white/10 mb-5">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-1200 group-hover:scale-105"
                          sizes="100vw"
                        />
                      </div>
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 via-transparent to-purple-950/30 pointer-events-none" />
                      {/* Polaroid bottom decoration - larger */}
                      <div className="flex justify-center gap-5 relative z-10">
                        <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400" fill="currentColor" />
                        <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400" fill="currentColor" />
                        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                      </div>
                    </div>
                    
                    {/* Floating sticker - premium accent */}
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [-25, 25, -25],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="absolute -top-5 -right-5 z-10"
                    >
                      {index % 3 === 0 ? (
                        <Star className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-yellow-400" fill="currentColor" />
                      ) : index % 3 === 1 ? (
                        <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-pink-400" fill="currentColor" />
                      ) : (
                        <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-400" />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - DRAMATICALLY LARGER 300% */}
        <div className="min-h-screen flex items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-pink-950 to-yellow-950">
          <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium scrapbook card - DRAMATICALLY LARGER 300% */}
                <div className="bg-gradient-to-br from-white/25 via-pink-50/25 to-purple-50/25 backdrop-blur-3xl rounded-5xl sm:rounded-6xl md:rounded-7xl lg:rounded-8xl p-12 sm:p-16 md:p-28 lg:p-36 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.7)] border-2 border-dashed border-pink-400/60">
                  
                  {/* Tape strips - larger and more prominent */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400/50 backdrop-blur-sm px-10 py-4 sm:px-12 sm:py-5 transform rotate-2 shadow-lg" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-400/50 backdrop-blur-sm px-10 py-4 sm:px-12 sm:py-5 transform -rotate-1 shadow-lg" />
                  
                  {/* Animated decorative stickers - larger and more prominent */}
                  <div className="absolute -top-10 -left-10 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Gift className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:w-20 text-purple-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -top-10 -right-10 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <PartyPopper className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:w-20 text-pink-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Star className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:w-18 text-yellow-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Heart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:w-18 text-pink-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting - DRAMATICALLY LARGER */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-purple-100 mb-10 sm:mb-12 text-center leading-none"
                      style={{ fontFamily: 'var(--font-fredoka)', filter: 'drop-shadow(0 0 60px rgba(192, 132, 252, 0.5)) drop-shadow(0 0 120px rgba(192, 132, 252, 0.3)) drop-shadow(0 0 180px rgba(192, 132, 252, 0.15))' }}
                    >
                      Hey {card.recipient_name}! 🎂
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - DRAMATICALLY LARGER and emotional centerpiece */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed text-purple-50 mb-10 sm:mb-12 text-center font-light"
                      style={{ fontFamily: 'var(--font-baloo-2)', lineHeight: '1.7' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Closing with bouncing icons - larger */}
                  <div className="flex justify-center gap-5 sm:gap-6">
                    {[
                      { icon: Heart, color: 'text-pink-400' },
                      { icon: Star, color: 'text-yellow-400', fill: true },
                      { icon: Cake, color: 'text-purple-400' },
                      { icon: Heart, color: 'text-pink-400', fill: true },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.18 }}
                      >
                        <item.icon 
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:w-12 ${item.color}`} 
                          fill={item.fill ? 'currentColor' : undefined}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-yellow-950 to-purple-950 relative overflow-hidden">
          {/* Enhanced animated decorations */}
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
                rotate: [0, 30, -30, 0],
                scale: [1, 2.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              {i % 3 === 0 ? (
                <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="currentColor" />
              ) : i % 3 === 1 ? (
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-pink-400" fill="currentColor" />
              ) : (
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              )}
            </motion.div>
          ))}
          
          {/* Center cake with glow - larger */}
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
              <Cake className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:w-56 text-purple-400" />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500 rounded-full blur-3xl"
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
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-purple-100"
              style={{ fontFamily: 'var(--font-fredoka)', filter: 'drop-shadow(0 0 60px rgba(192, 132, 252, 0.5)) drop-shadow(0 0 120px rgba(192, 132, 252, 0.25))' }}
            >
              Have the best day ever! 🎉
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
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-purple-400/50 text-purple-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xl sm:text-2xl font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-purple-400/50 text-purple-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
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
            className="bg-white/15 backdrop-blur-2xl rounded-4xl p-8 sm:p-10 border border-purple-400/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="text-center">
              <motion.p
                className="text-lg sm:text-xl text-purple-300 mb-5"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                <div className="text-purple-400 text-base sm:text-lg">
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
              className="text-xl sm:text-2xl text-purple-300/80"
              style={{ fontFamily: 'var(--font-baloo-2)' }}
            >
              Created with <span className="text-purple-400">❤️</span> by Spectre
            </motion.p>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="cute" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
