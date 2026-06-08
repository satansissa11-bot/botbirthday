'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PhotoLayoutProps {
  photos: string[];
  coverPhoto?: string;
  layout?: 'hero' | 'bento' | 'masonry';
}

export default function PhotoLayout({ photos, coverPhoto, layout }: PhotoLayoutProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  const displayPhotos = coverPhoto ? [coverPhoto, ...photos.filter(p => p !== coverPhoto)] : photos;
  const photoCount = displayPhotos.length;

  // Auto-determine layout if not specified
  const actualLayout = layout || (photoCount === 1 ? 'hero' : photoCount <= 4 ? 'bento' : 'masonry');

  if (photoCount === 0) return null;

  if (actualLayout === 'hero') {
    return <HeroLayout photos={displayPhotos} onExpand={setExpandedImage} />;
  }

  if (actualLayout === 'bento') {
    return <BentoLayout photos={displayPhotos} onExpand={setExpandedImage} />;
  }

  if (actualLayout === 'masonry') {
    return <MasonryLayout photos={displayPhotos} onExpand={setExpandedImage} />;
  }

  return null;
}

function HeroLayout({ photos, onExpand }: { photos: string[]; onExpand: (url: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
    >
      <Image
        src={photos[0]}
        alt="Hero photo"
        fill
        className="object-cover"
        onClick={() => onExpand(photos[0])}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}

function BentoLayout({ photos, onExpand }: { photos: string[]; onExpand: (url: string) => void }) {
  const mainPhoto = photos[0];
  const sidePhotos = photos.slice(1, 4);

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {/* Main large photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-2 relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
      >
        <Image
          src={mainPhoto}
          alt="Main photo"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          onClick={() => onExpand(mainPhoto)}
        />
      </motion.div>

      {/* Side photos */}
      {sidePhotos.map((photo, index) => (
        <motion.div
          key={photo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer"
        >
          <Image
            src={photo}
            alt={`Photo ${index + 2}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            onClick={() => onExpand(photo)}
          />
        </motion.div>
      ))}
    </div>
  );
}

function MasonryLayout({ photos, onExpand }: { photos: string[]; onExpand: (url: string) => void }) {
  return (
    <div className="columns-2 md:columns-3 gap-3 md:gap-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="relative mb-3 md:mb-4 rounded-2xl overflow-hidden shadow-xl cursor-pointer break-inside-avoid"
        >
          <div className="relative" style={{ aspectRatio: 3 / 4 + Math.random() * 0.5 }}>
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              onClick={() => onExpand(photo)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
