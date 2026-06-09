'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface GalaxyTemplateProps {
  card: BirthdayCard;
}

export default function GalaxyTemplate({ card }: GalaxyTemplateProps) {
  const template = getTemplate('galaxy');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Cosmic Birthday - ${card.recipient_name}`,
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
      {/* Starfield background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Portfolio Hero - Masonry Grid */}
        <div className="min-h-screen bg-black p-8 sm:p-12 md:p-16 flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <p className="text-purple-300 text-xs tracking-[0.3em] uppercase mb-4">
                Cosmic Portfolio
              </p>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl text-white font-light"
                style={{ 
                  background: 'linear-gradient(135deg, #fff 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {card.recipient_name}
              </h1>
            </motion.div>

            {/* Masonry portfolio grid */}
            {allPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                  >
                    <div className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-square'} bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-4 backdrop-blur-sm border border-purple-500/30`}>
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Portfolio ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Floating Photo Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-purple-300 text-xs tracking-[0.3em] uppercase mb-4">
                  Cosmic Memories
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-light"
                  style={{ 
                    background: 'linear-gradient(135deg, #fff 0%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Stargazing
                </h2>
              </motion.div>

              {/* Floating photo grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-4 backdrop-blur-sm border border-purple-500/30">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Cosmic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                      </div>
                    </div>
                    {/* Floating star */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-4 -right-4"
                    >
                      <Sparkles className="w-8 h-8 text-purple-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Celestial Message */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center relative"
          >
            {/* Orbiting rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-purple-500/30 rounded-full"
                  style={{
                    width: `${300 + i * 100}px`,
                    height: `${300 + i * 100}px`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </div>
            
            <div className="relative z-10 p-12">
              <p className="text-purple-300 text-xs tracking-[0.3em] uppercase mb-8">
                Transmission
              </p>
              
              <p 
                className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed font-light"
                style={{ lineHeight: '2' }}
              >
                {card.message}
              </p>
              
              {card.sender_name && (
                <p className="text-blue-300 text-lg mt-12">
                  — {card.sender_name}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Nebula Photo Display */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-blue-300 text-xs tracking-[0.3em] uppercase mb-4">
                  Deep Space
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-light"
                  style={{ 
                    background: 'linear-gradient(135deg, #fff 0%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Nebula Gallery
                </h2>
              </motion.div>

              {/* Large featured photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-8"
              >
                <Image
                  src={allPhotos[1]}
                  alt="Featured memory"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-blue-900/60" />
              </motion.div>

              {/* Secondary photos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allPhotos.slice(2, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden relative"
                  >
                    <Image
                      src={photo}
                      alt={`Nebula ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Warp Speed Finale */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Warp speed star lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: '2px',
                  height: `${Math.random() * 100 + 50}px`,
                }}
                animate={{
                  y: [0, 1000],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-4xl relative z-10"
          >
            {/* Warp speed effect */}
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative w-32 h-32 mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-black leading-none mb-8"
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--font-inter)',
                letterSpacing: '-0.05em',
              }}
            >
              WARP SPEED
            </h2>
            
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-300 text-2xl font-bold"
            >
              ENGAGED
            </motion.p>
          </motion.div>
        </div>

        {/* SECTION 6: Space Actions */}
        <div className="min-h-screen p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-purple-300 text-xs tracking-[0.3em] uppercase">
              Mission Control
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-purple-600/20 backdrop-blur-sm text-purple-300 text-sm font-light border border-purple-500/50 rounded-full hover:bg-purple-600/30 transition-all min-h-[48px]"
              >
                Transmit
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-sm font-light border border-blue-500/50 rounded-full hover:bg-blue-600/30 transition-all min-h-[48px]"
              >
                Save
              </motion.button>
            </div>

            <p className="text-purple-400/60 text-xs mt-16">
              Spectre Space Agency
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="galaxy" />
      </div>
    </div>
  );
}
