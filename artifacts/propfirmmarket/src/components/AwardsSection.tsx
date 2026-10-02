import { useState } from 'react';

const recognitionStatuses = [
  {
    category: '🏅 Formal recognition',
    title: 'No awards published',
    logo: '—', color: '#1a3c5e',
    reason: 'PropFirmMarket does not currently publish formal firm awards.',
    metric: 'Unavailable',
    type: 'data',
  },
  {
    category: '👥 Community voting',
    title: 'Voting not available',
    logo: '—', color: '#0d2a1a',
    reason: 'There is no live community voting system connected to this public site.',
    metric: 'Coming when a real voting system is available',
    type: 'community',
  },
  {
    category: '💸 Payout evidence',
    title: 'No verified payout data',
    logo: '—', color: '#2d1a3d',
    reason: 'Payout reports require documented sources and provenance before publication.',
    metric: 'Not yet available',
    type: 'data',
  },
];

export function AwardsSection() {
  const [filter, setFilter] = useState<'all' | 'data' | 'community'>('all');
  const filtered = recognitionStatuses.filter(a => filter === 'all' || a.type === filter);

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">🏅 Recognition &amp; Community</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="awards-sec" id="awardsSec">
        <div className="awards-hdr">
          <div>
            <h2 className="sec-title">🏅 Recognition &amp; Community</h2>
            <p className="sec-sub">Awards, community voting, and verified payout data are not yet available on this public site.</p>
          </div>
          <div className="awards-filter-tabs">
            {(['all', 'data', 'community'] as const).map(t => (
              <button key={t} className={`award-tab ${filter === t ? 'on' : ''}`} onClick={() => setFilter(t)}>
                {t === 'all' ? '🏆 All' : t === 'data' ? '📊 Data-Driven' : '👥 Community'}
              </button>
            ))}
          </div>
        </div>

        <div className="awards-grid">
          {filtered.map((a) => (
            <div key={a.category} className={`award-card ${a.type === 'community' ? 'community' : ''}`}>
              <div className="award-badge">{a.type === 'community' ? '👥 Coming Soon' : 'Unavailable'}</div>
              <div className="award-cat">{a.category}</div>
              <div className="award-winner-wrap">
                <div className="award-logo" style={{ background: a.color }}>{a.logo}</div>
                <div className="award-winner-name">{a.title}</div>
              </div>
              <p className="award-reason">{a.reason}</p>
              <div className="award-metric">{a.metric}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
