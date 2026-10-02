import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import type { PublicChallenge } from '@/lib/challengeService';
import { challengeService, getChallengeTitle } from '@/lib/challengeService';
import {
  clearComparison,
  createComparisonUrl,
  getComparisonIdsFromSearch,
  removeChallengeFromCompare,
  setComparisonIds,
  useComparisonSelection,
} from '@/lib/comparisonSelection';
import { PageMetadata } from '@/components/PageMetadata';
import { PublicSiteHeader } from '@/components/PublicSiteHeader';
import { analytics } from '@/lib/analytics';

type LoadState = 'loading' | 'ready' | 'error';

function TypeLabel({ type }: { type: PublicChallenge['challengeType'] }) {
  return <>{({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[type]}</>;
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="pf-compare-fact"><dt>{label}</dt><dd>{children}</dd></div>;
}

function targetLabel(challenge: PublicChallenge) {
  return challenge.profitTarget.kind === 'none'
    ? 'No target listed'
    : challenge.profitTarget.percentages.map((value, index) => `Phase ${index + 1}: ${value}%`).join(' · ');
}

function dailyDrawdownLabel(challenge: PublicChallenge) {
  return challenge.dailyDrawdown.kind === 'none' ? 'None listed' : `${challenge.dailyDrawdown.value}%`;
}

function priceLabel(challenge: PublicChallenge) {
  const { usd, inr } = challenge.firmListedPrice;
  return `${usd === 0 ? 'Free' : `$${usd.toLocaleString()}`} · ${inr === 0 ? 'Free' : `₹${inr.toLocaleString('en-IN')}`}`;
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    try {
      const copied = document.execCommand('copy');
      field.remove();
      return copied;
    } catch {
      field.remove();
      return false;
    }
  }
}

export function ComparePage() {
  const selection = useComparisonSelection();
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [shareMessage, setShareMessage] = useState('');
  const [urlReady, setUrlReady] = useState(false);
  const idsKey = selection.ids.join(',');
  const selectedIds = useMemo(() => idsKey ? idsKey.split(',') : [], [idsKey]);

  useEffect(() => {
    const urlIds = getComparisonIdsFromSearch(window.location.search);
    if (urlIds !== undefined) setComparisonIds(urlIds);
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    analytics.track('compare_opened', {
      comparison_count: selectedIds.length,
      source_page: analytics.getPreviousPagePath() || '/',
    });
  }, [urlReady]);

  useEffect(() => {
    if (!urlReady) return;
    const canonical = createComparisonUrl(selectedIds);
    const next = new URL(canonical);
    const current = `${window.location.pathname}${window.location.search}`;
    const normalized = `${next.pathname}${next.search}`;
    if (current !== normalized) window.history.replaceState({}, '', normalized);
  }, [selectedIds, urlReady]);

  useEffect(() => {
    let active = true;
    setLoadState('loading');
    if (selectedIds.length === 0) {
      setChallenges([]);
      setLoadState('ready');
      return () => { active = false; };
    }
    challengeService.listByIds(selectedIds)
      .then((records) => {
        if (!active) return;
        setChallenges(records);
        setLoadState('ready');
      })
      .catch(() => {
        if (active) setLoadState('error');
      });
    return () => { active = false; };
  }, [idsKey]);

  async function shareComparison() {
    const url = createComparisonUrl(selectedIds);
    if (selectedIds.length === 0) return;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'PropFirmMarket challenge comparison', url });
        setShareMessage('Comparison shared.');
        analytics.track('compare_share', {
          challenge_ids: selectedIds.join(','),
          comparison_count: selectedIds.length,
          destination_type: 'native_share',
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setShareMessage('Sharing cancelled.');
          return;
        }
      }
    }

    const copied = await copyText(url);
    setShareMessage(copied ? 'Share link copied.' : 'Could not copy the share link.');
    if (copied) {
      analytics.track('compare_share', {
        challenge_ids: selectedIds.join(','),
        comparison_count: selectedIds.length,
        destination_type: 'copy_link',
      });
    }
  }

  return (
    <div className="pf-public-page">
      <PageMetadata
        title="Challenge Comparison | PropFirmMarket"
        description="Compare selected PropFirmMarket challenge rule profiles side by side."
        url="https://propfirmmarket.in/compare"
        noIndex
      />
      <PublicSiteHeader />
      <main className="pf-compare-main">
        <nav className="pf-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/challenges">Challenges</Link><span aria-hidden="true">/</span><span aria-current="page">Compare</span>
        </nav>

        <section className="pf-compare-intro" aria-labelledby="pf-compare-title">
          <p className="pf-eyebrow">PUBLIC CHALLENGE COMPARISON</p>
          <h1 id="pf-compare-title">Compare challenge profiles</h1>
          <p>Review the values present in the current rule profiles. Firm-level listing details are labeled; unavailable account-specific terms are not inferred.</p>
          <div className="pf-compare-toolbar">
            <span aria-live="polite">{selectedIds.length} of 4 challenges selected</span>
            <div>
              {selectedIds.length > 0 && <button className="btn btn-o" type="button" onClick={shareComparison}>Share comparison</button>}
              {selectedIds.length > 0 && <button className="btn btn-o" type="button" onClick={() => {
                const remaining = clearComparison();
                analytics.track('compare_clear', {
                  challenge_ids: selectedIds.join(','),
                  comparison_count: 0,
                });
                setShareMessage(remaining.length > 0 ? 'Comparison could not be cleared in this browser.' : 'Comparison cleared.');
              }}>Clear all</button>}
              <Link className="btn btn-g" href="/challenges">Add another challenge</Link>
            </div>
          </div>
          {shareMessage && <p className="pf-compare-feedback" role="status" aria-live="polite">{shareMessage}</p>}
          {selection.message && <p className="pf-compare-feedback" role="status" aria-live="polite">{selection.message}</p>}
        </section>

        {loadState === 'loading' && <div className="pf-state" role="status">Loading selected challenge profiles…</div>}
        {loadState === 'error' && (
          <div className="pf-state pf-state-error" role="alert">
            <h2>Comparison data is unavailable</h2>
            <p>The selected rule profiles could not be loaded.</p>
          </div>
        )}
        {loadState === 'ready' && challenges.length === 0 && (
          <div className="pf-state pf-empty-state">
            <h2>No challenges selected</h2>
            <p>Add up to four challenge profiles to compare the fields currently available.</p>
            <Link className="btn btn-g" href="/challenges">Browse challenges</Link>
          </div>
        )}
        {loadState === 'ready' && challenges.length > 0 && (
          <div className="pf-compare-columns" aria-label="Selected challenge comparison">
            {challenges.map((challenge) => (
              <article className="pf-compare-column" key={challenge.id}>
                <header className="pf-compare-column-heading">
                  <div className="pf-challenge-firm-mark" style={{ background: challenge.firm.color }} aria-hidden="true">{challenge.firm.logo}</div>
                  <div>
                    <Link className="pf-compare-firm-link" href={challenge.firmProfilePath}>{challenge.firmName}</Link>
                    <h2><Link href={`/challenge/${challenge.slug}`}>{getChallengeTitle(challenge)}</Link></h2>
                  </div>
                </header>
                <button
                  className="pf-remove-compare"
                  type="button"
                  aria-label={`Remove ${challenge.firmName} from comparison`}
                  onClick={() => removeChallengeFromCompare(challenge.id)}
                >
                  Remove
                </button>
                <dl className="pf-compare-facts">
                  <Fact label="Challenge type"><TypeLabel type={challenge.challengeType} /></Fact>
                  <Fact label="Account size">{challenge.accountSize ?? 'Not available'}</Fact>
                  <Fact label="Firm-listed price">{priceLabel(challenge)}</Fact>
                  <Fact label="Profit target">{targetLabel(challenge)}</Fact>
                  <Fact label="Maximum drawdown">{challenge.maximumDrawdownPercent}%</Fact>
                  <Fact label="Daily drawdown">{dailyDrawdownLabel(challenge)}</Fact>
                  <Fact label="Firm-listed profit split">{challenge.profitSplitPercent}%</Fact>
                  <Fact label="Firm-listed payout interval">{challenge.payoutIntervalDays} day{challenge.payoutIntervalDays === 1 ? '' : 's'}</Fact>
                  <Fact label="Leverage">{challenge.leverage || 'Not available'}</Fact>
                  <Fact label="Minimum trading days">{challenge.minimumTradingDays ?? 'Not available'}</Fact>
                  <Fact label="Maximum trading days">{challenge.maximumTradingDays ?? 'Not available'}</Fact>
                  <Fact label="Platforms listed for firm">{challenge.platforms.length ? challenge.platforms.join(', ') : 'Not available'}</Fact>
                  <Fact label="Markets listed for firm">{challenge.markets.length ? challenge.markets.join(', ') : 'Not available'}</Fact>
                  <Fact label="News trading">{challenge.rules.newsTradingAllowed ? 'Allowed in source' : 'Not allowed in source'}</Fact>
                  <Fact label="Weekend holding">{challenge.rules.weekendHoldingAllowed ? 'Allowed in source' : 'Not allowed in source'}</Fact>
                  <Fact label="Refundable listed">{challenge.rules.refundable ? 'Yes' : 'No'}</Fact>
                  <Fact label="Reset fee">{challenge.rules.resetFeeAmount === undefined ? 'Not available' : `${challenge.rules.resetFeeAmount} (currency not specified)`}</Fact>
                  <Fact label="Activation fee">{challenge.rules.activationFeeAmount === undefined ? 'Not available' : `${challenge.rules.activationFeeAmount} (currency not specified)`}</Fact>
                  <Fact label="Challenge-specific discount">{challenge.discountReference ?? 'Not available'}</Fact>
                </dl>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
