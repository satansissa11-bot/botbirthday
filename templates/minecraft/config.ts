import { TemplateConfig } from '@/lib/types';

const minecraftTemplate: TemplateConfig = {
  id: 'minecraft',
  name: 'Minecraft Theme',
  description: 'Pixelated Minecraft-inspired design',
  category: 'minecraft',
  colors: {
    primary: '#5CD65C',
    secondary: '#3D3D3D',
    accent: '#FF5555',
    background: 'linear-gradient(135deg, #5CD65C 0%, #3D3D3D 50%, #5CD65C 100%)',
    text: '#FFFFFF',
    overlay: 'rgba(92, 214, 92, 0.1)',
  },
  fonts: {
    heading: 'Courier New, monospace',
    body: 'Courier New, monospace',
  },
  animations: {
    fadeIn: 'fadeIn 0.3s ease-in',
    slideUp: 'slideUp 0.3s ease-out',
    pulse: 'pulse 2s infinite',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #5CD65C 0%, #3D3D3D 50%, #5CD65C 100%)',
    opacity: 1,
  },
  music: {
    autoplay: false,
  },
  introScreen: {
    enabled: true,
    duration: 2000,
    message: '⛏️ Happy Birthday! ⛏️',
  },
  decorativeElements: {
    enabled: true,
    type: 'stars',
  },
};

export default minecraftTemplate;
