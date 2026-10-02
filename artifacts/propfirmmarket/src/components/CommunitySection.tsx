const communityStats = [
  { icon: '👥', value: 'Not connected', label: 'Community channels' },
  { icon: '🇮🇳', value: 'India', label: 'Regional focus' },
  { icon: '💬', value: 'Preview', label: 'Discussion format' },
  { icon: '🏆', value: 'Not connected', label: 'Trading news + deals' },
];

const channels = [
  {
    platform: 'Discord', icon: '🎮', color: '#5865F2',
    desc: 'This channel is not connected to the public site. No member or live discussion data is available.',
    badge: 'Coming soon',
  },
  {
    platform: 'Telegram', icon: '✈️', color: '#229ED9',
    desc: 'This channel is not connected to the public site. No live updates or alerts are available.',
    badge: 'Coming soon',
  },
  {
    platform: 'WhatsApp', icon: '💬', color: '#25D366',
    desc: 'This channel is not connected to the public site. No member or discussion data is available.',
    badge: 'Coming soon',
  },
  {
    platform: 'YouTube', icon: '▶️', color: '#FF0000',
    desc: 'A video channel is not connected to this public section.',
    badge: 'Coming soon',
  },
];

export function CommunitySection() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">🤝 Community</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="community-sec" id="communitySec">
        <div className="comm-hdr">
          <div>
            <h2 className="sec-title">🤝 Community updates</h2>
            <p className="sec-sub">Community channels are not connected. This section does not show live discussions, member counts, or current updates.</p>
          </div>
        </div>

        <div className="comm-stats">
          {communityStats.map((s, i) => (
            <div key={i} className="comm-stat">
              <span className="comm-stat-icon">{s.icon}</span>
              <span className="comm-stat-val">{s.value}</span>
              <span className="comm-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="comm-channels">
          {channels.map((c, i) => (
            <div key={i} className="comm-channel" style={{ '--ch-color': c.color } as React.CSSProperties}>
              <div className="cc-top">
                <div className="cc-icon" style={{ background: c.color }}>{c.icon}</div>
                <div className="cc-info">
                  <div className="cc-platform">{c.platform}</div>
                  <div className="cc-members">Not connected</div>
                </div>
                <div className="cc-badge">{c.badge}</div>
              </div>
              <p className="cc-desc">{c.desc}</p>
              <button type="button" className="cc-join-btn" style={{ background: c.color }} disabled>
                Coming soon
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
