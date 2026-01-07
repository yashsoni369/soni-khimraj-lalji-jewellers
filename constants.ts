/// <reference types="vite/client" />
import { StoreInfo } from './types';

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

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/assest/dhulan collection.png",
    title: "The Shahi Dulhan Collection",
    subtitle: "Celebrate your eternal bond with handcrafted Kundan & Polki masterpieces.",
  },
  {
    id: 2,
    image: "/assest/hertage gold.png",
    title: "The Heritage Gold",
    subtitle: "Timeless designs that echo the grandeur of Indian royalty.",
  },
  {
    id: 3,
    image: "/assest/dimaond.png",
    title: "The Nakshatra Diamonds",
    subtitle: "Ethically sourced diamonds, masterfully cut to capture every ray of light.",
  }
];