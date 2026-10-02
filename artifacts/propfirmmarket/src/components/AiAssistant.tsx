import { useState, useRef, useEffect } from 'react';
import { firms } from '../data/firms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

interface Message {
  type: 'bot' | 'user';
  text: string;
  cards?: typeof firms;
}

function matchFirms(query: string): typeof firms {
  const q = query.toLowerCase();
  return firms.filter(f => {
    if ((q.includes('india') || q.includes('upi') || q.includes('paytm') || q.includes('inr')) && f.features.includes('india')) return true;
    if ((q.includes('cheap') || q.includes('budget') || q.includes('affordable')) && f.price <= 60) return true;
    if ((q.includes('100%') || q.includes('full split') || q.includes('highest split')) && f.split >= 100) return true;
    if ((q.includes('1 step') || q.includes('one step') || q.includes('1step')) && f.ctype === '1step') return true;
    if ((q.includes('instant') || q.includes('no challenge')) && f.ctype === 'instant') return true;
    if ((q.includes('futures') || q.includes('nq') || q.includes('es ')) && f.market === 'futures') return true;
    if ((q.includes('forex') || q.includes('currency')) && f.market === 'forex') return true;
    if ((q.includes('crypto') || q.includes('bitcoin')) && f.market === 'crypto') return true;
    if ((q.includes('ea') || q.includes('bot') || q.includes('algo') || q.includes('robot')) && f.features.includes('ea')) return true;
    if (q.includes('safe') || q.includes('trust') || q.includes('reliable')) return false;
    if ((q.includes('fast payout') || q.includes('quick payout') || q.includes('instant payout')) && f.payoutDays <= 2) return true;
    if ((q.includes('beginner') || q.includes('newbie') || q.includes('new to')) && f.experienceLevel === 'beginner') return true;
    if ((q.includes('expert') || q.includes('experienced') || q.includes('professional')) && f.experienceLevel === 'expert') return true;
    if ((q.includes('scalping') || q.includes('scalp')) && f.strategies.includes('scalping')) return true;
    if ((q.includes('swing') || q.includes('hold')) && f.strategies.includes('swing')) return true;
    if (f.name.toLowerCase().includes(q)) return true;
    return false;
  }).slice(0, 3);
}

