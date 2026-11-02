import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, routeFor } from '@/lib/routes';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/**
 * Keeps <title>, description, canonical and og/twitter tags in sync on client-side
 * navigation. The prerendered HTML already has the right values for the first load.
 */
export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = routeFor(pathname);
    const url = canonicalUrl(route);
    document.title = route.title;
    setMeta('meta[name="description"]', 'content', route.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[name="robots"]', 'content', route.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow');
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', route.title);
    setMeta('meta[property="og:description"]', 'content', route.description);
    setMeta('meta[name="twitter:title"]', 'content', route.title);
    setMeta('meta[name="twitter:description"]', 'content', route.description);
  }, [pathname]);
}
