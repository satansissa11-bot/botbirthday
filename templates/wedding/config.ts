import { TemplateConfig } from '@/lib/types';

const weddingTemplate: TemplateConfig = {
  id: 'wedding',
  name: 'Wedding Theme',
  description: 'Elegant wedding celebration theme',
  category: 'wedding',
  colors: {
    primary: '#E8D5B7',
    secondary: '#D4AF37',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #E8D5B7 0%, #D4AF37 50%, #E8D5B7 100%)',
    text: '#4A4A4A',
    overlay: 'rgba(212, 175, 55, 0.1)',
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.8s ease-in',
    slideUp: 'slideUp 0.6s ease-out',
    pulse: 'pulse 3s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #E8D5B7 0%, #D4AF37 50%, #E8D5B7 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 3000,
    message: '💒 Happy Birthday! 💒',
  },
  decorativeElements: {
    enabled: true,
    type: 'hearts',
  },
};

export default weddingTemplate;
