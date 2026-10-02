export function UnlistedFirms() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">⚠️ Firm Alerts</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="unlisted-sec" id="unlistedSec">
        <div className="unl-hdr">
          <div>
            <h2 className="sec-title">⚠️ Firm Alerts &amp; Reports</h2>
            <p className="sec-sub">An independently sourced and moderated public firm-alert database is not available in this site.</p>
          </div>
          <div className="unl-count-badge">
            Data not yet available
          </div>
        </div>

        <div className="unl-warning-banner">
          <strong>Status:</strong> PropFirmMarket does not currently publish independently verified scam classifications or complaint counts.
        </div>

        <div className="unl-grid">
          <div className="unl-card highrisk">
            <div className="unl-top">
              <div className="unl-name">No public classifications</div>
              <div className="unl-risk hr">Unavailable</div>
            </div>
            <div className="unl-reason">No authoritative source, evidence review, and moderation process is connected to support firm-level warnings.</div>
          </div>
        </div>

        <div className="unl-report">
          <span>Have a concern about a firm listing?</span>
          <button className="unl-report-btn" onClick={() => {
            const el = document.getElementById('toast');
            if (el) { el.textContent = 'Firm reporting is not yet available on this site.'; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2500); }
          }}>
            Reporting unavailable
          </button>
        </div>
      </section>
    </>
  );
}
