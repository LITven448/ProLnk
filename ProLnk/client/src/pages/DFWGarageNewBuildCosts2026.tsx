import { useState } from 'react';

export default function DFWGarageNewBuildCosts2026() {
  const [garageType, setGarageType] = useState<'detached2′ | ’detached3′ | ’carport'>('detached2');
  const [foundation, setFoundation] = useState<'slab' | 'pier'>('slab');

  const costs: Record<string, Record<string, string>> = {
    detached2: { slab: '$40,000–$55,000', pier: '$45,000–$62,000′ },
    detached3: { slab: '$55,000–$75,000', pier: '$60,000–$82,000′ },
    carport: { slab: '$8,000–$15,000', pier: '$10,000–$18,000′ },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW New Garage Construction Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Adding a detached garage in Dallas-Fort Worth — complete 2026 pricing with DFW clay soil considerations.</p>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Estimate Your DFW Garage Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Structure Type</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['detached2', 'detached3', 'carport'] as const).map(g => (
                <button key={g} onClick={() => setGarageType(g)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: garageType === g ? '#F5E642′ : '#1e2d45', color: garageType === g ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {g === 'detached2′ ? ’Detached 2-Car' : g === 'detached3′ ? ’Detached 3-Car' : 'Carport Only'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Foundation Type (DFW clay matters)</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['slab', 'pier'] as const).map(f => (
                <button key={f} onClick={() => setFoundation(f)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: foundation === f ? '#F5E642′ : '#1e2d45', color: foundation === f ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {f === 'slab' ? 'Concrete Slab' : 'Pier & Beam'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>{costs[garageType][foundation]}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Includes electrical rough-in. Finishing interior adds cost.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🏗', title: 'DFW Clay Soil', desc: 'Expansive clay requires deeper footings than most markets. Budget $3,000–6,000 more for proper slab prep.' },
            { icon: '⚡', title: 'Electrical Panel', desc: 'Most DFW garages need 60–100A subpanel ($1,500–3,000). EV charger adds $800–1,200.' },
            { icon: '📋', title: 'Permit Required', desc: 'All new structures require permit in DFW cities. Plan for 3–6 week approval timeline.' },
            { icon: '🏘', title: 'Setback Rules', desc: 'DFW requires 5–10 ft setbacks from property lines. Survey your lot before designing.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e33', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🚗 Overhead Door Options & DFW Pricing</h3>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Standard steel door + opener: $900–1,500 installed</li>
            <li>Insulated door (essential for DFW summer): $1,200–2,200</li>
            <li>Carriage-style wood-look: $2,000–4,000 — popular in DFW luxury neighborhoods</li>
            <li>Carport vs garage: carport saves $30,000+ but offers no security or climate control</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Garage Build Quotes</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk connects you with vetted DFW garage builders — fast, free estimates.</div>
        </div>
      </div>
    </div>
  );
}
