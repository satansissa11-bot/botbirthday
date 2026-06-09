'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, Heart, Gem, Star, Zap, MapPin, Music, Newspaper, BookOpen, Camera, Flame, Moon, Sun } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  premium: boolean;
  icon: React.ReactNode;
  gradient: string;
}

const templates: Template[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    category: 'Romantic',
    description: 'Luxury love letter experience with envelope opening and heartfelt memories',
    premium: true,
    icon: <Heart className="w-6 h-6" />,
    gradient: 'from-rose-400 to-pink-600'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Luxury',
    description: 'Royal invitation with monogram, gallery, and formal letter message',
    premium: true,
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-amber-400 to-amber-600'
  },
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    category: 'Dark',
    description: 'High fashion campaign with editorial spreads and dramatic typography',
    premium: true,
    icon: <Gem className="w-6 h-6" />,
    gradient: 'from-gray-800 to-black'
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern',
    description: 'Apple keynote style with massive headlines and bento layouts',
    premium: true,
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-gray-900 to-black'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Minimal',
    description: 'Premium photography portfolio with breathing room and clean aesthetic',
    premium: true,
    icon: <Camera className="w-6 h-6" />,
    gradient: 'from-stone-200 to-stone-400'
  },
  {
    id: 'cute',
    name: 'Cute',
    category: 'Creative',
    description: 'Handmade scrapbook with stickers, polaroids, and playful composition',
    premium: true,
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-pink-300 to-pink-500'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Creative',
    description: 'Neon city aesthetic with futuristic UI and holographic displays',
    premium: true,
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-cyan-400 to-purple-600'
  },
  {
    id: 'japanese-zen',
    name: 'Japanese Zen',
    category: 'Minimal',
    description: 'Minimal Japanese luxury with calm emotional aesthetic',
    premium: true,
    icon: <Sun className="w-6 h-6" />,
    gradient: 'from-stone-300 to-stone-500'
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    category: 'Creative',
    description: 'Old cinema aesthetic with film frames and nostalgia',
    premium: true,
    icon: <Camera className="w-6 h-6" />,
    gradient: 'from-amber-600 to-amber-800'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: 'Creative',
    description: 'Space-inspired cinematic experience with cosmic elements',
    premium: true,
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-purple-600 to-blue-900'
  },
  {
    id: 'gothic',
    name: 'Gothic',
    category: 'Dark',
    description: 'Dark elegant Victorian style with ornate frames',
    premium: true,
    icon: <Moon className="w-6 h-6" />,
    gradient: 'from-zinc-800 to-black'
  },
  {
    id: 'luxury-black-gold',
    name: 'Luxury Black Gold',
    category: 'Luxury',
    description: 'Ultra-premium VIP invitation with gold accents',
    premium: true,
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-black to-amber-900'
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    category: 'Creative',
    description: 'Birthday story told like a newspaper article',
    premium: true,
    icon: <Newspaper className="w-6 h-6" />,
    gradient: 'from-stone-400 to-stone-600'
  },
  {
    id: 'comic-book',
    name: 'Comic Book',
    category: 'Creative',
    description: 'Birthday story as comic panels with bold graphics',
    premium: true,
    icon: <BookOpen className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-red-500'
  },
  {
    id: 'travel-journal',
    name: 'Travel Journal',
    category: 'Creative',
    description: 'Birthday memories as a travel diary with polaroids',
    premium: true,
    icon: <MapPin className="w-6 h-6" />,
    gradient: 'from-amber-200 to-amber-600'
  },
  {
    id: 'music-festival',
    name: 'Music Festival',
    category: 'Creative',
    description: 'Concert poster experience with neon vibes',
    premium: true,
    icon: <Music className="w-6 h-6" />,
    gradient: 'from-purple-600 to-pink-600'
  }
];

const categories = ['All', 'Romantic', 'Luxury', 'Modern', 'Creative', 'Dark', 'Minimal'];

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Template Showcase
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our premium collection of 16 unique birthday card templates
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                  {/* Preview Card */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${template.gradient} p-8 flex items-center justify-center`}>
                    {/* Template Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/90"
                    >
                      {template.icon}
                    </motion.div>
                    
                    {/* Premium Badge */}
                    {template.premium && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-500" />
                          <span className="text-xs font-semibold text-gray-900">Premium</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-3">
                      <span className="text-xs font-medium text-gray-600">{template.category}</span>
                    </div>

                    {/* Template Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {template.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Preview Button */}
                    <Link
                      href={`/card?template=${template.id}`}
                      className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No templates found in this category</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            Designed by Spectre • Premium Birthday Card Templates
          </p>
        </div>
      </div>
    </div>
  );
}