function generateResponse(query: string): { text: string; cards?: typeof firms } {
  const q = query.toLowerCase();
  const matched = matchFirms(query);

  if (q.includes('india') || q.includes('upi') || q.includes('paytm') || q.includes('rupee') || q.includes('inr')) {
    return { text: `I can show firms whose public profiles list India-related payment methods or INR pricing. Check each firm's current terms before purchasing.`, cards: matched.length > 0 ? matched : firms.filter(f => f.features.includes('india')).slice(0, 3) };
  }
  if (q.includes('cheap') || q.includes('budget') || q.includes('affordable') || q.includes('low price')) {
    return { text: `I can compare the prices currently listed in firm profiles. Prices and eligibility can change, so confirm the details with the firm before purchasing.`, cards: [...firms].sort((a, b) => a.price - b.price).slice(0, 3) };
  }
  if (q.includes('100%') || q.includes('highest split') || q.includes('full split')) {
    return { text: `These public profiles list a 100% profit split for the selected plans. Split terms can vary by plan and may change; confirm the current rules with each firm.`, cards: firms.filter(f => f.split >= 100).slice(0, 3) };
  }
  if (q.includes('scam') || q.includes('safe') || q.includes('trust') || q.includes('reliable')) {
    return { text: `This directory does not provide independently verified safety or trust assessments. I can help compare publicly listed firm details, but review current rules and independent sources before making a decision.` };
  }
  if (q.includes('beginner') || q.includes('new') || q.includes('start') || q.includes('first')) {
    return { text: `I can show profiles tagged for beginner experience and compare their listed challenge structures. These tags are directory filters, not a guarantee of suitability or challenge outcomes.`, cards: firms.filter(f => f.experienceLevel === 'beginner').slice(0, 3) };
  }
  if (q.includes('futures') || q.includes('nq') || q.includes('es') || q.includes('nasdaq')) {
    return { text: `Here are public profiles for futures firms. Compare their listed platforms, instruments, challenge types, and terms, then confirm current details directly with each firm.`, cards: firms.filter(f => f.market === 'futures').slice(0, 3) };
  }
  if (q.includes('pass') || q.includes('challenge') || q.includes('how to pass') || q.includes('tips')) {
    return { text: `Review the challenge rules before trading, define risk limits that fit your plan, and avoid making decisions under pressure. The pass calculator is an educational estimate based on its inputs, not a prediction or guarantee.` };
  }
  if (q.includes('ea') || q.includes('robot') || q.includes('algo') || q.includes('bot') || q.includes('automated')) {
    return { text: `These public profiles list support for algorithmic or EA trading. Check the firm's current rules for platform, strategy, and automation restrictions before using a bot.`, cards: firms.filter(f => f.features.includes('ea')).slice(0, 3) };
  }
  if (q.includes('payout') || q.includes('withdraw') || q.includes('pay') || q.includes('fast')) {
    return { text: `Firm profiles may list payout schedules, but this site does not provide independently verified or real-time payout evidence. Confirm payout rules directly with the firm.`, cards: [...firms].sort((a, b) => a.payoutDays - b.payoutDays).slice(0, 3) };
  }
  if (matched.length > 0) {
    return { text: `Here are firm profiles that match the details in your query. Compare their listed terms and verify current information directly with each firm.`, cards: matched };
  }
  return { text: `I can help compare firms, challenge rules, and publicly listed profile information. Try the AI Match tool to filter firms by your preferences.`, cards: firms.slice(0, 3) };
}

let voiceReady = false;
function speakText(text: string, onStart?: () => void, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const clean = text.replace(/[🇮🇳💰💸🛡️📈🤖⚡🌱🎯🔥❌✅⚠️🏅📊★☆]/gu, '').replace(/\n/g, '. ').trim();
  const utter = new SpeechSynthesisUtterance(clean);
  utter.rate = 0.95;
  utter.pitch = 1.15;
  utter.volume = 1;

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const priority = [
      voices.find(v => v.name.toLowerCase().includes('samantha')),
      voices.find(v => v.name.toLowerCase().includes('zira')),
      voices.find(v => v.name.toLowerCase().includes('raveena')),
      voices.find(v => v.name.toLowerCase().includes('heera')),
      voices.find(v => v.name.toLowerCase().includes('ava')),
      voices.find(v => v.name.toLowerCase().includes('karen')),
      voices.find(v => v.name.toLowerCase().includes('moira')),
      voices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female')),
      voices.find(v => v.lang === 'en-IN'),
      voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')),
      voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('male')),
      voices.find(v => v.lang.startsWith('en')),
    ];
    const voice = priority.find(Boolean);
    if (voice) utter.voice = voice;
  };

  if (voiceReady) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = () => { voiceReady = true; setVoice(); };
  }

  utter.onstart = () => onStart?.();
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

