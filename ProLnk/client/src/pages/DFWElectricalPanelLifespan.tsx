import { useState } from 'react';

const brands = [
  { name: 'Siemens', life: '40–60 yrs', risk: 'Low', note: 'Widely used in DFW new construction' },
  { name: 'Square D', life: '40–60 yrs', risk: 'Low', note: 'Reliable, common in DFW' },
  { name: 'Leviton', life: '40–60 yrs', risk: 'Low', note: 'Solid performer' },
  { name: 'Eaton / Cutler-Hammer', life: '30–50 yrs', risk: 'Low', note: 'Good track record' },
  { name: 'Federal Pacific (FPE)', life: '15–25 yrs', risk: 'High', note: 'Fire risk — replace regardless of age' },
  { name: 'Zinsco / Sylvania', life: '15–25 yrs', risk: 'High', note: 'Known defect — replace immediately' },
];

export default function DFWElectricalPanelLifespan() {
  const [brand, setBrand] = useState('');
  const [age, setAge] = useState('');
  const [ac, setAc] = useState('yes');
  const [result, setResult] = useState<null | { urgency: string; message: string; color: string }>(null);

  function assess() {
    const a = parseInt(age) || 0;
    const b = brand.toLowerCase();
    const highRisk = b.includes('federal') || b.includes('zinsco') || b.includes('sylvania');
    let urgency = '';
    let message = '';
    let color = '#F5E642';
    if (highRisk) {
      urgency = 'Replace Immediately';
      message = 'Federal Pacific and Zinsco panels have documented safety defects and are a fire risk. DFW insurers are increasingly refusing to cover homes with these panels. Budget $2,500–$5,000 for a full replacement.';
      color = '#FF4444';
    } else if (a >= 40) {
      urgency = 'Proactive Replacement Recommended';
      message = 'Your panel is at or past its typical lifespan. DFW\’s high AC load (summer heat runs systems 8–12 hrs/day) accelerates wear. Schedule an electrician evaluation this year.';
      color = '#FF9900';
    } else if (a >= 25 && ac === 'yes') {
      urgency = 'Evaluation Recommended';
      message = 'DFW AC demand puts above-average load on panels. At this age with heavy AC use, have an electrician inspect within 1–2 years, especially if you plan to add EV charging or solar.';
      color = '#F5E642';
    } else {
      urgency = 'Monitor Annually';
      message = 'Your panel appears to have remaining service life. Watch for tripped breakers, buzzing sounds, or flickering lights — all are warning signs in DFW homes.';
      color = '#44BB44';
    }
    setResult({ urgency, message, color });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Electrical Panel Lifespan in DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: 32 }}>
          DFW's extreme summer heat puts AC systems — and your electrical panel — under sustained stress from June through September. Here is what you need to know about how long panels last in the Metroplex.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Panel Brand Lifespan Reference</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#111F3A', borderRadius: 8, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, borderLeft: `3px solid ${b.risk === 'High' ? '#FF4444' : '#F5E642'}` }}>
              <div>
                <div style={{ fontWeight: 700 }}>{b.name}</div>
                <div style={{ color: '#8A9BB5', fontSize: 13 }}>{b.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: b.risk === 'High' ? '#FF4444′ : '#F5E642', fontWeight: 700 }}>{b.life}</div>
                <div style={{ color: b.risk === 'High' ? '#FF4444′ : '#8A9BB5', fontSize: 12 }}>Risk: {b.risk}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚡ Assess Your DFW Panel</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Panel Brand</label>
              <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Square D, Federal Pacific" style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Panel Age (years)</label>
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28″ style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Heavy DFW AC Use?</label>
                <select value={ac} onChange={e => setAc(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }}>
                  <option value="yes">Yes (central AC, 3+ tons)</option>
                  <option value="no">No or minimal AC</option>
                </select>
              </div>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Assess Panel Status</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: `3px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: result.color, marginBottom: 8 }}>{result.urgency}</div>
              <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{result.message}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111F3A', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW-Specific Panel Facts</div>
          <ul style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>DFW AC runs 8–12 hrs/day in summer — highest electrical load in US residential</li>
            <li>Attic heat (up to 160°F) near panel wiring accelerates insulation degradation</li>
            <li>Full panel replacement in DFW typically costs $2,500–$5,000</li>
            <li>Adding EV charging or solar requires panel evaluation in any DFW home</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
