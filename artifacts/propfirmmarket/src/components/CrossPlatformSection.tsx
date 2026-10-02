import { navigateTo } from '../utils/ecosystem';

export function CrossPlatformSection() {
  return (
    <section className="xplat-sec" id="ecosystemSec">
      <div className="sec-divider">
        <div className="sec-divider-line" />
        <span className="sec-divider-label">🌐 The PFM Ecosystem</span>
        <div className="sec-divider-line" />
      </div>

      <div className="xplat-inner">
        <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: 8 }}>
          One Ecosystem. Three Platforms.
        </h2>
        <p className="sec-sub" style={{ textAlign: 'center', marginBottom: 48 }}>
          Enter from any platform — compare firms, compete in championships, and practise on our terminal. All connected.
        </p>

        <div className="xplat-grid">
          <div className="xplat-card xplat-market active-platform">
            <div className="xplat-icon">🏪</div>
            <div className="xplat-badge">You Are Here</div>
            <h3 className="xplat-name">PropFirm Market</h3>
            <p className="xplat-desc">
              A public comparison platform for prop firms. Review the current firm list, compare pricing and payout terms, and narrow your options before you choose a challenge.
            </p>
            <ul className="xplat-features">
              <li>✅ Firm list and comparison views</li>
              <li>✅ Filtered firm matching</li>
              <li>✅ Public profile pages</li>
              <li>✅ Challenge and payout notes</li>
              <li>✅ INR-friendly comparison context</li>
            </ul>
            <div className="xplat-stat">
              <span>Public</span> comparison view
            </div>
          </div>

          <div className="xplat-card xplat-champ">
            <div className="xplat-icon">🏆</div>
            <div className="xplat-badge gold-badge">Preview mode</div>
            <h3 className="xplat-name">PFC Championship</h3>
            <p className="xplat-desc">
              Public preview for a trading competition experience. This section is presented as a concept and should not be treated as verified live enrollment or prize data.
            </p>
            <ul className="xplat-features">
              <li>🏆 Public challenge concept</li>
              <li>🌍 Preview-only showcase</li>
              <li>📊 Demo leaderboard style</li>
              <li>🎮 Community engagement concept</li>
              <li>🥇 No live claim attached</li>
            </ul>
            <div className="xplat-stat">
              <span>Preview</span> only
            </div>
            <button
              className="xplat-cta btn-gold"
              onClick={() => navigateTo('championship')}
            >
              🏆 View preview
            </button>
          </div>

          <div className="xplat-card xplat-terminal">
            <div className="xplat-icon">📊</div>
            <div className="xplat-badge cyan-badge">Beta — Free Access</div>
            <h3 className="xplat-name">PFT Terminal</h3>
            <p className="xplat-desc">
              A web-based trading terminal built for prop firm challenges. Backtest strategies, track performance, and get AI-powered trade analysis.
            </p>
            <ul className="xplat-features">
              <li>📈 Real-time Charts</li>
              <li>🤖 AI Trade Analysis</li>
              <li>🧪 Strategy Backtester</li>
              <li>📋 Challenge Journal</li>
              <li>🔗 Prop Firm Recommendations</li>
            </ul>
            <div className="xplat-stat">
              <span>Free</span> During Beta
            </div>
            <button
              className="xplat-cta btn-cyan"
              onClick={() => navigateTo('terminal')}
            >
              📊 Open Terminal — Free
            </button>
          </div>
        </div>

        <div className="xplat-flow">
          <div className="xplat-flow-step">
            <div className="xf-num">1</div>
            <div className="xf-label">Find Your Firm</div>
            <div className="xf-sub">Compare on Market</div>
          </div>
          <div className="xplat-flow-arrow">→</div>
          <div className="xplat-flow-step">
            <div className="xf-num">2</div>
            <div className="xf-label">Practice Strategy</div>
            <div className="xf-sub">Train on Terminal</div>
          </div>
          <div className="xplat-flow-arrow">→</div>
          <div className="xplat-flow-step">
            <div className="xf-num">3</div>
            <div className="xf-label">Compete & Win</div>
            <div className="xf-sub">Join Championship</div>
          </div>
          <div className="xplat-flow-arrow">→</div>
          <div className="xplat-flow-step">
            <div className="xf-num">4</div>
            <div className="xf-label">Get Funded</div>
            <div className="xf-sub">Claim Your Account</div>
          </div>
        </div>
      </div>
    </section>
  );
}
