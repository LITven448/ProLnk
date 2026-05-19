import { useState } from 'react';

const sealerMatrix = [
  { grout: 'Unsanded Grout', exposure: 'Interior Dry', type: 'Penetrating Silicone', freq: 'Every 2 years', method: 'Brush-on, wipe excess after 10 min' },
  { grout: 'Unsanded Grout', exposure: 'Interior Wet (Shower)', type: 'Penetrating Fluorochemical', freq: 'Every 1 year', method: 'Spray-on, wipe immediately, 2 coats' },
  { grout: 'Sanded Grout', exposure: 'Interior Dry', type: 'Penetrating Silicone', freq: 'Every 2–3 years', method: 'Brush-on, wipe excess after 10 min' },
  { grout: 'Sanded Grout', exposure: 'Interior Wet (Shower)', type: 'Penetrating Fluorochemical', freq: 'Every 1 year', method: 'Spray-on, 2 coats, 30 min dry between' },
  { grout: 'Sanded Grout', exposure: 'Exterior DFW Patio', type: 'Penetrating Epoxy Blend', freq: 'Every 1 year', method: 'Brush-on, scrub in, dry 24h before rain exposure' },
  { grout: 'Epoxy Grout', exposure: 'Any', type: 'No Sealer Needed', freq: 'N/A', method: 'Epoxy grout is inherently non-porous and stain-resistant' },
];

export default function DFWGroutSealerGuide() {
  const [grout, setGrout] = useState('');
  const [exposure, setExposure] = useState('');
  const [result, setResult] = useState<typeof sealerMatrix[0] | null>(null);

  const exposures = grout === 'Epoxy Grout' ? ['Any'] : ['Interior Dry', 'Interior Wet (Shower)', 'Exterior DFW Patio'];

  function calculate() {
    const match = sealerMatrix.find(s => s.grout === grout && s.exposure === exposure);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🧱 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Grout Sealer Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's hard water (200–500 PPM mineral content) and fine clay dust are grout's worst enemies. Unsealed grout in DFW homes stains within months. The right sealer, applied correctly, keeps grout looking new for years.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 DFW Sealer Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Grout Type</label>
            <select value={grout} onChange={e => { setGrout(e.target.value); setExposure(''); setResult(null); }} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select grout type...</option>
              <option>Unsanded Grout</option>
              <option>Sanded Grout</option>
              <option>Epoxy Grout</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>DFW Exposure</label>
            <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select exposure...</option>
              {exposures.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Sealer Plan</button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: '#F5E642' }}>🧴 Sealer Recommendation</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['Sealer Type', result.type],
                ['Reapply Frequency', result.freq],
                ['Application Method', result.method],
              ].map(([label, value], i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚠️ DFW-Specific Grout Threats</h2>
          {[
            { icon: '💧', title: 'Hard Water Scale', desc: 'DFW tap water averages 15–25 grains of hardness. Mineral deposits penetrate unsealed grout and cause permanent white staining. Seal before first use.' },
            { icon: '🌫️', title: 'Clay Dust Infiltration', desc: 'DFW\’s Blackland Prairie clay dust is ultra-fine and oil-absorbing. It infiltrates grout pores and causes gray discoloration that ordinary cleaning cannot remove.' },
            { icon: '☀️', title: 'UV Degradation (Exterior)', desc: 'DFW\’s 234+ sunny days per year degrade surface sealers rapidly. Use penetrating sealers on exterior grout — they won\’t peel or chalk.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.icon} {item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Tile Pro?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Grout restoration, regrouting, or tile replacement in DFW? ProLnk connects you with licensed tile contractors in your area.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
