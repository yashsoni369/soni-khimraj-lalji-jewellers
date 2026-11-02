import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react';
import { CAROUSEL_SLIDES, STORE_INFO } from '../constants';
import {
  openWhatsApp,
  createSlideMessage,
  createSpotlightMessage,
  createVideoRequestMessage,
  createCategoryMessage,
} from '../services/whatsappService';
import { TrackedButton, TrackedLink } from './TrackedCTA';
import type { CtaLocation, CollectionCategory } from '@/lib/tracking';

const HERO_SLOTS: readonly CtaLocation[] = ['hero_slide_1', 'hero_slide_2', 'hero_slide_3'];
const HERO_CATEGORIES: readonly CollectionCategory[] = ['shahi_dulhan', 'heritage_gold', 'nakshatra_diamonds'];
const SPOTLIGHT_PRODUCT = 'gemstone_gold_pendant';

const WhatsAppGlyph = ({ className = 'w-5 h-5', fill = '%23fff' }: { className?: string; fill?: string }) => (
  <img
    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='${fill}' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 365.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/%3E%3C/svg%3E`}
    alt=""
    aria-hidden="true"
    className={className}
  />
);

// --- HERO CAROUSEL (Cinematic) ---
// Slides only swap the background image + slide caption. The <h1> is static so the page
// has exactly one, keyword-bearing H1 in the prerendered HTML.
export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
    setProgress(0);
  }, []);

  // Progress Bar Logic
  useEffect(() => {
    const duration = 6000;
    const interval = 50;
    const steps = duration / interval;

    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          nextSlide();
          return 0;
        }
        return old + (100 / steps);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = CAROUSEL_SLIDES[currentSlide];
  const slot = HERO_SLOTS[currentSlide] ?? 'hero_slide_1';

  return (
    <div className="relative w-full h-[70vh] md:h-[88vh] overflow-hidden bg-maroon-950 group">
      {/* Slide images */}
      {CAROUSEL_SLIDES.map((s, index) => (
        <div
          key={s.id}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={s.image}
            alt={s.alt}
            width="1600"
            height="1067"
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
            className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/60 to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute z-20 bottom-16 md:bottom-28 left-4 md:left-20 right-4 md:right-auto max-w-3xl text-white">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="h-px w-10 md:w-16 bg-gold-400 flex-shrink-0"></div>
          <h1 className="text-gold-300 font-sans font-bold uppercase tracking-[0.15em] md:tracking-[0.25em] text-[11px] md:text-sm leading-snug">
            Gold &amp; Diamond Jewellers in Ghatkopar West, Mumbai
          </h1>
        </div>
        <div key={slide.id} className="animate-fade-up">
          <p className="text-4xl sm:text-5xl md:text-8xl font-serif mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] text-white drop-shadow-2xl">
            {slide.title}
          </p>
          <p className="text-base md:text-xl text-white/85 mb-8 md:mb-10 font-light max-w-lg leading-relaxed border-l border-gold-500/50 pl-4 md:pl-6">
            {slide.subtitle}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
          <TrackedButton
            track={{
              cta: 'whatsapp',
              location: slot,
              intent: 'chat_general',
              category: HERO_CATEGORIES[currentSlide],
            }}
            onClick={() => openWhatsApp(createSlideMessage(slide.title))}
            className="group/cta inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-maroon-950 px-5 md:px-7 py-3 md:py-4 rounded-sm font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <WhatsAppGlyph className="w-5 h-5 md:w-5 md:h-5" fill="%23450a0a" />
            <span className="text-sm md:text-base">Chat with Mr. Soni</span>
          </TrackedButton>
          <TrackedLink
            href={STORE_INFO.mapEmbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            track={{ cta: 'directions', location: slot }}
            className="inline-flex items-center gap-2 text-white/90 hover:text-gold-200 px-3 py-3 md:py-4 border-b border-white/30 hover:border-gold-300 transition-colors"
          >
            <MapPin size={16} />
            <span className="text-sm md:text-base uppercase tracking-widest">Visit us in Ghatkopar</span>
          </TrackedLink>
        </div>
        <div className="flex items-center gap-2 mt-4 text-white/75 text-xs md:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Mr. Soni usually replies within 10 minutes</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-gold-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-30 flex gap-3 md:gap-4">
        <button onClick={prevSlide} className="p-2 md:p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-maroon-900 transition-all backdrop-blur-sm" aria-label="Previous Slide">
          <ChevronLeft size={18} className="md:w-5 md:h-5" />
        </button>
        <button onClick={nextSlide} className="p-2 md:p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-maroon-900 transition-all backdrop-blur-sm" aria-label="Next Slide">
          <ChevronRight size={18} className="md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

// --- SPOTLIGHT MASTERPIECE ---
export const Spotlight = () => (
  <section className="py-24 md:py-32 bg-maroon-900 text-white overflow-hidden relative">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/20 blur-[100px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon-600/20 blur-[120px] rounded-full"></div>
    <div className="absolute inset-0 bg-maroon-950/30 opacity-10"></div>

    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-20 relative z-10">

      {/* Image Side - Editorial Style */}
      <div className="w-full md:w-1/2 relative group cursor-pointer">
        <div className="absolute -top-6 -left-6 w-full h-full border border-gold-500/20 z-0 transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4"></div>
        <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold-500/20 z-0 transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-4"></div>

        <div className="relative z-10 aspect-[3/4] shadow-2xl overflow-hidden">
          <img src="/images/gemstone-gold-pendant.webp" width="400" height="600" loading="lazy" className="object-cover w-full h-full hover:scale-105 transition duration-[1.5s]" alt="Green gemstone pendant on a gold chain at Soni Khimraj Lalji Jewellers, Ghatkopar West" />
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <span className="h-px w-8 md:w-12 bg-gold-400"></span>
          <span className="text-gold-300 uppercase tracking-widest text-[10px] md:text-xs font-bold">Shrestha Ratna – Our Finest Pick</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-tight md:leading-none">Gemstone <br /><span className="italic text-gold-200">Pendants</span></h2>
        <p className="text-maroon-100 font-light leading-relaxed md:leading-loose text-base md:text-lg max-w-lg mx-auto md:mx-0">
          A rich green gemstone set in BIS hallmarked gold – one of the statement pieces waiting at our Ghatkopar West store.
          Tell us the colour, stone and budget you have in mind, and we will show you pendants, chokers and Kundan sets to match.
        </p>
        <div className="grid grid-cols-2 gap-6 md:gap-12 pt-6 justify-items-center md:justify-items-start border-t border-white/10 mt-8">
          <div>
            <p className="text-[10px] uppercase text-gold-300 tracking-wider mb-2">Metal</p>
            <p className="font-serif text-2xl md:text-3xl">Hallmarked Gold</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gold-300 tracking-wider mb-2">Made to order</p>
            <p className="font-serif text-2xl md:text-3xl">Any stone</p>
          </div>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center md:items-start gap-4">
          <TrackedButton
            track={{
              cta: 'whatsapp',
              location: 'shrestha_ratna',
              intent: 'private_viewing',
              product: SPOTLIGHT_PRODUCT,
            }}
            onClick={() => openWhatsApp(createSpotlightMessage("gemstone pendants"))}
            className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-maroon-950 px-6 md:px-8 py-3 md:py-4 rounded-sm font-semibold tracking-wide transition-all duration-300 shadow-xl hover:-translate-y-0.5"
          >
            <WhatsAppGlyph className="w-5 h-5" fill="%23450a0a" />
            <span className="text-sm md:text-base">Reserve a Private Viewing</span>
          </TrackedButton>
          <TrackedButton
            track={{
              cta: 'whatsapp',
              location: 'shrestha_ratna',
              intent: 'video_request',
              product: SPOTLIGHT_PRODUCT,
            }}
            onClick={() => openWhatsApp(createVideoRequestMessage("gemstone pendants"))}
            className="inline-flex items-center gap-2 text-gold-200 hover:text-white px-3 py-2 border border-gold-500/40 hover:border-gold-300 rounded-sm transition-colors"
          >
            <Play size={14} className="fill-current" />
            <span className="text-xs md:text-sm uppercase tracking-widest">Request video on WhatsApp</span>
          </TrackedButton>
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold-300/80">
          Available to view at our Ghatkopar West store
        </p>
      </div>
    </div>
  </section>
);

// --- CATEGORY SHOWCASE (Editorial Asymmetric Layout) ---
export const CategoryShowcase = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4 block">Our Collections</span>
          <h2 className="text-4xl md:text-6xl font-serif text-maroon-900">Gold &amp; Diamond Jewellery Collections</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-light">Necklaces, rings, earrings and bangles – browse the latest designs on WhatsApp or see them in our Ghatkopar store.</p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">

          {/* Large Featured Card */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden bg-gray-100">
            <img src="/images/bridal-pearl-necklace-ghatkopar.webp" width="1200" height="800" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Pearl necklace in a jewellery box – necklaces collection" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white">
              <span className="text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block text-gold-300">Signature Collection</span>
              <h3 className="font-serif text-3xl md:text-4xl italic">Necklaces</h3>
              <span className="inline-flex items-center gap-2 mt-3 text-gold-200 text-[11px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <WhatsAppGlyph className="w-4 h-4" fill="%23fde68a" />
                See catalogue on WhatsApp →
              </span>
            </div>
            <TrackedButton
              type="button"
              track={{ cta: 'whatsapp', location: 'collections', intent: 'catalogue_browse', category: 'necklaces' }}
              onClick={() => openWhatsApp(createCategoryMessage('Necklaces'))}
              aria-label="See our Necklaces catalogue on WhatsApp"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </div>

          {/* Tall Vertical Card */}
          <div className="md:row-span-2 relative group overflow-hidden bg-gray-100">
            <img src="/images/diamond-halo-ring.webp" width="800" height="533" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Diamond halo engagement ring in rose gold" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white">
              <h3 className="font-serif text-3xl md:text-4xl italic">Rings</h3>
              <span className="inline-flex items-center gap-2 mt-3 text-gold-200 text-[11px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <WhatsAppGlyph className="w-4 h-4" fill="%23fde68a" />
                See catalogue on WhatsApp →
              </span>
            </div>
            <TrackedButton
              type="button"
              track={{ cta: 'whatsapp', location: 'collections', intent: 'catalogue_browse', category: 'rings' }}
              onClick={() => openWhatsApp(createCategoryMessage('Rings'))}
              aria-label="See our Rings catalogue on WhatsApp"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </div>

          {/* Standard Card 1 */}
          <div className="relative group overflow-hidden bg-gray-100">
            <img src="/images/gold-gemstone-earrings.webp" width="687" height="1031" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Gold hoop earring with coloured gemstones" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white">
              <h3 className="font-serif text-2xl md:text-3xl italic">Earrings</h3>
              <span className="inline-flex items-center gap-2 mt-3 text-gold-200 text-[11px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <WhatsAppGlyph className="w-4 h-4" fill="%23fde68a" />
                See catalogue →
              </span>
            </div>
            <TrackedButton
              type="button"
              track={{ cta: 'whatsapp', location: 'collections', intent: 'catalogue_browse', category: 'earrings' }}
              onClick={() => openWhatsApp(createCategoryMessage('Earrings'))}
              aria-label="See our Earrings catalogue on WhatsApp"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </div>

          {/* Standard Card 2 */}
          <div className="relative group overflow-hidden bg-gray-100">
            <img src="/images/gold-bangle.webp" width="800" height="533" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Rose gold bangle with filigree design" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-white">
              <h3 className="font-serif text-2xl md:text-3xl italic">Bangles</h3>
              <span className="inline-flex items-center gap-2 mt-3 text-gold-200 text-[11px] md:text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <WhatsAppGlyph className="w-4 h-4" fill="%23fde68a" />
                See catalogue →
              </span>
            </div>
            <TrackedButton
              type="button"
              track={{ cta: 'whatsapp', location: 'collections', intent: 'catalogue_browse', category: 'bangles' }}
              onClick={() => openWhatsApp(createCategoryMessage('Bangles'))}
              aria-label="See our Bangles catalogue on WhatsApp"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </div>

        </div>


      </div>
    </section>
  );
};