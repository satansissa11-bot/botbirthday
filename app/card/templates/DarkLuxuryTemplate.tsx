'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import DarkEffects from '@/components/animations/DarkEffects';
import BrandFooter from '@/components/BrandFooter';
import { TextReveal } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface DarkLuxuryTemplateProps {
  card: BirthdayCard;
}

export default function DarkLuxuryTemplate({ card }: DarkLuxuryTemplateProps) {
  const template = getTemplate('dark-luxury');
  const [showConfetti, setShowConfetti] = useState(false);

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
    <div className="min-h-screen bg-black">
      {/* Dark luxury background */}
      <DarkEffects enabled />
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Editorial Cover - Fashion Magazine Style */}
        {allPhotos.length > 0 && (
          <div className="h-screen w-full relative">
            <Image
              src={allPhotos[0]}
              alt="Editorial cover"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Bold typography overlay - fashion magazine style */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 md:p-24">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-white/60 text-xs sm:text-sm md:text-base uppercase tracking-[0.4em] mb-4">
                  Birthday Collection
                </p>
                <h1 
                  className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none mb-4"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {card.recipient_name}
                </h1>
                <p className="text-white/80 text-lg sm:text-xl md:text-2xl uppercase tracking-widest">
                  The Royal Edition
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 2: Asymmetric Editorial Spread - High Contrast */}
        <div className="min-h-screen bg-black flex">
          {/* Left side - typography */}
          <div className="w-1/2 flex items-center justify-center p-8 sm:p-16 md:p-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-md"
            >
              <p className="text-amber-500 text-xs uppercase tracking-[0.4em] mb-6">
                Editorial
              </p>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                A Celebration of Excellence
              </h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Every moment captured in timeless elegance. A tribute to sophistication and style.
              </p>
            </motion.div>
          </div>
          
          {/* Right side - photo */}
          {allPhotos.length > 1 && (
            <div className="w-1/2 relative">
              <Image
                src={allPhotos[1]}
                alt="Editorial photo"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
        </div>

        {/* SECTION 3: Full-screen Typography Statement */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-6xl"
          >
            <TextReveal delay={0.3}>
              <p className="text-amber-500 text-xs uppercase tracking-[0.4em] mb-8">
                Exclusive
              </p>
            </TextReveal>
            <TextReveal delay={0.5}>
              <h2 
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-white font-bold leading-none"
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                HAPPY BIRTHDAY
              </h2>
            </TextReveal>
            <TextReveal delay={0.7}>
              <p className="text-white/60 text-lg sm:text-xl md:text-2xl mt-8 tracking-widest uppercase">
                {card.recipient_name}
              </p>
            </TextReveal>
          </motion.div>
        </div>

        {/* SECTION 4: Editorial Photo Grid - Asymmetric Layout */}
        {allPhotos.length > 2 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
              {allPhotos.slice(2, 5).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative overflow-hidden ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <div className="relative w-full h-full min-h-[300px]">
                    <Image
                      src={photo}
                      alt={`Editorial ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: Dramatic Message Statement - High Contrast */}
        <div className="min-h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl text-center"
          >
            <p className="text-amber-500 text-xs uppercase tracking-[0.4em] mb-8">
              Personal Message
            </p>
            <p 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              {card.message}
            </p>
            {card.sender_name && (
              <p className="text-white/60 text-lg sm:text-xl md:text-2xl mt-12 uppercase tracking-widest">
                — {card.sender_name}
              </p>
            )}
          </motion.div>
        </div>

        {/* SECTION 6: Minimalist Actions - Fashion Brand Style */}
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12"
          >
            <p className="text-white/60 text-xs uppercase tracking-[0.4em]">
              Share This Moment
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-12 py-4 bg-white text-black text-sm uppercase tracking-widest hover:bg-amber-500 transition-colors"
              >
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border border-white text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Save
              </motion.button>
            </div>

            <p className="text-white/40 text-xs uppercase tracking-[0.4em] mt-16">
              Spectre Luxury Collection
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="dark-luxury" />
      </div>
    </div>
  );
}
