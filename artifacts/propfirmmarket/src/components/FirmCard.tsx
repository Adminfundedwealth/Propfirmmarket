import { Link } from 'wouter';
import type { Firm } from '@/data/firms';
import { getFirmPath, getFirmSummary, hasListedPromoCode } from '@/lib/firmService';
import { FirmLogo, firmDomains } from './FirmLogo';

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

export function FirmCard({ firm }: { firm: Firm }) {
  return (
    <article className="pf-firm-card">
      <div className="pf-firm-card-heading">
        <FirmLogo
          domain={firmDomains[firm.id]}
          firmId={firm.id}
          name={firm.name}
          abbr={firm.logo}
          color={firm.color}
          size={48}
          radius={12}
        />
        <div className="pf-firm-card-title">
          <h2><Link href={getFirmPath(firm)}>{firm.name}</Link></h2>
          <p>{MARKET_LABELS[firm.market]} · {CHALLENGE_LABELS[firm.ctype]}</p>
        </div>
      </div>

      <p className="pf-firm-description">{getFirmSummary(firm)}</p>

      <dl className="pf-firm-facts">
        <div><dt>Starting price</dt><dd>{firm.price === 0 ? 'Free' : `$${firm.price}`}</dd></div>
        <div><dt>Price in INR</dt><dd>{firm.inrPrice === 0 ? 'Free' : `₹${firm.inrPrice.toLocaleString('en-IN')}`}</dd></div>
        <div><dt>Profit split</dt><dd>{firm.split}%</dd></div>
        <div><dt>Maximum account</dt><dd>{firm.maxAccount}</dd></div>
        <div><dt>Payout interval listed</dt><dd>{firm.payoutDays} day{firm.payoutDays === 1 ? '' : 's'}</dd></div>
      </dl>

      <div className="pf-firm-card-meta">
        <div>
          <span className="pf-meta-label">Platforms</span>
          <div className="pf-chip-row">
            {firm.platforms.map((platform) => <span className="pf-chip" key={platform}>{platform}</span>)}
          </div>
        </div>
        {hasListedPromoCode(firm) && (
          <p className="pf-code-note">Listed code: <strong>{firm.code}</strong></p>
        )}
      </div>

      <div className="pf-firm-card-actions">
        <Link className="btn btn-g" href={getFirmPath(firm)}>View firm details</Link>
        <a className="btn btn-o" href="/#compareSec">Compare</a>
      </div>
    </article>
  );
}