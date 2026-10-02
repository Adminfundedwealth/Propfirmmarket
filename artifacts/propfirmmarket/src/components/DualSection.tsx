import { useState } from 'react';
import { forexFirms, futuresFirms, type RichFirm } from '../data/firms';
import { FirmLogo } from './FirmLogo';

function fmtFollowers(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K';
  return n.toString();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="rf-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#fbbf24' : '#2a3a2f', fontSize: '11px' }}>★</span>
      ))}
    </span>
  );
}

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

function RichFirmRow({ firm, rank }: { firm: RichFirm; rank: number }) {
  const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
  const showToast = () => {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = `🔗 Visiting ${firm.name} with ${firm.discount}!`;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  };

  return (
    <div className="rf-row">
      <div className={`rf-rank ${rankClass}`}>{rank}</div>

      <FirmLogo name={firm.name} abbr={firm.logo} color={firm.color} size={36} radius={10} />

      <div className="rf-identity">
        <div className="rf-name">{firm.name}</div>
        <div className="rf-followers">♡ {fmtFollowers(firm.followers)}</div>
      </div>

      <div className="rf-rating-block">
        <StarRating rating={firm.rating} />
        <div className="rf-rating-num">{firm.rating}</div>
        <div className="rf-reviews">{firm.reviews.toLocaleString()} reviews</div>
      </div>

      <div className="rf-country">
        <span className="rf-flag">{firm.countryFlag}</span>
        <span className="rf-cc">{firm.country}</span>
      </div>

      <div className="rf-years">
        <span className="rf-years-num">{firm.years}+</span>
        <span className="rf-years-lbl">yrs</span>
      </div>

      <div className="rf-assets">
        {firm.assets.map(a => (
          <span key={a} className="rf-asset">{a}</span>
        ))}
      </div>

      <div className="rf-platforms">
        {firm.platforms.map(p => <PlatformBadge key={p} p={p} />)}
      </div>

      <div className="rf-alloc">{firm.maxAlloc}</div>

      <div className="rf-actions">
        <div className="rf-discount-badge">{firm.discount}</div>
        <CopyBtn code={firm.code} />
        <button className="rf-firm-btn" onClick={showToast}>Firm →</button>
      </div>
    </div>
  );
}

export function DualSection() {
  const [tab, setTab] = useState<'forex' | 'futures'>('forex');
  const list = tab === 'forex' ? forexFirms : futuresFirms;

  return (
    <section className="dual-sec" id="dualSec">
      <div className="dual-header">
        <h2>Exclusive Offers — <span className="grad">Forex vs Futures</span> 🔥</h2>
        <p className="dual-sub">Click any firm to visit with your exclusive affiliate discount</p>
      </div>

      <div className="rf-tabs">
        <button
          className={`rf-tab ${tab === 'forex' ? 'active forex' : ''}`}
          onClick={() => setTab('forex')}
        >
          💱 Top Forex Firms <span className="rf-tab-cnt">{forexFirms.length}</span>
        </button>
        <button
          className={`rf-tab ${tab === 'futures' ? 'active futures' : ''}`}
          onClick={() => setTab('futures')}
        >
          📈 Top Futures Firms <span className="rf-tab-cnt">{futuresFirms.length}</span>
        </button>
      </div>

      <div className="rf-header-row">
        <div style={{ width: 28 }}>#</div>
        <div style={{ width: 40 }}>Logo</div>
        <div style={{ flex: 1 }}>Firm</div>
        <div style={{ width: 120 }}>Rating</div>
        <div style={{ width: 60 }}>Country</div>
        <div style={{ width: 44 }}>Age</div>
        <div style={{ flex: 1.2 }}>Assets</div>
        <div style={{ width: 100 }}>Platforms</div>
        <div style={{ width: 72 }}>Max Alloc</div>
        <div style={{ width: 180, textAlign: 'right' }}>Offer</div>
      </div>

      <div className="rf-list">
        {list.map((f, i) => (
          <RichFirmRow key={f.name} firm={f} rank={i + 1} />
        ))}
      </div>
    </section>
  );
}
