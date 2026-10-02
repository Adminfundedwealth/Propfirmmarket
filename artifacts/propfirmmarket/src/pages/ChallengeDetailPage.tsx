import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import type { PublicChallenge } from '@/lib/challengeService';
import { challengeService, getChallengeTitle } from '@/lib/challengeService';
import { PageMetadata } from '@/components/PageMetadata';
import { PublicSiteHeader } from '@/components/PublicSiteHeader';
import { CompareChallengeButton } from '@/components/CompareChallengeButton';
import { analytics } from '@/lib/analytics';

type ChallengeState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'not-found' }
  | { status: 'ready'; challenge: PublicChallenge };

function TypeLabel({ type }: { type: PublicChallenge['challengeType'] }) {
  return <>{getTypeLabel(type)}</>;
}

function getTypeLabel(type: PublicChallenge['challengeType']) {
  return ({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[type];
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="pf-detail-fact"><dt>{label}</dt><dd>{children}</dd></div>;
}

function getStartingPrice(challenge: PublicChallenge) {
  const { usd, inr } = challenge.firmListedPrice;
  return `${usd === 0 ? 'Free' : `$${usd.toLocaleString()}`} · ${inr === 0 ? 'Free' : `₹${inr.toLocaleString('en-IN')}`}`;
}

export function ChallengeDetailPage() {
  const [, params] = useRoute('/challenge/:slug');
  const slug = params?.slug ?? '';
  const [state, setState] = useState<ChallengeState>({ status: 'loading' });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    challengeService.getBySlug(slug)
      .then((challenge) => {
        if (active) setState(challenge ? { status: 'ready', challenge } : { status: 'not-found' });
      })
      .catch(() => {
        if (active) setState({ status: 'error' });
      });
    return () => { active = false; };
  }, [slug, retryCount]);

  const challenge = state.status === 'ready' ? state.challenge : undefined;

  useEffect(() => {
    if (state.status !== 'ready' || !challenge) return;
    analytics.track('challenge_view', {
      challenge_id: challenge.id,
      challenge_slug: challenge.slug,
      source_page: analytics.getPreviousPagePath() || '/',
    });
  }, [state.status, challenge]);

  const title = challenge ? getChallengeTitle(challenge) : '';
  const targets = challenge?.profitTarget.kind === 'phased'
    ? challenge.profitTarget.percentages.map((value, index) => `Phase ${index + 1}: ${value}%`).join(' · ')
    : 'No profit target listed in the current rule source';
  const dailyDrawdown = challenge?.dailyDrawdown.kind === 'none'
    ? 'None listed'
    : challenge?.dailyDrawdown.kind === 'percent'
      ? `${challenge.dailyDrawdown.value}%`
      : undefined;

  return (
    <div className="pf-public-page">
      {challenge && (
        <PageMetadata
          title={`${challenge.firmName} ${getTypeLabel(challenge.challengeType)} rules | PropFirmMarket`}
          description={`${challenge.firmName} ${getTypeLabel(challenge.challengeType)} rules profile from current PropFirmMarket listing data.`}
          url={`https://propfirmmarket.in/challenge/${challenge.slug}`}
        />
      )}
      <PublicSiteHeader />
      <main className="pf-detail-main">
        {state.status === 'loading' && <div className="pf-state" role="status"><span className="pf-spinner" /> Loading challenge rules…</div>}
        {state.status === 'error' && (
          <div className="pf-state pf-state-error" role="alert">
            <h1>Challenge rules are unavailable</h1>
            <p>We couldn’t load this rule profile. Please try again later.</p>
            <button className="btn btn-o" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
            <Link className="btn btn-g" href="/challenges">Return to challenges</Link>
          </div>
        )}
        {state.status === 'not-found' && (
          <section className="pf-state pf-empty-state" aria-labelledby="pf-challenge-missing-title">
            <p className="pf-eyebrow">CHALLENGE PROFILE NOT FOUND</p>
            <h1 id="pf-challenge-missing-title">We couldn’t find that challenge profile</h1>
            <p>The address may be outdated, or no matching rules profile is available in the current source.</p>
            <div className="pf-detail-actions">
              <Link className="btn btn-g" href="/challenges">Return to challenges</Link>
              <Link className="btn btn-o" href="/firms">Browse firms</Link>
              <Link className="btn btn-o" href={`/challenges?q=${encodeURIComponent(slug.replace(/-challenge-\d+$/, '').replace(/-/g, ' '))}`}>Search challenge profiles</Link>
            </div>
          </section>
        )}
        {challenge && (
          <>
            <nav className="pf-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span aria-hidden="true">/</span>
              <Link href="/challenges">Challenges</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{challenge.firmName}</span>
            </nav>

            <section className="pf-detail-heading">
              <div className="pf-detail-logo" style={{ background: challenge.firm.color }} aria-hidden="true">{challenge.firm.logo}</div>
              <div>
                <p className="pf-eyebrow">RULE PROFILE · {challenge.firmName}</p>
                <h1>{title}</h1>
                <p>This is a firm-level rules profile from the existing comparison data, not an account-size-specific challenge offer.</p>
              </div>
            </section>

            <div className="pf-detail-layout">
              <div className="pf-detail-sections">
                <section className="pf-detail-panel" aria-labelledby="pf-challenge-identity-title">
                  <h2 id="pf-challenge-identity-title">Challenge profile</h2>
                  <dl className="pf-detail-facts">
                    <Fact label="Firm">{challenge.firmName}</Fact>
                    <Fact label="Challenge type"><TypeLabel type={challenge.challengeType} /></Fact>
                    <Fact label="Account size">Not specified in current challenge data</Fact>
                    <Fact label="Firm listing price">{getStartingPrice(challenge)}</Fact>
                    <Fact label="Profit target">{targets}</Fact>
                    <Fact label="Maximum drawdown">{challenge.maximumDrawdownPercent}%</Fact>
                    <Fact label="Daily drawdown">{dailyDrawdown}</Fact>
                    <Fact label="Profit split listed for firm">{challenge.profitSplitPercent}%</Fact>
                    <Fact label="Payout interval listed for firm">{challenge.payoutIntervalDays} day{challenge.payoutIntervalDays === 1 ? '' : 's'}</Fact>
                    <Fact label="Leverage listed in rule source">{challenge.leverage}</Fact>
                    {challenge.minimumTradingDays !== undefined && <Fact label="Minimum trading days listed">{challenge.minimumTradingDays}</Fact>}
                    {challenge.maximumTradingDays !== undefined && <Fact label="Maximum trading days listed">{challenge.maximumTradingDays}</Fact>}
                  </dl>
                  <p className="pf-detail-copy">The source does not identify an account-size-specific challenge name.</p>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-challenge-rules-title">
                  <h2 id="pf-challenge-rules-title">Rules in current source</h2>
                  <dl className="pf-detail-facts">
                    <Fact label="News trading">{challenge.rules.newsTradingAllowed ? 'Allowed in source' : 'Not allowed in source'}</Fact>
                    <Fact label="Weekend holding">{challenge.rules.weekendHoldingAllowed ? 'Allowed in source' : 'Not allowed in source'}</Fact>
                    <Fact label="Refundable listed">{challenge.rules.refundable ? 'Yes' : 'No'}</Fact>
                    {challenge.rules.resetFeeAmount !== undefined && <Fact label="Reset fee value">{challenge.rules.resetFeeAmount} (currency not specified)</Fact>}
                    {challenge.rules.activationFeeAmount !== undefined && <Fact label="Activation fee value">{challenge.rules.activationFeeAmount} (currency not specified)</Fact>}
                  </dl>
                  <p className="pf-detail-copy">Copy-trading rules, prohibited strategies, and consistency rules are not specified in this challenge source.</p>
                </section>

                <section className="pf-detail-panel" aria-labelledby="pf-challenge-platforms-title">
                  <h2 id="pf-challenge-platforms-title">Firm listing markets and platforms</h2>
                  <div className="pf-detail-columns">
                    <div><h3>Markets listed for firm</h3><div className="pf-chip-row">{challenge.markets.map((market) => <span className="pf-chip" key={market}>{market}</span>)}</div></div>
                    <div><h3>Platforms listed for firm</h3><div className="pf-chip-row">{challenge.platforms.map((platform) => <span className="pf-chip" key={platform}>{platform}</span>)}</div></div>
                  </div>
                </section>
              </div>

              <aside className="pf-detail-aside" aria-label="Challenge navigation">
                <h2>Next steps</h2>
                <p className="pf-unavailable">No challenge-specific discount or affiliate reference is available in the current data.</p>
                <CompareChallengeButton challengeId={challenge.id} />
                <Link className="btn btn-g pf-full-button" href={challenge.firmProfilePath}>View firm profile</Link>
                <Link className="btn btn-o pf-full-button" href="/challenges">Browse challenge profiles</Link>
                <a className="btn btn-o pf-full-button" href="/#dealsSec">Browse current firm-level deals</a>
                <a className="btn btn-o pf-full-button" href="/#challengeSec">Open homepage comparison</a>
                <Link className="pf-back-link" href="/firms">Browse firms</Link>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
