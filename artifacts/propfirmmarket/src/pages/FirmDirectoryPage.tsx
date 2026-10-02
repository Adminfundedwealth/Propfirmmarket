import { useEffect, useMemo, useState } from 'react';
import type { Firm } from '@/data/firms';
import { FirmCard } from '@/components/FirmCard';
import { PageMetadata } from '@/components/PageMetadata';
import { PublicSiteHeader } from '@/components/PublicSiteHeader';
import { analytics } from '@/lib/analytics';
import { firmService, hasListedPromoCode } from '@/lib/firmService';

type LoadState = 'loading' | 'ready' | 'error';
type PriceRange = '' | 'under5k' | '5k-15k' | 'over15k';
type SortOrder = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'payout-asc' | 'split-desc';

const MARKET_LABELS: Record<Firm['market'], string> = {
  forex: 'Forex',
  futures: 'Futures',
  crypto: 'Crypto',
};

const CHALLENGE_LABELS: Record<Firm['ctype'], string> = {
  '1step': '1-Step',
  '2step': '2-Step',
  instant: 'Instant',
  '24h': '24-Hour',
};

function matchesQuery(firm: Firm, query: string): boolean {
  if (!query) return true;
  const searchable = [
    firm.name,
    firm.market,
    MARKET_LABELS[firm.market],
    firm.ctype,
    CHALLENGE_LABELS[firm.ctype],
    ...firm.platforms,
  ].join(' ').toLowerCase();
  return searchable.includes(query);
}

