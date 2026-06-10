'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download, MapPin, Calendar, Compass, Star } from 'lucide-react';
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
          title: `Adventure Map - ${card.recipient_name}&apos;s Birthday Quest`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200">
      {/* Parchment texture */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
            linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
          `,
          backgroundSize: '4px 4px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Treasure Map Hero */}
        <div className="min-h-screen relative overflow-hidden">
          {/* Ancient map background */}
          {allPhotos.length > 0 && (
            <div className="absolute inset-0">
              <Image
                src={allPhotos[0]}
                alt="Adventure map background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-orange-800/60 to-amber-900/80" />
            </div>
          )}
          
          {/* Treasure map overlay */}
          <div className="relative z-10 h-screen flex items-center justify-center p-8 sm:p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-5xl w-full"
            >
              {/* Ancient map frame */}
              <div className="bg-amber-50/90 backdrop-blur-sm border-8 border-amber-700 p-10 sm:p-14 md:p-20 shadow-2xl relative">
                {/* Parchment edges */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-800/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-800/30 to-transparent" />
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-800/30 to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-amber-800/30 to-transparent" />
                </div>
                
                {/* Compass decoration */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-8 right-8 opacity-30"
                >
                  <Compass className="w-16 h-16 text-amber-800" />
                </motion.div>
                
                {/* Map header */}
                <div className="flex items-center gap-4 mb-12">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Star className="w-12 h-12 text-amber-700" />
                  </motion.div>
                  <p className="text-amber-800 text-2xl font-bold tracking-widest uppercase" style={{ fontFamily: 'serif' }}>
                    ★ Adventure Map ★
                  </p>
                </div>
                
                {/* Main title */}
                <motion.h1
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-amber-900 leading-none mb-8"
                  style={{ 
                    textShadow: '4px 4px 0 rgba(139, 69, 19, 0.3), 8px 8px 0 rgba(139, 69, 19, 0.2)',
                    fontFamily: 'serif'
                  }}
                >
                  {card.recipient_name}
                </motion.h1>
                
                {/* Subtitle */}
                <p 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700 mb-12"
                  style={{ fontFamily: 'serif' }}
                >
                  Birthday Quest
                </p>
                
                {/* Adventure badge */}
                <div className="inline-block bg-amber-700 text-amber-50 px-10 py-5 border-4 border-amber-900 shadow-xl">
                  <p className="text-xl font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
                    BEGIN YOUR JOURNEY
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Quest Log Entry */}
        <div className="min-h-screen bg-amber-50 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Parchment texture */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl w-full relative z-10"
          >
            {/* Ancient scroll */}
            <div className="bg-amber-100 p-12 sm:p-16 md:p-24 border-4 border-amber-800 shadow-2xl relative">
              {/* Scroll edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 to-amber-700" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800 to-amber-700" />
              
              {/* Quest stamp */}
              <div className="absolute top-8 right-8 bg-amber-800 text-amber-50 px-6 py-3 rounded shadow-lg border-2 border-amber-900">
                <p className="text-sm font-bold tracking-wider">★ QUEST START ★</p>
              </div>
              
              {/* Location marker */}
              <div className="flex items-center gap-3 text-amber-700 mb-12">
                <motion.div
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <MapPin className="w-8 h-8" />
                </motion.div>
                <p className="text-sm tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>THE BEGINNING</p>
              </div>
              
              {/* Quest content */}
              <div className="space-y-10 pl-12">
                <p className="text-amber-900 text-3xl leading-relaxed font-serif font-bold">
                  Dear Adventurer {card.recipient_name},
                </p>
                
                <p className="text-amber-800 text-2xl leading-relaxed font-serif">
                  Your birthday quest begins today. A journey of discovery awaits, with memories to be made and treasures to be found along the way.
                </p>
                
                {card.sender_name && (
                  <p className="text-amber-700 text-xl font-serif italic mt-12">
                    — Your Guide, {card.sender_name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Discovery Map Route */}
        {allPhotos.length > 0 && (
          <div className="min-h-screen bg-amber-200 p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Parchment texture */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                  linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
                `,
                backgroundSize: '4px 4px'
              }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 text-amber-800 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Compass className="w-8 h-8" />
                  </motion.div>
                  <p className="text-sm tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>★ DISCOVERY ROUTE ★</p>
                </div>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl font-serif text-amber-900 font-bold"
                >
                  Map Your Journey
                </h2>
              </motion.div>

              {/* Interactive map layout */}
              <div className="relative">
                {/* SVG route path */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  <motion.path
                    d="M 100 150 Q 300 100 500 150 T 900 150 T 1300 150"
                    stroke="#amber-700"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="15,8"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5 }}
                  />
                </svg>

                {/* Discovery markers */}
                <div className="flex flex-wrap justify-center gap-10 relative" style={{ zIndex: 1 }}>
                  {allPhotos.slice(0, 6).map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, y: 60 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      whileHover={{ scale: 1.12, y: -15 }}
                      className="relative"
                    >
                      {/* Treasure marker */}
                      <div className="relative">
                        <motion.div
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                          className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10"
                        >
                          <div className="w-12 h-12 bg-amber-700 rounded-full border-4 border-amber-900 shadow-xl flex items-center justify-center">
                            <span className="text-amber-50 font-bold text-lg">{index + 1}</span>
                          </div>
                          {/* Pin point */}
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-l-transparent border-r-5 border-r-transparent border-t-10 border-t-amber-700" />
                        </motion.div>

                        {/* Discovery photo */}
                        <div className="w-56 h-56 bg-amber-50 shadow-2xl border-4 border-amber-800 overflow-hidden relative">
                          <Image
                            src={photo}
                            alt={`Discovery ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="224px"
                          />
                          {/* Map overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent" />
                        </div>

                        {/* Discovery label */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-50 px-5 py-2 rounded shadow-xl whitespace-nowrap border-2 border-amber-900">
                          <p className="text-xs font-bold tracking-wider" style={{ fontFamily: 'serif' }}>DISCOVERY {index + 1}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Compass rose */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                  className="absolute bottom-8 right-8 opacity-25"
                >
                  <Compass className="w-32 h-32 text-amber-900" />
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Quest Message */}
        <div className="min-h-screen bg-amber-50 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Parchment texture */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl w-full relative z-10"
          >
            {/* Ancient scroll */}
            <div className="bg-amber-100 p-12 sm:p-16 md:p-24 border-4 border-amber-800 shadow-2xl relative">
              {/* Scroll edges */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 to-amber-700" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-800 to-amber-700" />
              
              {/* Quest stamp */}
              <div className="absolute top-8 right-8 bg-amber-800 text-amber-50 px-6 py-3 rounded shadow-lg border-2 border-amber-900">
                <p className="text-sm font-bold tracking-wider">★ SPECIAL QUEST ★</p>
              </div>
              
              {/* Location marker */}
              <div className="flex items-center gap-3 text-amber-700 mb-12">
                <motion.div
                  animate={{ rotate: [0, -20, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Star className="w-8 h-8" />
                </motion.div>
                <p className="text-sm tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>HEART OF THE QUEST</p>
              </div>
              
              {/* Quest content */}
              <div className="space-y-10 pl-12">
                <p className="text-amber-900 text-3xl leading-relaxed font-serif font-bold">
                  A message for {card.recipient_name}:
                </p>
                
                <p className="text-amber-800 text-2xl leading-relaxed font-serif">
                  {card.message}
                </p>
                
                {card.sender_name && (
                  <p className="text-amber-700 text-xl font-serif italic mt-12">
                    Written by your guide, {card.sender_name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 5: Journey Timeline */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-amber-200 p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Parchment texture */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                  linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
                `,
                backgroundSize: '4px 4px'
              }} />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 text-amber-800 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Compass className="w-8 h-8" />
                  </motion.div>
                  <p className="text-sm tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>★ JOURNEY TIMELINE ★</p>
                </div>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl font-serif text-amber-900 font-bold"
                >
                  Path Traveled
                </h2>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-3 bg-amber-800/40" />
                
                {allPhotos.slice(1, 5).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.18 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative pl-20 sm:pl-28 pb-20"
                  >
                    {/* Timeline milestone */}
                    <div className="absolute left-5 sm:left-9 top-8 w-8 h-8 bg-amber-800 rounded-full border-4 border-amber-100 shadow-xl flex items-center justify-center">
                      <span className="text-amber-50 font-bold text-sm">{index + 1}</span>
                    </div>
                    
                    <div className="bg-amber-50 p-8 shadow-2xl border-4 border-amber-800">
                      <div className="aspect-[16/9] bg-amber-100 relative overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Milestone ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                      <p className="text-amber-800 text-lg mt-6 font-serif font-bold">
                        Milestone {index + 1}: Discovery
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Quest Complete */}
        <div className="min-h-screen bg-amber-100 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Parchment texture */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center relative z-10"
          >
            <div className="bg-amber-50 p-12 sm:p-16 md:p-24 border-8 border-amber-800 shadow-2xl relative">
              {/* Treasure decoration */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-12"
              >
                <Star className="w-24 h-24 text-amber-800 mx-auto" />
              </motion.div>
              
              <motion.h2
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-5xl sm:text-6xl md:text-7xl font-serif text-amber-900 leading-tight mb-8 font-bold"
              >
                Quest Complete
              </motion.h2>
              
              <p className="text-amber-700 text-3xl font-serif font-bold">
                Happy Birthday, {card.recipient_name}
              </p>
            </div>
          </motion.div>
        </div>

        {/* SECTION 7: Adventure Actions */}
        <div className="min-h-screen bg-amber-50 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Parchment texture */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%),
                linear-gradient(0deg, transparent 50%, rgba(139, 69, 19, 0.15) 50%)
              `,
              backgroundSize: '4px 4px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-16 max-w-3xl relative z-10"
          >
            <div className="flex items-center gap-3 text-amber-800 justify-center">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Compass className="w-8 h-8" />
              </motion.div>
              <p className="text-sm tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>★ SHARE YOUR ADVENTURE ★</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-12 py-6 bg-amber-800 text-amber-50 text-lg font-serif border-4 border-amber-900 hover:bg-amber-700 transition-all min-h-[64px] shadow-xl"
              >
                Share Adventure Map
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-amber-50 text-amber-800 text-lg font-serif border-4 border-amber-800 hover:bg-amber-100 transition-all min-h-[64px] shadow-xl"
              >
                Save Quest Log
              </motion.button>
            </div>

            <p className="text-amber-700 text-sm font-serif font-bold tracking-wider">
              SPECTRE ADVENTURE MAPS
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="travel-journal" />
      </div>
    </div>
  );
}
