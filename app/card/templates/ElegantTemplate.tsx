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
      {/* Royal gold dust particles with crown symbols */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, -160],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          >
            <Crown className="w-3 h-3 text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Royal Palace Entrance - Palace Gates Opening */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
          {/* Palace gates */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-100 to-amber-50 z-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(180, 130, 50, 0.1) 3px, rgba(180, 130, 50, 0.1) 6px)'
            }}
          >
            {/* Gate details */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-amber-200/50 to-transparent"
                  style={{ left: `${i * 16}%` }}
                />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-100 to-amber-50 z-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(-90deg, transparent, transparent 3px, rgba(180, 130, 50, 0.1) 3px, rgba(180, 130, 50, 0.1) 6px)'
            }}
          >
            {/* Gate details */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-amber-200/50 to-transparent"
                  style={{ right: `${i * 16}%` }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-center max-w-5xl relative z-10"
          >
            {/* Royal crest */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.3, duration: 1 }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="w-40 h-40 border-4 border-amber-400/40 rounded-full" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="w-36 h-36 border-2 border-amber-300/30 rounded-full" />
                </motion.div>
                <Crown className="w-28 h-28 text-amber-500 relative z-10" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-amber-600 text-sm tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: 'serif' }}
            >
              Royal Palace Entrance
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-8"
              style={{ fontFamily: 'serif' }}
            >
              {card.recipient_name}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9 }}
              className="flex items-center justify-center gap-8"
            >
              <div className="w-32 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <Sparkles className="w-8 h-8 text-amber-500" />
              <div className="w-32 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1 }}
              className="text-gray-600 text-xl mt-8"
              style={{ fontFamily: 'serif' }}
            >
              Welcome to the Royal Court
            </motion.p>
          </motion.div>
        </div>

        {/* SECTION 2: Circular Carousel with Crown Motifs */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-stone-100 p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-700 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Royal Portrait Gallery
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-900 font-light" style={{ fontFamily: 'serif' }}>
                  Distinguished Moments
                </h2>
              </motion.div>

              {/* Circular carousel with crown motifs */}
              <div className="relative h-[700px] flex items-center justify-center">
                {/* Central crown decoration */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute z-10"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-8 border-amber-300">
                    <Crown className="w-16 h-16 text-white" />
                  </div>
                </motion.div>

                {/* Circular arrangement of portraits */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="relative w-full h-full"
                  style={{ perspective: '2000px' }}
                >
                  {allPhotos.slice(0, 6).map((photo, index) => {
                    const angle = (index * 60) * (Math.PI / 180);
                    const radius = 280;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={index}
                        className="absolute"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-index * 60}deg)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                        whileHover={{ scale: 1.1, zIndex: 20 }}
                      >
                        {/* Portrait with crown motif */}
                        <div className="relative w-48 h-64">
                          {/* Crown above portrait */}
                          <motion.div
                            animate={{ 
                              y: [0, -5, 0],
                              rotate: [0, 10, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20"
                          >
                            <Crown className="w-10 h-10 text-amber-600" />
                          </motion.div>

                          {/* Ornate frame */}
                          <div className="relative w-full h-full bg-gradient-to-br from-amber-200 via-amber-100 to-stone-200 p-4 shadow-2xl border-4 border-amber-600/40">
                            <div className="relative w-full h-full border-2 border-amber-500/30 overflow-hidden">
                              <Image
                                src={photo}
                                alt={`Portrait ${index + 1}`}
                                fill
                                className="object-cover sepia-[0.3]"
                                sizes="192px" unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-900/10" />
                            </div>
                            
                            {/* Corner decorations */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Decorative outer ring */}
                <div className="absolute inset-0 border-4 border-dashed border-amber-300/30 rounded-full" style={{ width: '600px', height: '600px', margin: 'auto' }} />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Throne Room - Royal Decree on Parchment */}
        <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-stone-100 flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl w-full"
            style={{ perspective: '1000px' }}
          >
            {/* Royal decree on parchment */}
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 p-8 sm:p-12 md:p-16 shadow-2xl border-8 border-amber-700/40">
              {/* Parchment texture */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180, 130, 50, 0.2) 2px, rgba(180, 130, 50, 0.2) 4px)'
              }} />
              
              {/* Decorative header with wax seal */}
              <div className="text-center mb-12 pb-8 border-b-4 border-amber-700/30 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Crown className="w-16 h-16 text-amber-700" />
                </motion.div>
                {/* Wax seal */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-full shadow-lg border-4 border-red-800">
                  <div className="absolute inset-2 border-2 border-red-600 rounded-full" />
                </div>
              </div>

              <div className="text-center space-y-8 relative z-10">
                <p className="text-amber-800 text-xs tracking-[0.5em] uppercase" style={{ fontFamily: 'serif' }}>
                  Royal Decree
                </p>
                
                <p 
                  className="text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-relaxed font-light"
                  style={{ fontFamily: 'serif', lineHeight: '2' }}
                >
                  {card.message}
                </p>
                
                {card.sender_name && (
                  <div className="pt-8 border-t-4 border-amber-700/30">
                    <p className="text-amber-800 text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                      Presented by Royal Decree
                    </p>
                    <p className="text-3xl sm:text-4xl text-gray-900 font-light" style={{ fontFamily: 'serif' }}>
                      {card.sender_name}
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative footer */}
              <div className="mt-12 pt-8 border-t-4 border-amber-700/30 flex justify-center gap-4">
                <Crown className="w-6 h-6 text-amber-700" />
                <Sparkles className="w-6 h-6 text-amber-600" />
                <Crown className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Grand Ballroom - Circular Photo Arrangement */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 p-8 sm:p-16 md:p-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-700 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Grand Ballroom
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-900 font-light" style={{ fontFamily: 'serif' }}>
                  Celebration in Royal Style
                </h2>
              </motion.div>

              {/* Circular photo arrangement */}
              <div className="relative h-[600px] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                  className="relative w-full h-full"
                  style={{ perspective: '2000px' }}
                >
                  {allPhotos.slice(1, 7).map((photo, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotateY(${index * 60}deg) translateZ(250px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <div className="relative w-56 h-56 -translate-x-1/2 -translate-y-1/2">
                        {/* Ornate circular frame */}
                        <div className="absolute inset-0 rounded-full border-4 border-amber-600/40 p-2">
                          <div className="relative w-full h-full rounded-full border-2 border-amber-500/30 overflow-hidden">
                            <Image
                              src={photo}
                              alt={`Ballroom ${index + 1}`}
                              fill
                              className="object-cover sepia-[0.2]"
                              sizes="224px" unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent rounded-full" />
                          </div>
                        </div>
                        
                        {/* Crown accent */}
                        <motion.div
                          animate={{ 
                            y: [0, -8, 0],
                            rotate: [0, 15, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2"
                        >
                          <Crown className="w-8 h-8 text-amber-700" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Royal ballroom badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center mt-12"
              >
                <div className="inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-8 py-3">
                  <p className="text-white text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
                    Royal Ballroom
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 5: Coronation Ceremony - Crown Placement Finale */}
        <div className="h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-white flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Royal fanfare effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                  y: [0, -100, -200],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <Crown className="w-4 h-4 text-amber-600" />
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
            {/* Crown placement animation */}
            <motion.div
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Crown className="w-32 h-32 text-amber-700 mx-auto" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 leading-none mb-8 font-light"
              style={{ fontFamily: 'serif' }}
            >
              Long Live the
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-amber-700 text-3xl sm:text-4xl md:text-5xl font-light tracking-wider" style={{ fontFamily: 'serif' }}
            >
              {card.recipient_name}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-12"
            >
              <div className="inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-8 py-3">
                <p className="text-white text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
                  Coronation Day
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 6: Royal Court Actions */}
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Royal crown particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -60, -120],
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <Crown className="w-3 h-3 text-amber-600" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl relative z-10"
          >
            {/* Royal seal with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-amber-600 to-amber-400 rounded-full shadow-2xl flex items-center justify-center border-4 border-amber-700">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Crown className="w-20 h-20 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <p className="text-amber-700 text-xs tracking-[0.5em] uppercase" style={{ fontFamily: 'serif' }}>
              Official Royal Seal
            </p>

            <h2 className="text-4xl sm:text-5xl text-gray-900 font-light mb-4" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </h2>

            <p className="text-amber-700 text-sm tracking-widest uppercase mb-8" style={{ fontFamily: 'serif' }}>
              Royal Birthday • MMXXIV
            </p>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-12 py-6 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-white text-sm font-bold uppercase tracking-widest hover:from-amber-500 hover:via-amber-300 hover:to-amber-500 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Royal Decree
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 border-2 border-amber-600 text-amber-700 text-sm font-bold uppercase tracking-widest hover:bg-amber-50 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Royal Seal
              </motion.button>
            </div>

            <p className="text-amber-500 text-xs mt-16 uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
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
