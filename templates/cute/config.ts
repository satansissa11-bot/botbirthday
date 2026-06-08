import { TemplateConfig } from '@/lib/types';

const cuteTemplate: TemplateConfig = {
  id: 'cute',
  name: 'Cute',
  description: 'Soft pastel colors with rounded cards and playful decorations',
  category: 'romantic',
  colors: {
    primary: '#ec4899',
    secondary: '#a855f7',
    accent: '#fbbf24',
    background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%)',
    text: '#6b21a8',
    overlay: 'rgba(255, 255, 255, 0.5)',
  },
  fonts: {
    heading: 'Comic Sans MS, cursive, sans-serif',
    body: 'Comic Sans MS, cursive, sans-serif',
  },
  animations: {
    fadeIn: '0.6s',
    bounce: '0.5s',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #dbeafe 100%)',
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
    enabled: true,
    type: 'hearts',
  },
};

export default cuteTemplate;
