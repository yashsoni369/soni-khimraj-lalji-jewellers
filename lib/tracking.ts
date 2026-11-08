// GA4 event tracking contract (G-4R59PN3Y3V, loaded in app/root.tsx).
// Every CTA sends one of these events straight to GA4 with gtag('event'); there is
// no Tag Manager. Each event also carries `page_type`. Page views come from
// gtag('config') + GA4 enhanced measurement (history changes), so we do not send
// page_view ourselves. Event list and GA4 setup: docs/ga4-tracking.md.
import { pageTypeFor } from './routes';

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
  | "footer_contact"
  | "header"
  | "mobile_menu"
  | "store_address"
  | "sticky_mobile_whatsapp"
  | "sticky_mobile_call"
  | "sticky_mobile_directions"
  | "gold_rate_chip"
  | "services"
  | "gold_rate_section"
  | "faq"
  | "page_hero"
  | "page_cta"
  | "page_faq";

export type LeadIntent =
  | "chat_general"
  | "private_viewing"
  | "video_request"
  | "catalogue_browse"
  | "gold_rate"
  | "old_gold_valuation"
  | "book_visit"
  | "silver_catalogue"
  | "scheme_enquiry";

export type CollectionCategory =
  | "necklaces"
  | "rings"
  | "earrings"
  | "bangles"
  | "shahi_dulhan"
  | "heritage_gold"
  | "nakshatra_diamonds"
  | "gold"
  | "diamond"
  | "silver"
  | "bridal"
  | "mangalsutra"
  | "custom"
  | "exchange";

export type ContentTopic = "bis_hallmark" | "diamond_4cs";

export type VisitPurpose = "bridal" | "general" | "old_gold_exchange" | "custom_order";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params: Record<string, unknown>) => void;
  }
}

// A fast double-tap fires the same click twice; count it once.
const DUPLICATE_WINDOW_MS = 1000;
let lastEvent: { key: string; at: number } | null = null;

function isDuplicate(payload: Record<string, unknown>) {
  const key = [payload.event, payload.cta_location, payload.lead_intent, payload.visit_purpose].join("|");
  const now = Date.now();
  const dup = lastEvent !== null && lastEvent.key === key && now - lastEvent.at < DUPLICATE_WINDOW_MS;
  lastEvent = { key, at: now };
  return dup;
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (isDuplicate(payload)) return;
  // gtag is missing when the Google tag is blocked (ad blocker) or failed to load.
  if (typeof window.gtag !== "function") return;
  const { event, ...rest } = payload;
  const params: Record<string, unknown> = { page_type: pageTypeFor(window.location.pathname) };
  for (const [key, value] of Object.entries(rest)) if (value !== undefined) params[key] = value;
  // No transport option needed: GA4 already sends hits with fetch keepalive, which
  // survives the page leaving for WhatsApp, the dialer or Maps (`transport_type` is a
  // Universal Analytics leftover that GA4 would log as a junk parameter).
  window.gtag("event", String(event), params);
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

export function trackAppointmentRequest(args: {
  cta_location: CtaLocation;
  visit_purpose: VisitPurpose;
  visit_day: string;
  visit_time: string;
}) {
  push({ event: "appointment_request", ...args });
}

export function trackSaveContactClick(args: { cta_location: CtaLocation }) {
  push({ event: "save_contact_click", ...args });
}

export function trackReviewClick(args: { cta_location: CtaLocation }) {
  push({ event: "review_click", ...args });
}
