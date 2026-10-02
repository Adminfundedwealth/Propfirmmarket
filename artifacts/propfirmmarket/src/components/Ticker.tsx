import { firms } from '../data/firms';
import { FirmLogo, firmDomainsByName } from './FirmLogo';

export function Ticker() {
  const doubled = [...firms, ...firms];

  return (
    <div className="ticker-wrap">
      <div className="ticker-label">PUBLIC FIRM PROFILES · LISTED TERMS MAY CHANGE</div>
      <div className="ticker-track">
        {doubled.map((f, i) => (
          <div key={i} className="ticker-item">
            <FirmLogo
              domain={firmDomainsByName[f.name]}
              name={f.name}
              abbr={f.logo}
              color={f.color}
              size={28}
              radius={7}
            />
            <span className="ticker-name">{f.name}</span>
            <span className={`ticker-badge ${f.market === 'futures' ? 'fut' : ''}`}>
              {f.market.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
