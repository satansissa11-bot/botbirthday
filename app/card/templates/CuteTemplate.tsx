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
import { Star, Heart, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface CuteTemplateProps {
  card: BirthdayCard;
}

export default function CuteTemplate({ card }: CuteTemplateProps) {
  const template = getTemplate('cute');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name}! 🎂`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Scrapbook Cover with Polaroid */}
        <div className="min-h-screen p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Polaroid photo */}
            <div className="bg-white p-4 pb-8 shadow-2xl max-w-md">
              {allPhotos.length > 0 && (
                <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden">
                  <Image
                    src={allPhotos[0]}
                    alt="Cover photo"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
              {/* Handwritten-style text */}
              <div className="text-center">
                <p 
                  className="text-2xl sm:text-3xl font-bold text-pink-600"
                  style={{ fontFamily: 'var(--font-fredoka)' }}
                >
                  {card.recipient_name}
                </p>
                <p className="text-gray-600 text-sm mt-2">Happy Birthday! 🎂</p>
              </div>
            </div>
            
            {/* Washi tape */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-400/80 rotate-2 shadow-md" />
            <div className="absolute -bottom-4 right-8 w-24 h-6 bg-pink-400/80 -rotate-3 shadow-md" />
            
            {/* Sticker */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-8 -right-8"
            >
              <Heart className="w-12 h-12 text-pink-500 fill-current" />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Photo Collage - Scrapbook Style */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-8">
                Memories
              </p>
              
              {/* Collage grid with rotations */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {allPhotos.slice(1, 7).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white p-3 shadow-lg">
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    {/* Tape */}
                    <div className={`absolute ${index % 2 === 0 ? '-top-2 left-4' : '-top-2 right-4'} w-16 h-4 bg-yellow-400/60 shadow-sm`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Handwritten Note Card */}
        <div className="min-h-screen bg-pink-50 p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative max-w-2xl"
          >
            {/* Note paper */}
            <div className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl border-2 border-dashed border-pink-300">
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-yellow-400/80 rotate-1 shadow-md" />
              
              <div className="text-center space-y-6">
                <p 
                  className="text-3xl sm:text-4xl font-bold text-pink-600"
                  style={{ fontFamily: 'var(--font-fredoka)' }}
                >
                  Dear {card.recipient_name},
                </p>
                <p 
                  className="text-xl sm:text-2xl text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'var(--font-baloo-2)', lineHeight: '1.8' }}
                >
                  {card.message}
                </p>
                {card.sender_name && (
                  <p 
                    className="text-2xl sm:text-3xl text-pink-500 font-bold"
                    style={{ fontFamily: 'var(--font-fredoka)' }}
                  >
                    Love, {card.sender_name} 💕
                  </p>
                )}
              </div>
              
              {/* Stickers */}
              <motion.div
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6"
              >
                <Star className="w-10 h-10 text-yellow-400 fill-current" />
              </motion.div>
              <motion.div
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6"
              >
                <Heart className="w-10 h-10 text-pink-400 fill-current" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Polaroid Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">
                  Gallery
                </p>
                <h2 
                  className="text-3xl sm:text-4xl font-bold text-pink-600"
                  style={{ fontFamily: 'var(--font-fredoka)' }}
                >
                  Favorite Moments
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(1, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: index % 2 === 0 ? -3 : 3 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="bg-white p-4 pb-8 shadow-xl">
                      <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <p className="text-center text-gray-500 text-sm mt-4">Memory {index + 1}</p>
                    </div>
                    {/* Washi tape */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-pink-400/60 rotate-2 shadow-sm" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Cute Actions */}
        <div className="min-h-screen bg-pink-50 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              Share the love
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-8 py-4 bg-pink-500 text-white text-sm font-bold rounded-full shadow-lg hover:bg-pink-600 transition-colors"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Share 💕
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-pink-500 text-sm font-bold rounded-full shadow-lg border-2 border-pink-300 hover:bg-pink-50 transition-colors"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Save ⭐
              </motion.button>
            </div>

            <p className="text-gray-400 text-xs mt-16">
              Made with 💖 by Spectre
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="cute" />
      </div>
    </div>
  );
}
