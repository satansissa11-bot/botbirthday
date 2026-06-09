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
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface MinimalistTemplateProps {
  card: BirthdayCard;
}

export default function MinimalistTemplate({ card }: MinimalistTemplateProps) {
  const template = getTemplate('minimalist');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Clean white background with subtle texture */}
      <motion.div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01),transparent_50%)]"
        style={{ y }}
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero with Recipient Name */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
          {/* Happy Birthday - Inter font */}
          <TextReveal delay={0.3}>
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-semibold mb-8 sm:mb-12 text-gray-900 tracking-tight"
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
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-gray-700 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {card.recipient_name}
            </motion.h2>
          </TextReveal>

          {/* Sender Section */}
          {card.sender_name && (
            <FadeUp delay={0.7}>
              <div className="mt-10 sm:mt-14">
                <span 
                  className="text-lg sm:text-xl md:text-2xl text-gray-500 tracking-wide"
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
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-300"
            >
              <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Cinematic Cover Photo */}
        {allPhotos.length > 0 && (
          <div className="relative h-screen w-full">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/30" />
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
                  <div className="aspect-[16/9] rounded-sm overflow-hidden bg-gray-100">
                    <Image
                      src={photo}
                      alt={`Memory ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
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
              <div className="bg-white rounded-none p-14 sm:p-20 md:p-28 lg:p-36">
                {/* Greeting */}
                <TextReveal delay={0.4}>
                  <motion.p
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-12 sm:mb-16 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Dear {card.recipient_name},
                  </motion.p>
                </TextReveal>
                
                {/* Message body - Emotional centerpiece */}
                <TextReveal delay={0.6}>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-relaxed text-gray-800 mb-12 sm:mb-16"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {card.message}
                  </motion.p>
                </TextReveal>

                {/* Signature */}
                {card.sender_name && (
                  <TextReveal delay={0.8}>
                    <motion.div className="text-center">
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-600 tracking-wide"
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

        {/* SECTION 5: Celebration Finale */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Animated subtle circles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 7)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300" />
              </motion.div>
            ))}
            
            {/* Center circle */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gray-400" />
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-700 tracking-tight"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                With love
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Brand Footer */}
          <BrandFooter template="minimalist" />
        </div>
      </div>
    </div>
  );
}
