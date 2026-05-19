import { useState } from 'react';

const propertyTypes = [
  { id: 'luxury-apt', label: '🏢 Luxury Apartment', tips: ['Check HVAC filters monthly — high-rise units accumulate dust faster', 'Review HOA rules before any balcony modifications', 'Schedule annual pest inspection — common in high-density builds'] },
  { id: 'townhome', label: '🏘️ Townhome', tips: ['Party-wall inspections matter — coordinate with neighbor before work', 'Roofline shared? Confirm HOA vs owner responsibility in writing', 'Legacy West HOA typically covers exterior painting cycles'] },
  { id: 'single-family', label: '🏡 Single-Family Home', tips: ['2015-2026 builds use spray foam insulation — avoid cutting into walls without IR scan', 'Smart-home pre-wiring common; verify panel capacity before additions', 'Landscape irrigation tied to HOA standards — get approval before changes'] },
];

const techCampusTips = [
  'Toyota campus proximity increases transient rental market — vet tenants carefully',
  'JPMorgan tech hub drives short-term demand spikes in Q1 and Q4',
  'High walkability score — landscaping and curb appeal directly impact resale',
];

export default function DFWPlanoLegacyWestGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>PLANO · LEGACY WEST · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>🏙️ Legacy West Homeowner Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Premier master-planned district · Tech campus corridor · Modern 2015–2026 construction</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 District Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🏗️', label: 'Build Era', val: '2015–2026′ }, { icon: '📋', label: ’HOA Activity', val: 'Very High' }, { icon: '🏢', label: 'Tech Anchors', val: 'Toyota · JPMorgan' }, { icon: '💰', label: 'Market Tier', val: 'Luxury' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Property Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {propertyTypes.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ background: selected === p.id ? '#F5E642′ : '#162236', color: selected === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Owner Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🏢 Tech Campus Impact</h2>
          {techCampusTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · Legacy West Plano · 2026</p>
      </div>
    </div>
  );
}
