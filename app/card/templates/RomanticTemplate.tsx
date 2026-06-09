'use client';

import { useState, useEffect, useRef } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, FloatingParticles, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Sparkles, Pen, ArrowDown, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface RomanticTemplateProps {
  card: BirthdayCard;
}

export default function RomanticTemplate({ card }: RomanticTemplateProps) {
  const template = getTemplate('romantic');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  
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
          title: `Happy Birthday ${card.recipient_name}!`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-950 via-pink-950 to-red-950">
      {/* Animated rose gold gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-rose-900/30 via-pink-900/20 to-red-900/30"
        style={{ y }}
      />
      
      {/* Floating hearts effect */}
      <RomanticEffects enabled />
      
      {/* Soft rose gold particles */}
      <FloatingParticles count={60} color="#B76E79" />
      
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
          {/* Floating heart centerpiece */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.5, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative">
              <Heart className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 text-rose-400" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.5}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-4 sm:mb-6 leading-tight"
              style={{ 
                fontFamily: 'var(--font-great-vibes)',
                background: 'linear-gradient(135deg, #fecdd3, #fda4af, #fb7185, #f43f5e)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 8s ease infinite',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-200 text-center mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
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
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-rose-400/30 shadow-2xl">
                    <Pen className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
                    <span 
                      className="text-base sm:text-lg md:text-xl text-rose-100"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      With love, {card.sender_name}
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
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-300"
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
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-rose-950/40 to-rose-950/60" />
              
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
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-100 font-light"
                    style={{ fontFamily: 'var(--font-playfair-display)' }}
                  >
                    A journey through memories
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SECTION 3: Premium Editorial Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-950 to-pink-950">
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
                  <div className="relative group">
                    {/* Premium frame with glassmorphism */}
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                      <div className="aspect-[16/9] sm:aspect-[21/9]">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="100vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Floating decorative element */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute -top-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/20 backdrop-blur-sm rounded-full border border-rose-400/30"
                    >
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - 200% Larger */}
        <motion.div 
          ref={messageRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-pink-950 to-rose-950"
        >
          <div className="max-w-6xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium glassmorphism card - Significantly larger */}
                <div className="bg-gradient-to-br from-white/10 via-rose-50/10 to-pink-50/10 backdrop-blur-xl rounded-3xl sm:rounded-4xl md:rounded-5xl p-8 sm:p-12 md:p-20 lg:p-28 shadow-2xl border border-rose-400/20">
                  
                  {/* Animated decorative corners */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.5 
                      }}
                      className={`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 border-2 border-rose-400/40 ${
                        i === 0 ? 'top-4 left-4 border-t-2 border-l-2 rounded-tl-2xl' :
                        i === 1 ? 'top-4 right-4 border-t-2 border-r-2 rounded-tr-2xl' :
                        i === 2 ? 'bottom-4 left-4 border-b-2 border-l-2 rounded-bl-2xl' :
                        'bottom-4 right-4 border-b-2 border-r-2 rounded-br-2xl'
                      }`}
                    />
                  ))}

                  {/* Floating decorative elements */}
                  <div className="absolute top-8 right-12 sm:top-12 sm:right-16">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-rose-400/50" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-12 left-12 sm:bottom-16 sm:left-16">
                    <motion.div
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-rose-400/50" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Letter greeting - Much larger */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-rose-100 mb-8 sm:mb-12 text-center leading-tight"
                      style={{ fontFamily: 'var(--font-great-vibes)' }}
                    >
                      Dearest {card.recipient_name},
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Significantly larger and emotional centerpiece */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed text-rose-50 mb-8 sm:mb-12 text-center font-light"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Letter closing - Larger */}
                  <TextReveal delay={0.8}>
                    <motion.div className="text-center">
                      <motion.p
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-rose-200"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                      >
                        Forever yours,
                      </motion.p>
                      {card.sender_name && (
                        <motion.p
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-rose-300 mt-4"
                          style={{ fontFamily: 'var(--font-playfair-display)' }}
                        >
                          {card.sender_name}
                        </motion.p>
                      )}
                    </motion.div>
                  </TextReveal>
                </div>
              </div>
            </ScaleIn>
          </div>
        </motion.div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-rose-950 to-red-950 relative overflow-hidden">
          {/* Enhanced floating particles */}
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
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              {i % 2 === 0 ? (
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
              ) : (
                <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-rose-400" fill="currentColor" />
              )}
            </motion.div>
          ))}
          
          {/* Center heart with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="relative"
            >
              <Heart className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 text-rose-400" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 rounded-full blur-3xl"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-rose-100"
              style={{ fontFamily: 'var(--font-great-vibes)' }}
            >
              With all my love
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
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-rose-400/30 text-rose-100 hover:bg-white/20 transition-all shadow-xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-rose-400/30 text-rose-100 hover:bg-white/20 transition-all shadow-xl"
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
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-rose-400/20 shadow-2xl"
          >
            <div className="text-center">
              <motion.p
                className="text-sm sm:text-base text-rose-300 mb-4"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-rose-400 text-xs sm:text-sm">
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
              className="text-base sm:text-lg text-rose-300/60"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              Created with <span className="text-rose-400">❤️</span> by Spectre
            </motion.p>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="romantic" />
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
