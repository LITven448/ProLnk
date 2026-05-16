import { useState } from 'react';

const issues = [
  { id: 'cracking', label: '🕸️ Surface Cracking', guide: 'Hairline cracks: fill with elastomeric caulk + paint. DFW foundation movement causes most stucco cracking. Monitor for growth — cracks >1/4" need structural eval.' },
  { id: 'water', label: '💧 Water Intrusion', guide: 'Water behind stucco is the #1 failure mode in DFW. Check for soft spots, discoloration, mold. EIFS (synthetic) is especially vulnerable. Full remediation runs $8–$20 per sq ft.' },
  { id: 'eifs', label: '🏗️ EIFS vs Traditional', guide: 'EIFS (Dryvit) = foam + synthetic finish. Traditional = 3-coat cement. EIFS common in 1990s DFW builds — inspect all penetrations yearly. Traditional is more durable in DFW humidity.' },
  { id: 'reside', label: '🔄 Repair vs Reside', guide: 'Localized damage (<20% of wall): repair. Widespread cracking, moisture damage, or failed EIFS: reside. Reside cost $8–$15/sq ft. Fiber cement siding is a popular DFW alternative.' },
  { id: 'paint', label: '🎨 Paint Peeling', guide: 'DFW UV breaks down stucco paint every 5–8 years. Use elastomeric paint rated for stucco. Always prime bare stucco. Do not skip repairs before painting.' },
];

export default function DFWStuccoGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = issues.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏗️ DFW Stucco Maintenance Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          Stucco homes in DFW face unique challenges: foundation movement, UV degradation, and moisture intrusion risk behind failing joints.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Stucco Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Common Stucco Type', value: 'EIFS (1980s–2000s builds)' },
              { label: 'Repair Cost', value: '$300–$800 per area' },
              { label: 'Reside Cost', value: '$8–$15 per sq ft' },
              { label: 'Inspection Frequency', value: 'Annually — all penetrations' },
            ].map(f => (
              <div key={f.label} style={{ background: '#162032', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 What issue do you see?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {issues.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#162032', color: selected === i.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
              {i.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{guide.label} — Repair Guide</h3>
            <p style={{ lineHeight: 1.7, color: '#d0dce8' }}>{guide.guide}</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#162032', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Stucco Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk connects you with vetted DFW stucco and siding contractors.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
