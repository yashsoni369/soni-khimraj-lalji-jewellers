// Server entry: Vercel's default streaming renderer + our security headers, set in
// code on every server-rendered response (/, the gold-rate page, 404s). Pre-rendered
// pages are static files and rely on the <meta> tags + frame breaker in root.tsx.
import type { EntryContext } from 'react-router';
import { handleRequest } from '@vercel/react-router/entry.server';

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

export default function handleDocumentRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) responseHeaders.set(key, value);
  return handleRequest(request, responseStatusCode, responseHeaders, routerContext);
}
