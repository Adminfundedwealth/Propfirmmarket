import { useState, useEffect, useRef } from 'react';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
}

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

const STORAGE_KEY = 'pfm_user';

export function getStoredUser(): AuthUser | null {
  return null;
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY);
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarColor(email: string) {
  const colors = ['#00e87b', '#00d4ff', '#8b5cf6', '#fbbf24', '#f87171', '#34d399'];
  let hash = 0;
  for (const c of email) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff;
  return colors[Math.abs(hash) % colors.length];
}

export function AuthModal({ mode: initialMode, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [terms, setTerms]       = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(initialMode);
    setError(''); setName(''); setEmail(''); setPassword('');
  }, [initialMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  function validate() {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (mode === 'signup') {
      if (!name.trim()) return 'Full name is required.';
      if (!terms) return 'Please accept the Terms of Use.';
    }
    return '';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('Account access is not connected. No account or session was created.');
  }

  function handleGoogle() {
    setError('Google sign-in is not connected.');
  }

  return (
    <div className="auth-backdrop" ref={backdropRef} onClick={handleBackdrop}>
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="auth-tabs">
          <button className={`auth-tab-btn${mode === 'signin' ? ' active' : ''}`} onClick={() => { setMode('signin'); setError(''); }}>
            Log In
          </button>
          <button className={`auth-tab-btn${mode === 'signup' ? ' active' : ''}`} onClick={() => { setMode('signup'); setError(''); }}>
            Sign Up
          </button>
        </div>

        <div className="auth-header">
          <h2 className="auth-title">Account access unavailable</h2>
          <p className="auth-sub">{mode === 'signup' ? 'Account creation is not connected.' : 'Sign-in is not connected.'} No credentials are collected and no account or session will be created.</p>
        </div>

        <button className="auth-google-btn" onClick={handleGoogle} disabled type="button">
          <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Google sign-in unavailable
        </button>

        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">or {mode === 'signup' ? 'Sign up' : 'Sign in'} with Email</span>
          <span className="auth-divider-line" />
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                className="auth-input"
                type="text"
                placeholder="Arjun Sharma"
                disabled
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email {mode === 'signup' && <span className="auth-required">*</span>}</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@email.com"
              disabled
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-pw-wrap">
              <input
                className="auth-input"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••••"
                disabled
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(v => !v)} tabIndex={-1}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {mode === 'signin' && (
            <div style={{ textAlign: 'right', marginTop: '-8px', marginBottom: '4px' }}>
              <button type="button" className="auth-forgot">Forgot password?</button>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <label className="auth-check-row">
                <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} disabled />
                <span>By signing up, you agree to our <span className="auth-link" style={{cursor:'pointer'}}>Terms of Use</span> and <span className="auth-link" style={{cursor:'pointer'}}>Privacy Policy</span>.</span>
              </label>
              <label className="auth-check-row">
                <input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)} className="auth-check-green" disabled />
                <span>I consent to receive marketing emails.</span>
              </label>
              <div className="auth-notice">
                <span className="auth-notice-icon">ℹ️</span>
                Account creation is not available
              </div>
            </>
          )}

          {error && <div className="auth-error">⚠️ {error}</div>}

          <button className="auth-submit-btn" type="submit" disabled>
            Not yet available
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'signup' ? (
            <>Already have an account? <button className="auth-link-btn" onClick={() => { setMode('signin'); setError(''); }}>Log in</button></>
          ) : (
            <>Don't have an account? <button className="auth-link-btn" onClick={() => { setMode('signup'); setError(''); }}>Sign up free</button></>
          )}
        </p>
      </div>
    </div>
  );
}

export function UserAvatar({ user, onSignOut }: { user: AuthUser; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const color = getAvatarColor(user.email);
  const initials = getInitials(user.name);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="user-avatar-wrap" ref={ref}>
      <button className="user-avatar-btn" onClick={() => setOpen(v => !v)} style={{ '--av-color': color } as React.CSSProperties}>
        <span className="user-avatar-initials">{initials}</span>
      </button>
      {open && (
        <div className="user-avatar-menu">
          <div className="uam-header">
            <div className="uam-avatar-lg" style={{ background: color }}>{initials}</div>
            <div>
              <div className="uam-name">{user.name}</div>
              <div className="uam-email">{user.email}</div>
            </div>
          </div>
          <div className="uam-divider" />
          <button className="uam-item">👤 My Profile</button>
          <button className="uam-item">📌 Saved Firms</button>
          <button className="uam-item">🏆 My Championship</button>
          <button className="uam-item">💰 Affiliate Earnings</button>
          <div className="uam-divider" />
          <button className="uam-item uam-signout" onClick={() => { onSignOut(); setOpen(false); }}>
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
