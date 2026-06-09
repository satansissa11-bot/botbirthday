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
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-2 animate-scanline" />
      </div>
      
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Neon glow effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-magenta-500/20 rounded-full blur-3xl" />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Glitch Hero - Futuristic UI */}
        <div className="h-screen flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 relative">
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
            className="text-center max-w-6xl"
          >
            {/* Glitch text effect */}
            <motion.p
              className="text-cyan-400 text-sm sm:text-base md:text-lg mb-4 font-mono tracking-widest"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* // SYSTEM INITIALIZED */}
            </motion.p>
            
            <h1 
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-white leading-none tracking-tighter mb-4"
              style={{ 
                fontFamily: 'var(--font-inter)',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)',
              }}
            >
              {card.recipient_name}
            </h1>
            
            <motion.p
              className="text-magenta-400 text-xl sm:text-2xl md:text-3xl font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
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

        {/* SECTION 2: Holographic Photo Display */}
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
                  {/* // DATA STREAM */}
                </p>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white font-black"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  VISUAL RECORDS
                </h2>
              </motion.div>

              {/* Holographic photo grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {allPhotos.slice(0, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden border-2 border-cyan-400/50 bg-black/50">
                      <div className="aspect-video relative">
                        <Image
                          src={photo}
                          alt={`Record ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Holographic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-magenta-500/20 to-transparent" />
                      </div>
                      {/* Tech overlay */}
                      <div className="absolute top-2 left-2 text-cyan-400 text-xs font-mono">
                        REC.{String(index + 1).padStart(3, '0')}
                      </div>
                      <div className="absolute bottom-2 right-2 text-magenta-400 text-xs font-mono">
                        {Math.random() > 0.5 ? 'ENCRYPTED' : 'DECRYPTED'}
                      </div>
                    </div>
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

        {/* SECTION 3: Sidebar Message Layout */}
        <div className="min-h-screen bg-black flex">
          {/* Left sidebar - System info */}
          <div className="w-1/3 bg-black/80 border-r border-cyan-400/30 p-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <div className="w-3 h-3 rounded-full bg-magenta-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
              </div>

              <div className="font-mono space-y-4 text-sm">
                <p className="text-cyan-400">
                  {'>'} SYSTEM STATUS
                </p>
                <p className="text-white/60">
                  ONLINE
                </p>
                <p className="text-cyan-400 mt-4">
                  {'>'} ENCRYPTION
                </p>
                <p className="text-green-400">
                  ENABLED
                </p>
                <p className="text-cyan-400 mt-4">
                  {'>'} PROTOCOL
                </p>
                <p className="text-white/60">
                  V2.0.77
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-magenta-400 text-xs font-mono">
                  {'>'} SENDER
                </p>
                <p className="text-white text-sm font-mono mt-2">
                  {card.sender_name || 'UNKNOWN'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Message content */}
          <div className="w-2/3 p-8 sm:p-12 md:p-16 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="font-mono space-y-6">
                <p className="text-cyan-400 text-sm">
                  {'>'} INITIALIZING MESSAGE PROTOCOL...
                </p>
                <p className="text-cyan-400 text-sm">
                  {'>'} DECRYPTING CONTENT...
                </p>
                <p className="text-green-400 text-sm">
                  {'>'} ACCESS GRANTED
                </p>
                
                <div className="mt-8 border-l-2 border-cyan-400 pl-6">
                  <p className="text-magenta-400 text-sm mb-4">
                    {'>'} MESSAGE DATA
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

        {/* SECTION 4: Neon Typography Statement */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-16 md:p-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-6xl"
          >
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-none tracking-tighter"
              style={{ 
                fontFamily: 'var(--font-inter)',
                textShadow: '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.6), 0 0 40px rgba(255, 0, 255, 0.4)',
              }}
            >
              SYSTEM
            </h2>
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-cyan-400 leading-none tracking-tighter"
              style={{ 
                fontFamily: 'var(--font-inter)',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4)',
              }}
            >
              OVERRIDE
            </h2>
            <p className="text-magenta-400 text-xl sm:text-2xl md:text-3xl font-mono mt-8">
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 5: System Shutdown Sequence */}
        <div className="min-h-screen bg-black p-8 sm:p-16 md:p-24 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-cyan-400/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: '2px',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-8 max-w-3xl relative z-10"
          >
            {/* Shutdown progress */}
            <div className="space-y-4">
              <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase">
                {/* // SYSTEM SHUTDOWN INITIATED */}
              </p>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 3 }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-magenta-400"
                />
              </div>
              
              <p className="text-gray-400 text-xs font-mono">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  █
                </motion.span>
                TERMINATING PROCESSES...
              </p>
            </div>

            {/* Shutdown sequence */}
            <div className="space-y-2 text-left font-mono text-xs text-gray-500">
              {[
                '> CLOSING NEURAL NETWORKS...',
                '> DISCONNECTING QUANTUM CORE...',
                '> PURGING TEMPORARY MEMORY...',
                '> SHUTTING DOWN INTERFACE...',
              ].map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 3 + index * 0.5 }}
                  className={index < 3 ? 'text-gray-500' : 'text-cyan-400'}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Final shutdown message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 5 }}
              className="pt-8 border-t border-gray-800"
            >
              <p className="text-magenta-400 text-sm font-mono mb-4">
                SYSTEM SHUTDOWN COMPLETE
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-6 sm:px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 text-sm font-mono font-bold hover:bg-cyan-400 hover:text-black transition-all min-h-[48px]"
                >
                  SHARE_DATA
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 0, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-4 bg-transparent border-2 border-magenta-400 text-magenta-400 text-sm font-mono font-bold hover:bg-magenta-400 hover:text-black transition-all min-h-[48px]"
                >
                  SAVE_RECORD
                </motion.button>
              </div>

              <p className="text-gray-500 text-xs font-mono mt-8">
                SPECTRE_CORP © 2077
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
