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
        {/* SECTION 1: Dramatic Cinema Opening */}
        <div className="h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Film strip borders */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-black flex flex-col justify-around py-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-16 h-10 border-2 border-stone-600 mx-auto rounded" />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-black flex flex-col justify-around py-4">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-16 h-10 border-2 border-stone-600 mx-auto rounded" />
            ))}
          </div>

          {/* Film projector light effect */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl px-20 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              <Film className="w-20 h-20 text-amber-500 mx-auto mb-10" />
            </motion.div>
            
            <p className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-4 font-bold">
              ★ A SPECTRE PRODUCTION ★
            </p>
            
            <motion.h1
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-100 font-serif leading-tight mb-6"
              style={{ textShadow: '0 0 60px rgba(0,0,0,0.9)' }}
            >
              {card.recipient_name}
            </motion.h1>
            
            <p className="text-stone-400 text-xl tracking-widest uppercase font-bold">
              A BIRTHDAY STORY
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: Enhanced Vintage Photo Frame */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24 flex items-center justify-center relative overflow-hidden">
            {/* Film grain effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
                  linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
                `,
                backgroundSize: '4px 4px'
              }} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-4xl w-full relative z-10"
            >
              {/* Enhanced vintage photo frame */}
              <div className="relative bg-stone-800 p-6 sm:p-8 md:p-10 border-4 border-stone-700 shadow-2xl">
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-4 border-amber-500 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-4 border-amber-500 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-amber-500 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-4 border-amber-500 rounded-br-lg" />
                
                {/* Inner frame */}
                <div className="border-12 border-stone-600 p-3">
                  <div className="aspect-[4/3] bg-stone-700 relative overflow-hidden">
                    <Image
                      src={allPhotos[0]}
                      alt="Vintage photo"
                      fill
                      className="object-cover sepia"
                      sizes="100vw"
                    />
                    {/* Enhanced sepia overlay */}
                    <div className="absolute inset-0 bg-amber-900/30 mix-blend-multiply" />
                  </div>
                </div>
                
                {/* Enhanced photo caption */}
                <div className="mt-6 text-center">
                  <p className="text-amber-500 text-sm tracking-widest uppercase font-bold">
                    ★ SCENE 1 - TAKE 1 ★
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Enhanced Timeline Message */}
        <div className="min-h-screen bg-black p-8 sm:p-12 md:p-24 relative overflow-hidden">
          {/* Film grain effect */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
                linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16"
            >
              <p className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                ★ THE STORY ★
              </p>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl text-stone-100 font-serif"
                style={{ textShadow: '0 0 30px rgba(0,0,0,0.9)' }}
              >
                A Birthday Narrative
              </h2>
            </motion.div>

            {/* Enhanced timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-10 top-0 bottom-0 w-2 bg-amber-500/40" />
              
              {/* Timeline items */}
              <div className="space-y-16">
                {/* Scene 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-24"
                >
                  <div className="absolute left-7 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-stone-900 shadow-lg" />
                  <div className="bg-stone-800 p-8 border-2 border-amber-500/40 shadow-xl">
                    <p className="text-amber-500 text-sm tracking-widest uppercase mb-3 font-bold">
                      SCENE 1
                    </p>
                    <p className="text-stone-100 text-xl leading-relaxed font-serif">
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
                  className="relative pl-24"
                >
                  <div className="absolute left-7 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-stone-900 shadow-lg" />
                  <div className="bg-stone-800 p-8 border-2 border-amber-500/40 shadow-xl">
                    <p className="text-amber-500 text-sm tracking-widest uppercase mb-3 font-bold">
                      SCENE 2
                    </p>
                    <p 
                      className="text-stone-100 text-xl leading-relaxed font-serif"
                      style={{ textShadow: '0 0 15px rgba(0,0,0,0.6)' }}
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
                    className="relative pl-24"
                  >
                    <div className="absolute left-7 top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-stone-900 shadow-lg" />
                    <div className="bg-stone-800 p-8 border-2 border-amber-500/40 shadow-xl">
                      <p className="text-amber-500 text-sm tracking-widest uppercase mb-3 font-bold">
                        SCENE 3
                      </p>
                      <p className="text-stone-100 text-xl font-serif">
                        — {card.sender_name}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Enhanced Film Strip Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-stone-900 p-8 sm:p-16 md:p-24 relative overflow-hidden">
            {/* Film grain effect */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
                  linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
                `,
                backgroundSize: '4px 4px'
              }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-4 font-bold">
                  ★ THE REEL ★
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl text-stone-100 font-serif"
                  style={{ textShadow: '0 0 30px rgba(0,0,0,0.9)' }}
                >
                  Memories
                </h2>
              </motion.div>

              {/* Enhanced film strip layout */}
              <div className="flex flex-col gap-6">
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50, rotate: -2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-6"
                  >
                    {/* Enhanced film sprocket holes */}
                    <div className="flex flex-col gap-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-8 border-2 border-stone-600 rounded" />
                      ))}
                    </div>
                    
                    {/* Enhanced photo frame */}
                    <div className="flex-1 bg-stone-800 p-3 border-2 border-stone-700 shadow-xl">
                      <div className="aspect-[16/9] bg-stone-700 relative overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Frame ${index + 1}`}
                          fill
                          className="object-cover sepia"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-amber-900/20 mix-blend-multiply" />
                      </div>
                    </div>
                    
                    {/* Enhanced film sprocket holes */}
                    <div className="flex flex-col gap-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-8 border-2 border-stone-600 rounded" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Dramatic End Card */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Film projector light effect */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-4xl relative z-10"
          >
            <p className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-8 font-bold">
              ★ THE END ★
            </p>
            
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-stone-100 font-serif leading-tight mb-8"
              style={{ textShadow: '0 0 60px rgba(0,0,0,0.9)' }}
            >
              Happy Birthday
            </motion.h2>
            
            <p className="text-stone-400 text-3xl font-serif font-bold">
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Enhanced Vintage Actions */}
        <div className="min-h-screen bg-stone-900 p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Film grain effect */}
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
                linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl relative z-10"
          >
            <p className="text-amber-500 text-sm tracking-[0.3em] uppercase font-bold">
              ★ CREDITS ★
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-10 py-6 bg-stone-800 text-stone-100 text-lg font-serif border-4 border-stone-600 hover:bg-stone-700 transition-all min-h-[60px] shadow-xl"
              >
                SHARE
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-6 bg-stone-800 text-stone-100 text-lg font-serif border-4 border-stone-600 hover:bg-stone-700 transition-all min-h-[60px] shadow-xl"
              >
                SAVE
              </motion.button>
            </div>

            <p className="text-stone-500 text-sm mt-16 font-serif font-bold tracking-wider">
              A SPECTRE PRODUCTION © 2024
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="vintage-film" />
      </div>
    </div>
  );
}
