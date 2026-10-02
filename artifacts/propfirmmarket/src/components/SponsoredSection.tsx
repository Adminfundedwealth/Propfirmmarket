import { useState } from 'react';
import { FirmLogo } from './FirmLogo';

type Market = 'forex' | 'futures';
type Highlight = 'gold' | 'green' | 'cyan' | 'purple';
interface Firm {
  id: string; name: string; logo: string; color: string;
  tagline: string; badge: string; discount: string; code: string;
  split: string; price: string; inrPrice: string;
  highlight: Highlight; cta: string; reviews: string;
  followers: string; rating: number; founded: number;
  countryFlag: string; country: string;
  assets: string[]; platforms: string[];
  maxAlloc: string; years: string;
}

const forexFirms: Firm[] = [
  {
    id: 'f1', name: 'FTMO', logo: 'FT', color: '#1a3c5e',
    tagline: 'Established prop firm profile',
    badge: '🧭 Featured listing',
    discount: '€101 OFF',
    code: 'PFM40',
    split: '90%',
    price: '$155',
    inrPrice: '₹12,900',
    highlight: 'gold' as const,
    cta: 'Claim €101 Discount',
    reviews: '191',
    followers: '35.3K',
    rating: 4.6,
    founded: 2015,
    countryFlag: '🇨🇿', country: 'CZ',
    assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Stocks'],
    platforms: ['cTrader', 'DXTrade', 'MT4', 'MT5'],
    maxAlloc: '$400K', years: '10+',
  },
  {
    id: 'f2', name: 'Blueberry Funded', logo: 'BB', color: '#0d1f3c',
    tagline: 'Multi-Asset Forex Prop — Low Cost Entry',
    badge: '🫐 Blueberry',
    discount: '35% OFF',
    code: 'PFM35BB',
    split: '85%',
    price: '$49',
    inrPrice: '₹4,100',
    highlight: 'cyan' as const,
    cta: 'Start for ₹4,100',
    reviews: '315',
    followers: '20.8K',
    rating: 3.7,
    founded: 2023,
    countryFlag: '🇻🇺', country: 'VU',
    assets: ['Crypto', 'FX', 'Indices', 'Metals', 'Other Commodities'],
    platforms: ['TradeLocker', 'DXTrade', 'MT4', 'MT5'],
    maxAlloc: '$400K', years: '1+',
  },
];

const futuresFirms: Firm[] = [
  {
    id: 'fu1', name: 'Top One Futures', logo: 'T1', color: '#1a1a3e',
    tagline: 'Highest Max Allocation in Futures — Up to $4.65M',
    badge: '🏆 Top Allocation',
    discount: '60% OFF',
    code: 'PFM60T1',
    split: '90%',
    price: '$165',
    inrPrice: '₹13,800',
    highlight: 'purple' as const,
    cta: 'Get 60% Off Now',
    reviews: '69',
    followers: '25.6K',
    rating: 4.8,
    founded: 2023,
    countryFlag: '🇺🇸', country: 'US',
    assets: ['Futures'],
    platforms: ['Tradovate', 'NinjaTrader', 'TradingView'],
    maxAlloc: '$4.65M', years: '1+',
  },
  {
    id: 'fu2', name: 'Tradeify', logo: 'TF', color: '#0d2a1e',
    tagline: 'Trade Futures. Keep 90%. No Time Limits.',
    badge: '⚡ Rising Fast',
    discount: '40% OFF',
    code: 'PFM40TF',
    split: '90%',
    price: '$149',
    inrPrice: '₹12,450',
    highlight: 'green' as const,
    cta: 'Start Tradeify Now',
    reviews: '150',
    followers: '20.8K',
    rating: 4.7,
    founded: 2023,
    countryFlag: '🇺🇸', country: 'US',
    assets: ['Futures'],
    platforms: ['Tradovate', 'NinjaTrader', 'TradingView', 'WealthCharts'],
    maxAlloc: '$750K', years: '1+',
  },
];

function showToast(msg: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    showToast(`📋 Code "${code}" copied! Use at checkout.`);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="sp-code-row" onClick={copy}>
      <span className="sp-code-lbl">Exclusive Code:</span>
      <span className="sp-code-val">{code}</span>
      <button className="sp-copy">{copied ? '✓' : 'COPY'}</button>
    </div>
  );
}

