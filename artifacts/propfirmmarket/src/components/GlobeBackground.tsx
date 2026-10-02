import { useEffect, useRef } from 'react';

/* ── Prop Firm city hubs ── */
interface City { name: string; lat: number; lon: number; isHub: boolean; color: string; r: number; }
const CITIES: City[] = [
  { name: 'Mumbai',     lat:  19.07, lon:  72.87, isHub: true,  color: '#00e87b', r: 6 },
  { name: 'Delhi',      lat:  28.70, lon:  77.10, isHub: false, color: '#00e87b', r: 4 },
  { name: 'Bangalore',  lat:  12.97, lon:  77.59, isHub: false, color: '#00e87b', r: 3 },
  { name: 'London',     lat:  51.50, lon:  -0.12, isHub: false, color: '#00d4ff', r: 5 },
  { name: 'New York',   lat:  40.71, lon: -74.00, isHub: false, color: '#00d4ff', r: 5 },
  { name: 'Prague',     lat:  50.08, lon:  14.44, isHub: false, color: '#00d4ff', r: 4 },
  { name: 'Dubai',      lat:  25.20, lon:  55.27, isHub: false, color: '#fbbf24', r: 5 },
  { name: 'Singapore',  lat:   1.35, lon: 103.82, isHub: false, color: '#00d4ff', r: 4 },
  { name: 'Sydney',     lat: -33.87, lon: 151.21, isHub: false, color: '#00d4ff', r: 4 },
  { name: 'Amsterdam',  lat:  52.37, lon:   4.90, isHub: false, color: '#00d4ff', r: 4 },
  { name: 'Toronto',    lat:  43.65, lon: -79.38, isHub: false, color: '#8b5cf6', r: 4 },
  { name: 'Tokyo',      lat:  35.68, lon: 139.69, isHub: false, color: '#00d4ff', r: 4 },
  { name: 'São Paulo',  lat: -23.55, lon: -46.63, isHub: false, color: '#8b5cf6', r: 4 },
  { name: 'Frankfurt',  lat:  50.11, lon:   8.68, isHub: false, color: '#00d4ff', r: 3 },
  { name: 'Cape Town',  lat: -33.92, lon:  18.42, isHub: false, color: '#fbbf24', r: 3 },
];

/* ── Simplified continent outlines  [lat, lon][] ── */
const CONTINENTS: [number, number][][] = [
  /* Africa */
  [
    [37.2,-5.7],[37.3,10.2],[37.4,24.1],[30.9,32.2],[22.0,37.3],
    [15.5,41.8],[12.0,44.0],[5.3,41.9],[-1.7,41.8],[-11.3,40.5],
    [-25.6,33.5],[-34.8,27.0],[-34.5,20.0],[-29.4,17.1],[-17.3,11.7],
    [-4.3,8.7],[1.0,9.0],[4.3,1.6],[5.5,-2.0],[4.4,-7.5],
    [10.7,-15.5],[14.7,-17.5],[20.8,-17.1],[27.7,-12.9],[34.0,-6.5],[37.2,-5.7],
  ],
  /* Europe */
  [
    [71,28],[70,22],[65,15],[62,5],[52,2],[44,-9],[36,-9],[36,5],
    [37,12],[41,14],[38,22],[40,26],[42,35],[48,37],[55,25],[60,25],
    [65,30],[70,30],[71,28],
  ],
  /* Asia (main body) */
  [
    [72,142],[68,141],[60,139],[53,141],[48,140],[44,134],[37,121],
    [22,114],[10,104],[1,104],[1,108],[-4,108],[-8,115],[-9,120],
    [0,110],[10,100],[15,100],[20,93],[22,92],[22,88],[20,86],
    [12,80],[8,77],[8,72],[22,60],[22,57],[25,57],[22,55],[22,50],
    [28,48],[28,34],[36,36],[38,28],[42,35],[42,42],[45,42],[48,46],
    [52,60],[55,68],[55,72],[62,72],[68,73],[72,80],[72,100],[72,142],
  ],
  /* North America */
  [
    [72,-140],[72,-82],[68,-64],[62,-64],[52,-56],[48,-52],[46,-60],
    [42,-70],[38,-74],[32,-80],[28,-80],[24,-80],[20,-88],[15,-90],
    [8,-77],[10,-75],[22,-88],[30,-97],[30,-110],[22,-110],[18,-105],
    [20,-100],[30,-95],[32,-117],[38,-122],[48,-124],[56,-132],
    [60,-138],[66,-140],[72,-140],
  ],
  /* South America */
  [
    [12,-72],[12,-62],[8,-60],[4,-52],[0,-50],[-5,-35],[-10,-38],
    [-15,-39],[-22,-42],[-28,-48],[-34,-55],[-34,-58],[-30,-65],
    [-22,-68],[-18,-70],[-10,-78],[-2,-80],[0,-80],[8,-77],[10,-75],[12,-72],
  ],
  /* Australia */
  [
    [-18,122],[-15,130],[-12,136],[-14,140],[-15,144],[-22,150],
    [-32,152],[-38,146],[-38,140],[-36,136],[-32,133],[-28,120],[-22,114],[-18,122],
  ],
  /* Greenland (simplified) */
  [
    [83,-40],[80,-60],[76,-72],[70,-52],[66,-46],[68,-24],[74,-18],[80,-20],[83,-40],
  ],
  /* Antarctica band */
  [
    [-68,-180],[-68,-120],[-72,-90],[-68,-60],[-72,-30],[-68,0],[-72,30],
    [-68,60],[-72,90],[-68,120],[-72,150],[-68,180],[-90,180],[-90,-180],[-68,-180],
  ],
];

