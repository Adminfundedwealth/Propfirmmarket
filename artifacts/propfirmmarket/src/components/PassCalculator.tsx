import { useState } from 'react';

function assessPlan(winRate: number, riskPct: number, strategy: string, accountSize: number): { tips: string[] } {
  const tips: string[] = [];
  if (riskPct > 1) tips.push('Review how this per-trade risk assumption interacts with the challenge daily and maximum loss rules.');
  else tips.push('Compare this per-trade risk assumption with the challenge drawdown rules.');
  if (winRate < 50) tips.push('Win rate alone does not describe expectancy; include average win/loss size and trading costs in your review.');
  else tips.push('A selected win rate is not a pass-rate forecast; check how your strategy performs across a representative sample.');
  if (strategy === 'scalping') tips.push('Check whether the firm allows your execution style and review any spread or holding-time restrictions.');
  if (accountSize >= 100000) tips.push('Review position limits and drawdown rules for the account size you selected.');
  return { tips };
}

const ACCOUNT_SIZES = [10000, 25000, 50000, 100000, 200000];
const STRATEGIES = ['scalping', 'day', 'swing', 'ea'];

export function PassCalculator() {
  const [winRate, setWinRate] = useState(55);
  const [riskPct, setRiskPct] = useState(1.0);
  const [strategy, setStrategy] = useState('day');
  const [accountSize, setAccountSize] = useState(25000);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof assessPlan> | null>(null);

  const calculate = () => {
    const r = assessPlan(winRate, riskPct, strategy, accountSize);
    setResult(r);
    setCalculated(true);
  };

  return (
    <>
      <div className="sec-divider">
        <div className="sec-divider-line"></div>
        <span className="sec-divider-label">🎯 Challenge Planning Tool</span>
        <div className="sec-divider-line"></div>
      </div>
      <section className="passcalc-sec" id="passCalcSec">
        <div className="passcalc-hdr">
          <div>
            <h2 className="sec-title">🎯 Challenge Planning Tool</h2>
            <p className="sec-sub">Review your assumptions against written challenge rules. This tool does not estimate pass probabilities or predict outcomes.</p>
          </div>
        </div>

        <div className="passcalc-body">
          <div className="passcalc-inputs">
            <div className="pc-field">
              <label className="pc-label">📊 Win Rate: <strong>{winRate}%</strong></label>
              <input type="range" min={20} max={90} value={winRate} onChange={e => setWinRate(+e.target.value)} className="pc-slider" />
              <div className="pc-range-hints"><span>20%</span><span>55%</span><span>90%</span></div>
            </div>
            <div className="pc-field">
              <label className="pc-label">⚠️ Risk per Trade: <strong>{riskPct}%</strong></label>
              <input type="range" min={0.1} max={3} step={0.1} value={riskPct} onChange={e => setRiskPct(+e.target.value)} className="pc-slider" />
              <div className="pc-range-hints"><span>0.1%</span><span>1.5%</span><span>3%</span></div>
            </div>
            <div className="pc-field">
              <label className="pc-label">🎯 Strategy</label>
              <div className="pc-chips">
                {STRATEGIES.map(s => (
                  <button key={s} className={`pc-chip ${strategy === s ? 'on' : ''}`} onClick={() => setStrategy(s)}>
                    {s === 'scalping' ? '⚡ Scalping' : s === 'day' ? '📈 Day Trade' : s === 'swing' ? '🌊 Swing' : '🤖 EA/Algo'}
                  </button>
                ))}
              </div>
            </div>
            <div className="pc-field">
              <label className="pc-label">💰 Account Size</label>
              <div className="pc-chips">
                {ACCOUNT_SIZES.map(s => (
                  <button key={s} className={`pc-chip ${accountSize === s ? 'on' : ''}`} onClick={() => setAccountSize(s)}>
                    ${(s / 1000).toFixed(0)}K
                  </button>
                ))}
              </div>
            </div>
            <button className="pc-calc-btn" onClick={calculate}>
              ⚡ Review My Plan
            </button>
          </div>

          <div className="passcalc-result">
            {!calculated ? (
              <div className="pc-placeholder">
                <div className="pc-placeholder-icon">🎯</div>
                <p>Select your assumptions to see a short checklist for reviewing a challenge plan.</p>
              </div>
            ) : result && (
              <>
                <div className="pc-gauge"><div className="pc-placeholder-icon">📋</div></div>
                <div className="pc-verdict">Planning notes, not a prediction</div>
                <div className="pc-tips">
                  {result.tips.map((t, i) => <div key={i} className="pc-tip">{t}</div>)}
                </div>
                <div className="pc-best-firm">
                  <div className="pc-bf-label">📌 Planning note:</div>
                  <div className="pc-bf-name">Compare actual listed firms and challenge profiles before choosing a challenge.</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
