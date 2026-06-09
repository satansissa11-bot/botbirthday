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
import { Crown, Gem, Sparkles } from 'lucide-react';
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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full Screen VIP Experience */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Rotating crown with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2, type: 'spring' }}
            className="mb-8 sm:mb-12"
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

          {/* Recipient Name - Centerpiece */}
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-400 tracking-wider text-center mb-6 sm:mb-8 uppercase"
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
                  <div className="px-8 py-3 sm:px-10 sm:py-4 border border-amber-500/50 bg-black/60 backdrop-blur-sm">
                    <span 
                      className="text-sm sm:text-base md:text-lg text-amber-300 tracking-[0.3em] uppercase"
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
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Photo Section - Premium Framed */}
        {card.cover_photo && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-5xl mx-auto">
              <ScaleIn delay={0.2}>
                <div className="relative">
                  {/* Luxury gold frame */}
                  <div className="bg-gradient-to-br from-amber-900/40 to-black/60 backdrop-blur-sm p-2 sm:p-3 border border-amber-500/40 shadow-2xl">
                    <div className="bg-gray-900/80 p-4 sm:p-6 border border-amber-500/30">
                      <div className="aspect-video rounded-sm overflow-hidden">
                        <Image
                          src={card.cover_photo}
                          alt="Cover photo"
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animated gold corner gems */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      className={`absolute w-8 h-8 sm:w-10 sm:h-10 text-amber-500 ${
                        i === 0 ? '-top-3 -left-3' :
                        i === 1 ? '-top-3 -right-3' :
                        i === 2 ? '-bottom-3 -left-3' :
                        '-bottom-3 -right-3'
                      }`}
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  ))}
                </div>
              </ScaleIn>
            </div>
          </div>
        )}

        {/* Photo Gallery - Premium Grid */}
        {card.photos && card.photos.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {card.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.12 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-amber-900/30 to-black/50 backdrop-blur-sm p-2 border border-amber-500/30 shadow-xl">
                      <div className="bg-gray-900/80 p-2 border border-amber-500/20">
                        <div className="aspect-square rounded-sm overflow-hidden bg-gray-800">
                          <Image
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Animated gem accent */}
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 text-amber-500"
                    >
                      <Gem className="w-full h-full" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIP Invitation Message Card - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Premium black card with gold glow - larger and more prominent */}
                <div className="bg-gradient-to-br from-gray-900/95 to-black/98 backdrop-blur-sm p-12 sm:p-16 md:p-24 lg:p-32 border border-amber-500/40 shadow-2xl">
                  
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
                  <div className="text-center mb-10 sm:mb-14">
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
                  
                  {/* Greeting */}
                  <TextReveal delay={0.5}>
                    <motion.p
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center tracking-widest text-amber-300 mb-10 sm:mb-14 uppercase"
                      style={{ fontFamily: 'var(--font-cinzel)' }}
                    >
                      To {card.recipient_name}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - LARGER and more prominent */}
                  <TextReveal delay={0.7}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-loose text-amber-100 mb-10 sm:mb-14"
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
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-400 tracking-wide uppercase"
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
                    className="flex justify-center mt-10 sm:mt-14"
                  >
                    <Glow color="#ffd700">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
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

        {/* Final Wow Factor - VIP Gold Particles */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated gold particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                >
                  <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                </motion.div>
              ))}
              
              {/* Center crown with glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Glow color="#ffd700">
                  <Crown className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-amber-500" />
                </Glow>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="dark-luxury" />
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
