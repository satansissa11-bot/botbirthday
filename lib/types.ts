export interface BirthdayCard {
  id: string;
  slug: string;
  recipient_name: string;
  message: string;
  template: string; // Changed from Template type to string for unlimited templates
  photos: string[];
  music_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: 'anime' | 'gaming' | 'luxury' | 'romantic' | 'dark' | 'wedding' | 'graduation' | 'kpop' | 'minecraft' | 'roblox' | 'custom';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    overlay?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  animations: {
    fadeIn?: string;
    slideUp?: string;
    bounce?: string;
    pulse?: string;
    custom?: string;
  };
  backgroundEffects?: {
    type: 'gradient' | 'image' | 'pattern' | 'particles' | 'none';
    value?: string;
    opacity?: number;
  };
  music?: {
    defaultUrl?: string;
    autoplay?: boolean;
  };
  introScreen?: {
    enabled: boolean;
    duration?: number;
    message?: string;
  };
  decorativeElements?: {
    enabled: boolean;
    type: 'stars' | 'hearts' | 'confetti' | 'baloons' | 'custom';
  };
}
