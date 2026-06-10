'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface GalaxyTemplateProps {
  card: BirthdayCard;
}

export default function GalaxyTemplate({ card }: GalaxyTemplateProps) {
  const template = getTemplate('galaxy');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Cosmic Birthday - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced starfield with shooting stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              width: '100px',
              height: '2px',
            }}
            animate={{
              x: [0, 500],
              y: [0, 300],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Dynamic nebula effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Rocket Launch Countdown */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl relative z-10"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-purple-300 text-xs tracking-[0.5em] uppercase mb-8"
            >
              Mission Launch
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-8"
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'sans-serif',
                letterSpacing: '-0.05em'
              }}
            >
              {card.recipient_name.toUpperCase()}
            </motion.h1>

            {/* Countdown sequence */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl sm:text-9xl md:text-[10rem] font-black text-purple-400"
                style={{ fontFamily: 'monospace' }}
              >
                T-MINUS 5
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-blue-300 text-lg tracking-widest uppercase"
            >
              Destination: The Stars
            </motion.p>
          </motion.div>

          {/* Rocket trail effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-gradient-to-t from-orange-500 via-red-500 to-transparent blur-2xl opacity-50" />
        </div>

        {/* SECTION 2: Planet Discovery - Orbital Photo Display */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-purple-300 text-xs tracking-[0.5em] uppercase mb-4">
                  Planet Discovery
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl text-white font-light"
                  style={{ 
                    background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Orbital Gallery
                </h2>
              </motion.div>

              {/* Orbital photo display */}
              <div className="relative h-[600px] flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
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
                        transform: `rotateY(${index * 60}deg) translateZ(240px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <div className="relative w-56 h-56 -translate-x-1/2 -translate-y-1/2">
                        {/* Planet frame */}
                        <div className="absolute inset-0 rounded-full border-4 border-purple-500/40 p-2">
                          <div className="relative w-full h-full rounded-full border-2 border-blue-500/30 overflow-hidden">
                            <Image
                              src={photo}
                              alt={`Planet ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="224px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent rounded-full" />
                          </div>
                        </div>
                        
                        {/* Planet ring */}
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-60 h-2 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent rounded-full"
                        />
                        
                        {/* Star accent */}
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                        >
                          <Star className="w-6 h-6 text-purple-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Discovery badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center mt-12"
              >
                <div className="inline-block bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 px-8 py-3">
                  <p className="text-white text-xs tracking-[0.4em] uppercase font-bold">
                    New Planets Discovered
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* SECTION 3: Alien Transmission - Decoded Message */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-16 md:p-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center relative"
          >
            {/* Signal wave visualization */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-blue-500/20 rounded-full"
                  style={{
                    width: `${200 + i * 80}px`,
                    height: `${200 + i * 80}px`,
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </div>
            
            <div className="relative z-10 p-12 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-purple-300 text-xs tracking-[0.5em] uppercase mb-2"
                style={{ fontFamily: 'monospace' }}
              >
                INCOMING TRANSMISSION
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-blue-400 text-xs tracking-widest uppercase mb-8"
                style={{ fontFamily: 'monospace' }}
              >
                DECODING...
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed font-light"
                style={{ lineHeight: '2', fontFamily: 'monospace' }}
              >
                {card.message}
              </motion.p>
              
              {card.sender_name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-12 pt-8 border-t border-purple-500/30"
                >
                  <p className="text-purple-300 text-xs tracking-[0.4em] uppercase mb-2" style={{ fontFamily: 'monospace' }}>
                    TRANSMITTED BY
                  </p>
                  <p className="text-blue-300 text-lg" style={{ fontFamily: 'monospace' }}>
                    {card.sender_name}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Cosmic Cloud Gallery - Nebula Photo Display */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-blue-300 text-xs tracking-[0.5em] uppercase mb-4">
                  Deep Space
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl text-white font-light"
                  style={{ 
                    background: 'linear-gradient(135deg, #fff 0%, #3b82f6 50%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Nebula Gallery
                </h2>
              </motion.div>

              {/* Cosmic cloud photo arrangement */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(1, 7).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Nebula cloud effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-blue-600/30 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                    
                    <div className="relative aspect-square rounded-full overflow-hidden border-2 border-purple-500/30 p-2">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Nebula ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-blue-900/30 rounded-full" />
                      </div>
                    </div>

                    {/* Floating star */}
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute -top-3 -right-3"
                    >
                      <Star className="w-6 h-6 text-purple-400" />
                    </motion.div>

                    {/* Constellation lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100">
                        <motion.line
                          x1="20" y1="20" x2="50" y2="50"
                          stroke="url(#gradient)"
                          strokeWidth="0.5"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.line
                          x1="80" y1="20" x2="50" y2="50"
                          stroke="url(#gradient)"
                          strokeWidth="0.5"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.line
                          x1="50" y1="50" x2="50" y2="80"
                          stroke="url(#gradient)"
                          strokeWidth="0.5"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Black Hole Warp Finale */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Black hole effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Event horizon */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-96 h-96 bg-gradient-to-br from-purple-900 via-black to-blue-900 rounded-full blur-3xl"
            />
            
            {/* Accretion disk */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[500px] h-[500px] border-4 border-purple-500/30 rounded-full"
              style={{
                boxShadow: '0 0 100px rgba(168, 85, 247, 0.3)'
              }}
            />
            
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[400px] h-[400px] border-2 border-blue-500/40 rounded-full"
            />
          </div>

          {/* Matter being pulled in */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                }}
                animate={{
                  scale: [1, 0],
                  opacity: [1, 0],
                  x: [0, (50 - Math.random() * 100) * 10],
                  y: [0, (50 - Math.random() * 100) * 10],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
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
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative w-40 h-40 mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full blur-2xl" />
              <div className="absolute inset-4 bg-black rounded-full" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-black leading-none mb-8"
              style={{ 
                background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'sans-serif',
                letterSpacing: '-0.05em',
              }}
            >
              EVENT HORIZON
            </h2>
            
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-purple-300 text-2xl font-bold tracking-widest"
            >
              CROSSING
            </motion.p>
          </motion.div>
        </div>

        {/* SECTION 6: Mission Control Actions */}
        <div className="min-h-screen p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-purple-300 text-xs tracking-[0.5em] uppercase">
              Mission Control
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white text-sm font-bold uppercase tracking-widest hover:from-purple-500 hover:via-blue-400 hover:to-purple-500 transition-all min-h-[60px]"
                style={{ fontFamily: 'monospace' }}
              >
                Transmit Signal
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-6 border-2 border-purple-500 text-purple-300 text-sm font-bold uppercase tracking-widest hover:bg-purple-500/10 transition-all min-h-[60px]"
                style={{ fontFamily: 'monospace' }}
              >
                Save Coordinates
              </motion.button>
            </div>

            <p className="text-purple-400/60 text-xs mt-16 uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>
              Spectre Space Agency • Mission Complete
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="galaxy" />
      </div>
    </div>
  );
}
