'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Cpu, Zap } from 'lucide-react';
import Image from 'next/image';

interface CyberpunkTemplateProps {
  card: BirthdayCard;
}

export default function CyberpunkTemplate({ card }: CyberpunkTemplateProps) {
  const template = getTemplate('cyberpunk');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name} // SYSTEM OVERRIDE`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced scanline effect with multiple layers */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-2 animate-scanline" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-magenta-500/10 to-transparent h-1 animate-scanline" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Hexagonal grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 60px 60px, 60px 60px'
        }} />
      </div>

      {/* Dynamic neon glow effects */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="fixed bottom-0 right-0 w-96 h-96 bg-magenta-500 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-3xl" 
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Digital Corruption Glitch Reveal */}
        <div className="h-screen flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative overflow-hidden">
          {/* Glitch overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-cyan-400/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 50}px`,
                  height: '2px',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  scaleX: [1, Math.random() * 2 + 1, 1],
                }}
                transition={{
                  duration: 0.2 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Decorative UI elements */}
          <div className="absolute top-8 left-8 text-cyan-400 text-xs font-mono">
            <div className="border border-cyan-400/50 px-3 py-1">
              SYS.2077
            </div>
          </div>
          <div className="absolute top-8 right-8 text-magenta-400 text-xs font-mono">
            <div className="border border-magenta-400/50 px-3 py-1">
              NEURAL.LINK
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl relative z-10"
          >
            {/* Glitch text effect */}
            <motion.p
              className="text-cyan-400 text-sm sm:text-base md:text-lg mb-4 font-mono tracking-widest"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* // SYSTEM CORRUPTION DETECTED */}
            </motion.p>
            
            <motion.h1 
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-white leading-none tracking-tighter mb-4"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)',
                  '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.6)',
                  '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)',
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ 
                fontFamily: 'var(--font-inter)',
              }}
            >
              {card.recipient_name}
            </motion.h1>
            
            <motion.p
              className="text-magenta-400 text-xl sm:text-2xl md:text-3xl font-mono"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                x: [0, -5, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              HAPPY BIRTHDAY // OVERRIDE
            </motion.p>
          </motion.div>

          {/* Animated circuit lines */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between">
            <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
            <div className="w-24 h-px bg-gradient-to-l from-magenta-400 to-transparent" />
          </div>
        </div>

        {/* SECTION 2: Floating Holographic Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black/50 p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-cyan-400 text-xs font-mono mb-2">
                  {/* // HOLOGRAPHIC DATA STREAM */}
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl text-white font-black"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  VISUAL RECORDS
                </h2>
              </motion.div>

              {/* Floating holographic display */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: 45 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="relative group"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Holographic projection effect */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotateY: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      className="relative overflow-hidden border-2 border-cyan-400/50 bg-black/50"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={photo}
                          alt={`Record ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw" unoptimized
                        />
                        {/* Holographic scanlines */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-magenta-500/30 to-transparent" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_4px]" />
                      </div>
                      
                      {/* Tech overlay */}
                      <div className="absolute top-2 left-2 text-cyan-400 text-xs font-mono bg-black/50 px-2 py-1">
                        REC.{String(index + 1).padStart(3, '0')}
                      </div>
                      <div className="absolute bottom-2 right-2 text-magenta-400 text-xs font-mono bg-black/50 px-2 py-1">
                        {Math.random() > 0.5 ? 'ENCRYPTED' : 'DECRYPTED'}
                      </div>
                    </motion.div>
                    
                    {/* Holographic glow */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 via-transparent to-magenta-500/20 blur-xl -z-10"
                    />

                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-magenta-400" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-magenta-400" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Neural Network Data Stream */}
        <div className="min-h-screen bg-black flex">
          {/* Left sidebar - Neural network visualization */}
          <div className="w-1/3 bg-black/80 border-r border-cyan-400/30 p-8 flex flex-col relative overflow-hidden">
            {/* Neural network nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <div className="w-full h-full bg-cyan-400" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 relative z-10"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-magenta-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>

              <div className="font-mono space-y-4 text-sm">
                <p className="text-cyan-400">
                  {'>'} NEURAL STATUS
                </p>
                <p className="text-green-400">
                  CONNECTED
                </p>
                <p className="text-cyan-400 mt-4">
                  {'>'} DATA STREAM
                </p>
                <p className="text-white/60">
                  ACTIVE
                </p>
                <p className="text-cyan-400 mt-4">
                  {'>'} PROTOCOL
                </p>
                <p className="text-white/60">
                  V3.0.77
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-magenta-400 text-xs font-mono">
                  {'>'} TRANSMITTER
                </p>
                <p className="text-white text-sm font-mono mt-2">
                  {card.sender_name || 'UNKNOWN'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Message content with data stream */}
          <div className="w-2/3 p-8 sm:p-12 md:p-16 flex items-center relative overflow-hidden">
            {/* Data stream background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cyan-500/20 text-xs font-mono"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-50, 50],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl relative z-10"
            >
              <div className="font-mono space-y-6">
                <p className="text-cyan-400 text-sm">
                  {'>'} INITIALIZING NEURAL LINK...
                </p>
                <p className="text-cyan-400 text-sm">
                  {'>'} DECRYPTING DATA STREAM...
                </p>
                <p className="text-green-400 text-sm">
                  {'>'} CONNECTION ESTABLISHED
                </p>
                
                <div className="mt-8 border-l-2 border-cyan-400 pl-6">
                  <p className="text-magenta-400 text-sm mb-4">
                    {'>'} TRANSMISSION DATA
                  </p>
                  <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed">
                    {card.message}
                  </p>
                </div>

                <p className="text-cyan-400 text-sm mt-8">
                  {'>'} END OF TRANSMISSION
                </p>

                {/* Animated cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-3 h-6 bg-cyan-400"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 4: Cyberpunk Cityscape - Neon-Lit Urban Photos */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen p-8 sm:p-16 md:p-24 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-cyan-400 text-xs font-mono mb-2">
                  {/* // NEON CITYSCAPE */}
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl text-white font-black"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  URBAN RECORDS
                </h2>
              </motion.div>

              {/* Neon-lit photo display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Neon border glow */}
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(0, 255, 255, 0.3)',
                          '0 0 40px rgba(255, 0, 255, 0.3)',
                          '0 0 20px rgba(0, 255, 255, 0.3)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className="relative overflow-hidden border-2 border-cyan-400/50 bg-black/50"
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={photo}
                          alt={`Urban ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw" unoptimized
                        />
                        {/* Neon overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/40 via-transparent to-magenta-500/40" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_2px]" />
                      </div>
                      
                      {/* Neon corner lights */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-magenta-400" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-magenta-400" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400" />
                    </motion.div>

                    {/* Location tag */}
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 border border-cyan-400/50">
                      <p className="text-cyan-400 text-xs font-mono">
                        SECTOR {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Matrix Digital Rain Finale */}
        <div className="h-screen bg-black p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Matrix digital rain effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500/30 text-xs font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                }}
                animate={{
                  y: [0, window.innerHeight + 100],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear'
                }}
              >
                {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-8 max-w-3xl relative z-10"
          >
            {/* System override progress */}
            <div className="space-y-4">
              <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase">
                {/* // SYSTEM OVERRIDE INITIATED */}
              </p>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 3 }}
                  className="h-full bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400"
                />
              </div>
              
              <p className="text-green-400 text-xs font-mono">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  █
                </motion.span>
                OVERRIDING SYSTEM...
              </p>
            </div>

            {/* Override sequence */}
            <div className="space-y-2 text-left font-mono text-xs text-gray-500">
              {[
                '> BYPASSING FIREWALLS...',
                '> INJECTING CODE...',
                '> CORRUPTING DATABASE...',
                '> SYSTEM OVERRIDDEN...',
              ].map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 3 + index * 0.5 }}
                  className={index < 3 ? 'text-gray-500' : 'text-green-400'}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Final override message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 5 }}
              className="pt-8 border-t border-gray-800"
            >
              <p className="text-magenta-400 text-sm font-mono mb-4">
                SYSTEM OVERRIDE COMPLETE
              </p>
              
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 255, 255, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="px-12 py-6 bg-gradient-to-r from-cyan-600 via-magenta-500 to-cyan-600 text-white text-sm font-mono font-bold uppercase tracking-widest hover:from-cyan-500 hover:via-magenta-400 hover:to-cyan-500 transition-all min-h-[60px]"
                >
                  SHARE_DATA
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 0, 255, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-6 border-2 border-magenta-500 text-magenta-400 text-sm font-mono font-bold uppercase tracking-widest hover:bg-magenta-500/10 transition-all min-h-[60px]"
                >
                  SAVE_RECORD
                </motion.button>
              </div>

              <p className="text-gray-500 text-xs font-mono mt-8 uppercase tracking-widest">
                SPECTRE_CORP © 2077 // SYSTEM OVERRIDDEN
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="cyberpunk" />
      </div>

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
