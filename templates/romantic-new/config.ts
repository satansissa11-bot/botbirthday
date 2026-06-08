import { TemplateConfig } from '@/lib/types';

const romanticTemplate: TemplateConfig = {
  id: 'romantic',
  name: 'Romantic',
  description: 'Pink/red luxury gradient with floating hearts and glassmorphism',
  category: 'romantic',
  colors: {
    primary: '#dc2626',
    secondary: '#ec4899',
    accent: '#f43f5e',
    background: 'linear-gradient(135deg, #fce7f3 0%, #fecdd3 100%)',
    text: '#881337',
    overlay: 'rgba(255, 255, 255, 0.4)',
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Georgia, serif',
  },
  animations: {
    fadeIn: '0.8s',
    slideUp: '0.8s',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #fce7f3 0%, #fecdd3 100%)',
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

export default romanticTemplate;
