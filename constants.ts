/// <reference types="vite/client" />
import { Product, ProductCategory, CollectionType, MetalType, StoreInfo, GoldRate } from './types';

export const STORE_INFO: StoreInfo = {
  name: "SONI KHIMRAJ LALJI JEWELLERS",
  address: "Shop No 9, Dr. Lakhani Estate, Jivdaya Lane, Ghatkopar West, Mumbai, Maharashtra 400086",
  phone: import.meta.env.VITE_STORE_PHONE || "+91-98765-43210",
  whatsapp: import.meta.env.VITE_STORE_WHATSAPP || "+919876543210",
  email: import.meta.env.VITE_STORE_EMAIL || "contact@skljewellers.com",
  hours: "Mon–Sun 10:30 AM – 8:30 PM",
  mapEmbedUrl: "https://maps.app.goo.gl/7KYPvULTMaccjDjJA",
  instagram: "https://www.instagram.com/sonikhimrajlalji/"
};

export const INITIAL_GOLD_RATES: GoldRate[] = [
  { metal: 'Gold', purity: '24K (999)', pricePer10g: 74200, lastUpdated: new Date().toLocaleDateString() },
  { metal: 'Gold', purity: '22K (916)', pricePer10g: 68150, lastUpdated: new Date().toLocaleDateString() },
  { metal: 'Silver', purity: '999', pricePer10g: 910, lastUpdated: new Date().toLocaleDateString() },
];

// Reliable Indian Jewellery Context Images
const IMAGES = [
  "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop", // Heavy Gold Necklace
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop", // Temple Jewellery
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop", // Gold Bangles
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop", // Earrings
  "https://images.unsplash.com/photo-1601121141461-9d660d601826?q=80&w=1000&auto=format&fit=crop", // Heavy Set
  "https://images.unsplash.com/photo-1626156976695-172c9167b003?q=80&w=1000&auto=format&fit=crop", // Rings
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop", // General Gold
  "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000&auto=format&fit=crop", // Mangalsutra Style
];

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=55&w=1200&auto=format&fm=avif&fit=crop",
    title: "The Shahi Dulhan Collection",
    subtitle: "Celebrate your eternal bond with handcrafted Kundan & Polki masterpieces.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554047310-ab6170fc7b10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Heritage Gold",
    subtitle: "Timeless designs that echo the grandeur of Indian royalty.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1638517747460-4d9e114ab3e7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Nakshatra Diamonds",
    subtitle: "Ethically sourced diamonds, masterfully cut to capture every ray of light.",
  }
];

export const KNOWLEDGE_ARTICLES = [
  {
    id: 1,
    title: "Understanding Purity: BIS Hallmark",
    excerpt: "Why the HUID code matters for your gold investment. Learn how to read the laser inscriptions on your jewellery.",
    icon: "ShieldCheck"
  },
  {
    id: 2,
    title: "The 4Cs of Diamonds",
    excerpt: "Cut, Clarity, Color, and Carat. A masterclass in selecting the perfect solitaire for your engagement ring.",
    icon: "Gem"
  },
  {
    id: 3,
    title: "Polki vs. Kundan",
    excerpt: "Demystifying traditional Indian jewellery techniques. Understand the difference between uncut diamonds and glasswork.",
    icon: "Award"
  }
];

export const OCCASIONS = [
  { name: "Wedding", img: "https://images.unsplash.com/photo-1594314896614-725096bca63c?w=600" },
  { name: "Daily Wear", img: "https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=600&auto=format&fit=crop" },
  { name: "Office Wear", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600" },
  { name: "Gifting", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600" },
];

// Product-specific web images mapping
const PRODUCT_IMAGES: Record<string, string[]> = {
  "Royal Polki Set": [
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop"
  ],
  "Antique Temple Necklace": [
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601121141461-9d660d601826?q=80&w=1000&auto=format&fit=crop"
  ],
  "Kundan Choker": [
    "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop"
  ],
  "Peacock Jhumkas": [
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
  ],
  "Traditional Mangalsutra": [
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
  ],
  "Diamond Solitaire Ring": [
    "https://images.unsplash.com/photo-1626156976695-172c9167b003?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
  ],
  "Gold Kangan Pair": [
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601121141461-9d660d601826?q=80&w=1000&auto=format&fit=crop"
  ],
  "Lakshmi Coin Pendant": [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000&auto=format&fit=crop"
  ]
};

// Helper to generate products
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = Object.values(ProductCategory);
  const collections = Object.values(CollectionType);

  for (let i = 1; i <= 30; i++) {
    const cat = categories[i % categories.length];
    const col = collections[i % collections.length];

    // Custom names for Indian feel
    const names = [
      "Royal Polki Set", "Antique Temple Necklace", "Kundan Choker",
      "Peacock Jhumkas", "Traditional Mangalsutra", "Diamond Solitaire Ring",
      "Gold Kangan Pair", "Lakshmi Coin Pendant"
    ];

    const productName = `${names[i % names.length]}`;
    // Use product-specific images if available, otherwise fallback to IMAGES array
    const productImages = PRODUCT_IMAGES[productName] || [IMAGES[i % IMAGES.length], IMAGES[(i + 1) % IMAGES.length]];

    products.push({
      id: `prod-${i}`,
      name: productName,
      category: cat,
      collection: [col, i % 3 === 0 ? CollectionType.BRIDAL : CollectionType.FESTIVE],
      images: productImages,
      specs: {
        metal: i % 4 === 0 ? MetalType.PLATINUM : MetalType.GOLD,
        purity: i % 4 === 0 ? '950' : '22K (916)',
        weightApprox: `${(Math.random() * 20 + 8).toFixed(2)}g`,
        stones: i % 2 === 0 ? 'Uncut Diamonds (Polki)' : 'Ruby & Emerald'
      },
      isNew: i < 5,
      isFeatured: i > 25
    });
  }
  return products;
};

export const MOCK_PRODUCTS = generateProducts();

export const TESTIMONIALS = [
  { name: "Meera Patel", text: "I bought my daughter's wedding jewellery from here. The antique designs are so authentic and the staff is very patient. Best jewellers in Ghatkopar!", rating: 5 },
  { name: "Rajesh Shah", text: "Trusted family jewellers for over 15 years. Their transparency in gold purity and great customer service makes them special.", rating: 5 },
  { name: "Sneha Gupta", text: "Their lightweight collection is perfect for office wear. Loved the new diamond earring designs. Highly recommend Soni Khimraj Lalji!", rating: 5 },
];

export const FAQS = [
  { question: "Is your jewellery Hallmark certified?", answer: "Yes, every piece of gold jewellery sold at Soni Khimraj Lalji Jewellers is 100% BIS Hallmarked (HUID) for purity assurance." },
  { question: "Do you make custom Mangalsutras?", answer: "Yes! We specialize in custom Mangalsutra designs. You can choose the chain length, pendant style, and diamond quality." },
  { question: "What is your gold exchange rate?", answer: "We offer the current day's market rate for old gold exchange. Deductions are minimal if you possess the original purchase bill." },
];