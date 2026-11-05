// Document shell for every page (replaces index.html). Site-wide <head> tags live
// here; per-page tags come from each route's `meta` export (lib/routes.ts metaFor).
import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import { AppShell } from '../App';
import siteJsonLd from '../lib/site-jsonld.json';
import '../index.css';

const MAIN_HOST = 'www.sonikhimrajlaljijewellers.com';
const OG_IMAGE = `https://${MAIN_HOST}/images/og-image.jpg`;
const OG_IMAGE_ALT = 'Soni Khimraj Lalji Jewellers shop front in Ghatkopar West, Mumbai';
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';

// Runs before first paint:
//  - anti-clickjacking (OWASP frame breaker): the page stays hidden unless it is the
//    top window; marks <html class="skl-top"> instead of removing a node React owns
//  - main domain only: any other host serving this build gets noindex
const HEAD_GUARD = `(function(){
if (self === top) { document.documentElement.classList.add('skl-top'); } else { top.location = self.location; }
var h = location.hostname;
if (h !== '${MAIN_HOST}' && h !== 'localhost' && h !== '127.0.0.1') {
  var m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex'; document.head.appendChild(m);
}
})();`;

// Non-blocking web fonts (same as the old media="print" onload trick).
const LOAD_FONTS = `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONTS_URL}';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l);})();`;

const GTAG = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4R59PN3Y3V');`;

const GTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KJGS93VK');`;

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
  { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: HEAD_GUARD adds a class to <html> before React hydrates.
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Code-level page protection (host-agnostic) */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Content-Security-Policy" content="base-uri 'self'; object-src 'none'; upgrade-insecure-requests" />
        <style>{'html:not(.skl-top) body{display:none !important;}'}</style>
        <noscript>
          <style>{'body{display:block !important;}'}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: HEAD_GUARD }} />
        <Meta />
        <meta name="theme-color" content="#760505" />
        {/* Local signals */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Ghatkopar West, Mumbai" />
        <meta name="geo.position" content="19.0883773;72.9054623" />
        <meta name="ICBM" content="19.0883773, 72.9054623" />
        {/* Open Graph / WhatsApp / Twitter (per-page title, description, url come from <Meta />) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Soni Khimraj Lalji Jewellers" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
        {/* Site-wide structured data: keep NAP identical to constants.ts and Google Business Profile. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, '\\u003c') }}
        />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: LOAD_FONTS }} />
        <noscript>
          <link href={FONTS_URL} rel="stylesheet" />
        </noscript>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4R59PN3Y3V" />
        <script dangerouslySetInnerHTML={{ __html: GTAG }} />
        <script dangerouslySetInnerHTML={{ __html: GTM }} />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJGS93VK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <div className="bg-noise" />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // Only unexpected errors land here; unknown URLs are handled by routes/not-found.tsx.
  if (import.meta.env.DEV) console.error(error);
  return (
    <AppShell>
      <section className="py-24 md:py-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-maroon-900 mb-6">Something went wrong</h1>
        <p className="text-gray-600">
          Please refresh the page, or <a className="underline" href="/">go to the homepage</a>.
        </p>
      </section>
    </AppShell>
  );
}