/* ── 3D projection ── */
function project(lat: number, lon: number, rotY: number, cx: number, cy: number, R: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = lon * (Math.PI / 180);
  const ry    = rotY * (Math.PI / 180);

  const x0 =  Math.sin(phi) * Math.cos(theta);
  const y0 =  Math.cos(phi);
  const z0 =  Math.sin(phi) * Math.sin(theta);

  const xr =  x0 * Math.cos(ry) + z0 * Math.sin(ry);
  const yr =  y0;
  const zr = -x0 * Math.sin(ry) + z0 * Math.cos(ry);

  return { sx: cx + xr * R, sy: cy - yr * R, z: zr };
}

/* ── Great-circle arc sampling ── */
function arcPoints(lat1: number, lon1: number, lat2: number, lon2: number, steps = 60): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return [lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t] as [number, number];
  });
}

export function GlobeBackground() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const rotY  = useRef(20);
  const pulse = useRef(0);
  const raf   = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, R = 0, CX = 0, CY = 0;

    function resize() {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R  = Math.min(W, H) * 0.44;
      CX = W / 2;
      CY = H / 2 + H * 0.04;
    }
    resize();
    window.addEventListener('resize', resize);

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const rot = rotY.current;
      pulse.current += 0.035;
      const p = pulse.current;

      /* ── Atmosphere glow ── */
      const atmo = ctx.createRadialGradient(CX, CY, R * 0.9, CX, CY, R * 1.2);
      atmo.addColorStop(0, 'rgba(0,100,60,0.18)');
      atmo.addColorStop(1, 'rgba(0,100,60,0)');
      ctx.beginPath(); ctx.arc(CX, CY, R * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = atmo; ctx.fill();

      /* ── Ocean sphere ── */
      const ocean = ctx.createRadialGradient(CX - R * 0.3, CY - R * 0.25, 0, CX, CY, R);
      ocean.addColorStop(0, 'rgba(0,18,14,0.97)');
      ocean.addColorStop(0.7, 'rgba(0,12,10,0.96)');
      ocean.addColorStop(1, 'rgba(0,40,28,0.80)');
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = ocean; ctx.fill();

      /* ── Clip everything to globe circle ── */
      ctx.save();
      ctx.beginPath(); ctx.arc(CX, CY, R - 1, 0, Math.PI * 2); ctx.clip();

      /* ── Continent fills ── */
      CONTINENTS.forEach(poly => {
        ctx.beginPath();
        let first = true;
        let prevVisible = false;
        poly.forEach(([lt, ln]) => {
          const { sx, sy, z } = project(lt, ln, rot, CX, CY, R);
          const visible = z > -0.05;
          if (visible) {
            if (first || !prevVisible) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
            first = false;
          }
          prevVisible = visible;
        });
        ctx.closePath();
        ctx.fillStyle   = 'rgba(0,130,65,0.82)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,232,100,0.40)';
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      });

      /* ── Subtle lat/lon grid dots ── */
      for (let lat = -80; lat <= 80; lat += 20) {
        for (let lon = -180; lon <= 180; lon += 15) {
          const { sx, sy, z } = project(lat, lon, rot, CX, CY, R);
          if (z < 0.1) continue;
          ctx.beginPath(); ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,232,123,${(0.05 + z * 0.12).toFixed(2)})`; ctx.fill();
        }
      }

      /* ── Arc lines: Mumbai → every other city ── */
      const hub = CITIES[0];
      CITIES.slice(1).forEach((city, idx) => {
        const pts = arcPoints(hub.lat, hub.lon, city.lat, city.lon, 60);
        ctx.beginPath();
        let first2 = true; let prevV = false;
        pts.forEach(([lt, ln]) => {
          const { sx, sy, z } = project(lt, ln, rot, CX, CY, R);
          const vis = z > 0;
          if (vis) { if (first2 || !prevV) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy); first2 = false; }
          prevV = vis;
        });
        ctx.strokeStyle = `rgba(0,200,255,0.18)`; ctx.lineWidth = 0.8; ctx.stroke();

        /* travelling dot */
        const tIdx = Math.floor(((p * 0.38 + idx * 0.6) % 1.0) * 60);
        if (tIdx < pts.length) {
          const [tl, tln] = pts[tIdx];
          const tp = project(tl, tln, rot, CX, CY, R);
          if (tp.z > 0) {
            ctx.beginPath(); ctx.arc(tp.sx, tp.sy, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,220,255,0.85)'; ctx.fill();
          }
        }
      });

      /* ── City dots ── */
      CITIES.forEach(city => {
        const { sx, sy, z } = project(city.lat, city.lon, rot, CX, CY, R);
        if (z < 0) return;
        const scale = 0.55 + z * 0.45;
        const dotR  = city.r * scale;

        if (city.isHub) {
          /* double pulsing rings */
          [1.8, 3.2].forEach((mult, i) => {
            ctx.beginPath();
            ctx.arc(sx, sy, dotR + mult * 4 + Math.sin(p + i * 1.2) * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,232,123,${0.35 - i * 0.12 + 0.15 * Math.sin(p + i)})`;
            ctx.lineWidth = 1.4 - i * 0.4; ctx.stroke();
          });
        }

        /* glow halo */
        const gl = ctx.createRadialGradient(sx, sy, 0, sx, sy, dotR * 4);
        gl.addColorStop(0, city.color + 'cc');
        gl.addColorStop(1, city.color + '00');
        ctx.beginPath(); ctx.arc(sx, sy, dotR * 4, 0, Math.PI * 2);
        ctx.fillStyle = gl; ctx.fill();

        /* core */
        ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = city.color; ctx.fill();

        /* white centre highlight */
        ctx.beginPath(); ctx.arc(sx - dotR * 0.25, sy - dotR * 0.25, dotR * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fill();
      });

      ctx.restore();

      /* ── Rim light (specular highlight top-left) ── */
      const rim = ctx.createRadialGradient(
        CX - R * 0.5, CY - R * 0.42, 0,
        CX - R * 0.2, CY - R * 0.18, R * 0.75,
      );
      rim.addColorStop(0, 'rgba(0,255,140,0.09)');
      rim.addColorStop(1, 'rgba(0,255,140,0)');
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();

      /* ── Globe border ── */
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,232,123,0.22)'; ctx.lineWidth = 1.2; ctx.stroke();

      rotY.current  += 0.10;
      raf.current    = requestAnimationFrame(frame);
    }

    frame();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.9,
      }}
    />
  );
}
