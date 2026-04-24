import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';
import {
  trackWhatsAppClick,
  trackPhoneCallClick,
  trackGetDirectionsClick,
  trackContentInquiryClick,
  type CtaLocation,
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

export type CtaSpec = WhatsAppCta | PhoneCta | DirectionsCta | ContentInquiryCta;

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
