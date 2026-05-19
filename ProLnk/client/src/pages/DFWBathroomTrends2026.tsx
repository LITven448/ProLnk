import { useState } from 'react';

const sizeRecs: Record<string, { label: string; priorities: string[] }> = {
  small: { label: '🚿 Small (under 50 sq ft)', priorities: ['Large-format tile to visually expand (24x24 or slab)', 'Wall-mount vanity to show floor space', 'Frameless glass shower (no tub — saves 12-15 sq ft)', 'Niche shelving in shower vs. separate shelf unit', 'Matte black fixtures for contrast punch'] },
  medium: { label: '🛁 Medium (50-100 sq ft)', priorities: ['Consider freestanding tub only if dedicated soaking space exists', 'Double vanity if layout allows', 'Heated floors — gaining traction in DFW luxury segment', 'Large-format tile (4x8 slab look) on walls', 'Brushed gold OR matte black — pick one, not both'] },
  large: { label: '🏛️ Large (100+ sq ft)', priorities: ['Wet room concept (open shower + soaking area)', 'Floating dual vanity with LED underlighting', 'Statement mirror with integrated lighting', 'Towel warming rack (DFW winters mild but still popular)', 'Recessed medicine cabinet replacing surface-mount'] },
};

export default function DFWBathroomTrends2026() {
  const [selected, setSelected] = useState<keyof typeof sizeRecs | null>(null);
  const result = selected ? sizeRecs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🚿</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Bathroom Trends 2026</h1>
          <p style={{ color: '#94a3b8′ }}>What DFW homeowners are updating in bathrooms right now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Top DFW Bathroom Trends</h2>
          {[
            ['📐', 'Large-format tile taking over', '4×8 ft slab tile and 24×24 floor tile replacing 12×12 and subway'],
            ['🚿', 'Freestanding tubs declining', 'Homeowners prioritizing larger showers over soaking tubs'],
            ['🔲', 'Niche shelving vs recessed medicine cabinets', 'Built-in niches in shower walls winning; recessed cabinets replacing surface-mount'],
            ['🔥', 'Heated floors gaining traction', 'Electric radiant heat mats — popular add-on in DFW bath remodels ($800-2K)'],
            ['🔩', 'Matte black vs brushed gold fixtures', 'Matte black still #1 for modern, brushed gold surging in transitional/traditional'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8′ }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Select Bathroom Size → 2026 Priority List</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {Object.entries(sizeRecs).map(([k, v]) => (
              <button key={k} onClick={() => setSelected(k as keyof typeof sizeRecs)}
                style={{ background: selected === k ? '#F5E642′ : '#1a3050', color: selected === k ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {v.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>2026 Priorities for {result.label}</div>
              {result.priorities.map((p, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.4rem' }}>✅ {p}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>💡 DFW Bathroom Cost Benchmarks 2026</h2>
          {[['Hall bath refresh (fixtures, tile, vanity)', '$8K–$18K'], ['Primary bath full remodel (mid-range)', '$22K–$45K'], ['Primary bath luxury remodel', '$50K–$90K+'], ['Heated floor add-on', '$800–$2,500']].map(([item, cost], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a3050', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <span>{item}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{cost}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}