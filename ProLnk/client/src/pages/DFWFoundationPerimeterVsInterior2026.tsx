import { useState } from 'react';

const locations = [
  { id: 'perimeter', label: '🏠 Perimeter Settlement', tip: 'Exterior piers are the most common solution. Hydraulic steel piers are driven to load-bearing strata along the foundation edge. Typical DFW job: 8–14 exterior piers.' },
  { id: 'interior', label: '🔩 Interior Beam Settlement', tip: 'Interior piers require tunneling under the slab (7–10 day process) or slab drilling. Cost premium of 40–60% over exterior piers due to access complexity.' },
  { id: 'both', label: '↔️ Both Areas', tip: 'When both perimeter and interior are settling, a combined approach is needed. Interior piers stabilize beam mid-spans while exterior piers address the perimeter.' },
  { id: 'chimney', label: '🧱 Chimney Settling Separately', tip: 'Chimneys often have their own footings and settle independently. May need 2–4 dedicated piers just for chimney stabilization.' },
  { id: 'cost', label: '💰 Cost Comparison', tip: 'Exterior piers: $1,200–$1,800 each. Interior piers: $1,800–$2,800 each due to tunneling labor. Average DFW full-house repair: $8,000–$25,000.' },
];

export default function DFWFoundationPerimeterVsInterior2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = locations.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW Foundation Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🔩 DFW Foundation Perimeter vs Interior Piers 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW's expansive clay soil moves dramatically with rain/drought cycles. Understanding where your foundation is failing determines whether you need accessible exterior piers or expensive tunneled interior piers — the difference can be $10,000+.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏗️', label: 'Exterior Pier Depth', value: '15–25 ft' },
            { icon: '⛏️', label: 'Interior Access Method', value: 'Tunnel / Drill' },
            { icon: '💰', label: 'Interior Cost Premium', value: '40–60% more' },
            { icon: '📅', label: 'Interior Timeline', value: '7–14 days' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Where Is Your Foundation Issue?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {locations.map(l => (
            <button
              key={l.id}
              onClick={() => setSelected(selected === l.id ? null : l.id)}
              style={{
                background: selected === l.id ? '#F5E642′ : '#0f2040',
                color: selected === l.id ? '#0A1628′ : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {l.label}
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Pier Strategy Decision Guide</div>
          {[
            'Exterior piers: edge of slab settles, brick cracks at corners',
            'Interior piers: floors sag mid-house, doors far from walls stick',
            'Get 3 independent engineer reports before committing',
            'Lifetime transferable warranty — ask before signing',
            'Document pre-repair state with timestamped photos in ProLnk Vault',
            'Interior tunneling disrupts living — plan 1–2 week displacement',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642′ }}>✓</span>{item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk Home Health Vault · DFW Foundation Series 2026
        </div>
      </div>
    </div>
  );
}