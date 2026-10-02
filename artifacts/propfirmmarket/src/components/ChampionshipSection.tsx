import { useState } from 'react';

function showToast(msg: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

export function ChampionshipSection() {
  return (
    <>
      <div className="sec-divider" style={{ marginTop: '20px' }}>
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">🏆 Championship &amp; Games</span>
        <div className="sec-divider-line"></div>
      </div>

      <section className="tournament-sec" id="tournamentSec">
        <div className="tournament-header">
          <h2>🏆 <span className="grad-gold">Featured public challenge previews</span></h2>
          <p style={{ fontSize: '12px', color: 'var(--t3)', marginTop: '4px' }}>Public challenge and giveaway previews are shown for reference only. These sections do not imply verified live enrollment or real-time competition data.</p>
        </div>
        <div className="tournament-grid">
          <div className="tourn-card">
            <div className="tc-badge">PUBLIC PREVIEW</div>
            <div className="tc-hd">
              <div className="tc-trophy">🏆</div>
              <div>
                <div className="tc-title">PropFirm Championship <span className="grad-gold">Preview</span></div>
                <div className="tc-sub">Demo event structure only — current listing does not include active enrollment data.</div>
              </div>
            </div>
            <div className="tc-prizes">
              <div className="tc-prize"><div className="tc-prize-rank">🏅</div><div className="tc-prize-amt">Preview</div><div className="tc-prize-lbl">No verified prize pool</div></div>
              <div className="tc-prize"><div className="tc-prize-rank">⏱️</div><div className="tc-prize-amt">—</div><div className="tc-prize-lbl">No event schedule</div></div>
              <div className="tc-prize"><div className="tc-prize-rank">📌</div><div className="tc-prize-amt">Public</div><div className="tc-prize-lbl">Not live-registered</div></div>
            </div>
            <button type="button" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }} onClick={() => showToast('🏆 Public preview only — no live registration is connected here.')}>
              🏆 View challenge preview
            </button>
          </div>

          <div className="games-col" id="gamesSec">
            <div className="game-card quiz">
              <div className="gc-hd">
                <div className="gc-ico">🧠</div>
                <div className="gc-info"><h4>Trading Quiz Arena</h4><p>Educational concept preview</p></div>
              </div>
              <div className="gc-reward">🏆 Reward mechanics shown as a demo example</div>
              <div className="gc-players">👥 Public preview only</div>
              <button type="button" className="btn btn-o" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(0,212,255,.3)', color: 'var(--cyan)' }} onClick={() => showToast('🧠 Quiz system is not connected to live user data.')}>▶ View demo</button>
            </div>
            <div className="game-card predict">
              <div className="gc-hd">
                <div className="gc-ico">📊</div>
                <div className="gc-info"><h4>Price Prediction</h4><p>Public feature concept preview</p></div>
              </div>
              <div className="gc-reward">🏆 Prizes shown as sample concept only</div>
              <div className="gc-players">👥 No live prediction data</div>
              <button type="button" className="btn btn-o" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(0,232,123,.3)', color: 'var(--g1)' }} onClick={() => showToast('📊 Prediction flow is not active on this public site.')}>📈 View concept</button>
            </div>
            <div className="game-card spin">
              <div className="gc-hd">
                <div className="gc-ico">🎰</div>
                <div className="gc-info"><h4>Lucky Spin Wheel</h4><p>Demo giveaway layout</p></div>
              </div>
              <div className="gc-reward">🏆 Prize values are illustrative</div>
              <div className="gc-players">👥 No live giveaway backend</div>
              <button type="button" className="btn btn-o" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(236,72,153,.3)', color: 'var(--pink)' }} onClick={() => showToast('🎰 Giveaway is preview-only and not connected to a registration system.')}>🎰 View demo</button>
            </div>
          </div>
        </div>
      </section>

      <section className="aff-sec" id="affiliateSec">
        <div className="aff-card">
          <div className="aff-inner">
            <div className="aff-left">
              <h2>💰 <span className="grad">Affiliate program</span></h2>
              <p>Public affiliate messaging is shown as a concept preview only. A live referral system, payout structure, and application flow are not active in this public build.</p>
              <div className="aff-stats">
                <div className="aff-stat"><div className="aff-stat-n">Public</div><div className="aff-stat-l">Program status</div></div>
                <div className="aff-stat"><div className="aff-stat-n">Preview</div><div className="aff-stat-l">Not live</div></div>
                <div className="aff-stat"><div className="aff-stat-n">Awaiting</div><div className="aff-stat-l">System integration</div></div>
              </div>
              <div className="aff-tiers">
                {[
                  { ico: '🔎', name: 'Discovery', req: 'Public partner referral concept', pct: 'TBD' },
                  { ico: '📋', name: 'Application', req: 'Requires backend workflow', pct: 'TBD' },
                  { ico: '💳', name: 'Payouts', req: 'Requires a live payout system', pct: 'TBD' },
                ].map((t) => (
                  <div key={t.name} className="aff-tier">
                    <div className="aff-tier-ico">{t.ico}</div>
                    <div className="aff-tier-info">
                      <div className="aff-tier-name">{t.name}</div>
                      <div className="aff-tier-req">{t.req}</div>
                    </div>
                    <div className="aff-tier-pct">{t.pct}</div>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-p btn-lg" onClick={() => showToast('📌 Affiliate flow is not active in this public build.')}>🚀 View public preview</button>
            </div>
            <div className="aff-right">
              <div className="aff-preview">
                <h4>💰 Sample estimate</h4>
                {[
                  { lbl: 'If you refer', val: 'Sample only', color: 'var(--purple)' },
                  { lbl: 'Avg purchase', val: 'TBD', color: undefined },
                  { lbl: 'Commission', val: 'TBD', color: 'var(--g1)' },
                  { lbl: 'Annual estimate', val: 'Not active', color: 'var(--gold)' },
                ].map((r) => (
                  <div key={r.lbl} className="aff-row">
                    <span className="lbl">{r.lbl}</span>
                    <span className="val" style={r.color ? { color: r.color } : undefined}>{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="aff-link-box" onClick={() => showToast('🔗 Public link preview only — no live affiliate system is connected.')}>
                <span style={{ fontSize: '10px', color: 'var(--t3)' }}>Public preview:</span>
                <span className="aff-link-url">propfirmmarket.com/ref/public</span>
                <button type="button" className="aff-link-copy">VIEW</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-sec" id="toolsSec">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(1.3rem,2.4vw,1.9rem)', fontWeight: 900 }}>
            Public <span className="grad">news, giveaway & calculator</span>
          </h2>
        </div>
        <div className="tools-grid">
          <div className="tool" id="newsTool">
            <h3 style={{ color: 'var(--cyan)' }}>📰 News preview</h3>
            {[
              { dot: 'red', text: 'Firm directory updates are shown as the source of truth for public content.' },
              { dot: 'green', text: 'Challenge and payment details should be verified against the actual listed firms.' },
              { dot: 'blue', text: 'Community and giveaway content is currently presented as a concept preview.' },
            ].map((n, i) => (
              <div key={i} className="news-item">
                <div className={`news-dot ${n.dot}`}></div>
                <span>{n.text}</span>
              </div>
            ))}
          </div>

          <div className="tool" id="gwTool">
            <h3 style={{ color: 'var(--gold)' }}>🎁 Giveaway preview</h3>
            <div className="gw-prize"><span style={{ background: 'linear-gradient(135deg,var(--gold),var(--orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Demo</span></div>
            <p style={{ fontSize: '10.5px', color: 'var(--t3)', marginBottom: '4px' }}>No live ticketing or verification system is connected.</p>
            <div className="gw-timer"><p>No giveaway schedule is available.</p></div>
            <button type="button" className="btn btn-g" style={{ width: '100%', justifyContent: 'center' }} onClick={() => showToast('🎁 Giveaway preview only — no live entry flow is connected.')}>View demo</button>
          </div>

          <ProfitCalculator />
        </div>
      </section>
    </>
  );
}

function ProfitCalculator() {
  const [accountSize, setAccountSize] = useState(100000);
  const [split, setSplit] = useState(80);
  const [monthly, setMonthly] = useState(5);

  const normalizedSplit = Number.isFinite(split) ? Math.min(100, Math.max(0, split)) : 0;
  const normalizedMonthly = Number.isFinite(monthly) ? Math.max(0, monthly) : 0;
  const profit = accountSize * (normalizedMonthly / 100);
  const yourShare = profit * (normalizedSplit / 100);
  const sixMonth = yourShare * 6;
  const inr = yourShare * 83.7;

  return (
    <div className="tool" id="calcTool">
      <h3 style={{ color: 'var(--g1)' }}>🧮 Profit calculator</h3>
      <select className="calc-input" value={accountSize} onChange={e => setAccountSize(Number(e.target.value))}>
        <option value={10000}>$10K</option>
        <option value={25000}>$25K</option>
        <option value={50000}>$50K</option>
        <option value={100000}>$100K</option>
        <option value={200000}>$200K</option>
      </select>
      <input type="number" className="calc-input" value={normalizedSplit} placeholder="Split %" onChange={e => setSplit(Number(e.target.value) || 0)} />
      <input type="number" className="calc-input" value={normalizedMonthly} placeholder="Monthly %" step={0.5} onChange={e => setMonthly(Number(e.target.value) || 0)} />
      <div className="calc-res">
        <span className="calc-lbl">Monthly</span>
        <span className="calc-val" style={{ color: 'var(--g1)' }}>${yourShare.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
      </div>
      <div className="calc-res">
        <span className="calc-lbl">6-Month</span>
        <span className="calc-val" style={{ color: 'var(--cyan)' }}>${sixMonth.toLocaleString('en', { maximumFractionDigits: 0 })}</span>
      </div>
      <div className="calc-res">
        <span className="calc-lbl">INR</span>
        <span className="calc-val" style={{ color: 'var(--orange)' }}>₹{inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
      </div>
    </div>
  );
}
