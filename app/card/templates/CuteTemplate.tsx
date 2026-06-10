'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { FadeUp } from '@/components/animations/PremiumAnimations';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Download, Sparkles, Flower2 } from 'lucide-react';
import Image from 'next/image';

interface CuteTemplateProps {
  card: BirthdayCard;
}

export default function CuteTemplate({ card }: CuteTemplateProps) {
  const template = getTemplate('cute');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const allPhotos = card.photos && card.photos.length > 0 ? card.photos : (card.cover_photo ? [card.cover_photo] : []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${card.recipient_name}! 🎂`,
          text: card.message,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-blush-50 to-amber-50">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Whimsical Garden Hero */}
        <div className="h-screen relative overflow-hidden">
          {/* Storybook background layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sage-100 to-amber-50" />
          
          {/* Layered garden elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Back layer - trees and bushes */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-200/30 to-transparent" />
            
            {/* Middle layer - floating flowers */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Flower2 className={`w-8 h-8 ${i % 3 === 0 ? 'text-pink-300' : i % 3 === 1 ? 'text-purple-300' : 'text-amber-300'}`} />
              </motion.div>
            ))}
            
            {/* Front layer - fireflies */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50" />
              </motion.div>
            ))}
          </div>

          {/* Photo in storybook frame */}
          {allPhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 relative"
              style={{ perspective: '1000px' }}
            >
              {/* Storybook frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-sage-100 rounded-3xl shadow-2xl border-8 border-amber-300/50 p-4">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-amber-200/50">
                  <Image
                    src={allPhotos[0]}
                    alt="Cover photo"
                    fill
                    className="object-cover"
                    priority
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
                </div>
              </div>
              
              {/* Gold corner decorations */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              {/* Floating petals */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${10 + i * 15}%`,
                    right: `${-10 + i * 5}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-pink-300' : 'bg-purple-300'}`} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Typography overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-16 left-0 right-0 text-center"
          >
            <p className="text-sage-600 text-sm tracking-[0.3em] uppercase mb-4 font-bold" style={{ fontFamily: 'serif' }}>
              ✨ A Whimsical Celebration ✨
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-sage-800 leading-none mb-4" style={{ fontFamily: 'serif' }}>
              {card.recipient_name}
            </h1>
            <p className="text-sage-600 text-lg" style={{ fontFamily: 'serif' }}>
              In a garden of dreams and wonder
            </p>
          </motion.div>
        </div>

        {/* SECTION 2: Enchanted Garden Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-gradient-to-br from-sage-100 via-blush-50 to-amber-50 p-8 sm:p-12 md:p-16 relative overflow-hidden">
            {/* Layered garden background */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Back layer - garden path */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-100/40 to-transparent" />
              
              {/* Middle layer - floating flowers */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${5 + i * 6.5}%`,
                    top: `${10 + (i % 4) * 20}%`,
                  }}
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 20, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 5 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                >
                  <Flower2 className={`w-10 h-10 ${i % 4 === 0 ? 'text-pink-300' : i % 4 === 1 ? 'text-purple-300' : i % 4 === 2 ? 'text-amber-300' : 'text-rose-300'}`} />
                </motion.div>
              ))}
              
              {/* Front layer - fireflies */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.4, 1],
                    y: [0, -25, 0],
                  }}
                  transition={{
                    duration: 3.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/60" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto relative z-10"
            >
              <p className="text-sage-600 text-xs tracking-widest uppercase mb-8 font-bold" style={{ fontFamily: 'serif' }}>
                ✨ Garden Memories ✨
              </p>
              
              {/* Storybook-style photo frames */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {allPhotos.slice(1, 7).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateY: index % 2 === 0 ? -15 : 15, scale: 0.85 }}
                    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.12 }}
                    whileHover={{ scale: 1.08, rotateY: 5 }}
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Storybook frame */}
                    <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-sage-50 p-4 shadow-2xl rounded-2xl border-4 border-amber-200/50">
                      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-amber-100/50">
                        <Image
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/15 to-transparent" />
                      </div>
                    </div>
                    
                    {/* Gold corner decoration */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Floating petal */}
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.4 }}
                      className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full shadow-lg"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* SECTION 3: Garden Letter Message */}
        <div className="min-h-screen bg-gradient-to-br from-sage-100 via-blush-50 to-amber-50 p-8 sm:p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Layered garden background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating flowers */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 9}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, 25, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.35,
                }}
              >
                <Flower2 className={`w-12 h-12 ${i % 3 === 0 ? 'text-pink-300' : i % 3 === 1 ? 'text-purple-300' : 'text-amber-300'}`} />
              </motion.div>
            ))}
            
            {/* Fireflies */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [1, 1.6, 1],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-3 h-3 bg-amber-400 rounded-full shadow-xl shadow-amber-400/70" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative max-w-2xl z-10"
            style={{ perspective: '1000px' }}
          >
            {/* Storybook letter page */}
            <div className="bg-gradient-to-br from-amber-50 to-sage-50 p-10 sm:p-14 md:p-20 shadow-2xl border-8 border-amber-200/50 rounded-3xl relative">
              {/* Gold corner decorations */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-center space-y-8 relative z-10">
                <motion.p
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-3xl sm:text-4xl font-bold text-sage-700"
                  style={{ fontFamily: 'serif' }}
                >
                  🌸 Dear {card.recipient_name} 🌸
                </motion.p>
                <p 
                  className="text-xl sm:text-2xl text-sage-800 leading-relaxed"
                  style={{ fontFamily: 'serif', lineHeight: '1.9' }}
                >
                  {card.message}
                </p>
                {card.sender_name && (
                  <motion.p
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="text-2xl sm:text-3xl text-sage-600 font-bold"
                    style={{ fontFamily: 'serif' }}
                  >
                    With love, {card.sender_name} ✨
                  </motion.p>
                )}
              </div>
              
              {/* Floating petals */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                  transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
                  className={`absolute ${i % 2 === 0 ? '-bottom-6 -left-6' : '-bottom-6 -right-6'} w-8 h-8 bg-gradient-to-br ${i % 2 === 0 ? 'from-pink-300 to-rose-300' : 'from-purple-300 to-pink-300'} rounded-full shadow-lg`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: Magical Garden Gallery */}
        {allPhotos.length > 1 && (
          <div className="min-h-screen bg-gradient-to-br from-blush-50 via-sage-100 to-amber-50 p-8 sm:p-12 md:p-16">
            <div className="max-w-6xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <p className="text-sage-600 text-xs tracking-widest uppercase mb-2 font-bold" style={{ fontFamily: 'serif' }}>
                  📸 Garden Gallery
                </p>
                <h2 
                  className="text-4xl sm:text-5xl font-bold text-sage-800"
                  style={{ fontFamily: 'serif' }}
                >
                  Enchanted Moments ✨
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allPhotos.slice(1, 4).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateY: index % 2 === 0 ? -10 : 10, scale: 0.9 }}
                    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    whileHover={{ scale: 1.08, rotateY: 5 }}
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="bg-gradient-to-br from-amber-50 to-sage-50 p-4 pb-8 shadow-2xl rounded-2xl border-4 border-amber-200/50">
                      <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-xl border-2 border-amber-100/50">
                        <Image
                          src={photo}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <p className="text-center text-sage-600 text-sm mt-4 font-bold" style={{ fontFamily: 'serif' }}>
                        Memory {index + 1} 🌸
                      </p>
                    </div>
                    
                    {/* Gold decoration */}
                    <motion.div
                      animate={{ rotate: [0, 8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-r from-amber-400 to-amber-500/60 rotate-2 shadow-sm rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4 text-amber-700" />
                    </motion.div>
                    
                    {/* Floating flower */}
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, 20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -bottom-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-amber-200"
                    >
                      <Flower2 className="w-5 h-5 text-pink-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Whimsical Garden Finale */}
        <div className="min-h-screen bg-gradient-to-br from-sage-100 via-blush-50 to-amber-50 p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Layered garden elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating flowers */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-sage-50 rounded-full shadow-xl flex items-center justify-center border-4 border-amber-200/50">
                  <Flower2 className={`w-8 h-8 ${i % 4 === 0 ? 'text-pink-300' : i % 4 === 1 ? 'text-purple-300' : i % 4 === 2 ? 'text-amber-300' : 'text-rose-300'}`} />
                </div>
              </motion.div>
            ))}
            
            {/* Fireflies */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="w-3 h-3 bg-amber-400 rounded-full shadow-xl shadow-amber-400/80" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center space-y-12 max-w-4xl relative z-10"
          >
            <p className="text-sage-600 text-xs tracking-widest uppercase font-bold" style={{ fontFamily: 'serif' }}>
              🎉 Whimsical Garden Celebration 🎉
            </p>

            {/* Flower grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {['🌸', '✨', '🦋', '�', '💕', '🌈', '⭐', '�', '💖', '�', '🌻', '�'].map((emoji, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.3, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-50 to-sage-50 rounded-full shadow-xl flex items-center justify-center cursor-pointer border-4 border-amber-200/50"
                >
                  <span className="text-3xl sm:text-4xl">{emoji}</span>
                </motion.div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-12 py-6 bg-gradient-to-r from-sage-500 to-amber-500 text-white text-sm font-bold rounded-full shadow-xl hover:from-sage-600 hover:to-amber-600 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Share Garden Magic ✨🌸
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-sage-600 text-sm font-bold rounded-full shadow-xl border-4 border-amber-200 hover:bg-amber-50 transition-all min-h-[60px]"
                style={{ fontFamily: 'serif' }}
              >
                Save Whimsical Memories ⭐🦋
              </motion.button>
            </div>

            <p className="text-sage-600 text-xs mt-8" style={{ fontFamily: 'serif' }}>
              Made with 💖 in a garden of dreams
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="cute" />
      </div>
    </div>
  );
}
