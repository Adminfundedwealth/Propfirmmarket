import { useState } from 'react';
import { firms, Firm } from '../data/firms';
import { FirmLogo, firmDomains } from './FirmLogo';
import { getFirmPath } from '../lib/firmService';

const METRICS: { key: keyof Firm; label: string; unit?: string; format?: (v: unknown) => string }[] = [
  { key: 'price', label: '💵 Listed price (USD)', format: (v) => v === 0 ? 'Free' : `$${v}` },
  { key: 'inrPrice', label: '₹ Listed price (INR)', format: (v) => v === 0 ? 'Free' : `₹${Number(v).toLocaleString()}` },
  { key: 'split', label: '💸 Listed profit split', unit: '%' },
  { key: 'maxAccount', label: '💰 Maximum account listed' },
  { key: 'payoutDays', label: '⚡ Payout interval listed', format: (v) => `${v} day${Number(v) > 1 ? 's' : ''}` },
  { key: 'founded', label: '📅 Founded (listed)' },
  { key: 'indiaBanned', label: '🇮🇳 India availability listed', format: (v) => v ? 'Unavailable' : 'Available' },
  { key: 'ctype', label: '🎯 Challenge Type', format: (v) => ({ '1step': '1-Step', '2step': '2-Step', 'instant': 'Instant', '24h': '24h' }[v as string] || String(v)) },
  { key: 'market', label: '📊 Market', format: (v) => String(v).charAt(0).toUpperCase() + String(v).slice(1) },
];

export function CompareSection() {
  const [picks, setPicks] = useState<number[]>([1, 4, 8]);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const selected = picks.map(id => firms.find(f => f.id === id)!).filter(Boolean);

  const togglePick = (slot: number, firmId: number) => {
    setPicks(prev => {
      const next = [...prev];
      next[slot] = firmId;
      return next;
    });
    setShowPicker(null);
  };

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">⚖️ Compare Firms</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="compare-sec" id="compareSec">
        <div className="compare-hdr">
          <h2 className="sec-title">⚖️ Side-by-Side Comparison</h2>
          <p className="sec-sub">Pick up to 3 firms and compare the profile fields currently listed.</p>
        </div>

        <div className="compare-wrap">
          <div className="compare-table">
            <div className="ct-head">
              <div className="ct-label-col"></div>
              {selected.map((f, i) => (
                <div key={f.id} className="ct-firm-col">
                  <FirmLogo domain={firmDomains[f.id]} name={f.name} abbr={f.logo} color={f.color} size={48} radius={12} style={{ margin: '0 auto 6px' }} firmId={f.id} />
                  <div className="ct-firm-name">{f.name}</div>
                  <button className="ct-swap-btn" onClick={() => setShowPicker(i)}>⇄ Swap</button>
                  {showPicker === i && (
                    <div className="ct-picker">
                      {firms.filter(ff => !picks.includes(ff.id) || ff.id === f.id).map(ff => (
                        <button key={ff.id} className="ct-pick-item" onClick={() => togglePick(i, ff.id)}>
                          <FirmLogo domain={firmDomains[ff.id]} name={ff.name} abbr={ff.logo} color={ff.color} size={24} radius={6} firmId={ff.id} />
                          {ff.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {METRICS.map(m => {
              return (
                <div key={String(m.key)} className="ct-row">
                  <div className="ct-label-col">{m.label}</div>
                  {selected.map((f, i) => {
                    const raw = f[m.key];
                    const display = m.format ? m.format(raw) : m.unit ? `${raw}${m.unit}` : String(raw);
                    return (
                      <div key={i} className="ct-cell">
                        {display}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            <div className="ct-row ct-action-row">
              <div className="ct-label-col"></div>
              {selected.map(f => (
                <div key={f.id} className="ct-cell">
                  <a className="btn btn-g" href={getFirmPath(f)} style={{ fontSize: '12px', padding: '8px 14px', justifyContent: 'center' }}>View {f.name} profile</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
