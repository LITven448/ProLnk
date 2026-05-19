import { useState } from 'react';

const cities = [
  { id: 'dallas', name: 'Dallas', icon: '🏙️', req: 'Permit required for full roof replacement. Inspection required before final sign-off. Class A fire rating mandatory citywide.' },
  { id: 'fortworth', name: 'Fort Worth', icon: '🤠', req: 'Permit + inspection required. Class A fire rating enforced. Re-roof over 1 layer requires tear-off permit.' },
  { id: 'plano', name: 'Plano', icon: '📐', req: 'Permit required with strict inspection process. One of the most thorough inspection programs in DFW. Class A required.' },
  { id: 'frisco', name: 'Frisco', icon: '🏘️', req: 'Permit required. Fast-growing city adopted 2021 IRC. Inspector checks decking, underlayment, and final shingle install.' },
  { id: 'arlington', name: 'Arlington', icon: '🔨', req: 'Permit required for replacement. Inspection enforced. Hail-resistant Class 4 shingles eligible for insurance discounts.' },
  { id: 'garland', name: 'Garland', icon: '🌆', req: 'Permit required. Class A fire rating enforced. Inspectors verify proper drip edge and ventilation compliance.' },
  { id: 'smaller', name: 'Smaller DFW Cities', icon: '🏚️', req: 'Requirements vary. Some smaller municipalities have limited inspection capacity. ProLnk Charter roofers verify before every job.' },
];

export default function DFWRoofingCityCode2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = cities.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Roofing City Code Requirements 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Every DFW city has specific roofing permit and inspection requirements. Know what applies before your contractor starts.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW Roofing Code Facts</h2>
          {[
            ['🔴', 'Class A fire rating required in ALL DFW cities — no exceptions'],
            ['🧾', 'Unpermitted roofing work can block home sales and void insurance claims'],
            ['🌨️', 'DFW hail events make Class 4 impact-resistant shingles a smart upgrade'],
            ['🔍', 'Dallas and Plano have the most rigorous inspection programs in the metroplex'],
            ['✅', 'ProLnk Charter roofers handle all permit pulls and schedule inspections for you'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏙️ Select Your DFW City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 20 }}>
            {cities.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{result.icon} {result.name} Roofing Requirements</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.req}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>ProLnk Charter roofing contractors are pre-verified and know DFW municipal code requirements in every city they serve.</p>
        </div>
      </div>
    </div>
  );
}