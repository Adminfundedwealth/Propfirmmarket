import { useState, useEffect, useRef } from 'react';

const API_BASE = '/api';

interface Deal {
  id: number;
  firmName: string;
  discountPercent: number;
  affiliateLink: string;
  expiresAt: string | null;
}

const FIRM_COLORS: Record<string, { glow: string; badge: string; bg: string }> = {
  FTMO:          { glow: '#00e87b', badge: '#00e87b', bg: 'rgba(0,232,123,.06)' },
  'Funded Next': { glow: '#8b5cf6', badge: '#8b5cf6', bg: 'rgba(139,92,246,.06)' },
  FundingPips:   { glow: '#00d4ff', badge: '#00d4ff', bg: 'rgba(0,212,255,.06)' },
  'True Forex Funds': { glow: '#fbbf24', badge: '#fbbf24', bg: 'rgba(251,191,36,.06)' },
};

const DEFAULT_COLOR = { glow: '#00e87b', badge: '#00e87b', bg: 'rgba(0,232,123,.06)' };

function getColor(name: string) {
  return FIRM_COLORS[name] || DEFAULT_COLOR;
}

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [left, setLeft] = useState('');

  useEffect(() => {
    function calc() {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setLeft('Expired'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLeft(h > 24
        ? `${Math.floor(h / 24)}d ${h % 24}h`
        : `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      );
    }
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  return <span className="deal-countdown">⏳ {left}</span>;
}

function DealCard({ deal, onActivate }: { deal: Deal; onActivate: (d: Deal) => void }) {
  const [clicked, setClicked] = useState(false);
  const col = getColor(deal.firmName);

  function handleActivate() {
    setClicked(true);
    setTimeout(() => onActivate(deal), 300);
  }

  return (
    <div className="deal-card" style={{ '--deal-glow': col.glow, '--deal-bg': col.bg } as React.CSSProperties}>
      <div className="deal-card-inner">
        <div className="deal-badge">🔥 MARKET DEAL</div>
        <div className="deal-firm">{deal.firmName}</div>
        <div className="deal-discount">
          <span className="deal-pct">{deal.discountPercent}%</span>
          <span className="deal-off">OFF</span>
        </div>
        <div className="deal-sub">Discount applied automatically — no code needed</div>
        {deal.expiresAt && <Countdown expiresAt={deal.expiresAt} />}
        <button
          className={`deal-btn${clicked ? ' deal-btn--active' : ''}`}
          onClick={handleActivate}
          style={{ '--deal-glow': col.glow } as React.CSSProperties}
        >
          {clicked ? '✅ Redirecting...' : '⚡ Activate Deal'}
        </button>
        <div className="deal-secure">🔒 Secure redirect · Code hidden for your protection</div>
      </div>
    </div>
  );
}

export function DealsSection() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [activeModal, setActiveModal] = useState<Deal | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/deals`)
      .then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); })
      .then((d: { success: boolean; deals: Deal[] }) => {
        if (d.success) setDeals(d.deals);
        else setFetchError(true);
      })
      .catch(() => setFetchError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const t = setTimeout(() => {
      window.location.href = activeModal.affiliateLink;
    }, 1500);
    return () => clearTimeout(t);
  }, [activeModal]);

  function handleActivate(deal: Deal) {
    setActiveModal(deal);
  }

  function handleClose() {
    setActiveModal(null);
  }

  if (!loading && fetchError) return null;
  if (!loading && deals.length === 0) return null;

  return (
    <section id="dealsSec" className="deals-section">
      <div className="deals-inner">
        <div className="deals-header">
          <div className="deals-eyebrow">🏷️ Listed Firm Offers</div>
          <h2 className="deals-title">Market Deals</h2>
          <p className="deals-sub">Offers provided by the connected deals feed. Review the terms on the firm website before purchasing.</p>
        </div>

        {loading && (
          <div className="deals-loading">
            <div className="blp-spinner" />
            <span>Loading deals...</span>
          </div>
        )}

        <div className="deals-grid">
          {deals.map(deal => (
            <DealCard key={deal.id} deal={deal} onActivate={handleActivate} />
          ))}
        </div>
      </div>

      {activeModal && (
        <div className="deal-modal-overlay" onClick={handleClose}>
          <div className="deal-modal" ref={modalRef} onClick={e => e.stopPropagation()}>
            <div className="deal-modal-icon">🚀</div>
            <div className="deal-modal-title">Activating your deal!</div>
            <div className="deal-modal-firm">{activeModal.firmName}</div>
            <div className="deal-modal-pct">{activeModal.discountPercent}% OFF applied</div>
            <div className="deal-modal-sub">You're being redirected to the partner site.<br />Your discount code is embedded in the link.</div>
            <div className="deal-modal-bar">
              <div className="deal-modal-bar-fill" />
            </div>
            <button className="deal-modal-skip" onClick={() => { window.location.href = activeModal.affiliateLink; }}>
              Go now →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
