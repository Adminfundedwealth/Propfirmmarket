import { useState, useEffect, useRef } from 'react';
import { Router, Route, Switch, useLocation } from 'wouter';
import { BgCanvas } from './components/BgCanvas';
import { EcosystemBar } from './components/EcosystemBar';
import { Navbar } from './components/Navbar';
import { Ticker } from './components/Ticker';
import { Hero } from './components/Hero';
import { TopFirmsPreview } from './components/TopFirmsPreview';
import { FeaturedFirmCard } from './components/FeaturedFirmCard';
import { HeroSponsors } from './components/HeroSponsors';
import { ChallengeCompare } from './components/ChallengeCompare';
import { FirmsSection } from './components/FirmsSection';
import { CompareSection } from './components/CompareSection';
import { ReviewsPolicyPage, ReviewsSection } from './components/ReviewsSection';
import { PayoutTracker } from './components/PayoutTracker';
import { ScamDetector } from './components/ScamDetector';
import { DataDashboard } from './components/DataDashboard';
import { PassCalculator } from './components/PassCalculator';
import { SmartAiFinder } from './components/SmartAiFinder';
import { AwardsSection } from './components/AwardsSection';
import { BlogSection } from './components/BlogSection';
import { CommunitySection } from './components/CommunitySection';
import { UserDashboard } from './components/UserDashboard';
import { ChampionshipSection } from './components/ChampionshipSection';
import { WhySection } from './components/WhySection';
import { AiAssistant } from './components/AiAssistant';
import { EmailCapture } from './components/EmailCapture';
import { LoyaltyProgram, useLoyalty } from './components/LoyaltyProgram';
import { EconomicCalendar } from './components/EconomicCalendar';
import { PropFirmTV } from './components/PropFirmTV';
import { UnlistedFirms } from './components/UnlistedFirms';
import { CrossPlatformSection } from './components/CrossPlatformSection';
import { Footer } from './components/Footer';
import { HomeSchema } from './components/SchemaMarkup';
import { firms } from './data/firms';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ChallengeDirectoryPage } from './pages/ChallengeDirectoryPage';
import { ChallengeDetailPage } from './pages/ChallengeDetailPage';
import { ComparePage } from './pages/ComparePage';
import { FirmDirectoryPage } from './pages/FirmDirectoryPage';
import { FirmDetailPage } from './pages/FirmDetailPage';
import NotFound from './pages/not-found';
import { SeoDashboard } from './pages/SeoDashboard';
import { TerminalPage } from './pages/TerminalPage';
import { PUBLIC_SITE_PATHS } from './lib/publicSite';
import { getUser, createGuestUser, hasSeenWelcome, markWelcomeSeen, CURRENT_PLATFORM, SUBDOMAIN_SECTIONS } from './utils/ecosystem';
import { showWelcomePopup, initExitIntent } from './utils/popup';
import { analytics } from './lib/analytics';
import './index.css';

const featuredFirm = firms.find((firm) => firm.name === 'FTMO');

