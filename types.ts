export enum MetalType {
  GOLD = 'Gold',
  SILVER = 'Silver',
  PLATINUM = 'Platinum',
  ROSE_GOLD = 'Rose Gold'
}

export enum ProductCategory {
  RINGS = 'Rings',
  EARRINGS = 'Earrings',
  NECKLACES = 'Necklaces',
  BANGLES = 'Bangles',
  BRACELETS = 'Bracelets',
  CHAINS = 'Chains',
  PENDANTS = 'Pendants',
  NOSE_PINS = 'Nose Pins',
  MANGALSUTRA = 'Mangalsutra',
  ANKLETS = 'Anklets',
  KIDS = 'Kids',
  MEN = 'Men'
}

export enum CollectionType {
  BRIDAL = 'Bridal',
  DAILY_WEAR = 'Daily Wear',
  OFFICE_WEAR = 'Office Wear',
  ANTIQUE = 'Antique',
  TEMPLE = 'Temple',
  FESTIVE = 'Festive',
  GIFTING = 'Gifting'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  collection: CollectionType[];
  price?: number; // Optional, usually "On Request"
  images: string[];
  specs: {
    metal: MetalType;
    purity: string; // e.g. "22K", "18K"
    weightApprox: string; // e.g., "10-12g"
    stones?: string; // e.g., "Swarovski Zirconia"
  };
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  instagram: string;
}

export interface GoldRate {
  metal: string;
  purity: string;
  pricePer10g: number;
  lastUpdated: string;
}