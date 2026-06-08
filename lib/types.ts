export interface BirthdayCard {
  id: string;
  slug: string;
  recipient_name: string;
  sender_name?: string;
  message: string;
  template: string; // Changed from Template type to string for unlimited templates
  photos: string[];
  cover_photo?: string;
  music_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CardAnalytics {
  id: string;
  card_id: string;
  total_views: number;
  unique_visitors: number;
  last_viewed: string;
  created_at: string;
  updated_at: string;
}

export interface CardView {
  id: string;
  card_id: string;
  visitor_id: string;
  device_type: 'mobile' | 'desktop' | 'tablet';
  viewed_at: string;
}

export interface AnalyticsStats {
  totalCards: number;
  totalViews: number;
  totalUniqueVisitors: number;
  averageViewsPerCard: number;
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
