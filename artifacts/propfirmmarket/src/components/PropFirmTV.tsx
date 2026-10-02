export function PropFirmTV() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">📺 Prop Firm TV</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="tv-sec" id="tvSec">
        <div className="tv-hdr">
          <div>
            <h2 className="sec-title">📺 Prop Firm TV</h2>
            <p className="sec-sub">Video listings will appear here when a verified library source is connected.</p>
          </div>
        </div>

        <div className="tv-grid">
          <div className="tv-card">
            <div className="tv-thumb"><span className="tv-thumb-icon">📺</span><span className="tv-status-badge replay">COMING SOON</span></div>
            <div className="tv-card-info">
              <div className="tv-card-title">Video library unavailable</div>
              <div className="tv-card-host">No live streams or replays are currently connected.</div>
              <div className="tv-card-meta"><span>Video source not available</span></div>
            </div>
          </div>
        </div>

        <div className="tv-subscribe">
          <span>🔔 Live notifications are not available on this site.</span>
        </div>
      </section>
    </>
  );
}
