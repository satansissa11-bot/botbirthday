'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface ElegantTemplateProps {
  card: BirthdayCard;
}

export default function ElegantTemplate({ card }: ElegantTemplateProps) {
  const template = getTemplate('elegant');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Royal Celebration - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Gold shimmer accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </div>

      {/* Floating gold particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Royal Crest Hero */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 bg-gradient-to-b from-amber-50 to-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-5xl"
          >
            {/* Royal crown */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="w-32 h-32 border-2 border-amber-400/30 rounded-full" />
                </motion.div>
                <Crown className="w-24 h-24 text-amber-500 relative z-10" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-amber-600 text-sm tracking-[0.4em] uppercase mb-6"
              style={{ fontFamily: 'serif' }}
            >
              Royal Celebration
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-8"
              style={{ fontFamily: 'serif' }}
            >
              {card.recipient_name}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-8"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <Sparkles className="w-6 h-6 text-amber-500" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-gray-600 text-xl mt-8"
              style={{ fontFamily: 'serif' }}
            >
              A Birthday of Distinction
            </motion.p>
          </motion.div>
        </div>

        {/* SECTION 2: Formal Portrait Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-600 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Royal Gallery
                </p>
                <h2 className="text-3xl sm:text-4xl text-gray-900" style={{ fontFamily: 'serif' }}>
                  Distinguished Moments
                </h2>
              </motion.div>

              {/* Symmetrical portrait layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Ornate gold frame */}
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-amber-100 to-white p-4 shadow-lg">
                      <div className="relative w-full h-full border-2 border-amber-300">
                        <Image
                          src={photo}
                          alt={`Portrait ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      
                      {/* Gold corner accents */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Royal Decree Message */}
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl w-full"
          >
            {/* Royal decree card */}
            <div className="relative bg-white p-8 sm:p-12 md:p-16 shadow-2xl border-8 border-amber-400">
              {/* Decorative header */}
              <div className="text-center mb-12 pb-8 border-b-2 border-amber-200">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Crown className="w-12 h-12 text-amber-500" />
                </motion.div>
              </div>

              <div className="text-center space-y-8">
                <p className="text-amber-600 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'serif' }}>
                  Royal Decree
                </p>
                
                <p 
                  className="text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-relaxed font-light"
                  style={{ fontFamily: 'serif', lineHeight: '2' }}
                >
                  {card.message}
                </p>
                
                {card.sender_name && (
                  <div className="pt-8 border-t-2 border-amber-200">
                    <p className="text-amber-600 text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                      Presented by
                    </p>
                    <p className="text-3xl sm:text-4xl text-gray-900 font-light" style={{ fontFamily: 'serif' }}>
                      {card.sender_name}
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative footer */}
              <div className="mt-12 pt-8 border-t-2 border-amber-200 flex justify-center">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Grand Ballroom Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-600 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Grand Ballroom
                </p>
                <h2 className="text-3xl sm:text-4xl text-gray-900" style={{ fontFamily: 'serif' }}>
                  Celebration in Style
                </h2>
              </motion.div>

              {/* Featured photo with ornate frame */}
              <div className="relative aspect-[16/9] mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={allPhotos[1]}
                    alt="Featured"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-4 border-4 border-amber-400" />
                  <div className="absolute inset-8 border-2 border-amber-300" />
                </motion.div>
              </div>

              {/* Secondary photos in elegant row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {allPhotos.slice(2, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-square"
                  >
                    <div className="relative w-full h-full border-2 border-amber-300 p-2">
                      <Image
                        src={photo}
                        alt={`Elegant ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Royal Finale */}
        <div className="h-screen bg-gradient-to-b from-white to-amber-50 flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <Crown className="w-28 h-28 text-amber-500 mx-auto" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 leading-none mb-8"
              style={{ fontFamily: 'serif' }}
            >
              Long Live the
            </h2>
            
            <p className="text-amber-600 text-3xl sm:text-4xl md:text-5xl font-light" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Royal Seal Closing */}
        <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Floating gold particles */}
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
                  y: [0, -30, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-2xl relative z-10"
          >
            {/* Royal seal */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="mb-12"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500 to-amber-300 rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-600">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Crown className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <p className="text-amber-600 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'serif' }}>
              Official Royal Seal
            </p>

            <h2 className="text-3xl sm:text-4xl text-gray-900 font-light mb-4" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </h2>

            <p className="text-amber-600 text-sm tracking-widest uppercase mb-8" style={{ fontFamily: 'serif' }}>
              Royal Birthday • MMXXIV
            </p>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-sm font-bold uppercase tracking-widest hover:from-amber-400 hover:to-amber-300 transition-all min-h-[56px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Royal Decree
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 border-2 border-amber-400 text-amber-600 text-sm font-bold uppercase tracking-widest hover:bg-amber-50 transition-all min-h-[56px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Royal Seal
              </motion.button>
            </div>

            <p className="text-amber-400 text-xs mt-16 uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
              Spectre Royal Collection • Est. MMXXIV
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="elegant" />
      </div>
    </div>
  );
}
