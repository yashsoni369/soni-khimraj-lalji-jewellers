---
name: Soni Khimraj Lalji Jewellers - The Velvet Counter
description: A jeweller's counter you sit at. Bottle-green velvet trays, brass-framed glass panels, gold tested and weighed in front of you.
colors:
  counter: "#131917"
  counter-raised: "#181c1a"
  counter-deep: "#0c0f0e"
  velvet: "#17392d"
  velvet-deep: "#0f2a21"
  velvet-hi: "#1f4a3b"
  brass: "#ba995c"
  brass-hi: "#d9bd84"
  brass-soft: "#8a7347"
  brass-ink: "#16130b"
  brass-text: "#c6aa78"
  glass: "#f7f7f5"
  glass-soft: "#c3c9c5"
  glass-mute: "#8d9690"
  teak: "#7a4a24"
typography:
  display:
    fontFamily: "Inria Serif, Inria Fallback, Georgia, serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  kicker:
    fontFamily: "Inria Serif, Inria Fallback, Georgia, serif"
    fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: "Karla, Karla Fallback, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Karla, Karla Fallback, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: "Karla, Karla Fallback, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  shop-name:
    fontFamily: "Tiro Devanagari Hindi, Noto Serif Devanagari, serif"
    fontWeight: 400
rounded:
  tag: "3px"
  tray: "6px"
  panel: "6px"
  pill: "999px"
spacing:
  gutter: "max(16px, 4vw)"
  section: "clamp(64px, 9vw, 136px)"
  wrap-max: "1320px"
  header: "clamp(64px, 6.72vw, 170px)"
components:
  button-primary:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.counter}"
    rounded: "{rounded.pill}"
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.glass}"
    rounded: "{rounded.pill}"
  tray-tag:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.brass-ink}"
    rounded: "{rounded.tag}"
    padding: "6px 12px"
  tray-box:
    backgroundColor: "{colors.velvet-deep}"
    rounded: "{rounded.tray}"
  rate-card:
    backgroundColor: "{colors.velvet-deep}"
    textColor: "{colors.glass}"
---

# Design System: Soni Khimraj Lalji Jewellers

## Overview

**Creative North Star: "The Velvet Counter"**

The site is the jeweller's counter you sit at. Pieces lie on bottle-green velvet trays, gold is tested on the touchstone and weighed on the scale in front of you, and the day's rate sits under glass. The page is a near-black counter with velvet sections laid on it, brass for type, rules and frames, and glass white for the things you act on. Photography carries the gold; the interface never imitates it.

Density is calm and generous: wide sections (64px to 136px of vertical padding), one idea per section, large serif display lines over small brass subtitles. Mood: honest, unhurried, tactile. It refuses the maroon-and-gold-serif jeweller template and the cart-led e-commerce shell: no cart or search icons, no gold gradients or glow.

**Key Characteristics:**
- Near-black counter ground, bottle-green velvet sections, brass as a material.
- Facts and rates sit on brass-framed glass panels.
- Large Inria Serif display line, with the keyword heading beneath it as a brass subtitle.
- Pill buttons that fill with a brass pour on hover.
- Photography is the only gold; every image is a generated stand-in awaiting the owner's photographs.

## Colors

A dark, restrained palette: counter black and velvet green carry the surfaces, brass and glass white carry the type and the actions.

