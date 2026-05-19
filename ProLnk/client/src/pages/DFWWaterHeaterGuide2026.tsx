import { useState } from 'react';

export default function DFWWaterHeaterGuide2026() {
  const [age, setAge] = useState('');
  const [type, setType] = useState('tank');
  const [result, setResult] = useState('');

  const assess = () => {
    const yr = parseInt(age);
    if (isNaN(yr)) { setResult('Please enter a valid age.'); return; }
    if (type === 'tank') {
      if (yr < 6) setResult('✅ Good shape. Schedule annual anode rod inspection given DFW hard water (300+ ppm).');
      else if (yr < 10) setResult('⚠️ Monitor closely. Flush sediment annually. Budget for replacement within 2-4 years.');
      else setResult('🔴 Replace now. Tank water heaters average 8-12 yrs in DFW hard water conditions. Risk of failure is high.');
    } else {
      if (yr < 12) setResult('✅ Tankless units last 15-20 yrs. Descale annually — DFW mineral buildup is severe. You are in good shape.');
      else if (yr < 18) setResult('⚠️ Mid-life for tankless. Inspect heat exchanger. Consider descaling service immediately.');
      else setResult('🔴 Approaching end of life. Budget $1,800-3,500 for replacement. Consider heat pump unit for 30% federal ITC.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Water Heater Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>Everything DFW homeowners need to know about water heaters — tank, tankless, hard water impact, and federal incentives.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🪣', label: 'Tank Lifespan', val: '8–12 yrs in DFW' },
            { icon: '⚡', label: 'Tankless Lifespan', val: '15–20 yrs' },
            { icon: '💧', label: 'DFW Water Hardness', val: '300+ ppm (Very Hard)' },
            { icon: '💰', label: 'Federal ITC Heat Pump', val: '30% tax credit' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{s.val}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Replace vs Repair Decision Tool</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Heater Age (years)</label>
              <br />
              <input value={age} onChange={(e) => setAge(e.target.value)} type="number" min="0" max="30"
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, width: 120, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Type</label>
              <br />
              <select value={type} onChange={(e) => setType(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="tank">Tank</option>
                <option value="tankless">Tankless</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Assess My Heater
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#fff' }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📋 DFW-Specific Tips</h2>
          {['Annual anode rod inspection is critical — DFW water destroys rods in 2-3 yrs vs 6 nationally','Tankless payback period in DFW: 6-8 years vs 10-12 nationally due to high gas/electric rates','Heat pump water heaters qualify for 30% federal ITC (up to $2,000) through 2032','Flush tank every 12 months to clear mineral sediment — DFW builds up 3x faster'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#a0aec0', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642' }}>→</span>{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}