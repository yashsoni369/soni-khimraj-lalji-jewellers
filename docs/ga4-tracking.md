# GA4 tracking

For **www.sonikhimrajlaljijewellers.com** · GA4 property "Soni Khimraj Lalji Jewellers" (`534455152`) · measurement ID `G-4R59PN3Y3V`

## How it works
- `app/root.tsx` loads the Google tag (`gtag.js`) and runs `gtag('config', 'G-4R59PN3Y3V')`. That sends page views. GA4 enhanced measurement ("page changes based on browser history") counts client-side page changes too.
- Every call-to-action sends its event straight to GA4 from `lib/tracking.ts` with `gtag('event', …)`. GA4 sends each hit with `fetch(…, { keepalive: true })`, so it survives the visitor leaving for WhatsApp, the dialer or Maps; no extra option is needed (`transport_type` is a Universal Analytics leftover).
- **There is no Google Tag Manager.** Container `GTM-KJGS93VK` was removed from the site on 2026-11-08: nobody could open it, so it couldn't be updated or audited. Don't add it back. If a non-Google tag is ever needed (e.g. a Meta Pixel), create a **new** container owned by the client's Google account, with Apex36 as a second admin, and move the events into it.

## Events
Every event also carries `page_type`: `home`, `gold_rate`, `bridal`, `old_gold_exchange`, `silver`, `gold_dream_scheme` or `not_found`.

| Event | When | Parameters | Key event |
|---|---|---|---|
| `whatsapp_click` | Any WhatsApp button or link | `cta_location`, `lead_intent`, `collection_category`, `product_name` | Yes |
| `phone_call_click` | Any phone number tap | `cta_location`, `phone_number` | Yes |
| `get_directions_click` | Map / directions links | `cta_location` | Yes |
| `appointment_request` | "Book a visit" form sent | `cta_location`, `visit_purpose`, `visit_day`, `visit_time` | Yes |
| `content_inquiry_click` | "Ask Mr. Soni" knowledge buttons | `cta_location`, `content_topic` | No |
| `save_contact_click` | "Save our number" (vCard) | `cta_location` | No |
| `review_click` | "Leave a Google review" (shows once the review link is added) | `cta_location` | No |

A fast double tap on the same button counts once (1-second guard in `lib/tracking.ts`).

## GA4 setup (done, checked 2026-11-08)
- **Custom dimensions (event scope):** `page_type`, `cta_location`, `lead_intent`, `collection_category`, `product_name`, `phone_number`, `content_topic`, `visit_purpose`. `visit_day`/`visit_time` are sent but deliberately not registered (too many distinct values).
- **Key events:** `whatsapp_click`, `phone_call_click`, `get_directions_click`, `appointment_request`. The default `purchase`, `qualify_lead` and `close_convert_lead` are unused.
- **Enhanced measurement:** on, including page changes based on browser history.
- **Data retention:** 14 months.

## Adding a new event
1. Add a `track…` function in `lib/tracking.ts` and call it from the component.
2. If a new parameter should be reportable, create an event-scoped custom dimension in GA4 (Admin → Data display → Custom definitions).
3. If it's a lead, mark it as a key event (Admin → Data display → Key events).
4. Add it to the table above.

## Still to do (owner / Apex36)
- [ ] **Search Console link:** Admin → Product links → Search Console links → Link → `sc-domain:sonikhimrajlaljijewellers.com` → the web stream.
- [ ] **Optional, internal traffic:** Admin → Data streams → web stream → Configure tag settings → Define internal traffic → add the shop Wi-Fi's public IP so staff visits don't count.
- [ ] **Google Business Profile visits:** covered in `docs/google-business-profile-actions.md` (website URL with `utm_source=google&utm_medium=organic&utm_campaign=gbp`). These show in GA4 as `google / organic`, campaign `gbp`.
