export function ScamDetector() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">🛡️ Public Trust Status</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="scam-sec" id="scamSec">
        <div className="scam-hdr">
          <div>
            <h2 className="sec-title">🛡️ Public Trust Status</h2>
            <p className="sec-sub">The current repository does not include an independently verified scam database, verified complaint feed, or authoritative trust score source. We do not treat static marketing claims as verified trust evidence.</p>
          </div>
        </div>

        <div className="scam-grid safe-grid">
          <div className="scam-card safe">
            <div className="sc-top">
              <div className="sc-name">Current status</div>
            </div>
            <div className="sc-safe-notes">No verified scam classification is currently available for public display. Any dispute or complaint information must be independently sourced and moderated before being treated as public evidence.</div>
          </div>
          <div className="scam-card safe">
            <div className="sc-top">
              <div className="sc-name">Evidence policy</div>
            </div>
            <div className="sc-safe-notes">Future verification data will include provenance, evidence links, moderation status, and a clear statement of how the trust score was calculated.</div>
          </div>
        </div>

        <div className="scam-disclaimer">
          ⚠️ <strong>Disclaimer:</strong> No authoritative scam or trust database is connected in this public site phase. Do your own research and treat all static marketing claims as unverified unless a later data source explicitly identifies them as verified.
        </div>
      </section>
    </>
  );
}
