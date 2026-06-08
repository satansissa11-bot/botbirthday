import { TemplateConfig } from '@/lib/types';

const luxuryTemplate: TemplateConfig = {
  id: 'luxury',
  name: 'Luxury Theme',
  description: 'Elegant gold and black premium design',
  category: 'luxury',
  colors: {
    primary: '#D4AF37',
    secondary: '#B8860B',
    accent: '#FFD700',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    text: '#D4AF37',
    overlay: 'rgba(212, 175, 55, 0.05)',
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Georgia, serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.8s ease-in',
    slideUp: 'slideUp 0.6s ease-out',
    pulse: 'pulse 3s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2500,
    message: '👑 Happy Birthday 👑',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default luxuryTemplate;
