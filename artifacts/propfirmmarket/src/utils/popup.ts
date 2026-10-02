import { PLATFORMS, markExitSeen, hasSeenExit, trackClick } from './ecosystem';

function injectStyles() {
  if (document.getElementById('pfm-popup-styles')) return;
  const style = document.createElement('style');
  style.id = 'pfm-popup-styles';
  style.textContent = `
    @keyframes pfm-fadein { from { opacity:0 } to { opacity:1 } }
    @keyframes pfm-slidein { from { opacity:0;transform:translateY(-18px) scale(0.96) } to { opacity:1;transform:translateY(0) scale(1) } }
    .pfm-btn-g { display:block;text-align:center;padding:13px 20px;background:linear-gradient(135deg,#00e87b,#00c96a);border-radius:10px;color:#000;font-weight:800;font-size:14px;text-decoration:none;letter-spacing:0.5px;cursor:pointer;border:none;width:100%;transition:opacity .15s;margin-bottom:8px }
    .pfm-btn-g:hover { opacity:0.88 }
    .pfm-btn-o { display:block;text-align:center;padding:11px 20px;background:transparent;border:1.5px solid rgba(0,232,123,0.3);border-radius:10px;color:#00e87b;font-weight:700;font-size:13px;text-decoration:none;cursor:pointer;width:100%;transition:background .15s;margin-bottom:8px }
    .pfm-btn-o:hover { background:rgba(0,232,123,0.07) }
    .pfm-btn-gold { display:block;text-align:center;padding:13px 20px;background:linear-gradient(135deg,#fbbf24,#f97316);border-radius:10px;color:#000;font-weight:800;font-size:14px;text-decoration:none;cursor:pointer;border:none;width:100%;transition:opacity .15s;margin-bottom:8px }
    .pfm-btn-gold:hover { opacity:0.88 }
    .pfm-btn-cyan { display:block;text-align:center;padding:13px 20px;background:linear-gradient(135deg,#00d4ff,#0099cc);border-radius:10px;color:#000;font-weight:800;font-size:14px;text-decoration:none;cursor:pointer;border:none;width:100%;transition:opacity .15s;margin-bottom:8px }
    .pfm-btn-cyan:hover { opacity:0.88 }
    .pfm-close:hover { color:#fff !important }
  `;
  document.head.appendChild(style);
}

function removeExistingPopup() {
  const existing = document.getElementById('pfm-popup-overlay');
  if (existing) existing.remove();
}

function createOverlay(accentColor = 'rgba(0,232,123,0.25)', bg = 'linear-gradient(135deg,#0d1f17 0%,#0a1612 100%)', glowColor = 'rgba(0,232,123,0.08)'): [HTMLDivElement, HTMLDivElement] {
  injectStyles();
  removeExistingPopup();

  const overlay = document.createElement('div');
  overlay.id = 'pfm-popup-overlay';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(7px);z-index:10000;display:flex;align-items:center;justify-content:center;animation:pfm-fadein 0.18s ease;`;

  const popup = document.createElement('div');
  popup.style.cssText = `background:${bg};border:1px solid ${accentColor};border-radius:18px;padding:28px 30px;max-width:440px;width:92%;color:#fff;box-shadow:0 28px 80px rgba(0,0,0,0.65),0 0 0 1px ${glowColor};animation:pfm-slidein 0.22s ease;`;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) removeExistingPopup(); });

  return [overlay, popup];
}

