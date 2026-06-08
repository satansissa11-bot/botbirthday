import { TemplateConfig } from '@/lib/types';

const gamingTemplate: TemplateConfig = {
  id: 'gaming',
  name: 'Gaming Theme',
  description: 'Dark and sleek gaming aesthetic with neon accents',
  category: 'gaming',
  colors: {
    primary: '#00FF88',
    secondary: '#00CC6A',
    accent: '#FF0055',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    text: '#00FF88',
    overlay: 'rgba(0, 255, 136, 0.05)',
  },
  fonts: {
    heading: 'Courier New, monospace',
    body: 'Courier New, monospace',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in',
    slideUp: 'slideUp 0.4s ease-out',
    pulse: 'pulse 1.5s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 1500,
    message: '🎮 LEVEL UP! 🎮',
  },
  decorativeElements: {
    enabled: true,
    type: 'confetti',
  },
};

export default gamingTemplate;
