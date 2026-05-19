import { useState } from 'react';

const locations = [
  { id: 'dallas', label: 'Dallas', icon: '🏙️', county: 'Dallas County', status: '✅ Full Coverage', pros: 'HVAC, Roofing, Foundation, Plumbing, Electrical, Landscaping', note: 'City of Dallas + all incorporated areas. ProLnk Charter Pros active now.' },
  { id: 'fortworth', label: 'Fort Worth', icon: '🤠', county: 'Tarrant County', status: '✅ Full Coverage', pros: 'HVAC, Roofing, Foundation, Plumbing, Electrical, General Contracting', note: 'Fort Worth + Tarrant County suburbs including Keller, Southlake, Colleyville.' },
  { id: 'plano', label: 'Plano / Frisco / McKinney', icon: '🏘️', county: 'Collin County', status: '✅ Full Coverage', pros: 'All major trades + specialty services for newer construction', note: 'Collin County is one of the fastest-growing counties in America — ProLnk built for this growth.' },
  { id: 'denton', label: 'Denton / Flower Mound / Lewisville', icon: '🌿', county: 'Denton County', status: '✅ Full Coverage', pros: 'HVAC, Roofing, Foundation, Plumbing, Electrical', note: 'Denton County growing rapidly — Charter pros filling coverage gaps now.' },
  { id: 'arlington', label: 'Arlington / Irving / Grand Prairie', icon: '⚽', county: 'Tarrant + Dallas County', status: '✅ Full Coverage', pros: 'Full trade coverage — high-density residential market', note: 'Mid-cities corridor: some of DFW’s highest home service demand per square mile.' },
  { id: 'outer', label: 'Rockwall / Kaufman / Ellis', icon: '🌾', county: 'Outer DFW Counties', status: '🟡 Expanding Coverage', pros: 'Core trades available; specialty trades expanding', note: 'Outer counties served by Charter pros willing to travel. Coverage density growing monthly.' },
];

export default function DFWProLnkDFWMap2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = locations.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️⭐</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', marginBottom: '8px' }}>
            ProLnk DFW Coverage Map 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            ProLnk serves all 7 DFW counties — 7 million residents, one trusted network.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px', textAlign: 'center', padding: '12px', background: '#1e2d4a', borderRadius: '12px' }}>
          <div><div style={{ fontSize: '24px', fontWeight: '800', color: '#F5E642' }}>7</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>DFW Counties</div></div>
          <div><div style={{ fontSize: '24px', fontWeight: '800', color: '#F5E642' }}>50+</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>Cities Served</div></div>
          <div><div style={{ fontSize: '24px', fontWeight: '800', color: '#F5E642' }}>500</div><div style={{ color: '#94a3b8', fontSize: '12px' }}>Charter Pro Limit</div></div>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginBottom: '16px', fontWeight: '600' }}>
          Select your DFW location:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '28px' }}>
          {locations.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(selected === l.id ? null : l.id)}
              style={{
                background: selected === l.id ? '#F5E642' : '#1e2d4a',
                color: selected === l.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === l.id ? ' #F5E642' : ' #334155'),
                borderRadius: '12px', padding: '14px 8px', cursor: 'pointer',
                fontSize: '12px', fontWeight: '700', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{l.icon}</div>
              {l.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: '16px', padding: '28px', border: '2px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '4px' }}>{active.icon} {active.label}</h2>
            <p style={{ color: '#94a3b8', marginBottom: '16px', fontSize: '13px' }}>{active.county}</p>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div><span style={{ fontWeight: '700' }}>Coverage Status: </span>{active.status}</div>
              <div><span style={{ fontWeight: '700', color: '#94a3b8' }}>Trades Available: </span>{active.pros}</div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #F5E642' }}>
                <span style={{ color: '#F5E642', fontWeight: '700' }}>📍 </span>{active.note}
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/homeowner-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Find a Pro in My Area →
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          ProLnk — Built exclusively for DFW. 500 Charter Pro limit. Waitlist now open.
        </div>
      </div>
    </div>
  );
}
