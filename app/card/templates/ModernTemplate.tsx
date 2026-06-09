'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { TextReveal } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
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
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Hero - Apple Product Launch Style */}
        <div className="h-screen flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-6xl"
          >
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-4 tracking-widest uppercase">
              Introducing
            </p>
            <h1 
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold text-white leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.05em' }}
            >
              {card.recipient_name}
            </h1>
            <p className="text-gray-400 text-xl sm:text-2xl md:text-3xl mt-6 font-light">
              Happy Birthday
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: Bento Grid Layout - Apple Style */}
        <div className="min-h-screen bg-gray-950 p-8 sm:p-16 md:p-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                Memories
              </p>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl text-white font-semibold"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Captured moments
              </h2>
            </motion.div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPhotos.slice(0, 6).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-2xl bg-gray-900 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <div className={`relative w-full ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                    <Image
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: Full-screen Typography Statement */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-6xl"
          >
            <TextReveal delay={0.2}>
              <h2 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-white leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.05em' }}
              >
                Happy Birthday
              </h2>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-gray-400 text-2xl sm:text-3xl md:text-4xl mt-8 font-light">
                {card.recipient_name}
              </p>
            </TextReveal>
          </motion.div>
        </div>

        {/* SECTION 4: Message Section - Clean Typography */}
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl text-center"
          >
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-8">
              Message
            </p>
            <p 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-inter)', lineHeight: '1.6' }}
            >
              {card.message}
            </p>
            {card.sender_name && (
              <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mt-12">
                — {card.sender_name}
              </p>
            )}
          </motion.div>
        </div>

        {/* SECTION 5: Clean Actions - Apple Style */}
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-gray-400 text-xs uppercase tracking-widest">
              Share
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Save
              </motion.button>
            </div>

            <p className="text-gray-500 text-xs mt-16">
              Designed by Spectre
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="modern" />
      </div>
    </div>
  );
}
