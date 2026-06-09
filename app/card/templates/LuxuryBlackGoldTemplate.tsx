'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Diamond } from 'lucide-react';
import Image from 'next/image';

interface LuxuryBlackGoldTemplateProps {
  card: BirthdayCard;
}

export default function LuxuryBlackGoldTemplate({ card }: LuxuryBlackGoldTemplateProps) {
  const template = getTemplate('luxury-black-gold');
  const [showConfetti, setShowConfetti] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setCurtainOpen(true), 500);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `VIP Invitation - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Diamond sparkle effects */}
      <div className="fixed inset-0 pointer-events-none">
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
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Diamond className="w-3 h-3 text-amber-400" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Velvet Curtain Reveal */}
        <div className="h-screen relative overflow-hidden">
          {/* Left curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: curtainOpen ? '-100%' : 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#1a0a0a] to-[#2d1515]"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }}
          >
            {/* Curtain folds */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/40 to-transparent"
                  style={{ left: `${i * 12}%` }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Right curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: curtainOpen ? '100%' : 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#1a0a0a] to-[#2d1515]"
            style={{
              backgroundImage: 'repeating-linear-gradient(-90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }}
          >
            {/* Curtain folds */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/40 to-transparent"
                  style={{ right: `${i * 12}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Reveal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: curtainOpen ? 1 : 0, scale: curtainOpen ? 1 : 0.9 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="h-screen flex items-center justify-center p-8 sm:p-16 md:p-24"
          >
            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mb-8"
              >
                <Diamond className="w-20 h-20 text-amber-400 mx-auto" />
              </motion.div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #fff 0%, #ffd700 50%, #fff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'serif'
                }}
              >
                {card.recipient_name}
              </motion.h1>
              
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.4 }}
                className="text-amber-400 text-xl tracking-[0.4em] uppercase"
                style={{ fontFamily: 'serif' }}
              >
                Private Club
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Diamond Frame Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  The Diamond Collection
                </p>
                <h2 className="text-3xl sm:text-4xl text-white" style={{ fontFamily: 'serif' }}>
                  Exclusive Moments
                </h2>
              </motion.div>

              {/* Diamond-shaped frames */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateY: 90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Diamond frame */}
                    <div className="relative aspect-square">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-black rotate-45 p-4">
                        <div className="relative w-full h-full bg-black rotate-45 overflow-hidden">
                          <Image
                            src={photo}
                            alt={`Diamond ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                        </div>
                      </div>
                      
                      {/* Diamond accent */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Diamond className="w-8 h-8 text-amber-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Premium Gold Card */}
        <div className="min-h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24">
          <motion.div
            initial={{ opacity: 0, rotateX: 45 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl w-full"
            style={{ perspective: '1000px' }}
          >
            {/* Premium gold card */}
            <div className="relative bg-gradient-to-br from-amber-600 via-amber-400 to-amber-600 p-1 shadow-2xl">
              <div className="bg-black p-8 sm:p-12 md:p-16 relative">
                {/* Gold border */}
                <div className="absolute inset-4 border-2 border-amber-500/30 pointer-events-none" />
                
                {/* Diamond corners */}
                <div className="absolute top-4 left-4">
                  <Diamond className="w-6 h-6 text-amber-400" />
                </div>
                <div className="absolute top-4 right-4">
                  <Diamond className="w-6 h-6 text-amber-400" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Diamond className="w-6 h-6 text-amber-400" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Diamond className="w-6 h-6 text-amber-400" />
                </div>
                
                <div className="text-center space-y-8 relative z-10">
                  <p className="text-amber-400 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'serif' }}>
                    Private Message
                  </p>
                  
                  <p 
                    className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed"
                    style={{ fontFamily: 'serif', lineHeight: '2' }}
                  >
                    {card.message}
                  </p>
                  
                  {card.sender_name && (
                    <p className="text-amber-400 text-xl" style={{ fontFamily: 'serif' }}>
                      — {card.sender_name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Luxury Carousel */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <p className="text-amber-400 text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  VIP Lounge
                </p>
                <h2 className="text-3xl sm:text-4xl text-white" style={{ fontFamily: 'serif' }}>
                  Premium Collection
                </h2>
              </motion.div>

              {/* Featured photo with luxury frame */}
              <div className="relative aspect-[21/9] mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={allPhotos[1]}
                    alt="Featured"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                  
                  {/* Gold frame */}
                  <div className="absolute inset-4 border-4 border-amber-500/30" />
                </motion.div>
              </div>

              {/* Secondary photos in luxury row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allPhotos.slice(2, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative aspect-square"
                  >
                    <div className="relative w-full h-full border-2 border-amber-500/20">
                      <Image
                        src={photo}
                        alt={`Luxury ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Diamond className="w-4 h-4 text-amber-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Hotel Lobby Finale */}
        <div className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
          {/* Chandelier effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-0.5 h-40 bg-gradient-to-b from-amber-400/50 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <Diamond className="w-28 h-28 text-amber-400 mx-auto" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-8"
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #ffd700 50%, #fff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'serif'
              }}
            >
              The Royal Suite
            </h2>
            
            <p className="text-amber-400 text-2xl tracking-[0.3em] uppercase" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: VIP Departure Hall */}
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Chandelier effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-0.5 h-40 bg-gradient-to-b from-amber-400/50 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-2xl relative z-10"
          >
            <p className="text-amber-400 text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'serif' }}>
              VIP Departure Hall
            </p>

            {/* Departure card */}
            <div className="bg-gradient-to-br from-amber-900/20 to-black p-8 border border-amber-500/30">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <Diamond className="w-16 h-16 text-amber-400 mx-auto" />
              </motion.div>

              <p className="text-amber-400 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'serif' }}>
                Thank you for visiting
              </p>

              <h2 className="text-3xl sm:text-4xl text-white font-light mb-8" style={{ fontFamily: 'serif' }}>
                {card.recipient_name}
              </h2>

              <p className="text-amber-500/60 text-xs tracking-widest uppercase mb-8" style={{ fontFamily: 'serif' }}>
                VIP MEMBER • MMXXIV
              </p>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="px-10 py-5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-black text-sm font-bold uppercase tracking-widest hover:from-amber-500 hover:via-amber-300 hover:to-amber-500 transition-all min-h-[56px]"
                  style={{ fontFamily: 'serif' }}
                >
                  Share Experience
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 215, 0, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 border-2 border-amber-500 text-amber-400 text-sm font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-all min-h-[56px]"
                  style={{ fontFamily: 'serif' }}
                >
                  Save Memory
                </motion.button>
              </div>
            </div>

            <p className="text-amber-500/40 text-xs mt-8 uppercase tracking-widest" style={{ fontFamily: 'serif' }}>
              Spectre Private Club • Members Only
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="luxury-black-gold" />
      </div>
    </div>
  );
}
