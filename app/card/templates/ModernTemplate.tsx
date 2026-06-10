'use client';

import { useState, useEffect } from 'react';
import { BirthdayCard } from '@/lib/types';
import { getTemplate } from '@/lib/templateRegistry';
import '@/templates';
import MusicPlayer from '@/components/MusicPlayer';
import Confetti from '@/components/Confetti';
import BrandFooter from '@/components/BrandFooter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Share2, Download, Zap } from 'lucide-react';
import Image from 'next/image';

interface ModernTemplateProps {
  card: BirthdayCard;
}

export default function ModernTemplate({ card }: ModernTemplateProps) {
  const template = getTemplate('modern');
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollYProgress } = useScroll();

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

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Confetti */}
      {showConfetti && <Confetti />}
      
      {/* Music Player */}
      <MusicPlayer musicUrl={card.music_url || template?.music?.defaultUrl} />

      {/* Fixed progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
        <motion.div 
          className="h-full bg-blue-500"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* SECTION 1: Modern Tech Hero with Dynamic Elements */}
        <div className="h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated mesh gradient */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 via-pink-900 to-orange-900"
            style={{ backgroundSize: '300% 300%' }}
          />
          
          {/* Dynamic grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 400 + 200}px`,
                  height: `${Math.random() * 400 + 200}px`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                <div className={`w-full h-full ${i % 2 === 0 ? 'bg-blue-500/30' : 'bg-purple-500/30'}`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{ scale, rotateX, opacity }}
            className="text-center max-w-7xl mx-auto px-8 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p className="text-cyan-400 text-lg md:text-xl font-semibold tracking-[0.3em] uppercase mb-6">
                Welcome to
              </p>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter"
              style={{ 
                fontFamily: 'var(--font-inter)',
                letterSpacing: '-0.08em',
                background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {card.recipient_name}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400" />
              <Zap className="w-6 h-6 text-cyan-400" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-2xl md:text-3xl font-light text-gray-300 mt-8"
            >
              The Future is Here
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400 text-sm"
              >
                Scroll to explore ↓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION 2: Modern Bento Grid with Glassmorphism */}
        <div className="min-h-screen bg-black p-8 md:p-16 relative">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Showcase
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight">
                Built for<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Innovation
                </span>
              </h2>
            </motion.div>

            {/* Enhanced bento grid with glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {allPhotos.slice(0, 6).map((photo, index) => {
                const isLarge = index === 0;
                const isWide = index === 1 || index === 2;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`
                      relative overflow-hidden rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-white/10
                      ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                      ${isWide ? 'md:col-span-2' : ''}
                    `}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                  >
                    <div className={`
                      relative w-full
                      ${isLarge ? 'aspect-[16/9]' : isWide ? 'aspect-[21/9]' : 'aspect-square'}
                    `}>
                      <Image
                        src={photo}
                        alt={`Feature ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Glassmorphism label */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                          <p className="text-white text-sm font-semibold">
                            Moment {index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* SECTION 3: Kinetic Typography with Dynamic Background */}
        <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
          {/* Animated geometric shapes */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-500/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-200px' }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-6xl mx-auto px-8 relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-cyan-400 text-xl font-semibold tracking-[0.3em] uppercase mb-8"
            >
              Celebrate
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter"
              style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.08em' }}
            >
              HAPPY
            </motion.h2>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.08em' }}
            >
              BIRTHDAY
            </motion.h2>
          </motion.div>
        </div>

        {/* SECTION 4: Modern Split Screen with Glassmorphism */}
        <div className="min-h-screen bg-black flex">
          {/* Left side - typography */}
          <div className="w-1/2 flex items-center justify-center p-8 md:p-16 bg-gradient-to-br from-gray-900 to-black relative">
            {/* Animated pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(45deg, rgba(34, 211, 238, 0.1) 25%, transparent 25%, transparent 50%, rgba(34, 211, 238, 0.1) 50%, rgba(34, 211, 238, 0.1) 75%, transparent 75%, transparent)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-xl relative z-10"
            >
              <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
                Message
              </p>
              
              <p 
                className="text-3xl md:text-4xl lg:text-5xl leading-relaxed font-light"
                style={{ fontFamily: 'var(--font-inter)', lineHeight: '1.8' }}
              >
                {card.message}
              </p>
              
              {card.sender_name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <p className="text-gray-400 text-lg">
                    — {card.sender_name}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Right side - featured photo with glassmorphism */}
          {allPhotos.length > 0 && (
            <div className="w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="h-full relative"
              >
                <Image
                  src={allPhotos[0]}
                  alt="Featured"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm" />
              </motion.div>
            </div>
          )}
        </div>

        {/* SECTION 5: Modern Tech Finale with Celebration */}
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
          {/* Celebration particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -1000],
                  opacity: [1, 0],
                  scale: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                <div className={`w-2 h-2 ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'} rounded-full`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto px-8 relative z-10"
          >
            {/* Success checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <motion.div
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-16 h-16"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-4">
              CELEBRATION
            </h2>
            
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                COMPLETE
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-12">
              {card.recipient_name}'s special day
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              {[
                { label: 'MEMORIES', value: '∞' },
                { label: 'LOVE', value: '100%' },
                { label: 'JOY', value: 'MAX' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <p className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-8 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-lg font-bold rounded-full hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 transition-all min-h-[56px]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Share Celebration
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-all min-h-[56px]"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Save Memory
              </motion.button>
            </div>

            <p className="text-gray-500 text-sm mt-16">
              Designed by Spectre
            </p>
          </motion.div>
        </div>

        {/* Brand Footer */}
        <BrandFooter template="modern" />
      </div>
    </div>
  );
}
