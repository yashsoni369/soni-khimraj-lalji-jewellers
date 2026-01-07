import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CAROUSEL_SLIDES } from '../constants';

// --- HERO CAROUSEL (Cinematic) ---
export const HeroCarousel = () => {
  const navigate = useNavigate();
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

  return (
    <div className="relative w-full h-[65vh] md:h-[88vh] overflow-hidden bg-maroon-950 group">
      {/* Slides */}
      {CAROUSEL_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Image with Ken Burns Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              width="1600"
              height="900"
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className={`absolute bottom-20 md:bottom-28 left-6 md:left-20 max-w-3xl text-white transition-all duration-1000 delay-300 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-gold-400"></div>
              <span className="text-gold-300 font-bold uppercase tracking-[0.3em] text-xs">The House of Soni Khimraj Lalji Jewellers</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-[0.9] text-white drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 font-light max-w-lg leading-relaxed border-l border-gold-500/50 pl-6">
              {slide.subtitle}
            </p>
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      ))}

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-gold-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-4">
        <button onClick={prevSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-maroon-900 transition-all" aria-label="Previous Slide">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="p-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-maroon-900 transition-all" aria-label="Next Slide">
          <ChevronRight size={20} />
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
          <img src="/assest/month.png" width="500" height="667" loading="lazy" className="object-cover w-full h-full hover:scale-105 transition duration-[1.5s]" alt="Elegant Pearl Pendant" />
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <span className="h-px w-12 bg-gold-400"></span>
          <span className="text-gold-300 uppercase tracking-widest text-xs font-bold">Shrestha Ratna - Our Finest Pick</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif leading-none">The Nizam's <br /><span className="italic text-gold-200">Emerald Choker</span></h2>
        <p className="text-maroon-100 font-light leading-loose text-lg max-w-lg mx-auto md:mx-0">
          An ode to the royal courts of Hyderabad. Featuring uncut Colombian emeralds nestled in 22K hallmarks gold, accented with Basra pearls.
          This piece represents over 200 hours of artisanal labor using the ancient 'Kundan' setting technique.
        </p>
        <div className="flex gap-12 pt-6 justify-center md:justify-start border-t border-white/10 mt-8">
          <div>
            <p className="text-[10px] uppercase text-gold-300 tracking-wider mb-2">Total Weight</p>
            <p className="font-serif text-3xl">84.5g</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gold-300 tracking-wider mb-2">Gemstones</p>
            <p className="font-serif text-3xl">Emerald & Polki</p>
          </div>
        </div>
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
          <h2 className="text-4xl md:text-6xl font-serif text-maroon-900">Timeless Elegance</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-light">Handcrafted masterpieces that celebrate your special moments</p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

          {/* Large Featured Card */}
          <div className="md:col-span-2 relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="/assest/dhulan collection.png" width="800" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Elegant Gold Necklaces" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="text-xs uppercase tracking-widest mb-2 block text-gold-300">Signature Collection</span>
              <h3 className="font-serif text-4xl italic">Necklaces</h3>
            </div>
          </div>

          {/* Tall Vertical Card */}
          <div className="md:row-span-2 relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="/assest/ring.png" width="400" height="800" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Diamond Rings" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-4xl italic">Rings</h3>
            </div>
          </div>

          {/* Standard Card 1 */}
          <div className="relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="/assest/earing.png" width="400" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Gold Earrings" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl italic">Earrings</h3>
            </div>
          </div>

          {/* Standard Card 2 */}
          <div className="relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="/assest/Bangles.png" width="400" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Gold Bangles" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl italic">Bangles</h3>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};