# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Confirmed with the user on 2026-11-08:
- **Local families** from Ghatkopar West and nearby (Ghatkopar East, Vidyavihar, Asalpha, Kurla, Vikhroli, Chembur) buying for weddings, festivals (Dhanteras, Akshaya Tritiya, the November–February wedding season) and gifting. Mostly on a phone. They check today's gold rate, look at what the shop makes, then WhatsApp Mr. Soni, call, or walk in. Decisions are often made by several family members together, including older relatives.
- **Old-gold sellers and exchangers**: people who want their old gold tested and valued fairly, in front of them, and put towards new pieces or sold.
- **Gold Dream Scheme savers**: customers who pay a fixed amount every month and buy jewellery at the end of the term.

## Product Purpose
The website of one physical jewellery shop. It exists to bring trusted local customers to the counter on Jivdaya Lane, or into a WhatsApp chat with Mr. Soni, and to rank in local search and AI answers for jewellers and gold rates in Ghatkopar. Success = WhatsApp chats, calls, direction taps and booked visits (GA4 key events: `whatsapp_click`, `phone_call_click`, `get_directions_click`, `appointment_request`). There is no online checkout.

## Positioning
A family jeweller on Jivdaya Lane, Ghatkopar West for over 25 years, where the owner himself, Mr. Soni, answers on WhatsApp. The shop sells BIS-hallmarked (HUID) gold, tests old gold in front of the customer, and shows the day's IBJA rate openly. A chain or online brand can't truthfully copy the owner's personal attention, the neighbourhood history, or a counter you can walk up to today.

## Operating Context
- **The shop:** Shop No 9, Dr. Lakhani Estate, Jivdaya Lane, Ghatkopar West, Mumbai 400086. Open every day, 10 AM – 9:30 PM. Phone/WhatsApp +91 91361 75991 (the only number). No email.
- **The shop front** (real photo: `public/images/soni-khimraj-lalji-jewellers-shop-ghatkopar-west.webp`):
  - the name in gold Devanagari letters «सोनी खिमराज लालजी ज्वेलर्स» on a light fascia, with "श्री गाजन माताजी नमः" above it;
  - a BIS 916 hallmark sign;
  - a festive flower garland around the door;
  - window boards for the Gold Dream Scheme and for zodiac (rashi) gemstones.
- **Gold rate:** IBJA benchmark, published on weekdays except holidays. The site server-renders it, cached for 10 minutes.
- **Rituals the site serves:** checking the rate before buying, bringing old gold for testing, booking a family visit for bridal shopping, monthly scheme payments.

## Capabilities and Constraints
- **Sells:**
  - 22K/18K BIS-hallmarked gold jewellery and diamond jewellery (18K gold);
  - silver jewellery and articles;
  - bridal Kundan and Polki sets and mangalsutras;
  - custom/made-to-order pieces;
  - old gold exchange (purity tested in front of the customer);
  - the Gold Dream Scheme.
- **Not yet confirmed by the owner:**
  - the scheme terms. The shop board appears to show 12 monthly instalments plus a bonus, but the scheme page stays `noindex` until the owner confirms;
  - whether zodiac gemstones are a service to promote;
  - the Google review link.
- **Stack (keep):**
  - React Router 7 framework mode on Vercel (Mumbai region), Tailwind 3. `/` and `/gold-rate-today-ghatkopar` are server-rendered with the live rate; the bridal, old-gold, silver and scheme pages are prerendered.
  - All content must be in the server HTML and visible without JavaScript (AI crawlers don't run JS).
  - Security headers come from code.
- **Must survive any redesign:**
  - page URLs, titles, meta and JSON-LD (`lib/routes.ts`, `lib/structuredData.ts`, `lib/site-jsonld.json`) and NAP identical everywhere;
  - the GA4 event contract in `lib/tracking.ts` (see `docs/ga4-tracking.md`);
  - WhatsApp, call, directions, book-a-visit and save-contact actions;
  - Lighthouse accessibility, best practices and SEO at 100, with good LCP on mid-range Android.
- **Motion:** GSAP-class transitions are wanted (user request, 2026-11-08). No 3D/WebGL.
- **Pages** (user, 2026-11-08): the 6 existing pages are redesigned, keeping their URLs. Three new pages are added:
  - **Our Story:** the family, 25+ years on Jivdaya Lane, Mr. Soni, the craft.
  - **Collections lookbook:** browse by category, ask on WhatsApp per piece; the photos are placeholders until the owner's own are in.
  - **Gemstones:** zodiac/rashi and navratna stones, as on the shop board. It stays `noindex` until the owner confirms he sells them.

## Brand Commitments
The user delegated these to Claude's recommendation on 2026-11-08; confirm or change at the direction round:
- **Keep the logo mark and the name** "Soni Khimraj Lalji Jewellers" (`public/images/soni-khimraj-lalji-jewellers-logo.png`).
- **Keep the Devanagari name** as on the shop sign («सोनी खिमराज लालजी ज्वेलर्स»). It's how the shop is recognised from the street.
- **Keep the personal "Mr. Soni" voice:** the owner talks to customers himself.
- **Colours are not locked.** Maroon is the logo ink; the site palette is decided in the direction round.

## Evidence on Hand
- **Real:**
  - the shop-front photo;
  - the logo (PNG, maroon ink);
  - the live IBJA gold rate (API and server render);
  - business facts (NAP, hours, services);
  - existing page copy and FAQs (`content/pages.ts`, `constants.ts`);
  - "over 25 years" (existing site claim).
- **Not real:** every product photo on the current site is stock.
- **Imagery plan (user, 2026-11-08):**
  - launch with licensed stock and/or AI-generated imagery (Gemini/Nano Banana via BrandGen);
  - replace it later with the owner's own phone photos of real pieces;
  - every synthetic or stock image is listed for replacement, and never captioned as a specific piece the shop holds.
- **Absent, never fabricate:** customer reviews/ratings, testimonials, prices or making charges (other than the IBJA rate), awards, certificates beyond BIS, staff names other than Mr. Soni, payment methods.

## Product Principles
1. **Every page leads to the counter.** It ends in a WhatsApp chat, a call, directions or a booked visit, one tap away on a phone.
2. **Proof over polish.** The hallmark, HUID, the day's rate, valuation in front of you and 25 years on one street are the persuasion. Glamour supports them, never replaces them.
3. **Truthful by default.** No invented claims, and no stock or AI image passed off as the shop's own piece.
4. **Fast and legible for the whole family.** It works on a mid-range Android on mobile data, reads well for older relatives, and keeps full content without JavaScript.
5. **Local and personal.** Neighbourhood specifics and the owner's voice, not generic luxury-brand language.

## Accessibility & Inclusion
WCAG 2.1 AA. Generous type sizes and contrast for older family members; tap targets of at least 44px; `prefers-reduced-motion` honoured, with every animation optional and content visible without it.
