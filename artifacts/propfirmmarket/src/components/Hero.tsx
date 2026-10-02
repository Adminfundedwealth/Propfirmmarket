import { useEffect, useRef, useState } from 'react';
import { firms } from '../data/firms';
import { GlobeBackground } from './GlobeBackground';

interface Props {
  onNavTo: (s: string) => void;
  onOpenAI: () => void;
  onSearch: (q: string) => void;
}

const POPULAR = ['FTMO', 'The 5%ers', 'Funded Next', 'True Forex', 'Funder Pro', 'FXIFY'];

function HeroSearch({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim().length > 0
    ? firms.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  function commit(q: string) {
    setQuery(q);
    setOpen(false);
    onSearch(q);
    setTimeout(() => {
      const el = document.getElementById('filterSec');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commit(query);
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  }

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOut);
    return () => document.removeEventListener('mousedown', onClickOut);
  }, []);

  return (
    <div className="hs-wrap" ref={wrapRef}>
      <div className={`hs-box ${focused ? 'focused' : ''}`}>
        <span className="hs-icon">🔍</span>
        <input
          ref={inputRef}
          className="hs-input"
          placeholder="Search prop firms — FTMO, Funded Next, TopstepTrader…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
        />
        {query && (
          <button className="hs-clear" onClick={() => { setQuery(''); onSearch(''); inputRef.current?.focus(); }}>✕</button>
        )}
        <button className="hs-btn" onClick={() => commit(query)}>Search</button>
      </div>

      {open && suggestions.length > 0 && (
        <div className="hs-dropdown">
          {suggestions.map(f => (
            <button key={f.id} className="hs-item" onMouseDown={() => commit(f.name)}>
              <span className="hs-item-logo" style={{ background: f.color }}>{f.logo}</span>
              <span className="hs-item-name">{f.name}</span>
              <span className="hs-item-tag">{f.market.toUpperCase()}</span>
              <span className="hs-item-rating">{f.ctype} challenge</span>
            </button>
          ))}
        </div>
      )}

      <div className="hs-popular">
        {POPULAR.map(name => (
          <button key={name} className="hs-chip" onMouseDown={() => commit(name)}>{name}</button>
        ))}
      </div>
    </div>
  );
}

function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;
    startedRef.current = true;
    let start = 0;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      if (target >= 1000) {
        el.textContent = Math.floor(start).toLocaleString();
      } else {
        el.textContent = Math.floor(start).toString();
      }
    }, 16);
    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}

function StatCard({ target, label, prefix = '', suffix = '' }: { target: number; label: string; prefix?: string; suffix?: string }) {
  const ref = useCountUp(target);
  return (
    <div className="stat">
      <div className="stat-n">
        {prefix}<span ref={ref}>0</span>{suffix}
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

const MARKETS = [
  { key: 'all', label: 'All Markets', icon: '🌐', desc: 'Browse every prop firm in one view', color: 'var(--g1)' },
  { key: 'forex', label: 'Forex', icon: '💱', desc: 'Currency pairs — MT4, MT5, cTrader', color: '#60a5fa' },
  { key: 'futures', label: 'Futures', icon: '📈', desc: 'CME, NinjaTrader, Rithmic, TST', color: 'var(--gold)' },
  { key: 'crypto', label: 'Crypto', icon: '₿', desc: 'Bitcoin & altcoin prop challenges', color: 'var(--purple)' },
];

export function Hero({ onNavTo, onOpenAI, onSearch }: Props) {
  const [activeMarket, setActiveMarket] = useState<string | null>(null);

  const counts = {
    all: firms.length,
    forex: firms.filter(f => f.market === 'forex').length,
    futures: firms.filter(f => f.market === 'futures').length,
    crypto: firms.filter(f => f.market === 'crypto').length,
  };

  const handleMarket = (key: string) => {
    setActiveMarket(key === activeMarket ? null : key);
    setTimeout(() => {
      const el = document.getElementById('filterSec');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <section className="hero hero-globe-wrap">
      <GlobeBackground />
      <div className="hero-content-layer">
      <div className="browse-market-bar">
        <div className="bm-label">BROWSE BY MARKET</div>
        <div className="bm-tabs">
          {MARKETS.map(m => {
            const cnt = counts[m.key as keyof typeof counts];
            const isActive = activeMarket === m.key;
            return (
              <button
                key={m.key}
                className={`bm-tab ${isActive ? 'active' : ''}`}
                style={{ '--bm-color': m.color } as React.CSSProperties}
                onClick={() => handleMarket(m.key)}
              >
                <div className="bm-tab-top">
                  <span className="bm-icon">{m.icon}</span>
                  <span className="bm-tab-label">{m.label}</span>
                  <span className="bm-cnt" style={{ color: m.color }}>{cnt}</span>
                  {isActive && <span className="bm-hot">HOT</span>}
                </div>
                <div className="bm-tab-desc">{m.desc}</div>
              </button>
            );
          })}
        </div>
        {activeMarket && (
          <div className="bm-showing">
            <span className="bm-dot" />
            Showing {counts[activeMarket as keyof typeof counts]} {activeMarket === 'all' ? '' : activeMarket} prop firms
            <button className="bm-clear" onClick={() => setActiveMarket(null)}>✕ Clear</button>
          </div>
        )}
      </div>

      <div className="hero-pill">✅ Public prop firm comparison platform</div>
      <h1>
        Compare Prop Firm<br />
        <span className="grad">Profiles &amp; Challenges</span>
        <span className="hero-year">2026</span>
      </h1>
      <p className="hero-sub">
        Compare firm pricing, payout terms, and challenge structures in one place.<br />
        <strong style={{ color: 'var(--gold)' }}>Public feature previews are clearly separated from live systems.</strong>
      </p>
      <HeroSearch onSearch={onSearch} />
      <div className="hero-badges">
        <span className="hb">Firm Directory</span>
        <span className="hb">Challenge Profiles</span>
        <span className="hb">Price &amp; Terms Comparison</span>
        <span className="hb">Local Saved Firms</span>
        <span className="hb">AI Match Tool</span>
        <span className="hb">Public Review Status</span>
      </div>
      <div className="hero-btns">
        <a href="#filterSec" className="btn btn-g btn-lg">🔍 Compare All Firms</a>
        <button className="btn btn-gold btn-lg" onClick={() => onNavTo('tournament')}>View Competition Preview</button>
        <button className="btn btn-p btn-lg" onClick={onOpenAI}>✨ AI Firm Finder</button>
      </div>
      <div className="stats-row">
        <StatCard target={firms.length} label="Firm Profiles Listed" />
        <StatCard target={counts.forex} label="Forex Profiles" />
        <StatCard target={counts.futures} label="Futures Profiles" />
        <StatCard target={counts.crypto} label="Crypto Profiles" />
      </div>
      </div>
    </section>
  );
}
