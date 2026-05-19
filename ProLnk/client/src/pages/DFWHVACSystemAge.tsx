import { useState } from 'react';

const systemTypes = [
  { type: 'Central AC (standard efficiency)', dfwMultiplier: 0.85, nationalLife: 15, dfwNote: 'DFW heat stress reduces life by ~15%' },
  { type: 'Heat Pump', dfwMultiplier: 0.80, nationalLife: 15, dfwNote: 'Runs year-round; DFW summers are brutal on compressors' },
  { type: 'High-efficiency AC (16+ SEER)', dfwMultiplier: 0.88, nationalLife: 18, dfwNote: 'Better built but still impacted by DFW runtime hours' },
  { type: 'Gas Furnace (paired with AC)', dfwMultiplier: 0.92, nationalLife: 20, dfwNote: 'Furnace side less impacted; AC side takes the hit' },
  { type: 'Mini-split / Ductless', dfwMultiplier: 0.90, nationalLife: 20, dfwNote: 'Handles DFW heat better due to inverter tech' },
];

export default function DFWHVACSystemAge() {
  const [installYear, setInstallYear] = useState('');
  const [systemType, setSystemType] = useState('');
  const [result, setResult] = useState<{ age: number; remaining: number; budget: string; urgency: string } | null>(null);

  function calculate() {
    const year = parseInt(installYear);
    const sys = systemTypes.find(s => s.type === systemType);
    if (!year || !sys || year < 1980 || year > 2026) return;
    const age = 2026 - year;
    const dfwLife = Math.round(sys.nationalLife * sys.dfwMultiplier);
    const remaining = Math.max(0, dfwLife - age);
    const replaceCost = systemType.includes('Mini') ? '$3,500-6,000′ : systemType.includes(’Heat Pump') ? '$5,000-9,000′ : '$4,000-8,000';
    let urgency = '';
    if (remaining === 0) urgency = '🚨 Past DFW-adjusted lifespan — budget for replacement now';
    else if (remaining <= 3) urgency = '⚠️ Plan replacement within 1-3 years — start budgeting';
    else if (remaining <= 6) urgency = '📋 Mid-life — schedule annual tune-ups and start a replacement fund';
    else urgency = '✅ Good years ahead — maintain it well and it will last';
    setResult({ age, remaining, budget: replaceCost, urgency });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC System Age Tracker
        </h1>
        <p style={{ color: '#9AAFC4', marginBottom: 16 }}>
          Know your system's true DFW-adjusted remaining life. National averages overestimate lifespan for DFW homes — our extreme summers accelerate wear significantly.
        </p>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: '10px 16px', marginBottom: 28, fontSize: 14, color: '#F5E642′ }}>
          🌡️ DFW systems log 3,000-4,000 hours annually vs the 1,000-1,200 national average — that's 2-3x the wear.
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>DFW-Adjusted Lifespan by System Type</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
          {systemTypes.map(s => (
            <div key={s.type} style={{ background: '#1A2B45', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.type}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
                  {Math.round(s.nationalLife * s.dfwMultiplier)} yrs DFW <span style={{ color: '#9AAFC4', fontWeight: 400 }}>vs {s.nationalLife} national</span>
                </div>
              </div>
              <div style={{ color: '#9AAFC4', fontSize: 13, marginTop: 4 }}>{s.dfwNote}</div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Calculate Your System's Age</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4′ }}>Year HVAC was installed (check data plate on unit)</div>
            <input type="number" value={installYear} onChange={e => setInstallYear(e.target.value)}
              placeholder="e.g. 2014″ min="1980" max="2026"
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B', fontSize: 16, boxSizing: 'border-box' }} />
          </label>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4′ }}>System type</div>
            <select value={systemType} onChange={e => setSystemType(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
              <option value="">Select system type</option>
              {systemTypes.map(s => <option key={s.type} value={s.type}>{s.type}</option>)}
            </select>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Calculate DFW-Adjusted Life
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: '#1A2B45', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#9AAFC4', fontSize: 13, marginBottom: 4 }}>System Age</div>
                  <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 700 }}>{result.age} yrs</div>
                </div>
                <div style={{ background: '#1A2B45', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#9AAFC4', fontSize: 13, marginBottom: 4 }}>DFW Life Remaining</div>
                  <div style={{ color: result.remaining <= 3 ? '#E74C3C' : '#F5E642', fontSize: 28, fontWeight: 700 }}>{result.remaining} yrs</div>
                </div>
              </div>
              <div style={{ background: '#1A2B45', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>
                💰 Replacement budget range: <strong style={{ color: '#F5E642′ }}>{result.budget}</strong>
              </div>
              <div style={{ lineHeight: 1.6 }}>{result.urgency}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Planning a Replacement?</div>
          <div style={{ color: '#9AAFC4', fontSize: 14 }}>ProLnk connects DFW homeowners with vetted HVAC contractors — get 3+ competitive quotes at no cost.</div>
        </div>
      </div>
    </div>
  );
}
