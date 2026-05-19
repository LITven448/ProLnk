import { useState } from 'react';

const areas = [
  { id: 'windows', label: '🪟 Window Perimeters', guide: 'Top priority in DFW. UV degrades window caulk in 3–5 years. Use polyurethane caulk for DFW heat. Check all 4 sides, especially bottom corners where water pools. Cost to DIY: $5–$10 per window.' },
  { id: 'doors', label: '🚪 Door Frames', guide: 'Door frame caulk fails from constant movement + DFW sun. Silicone for metal door frames (paint-grade silicone if painting). Inspect top of door frame — water entry there causes header rot.' },
  { id: 'penetrations', label: '🔌 Pipe & Electrical Penetrations', guide: 'Every pipe, wire, or HVAC line through the exterior wall needs caulk. DFW clay soil causes pipe movement that breaks seals annually. Use fire-rated sealant near any HVAC penetrations.' },
  { id: 'trim', label: '🪵 Trim and Siding Joints', guide: 'Joints between trim and siding, siding and foundation, and corner boards need elastomeric caulk. DFW homes see 40+ year thermal cycling — rigid caulk will crack. Elastomeric stretches 200-300%.' },
  { id: 'type', label: '🧪 Silicone vs Polyurethane for DFW', guide: 'Silicone: best adhesion, not paintable. Use on metal and glass. Polyurethane: paintable, excellent adhesion, recommended for DFW wood and masonry. Latex caulk: cheap, fails in 1–2 years in DFW UV — avoid outdoors.' },
];

export default function DFWCaulkingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = areas.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🧴 DFW Exterior Caulking Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          Caulk is the first line of defense against water intrusion. DFW UV and heat degrade most exterior caulk in just 3–5 years.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Caulking Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Caulk Lifespan in DFW', value: '3–5 years (latex fails faster)' },
              { label: 'Full Recaulk Cost', value: '$300–$800 for average home' },
              { label: 'Best Product', value: 'Polyurethane for DFW wood/masonry' },
              { label: 'Inspection Frequency', value: 'Every 2–3 years' },
            ].map(f => (
              <div key={f.label} style={{ background: '#162032', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Which area needs caulking?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {areas.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#162032', color: selected === i.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
              {i.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{guide.label} — Caulking Guide</h3>
            <p style={{ lineHeight: 1.7, color: '#d0dce8' }}>{guide.guide}</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#162032', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Caulking & Weatherproofing Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk connects you with vetted DFW painters and exterior specialists.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
