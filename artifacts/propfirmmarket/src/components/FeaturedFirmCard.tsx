import { useState } from 'react';
import { Link } from 'wouter';
import type { Firm } from '../data/firms';
import { getFirmPath, getFirmSummary } from '../lib/firmService';
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

export function FeaturedFirmCard({ firm }: { firm: Firm }) {
  const [hovered, setHovered] = useState(false);
  const benefits = [
    { icon: '↗', text: `${MARKET_LABELS[firm.market]} market` },
    { icon: '◎', text: `${CHALLENGE_LABELS[firm.ctype]} program` },
    { icon: '◈', text: `${firm.split}% profit split listed` },
    { icon: '⌘', text: `Platforms: ${firm.platforms.join(', ')}` },
  ];

  return (
    <div
      className={`ff-card${hovered ? ' ff-hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="ff-glow" />

      <div className="ff-badges">
        <span className="ff-badge ff-badge-featured">Featured listing</span>
        <span className="ff-badge ff-badge-india">{MARKET_LABELS[firm.market]} · {CHALLENGE_LABELS[firm.ctype]}</span>
      </div>

      <div className="ff-header">
        <div className="ff-logo-wrap">
          <FirmLogo
            className="ff-logo"
            domain={firmDomains[firm.id]}
            firmId={firm.id}
            name={firm.name}
            abbr={firm.logo}
            color={firm.color}
            size={56}
            radius={14}
          />
        </div>
        <div className="ff-name-col">
          <h2 className="ff-name">{firm.name}</h2>
          <span className="ff-subtitle">{getFirmSummary(firm)}</span>
        </div>
      </div>

      <div className="ff-benefits">
        {benefits.map((benefit) => (
          <div key={benefit.text} className="ff-benefit">
            <span className="ff-benefit-icon">{benefit.icon}</span>
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>

      <div className="ff-metrics">
        <div className="ff-metric">
          <span className="ff-metric-lbl">Profit Split</span>
          <strong>{firm.split}%</strong>
        </div>
        <div className="ff-metric">
          <span className="ff-metric-lbl">Max Account</span>
          <strong>{firm.maxAccount}</strong>
        </div>
        <div className="ff-metric">
          <span className="ff-metric-lbl">Starting Price</span>
          <strong>{firm.price === 0 ? 'Free' : `$${firm.price}`}</strong>
        </div>
      </div>

      <div className="ff-ctas">
        <Link href={getFirmPath(firm)} className="ff-btn-primary">View firm details</Link>
        <a href="/#compareSec" className="ff-btn-secondary">Compare firms</a>
      </div>

      <div className="ff-footer">
        <span className="ff-trust-line">Information shown from the current firm listing.</span>
      </div>
    </div>
  );
}
