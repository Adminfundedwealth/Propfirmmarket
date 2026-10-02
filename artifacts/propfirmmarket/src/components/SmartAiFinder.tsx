import { useMemo, useState } from 'react';
import { firms, type Firm } from '../data/firms';
import { getFirmPath } from '../lib/firmService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4 | 'result';

interface Answers {
  budget: string;
  risk: string;
  strategy: string;
  experience: string;
}

const STEPS = [
  {
    step: 1,
    title: 'What\'s your budget?',
    subtitle: 'We\'ll narrow the list to firms that fit your current budget range.',
    options: [
      { value: 'ultra-cheap', label: '💚 Under ₹5,000', sub: '($39–$60)' },
      { value: 'cheap', label: '🟡 ₹5,000–₹12,000', sub: '($60–$150)' },
      { value: 'premium', label: '🔵 ₹12,000+', sub: '($150+)' },
    ],
  },
  {
    step: 2,
    title: 'Risk tolerance?',
    subtitle: 'Use the risk profile that best matches your trading plan.',
    options: [
      { value: 'conservative', label: '🛡️ Conservative', sub: 'Lower drawdown, steadier rules' },
      { value: 'moderate', label: '⚖️ Moderate', sub: 'Balanced risk profile' },
      { value: 'aggressive', label: '🔥 Aggressive', sub: 'Higher volatility, bigger targets' },
    ],
  },
  {
    step: 3,
    title: 'Your trading strategy?',
    subtitle: 'Different firms fit different trading styles.',
    options: [
      { value: 'scalping', label: '⚡ Scalping', sub: 'Fast intraday execution' },
      { value: 'day', label: '📈 Day Trading', sub: 'Open and close within the same day' },
      { value: 'swing', label: '🌊 Swing Trading', sub: '1–7 day holds' },
      { value: 'ea', label: '🤖 Algorithmic/EA', sub: 'Automated or rules-based trading' },
    ],
  },
  {
    step: 4,
    title: 'Your experience level?',
    subtitle: 'Pick the level that best matches your current experience.',
    options: [
      { value: 'beginner', label: '🌱 Beginner', sub: 'New to prop trading' },
      { value: 'intermediate', label: '📊 Intermediate', sub: '1–3 years of trading' },
      { value: 'expert', label: '🏆 Expert', sub: '3+ years and funded before' },
    ],
  },
];

function scoreFirm(firm: Firm, answers: Answers): number {
  let score = 0;

  if (answers.budget === 'ultra-cheap' && firm.inrPrice <= 6000) score += 18;
  else if (answers.budget === 'cheap' && firm.inrPrice > 6000 && firm.inrPrice <= 12000) score += 18;
  else if (answers.budget === 'premium' && firm.inrPrice > 12000) score += 12;
  else score -= 10;

  if (firm.riskProfile === answers.risk) score += 18;
  if (firm.strategies.includes(answers.strategy)) score += 16;
  if (firm.experienceLevel === answers.experience) score += 14;
  else if (
    (answers.experience === 'beginner' && firm.experienceLevel === 'intermediate') ||
    (answers.experience === 'expert' && firm.experienceLevel === 'intermediate')
  ) score += 5;

  return score;
}

function getExplanation(firm: Firm, answers: Answers): string {
  const reasons: string[] = [];

  if (answers.budget === 'ultra-cheap' && firm.inrPrice <= 6000) reasons.push(`works within your ₹5K budget at ₹${firm.inrPrice.toLocaleString('en-IN')}`);
  if (answers.budget === 'cheap' && firm.inrPrice > 6000 && firm.inrPrice <= 12000) reasons.push(`fits your ₹5K–₹12K budget at ₹${firm.inrPrice.toLocaleString('en-IN')}`);
  if (answers.risk === 'conservative' && firm.riskProfile === 'conservative') reasons.push('matches a conservative risk profile');
  if (answers.risk === 'aggressive' && firm.riskProfile === 'aggressive') reasons.push('matches a more aggressive risk profile');
  if (firm.strategies.includes(answers.strategy)) reasons.push(`supports ${answers.strategy} trading`);
  if (firm.experienceLevel === answers.experience) reasons.push(`fits a ${answers.experience} trader profile`);
  return reasons.length > 0 ? `${firm.name} matches your criteria because it ${reasons[0]}${reasons.slice(1).map((reason) => ` and ${reason}`).join('')}.` : `${firm.name} matches the criteria you selected.`;
}

