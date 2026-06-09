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
    <div className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Single Photo - Full Bleed */}
        {allPhotos.length > 0 && (
          <div className="h-screen relative">
            <motion.div
              key={currentPhotoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="h-full relative"
            >
              <Image
                src={allPhotos[currentPhotoIndex]}
                alt="Portfolio"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </motion.div>
            
            {/* Minimal navigation */}
            {allPhotos.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={prevPhoto}
                  className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <span className="text-2xl">←</span>
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={nextPhoto}
                  className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <span className="text-2xl">→</span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm"
                >
                  {currentPhotoIndex + 1} / {allPhotos.length}
                </motion.div>
              </>
            )}

            {/* Minimal text overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute bottom-16 left-16 right-16"
            >
              <p className="text-white/80 text-xs tracking-[0.3em] uppercase mb-4">
                {card.recipient_name}
              </p>
            </motion.div>
          </div>
        )}

        {/* SECTION 2: Single Word Statement */}
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="max-w-4xl text-center"
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-relaxed text-gray-900"
              style={{ fontFamily: 'serif', lineHeight: '1.8' }}
            >
              {card.recipient_name}
            </h1>
          </motion.div>
        </div>

        {/* SECTION 3: Message - Floating Card */}
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
          {/* Background photo with blur */}
          {allPhotos.length > 0 && (
            <div className="absolute inset-0">
              <Image
                src={allPhotos[0]}
                alt="Background"
                fill
                className="object-cover opacity-10 blur-3xl"
                sizes="100vw"
              />
            </div>
          )}
          
          {/* Floating message card */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative max-w-2xl w-full"
          >
            <div className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl">
              <p 
                className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-8"
                style={{ fontFamily: 'serif' }}
              >
                Personal Note
              </p>
              
              <p 
                className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-900"
                style={{ fontFamily: 'serif', lineHeight: '1.8' }}
              >
                {card.message}
              </p>
              
              {card.sender_name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 text-sm mt-12 tracking-widest uppercase"
                  style={{ fontFamily: 'serif' }}
                >
                  {card.sender_name}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Single Photo - Portrait */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-16 md:p-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="max-w-3xl w-full"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-200">
                <Image
                  src={allPhotos[1]}
                  alt="Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 5: Fade To White Finale */}
        <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-16 md:p-24 relative overflow-hidden">
          {/* Fade to white overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
            className="absolute inset-0 bg-white pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center space-y-16 relative z-10"
          >
            {/* Minimal text */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-gray-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'serif' }}
            >
              —
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-light"
              style={{ fontFamily: 'serif', lineHeight: '1.8' }}
            >
              {card.recipient_name}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-gray-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'serif' }}
            >
              —
            </motion.p>

            {/* Fade out actions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2 }}
              className="flex flex-col gap-4"
            >
              <motion.button
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="text-gray-900 text-sm tracking-widest uppercase hover:text-gray-600 transition-colors"
                style={{ fontFamily: 'serif' }}
              >
                Share
              </motion.button>

              <motion.button
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.98 }}
                className="text-gray-900 text-sm tracking-widest uppercase hover:text-gray-600 transition-colors"
                style={{ fontFamily: 'serif' }}
              >
                Save
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.5 }}
              className="text-gray-300 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'serif' }}
            >
              Spectre
            </motion.p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="minimalist" />
      </div>
    </div>
  );
}
