export interface Firm {
  id: number;
  name: string;
  logo: string;
  color: string;
  market: 'forex' | 'futures' | 'crypto';
  ctype: '1step' | '2step' | 'instant' | '24h';
  price: number;
  inrPrice: number;
  split: number;
  maxAccount: string;
  code: string;
  aff: string;
  tags: string[];
  features: string[];
  payment: string[];
  indiaBanned: boolean;
  payoutDays: number;
  founded: number;
  profileTags: string[];
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  strategies: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  platforms: string[];
  freeDemo: boolean;
  scalingPlan: string;
  countries: string[];
  maxAllocation: string;
}

export const firms: Firm[] = [
  {
    id: 1, name: 'FTMO', logo: 'FT', color: '#1a3c5e',
      market: 'forex', ctype: '2step',
    price: 155, inrPrice: 12900, split: 90,  maxAccount: '$200K', maxAllocation: '$400K',
    
    code: 'MARKET50', aff: '#', 
    tags: ['2-Step', 'EA Allowed', 'India Friendly'],
    features: ['india', 'ea', 'highsplit'],
    payment: ['card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 2, founded: 2015,
    
      
    
    
    
     profileTags: ['experienced', 'swing', 'ea'], riskProfile: 'conservative',
    strategies: ['swing', 'day', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5', 'ctrader'], freeDemo: true,
    scalingPlan: 'Scale up to $400K after 4 months of 10%+ profit. 25% account increase per cycle.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'sg'],
  },
  {
    id: 3, name: 'The 5%ers', logo: '5%', color: '#2d1a3d',
      market: 'forex', ctype: 'instant',
    price: 0, inrPrice: 0, split: 100,  maxAccount: '$100K', maxAllocation: '$4M',
    
    code: 'MARKET5', aff: '#', 
    tags: ['Instant Funded', '100% Split', 'No Challenge'],
    features: ['highsplit'],
    payment: ['card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 5, founded: 2016,
    
      
    
    
    
     profileTags: ['highsplit', 'instant', 'aggressive'], riskProfile: 'aggressive',
    strategies: ['scalping', 'day', 'swing'], experienceLevel: 'expert', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Performance-based: double your account every milestone. Path to $4M allocation.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'sg', 'ae'],
  },
  {
    id: 4, name: 'Funded Next', logo: 'FN', color: '#0d2a1a',
      market: 'forex', ctype: '1step',
    price: 49, inrPrice: 4100, split: 90,  maxAccount: '$200K', maxAllocation: '$500K',
    
    code: 'FN50OFF', aff: '#', 
    tags: ['1-Step', 'India', '90% Split'],
    features: ['india', 'highsplit'],
    payment: ['upi', 'card', 'crypto', 'paytm', 'bank'],
    indiaBanned: false, payoutDays: 1, founded: 2022,
    
      
    
    
    
     profileTags: ['india', 'budget', 'beginners'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'scalping'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: true,
    scalingPlan: 'Scale from $25K → $500K over 6 months with consistent 5%+ monthly returns.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae', 'pk'],
  },
  {
    id: 5, name: 'Apex Trader', logo: 'AT', color: '#1a1a3d',
      market: 'futures', ctype: '1step',
    price: 167, inrPrice: 13900, split: 100,  maxAccount: '$150K', maxAllocation: '$300K',
    
    code: 'APEX30', aff: '#', 
    tags: ['Futures', '1-Step', '100% Split'],
    features: ['highsplit', 'ea'],
    payment: ['card', 'bank', 'crypto'],
    indiaBanned: false, payoutDays: 7, founded: 2019,
    
      
    
    
    
     profileTags: ['futures', 'experienced', 'ea'], riskProfile: 'moderate',
    strategies: ['day', 'scalping', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'tradovate', 'rithmic'], freeDemo: true,
    scalingPlan: 'Up to 20 accounts simultaneously. Scale by adding more accounts, no single-account size limit.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 6, name: 'TopStep', logo: 'TS', color: '#1a2a0d',
      market: 'futures', ctype: '2step',
    price: 165, inrPrice: 13700, split: 90,  maxAccount: '$150K', maxAllocation: '$150K',
    
    code: 'TOP20', aff: '#', 
    tags: ['Futures', '2-Step', 'Established'],
    features: ['weekly'],
    payment: ['card', 'paypal', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2012,
    
      
    
    
    
     profileTags: ['futures', 'conservative', 'experienced'], riskProfile: 'conservative',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'tradovate'], freeDemo: true,
    scalingPlan: 'Scale to $500K through consistent monthly performance and passing combine levels.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 7, name: 'Funder Pro', logo: 'FP', color: '#1a0a3d',
      market: 'forex', ctype: '24h',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'FP24H', aff: '#', 
    tags: ['24h Challenge', 'Quick Funded'],
    features: ['india'],
    payment: ['upi', 'card', 'crypto'],
    indiaBanned: false, payoutDays: 3, founded: 2021,
    
      
    
    
    
     profileTags: ['speed', 'india', 'moderate'], riskProfile: 'aggressive',
    strategies: ['scalping', 'day'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Standard scaling plan — double account every 3 months with 10%+ returns.',
    countries: ['india', 'uk', 'us', 'eu', 'ae'],
  },
  {
    id: 8, name: 'True Forex', logo: 'TF', color: '#0d1a3d',
      market: 'forex', ctype: '1step',
    price: 39, inrPrice: 3200, split: 80,  maxAccount: '$200K', maxAllocation: '$400K',
    
    code: 'TRUE50', aff: '#', 
    tags: ['1-Step', 'India', 'No Time Limit'],
    features: ['india', 'ea', 'consistency'],
    payment: ['upi', 'card', 'crypto', 'paytm'],
    indiaBanned: false, payoutDays: 2, founded: 2020,
    
      
    
    
    
     profileTags: ['budget', 'beginners', 'india'], riskProfile: 'conservative',
    strategies: ['swing', 'day', 'ea'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: true,
    scalingPlan: 'Scale from $10K → $400K. 25% increase for every 10% profit milestone.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae', 'pk'],
  },
  {
    id: 9, name: 'Earn2Trade', logo: 'E2', color: '#1a3d0d',
      market: 'futures', ctype: '2step',
    price: 150, inrPrice: 12500, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'E2T25', aff: '#', 
    tags: ['Futures', 'Educational', 'Weekly Pay'],
    features: ['weekly'],
    payment: ['card', 'paypal', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2018,
    
      
    
    
    
     profileTags: ['education', 'futures', 'beginners'], riskProfile: 'conservative',
    strategies: ['swing', 'day'], experienceLevel: 'beginner', 
    platforms: ['ninjatrader', 'tradovate'], freeDemo: true,
    scalingPlan: 'Three-tier system: Gauntlet Mini → Gauntlet → Pro. Grow from $25K to $200K.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 10, name: 'Instant Funding', logo: 'IF', color: '#2d0d1a',
      market: 'crypto', ctype: 'instant',
    price: 199, inrPrice: 16600, split: 75,  maxAccount: '$100K', maxAllocation: '$250K',
    
    code: 'IF50', aff: '#', 
    tags: ['Crypto', 'Instant', 'Same-day'],
    features: ['india'],
    payment: ['crypto', 'card'],
    indiaBanned: false, payoutDays: 1, founded: 2023,
    
      
    
    
    
     profileTags: ['crypto', 'instant', 'aggressive'], riskProfile: 'aggressive',
    strategies: ['scalping', 'day'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Scale from $25K to $250K based on performance. Monthly review cycles.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae'],
  },
  {
    id: 11, name: 'FundingPips', logo: 'Fp', color: '#0e2a4a',
      market: 'forex', ctype: '1step',
    price: 59, inrPrice: 4900, split: 85,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'PIPS20', aff: '#', 
    tags: ['1-Step', 'India Friendly', '85% Split'],
    features: ['india', 'highsplit'],
    payment: ['upi', 'card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 4, founded: 2022,
    
      
    
    
    
     profileTags: ['india', 'intermediate', 'day'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Scale up to $200K through consistent monthly profits above 5%.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae'],
  },
  {
    id: 12, name: 'Alpha Capital', logo: 'AC', color: '#1e3a2f',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'ALPHA15', aff: '#', 
    tags: ['2-Step', 'UK Regulated'],
    features: ['india', 'ea'],
    payment: ['card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 5, founded: 2021,
    
      
    
    
    
     profileTags: ['uk', 'experienced', 'ea'], riskProfile: 'conservative',
    strategies: ['swing', 'ea', 'day'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Scale from $25K to $200K. Performance-reviewed quarterly.',
    countries: ['india', 'uk', 'us', 'eu', 'au'],
  },
  {
    id: 13, name: 'Blue Guardian', logo: 'BG', color: '#0a1f3d',
      market: 'forex', ctype: '2step',
    price: 125, inrPrice: 10400, split: 85,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'BLUE10', aff: '#', 
    tags: ['2-Step', '85% Split', 'Conservative'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 6, founded: 2021,
    
      
    
    
    
     profileTags: ['conservative', 'experienced', 'swing'], riskProfile: 'conservative',
    strategies: ['swing', 'ea', 'day'], experienceLevel: 'expert', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Scale to $200K through 4 consecutive profitable months at 8%+ each.',
    countries: ['india', 'uk', 'us', 'eu'],
  },
  {
    id: 14, name: 'E8 Markets', logo: 'E8', color: '#1a0d3d',
      market: 'forex', ctype: '2step',
    price: 128, inrPrice: 10700, split: 80,  maxAccount: '$250K', maxAllocation: '$250K',
    
    code: 'E8MKT20', aff: '#', 
    tags: ['2-Step', 'Community', 'EA Allowed'],
    features: ['ea'],
    payment: ['card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 5, founded: 2022,
    
      
    
    
    
     profileTags: ['community', 'ea', 'intermediate'], riskProfile: 'moderate',
    strategies: ['swing', 'day', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5', 'ctrader'], freeDemo: false,
    scalingPlan: 'Scale to $250K using 4-phase growth model. Each phase requires 10% profit target.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 15, name: 'FXIFY', logo: 'FX', color: '#0d2d1a',
      market: 'forex', ctype: '1step',
    price: 99, inrPrice: 8200, split: 90,  maxAccount: '$400K', maxAllocation: '$400K',
    
    code: 'FXIFY25', aff: '#', 
    tags: ['1-Step', '90% Split', 'India'],
    features: ['india', 'highsplit', 'ea'],
    payment: ['upi', 'card', 'crypto'],
    indiaBanned: false, payoutDays: 3, founded: 2022,
    
      
    
    
    
     profileTags: ['india', 'highsplit', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: true,
    scalingPlan: 'Scale to $400K account through performance milestones every 2 months.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae'],
  },
  {
    id: 16, name: 'Lark Funding', logo: 'LF', color: '#1a2d0a',
      market: 'forex', ctype: 'instant',
    price: 0, inrPrice: 0, split: 75,  maxAccount: '$50K', maxAllocation: '$200K',
    
    code: 'LARK20', aff: '#', 
    tags: ['Instant', 'No Challenge', 'Quick Start'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2022,
    
      
    
    
    
     profileTags: ['instant', 'aggressive', 'experienced'], riskProfile: 'aggressive',
    strategies: ['scalping', 'day'], experienceLevel: 'expert', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Performance-based scaling from $50K → $200K. Monthly milestone reviews.',
    countries: ['india', 'uk', 'us', 'eu'],
  },
  {
    id: 18, name: 'The Trading Pit', logo: 'TP', color: '#3d1a0d',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$100K', maxAllocation: '$160K',
    
    code: 'PIT20', aff: '#', 
    tags: ['Futures', 'Forex', 'EU Regulated'],
    features: ['weekly', 'ea'],
    payment: ['card', 'bank', 'crypto'],
    indiaBanned: false, payoutDays: 7, founded: 2021,
    
      
    
    
    
     profileTags: ['futures', 'eu', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5', 'ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale from $20K to $160K through 5 performance phases, each requiring 8% profit.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 19, name: 'GoatFunded Trader', logo: 'GF', color: '#0d3d2d',
      market: 'forex', ctype: '2step',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$400K', maxAllocation: '$400K',
    
    code: 'GOAT25', aff: '#', 
    tags: ['2-Step', 'India', 'High Scale'],
    features: ['india'],
    payment: ['upi', 'card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2022,
    
      
    
    
    
     profileTags: ['india', 'scaling', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Scale from $10K to $400K through 8 phases. 50% account increase per phase.',
    countries: ['india', 'uk', 'us', 'eu', 'sg', 'ae', 'my'],
  },
  {
    id: 20, name: 'City Traders Imperium', logo: 'CI', color: '#2d0d2d',
      market: 'forex', ctype: '2step',
    price: 139, inrPrice: 11600, split: 100,  maxAccount: '$200K', maxAllocation: '$4M',
    
    code: 'CTI20', aff: '#', 
    tags: ['2-Step', '100% Split', 'UK Based'],
    features: ['ea', 'highsplit'],
    payment: ['card', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2018,
    
      
    
    
    
     profileTags: ['expert', 'uk', 'highsplit'], riskProfile: 'conservative',
    strategies: ['swing', 'ea', 'day'], experienceLevel: 'expert', 
    platforms: ['mt4', 'mt5', 'ctrader'], freeDemo: true,
    scalingPlan: 'Unique performance-based program. Start at $50K → scale to $4M through quarterly reviews.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 21, name: 'Hola Prime', logo: 'HP', color: '#1a3d0a',
      market: 'forex', ctype: '1step',
    price: 59, inrPrice: 4900, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'HOLA30', aff: '#', 
    tags: ['1-Step', 'India', 'Hindi Support'],
    features: ['india'],
    payment: ['upi', 'card', 'crypto', 'paytm'],
    indiaBanned: false, payoutDays: 3, founded: 2023,
    
      
    
    
    
     profileTags: ['india', 'hindi', 'beginners'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'scalping'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Grow from $10K to $200K through 4 performance tiers. India-specific support throughout.',
    countries: ['india', 'sg', 'ae', 'pk'],
  },
  {
    id: 23, name: 'Audacity Capital', logo: 'AU', color: '#1a1a1a',
      market: 'forex', ctype: '2step',
    price: 0, inrPrice: 0, split: 50,  maxAccount: '$20K', maxAllocation: '$1M',
    
    code: 'AUD25', aff: '#', 
    tags: ['No Fee', 'Revenue Share', 'Instant'],
    features: [],
    payment: ['bank'],
    indiaBanned: false, payoutDays: 14, founded: 2012,
    
      
    
    
    
     profileTags: ['zero-fee', 'experienced', 'conservative'], riskProfile: 'conservative',
    strategies: ['swing', 'day'], experienceLevel: 'expert', 
    platforms: ['mt4'], freeDemo: false,
    scalingPlan: 'Internal review every 6 months. Scale from $20K to $1M based on consistency.',
    countries: ['uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 24, name: 'OneUp Trader', logo: 'OU', color: '#2d1a0d',
      market: 'futures', ctype: '1step',
    price: 125, inrPrice: 10400, split: 100,  maxAccount: '$250K', maxAllocation: '$250K',
    
    code: 'ONEUP20', aff: '#', 
    tags: ['Futures', '1-Step', '100% Split'],
    features: ['highsplit'],
    payment: ['card', 'paypal', 'bank'],
    indiaBanned: false, payoutDays: 14, founded: 2017,
    
      
    
    
    
     profileTags: ['futures', 'us', 'experienced'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'tradovate', 'rithmic'], freeDemo: true,
    scalingPlan: 'No formal scaling. Add more accounts (up to 10) for higher overall allocation.',
    countries: ['india', 'uk', 'us', 'eu', 'au', 'ca'],
  },
  {
    id: 25, name: 'Bulenox', logo: 'BX', color: '#0d3d3d',
      market: 'futures', ctype: '1step',
    price: 95, inrPrice: 7900, split: 90,  maxAccount: '$150K', maxAllocation: '$150K',
    
    code: 'BUL25', aff: '#', 
    tags: ['Futures', '1-Step', 'Best Value'],
    features: ['highsplit'],
    payment: ['card', 'crypto', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2021,
    
      
    
    
    
     profileTags: ['futures', 'budget', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'rithmic'], freeDemo: false,
    scalingPlan: 'Multiple account model. Scale by adding accounts, up to 5 simultaneously.',
    countries: ['india', 'uk', 'us', 'eu', 'ca'],
  },
  {
    id: 26, name: 'Take Profit Trader', logo: 'TT', color: '#2d0d0d',
      market: 'futures', ctype: '1step',
    price: 150, inrPrice: 12500, split: 80,  maxAccount: '$150K', maxAllocation: '$150K',
    
    code: 'TPT15', aff: '#', 
    tags: ['Futures', '1-Step', 'Simple Rules'],
    features: [],
    payment: ['card', 'paypal'],
    indiaBanned: false, payoutDays: 7, founded: 2019,
    
      
    
    
    
     profileTags: ['futures', 'simple', 'beginners'], riskProfile: 'conservative',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['ninjatrader', 'tradovate'], freeDemo: false,
    scalingPlan: 'No formal scaling plan. Pass once and trade up to $150K indefinitely.',
    countries: ['india', 'uk', 'us', 'eu', 'ca'],
  },
  {
    id: 27, name: 'TradeDay', logo: 'TD', color: '#0d0d3d',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 90,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'TDAY20', aff: '#', 
    tags: ['Futures', 'Daily Payout', '90% Split'],
    features: ['highsplit', 'weekly'],
    payment: ['card', 'bank'],
    indiaBanned: false, payoutDays: 1, founded: 2022,
    
      
    
    
    
     profileTags: ['futures', 'cashflow', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'rithmic'], freeDemo: false,
    scalingPlan: 'Consistent performance over 3 months allows account size increase up to $200K.',
    countries: ['us', 'eu', 'uk', 'ca', 'au'],
  },
  {
    id: 30, name: 'My Flash Funding', logo: 'FF', color: '#3d0d1a',
      market: 'forex', ctype: 'instant',
    price: 0, inrPrice: 0, split: 70,  maxAccount: '$10K', maxAllocation: '$100K',
    
    code: 'FLASH25', aff: '#', 
    tags: ['Instant', 'No Challenge', 'Minutes'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2023,
    
      
    
    
    
     profileTags: ['instant', 'speed', 'experienced'], riskProfile: 'aggressive',
    strategies: ['scalping', 'day'], experienceLevel: 'expert', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Build to $100K through consistent performance. New milestones every 30 days.',
    countries: ['us', 'eu', 'uk', 'ca'],
  },
  {
    id: 31, name: 'AquaFunded', logo: 'AQ', color: '#0d2a3a',
      market: 'forex', ctype: '1step',
    price: 69, inrPrice: 5700, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'AQUA20', aff: '#', 
    tags: ['1-Step', 'Rising Star', 'India'],
    features: ['india'],
    payment: ['upi', 'card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2023,
    
      
    
    
    
     profileTags: ['india', 'budget', 'beginners'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'New: 2-phase scaling from $25K to $200K after 3 consecutive profitable months.',
    countries: ['india', 'sg', 'ae', 'uk'],
  },
  {
    id: 32, name: 'Phoenix Trader', logo: 'PT', color: '#3d1a0a',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 85,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'PHXN20', aff: '#', 
    tags: ['2-Step', '85% Split', 'Transparent'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2022,
    
      
    
    
    
     profileTags: ['transparent', 'ea', 'intermediate'], riskProfile: 'moderate',
    strategies: ['swing', 'day', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Three-phase scaling: Starter → Pro → Elite. Each phase doubles account size.',
    countries: ['us', 'eu', 'uk', 'ca', 'au'],
  },
  {
    id: 34, name: 'Uprofit', logo: 'UP', color: '#0d3d0d',
      market: 'futures', ctype: '1step',
    price: 110, inrPrice: 9200, split: 90,  maxAccount: '$100K', maxAllocation: '$200K',
    
    code: 'UPRFT20', aff: '#', 
    tags: ['Futures', '90% Split', 'Straightforward'],
    features: ['highsplit'],
    payment: ['card', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2022,
    
      
    
    
    
     profileTags: ['futures', 'highsplit', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader', 'rithmic'], freeDemo: false,
    scalingPlan: 'Two-phase: Phase 1 ($100K) → Phase 2 ($200K) after 3 months consistent profits.',
    countries: ['us', 'eu', 'uk', 'ca', 'au'],
  },
  {
    id: 35, name: 'ThinkCapital', logo: 'TC', color: '#0a1a3d',
      market: 'forex', ctype: '1step',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'THINK20', aff: '#', 
    tags: ['1-Step', 'India Focus', 'UPI'],
    features: ['india'],
    payment: ['upi', 'card', 'crypto', 'paytm'],
    indiaBanned: false, payoutDays: 3, founded: 2023,
    
      
    
    
    
     profileTags: ['india', 'budget', 'beginners'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'India-specific scaling program. ₹INR milestone-based account growth to $200K.',
    countries: ['india', 'sg', 'ae'],
  },
  {
    id: 37, name: 'Breakout Prop', logo: 'BP', color: '#1a0d0d',
      market: 'forex', ctype: '1step',
    price: 89, inrPrice: 7400, split: 85,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'BREAK20', aff: '#', 
    tags: ['1-Step', 'News Trading', 'Flexible'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2022,
    
      
    
    
    
     profileTags: ['news', 'breakout', 'intermediate'], riskProfile: 'aggressive',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Milestone-based: $25K → $100K → $200K with 10% profit per milestone.',
    countries: ['us', 'eu', 'uk', 'ca', 'au'],
  },
  {
    id: 41, name: 'Maven Trading', logo: 'MV', color: '#1a2d3d',
      market: 'forex', ctype: '2step',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'Match Trader', 'Multi-Asset'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2023,
    
      
    
    
    
     profileTags: ['intermediate', 'multi-asset', 'ea'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Performance-based scaling up to $200K with monthly reviews.',
    countries: ['india', 'uk', 'us', 'eu', 'sg'],
  },
  {
    id: 42, name: 'Crypto Fund Trader', logo: 'CF', color: '#0d2d2d',
      market: 'crypto', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$330K', maxAllocation: '$330K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Crypto', 'Bybit', 'Stocks'],
    features: ['ea'],
    payment: ['crypto', 'card'],
    indiaBanned: false, payoutDays: 5, founded: 2023,
    
      
    
    
    
     profileTags: ['crypto', 'intermediate', 'multi-asset'], riskProfile: 'aggressive',
    strategies: ['day', 'swing', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Scale up to $330K based on consistent performance.',
    countries: ['india', 'us', 'eu', 'uk', 'sg'],
  },
  {
    id: 43, name: 'BEM Funding', logo: 'BM', color: '#1a3d2d',
      market: 'forex', ctype: '1step',
    price: 89, inrPrice: 7400, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'MARKET', aff: '#', 
    tags: ['1-Step', 'cTrader', 'DXTrade'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['ctrader', 'beginners'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['ctrader'], freeDemo: false,
    scalingPlan: 'Standard scaling to $200K based on performance milestones.',
    countries: ['ae', 'india', 'uk', 'eu'],
  },
  {
    id: 44, name: 'Top One Trader', logo: 'T1', color: '#2d1a2d',
      market: 'forex', ctype: '2step',
    price: 69, inrPrice: 5700, split: 80,  maxAccount: '$300K', maxAllocation: '$300K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'TradeLocker', '70% OFF'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2024,
    
      
    
    
    
     profileTags: ['value', 'intermediate', 'multi-platform'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Performance-based scaling to $300K. Monthly reviews.',
    countries: ['us', 'india', 'uk', 'eu', 'sg'],
  },
  {
    id: 45, name: 'QT Funded', logo: 'QT', color: '#1a1a2d',
      market: 'forex', ctype: '2step',
    price: 89, inrPrice: 7400, split: 80,  maxAccount: '$300K', maxAllocation: '$300K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'TradeLocker', 'cTrader'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['ctrader', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['mt5', 'ctrader'], freeDemo: false,
    scalingPlan: 'Scaling to $300K with consistent performance over 3 months.',
    countries: ['uk', 'eu', 'india', 'us'],
  },
  {
    id: 46, name: 'For Traders', logo: 'FT', color: '#2d2d0d',
      market: 'forex', ctype: '2step',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'TradeLocker', 'Multi-Platform'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2024,
    
      
    
    
    
     profileTags: ['intermediate', 'multi-platform'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5', 'ctrader'], freeDemo: false,
    scalingPlan: 'Performance-based scaling to $200K. Bi-monthly reviews.',
    countries: ['ae', 'india', 'uk', 'eu', 'us'],
  },
  {
    id: 47, name: 'Trade The Pool', logo: 'TP', color: '#0d2d0d',
      market: 'forex', ctype: '2step',
    price: 149, inrPrice: 12400, split: 80,  maxAccount: '$450K', maxAllocation: '$450K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Stocks', 'TraderEvolution', 'US Markets'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 7, founded: 2023,
    
      
    
    
    
     profileTags: ['stocks', 'equity', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Scale from $80K to $450K through consistent stock trading performance.',
    countries: ['us', 'eu', 'uk', 'il'],
  },
  {
    id: 48, name: 'FundedElite', logo: 'FE', color: '#2d1a0d',
      market: 'forex', ctype: '2step',
    price: 89, inrPrice: 7400, split: 80,  maxAccount: '$400K', maxAllocation: '$400K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'Match Trader', 'European'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['eu', 'intermediate', 'multi-platform'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Scale to $400K through quarterly performance reviews.',
    countries: ['eu', 'uk', 'india', 'us'],
  },
  {
    id: 49, name: 'Finotive Funding', logo: 'FF', color: '#1a2d1a',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$1.6M', maxAllocation: '$1.6M',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'Match Trader', '$1.6M Max'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2021,
    
      
    
    
    
     profileTags: ['high-capital', 'experienced', 'stocks'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Progressive scaling up to $1.6M. Performance milestones every quarter.',
    countries: ['ae', 'india', 'uk', 'eu', 'us'],
  },
  {
    id: 50, name: 'Moneta Funded', logo: 'MF', color: '#0d1a2d',
      market: 'forex', ctype: '1step',
    price: 79, inrPrice: 6600, split: 80,  maxAccount: '$2.3M', maxAllocation: '$2.3M',
    
    code: 'MARKET', aff: '#', 
    tags: ['1-Step', 'Match Trader', '$2.3M Max'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['high-capital', 'aggressive'], riskProfile: 'aggressive',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Scaling up to $2.3M. Performance-based monthly reviews.',
    countries: ['india', 'us', 'eu', 'uk'],
  },
  {
    id: 51, name: 'ATFunded', logo: 'AT', color: '#2d0d1a',
      market: 'forex', ctype: '1step',
    price: 89, inrPrice: 7400, split: 80,  maxAccount: '$400K', maxAllocation: '$400K',
    
    code: 'MARKET', aff: '#', 
    tags: ['1-Step', 'MT5', 'Multi-Asset'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 6, founded: 2025,
    
      
    
    
    
     profileTags: ['beginners', 'multi-asset'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Standard scaling to $400K based on performance milestones.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 52, name: 'Hantec Trader', logo: 'HT', color: '#1a0d1a',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$300K', maxAllocation: '$300K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'MT4', 'Institutional'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['institutional', 'intermediate', 'ea'], riskProfile: 'conservative',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5'], freeDemo: false,
    scalingPlan: 'Institutional-grade scaling to $300K. Quarterly reviews.',
    countries: ['uk', 'eu', 'india', 'us', 'au'],
  },
  {
    id: 53, name: 'Axi Select', logo: 'AX', color: '#0d2d3d',
      market: 'forex', ctype: 'instant',
    price: 0, inrPrice: 0, split: 70,  maxAccount: '$1M', maxAllocation: '$1M',
    
    code: '', aff: '#', 
    tags: ['Free', 'Broker-Backed', '$1M Max'],
    features: ['ea'],
    payment: ['card', 'bank'],
    indiaBanned: false, payoutDays: 7, founded: 2016,
    
      
    
    
    
     profileTags: ['beginners', 'free', 'long-term'], riskProfile: 'conservative',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'beginner', 
    platforms: ['mt4', 'mt5'], freeDemo: true,
    scalingPlan: 'Free entry. Scale through 6 stages from $5K to $1M based on consistency.',
    countries: ['au', 'uk', 'eu', 'india', 'us', 'sg'],
  },
  {
    id: 54, name: 'Nordic Funder', logo: 'NF', color: '#1a2d0d',
      market: 'forex', ctype: '2step',
    price: 89, inrPrice: 7400, split: 80,  maxAccount: '$1M', maxAllocation: '$1M',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'cTrader', '$1M Max'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2022,
    
      
    
    
    
     profileTags: ['ctrader', 'high-capital', 'eu'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['ctrader'], freeDemo: false,
    scalingPlan: 'Scaling to $1M through 4 performance stages.',
    countries: ['eu', 'uk', 'india', 'us', 'sg'],
  },
  {
    id: 55, name: 'Funded Trading Plus', logo: 'FT+', color: '#0d1a1a',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '$2.5M', maxAllocation: '$2.5M',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'cTrader', '$2.5M Max'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2022,
    
      
    
    
    
     profileTags: ['high-capital', 'multi-platform', 'experienced'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt5', 'ctrader'], freeDemo: false,
    scalingPlan: 'Progressive scaling to $2.5M. Quarterly milestone reviews.',
    countries: ['uk', 'eu', 'india', 'us', 'au'],
  },
  {
    id: 56, name: 'Fintokei', logo: 'FK', color: '#1a0d3d',
      market: 'forex', ctype: '2step',
    price: 99, inrPrice: 8200, split: 80,  maxAccount: '€700K', maxAllocation: '€700K',
    
    code: 'MARKET', aff: '#', 
    tags: ['2-Step', 'TradingView', 'cTrader'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['tradingview', 'ctrader', 'eu'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['mt4', 'mt5', 'ctrader'], freeDemo: false,
    scalingPlan: 'Scale to €700K through consistent performance milestones.',
    countries: ['eu', 'uk', 'india', 'us', 'cz'],
  },
  {
    id: 57, name: 'Tradeify', logo: 'TI', color: '#1a2d1a',
      market: 'futures', ctype: '1step',
    price: 150, inrPrice: 12500, split: 100,  maxAccount: '$750K', maxAllocation: '$750K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '100% Split', 'TradingView'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 3, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'experienced', 'tradingview'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $750K through consistent futures trading performance.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 58, name: 'My Funded Futures', logo: 'MFF', color: '#0d1a3d',
      market: 'futures', ctype: '1step',
    price: 130, inrPrice: 10800, split: 100,  maxAccount: '$450K', maxAllocation: '$450K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '100% Split', 'Quantower'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 3, founded: 2024,
    
      
    
    
    
     profileTags: ['futures', 'orderflow', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $450K through performance milestones.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 59, name: 'Alpha Futures', logo: 'AF', color: '#2d1a3d',
      market: 'futures', ctype: '1step',
    price: 120, inrPrice: 10000, split: 90,  maxAccount: '$500K', maxAllocation: '$500K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'UK', 'TradingView'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'uk', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $500K through quarterly performance reviews.',
    countries: ['uk', 'eu', 'us', 'india'],
  },
  {
    id: 60, name: 'Lucid Trading', logo: 'LT', color: '#1a0d2d',
      market: 'futures', ctype: '1step',
    price: 150, inrPrice: 12500, split: 90,  maxAccount: '$750K', maxAllocation: '$750K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'Bookmap', 'Sierra Chart'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['orderflow', 'futures', 'expert'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'expert', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $750K based on consistent order flow trading.',
    countries: ['us', 'eu', 'uk'],
  },
  {
    id: 61, name: 'Top One Futures', logo: 'T1F', color: '#0d3d1a',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 100,  maxAccount: '$4.65M', maxAllocation: '$4.65M',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '$4.65M Max', '100% Split'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 3, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'high-capital', 'experienced'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Progressive scaling to $4.65M through performance milestones.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 62, name: 'FundedNext Futures', logo: 'FNF', color: '#0d2a1a',
      market: 'futures', ctype: '1step',
    price: 110, inrPrice: 9200, split: 90,  maxAccount: '$700K', maxAllocation: '$700K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'FundedNext', 'TradingView'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $700K with FundedNext performance standards.',
    countries: ['ae', 'us', 'eu', 'uk', 'india'],
  },
  {
    id: 63, name: 'Traders Launch', logo: 'TL', color: '#2d0d1a',
      market: 'futures', ctype: '1step',
    price: 140, inrPrice: 11600, split: 90,  maxAccount: '$900K', maxAllocation: '$900K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'Volumetrica', '$900K Max'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['futures', 'orderflow', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $900K through consistent performance milestones.',
    countries: ['us', 'eu', 'uk'],
  },
  {
    id: 64, name: 'AquaFutures', logo: 'AqF', color: '#0d2d2d',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 90,  maxAccount: '$450K', maxAllocation: '$450K',
    
    code: 'MATCH', aff: '#', 
    tags: ['Futures', 'Volumetrica', '60% OFF'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'budget'], riskProfile: 'aggressive',
    strategies: ['day', 'scalping'], experienceLevel: 'beginner', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Standard scaling to $450K with monthly performance reviews.',
    countries: ['ae', 'us', 'eu', 'uk'],
  },
  {
    id: 65, name: 'Blueberry Futures', logo: 'BbF', color: '#1a1a3d',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 90,  maxAccount: '$450K', maxAllocation: '$450K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '60% OFF', 'New'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 7, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'budget'], riskProfile: 'aggressive',
    strategies: ['day'], experienceLevel: 'beginner', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Scaling to $450K based on performance.',
    countries: ['us', 'eu', 'uk'],
  },
  {
    id: 66, name: 'E8 Futures', logo: 'E8F', color: '#1a3d0d',
      market: 'futures', ctype: '1step',
    price: 120, inrPrice: 10000, split: 90,  maxAccount: '$750K', maxAllocation: '$750K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'E8 Markets', 'TradingView'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 4, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'tradingview', 'intermediate'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Scale to $750K with E8 performance standards.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 67, name: 'FuturesElite', logo: 'FEl', color: '#3d0d1a',
      market: 'futures', ctype: '1step',
    price: 130, inrPrice: 10800, split: 90,  maxAccount: '$1.5M', maxAllocation: '$1.5M',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '$1.5M Max', 'Quantower'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'orderflow', 'high-capital'], riskProfile: 'aggressive',
    strategies: ['day', 'scalping'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Progressive scaling to $1.5M through performance milestones.',
    countries: ['eu', 'uk', 'us'],
  },
  {
    id: 68, name: 'Goat Funded Futures', logo: 'GFF', color: '#2d2d1a',
      market: 'futures', ctype: '1step',
    price: 110, inrPrice: 9200, split: 90,  maxAccount: '$450K', maxAllocation: '$450K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'Hong Kong', 'TradingView'],
    features: [],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'beginner'], riskProfile: 'aggressive',
    strategies: ['day', 'scalping'], experienceLevel: 'beginner', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale to $450K through consistent futures performance.',
    countries: ['us', 'eu', 'uk', 'hk'],
  },
  {
    id: 69, name: 'YRM Prop', logo: 'YRM', color: '#1a2d2d',
      market: 'futures', ctype: '1step',
    price: 37, inrPrice: 3100, split: 90,  maxAccount: '$150K', maxAllocation: '$150K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', '1-Step', 'No Daily DD', 'Subscription'],
    features: [],
    payment: ['card'],
    indiaBanned: false, payoutDays: 10, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'budget', 'beginner'], riskProfile: 'moderate',
    strategies: ['day', 'scalping'], experienceLevel: 'beginner', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale through consistent performance with 10-day payout cycles.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
  {
    id: 70, name: 'SharkFunded', logo: 'SF', color: '#0d1a2d',
      market: 'forex', ctype: '2step',
    price: 49, inrPrice: 4100, split: 90,  maxAccount: '$200K', maxAllocation: '$200K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Daily Payouts', 'Blockchain Verified', 'cTrader'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 1, founded: 2025,
    
      
    
    
    
     profileTags: ['crypto-payouts', 'ctrader', 'daily-payouts'], riskProfile: 'moderate',
    strategies: ['day', 'swing'], experienceLevel: 'intermediate', 
    platforms: ['ctrader'], freeDemo: false,
    scalingPlan: 'Scale through consistent performance with daily payout cycles.',
    countries: ['lc', 'uk', 'eu', 'us', 'india'],
  },
  {
    id: 71, name: 'SFX Funded', logo: 'SFX', color: '#1a0d2d',
      market: 'forex', ctype: '2step',
    price: 29, inrPrice: 2400, split: 100,  maxAccount: '$3.2M', maxAllocation: '$3.2M',
    
    code: 'MARKET', aff: '#', 
    tags: ['100% Split', '$3.2M Scale', 'Match Trader', 'Budget'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2024,
    
      
    
    
    
     profileTags: ['budget', 'scaling', 'intermediate'], riskProfile: 'aggressive',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Scale up to $3.2M — accounts increase 100% for every 10% profit in 3 months.',
    countries: ['ae', 'us', 'eu', 'uk', 'india'],
  },
  {
    id: 72, name: 'FundedSquad', logo: 'FS', color: '#0d2d1a',
      market: 'forex', ctype: '2step',
    price: 49, inrPrice: 4100, split: 90,  maxAccount: '$1M', maxAllocation: '$1M',
    
    code: 'MARKET', aff: '#', 
    tags: ['12hr Payouts', 'TradeLocker', 'Match Trader', 'Instant Fund'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 1, founded: 2024,
    
      
    
    
    
     profileTags: ['fast-payouts', 'tradelocker', 'intermediate'], riskProfile: 'aggressive',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Scale to $1M through consistent performance milestones.',
    countries: ['ae', 'us', 'eu', 'uk', 'india'],
  },
  {
    id: 73, name: 'FTUK', logo: 'FTUK', color: '#0d1a1a',
      market: 'forex', ctype: '2step',
    price: 59, inrPrice: 4900, split: 80,  maxAccount: '$6.4M', maxAllocation: '$6.4M',
    
    code: 'MARKET', aff: '#', 
    tags: ['$6.4M Scale', 'Instant Fund', 'Weekend Holding', 'US Based'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 5, founded: 2021,
    
      
    
    
    
     profileTags: ['scaling', 'swing', 'weekend'], riskProfile: 'moderate',
    strategies: ['day', 'swing', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['other'], freeDemo: false,
    scalingPlan: 'Capital doubles at every 10% profit target — scales from $100K up to $6.4M.',
    countries: ['us', 'uk', 'eu', 'india', 'ae'],
  },
  {
    id: 74, name: 'PropShopTrader', logo: 'PST', color: '#0d2d3d',
      market: 'futures', ctype: '1step',
    price: 99, inrPrice: 8200, split: 90,  maxAccount: '$500K', maxAllocation: '$500K',
    
    code: 'MARKET', aff: '#', 
    tags: ['Futures', 'Stocks', 'Rithmic', 'Tickblaze', 'Algo Trading'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 7, founded: 2025,
    
      
    
    
    
     profileTags: ['futures', 'algo', 'orderflow'], riskProfile: 'moderate',
    strategies: ['day', 'scalping', 'ea'], experienceLevel: 'intermediate', 
    platforms: ['ninjatrader'], freeDemo: false,
    scalingPlan: 'Scale through Warrior (evaluation) or Gladiator (instant) paths up to $500K.',
    countries: ['ee', 'us', 'eu', 'uk', 'india'],
  },
  {
    id: 75, name: 'FundedFirm', logo: 'FF', color: '#0d3d2d',
      market: 'forex', ctype: '2step',
    price: 49, inrPrice: 4100, split: 100,  maxAccount: '$100K', maxAllocation: '$100K',
    
    code: 'MARKET', aff: '#', 
    tags: ['MT5', '1:100 Leverage', '24hr Payouts', 'News Trading'],
    features: ['ea'],
    payment: ['card', 'crypto'],
    indiaBanned: false, payoutDays: 1, founded: 2024,
    
      
    
    
    
     profileTags: [], riskProfile: 'aggressive',
    strategies: ['day', 'swing'], experienceLevel: 'beginner', 
    platforms: ['mt5'], freeDemo: false,
    scalingPlan: 'Standard scaling up to $100K.',
    countries: ['us', 'eu', 'uk', 'india'],
  },
];

export interface RichFirm {
  name: string; logo: string; color: string; rating: number; reviews: number;
  discount: string; discountPct: number; split: string; type: string;
  followers: number; country: string; countryFlag: string; years: number;
  assets: string[]; platforms: string[]; maxAlloc: string; code: string; aff: string;
}

export const forexFirms: RichFirm[] = [
  { name: 'FTMO', logo: 'FT', color: '#1a3c5e', rating: 4.9, reviews: 12400, discount: '40% OFF', discountPct: 40, split: '90%', type: 'forex', followers: 142000, country: 'CZ', countryFlag: '🇨🇿', years: 11, assets: ['FX', 'Indices', 'Metals', 'Crypto'], platforms: ['MT4', 'MT5', 'cTrader'], maxAlloc: '$400K', code: 'MARKET50', aff: '#' },
  { name: 'The 5%ers', logo: '5%', color: '#2d1a3d', rating: 4.8, reviews: 1131, discount: '5% OFF', discountPct: 5, split: '100%', type: 'forex', followers: 69936, country: 'GB', countryFlag: '🇬🇧', years: 10, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['MT5', 'cTrader'], maxAlloc: '$597.5K', code: 'MARKET5', aff: '#' },
  { name: 'Funded Next', logo: 'FN', color: '#0d2a1a', rating: 4.6, reviews: 5400, discount: '50% OFF', discountPct: 50, split: '90%', type: 'forex', followers: 45000, country: 'IN', countryFlag: '🇮🇳', years: 4, assets: ['FX', 'Indices', 'Metals', 'Crypto'], platforms: ['MT4', 'MT5'], maxAlloc: '$500K', code: 'FN50OFF', aff: '#' },
  { name: 'True Forex', logo: 'TF', color: '#0d1a3d', rating: 4.6, reviews: 4100, discount: '45% OFF', discountPct: 45, split: '80%', type: 'forex', followers: 31000, country: 'IN', countryFlag: '🇮🇳', years: 6, assets: ['FX', 'Indices', 'Metals'], platforms: ['MT4', 'MT5'], maxAlloc: '$400K', code: 'TRUE50', aff: '#' },
  { name: 'Funder Pro', logo: 'FP', color: '#1a0a3d', rating: 4.5, reviews: 3200, discount: '25% OFF', discountPct: 25, split: '80%', type: 'forex', followers: 22000, country: 'AE', countryFlag: '🇦🇪', years: 5, assets: ['FX', 'Indices', 'Metals', 'Crypto'], platforms: ['MT4', 'MT5'], maxAlloc: '$200K', code: 'FP24H', aff: '#' },
  { name: 'FXIFY', logo: 'FX', color: '#0d2d1a', rating: 4.6, reviews: 3800, discount: '30% OFF', discountPct: 30, split: '90%', type: 'forex', followers: 38000, country: 'GB', countryFlag: '🇬🇧', years: 4, assets: ['FX', 'Indices', 'Metals', 'Crypto'], platforms: ['MT4', 'MT5'], maxAlloc: '$400K', code: 'FXIFY25', aff: '#' },
  { name: 'FundingPips', logo: 'Fp', color: '#0e2a4a', rating: 4.3, reviews: 968, discount: '20% OFF', discountPct: 20, split: '85%', type: 'forex', followers: 75785, country: 'AE', countryFlag: '🇦🇪', years: 3, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['MT5'], maxAlloc: '$300K', code: 'PIPS20', aff: '#' },
  { name: 'Alpha Capital', logo: 'AC', color: '#1e3a2f', rating: 4.4, reviews: 2900, discount: '20% OFF', discountPct: 20, split: '80%', type: 'forex', followers: 18000, country: 'GB', countryFlag: '🇬🇧', years: 5, assets: ['FX', 'Indices', 'Metals'], platforms: ['MT4', 'MT5'], maxAlloc: '$200K', code: 'ALPHA15', aff: '#' },
  { name: 'Blue Guardian', logo: 'BG', color: '#0a1f3d', rating: 4.3, reviews: 2100, discount: '15% OFF', discountPct: 15, split: '85%', type: 'forex', followers: 12000, country: 'MT', countryFlag: '🇲🇹', years: 5, assets: ['FX', 'Indices', 'Metals', 'Crypto'], platforms: ['MT4', 'MT5'], maxAlloc: '$200K', code: 'BLUE10', aff: '#' },
  { name: 'Maven Trading', logo: 'MV', color: '#1a2d3d', rating: 4.3, reviews: 684, discount: '4% OFF', discountPct: 4, split: '80%', type: 'forex', followers: 32351, country: 'LC', countryFlag: '🇱🇨', years: 3, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['Match Trader', 'MT5'], maxAlloc: '$200K', code: 'MARKET', aff: '#' },
  { name: 'Crypto Fund Trader', logo: 'CF', color: '#0d2d2d', rating: 4.2, reviews: 100, discount: '10% OFF', discountPct: 10, split: '80%', type: 'forex', followers: 4387, country: 'CH', countryFlag: '🇨🇭', years: 3, assets: ['Crypto', 'FX', 'Indices', 'Other Commodities', 'Stocks'], platforms: ['MT5', 'Bybit'], maxAlloc: '$330K', code: 'MARKET', aff: '#' },
  { name: 'BEM Funding', logo: 'BM', color: '#1a3d2d', rating: 4.0, reviews: 20, discount: '25% OFF', discountPct: 25, split: '80%', type: 'forex', followers: 102, country: 'AE', countryFlag: '🇦🇪', years: 1, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['cTrader', 'DXTrade'], maxAlloc: '$200K', code: 'MARKET', aff: '#' },
  { name: 'Top One Trader', logo: 'T1', color: '#2d1a2d', rating: 4.4, reviews: 149, discount: '70% OFF', discountPct: 70, split: '80%', type: 'forex', followers: 16702, country: 'US', countryFlag: '🇺🇸', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['TradeLocker', 'Match Trader', 'MT5'], maxAlloc: '$300K', code: 'MARKET', aff: '#' },
  { name: 'QT Funded', logo: 'QT', color: '#1a1a2d', rating: 3.9, reviews: 672, discount: '40% OFF', discountPct: 40, split: '80%', type: 'forex', followers: 14761, country: 'GB', countryFlag: '🇬🇧', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['TradeLocker', 'cTrader', 'MT5'], maxAlloc: '$300K', code: 'MARKET', aff: '#' },
  { name: 'For Traders', logo: 'FT', color: '#2d2d0d', rating: 4.5, reviews: 227, discount: '50% OFF', discountPct: 50, split: '80%', type: 'forex', followers: 7219, country: 'AE', countryFlag: '🇦🇪', years: 2, assets: ['Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['TradeLocker', 'MT5', 'cTrader'], maxAlloc: '$200K', code: 'MARKET', aff: '#' },
  { name: 'Trade The Pool', logo: 'TP', color: '#0d2d0d', rating: 4.0, reviews: 20, discount: '10% OFF', discountPct: 10, split: '80%', type: 'forex', followers: 1398, country: 'IL', countryFlag: '🇮🇱', years: 3, assets: ['Stocks'], platforms: ['TraderEvolution'], maxAlloc: '$450K', code: 'MARKET', aff: '#' },
  { name: 'FundedElite', logo: 'FE', color: '#2d1a0d', rating: 4.3, reviews: 106, discount: '35% OFF', discountPct: 35, split: '80%', type: 'forex', followers: 2733, country: 'IT', countryFlag: '🇮🇹', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['MT5', 'TradeLocker', 'Match Trader'], maxAlloc: '$400K', code: 'MARKET', aff: '#' },
  { name: 'Finotive Funding', logo: 'FF', color: '#1a2d1a', rating: 4.2, reviews: 121, discount: '25% OFF', discountPct: 25, split: '80%', type: 'forex', followers: 3627, country: 'AE', countryFlag: '🇦🇪', years: 5, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Stocks'], platforms: ['MT5', 'Match Trader'], maxAlloc: '$1.6M', code: 'MARKET', aff: '#' },
  { name: 'Moneta Funded', logo: 'MF', color: '#0d1a2d', rating: 4.0, reviews: 20, discount: '50% OFF', discountPct: 50, split: '80%', type: 'forex', followers: 205, country: 'LC', countryFlag: '🇱🇨', years: 0, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['MT5', 'Match Trader'], maxAlloc: '$2.3M', code: 'MARKET', aff: '#' },
  { name: 'ATFunded', logo: 'AT', color: '#2d0d1a', rating: 4.0, reviews: 20, discount: '15% OFF', discountPct: 15, split: '80%', type: 'forex', followers: 1223, country: 'VC', countryFlag: '🇻🇨', years: 1, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['MT5'], maxAlloc: '$400K', code: 'MARKET', aff: '#' },
  { name: 'Hantec Trader', logo: 'HT', color: '#1a0d1a', rating: 4.4, reviews: 27, discount: '20% OFF', discountPct: 20, split: '80%', type: 'forex', followers: 1856, country: 'MU', countryFlag: '🇲🇺', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['MT4', 'MT5'], maxAlloc: '$300K', code: 'MARKET', aff: '#' },
  { name: 'Axi Select', logo: 'AX', color: '#0d2d3d', rating: 4.0, reviews: 20, discount: '', discountPct: 0, split: '70%', type: 'forex', followers: 484, country: 'AU', countryFlag: '🇦🇺', years: 10, assets: ['Energy', 'FX', 'Indices', 'Metals', 'Other Commodities', 'Stocks'], platforms: ['MT4', 'MT5'], maxAlloc: '$1M', code: '', aff: '#' },
  { name: 'Nordic Funder', logo: 'NF', color: '#1a2d0d', rating: 4.0, reviews: 20, discount: '10% OFF', discountPct: 10, split: '80%', type: 'forex', followers: 1901, country: 'SE', countryFlag: '🇸🇪', years: 4, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['cTrader', 'DXTrade', 'Match Trader'], maxAlloc: '$1M', code: 'MARKET', aff: '#' },
  { name: 'Funded Trading Plus', logo: 'FT+', color: '#0d1a1a', rating: 4.2, reviews: 66, discount: '20% OFF', discountPct: 20, split: '80%', type: 'forex', followers: 2816, country: 'GB', countryFlag: '🇬🇧', years: 4, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals', 'Other Commodities'], platforms: ['cTrader', 'DXTrade', 'Match Trader', 'MT5'], maxAlloc: '$2.5M', code: 'MARKET', aff: '#' },
  { name: 'Fintokei', logo: 'FK', color: '#1a0d3d', rating: 4.0, reviews: 20, discount: '20% OFF', discountPct: 20, split: '80%', type: 'forex', followers: 2280, country: 'CZ', countryFlag: '🇨🇿', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['cTrader', 'TradingView', 'MT5', 'MT4'], maxAlloc: '€700K', code: 'MARKET', aff: '#' },
  { name: 'SharkFunded', logo: 'SF', color: '#0d1a2d', rating: 4.4, reviews: 180, discount: '15% OFF', discountPct: 15, split: '90%', type: 'forex', followers: 5200, country: 'LC', countryFlag: '🇱🇨', years: 1, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['Match Trader', 'cTrader', 'TradeLocker'], maxAlloc: '$200K', code: 'MARKET', aff: '#' },
  { name: 'SFX Funded', logo: 'SFX', color: '#1a0d2d', rating: 4.3, reviews: 154, discount: '20% OFF', discountPct: 20, split: '100%', type: 'forex', followers: 4800, country: 'AE', countryFlag: '🇦🇪', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['Match Trader'], maxAlloc: '$3.2M', code: 'MARKET', aff: '#' },
  { name: 'FundedSquad', logo: 'FS', color: '#0d2d1a', rating: 4.5, reviews: 160, discount: '15% OFF', discountPct: 15, split: '90%', type: 'forex', followers: 6100, country: 'AE', countryFlag: '🇦🇪', years: 2, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['Match Trader', 'TradeLocker'], maxAlloc: '$1M', code: 'MARKET', aff: '#' },
  { name: 'FTUK', logo: 'FTUK', color: '#0d1a1a', rating: 4.1, reviews: 600, discount: '10% OFF', discountPct: 10, split: '80%', type: 'forex', followers: 15000, country: 'US', countryFlag: '🇺🇸', years: 5, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['DXTrade', 'Match Trader', 'TradeLocker'], maxAlloc: '$6.4M', code: 'MARKET', aff: '#' },
  { name: 'FundedFirm', logo: 'FF', color: '#0d3d2d', rating: 2.0, reviews: 80, discount: '', discountPct: 0, split: '100%', type: 'forex', followers: 800, country: 'UK', countryFlag: '🇬🇧', years: 1, assets: ['Crypto', 'Energy', 'FX', 'Indices', 'Metals'], platforms: ['MT5'], maxAlloc: '$100K', code: '', aff: '#' },
];

export const futuresFirms: RichFirm[] = [
  { name: 'Apex Trader', logo: 'AT', color: '#1a1a3d', rating: 4.8, reviews: 8900, discount: '30% OFF', discountPct: 30, split: '100%', type: 'futures', followers: 98000, country: 'US', countryFlag: '🇺🇸', years: 7, assets: ['Futures', 'Indices', 'Energy', 'Metals'], platforms: ['NinjaTrader', 'Tradovate', 'Rithmic'], maxAlloc: '$300K', code: 'APEX30', aff: '#' },
  { name: 'TopStep', logo: 'TS', color: '#1a2a0d', rating: 4.7, reviews: 6700, discount: '20% OFF', discountPct: 20, split: '90%', type: 'futures', followers: 76000, country: 'US', countryFlag: '🇺🇸', years: 14, assets: ['Futures', 'Indices', 'Energy'], platforms: ['NinjaTrader', 'Tradovate'], maxAlloc: '$150K', code: 'TOP20', aff: '#' },
  { name: 'Earn2Trade', logo: 'E2', color: '#1a3d0d', rating: 4.4, reviews: 2800, discount: '25% OFF', discountPct: 25, split: '80%', type: 'futures', followers: 34000, country: 'US', countryFlag: '🇺🇸', years: 8, assets: ['Futures', 'Indices'], platforms: ['NinjaTrader', 'Tradovate'], maxAlloc: '$200K', code: 'E2T25', aff: '#' },
  { name: 'OneUp Trader', logo: 'OU', color: '#2d2d0d', rating: 4.6, reviews: 4200, discount: '15% OFF', discountPct: 15, split: '100%', type: 'futures', followers: 28000, country: 'US', countryFlag: '🇺🇸', years: 9, assets: ['Futures', 'Indices', 'Energy', 'Metals'], platforms: ['NinjaTrader', 'Rithmic'], maxAlloc: '$250K', code: 'ONEUP15', aff: '#' },
  { name: 'Bulenox', logo: 'BX', color: '#0d3d2d', rating: 4.5, reviews: 2100, discount: '35% OFF', discountPct: 35, split: '90%', type: 'futures', followers: 19000, country: 'US', countryFlag: '🇺🇸', years: 5, assets: ['Futures', 'Crypto', 'Indices'], platforms: ['NinjaTrader', 'Rithmic'], maxAlloc: '$150K', code: 'BX35', aff: '#' },
  { name: 'Take Profit Trader', logo: 'TP', color: '#2d0d2d', rating: 4.3, reviews: 1900, discount: '20% OFF', discountPct: 20, split: '80%', type: 'futures', followers: 23000, country: 'US', countryFlag: '🇺🇸', years: 6, assets: ['Futures', 'Indices', 'Energy'], platforms: ['Rithmic'], maxAlloc: '$300K', code: 'TPT20', aff: '#' },
  { name: 'TradeDay', logo: 'TD', color: '#1a0d3d', rating: 4.2, reviews: 1400, discount: '10% OFF', discountPct: 10, split: '90%', type: 'futures', followers: 15000, country: 'US', countryFlag: '🇺🇸', years: 4, assets: ['Futures', 'Indices'], platforms: ['Rithmic'], maxAlloc: '$200K', code: 'TD10', aff: '#' },
  { name: 'Uprofit', logo: 'UP', color: '#0d3d1a', rating: 4.0, reviews: 1100, discount: '30% OFF', discountPct: 30, split: '90%', type: 'futures', followers: 11000, country: 'US', countryFlag: '🇺🇸', years: 4, assets: ['Futures', 'Indices', 'Energy'], platforms: ['Rithmic'], maxAlloc: '$200K', code: 'UP30', aff: '#' },
  { name: 'The Trading Pit', logo: 'TTP', color: '#3d1a0d', rating: 4.5, reviews: 2800, discount: '20% OFF', discountPct: 20, split: '80%', type: 'futures', followers: 26000, country: 'MT', countryFlag: '🇲🇹', years: 4, assets: ['Futures', 'FX', 'Indices', 'Metals'], platforms: ['MT4', 'MT5'], maxAlloc: '$1M', code: 'TTP20', aff: '#' },
  { name: 'Tradeify', logo: 'TI', color: '#1a2d1a', rating: 4.7, reviews: 150, discount: '40% OFF', discountPct: 40, split: '100%', type: 'futures', followers: 20872, country: 'US', countryFlag: '🇺🇸', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'NinjaTrader', 'TradingView', 'WealthCharts'], maxAlloc: '$750K', code: 'MARKET', aff: '#' },
  { name: 'My Funded Futures', logo: 'MFF', color: '#0d1a3d', rating: 4.6, reviews: 217, discount: '50% OFF', discountPct: 50, split: '100%', type: 'futures', followers: 41601, country: 'US', countryFlag: '🇺🇸', years: 2, assets: ['Futures'], platforms: ['Volbook', 'Tradovate', 'Quantower', 'ATAS'], maxAlloc: '$450K', code: 'MARKET', aff: '#' },
  { name: 'Alpha Futures', logo: 'AF', color: '#2d1a3d', rating: 4.6, reviews: 37, discount: '15% OFF', discountPct: 15, split: '90%', type: 'futures', followers: 36425, country: 'GB', countryFlag: '🇬🇧', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'NinjaTrader', 'TradingView'], maxAlloc: '$500K', code: 'MARKET', aff: '#' },
  { name: 'Lucid Trading', logo: 'LT', color: '#1a0d2d', rating: 4.5, reviews: 17, discount: '40% OFF', discountPct: 40, split: '90%', type: 'futures', followers: 2329, country: 'US', countryFlag: '🇺🇸', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'Sierra Chart', 'Bookmap', 'Jigsaw'], maxAlloc: '$750K', code: 'MARKET', aff: '#' },
  { name: 'Top One Futures', logo: 'T1F', color: '#0d3d1a', rating: 4.8, reviews: 69, discount: '60% OFF', discountPct: 60, split: '100%', type: 'futures', followers: 25674, country: 'US', countryFlag: '🇺🇸', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'NinjaTrader', 'TradingView'], maxAlloc: '$4.65M', code: 'MARKET', aff: '#' },
  { name: 'FundedNext Futures', logo: 'FNF', color: '#0d2a1a', rating: 4.3, reviews: 54, discount: '30% OFF', discountPct: 30, split: '90%', type: 'futures', followers: 25797, country: 'AE', countryFlag: '🇦🇪', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'NinjaTrader', 'TradingView'], maxAlloc: '$700K', code: 'MARKET', aff: '#' },
  { name: 'Traders Launch', logo: 'TL', color: '#2d0d1a', rating: 4.6, reviews: 16, discount: '15% OFF', discountPct: 15, split: '90%', type: 'futures', followers: 2338, country: 'US', countryFlag: '🇺🇸', years: 2, assets: ['Futures'], platforms: ['Volumetrica', 'Quantower', 'NinjaTrader'], maxAlloc: '$900K', code: 'MARKET', aff: '#' },
  { name: 'AquaFutures', logo: 'AqF', color: '#0d2d2d', rating: 3.9, reviews: 70, discount: '60% OFF', discountPct: 60, split: '90%', type: 'futures', followers: 4773, country: 'AE', countryFlag: '🇦🇪', years: 1, assets: ['Futures'], platforms: ['Volumetrica'], maxAlloc: '$450K', code: 'MATCH', aff: '#' },
  { name: 'Blueberry Futures', logo: 'BbF', color: '#1a1a3d', rating: 4.0, reviews: 10, discount: '60% OFF', discountPct: 60, split: '90%', type: 'futures', followers: 523, country: 'KY', countryFlag: '🇰🇾', years: 0, assets: ['Futures'], platforms: ['Rithmic'], maxAlloc: '$450K', code: 'MARKET', aff: '#' },
  { name: 'E8 Futures', logo: 'E8F', color: '#1a3d0d', rating: 4.6, reviews: 13, discount: '40% OFF', discountPct: 40, split: '90%', type: 'futures', followers: 1846, country: 'US', countryFlag: '🇺🇸', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'TradingView'], maxAlloc: '$750K', code: 'MARKET', aff: '#' },
  { name: 'FuturesElite', logo: 'FEl', color: '#3d0d1a', rating: 4.0, reviews: 10, discount: '40% OFF', discountPct: 40, split: '90%', type: 'futures', followers: 438, country: 'IT', countryFlag: '🇮🇹', years: 1, assets: ['Futures'], platforms: ['Quantower', 'Volumetrica', 'ATAS'], maxAlloc: '$1.5M', code: 'MARKET', aff: '#' },
  { name: 'Goat Funded Futures', logo: 'GFF', color: '#2d2d1a', rating: 4.0, reviews: 10, discount: '50% OFF', discountPct: 50, split: '90%', type: 'futures', followers: 1291, country: 'HK', countryFlag: '🇭🇰', years: 1, assets: ['Futures'], platforms: ['Tradovate', 'Volumetrica', 'NinjaTrader', 'TradingView'], maxAlloc: '$450K', code: 'MARKET', aff: '#' },
  { name: 'YRM Prop', logo: 'YRM', color: '#1a2d2d', rating: 4.3, reviews: 45, discount: '20% OFF', discountPct: 20, split: '90%', type: 'futures', followers: 3200, country: 'US', countryFlag: '🇺🇸', years: 1, assets: ['Futures'], platforms: ['DxFeed', 'CQG', 'Marex'], maxAlloc: '$150K', code: 'MARKET', aff: '#' },
  { name: 'PropShopTrader', logo: 'PST', color: '#0d2d3d', rating: 3.9, reviews: 469, discount: '15% OFF', discountPct: 15, split: '90%', type: 'futures', followers: 8500, country: 'EE', countryFlag: '🇪🇪', years: 1, assets: ['Futures', 'Stocks'], platforms: ['Tickblaze', 'Rithmic', 'NinjaTrader', 'Bookmap', 'Quantower'], maxAlloc: '$500K', code: 'MARKET', aff: '#' },
];
