import { PLATFORMS, navigateTo, CURRENT_PLATFORM } from '../utils/ecosystem';

const platforms = [
  {
    key: 'market' as const,
    label: 'Market',
    icon: '🏪',
    desc: 'Compare & Find',
    color: '#00e87b',
    glow: 'rgba(0,232,123,0.35)',
  },
  {
    key: 'terminal' as const,
    label: 'Terminal',
    icon: '📊',
    desc: 'Trade & Analyse',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.35)',
  },
];

export function EcosystemBar() {
  return (
    <div className="eco-bar">
      <div className="eco-bar-inner">
        <div className="eco-brand">
          <span className="eco-brand-dot" />
          <span className="eco-brand-label">PFM ECOSYSTEM</span>
        </div>

        <div className="eco-platforms">
          {platforms.map((p) => {
            const active = p.key === CURRENT_PLATFORM;
            return (
              <button
                key={p.key}
                className={`eco-platform-btn ${active ? 'active' : ''}`}
                style={active ? ({ '--eco-color': p.color, '--eco-glow': p.glow } as React.CSSProperties) : {}}
                onClick={() => {
                  if (!active) navigateTo(p.key);
                }}
                title={active ? `You are here: ${p.label}` : `Go to ${p.label}`}
              >
                <span className="eco-icon">{p.icon}</span>
                <span className="eco-pname">{p.label}</span>
                <span className="eco-pdesc">{p.desc}</span>
                {active && <span className="eco-active-dot" />}
              </button>
            );
          })}
        </div>

        <div className="eco-status">
          <span className="eco-live-dot" />
          <span className="eco-live-txt">LIVE</span>
          <a
            href={PLATFORMS.championship}
            target="_blank"
            rel="noopener noreferrer"
            className="eco-cta-mini"
            onClick={() => navigateTo('championship')}
          >
            🏆 Join Free
          </a>
        </div>
      </div>
    </div>
  );
}
