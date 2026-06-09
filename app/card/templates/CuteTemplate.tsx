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
import { Star, Heart, Gift, PartyPopper, Sparkles, Smile, Cake, ArrowDown } from 'lucide-react';
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

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

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
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero with Recipient Name */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Bouncing decorations */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -25, 0], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              >
                {i % 2 === 0 ? (
                  <Star className="w-12 h-12 sm:w-14 sm:h-14 text-yellow-400" fill="currentColor" />
                ) : (
                  <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-pink-400" fill="currentColor" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.3}>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-center mb-8 sm:mb-10 leading-tight"
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
              className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14"
            >
              <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />
              <motion.p
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-purple-700"
                style={{ fontFamily: 'var(--font-baloo-2)' }}
              >
                Happy Birthday!
              </motion.p>
              <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500" />
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
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-10 py-5 sm:px-12 sm:py-6 rounded-full border-4 border-pink-300 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-pink-500" fill="currentColor" />
                    <span 
                      className="text-xl sm:text-2xl md:text-3xl text-purple-700 font-bold"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      From {card.sender_name} 💖
                    </span>
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500" />
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
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-400"
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
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent" />
              {/* Cute stickers overlay */}
              <div className="absolute top-8 left-8">
                <motion.div
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" fill="currentColor" />
                </motion.div>
              </div>
              <div className="absolute top-8 right-8">
                <motion.div
                  animate={{ rotate: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-pink-400" fill="currentColor" />
                </motion.div>
              </div>
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
                  initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="mb-16 sm:mb-20 last:mb-0"
                >
                  <div className="relative">
                    {/* Polaroid frame */}
                    <div className="bg-white p-4 sm:p-6 pb-10 sm:pb-12 rounded-sm shadow-2xl transform hover:rotate-0 hover:scale-[1.02] transition-all duration-500">
                      <div className="aspect-[16/9] rounded-sm overflow-hidden bg-gray-100 mb-4">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                      {/* Polaroid bottom decoration */}
                      <div className="flex justify-center gap-3">
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" />
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                      </div>
                    </div>
                    {/* Sticker */}
                    <motion.div
                      animate={{ rotate: [-15, 15, -15] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 z-10"
                    >
                      {index % 3 === 0 ? (
                        <Star className="w-12 h-12 sm:w-14 sm:h-14 text-yellow-400" fill="currentColor" />
                      ) : index % 3 === 1 ? (
                        <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-pink-400" fill="currentColor" />
                      ) : (
                        <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-purple-400" />
                      )}
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
                {/* Scrapbook paper texture */}
                <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-12 sm:p-16 md:p-24 lg:p-32 shadow-2xl border-4 border-dashed border-pink-300 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Tape strips */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-200/80 px-10 py-3 transform rotate-2 shadow-sm" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-200/80 px-10 py-3 transform -rotate-1 shadow-sm" />
                  
                  {/* Decorative stickers */}
                  <div className="absolute -top-10 -left-10 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-purple-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -top-10 -right-10 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20 text-pink-400" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 z-10">
                    <motion.div
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Star className="w-14 h-14 sm:w-16 sm:h-16 text-yellow-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 z-10">
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-pink-400" fill="currentColor" />
                    </motion.div>
                  </div>
                  
                  {/* Greeting */}
                  <TextReveal delay={0.4}>
                    <motion.p
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-purple-700 mb-12 sm:mb-16 text-center"
                      style={{ fontFamily: 'var(--font-fredoka)' }}
                    >
                      Hey {card.recipient_name}! 🎂
                    </motion.p>
                  </TextReveal>
                  
                  {/* Message body - Emotional centerpiece */}
                  <TextReveal delay={0.6}>
                    <motion.p
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed text-purple-900 mb-12 sm:mb-16 text-center"
                      style={{ fontFamily: 'var(--font-baloo-2)' }}
                    >
                      {card.message}
                    </motion.p>
                  </TextReveal>
                  
                  {/* Closing with bouncing icons */}
                  <div className="flex justify-center gap-5 sm:gap-7">
                    {[
                      { icon: Heart, color: 'text-pink-500' },
                      { icon: Star, color: 'text-yellow-400', fill: true },
                      { icon: Cake, color: 'text-purple-500' },
                      { icon: Heart, color: 'text-pink-500', fill: true },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.15 }}
                      >
                        <item.icon 
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color}`} 
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

        {/* SECTION 5: Celebration Finale */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Animated decorations */}
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
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                {i % 3 === 0 ? (
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="currentColor" />
                ) : i % 3 === 1 ? (
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" fill="currentColor" />
                ) : (
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                )}
              </motion.div>
            ))}
            
            {/* Center cake */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Cake className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-purple-500" />
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-purple-700"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Have the best day ever! 🎉
              </motion.p>
            </motion.div>
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
