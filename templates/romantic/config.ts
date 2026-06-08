import { TemplateConfig } from '@/lib/types';

const romanticTemplate: TemplateConfig = {
  id: 'romantic',
  name: 'Romantic Theme',
  description: 'Soft pink and red romantic design',
  category: 'romantic',
  colors: {
    primary: '#FF69B4',
    secondary: '#FF1493',
    accent: '#FFB6C1',
    background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #FFB6C1 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.15)',
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Georgia, serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.6s ease-in',
    slideUp: 'slideUp 0.5s ease-out',
    pulse: 'pulse 2.5s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #FFB6C1 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: '💕 Happy Birthday 💕',
  },
  decorativeElements: {
    enabled: true,
    type: 'hearts',
  },
};

export default romanticTemplate;
