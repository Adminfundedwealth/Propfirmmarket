import { Link } from 'wouter';
import { PageMetadata } from './PageMetadata';
import { PublicSiteHeader } from './PublicSiteHeader';

export function ReviewsPolicyPage() {
  return (
    <div className="pf-public-page">
      <PageMetadata
        title="Reviews & Trust Policy | PropFirmMarket"
        description="Review and trust data status for PropFirmMarket's public firm directory."
        url="https://propfirmmarket.in/reviews"
      />
      <PublicSiteHeader />
      <main className="pf-directory-main">
        <nav className="pf-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Reviews &amp; trust</span>
        </nav>
        <section className="pf-directory-intro" aria-labelledby="pf-reviews-title">
          <p className="pf-eyebrow">PUBLIC REVIEW STATUS</p>
          <h1 id="pf-reviews-title">Reviews and trust policy</h1>
          <p>No verified user reviews, review submissions, or authoritative firm trust assessments are available in the current public site.</p>
        </section>
        <section className="pf-detail-panel" aria-labelledby="pf-reviews-data-title">
          <h2 id="pf-reviews-data-title">Current data status</h2>
          <p className="pf-detail-copy">PropFirmMarket does not currently operate an authenticated review-submission or moderation system. Firm ratings, review counts, payout reports, and scam classifications are not published as verified evidence.</p>
          <p className="pf-detail-copy">Public firm profile details are informational. Confirm current rules, prices, and terms directly with each firm before making a decision.</p>
          <div className="pf-detail-actions">
            <Link className="btn btn-g" href="/firms">Browse firm profiles</Link>
            <Link className="btn btn-o" href="/challenges">Browse challenge profiles</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">⭐ Public Review Status</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="reviews-sec" id="reviewsSec">
        <div className="reviews-hdr">
          <div>
            <h2 className="sec-title">⭐ Public Review Status</h2>
            <p className="sec-sub">No verified user reviews are currently available in the public repository. Ratings and review counts shown elsewhere are not treated as verified user feedback.</p>
          </div>
          <Link className="btn btn-g" href="/reviews">Review policy</Link>
        </div>

        <div className="reviews-body">
          <div className="reviews-overview">
            <div className="rov-score">
              <div className="rov-big">—</div>
              <div className="rov-cnt">No verified rating source</div>
            </div>
            <div className="rov-bars">
              <div className="rb-row"><span className="rb-lbl">Verification status</span><span className="rb-val">Unavailable</span></div>
              <div className="rb-row"><span className="rb-lbl">Provenance</span><span className="rb-val">Source unavailable</span></div>
              <div className="rb-row"><span className="rb-lbl">Payout evidence</span><span className="rb-val">Not independently verified</span></div>
            </div>
          </div>

          <div className="reviews-list">
            <div className="rev-card">
              <div className="rev-top">
                <div className="rev-avatar">!</div>
                <div className="rev-meta">
                  <div className="rev-name">Review data status</div>
                </div>
              </div>
              <p className="rev-text">No verified public reviews are available yet. Future authenticated review submissions will require a real verification flow before publication.</p>
              <div className="rev-date">Public source status: not available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
