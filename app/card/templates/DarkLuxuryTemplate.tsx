'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import DarkEffects from '@/components/animations/DarkEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn, Glow } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Gem, Sparkles, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface DarkLuxuryTemplateProps {
  card: BirthdayCard;
}

export default function DarkLuxuryTemplate({ card }: DarkLuxuryTemplateProps) {
  const template = getTemplate('dark-luxury');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

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
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Rotating crown with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
            className="mb-10 sm:mb-14"
          >
            <Glow color="#ffd700">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                <Crown className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 text-amber-500" />
              </motion.div>
            </Glow>
          </motion.div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.4}>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-widest text-center mb-8 sm:mb-10"
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
            animate={{ width: '300px', opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-10 sm:mb-14"
          />

          {/* Happy Birthday subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 tracking-wider text-center mb-10 sm:mb-14 uppercase"
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
                  <div className="px-12 py-5 sm:px-16 sm:py-6 border-2 border-amber-500/50 bg-black/70 backdrop-blur-sm shadow-2xl">
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-amber-300 tracking-[0.3em] uppercase"
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
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400"
            >
              <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Cinematic Cover Photo */}
        {allPhotos.length > 0 && (
          <div className="relative h-screen w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
              {/* Gold corner accents */}
              <div className="absolute top-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-l-4 border-amber-500/60" />
              <div className="absolute top-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-r-4 border-amber-500/60" />
              <div className="absolute bottom-8 left-8 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-l-4 border-amber-500/60" />
              <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-r-4 border-amber-500/60" />
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Premium Photo Sections */}
        {allPhotos.length > 1 && (
          <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {allPhotos.slice(1).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="mb-16 sm:mb-20 last:mb-0"
                >
                  <div className="relative">
                    {/* Luxury gold frame */}
                    <div className="bg-gradient-to-br from-amber-900/40 to-black/60 backdrop-blur-sm p-3 sm:p-4 border border-amber-500/40 shadow-2xl">
                      <div className="bg-gray-900/80 p-4 sm:p-6 border border-amber-500/30">
                        <div className="aspect-[16/9] rounded-sm overflow-hidden bg-gray-800">
                          <Image
                            src={photo}
                            alt={`Memory ${index + 2}`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Animated gem accent */}
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 text-amber-500"
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto w-full">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium black card with gold glow */}
                <div className="bg-gradient-to-br from-gray-900/95 to-black/98 backdrop-blur-sm p-14 sm:p-20 md:p-28 lg:p-36 border border-amber-500/40 shadow-2xl">
                  
                  {/* Gold corner ornaments */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                      className={`absolute w-16 h-16 sm:w-20 sm:h-20 text-amber-500 ${
                        i === 0 ? 'top-8 left-8' :
                        i === 1 ? 'top-8 right-8' :
                        i === 2 ? 'bottom-8 left-8' :
                        'bottom-8 right-8'
                      }`}
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  ))}
                  
                  {/* Decorative crown */}
                  <div className="text-center mb-12 sm:mb-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <Glow color="#ffd700">
                        <Crown className="w-12 h-12 sm:w-14 sm:h-14 text-amber-500 mx-auto" />
                      </Glow>
                    </motion.div>
                  </div>
                  
                  {/* Greeting */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-widest text-amber-300 mb-12 sm:mb-16 uppercase"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      To {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Emotional centerpiece */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-loose text-amber-100 mb-12 sm:mb-16"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Signature */}
                  {card.sender_name && (
                    <TextReveal delay={0.9}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 tracking-wide uppercase"
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
                    className="flex justify-center mt-12 sm:mt-16"
                  >
                    <Glow color="#ffd700">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <Crown className="w-14 h-14 sm:w-16 sm:h-16 text-amber-500" />
                      </motion.div>
                    </Glow>
                  </motion.div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>

        {/* SECTION 5: Celebration Finale */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Animated gold particles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 6)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.6, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
              </motion.div>
            ))}
            
            {/* Center crown with glow */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Glow color="#ffd700">
                <Crown className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-amber-500" />
              </Glow>
            </motion.div>

            {/* Final message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center mt-12 sm:mt-16"
            >
              <motion.p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                Long live the celebration
              </motion.p>
            </motion.div>
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
