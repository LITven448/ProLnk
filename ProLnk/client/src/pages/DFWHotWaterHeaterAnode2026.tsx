import { useState } from 'react';

export default function DFWHotWaterHeaterAnode2026() {
  const [hardness, setHardness] = useState('');
  const [heaterAge, setHeaterAge] = useState('');
  const [guide, setGuide] = useState('');

  const diagnose = () => {
    if (hardness === 'very-hard' && heaterAge === 'new') {
      setGuide('🔴 Replace in 2 years. DFW water at 300-500 ppm destroys magnesium anode rods rapidly. Consider a magnesium rod (best for DFW) and check it at 18 months. Alternatively, install a water softener to extend rod life significantly.');
    } else if (hardness === 'very-hard' && heaterAge === 'mid') {
      setGuide('⚠️ Check your anode rod NOW. A 3-5 year old water heater in DFW with very hard water likely has a depleted or core-exposed anode rod. Pull the rod (hex fitting on top of heater, 1-1/16″ socket) and inspect. If less than 50% original diameter, replace immediately. DIY: $30-50. Plumber: $150-250.');
    } else if (hardness === 'very-hard' && heaterAge === 'old') {
      setGuide('🚨 Anode likely fully depleted. A 6+ year old DFW water heater with very hard water has almost certainly consumed its anode rod. Without protection, the steel tank corrodes from inside. Signs: rusty water, rotten egg smell. Consider replacing the entire unit if 10+ years old.');
    } else if (hardness === 'hard' && heaterAge === 'new') {
      setGuide('✅ You have 2-3 years before first inspection. Standard DFW-area hard water (200-300 ppm) depletes anode rods in 3 years. Set a calendar reminder to inspect at 30 months. Magnesium rods recommended for DFW.');
    } else if (hardness === 'hard' && heaterAge === 'mid') {
      setGuide('🔍 Inspect your anode rod this season. At 3-5 years in DFW-level hard water, your rod may be 50-75% depleted. Pull and inspect — if more than half the steel core is exposed, replace now. This is your most cost-effective maintenance: $30-50 vs. $900-1,400 for a new unit.');
    } else {
      setGuide('Select your water hardness and heater age above for personalized guidance.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Water Heater Anode Rod Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW hard water destroys anode rods 2x faster than the national average. The anode rod is the sacrificial component that prevents your tank from rusting — most DFW homeowners never replace it.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🧪 Anode Rod Types for DFW Water</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { type: 'Magnesium', best: 'Best for DFW hard water', life: '2-3 yrs in DFW', cost: '$30-45′ },
              { type: 'Aluminum', best: 'Budget option, less effective', life: '3-4 yrs', cost: '$20-30′ },
              { type: 'Zinc/Aluminum', best: 'Reduces sulfur smell', life: '3-4 yrs', cost: '$25-35′ },
              { type: 'Powered (electric)', best: 'Best longevity, no replacement', life: 'Indefinite', cost: '$50-80′ },
            ].map(r => (
              <div key={r.type} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 12, borderBottom: '1px solid #334155', paddingBottom: 10, alignItems: 'center' }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.type}</span>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{r.best}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{r.life}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your Anode Rod Schedule</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Your Water Hardness (check Dallas Water Utilities report)</label>
            <select value={hardness} onChange={e => setHardness(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select hardness...</option>
              <option value="very-hard">💎 Very Hard (300+ ppm — most of DFW)</option>
              <option value="hard">🪨 Hard (200-300 ppm — some DFW suburbs)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Water Heater Age</label>
            <select value={heaterAge} onChange={e => setHeaterAge(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select age...</option>
              <option value="new">🆕 0-2 years old</option>
              <option value="mid">⏱️ 3-5 years old</option>
              <option value="old">📅 6+ years old</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get My Schedule
          </button>
          {guide && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>
              {guide}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>💰 Cost Comparison: DIY vs. Plumber</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { item: 'Anode rod (magnesium, DIY)', cost: '$30-50′ },
              { item: 'Anode rod replacement (plumber)', cost: '$150-250′ },
              { item: 'Water heater replacement (plumber)', cost: '$900-1,400′ },
            ].map(r => (
              <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 8 }}>
                <span style={{ color: '#cbd5e1′ }}>{r.item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}