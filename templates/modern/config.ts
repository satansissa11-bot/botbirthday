import { TemplateConfig } from '@/lib/types';

const modernTemplate: TemplateConfig = {
  id: 'modern',
  name: 'Modern',
  description: 'Modern gradient backgrounds with glassmorphism effects',
  category: 'custom',
  colors: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a855f7',
    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6366f1 100%)',
    text: '#ffffff',
    overlay: 'rgba(255, 255, 255, 0.15)',
  },
  fonts: {
    heading: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  animations: {
    fadeIn: '0.8s',
    slideUp: '0.8s',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #6366f1 100%)',
    opacity: 1,
  },
  music: {
    defaultUrl: '',
    autoplay: true,
  },
  introScreen: {
    enabled: false,
  },
  decorativeElements: {
    enabled: false,
    type: 'stars',
  },
};

export default modernTemplate;
