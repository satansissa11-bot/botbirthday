'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, FloatingParticles, Parallax, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Pen, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface RomanticTemplateProps {
  card: BirthdayCard;
}

export default function RomanticTemplate({ card }: RomanticTemplateProps) {
  const template = getTemplate('romantic');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Animated rose gold gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-rose-200/40 via-pink-100/30 to-red-200/40"
        style={{ y }}
      />
      
      {/* Floating hearts effect */}
      <RomanticEffects enabled />
      
      {/* Soft rose gold particles */}
      <FloatingParticles count={40} color="#B76E79" />
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero with Recipient Name */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Floating heart centerpiece */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.2, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative">
              <Heart className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-rose-500" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-rose-400 rounded-full blur-3xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - Main Focus */}
          <TextReveal delay={0.5}>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-center mb-6 sm:mb-8 leading-tight"
              style={{ 
                fontFamily: 'var(--font-great-vibes)',
                background: 'linear-gradient(135deg, #dc2626, #ec4899, #f43f5e, #dc2626)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient 8s ease infinite',
              }}
            >
              {card.recipient_name}
            </motion.h1>
          </TextReveal>

          {/* Subtitle */}
          <FadeUp delay={0.8}>
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-700 text-center mb-8 sm:mb-12"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
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
                  <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-8 py-4 sm:px-10 sm:py-5 rounded-full border-2 border-rose-300/50 shadow-2xl">
                    <Pen className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />
                    <span 
                      className="text-lg sm:text-xl md:text-2xl text-rose-700"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      With love, {card.sender_name}
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
              className="text-rose-400"
            >
              <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Cinematic Cover Photo */}
        {allPhotos.length > 0 && (
          <div className="relative h-screen w-full">
            <PhotoReveal delay={0.2}>
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
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent" />
              </motion.div>
            </PhotoReveal>
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
                  className="mb-12 sm:mb-16 last:mb-0"
                >
                  <div className="relative">
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 2}`}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </div>
                    {/* Decorative corner */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 sm:w-10 sm:h-10 bg-rose-400 rounded-full opacity-60" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Emotional Message Centerpiece */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto w-full">
            <Parallax speed={0.2}>
              <ScaleIn delay={0.2}>
                <div className="relative">
                  {/* Premium paper texture */}
                  <div className="bg-gradient-to-br from-white via-rose-50/95 to-pink-50/95 rounded-3xl sm:rounded-4xl p-12 sm:p-16 md:p-24 lg:p-32 shadow-2xl border border-rose-200/70">
                    {/* Decorative corners */}
                    <div className="absolute top-6 left-6 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-l-4 border-rose-300/70 rounded-tl-3xl" />
                    <div className="absolute top-6 right-6 w-16 h-16 sm:w-20 sm:h-20 border-t-4 border-r-4 border-rose-300/70 rounded-tr-3xl" />
                    <div className="absolute bottom-6 left-6 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-l-4 border-rose-300/70 rounded-bl-3xl" />
                    <div className="absolute bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-r-4 border-rose-300/70 rounded-br-3xl" />

                    {/* Decorative elements */}
                    <div className="absolute top-8 right-12 sm:top-10 sm:right-16">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-rose-400/60" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-12 left-12 sm:bottom-16 sm:left-16">
                      <motion.div
                        animate={{ rotate: [360, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      >
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400/60" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Letter greeting */}
                    <TextReveal delay={0.4}>
                      <motion.p
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-rose-800 mb-12 sm:mb-16 text-center"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                      >
                        Dearest {card.recipient_name},
                      </motion.p>
                    </TextReveal>
                    
                    {/* Message body - Emotional centerpiece */}
                    <TextReveal delay={0.6}>
                      <motion.p
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed text-rose-900 mb-12 sm:mb-16 text-center"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        {card.message}
                      </motion.p>
                    </TextReveal>
                    
                    {/* Letter closing */}
                    <TextReveal delay={0.8}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-rose-800"
                          style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                          Forever yours,
                        </motion.p>
                        {card.sender_name && (
                          <motion.p
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-700 mt-4"
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
            </Parallax>
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
            {/* Animated sparkles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 6)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.6, 1],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
              </motion.div>
            ))}
            
            {/* Center heart */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Heart className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-rose-500" fill="currentColor" />
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-700"
                style={{ fontFamily: 'var(--font-great-vibes)' }}
              >
                With all my love
              </motion.p>
            </motion.div>
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
