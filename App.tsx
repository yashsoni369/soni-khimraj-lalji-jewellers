import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { STORE_INFO } from './constants';
import { Header, Footer, StoreAddress } from './components/Layout';
import { HeroCarousel, Spotlight, CategoryShowcase } from './components/Widgets';

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  return null;
};

// --- COMPONENT: WHY SHOP WITH US ---
const WhyShopWithUs = () => {
  const items = [
    {
      icon: <img src="/assest/BIS.png" width="288" height="256" className="w-72 h-64 object-contain" alt="BIS Hallmark" />,
    },
    {
      icon: <img src="/assest/trust.png" width="288" height="256" className="w-72 h-64 object-contain" alt="Trusted Brand" />,
    },
    {
      icon: <img src="/assest/shiled.png" width="288" height="256" className="w-72 h-64 object-contain" alt="Leading Brand" />,
    },
    {
      icon: <img src="/assest/Dimond.png" width="288" height="256" className="w-72 h-64 object-contain" alt="Certified Diamonds" />,
    },
    {
      icon: <img src="/assest/crasfman.png" width="288" height="256" className="w-72 h-64 object-contain" alt="Seasoned Craftsmen" />,
    }
  ];

  return (
    <section className="py-24 bg-[#fffcf5] border-y border-gold-50/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif text-maroon-900 text-center mb-24 uppercase tracking-[0.2em]">
          Why Shop With <br /> Soni Khimraj Lalji Jewellers?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-20 max-w-[1600px] mx-auto items-center justify-items-center">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="h-64 w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- PAGE: HOME ---
const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroCarousel />

      {/* Brand Intro - Our Virāsat */}
      <section id="heritage" className="py-24 md:py-32 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-600 mb-6 block">The Heritage</span>
          <h2 className="text-3xl md:text-5xl font-serif text-maroon-900 mb-8 leading-tight">
            Soni Khimraj Lalji Jewellers: <br /> Preserving the Soul of Indian Artistry.
          </h2>
          <p className="text-gray-600 leading-loose font-light text-lg mb-10">
            Based in the iconic lanes of Ghatkopar West for over 25 years, Soni Khimraj Lalji Jewellers is more than just a jewellery house; we are custodians of a timeless heritage.
            Our pieces are handcrafted by master karigars who have inherited their skills through generations, ensuring that every design tells a story of pure gold and ultimate craftsmanship.
            We settled in Ghatkopar more than two decades ago to bring world-class quality and trust to our community.
          </p>
          <div className="w-px h-20 bg-gold-300 mx-auto"></div>
        </div>
      </section>

      {/* Spotlight Masterpiece (Dark Section) */}
      <section id="spotlight">
        <Spotlight />
      </section>

      {/* Categories as Visual Repertoire */}
      <section id="collections">
        <CategoryShowcase />
      </section>

      {/* Education/Knowledge Feature */}
      <section id="knowledge" className="bg-cream-50 py-24 border-y border-gold-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="/assest/hertage gold.png" width="300" height="400" loading="lazy" className="mt-12 w-full object-cover aspect-[3/4] shadow-lg" alt="Gold Jewelry Display" />
              <img src="/assest/month.png" width="300" height="400" loading="lazy" className="w-full object-cover aspect-[3/4] shadow-lg" alt="Elegant Jewelry" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4 block">Knowledge</span>
            <h2 className="text-4xl md:text-5xl font-serif text-maroon-900 mb-6">The Mark of Purity</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              We believe in absolute transparency. Every piece in our collection carries the BIS Hallmark (HUID), a guarantee of purity and authenticity.
              Understanding gold purity and diamond quality is essential to building your personal collection.
            </p>
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-gold-400 pl-6 py-2 cursor-pointer group">
                <h3 className="font-serif text-lg text-maroon-900 group-hover:text-gold-700 transition-colors">BIS Hallmark & HUID</h3>
                <p className="text-sm text-gray-600 font-light mt-1">Trust and transparency in every gram.</p>
              </div>
              <div className="border-l-2 border-gold-400 pl-6 py-2 cursor-pointer group">
                <h3 className="font-serif text-lg text-maroon-900 group-hover:text-gold-700 transition-colors">Diamond Quality Guide</h3>
                <p className="text-sm text-gray-600 font-light mt-1">Understanding the 4Cs of brilliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section - REPOSITIONED */}
      <section id="why-us">
        <WhyShopWithUs />
      </section>
      <StoreAddress />
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-gold-200 selection:text-maroon-900">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Fallback to homepage for all routes to keep it SPA/Homepage only */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;