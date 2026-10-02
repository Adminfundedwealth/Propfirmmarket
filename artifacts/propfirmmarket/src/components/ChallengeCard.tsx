import { Link } from 'wouter';
import type { PublicChallenge } from '@/lib/challengeService';
import { CompareChallengeButton } from './CompareChallengeButton';

function challengeTypeLabel(type: PublicChallenge['challengeType']) {
  return ({ '1step': '1-Step', '2step': '2-Step', instant: 'Instant', '24h': '24-Hour' })[type];
}

function priceLabel(challenge: PublicChallenge) {
  const { usd, inr } = challenge.firmListedPrice;
  return `${usd === 0 ? 'Free' : `$${usd}`} · ${inr === 0 ? 'Free' : `₹${inr.toLocaleString('en-IN')}`}`;
}

export function ChallengeCard({ challenge }: { challenge: PublicChallenge }) {
  return (
    <article className="pf-challenge-card">
      <div className="pf-challenge-card-heading">
        <div className="pf-challenge-firm-mark" style={{ background: challenge.firm.color }} aria-hidden="true">
          {challenge.firm.logo}
        </div>
        <div className="pf-challenge-card-title">
          <p>{challenge.firmName}</p>
          <h2><Link href={`/challenge/${challenge.slug}`}>{challengeTypeLabel(challenge.challengeType)} rules profile</Link></h2>
        </div>
      </div>

      <div className="pf-challenge-summary">
        <div><span>Firm listing price</span><strong>{priceLabel(challenge)}</strong></div>
        <div>
          <span>Profit target in rule source</span>
          <strong>{challenge.profitTarget.kind === 'none' ? 'No target listed' : `${challenge.profitTarget.percentages.join('% / ')}%`}</strong>
        </div>
        <div><span>Maximum drawdown</span><strong>{challenge.maximumDrawdownPercent}%</strong></div>
        <div>
          <span>Daily drawdown</span>
          <strong>{challenge.dailyDrawdown.kind === 'none' ? 'None listed' : `${challenge.dailyDrawdown.value}%`}</strong>
        </div>
      </div>

      <div className="pf-challenge-card-meta">
        <span>{challenge.markets.map((market) => market[0].toUpperCase() + market.slice(1)).join(', ')}</span>
        <span>{challenge.platforms.join(', ')}</span>
      </div>

      <div className="pf-challenge-card-actions">
        <Link className="btn btn-g" href={`/challenge/${challenge.slug}`}>View rules profile</Link>
        <Link className="btn btn-o" href={challenge.firmProfilePath}>Firm profile</Link>
        <CompareChallengeButton challengeId={challenge.id} compact />
      </div>
    </article>
  );
}
