import { useState } from 'react';

const conditions = [
  { id: 'bleaching', label: '☀️ Sun Bleaching / Graying', guide: 'DFW sun bleaches unpainted wood in 2–3 years. Sand lightly, prime, and repaint. Use 100% acrylic exterior paint rated for Texas UV. Recoat every 5–7 years.' },
  { id: 'peeling', label: '🎨 Paint Peeling or Bubbling', guide: 'Peeling indicates moisture intrusion or adhesion failure. Scrape to bare wood, address moisture source (typically failed caulk), prime, repaint. Do not skip primer on bare wood.' },
  { id: 'rot', label: '🟫 Soft / Rotted Wood', guide: 'Probe with screwdriver — soft spots = rot. Small areas: epoxy filler. Large sections: replace board. Fascia rot is common in DFW where gutters overflow. Fix drainage first.' },
  { id: 'warping', label: '↗️ Warped or Cupped Boards', guide: 'DFW heat warps wide fascia boards. Secure loose boards before painting. Severe warping: replace with fiber cement (PVC trim also works — zero maintenance).' },
  { id: 'replacement', label: '🔄 Replacement Options', guide: 'Fiber cement trim: 15+ year lifespan, paintable, no rot. PVC trim: zero maintenance, more expensive. Engineered wood: lower cost but requires painting. All outperform wood in DFW climate.' },
];

export default function DFWWoodTrimGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = conditions.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🪵 DFW Exterior Wood Trim Maintenance Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          Fascia boards, soffits, window trim, and door surrounds take a beating from DFW sun, heat, and humidity cycles.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Wood Trim Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Repaint Cycle', value: 'Every 5–7 years in DFW' },
              { label: 'Fascia Board Replace', value: '$8–$20 per linear ft' },
              { label: 'Fiber Cement Upgrade', value: '$12–$25 per linear ft' },
              { label: 'Key Risk', value: 'Rot from overflowing gutters' },
            ].map(f => (
              <div key={f.label} style={{ background: '#162032', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 What condition do you see?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {conditions.map(i => (
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
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Wood Trim Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk matches you with vetted DFW painters and trim carpenters.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
