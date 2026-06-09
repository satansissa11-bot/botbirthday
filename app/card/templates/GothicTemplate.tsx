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
        {/* SECTION 1: Cathedral Arch Entrance */}
        <div className="h-screen relative overflow-hidden flex items-center justify-center">
          {/* Gothic cathedral arch */}
          <div className="relative w-full max-w-6xl h-[90%]">
            {/* Left arch pillar */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a0a2e] to-[#2d1b4e] border-r-2 border-purple-900/50"
            >
              {/* Gothic column details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-16 h-1 bg-purple-900/30 rounded" />
                ))}
              </div>
            </motion.div>

            {/* Right arch pillar */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a0a2e] to-[#2d1b4e] border-l-2 border-purple-900/50"
            >
              {/* Gothic column details */}
              <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-16 h-1 bg-purple-900/30 rounded" />
                ))}
              </div>
            </motion.div>

            {/* Arch top */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-0 left-32 right-32 h-48 bg-gradient-to-b from-[#1a0a2e] to-transparent"
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
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-950/60 to-black/80" />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-center max-w-4xl"
                >
                  <p className="text-purple-400 text-xs tracking-[0.5em] uppercase mb-6" style={{ fontFamily: 'serif' }}>
                    The Cathedral
                  </p>
                  <h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
                    style={{ fontFamily: 'serif', textShadow: '0 0 40px rgba(147, 51, 234, 0.5)' }}
                  >
                    {card.recipient_name}
                  </h1>
                  <p className="text-purple-300 text-xl sm:text-2xl font-light" style={{ fontFamily: 'serif' }}>
                    A Dark Celebration
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Portrait Gallery - Gothic Frames */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-[#0a0a0f] p-8 sm:p-16 md:p-24">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Portrait Gallery
                </p>
                <h2 className="text-3xl sm:text-4xl text-stone-100" style={{ fontFamily: 'serif' }}>
                  Honored Guests
                </h2>
              </motion.div>

              {/* Gothic frame layout */}
              <div className="space-y-12">
                {allPhotos.slice(0, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="flex items-center gap-8"
                  >
                    {/* Gothic portrait frame */}
                    <div className="flex-1 max-w-md">
                      <div className="relative aspect-[3/4] bg-[#1a0a2e] p-4 border-2 border-purple-900/50">
                        {/* Gothic arch top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-purple-900/50 to-transparent" style={{
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
                          {/* Purple vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-purple-900/40" />
                        </div>
                      </div>
                    </div>

                    {/* Gothic plaque */}
                    <div className="flex-1">
                      <div className="bg-[#1a0a2e] p-6 border border-purple-900/50">
                        <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                          Portrait {index + 1}
                        </p>
                        <p className="text-stone-300 text-sm" style={{ fontFamily: 'serif' }}>
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

        {/* SECTION 3: Gothic Letter */}
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-3xl w-full"
          >
            {/* Gothic letter paper */}
            <div className="relative bg-[#1a0a2e] p-8 sm:p-12 md:p-16 shadow-2xl border-2 border-purple-900/50" style={{
              backgroundImage: 'linear-gradient(to right, rgba(147, 51, 234, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 100%'
            }}>
              {/* Gothic border decoration */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-900/50 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-transparent via-purple-900/50 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-transparent via-purple-900/50 to-transparent" />
              </div>

              {/* Gothic seal */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full shadow-xl flex items-center justify-center border-4 border-purple-400">
                  <Flame className="w-10 h-10 text-purple-200" />
                </div>
              </div>

              <div className="relative z-10 pt-12">
                <p className="text-purple-400 text-sm tracking-[0.3em] uppercase mb-8" style={{ fontFamily: 'serif' }}>
                  To {card.recipient_name},
                </p>

                <p
                  className="text-stone-200 text-lg md:text-xl leading-loose"
                  style={{ fontFamily: 'serif', lineHeight: '2.2' }}
                >
                  {card.message}
                </p>

                {card.sender_name && (
                  <p className="text-purple-400 text-base mt-12 italic" style={{ fontFamily: 'serif' }}>
                    — {card.sender_name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Cathedral Gallery - Horizontal Scroll */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-[#0a0a0f] p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-purple-400 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  Cathedral Memories
                </p>
                <h2 className="text-3xl sm:text-4xl text-stone-100" style={{ fontFamily: 'serif' }}>
                  By Candlelight
                </h2>
              </motion.div>

              {/* Horizontal scroll gallery */}
              <div className="flex gap-6 overflow-x-auto pb-8">
                {allPhotos.slice(1, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex-shrink-0 w-72"
                  >
                    <div className="relative aspect-[3/4] bg-[#1a0a2e] p-3 border-2 border-purple-900/50">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="288px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Grand Finale - Cathedral Nave */}
        <div className="h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
          {/* Chandelier effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-1 h-32 bg-gradient-to-b from-purple-500/30 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Flame className="w-24 h-24 text-purple-400 mx-auto" />
            </motion.div>

            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-100 leading-none mb-8"
              style={{ fontFamily: 'serif', textShadow: '0 0 60px rgba(147, 51, 234, 0.5)' }}
            >
              The Cathedral Awaits
            </h2>

            <p className="text-purple-400 text-2xl tracking-[0.3em] uppercase" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Cathedral Actions */}
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-2xl"
          >
            <p className="text-purple-400 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'serif' }}>
              Depart the Cathedral
            </p>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-8 py-4 bg-[#1a0a2e] text-stone-200 text-sm border-2 border-purple-900/50 hover:bg-purple-900/30 transition-colors min-h-[52px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Invitation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#1a0a2e] text-stone-200 text-sm border-2 border-purple-900/50 hover:bg-purple-900/30 transition-colors min-h-[52px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Memory
              </motion.button>
            </div>

            <p className="text-stone-500 text-xs mt-16" style={{ fontFamily: 'serif' }}>
              Spectre Cathedral • Est. MMXXIV
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="gothic" />
      </div>
    </div>
  );
}
