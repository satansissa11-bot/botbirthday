'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Zap } from 'lucide-react';
import Image from 'next/image';

interface ComicBookTemplateProps {
  card: BirthdayCard;
}

export default function ComicBookTemplate({ card }: ComicBookTemplateProps) {
  const template = getTemplate('comic-book');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Comic - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Halftone pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Dynamic Comic Cover with Action Effects */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
          {/* Enhanced action lines background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-yellow-500/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 100}px`,
                  height: '6px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              />
            ))}
          </div>

          {/* Comic burst effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${20 + (i % 2) * 30}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-30 blur-sm" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-3xl w-full relative z-10"
          >
            {/* Comic book cover with enhanced styling */}
            <div className="bg-white border-12 border-black shadow-2xl overflow-hidden relative">
              {/* Comic corner burst */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600 clip-corner" />
              
              {/* Cover header */}
              <div className="bg-red-600 text-white p-8 text-center relative">
                <p className="text-4xl font-black tracking-wider mb-2" style={{ fontFamily: 'sans-serif', textShadow: '3px 3px 0 #000' }}>
                  BIRTHDAY COMICS
                </p>
                <p className="text-xl font-bold" style={{ textShadow: '2px 2px 0 #000' }}>SPECIAL EDITION • ISSUE #1</p>
              </div>
              
              {/* Cover image */}
              {allPhotos.length > 0 && (
                <div className="aspect-[3/4] bg-yellow-100 relative">
                  <Image
                    src={allPhotos[0]}
                    alt="Cover"
                    fill
                    className="object-cover"
                    sizes="100vw" unoptimized
                  />
                  {/* Comic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* Action burst overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          rotate: [0, 45, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        <Zap className="w-12 h-12 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Cover title */}
              <div className="bg-yellow-400 p-8 text-center border-t-8 border-black relative">
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-black leading-none mb-3"
                  style={{ fontFamily: 'sans-serif', textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}
                >
                  {card.recipient_name}
                </h1>
                <p className="text-2xl font-black text-red-600" style={{ textShadow: '2px 2px 0 #fff' }}>
                  THE BIRTHDAY ADVENTURE BEGINS!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Panel 1 - Dramatic Introduction */}
        <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Action burst background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <div className="w-20 h-20 bg-red-500/20 rounded-full" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full relative z-10"
          >
            {/* Enhanced comic panel */}
            <div className="border-8 border-black bg-yellow-50 p-8 sm:p-10 md:p-14 relative shadow-2xl">
              {/* Panel number with burst */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 font-bold text-sm border-4 border-black transform -rotate-2">
                PANEL 1
              </div>
              
              {/* Dramatic speech bubble */}
              <div className="bg-white border-8 border-black p-8 rounded-3xl relative mt-12 shadow-xl">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-6 left-16 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-t-12 border-t-black" />
                
                <motion.p
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl sm:text-4xl md:text-5xl font-black text-black leading-relaxed"
                  style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #fff' }}
                >
                  HAPPY BIRTHDAY,<br />
                  {card.recipient_name.toUpperCase()}!
                </motion.p>
              </div>
              
              {/* Enhanced action text */}
              <div className="mt-10 text-center">
                <motion.p
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl font-black text-red-600 italic"
                  style={{ fontFamily: 'sans-serif', textShadow: '1px 1px 0 #fff' }}
                >
                  *EXCITEMENT FILLS THE AIR!*
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Panel 2 - Dynamic Photo Story */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-blue-600 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
            {/* Comic speed lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 300 + 100}px`,
                    height: '3px',
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  animate={{
                    x: [0, 50, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random(),
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl w-full relative z-10"
            >
              {/* Enhanced comic panel */}
              <div className="border-8 border-black bg-white p-8 sm:p-10 md:p-14 relative shadow-2xl">
                {/* Panel number with burst */}
                <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 font-bold text-sm border-4 border-white transform rotate-2">
                  PANEL 2
                </div>
                
                {/* Dynamic photo grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {allPhotos.slice(1, 5).map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="aspect-square border-6 border-black bg-yellow-100 overflow-hidden relative shadow-lg"
                    >
                      <Image
                        src={photo}
                        alt={`Panel ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="50vw" unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Enhanced caption box */}
                <div className="bg-yellow-400 border-6 border-black p-6 relative">
                  <motion.p
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-2xl font-black text-black"
                    style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #fff' }}
                  >
                    MEMORIES OF THE PAST YEAR!
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 4: Comic Letter with Dramatic Styling */}
        <div className="min-h-screen bg-yellow-200 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Comic burst background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.8, 0],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <Zap className="w-16 h-16 text-red-500/30 fill-current" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
            whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl w-full relative z-10"
          >
            {/* Enhanced letter paper */}
            <div className="bg-white p-10 sm:p-14 md:p-20 shadow-2xl relative border-8 border-black">
              {/* Comic corner decorations */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-red-500 border-6 border-black transform -rotate-12" />
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 border-6 border-black transform rotate-12" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-500 border-6 border-black transform rotate-12" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500 border-6 border-black transform -rotate-12" />
              
              {/* Letter header */}
              <div className="border-b-8 border-black pb-8 mb-10">
                <motion.p
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-red-600 text-sm font-black tracking-widest uppercase mb-2"
                >
                  From the Desk of
                </motion.p>
                <p className="text-3xl sm:text-4xl font-black text-black" style={{ textShadow: '2px 2px 0 #fff' }}>
                  {card.sender_name || 'Your Friend'}
                </p>
              </div>

              {/* Letter body */}
              <div className="space-y-8">
                <p className="text-black text-2xl sm:text-3xl font-black leading-relaxed">
                  Dear {card.recipient_name},
                </p>
                
                <p 
                  className="text-black text-lg sm:text-xl leading-relaxed font-bold"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {card.message}
                </p>
              </div>

              {/* Letter footer */}
              <div className="border-t-8 border-black pt-8 mt-12">
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-red-600 text-lg font-black tracking-widest uppercase"
                  style={{ textShadow: '1px 1px 0 #fff' }}
                >
                  POW! HAPPY BIRTHDAY!
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 5: Panel 4 - Epic Celebration */}
        <div className="min-h-screen bg-green-600 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Confetti burst background */}
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
                  y: [0, -100, 0],
                  rotate: [0, 360],
                  scale: [1, 0.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className={`w-4 h-4 ${i % 4 === 0 ? 'bg-yellow-400' : i % 4 === 1 ? 'bg-red-400' : i % 4 === 2 ? 'bg-blue-400' : 'bg-white'} rounded-full`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full relative z-10"
          >
            {/* Enhanced comic panel */}
            <div className="border-8 border-black bg-white p-8 sm:p-10 md:p-14 relative shadow-2xl">
              {/* Panel number with burst */}
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 font-bold text-sm border-4 border-black transform rotate-3">
                PANEL 4
              </div>
              
              {/* Epic celebration burst */}
              <div className="text-center py-16">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-10"
                >
                  <Zap className="w-28 h-28 text-yellow-400 fill-current" style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))' }} />
                </motion.div>
                
                <motion.h2
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl sm:text-7xl md:text-8xl font-black text-black leading-none mb-6"
                  style={{ fontFamily: 'sans-serif', textShadow: '6px 6px 0 #fff, 12px 12px 0 #000' }}
                >
                  CELEBRATION!
                </motion.h2>
                
                <motion.p
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl font-black text-red-600"
                  style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #fff' }}
                >
                  *CONFETTI EVERYWHERE!*
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 6: Epic Cliffhanger Finale */}
        <div className="min-h-screen bg-black flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Dramatic comic panel border */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-12 bg-red-600" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-red-600" />
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-red-600" />
            <div className="absolute top-0 bottom-0 right-0 w-12 bg-red-600" />
          </div>

          {/* Lightning burst background */}
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
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Zap className="w-20 h-20 text-yellow-400/50 fill-current" />
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
            {/* Dramatic cliffhanger text */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Zap className="w-32 h-32 text-yellow-400 mx-auto fill-current" style={{ filter: 'drop-shadow(0 0 30px rgba(250, 204, 21, 0.8))' }} />
            </motion.div>
            
            <motion.h2
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl sm:text-8xl md:text-9xl font-black text-white leading-none mb-8"
              style={{ 
                fontFamily: 'sans-serif',
                textShadow: '6px 6px 0 #000, 12px 12px 0 #ff0000',
              }}
            >
              TO BE
            </motion.h2>
            
            <motion.h2
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl sm:text-8xl md:text-9xl font-black text-yellow-400 leading-none mb-12"
              style={{ 
                fontFamily: 'sans-serif',
                textShadow: '6px 6px 0 #000, 12px 12px 0 #ff0000',
              }}
            >
              CONTINUED...
            </motion.h2>
            
            <motion.p
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-white text-3xl font-black"
              style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #000' }}
            >
              ISSUE #2 COMING SOON!
            </motion.p>
          </motion.div>
        </div>

        {/* SECTION 7: Comic Actions with Enhanced Styling */}
        <div className="bg-black text-white p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Comic burst background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <div className={`w-16 h-16 ${i % 2 === 0 ? 'bg-red-500/30' : 'bg-yellow-500/30'} rounded-full`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-10">
              <motion.button
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-10 py-6 bg-yellow-400 text-black text-lg font-black border-6 border-black hover:bg-yellow-300 transition-all min-h-[60px] shadow-2xl"
                style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #fff' }}
              >
                SHARE THIS ISSUE!
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-6 bg-white text-black text-lg font-black border-6 border-black hover:bg-gray-100 transition-all min-h-[60px] shadow-2xl"
                style={{ fontFamily: 'sans-serif', textShadow: '2px 2px 0 #fff' }}
              >
                COLLECT!
              </motion.button>
            </div>

            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-sm text-gray-300 font-black tracking-widest uppercase"
              style={{ fontFamily: 'sans-serif' }}
            >
              © SPECTRE COMICS • ALL RIGHTS RESERVED
            </motion.p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="comic-book" />
      </div>
    </div>
  );
}
