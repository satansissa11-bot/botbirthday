'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Music, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface MusicFestivalTemplateProps {
  card: BirthdayCard;
}

export default function MusicFestivalTemplate({ card }: MusicFestivalTemplateProps) {
  const template = getTemplate('music-festival');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Festival - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-orange-600/30"
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Enhanced Festival Poster */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Enhanced pulsing lights effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 3, 1],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className={`w-4 h-4 ${i % 3 === 0 ? 'bg-pink-500' : i % 3 === 1 ? 'bg-orange-500' : 'bg-yellow-500'} rounded-full blur-md`} />
              </motion.div>
            ))}
          </div>

          {/* Spotlight effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + i * 23}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <div className={`w-32 h-32 ${i % 2 === 0 ? 'bg-pink-500' : 'bg-orange-500'} rounded-full blur-3xl`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl w-full relative z-10"
          >
            {/* Enhanced poster frame */}
            <div className="bg-black/95 backdrop-blur-md border-16 border-white/40 shadow-2xl overflow-hidden relative">
              {/* Poster content */}
              <div className="p-12 sm:p-16 md:p-24 text-center">
                {/* Enhanced festival logo */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-12"
                >
                  <Music className="w-32 h-32 text-pink-400 mx-auto" style={{ filter: 'drop-shadow(0 0 50px rgba(236, 72, 153, 1))' }} />
                </motion.div>
                
                {/* Enhanced festival name */}
                <motion.h1
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black text-white leading-none mb-8"
                  style={{ 
                    fontFamily: 'sans-serif',
                    textShadow: '0 0 80px rgba(236, 72, 153, 1), 0 0 160px rgba(236, 72, 153, 0.7)',
                  }}
                >
                  BIRTHDAY
                </motion.h1>
                
                <motion.h2
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent leading-none mb-10"
                  style={{ 
                    fontFamily: 'sans-serif',
                    background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  FESTIVAL
                </motion.h2>
                
                {/* Enhanced headline act */}
                <div className="mb-10">
                  <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-3 font-bold">
                    ★ HEADLINING ACT ★
                  </p>
                  <h3 
                    className="text-5xl sm:text-6xl md:text-7xl font-black text-white"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    {card.recipient_name}
                  </h3>
                </div>
                
                {/* Enhanced event details */}
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-white/90">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <p className="text-base font-bold">{currentDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6" />
                    <p className="text-base font-bold">Everywhere</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute top-6 left-6 w-20 h-20 border-6 border-pink-400/60 rounded-full" />
              <div className="absolute bottom-6 right-6 w-20 h-20 border-6 border-orange-400/60 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Enhanced Lineup */}
        <div className="min-h-screen bg-black/60 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Pulsing lights effect */}
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
                  opacity: [0.2, 0.7, 0.2],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className={`w-2 h-2 ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'} rounded-full blur-sm`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full relative z-10"
          >
            <div className="text-center mb-16">
              <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                ★ THE LINEUP ★
              </p>
              <h2 
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white"
                style={{ fontFamily: 'sans-serif' }}
              >
                FEATURING
              </h2>
            </div>

            {/* Enhanced lineup list */}
            <div className="space-y-8">
              {[
                { name: card.recipient_name, time: 'HEADLINE', color: 'text-pink-400' },
                { name: 'Celebration', time: 'SUPPORT', color: 'text-orange-400' },
                { name: 'Joy & Happiness', time: 'SUPPORT', color: 'text-yellow-400' },
                { name: 'Memories', time: 'OPENING', color: 'text-purple-400' },
              ].map((act, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between bg-white/15 backdrop-blur-md p-8 border-2 border-white/30 shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <Music className="w-8 h-8 text-white/80" />
                    </motion.div>
                    <h3 
                      className={`text-3xl sm:text-4xl font-black ${act.color}`}
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      {act.name}
                    </h3>
                  </div>
                  <p className="text-white/80 text-base tracking-widest font-bold">{act.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Enhanced Photo Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black/40 p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Pulsing lights effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.6, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <div className={`w-2 h-2 ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'} rounded-full blur-sm`} />
                </motion.div>
              ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-orange-400 text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                  ★ PHOTO GALLERY ★
                </p>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-white"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  LIVE SHOTS
                </h2>
              </motion.div>

              {/* Enhanced photo grid with neon borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative group"
                  >
                    <div className="aspect-square bg-black/50 overflow-hidden border-4 border-pink-500/60 group-hover:border-orange-500/60 transition-colors shadow-xl">
                      <Image
                        src={photo}
                        alt={`Live ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw" unoptimized
                      />
                      {/* Enhanced neon overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-600/50 to-transparent group-hover:from-orange-600/50 transition-colors" />
                    </div>
                    {/* Enhanced photo number */}
                    <div className="absolute top-3 left-3 bg-black/90 text-pink-400 px-4 py-2 text-sm font-bold border border-pink-400/50">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Stage Backdrop Message with Spotlight */}
        <div className="min-h-screen bg-black relative overflow-hidden">
          {/* Stage backdrop with spotlight effect */}
          <div className="absolute inset-0">
            {/* Spotlight cone */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-pink-500/20 via-transparent to-transparent"
              style={{
                clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
              }}
            />

            {/* Stage lights */}
            <div className="absolute top-0 left-0 right-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0"
                  style={{ left: `${10 + i * 20}%` }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <div className="w-1 h-64 bg-gradient-to-b from-pink-400/60 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Background photo with blur */}
            {allPhotos.length > 0 && (
              <div className="absolute inset-0">
                <Image
                  src={allPhotos[0]}
                  alt="Stage backdrop"
                  fill
                  className="object-cover blur-sm opacity-30"
                  sizes="100vw" unoptimized
                />
              </div>
            )}
          </div>

          {/* Center stage content */}
          <div className="relative z-10 h-screen flex items-center justify-center p-8 sm:p-16 md:p-24">
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="space-y-12"
              >
                {/* Stage banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="inline-block bg-gradient-to-r from-pink-600 to-orange-600 text-white px-8 py-3 text-sm font-black tracking-widest uppercase border-4 border-white/30 shadow-2xl">
                    ★ LIVE ON STAGE ★
                  </div>
                </motion.div>

                {/* Microphone stand */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="w-2 h-32 bg-gradient-to-b from-gray-400 to-gray-600 mx-auto rounded-full" />
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto -mt-2 shadow-2xl border-4 border-gray-500" />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed font-black" style={{ fontFamily: 'sans-serif', lineHeight: '1.6', textShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}>
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
                    className="pt-8 border-t-2 border-pink-500/50"
                  >
                    <p className="text-pink-400 text-xs tracking-widest uppercase mb-2 font-black">
                      PERFORMED BY
                    </p>
                    <p className="text-white text-2xl font-black" style={{ fontFamily: 'sans-serif' }}>
                      {card.sender_name}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Stage floor reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/10 to-transparent" />
        </div>

        {/* SECTION 5: Enhanced Festival Finale */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Enhanced animated lights */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 2.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className={`w-4 h-4 ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'} rounded-full blur-sm`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-14"
            >
              <Music className="w-32 h-32 text-pink-400 mx-auto" style={{ filter: 'drop-shadow(0 0 40px rgba(236, 72, 153, 0.9))' }} />
            </motion.div>
            
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-10"
              style={{
                fontFamily: 'sans-serif',
                textShadow: '0 0 60px rgba(236, 72, 153, 0.9), 0 0 120px rgba(236, 72, 153, 0.5)',
              }}
            >
              LET&apos;S PARTY
            </motion.h2>
            
            <p className="text-orange-400 text-4xl font-black" style={{ fontFamily: 'sans-serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Enhanced Festival Actions */}
        <div className="min-h-screen bg-black/60 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Pulsing lights effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.6, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className={`w-2 h-2 ${i % 3 === 0 ? 'bg-pink-400' : i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'} rounded-full blur-sm`} />
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
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase font-bold">
              ★ GET YOUR TICKET ★
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(236, 72, 153, 0.7)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-10 py-6 bg-gradient-to-r from-pink-600 to-orange-600 text-white text-lg font-black uppercase tracking-wider hover:from-pink-500 hover:to-orange-500 transition-all min-h-[64px] shadow-2xl"
                style={{ fontFamily: 'sans-serif' }}
              >
                SHARE FESTIVAL
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(236, 72, 153, 0.7)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-6 border-4 border-pink-400 text-pink-400 text-lg font-black uppercase tracking-wider hover:bg-pink-400 hover:text-black transition-all min-h-[64px] shadow-2xl"
                style={{ fontFamily: 'sans-serif' }}
              >
                SAVE TICKET
              </motion.button>
            </div>

            <p className="text-white/50 text-sm uppercase tracking-widest font-bold" style={{ fontFamily: 'sans-serif' }}>
              SPECTRE FESTIVAL PRODUCTIONS
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="music-festival" />
      </div>
    </div>
  );
}
