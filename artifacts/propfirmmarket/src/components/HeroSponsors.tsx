import { useState } from 'react';
import { Link } from 'wouter';
import { FirmLogo } from './FirmLogo';
import { firms, type Firm } from '../data/firms';
import { getFirmPath, getFirmSummary, hasListedPromoCode } from '../lib/firmService';

const FOREX_PROFILE = firms.find((firm) => firm.name === 'FTMO')!;
const FUTURES_PROFILE = firms.find((firm) => firm.name === 'Apex Trader')!;

function CopyBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button className="hs-copy" onClick={handleCopy} title={`Copy: ${code}`}>
      {copied ? '✓ Copied' : code}
    </button>
  );
}

function SponsorCard({ firm, side }: { firm: Firm; side: 'left' | 'right' }) {
  const accentColor = side === 'left' ? '#fbbf24' : '#a78bfa';
  const glowColor = side === 'left' ? 'rgba(251,191,36,0.15)' : 'rgba(167,139,250,0.15)';

  return (
    <div className={`hs-card hs-${side}`} style={{ '--hs-accent': accentColor, '--hs-glow': glowColor } as React.CSSProperties}>
      <div className="hs-market-tag" style={{ background: accentColor, color: '#000' }}>
        {side === 'left' ? '💱' : '📈'} {firm.market}
      </div>
      <div className="hs-sponsored" style={{ color: accentColor }}>PUBLIC PROFILE</div>

      <div className="hs-head">
        <FirmLogo name={firm.name} abbr={firm.logo} color={firm.color} size={32} radius={8} />
        <div className="hs-head-info">
          <div className="hs-name">{firm.name}</div>
          <div className="hs-badge">{firm.ctype} challenge</div>
        </div>
      </div>

      <div className="hs-tagline">{getFirmSummary(firm)}</div>

      <div className="hs-platforms">
        {firm.platforms.map(p => (
          <span key={p} className="hs-plat">{p}</span>
        ))}
      </div>

      <div className="hs-metrics">
        <div className="hs-metric">
          <div className="hs-metric-val" style={{ color: accentColor }}>{firm.split}%</div>
          <div className="hs-metric-lbl">Listed split</div>
        </div>
        <div className="hs-metric">
          <div className="hs-metric-val">{firm.maxAllocation}</div>
          <div className="hs-metric-lbl">Allocation listed</div>
        </div>
        <div className="hs-metric">
          <div className="hs-metric-val">{firm.inrPrice === 0 ? 'Not listed' : `₹${firm.inrPrice.toLocaleString('en-IN')}`}</div>
          <div className="hs-metric-lbl">Price listed</div>
        </div>
      </div>

      {hasListedPromoCode(firm) && <div className="hs-code-row">
        <span className="hs-code-label">Listed code:</span>
        <CopyBtn code={firm.code} />
      </div>}

      <Link className="hs-cta" href={getFirmPath(firm)} style={{ background: `linear-gradient(135deg, ${accentColor}, ${side === 'left' ? '#f97316' : '#7c3aed'})` }}>
        View {firm.name} profile →
      </Link>
    </div>
  );
}

export function HeroSponsors() {
  return (
    <>
      <SponsorCard firm={FOREX_PROFILE} side="left" />
      <SponsorCard firm={FUTURES_PROFILE} side="right" />
    </>
  );
}
