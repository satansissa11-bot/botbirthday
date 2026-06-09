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
        {/* SECTION 1: Newspaper Header */}
        <div className="bg-stone-900 text-stone-100 p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Newspaper name */}
            <div className="text-center mb-6">
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2"
                style={{ fontFamily: 'serif' }}
              >
                THE BIRTHDAY
              </h1>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.3em]"
                style={{ fontFamily: 'serif' }}
              >
                CHRONICLE
              </h2>
            </div>
            
            {/* Date and edition */}
            <div className="flex justify-between items-center text-stone-400 text-sm border-t border-b border-stone-700 py-3">
              <span>{currentDate}</span>
              <span>Vol. MMXXIV • No. 1</span>
              <span>Price: Free</span>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: Headline Story */}
        <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main headline */}
            <div className="border-b-4 border-stone-900 pb-6 mb-8">
              <p className="text-stone-500 text-xs tracking-widest uppercase mb-2">
                Breaking News
              </p>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-4"
                style={{ fontFamily: 'serif' }}
              >
                {card.recipient_name} CELEBRATES ANOTHER YEAR
              </h1>
              <p className="text-stone-600 text-lg">
                A special birthday edition dedicated to {card.recipient_name}
              </p>
            </div>

            {/* Lead photo */}
            {allPhotos.length > 0 && (
              <div className="mb-8">
                <div className="aspect-[16/9] bg-stone-200 relative overflow-hidden border-2 border-stone-900">
                  <Image
                    src={allPhotos[0]}
                    alt="Lead photo"
                    fill
                    className="object-cover grayscale"
                    sizes="100vw"
                  />
                  {/* Photo caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-stone-900/90 text-stone-100 p-4">
                    <p className="text-sm">
                      Photo: Special Edition • {card.recipient_name}'s Birthday
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-stone-800 text-lg leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]" style={{ fontFamily: 'serif' }}>
                    {card.message}
                  </p>
                  {card.sender_name && (
                    <p className="text-stone-600 mt-4 italic" style={{ fontFamily: 'serif' }}>
                      — Reported by {card.sender_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="border-l-2 border-stone-900 pl-6">
                  <p className="text-stone-500 text-xs tracking-widest uppercase mb-4">
                    In This Issue
                  </p>
                  <ul className="space-y-3 text-stone-700">
                    <li className="border-b border-stone-300 pb-2">
                      <span className="font-bold">Page 1:</span> Main Story
                    </li>
                    <li className="border-b border-stone-300 pb-2">
                      <span className="font-bold">Page 2:</span> Photo Gallery
                    </li>
                    <li className="border-b border-stone-300 pb-2">
                      <span className="font-bold">Page 3:</span> Special Message
                    </li>
                    <li>
                      <span className="font-bold">Page 4:</span> Celebration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Photo Gallery */}
        {allPhotos.length > 1 && (
          <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16 border-t-2 border-stone-900">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-stone-500 text-xs tracking-widest uppercase mb-4">
                Photo Gallery
              </p>
              <h2 
                className="text-3xl sm:text-4xl font-black text-stone-900 mb-8 border-b-2 border-stone-900 pb-4"
                style={{ fontFamily: 'serif' }}
              >
                CAPTURED MOMENTS
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allPhotos.slice(1, 7).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="aspect-square bg-stone-200 overflow-hidden border border-stone-900">
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <p className="text-xs text-stone-500 mt-2">
                      Fig. {index + 1}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 4: Quote Box */}
        <div className="max-w-6xl mx-auto p-8 sm:p-12 md:p-16 border-t-2 border-stone-900">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-900 text-stone-100 p-8 sm:p-12"
          >
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-4">
              Quote of the Day
            </p>
            <blockquote 
              className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-relaxed"
              style={{ fontFamily: 'serif' }}
            >
              "Another year, another adventure. Happy Birthday!"
            </blockquote>
            <p className="text-stone-400 mt-4">— The Birthday Chronicle</p>
          </motion.div>
        </div>

        {/* SECTION 5: Breaking News Ticker Finale */}
        <div className="bg-stone-900 text-stone-100 overflow-hidden">
          {/* Breaking News banner */}
          <div className="bg-red-600 py-4">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              <span className="text-xl font-black tracking-wider">
                ⚠️ BREAKING NEWS: {card.recipient_name} CELEBRATES BIRTHDAY • EXCLUSIVE COVERAGE • MORE ON PAGE 1 • ⚠️
              </span>
            </motion.div>
          </div>

          {/* Action section */}
          <div className="p-8 sm:p-12 md:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="px-6 sm:px-8 py-4 bg-stone-800 text-stone-100 text-sm border border-stone-600 hover:bg-stone-700 transition-colors min-h-[48px]"
                >
                  Share Article
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-4 bg-stone-800 text-stone-100 text-sm border border-stone-600 hover:bg-stone-700 transition-colors min-h-[48px]"
                >
                  Save Edition
                </motion.button>
              </div>

              <p className="text-xs">
                © {currentDate} The Birthday Chronicle • All Rights Reserved • Printed by Spectre
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
