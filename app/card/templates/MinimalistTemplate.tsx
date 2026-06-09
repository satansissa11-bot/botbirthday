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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full Screen Editorial */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Happy Birthday - Inter font */}
          <TextReveal delay={0.3}>
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold mb-8 sm:mb-12 text-gray-900 tracking-tight"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-gray-700 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {card.recipient_name}
            </motion.h2>
          </TextReveal>

          {/* Sender Section */}
          {card.sender_name && (
            <FadeUp delay={0.7}>
              <div className="mt-8 sm:mt-12">
                <span 
                  className="text-base sm:text-lg md:text-xl text-gray-500 tracking-wide"
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
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gray-300"
            />
          </motion.div>
        </div>

        {/* Hero Photo Section - Full Width */}
        {card.cover_photo && (
          <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto">
              <ScaleIn delay={0.2}>
                <div className="aspect-video rounded-sm overflow-hidden bg-gray-100">
                  <Image
                    src={card.cover_photo}
                    alt="Cover photo"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </ScaleIn>
            </div>
          </div>
        )}

        {/* Photo Gallery - Editorial Grid */}
        {card.photos && card.photos.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {card.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="aspect-square rounded-sm overflow-hidden bg-gray-100">
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editorial Message Card - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl lg:max-w-5xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="bg-white rounded-none p-14 sm:p-20 md:p-28 lg:p-36">
                {/* Greeting */}
                <TextReveal delay={0.4}>
                  <motion.p
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-10 sm:mb-14 tracking-tight"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Dear {card.recipient_name},
                  </motion.p>
                </TextReveal>
                
                {/* Message body - LARGER and more prominent */}
                <TextReveal delay={0.6}>
                  <motion.p
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-relaxed text-gray-800 mb-10 sm:mb-14"
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
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-600 tracking-wide"
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

        {/* Final Wow Factor - Minimalist Floating Elements */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated subtle circles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + (i * 10)}%`,
                    top: `${25 + (i % 2) * 25}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gray-300" />
                </motion.div>
              ))}
              
              {/* Center circle */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex justify-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gray-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="minimalist" />
      </div>
    </div>
  );
}
