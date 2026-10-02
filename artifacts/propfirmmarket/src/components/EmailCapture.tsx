import { useState, useEffect } from 'react';

const DISMISS_KEY = 'pfm_email_dismissed';

export function EmailCapture() {
  const [show, setShow] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) {
      setShowBar(true);
      return;
    }

    const timer = setTimeout(() => setShow(true), 5000);

    const onScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct > 0.25 && !localStorage.getItem(DISMISS_KEY)) {
        setShow(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, '1');
    setShowBar(true);
  };

  return (
    <>
      {show && (
        <div className="ec-overlay" onClick={handleDismiss}>
          <div className="ec-modal" onClick={e => e.stopPropagation()}>
            <button className="ec-close" onClick={handleDismiss}>✕</button>

            <div className="ec-gift">📚</div>
            <div className="ec-eyebrow">PUBLIC GUIDES</div>
            <h2 className="ec-title">Email delivery<br /><span className="ec-grad">not yet available</span></h2>
            <p className="ec-sub">The public guide mailing service is not connected. This panel does not collect or store an email address.</p>
            <a className="ec-submit" href="/blog">Browse public guides →</a>
          </div>
        </div>
      )}

      {showBar && !show && (
        <div className="ec-sticky-bar">
          <span className="ec-bar-text">📚 <strong>Public guides:</strong> Browse prop firm explainers and comparison topics</span>
          <button className="ec-bar-btn" onClick={() => { setShow(true); setShowBar(false); }}>View status →</button>
          <button className="ec-bar-close" onClick={() => setShowBar(false)}>✕</button>
        </div>
      )}
    </>
  );
}
