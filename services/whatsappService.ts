import { STORE_INFO } from '../constants';

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_INFO.whatsapp.replace(/\+/g, '')}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const createEnquiryMessage = (productName?: string, id?: string) => {
  if (productName && id) {
    return `Hello ${STORE_INFO.name}, I am interested in knowing more about: ${productName} (ID: ${id}). Please share details.`;
  }
  return `Hello ${STORE_INFO.name}, I have an enquiry regarding your jewellery collection.`;
};

export const createAppointmentMessage = (date: string, time: string, type: string) => {
  return `Hello, I would like to book an appointment.\nDate: ${date}\nTime: ${time}\nInterested in: ${type}`;
};