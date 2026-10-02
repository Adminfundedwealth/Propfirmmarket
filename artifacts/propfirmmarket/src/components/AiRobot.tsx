export function AiRobotSvg({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e87b"/>
          <stop offset="50%" stopColor="#00c4a0"/>
          <stop offset="100%" stopColor="#00d4ff"/>
        </linearGradient>
        <linearGradient id="faceGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1a14"/>
          <stop offset="100%" stopColor="#081210"/>
        </linearGradient>
        <radialGradient id="glowL2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e87b" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00e87b" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="glowR2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#bodyGrad2)" strokeWidth="1.5" opacity="0.4"/>
      <rect x="18" y="22" width="64" height="58" rx="14" fill="url(#faceGrad2)"/>
      <rect x="18" y="22" width="64" height="58" rx="14" fill="none" stroke="url(#bodyGrad2)" strokeWidth="1.5"/>
      <line x1="50" y1="22" x2="50" y2="12" stroke="url(#bodyGrad2)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="50" cy="10" r="3.5" fill="url(#bodyGrad2)" filter="url(#glow2)"/>
      <rect x="11" y="38" width="7" height="14" rx="3.5" fill="url(#bodyGrad2)" opacity="0.7"/>
      <rect x="82" y="38" width="7" height="14" rx="3.5" fill="url(#bodyGrad2)" opacity="0.7"/>
      <rect x="27" y="34" width="18" height="14" rx="5" fill="#000" opacity="0.7"/>
      <rect x="55" y="34" width="18" height="14" rx="5" fill="#000" opacity="0.7"/>
      <ellipse cx="36" cy="41" rx="7" ry="5" fill="url(#glowL2)" opacity="0.3"/>
      <circle cx="36" cy="41" r="4" fill="#00e87b" filter="url(#glow2)"/>
      <circle cx="36" cy="41" r="2" fill="#fff" opacity="0.9"/>
      <circle cx="37" cy="40" r="0.8" fill="#0a1a14"/>
      <ellipse cx="64" cy="41" rx="7" ry="5" fill="url(#glowR2)" opacity="0.3"/>
      <circle cx="64" cy="41" r="4" fill="#00d4ff" filter="url(#glow2)"/>
      <circle cx="64" cy="41" r="2" fill="#fff" opacity="0.9"/>
      <circle cx="65" cy="40" r="0.8" fill="#0a1a14"/>
      <circle cx="50" cy="52" r="1.5" fill="url(#bodyGrad2)" opacity="0.6"/>
      <rect x="33" y="57" width="34" height="7" rx="3.5" fill="#000" opacity="0.5"/>
      <rect x="35" y="59" width="5" height="3" rx="1.5" fill="#00e87b" opacity="0.9"/>
      <rect x="42" y="58" width="5" height="5" rx="1.5" fill="#00c4a0" opacity="0.9"/>
      <rect x="49" y="59" width="5" height="3" rx="1.5" fill="#00d4ff" opacity="0.9"/>
      <rect x="56" y="57.5" width="5" height="6" rx="1.5" fill="#00c4a0" opacity="0.9"/>
      <rect x="63" y="59" width="3" height="3" rx="1.5" fill="#00e87b" opacity="0.9"/>
      <polyline points="28,32 34,27 40,30 46,25 52,29 58,24 66,28 72,26"
        fill="none" stroke="url(#bodyGrad2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  );
}
