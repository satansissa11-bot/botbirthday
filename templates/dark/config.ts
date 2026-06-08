import { TemplateConfig } from '@/lib/types';

const darkTemplate: TemplateConfig = {
  id: 'dark',
  name: 'Dark Theme',
  description: 'Modern dark mode design with purple accents',
  category: 'dark',
  colors: {
    primary: '#6366F1',
    secondary: '#4F46E5',
    accent: '#8B5CF6',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
    text: '#E5E7EB',
    overlay: 'rgba(99, 102, 241, 0.05)',
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  animations: {
    fadeIn: 'fadeIn 0.4s ease-in',
    slideUp: 'slideUp 0.4s ease-out',
    pulse: 'pulse 2s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 1500,
    message: '🌙 Happy Birthday 🌙',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default darkTemplate;
