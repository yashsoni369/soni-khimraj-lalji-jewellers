import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/tracking';

// HashRouter hash-only URL changes aren't caught reliably by GTM's History Change
// trigger, so we emit page_view from React Router instead.
export function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    trackPageView();
  }, [location.pathname, location.search, location.hash]);
}
