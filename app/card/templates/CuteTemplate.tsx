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
        {/* SECTION 1: Split Screen Hero - Photo Left, Text Right */}
        <div className="h-screen flex">
          {/* Left side - Photo */}
          <div className="w-1/2 relative bg-pink-100">
            {allPhotos.length > 0 && (
              <div className="h-full relative">
                <Image
                  src={allPhotos[0]}
                  alt="Cover photo"
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
                {/* Decorative tape */}
                <motion.div
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-8 left-8 w-32 h-8 bg-yellow-400/80 rotate-2 shadow-md"
                />
              </div>
            )}
          </div>
          
          {/* Right side - Text */}
          <div className="w-1/2 bg-pink-50 flex items-center justify-center p-8 sm:p-12 md:p-16 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-md"
            >
              {/* Sticker */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-12 -right-12"
              >
                <Heart className="w-16 h-16 text-pink-500 fill-current" />
              </motion.div>
              
              <p 
                className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Happy Birthday!
              </p>
              
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-pink-600 leading-none mb-6"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                {card.recipient_name}
              </h1>
              
              <p className="text-gray-600 text-lg" style={{ fontFamily: 'var(--font-baloo-2)' }}>
                A special day for a special person 🎂
              </p>
              
              {/* Decorative tape */}
              <div className="absolute -bottom-8 left-8 w-24 h-6 bg-pink-400/80 -rotate-3 shadow-md" />
            </motion.div>
          </div>
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

        {/* SECTION 5: Sticker Collection Finale */}
        <div className="min-h-screen bg-pink-50 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Floating sticker elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-2xl">
                    {['⭐', '💕', '🌸', '🎀', '🦋', '🌈', '🎂', '🎁', '💖', '🌺', '✨', '🍭'][i]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-4xl relative z-10"
          >
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              Your Sticker Collection
            </p>

            {/* Sticker grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {['⭐', '💕', '🌸', '🎀', '🦋', '🌈', '🎂', '🎁', '💖', '🌺', '✨', '🍭'].map((emoji, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
                >
                  <span className="text-3xl sm:text-4xl">{emoji}</span>
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-pink-500 text-white text-sm font-bold rounded-full shadow-lg hover:bg-pink-600 transition-colors min-h-[48px]"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Share Collection 💕
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 bg-white text-pink-500 text-sm font-bold rounded-full shadow-lg border-2 border-pink-300 hover:bg-pink-50 transition-colors min-h-[48px]"
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Save Stickers ⭐
              </motion.button>
            </div>

            <p className="text-gray-400 text-xs mt-8">
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
