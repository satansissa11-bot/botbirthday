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
import { Heart, Mail, Share2, Download, X } from 'lucide-react';
import Image from 'next/image';

interface RomanticTemplateProps {
  card: BirthdayCard;
}

export default function RomanticTemplate({ card }: RomanticTemplateProps) {
  const template = getTemplate('romantic');
  const [showConfetti, setShowConfetti] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterUnfolded, setLetterUnfolded] = useState(false);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-950 via-pink-950 to-red-950">
      {/* Animated rose gold gradient background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-rose-900/30 via-pink-900/20 to-red-900/30"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '400% 400%' }}
      />
      
      {/* Floating hearts effect */}
      <RomanticEffects enabled />
      
      {/* Soft rose gold particles */}
      <FloatingParticles count={60} color="#B76E79" />
      
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Envelope Opening Experience */}
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <AnimatePresence mode="wait">
            {!envelopeOpen ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, y: -100 }}
                transition={{ duration: 0.8 }}
                className="cursor-pointer"
                onClick={() => setEnvelopeOpen(true)}
              >
                {/* Envelope */}
                <div className="relative w-full max-w-2xl mx-auto">
                  {/* Envelope body */}
                  <div className="bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl shadow-2xl p-8 sm:p-12 border-4 border-rose-400">
                    {/* Envelope flap */}
                    <motion.div
                      animate={{ rotateX: envelopeOpen ? 180 : 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-rose-300 to-pink-400 origin-top"
                      style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                    />
                    
                    {/* Recipient name on envelope */}
                    <div className="text-center pt-16 pb-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      >
                        <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-rose-600 mx-auto mb-4" />
                        <p className="text-rose-700 text-sm sm:text-base uppercase tracking-widest mb-2">To</p>
                        <h2 
                          className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-800"
                          style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                          {card.recipient_name}
                        </h2>
                        <p className="text-rose-600 text-xs sm:text-sm mt-4 animate-pulse">Tap to open</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full max-w-4xl mx-auto"
              >
                {/* Letter unfolding */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-gradient-to-br from-white/95 via-rose-50/95 to-pink-50/95 backdrop-blur-3xl rounded-3xl shadow-2xl border-4 border-rose-300 overflow-hidden"
                >
                  {/* Letter header */}
                  <div className="bg-gradient-to-r from-rose-400 to-pink-400 p-6 sm:p-8">
                    <div className="flex justify-between items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-rose-100 text-sm uppercase tracking-widest">From</p>
                        <p className="text-white text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                          {card.sender_name || 'With Love'}
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Letter content - MESSAGE AS CENTERPIECE */}
                  <div className="p-8 sm:p-12 md:p-16 lg:p-20">
                    <TextReveal delay={0.6}>
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-800 mb-8 leading-relaxed text-center"
                        style={{ fontFamily: 'var(--font-playfair-display)', lineHeight: '1.8' }}
                      >
                        Dearest {card.recipient_name},
                      </motion.p>
                    </TextReveal>

                    <TextReveal delay={0.8}>
                      <motion.p
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-700 mb-8 leading-relaxed text-center font-light"
                        style={{ fontFamily: 'var(--font-playfair-display)', lineHeight: '1.9' }}
                      >
                        {card.message}
                      </motion.p>
                    </TextReveal>

                    <TextReveal delay={1}>
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-800 leading-relaxed text-center"
                        style={{ fontFamily: 'var(--font-great-vibes)' }}
                      >
                        Forever yours,
                      </motion.p>
                    </TextReveal>
                  </div>

                  {/* Memory photos tucked into letter */}
                  {allPhotos.length > 0 && (
                    <div className="px-8 sm:px-12 md:px-16 lg:px-20 pb-12">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {allPhotos.slice(0, 6).map((photo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, rotate: -15 + Math.random() * 30 }}
                            animate={{ opacity: 1, rotate: -5 + Math.random() * 10 }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                            className="relative aspect-square"
                          >
                            <div className="absolute inset-0 bg-white p-2 shadow-lg transform rotate-3">
                              <Image
                                src={photo}
                                alt={`Memory ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            </div>
                            {/* Tape effect */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-rose-200/80 rotate-12 shadow-sm" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Letter footer with actions */}
                  <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center gap-3 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share this letter</span>
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white hover:bg-rose-50 text-rose-600 px-6 py-3 rounded-full shadow-lg transition-all border border-rose-300"
                      >
                        <Download className="w-5 h-5" />
                        <span className="font-medium">Save letter</span>
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className="text-center mt-6"
                    >
                      <p className="text-rose-600 text-sm">Created with ❤️ by Spectre</p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="romantic" />
      </div>
    </div>
  );
}
