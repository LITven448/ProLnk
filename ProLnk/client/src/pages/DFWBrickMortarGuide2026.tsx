import { useState } from 'react';

const issues = [
  { id: 'cracking', label: '🧱 Mortar Cracking', guide: 'Repoint affected joints. DFW clay soil expansion causes seasonal movement. Cost: $500–$2,000. Use Type S mortar for DFW conditions.' },
  { id: 'efflorescence', label: '⬜ White Salt Staining', guide: 'Efflorescence from DFW humidity. Scrub with diluted muriatic acid. Apply water repellent sealer. Not structural — cosmetic fix.' },
  { id: 'spalling', label: '🔴 Brick Face Spalling', guide: 'Freeze-thaw rarely applies in DFW, but moisture intrusion causes face spalling. Replace individual bricks. Do not paint over — traps moisture.' },
  { id: 'painting', label: '🎨 Considering Brick Paint', guide: 'Painting brick is PERMANENT. Once painted, repainting every 7–10 years is required. DFW heat accelerates peeling. Consult pro before committing.' },
  { id: 'leaning', label: '↗️ Bowing or Leaning Brick', guide: 'Structural concern. DFW foundation movement can push veneer. Call structural engineer immediately. Do not delay — failure risk is real.' },
];

export default function DFWBrickMortarGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = issues.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🧱 DFW Brick & Mortar Maintenance Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          DFW is a brick-dominant market. Clay soil movement cracks mortar joints every 5–10 years. Know your issues before calling a pro.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Brick Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Market Prevalence', value: '~65% of DFW homes are brick' },
              { label: 'Repointing Cost', value: '$500–$2,000 per area' },
              { label: 'Mortar Lifespan', value: '25–30 years (DFW clay conditions)' },
              { label: 'Inspection Frequency', value: 'Every 5 years minimum' },
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
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{guide.label} — Maintenance Guide</h3>
            <p style={{ lineHeight: 1.7, color: '#d0dce8' }}>{guide.guide}</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#162032', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Masonry Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk connects you with vetted DFW masonry pros instantly.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
