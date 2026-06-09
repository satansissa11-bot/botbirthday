'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface JapaneseZenTemplateProps {
  card: BirthdayCard;
}

export default function JapaneseZenTemplate({ card }: JapaneseZenTemplateProps) {
  const template = getTemplate('japanese-zen');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `お誕生日おめでとう ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Subtle cherry blossom pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, #f9a8d4 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, #f9a8d4 2px, transparent 2px),
            radial-gradient(circle at 40% 80%, #f9a8d4 1px, transparent 1px),
            radial-gradient(circle at 60% 20%, #f9a8d4 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Editorial Hero - Photo Top, Text Bottom */}
        <div className="min-h-screen bg-stone-50">
          {/* Top section - Photo */}
          {allPhotos.length > 0 && (
            <div className="h-[60vh] relative">
              <Image
                src={allPhotos[0]}
                alt="Editorial photo"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent" />
            </div>
          )}
          
          {/* Bottom section - Editorial text */}
          <div className="h-[40vh] flex items-center justify-center p-8 sm:p-16 md:p-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-4xl"
            >
              <div className="border-l-4 border-rose-300 pl-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-rose-400 text-lg sm:text-xl md:text-2xl mb-6"
                  style={{ fontFamily: 'serif' }}
                >
                  お誕生日おめでとう
                </motion.p>
                
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-800 font-light leading-none mb-6"
                  style={{ fontFamily: 'serif' }}
                >
                  {card.recipient_name}
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="text-stone-500 text-base sm:text-lg md:text-xl"
                  style={{ fontFamily: 'serif' }}
                >
                  Happy Birthday
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Minimal Photo Display */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-stone-400 text-xs tracking-widest uppercase mb-4">
                  Memories
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-stone-800 font-light"
                  style={{ fontFamily: 'serif' }}
                >
                  思い出
                </h2>
              </motion.div>

              {/* Single large photo with minimal frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                <div className="aspect-[16/9] bg-stone-100 relative overflow-hidden">
                  <Image
                    src={allPhotos[0]}
                    alt="Memory"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
                {/* Minimal frame */}
                <div className="absolute inset-4 border border-stone-200 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 3: Haiku-style Message */}
        <div className="min-h-screen bg-stone-50 p-8 sm:p-16 md:p-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-3xl text-center"
          >
            {/* Decorative line */}
            <div className="w-16 h-px bg-rose-300 mx-auto mb-12" />
            
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-8">
              Message
            </p>
            
            <p 
              className="text-2xl sm:text-3xl md:text-4xl text-stone-700 leading-relaxed font-light"
              style={{ fontFamily: 'serif', lineHeight: '2' }}
            >
              {card.message}
            </p>
            
            {card.sender_name && (
              <p className="text-stone-500 text-lg mt-12" style={{ fontFamily: 'serif' }}>
                — {card.sender_name}
              </p>
            )}
            
            {/* Decorative line */}
            <div className="w-16 h-px bg-rose-300 mx-auto mt-12" />
          </motion.div>
        </div>

        {/* SECTION 4: Photo Grid - Asymmetric */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-stone-400 text-xs tracking-widest uppercase mb-4">
                  Gallery
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-stone-800 font-light"
                  style={{ fontFamily: 'serif' }}
                >
                  写真
                </h2>
              </motion.div>

              {/* Asymmetric grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {allPhotos.slice(1, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                  >
                    <div className={`${index === 0 ? 'aspect-[16/9]' : 'aspect-square'} bg-stone-100 relative overflow-hidden`}>
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Zen Garden Finale */}
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Zen garden elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Raked sand patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-stone-400" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-stone-400" />
            </div>
            
            {/* Floating cherry blossoms */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-300/30"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <div className="w-4 h-4 rounded-full" />
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
            {/* Stone lantern */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <div className="w-16 h-24 bg-stone-400 mx-auto rounded-t-full" />
              <div className="w-24 h-8 bg-stone-500 mx-auto -mt-2" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-800 font-light leading-none mb-8"
              style={{ fontFamily: 'serif' }}
            >
              お誕生日
            </h2>
            <p className="text-stone-500 text-xl sm:text-2xl md:text-3xl" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Tea Ceremony Actions */}
        <div className="min-h-screen bg-white p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            {/* Tea cup icon */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <div className="w-12 h-12 border-2 border-stone-400 rounded-full mx-auto" />
            </motion.div>
            
            <p className="text-stone-400 text-xs tracking-widest uppercase">
              Share
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-stone-800 text-white text-sm font-light rounded hover:bg-stone-700 transition-colors min-h-[48px]"
                style={{ fontFamily: 'serif' }}
              >
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 border border-stone-300 text-stone-800 text-sm font-light rounded hover:bg-stone-50 transition-colors min-h-[48px]"
                style={{ fontFamily: 'serif' }}
              >
                Save
              </motion.button>
            </div>

            <p className="text-stone-400 text-xs mt-16">
              Spectre
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="japanese-zen" />
      </div>
    </div>
  );
}
