import { useState } from 'react';

const paths = [
  { lot: 'Small lot (<6K sqft)', budget: 'Under $30K', type: 'Prefab shed conversion', permit: 'Likely none if under 200 sqft', hvac: 'Mini-split or window unit', data: 'Buried conduit or overhead run', feasibility: '✅ High' },
  { lot: 'Medium lot (6K–10K sqft)', budget: '$30K–60K', type: 'Prefab office pod', permit: 'Building permit required', hvac: 'Mini-split required', data: 'Buried fiber conduit', feasibility: '✅ High' },
  { lot: 'Large lot (10K+ sqft)', budget: '$60K–150K', type: 'Custom ADU build', permit: 'Full building + electrical + HVAC permits', hvac: 'Dedicated mini-split system', data: 'Underground fiber + separate meter', feasibility: '✅ Ideal' },
];

const cityPermits = [
  { city: 'Dallas', max: '400 sqft without lot coverage calc', setback: '5 ft side/rear', note: 'ADU ordinance updated 2024' },
  { city: 'Plano', max: '650 sqft', setback: '5 ft rear, 5 ft side', note: 'Permit required over 120 sqft' },
  { city: 'Frisco', max: '500 sqft', setback: '5 ft rear, 3 ft side', note: 'HOA approval may also be required' },
  { city: 'Fort Worth', max: '400 sqft', setback: '5 ft all sides', note: 'Separate electric meter optional' },
];

export default function DFWBackyardOfficeGuide2026() {
  const [lotIdx, setLotIdx] = useState(1);
  const rec = paths[lotIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Backyard Office Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Detached office and ADU solutions for DFW remote workers</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Your Path</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {paths.map((p, i) => (
              <button key={p.lot} onClick={() => setLotIdx(i)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12,
                  background: lotIdx === i ? '#F5E642' : '#1e3a5f', color: lotIdx === i ? '#0A1628' : '#fff', fontWeight: lotIdx === i ? 700 : 400 }}>
                {p.lot}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🏗️ Build Type', rec.type],['💰 Budget Range', rec.budget],['📋 Permit', rec.permit],['❄️ HVAC', rec.hvac],['🌐 Data/Internet', rec.data],['📊 Feasibility', rec.feasibility]].map(([label, val]) => (
              <div key={String(label)} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{String(label)}</div>
                <div style={{ color: '#fff', fontSize: 13 }}>{String(val)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏙️ DFW City Permit Requirements</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  {['City','Max Size','Setback','Notes'].map(h => <th key={h} style={{ color: '#F5E642', textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {cityPermits.map(r => (
                  <tr key={r.city} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>{r.city}</td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.max}</td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.setback}</td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ Utilities Checklist</h3>
          {['Run conduit underground before pouring concrete slab — saves major cost later','Mini-split is mandatory for DFW summers: standalone structures heat to 120°F+ without cooling','Bury fiber conduit in same trench as electrical to avoid future excavation','Separate subpanel in structure allows independent circuit management','Check HOA CC&Rs before any permit — some prohibit detached structures entirely'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
