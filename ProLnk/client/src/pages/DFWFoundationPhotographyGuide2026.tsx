import { useState } from 'react';

const situations = [
  { id: 'exterior', label: '🏠 Exterior Crack Documentation', tip: 'Photograph brick veneer cracks from 3ft away (full crack) and 1ft (crack width). Include a ruler or coin for scale. Capture chimney lean from corner of house. Shoot at same time of day each session for consistent lighting.' },
  { id: 'interior', label: '🚪 Interior Door & Wall Cracks', tip: 'For sticking doors: photo the gap at top corners. For drywall cracks: measure width with a quarter (wider = urgent). Shoot from consistent distance. Date every photo — courts and insurers require timestamped documentation.' },
  { id: 'floors', label: '🪵 Floor Slope Documentation', tip: 'Place a marble or level on the floor and photograph. Use the same reference points each time. For tile cracks, photograph full room then close-up of each crack with scale reference.' },
  { id: 'vault', label: '🗄️ ProLnk Vault Storage', tip: 'ProLnk Vault timestamps all uploaded photos automatically. This creates a legally defensible record for insurance claims, warranty disputes, and home sale disclosure. Upload within 24 hours of taking photos.' },
  { id: 'sequence', label: '📅 Before/After Sequences', tip: 'Always photograph the day before foundation repair begins, the day after completion, and at 30/90/180 days post-repair. Settlement can continue after repair — documentation proves whether new damage is pre- or post-repair.' },
];

export default function DFWFoundationPhotographyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ProLnk · DFW Foundation Series</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          📸 DFW Foundation Documentation Photography 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Proper photo documentation of foundation issues protects you legally, strengthens insurance claims, and creates a baseline for monitoring movement over time. DFW's clay soil moves every season — documentation is essential.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📸', label: 'Photos Per Inspection', value: '20–40 shots' },
            { icon: '📏', label: 'Always Include', value: 'Scale reference' },
            { icon: '🕐', label: 'Timestamp Required', value: 'Yes — legal req.' },
            { icon: '🗄️', label: 'Vault Storage', value: 'Auto-timestamped' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Documentation Situation</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642′ : '#0f2040',
                color: selected === s.id ? '#0A1628′ : '#fff',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              {s.label}
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Foundation Photo Checklist</div>
          {[
            'All four exterior corners — brick cracks and grade level',
            'Chimney from two angles — lean visible',
            'Every interior door with sticking or gap issues',
            'All wall cracks with ruler/coin scale reference',
            'Floor level shots with marble or digital level',
            'Upload all to ProLnk Vault within 24 hours for auto-timestamp',
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