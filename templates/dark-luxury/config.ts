import { TemplateConfig } from '@/lib/types';

const darkLuxuryTemplate: TemplateConfig = {
  id: 'dark-luxury',
  name: 'Dark Luxury',
  description: 'Black background with gold accents and premium animations',
  category: 'dark',
  colors: {
    primary: '#ffd700',
    secondary: '#b8860b',
    accent: '#daa520',
    background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
    text: '#ffd700',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  fonts: {
    heading: 'Cinzel, Georgia, serif',
    body: 'Cinzel, Georgia, serif',
  },
  animations: {
    fadeIn: '1.2s',
    slideUp: '1.2s',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
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
    type: 'stars',
  },
};

export default darkLuxuryTemplate;
