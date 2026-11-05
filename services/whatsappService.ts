import { STORE_INFO } from '../constants';

const GREETING = 'Namaste Mr. Soni';
// Lets the shop label website enquiries in WhatsApp Business.
const SOURCE_TAG = '\n\n(sent from website)';

/** wa.me link with a pre-filled message. Used as a real <a href>, so long-press / new tab work. */
export const whatsappUrl = (message: string) =>
  `https://wa.me/${STORE_INFO.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(message + SOURCE_TAG)}`;

export const createEnquiryMessage = (customMessage?: string) => {
  if (customMessage) {
    return `${GREETING}, ${customMessage}`;
  }
  return `${GREETING}, I'd love to know more about your collections at Soni Khimraj Lalji Jewellers.`;
};

export const createSlideMessage = (slideTitle: string) =>
  `${GREETING}, I saw "${slideTitle}" on your website and would love to know more.`;

export const createSpotlightMessage = (pieceName: string) =>
  `${GREETING}, I'd like to reserve a private viewing for the ${pieceName}. When would be a good time to visit?`;

export const createVideoRequestMessage = (pieceName: string) =>
  `${GREETING}, could you please share a video of the ${pieceName} on WhatsApp?`;

export const createCategoryMessage = (category: string) =>
  `${GREETING}, please share your latest ${category} catalogue on WhatsApp.`;

export const createKnowledgeMessage = (topic: string) =>
  `${GREETING}, could you help me understand ${topic}?`;

export const createGoldRateMessage = () =>
  `${GREETING}, could you share today's 22K and 18K gold rate at your shop?`;

export const createHelloMessage = () =>
  `${GREETING}, I came across your store online and wanted to say hello.`;

export const createServiceMessage = (service: string) =>
  `${GREETING}, I'd like to know more about ${service} at your Ghatkopar store.`;

export const createOldGoldValuationMessage = () =>
  `${GREETING}, I'd like to get my old gold valued for exchange. Approximate weight: ___ g. I can share a photo here.`;

export const createSchemeMessage = () =>
  `${GREETING}, please share the details of the Gold Dream Scheme.`;

export const createAppointmentMessage = (purpose: string, day: string, time: string) =>
  `${GREETING}, I'd like to book a visit to your Ghatkopar West shop.\nPurpose: ${purpose}\nDay: ${day}\nTime: ${time}\nPlease confirm if this works.`;
