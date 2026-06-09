'use client';

import { useState, useEffect, useRef } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import DarkEffects from '@/components/animations/DarkEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn, Glow } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Gem, Sparkles, ArrowDown, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface DarkLuxuryTemplateProps {
  card: BirthdayCard;
}

export default function DarkLuxuryTemplate({ card }: DarkLuxuryTemplateProps) {
  const template = getTemplate('dark-luxury');
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
      {/* Dark luxury animated background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ y }}
      />
      
      {/* Gold particle effects */}
      <DarkEffects enabled />
      
      {/* Cinematic vignette */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      
      {/* Animated gold border */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 border-2 border-amber-500/20"
        />
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
          {/* Rotating crown with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
            className="mb-6 sm:mb-8"
          >
            <Glow color="#ffd700">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <Crown className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-amber-500" />
              </motion.div>
            </Glow>
          </motion.div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-widest text-center mb-4 sm:mb-6"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(135deg, #ffd700, #b8860b, #ffd700, #b8860b)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px rgba(255, 215, 0, 0.6)',
                animation: 'goldGradient 8s ease infinite',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '200px', opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6 sm:mb-8"
          />

          {/* Happy Birthday subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-amber-400 tracking-wider text-center mb-6 sm:mb-8 uppercase"
              style={{ fontFamily: 'var(--font-montserrat)' }}
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
                  <div className="px-8 py-3 sm:px-10 sm:py-4 border border-amber-500/50 bg-black/70 backdrop-blur-md shadow-2xl">
                    <span 
                      className="text-base sm:text-lg md:text-xl text-amber-300 tracking-[0.3em] uppercase"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
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
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
              
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
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-100 font-light tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    A royal celebration
                  </motion.p>
                </motion.div>
              </div>

              {/* Gold corner accents */}
              <div className="absolute top-8 left-8 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-8 right-8 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-8 left-8 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-8 right-8 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-amber-500/60" />
            </motion.div>
          </motion.div>
        )}

        {/* SECTION 3: Premium Editorial Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
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
                    {/* Luxury gold frame with glassmorphism */}
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-amber-900/40 to-black/60 backdrop-blur-md p-2 sm:p-3 border border-amber-500/40">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-3 sm:p-4 border border-amber-500/30">
                        <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-gray-800">
                          <Image
                            src={photo}
                            alt={`Memory ${index + 2}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Animated gem accent */}
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 text-amber-500"
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - 200% Larger */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium black card with gold glow - Significantly larger */}
                <div className="bg-gradient-to-br from-gray-900/95 to-black/98 backdrop-blur-xl p-8 sm:p-12 md:p-20 lg:p-28 border border-amber-500/40 shadow-2xl">
                  
                  {/* Gold corner ornaments */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                      className={`absolute w-12 h-12 sm:w-16 sm:h-16 text-amber-500 ${
                        i === 0 ? 'top-6 left-6' :
                        i === 1 ? 'top-6 right-6' :
                        i === 2 ? 'bottom-6 left-6' :
                        'bottom-6 right-6'
                      }`}
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  ))}
                  
                  {/* Decorative crown */}
                  <div className="text-center mb-8 sm:mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Glow color="#ffd700">
                        <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 mx-auto" />
                      </Glow>
                    </motion.div>
                  </div>
                  
                  {/* Greeting - Much larger */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center tracking-widest text-amber-300 mb-8 sm:mb-12 uppercase"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      To {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Significantly larger and emotional centerpiece */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-loose text-amber-100 mb-8 sm:mb-12"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Signature - Larger */}
                  {card.sender_name && (
                    <TextReveal delay={0.9}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-400 tracking-wide uppercase"
                          style={{ fontFamily: 'var(--font-cinzel)' }}
                        >
                          — {card.sender_name}
                        </motion.p>
                      </motion.div>
                    </TextReveal>
                  )}
                  
                  {/* Decorative crown with glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex justify-center mt-8 sm:mt-12"
                  >
                    <Glow color="#ffd700">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <Crown className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500" />
                      </motion.div>
                    </Glow>
                  </motion.div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-black relative overflow-hidden">
          {/* Animated gold particles */}
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
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
            </motion.div>
          ))}
          
          {/* Center crown with glow */}
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
              <Glow color="#ffd700">
                <Crown className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-amber-500" />
              </Glow>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500 rounded-full blur-3xl"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-400 tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              Long live the celebration
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
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-amber-500/30 text-amber-100 hover:bg-white/20 transition-all shadow-xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-amber-500/30 text-amber-100 hover:bg-white/20 transition-all shadow-xl"
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
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-amber-500/20 shadow-2xl"
          >
            <div className="text-center">
              <motion.p
                className="text-sm sm:text-base text-amber-300 mb-4"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-amber-400 text-xs sm:text-sm">
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
              className="text-base sm:text-lg text-amber-300/60"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Created with <span className="text-amber-400">❤️</span> by Spectre
            </motion.p>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="dark-luxury" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes goldGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
