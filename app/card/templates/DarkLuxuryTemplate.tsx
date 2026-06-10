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
      {/* Gold dust particle effects */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100, -200],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Magazine Cover Reveal - Page Turn Effect */}
        {allPhotos.length > 0 && (
          <div className="h-screen relative overflow-hidden bg-black">
            {/* Magazine border frame */}
            <div className="absolute inset-8 border-2 border-amber-500/30 pointer-events-none" />
            <div className="absolute inset-12 border border-amber-500/20 pointer-events-none" />
            
            <Image
              src={allPhotos[0]}
              alt="Fashion cover"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Magazine masthead with page turn animation */}
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-12 left-12 right-12"
            >
              <div className="flex justify-between items-start">
                <div className="border-4 border-white/80 p-6 bg-black/30 backdrop-blur-sm">
                  <p className="text-6xl md:text-8xl font-black tracking-tighter" style={{ fontFamily: 'serif', textShadow: '0 0 40px rgba(245, 158, 11, 0.5)' }}>
                    VOGUE
                  </p>
                  <p className="text-xs tracking-[0.6em] uppercase text-amber-400 mt-2">
                    Birthday Edition
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-amber-400 text-sm tracking-[0.4em] uppercase mb-1">
                    September 2024
                  </p>
                  <p className="text-white/60 text-xs tracking-[0.3em] uppercase">
                    Vol. MMXXIV • No. 1
                  </p>
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-1">
                    $12.99
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Cover headline with staggered animation */}
            <div className="absolute bottom-20 left-12 right-12">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              >
                <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-6">
                  Exclusive Cover Story
                </p>
                <h1 
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
                  style={{ fontFamily: 'serif', letterSpacing: '-0.08em', textShadow: '0 0 60px rgba(0,0,0,0.8)' }}
                >
                  {card.recipient_name.toUpperCase()}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="h-px w-16 bg-amber-400" />
                  <p className="text-white text-lg uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
                    The Luxury Campaign
                  </p>
                  <div className="h-px w-16 bg-amber-400" />
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 2: Full-Screen Photo with Overlay Text */}
        {allPhotos.length > 1 && (
          <div className="h-screen relative overflow-hidden">
            {/* Background photo */}
            <div className="absolute inset-0">
              <Image
                src={allPhotos[1]}
                alt="Featured photo"
                fill
                className="object-cover"
                sizes="100vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
            </div>

            {/* Overlay text */}
            <div className="relative z-10 h-full flex items-center justify-center p-8 sm:p-16 md:p-24">
              <div className="max-w-4xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="space-y-8"
                >
                  {/* Magazine-style badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-block"
                  >
                    <div className="bg-amber-500 text-black px-6 py-2 text-xs font-bold tracking-widest uppercase">
                      Exclusive Interview
                    </div>
                  </motion.div>

                  {/* Pull quote */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <p className="text-amber-400 text-3xl sm:text-4xl md:text-5xl font-light italic leading-relaxed" style={{ fontFamily: 'serif' }}>
                      "A celebration unlike any other"
                    </p>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <p className="text-white text-xl sm:text-2xl md:text-3xl leading-relaxed font-light" style={{ fontFamily: 'serif', lineHeight: '1.8' }}>
                      {card.message}
                    </p>
                  </motion.div>

                  {/* Sender */}
                  {card.sender_name && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="pt-8 border-t border-white/20"
                    >
                      <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                        Interview by
                      </p>
                      <p className="text-white text-2xl font-light" style={{ fontFamily: 'serif' }}>
                        {card.sender_name}
                      </p>
                      <p className="text-white/50 text-sm mt-2" style={{ fontFamily: 'serif' }}>
                        Editor-in-Chief
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-amber-500/50" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-amber-500/50" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-amber-500/50" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-amber-500/50" />
          </div>
        )}

        {/* SECTION 3: Campaign Gallery - Full-Width Photo Strips with Magazine Styling */}
        {allPhotos.length > 2 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  Fashion Editorial
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-light" style={{ fontFamily: 'serif' }}>
                  The Campaign
                </h2>
              </motion.div>

              {/* Full-width photo strips with magazine-style captions */}
              <div className="space-y-12">
                {allPhotos.slice(2, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.15 }}
                    className="relative group"
                  >
                    <div className="aspect-[21/9] bg-stone-900 relative overflow-hidden border border-white/5">
                      <Image
                        src={photo}
                        alt={`Campaign ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Magazine-style caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                              Look {index + 1}
                            </p>
                            <p className="text-white text-lg font-light" style={{ fontFamily: 'serif' }}>
                              {card.recipient_name}'s Birthday Collection
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/50 text-xs tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                              Photography by
                            </p>
                            <p className="text-white/70 text-sm" style={{ fontFamily: 'serif' }}>
                              {card.sender_name || 'Vogue Studios'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* SECTION 4: Back Cover - Magazine Back Cover Style */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Magazine border frame */}
          <div className="absolute inset-4 border-2 border-amber-500/30 pointer-events-none" />
          <div className="absolute inset-8 border border-amber-500/20 pointer-events-none" />

          {/* Gold dust explosion effect */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -150, -300],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            {/* Back cover masthead */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-12"
            >
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter"
                style={{ fontFamily: 'serif', textShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
              >
                VOGUE
              </h1>
              <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mt-2" style={{ fontFamily: 'serif' }}>
                The Birthday Edition
              </p>
            </motion.div>

            {/* Subscription offer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="bg-amber-500/10 border border-amber-500/30 p-8 mb-8"
            >
              <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                Subscribe Now
              </p>
              <p className="text-white text-3xl font-light mb-2" style={{ fontFamily: 'serif' }}>
                {card.recipient_name}'s Birthday
              </p>
              <p className="text-white/70 text-sm" style={{ fontFamily: 'serif' }}>
                Limited Edition • MMXXIV
              </p>
            </motion.div>

            {/* Magazine details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="text-white/40 text-xs tracking-widest uppercase space-y-2" style={{ fontFamily: 'serif' }}
            >
              <p>© 2024 Vogue Birthday Edition</p>
              <p>All Rights Reserved</p>
              <p>Printed by Spectre</p>
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 5: Actions - Magazine Subscription Style */}
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-amber-400 text-xs tracking-[0.5em] uppercase" style={{ fontFamily: 'serif' }}>
              Share This Edition
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-12 py-6 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-black text-sm font-bold uppercase tracking-widest hover:from-amber-500 hover:via-amber-300 hover:to-amber-500 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Magazine
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 border-2 border-amber-500 text-amber-400 text-sm font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Edition
              </motion.button>
            </div>

            <p className="text-amber-500/40 text-xs mt-16 uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
              Vogue Birthday Edition • MMXXIV • Spectre Publications
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="dark-luxury" />
      </div>
    </div>
  );
}
