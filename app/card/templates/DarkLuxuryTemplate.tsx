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
          className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-0 relative overflow-hidden"
        >
          {/* Premium gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
          
          {/* Rotating crown with glow - extremely subtle to let name dominate */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
            className="mb-1 sm:mb-2 relative z-10"
          >
            <Glow color="#ffd700">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <Crown className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:w-18 lg:w-22 lg:w-22 text-amber-500" />
              </motion.div>
            </Glow>
          </motion.div>

          {/* Recipient Name - ABSOLUTE DOMINANT VISUAL CENTERPIECE */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-light tracking-widest text-center mb-0 sm:mb-1 leading-none px-1 sm:px-2"
              style={{ 
                fontFamily: 'var(--font-cinzel)',
                background: 'linear-gradient(135deg, #fff5e6 0%, #ffd700 15%, #b8860b 30%, #ffd700 50%, #fff5e6 70%, #fff5e6 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 120px rgba(255, 215, 0, 0.9)',
                animation: 'goldGradient 8s ease infinite',
                filter: 'drop-shadow(0 0 100px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 150px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 200px rgba(255, 215, 0, 0.3))',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '400px', opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-1 sm:mb-2 relative z-10"
          />

          {/* Happy Birthday subtitle - elegant and refined */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-400 tracking-wider text-center mb-1 sm:mb-2 uppercase font-light relative z-10"
              style={{ fontFamily: 'var(--font-montserrat)', letterSpacing: '0.25em' }}
            >
              Happy Birthday
            </motion.p>
          </FadeUp>

          {/* Sender signature - elegant and minimal */}
          {card.sender_name && (
            <FadeUp delay={1}>
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="inline-block"
                >
                  <div className="px-8 py-4 sm:px-10 sm:py-5 border border-amber-500/50 bg-black/80 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-amber-300 tracking-[0.35em] uppercase font-light"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {card.sender_name}
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
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400/90"
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

        {/* SECTION 3: Premium Editorial Photo Sections - EDGE-TO-EDGE 90% VIEWPORT */}
        {allPhotos.length > 1 && (
          <div className="py-2 sm:py-3 lg:py-4 px-0 sm:px-1 lg:px-2 bg-gradient-to-b from-black to-gray-900">
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
                  <div className="relative group">
                    {/* Luxury gold frame - edge-to-edge feeling, 90% viewport width */}
                    <div className="relative overflow-hidden rounded-4xl sm:rounded-5xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)] border border-amber-500/60 bg-gradient-to-br from-amber-900/60 to-black/80 backdrop-blur-2xl p-4 sm:p-5">
                      <div className="bg-gray-900/90 backdrop-blur-sm p-4 sm:p-5 border border-amber-500/50">
                        <div className="aspect-[14/9] sm:aspect-[16/9] md:aspect-[18/9] lg:aspect-[20/9] xl:aspect-[22/9] rounded-3xl overflow-hidden bg-gray-800">
                          <Image
                            src={photo}
                            alt={`Memory ${index + 2}`}
                            fill
                            className="object-cover transition-transform duration-1200 group-hover:scale-105"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
                    </div>
                    {/* Animated gem accent - premium */}
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.25, 1]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-amber-500 shadow-[0_30px_60px_-20px_rgba(255,215,0,0.5)]"
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - DRAMATICALLY LARGER 300% */}
        <div className="min-h-screen flex items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium black card with gold glow - DRAMATICALLY LARGER 300% */}
                <div className="bg-gradient-to-br from-gray-900/98 to-black/99 backdrop-blur-3xl p-12 sm:p-16 md:p-28 lg:p-36 border border-amber-500/70 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.7)]">
                  
                  {/* Gold corner ornaments - larger and more prominent */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }}
                      transition={{ duration: 5, repeat: Infinity, delay: i * 0.6 }}
                      className={`absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:w-28 lg:w-32 lg:w-32 text-amber-500 ${
                        i === 0 ? 'top-8 left-8' :
                        i === 1 ? 'top-8 right-8' :
                        i === 2 ? 'bottom-8 left-8' :
                        'bottom-8 right-8'
                      }`}
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  ))}
                  
                  {/* Decorative crown - larger */}
                  <div className="text-center mb-10 sm:mb-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Glow color="#ffd700">
                        <Crown className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:w-18 lg:w-20 lg:w-20 text-amber-500 mx-auto" />
                      </Glow>
                    </motion.div>
                  </div>
                  
                  {/* Greeting - DRAMATICALLY LARGER */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-center tracking-widest text-amber-300 mb-10 sm:mb-12 uppercase leading-none"
                      style={{ fontFamily: 'var(--font-cinzel)', filter: 'drop-shadow(0 0 60px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 120px rgba(255, 215, 0, 0.3)) drop-shadow(0 0 180px rgba(255, 215, 0, 0.15))' }}
                    >
                      To {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - DRAMATICALLY LARGER and emotional centerpiece */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-loose text-amber-100 mb-10 sm:mb-12"
                      style={{ fontFamily: 'var(--font-montserrat)', lineHeight: '1.8' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Signature - DRAMATICALLY LARGER */}
                  {card.sender_name && (
                    <TextReveal delay={0.9}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-amber-400 tracking-wide uppercase"
                          style={{ fontFamily: 'var(--font-cinzel)' }}
                        >
                          — {card.sender_name}
                        </motion.p>
                      </motion.div>
                    </TextReveal>
                  )}
                  
                  {/* Decorative crown with glow - larger */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex justify-center mt-10 sm:mt-12"
                  >
                    <Glow color="#ffd700">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                      >
                        <Crown className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:w-20 lg:w-22 lg:w-22 text-amber-500" />
                      </motion.div>
                    </Glow>
                  </motion.div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-black relative overflow-hidden">
          {/* Animated gold particles */}
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
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
            </motion.div>
          ))}
          
          {/* Center crown with glow - larger */}
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
              <Glow color="#ffd700">
                <Crown className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:w-56 text-amber-500" />
              </Glow>
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 bg-amber-500 rounded-full blur-3xl"
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
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-amber-400 tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-cinzel)', filter: 'drop-shadow(0 0 60px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 120px rgba(255, 215, 0, 0.25))' }}
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
            className="flex flex-col sm:flex-row gap-5 sm:gap-7 items-center justify-center mb-10 sm:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-amber-500/50 text-amber-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xl sm:text-2xl font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-amber-500/50 text-amber-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
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
            className="bg-white/15 backdrop-blur-2xl rounded-4xl p-8 sm:p-10 border border-amber-500/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="text-center">
              <motion.p
                className="text-lg sm:text-xl text-amber-300 mb-5"
                style={{ fontFamily: 'var(--font-montserrat)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                <div className="text-amber-400 text-base sm:text-lg">
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
              className="text-xl sm:text-2xl text-amber-300/80"
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
