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
import { ArrowDown, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface MinimalistTemplateProps {
  card: BirthdayCard;
}

export default function MinimalistTemplate({ card }: MinimalistTemplateProps) {
  const template = getTemplate('minimalist');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const coverScale = useTransform(scrollY, [300, 600], [1, 1.1]);

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
    <div className="min-h-screen relative overflow-hidden bg-gray-950">
      {/* Clean dark background with subtle texture */}
      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]"
        style={{ y }}
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
          {/* Happy Birthday - Inter font */}
          <TextReveal delay={0.3}>
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold mb-4 sm:mb-6 text-white tracking-tight"
              style={{ 
                fontFamily: 'var(--font-inter)',
                letterSpacing: '-0.03em',
              }}
            >
              Happy Birthday
            </motion.h1>
          </TextReveal>

          {/* Recipient Name - Inter */}
          <TextReveal delay={0.5}>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-gray-300 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {card.recipient_name}
            </motion.h2>
          </TextReveal>

          {/* Sender Section */}
          {card.sender_name && (
            <FadeUp delay={0.7}>
              <div className="mt-6 sm:mt-8">
                <span 
                  className="text-base sm:text-lg md:text-xl text-gray-400 tracking-wide"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  From {card.sender_name}
                </span>
              </div>
            </FadeUp>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-500"
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
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/80" />
              
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
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Simply beautiful
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SECTION 3: Premium Editorial Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
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
                    {/* Minimalist frame with subtle border */}
                    <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="aspect-[16/9] sm:aspect-[21/9]">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece - 200% Larger */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="max-w-6xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="bg-white/5 backdrop-blur-xl rounded-none p-8 sm:p-12 md:p-20 lg:p-28 border border-white/10">
                {/* Greeting - Much larger */}
                <TextReveal delay={0.4}>
                  <motion.p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 sm:mb-12 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Dear {card.recipient_name},
                  </motion.p>
                </TextReveal>
                
                {/* Message body - Significantly larger and emotional centerpiece */}
                <TextReveal delay={0.6}>
                  <motion.p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-relaxed text-gray-200 mb-8 sm:mb-12 font-light"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {card.message}
                  </motion.p>
                </TextReveal>

                {/* Signature - Larger */}
                {card.sender_name && (
                  <TextReveal delay={0.8}>
                    <motion.div className="text-center">
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-400 tracking-wide"
                        style={{ fontFamily: 'var(--font-inter)' }}
                      >
                        — {card.sender_name}
                      </motion.p>
                    </motion.div>
                  </TextReveal>
                )}
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale with Share & QR */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gray-950 relative overflow-hidden">
          {/* Animated subtle circles */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${5 + (i * 4)}%`,
                top: `${10 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.05, 0.2, 0.05],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white/10" />
            </motion.div>
          ))}
          
          {/* Center circle with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white/10" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-full blur-3xl"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              With love
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
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-base sm:text-lg font-medium">Share</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl"
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
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl"
          >
            <div className="text-center">
              <motion.p
                className="text-sm sm:text-base text-gray-400 mb-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Scan to view on mobile
              </motion.p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                <div className="text-gray-400 text-xs sm:text-sm">
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
              className="text-base sm:text-lg text-gray-500"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Created with <span className="text-white">❤️</span> by Spectre
            </motion.p>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="minimalist" />
        </div>
      </div>
    </div>
  );
}
