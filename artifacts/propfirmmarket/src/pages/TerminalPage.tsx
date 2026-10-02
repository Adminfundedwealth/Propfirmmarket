import { useState } from 'react';
import { EcosystemBar } from '../components/EcosystemBar';
import { Navbar } from '../components/Navbar';
import { Ticker } from '../components/Ticker';
import { PageMetadata } from '@/components/PageMetadata';
import { DataDashboard } from '../components/DataDashboard';
import { EconomicCalendar } from '../components/EconomicCalendar';
import { PassCalculator } from '../components/PassCalculator';
import { ScamDetector } from '../components/ScamDetector';
import { PayoutTracker } from '../components/PayoutTracker';
import { PropFirmTV } from '../components/PropFirmTV';
import { AiAssistant } from '../components/AiAssistant';
import { SmartAiFinder } from '../components/SmartAiFinder';
import { Footer } from '../components/Footer';

function scrollToSection(id: string) {
  const map: Record<string, string> = {
    data: 'dataDashSec', calc: 'passCalcSec', scam: 'scamSec',
    news: 'calendarSec', payouts: 'payoutSec', tv: 'propTvSec',
  };
  const elId = map[id] || id;
  if (elId === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(elId);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const TOOLS = [
  { icon: '📊', label: 'Industry Data', id: 'dataDashSec', color: '#00e87b' },
  { icon: '📅', label: 'Economic Calendar', id: 'calendarSec', color: '#00d4ff' },
  { icon: '🧮', label: 'Pass Calculator', id: 'passCalcSec', color: '#fbbf24' },
  { icon: '🛡️', label: 'Scam Detector', id: 'scamSec', color: '#ef4444' },
  { icon: '💸', label: 'Payout Tracker', id: 'payoutSec', color: '#8b5cf6' },
  { icon: '📺', label: 'Prop Firm TV', id: 'propTvSec', color: '#00d4ff' },
];

export function TerminalPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [smartFinderOpen, setSmartFinderOpen] = useState(false);

  return (
    <>
      <PageMetadata
        title="PropFirmMarket Terminal | Internal Tools"
        description="Internal PropFirmMarket terminal with data, pass calculator, scam checks, and payout monitoring tools."
        url="https://propfirmmarket.in/terminal"
        noIndex
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <EcosystemBar />
        <Navbar
          onNavTo={scrollToSection}
          onOpenAI={() => setAiOpen(true)}
          onOpenSmartFinder={() => setSmartFinderOpen(true)}
        />
        <Ticker />

        <section className="term-hero">
          <div className="term-hero-inner">
            <div className="term-badge">📊 PROPFIRM TERMINAL</div>
            <h1 className="term-title">
              Trade & Analyse<br />
              <span className="term-grad">Prop Firm Data</span> in Real Time
            </h1>
            <p className="term-sub">
              Industry benchmarks, economic events, pass probability, scam alerts, live payouts &amp; educational content — all in one terminal.
            </p>

            <div className="term-tools-grid">
              {TOOLS.map(t => (
                <button
                  key={t.id}
                  className="term-tool-card"
                  onClick={() => {
                    const el = document.getElementById(t.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span className="term-tool-icon">{t.icon}</span>
                  <span className="term-tool-label">{t.label}</span>
                  <span className="term-tool-arrow" style={{ color: t.color }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <DataDashboard />
        <EconomicCalendar />
        <PassCalculator />
        <ScamDetector />
        <PayoutTracker />
        <PropFirmTV />
        <Footer onNavTo={scrollToSection} onOpenAI={() => setAiOpen(true)} />
      </div>
      <SmartAiFinder isOpen={smartFinderOpen} onClose={() => setSmartFinderOpen(false)} />
      <AiAssistant isOpen={aiOpen} onClose={() => setAiOpen(false)} onOpen={() => setAiOpen(true)} />
      <div id="toast"></div>
    </>
  );
}
