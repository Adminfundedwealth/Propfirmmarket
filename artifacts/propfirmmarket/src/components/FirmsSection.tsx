import { useState } from 'react';
import { Link } from 'wouter';
import { firms } from '../data/firms';
import { FirmLogo, firmDomains } from './FirmLogo';
import { getFirmPath, getFirmSummary, hasListedPromoCode } from '../lib/firmService';
import { showAffiliatePopup } from '../utils/popup';

function showToast(msg: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

type Market = 'all' | 'forex' | 'futures' | 'crypto';
type CType = 'all' | '1step' | '2step' | 'instant' | '24h';
type Payment = 'all' | 'upi' | 'paytm' | 'card' | 'crypto' | 'paypal' | 'bank';
type InrTier = 'all' | 'under5k' | '5k-15k' | 'above15k';
type Sort = 'price-asc' | 'price-desc';
type Platform = 'all' | 'mt4' | 'mt5' | 'ctrader' | 'tradingview' | 'ninjatrader' | 'rithmic';

const PAY_LABELS: Record<Payment, string> = {
  all: 'All', upi: '🇮🇳 UPI', paytm: '📱 Paytm', card: '💳 Card',
  crypto: '₿ Crypto', paypal: '🅿️ PayPal', bank: '🏦 Bank',
};

const SAVED_KEY = 'pfm_saved_firms';
function getSaved(): number[] { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch { return []; } }
function toggleSaved(id: number) {
  const prev = getSaved();
  const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
}

export function FirmsSection({ externalSearch = '' }: { externalSearch?: string }) {
  const [market, setMarket] = useState<Market>('all');
  const [ctype, setCtype] = useState<CType>('all');
  const [features, setFeatures] = useState<Set<string>>(new Set());
  const [payment, setPayment] = useState<Payment>('all');
  const [inrTier, setInrTier] = useState<InrTier>('all');
  const [sort, setSort] = useState<Sort>('price-asc');
  const [platform, setPlatform] = useState<Platform>('all');
  const [freeDemo, setFreeDemo] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>(getSaved);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFeature = (f: string) => {
    setFeatures(prev => { const next = new Set(prev); next.has(f) ? next.delete(f) : next.add(f); return next; });
  };

  const handleToggleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSaved());
    const f = firms.find(x => x.id === id);
    showToast(savedIds.includes(id) ? `Removed ${f?.name} from saved` : `📌 ${f?.name} saved to dashboard!`);
  };

  let filtered = firms.filter(f => {
    if (externalSearch && !f.name.toLowerCase().includes(externalSearch.toLowerCase())) return false;
    if (market !== 'all' && f.market !== market) return false;
    if (ctype !== 'all' && f.ctype !== ctype) return false;
    if (features.size > 0) { for (const feat of features) { if (!f.features.includes(feat)) return false; } }
    if (payment !== 'all' && !f.payment.includes(payment)) return false;
    if (inrTier === 'under5k' && !(f.inrPrice === 0 || f.inrPrice < 5000)) return false;
    if (inrTier === '5k-15k' && !(f.inrPrice >= 5000 && f.inrPrice <= 15000)) return false;
    if (inrTier === 'above15k' && f.inrPrice <= 15000) return false;
    if (platform !== 'all' && !f.platforms.includes(platform)) return false;
    if (freeDemo && !f.freeDemo) return false;
    return true;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const resetAll = () => { setMarket('all'); setCtype('all'); setFeatures(new Set()); setPayment('all'); setInrTier('all'); setPlatform('all'); setFreeDemo(false); };

  const forexCount   = firms.filter(f => f.market === 'forex').length;
  const futuresCount = firms.filter(f => f.market === 'futures').length;
  const cryptoCount  = firms.filter(f => f.market === 'crypto').length;

  const MARKET_TABS = [
    { id: 'all'     as Market, label: 'All Markets', icon: '🌐', count: firms.length,  desc: 'Browse every prop firm in one view',       badge: '' },
    { id: 'forex'   as Market, label: 'Forex',       icon: '💱', count: forexCount,    desc: 'Currency pairs — MT4, MT5, cTrader',       badge: '' },
    { id: 'futures' as Market, label: 'Futures',     icon: '📈', count: futuresCount,  desc: 'CME, NinjaTrader, Rithmic, TST',           badge: '' },
    { id: 'crypto'  as Market, label: 'Crypto',      icon: '₿',  count: cryptoCount,   desc: 'Bitcoin & altcoin prop challenges',         badge: '' },
  ];

  return (
    <>
      <div className="mkt-tab-bar" id="filterSec">
        <div className="mkt-tab-inner">
          <div className="mkt-tab-label">Browse by Market</div>
          <div className="mkt-tabs">
            {MARKET_TABS.map(tab => (
              <button
                key={tab.id}
                className={`mkt-tab${market === tab.id ? ' active' : ''}${tab.id !== 'all' ? ` mkt-tab-${tab.id}` : ''}`}
                onClick={() => setMarket(tab.id)}
              >
                <span className="mkt-tab-icon">{tab.icon}</span>
                <span className="mkt-tab-content">
                  <span className="mkt-tab-name">{tab.label}</span>
                  <span className="mkt-tab-desc">{tab.desc}</span>
                </span>
                <span className="mkt-tab-count">{tab.count}</span>
                {tab.badge && <span className={`mkt-tab-badge mkt-badge-${tab.id}`}>{tab.badge}</span>}
              </button>
            ))}
          </div>
          {market !== 'all' && (
            <div className="mkt-active-indicator">
              <span className="mkt-active-dot" />
              Showing <strong>{filtered.length}</strong> {market.charAt(0).toUpperCase() + market.slice(1)} prop firms
              <button className="mkt-clear-btn" onClick={() => setMarket('all')}>✕ Clear</button>
            </div>
          )}
        </div>
      </div>

      <section className="filter-sec" style={{ marginTop: 0 }}>
        <div className="filter-card">
          <div className="filter-hd">
            <h3>🎛️ Filter Firms</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link className="pf-home-directory-link" href="/firms">View all firms →</Link>
              <span className="f-cnt">{filtered.length} firms</span>
              <button className="f-rst" onClick={resetAll}>↻ Reset</button>
            </div>
          </div>
          <div className="filter-body">
            <div className="f-row">
              <span className="f-lbl">Market</span>
              <div className="chips">
                {(['all','forex','futures','crypto'] as Market[]).map(v => (
                  <button key={v} className={`chip ${market === v ? 'on' : ''}`} onClick={() => setMarket(v)}>
                    {v === 'all' ? 'All' : v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">Challenge</span>
              <div className="chips">
                {(['all','1step','2step','instant','24h'] as CType[]).map(v => (
                  <button key={v} className={`chip ${ctype === v ? 'on' : ''}`} onClick={() => setCtype(v)}>
                    {v === 'all' ? 'All' : v === '1step' ? '1-Step' : v === '2step' ? '2-Step' : v === 'instant' ? 'Instant' : '24h Challenge'}
                  </button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">Features</span>
              <div className="chips">
                {[
                  { v: 'india', label: '🇮🇳 India' }, { v: 'highsplit', label: '90%+ Split' },
                  { v: 'ea', label: 'EA Allowed' }, { v: 'weekly', label: 'Weekly Payout' },
                  { v: 'consistency', label: 'No Consistency' },
                ].map(({ v, label }) => (
                  <button key={v} className={`chip ${features.has(v) ? 'on' : ''}`} onClick={() => toggleFeature(v)}>{label}</button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">🇮🇳 Payment</span>
              <div className="chips">
                {(['all','upi','paytm','card','crypto','paypal','bank'] as Payment[]).map(v => (
                  <button key={v} className={`chip ${payment === v ? 'on' : ''}`} onClick={() => setPayment(v)}>{PAY_LABELS[v]}</button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">₹ INR Budget</span>
              <div className="chips">
                {([{ v: 'all', label: 'All' }, { v: 'under5k', label: 'Under ₹5K' }, { v: '5k-15k', label: '₹5K–₹15K' }, { v: 'above15k', label: '₹15K+' }] as { v: InrTier; label: string }[]).map(({ v, label }) => (
                  <button key={v} className={`chip ${inrTier === v ? 'on' : ''}`} onClick={() => setInrTier(v)}>{label}</button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">🖥️ Platform</span>
              <div className="chips">
                {([
                  { v: 'all', label: 'All' }, { v: 'mt4', label: 'MT4' }, { v: 'mt5', label: 'MT5' },
                  { v: 'ctrader', label: 'cTrader' }, { v: 'tradingview', label: 'TradingView' },
                  { v: 'ninjatrader', label: 'NinjaTrader' }, { v: 'rithmic', label: 'Rithmic' },
                ] as { v: Platform; label: string }[]).map(({ v, label }) => (
                  <button key={v} className={`chip ${platform === v ? 'on' : ''}`} onClick={() => setPlatform(v)}>{label}</button>
                ))}
              </div>
            </div>
            <div className="f-row">
              <span className="f-lbl">🆓 Free Demo</span>
              <div className="chips">
                <button className={`chip ${!freeDemo ? 'on' : ''}`} onClick={() => setFreeDemo(false)}>All Firms</button>
                <button className={`chip ${freeDemo ? 'on' : ''}`} onClick={() => setFreeDemo(true)}>Free Demo Only</button>
              </div>
            </div>
          </div>
          <div className="filter-ft">
            <span style={{ fontSize: '10px', color: 'var(--t3)' }}>Sort:</span>
            <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value as Sort)}>
              <option value="price-asc">Price Low→High</option>
              <option value="price-desc">Price High→Low</option>
            </select>
            <span className="f-cnt" style={{ marginLeft: 'auto' }}>{filtered.length} found</span>
          </div>
        </div>
      </section>

      <section className="firms-sec" id="firms">
        <div className="firms-grid">
          {filtered.map(f => {
            const isExpanded = expandedId === f.id;
            const isSaved = savedIds.includes(f.id);
            return (
              <div key={f.id} className="fc">
                {f.indiaBanned && <div className="fc-banned">🚫 India Banned</div>}
                <div className="fc-trust-row"><span className="fc-trust">Public firm profile</span></div>
                <div className="fc-hd">
                  <FirmLogo domain={firmDomains[f.id]} name={f.name} abbr={f.logo} color={f.color} size={54} radius={14} firmId={f.id} />
                  <div style={{ flex: 1 }}>
                    <Link className="fc-nm pf-home-firm-link" href={getFirmPath(f)}>{f.name}</Link>
                    <div className="fc-rt">{f.market} · {f.ctype} challenge</div>
                    <div className="fc-tgs">
                      <span className="tg">{f.market}</span>
                      <span className="tg">{f.ctype} challenge</span>
                      {f.features.includes('ea') && <span className="tg green">EA listed</span>}
                    </div>
                  </div>
                </div>

                <div className="fc-div"></div>
                <div className="fc-met">
                  <div className="fc-m"><span>Listed price</span><strong>${f.price === 0 ? 'Free' : f.price}</strong></div>
                  <div className="fc-m"><span>Listed INR</span><strong>{f.inrPrice === 0 ? 'Free' : `₹${f.inrPrice.toLocaleString()}`}</strong></div>
                  <div className="fc-m"><span>Listed split</span><strong>{f.split}%</strong></div>
                  <div className="fc-m"><span>Challenge</span><strong>{f.ctype}</strong></div>
                </div>
                <div className="fc-pay-row">
                  <span className="fc-pay-lbl">Accepts:</span>
                  {f.payment.map(p => (
                    <span key={p} className={`fc-pay-tag ${p === 'upi' || p === 'paytm' ? 'india' : ''}`}>
                      {p === 'upi' ? '🇮🇳 UPI' : p === 'paytm' ? '📱 Paytm' : p === 'card' ? '💳 Card' : p === 'crypto' ? '₿ Crypto' : p === 'paypal' ? '🅿️ PayPal' : '🏦 Bank'}
                    </span>
                  ))}
                </div>
                <div className="fc-desc">{getFirmSummary(f)}</div>

                {isExpanded && (
                  <div className="fc-expanded">
                    <div className="fc-exp-section">
                      <div className="fc-exp-title">Profile tags</div>
                      <div className="fc-best-for">
                        {f.profileTags.map(tag => <span key={tag} className="fc-best-chip">{tag}</span>)}
                      </div>
                    </div>
                    <div className="fc-exp-section">
                      <div className="fc-exp-title">🖥️ Platforms</div>
                      <div className="fc-best-for">
                        {f.platforms.map(p => <span key={p} className="fc-plat-chip">{p.toUpperCase()}</span>)}
                      </div>
                    </div>
                    <div className="fc-exp-section">
                      <div className="fc-exp-title">📈 Scaling Plan</div>
                      <div className="fc-ai-summary">{f.scalingPlan}</div>
                    </div>
                    <div className="fc-exp-section">
                      <div className="fc-exp-metr-row">
                        <div className="fc-exp-metr"><span>Max Allocation</span><strong>{f.maxAllocation}</strong></div>
                        <div className="fc-exp-metr"><span>Free Demo</span><strong>{f.freeDemo ? '✅ Yes' : '❌ No'}</strong></div>
                        <div className="fc-exp-metr"><span>Payout interval listed</span><strong>{f.payoutDays} day{f.payoutDays !== 1 ? 's' : ''}</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {hasListedPromoCode(f) ? (
                  <button className="fc-code" type="button" onClick={() => showToast(`📋 Listed code "${f.code}" copied. Confirm it is active with the firm.`)}>
                    <span className="fc-code-lbl">Listed promo code:</span>
                    <span className="fc-code-val">{f.code}</span>
                    <span className="fc-copy-btn">COPY</span>
                  </button>
                ) : <div className="fc-code"><span className="fc-code-lbl">No promo code listed</span></div>}
                <div className="fc-acts">
                  <Link className="btn btn-o" href={getFirmPath(f)}>View profile</Link>
                  <a
                    className="btn btn-g"
                    onClick={() => showAffiliatePopup(
                      f.name,
                      hasListedPromoCode(f) ? f.code : '',
                      `https://${firmDomains[f.id] || 'propfirmmarket.com'}`
                    )}
                    style={{ cursor: 'pointer' }}
                  >Visit Firm</a>
                  <button className={`btn ${isSaved ? 'btn-g' : 'btn-o'}`} onClick={() => handleToggleSave(f.id)}>
                    {isSaved ? '✓ Saved' : '+ Save'}
                  </button>
                  <button className="btn btn-o" style={{ fontSize: '11px', padding: '6px 10px' }} onClick={() => setExpandedId(isExpanded ? null : f.id)}>
                    {isExpanded ? '▲ Less' : '▼ Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
