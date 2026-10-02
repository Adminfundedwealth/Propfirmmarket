import { firms, type Firm } from '@/data/firms';
import { getFirmPath, normalizeFirmSlug } from '@/lib/firmService';

interface ChallengeRuleProfileSource {
  firmId: number;
  profitTarget1: number;
  profitTarget2: number | null;
  dailyDrawdown: number;
  maxDrawdown: number;
  minTradeDays: number | null;
  maxTradeDays: number | null;
  leverageFx: string;
  newsTrading: boolean;
  weekendHold: boolean;
  resetFee: number | null;
  refundable: boolean;
  activationFee: number;
}

export interface PublicChallenge {
  id: string;
  slug: string;
  firmId: number;
  firmName: string;
  firm: {
    id: number;
    name: string;
    logo: string;
    color: string;
  };
  firmProfilePath: string;
  challengeType: Firm['ctype'];
  challengeName?: string;
  accountSize?: string;
  firmListedPrice: {
    usd: number;
    inr: number;
  };
  profitTarget: { kind: 'none' } | { kind: 'phased'; percentages: number[] };
  maximumDrawdownPercent: number;
  dailyDrawdown: { kind: 'none' } | { kind: 'percent'; value: number };
  profitSplitPercent: number;
  payoutIntervalDays: number;
  leverage: string;
  minimumTradingDays?: number;
  maximumTradingDays?: number;
  platforms: string[];
  markets: Firm['market'][];
  rules: {
    newsTradingAllowed: boolean;
    weekendHoldingAllowed: boolean;
    refundable: boolean;
    resetFeeAmount?: number;
    activationFeeAmount: number;
    feeCurrency?: string;
  };
  discountReference?: string;
  source: {
    rules: 'existing challenge comparison data';
    firmListing: 'existing firm catalog';
  };
}

export interface ChallengeRepository {
  list(): Promise<PublicChallenge[]>;
  listByFirmId(firmId: number): Promise<PublicChallenge[]>;
  listByIds(ids: string[]): Promise<PublicChallenge[]>;
  getById(id: string): Promise<PublicChallenge | undefined>;
  getBySlug(slug: string): Promise<PublicChallenge | undefined>;
}

