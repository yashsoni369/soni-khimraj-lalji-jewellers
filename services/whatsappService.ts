import { STORE_INFO } from '../constants';

const GREETING = 'Namaste Mr. Soni 🙏';

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_INFO.whatsapp.replace(/\+/g, '')}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

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
  `${GREETING}, could you share today's 22K gold rate?`;

export const createVisitMessage = () =>
  `${GREETING}, I'd like to visit your Ghatkopar store. What would be a good time?`;

export const createHelloMessage = () =>
  `${GREETING}, I came across your store online and wanted to say hello.`;
