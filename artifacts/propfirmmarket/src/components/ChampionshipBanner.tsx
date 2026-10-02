import { useState } from 'react';

interface Props {
  onNavTo: (s: string) => void;
}

export function ChampionshipBanner({ onNavTo }: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mega-champ">
      <button className="mc-close" onClick={() => setVisible(false)}>✕</button>
      <div className="mega-champ-inner">
        <div className="mc-trophy">🏆</div>
        <div className="mc-content">
          <div className="mc-live-row">
            <span className="mc-live"><span className="dot"></span> PREVIEW</span>
            <span className="mc-season">Public concept</span>
          </div>
          <div className="mc-title">🔥 PROP FIRM CHAMPIONSHIP PREVIEW 🔥</div>
          <div className="mc-subtitle">This section is shown as a public concept preview and does not represent live event enrollment.</div>
          <div className="mc-prize-box">
            <div className="mc-prize-tag">Demo</div>
            <div className="mc-mini-stats">
              <div className="mc-ms">
                <div className="mc-ms-n">N/A</div>
                <div className="mc-ms-l">Traders</div>
              </div>
              <div className="mc-ms">
                <div className="mc-ms-n">N/A</div>
                <div className="mc-ms-l">Countries</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mc-actions">
          <button className="btn btn-gold" onClick={() => onNavTo('tournament')}>🏆 View preview</button>
          <button className="btn btn-o" style={{ color: 'var(--gold)', borderColor: 'rgba(251,191,36,.3)' }} onClick={() => onNavTo('tournament')}>View concept</button>
        </div>
      </div>
    </div>
  );
}
