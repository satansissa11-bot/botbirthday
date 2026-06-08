'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import Slideshow from '@/components/Slideshow';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-cyan-500/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '400% 400%',
        }}
      />

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Large hero header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center pt-16 pb-8 px-4"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-16 h-16 text-white" fill="currentColor" />
            </motion.div>
          </div>
          <h1 
            className="text-6xl md:text-9xl font-bold mb-4 text-white"
            style={{ 
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.05em',
            }}
          >
            Happy
          </h1>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300"
            style={{ 
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.05em',
            }}
          >
            Birthday
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mt-4 text-white/90"
            style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {card.recipient_name}
          </motion.h3>
          {card.sender_name && (
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/70 mt-2"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              From {card.sender_name}
            </motion.p>
          )}
        </motion.div>

        {/* Glassmorphism photo gallery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex-1 px-4 pb-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20">
              <div className="rounded-2xl overflow-hidden">
                <Slideshow photos={card.photos} autoPlay={true} interval={5000} coverPhoto={card.cover_photo} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism message card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="px-4 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-2xl border border-white/20 relative">
              {/* Decorative sparkles */}
              <div className="absolute top-6 right-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-10 h-10 text-white/60" />
                </motion.div>
              </div>
              
              <p
                className="text-2xl md:text-3xl text-center leading-relaxed text-white"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {card.message}
              </p>
              
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-12 h-12 text-white/80" fill="currentColor" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-center py-8 px-4"
        >
          <p className="text-white/70 text-lg" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            Celebrate in style ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}
