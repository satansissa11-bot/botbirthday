'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, Music, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

interface MusicFestivalTemplateProps {
  card: BirthdayCard;
}

export default function MusicFestivalTemplate({ card }: MusicFestivalTemplateProps) {
  const template = getTemplate('music-festival');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Festival - ${card.recipient_name}`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
      {/* Animated gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-orange-600/30"
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Festival Poster */}
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl w-full"
          >
            {/* Poster frame */}
            <div className="bg-black/80 backdrop-blur-sm border-8 border-white/20 shadow-2xl overflow-hidden relative">
              {/* Poster content */}
              <div className="p-8 sm:p-12 md:p-16 text-center">
                {/* Festival logo */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-8"
                >
                  <Music className="w-20 h-20 text-pink-400 mx-auto" />
                </motion.div>
                
                {/* Festival name */}
                <h1 
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-4"
                  style={{ 
                    fontFamily: 'sans-serif',
                    textShadow: '0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  BIRTHDAY
                </h1>
                
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent leading-none mb-8"
                  style={{ 
                    fontFamily: 'sans-serif',
                    background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  FESTIVAL
                </h2>
                
                {/* Headline act */}
                <div className="mb-8">
                  <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-2">
                    HEADLINING ACT
                  </p>
                  <h3 
                    className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    {card.recipient_name}
                  </h3>
                </div>
                
                {/* Event details */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <p className="text-sm">{currentDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <p className="text-sm">Everywhere</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-4 border-pink-400/50 rounded-full" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-orange-400/50 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Lineup */}
        <div className="min-h-screen bg-black/50 p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full"
          >
            <div className="text-center mb-12">
              <p className="text-pink-400 text-sm tracking-[0.3em] uppercase mb-4">
                The Lineup
              </p>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
                style={{ fontFamily: 'sans-serif' }}
              >
                FEATURING
              </h2>
            </div>

            {/* Lineup list */}
            <div className="space-y-6">
              {[
                { name: card.recipient_name, time: 'HEADLINE', color: 'text-pink-400' },
                { name: 'Celebration', time: 'SUPPORT', color: 'text-orange-400' },
                { name: 'Joy & Happiness', time: 'SUPPORT', color: 'text-yellow-400' },
                { name: 'Memories', time: 'OPENING', color: 'text-purple-400' },
              ].map((act, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between bg-white/10 backdrop-blur-sm p-6 border border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <Music className="w-6 h-6 text-white/60" />
                    <h3 
                      className={`text-2xl sm:text-3xl font-black ${act.color}`}
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      {act.name}
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm tracking-widest">{act.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Photo Gallery */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-black/30 p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-12 text-center"
              >
                <p className="text-orange-400 text-sm tracking-[0.3em] uppercase mb-4">
                  Photo Gallery
                </p>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  LIVE SHOTS
                </h2>
              </motion.div>

              {/* Photo grid with neon borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="aspect-square bg-black/50 overflow-hidden border-4 border-pink-500/50 group-hover:border-orange-500/50 transition-colors">
                      <Image
                        src={photo}
                        alt={`Live ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      {/* Neon overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-600/40 to-transparent group-hover:from-orange-600/40 transition-colors" />
                    </div>
                    {/* Photo number */}
                    <div className="absolute top-2 left-2 bg-black/80 text-pink-400 px-3 py-1 text-xs font-bold">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Editorial Message - Festival Magazine Style */}
        <div className="min-h-screen bg-black/50 p-8 sm:p-12 md:p-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-4">
                Festival Magazine
              </p>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
                style={{ fontFamily: 'sans-serif' }}
              >
                EXCLUSIVE INTERVIEW
              </h2>
            </motion.div>

            {/* Editorial layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left column - Photo */}
              {allPhotos.length > 0 && (
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[4/5] bg-black/50 border-4 border-pink-500/50"
                  >
                    <Image
                      src={allPhotos[0]}
                      alt="Featured artist"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-600/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-black/80 text-pink-400 px-3 py-1 text-xs font-bold">
                      FEATURED
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Right column - Article */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-pink-600/20 to-orange-600/20 backdrop-blur-sm p-8 sm:p-12 border-4 border-white/20 h-full"
                >
                  <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-6">
                    The Message
                  </p>
                  
                  <p className="text-white text-2xl sm:text-3xl md:text-4xl leading-relaxed font-black mb-8" style={{ fontFamily: 'sans-serif', lineHeight: '1.6' }}>
                    {card.message}
                  </p>
                  
                  {card.sender_name && (
                    <div className="mt-12 pt-8 border-t border-white/20">
                      <p className="text-orange-400 text-sm tracking-widest uppercase mb-2">
                        Interview by
                      </p>
                      <p className="text-white text-xl font-black" style={{ fontFamily: 'sans-serif' }}>
                        {card.sender_name}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: Festival Finale */}
        <div className="h-screen bg-black flex items-center justify-center p-8 sm:p-12 md:p-16 relative">
          {/* Animated lights */}
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
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-4 h-4 bg-pink-400 rounded-full blur-sm" />
              </motion.div>
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
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-12"
            >
              <Music className="w-24 h-24 text-pink-400 mx-auto" />
            </motion.div>
            
            <h2 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-8"
              style={{
                fontFamily: 'sans-serif',
                textShadow: '0 0 40px rgba(236, 72, 153, 0.8), 0 0 80px rgba(236, 72, 153, 0.4)',
              }}
            >
              LET&apos;S PARTY
            </h2>
            
            <p className="text-orange-400 text-3xl font-black" style={{ fontFamily: 'sans-serif' }}>
              {card.recipient_name}
            </p>
          </motion.div>
        </div>

        {/* SECTION 6: Festival Actions */}
        <div className="min-h-screen bg-black/50 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <p className="text-pink-400 text-sm tracking-[0.3em] uppercase">
              Get Your Ticket
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white text-sm font-black uppercase tracking-wider hover:from-pink-500 hover:to-orange-500 transition-all min-h-[48px]"
                style={{ fontFamily: 'sans-serif' }}
              >
                Share Festival
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 border-4 border-pink-400 text-pink-400 text-sm font-black uppercase tracking-wider hover:bg-pink-400 hover:text-black transition-all min-h-[48px]"
                style={{ fontFamily: 'sans-serif' }}
              >
                Save Ticket
              </motion.button>
            </div>

            <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: 'sans-serif' }}>
              Spectre Festival Productions
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="music-festival" />
      </div>
    </div>
  );
}
