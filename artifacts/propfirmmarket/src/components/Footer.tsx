import logoImg from '/logo.png';

interface Props {
  onNavTo: (s: string) => void;
  onOpenAI: () => void;
}

export function Footer({ onNavTo, onOpenAI }: Props) {
  return (
    <footer>
      <div className="ft-top">
        <div>
          <div className="ft-brand-name">
            <img src={logoImg} alt="PropFirmMarket" style={{ height: '28px', objectFit: 'contain' }} />
            PropFirmMarket
          </div>
          <p className="ft-desc">Independent public comparison platform for prop firms. Built to help traders compare challenge rules, pricing, and payouts transparently.</p>
          <div className="ft-soc">
            <a>YT</a><a>DC</a><a>IG</a><a>WA</a>
          </div>
        </div>
        <div className="ft-col">
          <h4>Platform</h4>
          <ul className="ft-links">
            <li><a onClick={() => onNavTo('all')}>All Firms</a></li>
            <li><a onClick={() => onNavTo('forex')}>Forex</a></li>
            <li><a onClick={() => onNavTo('futures')}>Futures</a></li>
            <li><a onClick={() => onNavTo('instant')}>Instant</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Features</h4>
          <ul className="ft-links">
            <li><a onClick={() => onNavTo('tournament')}>Championship</a></li>
            <li><a onClick={() => onNavTo('games')}>Games</a></li>
            <li><a onClick={() => onNavTo('affiliate')}>Affiliate</a></li>
            <li><a onClick={onOpenAI}>AI Finder</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Tools</h4>
          <ul className="ft-links">
            <li><a onClick={() => onNavTo('calc')}>Calculator</a></li>
            <li><a onClick={() => onNavTo('news')}>News</a></li>
            <li><a onClick={() => onNavTo('giveaway')}>Giveaways</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="ft-bot">
        <span>© 2026 PropFirmMarket — Independent platform. Not a prop firm. Trading involves risk.</span>
      </div>
    </footer>
  );
}
