import { STORE_INFO } from '../constants';

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_INFO.whatsapp.replace(/\+/g, '')}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const createEnquiryMessage = (customMessage?: string) => {
  if (customMessage) {
    return `Hello ${STORE_INFO.name}, ${customMessage}`;
  }
  return `Hello ${STORE_INFO.name}, I have an enquiry regarding your jewellery collection.`;
};