import { TemplateConfig } from '@/lib/types';

const narutoTemplate: TemplateConfig = {
  id: 'naruto',
  name: 'Naruto Theme',
  description: 'Inspired by the anime Naruto with orange and black colors',
  category: 'anime',
  colors: {
    primary: '#FF6600',
    secondary: '#FF8C00',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #FF6600 0%, #1a1a1a 50%, #FF8C00 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(255, 102, 0, 0.1)',
  },
  fonts: {
    heading: 'Arial Black, sans-serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.4s ease-in',
    slideUp: 'slideUp 0.4s ease-out',
    pulse: 'pulse 1.5s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF6600 0%, #1a1a1a 50%, #FF8C00 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2500,
    message: '🍥 Believe It! Happy Birthday! 🍥',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default narutoTemplate;
