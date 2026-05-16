import { useState } from 'react';

const GARAGE_TYPES: Record<string, { label: string; baseImpact: number }> = {
  one_car: { label: '1-Car Attached', baseImpact: 8000 },
  two_car: { label: '2-Car Attached (Standard)', baseImpact: 18000 },
  three_car: { label: '3-Car Attached (Side-Entry Preferred)', baseImpact: 32000 },
  tandem: { label: 'Tandem 2-Car (One Behind the Other)', baseImpact: 12000 },
  detached_two: { label: '2-Car Detached', baseImpact: 14000 },
};

const GARAGE_SIZES: Record<string, { label: string; note: string; factor: number }> = {
  tight: { label: 'Tight (< 20 ft deep)', note: 'F-150 and most full-size trucks will NOT fit', factor: 0.82 },
  standard: { label: 'Standard (20–22 ft deep)', note: 'Most trucks barely fit — tight for F-250+', factor: 1.0 },
  deep: { label: 'Deep (22–24 ft deep)', note: 'Comfortable for full-size trucks and SUVs', factor: 1.12 },
  oversize: { label: 'Oversize (24+ ft deep)', note: 'Ideal for trucks, boats, and workshop use', factor: 1.22 },
};

const FINISH_LEVELS: Record<string, { label: string; factor: number }> = {
  unfinished: { label: 'Unfinished / Basic Drywall', factor: 1.0 },
  painted: { label: 'Painted & Insulated', factor: 1.06 },
  epoxy: { label: 'Epoxy Floors + Cabinetry', factor: 1.14 },
  premium: { label: 'Premium Finish (AC, workshop setup)', factor: 1.22 },
};

export default function DFWGarageValueGuide() {
  const [gType, setGType] = useState('two_car');
  const [gSize, setGSize] = useState('standard');
  const [gFinish, setGFinish] = useState('painted');
  const [result, setResult] = useState<{ impact: number; sizeNote: string; verdict: string } | null>(null);

  function calculate() {
    const t = GARAGE_TYPES[gType];
    const s = GARAGE_SIZES[gSize];
    const f = FINISH_LEVELS[gFinish];
    const impact = Math.round(t.baseImpact * s.factor * f.factor);
    let verdict = '';
    if (gType === 'three_car' && gSize !== 'tight') verdict = 'Premium feature in DFW — 3-car garages command significant buyer interest, especially in executive markets.';
    else if (gType === 'tandem') verdict = 'Tandem garages are functional but polarizing — many DFW buyers prefer side-by-side access and will discount tandem configurations.';
    else if (gSize === 'tight') verdict = 'Tight garages are a meaningful negative in DFW truck country. Buyers with full-size trucks (a large segment) will penalize this heavily.';
    else verdict = 'Solid standard feature. Epoxy floors and cabinetry can push perception well above cost, especially in staged photos.';
    setResult({ impact, sizeNote: s.note, verdict });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '52px 24px' }}>
        <p style={{ color: '#8B5E3C', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW GARAGE VALUE GUIDE</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          What Is Your Garage Worth in DFW?
        </h1>
        <p style={{ fontSize: 17, color: '#666', lineHeight: 1.7, marginBottom: 40 }}>
          DFW is truck country. The F-150 is the best-selling vehicle in Texas by a wide margin —
          and a garage that will not fit one is a real problem for a significant share of buyers.
          Garage type, depth, and finish all impact perceived value.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🚗', title: '2-Car vs 3-Car Premium', desc: 'A 3-car garage adds $14,000–$25,000 over a standard 2-car in mid-to-upper DFW markets. Side-entry 3-car is especially desirable for curb appeal.' },
            { icon: '📏', title: 'Depth Is Critical', desc: 'A Ford F-150 extended cab needs at least 22 ft. A tight 20 ft garage with a truck = doors dinging the wall every morning. Buyers know this.' },
            { icon: '🖌️', title: 'Epoxy Floors Signal Quality', desc: 'Epoxy flooring costs $1,500–$3,500 but photographs beautifully and signals a meticulous owner. Disproportionate ROI in staging.' },
            { icon: '📦', title: 'Tandem vs Side-by-Side', desc: 'Tandem garages (one car behind the other) are functional but often discounted by buyers. Side-by-side is the strong preference in DFW.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e8e3d9' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: 32, marginBottom: 28, border: '1px solid #e8e3d9' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#8B5E3C' }}>🏠 Garage Value Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Garage Type</label>
              <select value={gType} onChange={e => setGType(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(GARAGE_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Garage Depth</label>
              <select value={gSize} onChange={e => setGSize(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(GARAGE_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#888', display: 'block', marginBottom: 6 }}>Finish Level</label>
              <select value={gFinish} onChange={e => setGFinish(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(FINISH_LEVELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#8B5E3C', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Estimate Garage Value Impact
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#FFF8F0', borderRadius: 10, padding: 24 }}>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Estimated Value Impact vs No Garage</p>
              <p style={{ fontSize: 34, fontWeight: 800, color: '#8B5E3C', marginBottom: 8 }}>{fmt(result.impact)}</p>
              <p style={{ fontSize: 13, color: '#d97706', fontWeight: 600, marginBottom: 8 }}>⚠️ Depth note: {result.sizeNote}</p>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{result.verdict}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
