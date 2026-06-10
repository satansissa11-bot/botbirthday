'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TemplatePreviewCard from '../components/TemplatePreviewCard';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  premium: boolean;
}

const templates: Template[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    category: 'Romantic',
    description: 'Luxury love letter experience with envelope opening and heartfelt memories',
    premium: true
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Luxury',
    description: 'Royal invitation with monogram, gallery, and formal letter message',
    premium: true
  },
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    category: 'Dark',
    description: 'High fashion campaign with editorial spreads and dramatic typography',
    premium: true
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern',
    description: 'Apple keynote style with massive headlines and bento layouts',
    premium: true
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Minimal',
    description: 'Premium photography portfolio with breathing room and clean aesthetic',
    premium: true
  },
  {
    id: 'cute',
    name: 'Cute',
    category: 'Creative',
    description: 'Handmade scrapbook with stickers, polaroids, and playful composition',
    premium: true
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'Creative',
    description: 'Neon city aesthetic with futuristic UI and holographic displays',
    premium: true
  },
  {
    id: 'japanese-zen',
    name: 'Japanese Zen',
    category: 'Minimal',
    description: 'Minimal Japanese luxury with calm emotional aesthetic',
    premium: true
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    category: 'Creative',
    description: 'Old cinema aesthetic with film frames and nostalgia',
    premium: true
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: 'Creative',
    description: 'Space-inspired cinematic experience with cosmic elements',
    premium: true
  },
  {
    id: 'gothic',
    name: 'Gothic',
    category: 'Dark',
    description: 'Dark elegant Victorian style with ornate frames',
    premium: true
  },
  {
    id: 'luxury-black-gold',
    name: 'Luxury Black Gold',
    category: 'Luxury',
    description: 'Ultra-premium VIP invitation with gold accents',
    premium: true
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    category: 'Creative',
    description: 'Birthday story told like a newspaper article',
    premium: true
  },
  {
    id: 'comic-book',
    name: 'Comic Book',
    category: 'Creative',
    description: 'Birthday story as comic panels with bold graphics',
    premium: true
  },
  {
    id: 'travel-journal',
    name: 'Travel Journal',
    category: 'Creative',
    description: 'Birthday memories as a travel diary with polaroids',
    premium: true
  },
  {
    id: 'music-festival',
    name: 'Music Festival',
    category: 'Creative',
    description: 'Concert poster experience with neon vibes',
    premium: true
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
                <Link href={`/card?template=${template.id}`}>
                  <TemplatePreviewCard
                    templateId={template.id}
                    name={template.name}
                    category={template.category}
                    description={template.description}
                    premium={template.premium}
                  />
                </Link>
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
