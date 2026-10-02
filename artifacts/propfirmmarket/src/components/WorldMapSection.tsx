import { useEffect, useRef, useState } from 'react';

const CITIES = [
  { name: 'Mumbai',    lat: 19.1,  lon: 72.8,  traders: 4821, india: true  },
  { name: 'Delhi',     lat: 28.6,  lon: 77.2,  traders: 3214, india: true  },
  { name: 'Bangalore', lat: 12.97, lon: 77.6,  traders: 2987, india: true  },
  { name: 'Hyderabad', lat: 17.4,  lon: 78.5,  traders: 1843, india: true  },
  { name: 'Pune',      lat: 18.5,  lon: 73.9,  traders: 1502, india: true  },
  { name: 'London',    lat: 51.5,  lon: -0.1,  traders: 2341, india: false },
  { name: 'New York',  lat: 40.7,  lon: -74.0, traders: 1987, india: false },
  { name: 'Dubai',     lat: 25.2,  lon: 55.3,  traders: 1654, india: false },
  { name: 'Singapore', lat: 1.35,  lon: 103.8, traders: 1432, india: false },
  { name: 'Tokyo',     lat: 35.7,  lon: 139.7, traders: 891,  india: false },
  { name: 'Sydney',    lat: -33.9, lon: 151.2, traders: 743,  india: false },
  { name: 'Frankfurt', lat: 50.1,  lon: 8.7,   traders: 612,  india: false },
  { name: 'Toronto',   lat: 43.7,  lon: -79.4, traders: 534,  india: false },
  { name: 'São Paulo', lat: -23.5, lon: -46.6, traders: 467,  india: false },
  { name: 'Lagos',     lat: 6.5,   lon: 3.4,   traders: 389,  india: false },
];

