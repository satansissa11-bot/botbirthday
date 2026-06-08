import { TemplateConfig } from '@/lib/types';

const elegantTemplate: TemplateConfig = {
  id: 'elegant',
  name: 'Elegant',
  description: 'White and gold theme with minimal luxury design',
  category: 'luxury',
  colors: {
    primary: '#d4af37',
    secondary: '#b8860b',
    accent: '#ffd700',
    background: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fef3c7 100%)',
    text: '#1a1a1a',
    overlay: 'rgba(255, 255, 255, 0.6)',
  },
  fonts: {
    heading: 'Playfair Display, Georgia, serif',
    body: 'Playfair Display, Georgia, serif',
  },
  animations: {
    fadeIn: '1s',
    slideUp: '1s',
  },
  backgroundEffects: {
    type: 'gradient',
    value: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 50%, #fef3c7 100%)',
    opacity: 0.5,
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

export default elegantTemplate;
