import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import {
  trackWhatsAppClick,
  trackPhoneCallClick,
  trackGetDirectionsClick,
  trackContentInquiryClick,
  trackAppointmentRequest,
  trackSaveContactClick,
  trackReviewClick,
  trackSocialClick,
  type CtaLocation,
  type SocialPlatform,
  type VisitPurpose,
  type LeadIntent,
  type CollectionCategory,
  type ContentTopic,
} from '@/lib/tracking';

type WhatsAppCta = {
  cta: 'whatsapp';
  location: CtaLocation;
  intent: LeadIntent;
  category?: CollectionCategory;
  product?: string;
};

type PhoneCta = {
  cta: 'phone';
  location: CtaLocation;
  phoneNumber: string;
};

type DirectionsCta = {
  cta: 'directions';
  location: CtaLocation;
};

type ContentInquiryCta = {
  cta: 'content_inquiry';
  location: CtaLocation;
  topic: ContentTopic;
};

type AppointmentCta = {
  cta: 'appointment';
  location: CtaLocation;
  purpose: VisitPurpose;
  day: string;
  time: string;
};

type SaveContactCta = { cta: 'save_contact'; location: CtaLocation };
type ReviewCta = { cta: 'review'; location: CtaLocation };
type SocialCta = { cta: 'social'; location: CtaLocation; platform: SocialPlatform; url: string };

export type CtaSpec =
  | WhatsAppCta
  | PhoneCta
  | DirectionsCta
  | ContentInquiryCta
  | AppointmentCta
  | SaveContactCta
  | ReviewCta
  | SocialCta;

function fire(spec: CtaSpec) {
  switch (spec.cta) {
    case 'whatsapp':
      return trackWhatsAppClick({
        cta_location: spec.location,
        lead_intent: spec.intent,
        collection_category: spec.category,
        product_name: spec.product,
      });
    case 'phone':
      return trackPhoneCallClick({
        cta_location: spec.location,
        phone_number: spec.phoneNumber,
      });
    case 'directions':
      return trackGetDirectionsClick({ cta_location: spec.location });
    case 'content_inquiry':
      return trackContentInquiryClick({
        cta_location: spec.location,
        content_topic: spec.topic,
      });
    case 'appointment':
      return trackAppointmentRequest({
        cta_location: spec.location,
        visit_purpose: spec.purpose,
        visit_day: spec.day,
        visit_time: spec.time,
      });
    case 'save_contact':
      return trackSaveContactClick({ cta_location: spec.location });
    case 'review':
      return trackReviewClick({ cta_location: spec.location });
    case 'social':
      return trackSocialClick({ cta_location: spec.location, platform: spec.platform, link_url: spec.url });
  }
}

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { track: CtaSpec };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink({ track, onClick, children, ...rest }, ref) {
    return (
      <a
        ref={ref}
        {...rest}
        onClick={(e) => {
          fire(track);
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }
);

type TrackedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { track: CtaSpec };

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  function TrackedButton({ track, onClick, children, ...rest }, ref) {
    return (
      <button
        ref={ref}
        {...rest}
        onClick={(e) => {
          fire(track);
          onClick?.(e);
        }}
      >
        {children}
      </button>
    );
  }
);