const challengeRuleProfiles: ChallengeRuleProfileSource[] = [
  { firmId: 1, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 4, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 49, refundable: true, activationFee: 0 },
  { firmId: 2, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 12, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 39, refundable: true, activationFee: 0 },
  { firmId: 3, profitTarget1: 0, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 6, minTradeDays: 0, maxTradeDays: null, leverageFx: '1:30', newsTrading: true, weekendHold: false, resetFee: null, refundable: false, activationFee: 0 },
  { firmId: 4, profitTarget1: 10, profitTarget2: null, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 19, refundable: true, activationFee: 0 },
  { firmId: 5, profitTarget1: 6, profitTarget2: null, dailyDrawdown: 0, maxDrawdown: 6, minTradeDays: 7, maxTradeDays: null, leverageFx: '1:20', newsTrading: true, weekendHold: true, resetFee: 80, refundable: false, activationFee: 85 },
  { firmId: 6, profitTarget1: 8, profitTarget2: null, dailyDrawdown: 4, maxDrawdown: 7, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:50', newsTrading: true, weekendHold: true, resetFee: null, refundable: true, activationFee: 0 },
  { firmId: 7, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 5, maxTradeDays: 30, leverageFx: '1:100', newsTrading: false, weekendHold: false, resetFee: 35, refundable: true, activationFee: 0 },
  { firmId: 8, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 4, maxDrawdown: 8, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 29, refundable: true, activationFee: 0 },
  { firmId: 9, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 29, refundable: true, activationFee: 0 },
  { firmId: 10, profitTarget1: 6, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 6, minTradeDays: 0, maxTradeDays: null, leverageFx: '1:50', newsTrading: true, weekendHold: false, resetFee: null, refundable: false, activationFee: 0 },
  { firmId: 11, profitTarget1: 8, profitTarget2: null, dailyDrawdown: 5, maxDrawdown: 8, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 25, refundable: true, activationFee: 0 },
  { firmId: 12, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:50', newsTrading: true, weekendHold: true, resetFee: 29, refundable: true, activationFee: 0 },
  { firmId: 13, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 35, refundable: true, activationFee: 0 },
  { firmId: 14, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 30, refundable: true, activationFee: 0 },
  { firmId: 15, profitTarget1: 7, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 5, minTradeDays: 3, maxTradeDays: 30, leverageFx: '1:30', newsTrading: false, weekendHold: false, resetFee: 39, refundable: false, activationFee: 0 },
  { firmId: 16, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 25, refundable: true, activationFee: 0 },
  { firmId: 17, profitTarget1: 6, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 6, minTradeDays: 7, maxTradeDays: null, leverageFx: '1:20', newsTrading: true, weekendHold: true, resetFee: 60, refundable: false, activationFee: 0 },
  { firmId: 18, profitTarget1: 7, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 5.5, minTradeDays: 7, maxTradeDays: null, leverageFx: '1:20', newsTrading: true, weekendHold: true, resetFee: 49, refundable: false, activationFee: 0 },
  { firmId: 19, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 29, refundable: true, activationFee: 0 },
  { firmId: 20, profitTarget1: 8, profitTarget2: null, dailyDrawdown: 4, maxDrawdown: 8, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 39, refundable: true, activationFee: 0 },
  { firmId: 21, profitTarget1: 10, profitTarget2: null, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 25, refundable: true, activationFee: 0 },
  { firmId: 22, profitTarget1: 8, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:50', newsTrading: true, weekendHold: false, resetFee: 30, refundable: true, activationFee: 0 },
  { firmId: 23, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 4, maxDrawdown: 8, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:100', newsTrading: false, weekendHold: false, resetFee: 35, refundable: true, activationFee: 0 },
  { firmId: 24, profitTarget1: 6, profitTarget2: null, dailyDrawdown: 2.5, maxDrawdown: 5.5, minTradeDays: 7, maxTradeDays: null, leverageFx: '1:20', newsTrading: true, weekendHold: true, resetFee: 50, refundable: false, activationFee: 130 },
  { firmId: 25, profitTarget1: 6, profitTarget2: null, dailyDrawdown: 3, maxDrawdown: 6, minTradeDays: 7, maxTradeDays: null, leverageFx: '1:20', newsTrading: true, weekendHold: true, resetFee: 55, refundable: false, activationFee: 0 },
  { firmId: 26, profitTarget1: 8, profitTarget2: null, dailyDrawdown: 5, maxDrawdown: 8, minTradeDays: 5, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 19, refundable: true, activationFee: 0 },
  { firmId: 27, profitTarget1: 10, profitTarget2: 5, dailyDrawdown: 5, maxDrawdown: 10, minTradeDays: 3, maxTradeDays: null, leverageFx: '1:100', newsTrading: true, weekendHold: true, resetFee: 30, refundable: true, activationFee: 0 },
  { firmId: 28, profitTarget1: 8, profitTarget2: null, dailyDrawdown: 4, maxDrawdown: 8, minTradeDays: 1, maxTradeDays: null, leverageFx: '1:50', newsTrading: true, weekendHold: true, resetFee: null, refundable: false, activationFee: 0 },
];

function normalizeChallenge(source: ChallengeRuleProfileSource, firm: Firm): PublicChallenge {
  const slugBase = normalizeFirmSlug(firm.name);
  return {
    id: `firm-${firm.id}-challenge-rules`,
    slug: `${slugBase}-challenge-${firm.id}`,
    firmId: firm.id,
    firmName: firm.name,
    firm: {
      id: firm.id,
      name: firm.name,
      logo: firm.logo,
      color: firm.color,
    },
    firmProfilePath: getFirmPath(firm),
    challengeType: firm.ctype,
    firmListedPrice: { usd: firm.price, inr: firm.inrPrice },
    profitTarget: source.profitTarget1 === 0
      ? { kind: 'none' }
      : {
          kind: 'phased',
          percentages: [source.profitTarget1, ...(source.profitTarget2 === null ? [] : [source.profitTarget2])],
        },
    maximumDrawdownPercent: source.maxDrawdown,
    dailyDrawdown: source.dailyDrawdown === 0
      ? { kind: 'none' }
      : { kind: 'percent', value: source.dailyDrawdown },
    profitSplitPercent: firm.split,
    payoutIntervalDays: firm.payoutDays,
    leverage: source.leverageFx,
    ...(source.minTradeDays === null ? {} : { minimumTradingDays: source.minTradeDays }),
    ...(source.maxTradeDays === null ? {} : { maximumTradingDays: source.maxTradeDays }),
    platforms: firm.platforms,
    markets: [firm.market],
    rules: {
      newsTradingAllowed: source.newsTrading,
      weekendHoldingAllowed: source.weekendHold,
      refundable: source.refundable,
      ...(source.resetFee === null || source.resetFee === 0 ? {} : { resetFeeAmount: source.resetFee }),
      activationFeeAmount: source.activationFee,
    },
    source: {
      rules: 'existing challenge comparison data',
      firmListing: 'existing firm catalog',
    },
  };
}

const normalizedChallenges = challengeRuleProfiles.flatMap((profile) => {
  const firm = firms.find((item) => item.id === profile.firmId);
  return firm ? [normalizeChallenge(profile, firm)] : [];
});

export const challengeRepository: ChallengeRepository = {
  async list() {
    return normalizedChallenges;
  },
  async listByFirmId(firmId) {
    return normalizedChallenges.filter((challenge) => challenge.firmId === firmId);
  },
  async listByIds(ids) {
    const byId = new Map(normalizedChallenges.map((challenge) => [challenge.id, challenge]));
    return ids.flatMap((id) => {
      const challenge = byId.get(id);
      return challenge ? [challenge] : [];
    });
  },
  async getById(id) {
    return normalizedChallenges.find((challenge) => challenge.id === id);
  },
  async getBySlug(slug) {
    return normalizedChallenges.find((challenge) => challenge.slug === slug);
  },
};

export const challengeService = {
  list() {
    return challengeRepository.list();
  },
  listByFirmId(firmId: number) {
    return challengeRepository.listByFirmId(firmId);
  },
  listByIds(ids: string[]) {
    return challengeRepository.listByIds(ids);
  },
  getById(id: string) {
    return challengeRepository.getById(id);
  },
  getBySlug(slug: string) {
    return challengeRepository.getBySlug(slug);
  },
};

export function isKnownChallengeId(id: string): boolean {
  return normalizedChallenges.some((challenge) => challenge.id === id);
}

export function getChallengeTitle(challenge: PublicChallenge): string {
  const typeLabels: Record<Firm['ctype'], string> = {
    '1step': '1-Step',
    '2step': '2-Step',
    instant: 'Instant',
    '24h': '24-Hour',
  };
  return `${challenge.firmName} · ${typeLabels[challenge.challengeType]} rules profile`;
}
