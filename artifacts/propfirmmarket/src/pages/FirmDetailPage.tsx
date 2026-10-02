import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import type { Firm } from '@/data/firms';
import { FirmLogo } from '@/components/FirmLogo';
import { PageMetadata } from '@/components/PageMetadata';
import { PublicSiteHeader } from '@/components/PublicSiteHeader';
import { ChallengeCard } from '@/components/ChallengeCard';
import { firmDomains } from '@/components/FirmLogo';
import { analytics } from '@/lib/analytics';
import { challengeService, type PublicChallenge } from '@/lib/challengeService';
import { firmService, getFirmPath, getFirmSummary, hasListedPromoCode } from '@/lib/firmService';

type FirmState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'not-found' }
  | { status: 'ready'; firm: Firm };

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

function formatPrice(price: number, currency: 'USD' | 'INR') {
  if (price === 0) return 'Free';
  return currency === 'USD' ? `$${price.toLocaleString()}` : `₹${price.toLocaleString('en-IN')}`;
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="pf-detail-fact"><dt>{label}</dt><dd>{children}</dd></div>;
}

export function FirmDetailPage() {
  const [, params] = useRoute('/firm/:slug');
  const slug = params?.slug ?? '';
  const [state, setState] = useState<FirmState>({ status: 'loading' });
  const [retryCount, setRetryCount] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);
  const [firmChallenges, setFirmChallenges] = useState<PublicChallenge[]>([]);
  const [challengesLoading, setChallengesLoading] = useState(true);
  const [challengesError, setChallengesError] = useState(false);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    firmService.getBySlug(slug)
      .then((firm) => {
        if (active) setState(firm ? { status: 'ready', firm } : { status: 'not-found' });
      })
      .catch(() => {
        if (active) setState({ status: 'error' });
      });
    return () => { active = false; };
  }, [slug, retryCount]);

  const firm = state.status === 'ready' ? state.firm : undefined;
  const listedCode = firm && hasListedPromoCode(firm);

  useEffect(() => {
    if (state.status !== 'ready' || !firm) return;
    analytics.track('firm_view', {
      firm_id: firm.id,
      firm_slug: slug,
      source_page: analytics.getPreviousPagePath() || '/',
    });
  }, [state.status, firm, slug]);
  const domain = firm ? firmDomains[firm.id] : undefined;

  useEffect(() => {
    if (!firm) {
      setFirmChallenges([]);
      setChallengesLoading(state.status === 'loading');
      return;
    }

    let active = true;
    setChallengesLoading(true);
    challengeService.listByFirmId(firm.id)
      .then((records) => {
        if (!active) return;
        setFirmChallenges(records);
        setChallengesError(false);
      })
      .catch(() => {
        if (active) setChallengesError(true);
      })
      .finally(() => {
        if (active) setChallengesLoading(false);
      });
    return () => { active = false; };
  }, [firm?.id, state.status]);

  useEffect(() => {
    if (!firm || !listedCode) return;
    analytics.track('promo_view', {
      firm_id: firm.id,
      firm_slug: slug,
      page: `/firm/${slug}`,
    });
  }, [firm, listedCode, slug]);

  async function copyCode() {
    if (!firm || !listedCode) return;
    try {
      await navigator.clipboard.writeText(firm.code);
      setCodeCopied(true);
      analytics.track('promo_copy', {
        firm_id: firm.id,
        firm_slug: slug,
        page: `/firm/${slug}`,
      });
    } catch {
      return;
    }
  }

  return (
    <div className="pf-public-page">
      {firm && (
        <PageMetadata
          title={`${firm.name} details | PropFirmMarket`}
          description={getFirmSummary(firm)}
          url={`https://propfirmmarket.in${getFirmPath(firm)}`}
        />
      )}
      <PublicSiteHeader />
      <main className="pf-detail-main">
        {state.status === 'loading' && <div className="pf-state" role="status"><span className="pf-spinner" /> Loading firm details…</div>}
        {state.status === 'error' && (
          <div className="pf-state pf-state-error" role="alert">
            <h1>Firm details are unavailable</h1>
            <p>We couldn’t load this firm record. Please try again later.</p>
            <button className="btn btn-o" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
            <Link className="btn btn-g" href="/firms">Return to firms</Link>
          </div>
        )}
        {state.status === 'not-found' && (
          <section className="pf-state pf-empty-state" aria-labelledby="pf-firm-missing-title">
            <p className="pf-eyebrow">FIRM NOT FOUND</p>
            <h1 id="pf-firm-missing-title">We couldn’t find that firm</h1>
            <p>The address may be outdated, or the firm is not in the current directory.</p>
            <div className="pf-detail-actions">
              <Link className="btn btn-g" href="/firms">Return to firms</Link>
              <Link className="btn btn-o" href={`/firms?q=${encodeURIComponent(slug.replace(/-\d+$/, '').replace(/-/g, ' '))}`}>Search firms</Link>
            </div>
          </section>
        )}
        {firm && (
          <>
            <nav className="pf-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/firms">Firms</Link><span aria-hidden="true">/</span><span aria-current="page">{firm.name}</span>
            </nav>
            <section className="pf-detail-heading">
              <FirmLogo className="pf-detail-logo" domain={firmDomains[firm.id]} firmId={firm.id} name={firm.name} abbr={firm.logo} color={firm.color} size={64} radius={16} />
              <div>
                <p className="pf-eyebrow">FIRM PROFILE</p>
                <h1>{firm.name}</h1>
                <p>{getFirmSummary(firm)}</p>
              </div>
            </section>

            <div className="pf-detail-layout">
              <div className="pf-detail-sections">
                <section className="pf-detail-panel" aria-labelledby="pf-overview-title">
                  <h2 id="pf-overview-title">Overview</h2>
                  <dl className="pf-detail-facts">
                    <Fact label="Market">{MARKET_LABELS[firm.market]}</Fact>
                    <Fact label="Challenge type">{CHALLENGE_LABELS[firm.ctype]}</Fact>
                    <Fact label="Listed price (USD)">{formatPrice(firm.price, 'USD')}</Fact>
                    <Fact label="Listed price (INR)">{formatPrice(firm.inrPrice, 'INR')}</Fact>
                    <Fact label="Profit split">{firm.split}%</Fact>
                    <Fact label="Maximum account">{firm.maxAccount}</Fact>
                    <Fact label="Maximum allocation">{firm.maxAllocation}</Fact>
                    <Fact label="Payout interval in listing">{firm.payoutDays} day{firm.payoutDays === 1 ? '' : 's'}</Fact>
                    <Fact label="Founded (listed)">{firm.founded}</Fact>
                    <Fact label="Free demo listed">{firm.freeDemo ? 'Yes' : 'No'}</Fact>
                  </dl>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-platforms-title">
                  <h2 id="pf-platforms-title">Platforms and payments</h2>
                  <div className="pf-detail-columns">
                    <div><h3>Platforms</h3><div className="pf-chip-row">{firm.platforms.map((item) => <span className="pf-chip" key={item}>{item}</span>)}</div></div>
                    <div><h3>Payment methods listed</h3><div className="pf-chip-row">{firm.payment.map((item) => <span className="pf-chip" key={item}>{item.toUpperCase()}</span>)}</div></div>
                  </div>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-attributes-title">
                  <h2 id="pf-attributes-title">Listed attributes</h2>
                  {firm.tags.length > 0 && <div className="pf-chip-row">{firm.tags.map((tag) => <span className="pf-chip" key={tag}>{tag}</span>)}</div>}
                  {firm.features.length > 0 && <p className="pf-detail-copy">Feature fields: {firm.features.join(', ')}</p>}
                  <p className="pf-detail-copy">Regions listed: {firm.countries.map((country) => country.toUpperCase()).join(', ') || 'Not listed'}</p>
                  {firm.indiaBanned && <p className="pf-caution-note">The current record marks this firm as unavailable in India.</p>}
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-rules-title">
                  <h2 id="pf-rules-title">Program notes</h2>
                  <p className="pf-detail-copy">{firm.scalingPlan || 'No scaling plan is listed.'}</p>
                  <p className="pf-detail-copy">The firm listing does not distinguish rules by account size. Any available rule profile is shown separately below.</p>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-trust-review-title">
                  <h2 id="pf-trust-review-title">Reviews & trust status</h2>
                  <p className="pf-detail-copy">No verified user reviews are currently available in the public repository for this firm.</p>
                  <p className="pf-detail-copy">Verification status: not available. Provenance: source unavailable. Trust claims shown elsewhere on this site are not treated as verified user evidence.</p>
                  <p className="pf-detail-copy">No independently verified payout evidence, trust score methodology, or scam classification is attached to this page.</p>
                  <div className="pf-detail-actions">
                    <Link className="btn btn-o" href="/reviews">Review policy</Link>
                    <Link className="btn btn-g" href="/challenges">Browse challenge profiles</Link>
                  </div>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-firm-challenges-title">
                  <h2 id="pf-firm-challenges-title">Challenge rule profiles</h2>
                  {challengesLoading && <p className="pf-detail-copy" role="status">Loading available rule profiles…</p>}
                  {challengesError && <p className="pf-unavailable" role="alert">Challenge rule profiles could not be loaded.</p>}
                  {!challengesLoading && !challengesError && firmChallenges.length > 0 && (
                    <div className="pf-firm-challenge-grid">
                      {firmChallenges.map((challenge) => <ChallengeCard challenge={challenge} key={challenge.id} />)}
                    </div>
                  )}
                  {!challengesLoading && !challengesError && firmChallenges.length === 0 && (
                    <p className="pf-detail-copy">No matching challenge rule profile is present in the current comparison source.</p>
                  )}
                  <Link className="pf-back-link" href="/challenges">Browse all challenge profiles →</Link>
                </section>

              </div>

              <aside className="pf-detail-aside" aria-label="Firm actions">
                <h2>Next steps</h2>
                {listedCode && (
                  <div className="pf-listed-code">
                    <span>Promo code listed</span><strong>{firm.code}</strong>
                    <button type="button" className="btn btn-o" onClick={copyCode}>{codeCopied ? 'Code copied' : 'Copy code'}</button>
                  </div>
                )}
                {domain ? (
                  <a
                    className="btn btn-g pf-full-button"
                    href={`https://${domain}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      analytics.track('affiliate_click', {
                        firm_id: firm?.id,
                        firm_slug: slug,
                        destination_type: 'firm_website',
                        placement: 'firm_detail_cta',
                        page: `/firm/${slug}`,
                      });
                      analytics.track('cta_click', {
                        cta_id: 'view_firm',
                        page: `/firm/${slug}`,
                        destination_type: 'external_website',
                      });
                    }}
                  >
                    Visit firm website
                  </a>
                ) : <p className="pf-unavailable">External website link is not available in the current site records.</p>}
                <Link className="btn btn-o pf-full-button" href="/challenges">Browse challenge profiles</Link>
                <a className="btn btn-o pf-full-button" href="/#compareSec">Compare firms</a>
                <Link className="pf-back-link" href="/firms">← Back to firm directory</Link>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}