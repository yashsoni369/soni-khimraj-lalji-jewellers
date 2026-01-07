import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Star, TrendingUp, RefreshCw, Quote, ArrowUpRight, IndianRupee, ChevronLeft, ChevronRight, ShieldCheck, Truck, Gem, Award, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_GOLD_RATES, TESTIMONIALS, CAROUSEL_SLIDES } from '../constants';
import { Button, Card, CardContent, Input } from './ui/SharedUI';

// --- GOLD RATE WIDGET ---
export const GoldRateWidget = () => {
  const [rates, setRates] = useState(INITIAL_GOLD_RATES);
  const lastUpdated = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-red-50 border-y-2 border-red-100 relative z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-maroon-900">
            <div className="p-2 bg-maroon-100 rounded-full"><TrendingUp size={20} /></div>
            <div>
              <h3 className="font-bold text-sm leading-tight font-serif uppercase tracking-widest">Today's Rate</h3>
              <p className="text-[10px] text-maroon-600">Mumbai • {lastUpdated}</p>
            </div>
          </div>

          <div className="flex-1 w-full md:w-auto grid grid-cols-3 gap-2 md:gap-8">
            {rates.map((rate, idx) => (
              <div key={idx} className="bg-white p-2 rounded border border-red-100 shadow-sm text-center flex flex-col justify-center">
                <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider mb-0.5">{rate.metal} {rate.purity}</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-sm font-bold text-maroon-800">₹{rate.pricePer10g.toLocaleString()}</p>
                  <ArrowUpRight size={10} className="text-green-600" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

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

// --- TRUST BAR WIDGET ---
export const TrustBar = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, text: "100% BIS Hallmarked" },
            { icon: Truck, text: "Insured Shipping" },
            { icon: RefreshCw, text: "Lifetime Exchange" },
            { icon: Award, text: "Certified Diamonds" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
              <item.icon className="text-gold-600 w-8 h-8" strokeWidth={1.5} />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-maroon-900">{item.text}</span>
            </div>
          ))}
        </div>
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
          <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=40&w=600&auto=format&fm=avif&fit=crop" width="500" height="667" loading="lazy" className="object-cover w-full h-full hover:scale-105 transition duration-[1.5s]" alt="Elegant Pearl Pendant" />
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
  const navigate = useNavigate();
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
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=40&w=800&auto=format&fm=avif&fit=crop" width="800" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Elegant Gold Necklaces" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="text-xs uppercase tracking-widest mb-2 block text-gold-300">Signature Collection</span>
              <h3 className="font-serif text-4xl italic">Necklaces</h3>
            </div>
          </div>

          {/* Tall Vertical Card */}
          <div className="md:row-span-2 relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=40&w=400&auto=format&fm=avif&fit=crop" width="400" height="800" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Diamond Rings" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-4xl italic">Rings</h3>
            </div>
          </div>

          {/* Standard Card 1 */}
          <div className="relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="https://images.unsplash.com/photo-1652766540048-de0a878a3266?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Gold Earrings" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-serif text-3xl italic">Earrings</h3>
            </div>
          </div>

          {/* Standard Card 2 */}
          <div className="relative group cursor-pointer overflow-hidden bg-gray-100">
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=40&w=400&auto=format&fm=avif&fit=crop" width="400" height="400" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" alt="Gold Bangles" />
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

// --- VIDEO STORY MOCKUP ---
export const BrandStory = () => {
  return (
    <section className="py-24 md:py-32 bg-maroon-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-maroon-950/40"></div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-20">
        <div className="md:w-1/2 space-y-8">
          <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">Our Legacy</span>
          <h2 className="text-5xl md:text-7xl font-serif leading-none">Crafting Timeless <br /><span className="italic text-gold-200">Memories</span></h2>
          <p className="text-maroon-100 leading-relaxed font-light text-lg">
            At Soni Khimraj Lalji Jewellers, we believe jewellery is more than just adornment; it's a legacy passed down through generations.
            Our artisans meticulously craft each piece at our Ghatkopar West studio, blending traditional Indian artistry with modern aesthetics to ensure the highest quality.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div>
              <h3 className="text-4xl font-serif text-gold-500">25+</h3>
              <p className="text-sm text-maroon-200 uppercase tracking-widest mt-2">Years of Legacy</p>
            </div>
            <div>
              <h3 className="text-4xl font-serif text-gold-500">15k+</h3>
              <p className="text-sm text-maroon-200 uppercase tracking-widest mt-2">Happy Brides</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-gold-500/30 shadow-2xl group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=40&w=600&auto=format&fm=avif" width="800" height="450" loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Artisan Craftsmanship" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- NEWSLETTER SECTION ---
export const Newsletter = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-maroon-950">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1601121141461-9d660d601826?q=30&w=1200&auto=format&fm=avif" width="1600" height="400" loading="lazy" className="w-full h-full object-cover opacity-10" alt="Jewelry Pattern" />
        <div className="absolute inset-0 bg-maroon-950/80"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <Mail className="w-10 h-10 text-gold-500 mx-auto mb-6" strokeWidth={1} />
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Join the Royal Registry</h2>
        <p className="text-maroon-100 max-w-lg mx-auto mb-10 font-light leading-relaxed">
          Be the first to receive updates on our antique acquisitions, exclusive bridal previews, and daily gold rate notifications.
        </p>
        <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
          <Input placeholder="Your Email Address" className="bg-white/10 border-maroon-800 text-white placeholder:text-maroon-200 h-12 focus:border-gold-500" />
          <Button className="bg-gold-500 text-maroon-900 hover:bg-white h-12 px-8 uppercase tracking-widest text-xs font-bold">Subscribe</Button>
        </div>
        <p className="text-maroon-400 text-[10px] mt-6 uppercase tracking-widest">No spam. Only sparkle.</p>
      </div>
    </section>
  );
};

// --- TESTIMONIALS (With Ornamentation) ---
export const Testimonials = () => {
  return (
    <section className="py-20 bg-cream-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-maroon-600 font-bold uppercase tracking-widest text-xs">Customer Love</span>
          <h2 className="text-3xl md:text-4xl font-serif text-maroon-900 mt-2">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-sm border-t-4 border-gold-500 shadow-sm relative group hover:-translate-y-1 transition-transform duration-300">
              <Quote className="absolute top-4 right-4 text-gold-100 w-12 h-12" />
              <div className="flex gap-1 text-gold-500 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 bg-maroon-100 rounded-full flex items-center justify-center text-maroon-700 font-serif font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-maroon-900">{t.name}</p>
                  <p className="text-xs text-gray-700">Mumbai</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};