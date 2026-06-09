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
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative"
        >
          {/* Bouncing decorations */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                {i % 2 === 0 ? (
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                ) : (
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.3}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-4 sm:mb-6 leading-tight"
              style={{ 
                fontFamily: 'var(--font-fredoka)',
                background: 'linear-gradient(135deg, #f9a8d4, #c084fc, #fbbf24, #f9a8d4)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 6s ease infinite',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Happy Birthday subtitle */}
          <FadeUp delay={0.5}>
            <motion.div
              className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple-200"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                Happy Birthday!
              </motion.p>
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
            </motion.div>
          </FadeUp>

          {/* Sender signature */}
          {card.sender_name && (
            <FadeUp delay={0.7}>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, type: 'spring' }}
                  className="inline-block"
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-pink-400/30 shadow-2xl">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" />
                    <span 
                      className="text-base sm:text-lg md:text-xl text-purple-100 font-bold"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      From {card.sender_name} 💖
                    </span>
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-300"
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

        {/* SECTION 3: Premium Editorial Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-950 to-pink-950">
            <div className="max-w-6xl mx-auto">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -3 : 3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mb-8 sm:mb-12 last:mb-0"
                >
                  <div className="relative group">
                    {/* Premium polaroid frame with glassmorphism */}
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-white/5 backdrop-blur-md p-3 sm:p-4 pb-8 sm:pb-10">
                      <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-white/10 mb-4">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="100vw"
                        />
                      </div>
                      {/* Polaroid bottom decoration */}
                      <div className="flex justify-center gap-4">
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" />
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                      </div>
                    </div>
                    
                    {/* Floating sticker */}
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotate: [-15, 15, -15]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute -top-3 -right-3 z-10"
                    >
                      {index % 3 === 0 ? (
                        <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                      ) : index % 3 === 1 ? (
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                      ) : (
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - 200% Larger */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-pink-950 to-yellow-950">
          <div className="max-w-6xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium scrapbook card - Significantly larger */}
                <div className="bg-gradient-to-br from-white/10 via-pink-50/10 to-purple-50/10 backdrop-blur-xl rounded-3xl sm:rounded-4xl md:rounded-5xl p-8 sm:p-12 md:p-20 lg:p-28 shadow-2xl border-2 border-dashed border-pink-400/30">
                  
                  {/* Tape strips */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400/20 backdrop-blur-sm px-8 py-2 sm:px-10 sm:py-3 transform rotate-2 shadow-sm" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-400/20 backdrop-blur-sm px-8 py-2 sm:px-10 sm:py-3 transform -rotate-1 shadow-sm" />
                  
                  {/* Animated decorative stickers */}
                  <div className="absolute -top-8 -left-8 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Gift className="w-12 h-12 sm:w-14 sm:h-14 text-purple-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -top-8 -right-8 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <PartyPopper className="w-12 h-12 sm:w-14 sm:h-14 text-pink-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting - Much larger */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-purple-100 mb-8 sm:mb-12 text-center leading-tight"
                      style={{ fontFamily: 'var(--font-fredoka)' }}
                    >
                      Hey {card.recipient_name}! 🎂
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Significantly larger and emotional centerpiece */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed text-purple-50 mb-8 sm:mb-12 text-center font-light"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Closing with bouncing icons */}
                  <div className="flex justify-center gap-4 sm:gap-6">
                    {[
                      { icon: Heart, color: 'text-pink-400' },
                      { icon: Star, color: 'text-yellow-400', fill: true },
                      { icon: Cake, color: 'text-purple-400' },
                      { icon: Heart, color: 'text-pink-400', fill: true },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.15 }}
                      >
                        <item.icon 
                          className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color}`} 
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
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-yellow-950 to-purple-950 relative overflow-hidden">
          {/* Enhanced animated decorations */}
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
                rotate: [0, 20, -20, 0],
                scale: [1, 1.6, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              {i % 3 === 0 ? (
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" fill="currentColor" />
              ) : i % 3 === 1 ? (
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-pink-400" fill="currentColor" />
              ) : (
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              )}
            </motion.div>
          ))}
          
          {/* Center cake with glow */}
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
              <Cake className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-purple-400" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500 rounded-full blur-3xl"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-purple-100"
              style={{ fontFamily: 'var(--font-fredoka)' }}
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
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-8 sm:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-purple-400/30 text-purple-100 hover:bg-white/20 transition-all shadow-xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-purple-400/30 text-purple-100 hover:bg-white/20 transition-all shadow-xl"
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
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-purple-400/20 shadow-2xl"
          >
            <div className="text-center">
              <motion.p
                className="text-sm sm:text-base text-purple-300 mb-4"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-purple-400 text-xs sm:text-sm">
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
              className="text-base sm:text-lg text-purple-300/60"
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
