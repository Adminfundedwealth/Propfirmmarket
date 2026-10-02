import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import type { PublicChallenge } from '@/lib/challengeService';
import { challengeService } from '@/lib/challengeService';
import { useComparisonSelection } from '@/lib/comparisonSelection';
import { FirmLogo } from './FirmLogo';

type SortColumn = 'name' | 'price' | 'split' | 'profitTarget' | 'dailyDD' | 'maxDD' | 'payout';
type SortDirection = 'asc' | 'desc';
type MarketFilter = 'all' | PublicChallenge['markets'][number];
type TypeFilter = 'all' | PublicChallenge['challengeType'];

function typeLabel(type: PublicChallenge['challengeType']) {
  return ({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[type];
}

export function ChallengeCompare() {
  const [challenges, setChallenges] = useState<PublicChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [market, setMarket] = useState<MarketFilter>('all');
  const [step, setStep] = useState<TypeFilter>('all');
  const [sortColumn, setSortColumn] = useState<SortColumn>('price');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  const comparison = useComparisonSelection();
  const selectedIds = new Set(comparison.ids);

  useEffect(() => {
    let active = true;
    challengeService.list()
      .then((records) => {
        if (!active) return;
        setChallenges(records);
        setLoadError(false);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const rows = useMemo(() => {
    const filtered = challenges.filter((challenge) => {
      if (market !== 'all' && !challenge.markets.includes(market)) return false;
      if (step !== 'all' && challenge.challengeType !== step) return false;
      if (showOnlySelected && selectedIds.size > 0 && !selectedIds.has(challenge.id)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortColumn) {
        case 'name': comparison = a.firmName.localeCompare(b.firmName); break;
        case 'price': comparison = a.firmListedPrice.inr - b.firmListedPrice.inr; break;
        case 'split': comparison = a.profitSplitPercent - b.profitSplitPercent; break;
        case 'profitTarget': {
          const targetA = a.profitTarget.kind === 'none' ? Infinity : a.profitTarget.percentages[0];
          const targetB = b.profitTarget.kind === 'none' ? Infinity : b.profitTarget.percentages[0];
          comparison = targetA - targetB;
          break;
        }
        case 'dailyDD': comparison = (a.dailyDrawdown.kind === 'none' ? Infinity : a.dailyDrawdown.value) - (b.dailyDrawdown.kind === 'none' ? Infinity : b.dailyDrawdown.value); break;
        case 'maxDD': comparison = a.maximumDrawdownPercent - b.maximumDrawdownPercent; break;
        case 'payout': comparison = a.payoutIntervalDays - b.payoutIntervalDays; break;
      }
      return (sortDirection === 'asc' ? comparison : -comparison) || a.firmName.localeCompare(b.firmName);
    });
  }, [challenges, market, step, showOnlySelected, selectedIds, sortColumn, sortDirection]);

  function toggleSort(column: SortColumn) {
    if (sortColumn === column) setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
    else {
      setSortColumn(column);
      setSortDirection(column === 'split' ? 'desc' : 'asc');
    }
  }

  function toggleSelection(id: string) {
    if (selectedIds.has(id)) {
      comparison.remove(id);
      comparison.announce('Removed from comparison.');
      return;
    }
    const result = comparison.add(id);
    if (result === 'added') comparison.announce('Added to comparison.');
    else if (result === 'already-added') comparison.announce('Already added to comparison.');
    else if (result === 'limit-reached') comparison.announce('Comparison is limited to four challenges. Remove one to add another.');
  }

  const arrow = (column: SortColumn) => sortColumn === column ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <section className="cc-sec" id="challengeSec">
      <div className="cc-hdr">
        <div className="cc-hdr-left">
          <div className="cc-eyebrow"><span className="cc-live-dot" />CHALLENGE RULE PROFILES</div>
          <h2 className="cc-title">Compare Prop Firm Rules</h2>
          <p className="cc-sub">Compare the firm-level rules and listing values currently available. Profiles are not account-size-specific offers.</p>
          <Link className="pf-home-directory-link" href="/challenges">Browse all challenge profiles →</Link>
        </div>
        <div className="cc-stats-row">
          <div className="cc-stat"><span className="cc-stat-num">{loading ? '…' : challenges.length}</span><span className="cc-stat-lbl">Rule profiles</span></div>
          <div className="cc-stat"><span className="cc-stat-num">{loading ? '…' : new Set(challenges.flatMap((challenge) => challenge.platforms)).size}</span><span className="cc-stat-lbl">Listed platforms</span></div>
          <div className="cc-stat"><span className="cc-stat-num">₹</span><span className="cc-stat-lbl">Firm INR listing</span></div>
        </div>
      </div>

      <div className="cc-toolbar">
        <div className="cc-filters">
          <div className="cc-filter-group">
            <span className="cc-filter-label">Market</span>
            {(['all', 'forex', 'futures', 'crypto'] as MarketFilter[]).map((item) => (
              <button key={item} type="button" className={`cc-pill${market === item ? ' active' : ''}`} onClick={() => setMarket(item)}>
                {item === 'all' ? 'All' : item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <div className="cc-filter-group">
            <span className="cc-filter-label">Challenge type</span>
            {(['all', '1step', '2step', 'instant', '24h'] as TypeFilter[]).map((item) => (
              <button key={item} type="button" className={`cc-pill${step === item ? ' active' : ''}`} onClick={() => setStep(item)}>
                {item === 'all' ? 'All' : typeLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <div className="cc-actions">
          {selectedIds.size > 0 && (
            <>
            <button type="button" className={`cc-pill cc-compare-btn${showOnlySelected ? ' active' : ''}`} onClick={() => setShowOnlySelected((value) => !value)}>
              {showOnlySelected ? 'Show all rows' : 'Show selected rows'}
            </button>
            <Link className="cc-pill cc-compare-btn" href="/compare">Compare {selectedIds.size} selected</Link>
            </>
          )}
          <span className="cc-count">{loading ? 'Loading…' : `${rows.length} profiles`}</span>
        </div>
      </div>
      <p className="pf-compare-feedback" role="status" aria-live="polite">{comparison.message}</p>

      {loading && <div className="pf-state" role="status">Loading challenge rules…</div>}
      {loadError && <div className="pf-state pf-state-error" role="alert">Challenge profiles could not be loaded.</div>}
      {!loading && !loadError && (
        <div className="cc-table-wrap">
          <table className="cc-table">
            <thead>
              <tr>
                <th className="cc-th cc-th-check" aria-label="Select profile" />
                <th className="cc-th cc-th-firm"><button type="button" onClick={() => toggleSort('name')}>Firm{arrow('name')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('price')}>Firm listing price{arrow('price')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('profitTarget')}>Profit target{arrow('profitTarget')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('dailyDD')}>Daily drawdown{arrow('dailyDD')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('maxDD')}>Max drawdown{arrow('maxDD')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('split')}>Firm profit split{arrow('split')}</button></th>
                <th className="cc-th"><button type="button" onClick={() => toggleSort('payout')}>Firm payout interval{arrow('payout')}</button></th>
                <th className="cc-th">Leverage</th>
                <th className="cc-th">Rules</th>
                <th className="cc-th">Refund</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((challenge) => (
                <tr key={challenge.id} className={`cc-row${selectedIds.has(challenge.id) ? ' cc-selected' : ''}`}>
                  <td className="cc-td cc-td-check">
                    <input aria-label={`Select ${challenge.firmName} rules profile`} type="checkbox" checked={selectedIds.has(challenge.id)} onChange={() => toggleSelection(challenge.id)} className="cc-checkbox" />
                  </td>
                  <td className="cc-td cc-td-firm">
                    <div className="cc-firm-cell">
                      <FirmLogo name={challenge.firmName} abbr={challenge.firm.logo} color={challenge.firm.color} size={28} firmId={challenge.firmId} radius={8} />
                      <div className="cc-firm-info">
                        <Link className="cc-firm-name" href={challenge.firmProfilePath}>{challenge.firmName}</Link>
                        <Link className="cc-firm-type" href={`/challenge/${challenge.slug}`}>{typeLabel(challenge.challengeType)} rules</Link>
                      </div>
                    </div>
                  </td>
                  <td className="cc-td">
                    <div className="cc-price-cell"><span className="cc-usd">{challenge.firmListedPrice.usd === 0 ? 'Free' : `$${challenge.firmListedPrice.usd}`}</span><span className="cc-inr">{challenge.firmListedPrice.inr === 0 ? 'Free' : `₹${challenge.firmListedPrice.inr.toLocaleString('en-IN')}`}</span></div>
                  </td>
                  <td className="cc-td">
                    {challenge.profitTarget.kind === 'none' ? 'No target' : `${challenge.profitTarget.percentages.join('% / ')}%`}
                  </td>
                  <td className="cc-td">
                    {challenge.dailyDrawdown.kind === 'none' ? 'None' : `${challenge.dailyDrawdown.value}%`}
                  </td>
                  <td className="cc-td">
                    {challenge.maximumDrawdownPercent}%
                  </td>
                  <td className="cc-td">{challenge.profitSplitPercent}%</td>
                  <td className="cc-td">{challenge.payoutIntervalDays}d <span className="cc-dim">firm</span></td>
                  <td className="cc-td">{challenge.leverage}</td>
                  <td className="cc-td cc-td-rules">
                    <span className={challenge.rules.newsTradingAllowed ? 'cc-rule-yes' : 'cc-rule-no'}>{challenge.rules.newsTradingAllowed ? '✓' : '✕'} News</span>
                    <span className={challenge.rules.weekendHoldingAllowed ? 'cc-rule-yes' : 'cc-rule-no'}>{challenge.rules.weekendHoldingAllowed ? '✓' : '✕'} Weekend</span>
                  </td>
                  <td className="cc-td">{challenge.rules.refundable ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !loadError && rows.length === 0 && <div className="cc-empty">No rule profiles match these filters. Try adjusting the market or challenge type.</div>}
      {!loading && !loadError && <div className="cc-legend"><span className="cc-legend-item">Firm listing values are identified as firm-level.</span><span className="cc-legend-item">Select rows to narrow the comparison view.</span></div>}
    </section>
  );
}
