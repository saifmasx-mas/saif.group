export type Language = 'ar' | 'en' | 'tr';

export interface ServiceItem {
  id: string;
  titleKey: string;
  shortDescKey: string;
  fullDescKey: string;
  priceKey: string;
  image: string;
  featuresKey: string;
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  titleKey: string;
  category: 'painting' | 'ceilings' | 'decor';
  location: string;
  image: string;
  descriptionKey: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isAudioPlaying?: boolean;
}
