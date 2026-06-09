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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200">
      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(180, 100, 100, 0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(180, 100, 100, 0.1) 50%)
          `,
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Falling rose petals */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 1000],
              rotate: [0, 360],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <div className="w-4 h-4 bg-rose-300 rounded-full opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Envelope Opening */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-2xl w-full"
          >
            {/* Envelope */}
            {!envelopeOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Envelope body */}
                <div className="bg-rose-200 p-8 sm:p-12 md:p-16 shadow-2xl relative" style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(180, 100, 100, 0.1) 0%, transparent 100%)'
                }}>
                  {/* Envelope flap */}
                  <motion.div
                    animate={{ rotateX: envelopeOpen ? 180 : 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-0 left-0 right-0 h-32 bg-rose-300 origin-top"
                    style={{
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    }}
                  >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2">
                      <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                    </div>
                  </motion.div>

                  {/* Envelope content preview */}
                  <div className="pt-20 text-center">
                    <p className="text-rose-800 text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'cursive' }}>
                      For {card.recipient_name}
                    </p>
                    <p className="text-rose-600 text-xs tracking-widest uppercase">
                      Click to open
                    </p>
                  </div>
                </div>

                {/* Click to open */}
                <motion.button
                  onClick={() => setEnvelopeOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 cursor-pointer"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Letter emerging */}
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="bg-white p-8 sm:p-12 md:p-16 shadow-2xl relative" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(180, 100, 100, 0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 100%'
                  }}
                >
                  {/* Wax seal */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-16 h-16 bg-rose-500 rounded-full shadow-xl flex items-center justify-center border-4 border-rose-600">
                      <Heart className="w-8 h-8 text-white" fill="currentColor" />
                    </div>
                  </div>

                  {/* Handwritten letter */}
                  <div className="pt-12">
                    <p className="text-rose-800 text-lg mb-6" style={{ fontFamily: 'cursive', lineHeight: '2' }}>
                      Dearest {card.recipient_name},
                    </p>

                    <p className="text-rose-700 text-base leading-loose mb-6" style={{ fontFamily: 'cursive', lineHeight: '2.2' }}>
                      {card.message}
                    </p>

                    {card.sender_name && (
                      <p className="text-rose-800 text-lg mt-8" style={{ fontFamily: 'cursive' }}>
                        With all my love,<br />
                        {card.sender_name}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* SECTION 2: Photo Gallery with Rose Petals */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-12 text-center"
              >
                <p className="text-rose-600 text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'cursive' }}>
                  Our Memories
                </p>
                <h2 className="text-3xl sm:text-4xl text-rose-800" style={{ fontFamily: 'cursive' }}>
                  Precious Moments
                </h2>
              </motion.div>

              {/* Photo grid with rose petal accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: -5 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Photo with paper frame */}
                    <div className="relative aspect-[4/5] bg-white p-4 shadow-lg transform rotate-1">
                      <div className="relative w-full h-full border-2 border-rose-200">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                    </div>

                    {/* Rose petal decoration */}
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-rose-300 rounded-full opacity-60"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Love Letter Finale */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-center max-w-4xl"
          >
            {/* Floating hearts */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Heart className="w-24 h-24 text-rose-500 mx-auto" fill="currentColor" />
            </motion.div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl text-rose-800 leading-none mb-8" style={{ fontFamily: 'cursive' }}>
              Forever Yours
            </h2>

            <p className="text-rose-600 text-2xl" style={{ fontFamily: 'cursive' }}>
              {card.recipient_name}
            </p>

            {/* Action buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-8 py-4 bg-rose-500 text-white text-sm rounded-full hover:bg-rose-600 transition-colors min-h-[48px]"
                style={{ fontFamily: 'cursive' }}
              >
                Share Our Love
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-rose-500 text-rose-600 text-sm rounded-full hover:bg-rose-50 transition-colors min-h-[48px]"
                style={{ fontFamily: 'cursive' }}
              >
                Save This Letter
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
