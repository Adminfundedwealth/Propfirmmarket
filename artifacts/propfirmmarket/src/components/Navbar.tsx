import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { firms } from '../data/firms';
import { AuthModal, UserAvatar, getStoredUser, signOut, type AuthUser } from './AuthModal';
import { Logo } from './Logo';

interface NavbarProps {
  onNavTo: (section: string) => void;
  onOpenAI: () => void;
  onOpenSmartFinder: () => void;
}

interface NavItem {
  label: string;
  section: string;
  extraClass?: string;
  children?: { label: string; section: string }[];
}

export function Navbar({ onNavTo, onOpenAI, onOpenSmartFinder }: NavbarProps) {
  const [mobOpen, setMobOpen]         = useState(false);
  const [dropOpen, setDropOpen]       = useState<string | null>(null);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [query, setQuery]             = useState('');
  const [authOpen, setAuthOpen]       = useState<'signin' | 'signup' | null>(null);
  const [user, setUser]               = useState<AuthUser | null>(getStoredUser);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 1 ? firms.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.market.toLowerCase().includes(query.toLowerCase()) ||
    f.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 5) : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false); setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navGroups: NavItem[] = [
    { label: '🏠 Home', section: 'top' },
    { label: '💱 Markets', section: '', children: [
      { label: '💱 Forex Firms', section: 'forex' },
      { label: '📈 Futures Firms', section: 'futures' },
      { label: '₿ Crypto Firms', section: 'all' },
      { label: 'Featured profiles', section: 'topFirmsSec' },
    ]},
    { label: '🎮 Games', section: 'games' },
    { label: '🔧 Tools', section: '', children: [
      { label: '⚖️ Compare Firms', section: 'compare' },
      { label: '🎯 Pass Calculator', section: 'pass' },
      { label: '🛡️ Scam Detector', section: 'scam' },
      { label: '📊 Data Dashboard', section: 'data' },
      { label: '📅 News Calendar', section: 'calendar' },
      { label: '📺 Prop Firm TV', section: 'tv' },
    ]},
    { label: '💎 Loyalty', section: 'loyalty' },
    { label: '⭐ Reviews', section: 'reviews' },
    { label: '💸 Payouts', section: 'payouts' },
    { label: '🏅 Awards', section: 'awards' },
    { label: '📚 Blog', section: 'blog' },
  ];

  const handleSearchSelect = () => {
    const el = document.getElementById('filterSec');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setQuery(''); setSearchOpen(false);
  };

  function handleSignOut() {
    signOut();
    setUser(null);
  }

  return (
    <>
      <nav className="navbar" onMouseLeave={() => setDropOpen(null)}>
        <div className="nav-logo" onClick={() => onNavTo('top')}>
          <Logo size={44} />
        </div>
        <ul className="nav-links">
          {navGroups.map(item => (
            <li key={item.label} className="nav-item"
              onMouseEnter={() => item.children ? setDropOpen(item.label) : setDropOpen(null)}
            >
              <a
                className={item.extraClass || ''}
                onClick={() => { if (!item.children) { onNavTo(item.section); setDropOpen(null); } }}
                style={{ cursor: 'pointer' }}
              >
                {item.label}{item.children ? ' ▾' : ''}
              </a>
              {item.children && dropOpen === item.label && (
                <div className="nav-drop">
                  {item.children.map(c => (
                    <a key={c.section} onClick={() => { onNavTo(c.section); setDropOpen(null); }} style={{ cursor: 'pointer' }}>
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className="nav-item"><Link href="/firms">📚 All Firms</Link></li>
          <li className="nav-item"><Link href="/challenges">🎯 Challenges</Link></li>
        </ul>

        <div className="nav-right">
          <div className="nav-search-wrap" ref={searchRef}>
            <span className="nav-search-icon" onClick={() => setSearchOpen(!searchOpen)}>🔍</span>
            {searchOpen && (
              <input
                className="nav-search-input"
                placeholder="Search firms..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
            )}
          </div>
          {searchOpen && results.length > 0 && (
            <div className="nav-search-dropdown">
              {results.map(f => (
                <div key={f.id} className="nav-search-result" onClick={() => handleSearchSelect()}>
                  <div className="nsr-logo" style={{ background: f.color }}>{f.logo}</div>
                  <div className="nsr-info">
                    <div className="nsr-name">{f.name}</div>
                    <div className="nsr-meta">{f.market} • {f.ctype} challenge • {f.split}% split listed</div>
                  </div>
                  {f.features.includes('india') && <span className="nsr-india">🇮🇳</span>}
                </div>
              ))}
            </div>
          )}

          <button className="nav-aff" onClick={() => onNavTo('affiliate')}>Affiliate preview</button>
          <button className="btn btn-g" style={{ fontSize: '11px', padding: '7px 14px' }} onClick={onOpenSmartFinder}>
            🎯 AI Match
          </button>
          <button className="btn btn-p" style={{ fontSize: '11px', padding: '7px 14px' }} onClick={onOpenAI}>
            ✦ AI Chat
          </button>

          {user ? (
            <UserAvatar user={user} onSignOut={handleSignOut} />
          ) : (
            <div className="nav-auth-btns">
              <button className="nav-login-btn" onClick={() => setAuthOpen('signin')}>Log In</button>
              <button className="nav-signup-btn" onClick={() => setAuthOpen('signup')}>Sign Up</button>
            </div>
          )}
        </div>
        <button className="ham" onClick={() => setMobOpen(true)}>☰</button>
      </nav>

      <div className={`mob-nav ${mobOpen ? 'open' : ''}`}>
        <div className="mob-nav-hd">
          <Logo size={40} />
          <button className="mob-nav-close" onClick={() => setMobOpen(false)}>✕</button>
        </div>

        {!user ? (
          <div className="mob-auth-row">
            <button className="mob-login-btn" onClick={() => { setAuthOpen('signin'); setMobOpen(false); }}>Log In</button>
            <button className="mob-signup-btn" onClick={() => { setAuthOpen('signup'); setMobOpen(false); }}>Sign Up Free</button>
          </div>
        ) : (
          <div className="mob-user-row">
            <div className="mob-user-avatar" style={{ background: '#00e87b', color: '#000' }}>
              {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{user.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--t3)' }}>{user.email}</div>
            </div>
            <button className="mob-signout-btn" onClick={handleSignOut}>Sign Out</button>
          </div>
        )}

        <div className="mob-search-wrap">
          <input
            className="mob-search-input"
            placeholder="🔍 Search firms..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query.length > 1 && results.length > 0 && (
            <div className="mob-search-results">
              {results.map(f => (
                <div key={f.id} className="nav-search-result" onClick={() => { handleSearchSelect(); setMobOpen(false); }}>
                  <div className="nsr-logo" style={{ background: f.color }}>{f.logo}</div>
                  <div className="nsr-info">
                    <div className="nsr-name">{f.name}</div>
                    <div className="nsr-meta">{f.market}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {navGroups.map(item =>
          item.children ? (
            <div key={item.label}>
              <div className="mob-nav-group">{item.label}</div>
              {item.children.map(c => (
                <a key={c.section} className="mob-nav-child" onClick={() => { onNavTo(c.section); setMobOpen(false); }}>{c.label}</a>
              ))}
            </div>
          ) : (
            <a key={item.label} onClick={() => { onNavTo(item.section); setMobOpen(false); }}>{item.label}</a>
          )
        )}
        <Link href="/firms" onClick={() => setMobOpen(false)}>📚 All Firms</Link>
        <Link href="/challenges" onClick={() => setMobOpen(false)}>🎯 Challenges</Link>
        <div style={{ marginTop: 'auto', padding: '16px 0', display: 'flex', gap: '8px' }}>
          <button className="btn btn-g" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { onOpenSmartFinder(); setMobOpen(false); }}>
            🎯 AI Match
          </button>
          <button className="btn btn-p" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { onOpenAI(); setMobOpen(false); }}>
            ✦ AI Chat
          </button>
        </div>
      </div>

      {authOpen && (
        <AuthModal
          mode={authOpen}
          onClose={() => setAuthOpen(null)}
          onAuthSuccess={(u) => setUser(u)}
        />
      )}
    </>
  );
}
