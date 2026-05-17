import { useState } from 'react';

const cities = [
  { id: 'dallas', name: 'Dallas', icon: '🏙️', req: 'PE stamp required for any structural foundation repair. Permit required. City inspects all pier placements.' },
  { id: 'fortworth', name: 'Fort Worth', icon: '🤠', req: 'Engineer involvement required for pier installation. Permit pulls mandatory. Inspector signs off on each pier.' },
  { id: 'frisco', name: 'Frisco', icon: '🏘️', req: 'Permit required for all foundation work. Fast-growing city with strict newer code enforcement since 2022.' },
  { id: 'plano', name: 'Plano', icon: '📐', req: 'Permit + PE-stamped plans for structural repairs. Plano enforces thoroughly — no shortcuts.' },
  { id: 'arlington', name: 'Arlington', icon: '🔨', req: 'Permit required. Engineer report recommended. Inspections enforce load-bearing requirements.' },
  { id: 'mckinney', name: 'McKinney', icon: '🌿', req: 'Permit required. Engineer involvement for pier work. Fast-growing suburb with evolving code updates.' },
  { id: 'smaller', name: 'Smaller DFW Cities', icon: '🏚️', req: 'Requirements vary widely. Some cities require permits, others do not. ProLnk Charter pros verify local code before every job.' },
];

export default function DFWFoundationCityCode2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = cities.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Foundation City Code Requirements 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Municipal foundation repair requirements vary across the DFW metroplex. Know what your city requires before work begins.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW Foundation Code Facts</h2>
          {[
            ['🏗️', 'Dallas requires a PE (Professional Engineer) stamp on all structural foundation repair plans'],
            ['📍', 'Fort Worth mandates engineer involvement for every pier installation'],
            ['🧾', 'Frisco has required foundation permits since 2020 — no exceptions'],
            ['🔍', 'Unpermitted foundation work can void homeowner insurance claims'],
            ['✅', 'ProLnk Charter foundation pros pull permits in all DFW cities as a standard practice'],
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
                style={{ background: selected === c.id ? '#F5E642' : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{result.icon} {result.name} Foundation Requirements</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.req}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>ProLnk Charter foundation contractors are pre-verified to know and follow all local DFW municipal codes.</p>
        </div>
      </div>
    </div>
  );
}