function FirmCard({ f }: { f: Firm }) {
  return (
    <div className={`sp-card sp-${f.highlight}`}>
      <div className="sp-hd">
        <FirmLogo name={f.name} abbr={f.logo} color={f.color} size={44} radius={12} />
        <div className="sp-name-wrap">
          <div className="sp-name">
            {f.name}
            <span className="sp-badge" style={{ marginLeft: 8, fontSize: 10 }}>{f.badge}</span>
          </div>
          <div className="sp-tagline">{f.tagline}</div>
          <div className="sp-stars">
            {'★'.repeat(Math.floor(f.rating))}
            <span className="sp-rating-num"> {f.rating}</span>
            <span className="sp-review-cnt"> ({f.reviews} reviews)</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          <div className="sp-discount-badge">{f.discount}</div>
          <span className="sp-sponsored-tag">✦ SPONSORED</span>
        </div>
      </div>

      <div className="sp-firm-meta">
        <span className="sp-meta-item">♡ {f.followers}</span>
        <span className="sp-meta-sep">·</span>
        <span className="sp-meta-item">{f.countryFlag} {f.country}</span>
        <span className="sp-meta-sep">·</span>
        <span className="sp-meta-item">{f.years}</span>
        <span className="sp-meta-sep">·</span>
        <span className="sp-meta-item">Max {f.maxAlloc}</span>
        <span className="sp-meta-sep">·</span>
        {f.platforms.map(p => <span key={p} className="sp-plat-pill">{p}</span>)}
      </div>

      <div className="sp-assets-row">
        {f.assets.map(a => <span key={a} className="sp-asset-pill">{a}</span>)}
      </div>

      <div className="sp-metrics">
        <div className="sp-metric">
          <span className="sp-m-lbl">Split</span>
          <span className="sp-m-val split">{f.split}</span>
        </div>
        <div className="sp-metric">
          <span className="sp-m-lbl">USD</span>
          <span className="sp-m-val">{f.price}</span>
        </div>
        <div className="sp-metric">
          <span className="sp-m-lbl">INR</span>
          <span className="sp-m-val inr">{f.inrPrice}</span>
        </div>
        <div className="sp-metric">
          <span className="sp-m-lbl">Founded</span>
          <span className="sp-m-val">{f.founded}</span>
        </div>
      </div>

      <CopyCode code={f.code} />

      <div className="sp-actions">
        <a className={`btn sp-cta-btn sp-cta-${f.highlight}`} onClick={() => showToast(`🚀 Opening ${f.name}...`)}>
          {f.cta} →
        </a>
        <a className="btn btn-o sp-review-btn" onClick={() => showToast(`📖 Loading ${f.name} reviews...`)}>
          Reviews
        </a>
      </div>
    </div>
  );
}

export function SponsoredSection() {
  const [activeTab, setActiveTab] = useState<Market>('forex');
  const firms = activeTab === 'forex' ? forexFirms : futuresFirms;

  return (
    <section className="sp-split-sec" id="sponsoredSec">
      <div className="sp-section-hdr">
        <div>
          <div className="sponsored-eyebrow">
            <span className="sp-live-dot"></span>
            FEATURED LISTINGS
          </div>
          <h2 className="sp-right-title">⭐ Top Sponsored Firms</h2>
          <p className="sp-right-sub">Verified prop firms offering exclusive deals to PropFirmMarket traders</p>
        </div>
        <a className="sp-list-btn" onClick={() => showToast('📧 Partnership request sent! We will contact you within 24 hrs.')}>
          📢 Get Your Firm Featured
        </a>
      </div>

      <div className="sp-market-tabs">
        <button
          className={`sp-tab-btn${activeTab === 'forex' ? ' active' : ''}`}
          onClick={() => setActiveTab('forex')}
        >
          💱 Forex
        </button>
        <button
          className={`sp-tab-btn${activeTab === 'futures' ? ' active' : ''}`}
          onClick={() => setActiveTab('futures')}
        >
          📈 Futures
        </button>
      </div>

      <div className="sp-cards-grid">
        {firms.map(f => <FirmCard key={f.id} f={f} />)}
      </div>

      <div className="sp-footer-note">
        <span>💡 <strong>Public listing concept.</strong> Partnership opportunities are presented as a preview until a live sales flow is connected.</span>
        <a className="sp-partner-link" onClick={() => showToast('📧 Partnership request sent!')}>Become a Partner →</a>
      </div>
    </section>
  );
}
