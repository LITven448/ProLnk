import { useState } from 'react';

export default function DFWHVACDuctworkLeakage2026() {
  const [homeAge, setHomeAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!homeAge || !symptoms) { setResult('Please select both options.'); return; }
    if (homeAge === 'new') { setResult('New construction: Code requires ≤4% duct leakage. Get blaster test at completion. If leakage exceeds this, builder must remediate.'); return; }
    if (symptoms === 'hot_rooms') { setResult('Hot/cold rooms = strong duct leakage indicator. Typical DFW leakage: 20-30% of capacity. Aeroseal can cut leakage 70-90% without duct access.'); return; }
    if (symptoms === 'high_bills') { setResult('High bills with no obvious cause: Duct leakage is top suspect. 25% leakage = 25% higher energy cost. Mastic sealant + Aeroseal recommended.'); return; }
    setResult('Older DFW home with duct concerns: Professional duct blaster test costs $200-400. Reveals exact CFM leakage. Most DFW homes built pre-2000 leak 25-35%.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💨</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW HVAC Duct Leakage Testing Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Duct blaster testing explained for DFW homeowners</p>
        </div>

        {[{ icon: '🔬', title: 'What Duct Blaster Testing Measures', desc: 'Pressurizes duct system and measures CFM leakage. Reveals exactly how much conditioned air escapes into attic before reaching rooms.' },
          { icon: '📊', title: 'Typical DFW Leakage Rates', desc: 'DFW homes average 20-30% duct leakage. Pre-2000 homes often 30-40%. New construction code: 4% max. Every 10% reduction saves ~10% on energy bills.' },
          { icon: '🛠️', title: 'Mastic Sealant vs Aeroseal', desc: 'Mastic: Manual application at joints and seams — best for accessible ducts. Aeroseal: Injected into system, seals from inside — reaches inaccessible areas.' },
          { icon: '💰', title: 'ROI for DFW Homeowners', desc: 'Duct sealing costs $1,500-4,000. Typical DFW home saves $400-800/year on energy. Payback: 3-7 years plus improved comfort.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6′ }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🔍 Duct Leakage Assessment</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Home Age</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="new">Built after 2015</option>
              <option value="mid">2000-2015</option>
              <option value="old">Pre-2000</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Main Symptom</label>
            <select value={symptoms} onChange={e => setSymptoms(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="hot_rooms">Hot or cold rooms</option>
              <option value="high_bills">Unusually high energy bills</option>
              <option value="dust">Excess dust / air quality issues</option>
              <option value="none">No symptoms, preventive check</option>
            </select>
          </div>
          <button onClick={assess} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Get Assessment</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — DFW HVAC Specialists 2026</p>
      </div>
    </div>
  );
}
