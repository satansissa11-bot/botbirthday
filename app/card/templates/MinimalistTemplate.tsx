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

interface MinimalistTemplateProps {
  card: BirthdayCard;
}

export default function MinimalistTemplate({ card }: MinimalistTemplateProps) {
  const template = getTemplate('minimalist');
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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

  const nextPhoto = () => {
    if (allPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (allPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-gray-900">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Museum Exhibition Hero */}
        {allPhotos.length > 0 && (
          <div className="h-screen relative bg-[#f5f5f0] flex">
            {/* Left side - Typography (35%) */}
            <div className="w-[35%] bg-white flex flex-col justify-center p-16 md:p-24 relative">
              {/* Museum wall texture */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(0deg, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Dramatic accent line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute top-0 left-0 h-1 bg-gray-900"
              />

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="relative z-10"
              >
                <p className="text-gray-900 text-xs tracking-[0.5em] uppercase mb-16 font-bold">
                  ★ EXHIBITION ★
                </p>
                
                <h1 className="text-7xl md:text-8xl lg:text-9xl text-gray-900 font-black leading-none mb-16" style={{ letterSpacing: '-0.04em' }}>
                  {card.recipient_name}
                </h1>
                
                <div className="w-40 h-1 bg-gray-900 mb-16" />
                
                <p className="text-gray-900 text-sm tracking-[0.4em] uppercase font-bold">
                  MODERN ART GALLERY
                </p>
              </motion.div>

              {/* Photo counter */}
              {allPhotos.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-16 left-16 text-gray-400 text-xs tracking-[0.3em] uppercase font-light"
                  style={{ fontFamily: 'monospace' }}
                >
                  {String(currentPhotoIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
                </motion.div>
              )}
            </div>

            {/* Right side - Photo (65%) */}
            <div className="w-[65%] relative bg-gray-200">
              <motion.div
                key={currentPhotoIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="h-full relative"
              >
                <Image
                  src={allPhotos[currentPhotoIndex]}
                  alt="Exhibition"
                  fill
                  className="object-cover"
                  priority
                  sizes="65vw"
                />
              </motion.div>

              {/* Navigation arrows */}
              {allPhotos.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    onClick={prevPhoto}
                    className="absolute left-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all"
                  >
                    <span className="text-gray-900 text-3xl font-light">←</span>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    onClick={nextPhoto}
                    className="absolute right-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white transition-all"
                  >
                    <span className="text-gray-900 text-3xl font-light">→</span>
                  </motion.button>
                </>
              )}

              {/* Museum frame */}
              <div className="absolute inset-8 pointer-events-none">
                <div className="w-full h-full border-2 border-white/40" />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Editorial Typography Statement */}
        <div className="min-h-screen bg-white flex items-center justify-center p-20 md:p-32 relative">
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 100%'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-7xl text-center relative z-10"
          >
            <div className="border-t border-b border-gray-200 py-20">
              <p className="text-gray-300 text-xs tracking-[0.4em] uppercase mb-16 font-light">
                —
              </p>
              <h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light leading-none text-gray-900"
                style={{ letterSpacing: '-0.04em' }}
              >
                {card.recipient_name}
              </h1>
              <p className="text-gray-300 text-xs tracking-[0.4em] uppercase mt-16 font-light">
                —
              </p>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Gallery Message Card */}
        <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-12 md:p-24 relative overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(0deg, #000 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} />
          </div>
          
          {/* Gallery message card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative max-w-4xl w-full z-10"
          >
            <div className="bg-white p-16 sm:p-20 md:p-28 border border-gray-200">
              <div className="border-l-2 border-gray-300 pl-12">
                <p 
                  className="text-gray-400 text-xs tracking-[0.4em] uppercase mb-12 font-light"
                >
                  Curator's Note
                </p>
                
                <p 
                  className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-900 font-light"
                  style={{ lineHeight: '1.5', letterSpacing: '-0.02em' }}
                >
                  {card.message}
                </p>
                
                {card.sender_name && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-sm mt-16 tracking-[0.3em] uppercase font-light"
                  >
                    — {card.sender_name}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Gallery Portrait */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white flex items-center justify-center p-20 md:p-32 relative">
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '50px 100%'
              }} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="max-w-5xl w-full relative z-10"
            >
              <div className="border border-gray-200 p-6">
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                  <Image
                    src={allPhotos[1]}
                    alt="Portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>
              
              {/* Photo label */}
              <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-light">
                  Portrait Study
                </p>
                <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-light" style={{ fontFamily: 'monospace' }}>
                  01
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 5: Gallery Finale */}
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-20 md:p-32 relative overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(0deg, #000 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center space-y-20 relative z-10 max-w-5xl"
          >
            {/* Editorial typography */}
            <div className="border-t border-b border-gray-200 py-16">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-gray-300 text-xs tracking-[0.4em] uppercase font-light"
              >
                —
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-gray-900 text-4xl md:text-5xl lg:text-6xl font-light"
                style={{ letterSpacing: '-0.03em' }}
              >
                {card.recipient_name}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-gray-300 text-xs tracking-[0.4em] uppercase font-light"
              >
                —
              </motion.p>
            </div>

            {/* Minimal actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col gap-8"
            >
              <motion.button
                whileHover={{ letterSpacing: '0.25em' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="text-gray-900 text-sm tracking-[0.3em] uppercase font-light hover:text-gray-600 transition-all"
              >
                Share Exhibition
              </motion.button>

              <motion.button
                whileHover={{ letterSpacing: '0.25em' }}
                whileTap={{ scale: 0.98 }}
                className="text-gray-900 text-sm tracking-[0.3em] uppercase font-light hover:text-gray-600 transition-all"
              >
                Save Collection
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-gray-300 text-xs tracking-[0.3em] uppercase font-light"
            >
              Spectre Gallery
            </motion.p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="minimalist" />
      </div>
    </div>
  );
}
