import { useState } from 'react';

const sizeRanges = [
  { label: 'Under 1,500 sq ft', tons: 2, baseHours: 2800 },
  { label: '1,500 - 2,000 sq ft', tons: 2.5, baseHours: 3100 },
  { label: '2,000 - 2,500 sq ft', tons: 3, baseHours: 3300 },
  { label: '2,500 - 3,000 sq ft', tons: 3.5, baseHours: 3500 },
  { label: '3,000 - 4,000 sq ft', tons: 4, baseHours: 3700 },
  { label: 'Over 4,000 sq ft', tons: 5, baseHours: 4000 },
];

const efficiencyLevels = [
  { label: 'Standard (13-15 SEER)', factor: 1.10, label2: 'Runs longer to achieve same cooling' },
  { label: 'Mid-efficiency (16-18 SEER)', factor: 1.0, label2: 'Baseline DFW runtime' },
  { label: 'High-efficiency (19-22 SEER)', factor: 0.88, label2: 'More output per hour, fewer runtime hours' },
  { label: 'Ultra-high (23+ SEER2)', factor: 0.78, label2: 'Variable speed — significant runtime reduction' },
];

export default function DFWHVACRuntime() {
  const [size, setSize] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [result, setResult] = useState<{ annual: number; summer: number; shoulder: number; winter: number; wearRate: string } | null>(null);

  function calculate() {
    const s = sizeRanges.find(r => r.label === size);
    const e = efficiencyLevels.find(l => l.label === efficiency);
    if (!s || !e) return;
    const annual = Math.round(s.baseHours * e.factor);
    const summer = Math.round(annual * 0.68);
    const shoulder = Math.round(annual * 0.20);
    const winter = annual - summer - shoulder;
    const compressorLife = 100000;
    const yearsToWear = Math.round(compressorLife / annual);
    const wearRate = `Compressor reaches ~100K hours in approx. ${yearsToWear} years at this runtime`;
    setResult({ annual, summer, shoulder, winter, wearRate });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⏱️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC Runtime Calculator
        </h1>
        <p style={{ color: '#9AAFC4', marginBottom: 16 }}>
          How many hours does your DFW AC actually run each year? DFW's relentless summers mean your system logs far more hours than the national average — with real consequences for component life.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'DFW Summer Runtime', value: '3,000-4,000 hrs', sub: 'Jun-Sep alone' },
            { label: 'National Average', value: '1,000-1,200 hrs', sub: 'Annual total' },
            { label: 'DFW Annual Total', value: '3,500-4,500 hrs', sub: 'Including shoulder' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#1A2B45', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ color: '#E8EDF5', fontSize: 13, fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#9AAFC4', fontSize: 12 }}>{stat.sub}</div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Estimate Your Home's Annual Runtime</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4′ }}>DFW home size</div>
            <select value={size} onChange={e => setSize(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
              <option value="">Select home size</option>
              {sizeRanges.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4′ }}>AC efficiency rating</div>
            <select value={efficiency} onChange={e => setEfficiency(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
              <option value="">Select efficiency</option>
              {efficiencyLevels.map(l => <option key={l.label} value={l.label}>{l.label}</option>)}
            </select>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Calculate Runtime
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#1A2B45', borderRadius: 8, padding: 14, textAlign: 'center', gridColumn: '1 / -1′ }}>
                  <div style={{ color: '#9AAFC4', fontSize: 13 }}>Estimated Annual Runtime</div>
                  <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 700 }}>{result.annual.toLocaleString()} hrs/yr</div>
                </div>
                {[
                  { label: '☀️ Summer (Jun-Sep)', val: result.summer },
                  { label: '🍂 Spring/Fall', val: result.shoulder },
                  { label: '❄️ Winter', val: result.winter },
                  { label: '🇺🇸 National Avg', val: 1100 },
                ].map(item => (
                  <div key={item.label} style={{ background: '#1A2B45', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                    <div style={{ color: '#9AAFC4', fontSize: 12 }}>{item.label}</div>
                    <div style={{ color: '#E8EDF5', fontSize: 20, fontWeight: 700 }}>{item.val.toLocaleString()} hrs</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1A2B45', borderRadius: 8, padding: 12, fontSize: 14, color: '#9AAFC4′ }}>
                ⚙️ Component wear: {result.wearRate}
              </div>
            </div>
          )}
        </div>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>High Runtime = Need a Great Tech</div>
          <div style={{ color: '#9AAFC4', fontSize: 14 }}>ProLnk matches DFW homeowners with vetted HVAC pros who understand your system's demands.</div>
        </div>
      </div>
    </div>
  );
}
