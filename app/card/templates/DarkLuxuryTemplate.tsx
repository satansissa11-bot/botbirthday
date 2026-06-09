'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Sparkles } from 'lucide-react';
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
          title: `Fashion Campaign - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Vogue-Inspired Magazine Cover */}
        {allPhotos.length > 0 && (
          <div className="h-screen relative overflow-hidden">
            <Image
              src={allPhotos[0]}
              alt="Fashion cover"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            
            {/* Vogue masthead */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="border-4 border-white p-4">
                  <p className="text-5xl md:text-7xl font-black tracking-tighter" style={{ fontFamily: 'serif' }}>
                    VOGUE
                  </p>
                  <p className="text-xs tracking-[0.5em] uppercase">
                    Birthday Edition
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-right"
              >
                <p className="text-xs tracking-[0.3em] uppercase mb-2">
                  MMXXIV
                </p>
                <p className="text-xs tracking-[0.3em] uppercase">
                  Special Issue
                </p>
              </motion.div>
            </div>
            
            {/* Cover headline */}
            <div className="absolute bottom-16 left-8 right-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4">
                  Exclusive Feature
                </p>
                <h1 
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-none mb-4"
                  style={{ fontFamily: 'serif', letterSpacing: '-0.05em' }}
                >
                  {card.recipient_name}
                </h1>
                <p className="text-white/80 text-xl uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
                  The Luxury Campaign
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 2: Editorial Spread - Full Bleed Photo */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen relative">
            <Image
              src={allPhotos[1]}
              alt="Editorial spread"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Editorial text overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-16 md:p-24">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="max-w-4xl text-center"
              >
                <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-6">
                  Editorial Story
                </p>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
                  style={{ fontFamily: 'serif', letterSpacing: '-0.05em' }}
                >
                  A Study in Elegance
                </h2>
                <p className="text-white/80 text-lg leading-relaxed" style={{ fontFamily: 'serif' }}>
                  Capturing the essence of luxury through timeless photography and sophisticated styling.
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 3: Magazine Article Message */}
        <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4">
                Feature Article
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ fontFamily: 'serif', letterSpacing: '-0.05em' }}>
                The Birthday Interview
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <p className="text-white/60 text-sm tracking-[0.3em] uppercase">
                — {card.recipient_name}
              </p>
              
              <p 
                className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed font-light"
                style={{ fontFamily: 'serif', lineHeight: '2' }}
              >
                {card.message}
              </p>
              
              {card.sender_name && (
                <div className="pt-8 border-t border-white/20">
                  <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2">
                    Interview by
                  </p>
                  <p className="text-white text-lg" style={{ fontFamily: 'serif' }}>
                    {card.sender_name}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* SECTION 4: Campaign Gallery - Full Width Strips */}
        {allPhotos.length > 2 && (
          <div className="min-h-screen bg-black">
            <div className="max-w-7xl mx-auto p-8 sm:p-16 md:p-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4">
                  Campaign Gallery
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ fontFamily: 'serif', letterSpacing: '-0.05em' }}>
                  The Collection
                </h2>
              </motion.div>

              {/* Full-width photo strips */}
              <div className="space-y-8">
                {allPhotos.slice(2, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="relative aspect-[21/9]"
                  >
                    <Image
                      src={photo}
                      alt={`Campaign ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Caption */}
                    <div className="absolute bottom-8 left-8">
                      <p className="text-white/80 text-xs tracking-[0.3em] uppercase">
                        Look {index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Campaign Finale */}
        <div className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
          {/* Animated gold rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-amber-500/30"
                style={{
                  width: `${300 + i * 150}px`,
                  height: `${300 + i * 150}px`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Sparkles className="w-24 h-24 text-amber-400 mx-auto" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-8"
              style={{ fontFamily: 'serif', letterSpacing: '-0.05em' }}
            >
              THE CAMPAIGN
            </h2>
            
            <p className="text-amber-400 text-3xl sm:text-4xl md:text-5xl font-light tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Fashion Brand Actions */}
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-2xl"
          >
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase">
              Share the Campaign
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-10 py-5 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-amber-400 transition-all min-h-[56px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Campaign
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 border-2 border-white text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all min-h-[56px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Lookbook
              </motion.button>
            </div>

            <p className="text-white/40 text-xs mt-16 uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
              Spectre Fashion • Luxury Campaign
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="dark-luxury" />
      </div>
    </div>
  );
}
