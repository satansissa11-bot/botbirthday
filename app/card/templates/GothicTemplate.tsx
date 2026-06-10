'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Flame } from 'lucide-react';
import Image from 'next/image';

interface GothicTemplateProps {
  card: BirthdayCard;
}

export default function GothicTemplate({ card }: GothicTemplateProps) {
  const template = getTemplate('gothic');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Dark Celebration - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-stone-200">
      {/* Cathedral stone texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(75, 0, 130, 0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(75, 0, 130, 0.1) 50%)
          `,
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Flickering torchlight effects */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-purple-500/10 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 25}%`,
              top: `${10 + i * 20}%`,
              width: `${150 + Math.random() * 100}px`,
              height: `${150 + Math.random() * 100}px`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Dramatic Cathedral Arch Entrance */}
        <div className="h-screen relative overflow-hidden flex items-center justify-center">
          {/* Enhanced Gothic cathedral arch */}
          <div className="relative w-full max-w-6xl h-[90%]">
            {/* Left arch pillar */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#1a0a2e] to-[#2d1b4e] border-r-4 border-purple-900/60 shadow-2xl"
            >
              {/* Enhanced Gothic column details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-20 h-1.5 bg-purple-900/40 rounded" />
                ))}
              </div>
            </motion.div>

            {/* Right arch pillar */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#1a0a2e] to-[#2d1b4e] border-l-4 border-purple-900/60 shadow-2xl"
            >
              {/* Enhanced Gothic column details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-20 h-1.5 bg-purple-900/40 rounded" />
                ))}
              </div>
            </motion.div>

            {/* Enhanced arch top */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-0 left-40 right-40 h-56 bg-gradient-to-b from-[#1a0a2e] to-transparent shadow-2xl"
              style={{
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
            />

            {/* Center content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {allPhotos.length > 0 && (
                <div className="relative w-full h-full">
                  <Image
                    src={allPhotos[0]}
                    alt="Gothic hero"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-950/70 to-black/90" />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-center max-w-4xl"
                >
                  <p className="text-purple-400 text-sm tracking-[0.5em] uppercase mb-8 font-bold" style={{ fontFamily: 'serif' }}>
                    ★ THE CATHEDRAL ★
                  </p>
                  <motion.h1
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-8"
                    style={{ fontFamily: 'serif', textShadow: '0 0 60px rgba(147, 51, 234, 0.7)' }}
                  >
                    {card.recipient_name}
                  </motion.h1>
                  <p className="text-purple-300 text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'serif' }}>
                    A DARK CELEBRATION
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Enhanced Portrait Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-[#0a0a0f] p-8 sm:p-16 md:p-24 relative overflow-hidden">
            {/* Flickering torchlight effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-purple-500/10 rounded-full blur-3xl"
                  style={{
                    left: `${10 + i * 18}%`,
                    top: `${10 + i * 15}%`,
                    width: `${100 + Math.random() * 80}px`,
                    height: `${100 + Math.random() * 80}px`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ THE PORTRAIT GALLERY ★
                </p>
                <h2 className="text-4xl sm:text-5xl text-stone-100 font-bold" style={{ fontFamily: 'serif' }}>
                  Honored Guests
                </h2>
              </motion.div>

              {/* Enhanced Gothic frame layout */}
              <div className="space-y-16">
                {allPhotos.slice(0, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-10"
                  >
                    {/* Enhanced Gothic portrait frame */}
                    <div className="flex-1 max-w-md">
                      <div className="relative aspect-[3/4] bg-[#1a0a2e] p-6 border-4 border-purple-900/60 shadow-2xl">
                        {/* Enhanced Gothic arch top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-purple-900/60 to-transparent shadow-lg" style={{
                          clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                        }} />
                        <div className="relative w-full h-full overflow-hidden">
                          <Image
                            src={photo}
                            alt={`Portrait ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                          {/* Enhanced purple vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-purple-900/50" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Gothic plaque */}
                    <div className="flex-1">
                      <div className="bg-[#1a0a2e] p-8 border-2 border-purple-900/60 shadow-xl">
                        <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-3 font-bold" style={{ fontFamily: 'serif' }}>
                          PORTRAIT {index + 1}
                        </p>
                        <p className="text-stone-300 text-base" style={{ fontFamily: 'serif' }}>
                          A cherished memory from the cathedral
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Enhanced Gothic Letter */}
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Flickering torchlight effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-purple-500/10 rounded-full blur-3xl"
                style={{
                  left: `${15 + i * 20}%`,
                  top: `${15 + i * 18}%`,
                  width: `${120 + Math.random() * 90}px`,
                  height: `${120 + Math.random() * 90}px`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-3xl w-full relative z-10"
          >
            {/* Enhanced Gothic letter paper */}
            <div className="relative bg-[#1a0a2e] p-10 sm:p-14 md:p-20 shadow-2xl border-4 border-purple-900/60" style={{
              backgroundImage: 'linear-gradient(to right, rgba(147, 51, 234, 0.08) 1px, transparent 1px)',
              backgroundSize: '20px 100%'
            }}>
              {/* Enhanced Gothic border decoration */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-purple-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-purple-900/60 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-b from-transparent via-purple-900/60 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-b from-transparent via-purple-900/60 to-transparent" />
              </div>

              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-10 h-10 border-4 border-purple-700/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-10 h-10 border-4 border-purple-700/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-4 border-purple-700/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-4 border-purple-700/50 rounded-br-lg" />

              {/* Enhanced Gothic seal */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-purple-400">
                  <Flame className="w-12 h-12 text-purple-200" />
                </div>
              </motion.div>

              <div className="relative z-10 pt-16">
                <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-10 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ TO {card.recipient_name.toUpperCase()} ★
                </p>

                <p
                  className="text-stone-200 text-xl md:text-2xl leading-loose"
                  style={{ fontFamily: 'serif', lineHeight: '2.4' }}
                >
                  {card.message}
                </p>

                {card.sender_name && (
                  <p className="text-purple-400 text-lg mt-14 italic font-bold" style={{ fontFamily: 'serif' }}>
                    — {card.sender_name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Enhanced Cathedral Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-[#0a0a0f] p-8 sm:p-16 md:p-24 relative overflow-hidden">
            {/* Flickering torchlight effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-purple-500/10 rounded-full blur-3xl"
                  style={{
                    left: `${12 + i * 19}%`,
                    top: `${12 + i * 17}%`,
                    width: `${110 + Math.random() * 85}px`,
                    height: `${110 + Math.random() * 85}px`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ CATHEDRAL MEMORIES ★
                </p>
                <h2 className="text-4xl sm:text-5xl text-stone-100 font-bold" style={{ fontFamily: 'serif' }}>
                  By Candlelight
                </h2>
              </motion.div>

              {/* Enhanced horizontal scroll gallery */}
              <div className="flex gap-8 overflow-x-auto pb-10">
                {allPhotos.slice(1, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 w-80"
                  >
                    <div className="relative aspect-[3/4] bg-[#1a0a2e] p-4 border-4 border-purple-900/60 shadow-2xl">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Enhanced Grand Finale */}
        <div className="h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
          {/* Enhanced chandelier effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-1.5 h-40 bg-gradient-to-b from-purple-500/40 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Flickering torchlight effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-purple-500/15 rounded-full blur-3xl"
                style={{
                  left: `${10 + i * 16}%`,
                  top: `${10 + i * 16}%`,
                  width: `${130 + Math.random() * 100}px`,
                  height: `${130 + Math.random() * 100}px`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
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
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-14"
            >
              <Flame className="w-32 h-32 text-purple-400 mx-auto" style={{ filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.6))' }} />
            </motion.div>

            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-100 leading-none mb-10 font-bold"
              style={{ fontFamily: 'serif', textShadow: '0 0 80px rgba(147, 51, 234, 0.7)' }}
            >
              The Cathedral Awaits
            </motion.h2>

            <p className="text-purple-400 text-3xl tracking-[0.3em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Enhanced Cathedral Actions */}
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Flickering torchlight effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-purple-500/10 rounded-full blur-3xl"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${10 + i * 20}%`,
                  width: `${100 + Math.random() * 80}px`,
                  height: `${100 + Math.random() * 80}px`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-2xl relative z-10"
          >
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
              ★ DEPART THE CATHEDRAL ★
            </p>

            <div className="flex flex-col gap-6">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-10 py-6 bg-[#1a0a2e] text-stone-200 text-lg border-4 border-purple-900/60 hover:bg-purple-900/40 transition-all min-h-[64px] shadow-xl"
                style={{ fontFamily: 'serif' }}
              >
                SHARE INVITATION
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-6 bg-[#1a0a2e] text-stone-200 text-lg border-4 border-purple-900/60 hover:bg-purple-900/40 transition-all min-h-[64px] shadow-xl"
                style={{ fontFamily: 'serif' }}
              >
                SAVE MEMORY
              </motion.button>
            </div>

            <p className="text-stone-500 text-sm mt-16 font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
              SPECTRE CATHEDRAL • EST. MMXXIV
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="gothic" />
      </div>
    </div>
  );
}
