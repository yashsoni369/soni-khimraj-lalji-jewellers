// Any unknown URL: the NotFound page with a real 404 status (CDN-cached, so repeated
// bot probes don't re-render), no canonical and noindex (metaFor).
import { data } from 'react-router';
import type { Route } from './+types/not-found';
import { NotFoundPage } from '../../App';
import { NOT_FOUND_CACHE } from '../../lib/pageCache';
import { metaFor, NOT_FOUND_ROUTE } from '../../lib/routes';

export const loader = () => data(null, { status: 404 });

export const headers: Route.HeadersFunction = () => ({ 'Cache-Control': NOT_FOUND_CACHE });

export const meta: Route.MetaFunction = () => metaFor(NOT_FOUND_ROUTE, null);

export default function NotFound() {
  return <NotFoundPage />;
}