function header(label: string, color: string): string {
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
    <div style="font-size:10px;font-weight:800;letter-spacing:2.5px;color:${color};text-transform:uppercase">${label}</div>
    <button class="pfm-close" id="pfm-popup-close" style="background:none;border:none;color:#666;font-size:20px;cursor:pointer;line-height:1;padding:0;transition:color .15s">✕</button>
  </div>`;
}

function headerEl(label: string, color: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:18px';

  const labelEl = document.createElement('div');
  labelEl.style.cssText = `font-size:10px;font-weight:800;letter-spacing:2.5px;color:${color};text-transform:uppercase`;
  labelEl.textContent = label;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'pfm-close';
  closeBtn.id = 'pfm-popup-close';
  closeBtn.style.cssText = 'background:none;border:none;color:#666;font-size:20px;cursor:pointer;line-height:1;padding:0;transition:color .15s';
  closeBtn.textContent = '✕';

  wrapper.appendChild(labelEl);
  wrapper.appendChild(closeBtn);
  return wrapper;
}

function bindClose() {
  const btn = document.getElementById('pfm-popup-close');
  if (btn) btn.onclick = removeExistingPopup;
}

function safeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? url : '#';
  } catch {
    return '#';
  }
}

export function showPopup(message: string, buttonText: string, link: string) {
  const [, popup] = createOverlay();

  popup.appendChild(headerEl('PropFirmMarket', '#00e87b'));

  const msgEl = document.createElement('div');
  msgEl.style.cssText = 'font-size:16px;font-weight:600;line-height:1.55;margin-bottom:22px;color:#f0f0f0';
  msgEl.textContent = message;
  popup.appendChild(msgEl);

  const ctaEl = document.createElement('a');
  ctaEl.target = '_blank';
  ctaEl.rel = 'noopener noreferrer';
  ctaEl.className = 'pfm-btn-g';
  ctaEl.textContent = buttonText;
  ctaEl.href = safeUrl(link);
  popup.appendChild(ctaEl);

  const noteEl = document.createElement('div');
  noteEl.style.cssText = 'text-align:center;font-size:11px;color:#555;margin-top:4px';
  noteEl.textContent = 'You will be taken to the firm\'s official website';
  popup.appendChild(noteEl);

  bindClose();
  ctaEl.addEventListener('click', () => setTimeout(removeExistingPopup, 300));
}

export function showAffiliatePopup(firmName: string, code: string, link: string) {
  trackClick('affiliate_popup', firmName);
  const [, popup] = createOverlay();

  popup.appendChild(headerEl('Firm profile — PropFirmMarket', '#00e87b'));

  const nameRow = document.createElement('div');
  nameRow.style.cssText = 'font-size:18px;font-weight:800;color:#fff;margin-bottom:4px';
  nameRow.textContent = '🎉 ';
  const nameSpan = document.createElement('span');
  nameSpan.textContent = firmName;
  nameRow.appendChild(nameSpan);
  popup.appendChild(nameRow);

  const detailRow = document.createElement('div');
  detailRow.style.cssText = 'font-size:13px;color:#94b8a5;margin-bottom:16px';
  detailRow.textContent = code
    ? `A promo code is listed: ${code}. Confirm its current validity and terms with the firm.`
    : 'No promo code is listed. Check current offers and terms with the firm.';
  popup.appendChild(detailRow);

  const ctaEl = document.createElement('a');
  ctaEl.target = '_blank';
  ctaEl.rel = 'noopener noreferrer';
  ctaEl.className = 'pfm-btn-g';
  ctaEl.textContent = `Visit ${firmName}`;
  ctaEl.href = safeUrl(link);
  popup.appendChild(ctaEl);

  const noteEl = document.createElement('div');
  noteEl.style.cssText = 'text-align:center;font-size:11px;color:#555;margin-top:4px';
  noteEl.textContent = 'Affiliate link — We may earn a commission at no cost to you';
  popup.appendChild(noteEl);

  bindClose();
  ctaEl.addEventListener('click', () => {
    trackClick('affiliate_click', firmName);
    setTimeout(removeExistingPopup, 300);
  });
}

export function showScamWarningPopup(firmName: string, reason: string) {
  const [, popup] = createOverlay('rgba(239,68,68,0.35)', 'linear-gradient(135deg,#1a0a0a 0%,#110808 100%)', 'rgba(239,68,68,0.06)');
  popup.style.boxShadow = '0 28px 80px rgba(0,0,0,0.7),0 0 40px rgba(239,68,68,0.12)';

  popup.appendChild(headerEl('⚠️ Scam Alert — PropFirmMarket', '#ef4444'));

  const nameRow = document.createElement('div');
  nameRow.style.cssText = 'font-size:22px;font-weight:900;color:#ef4444;margin-bottom:8px';
  nameRow.textContent = '🚫 ';
  const nameSpan = document.createElement('span');
  nameSpan.textContent = firmName;
  nameRow.appendChild(nameSpan);
  popup.appendChild(nameRow);

  const reasonEl = document.createElement('div');
  reasonEl.style.cssText = 'font-size:14px;color:#d1d5db;line-height:1.6;margin-bottom:16px';
  reasonEl.textContent = reason;
  popup.appendChild(reasonEl);

  const warningBox = document.createElement('div');
  warningBox.style.cssText = 'background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px 14px;font-size:13px;color:#fca5a5;margin-bottom:20px;line-height:1.5';
  warningBox.textContent = 'No independently verified scam classification is available for this listing. Review current terms and independent sources before making a decision.';
  popup.appendChild(warningBox);

  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = 'width:100%;padding:12px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:10px;color:#ef4444;font-weight:700;font-size:14px;cursor:pointer';
  closeBtn.textContent = 'I Understand — Close Warning';
  closeBtn.onclick = removeExistingPopup;
  popup.appendChild(closeBtn);

  bindClose();
}

export function showWelcomePopup() {
  const [, popup] = createOverlay('rgba(0,232,123,0.3)', 'linear-gradient(135deg,#071a10 0%,#0a1f14 100%)');
  popup.innerHTML = `
    ${header('Welcome to the PFM Ecosystem', '#00e87b')}
    <div style="font-size:26px;font-weight:900;margin-bottom:6px">🎉 Welcome, Trader!</div>
    <div style="font-size:14px;color:#94b8a5;margin-bottom:24px;line-height:1.6">You're in the public comparison space. Where do you want to start?</div>
    <button class="pfm-btn-g" id="pfm-wlc-compare">🔍 Compare Prop Firms</button>
    <a href="${PLATFORMS.championship}" target="_blank" rel="noopener noreferrer" class="pfm-btn-gold" id="pfm-wlc-champ">🏆 Join PFC Championship</a>
    <a href="${PLATFORMS.terminal}" target="_blank" rel="noopener noreferrer" class="pfm-btn-cyan" id="pfm-wlc-terminal">📊 Start Trading on Terminal</a>
  `;
  bindClose();
  document.getElementById('pfm-wlc-compare')!.onclick = () => {
    removeExistingPopup();
    trackClick('welcome_cta', 'compare');
    document.getElementById('filterSec')?.scrollIntoView({ behavior: 'smooth' });
  };
  document.getElementById('pfm-wlc-champ')?.addEventListener('click', () => { trackClick('welcome_cta', 'championship'); setTimeout(removeExistingPopup, 200); });
  document.getElementById('pfm-wlc-terminal')?.addEventListener('click', () => { trackClick('welcome_cta', 'terminal'); setTimeout(removeExistingPopup, 200); });
}

export function showProfitPopup() {
  const [, popup] = createOverlay('rgba(0,232,123,0.3)');
  popup.innerHTML = `
    ${header('🚀 Performance Alert', '#00e87b')}
    <div style="font-size:22px;font-weight:900;margin-bottom:8px">🚀 You're Ready for Funded!</div>
    <div style="font-size:14px;color:#94b8a5;margin-bottom:20px;line-height:1.6">
      Your estimated pass probability is high based on the stats you entered. Review the available firm and challenge listings before choosing an account.
    </div>
    <div style="background:rgba(0,232,123,0.08);border:1px solid rgba(0,232,123,0.2);border-radius:10px;padding:12px;font-size:13px;color:#86efac;margin-bottom:20px">
      💡 Challenge profile available: <strong style="color:#00e87b">FTMO · 2-Step</strong> — review current listed rules and firm details
    </div>
    <button class="pfm-btn-g" id="pfm-profit-cta">💰 View Best Prop Firms For Me</button>
    <button class="pfm-btn-o" id="pfm-profit-close" style="margin-top:0">Maybe Later</button>
  `;
  bindClose();
  document.getElementById('pfm-profit-cta')!.onclick = () => {
    removeExistingPopup();
    trackClick('profit_popup_cta', 'firms');
    document.getElementById('filterSec')?.scrollIntoView({ behavior: 'smooth' });
  };
  document.getElementById('pfm-profit-close')!.onclick = removeExistingPopup;
}

export function showLossPopup() {
  const [, popup] = createOverlay('rgba(251,191,36,0.25)', 'linear-gradient(135deg,#121005 0%,#0f0d04 100%)');
  popup.innerHTML = `
    ${header('⚠️ Strategy Check', '#fbbf24')}
    <div style="font-size:22px;font-weight:900;margin-bottom:8px;color:#fbbf24">⚠️ Sharpen Your Strategy</div>
    <div style="font-size:14px;color:#d1d5db;margin-bottom:20px;line-height:1.6">
      Your current pass probability is lower than ideal. Try a beginner-friendly firm with more relaxed rules to build confidence while you refine your approach.
    </div>
    <div style="background:rgba(251,191,36,0.07);border:1px solid rgba(251,191,36,0.2);border-radius:10px;padding:12px;font-size:13px;color:#fde68a;margin-bottom:20px">
      🎯 Recommended: <strong>Funder Pro</strong> or <strong>FundingPips</strong> — Easier rules, high pass rates, India-friendly payments
    </div>
    <button class="pfm-btn-gold" id="pfm-loss-cta">📋 See Beginner-Friendly Firms</button>
    <button class="pfm-btn-o" id="pfm-loss-close" style="margin-top:0">I'll Keep Practicing</button>
  `;
  bindClose();
  document.getElementById('pfm-loss-cta')!.onclick = () => {
    removeExistingPopup();
    trackClick('loss_popup_cta', 'firms');
    document.getElementById('filterSec')?.scrollIntoView({ behavior: 'smooth' });
  };
  document.getElementById('pfm-loss-close')!.onclick = removeExistingPopup;
}

export function showExitIntentPopup() {
  if (hasSeenExit()) return;
  markExitSeen();
  const [, popup] = createOverlay('rgba(139,92,246,0.3)', 'linear-gradient(135deg,#0e0a1f 0%,#0b0816 100%)');

  popup.appendChild(headerEl('🔥 Wait — Before You Go!', '#8b5cf6'));

  const titleEl = document.createElement('div');
  titleEl.style.cssText = 'font-size:22px;font-weight:900;margin-bottom:8px;color:#a78bfa';
  titleEl.textContent = '🔥 Don\'t Miss Out!';
  popup.appendChild(titleEl);

  const subtitleEl = document.createElement('div');
  subtitleEl.style.cssText = 'font-size:14px;color:#c4b5fd;margin-bottom:20px;line-height:1.6';
  subtitleEl.textContent = 'Thousands of Indian traders are getting funded right now. Check out today\'s top deals before you leave.';
  popup.appendChild(subtitleEl);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px';

  const cell1 = document.createElement('div');
  cell1.style.cssText = 'background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:12px;text-align:center';
  const cell1Val = document.createElement('div');
  cell1Val.style.cssText = 'font-size:20px;font-weight:900;color:#a78bfa';
  cell1Val.textContent = '₹0';
  const cell1Label = document.createElement('div');
  cell1Label.style.cssText = 'font-size:11px;color:#7c6fa0;margin-top:2px';
  cell1Label.textContent = 'Entry Cost Today';
  cell1.appendChild(cell1Val);
  cell1.appendChild(cell1Label);

  const cell2 = document.createElement('div');
  cell2.style.cssText = 'background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);border-radius:10px;padding:12px;text-align:center';
  const cell2Val = document.createElement('div');
  cell2Val.style.cssText = 'font-size:20px;font-weight:900;color:#a78bfa';
  cell2Val.textContent = '90%';
  const cell2Label = document.createElement('div');
  cell2Label.style.cssText = 'font-size:11px;color:#7c6fa0;margin-top:2px';
  cell2Label.textContent = 'Profit Split';
  cell2.appendChild(cell2Val);
  cell2.appendChild(cell2Label);

  grid.appendChild(cell1);
  grid.appendChild(cell2);
  popup.appendChild(grid);

  const dealsBtn = document.createElement('button');
  dealsBtn.id = 'pfm-exit-deals';
  dealsBtn.className = 'pfm-btn-g';
  dealsBtn.style.cssText = 'background:linear-gradient(135deg,#8b5cf6,#6d28d9)!important;color:#fff!important';
  dealsBtn.textContent = '🔥 Explore Prop Firm Deals';
  popup.appendChild(dealsBtn);

  const champEl = document.createElement('a') as HTMLAnchorElement;
  champEl.id = 'pfm-exit-champ';
  champEl.className = 'pfm-btn-gold';
  champEl.target = '_blank';
  champEl.rel = 'noopener noreferrer';
  champEl.textContent = '🏆 Join Free Championship';
  popup.appendChild(champEl);

  const closeBtn = document.createElement('button');
  closeBtn.id = 'pfm-exit-close';
  closeBtn.className = 'pfm-btn-o';
  closeBtn.style.marginTop = '0';
  closeBtn.textContent = 'No thanks, I\'ll leave';
  popup.appendChild(closeBtn);

  champEl.href = safeUrl(PLATFORMS.championship);
  bindClose();
  document.getElementById('pfm-exit-deals')!.onclick = () => {
    removeExistingPopup();
    trackClick('exit_popup_cta', 'firms');
    document.getElementById('filterSec')?.scrollIntoView({ behavior: 'smooth' });
  };
  document.getElementById('pfm-exit-champ')?.addEventListener('click', () => { trackClick('exit_popup_cta', 'championship'); setTimeout(removeExistingPopup, 200); });
  document.getElementById('pfm-exit-close')!.onclick = removeExistingPopup;
}

export function initExitIntent() {
  let armed = false;
  const arm = () => setTimeout(() => { armed = true; }, 3000);
  arm();
  const handler = (e: MouseEvent) => {
    if (!armed || e.clientY > 10) return;
    showExitIntentPopup();
  };
  document.addEventListener('mouseleave', handler);
  return () => document.removeEventListener('mouseleave', handler);
}
