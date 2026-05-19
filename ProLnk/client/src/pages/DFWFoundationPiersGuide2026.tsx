import { useState } from 'react';

const pierTypes: Record<string, { type: string; depth: string; cost: string; best: string }> = {
  settling: { type: 'Steel Push Piers', depth: '15-20ft', cost: '$500-600/pier', best: 'Best for heavy slab settlement on deep clay' },
  cracking: { type: 'Helical Piers', depth: '12-18ft', cost: '$400-550/pier', best: 'Best for moderate cracking with soil instability' },
  tilting: { type: 'Steel Push Piers', depth: '18-20ft', cost: '$550-600/pier', best: 'Best for severe tilt needing maximum lift capacity' },
  moisture: { type: 'Helical Piers', depth: '12-15ft', cost: '$400-500/pier', best: 'Best for moisture-driven movement in expansive clay' },
};

export default function DFWFoundationPiersGuide2026() {
  const [problem, setProblem] = useState('');
  const rec = problem ? pierTypes[problem] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Steel Push Piers vs Helical Piers</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW clay soils require piers to reach stable load-bearing strata 12–20 feet below grade.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '🔩 Steel Push Piers', desc: 'Hydraulically driven to refusal. Best for heavy slabs needing maximum lift. Reach 18-20ft in DFW.' },
            { label: '🌀 Helical Piers', desc: 'Screwed into soil torque-controlled. Better for new construction or lighter loads. Reach 12-18ft.' },
            { label: '📐 DFW Depth', desc: 'DFW Blackland Prairie clay requires 12-20ft to reach stable soil. Shallow piers fail within 5 years.' },
            { label: '💰 Cost Per Pier', desc: '$400-600 per pier installed. Typical DFW job: 10-20 piers = $5,000-12,000 total.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, marginBottom: 24, border: '1px solid #F5E642′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>⚠️ Lifetime Warranty Matters</h2>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Only accept a transferable lifetime warranty. DFW clay never stops moving. Any company unwilling to offer lifetime coverage is a red flag.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Pier Recommendation Tool</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>My foundation problem is:</label>
          <select
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, marginBottom: 16 }}
          >
            <option value="">Select your situation...</option>
            <option value="settling">Slab settling / doors sticking</option>
            <option value="cracking">Wall and floor cracking</option>
            <option value="tilting">Visible tilt or slope</option>
            <option value="moisture">Moisture-driven movement</option>
          </select>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Recommended: {rec.type}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Depth: {rec.depth} · Cost: {rec.cost}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, marginTop: 8 }}>{rec.best}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get Competing Foundation Quotes</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with 3 vetted DFW foundation specialists — free, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
