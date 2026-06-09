'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Film } from 'lucide-react';
import Image from 'next/image';

interface VintageFilmTemplateProps {
  card: BirthdayCard;
}

export default function VintageFilmTemplate({ card }: VintageFilmTemplateProps) {
  const template = getTemplate('vintage-film');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Birthday Story - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
            linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
          `,
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/60" />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Cinema Opening - Film Title Card */}
        <div className="h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 relative">
          {/* Film strip borders */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-black flex flex-col justify-around py-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-12 h-8 border-2 border-stone-600 mx-auto rounded" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-black flex flex-col justify-around py-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-12 h-8 border-2 border-stone-600 mx-auto rounded" />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl px-20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Film className="w-16 h-16 text-amber-500 mx-auto mb-8" />
            </motion.div>
            
            <p className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-4">
              A Spectre Production
            </p>
            
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-100 font-serif leading-tight mb-6"
              style={{ textShadow: '0 0 40px rgba(0,0,0,0.8)' }}
            >
              {card.recipient_name}
            </h1>
            
            <p className="text-stone-400 text-lg tracking-widest uppercase">
              A Birthday Story
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: Vintage Photo Frame */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-4xl w-full"
            >
              {/* Vintage photo frame */}
              <div className="relative bg-stone-800 p-4 sm:p-6 md:p-8">
                {/* Inner frame */}
                <div className="border-8 border-stone-600 p-2">
                  <div className="aspect-[4/3] bg-stone-700 relative overflow-hidden">
                    <Image
                      src={allPhotos[0]}
                      alt="Vintage photo"
                      fill
                      className="object-cover sepia"
                      sizes="100vw"
                    />
                    {/* Sepia overlay */}
                    <div className="absolute inset-0 bg-amber-900/20 mix-blend-multiply" />
                  </div>
                </div>
                
                {/* Photo caption */}
                <div className="mt-4 text-center">
                  <p className="text-stone-400 text-xs tracking-widest uppercase">
                    Scene 1 - Take 1
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Timeline Message - Film Strip Style */}
        <div className="min-h-screen bg-black p-8 sm:p-12 md:p-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">
                The Story
              </p>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl text-stone-100 font-serif"
                style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
              >
                A Birthday Narrative
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-amber-500/30" />
              
              {/* Timeline items */}
              <div className="space-y-12">
                {/* Scene 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-6 top-0 w-5 h-5 bg-amber-500 rounded-full border-4 border-stone-900" />
                  <div className="bg-stone-800 p-6 border border-amber-500/30">
                    <p className="text-amber-500 text-xs tracking-widest uppercase mb-2">
                      Scene 1
                    </p>
                    <p className="text-stone-100 text-lg leading-relaxed font-serif">
                      Dear {card.recipient_name},
                    </p>
                  </div>
                </motion.div>

                {/* Scene 2 - Message */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-6 top-0 w-5 h-5 bg-amber-500 rounded-full border-4 border-stone-900" />
                  <div className="bg-stone-800 p-6 border border-amber-500/30">
                    <p className="text-amber-500 text-xs tracking-widest uppercase mb-2">
                      Scene 2
                    </p>
                    <p 
                      className="text-stone-100 text-lg leading-relaxed font-serif"
                      style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                    >
                      {card.message}
                    </p>
                  </div>
                </motion.div>

                {/* Scene 3 - Sender */}
                {card.sender_name && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-6 top-0 w-5 h-5 bg-amber-500 rounded-full border-4 border-stone-900" />
                    <div className="bg-stone-800 p-6 border border-amber-500/30">
                      <p className="text-amber-500 text-xs tracking-widest uppercase mb-2">
                        Scene 3
                      </p>
                      <p className="text-stone-100 text-lg font-serif">
                        — {card.sender_name}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Film Strip Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-stone-900 p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">
                  The Reel
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-stone-100 font-serif"
                  style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
                >
                  Memories
                </h2>
              </motion.div>

              {/* Film strip layout */}
              <div className="flex flex-col gap-4">
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="flex items-center gap-4"
                  >
                    {/* Film sprocket holes */}
                    <div className="flex flex-col gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-4 h-6 border-2 border-stone-600 rounded" />
                      ))}
                    </div>
                    
                    {/* Photo frame */}
                    <div className="flex-1 bg-stone-800 p-2">
                      <div className="aspect-[16/9] bg-stone-700 relative overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Frame ${index + 1}`}
                          fill
                          className="object-cover sepia"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-amber-900/15 mix-blend-multiply" />
                      </div>
                    </div>
                    
                    {/* Film sprocket holes */}
                    <div className="flex flex-col gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-4 h-6 border-2 border-stone-600 rounded" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: End Card */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-4xl"
          >
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-8">
              The End
            </p>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-stone-100 font-serif leading-tight mb-8"
              style={{ textShadow: '0 0 40px rgba(0,0,0,0.8)' }}
            >
              Happy Birthday
            </h2>
            
            <p className="text-stone-400 text-2xl font-serif">
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Vintage Actions */}
        <div className="min-h-screen bg-stone-900 p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase">
              Credits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-stone-800 text-stone-100 text-sm font-serif border border-stone-600 hover:bg-stone-700 transition-colors min-h-[48px]"
              >
                Share
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 bg-stone-800 text-stone-100 text-sm font-serif border border-stone-600 hover:bg-stone-700 transition-colors min-h-[48px]"
              >
                Save
              </motion.button>
            </div>

            <p className="text-stone-500 text-xs mt-16 font-serif">
              A Spectre Production © 2024
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="vintage-film" />
      </div>
    </div>
  );
}