export function FirmDirectoryPage() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '');
  const [market, setMarket] = useState<Firm['market'] | ''>('');
  const [challenge, setChallenge] = useState<Firm['ctype'] | ''>('');
  const [platform, setPlatform] = useState('');
  const [priceRange, setPriceRange] = useState<PriceRange>('');
  const [promoOnly, setPromoOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc');

  useEffect(() => {
    let active = true;
    setLoadState('loading');
    firmService.list()
      .then((records) => {
        if (!active) return;
        setFirms(records);
        setLoadState('ready');
      })
      .catch(() => {
        if (active) setLoadState('error');
      });
    return () => { active = false; };
  }, [retryCount]);

  const platforms = useMemo(
    () => Array.from(new Set(firms.flatMap((firm) => firm.platforms))).sort((a, b) => a.localeCompare(b)),
    [firms],
  );

  const filteredFirms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const results = firms.filter((firm) => {
      if (!matchesQuery(firm, normalizedQuery)) return false;
      if (market && firm.market !== market) return false;
      if (challenge && firm.ctype !== challenge) return false;
      if (platform && !firm.platforms.includes(platform)) return false;
      if (priceRange === 'under5k' && firm.inrPrice >= 5000) return false;
      if (priceRange === '5k-15k' && (firm.inrPrice < 5000 || firm.inrPrice > 15000)) return false;
      if (priceRange === 'over15k' && firm.inrPrice <= 15000) return false;
      if (promoOnly && !hasListedPromoCode(firm)) return false;
      return true;
    });

    return results.sort((a, b) => {
      switch (sortOrder) {
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.inrPrice - b.inrPrice || a.name.localeCompare(b.name);
        case 'price-desc': return b.inrPrice - a.inrPrice || a.name.localeCompare(b.name);
        case 'payout-asc': return a.payoutDays - b.payoutDays || a.name.localeCompare(b.name);
        case 'split-desc': return b.split - a.split || a.name.localeCompare(b.name);
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [firms, query, market, challenge, platform, priceRange, promoOnly, sortOrder]);

  const activeFilterCount = Number(Boolean(market)) + Number(Boolean(challenge)) + Number(Boolean(platform)) + Number(Boolean(priceRange)) + Number(promoOnly);
  const hasFilters = Boolean(query.trim()) || activeFilterCount > 0 || sortOrder !== 'name-asc';

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const timer = window.setTimeout(() => {
      const queryCategory = trimmedQuery.includes(' ') ? 'multi_term' : trimmedQuery.length < 3 ? 'short_term' : 'keyword';
      analytics.track('firm_search', {
        query_length: trimmedQuery.length,
        query_category: queryCategory,
        result_count: filteredFirms.length,
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [query, filteredFirms.length]);

  function clearFilters() {
    setQuery('');
    setMarket('');
    setChallenge('');
    setPlatform('');
    setPriceRange('');
    setPromoOnly(false);
    setSortOrder('name-asc');
  }

  return (
    <div className="pf-public-page">
      <PageMetadata
        title="Prop Trading Firm Directory | PropFirmMarket"
        description="Browse the PropFirmMarket firm directory. Search and filter listed firms by market, challenge type, platform and price."
        url="https://propfirmmarket.in/firms"
      />
      <PublicSiteHeader />
      <main className="pf-directory-main">
        <section className="pf-directory-intro" aria-labelledby="pf-directory-title">
          <p className="pf-eyebrow">PUBLIC FIRM DIRECTORY</p>
          <h1 id="pf-directory-title">Prop firm directory</h1>
          <p>Explore the firms currently listed on PropFirmMarket. Narrow the list by the details available in each record.</p>
          <div className="pf-directory-count" aria-live="polite">
            {loadState === 'ready' ? `${firms.length} firms listed` : loadState === 'loading' ? 'Loading firms…' : 'Firm list unavailable'}
          </div>
        </section>

        <section className="pf-directory-tools" aria-label="Search and filter firms">
          <div className="pf-search-row">
            <label className="pf-field pf-search-field" htmlFor="firm-search">
              <span>Search firms</span>
              <input
                id="firm-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, market, platform or challenge type"
                autoComplete="off"
              />
            </label>
            {query && <button className="pf-clear-search" type="button" onClick={() => setQuery('')}>Clear search</button>}
          </div>

          <div className="pf-filter-grid">
            <label className="pf-field" htmlFor="firm-market">
              <span>Market</span>
              <select id="firm-market" value={market} onChange={(event) => setMarket(event.target.value as Firm['market'] | '')}>
                <option value="">All markets</option>
                {Object.entries(MARKET_LABELS).map(([value, label]) => (
                  firms.some((firm) => firm.market === value) && <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="pf-field" htmlFor="firm-challenge">
              <span>Challenge type</span>
              <select id="firm-challenge" value={challenge} onChange={(event) => setChallenge(event.target.value as Firm['ctype'] | '')}>
                <option value="">All challenge types</option>
                {Object.entries(CHALLENGE_LABELS).map(([value, label]) => (
                  firms.some((firm) => firm.ctype === value) && <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="pf-field" htmlFor="firm-platform">
              <span>Platform</span>
              <select id="firm-platform" value={platform} onChange={(event) => setPlatform(event.target.value)}>
                <option value="">All platforms</option>
                {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="pf-field" htmlFor="firm-price-range">
              <span>Listed price (INR)</span>
              <select id="firm-price-range" value={priceRange} onChange={(event) => setPriceRange(event.target.value as PriceRange)}>
                <option value="">Any price</option>
                <option value="under5k">Under ₹5,000</option>
                <option value="5k-15k">₹5,000–₹15,000</option>
                <option value="over15k">Over ₹15,000</option>
              </select>
            </label>
            <label className="pf-checkbox-field">
              <input type="checkbox" checked={promoOnly} onChange={(event) => setPromoOnly(event.target.checked)} />
              <span>Specific promo code listed</span>
            </label>
            <label className="pf-field" htmlFor="firm-sort">
              <span>Sort by</span>
              <select id="firm-sort" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
                <option value="payout-asc">Listed payout interval</option>
                <option value="split-desc">Profit split high to low</option>
              </select>
            </label>
          </div>

          <div className="pf-results-row" aria-live="polite">
            <p>{loadState === 'ready' ? `${filteredFirms.length} of ${firms.length} firms` : ' '}</p>
            {activeFilterCount > 0 && <span>{activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}</span>}
            {hasFilters && <button type="button" className="pf-reset-button" onClick={clearFilters}>Clear filters</button>}
          </div>
        </section>

        {loadState === 'loading' && (
          <div className="pf-state" role="status"><span className="pf-spinner" /> Loading firm records…</div>
        )}
        {loadState === 'error' && (
          <div className="pf-state pf-state-error" role="alert">
            <h2>We couldn’t load the firm directory</h2>
            <p>Please try again. The current directory source is temporarily unavailable.</p>
            <button className="btn btn-g" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
          </div>
        )}
        {loadState === 'ready' && filteredFirms.length > 0 && (
          <div className="pf-firm-grid">
            {filteredFirms.map((firm) => <FirmCard firm={firm} key={firm.id} />)}
          </div>
        )}
        {loadState === 'ready' && filteredFirms.length === 0 && (
          <div className="pf-state pf-empty-state">
            <h2>No firms match these filters</h2>
            <p>Try another search or clear one or more filters.</p>
            <button className="btn btn-o" type="button" onClick={clearFilters}>Clear search and filters</button>
          </div>
        )}
      </main>
    </div>
  );
}