'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface JapaneseZenTemplateProps {
  card: BirthdayCard;
}

export default function JapaneseZenTemplate({ card }: JapaneseZenTemplateProps) {
  const template = getTemplate('japanese-zen');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `お誕生日おめでとう ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-rose-50 to-stone-200">
      {/* Premium washi paper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #f9a8d4 3px, transparent 3px),
            radial-gradient(circle at 80% 70%, #f9a8d4 3px, transparent 3px),
            radial-gradient(circle at 40% 80%, #f9a8d4 2px, transparent 2px),
            radial-gradient(circle at 60% 20%, #f9a8d4 2px, transparent 2px),
            linear-gradient(90deg, transparent 50%, rgba(180, 160, 140, 0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(180, 160, 140, 0.1) 50%)
          `,
          backgroundSize: '250px 250px, 250px 250px, 250px 250px, 250px 250px, 4px 4px, 4px 4px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Premium Vertical Scroll with Elegant Cherry Blossom */}
        <div className="min-h-screen relative overflow-hidden">
          {/* Elegant cherry blossom branches on left */}
          <div className="absolute left-0 top-0 h-full w-40 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + Math.random() * 25}px`,
                  top: `${i * 10 + Math.random() * 5}%`,
                }}
                animate={{
                  x: [0, 8, 0],
                  rotate: [0, 20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5 + i * 0.6,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-transparent rounded-full" />
                <div className="absolute -top-1 left-1/2 w-3 h-3 bg-rose-400 rounded-full shadow-lg shadow-rose-400/30" />
                <div className="absolute -top-2 left-10 w-2 h-2 bg-rose-300 rounded-full shadow-md" />
                <div className="absolute -top-1 left-16 w-1.5 h-1.5 bg-rose-200 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Elegant cherry blossom branches on right */}
          <div className="absolute right-0 top-0 h-full w-40 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  right: `${15 + Math.random() * 25}px`,
                  top: `${i * 10 + Math.random() * 5}%`,
                }}
                animate={{
                  x: [0, -8, 0],
                  rotate: [0, -20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5 + i * 0.6,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <div className="w-24 h-1 bg-gradient-to-l from-rose-400 to-transparent rounded-full" />
                <div className="absolute -top-1 right-1/2 w-3 h-3 bg-rose-400 rounded-full shadow-lg shadow-rose-400/30" />
                <div className="absolute -top-2 right-10 w-2 h-2 bg-rose-300 rounded-full shadow-md" />
                <div className="absolute -top-1 right-16 w-1.5 h-1.5 bg-rose-200 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Premium vertical scroll content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 sm:p-16 md:p-24">
            {/* Elegant falling cherry blossoms */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-300/50"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10 + i * 0.6,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className="w-5 h-5 rounded-full shadow-lg shadow-rose-400/20" />
                </motion.div>
              ))}
            </div>

            {/* Premium photo with vertical scroll effect */}
            {allPhotos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="relative w-full max-w-lg mb-16"
              >
                <div className="relative aspect-[3/4] bg-white p-6 shadow-2xl border-4 border-rose-200/60">
                  <Image
                    src={allPhotos[0]}
                    alt="Zen photo"
                    fill
                    className="object-cover"
                    priority
                    sizes="512px" unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                  {/* Premium frame decoration */}
                  <div className="absolute inset-4 border border-rose-300/40 pointer-events-none" />
                </div>
                
                {/* Elegant vertical scroll indicator */}
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -right-10 top-1/2 -translate-y-1/2"
                >
                  <div className="w-1.5 h-20 bg-rose-400/60 rounded-full shadow-lg shadow-rose-400/30" />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-rose-500 rounded-full shadow-md" />
                </motion.div>
              </motion.div>
            )}

            {/* Premium text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4 }}
              className="text-center max-w-3xl"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="text-rose-600 text-2xl sm:text-3xl md:text-4xl mb-10 font-bold tracking-wider"
                style={{ fontFamily: 'serif' }}
              >
                ★ お誕生日おめでとう ★
              </motion.p>
              
              <motion.h1
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-800 font-light leading-none mb-10"
                style={{ fontFamily: 'serif', letterSpacing: '-0.02em' }}
              >
                {card.recipient_name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.2 }}
                className="text-stone-600 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide"
                style={{ fontFamily: 'serif' }}
              >
                Happy Birthday
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Premium Minimal Photo Display */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24 relative overflow-hidden">
            {/* Elegant floating cherry blossoms */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-300/40"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -18, 0],
                    rotate: [0, 180],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                >
                  <div className="w-3 h-3 rounded-full shadow-lg shadow-rose-400/20" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="mb-20"
              >
                <p className="text-stone-400 text-sm tracking-[0.4em] uppercase mb-6 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ MEMORIES ★
                </p>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl text-stone-800 font-light font-bold"
                  style={{ fontFamily: 'serif', letterSpacing: '-0.02em' }}
                >
                  思い出
                </h2>
              </motion.div>

              {/* Premium single large photo with elegant frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="aspect-[16/9] bg-stone-100 relative overflow-hidden shadow-2xl">
                  <Image
                    src={allPhotos[0]}
                    alt="Memory"
                    fill
                    className="object-cover"
                    sizes="100vw" unoptimized
                  />
                </div>
                {/* Premium elegant frame */}
                <div className="absolute inset-8 border-2 border-rose-300/50 pointer-events-none" />
                <div className="absolute inset-12 border border-rose-200/30 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 3: Premium Haiku-style Message */}
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-rose-50 p-8 sm:p-16 md:p-24 flex items-center justify-center relative overflow-hidden">
          {/* Elegant floating cherry blossoms */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-300/45"
                style={{
                  left: `${8 + i * 10}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 360],
                  opacity: [0.35, 0.65, 0.35],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 7 + i,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              >
                <div className="w-4 h-4 rounded-full shadow-lg shadow-rose-400/25" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl text-center relative z-10"
          >
            {/* Elegant decorative line */}
            <div className="w-32 h-px bg-rose-400 mx-auto mb-16" />
            
            <p className="text-stone-400 text-sm tracking-[0.4em] uppercase mb-12 font-bold" style={{ fontFamily: 'serif' }}>
              ★ MESSAGE ★
            </p>
            
            <p 
              className="text-3xl sm:text-4xl md:text-5xl text-stone-700 leading-relaxed font-light"
              style={{ fontFamily: 'serif', lineHeight: '2.4', letterSpacing: '0.01em' }}
            >
              {card.message}
            </p>
            
            {card.sender_name && (
              <p className="text-stone-500 text-2xl mt-16 font-bold" style={{ fontFamily: 'serif' }}>
                — {card.sender_name}
              </p>
            )}
            
            {/* Elegant decorative line */}
            <div className="w-32 h-px bg-rose-400 mx-auto mt-16" />
          </motion.div>
        </div>

        {/* SECTION 4: Premium Photo Grid */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24 relative overflow-hidden">
            {/* Elegant floating cherry blossoms */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-300/40"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 200],
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                >
                  <div className="w-3 h-3 rounded-full shadow-lg shadow-rose-400/20" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="mb-20"
              >
                <p className="text-stone-400 text-sm tracking-[0.4em] uppercase mb-6 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ GALLERY ★
                </p>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl text-stone-800 font-light font-bold"
                  style={{ fontFamily: 'serif', letterSpacing: '-0.02em' }}
                >
                  写真
                </h2>
              </motion.div>

              {/* Premium asymmetric grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {allPhotos.slice(1, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.25 }}
                    whileHover={{ scale: 1.03 }}
                    className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <div className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-square'} bg-stone-100 relative overflow-hidden shadow-2xl`}>
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized
                      />
                    </div>
                    {/* Premium frame */}
                    <div className="absolute inset-6 border border-rose-300/50 pointer-events-none" />
                    <div className="absolute inset-10 border border-rose-200/30 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Premium Zen Garden Finale */}
        <div className="min-h-screen bg-gradient-to-br from-stone-100 to-rose-100 flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Premium Zen garden elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Enhanced raked sand patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/6 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/5 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/4 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-2/5 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-3/5 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-4/5 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-5/6 left-0 right-0 h-px bg-stone-400" />
            </div>
            
            {/* Premium floating cherry blossoms */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-300/50"
                style={{
                  left: `${5 + i * 7}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  rotate: [0, 360],
                  opacity: [0.35, 0.7, 0.35],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 7 + i,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              >
                <div className="w-5 h-5 rounded-full shadow-lg shadow-rose-400/25" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8 }}
            className="text-center max-w-5xl relative z-10"
          >
            {/* Premium stone lantern */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="mb-16"
            >
              <div className="w-24 h-32 bg-gradient-to-b from-stone-400 to-stone-500 mx-auto rounded-t-full shadow-2xl" />
              <div className="w-32 h-12 bg-gradient-to-b from-stone-500 to-stone-600 mx-auto -mt-3 shadow-2xl" />
              <div className="w-20 h-8 bg-stone-600 mx-auto -mt-2 shadow-xl" />
            </motion.div>
            
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-stone-800 font-light leading-none mb-12 font-bold"
              style={{ fontFamily: 'serif', letterSpacing: '-0.03em' }}
            >
              お誕生日
            </motion.h2>
            <p className="text-stone-600 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Premium Tea Ceremony Actions */}
        <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Elegant floating cherry blossoms */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-300/40"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -22, 0],
                  rotate: [0, 220],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              >
                <div className="w-3 h-3 rounded-full shadow-lg shadow-rose-400/20" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center space-y-20 max-w-3xl relative z-10"
          >
            {/* Premium tea cup icon */}
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="mb-12"
            >
              <div className="w-20 h-20 border-4 border-stone-500 rounded-full mx-auto shadow-2xl" />
            </motion.div>
            
            <p className="text-stone-400 text-sm tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
              ★ SHARE ★
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-12 py-6 bg-stone-800 text-white text-xl font-light rounded-lg hover:bg-stone-700 transition-all min-h-[64px] shadow-2xl"
                style={{ fontFamily: 'serif' }}
              >
                SHARE
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 border-4 border-stone-400 text-stone-800 text-xl font-light rounded-lg hover:bg-stone-50 transition-all min-h-[64px] shadow-2xl"
                style={{ fontFamily: 'serif' }}
              >
                SAVE
              </motion.button>
            </div>

            <p className="text-stone-400 text-sm mt-20 font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
              SPECTRE
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="japanese-zen" />
      </div>
    </div>
  );
}
