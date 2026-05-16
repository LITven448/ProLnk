import { useState } from 'react';

export default function DFWWellInspectionGuide2026() {
  const [wellAge, setWellAge] = useState('');
  const [location, setLocation] = useState('');

  const getChecklist = () => {
    if (!wellAge || !location) return null;
    const base = ['Flow test (minimum 3 GPM for residential use)', 'Static water level measurement', 'Pump test under load (30–60 minutes)', 'Pressure tank inspection', 'Well cap and casing integrity'];
    const extra = [];
    if (wellAge === '20+ yrs' || wellAge === '10-20 yrs') extra.push('Pump motor condition assessment', 'Pitless adapter inspection');
    if (location === 'Agriculture Nearby' || location === 'Outer County') extra.push('Nitrate/nitrite testing (agriculture runoff)', 'Coliform bacteria test', 'Total Dissolved Solids (TDS) test');
    if (wellAge === '30+ yrs') extra.push('Galvanized pipe inspection', 'Well log verification with TCEQ', 'Full water quality panel (heavy metals)');
    return [...base, ...extra];
  };

  const checklist = getChecklist();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Well Inspection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Due diligence for well water properties in DFW outer counties</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #38bdf8' }}>
          <h2 style={{ color: '#38bdf8', fontSize: 16, margin: '0 0 10px' }}>🌊 Texas Groundwater Rights</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>Texas follows the "rule of capture" — landowners generally own groundwater beneath their property. However, Groundwater Conservation Districts (GCDs) regulate drilling and pumping in most DFW outer counties. Verify GCD rules and any existing well permits before closing.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>⚡ Key Test: Flow Rate (GPM)</h2>
          {[
            { rate: 'Under 1 GPM', status: '🔴 Problematic', note: 'May need storage tank or new well — negotiate heavily' },
            { rate: '1–2 GPM', status: '🟡 Marginal', note: 'Workable with storage tank — factor in cost ($3,000–8,000)' },
            { rate: '3–5 GPM', status: '🟢 Adequate', note: 'Sufficient for standard residential use' },
            { rate: '5+ GPM', status: '✅ Excellent', note: 'Suitable for irrigation and high-demand use' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '9px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{item.rate}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{item.note}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', whiteSpace: 'nowrap' }}>{item.status}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🧫 Water Quality Testing Panel</h2>
          {[
            ['Coliform Bacteria', 'Must be absent — indicates contamination', '$50–100'],
            ['Nitrates/Nitrites', 'Safe limit: 10 mg/L — agriculture runoff risk', '$40–80'],
            ['Total Dissolved Solids (TDS)', 'Under 500 mg/L preferred — taste/hardness', '$30–60'],
            ['pH', 'Ideal 6.5–8.5 — corrosion risk outside range', 'Included in panel'],
            ['Heavy Metals Panel', 'Arsenic, lead, iron — recommended for older wells', '$150–300'],
          ].map(([test, desc, cost], i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{test}</span>
                <span style={{ color: '#22c55e', fontSize: 12 }}>{cost}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>📍 Well Age + Location → Custom Inspection Checklist</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Well Age:</p>
              {['Under 10 yrs', '10-20 yrs', '20+ yrs', '30+ yrs'].map(opt => (
                <button key={opt} onClick={() => setWellAge(opt)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 6, borderRadius: 8, cursor: 'pointer', border: '1px solid', fontSize: 13,
                    borderColor: wellAge === opt ? '#F5E642' : '#334155', background: wellAge === opt ? '#F5E642' : 'transparent', color: wellAge === opt ? '#0A1628' : '#94a3b8', fontWeight: wellAge === opt ? 700 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Surrounding Area:</p>
              {['Residential Subdivision', 'Agriculture Nearby', 'Outer County', 'Wooded/Rural'].map(opt => (
                <button key={opt} onClick={() => setLocation(opt)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 6, borderRadius: 8, cursor: 'pointer', border: '1px solid', fontSize: 13,
                    borderColor: location === opt ? '#F5E642' : '#334155', background: location === opt ? '#F5E642' : 'transparent', color: location === opt ? '#0A1628' : '#94a3b8', fontWeight: location === opt ? 700 : 400 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          {checklist && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Your Inspection Checklist ({checklist.length} items):</p>
              {checklist.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 13 }}>
                  <span style={{ color: '#22c55e' }}>✓</span><span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
