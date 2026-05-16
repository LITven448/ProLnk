import { useState } from 'react';

export default function DFWBasementGuide2026() {
  const [homeType, setHomeType] = useState('suburban');

  const options: Record<string, { verdict: string; color: string; shelterOptions: { name: string; cost: string; desc: string }[]; notes: string[] }> = {
    suburban: {
      verdict: 'No Basement — Clay Soil + High Water Table',
      color: '#f97316',
      shelterOptions: [
        { name: 'Interior Closet Shelter', cost: '$4,000–$8,000', desc: 'FEMA-rated safe room built inside existing closet or bathroom' },
        { name: 'Garage Safe Room', cost: '$5,000–$12,000', desc: 'Concrete or steel unit installed in garage corner' },
        { name: 'In-Ground Storm Shelter', cost: '$3,500–$7,000', desc: 'Underground unit in yard — common in DFW' },
      ],
      notes: ['Clay soil expands/contracts — basements crack', 'Water table too shallow in most DFW areas', 'Storm shelters are the DFW basement substitute', 'FEMA rates safe rooms for F5 tornado protection'],
    },
    denton: {
      verdict: 'Possible — Denton County Has Some Basements',
      color: '#F5E642',
      shelterOptions: [
        { name: 'Basement Inspection + Waterproofing', cost: '$3,000–$15,000', desc: 'Assess existing basement, add French drain + sump pump' },
        { name: 'Interior Closet Shelter', cost: '$4,000–$8,000', desc: 'Supplement basement with FEMA-rated room' },
        { name: 'Basement Egress Window', cost: '$1,500–$3,500', desc: 'Required if basement used as bedroom' },
      ],
      notes: ['Rockier terrain in parts of Denton allows basements', 'Still flood risk — verify 100-yr floodplain status', 'Older homes more likely to have partial basement', 'Have structural engineer inspect before use'],
    },
    rural: {
      verdict: 'Storm Shelter More Practical Than Basement',
      color: '#84cc16',
      shelterOptions: [
        { name: 'Community Storm Shelter', cost: 'Check county', desc: 'Many rural DFW counties have public shelters' },
        { name: 'In-Ground Steel Shelter', cost: '$3,500–$6,500', desc: 'Most popular in rural DFW — concrete cap, steel door' },
        { name: 'Above-Ground Safe Room', cost: '$5,000–$10,000', desc: 'Preferred when water table is issue' },
      ],
      notes: ['Rural DFW has higher tornado risk — shelter critical', 'Mobile homes require community shelter (not safe)', 'USDA loans can fund storm shelters', 'Placement: not under tree, accessible in 30 seconds'],
    },
    older: {
      verdict: 'May Have Partial Basement or Cellar',
      color: '#a78bfa',
      shelterOptions: [
        { name: 'Cellar Assessment', cost: '$300–$800', desc: 'Structural inspection to determine safety and usability' },
        { name: 'Cellar Waterproofing', cost: '$5,000–$20,000', desc: 'Interior drain system + sump pump' },
        { name: 'FEMA Safe Room Add-On', cost: '$4,000–$8,000', desc: 'Add inside home regardless of cellar status' },
      ],
      notes: ['Pre-1970 DFW homes sometimes had storm cellars', 'Old cellars often have moisture/mold issues', 'Not suitable for habitation without major work', 'Check foundation impact before any cellar work'],
    },
  };

  const result = options[homeType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⛈️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Basement Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Why DFW has no basements — and what to do instead</p>
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontSize: 13, display: 'block', marginBottom: 8 }}>🏡 Your Home Type</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 12px', marginBottom: 16 }}>
            <option value="suburban">Suburban DFW (typical)</option>
            <option value="denton">Denton County Area</option>
            <option value="rural">Rural / Outer DFW</option>
            <option value="older">Older Home (pre-1975)</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: `4px solid ${result.color}`, marginBottom: 16 }}>
                <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.verdict}</div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {result.notes.map((n, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>{n}</li>)}
                </ul>
              </div>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛡️ Your Storm Protection Options</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.shelterOptions.map((opt, i) => (
                  <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{opt.name}</div>
                      <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{opt.desc}</div>
                    </div>
                    <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', marginLeft: 12 }}>{opt.cost}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111827', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📞 Get a Safe Room Installed</h3>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects DFW homeowners with storm shelter contractors — FEMA-certified installations with tornado season pricing.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Storm Shelter Quotes →</button>
        </div>
      </div>
    </div>
  );
}
