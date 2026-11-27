// GET /review – short link for the counter QR code, bills and WhatsApp messages.
// Redirects to the Google review form; while no review link is set, to the homepage.
// Kept out of the sitemap and marked noindex.
import { STORE_INFO } from '../../constants';

const respond = () =>
  new Response(null, {
    status: 302,
    headers: {
      Location: STORE_INFO.reviewUrl || '/',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  });

export const loader = respond;
export const action = respond;
