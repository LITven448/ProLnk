import { useState } from 'react';

const penetrations = [
  { id: 'plumbing', label: '🚿 Plumbing Vent Stacks', tip: 'Pipe boots are the #1 leak point in DFW. Neoprene boots crack in UV exposure within 8–12 years. Check annually. Replace with metal-collared boot for longevity. DFW hail can also crack boots directly.' },
  { id: 'flue', label: '🔥 HVAC Flue Pipes', tip: 'Metal flue pipes require 2-inch clearance from combustibles and storm collar flashing with sealant. DFW thermal expansion/contraction cycles cause collar separation — inspect every fall before heating season.' },
  { id: 'solar', label: '☀️ Solar Panel Mounts', tip: 'Each mount penetrates the roof deck. Requires flashing beneath the mount foot — not just sealant. DFW hail voids many solar leases if flashing isn\’t maintained. Document install photos in ProLnk Vault.' },
  { id: 'satellite', label: '📡 Satellite Dish Holes', tip: 'Abandoned satellite holes are a top hidden leak source in DFW resales. Any unused penetration must be properly plugged with roofing sealant and flashing patch — not just silicone caulk.' },
  { id: 'skylight', label: '🌤️ Skylight Curbs', tip: 'Skylight curbs require step flashing on uphill side and saddle flashing at top. DFW hail and ice (rare but real) expose curb flashing failures. Inspect curb sealant annually.' },
  { id: 'electrical', label: '⚡ Electrical Mast', tip: 'Electrical service entrance mast requires master head flashing sealed with roofing cement. The mast penetration point is often neglected in DFW re-roofing — verify new flashings were installed, not just resealed.' },
];

export default function DFWRoofingProjections2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = penetrations.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW Roofing Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏚️ DFW Roofing Projections & Penetrations Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Every penetration through a DFW roof is a potential leak point. DFW's hail, UV intensity, and thermal cycling stress flashing systems harder than most climates. Know what’s on your roof and how each is protected.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔩', label: 'Avg Penetrations Per Home', value: '5–12′ },
            { icon: '⛈️', label: 'DFW Hail Events/Year', value: '3–5 avg' },
            { icon: '☀️', label: 'Pipe Boot Lifespan DFW', value: '8–12 years' },
            { icon: '📸', label: 'Post-Storm Inspection', value: 'Required' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Penetration Type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {penetrations.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642′ : '#0f2040',
                color: selected === p.id ? '#0A1628′ : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{active.label}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{active.tip}</p>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Penetration Inspection Checklist</div>
          {[
            'Count all penetrations before any roofing bid',
            'Inspect pipe boots every 3 years — replace cracked neoprene',
            'Check storm collars on flue pipes each fall',
            'Verify abandoned satellite holes are properly plugged',
            'After hail: inspect every penetration within 30 days',
            'Document all penetration photos in ProLnk Vault post-storm',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642′ }}>✓</span>{item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk Home Health Vault · DFW Roofing Series 2026
        </div>
      </div>
    </div>
  );
}