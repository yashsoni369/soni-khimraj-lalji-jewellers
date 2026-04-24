// GTM/GA4 event tracking contract.
// Every CTA on the site pushes one of these four events to `window.dataLayer`;
// GTM-KJGS93VK has matching triggers that forward to GA4 (G-4R59PN3Y3V).

export type CtaLocation =
  | "hero_slide_1"
  | "hero_slide_2"
  | "hero_slide_3"
  | "shrestha_ratna"
  | "collections"
  | "knowledge"
  | "why_us"
  | "footer_phone_1"
  | "footer_phone_2"
  | "footer_address"
  | "header"
  | "mobile_menu"
  | "store_address"
  | "sticky_mobile_whatsapp"
  | "sticky_mobile_call"
  | "sticky_mobile_directions"
  | "gold_rate_chip";

export type LeadIntent =
  | "chat_general"
  | "private_viewing"
  | "video_request"
  | "catalogue_browse";

export type CollectionCategory =
  | "necklaces"
  | "rings"
  | "earrings"
  | "bangles"
  | "shahi_dulhan"
  | "heritage_gold"
  | "nakshatra_diamonds";

export type ContentTopic = "bis_hallmark" | "diamond_4cs";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackWhatsAppClick(args: {
  cta_location: CtaLocation;
  lead_intent: LeadIntent;
  collection_category?: CollectionCategory;
  product_name?: string;
}) {
  push({ event: "whatsapp_click", ...args });
}

export function trackPhoneCallClick(args: {
  cta_location: CtaLocation;
  phone_number: string;
}) {
  push({ event: "phone_call_click", ...args });
}

export function trackGetDirectionsClick(args: { cta_location: CtaLocation }) {
  push({ event: "get_directions_click", ...args });
}

export function trackContentInquiryClick(args: {
  cta_location: CtaLocation;
  content_topic: ContentTopic;
}) {
  push({ event: "content_inquiry_click", ...args });
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  push({
    event: "page_view",
    page_path: window.location.pathname + window.location.search + window.location.hash,
    page_location: window.location.href,
    page_title: document.title,
  });
}
