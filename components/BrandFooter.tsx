'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BrandFooterProps {
  template: string;
}

export default function BrandFooter({ template }: BrandFooterProps) {
  const getTemplateStyle = () => {
    switch (template) {
      case 'romantic':
        return 'text-rose-400 hover:text-rose-500 hover:shadow-[0_0_20px_rgba(244,114,182,0.5)]';
      case 'cute':
        return 'text-purple-400 hover:text-purple-500 hover:bg-purple-100/50';
      case 'elegant':
        return 'text-amber-600 hover:text-amber-700 hover:shadow-[0_0_15px_rgba(217,119,6,0.3)]';
      case 'dark-luxury':
        return 'text-amber-400 hover:text-amber-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]';
      case 'modern':
        return 'text-white/70 hover:text-white/90 hover:bg-white/10 backdrop-blur-sm';
      case 'minimalist':
        return 'text-gray-400 hover:text-gray-500';
      default:
        return 'text-gray-400 hover:text-gray-500';
    }
  };

  return (
    <div className="relative z-10 pb-6 sm:pb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="text-center"
      >
        <Link
          href="https://your-domain.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block px-4 py-2 rounded-full transition-all duration-300 ${getTemplateStyle()}`}
        >
          <span className="text-xs sm:text-sm md:text-base font-medium">
            Created with ❤️ by Spectre
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
