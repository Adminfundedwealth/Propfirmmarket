import { useState } from 'react';

const POINTS_KEY = 'pfm_loyalty_points';
const LAST_VISIT_KEY = 'pfm_last_visit';
function getPoints(): number { try { return parseInt(localStorage.getItem(POINTS_KEY) || '0'); } catch { return 0; } }
function addPoints(n: number) {
  const cur = getPoints();
  localStorage.setItem(POINTS_KEY, String(cur + n));
  return cur + n;
}

export function useLoyalty() {}

const TIERS = [
  { name: 'Bronze Preview', min: 0, max: 99, icon: '🥉', color: '#cd7f32', perks: ['Preview tier only; no benefits connected'] },
  { name: 'Silver Preview', min: 100, max: 499, icon: '🥈', color: '#c0c0c0', perks: ['Preview tier only; no benefits connected'] },
  { name: 'Gold Preview', min: 500, max: 1999, icon: '🥇', color: '#fbbf24', perks: ['Preview tier only; no benefits connected'] },
  { name: 'Platinum Preview', min: 2000, max: 9999, icon: '💎', color: '#e2e8f0', perks: ['Preview tier only; no benefits connected'] },
  { name: 'Elite Preview', min: 10000, max: Infinity, icon: '👑', color: '#8b5cf6', perks: ['Preview tier only; no benefits connected'] },
];

const WAYS_TO_EARN = [
  { action: 'Daily preview action', points: '+5', icon: '📅', desc: 'Adds demo points in this browser only' },
];

function showToast(msg: string) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

export function LoyaltyProgram() {
  const [points, setPoints] = useState(getPoints);
  const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'redeem'>('overview');

  const tier = TIERS.findLast(t => points >= t.min) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const progress = nextTier ? ((points - tier.min) / (nextTier.min - tier.min)) * 100 : 100;

  const claimDaily = () => {
    const today = new Date().toDateString();
    const last = localStorage.getItem(LAST_VISIT_KEY);
    if (last !== today) {
      const newPts = addPoints(5);
      setPoints(newPts);
      localStorage.setItem(LAST_VISIT_KEY, today);
      showToast('Local preview points updated. No rewards are connected.');
    } else {
      showToast('⏰ Already claimed today. Come back tomorrow!');
    }
  };

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">💎 Loyalty Rewards</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="loyalty-sec" id="loyaltySec">
        <div className="loyalty-hdr">
          <div>
            <h2 className="sec-title">💎 Loyalty Feature Preview</h2>
            <p className="sec-sub">Points are stored in this browser as a demo only. No account, discount, prize, or firm benefit is connected.</p>
          </div>
          <div className="loyalty-daily-btn" onClick={claimDaily}>
            <span>📅 Add preview points</span>
          </div>
        </div>

        <div className="loyalty-overview-card">
          <div className="loy-tier-badge" style={{ background: `${tier.color}20`, borderColor: `${tier.color}50`, color: tier.color }}>
            {tier.icon} {tier.name}
          </div>
          <div className="loy-points-display">
            <span className="loy-pts-num">{points.toLocaleString()}</span>
            <span className="loy-pts-lbl">Local preview points</span>
          </div>
          <div className="loy-progress-wrap">
            <div className="loy-progress-bar">
              <div className="loy-progress-fill" style={{ width: `${Math.min(100, progress)}%`, background: tier.color }}></div>
            </div>
            {nextTier && (
              <div className="loy-progress-labels">
                <span>{points} pts</span>
                <span>{nextTier.min} pts for {nextTier.icon} {nextTier.name}</span>
              </div>
            )}
          </div>
          <div className="loy-perks">
            {tier.perks.map((p, i) => <span key={i} className="loy-perk">✅ {p}</span>)}
          </div>
        </div>

        <div className="loyalty-tabs">
          {(['overview', 'earn', 'redeem'] as const).map(t => (
            <button key={t} className={`loyalty-tab ${activeTab === t ? 'on' : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'overview' ? '🏅 Tiers' : t === 'earn' ? '➕ Earn Points' : '🎁 Redeem'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="loyalty-tiers">
            {TIERS.map((t, i) => (
              <div key={i} className={`loy-tier-card ${tier.name === t.name ? 'current' : ''}`} style={{ '--tc': t.color } as React.CSSProperties}>
                {tier.name === t.name && <div className="loy-current-badge">YOUR TIER</div>}
                <div className="ltc-icon">{t.icon}</div>
                <div className="ltc-name" style={{ color: t.color }}>{t.name}</div>
                <div className="ltc-range">{t.min === 0 ? '0' : t.min.toLocaleString()}–{t.max === Infinity ? '∞' : t.max.toLocaleString()} pts</div>
                <div className="ltc-perks">
                  {t.perks.map((p, j) => <div key={j} className="ltc-perk">{p}</div>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="loyalty-earn-grid">
            {WAYS_TO_EARN.map((w, i) => (
              <div key={i} className="loy-earn-card">
                <div className="lec-icon">{w.icon}</div>
                <div className="lec-action">{w.action}</div>
                <div className="lec-desc">{w.desc}</div>
                <div className="lec-pts">{w.points} pts</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'redeem' && (
          <div className="loyalty-redeem-grid">
            <div className="loy-redeem-card locked">
              <div className="lrc-icon">🎁</div>
              <div className="lrc-name">Redemption unavailable</div>
              <div className="lec-desc">A rewards provider and account system are not connected. Preview points cannot be exchanged for discounts or prizes.</div>
              <button className="lrc-btn cant" type="button" disabled>Not yet available</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
