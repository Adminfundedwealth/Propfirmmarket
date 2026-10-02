import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { firms } from '../data/firms';
import { getFirmPath } from '../lib/firmService';

const SAVED_KEY = 'pfm_saved_firms';

export function UserDashboard() {
  const [saved, setSaved] = useState<number[]>([]);
  const [tab, setTab] = useState<'saved' | 'track' | 'suggest'>('saved');
  const [showAdd, setShowAdd] = useState(false);
  const [trades, setTrades] = useState({ wins: 0, total: 0, profit: 0 });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      setSaved(stored);
    } catch { setSaved([]); }
  }, []);

  const toggleSave = (id: number) => {
    setSaved(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  };

  const savedFirms = firms.filter(f => saved.includes(f.id));
  const winRate = trades.total > 0 ? Math.round((trades.wins / trades.total) * 100) : 0;

  const profilesToBrowse = [...firms]
    .filter(f => !saved.includes(f.id))
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">👤 My Dashboard</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="dashboard-sec" id="dashboardSec">
        <div className="dash-hdr">
          <div>
            <h2 className="sec-title">👤 My Personal Dashboard</h2>
            <p className="sec-sub">Save firm profiles and record personal trading notes in this browser. No account sync or outcome prediction is connected.</p>
          </div>
          <div className="dash-tabs">
            {(['saved', 'track', 'suggest'] as const).map(t => (
              <button key={t} className={`dash-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>
                {t === 'saved' ? `📌 Saved (${saved.length})` : t === 'track' ? '📈 Local tracker' : '📂 Browse profiles'}
              </button>
            ))}
          </div>
        </div>

        {tab === 'saved' && (
          <div className="dash-saved">
            {savedFirms.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon">📌</div>
                <p>No saved firms yet. Browse the firm listings and click <strong>Save</strong> to add firms here.</p>
                <button className="btn btn-g" onClick={() => {
                  const el = document.getElementById('filterSec');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>Browse Firms →</button>
              </div>
            ) : (
              <>
                <div className="saved-grid">
                  {savedFirms.map(f => (
                    <div key={f.id} className="saved-card">
                      <div className="sc-hd">
                        <div className="sc-logo" style={{ background: f.color }}>{f.logo}</div>
                        <div>
                          <div className="sc-nm">{f.name}</div>
                          <div className="sc-rt">{f.market} · {f.ctype} challenge</div>
                        </div>
                        <button className="sc-remove" onClick={() => toggleSave(f.id)}>✕</button>
                      </div>
                      <div className="sc-stats">
                        <span>💵 ${f.price === 0 ? 'Free' : f.price}</span>
                        <span>💸 {f.split}%</span>
                        <span>⚡ {f.payoutDays}d interval listed</span>
                      </div>
                      <Link className="btn btn-g" href={getFirmPath(f)} style={{ fontSize: '11px', padding: '7px 12px', justifyContent: 'center' }}>View profile →</Link>
                    </div>
                  ))}
                </div>
                <button className="dash-add-btn" onClick={() => setShowAdd(!showAdd)}>
                  {showAdd ? '▲ Hide' : '+ Add More Firms'}
                </button>
              </>
            )}
            {(showAdd || savedFirms.length === 0) && (
              <div className="dash-all-firms">
                <p className="dash-add-label">📌 Tap to save a firm:</p>
                <div className="dash-firm-row">
                  {firms.map(f => (
                    <button key={f.id} className={`dash-firm-chip ${saved.includes(f.id) ? 'saved' : ''}`} onClick={() => toggleSave(f.id)}>
                      <div className="dfc-logo" style={{ background: f.color }}>{f.logo}</div>
                      {f.name}
                      {saved.includes(f.id) ? ' ✓' : ' +'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'track' && (
          <div className="dash-track">
            <div className="track-grid">
              <div className="track-card">
                <h4 className="track-title">📊 Your Trading Stats</h4>
                <div className="track-fields">
                  <div className="tf-row">
                    <label>Winning Trades</label>
                    <input type="number" value={trades.wins} min={0} max={trades.total}
                      onChange={e => setTrades(p => ({ ...p, wins: +e.target.value }))} className="tf-input" />
                  </div>
                  <div className="tf-row">
                    <label>Total Trades</label>
                    <input type="number" value={trades.total} min={1}
                      onChange={e => setTrades(p => ({ ...p, total: +e.target.value }))} className="tf-input" />
                  </div>
                  <div className="tf-row">
                    <label>Monthly Profit ($)</label>
                    <input type="number" value={trades.profit} min={0}
                      onChange={e => setTrades(p => ({ ...p, profit: +e.target.value }))} className="tf-input" />
                  </div>
                </div>
              </div>
              <div className="track-card">
                <h4 className="track-title">📈 Performance Overview</h4>
                <div className="perf-stats">
                  <div className="perf-stat">
                    <div className="perf-val" style={{ color: winRate >= 55 ? 'var(--g1)' : winRate >= 40 ? 'var(--gold)' : 'var(--red)' }}>
                      {winRate}%
                    </div>
                    <div className="perf-lbl">Win Rate</div>
                  </div>
                  <div className="perf-stat">
                    <div className="perf-val" style={{ color: 'var(--cyan)' }}>
                      ${trades.profit.toLocaleString()}
                    </div>
                    <div className="perf-lbl">Monthly P&L</div>
                  </div>
                  <div className="perf-stat">
                    <div className="perf-val" style={{ color: 'var(--purple)' }}>
                      ₹{(trades.profit * 83).toLocaleString()}
                    </div>
                    <div className="perf-lbl">In INR</div>
                  </div>
                </div>
                <div className="perf-verdict">These values are entered by you and stored only in this browser. They do not establish eligibility or predict challenge outcomes.</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'suggest' && (
          <div className="dash-suggest">
            <div className="suggest-hdr">
              <div className="suggest-ai-icon">🤖</div>
              <div>
                <h3 className="suggest-title">Firm profiles to browse</h3>
                <p className="suggest-sub">A sample of profiles, ordered by listed USD price. This is not a recommendation or ranking.</p>
              </div>
            </div>
            <div className="suggest-grid">
              {profilesToBrowse.map((f) => (
                <div key={f.id} className="suggest-card">
                  <div className="sug-hd">
                    <div className="sug-logo" style={{ background: f.color }}>{f.logo}</div>
                    <div>
                      <div className="sug-name">{f.name}</div>
                      <div className="sug-sub">{f.market} · {f.ctype} challenge</div>
                    </div>
                  </div>
                  <div className="sug-reason">
                    {`The current profile lists a starting price of ${f.price === 0 ? 'Free' : `$${f.price}`} and ${f.inrPrice === 0 ? 'no INR price' : `₹${f.inrPrice.toLocaleString('en-IN')}`}. Confirm current terms with the firm.`}
                  </div>
                  <div className="sug-stats">
                    <span>₹{f.inrPrice === 0 ? 'Free' : f.inrPrice.toLocaleString()}</span>
                    <span>{f.split}% split</span>
                    <span>{f.payoutDays}d interval listed</span>
                  </div>
                  <div className="sug-actions">
                    <Link className="btn btn-g" href={getFirmPath(f)} style={{ flex: 1, justifyContent: 'center', fontSize: '12px' }}>View profile →</Link>
                    <button className="btn btn-o" style={{ fontSize: '12px' }} onClick={() => toggleSave(f.id)}>
                      {saved.includes(f.id) ? '✓ Saved' : '+ Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
