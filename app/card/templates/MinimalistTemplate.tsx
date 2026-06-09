'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface MinimalistTemplateProps {
  card: BirthdayCard;
}

export default function MinimalistTemplate({ card }: MinimalistTemplateProps) {
  const template = getTemplate('minimalist');
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
    <div className="min-h-screen bg-white">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Full-screen Photo - Portfolio Style */}
        {allPhotos.length > 0 && (
          <div className="h-screen w-full relative">
            <Image
              src={allPhotos[0]}
              alt="Portfolio photo"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Minimal text overlay */}
            <div className="absolute bottom-12 left-12 right-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="text-white text-sm tracking-widest uppercase mb-2">
                  Birthday
                </p>
                <h1 
                  className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {card.recipient_name}
                </h1>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 2: Minimal Text Statement */}
        <div className="min-h-screen flex items-center justify-center p-12 sm:p-24 md:p-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-center"
          >
            <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
              Message
            </p>
            <p 
              className="text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-inter)', lineHeight: '1.8' }}
            >
              {card.message}
            </p>
            {card.sender_name && (
              <p className="text-gray-400 text-sm mt-12">
                — {card.sender_name}
              </p>
            )}
          </motion.div>
        </div>

        {/* SECTION 3: Full-screen Photo Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-gray-50 p-12 sm:p-24 md:p-32">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">
                  Gallery
                </p>
                <h2 
                  className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-light"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Moments
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-[4/5] overflow-hidden"
                  >
                    <Image
                      src={photo}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Clean Typography Statement */}
        <div className="h-screen flex items-center justify-center p-12 sm:p-24 md:p-32 bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl"
          >
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-900 font-light leading-none"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Happy Birthday
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl mt-8 font-light">
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 5: Minimal Actions */}
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-12 sm:p-24 md:p-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              Share
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300 text-gray-900 text-sm font-medium rounded hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Save
              </motion.button>
            </div>

            <p className="text-gray-400 text-xs mt-16">
              Spectre
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="minimalist" />
      </div>
    </div>
  );
}
