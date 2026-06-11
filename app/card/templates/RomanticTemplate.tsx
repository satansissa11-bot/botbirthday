'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import RomanticEffects from '@/components/animations/RomanticEffects';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal, FloatingParticles } from '@/components/animations/PremiumAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Share2, Download, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface RomanticTemplateProps {
  card: BirthdayCard;
}

export default function RomanticTemplate({ card }: RomanticTemplateProps) {
  const template = getTemplate('romantic');
  const [showConfetti, setShowConfetti] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name}!`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-burgundy-900 via-rose-900 to-burgundy-950">
      {/* Cinematic candlelight effect */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Candle glow layers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 14}%`,
              bottom: '0',
              width: '300px',
              height: '600px',
              background: 'radial-gradient(ellipse at bottom, rgba(255, 180, 100, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Elegant rose petals */}
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
              y: [0, 800],
              rotate: [0, 180],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full opacity-70 shadow-lg shadow-rose-500/30" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Luxury Wedding Invitation */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Cinematic vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="max-w-3xl w-full relative z-10"
          >
            {/* Luxury invitation card */}
            <motion.div
              initial={{ rotateY: -10 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 1.5 }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Premium card with gold foil effect */}
              <div className="bg-gradient-to-br from-rose-50 via-white to-rose-50 p-12 sm:p-16 md:p-24 shadow-2xl border-4 border-amber-200/50 relative">
                {/* Gold foil border */}
                <div className="absolute inset-0 border-2 border-amber-300/30 pointer-events-none" />
                <div className="absolute inset-2 border border-amber-200/20 pointer-events-none" />
                
                {/* Corner decorations */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {!letterOpen ? (
                  <div className="text-center space-y-8 relative z-10">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 1 }}
                      className="text-amber-600 text-xs tracking-[0.5em] uppercase font-bold"
                      style={{ fontFamily: 'serif' }}
                    >
                      ★ A Special Celebration ★
                    </motion.p>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="text-5xl sm:text-6xl md:text-7xl text-burgundy-800 font-light leading-none"
                      style={{ fontFamily: 'serif' }}
                    >
                      {card.recipient_name}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 1 }}
                      className="text-rose-700 text-xl leading-relaxed"
                      style={{ fontFamily: 'serif', lineHeight: '1.8' }}
                    >
                      Is cordially invited to celebrate
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLetterOpen(true)}
                      className="px-12 py-4 bg-gradient-to-r from-burgundy-600 to-rose-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-xl hover:from-burgundy-700 hover:to-rose-700 transition-all"
                      style={{ fontFamily: 'serif' }}
                    >
                      Open Invitation
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-8 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl mx-auto"
                    >
                      <Heart className="w-10 h-10 text-white fill-current" />
                    </motion.div>

                    <p className="text-burgundy-800 text-2xl mb-6 font-bold" style={{ fontFamily: 'serif', lineHeight: '2' }}>
                      Dearest {card.recipient_name},
                    </p>

                    <p className="text-rose-800 text-lg leading-relaxed" style={{ fontFamily: 'serif', lineHeight: '1.9' }}>
                      {card.message}
                    </p>

                    {card.sender_name && (
                      <p className="text-burgundy-800 text-xl mt-8 font-bold" style={{ fontFamily: 'serif' }}>
                        With love and warmest wishes,<br />
                        {card.sender_name}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Elegant Photo Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Cinematic vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {/* Elegant rose petals */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    rotate: [0, 180],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                >
                  <div className="w-4 h-4 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full opacity-60 shadow-lg shadow-rose-500/20" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 text-center"
              >
                <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-4 font-bold" style={{ fontFamily: 'serif' }}>
                  ★ Cherished Moments ★
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-light" style={{ fontFamily: 'serif' }}>
                  Precious Memories
                </h2>
              </motion.div>

              {/* Elegant photo grid with gold frames */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateY: index % 2 === 0 ? -15 : 15, scale: 0.9 }}
                    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.12 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Gold frame */}
                    <div className="relative aspect-square bg-gradient-to-br from-amber-100 to-rose-50 p-4 shadow-2xl border-4 border-amber-300/50">
                      <div className="relative w-full h-full border-2 border-amber-200/50 overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/20 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Gold corner decoration */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Cinematic Finale */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Cinematic candlelight */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + i * 20}%`,
                  bottom: '0',
                  width: '400px',
                  height: '800px',
                  background: 'radial-gradient(ellipse at bottom, rgba(255, 180, 100, 0.2) 0%, transparent 60%)',
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Elegant rose petals */}
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
                  y: [0, -35, 0],
                  rotate: [0, 25, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-3 h-3 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full opacity-70 shadow-lg shadow-rose-500/30" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl relative z-10"
          >
            {/* Elegant heart */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-12"
            >
              <div className="w-28 h-28 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                <Heart className="w-14 h-14 text-white fill-current" />
              </div>
            </motion.div>

            <h2 className="text-6xl sm:text-7xl md:text-8xl text-white font-light leading-none mb-6" style={{ fontFamily: 'serif' }}>
              With Love
            </h2>

            <p className="text-rose-200 text-3xl font-light mb-12" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </p>

            {/* Elegant action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-12 py-5 bg-gradient-to-r from-burgundy-600 to-rose-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-xl hover:from-burgundy-700 hover:to-rose-700 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Share This Moment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-amber-400 text-amber-300 text-sm font-bold tracking-widest uppercase rounded-full hover:bg-amber-400/10 transition-all min-h-[60px] shadow-xl"
                style={{ fontFamily: 'serif' }}
              >
                Save Memories
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="romantic" />
      </div>
    </div>
  );
}
