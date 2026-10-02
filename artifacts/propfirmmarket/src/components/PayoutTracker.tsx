export function PayoutTracker() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">💸 Payout Evidence Status</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="payout-sec" id="payoutSec">
        <div className="payout-hdr">
          <div>
            <h2 className="payout-title">💸 Payout Evidence Status</h2>
            <p className="payout-sub">No independently verified payout evidence is currently connected to the public site. We do not publish payout claims as verified outcomes without documentation and provenance.</p>
          </div>
        </div>
        <div className="payout-grid">
          <div className="payout-card">
            <div className="payout-card-top">
              <div className="payout-avatar" style={{ background: 'var(--gold)' }}>!</div>
              <div className="payout-info">
                <div className="payout-name">Public status</div>
                <div className="payout-city">No verified payout data</div>
              </div>
            </div>
            <div className="payout-card-bot">
              <div className="payout-firm-tag" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>Source unavailable</div>
              <div className="payout-time">Verification pending</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
