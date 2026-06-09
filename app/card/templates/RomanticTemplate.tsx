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
          className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-0 relative overflow-hidden"
        >
          {/* Premium gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-transparent to-rose-950/60 pointer-events-none" />
          
          {/* Floating heart centerpiece - extremely subtle to let name dominate */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.5, delay: 0.2 }}
            className="mb-1 sm:mb-2 relative z-10"
          >
            <div className="relative">
              <Heart className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:w-20 text-rose-400/70" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - ABSOLUTE DOMINANT VISUAL CENTERPIECE */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-bold text-center mb-0 sm:mb-1 leading-none tracking-tight px-1 sm:px-2"
              style={{ 
                fontFamily: 'var(--font-great-vibes)',
                background: 'linear-gradient(135deg, #fff5f5 0%, #fecdd3 15%, #fda4af 30%, #fb7185 50%, #f43f5e 70%, #fff5f5 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 8s ease infinite',
                filter: 'drop-shadow(0 0 100px rgba(244, 63, 94, 0.8)) drop-shadow(0 0 150px rgba(244, 63, 94, 0.5)) drop-shadow(0 0 200px rgba(244, 63, 94, 0.3))',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Subtitle - elegant and refined */}
          <FadeUp delay={0.6}>
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-200 text-center mb-1 sm:mb-2 font-light tracking-wider uppercase relative z-10"
              style={{ fontFamily: 'var(--font-playfair-display)', letterSpacing: '0.25em' }}
            >
              Happy Birthday
            </motion.p>
          </FadeUp>

          {/* Sender signature - elegant and minimal */}
          {card.sender_name && (
            <FadeUp delay={0.8}>
              <div className="text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="inline-block"
                >
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-2xl px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-rose-400/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                    <Pen className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400" />
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-rose-100 font-light tracking-wide"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
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
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-300/90"
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

        {/* SECTION 3: Premium Editorial Photo Sections - EDGE-TO-EDGE 90% VIEWPORT */}
        {allPhotos.length > 1 && (
          <div className="py-2 sm:py-3 lg:py-4 px-0 sm:px-1 lg:px-2 bg-gradient-to-b from-rose-950 to-pink-950">
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
                    {/* Premium frame - edge-to-edge feeling, 90% viewport width */}
                    <div className="relative overflow-hidden rounded-4xl sm:rounded-5xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)] border border-white/20 backdrop-blur-sm">
                      <div className="aspect-[14/9] sm:aspect-[16/9] md:aspect-[18/9] lg:aspect-[20/9] xl:aspect-[22/9]">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-1200 group-hover:scale-105"
                          sizes="100vw"
                        />
                      </div>
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-transparent to-rose-950/40" />
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-950/30 via-transparent to-rose-950/30" />
                    </div>
                    
                    {/* Floating decorative element - premium accent */}
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.15, 1]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="absolute -top-5 -right-5 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-rose-500/40 backdrop-blur-md rounded-full border-2 border-rose-400/60 shadow-[0_30px_60px_-20px_rgba(244,63,94,0.5)]"
                    >
                      <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-rose-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - DRAMATICALLY LARGER 300% */}
        <motion.div 
          ref={messageRef}
          className="min-h-screen flex items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-pink-950 to-rose-950"
        >
          <div className="w-full max-w-[1800px] mx-auto px-2 sm:px-4 lg:px-6">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium glassmorphism card - DRAMATICALLY LARGER 300% */}
                <div className="bg-gradient-to-br from-white/25 via-rose-50/25 to-pink-50/25 backdrop-blur-3xl rounded-5xl sm:rounded-6xl md:rounded-7xl lg:rounded-8xl p-12 sm:p-16 md:p-28 lg:p-36 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.7)] border border-rose-400/50">
                  
                  {/* Animated decorative corners - larger and more prominent */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        delay: i * 0.7 
                      }}
                      className={`absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 border-4 border-rose-400/70 ${
                        i === 0 ? 'top-6 left-6 border-t-4 border-l-4 rounded-tl-4xl' :
                        i === 1 ? 'top-6 right-6 border-t-4 border-r-4 rounded-tr-4xl' :
                        i === 2 ? 'bottom-6 left-6 border-b-4 border-l-4 rounded-bl-4xl' :
                        'bottom-6 right-6 border-b-4 border-r-4 rounded-br-4xl'
                      }`}
                    />
                  ))}

                  {/* Floating decorative elements - larger and more prominent */}
                  <div className="absolute top-10 right-12 sm:top-12 sm:right-14">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-rose-400/80" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-12 left-12 sm:bottom-14 sm:left-14">
                    <motion.div
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Heart className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:w-20 text-rose-400/80" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Letter greeting - DRAMATICALLY LARGER */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-rose-100 mb-10 sm:mb-12 text-center leading-none"
                      style={{ fontFamily: 'var(--font-great-vibes)', filter: 'drop-shadow(0 0 60px rgba(244, 63, 94, 0.5)) drop-shadow(0 0 120px rgba(244, 63, 94, 0.3)) drop-shadow(0 0 180px rgba(244, 63, 94, 0.15))' }}
                    >
                      Dearest {card.recipient_name},
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - DRAMATICALLY LARGER and emotional centerpiece */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed text-rose-50 mb-10 sm:mb-12 text-center font-light"
                      style={{ fontFamily: 'var(--font-playfair-display)', lineHeight: '1.7' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>

                  {/* Letter closing - DRAMATICALLY LARGER */}
                  <TextReveal delay={0.8}>
                    <motion.div className="text-center">
                      <motion.p
                        className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-rose-200"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                      >
                        Forever yours,
                      </motion.p>
                      {card.sender_name && (
                        <motion.p
                          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-rose-300 mt-8"
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
        <div className="min-h-screen flex flex-col items-center justify-center px-0 sm:px-1 lg:px-2 py-2 sm:py-3 lg:py-4 bg-gradient-to-b from-rose-950 to-red-950 relative overflow-hidden">
          {/* Enhanced floating particles */}
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
              {i % 2 === 0 ? (
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
              ) : (
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-rose-400" fill="currentColor" />
              )}
            </motion.div>
          ))}
          
          {/* Center heart with glow - larger */}
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
              <Heart className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:w-56 text-rose-400" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500 rounded-full blur-3xl"
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
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-rose-100"
              style={{ fontFamily: 'var(--font-great-vibes)', filter: 'drop-shadow(0 0 60px rgba(244, 63, 94, 0.5)) drop-shadow(0 0 120px rgba(244, 63, 94, 0.25))' }}
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
            className="flex flex-col sm:flex-row gap-5 sm:gap-7 items-center justify-center mb-10 sm:mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-rose-400/50 text-rose-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="text-xl sm:text-2xl font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-5 bg-white/20 backdrop-blur-2xl px-10 py-5 sm:px-12 sm:py-6 rounded-full border border-rose-400/50 text-rose-100 hover:bg-white/30 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
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
            className="bg-white/15 backdrop-blur-2xl rounded-4xl p-8 sm:p-10 border border-rose-400/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            <div className="text-center">
              <motion.p
                className="text-lg sm:text-xl text-rose-300 mb-5"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-36 h-36 sm:w-40 sm:h-40 bg-white/20 rounded-3xl flex items-center justify-center mx-auto">
                <div className="text-rose-400 text-base sm:text-lg">
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
              className="text-xl sm:text-2xl text-rose-300/80"
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
