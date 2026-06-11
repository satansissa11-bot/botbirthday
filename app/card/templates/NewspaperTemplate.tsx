'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion } from 'framer-motion';
import { Share2, Download } from 'lucide-react';
import Image from 'next/image';

interface NewspaperTemplateProps {
  card: BirthdayCard;
}

export default function NewspaperTemplate({ card }: NewspaperTemplateProps) {
  const template = getTemplate('newspaper');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Chronicle - ${card.recipient_name}`,
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
    <div className="min-h-screen bg-stone-100">
      {/* Newspaper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 50%)
          `,
          backgroundSize: '2px 2px'
        }} />
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Dramatic Historic Newspaper Header */}
        <div className="bg-stone-900 text-stone-100 p-8 sm:p-12 md:p-16 border-b-8 border-stone-800 relative overflow-hidden">
          {/* Historic paper texture overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.05) 50%),
                linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.05) 50%)
              `,
              backgroundSize: '3px 3px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto relative z-10"
          >
            {/* Ornamental top border */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-0.5 bg-stone-500" />
                <div className="w-2 h-2 bg-stone-500 rotate-45" />
                <div className="w-16 h-0.5 bg-stone-500" />
              </div>
            </div>

            {/* Historic newspaper masthead */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, type: 'spring' }}
              >
                <h1 
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight mb-2"
                  style={{ 
                    fontFamily: 'serif', 
                    textShadow: '4px 4px 0 #000, 8px 8px 0 rgba(0,0,0,0.3)',
                    letterSpacing: '-0.05em'
                  }}
                >
                  THE BIRTHDAY
                </h1>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.4em]"
                  style={{ fontFamily: 'serif', letterSpacing: '0.3em' }}
                >
                  CHRONICLE
                </h2>
              </motion.div>
            </div>
            
            {/* Ornamental divider */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-24 h-0.5 bg-stone-500" />
                <div className="w-3 h-3 border-2 border-stone-500 rotate-45" />
                <div className="w-24 h-0.5 bg-stone-500" />
              </div>
            </div>
            
            {/* Historic date and edition */}
            <div className="flex justify-between items-center text-stone-300 text-sm border-t-4 border-b-4 border-stone-700 py-6 bg-stone-800/30">
              <span className="font-bold tracking-wider" style={{ fontFamily: 'serif' }}>{currentDate}</span>
              <span className="font-bold tracking-wider" style={{ fontFamily: 'serif' }}>EST. MMXXIV • SPECIAL EDITION • VOL. 1</span>
              <span className="font-bold tracking-wider" style={{ fontFamily: 'serif' }}>PRICE: ONE SMILE</span>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Dramatic Front-Page Headline */}
        <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main headline with dramatic typography */}
            <div className="border-b-8 border-stone-900 pb-10 mb-12 relative">
              {/* Breaking news banner */}
              <div className="absolute -top-6 left-0 bg-red-700 text-white px-6 py-2 text-xs font-bold tracking-widest uppercase shadow-xl">
                ★ EXCLUSIVE ★
              </div>
              
              <p className="text-red-700 text-sm tracking-[0.4em] uppercase mb-6 font-bold animate-pulse">
                ⚠️ BREAKING NEWS ⚠️
              </p>
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-stone-900 leading-tight mb-6"
                style={{ 
                  fontFamily: 'serif', 
                  textShadow: '2px 2px 0 #fff, 4px 4px 0 rgba(0,0,0,0.2)',
                  letterSpacing: '-0.03em'
                }}
              >
                {card.recipient_name} CELEBRATES
              </h1>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-800 leading-tight mb-6"
                style={{ 
                  fontFamily: 'serif', 
                  textShadow: '1px 1px 0 #fff',
                  letterSpacing: '-0.02em'
                }}
              >
                ANOTHER YEAR
              </h2>
              <p className="text-stone-600 text-xl font-bold tracking-wide" style={{ fontFamily: 'serif' }}>
                A historic birthday edition dedicated to {card.recipient_name}
              </p>
            </div>

            {/* Lead photo with dramatic presentation */}
            {allPhotos.length > 0 && (
              <div className="mb-12">
                <div className="aspect-[16/9] bg-stone-200 relative overflow-hidden border-8 border-stone-900 shadow-2xl">
                  <Image
                    src={allPhotos[0]}
                    alt="Lead photo"
                    fill
                    className="object-cover grayscale"
                    sizes="100vw" unoptimized
                  />
                  {/* Dramatic photo caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 via-stone-900/95 to-transparent text-stone-100 p-6 border-t-4 border-stone-700">
                    <p className="text-sm font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
                      PHOTO: SPECIAL EDITION • {card.recipient_name}&apos;S BIRTHDAY • EXCLUSIVE COVERAGE • HISTORIC MOMENT
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article body with editorial layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-stone-800 text-2xl leading-relaxed first-letter:text-8xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-16px] first-letter:text-stone-900" style={{ fontFamily: 'serif', lineHeight: '1.9' }}>
                    {card.message}
                  </p>
                  {card.sender_name && (
                    <p className="text-stone-600 mt-8 italic text-xl font-bold" style={{ fontFamily: 'serif' }}>
                      — Reported by {card.sender_name}, Senior Correspondent
                    </p>
                  )}
                </div>
              </div>

              {/* Enhanced editorial sidebar */}
              <div className="lg:col-span-1">
                <div className="border-l-4 border-stone-900 pl-10 bg-stone-50 p-8 shadow-lg">
                  <p className="text-stone-500 text-xs tracking-[0.4em] uppercase mb-8 font-bold" style={{ fontFamily: 'serif' }}>
                    ★ IN THIS EDITION ★
                  </p>
                  <ul className="space-y-6 text-stone-700">
                    <li className="border-b-2 border-stone-300 pb-4">
                      <span className="font-black" style={{ fontFamily: 'serif' }}>PAGE 1:</span> Main Story
                    </li>
                    <li className="border-b-2 border-stone-300 pb-4">
                      <span className="font-black" style={{ fontFamily: 'serif' }}>PAGE 2:</span> Photo Gallery
                    </li>
                    <li className="border-b-2 border-stone-300 pb-4">
                      <span className="font-black" style={{ fontFamily: 'serif' }}>PAGE 3:</span> Special Message
                    </li>
                    <li>
                      <span className="font-black" style={{ fontFamily: 'serif' }}>PAGE 4:</span> Celebration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Historic Photo Gallery */}
        {allPhotos.length > 1 && (
          <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16 border-t-8 border-stone-900">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-stone-500 text-xs tracking-[0.4em] uppercase mb-6 font-bold animate-pulse" style={{ fontFamily: 'serif' }}>
                ★ PHOTO GALLERY ★
              </p>
              <h2 
                className="text-5xl sm:text-6xl font-black text-stone-900 mb-12 border-b-4 border-stone-900 pb-8"
                style={{ 
                  fontFamily: 'serif', 
                  textShadow: '2px 2px 0 #fff',
                  letterSpacing: '-0.02em'
                }}
              >
                CAPTURED MOMENTS
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {allPhotos.slice(1, 7).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -3 : 3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="relative"
                  >
                    <div className="aspect-square bg-stone-200 overflow-hidden border-6 border-stone-900 shadow-xl">
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 50vw, 33vw" unoptimized
                      />
                    </div>
                    <p className="text-xs text-stone-500 mt-4 font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
                      FIG. {index + 1}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 4: Historic Quote Box */}
        <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16 border-t-8 border-stone-900">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-900 text-stone-100 p-12 sm:p-16 md:p-20 border-8 border-stone-800 shadow-2xl relative"
          >
            {/* Ornamental corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-stone-600 rotate-45" />
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-stone-600 rotate-45" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-stone-600 rotate-45" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-stone-600 rotate-45" />
            
            <p className="text-stone-400 text-xs tracking-[0.4em] uppercase mb-8 font-bold" style={{ fontFamily: 'serif' }}>
              ★ QUOTE OF THE DAY ★
            </p>
            <blockquote
              className="text-3xl sm:text-4xl md:text-5xl font-light italic leading-relaxed"
              style={{ fontFamily: 'serif' }}
            >
              &ldquo;Another year, another adventure. Happy Birthday!&rdquo;
            </blockquote>
            <p className="text-stone-400 mt-8 text-lg font-bold tracking-wider" style={{ fontFamily: 'serif' }}>— THE BIRTHDAY CHRONICLE</p>
          </motion.div>
        </div>

        {/* SECTION 5: Enhanced Breaking News Ticker Finale */}
        <div className="bg-stone-900 text-stone-100 overflow-hidden border-t-8 border-stone-800">
          {/* Dramatic Breaking News banner */}
          <div className="bg-red-700 py-8">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              <span className="text-3xl font-black tracking-wider" style={{ fontFamily: 'serif' }}>
                ⚠️ BREAKING NEWS: {card.recipient_name} CELEBRATES BIRTHDAY • EXCLUSIVE COVERAGE • SPECIAL EDITION • HISTORIC MOMENT • MORE ON PAGE 1 • ⚠️
              </span>
            </motion.div>
          </div>

          {/* Enhanced action section */}
          <div className="p-12 sm:p-16 md:p-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-12 py-6 bg-stone-800 text-stone-100 text-lg font-bold border-4 border-stone-600 hover:bg-stone-700 transition-all min-h-[64px]"
                  style={{ fontFamily: 'serif' }}
                >
                  SHARE ARTICLE
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-stone-800 text-stone-100 text-lg font-bold border-4 border-stone-600 hover:bg-stone-700 transition-all min-h-[64px]"
                  style={{ fontFamily: 'serif' }}
                >
                  SAVE EDITION
                </motion.button>
              </div>

              <p className="text-sm font-bold tracking-wider" style={{ fontFamily: 'serif' }}>
                © {currentDate} THE BIRTHDAY CHRONICLE • ALL RIGHTS RESERVED • PRINTED BY SPECTRE • HISTORIC EDITION
              </p>
            </motion.div>
          </div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="newspaper" />
      </div>
    </div>
  );
}
