import { useState } from 'react';
import { Link } from 'wouter';
import { firms, type Firm } from '../data/firms';
import { FirmLogo } from './FirmLogo';
import { getFirmPath, hasListedPromoCode } from '../lib/firmService';

const TOP_FOREX = firms.filter((firm) => firm.market === 'forex').slice(0, 5);
const TOP_FUTURES = firms.filter((firm) => firm.market === 'futures').slice(0, 5);

function PlatformBadge({ p }: { p: string }) {
  const map: Record<string, { bg: string; text: string; label: string }> = {
    'MT4': { bg: '#1a3c5e', text: '#60a5fa', label: 'MT4' },
    'MT5': { bg: '#1a3c5e', text: '#60a5fa', label: 'MT5' },
    'cTrader': { bg: '#1a3d0d', text: '#4ade80', label: 'cT' },
    'NinjaTrader': { bg: '#2d1a0d', text: '#fb923c', label: 'NT' },
    'Tradovate': { bg: '#2d0d1a', text: '#f472b6', label: 'TV' },
    'Rithmic': { bg: '#1a0a3d', text: '#a78bfa', label: 'RM' },
  };
  const s = map[p] || { bg: '#1a1a1a', text: '#aaa', label: p.slice(0, 2) };
  return (
    <span className="rf-plat" style={{ background: s.bg, color: s.text }}>{s.label}</span>
  );
}

function CopyBtn({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button className="rf-copy-btn" onClick={copy} title={`Copy code: ${code}`}>
      {copied ? '✓' : '⧉'} {code}
    </button>
  );
}

function TopFirmRow({ firm }: { firm: Firm }) {
  return (
    <div className="rf-row">
      <div className="rf-rank" aria-hidden="true">•</div>
      <FirmLogo name={firm.name} abbr={firm.logo} color={firm.color} size={36} radius={10} />
      <div className="rf-identity">
        <Link className="rf-name" href={getFirmPath(firm)}>{firm.name}</Link>
        <div className="rf-followers">{firm.market} · {firm.ctype} challenge</div>
      </div>
      <div className="rf-rating-block">
        <div className="rf-rating-num">{firm.price === 0 ? 'Free' : `$${firm.price}`}</div>
        <div className="rf-reviews">{firm.inrPrice === 0 ? 'INR not listed' : `₹${firm.inrPrice.toLocaleString('en-IN')}`} · {firm.split}% split listed</div>
      </div>
      <div className="rf-country">
        <span className="rf-cc">{firm.market.toUpperCase()}</span>
      </div>
      <div className="rf-years">
        <span className="rf-years-num">{firm.ctype}</span>
        <span className="rf-years-lbl">challenge</span>
      </div>
      <div className="rf-assets">
        {firm.features.includes('india') && <span className="rf-asset">India feature listed</span>}
        {firm.features.includes('ea') && <span className="rf-asset">EA listed</span>}
        {firm.freeDemo && <span className="rf-asset">Free demo listed</span>}
      </div>
      <div className="rf-platforms">
        {firm.platforms.map(p => <PlatformBadge key={p} p={p} />)}
      </div>
      <div className="rf-alloc">{firm.maxAllocation}</div>
      <div className="rf-actions">
        {hasListedPromoCode(firm) && <CopyBtn code={firm.code} />}
        <Link className="rf-firm-btn" href={getFirmPath(firm)}>Profile →</Link>
      </div>
    </div>
  );
}

export function TopFirmsPreview() {
  const [tab, setTab] = useState<'forex' | 'futures'>('forex');
  const list = tab === 'forex' ? TOP_FOREX : TOP_FUTURES;

  return (
    <section className="dual-sec" id="topFirmsSec">
      <div className="dual-header">
        <h2>Browse <span className="grad">Firm Profiles</span></h2>
        <p className="dual-sub">Directory listings by market. Profiles are not ranked; confirm current terms with each firm.</p>
        <Link className="pf-home-directory-link" href="/firms">View all firms →</Link>
      </div>

      <div className="rf-tabs">
        <button
          className={`rf-tab ${tab === 'forex' ? 'active forex' : ''}`}
          onClick={() => setTab('forex')}
        >
          💱 Forex Listings <span className="rf-tab-cnt">{TOP_FOREX.length}</span>
        </button>
        <button
          className={`rf-tab ${tab === 'futures' ? 'active futures' : ''}`}
          onClick={() => setTab('futures')}
        >
          📈 Futures Listings <span className="rf-tab-cnt">{TOP_FUTURES.length}</span>
        </button>
      </div>

      <div className="rf-header-row">
        <div style={{ width: 28 }}></div>
        <div style={{ width: 40 }}>Logo</div>
        <div style={{ flex: 1 }}>Firm</div>
        <div style={{ width: 120 }}>Listed terms</div>
        <div style={{ width: 60 }}>Market</div>
        <div style={{ width: 70 }}>Challenge</div>
        <div style={{ flex: 1.2 }}>Profile tags</div>
        <div style={{ width: 100 }}>Platforms</div>
        <div style={{ width: 72 }}>Max Alloc</div>
        <div style={{ width: 180, textAlign: 'right' }}>Listed code</div>
      </div>

      <div className="rf-list">
        {list.map((f) => (
          <TopFirmRow key={f.id} firm={f} />
        ))}
      </div>
    </section>
  );
}
