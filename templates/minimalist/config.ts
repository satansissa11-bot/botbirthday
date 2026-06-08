import { TemplateConfig } from '@/lib/types';

const minimalistTemplate: TemplateConfig = {
  id: 'minimalist',
  name: 'Minimalist',
  description: 'Clean white design with Apple-style aesthetics',
  category: 'custom',
  colors: {
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    background: '#ffffff',
    text: '#1a1a1a',
    overlay: 'rgba(255, 255, 255, 0.8)',
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  animations: {
    fadeIn: '0.6s',
    slideUp: '0.6s',
  },
  backgroundEffects: {
    type: 'none',
    value: '#ffffff',
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
    enabled: false,
    type: 'stars',
  },
};

export default minimalistTemplate;