function latLonToSVG(lat: number, lon: number): [number, number] {
  const x = ((lon + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return [x, y];
}

const LAND_PATHS = [
  // North America
  'M33,53 L111,83 L194,114 L250,169 L258,207 L269,222 L286,228 L319,200 L333,122 L356,119 L344,75 L283,48 L158,36 Z',
  // South America
  'M272,217 L328,217 L361,253 L395,278 L402,278 L389,325 L356,356 L342,372 L314,406 L292,389 L275,317 L278,264 Z',
  // Europe
  'M475,150 L475,128 L500,128 L522,117 L556,97 L578,58 L556,53 L542,58 L528,92 L500,108 L486,128 Z',
  // Africa
  'M450,147 L603,147 L619,217 L617,244 L614,278 L594,347 L550,347 L533,347 L486,300 L451,244 L450,208 Z',
  // Asia (main)
  'M572,53 L667,47 L778,47 L889,56 L972,83 L1000,83 L1000,167 L833,189 L792,222 L722,228 L681,189 L625,217 L606,150 L574,136 Z',
  // India peninsula (highlighted separately, drawn on top)
  'M689,150 L722,172 L744,189 L733,228 L714,228 L700,189 L689,172 Z',
  // SE Asia / Indonesia
  'M790,225 L820,220 L840,235 L830,248 L800,245 Z',
  'M850,230 L875,228 L888,240 L870,250 L848,245 Z',
  // Japan
  'M885,148 L895,142 L902,155 L890,162 L882,158 Z',
  // Australia
  'M817,311 L856,289 L889,289 L911,306 L922,328 L917,356 L878,356 L833,347 Z',
  // UK / Ireland
  'M480,100 L490,94 L495,105 L484,110 Z',
  // Greenland
  'M280,20 L320,14 L340,22 L320,36 L290,38 Z',
  // Iceland
  'M440,72 L455,68 L460,78 L445,82 Z',
];

const INDIA_PATH = 'M689,150 L722,172 L744,189 L733,228 L714,228 L700,189 L689,172 Z';

function PulseRing({ x, y, color, delay = 0 }: { x: number; y: number; color: string; delay?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="3" fill={color} opacity="0.9" />
      <circle cx={x} cy={y} r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="3;14;3" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3">
        <animate attributeName="r" values="5;20;5" dur="2.5s" begin={`${delay + 0.4}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" begin={`${delay + 0.4}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function ArcLine({ x1, y1, x2, y2, delay }: { x1:number; y1:number; x2:number; y2:number; delay: number }) {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18;
  const d = `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
  return (
    <g>
      {/* arc line that fades in and out */}
      <path d={d} fill="none" stroke="#00e87b" strokeWidth="0.8" opacity="0">
        <animate attributeName="opacity" values="0;0.35;0.35;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
      </path>
      {/* travelling dot — animateMotion must be a direct child of the moving element */}
      <circle r="2.5" fill="#00e87b" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
        <animateMotion dur="3s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  );
}

export function WorldMapSection() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const total = CITIES.reduce((s, c) => s + c.traders, 0);
    let cur = 0;
    const step = total / 80;
    const t = setInterval(() => {
      cur = Math.min(cur + step, total);
      setLiveCount(Math.floor(cur));
      if (cur >= total) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, []);

  const [mumbai] = CITIES.filter(c => c.name === 'Mumbai');
  const [mumbaiX, mumbaiY] = latLonToSVG(mumbai.lat, mumbai.lon);

  const arcTargets = CITIES.filter(c => !c.india).slice(0, 6);

  return (
    <section className="wm-sec">
      <div className="wm-header">
        <div className="wm-eyebrow">
          <span className="sp-live-dot" />
          LIVE TRADER ACTIVITY
        </div>
        <h2 className="wm-title">India's Traders Are Everywhere</h2>
        <p className="wm-sub">
          <span className="wm-count">{liveCount.toLocaleString()}</span> active traders
          from PropFirmMarket across <strong>38 countries</strong>
        </p>
      </div>

      <div className="wm-map-wrap">
        <svg
          viewBox="0 0 1000 500"
          className="wm-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="wm-bg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0a1628" />
              <stop offset="100%" stopColor="#050a0e" />
            </radialGradient>
            <filter id="wm-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="india-glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect width="1000" height="500" fill="url(#wm-bg)" />

          {/* Grid lines */}
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`h${i}`} x1="0" y1={i*83} x2="1000" y2={i*83}
              stroke="rgba(0,232,123,0.04)" strokeWidth="1" />
          ))}
          {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
            <line key={`v${i}`} x1={i*100} y1="0" x2={i*100} y2="500"
              stroke="rgba(0,232,123,0.04)" strokeWidth="1" />
          ))}

          {/* Continent fills */}
          {LAND_PATHS.map((d, i) => (
            <path key={i} d={d}
              fill="rgba(0,232,123,0.05)"
              stroke="rgba(0,232,123,0.18)"
              strokeWidth="0.8"
            />
          ))}

          {/* India highlighted */}
          <path d={INDIA_PATH}
            fill="rgba(0,232,123,0.18)"
            stroke="#00e87b"
            strokeWidth="1.2"
            filter="url(#india-glow)"
          >
            <animate attributeName="fill-opacity" values="0.18;0.32;0.18" dur="3s" repeatCount="indefinite" />
          </path>

          {/* Arc lines from Mumbai to world cities */}
          {arcTargets.map((city, i) => {
            const [cx, cy] = latLonToSVG(city.lat, city.lon);
            return <ArcLine key={city.name} x1={mumbaiX} y1={mumbaiY} x2={cx} y2={cy} delay={i * 1.1} />;
          })}

          {/* City dots */}
          {CITIES.map((city, i) => {
            const [cx, cy] = latLonToSVG(city.lat, city.lon);
            const color = city.india ? '#00e87b' : '#00d4ff';
            return (
              <g key={city.name}
                className="wm-city"
                onMouseEnter={() => setActiveCity(city.name)}
                onMouseLeave={() => setActiveCity(null)}
                style={{ cursor: 'pointer' }}
              >
                <PulseRing x={cx} y={cy} color={color} delay={i * 0.3} />
                {(city.india || activeCity === city.name) && (
                  <text
                    x={cx + 7} y={cy + 4}
                    fontSize="9"
                    fill={city.india ? '#00e87b' : '#00d4ff'}
                    fontFamily="monospace"
                    fontWeight="700"
                    opacity="0.9"
                  >
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {activeCity && (() => {
          const city = CITIES.find(c => c.name === activeCity);
          if (!city) return null;
          return (
            <div className="wm-tooltip">
              <div className="wm-tt-city">{city.india ? '🇮🇳 ' : '🌍 '}{city.name}</div>
              <div className="wm-tt-count">{city.traders.toLocaleString()} active traders</div>
            </div>
          );
        })()}
      </div>

      {/* City stats strip */}
      <div className="wm-cities-strip">
        {CITIES.filter(c => c.india).map(c => (
          <div key={c.name} className="wm-city-chip india">
            <span className="wm-cc-dot" />
            <span className="wm-cc-name">🇮🇳 {c.name}</span>
            <span className="wm-cc-num">{c.traders.toLocaleString()}</span>
          </div>
        ))}
        {CITIES.filter(c => !c.india).slice(0,5).map(c => (
          <div key={c.name} className="wm-city-chip">
            <span className="wm-cc-dot cyan" />
            <span className="wm-cc-name">🌍 {c.name}</span>
            <span className="wm-cc-num">{c.traders.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
