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
        {/* SECTION 1: Comic Cover */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full"
          >
            {/* Comic book cover */}
            <div className="bg-white border-4 border-black shadow-2xl overflow-hidden">
              {/* Cover header */}
              <div className="bg-red-600 text-white p-4 text-center">
                <p className="text-2xl font-black tracking-wider" style={{ fontFamily: 'sans-serif' }}>
                  BIRTHDAY COMICS
                </p>
                <p className="text-sm">Issue #1</p>
              </div>
              
              {/* Cover image */}
              {allPhotos.length > 0 && (
                <div className="aspect-[3/4] bg-yellow-100 relative">
                  <Image
                    src={allPhotos[0]}
                    alt="Cover"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  {/* Comic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}
              
              {/* Cover title */}
              <div className="bg-yellow-400 p-6 text-center border-t-4 border-black">
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-black leading-none mb-2"
                  style={{ fontFamily: 'sans-serif', textShadow: '3px 3px 0 #fff' }}
                >
                  {card.recipient_name}
                </h1>
                <p className="text-xl font-bold">THE BIRTHDAY ADVENTURE!</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Panel 1 - Introduction */}
        <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full"
          >
            {/* Comic panel */}
            <div className="border-4 border-black bg-yellow-50 p-6 sm:p-8 md:p-12 relative">
              {/* Panel number */}
              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-bold text-sm">
                PANEL 1
              </div>
              
              {/* Speech bubble */}
              <div className="bg-white border-4 border-black p-6 rounded-3xl relative mt-8">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-4 left-12 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black" />
                
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                  HAPPY BIRTHDAY, {card.recipient_name.toUpperCase()}!
                </p>
              </div>
              
              {/* Action text */}
              <div className="mt-8 text-center">
                <p className="text-lg font-bold text-red-600 italic" style={{ fontFamily: 'sans-serif' }}>
                  *excitement fills the air*
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Panel 2 - Photo Story */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-blue-500 p-8 sm:p-12 md:p-16 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl w-full"
            >
              {/* Comic panel */}
              <div className="border-4 border-black bg-white p-6 sm:p-8 md:p-12 relative">
                {/* Panel number */}
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-bold text-sm">
                  PANEL 2
                </div>
                
                {/* Photo grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {allPhotos.slice(1, 5).map((photo, index) => (
                    <div key={index} className="aspect-square border-4 border-black bg-yellow-100 overflow-hidden relative">
                      <Image
                        src={photo}
                        alt={`Panel ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Caption box */}
                <div className="bg-yellow-400 border-4 border-black p-4">
                  <p className="text-lg font-bold text-black" style={{ fontFamily: 'sans-serif' }}>
                    MEMORIES OF THE PAST YEAR!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 4: Letter Message - Comic Letter Style */}
        <div className="min-h-screen bg-yellow-100 p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl w-full"
          >
            {/* Letter paper */}
            <div className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl relative border-4 border-black">
              {/* Letter header */}
              <div className="border-b-4 border-black pb-6 mb-8">
                <p className="text-red-600 text-sm font-bold tracking-widest uppercase mb-2">
                  From the Desk of
                </p>
                <p className="text-2xl sm:text-3xl font-black text-black">
                  {card.sender_name || 'Your Friend'}
                </p>
              </div>

              {/* Letter body */}
              <div className="space-y-6">
                <p className="text-black text-lg sm:text-xl font-bold leading-relaxed">
                  Dear {card.recipient_name},
                </p>
                
                <p 
                  className="text-black text-base sm:text-lg leading-relaxed"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {card.message}
                </p>
              </div>

              {/* Letter footer */}
              <div className="border-t-4 border-black pt-6 mt-8">
                <p className="text-red-600 text-sm font-bold tracking-widest uppercase">
                  POW! HAPPY BIRTHDAY!
                </p>
              </div>

              {/* Comic corner decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 border-4 border-black" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 border-4 border-black" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-500 border-4 border-black" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-green-500 border-4 border-black" />
            </div>
          </motion.div>
        </div>

        {/* SECTION 5: Panel 4 - Celebration */}
        <div className="min-h-screen bg-green-500 p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full"
          >
            {/* Comic panel */}
            <div className="border-4 border-black bg-white p-6 sm:p-8 md:p-12 relative">
              {/* Panel number */}
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-bold text-sm">
                PANEL 4
              </div>
              
              {/* Celebration burst */}
              <div className="text-center py-12">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-8"
                >
                  <Zap className="w-20 h-20 text-yellow-400" fill="currentColor" />
                </motion.div>
                
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-black leading-none mb-4"
                  style={{ fontFamily: 'sans-serif', textShadow: '4px 4px 0 #fff' }}
                >
                  CELEBRATION!
                </h2>
                
                <p className="text-2xl font-bold text-red-600" style={{ fontFamily: 'sans-serif' }}>
                  *confetti everywhere*
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 6: To Be Continued Cliffhanger Finale */}
        <div className="min-h-screen bg-black flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Comic panel background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-8 bg-red-600" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-red-600" />
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-red-600" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-red-600" />
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
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Zap className="w-24 h-24 text-yellow-400 mx-auto fill-current" />
            </motion.div>
            
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none mb-8"
              style={{ 
                fontFamily: 'sans-serif',
                textShadow: '4px 4px 0 #000',
              }}
            >
              TO BE
            </h2>
            
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl font-black text-yellow-400 leading-none mb-12"
              style={{ 
                fontFamily: 'sans-serif',
                textShadow: '4px 4px 0 #000',
              }}
            >
              CONTINUED...
            </h2>
            
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'sans-serif' }}>
              ISSUE #2 COMING SOON
            </p>
          </motion.div>
        </div>

        {/* SECTION 7: Comic Actions */}
        <div className="bg-black text-white p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-yellow-400 text-black text-sm font-bold border-4 border-black hover:bg-yellow-300 transition-colors min-h-[48px]"
                style={{ fontFamily: 'sans-serif' }}
              >
                SHARE THIS ISSUE!
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 bg-white text-black text-sm font-bold border-4 border-black hover:bg-gray-100 transition-colors min-h-[48px]"
                style={{ fontFamily: 'sans-serif' }}
              >
                COLLECT!
              </motion.button>
            </div>

            <p className="text-xs text-gray-400" style={{ fontFamily: 'sans-serif' }}>
              © SPECTRE COMICS • ALL RIGHTS RESERVED
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="comic-book" />
      </div>
    </div>
  );
}
