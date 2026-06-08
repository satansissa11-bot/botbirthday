'use client';

import { useState } from 'react';
import { TemplateConfig } from '@/lib/types';
import { motion } from 'framer-motion';

interface TemplatePreviewProps {
  templates: TemplateConfig[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export default function TemplatePreview({ templates, selectedTemplate, onTemplateSelect }: TemplatePreviewProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

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
            <div
              className="h-48 relative"
              style={{
                background: template.colors.background,
                fontFamily: template.fonts.heading,
              }}
            >
              {/* Template Name Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h4 className="text-xl font-bold mb-1">{template.name}</h4>
                  <p className="text-sm opacity-90">{template.description}</p>
                </div>
              </div>

              {/* Selected Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Selected
                </div>
              )}

              {/* Hover Effect */}
              {hoveredTemplate === template.id && selectedTemplate !== template.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-purple-600/20 flex items-center justify-center"
                >
                  <span className="text-white font-semibold">Click to select</span>
                </motion.div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-3 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: template.colors.secondary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: template.colors.accent }}
                />
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
