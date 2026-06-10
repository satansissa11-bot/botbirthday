'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Diamond, Crown, Sparkles } from 'lucide-react';
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
      {/* Enhanced diamond sparkle effects with trails */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 180, 360, 540],
              y: [0, -50, -100, -150],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Diamond className="w-2 h-2 text-amber-400" />
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

        {/* SECTION 2: Diamond Showcase - Rotating 3D Diamond Display */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  Diamond Showcase
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-light" style={{ fontFamily: 'serif' }}>
                  The Royal Collection
                </h2>
              </motion.div>

              {/* Rotating diamond carousel */}
              <div className="relative h-[600px] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="relative w-full h-full"
                  style={{ perspective: '2000px' }}
                >
                  {allPhotos.slice(0, 6).map((photo, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotateY(${index * 60}deg) translateZ(280px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <div className="relative w-64 h-64 -translate-x-1/2 -translate-y-1/2">
                        {/* Diamond frame */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-black rotate-45 p-3">
                          <div className="relative w-full h-full bg-black rotate-45 overflow-hidden border-2 border-amber-500/30">
                            <Image
                              src={photo}
                              alt={`Diamond ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="256px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                          </div>
                        </div>
                        
                        {/* Floating diamond accent */}
                        <motion.div
                          animate={{ 
                            y: [0, -10, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <Diamond className="w-10 h-10 text-amber-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* VIP badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center mt-12"
              >
                <div className="inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-8 py-3">
                  <p className="text-black text-xs tracking-[0.4em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
                    VIP Exclusive
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 3: VIP Lounge - Exclusive Photo Gallery with Spotlight Effects */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                  VIP Lounge
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-light" style={{ fontFamily: 'serif' }}>
                  Exclusive Gallery
                </h2>
              </motion.div>

              {/* VIP photo gallery with spotlight effects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Spotlight effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative aspect-[4/5] overflow-hidden border-2 border-amber-500/30">
                      <Image
                        src={photo}
                        alt={`VIP ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* VIP badge overlay */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-3 py-1">
                          <p className="text-black text-[10px] tracking-[0.2em] uppercase font-bold" style={{ fontFamily: 'serif' }}>
                            VIP
                          </p>
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'serif' }}>
                          Exclusive Shot {index + 1}
                        </p>
                        <p className="text-white text-sm font-light" style={{ fontFamily: 'serif' }}>
                          {card.recipient_name}&apos;s Collection
                        </p>
                      </div>
                    </div>

                    {/* Floating diamond accent */}
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 90, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute -bottom-4 -right-4"
                    >
                      <Diamond className="w-6 h-6 text-amber-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: VIP List Message */}
        <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* VIP list background effect */}
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
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <Diamond className="w-2 h-2 text-amber-400" />
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-16 text-center"
            >
              <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4" style={{ fontFamily: 'serif' }}>
                ★ VIP GUEST LIST ★
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-light" style={{ fontFamily: 'serif' }}>
                Exclusive Invitation
              </h2>
            </motion.div>

            {/* VIP list cards */}
            <div className="space-y-6">
              {/* Main message card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-amber-900/30 to-black border-l-4 border-amber-500 p-8 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-amber-400 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'serif' }}>
                      VIP MESSAGE
                    </p>
                    <p className="text-white text-xl leading-relaxed" style={{ fontFamily: 'serif', lineHeight: '1.8' }}>
                      {card.message}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sender card */}
              {card.sender_name && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-gradient-to-l from-amber-900/20 to-black border-r-4 border-amber-500 p-8 relative"
                >
                  <div className="flex items-start gap-4 justify-end">
                    <div className="flex-1 text-right">
                      <p className="text-amber-400 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'serif' }}>
                        HOSTED BY
                      </p>
                      <p className="text-white text-2xl font-light" style={{ fontFamily: 'serif' }}>
                        {card.sender_name}
                      </p>
                      <p className="text-amber-400/60 text-sm mt-2" style={{ fontFamily: 'serif' }}>
                        VIP Member
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Diamond className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Recipient card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-black border border-amber-500/30 p-8 relative"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 text-xs tracking-widest uppercase mb-2" style={{ fontFamily: 'serif' }}>
                      HONORED GUEST
                    </p>
                    <p className="text-white text-3xl font-light" style={{ fontFamily: 'serif' }}>
                      {card.recipient_name}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-amber-400" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* VIP badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="inline-block bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 px-8 py-3">
                <p className="text-black text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                  ★ VIP ACCESS GRANTED ★
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 5: Royal Suite Finale - Hotel Lobby with Enhanced Chandelier */}
        <div className="h-screen bg-black flex items-center justify-center relative overflow-hidden">
          {/* Enhanced chandelier effect with multiple layers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {/* Outer ring */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={`outer-${i}`}
                  className="absolute top-0 left-1/2 w-0.5 h-48 bg-gradient-to-b from-amber-400/60 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 22.5}deg)`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleY: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
              {/* Inner ring */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`inner-${i}`}
                  className="absolute top-0 left-1/2 w-0.5 h-32 bg-gradient-to-b from-amber-500/80 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    opacity: [0.4, 0.9, 0.4],
                    scaleY: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Floating diamonds */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  y: [0, -80, -160],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 6,
                }}
              >
                <Diamond className="w-4 h-4 text-amber-400" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <Diamond className="w-32 h-32 text-amber-400 mx-auto" />
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

        {/* SECTION 6: VIP Departure Hall - Premium Actions */}
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Subtle chandelier effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-0.5 h-32 bg-gradient-to-b from-amber-400/30 to-transparent origin-top"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
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
            className="text-center space-y-12 max-w-2xl relative z-10"
          >
            <p className="text-amber-400 text-xs tracking-[0.5em] uppercase" style={{ fontFamily: 'serif' }}>
              VIP Departure Hall
            </p>

            {/* VIP membership card */}
            <div className="bg-gradient-to-br from-amber-900/30 to-black p-8 border-2 border-amber-500/40">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-8"
              >
                <Diamond className="w-20 h-20 text-amber-400 mx-auto" />
              </motion.div>

              <p className="text-amber-400 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'serif' }}>
                Thank You for Visiting
              </p>

              <h2 className="text-4xl sm:text-5xl text-white font-light mb-6" style={{ fontFamily: 'serif' }}>
                {card.recipient_name}
              </h2>

              <p className="text-amber-500/60 text-xs tracking-widest uppercase mb-8" style={{ fontFamily: 'serif' }}>
                VIP MEMBER • MMXXIV
              </p>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="px-12 py-6 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-black text-sm font-bold uppercase tracking-widest hover:from-amber-500 hover:via-amber-300 hover:to-amber-500 transition-all min-h-[60px]"
                  style={{ fontFamily: 'serif' }}
                >
                  Share Experience
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-6 border-2 border-amber-500 text-amber-400 text-sm font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-all min-h-[60px]"
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
