'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

interface TravelJournalTemplateProps {
  card: BirthdayCard;
}

export default function TravelJournalTemplate({ card }: TravelJournalTemplateProps) {
  const template = getTemplate('travel-journal');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Travel Journal - ${card.recipient_name}'s Birthday Journey`,
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
    <div className="min-h-screen bg-amber-50">
      {/* Paper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.1) 50%)
          `,
          backgroundSize: '3px 3px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Poster Hero - Travel Poster Style */}
        <div className="min-h-screen relative overflow-hidden">
          {/* Background photo */}
          {allPhotos.length > 0 && (
            <div className="absolute inset-0">
              <Image
                src={allPhotos[0]}
                alt="Travel poster background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-amber-800/60 to-amber-900/80" />
            </div>
          )}
          
          {/* Poster content */}
          <div className="relative z-10 h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="max-w-5xl w-full"
            >
              {/* Poster frame */}
              <div className="bg-white/10 backdrop-blur-sm border-8 border-white/30 p-8 sm:p-12 md:p-16 shadow-2xl">
                {/* Poster header */}
                <div className="flex items-center gap-4 mb-8">
                  <MapPin className="w-12 h-12 text-amber-200" />
                  <p className="text-amber-200 text-2xl font-bold tracking-widest uppercase">
                    Travel Adventure
                  </p>
                </div>
                
                {/* Main title */}
                <h1 
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-6"
                  style={{ 
                    textShadow: '4px 4px 0 rgba(0,0,0,0.5), 8px 8px 0 rgba(0,0,0,0.3)',
                    fontFamily: 'serif'
                  }}
                >
                  {card.recipient_name}
                </h1>
                
                {/* Subtitle */}
                <p 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200 mb-8"
                  style={{ fontFamily: 'serif' }}
                >
                  Birthday Journey
                </p>
                
                {/* Date badge */}
                <div className="inline-block bg-amber-600 text-white px-6 py-3 border-4 border-white">
                  <p className="text-lg font-bold tracking-wider">
                    {currentDate}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white/50 rounded-full" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-amber-400/50 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Journal Entry - Day 1 */}
        <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full"
          >
            {/* Journal page */}
            <div className="bg-amber-50 p-8 sm:p-12 md:p-16 border-l-8 border-amber-800 shadow-lg relative">
              {/* Date stamp */}
              <div className="absolute top-4 right-4 bg-amber-800 text-amber-50 px-4 py-2 rounded">
                <p className="text-sm font-bold">Day 1</p>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-amber-700 mb-8">
                <MapPin className="w-5 h-5" />
                <p className="text-sm tracking-widest uppercase">The Beginning</p>
              </div>
              
              {/* Entry content */}
              <div className="space-y-6">
                <p className="text-amber-900 text-lg leading-relaxed font-serif">
                  Dear Journal,
                </p>
                
                <p className="text-amber-800 text-xl leading-relaxed font-serif">
                  Today marks the beginning of {card.recipient_name}'s birthday journey. A new chapter unfolds, filled with memories waiting to be made.
                </p>
                
                {card.sender_name && (
                  <p className="text-amber-700 text-lg font-serif italic">
                    — {card.sender_name}
                  </p>
                )}
              </div>
              
              {/* Handwritten-style underline */}
              <div className="mt-8">
                <div className="w-32 h-1 bg-amber-800/30" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Photo Memories */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-amber-100 p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 text-amber-700 mb-4">
                  <MapPin className="w-5 h-5" />
                  <p className="text-sm tracking-widest uppercase">Photo Journal</p>
                </div>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-900"
                >
                  Captured Moments
                </h2>
              </motion.div>

              {/* Polaroid-style photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(0, 6).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white p-4 pb-8 shadow-lg">
                      <div className="aspect-[4/5] bg-amber-100 relative overflow-hidden mb-4">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      <p className="text-amber-700 text-sm text-center font-serif">
                        Location {index + 1}
                      </p>
                    </div>
                    {/* Tape effect */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-amber-300/50 -rotate-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Special Message Entry */}
        <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl w-full"
          >
            {/* Journal page */}
            <div className="bg-amber-50 p-8 sm:p-12 md:p-16 border-l-8 border-amber-800 shadow-lg relative">
              {/* Date stamp */}
              <div className="absolute top-4 right-4 bg-amber-800 text-amber-50 px-4 py-2 rounded">
                <p className="text-sm font-bold">Special Entry</p>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2 text-amber-700 mb-8">
                <MapPin className="w-5 h-5" />
                <p className="text-sm tracking-widest uppercase">Heart of the Journey</p>
              </div>
              
              {/* Entry content */}
              <div className="space-y-6">
                <p className="text-amber-900 text-2xl leading-relaxed font-serif">
                  A message for {card.recipient_name}:
                </p>
                
                <p className="text-amber-800 text-xl leading-relaxed font-serif">
                  {card.message}
                </p>
                
                {card.sender_name && (
                  <p className="text-amber-700 text-lg font-serif italic mt-8">
                    Written with love by {card.sender_name}
                  </p>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="mt-12 flex justify-center">
                <div className="w-16 h-16 border-2 border-amber-800/30 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-amber-800/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 5: Journey Map */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-amber-100 p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 text-amber-700 mb-4">
                  <MapPin className="w-5 h-5" />
                  <p className="text-sm tracking-widest uppercase">Journey Map</p>
                </div>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-900"
                >
                  The Path Traveled
                </h2>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-1 bg-amber-800/30" />
                
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative pl-12 sm:pl-20 pb-12"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2 sm:left-6 top-4 w-5 h-5 bg-amber-800 rounded-full border-4 border-amber-100" />
                    
                    <div className="bg-white p-4 shadow-lg">
                      <div className="aspect-[16/9] bg-amber-100 relative overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Stop ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                      <p className="text-amber-700 text-sm mt-3 font-serif">
                        Stop {index + 1}: Memory Lane
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Journal Finale */}
        <div className="min-h-screen bg-amber-50 p-8 sm:p-12 md:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center"
          >
            <div className="bg-white p-8 sm:p-12 md:p-16 border-8 border-amber-800 shadow-2xl relative">
              {/* Book spine */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-amber-800" />
              
              <div className="pl-12">
                <MapPin className="w-16 h-16 text-amber-800 mx-auto mb-8" />
                
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl font-serif text-amber-900 leading-tight mb-4"
                >
                  Journey Complete
                </h2>
                
                <p className="text-amber-700 text-xl font-serif">
                  Happy Birthday, {card.recipient_name}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 7: Journal Actions */}
        <div className="min-h-screen bg-white p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-2xl"
          >
            <div className="flex items-center gap-2 text-amber-700">
              <MapPin className="w-5 h-5" />
              <p className="text-sm tracking-widest uppercase">Share Your Journey</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 sm:px-8 py-4 bg-amber-800 text-amber-50 text-sm font-serif border-2 border-amber-900 hover:bg-amber-700 transition-colors min-h-[48px]"
              >
                Share Journal
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-4 bg-white text-amber-800 text-sm font-serif border-2 border-amber-800 hover:bg-amber-50 transition-colors min-h-[48px]"
              >
                Save Journey
              </motion.button>
            </div>

            <p className="text-amber-600 text-xs font-serif">
              Spectre Travel Journals
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="travel-journal" />
      </div>
    </div>
  );
}
