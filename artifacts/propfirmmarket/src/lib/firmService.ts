import { firms, type Firm } from '../data/firms';

export interface FirmRepository {
  list(): Promise<Firm[]>;
  getBySlug(slug: string): Promise<Firm | undefined>;
}

export function normalizeFirmSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getFirmSlug(firm: Firm): string {
  return `${normalizeFirmSlug(firm.name)}-${firm.id}`;
}

export function getFirmPath(firm: Firm): string {
  return `/firm/${getFirmSlug(firm)}`;
}

export function getFirmSummary(firm: Firm): string {
  const market = firm.market[0].toUpperCase() + firm.market.slice(1);
  const challenge = ({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[firm.ctype];
  const platforms = firm.platforms.length > 0 ? firm.platforms.join(', ') : 'not listed';
  return `${market} profile with a ${challenge} challenge. Platforms listed: ${platforms}. Confirm current availability and terms directly with ${firm.name}.`;
}

export function findFirmBySlug(slug: string): Firm | undefined {
  const normalized = normalizeFirmSlug(slug);
  if (!normalized) return undefined;

  const idMatch = normalized.match(/-(\d+)$/);
  if (idMatch) {
    const firm = firms.find((item) => item.id === Number(idMatch[1]));
    return firm && getFirmSlug(firm) === normalized ? firm : undefined;
  }

  return firms.find((firm) => normalizeFirmSlug(firm.name) === normalized);
}

export function findFirmByName(name: string): Firm | undefined {
  const normalized = normalizeFirmSlug(name);
  return firms.find((firm) => normalizeFirmSlug(firm.name) === normalized);
}

export function hasListedPromoCode(firm: Firm): boolean {
  const code = firm.code.trim();
  return code.length > 0 && code.toUpperCase() !== 'MARKET';
}

export const firmRepository: FirmRepository = {
  async list() {
    return firms;
  },
  async getBySlug(slug) {
    return findFirmBySlug(slug);
  },
};

export const firmService = {
  list() {
    return firmRepository.list();
  },
  getBySlug(slug: string) {
    return firmRepository.getBySlug(slug);
  },
};