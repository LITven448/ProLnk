import { useState } from 'react';

export default function DFWHVACMiniSplitGuide2026() {
  const [spaceType, setSpaceType] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState('');

  const sizing: Record<string, Record<string, string>> = {
    garage: { small: '9,000 BTU (0.75 ton) — single zone', medium: '12,000 BTU (1 ton) — single zone', large: '18,000 BTU (1.5 ton) — single zone' },
    addition: { small: '9,000 BTU — single zone perfect', medium: '12,000–18,000 BTU — single zone', large: '18,000–24,000 BTU — consider multi-zone' },
    sunroom: { small: '12,000 BTU — extra solar load', medium: '18,000 BTU — solar gain adds 20%', large: '24,000 BTU — multi-zone recommended' },
    basement: { small: '9,000 BTU — minimal load', medium: '12,000 BTU — standard', large: '18,000 BTU — single or multi-zone' },
  };

  const getSqftRange = (v: string) => v === 'small' ? 'Under 400 sq ft' : v === 'medium' ? '400–800 sq ft' : '800+ sq ft';

  function calculate() {
    if (!spaceType || !sqft) { setResult('Select both options'); return; }
    setResult(sizing[spaceType]?.[sqft] || 'Contact a pro for custom sizing');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌡️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Mini-Split Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Ductless mini-splits for DFW additions, garages, and bonus rooms — sized right for Texas heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', title: 'Single Zone', desc: 'One indoor unit, one outdoor compressor. Best for garages, additions under 800 sq ft. $1,800–$3,500 installed.' },
            { icon: '🏘️', title: 'Multi-Zone', desc: 'One outdoor unit, 2–5 indoor heads. Controls each room independently. $4,000–$10,000 installed.' },
            { icon: '❄️', title: 'DFW Heat Load', desc: 'Plan 1 ton per 400–500 sq ft in DFW. Add 20% for sunrooms/west-facing rooms.' },
            { icon: '🔧', title: 'Brand Reliability', desc: 'Mitsubishi #1 (25yr history), Daikin #2 (quiet), LG #3 (smart home). Avoid off-brands.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 Mini-Split Sizing Tool</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={spaceType} onChange={e => setSpaceType(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Space Type</option>
              <option value="garage">Garage</option>
              <option value="addition">Room Addition</option>
              <option value="sunroom">Sunroom</option>
              <option value="basement">Basement</option>
            </select>
            <select value={sqft} onChange={e => setSqft(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Square Footage</option>
              <option value="small">Under 400 sq ft</option>
              <option value="medium">400–800 sq ft</option>
              <option value="large">800+ sq ft</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Get Sizing</button>
          {result && <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600 }}>Recommendation: {result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ DIY vs Professional Install</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>DIY mini-splits (Senville, Mr. Cool) save $800–1,500 on labor but void most manufacturer warranties. In DFW, incorrect refrigerant charge is common — a $200 service call wipes the savings. Professional install recommended for units over 12,000 BTU.</p>
        </div>
      </div>
    </div>
  );
}