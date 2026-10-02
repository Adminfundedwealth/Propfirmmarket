import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import type { PublicChallenge } from '@/lib/challengeService';
import { challengeService, getChallengeTitle } from '@/lib/challengeService';
import { ChallengeCard } from '@/components/ChallengeCard';
import { CompareChallengeButton } from '@/components/CompareChallengeButton';
import { PageMetadata } from '@/components/PageMetadata';
import { PublicSiteHeader } from '@/components/PublicSiteHeader';
import { analytics } from '@/lib/analytics';
import { MAX_COMPARE_CHALLENGES, useComparisonSelection } from '@/lib/comparisonSelection';

type LoadState = 'loading' | 'ready' | 'error';
type PriceRange = '' | 'under5k' | '5k-15k' | 'over15k';
type SortOrder = 'firm-asc' | 'challenge-asc' | 'price-asc' | 'price-desc' | 'target-asc' | 'drawdown-asc' | 'split-desc';

function typeLabel(type: PublicChallenge['challengeType']) {
  return ({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[type];
}

function targetValue(challenge: PublicChallenge) {
  return challenge.profitTarget.kind === 'none' ? Number.POSITIVE_INFINITY : challenge.profitTarget.percentages[0];
}

function targetFilterKey(challenge: PublicChallenge) {
  return challenge.profitTarget.kind === 'none' ? 'none' : `phases:${challenge.profitTarget.percentages.join('-')}`;
}

function targetFilterLabel(challenge: PublicChallenge) {
  return challenge.profitTarget.kind === 'none' ? 'No target listed' : `${challenge.profitTarget.percentages.join('% / ')}%`;
}

function dailyDrawdownFilterKey(challenge: PublicChallenge) {
  return challenge.dailyDrawdown.kind === 'none' ? 'none' : `percent:${challenge.dailyDrawdown.value}`;
}

function dailyDrawdownFilterLabel(challenge: PublicChallenge) {
  return challenge.dailyDrawdown.kind === 'none' ? 'None listed' : `${challenge.dailyDrawdown.value}%`;
}

function matchesQuery(challenge: PublicChallenge, query: string) {
  if (!query) return true;
  const searchable = [
    challenge.firmName,
    typeLabel(challenge.challengeType),
    challenge.leverage,
    ...challenge.platforms,
    ...challenge.markets,
    challenge.firmListedPrice.usd.toString(),
    challenge.firmListedPrice.inr.toString(),
  ].join(' ').toLowerCase();
  return searchable.includes(query);
}

export function ChallengeDirectoryPage() {
  const comparison = useComparisonSelection();
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '');
  const [firmId, setFirmId] = useState('');
  const [challengeType, setChallengeType] = useState('');
  const [market, setMarket] = useState('');
  const [platform, setPlatform] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>('');
  const [profitTarget, setProfitTarget] = useState('');
  const [maximumDrawdown, setMaximumDrawdown] = useState('');
  const [dailyDrawdown, setDailyDrawdown] = useState('');
  const [profitSplit, setProfitSplit] = useState('');
  const [payoutInterval, setPayoutInterval] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('firm-asc');

  useEffect(() => {
    let active = true;
    setLoadState('loading');
    challengeService.list()
      .then((records) => {
        if (!active) return;
        setChallenges(records);
        setLoadState('ready');
      })
      .catch(() => {
        if (active) setLoadState('error');
      });
    return () => { active = false; };
  }, [retryCount]);

  const firms = useMemo(() => {
    const unique = new Map<number, string>();
    for (const challenge of challenges) unique.set(challenge.firmId, challenge.firmName);
    return Array.from(unique, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [challenges]);

  const platforms = useMemo(
    () => Array.from(new Set(challenges.flatMap((challenge) => challenge.platforms))).sort((a, b) => a.localeCompare(b)),
    [challenges],
  );

  const markets = useMemo(
    () => Array.from(new Set(challenges.flatMap((challenge) => challenge.markets))).sort((a, b) => a.localeCompare(b)),
    [challenges],
  );

  const targetOptions = useMemo(() => Array.from(
    new Map(challenges.map((challenge) => [targetFilterKey(challenge), targetFilterLabel(challenge)])),
    ([value, label]) => ({ value, label }),
  ), [challenges]);
  const maximumDrawdownOptions = useMemo(
    () => Array.from(new Set(challenges.map((challenge) => challenge.maximumDrawdownPercent))).sort((a, b) => a - b),
    [challenges],
  );
  const dailyDrawdownOptions = useMemo(() => Array.from(
    new Map(challenges.map((challenge) => [dailyDrawdownFilterKey(challenge), dailyDrawdownFilterLabel(challenge)])),
    ([value, label]) => ({ value, label }),
  ), [challenges]);
  const profitSplitOptions = useMemo(
    () => Array.from(new Set(challenges.map((challenge) => challenge.profitSplitPercent))).sort((a, b) => a - b),
    [challenges],
  );
  const payoutIntervalOptions = useMemo(
    () => Array.from(new Set(challenges.map((challenge) => challenge.payoutIntervalDays))).sort((a, b) => a - b),
    [challenges],
  );

  const filteredChallenges = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const results = challenges.filter((challenge) => {
      if (!matchesQuery(challenge, normalizedQuery)) return false;
      if (firmId && challenge.firmId !== Number(firmId)) return false;
      if (challengeType && challenge.challengeType !== challengeType) return false;
      if (market && !challenge.markets.includes(market as PublicChallenge['markets'][number])) return false;
      if (platform && !challenge.platforms.includes(platform)) return false;
      if (profitTarget && targetFilterKey(challenge) !== profitTarget) return false;
      if (maximumDrawdown && challenge.maximumDrawdownPercent !== Number(maximumDrawdown)) return false;
      if (dailyDrawdown && dailyDrawdownFilterKey(challenge) !== dailyDrawdown) return false;
      if (profitSplit && challenge.profitSplitPercent !== Number(profitSplit)) return false;
      if (payoutInterval && challenge.payoutIntervalDays !== Number(payoutInterval)) return false;
      const listedInr = challenge.firmListedPrice.inr;
      if (priceRange === 'under5k' && listedInr >= 5000) return false;
      if (priceRange === '5k-15k' && (listedInr < 5000 || listedInr > 15000)) return false;
      if (priceRange === 'over15k' && listedInr <= 15000) return false;
      return true;
    });

    return results.sort((a, b) => {
      switch (sortOrder) {
        case 'challenge-asc': return getChallengeTitle(a).localeCompare(getChallengeTitle(b));
        case 'price-asc': return a.firmListedPrice.inr - b.firmListedPrice.inr || a.firmName.localeCompare(b.firmName);
        case 'price-desc': return b.firmListedPrice.inr - a.firmListedPrice.inr || a.firmName.localeCompare(b.firmName);
        case 'target-asc': return targetValue(a) - targetValue(b) || a.firmName.localeCompare(b.firmName);
        case 'drawdown-asc': return a.maximumDrawdownPercent - b.maximumDrawdownPercent || a.firmName.localeCompare(b.firmName);
        case 'split-desc': return b.profitSplitPercent - a.profitSplitPercent || a.firmName.localeCompare(b.firmName);
        default: return a.firmName.localeCompare(b.firmName);
      }
    });
  }, [challenges, query, firmId, challengeType, market, platform, priceRange, profitTarget, maximumDrawdown, dailyDrawdown, profitSplit, payoutInterval, sortOrder]);

  const activeFilterCount = Number(Boolean(firmId)) + Number(Boolean(challengeType)) + Number(Boolean(market)) + Number(Boolean(platform)) + Number(Boolean(priceRange)) + Number(Boolean(profitTarget)) + Number(Boolean(maximumDrawdown)) + Number(Boolean(dailyDrawdown)) + Number(Boolean(profitSplit)) + Number(Boolean(payoutInterval));
  const hasControlsChanged = Boolean(query.trim()) || activeFilterCount > 0 || sortOrder !== 'firm-asc';

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const timer = window.setTimeout(() => {
      const queryCategory = trimmedQuery.includes(' ') ? 'multi_term' : trimmedQuery.length < 3 ? 'short_term' : 'keyword';
      analytics.track('challenge_search', {
        query_length: trimmedQuery.length,
        query_category: queryCategory,
        result_count: filteredChallenges.length,
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [query, filteredChallenges.length]);

  function clearFilters() {
    setQuery('');
    setFirmId('');
    setChallengeType('');
    setMarket('');
    setPlatform('');
    setPriceRange('');
    setProfitTarget('');
    setMaximumDrawdown('');
    setDailyDrawdown('');
    setProfitSplit('');
    setPayoutInterval('');
    setSortOrder('firm-asc');
  }

  return (
    <div className="pf-public-page">
      <PageMetadata
        title="Challenge Rules Directory | PropFirmMarket"
        description="Browse challenge rule profiles currently listed by PropFirmMarket. Search firms, challenge types, markets, platforms and listed prices."
        url="https://propfirmmarket.in/challenges"
      />
      <PublicSiteHeader />
      <main className="pf-directory-main">
        <section className="pf-directory-intro" aria-labelledby="pf-challenges-title">
          <p className="pf-eyebrow">PUBLIC CHALLENGE DIRECTORY</p>
          <h1 id="pf-challenges-title">Challenge rules directory</h1>
          <p>Explore the rule profiles currently available in the site’s challenge comparison data. Account sizes and marketed challenge names are not included where the source does not specify them.</p>
          <div className="pf-directory-count" aria-live="polite">
            {loadState === 'ready' ? `${challenges.length} rule profiles listed` : loadState === 'loading' ? 'Loading challenge profiles…' : 'Challenge profiles unavailable'}
          </div>
        </section>

        <section className="pf-directory-tools" aria-label="Search and filter challenge profiles">
          <div className="pf-search-row">
            <label className="pf-field pf-search-field" htmlFor="challenge-search">
              <span>Search challenge profiles</span>
              <input
                id="challenge-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Firm, type, market, platform or listed price"
                autoComplete="off"
              />
            </label>
            {query && <button className="pf-clear-search" type="button" onClick={() => setQuery('')}>Clear search</button>}
          </div>

          <div className="pf-filter-grid">
            <label className="pf-field" htmlFor="challenge-firm">
              <span>Firm</span>
              <select id="challenge-firm" value={firmId} onChange={(event) => setFirmId(event.target.value)}>
                <option value="">All firms</option>
                {firms.map((firm) => <option key={firm.id} value={firm.id}>{firm.name}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-type">
              <span>Challenge type</span>
              <select id="challenge-type" value={challengeType} onChange={(event) => setChallengeType(event.target.value)}>
                <option value="">All types</option>
                {Array.from(new Set(challenges.map((challenge) => challenge.challengeType))).sort().map((type) => (
                  <option key={type} value={type}>{typeLabel(type)}</option>
                ))}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-market">
              <span>Market</span>
              <select id="challenge-market" value={market} onChange={(event) => setMarket(event.target.value)}>
                <option value="">All markets</option>
                {markets.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-platform">
              <span>Platform</span>
              <select id="challenge-platform" value={platform} onChange={(event) => setPlatform(event.target.value)}>
                <option value="">All platforms</option>
                {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-price">
              <span>Firm listing price (INR)</span>
              <select id="challenge-price" value={priceRange} onChange={(event) => setPriceRange(event.target.value as PriceRange)}>
                <option value="">Any listed price</option>
                <option value="under5k">Under ₹5,000</option>
                <option value="5k-15k">₹5,000–₹15,000</option>
                <option value="over15k">Over ₹15,000</option>
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-target">
              <span>Profit target</span>
              <select id="challenge-target" value={profitTarget} onChange={(event) => setProfitTarget(event.target.value)}>
                <option value="">Any listed target</option>
                {targetOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-max-drawdown">
              <span>Maximum drawdown</span>
              <select id="challenge-max-drawdown" value={maximumDrawdown} onChange={(event) => setMaximumDrawdown(event.target.value)}>
                <option value="">Any listed maximum</option>
                {maximumDrawdownOptions.map((value) => <option key={value} value={value}>{value}%</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-daily-drawdown">
              <span>Daily drawdown</span>
              <select id="challenge-daily-drawdown" value={dailyDrawdown} onChange={(event) => setDailyDrawdown(event.target.value)}>
                <option value="">Any listed daily drawdown</option>
                {dailyDrawdownOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-profit-split">
              <span>Firm profit split listed</span>
              <select id="challenge-profit-split" value={profitSplit} onChange={(event) => setProfitSplit(event.target.value)}>
                <option value="">Any listed split</option>
                {profitSplitOptions.map((value) => <option key={value} value={value}>{value}%</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-payout-interval">
              <span>Firm payout interval listed</span>
              <select id="challenge-payout-interval" value={payoutInterval} onChange={(event) => setPayoutInterval(event.target.value)}>
                <option value="">Any listed interval</option>
                {payoutIntervalOptions.map((value) => <option key={value} value={value}>{value} day{value === 1 ? '' : 's'}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="challenge-sort">
              <span>Sort by</span>
              <select id="challenge-sort" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
                <option value="firm-asc">Firm A–Z</option>
                <option value="challenge-asc">Profile A–Z</option>
                <option value="price-asc">Firm listing price low to high</option>
                <option value="price-desc">Firm listing price high to low</option>
                <option value="target-asc">Profit target low to high</option>
                <option value="drawdown-asc">Maximum drawdown low to high</option>
                <option value="split-desc">Listed profit split high to low</option>
              </select>
            </label>
          </div>

          <div className="pf-results-row" aria-live="polite">
            <p>{loadState === 'ready' ? `${filteredChallenges.length} of ${challenges.length} rule profiles` : ' '}</p>
            {activeFilterCount > 0 && <span>{activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}</span>}
            <span>{comparison.ids.length}/{MAX_COMPARE_CHALLENGES} selected for comparison</span>
            {comparison.ids.length > 0 && <Link className="pf-reset-button" href="/compare">Compare selected</Link>}
            {hasControlsChanged && <button type="button" className="pf-reset-button" onClick={clearFilters}>Clear filters</button>}
          </div>
          {comparison.message && <p className="pf-compare-feedback" role="status">{comparison.message}</p>}
        </section>

        {loadState === 'loading' && <div className="pf-state" role="status"><span className="pf-spinner" /> Loading challenge profiles…</div>}
        {loadState === 'error' && (
          <div className="pf-state pf-state-error" role="alert">
            <h2>We couldn’t load challenge profiles</h2>
            <p>Please try again. The current challenge source is temporarily unavailable.</p>
            <button className="btn btn-g" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
          </div>
        )}
        {loadState === 'ready' && filteredChallenges.length > 0 && (
          <div className="pf-challenge-grid">
            {filteredChallenges.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
          </div>
        )}
        {loadState === 'ready' && filteredChallenges.length === 0 && (
          <div className="pf-state pf-empty-state">
            <h2>No challenge profiles match these filters</h2>
            <p>Try a different search or clear one or more filters.</p>
            <button className="btn btn-o" type="button" onClick={clearFilters}>Clear search and filters</button>
          </div>
        )}
      </main>
    </div>
  );
}