### Primary
- **Brass** (#ba995c): frames, rules, outline buttons, tray name tags, focus ring. A material, not a decoration.
- **Polished Brass** (#d9bd84): subtitle text on velvet, hover text, key figures.
- **Brass Text** (#c6aa78): brass type on the counter ground (the keyword subtitle and small labels), tuned for contrast on near-black.
- **Worn Brass** (#8a7347): scrollbar thumbs and quiet brass details.
- **Brass Ink** (#16130b): text on solid brass.

### Secondary
- **Bottle-Green Velvet** (#17392d): the section ground (`velvet-ground`), with a soft velvet plate image over it.
- **Deep Velvet** (#0f2a21): tray bottoms, the rate section, panel bodies.
- **Lit Velvet** (#1f4a3b): raised highlights on velvet.

### Tertiary
- **Teak** (#7a4a24): counter wood in imagery and the occasional warm accent.

### Neutral
- **Counter Black** (#131917): page ground and text on glass buttons. Variants: raised (#181c1a), deep (#0c0f0e).
- **Glass White** (#f7f7f5): primary text, primary button fill.
- **Glass Soft** (#c3c9c5): body copy and ledes on dark.
- **Glass Mute** (#8d9690): captions, footer details, and the unfilled colour of word-fill text.

### Named Rules
**The Brass Is Material Rule.** Brass is a metal that frames and tags things, not a line or a wash. Facts (the rate card, the story facts label, the why-us panel) sit on brass-framed glass panels. No gold gradients, no glow, no brass hairline used as decoration.
**The Gold Lives In Photographs Rule.** Gold appears as jewellery in images and as flat brass type and rules. Never as a gradient fill.

## Typography

**Display Font:** Inria Serif (with Inria Fallback, Georgia)
**Body Font:** Karla (with Karla Fallback, Helvetica Neue, Arial)
**Shop-name Font:** Tiro Devanagari Hindi (with Noto Serif Devanagari)

**Character:** A refined, slightly warm serif for statements over a plain humanist sans for reading. The Devanagari shop name is the sign over the door and is used for the name only.

### Hierarchy
- **Display** (700, clamp(2.25rem, 4.6vw, 4.25rem), 1.06, -0.025em): the large line on every section and page hero. Hero lines run up to 5rem. Always a `<p class="display">`, never a heading.
- **Kicker / keyword heading** (400, clamp(1.1rem, 1.4vw, 1.4rem), 1.3, normal case, balanced wrap): the real `<h1>`/`<h2>`, a sentence-case brass serif subtitle under the display line. Max about 40ch.
- **Lede** (300, clamp(1.05rem, 1.4vw, 1.25rem), relaxed, Glass Soft): the line under a hero or section head, about 36rem to 60ch.
- **Body** (400, 0.95rem to 1.05rem, Karla): running copy.
- **Label** (600, 0.8rem, 0.06em tracking): the brass tray name tag only (see Components).

### Named Rules
**The Subtitle Heading Rule.** Keyword H1, H2 and H3 text is locked word for word. The heading comes first in the DOM, and `flex-col-reverse` or `order` shows the display line above it. The display line is never a heading. No tracked-caps eyebrow sits above a heading.
**The Sign Over The Door Rule.** Devanagari is set in Tiro and only for the shop name.

## Layout

A single centred column (`.wrap`, max 1320px, side padding `max(16px, 4vw)`) inside full-bleed sections. Sections stack with `clamp(64px, 9vw, 136px)` of vertical padding and change ground (counter, velvet) to mark each new idea. The fixed header is `clamp(64px, 6.72vw, 170px)` tall and all anchors and focus clear it. The first viewport is a full-bleed counter photograph with copy in the left third. The tray rail bleeds to the edge but aligns its first card to `.wrap`; it swipes natively on phones and pins and scrolls sideways on desktop. A sticky phone and WhatsApp bar sits at the foot on mobile.

Page background colour shifts to the colour of the section in view (`data-bg`).

## Elevation & Depth

Hybrid: tonal layering for sections, soft black shadows for objects that sit on the counter.

### Shadow Vocabulary
- **Tray at rest** (`box-shadow: 0 12px 28px rgba(0,0,0,0.4)`): velvet tray cards.
- **Tray lifted** (`0 18px 34px rgba(0,0,0,0.5)`, translateY(-3px)): tray hover, fine pointers only.
- **Under glass** (`0 26px 50px rgba(0,0,0,0.5)` plus inset `0 0 0 1px rgba(0,0,0,0.45)`): the rate-card panel.
- **Name tag** (`0 4px 10px rgba(0,0,0,0.35)`): brass tray tags.
- **Focus** (2px brass outline, 2px offset, plus `0 0 0 5px #0b0b0b`): visible on black, velvet and photographs.

### Named Rules
**The Objects Cast Shadows Rule.** Shadows belong to physical things (trays, glass, tags). Text blocks and sections stay flat.

## Shapes

Pills for actions (999px). Small hard-set corners for physical objects: trays and framed panels at 6px, brass name tags at 3px, images at 6px (rounded-md) with a 1px brass ring at 30%. The brass frame is a bevelled raster 9-slice (`rate-frame.png`, 14px border) with two hinge tabs on the top edge (`rate-hinge.png`). Trays carry an inset 1px brass rim at 28% drawn over the photo.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary (`btn-glass`):** Glass White fill, Counter Black text. The main action ("WhatsApp Mr. Soni").
- **Secondary (`btn-brass`):** solid brass fill, Brass Ink text.
- **Ghost (`btn-ghost`):** 1px brass inset ring, glass text; text turns Brass Ink on hover.
- **Hover / Focus:** a brass "pour" rises from the bottom (scaleY, 0.3s, expo-out); on brass buttons the pour is glass white. Press: translateY(1px) scale(0.98). Hover only on devices that can hover.

### Tray cards
Square velvet tray (Deep Velvet, 6px) holding a photograph, with a brass name tag (3px, brass fill, Brass Ink, 0.8rem 600 uppercase at 0.06em) straddling the front edge. Hover lifts the tray 3px and the tag nudges. Rails and grids of trays are the main catalogue pattern.

### Rate card and fact panels (signature)
Brass-framed glass (`.rate-card`): bevelled brass frame, a faint diagonal glass sheen, green-to-deep-green body, hinge tabs on top. Used for the live IBJA rate, the story facts label, and the why-us panel. New facts go on this panel, not on bare text.

### Instagram strip
"From our Instagram" on the home page, above the visit block: the shop's pinned reel (muted, plays only while on screen, `preload="none"`, still for reduced motion and Data Saver) beside a 3×2 grid of square post crops, each linking to its post, plus a glass "Follow @sonikhimrajlalji" pill. Everything is served from this site (`public/images/instagram`, list in `content/instagram.ts`): no Instagram script, iframe or cookies. Crops always leave out the poster template's printed phone and address, which differ from the confirmed NAP. Clicks send GA4 `social_click` with `platform`.

### Navigation
Slim near-black fixed header: Devanagari shop name in a brass-toned Tiro, nav links with a drawing brass underline (`link-draw`), phone number and WhatsApp icon. On mobile, a sticky bar with a brass-ringed call pill and a glass WhatsApp pill (48px min height).

### FAQ
Native `details` disclosures with the default marker removed.

### Motion
GSAP 3.15 (ScrollTrigger, SplitText) with Lenis smooth scroll on desktop only. Pieces: chain progress bar, jhumka companion, loupe, brass page shutter between routes, pinned tray rail, word-fill (Glass Mute to final colour), odometer figures, hero image settle. Eases are power3 and expo-out. The whole layer sits inside `gsap.matchMedia`; with reduced motion the page is static and CSS transitions are removed.

## Do's and Don'ts

### Do:
- **Do** keep keyword H1/H2/H3 text word for word, first in the DOM, shown beneath a `<p class="display">` as a sentence-case brass subtitle.
- **Do** put facts on `.rate-card` brass-framed glass panels.
- **Do** set display in Inria Serif 700 at about -0.025em and body in Karla.
- **Do** keep the hero image and H1 visible from the first paint: never hidden or faded, all content in the server HTML.
- **Do** write alt text that says what the image shows plus a local phrase (Ghatkopar, Jivdaya Lane); keep provenance embedded in each generated raster until the owner's photos replace them.
- **Do** make every CTA a `TrackedLink` with a `cta_location`; GA4 sends only from www.sonikhimrajlaljijewellers.com.
- **Do** keep a 44px minimum touch target (48px on the sticky bar).

### Don't:
- **Don't** put a tracked-caps eyebrow above a heading.
- **Don't** make the display line a heading element.
- **Don't** use gold gradients, glow, or brass as a thin decorative line.
- **Don't** add cart or search icons, cursors, a fake shop front, or invented rates, prices, reviews or pieces.
- **Don't** fade or delay-reveal the LCP image or H1.
- **Don't** use the legacy maroon, gold and cream palette on any redesigned surface.

## Not canonized

Existing drift, recorded but not part of the system: small tracked-caps labels in `components/BookVisit.tsx`, `components/Layout.tsx`, `components/GoldRateCard.tsx`, `components/ServicePage.tsx` breadcrumbs and `OldGoldStory.tsx`; the legacy maroon, gold and cream tokens and the old `components/Widgets.tsx` and `components/ui/SharedUI.tsx` styling; and the `.display` base class letter-spacing (-0.012em), which every use overrides with -0.025em.
