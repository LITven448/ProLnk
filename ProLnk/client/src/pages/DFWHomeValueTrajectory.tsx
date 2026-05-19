import { useState } from 'react';

const submarkets: Record<string, { base: number; growth: number; label: string }> = {
  'Frisco/Prosper': { base: 580000, growth: 0.062, label: 'North Suburbs — Tech/Corp Growth' },
  'Plano/Allen': { base: 520000, growth: 0.045, label: 'Established North — Stable High Demand' },
  'McKinney/Celina': { base: 490000, growth: 0.071, label: 'Far North — Fastest Growing' },
  'Southlake/Colleyville': { base: 950000, growth: 0.032, label: 'West — Premium Stable' },
  'Coppell/Irving': { base: 420000, growth: 0.038, label: 'Mid-Cities — Airport Corridor' },
  'Arlington/Mansfield': { base: 360000, growth: 0.041, label: 'Mid-Cities — Value Growth' },
  'Dallas (Inner)': { base: 620000, growth: 0.035, label: 'Urban Core — Neighborhood Variable' },
  'Fort Worth (Inner)': { base: 370000, growth: 0.048, label: 'Cowtown — Rising Fast' },
  'Garland/Mesquite': { base: 290000, growth: 0.044, label: 'East — Affordable, Solid ROI' },
  'Rockwall/Rowlett': { base: 410000, growth: 0.055, label: 'Lake Corridor — Lifestyle Premium' },
  'Denton/Lewisville': { base: 380000, growth: 0.052, label: 'UNT Corridor — Young Growth' },
  'Grand Prairie/Duncanville': { base: 310000, growth: 0.046, label: 'Southwest — Steady' },
};

const improvementBoosts: Record<string, number> = {
  'Kitchen remodel ($30-60K)': 0.065,
  'Primary bath remodel ($20-40K)': 0.045,
  'New HVAC system': 0.025,
  'Foundation repair': 0.03,
  'Roof replacement': 0.028,
  'Pool addition': 0.04,
  'ADU / casita addition': 0.07,
  'Smart home package': 0.015,
  'Curb appeal / landscaping': 0.02,
  'None planned': 0,
};

export default function DFWHomeValueTrajectory() {
  const [submarket, setSubmarket] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [improvement, setImprovement] = useState('');
  const [schoolStrong, setSchoolStrong] = useState<boolean | null>(null);
  const [nearEmployer, setNearEmployer] = useState<boolean | null>(null);
  const [result, setResult] = useState<null | { year1: number; year3: number; year5: number; confidence: string }>(null);

  const calculate = () => {
    const sm = submarkets[submarket];
    if (!sm || !currentValue || !improvement) return;
    const base = parseFloat(currentValue.replace(/[^0-9.]/g, '')) || sm.base;
    let rate = sm.growth;
    if (schoolStrong) rate += 0.008;
    if (nearEmployer) rate += 0.006;
    const boost = improvementBoosts[improvement] || 0;
    const v1 = Math.round(base * (1 + rate + boost * 0.3));
    const v3 = Math.round(base * Math.pow(1 + rate, 3) * (1 + boost * 0.7));
    const v5 = Math.round(base * Math.pow(1 + rate, 5) * (1 + boost));
    const confidence = schoolStrong !== null && nearEmployer !== null ? 'High' : 'Medium';
    setResult({ year1: v1, year3: v3, year5: v5, confidence });
  };

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36 }}>📈</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Home Value Trajectory</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Project your DFW home's 5-year value path by submarket and planned improvements</p>
        </div>

        <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Your DFW Submarket</label>
        <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#111f3a', border: '1px solid #1e3a5f', color: '#fff', fontSize: 14, marginBottom: 14 }}>
          <option value=''>Select submarket...</option>
          {Object.keys(submarkets).map(k => <option key={k} value={k}>{k}</option>)}
        </select>

        {submarket && <p style={{ color: '#64748b', fontSize: 12, marginTop: -10, marginBottom: 14 }}>{submarkets[submarket].label} · Median ~{fmt(submarkets[submarket].base)}</p>}

        <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Current Estimated Home Value</label>
        <input value={currentValue} onChange={e => setCurrentValue(e.target.value)} placeholder='e.g. 450000' style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#111f3a', border: '1px solid #1e3a5f', color: '#fff', fontSize: 14, marginBottom: 14, boxSizing: 'border-box' }} />

        <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Planned Improvements (next 2 years)</label>
        <select value={improvement} onChange={e => setImprovement(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#111f3a', border: '1px solid #1e3a5f', color: '#fff', fontSize: 14, marginBottom: 14 }}>
          <option value=''>Select improvement...</option>
          {Object.keys(improvementBoosts).map(k => <option key={k} value={k}>{k}</option>)}
        </select>

        <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
          {[['Strong school district?', schoolStrong, setSchoolStrong], ['Near major employer/corridor?', nearEmployer, setNearEmployer]].map(([label, val, setter]: any) => (
            <div key={label as string} style={{ flex: 1, background: '#111f3a', borderRadius: 10, padding: 14 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px' }}>{label as string}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setter(v)} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: val === v ? '#F5E642' : '#1e3a5f', color: val === v ? '#0A1628' : '#94a3b8' }}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={calculate} disabled={!submarket || !currentValue || !improvement}
          style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', cursor: !submarket || !currentValue || !improvement ? 'not-allowed' : 'pointer', background: !submarket || !currentValue || !improvement ? '#1e3a5f' : '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16 }}>
          Project My Home Value
        </button>

        {result && (
          <div style={{ marginTop: 24, background: '#111f3a', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, textAlign: 'center' }}>
              {[['1 Year', result.year1], ['3 Years', result.year3], ['5 Years', result.year5]].map(([label, val]: any) => (
                <div key={label}>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{fmt(val)}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94a3b8' }}>
              Confidence: <strong style={{ color: '#22c55e' }}>{result.confidence}</strong> · Based on {submarket} submarket trends + planned improvements.
              Keep your home maintained — deferred maintenance is the #1 value killer in DFW.
            </div>
            <p style={{ color: '#F5E642', fontSize: 13, marginTop: 14, textAlign: 'center' }}>ProLnk connects you to the pros who protect your largest asset.</p>
          </div>
        )}
      </div>
    </div>
  );
}
