'use client';

import { useState } from 'react';
import { TemplateConfig } from '@/lib/types';
import { motion } from 'framer-motion';
import { Crown, Diamond, Zap, Sparkles, MapPin, Music, Newspaper, BookOpen, Camera, Flame, Moon, Sun, Heart, Star, Compass, Film } from 'lucide-react';

interface TemplatePreviewProps {
  templates: TemplateConfig[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export default function TemplatePreview({ templates, selectedTemplate, onTemplateSelect }: TemplatePreviewProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const renderTemplatePreview = (template: TemplateConfig) => {
    const templateId = template.id;
    
    switch (templateId) {
      case 'luxury-black-gold':
        return (
          <div className="relative w-full h-full bg-black overflow-hidden">
            <div className="absolute inset-0 border-4 border-amber-500/50 pointer-events-none" />
            <div className="absolute inset-2 border-2 border-amber-500/30 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Diamond className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-amber-400 text-xs tracking-widest uppercase">VIP</p>
              </div>
            </div>
          </div>
        );

      case 'cyberpunk':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-cyan-900 via-purple-900 to-pink-900 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="h-full w-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
              }} />
            </div>
            <div className="absolute inset-0 border-2 border-cyan-400/50 pointer-events-none" />
            <div className="absolute inset-2 border border-pink-400/30 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}>
                  NEON
                </p>
              </div>
            </div>
          </div>
        );

      case 'galaxy':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random(),
                  }}
                />
              ))}
            </div>
            <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500/30 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-blue-500/30 rounded-full blur-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-600 shadow-lg" />
            </div>
          </div>
        );

      case 'travel-journal':
        return (
          <div className="relative w-full h-full bg-amber-100 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 69, 19, 0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }} />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <path
                d="M 20 80 Q 50 50 80 20"
                stroke="#d97706"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4"
              />
            </svg>
            <div className="absolute top-4 right-4">
              <Compass className="w-6 h-6 text-amber-700" />
            </div>
            <div className="absolute bottom-4 left-4">
              <MapPin className="w-6 h-6 text-amber-700" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-amber-800 text-xs font-bold tracking-widest uppercase">Adventure</p>
            </div>
          </div>
        );

      case 'comic-book':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '4px 4px',
            }} />
            <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-white/80 border-2 border-black rounded" />
              <div className="bg-red-400/80 border-2 border-black rounded" />
              <div className="bg-yellow-400/80 border-2 border-black rounded" />
              <div className="bg-blue-400/80 border-2 border-black rounded" />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-red-500/40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 50 + 20}px`,
                    height: '2px',
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
          </div>
        );

      case 'newspaper':
        return (
          <div className="relative w-full h-full bg-stone-200 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(0deg, #000 1px, transparent 1px)',
              backgroundSize: '3px 3px',
            }} />
            <div className="absolute inset-4 p-2">
              <div className="border-b-4 border-stone-800 mb-2">
                <p className="text-stone-800 text-xs font-black tracking-wider">DAILY NEWS</p>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="h-2 bg-stone-400/50 rounded" />
                <div className="h-2 bg-stone-400/50 rounded" />
                <div className="h-2 bg-stone-400/50 rounded" />
                <div className="h-1 bg-stone-400/30 rounded col-span-2" />
                <div className="h-1 bg-stone-400/30 rounded" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-stone-800" />
            </div>
          </div>
        );

      case 'music-festival':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-black overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <div className={`w-20 h-20 ${i % 2 === 0 ? 'bg-pink-500' : 'bg-purple-500'} rounded-full blur-2xl opacity-40`} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Music className="w-8 h-8 text-pink-400 mx-auto mb-2" style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.8))' }} />
                <p className="text-pink-400 text-xs font-black tracking-widest uppercase" style={{ textShadow: '0 0 20px rgba(236, 72, 153, 0.8)' }}>
                  LIVE
                </p>
              </div>
            </div>
          </div>
        );

      case 'romantic':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-rose-200 via-pink-200 to-amber-100 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-rose-400/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-300/30 rounded-full blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </div>
        );

      case 'elegant':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-white to-amber-100 overflow-hidden">
            <div className="absolute inset-0 border-4 border-amber-400/50 pointer-events-none" />
            <div className="absolute inset-2 border-2 border-amber-400/30 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Crown className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-amber-600 text-xs tracking-widest uppercase">Royal</p>
              </div>
            </div>
          </div>
        );

      case 'dark-luxury':
        return (
          <div className="relative w-full h-full bg-black overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random(),
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-amber-400 text-xs tracking-widest uppercase">Vogue</p>
              </div>
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full blur-2xl ${i % 2 === 0 ? 'bg-blue-500/30' : 'bg-purple-500/30'}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 40 + 20}px`,
                    height: `${Math.random() * 40 + 20}px`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        );

      case 'minimalist':
        return (
          <div className="relative w-full h-full bg-stone-100 overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{
                backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '20px 100%',
              }} />
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-8 h-8 text-stone-900" />
            </div>
          </div>
        );

      case 'cute':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  <Star className={`w-4 h-4 ${i % 2 === 0 ? 'text-pink-400' : 'text-purple-400'}`} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-8 h-8 text-pink-500" />
            </div>
          </div>
        );

      case 'japanese-zen':
        return (
          <div className="relative w-full h-full bg-stone-200 overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.1) 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }} />
            <div className="absolute top-4 right-4">
              <Sun className="w-6 h-6 text-stone-600" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-stone-700 text-xs tracking-widest uppercase">Zen</p>
            </div>
          </div>
        );

      case 'vintage-film':
        return (
          <div className="relative w-full h-full bg-stone-900 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.3) 50%),
                linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.3) 50%)
              `,
              backgroundSize: '4px 4px',
            }} />
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/50" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="w-8 h-8 text-amber-500" />
            </div>
          </div>
        );

      case 'gothic':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-zinc-700 rounded-t-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Moon className="w-8 h-8 text-zinc-400" />
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Preview Templates</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTemplateSelect(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            className={`
              relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all
              ${selectedTemplate === template.id ? 'border-purple-600 ring-2 ring-purple-600 ring-offset-2' : 'border-gray-200 hover:border-purple-400'}
            `}
          >
            {/* Template Preview Card */}
            <div className="h-48 relative overflow-hidden">
              {renderTemplatePreview(template)}

              {/* Selected Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold z-20">
                  Selected
                </div>
              )}

              {/* Hover Effect */}
              {hoveredTemplate === template.id && selectedTemplate !== template.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-purple-600/20 flex items-center justify-center z-10"
                >
                  <span className="text-white font-semibold">Click to select</span>
                </motion.div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-3 bg-white">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{template.name}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
