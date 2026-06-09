'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Heart, Gift, PartyPopper, Sparkles, Smile, Cake } from 'lucide-react';
import Image from 'next/image';

interface CuteTemplateProps {
  card: BirthdayCard;
}

export default function CuteTemplate({ card }: CuteTemplateProps) {
  const template = getTemplate('cute');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100">
      {/* Animated colorful gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-yellow-200/30"
        style={{ y }}
      />
      
      {/* Cute floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 25, -25, 0],
              scale: [1, 1.3, 1],
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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full Screen Immersive */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Bouncing decorations */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}
              >
                {i % 2 === 0 ? (
                  <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="currentColor" />
                ) : (
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400" fill="currentColor" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Recipient Name - Centerpiece */}
          <TextReveal delay={0.3}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-4 sm:mb-6"
              style={{ 
                fontFamily: 'var(--font-fredoka)',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6, #f59e0b, #ec4899)',
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
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-purple-700"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                Happy Birthday!
              </motion.p>
              <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500" />
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
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full border-4 border-pink-300 shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" fill="currentColor" />
                    <span 
                      className="text-base sm:text-lg md:text-xl text-purple-700 font-bold"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      From {card.sender_name} 💖
                    </span>
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
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
              className="text-purple-400"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Polaroid Photo Gallery - Scrapbook Style */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {card.photos && card.photos.length > 0 ? (
                card.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -8 : 8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Polaroid frame */}
                    <div className="bg-white p-3 sm:p-4 pb-8 sm:pb-10 rounded-sm shadow-2xl transform hover:rotate-0 hover:scale-105 transition-all duration-300">
                      <div className="aspect-square rounded-sm overflow-hidden bg-gray-100 mb-3 sm:mb-4">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      {/* Polaroid bottom decoration */}
                      <div className="flex justify-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                        <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        <Heart className="w-4 h-4 text-purple-400" fill="currentColor" />
                      </div>
                    </div>
                    {/* Sticker */}
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-3 -right-3 z-10"
                    >
                      {index % 3 === 0 ? (
                        <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="currentColor" />
                      ) : index % 3 === 1 ? (
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" fill="currentColor" />
                      ) : (
                        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                      )}
                    </motion.div>
                  </motion.div>
                ))
              ) : card.cover_photo ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-2 lg:col-span-3"
                >
                  <div className="bg-white p-4 sm:p-6 pb-10 sm:pb-12 rounded-sm shadow-2xl transform hover:rotate-0 transition-transform duration-300">
                    <div className="aspect-video rounded-sm overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={card.cover_photo}
                        alt="Cover photo"
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Scrapbook Note Message Card - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="relative">
                {/* Paper texture background with tape effect - larger and more prominent */}
                <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-10 sm:p-14 md:p-20 lg:p-28 shadow-2xl border-4 border-dashed border-pink-300 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Tape strips */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200/80 px-8 py-2 transform rotate-2 shadow-sm" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-200/80 px-8 py-2 transform -rotate-1 shadow-sm" />
                  
                  {/* Decorative stickers */}
                  <div className="absolute -top-8 -left-8 z-10">
                    <motion.div
                      animate={{ rotate: [-8, 8, -8] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Gift className="w-14 h-14 sm:w-16 sm:h-16 text-purple-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -top-8 -right-8 z-10">
                    <motion.div
                      animate={{ rotate: [8, -8, 8] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <PartyPopper className="w-14 h-14 sm:w-16 sm:h-16 text-pink-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-8 -left-8 z-10">
                    <motion.div
                      animate={{ rotate: [8, -8, 8] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Star className="w-12 h-12 sm:w-14 sm:h-14 text-yellow-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 z-10">
                    <motion.div
                      animate={{ rotate: [-8, 8, -8] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-pink-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-purple-700 mb-10 sm:mb-14 text-center"
                      style={{ fontFamily: 'var(--font-fredoka)' }}
                    >
                      Hey {card.recipient_name}! 🎂
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - LARGER and more prominent */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-purple-900 mb-10 sm:mb-14 text-center"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Closing with bouncing icons */}
                  <div className="flex justify-center gap-4 sm:gap-6">
                    {[
                      { icon: Heart, color: 'text-pink-500' },
                      { icon: Star, color: 'text-yellow-400', fill: true },
                      { icon: Cake, color: 'text-purple-500' },
                      { icon: Heart, color: 'text-pink-500', fill: true },
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

        {/* Final Wow Factor - Floating Decorations */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated decorations */}
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
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.3, 1],
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
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" fill="currentColor" />
                  ) : (
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  )}
                </motion.div>
              ))}
              
              {/* Center cake */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Cake className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="cute" />
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
