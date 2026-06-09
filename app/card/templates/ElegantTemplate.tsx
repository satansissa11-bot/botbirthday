'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp, TextReveal } from '@/components/animations/PremiumAnimations';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Calendar, MapPin, Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface ElegantTemplateProps {
  card: BirthdayCard;
}

export default function ElegantTemplate({ card }: ElegantTemplateProps) {
  const template = getTemplate('elegant');
  const [showConfetti, setShowConfetti] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-950 via-yellow-950 to-stone-950">
      {/* Elegant gold accent lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Wedding Invitation Card Opening */}
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <AnimatePresence mode="wait">
            {!invitationOpen ? (
              <motion.div
                key="invitation"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                transition={{ duration: 0.8 }}
                className="cursor-pointer w-full max-w-3xl mx-auto"
                onClick={() => setInvitationOpen(true)}
              >
                {/* Invitation card - double-fold design */}
                <div className="relative bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg shadow-2xl p-8 sm:p-12 md:p-16 border-8 border-amber-400">
                  {/* Gold decorative border */}
                  <div className="absolute inset-2 border-2 border-amber-300 rounded pointer-events-none" />
                  
                  {/* Crown at top */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6"
                  >
                    <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600 mx-auto" />
                  </motion.div>

                  {/* Invitation text */}
                  <div className="text-center space-y-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-amber-700 text-sm sm:text-base uppercase tracking-[0.3em]"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      You are cordially invited to celebrate
                    </motion.p>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-amber-900"
                      style={{ fontFamily: 'var(--font-playfair-display)' }}
                    >
                      {card.recipient_name}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-amber-700 text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      Birthday Celebration
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex justify-center items-center gap-4 mt-6"
                    >
                      <div className="h-px w-16 bg-amber-400" />
                      <Sparkles className="w-6 h-6 text-amber-500" />
                      <div className="h-px w-16 bg-amber-400" />
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-amber-600 text-sm animate-pulse mt-4"
                    >
                      Click to open invitation
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full max-w-5xl mx-auto space-y-12 sm:space-y-16"
              >
                {/* SECTION 2: Event Details Frame */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/95 backdrop-blur-2xl rounded-lg shadow-2xl p-8 sm:p-12 md:p-16 border-4 border-amber-400"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date */}
                    <div className="text-center md:text-left">
                      <Calendar className="w-8 h-8 text-amber-600 mb-3 mx-auto md:mx-0" />
                      <p className="text-amber-700 text-sm uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>
                        Date
                      </p>
                      <p className="text-3xl sm:text-4xl text-amber-900 font-light" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                        Today
                      </p>
                    </div>
                    
                    {/* Location */}
                    <div className="text-center md:text-left">
                      <MapPin className="w-8 h-8 text-amber-600 mb-3 mx-auto md:mx-0" />
                      <p className="text-amber-700 text-sm uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>
                        Location
                      </p>
                      <p className="text-3xl sm:text-4xl text-amber-900 font-light" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                        Your Heart
                      </p>
                    </div>
                  </div>

                  {/* Sender */}
                  {card.sender_name && (
                    <div className="mt-8 pt-8 border-t border-amber-200 text-center">
                      <p className="text-amber-700 text-sm uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>
                        Hosted by
                      </p>
                      <p className="text-4xl sm:text-5xl text-amber-900 font-light" style={{ fontFamily: 'var(--font-playfair-display)' }}>
                        {card.sender_name}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* SECTION 3: Editorial Photo Gallery - Magazine Style */}
                {allPhotos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-amber-200 text-2xl sm:text-3xl uppercase tracking-[0.4em]"
                        style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                      >
                        Captured Moments
                      </motion.p>
                    </div>

                    {/* Magazine-style grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {allPhotos.slice(0, 4).map((photo, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className={`relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                        >
                          <div className="bg-white p-4 shadow-lg">
                            <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                              <Image
                                src={photo}
                                alt={`Memory ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            {/* Caption */}
                            <div className="mt-3 text-center">
                              <p className="text-amber-700 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>
                                Memory {index + 1}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* SECTION 4: Formal Letter Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 backdrop-blur-2xl rounded-lg shadow-2xl p-8 sm:p-12 md:p-16 border-4 border-amber-300"
                >
                  {/* Letter header */}
                  <div className="text-center mb-8 pb-8 border-b-2 border-amber-200">
                    <motion.div
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.9, duration: 1 }}
                    >
                      <Crown className="w-10 h-10 text-amber-600 mx-auto" />
                    </motion.div>
                  </div>

                  {/* Formal letter content */}
                  <div className="text-center space-y-6">
                    <TextReveal delay={1}>
                      <motion.p
                        className="text-3xl sm:text-4xl md:text-5xl text-amber-900 font-light"
                        style={{ fontFamily: 'var(--font-playfair-display)' }}
                      >
                        Dear {card.recipient_name},
                      </motion.p>
                    </TextReveal>

                    <TextReveal delay={1.2}>
                      <motion.p
                        className="text-xl sm:text-2xl md:text-3xl text-amber-800 leading-relaxed font-light"
                        style={{ fontFamily: 'var(--font-playfair-display)', lineHeight: '1.9' }}
                      >
                        {card.message}
                      </motion.p>
                    </TextReveal>

                    {card.sender_name && (
                      <TextReveal delay={1.4}>
                        <motion.p
                          className="text-2xl sm:text-3xl md:text-4xl text-amber-900 italic"
                          style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                        >
                          Sincerely,
                        </motion.p>
                        <motion.p
                          className="text-3xl sm:text-4xl md:text-5xl text-amber-900 font-light"
                          style={{ fontFamily: 'var(--font-playfair-display)' }}
                        >
                          {card.sender_name}
                        </motion.p>
                      </TextReveal>
                    )}
                  </div>
                </motion.div>

                {/* SECTION 5: RSVP-style Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-white/95 backdrop-blur-2xl rounded-lg shadow-2xl p-8 sm:p-12 border-4 border-amber-400"
                >
                  <div className="text-center space-y-6">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-amber-700 text-sm uppercase tracking-[0.3em]"
                      style={{ fontFamily: 'var(--font-cormorant-garamond)' }}
                    >
                      Share this celebration
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShare}
                        className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded shadow-lg transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share Invitation</span>
                      </motion.button>
                      
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 bg-white hover:bg-amber-50 text-amber-700 px-8 py-4 rounded shadow-lg border-2 border-amber-400 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span className="font-medium">Save Card</span>
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="pt-6 border-t border-amber-200"
                    >
                      <p className="text-amber-600 text-sm" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>
                        Created with elegance by Spectre
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="elegant" />
      </div>
    </div>
  );
}