export function AiAssistant({ isOpen, onClose, onOpen }: Props) {
  const [msgs, setMsgs] = useState<Message[]>([
    { type: 'bot', text: `Hi there! I'm Priya, the PropFirmMarket directory assistant. I can help compare public firm profiles, challenge rules, and listed features. What would you like to explore?` }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [msgs, typing]);

  useEffect(() => {
    if (isOpen && msgs.length === 1 && voiceEnabled) {
      setTimeout(() => {
        speakText(msgs[0].text, () => setSpeaking(true), () => setSpeaking(false));
      }, 600);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const sendMsg = (text: string) => {
    if (!text.trim()) return;
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setMsgs(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = generateResponse(text);
      setMsgs(prev => [...prev, { type: 'bot', text: response.text, cards: response.cards }]);
      if (voiceEnabled) {
        setTimeout(() => {
          speakText(response.text, () => setSpeaking(true), () => setSpeaking(false));
        }, 200);
      }
    }, 1000);
  };

  const toggleVoice = () => {
    if (voiceEnabled) { window.speechSynthesis?.cancel(); setSpeaking(false); }
    setVoiceEnabled(v => !v);
  };

  const quickBtns = ['India payment options 🇮🇳', 'Lower listed prices 💰', '100% split terms 💸', 'EA/Bot rules 🤖', 'Payout terms ⚡', 'Beginner profiles 🌱', 'Challenge rules', 'Safety data status 🛡️'];

  return (
    <div className="ai-float">
      <div className={`ai-panel ${isOpen ? 'open' : ''}`}>

        <div className="ai-avatar-hd">
          <div className={`ai-avatar-wrap ${speaking ? 'speaking' : ''}`}>
            <img src="/assistant.png" alt="Priya AI Advisor" className="ai-avatar-img" />
            {speaking && (
              <div className="ai-voice-waves">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            )}
          </div>
          <div className="ai-avatar-info">
            <div className="ai-avatar-name">Priya</div>
            <div className="ai-avatar-role">PropFirmMarket AI Advisor</div>
            <div className="ai-avatar-status">
              <span className="ai-online-dot"></span>
              <span>{speaking ? 'Speaking...' : 'Online • Ready to help'}</span>
            </div>
          </div>
          <div className="ai-hd-actions">
            <button
              className={`ai-voice-toggle ${voiceEnabled ? 'on' : 'off'}`}
              onClick={toggleVoice}
              title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
            >
              {voiceEnabled ? '🔊' : '🔇'}
            </button>
            <button className="ai-hd-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="ai-msgs" ref={msgsRef}>
          {msgs.map((m, i) => (
            <div key={i}>
              {m.type === 'bot' && (
                <div className="ai-bot-row">
                  <img src="/assistant.png" alt="Priya" className="ai-msg-avatar" />
                  <div className="ai-msg bot">{m.text}</div>
                </div>
              )}
              {m.type === 'user' && (
                <div className="ai-msg user">{m.text}</div>
              )}
              {m.cards && m.cards.length > 0 && (
                <div className="ai-firm-cards">
                  {m.cards.map(f => (
                    <div key={f.id} className="ai-firm-card">
                      <div className="afc-logo" style={{ background: f.color }}>{f.logo}</div>
                      <div className="afc-info">
                        <div className="afc-name">{f.name}</div>
                        <div className="afc-stats">
                          <span>{f.market.toUpperCase()}</span>
                          <span>{f.ctype} challenge</span>
                          <span>💸 {f.split}%</span>
                        </div>
                        {f.features.includes('india') && <span className="afc-india">🇮🇳 India Friendly</span>}
                      </div>
                      <div className="afc-price">
                        <span>${f.price === 0 ? 'Free' : f.price}</span>
                        {f.inrPrice > 0 && <small>₹{f.inrPrice.toLocaleString()}</small>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="ai-bot-row">
              <img src="/assistant.png" alt="Priya" className="ai-msg-avatar" />
              <div className="ai-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="ai-quick">
          {quickBtns.map(q => (
            <button key={q} className="ai-qbtn" onClick={() => sendMsg(q)}>{q}</button>
          ))}
        </div>

        <div className="ai-footer">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
            placeholder="Ask Priya anything..."
          />
          <button onClick={() => sendMsg(input)}>Send</button>
        </div>
      </div>

      <button className="ai-mascot-btn" onClick={() => isOpen ? onClose() : onOpen()}>
        <div className={`ai-mascot-avatar-wrap ${speaking ? 'speaking' : ''}`}>
          <img src="/assistant.png" alt="Priya" className="ai-mascot-avatar" />
        </div>
        <div className="ai-notif">AI</div>
      </button>
    </div>
  );
}
