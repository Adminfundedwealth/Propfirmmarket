import { firms } from '../data/firms';

const profileCounts = [
  { label: 'Firm profiles', market: null, color: 'var(--cyan)', icon: '🏢' },
  { label: 'Forex profiles', market: 'forex', color: 'var(--g1)', icon: '💱' },
  { label: 'Futures profiles', market: 'futures', color: 'var(--gold)', icon: '📈' },
  { label: 'Crypto profiles', market: 'crypto', color: 'var(--orange)', icon: '₿' },
];

export function DataDashboard() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">📊 Data Dashboard</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="dd-sec" id="dataDashSec">
        <div className="dd-hdr">
          <div>
            <h2 className="sec-title">📊 Public Directory Snapshot</h2>
            <p className="sec-sub">Counts below are calculated from the public firm profile records in this site.</p>
          </div>
          <div className="dd-authority-tag">📡 Data source: public firm records</div>
        </div>

        <div className="dd-stats-grid">
          {profileCounts.map((s) => (
            <div key={s.label} className="dd-stat-card">
              <div className="dd-stat-icon" style={{ color: s.color }}>{s.icon}</div>
              <div className="dd-stat-val" style={{ color: s.color }}>{s.market ? firms.filter((firm) => firm.market === s.market).length : firms.length}</div>
              <div className="dd-stat-label">{s.label}</div>
              <div className="dd-stat-sub">Directory records</div>
            </div>
          ))}
          <div className="dd-stat-card">
            <div className="dd-stat-icon" style={{ color: 'var(--purple)' }}>📋</div>
            <div className="dd-stat-val" style={{ color: 'var(--purple)' }}>{new Set(firms.map((firm) => firm.ctype)).size}</div>
            <div className="dd-stat-label">Challenge categories</div>
            <div className="dd-stat-sub">Types represented in listings</div>
          </div>
        </div>

        <div className="dd-methodology">
          <h4>📋 Data status</h4>
          <p>These counts describe the directory records only. They are not performance statistics, user counts, reviews, payout evidence, or safety assessments. Firm terms should be confirmed directly with the firm.</p>
        </div>
      </section>
    </>
  );
}