function scrollToSection(id: string) {
  const map: Record<string, string> = {
    tournament: 'tournamentSec', games: 'gamesSec', affiliate: 'affiliateSec',
    news: 'calendarSec', giveaway: 'gwTool', calc: 'calcTool',
    challenges: 'challengeSec', forex: 'filterSec', futures: 'filterSec', all: 'filterSec',
    compare: 'compareSec', reviews: 'reviewsSec', payouts: 'payoutSec',
    awards: 'awardsSec', blog: 'blogSec', scam: 'scamSec',
    data: 'dataDashSec', pass: 'passCalcSec', community: 'communitySec',
    dashboard: 'dashboardSec', top: 'top',
    loyalty: 'loyaltySec', calendar: 'calendarSec', tv: 'tvSec',
    unlisted: 'unlistedSec', blacklist: 'unlistedSec',
    ecosystem: 'ecosystemSec',
  };
  const elId = map[id] || id;
  if (elId === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(elId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function HomePage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [smartFinderOpen, setSmartFinderOpen] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  useLoyalty();


  useEffect(() => {
    let user = getUser();
    if (!user) user = createGuestUser();

    if (!hasSeenWelcome()) {
      const timer = setTimeout(() => {
        markWelcomeSeen();
        showWelcomePopup();
      }, 4000);
      const cleanupExit = initExitIntent();
      return () => { clearTimeout(timer); cleanupExit(); };
    }

    const cleanupExit = initExitIntent();
    return cleanupExit;
  }, []);

  return (
    <>
      <BgCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <EcosystemBar />
        <Navbar onNavTo={scrollToSection} onOpenAI={() => setAiOpen(true)} onOpenSmartFinder={() => setSmartFinderOpen(true)} />
        <Ticker />
        <HomeSchema />
        <div className="hero-sponsors-wrap">
          <Hero onNavTo={scrollToSection} onOpenAI={() => setSmartFinderOpen(true)} onSearch={setHeroSearch} />
          <HeroSponsors />
        </div>
        {featuredFirm && <FeaturedFirmCard firm={featuredFirm} />}
        <TopFirmsPreview />
        <FirmsSection externalSearch={heroSearch} />
        <ChallengeCompare />
        <CrossPlatformSection />
        <CompareSection />
        <ReviewsSection />
        <PayoutTracker />
        <ScamDetector />
        <DataDashboard />
        <PassCalculator />
        <LoyaltyProgram />
        <EconomicCalendar />
        <PropFirmTV />
        <UnlistedFirms />
        <AwardsSection />
        <BlogSection />
        <CommunitySection />
        <UserDashboard />
        <ChampionshipSection />
        <WhySection />
        <Footer onNavTo={scrollToSection} onOpenAI={() => setAiOpen(true)} />
      </div>
      <SmartAiFinder isOpen={smartFinderOpen} onClose={() => setSmartFinderOpen(false)} />
      <AiAssistant isOpen={aiOpen} onClose={() => setAiOpen(false)} onOpen={() => setAiOpen(true)} />
      <EmailCapture />
      <div id="toast"></div>
    </>
  );
}

function PublicRouteAnalytics() {
  const [location] = useLocation();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    analytics.initialize();
  }, []);

  useEffect(() => {
    if (!location) return;

    const nextPath = location.split('?')[0].split('#')[0] || '/';
    const previousPath = previousPathRef.current ?? analytics.getPreviousPagePath();

    if (previousPathRef.current === nextPath) {
      return;
    }

    previousPathRef.current = nextPath;
    analytics.pageView(nextPath, { source_page: previousPath || '/' });
  }, [location]);

  return null;
}

function App() {
  if (CURRENT_PLATFORM === 'terminal') {
    return (
      <Router>
        <PublicRouteAnalytics />
        <Switch>
          <Route component={TerminalPage} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <PublicRouteAnalytics />
      <Switch>
        <Route path={PUBLIC_SITE_PATHS.seoDashboard} component={SeoDashboard} />
        <Route path={PUBLIC_SITE_PATHS.blogPost} component={BlogPostPage} />
        <Route path={PUBLIC_SITE_PATHS.blog} component={BlogListPage} />
        <Route path={PUBLIC_SITE_PATHS.challengeDetail} component={ChallengeDetailPage} />
        <Route path={PUBLIC_SITE_PATHS.challenges} component={ChallengeDirectoryPage} />
        <Route path={PUBLIC_SITE_PATHS.compare} component={ComparePage} />
        <Route path={PUBLIC_SITE_PATHS.reviews} component={ReviewsPolicyPage} />
        <Route path={PUBLIC_SITE_PATHS.firms} component={FirmDirectoryPage} />
        <Route path={PUBLIC_SITE_PATHS.firmDetail} component={FirmDetailPage} />
        <Route path={PUBLIC_SITE_PATHS.home} component={HomePage} />
        <Route path={PUBLIC_SITE_PATHS.notFound}>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
