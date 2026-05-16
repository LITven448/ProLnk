import { useState } from 'react';

const considerations = [
  { situation: 'Replacing aging shingle roof', icon: '🔄', verdict: 'Strong Candidate', detail: 'Steel standing seam lasts 40-60 years vs 20-25 for shingles in DFW. Cost $18-28/sqft installed. At 2,000 sqft that'''s $36-56K but may be your last roof — factor into comparison.' },
  { situation: 'Frequent hail damage claims', icon: '⛈️', verdict: 'Excellent Choice', detail: 'Class 4 impact rating qualifies for Texas insurance discounts up to 30%. DFW hail frequency makes payback strong — get your insurance agent to confirm discount before deciding.' },
  { situation: 'Noise concern from DFW storms', icon: '🌧️', verdict: 'Solvable', detail: 'Solid decking + quality underlayment eliminates rain noise. Spray foam insulation under metal deck reduces sound to below shingle levels. Budget $0.50-1/sqft extra for noise package.' },
  { situation: 'DFW temperature extremes', icon: '🌡️', verdict: 'Engineered For It', detail: 'Standing seam panels expand/contract independently — floating clips allow 1.5-2" movement across 40-foot panel in DFW'''s -5°F to 130°F range. Exposed fastener panels are NOT recommended for DFW for this reason.' },
];

export default function DFWSteelRoofingGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<typeof considerations[0] | null>(null);

  const situations = considerations.map(c => c.situation);

  const getConsideration = () => {
    const match = considerations.find(c => c.situation === situation);
    setResult(match || null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔩</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Steel Metal Roofing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Standing seam steel for DFW — longevity, hail resistance, and temperature performance.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Steel vs Shingle in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '⏳', label: 'Lifespan', val: '40-60 years standing seam' },
              { icon: '🛡️', label: 'Hail Rating', val: 'Class 4 impact — top tier' },
              { icon: '💰', label: 'Installed Cost', val: '$18-28/sqft DFW market' },
              { icon: '🌡️', label: 'Temp Range', val: 'Rated -40°F to 150°F+ OK' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Steel Roofing Consideration</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your DFW Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={getConsideration} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Analysis →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.verdict}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}