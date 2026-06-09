'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import PhotoLayout from '@/components/PhotoLayout';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, PhotoReveal, FloatingParticles, Parallax, ScaleIn } from '@/components/animations/PremiumAnimations';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Mail, Pen } from 'lucide-react';
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
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section - Full screen immersive */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Floating heart centerpiece */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1.2, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative">
              <Heart className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 text-rose-500" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-rose-400 rounded-full blur-2xl"
              />
            </div>
          </motion.div>

          {/* Recipient Name - Centerpiece */}
          <TextReveal delay={0.5}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mb-4 sm:mb-6"
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
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-700 text-center mb-6 sm:mb-8"
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
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-rose-300/50 shadow-xl">
                    <Pen className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
                    <span 
                      className="text-base sm:text-lg md:text-xl text-rose-700"
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-rose-400"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Photo Gallery - Magazine Style */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <PhotoReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {card.photos && card.photos.length > 0 ? (
                  card.photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -2 : 2 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : card.cover_photo ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-2 lg:col-span-3"
                  >
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl">
                      <div className="aspect-video rounded-xl overflow-hidden">
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
            </PhotoReveal>
          </div>
        </div>

        {/* Love Letter Section - Paper Texture - MAIN FOCAL POINT */}
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-5xl mx-auto">
            <Parallax speed={0.2}>
              <ScaleIn delay={0.2}>
                <div className="relative">
                  {/* Paper texture background - larger and more prominent */}
                  <div className="bg-gradient-to-br from-white via-rose-50/90 to-pink-50/90 rounded-3xl sm:rounded-4xl p-10 sm:p-14 md:p-20 lg:p-28 shadow-2xl border border-rose-200/60">
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-l-4 border-rose-300/60 rounded-tl-2xl" />
                    <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-r-4 border-rose-300/60 rounded-tr-2xl" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-l-4 border-rose-300/60 rounded-bl-2xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-r-4 border-rose-300/60 rounded-br-2xl" />

                    {/* Decorative elements */}
                    <div className="absolute top-6 right-8 sm:top-8 sm:right-12">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400/50" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12">
                      <motion.div
                        animate={{ rotate: [360, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      >
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400/50" fill="currentColor" />
                      </motion.div>
                    </div>
                    
                    {/* Letter greeting */}
                    <TextReveal delay={0.4}>
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-800 mb-10 sm:mb-14 text-center"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                      >
                        Dearest {card.recipient_name},
                      </motion.p>
                    </TextReveal>
                    
                    {/* Message body - LARGER and more prominent */}
                    <TextReveal delay={0.6}>
                      <motion.p
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-rose-900 mb-10 sm:mb-14 text-center"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        {card.message}
                      </motion.p>
                    </TextReveal>
                    
                    {/* Letter closing */}
                    <TextReveal delay={0.8}>
                      <motion.div className="text-center">
                        <motion.p
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-800"
                          style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                          Forever yours,
                        </motion.p>
                        {card.sender_name && (
                          <motion.p
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-700 mt-3"
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

        {/* Final Wow Factor - Floating Sparkles */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Animated sparkles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400" />
                </motion.div>
              ))}
              
              {/* Center heart */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-rose-500" fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="romantic" />
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
