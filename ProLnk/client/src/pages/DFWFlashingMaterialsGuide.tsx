import { useState } from 'react';

const flashingMatrix = [
  { app: 'Roof Valley', conditions: 'Standard DFW', material: 'Galvanized Steel', lifespan: '20–30 years', cost: '$0.50–$1.50/sq ft', note: 'DFW hail resistance excellent. Hot-dip galvanized only — avoid plain steel.' },
  { app: 'Roof Valley', conditions: 'Near Pool/Salt Spray', material: 'Copper', lifespan: '50+ years', cost: '$6–$12/sq ft', note: 'Salt air and pool chemistry corrode galvanized. Copper is inert.' },
  { app: 'Window/Door', conditions: 'Standard DFW', material: 'Aluminum', lifespan: '20–25 years', cost: '$0.40–$1.00/sq ft', note: 'Factory pre-bent for window frames. UV-stable in DFW sun. Do not use near masonry — galvanic corrosion risk.' },
  { app: 'Window/Door', conditions: 'Masonry/Brick', material: 'Lead-Coated Copper', lifespan: '40+ years', cost: '$4–$8/sq ft', note: 'Only flashing fully compatible with mortar chemistry in DFW brick homes.' },
  { app: 'Chimney', conditions: 'Standard DFW', material: 'Galvanized Steel', lifespan: '20–30 years', cost: '$0.60–$1.50/sq ft', note: 'DFW chimneys see extreme heat cycles. Use step + counter flashing system.' },
  { app: 'Flat Roof/Parapet', conditions: 'Standard DFW', material: 'EPDM Rubber', lifespan: '15–25 years', cost: '$0.80–$2.00/sq ft', note: 'Best for flat DFW commercial roofs. UV-resistant. Adhered systems hold best in DFW wind storms.' },
  { app: 'HVAC Penetration', conditions: 'Standard DFW', material: 'Aluminum', lifespan: '20–25 years', cost: '$0.40–$1.00/sq ft', note: 'Pre-formed aluminum pipe boots standard. Replace every 15 years — DFW UV degrades rubber boots faster.' },
];

export default function DFWFlashingMaterialsGuide() {
  const [app, setApp] = useState('');
  const [conditions, setConditions] = useState('');
  const [result, setResult] = useState<typeof flashingMatrix[0] | null>(null);

  const conditionOptions = app ? [...new Set(flashingMatrix.filter(f => f.app === app).map(f => f.conditions))] : [];

  function calculate() {
    const match = flashingMatrix.find(f => f.app === app && f.conditions === conditions);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🏚️ DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Flashing Materials Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW flashing fails faster than national averages. Extreme UV, 110°F summer temps, inch-size hail, and sudden downpours of 3"+ per hour are the real enemies. Choosing the wrong material costs DFW homeowners thousands in interior water damage.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏚️ DFW Flashing Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Flashing Application</label>
            <select value={app} onChange={e => { setApp(e.target.value); setConditions(''); setResult(null); }} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select application...</option>
              <option>Roof Valley</option>
              <option>Window/Door</option>
              <option>Chimney</option>
              <option>Flat Roof/Parapet</option>
              <option>HVAC Penetration</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>DFW Conditions</label>
            <select value={conditions} onChange={e => setConditions(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select conditions...</option>
              {conditionOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Material Recommendation</button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: '#F5E642′ }}>🏚️ Recommended Flashing</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[
                ['Material', result.material],
                ['DFW Lifespan', result.lifespan],
                ['Installed Cost', result.cost],
              ].map(([label, value], i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>DFW Note</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.note}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ DFW Flashing Failure Causes</h2>
          {[
            { icon: '⛈️', title: 'Hail Impact', desc: 'DFW averages 6–8 hail events per year. Galvanized and aluminum flashing dent and lose seal integrity after 1″ hail. Inspect after every hail storm.' },
            { icon: '☀️', title: 'UV Degradation', desc: 'DFW has 230+ sunny days/year. Caulk and rubber boots around flashing fail in 5–7 years (vs 10+ in northern climates). Budget for regular recaulking.' },
            { icon: '🌡️', title: 'Thermal Cycling', desc: '80°F daily swings in DFW summer cause metal expansion/contraction that loosens fasteners and breaks sealant bonds. Use thermal-break caulking.' },
            { icon: '🌧️', title: 'Flash Flooding Rain', desc: 'DFW rain events commonly exceed 2″/hr. Flashing must be lapped correctly — no gaps. A 1/8″ gap at 3″/hr rainfall means interior water damage within minutes.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.icon} {item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Roofing Pro?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Flashing installation and replacement requires a licensed roofer. Improper flashing is the #1 source of interior water damage in DFW homes. ProLnk connects you with vetted roofers.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
