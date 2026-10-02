export const PLATFORMS = {
  market: 'https://propfirmmarket.in',
  championship: 'https://trading-championship--nextrade62.replit.app',
  terminal: 'https://terminal.propfirmmarket.in',
};

export type Platform = 'market' | 'championship' | 'terminal';

export function detectPlatform(): Platform {
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  if (host.startsWith('championships.')) return 'championship';
  if (host.startsWith('terminal.')) return 'terminal';
  return 'market';
}

export const CURRENT_PLATFORM: Platform = detectPlatform();

export const SUBDOMAIN_SECTIONS: Record<Platform, string> = {
  market: '',
  championship: 'tournamentSec',
  terminal: 'dataDashSec',
};

export interface EcoUser {
  id: string;
  name: string;
  joinedAt: number;
  platform: Platform;
  challengeStatus?: 'none' | 'passed' | 'failed';
  profitPct?: number;
}

const USER_KEY = 'pfm_eco_user';
const CLICKS_KEY = 'pfm_click_log';
const SEEN_WELCOME_KEY = 'pfm_seen_welcome';
const SEEN_EXIT_KEY = 'pfm_seen_exit';

export function getUser(): EcoUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setUser(user: EcoUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function createGuestUser(): EcoUser {
  const user: EcoUser = {
    id: `pfm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: 'Trader',
    joinedAt: Date.now(),
    platform: CURRENT_PLATFORM,
    challengeStatus: 'none',
  };
  setUser(user);
  return user;
}

export function hasSeenWelcome(): boolean {
  return localStorage.getItem(SEEN_WELCOME_KEY) === '1';
}
export function markWelcomeSeen() {
  localStorage.setItem(SEEN_WELCOME_KEY, '1');
}

export function hasSeenExit(): boolean {
  return sessionStorage.getItem(SEEN_EXIT_KEY) === '1';
}
export function markExitSeen() {
  sessionStorage.setItem(SEEN_EXIT_KEY, '1');
}

export interface ClickEvent {
  type: string;
  target: string;
  timestamp: number;
  platform: Platform;
}

export function trackClick(type: string, target: string) {
  try {
    const log: ClickEvent[] = JSON.parse(localStorage.getItem(CLICKS_KEY) || '[]');
    log.push({ type, target, timestamp: Date.now(), platform: CURRENT_PLATFORM });
    if (log.length > 200) log.splice(0, log.length - 200);
    localStorage.setItem(CLICKS_KEY, JSON.stringify(log));
  } catch { /* ignore */ }
}

export function getClickLog(): ClickEvent[] {
  try { return JSON.parse(localStorage.getItem(CLICKS_KEY) || '[]'); } catch { return []; }
}

export function navigateTo(platform: Platform, path = '') {
  trackClick('platform_nav', platform);
  if (platform === 'market') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (platform === 'terminal') {
    const el = document.getElementById(SUBDOMAIN_SECTIONS.terminal);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  }
  const url = PLATFORMS[platform] + path;
  window.open(url, '_blank', 'noopener,noreferrer');
}