export function SmartAiFinder({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [results, setResults] = useState<typeof firms>([]);

  const handleOption = (key: keyof Answers, value: string) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    const nextStep = (step as number) + 1;
    if (nextStep > 4) {
      const scored = [...firms]
        .filter((firm) => {
          const current = nextAnswers as Answers;
          const matchesBudget = current.budget === 'ultra-cheap' ? firm.inrPrice <= 6000 : current.budget === 'cheap' ? firm.inrPrice > 6000 && firm.inrPrice <= 12000 : firm.inrPrice > 12000;
          const matchesRisk = current.risk === firm.riskProfile;
          const matchesStrategy = firm.strategies.includes(current.strategy);
          const matchesExperience = current.experience === firm.experienceLevel || (current.experience === 'beginner' && firm.experienceLevel === 'intermediate');
          return matchesBudget && matchesRisk && matchesStrategy && matchesExperience;
        })
        .map((firm) => ({ firm, score: scoreFirm(firm, nextAnswers as Answers) }))
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.firm);

      setResults(scored.slice(0, 3));
      setStep('result');
    } else {
      setStep(nextStep as Step);
    }
  };

  const reset = () => { setStep(1); setAnswers({}); setResults([]); };
  const currentStepData = useMemo(() => STEPS.find((item) => item.step === step), [step]);

  if (!isOpen) return null;

  return (
    <div className="saf-overlay" onClick={onClose}>
      <div className="saf-modal" onClick={e => e.stopPropagation()}>
        <button className="saf-close" onClick={onClose}>✕</button>

        {step !== 'result' && currentStepData && (
          <>
            <div className="saf-header">
              <div className="saf-eyebrow">✦ FIRM MATCH FINDER</div>
              <div className="saf-progress">
                {[1,2,3,4].map((n) => (
                  <div key={n} className={`saf-dot ${(step as number) >= n ? 'done' : ''}`}></div>
                ))}
              </div>
              <div className="saf-step-label">Step {step} of 4</div>
              <h2 className="saf-q-title">{currentStepData.title}</h2>
              <p className="saf-q-sub">{currentStepData.subtitle}</p>
            </div>
            <div className="saf-options">
              {currentStepData.options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  className="saf-option"
                  onClick={() => handleOption(
                    (['budget', 'risk', 'strategy', 'experience'] as (keyof Answers)[])[step as number - 1],
                    opt.value,
                  )}
                >
                  <span className="saf-opt-label">{opt.label}</span>
                  <span className="saf-opt-sub">{opt.sub}</span>
                  <span className="saf-opt-arrow">→</span>
                </button>
              ))}
            </div>
            {(step as number) > 1 && (
              <button type="button" className="saf-back" onClick={() => setStep(((step as number) - 1) as Step)}>← Back</button>
            )}
          </>
        )}

        {step === 'result' && (
          <>
            <div className="saf-header">
              <div className="saf-eyebrow">✦ MATCHED FIRMS</div>
              <h2 className="saf-q-title">📌 Firms that match your criteria</h2>
              <p className="saf-q-sub">These are factual matches based on the current public firm records. No ranking claim is made.</p>
            </div>
            <div className="saf-results">
              {results.length === 0 ? (
                <div className="saf-result-card">
                  <p className="saf-explanation">No matching firms found for these criteria. Try broadening the budget or selecting a different strategy.</p>
                </div>
              ) : (
                results.map((firm) => (
                  <div key={firm.id} className="saf-result-card">
                    <div className="saf-rc-top">
                      <div className="saf-rc-logo" style={{ background: firm.color }}>{firm.logo}</div>
                      <div className="saf-rc-info">
                        <div className="saf-rc-name">{firm.name}</div>
                        <div className="saf-rc-rating">{firm.market} • {firm.ctype} • {firm.split}% split</div>
                      </div>
                    </div>
                    <p className="saf-explanation">{getExplanation(firm, answers as Answers)}</p>
                    <div className="saf-rc-stats">
                      <span>💵 {firm.price === 0 ? 'Free' : `$${firm.price}`} / ₹{firm.inrPrice === 0 ? 'Free' : firm.inrPrice.toLocaleString('en-IN')}</span>
                      <span>⚡ {firm.payoutDays}d listed interval</span>
                      <span>📈 {firm.riskProfile}</span>
                    </div>
                    <a className="btn btn-g saf-visit" href={getFirmPath(firm)} onClick={onClose} style={{ justifyContent: 'center' }}>
                      View {firm.name} →
                    </a>
                  </div>
                ))
              )}
            </div>
            <button type="button" className="saf-restart" onClick={reset}>↻ Start Over</button>
          </>
        )}
      </div>
    </div>
  );
}
