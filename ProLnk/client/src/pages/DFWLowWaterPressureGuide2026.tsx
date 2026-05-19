import { useState } from 'react';

export default function DFWLowWaterPressureGuide2026() {
  const [location, setLocation] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const diagnose = () => {
    if (location === 'whole-house') {
      setDiagnosis('🔧 Pressure Regulator Failure — most common DFW culprit. Located where the main line enters your home. Normal DFW municipal pressure is 60-80 PSI; regulator should keep it at 40-60 PSI. Replacement: $250-400 installed. Call a plumber — this is not a DIY job.');
    } else if (location === 'single-fixture') {
      setDiagnosis('🪛 Mineral Buildup in Aerator/Showerhead. DFW hard water (300-500 ppm) deposits minerals fast. Remove aerator, soak in white vinegar overnight. If showerhead, fill bag with vinegar and rubber-band over head for 4 hours. Free fix!');
    } else if (location === 'cold-only') {
      setDiagnosis('🚰 Partial Shutoff Valve. Someone partially closed the main shutoff or fixture shutoff. Check under sinks, behind toilets, and at the main shutoff (usually near water meter). Turn fully counterclockwise to open.');
    } else if (location === 'hot-only') {
      setDiagnosis('🌡️ Water Heater Shutoff or Failing PRV. Check the shutoff valve on cold inlet to water heater — fully open? Also, water heater pressure relief valve may be partially engaged. Have a plumber inspect both.');
    } else if (location === 'neighbor-same') {
      setDiagnosis('🏘️ Shared Line / Municipal Issue. Call Dallas Water Utilities (214-651-1441) or your city’s water department to report low pressure. May be a main break or area-wide issue. No repair needed on your end.');
    } else {
      setDiagnosis('Select symptom location above for a diagnosis.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Low Water Pressure Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Low water pressure is the #1 plumbing complaint in DFW. Hard water and aging regulators are usually to blame. Here's how to find the cause fast.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏆 Top DFW Pressure Causes</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { cause: 'Pressure regulator failure', freq: 'Very Common', cost: '$250-400′ },
              { cause: 'Mineral buildup in aerators', freq: 'Common', cost: '$0 DIY' },
              { cause: 'Partially closed shutoff valve', freq: 'Common', cost: '$0′ },
              { cause: 'Corroded galvanized pipes', freq: 'Older DFW homes', cost: '$2,000-8,000′ },
              { cause: 'Municipal main pressure drop', freq: 'Occasional', cost: '$0 (city issue)' },
            ].map(r => (
              <div key={r.cause} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, borderBottom: '1px solid #334155', paddingBottom: 10, alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0′ }}>{r.cause}</span>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{r.freq}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, textAlign: 'right' }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Diagnose Your Pressure Problem</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Where is the low pressure?</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value="">Select location...</option>
              <option value="whole-house">🏠 Whole house, all fixtures</option>
              <option value="single-fixture">🚿 Single fixture only</option>
              <option value="cold-only">❄️ Cold water only</option>
              <option value="hot-only">🔥 Hot water only</option>
              <option value="neighbor-same">🏘️ Neighbors have same issue</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Find the Cause
          </button>
          {diagnosis && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0′ }}>
              {diagnosis}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>📞 When to Call a DFW Plumber</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Whole-house low pressure that isn't the municipal supply</li>
            <li>Pressure drops suddenly with no known cause</li>
            <li>You hear banging pipes (water hammer) with pressure changes</li>
            <li>Home built before 1970 with original galvanized pipes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}