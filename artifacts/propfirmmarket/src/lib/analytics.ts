export type AnalyticsPropertyValue = string | number | boolean | undefined | null;

export type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

export const ANALYTICS_EVENT_TAXONOMY = [
  'page_view',
  'firm_search',
  'firm_view',
  'challenge_search',
  'challenge_view',
  'compare_opened',
  'compare_add',
  'compare_remove',
  'compare_clear',
  'compare_share',
  'cta_click',
  'affiliate_click',
  'promo_view',
  'promo_copy',
  'blog_view',
] as const;

const SESSION_CAMPAIGN_KEY = 'pfm_session_campaign_v1';
const LAST_PAGE_KEY = 'pfm_last_page_v1';
const SENSITIVE_KEYWORDS = [
  'email',
  'phone',
  'name',
  'address',
  'payment',
  'card',
  'auth',
  'token',
  'password',
  'secret',
  'api_key',
  'api-key',
  'session',
  'financial',
  'bank',
  'utr',
];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function normalizePagePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.split('?')[0].split('#')[0].trim();
  if (!trimmed || trimmed === '') return '/';
  const normalized = trimmed === '/' ? '/' : trimmed.replace(/\/+$/, '');
  return normalized || '/';
}

function getSafeString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 180);
}

function sanitizeProperties(input: AnalyticsProperties = {}): AnalyticsProperties {
  const output: AnalyticsProperties = {};

  for (const [key, value] of Object.entries(input)) {
    const keyLower = key.toLowerCase();
    const containsSensitiveKey = SENSITIVE_KEYWORDS.some((needle) => keyLower.includes(needle));
    if (containsSensitiveKey) continue;

    if (typeof value === 'string') {
      const safe = getSafeString(value);
      if (!safe) continue;
      output[key] = safe;
      continue;
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      output[key] = value;
      continue;
    }

    if (typeof value === 'boolean') {
      output[key] = value;
      continue;
    }
  }

  return output;
}

export function getCurrentPath(): string {
  if (!isBrowser()) return '/';
  return normalizePagePath(window.location.pathname);
}

export function getPreviousPagePath(): string {
  if (!isBrowser()) return '/';
  try {
    const value = window.sessionStorage.getItem(LAST_PAGE_KEY);
    return value ? normalizePagePath(value) : '/';
  } catch {
    return '/';
  }
}

function getNormalizedCampaign(value: string | null): string | undefined {
  const candidate = getSafeString(value);
  if (!candidate) return undefined;
  return candidate.length > 120 ? candidate.slice(0, 120) : candidate;
}

export function getCampaignContext(): AnalyticsProperties {
  if (!isBrowser()) return {};

  const search = new URLSearchParams(window.location.search);
  const campaignEntries = {
    utm_source: search.get('utm_source'),
    utm_medium: search.get('utm_medium'),
    utm_campaign: search.get('utm_campaign'),
    utm_term: search.get('utm_term'),
    utm_content: search.get('utm_content'),
  };

  const context: AnalyticsProperties = {};
  for (const [key, value] of Object.entries(campaignEntries)) {
    const normalized = getNormalizedCampaign(value);
    if (normalized) context[key] = normalized;
  }

  const referrer = document.referrer ? new URL(document.referrer).hostname : '';
  if (referrer) context.referrer = referrer;

  context.landing_page = getCurrentPath();

  const sessionCampaign = (() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_CAMPAIGN_KEY);
      if (!raw) return {};
      return JSON.parse(raw) as AnalyticsProperties;
    } catch {
      return {};
    }
  })();

  if (Object.keys(context).length > 0) {
    const merged = { ...sessionCampaign, ...context };
    try {
      window.sessionStorage.setItem(SESSION_CAMPAIGN_KEY, JSON.stringify(merged));
    } catch {
      // ignore storage failures intentionally; analytics must stay non-blocking.
    }
  }

  return sanitizeProperties({ ...sessionCampaign, ...context });
}

export function initializeAnalytics(): void {
  if (!isBrowser()) return;

  const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();
  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer ?? [];
  if (!Array.isArray(dataLayer)) return;

  const globalWindow = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  globalWindow.dataLayer = dataLayer;
  globalWindow.gtag = globalWindow.gtag ?? function gtag() {
    dataLayer.push(Array.from(arguments));
  };

  if (measurementId) {
    globalWindow.gtag('config', measurementId, { send_page_view: false, anonymize_ip: true });
  }
}

function emitProviderEvent(eventName: string, properties: AnalyticsProperties = {}): void {
  const sanitized = sanitizeProperties(properties);

  if (typeof window !== 'undefined' && typeof (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', eventName, sanitized);
  }

  const dataLayer = (window as typeof window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: eventName, ...sanitized });
  }

  if (import.meta.env.DEV) {
    console.info(`[analytics:${eventName}]`, sanitized);
  }
}

export function analyticsPageView(path: string, metadata: AnalyticsProperties = {}): string | null {
  if (!isBrowser()) return null;

  const currentPath = normalizePagePath(path || window.location.pathname);
  const previousPath = (() => {
    try {
      const value = window.sessionStorage.getItem(LAST_PAGE_KEY);
      return value ? normalizePagePath(value) : null;
    } catch {
      return null;
    }
  })();

  const campaignContext = getCampaignContext();
  const payload = sanitizeProperties({
    ...campaignContext,
    page_path: currentPath,
    page_title: document.title || currentPath,
    ...metadata,
  });

  emitProviderEvent('page_view', payload);

  try {
    window.sessionStorage.setItem(LAST_PAGE_KEY, currentPath);
  } catch {
    // ignore storage failures intentionally.
  }

  return previousPath;
}

export function analyticsTrack(eventName: string, properties: AnalyticsProperties = {}): void {
  const payload = sanitizeProperties(properties);
  emitProviderEvent(eventName, payload);
}

export const analytics = {
  initialize: initializeAnalytics,
  pageView: analyticsPageView,
  track: analyticsTrack,
  getPreviousPagePath,
  getCurrentPath,
  getCampaignContext,
  eventNames: ANALYTICS_EVENT_TAXONOMY,
};
