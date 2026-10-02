import { useState, useRef, useEffect } from 'react';
import { firms } from '../data/firms';

interface Props {
  onSelectFirm?: (id: number) => void;
}

export function SearchBar({ onSelectFirm }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.trim().length < 1 ? [] : firms.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.market.toLowerCase().includes(query.toLowerCase()) ||
    f.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
    f.features.some(ft => ft.toLowerCase().includes(query.toLowerCase())) ||
    f.strategies.some(s => s.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (firmId: number) => {
    const el = document.getElementById('filterSec');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setQuery(''); setOpen(false);
    onSelectFirm?.(firmId);
  };

  return (
    <div className="gsb-wrap" ref={ref}>
      <div className={`gsb-input-row ${focused ? 'focused' : ''}`}>
        <span className="gsb-icon">🔍</span>
        <input
          className="gsb-input"
          placeholder="Search any prop firm, market, strategy..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused(true); setOpen(true); }}
        />
        {query && (
          <button className="gsb-clear" onClick={() => { setQuery(''); setOpen(false); }}>✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="gsb-dropdown">
          <div className="gsb-dd-label">{results.length} result{results.length !== 1 ? 's' : ''} found</div>
          {results.map(f => (
            <div key={f.id} className="gsb-result" onClick={() => handleSelect(f.id)}>
              <div className="gsb-r-logo" style={{ background: f.color }}>{f.logo}</div>
              <div className="gsb-r-info">
                <div className="gsb-r-name">{f.name}</div>
                <div className="gsb-r-meta">
                  <span className="gsb-r-market">{f.market}</span>
                  <span>{f.ctype} challenge</span>
                  <span>{f.split}% split listed</span>
                  {f.features.includes('india') && <span className="gsb-r-india">🇮🇳</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {open && query.length > 1 && results.length === 0 && (
        <div className="gsb-dropdown">
          <div className="gsb-no-results">No firms found for "{query}" — try FTMO, Funded Next, futures, UPI...</div>
        </div>
      )}
    </div>
  );
}
