import { TemplateConfig } from '@/lib/types';

const animeTemplate: TemplateConfig = {
  id: 'anime',
  name: 'Anime Theme',
  description: 'Colorful and playful anime-inspired design with vibrant gradients',
  category: 'anime',
  colors: {
    primary: '#FF6B9D',
    secondary: '#C44569',
    accent: '#FFD93D',
    background: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 50%, #FFD93D 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(255, 255, 255, 0.1)',
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.5s ease-in',
    slideUp: 'slideUp 0.5s ease-out',
    bounce: 'bounce 2s infinite',
    pulse: 'pulse 2s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 50%, #FFD93D 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: '✨ Happy Birthday! ✨',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default animeTemplate;
