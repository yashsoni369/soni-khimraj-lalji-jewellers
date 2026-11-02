/// <reference types="vite/client" />
import { StoreInfo } from './types';

// NAP (name / address / phone) must match Google Business Profile and the JSON-LD in index.html exactly.
export const STORE_INFO: StoreInfo = {
  name: "Soni Khimraj Lalji Jewellers",
  streetAddress: "Shop No 9, Dr. Lakhani Estate, Jivdaya Lane",
  locality: "Ghatkopar West, Mumbai",
  region: "Maharashtra",
  postalCode: "400086",
  address: "Shop No 9, Dr. Lakhani Estate, Jivdaya Lane, Ghatkopar West, Mumbai, Maharashtra 400086",
  phone: import.meta.env.VITE_STORE_PHONE || "+919136175991",
  phoneDisplay: "+91 91361 75991",
  whatsapp: import.meta.env.VITE_STORE_WHATSAPP || "+919136175991",
  hours: "Mon–Sun 10 AM – 9:30 PM",
  mapEmbedUrl: "https://maps.app.goo.gl/7KYPvULTMaccjDjJA",
  mapIframeSrc: "https://maps.google.com/maps?q=Soni%20Khimraj%20Lalji%20Jewellers%2C%20Jivdaya%20Lane%2C%20Ghatkopar%20West%2C%20Mumbai%20400086&z=17&output=embed",
  instagram: "https://www.instagram.com/sonikhimrajlalji/",
  facebook: "https://www.facebook.com/102854275017661/",
  // TODO(owner): paste the review link from Google Business Profile → Read reviews → Get more reviews.
  // Review links stay hidden while this is empty.
  reviewUrl: "",
  vcardUrl: "/soni-khimraj-lalji-jewellers.vcf",
};

export const NEARBY_AREAS = [
  "Ghatkopar West",
  "Ghatkopar East",
  "Vidyavihar",
  "Asalpha",
  "Kurla",
  "Vikhroli",
  "Chembur",
];

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/images/bridal-pearl-necklace-ghatkopar.webp",
    alt: "Pearl necklace in a red jewellery box – bridal jewellery at Soni Khimraj Lalji Jewellers, Ghatkopar",
    title: "The Shahi Dulhan Collection",
    subtitle: "Bridal sets, mangalsutras and Kundan & Polki jewellery for your big day.",
  },
  {
    id: 2,
    image: "/images/gold-wedding-bands-ghatkopar.webp",
    alt: "Pair of gold wedding bands – BIS hallmarked gold jewellery in Ghatkopar West",
    title: "The Heritage Gold",
    subtitle: "BIS hallmarked 22K (916) gold jewellery, from daily wear to heirloom pieces.",
  },
  {
    id: 3,
    image: "/images/diamond-jewellery-mumbai.webp",
    alt: "Brilliant-cut diamond – diamond jewellery in Ghatkopar, Mumbai",
    title: "The Nakshatra Diamonds",
    subtitle: "Diamond rings, earrings and pendants, set in hallmarked gold.",
  }
];

export const SERVICES = [
  {
    key: 'gold',
    title: '22K & 18K Gold Jewellery',
    text: 'BIS hallmarked 916 gold necklaces, chains, bangles and earrings, each with its HUID code.',
  },
  {
    key: 'diamond',
    title: 'Diamond Jewellery',
    text: 'Diamond rings, earrings, pendants and bracelets for engagements and everyday sparkle.',
  },
  {
    key: 'silver',
    title: 'Silver Jewellery & Articles',
    text: 'Silver payal, chains, rings, gift articles and pooja items.',
  },
  {
    key: 'bridal',
    title: 'Bridal Kundan & Polki',
    text: 'Complete bridal sets, chokers and haars for weddings and family functions.',
  },
  {
    key: 'mangalsutra',
    title: 'Mangalsutra',
    text: 'Traditional and modern mangalsutra designs in 22K and 18K gold.',
  },
  {
    key: 'custom',
    title: 'Custom & Made-to-Order',
    text: 'Bring your idea or photo and our karigars will make it for you.',
  },
  {
    key: 'exchange',
    title: 'Old Gold Exchange',
    text: 'Exchange your old gold for new jewellery, with purity tested in front of you.',
  },
] as const;

export const FAQS = [
  {
    q: 'Where is Soni Khimraj Lalji Jewellers located?',
    a: 'We are at Shop No 9, Dr. Lakhani Estate, Jivdaya Lane, Ghatkopar West, Mumbai 400086 – a short walk from Ghatkopar railway station (West).',
  },
  {
    q: 'What are your shop timings?',
    a: 'We are open every day, Monday to Sunday, from 10 AM to 9:30 PM.',
  },
  {
    q: 'Is your gold jewellery BIS hallmarked?',
    a: 'Yes. Every gold piece we sell carries the BIS hallmark with a unique 6-digit HUID code, so you can verify its purity on the BIS Care app.',
  },
  {
    q: 'How can I get today’s gold rate in Ghatkopar?',
    a: 'Gold rates change every day. Send us a WhatsApp message on +91 91361 75991 and we will share today’s 22K (916), 18K and 24K rate right away.',
  },
  {
    q: 'Do you sell silver jewellery?',
    a: 'Yes, we have silver jewellery, gift articles and pooja items along with our gold and diamond collections.',
  },
  {
    q: 'Can I exchange my old gold?',
    a: 'Yes. We test the purity of your old gold in front of you and give you its value against new jewellery.',
  },
  {
    q: 'Do you make custom jewellery?',
    a: 'Yes. Share a design, photo or idea and our karigars will make it to order – bridal sets, mangalsutras, rings and more.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'Families visit us from Ghatkopar West and East, Vidyavihar, Asalpha, Kurla, Vikhroli, Chembur and across Mumbai.',
  },
];
