import { useState } from 'react';

export default function DFWRoofingWindDamageCalc2026() {
  const [windSpeed, setWindSpeed] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const [result, setResult] = useState('');

  const calc = () => {
    if (!windSpeed || !roofAge) { setResult('Please select both options.'); return; }
    if (windSpeed === 'under60') { setResult('Under 60 mph: Below typical claim threshold. Document any visible damage. Insurance may deny claim — focus on hail if concurrent.'); return; }
    if (windSpeed === '60_80′ && roofAge === ’new') { setResult('60-80 mph on newer roof: Potential claim. Document lifted shingles, missing tabs, granule loss in gutters. Call adjuster within 30 days of storm.'); return; }
    if (windSpeed === '60_80') { setResult('60-80 mph on older roof: Strong claim candidate. Older shingles more susceptible. Photo all damage from ground, don’t walk roof alone. Request adjuster inspection.'); return; }
    if (windSpeed === 'over80') { setResult('80+ mph — High-probability claim. All ages of roof susceptible. File immediately. Document: missing shingles, damaged flashing, ridge cap loss, gutters bent. Get contractor estimate before adjuster visit.'); return; }
    setResult('Document everything immediately: Photos of storm date/time from weather app, drone or ground photos of all visible damage, interior water intrusion.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌪️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Roof Wind Damage Claim Calculator Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Calculating and documenting wind damage for DFW insurance claims</p>
        </div>

        {[{ icon: '💨', title: 'Wind Speed Thresholds', desc: '60+ mph typically triggers shingle damage on older roofs. 75+ mph affects most roofs regardless of age. DFW averages 3-5 qualifying wind events per year.' },
          { icon: '📸', title: 'Documentation Strategy', desc: 'Photo storm date from weather app, all exterior damage from ground, gutters (granule accumulation), attic interior. Date-stamped photos are critical for adjuster.' },
          { icon: '📐', title: 'Calculating Damaged Squares', desc: 'Roofing measured in squares (100 sq ft). 2,000 sq ft roof = ~20 squares. Get contractor to estimate damaged squares before adjuster arrives — brings credibility to claim.' },
          { icon: '🤝', title: 'Working with Your Adjuster', desc: 'Request adjuster meet your contractor on site simultaneously. Contractor advocates for complete replacement vs. patch. Most DFW adjusters respond within 5-10 business days.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6′ }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🧮 Wind Damage Claim Guide</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Estimated Wind Speed</label>
            <select value={windSpeed} onChange={e => setWindSpeed(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="under60″>Under 60 mph</option>
              <option value="60_80″>60-80 mph</option>
              <option value="over80″>80+ mph</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Roof Age</label>
            <select value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="new">Under 5 years</option>
              <option value="mid">5-15 years</option>
              <option value="old">15+ years</option>
            </select>
          </div>
          <button onClick={calc} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Get Claim Guidance</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — DFW Roofing Claims Support 2026</p>
      </div>
    </div>
  );
}
