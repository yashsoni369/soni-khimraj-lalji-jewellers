import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, MapPin, Mail, Phone, Clock, Menu, X } from 'lucide-react';
import { STORE_INFO } from '../constants';
import { openWhatsApp, createEnquiryMessage } from '../services/whatsappService';



export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use the dark logo for the white header background by default
  const logoSrc = '/assest/logo dark.png';

  const navLinks = [
    { name: 'The Heritage', path: '/#heritage' },
    { name: 'Collections', path: '/#collections' },
    { name: 'Exclusives', path: '/#spotlight' },
    { name: 'Expertise', path: '/#knowledge' },
    { name: 'Why Us', path: '/#why-us' },
  ];

  // Split navigation for centered logo layout
  const leftNav = navLinks.slice(0, 3);
  const rightNav = navLinks.slice(3);

  return (
    <div className="sticky top-0 z-50" style={{ margin: 0, padding: 0 }}>
      {/* Top Bar - Ultra Minimal */}

      <header
        className={`z-40 w-full transition-all duration-700 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md border-gray-100 py-1' : 'bg-white border-transparent py-1.5'
          }`}
        style={{ margin: 0 }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-center relative h-16 md:h-20 lg:h-24">

          {/* MOBILE: Hamburger Menu Button */}
          <div className="lg:hidden absolute left-6 z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-maroon-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* DESKTOP: Left Nav */}
          <nav className="hidden lg:flex gap-8 xl:gap-12 items-center justify-end flex-1 pr-8">
            {leftNav.map((link) => (
              <a
                key={link.name}
                href={link.path.replace('/', '')}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.path.replace('/', ''));
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm xl:text-base uppercase tracking-[0.15em] hover:text-maroon-800 transition-colors relative group py-2 whitespace-nowrap text-gray-600"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-maroon-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CENTER: Logo */}
          <div className="flex-shrink-0 z-40 cursor-pointer mx-4 flex items-center justify-center p-1" onClick={() => navigate('/')}>
            <img
              src={logoSrc}
              alt="Soni Khimraj Lalji Logo"
              width="400"
              height="112"
              className={`w-auto object-contain transition-all duration-500 transform ${isScrolled ? 'h-12 scale-105' : 'h-20 md:h-24 lg:h-28 scale-100'}`}
            />
          </div>

          {/* DESKTOP: Right Nav */}
          <nav className="hidden lg:flex gap-8 xl:gap-12 items-center justify-start flex-1 pl-8">
            {rightNav.map((link) => (
              <a
                key={link.name}
                href={link.path.replace('/', '')}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.path.replace('/', ''));
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm xl:text-base uppercase tracking-[0.15em] hover:text-maroon-800 transition-colors relative group py-2 whitespace-nowrap text-gray-600"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-maroon-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* RIGHT: WhatsApp Contact */}
          <div className="flex items-center gap-2 lg:gap-3 z-50 absolute right-6 lg:right-12">
            <button
              onClick={() => openWhatsApp(createEnquiryMessage())}
              className="flex items-center gap-2 text-maroon-900 hover:text-gold-600 transition-colors bg-cream-50 hover:bg-gold-50 px-4 py-2 rounded-sm border border-maroon-200"
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%2325D366' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 365.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/%3E%3C/svg%3E"
                alt="WhatsApp"
                width="20"
                height="20"
                className="w-5 h-5"
              />
              <span className="hidden md:inline text-sm font-medium">Chat</span>
              <span className="md:hidden text-sm font-medium">Contact</span>
            </button>
          </div>

        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`lg:hidden fixed inset-x-0 top-[64px] md:top-[80px] bg-white border-b border-gray-100 shadow-xl transition-all duration-500 z-40 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path.replace('/', '')}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const target = document.querySelector(link.path.replace('/', ''));
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg uppercase tracking-[0.2em] text-gray-700 hover:text-maroon-900 border-b border-gray-50 pb-2"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openWhatsApp(createEnquiryMessage());
              }}
              className="mt-4 flex items-center justify-center gap-3 bg-maroon-900 text-white px-6 py-4 rounded-sm tracking-widest uppercase text-sm font-bold"
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 365.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/%3E%3C/svg%3E"
                alt="WhatsApp"
                width="20"
                height="20"
                className="w-5 h-5"
              />
              Chat Now
            </button>
          </nav>
        </div>
      </header>
    </div>
  );
};

// --- STORE ADDRESS SECTION ---
export const StoreAddress = () => {
  return (
    <section className="py-24 bg-maroon-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Store Address</h2>
          <div className="w-20 h-px bg-gold-400 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-sm overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Store Image */}
              <a
                href={STORE_INFO.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-64 md:h-auto overflow-hidden relative block group/img"
              >
                <img
                  src="/assest/shopimg.png"
                  width="600"
                  height="400"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  alt="Soni Khimraj Lalji Jewellers Store"
                />
                <div className="absolute inset-0 bg-maroon-900/10 group-hover/img:bg-transparent transition-colors"></div>
              </a>

              {/* Store Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-serif text-maroon-900 mb-6 pb-4 border-b-2 border-gold-200">Soni Khimraj Lalji Jewellers</h3>
                <div className="space-y-4 mb-8">
                  <a
                    href={STORE_INFO.mapEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group/addr"
                  >
                    <MapPin size={20} className="text-gold-600 mt-1 flex-shrink-0 group-hover/addr:scale-110 transition-transform" />
                    <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gold-700 transition-colors">
                      {STORE_INFO.address}
                    </p>
                  </a>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-gold-600 flex-shrink-0" />
                    <a href={`tel:${STORE_INFO.phone}`} className="text-sm text-gray-700 hover:text-gold-600 transition-colors">
                      {STORE_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-gold-600 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{STORE_INFO.hours}</p>
                  </div>
                </div>

                {/* WhatsApp Contact Button */}
                <button
                  onClick={() => openWhatsApp(createEnquiryMessage("I would like to visit your store"))}
                  className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 365.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.5 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'/%3E%3C/svg%3E"
                    alt="WhatsApp"
                    width="24"
                    height="24"
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-semibold text-lg">{STORE_INFO.phone}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#FFFCF5] text-maroon-900 pt-24 pb-12 border-t-2 border-gold-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Soni Khimraj Lalji Jewellers</h2>
          <p className="text-gray-600 font-light max-w-lg leading-relaxed text-sm md:text-base mb-6">
            Purveyors of fine gold and diamond jewellery for over 25 years.
            Preserving the art of Indian craftsmanship in the heart of Ghatkopar West, Mumbai.
          </p>

          {/* BIS Logo */}
          <img
            src="/assest/BIS_original.png"
            alt="BIS Hallmark"
            width="160"
            height="40"
            className="h-10 w-auto mb-6 opacity-90"
          />

          <div className="w-20 h-px bg-gold-400 mb-8"></div>

          <div className="flex gap-8">
            <a href={STORE_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-maroon-900 transition-colors" aria-label="Follow us on Instagram"><Instagram size={20} strokeWidth={1.5} /></a>
            <a href={`mailto:${STORE_INFO.email}`} className="text-gray-600 hover:text-maroon-900 transition-colors" aria-label="Send us an Email"><Mail size={20} strokeWidth={1.5} /></a>
            <a href={STORE_INFO.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-maroon-900 transition-colors" aria-label="Find us on Google Maps"><MapPin size={20} strokeWidth={1.5} /></a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-48 border-t border-gold-200 pt-16">
          <div>
            <h3 className="font-serif text-lg mb-6 text-maroon-900">Explore</h3>
            <ul className="space-y-3 text-xs uppercase tracking-widest text-gray-700">
              <li><a href="#heritage" className="hover:text-gold-600 transition-colors">The Heritage</a></li>
              <li><a href="#why-us" className="hover:text-gold-600 transition-colors">Why Us</a></li>
              <li><a href="#collections" className="hover:text-gold-600 transition-colors">Collections</a></li>
              <li><a href="#knowledge" className="hover:text-gold-600 transition-colors">Knowledge</a></li>
            </ul>
          </div>
          <div className="max-w-xs">
            <h3 className="font-serif text-lg mb-6 text-maroon-900">Visit</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{STORE_INFO.address}</p>
            <a
              href={STORE_INFO.mapEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-gold-600 border-b-2 border-gold-600 pb-1 hover:text-maroon-900 hover:border-maroon-900 transition-all font-medium inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="text-center mt-20 pt-8 border-t border-gray-100">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 Soni Khimraj Lalji Jewellers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
