import { useState } from 'react';

const zones = [
  {
    id: 'roof',
    label: 'Roof',
    emoji: '🏠',
    detects: ['Shingle wear pattern and age estimation', 'Missing or lifted shingles', 'Ridge line integrity', 'Flashing gaps at chimney and vents', 'Granule loss scoring'],
    accuracy: '87–93% on asphalt shingle roofs',
    limitations: ['Cannot see under shingles or decking', 'Low accuracy on flat or metal roofs in some lighting', 'Requires drone-quality imagery for best results'],
  },
  {
    id: 'foundation',
    label: 'Foundation',
    emoji: '🧱',
    detects: ['Crack width and propagation direction', 'Step cracking in brick mortar', 'Settlement displacement patterns', 'Efflorescence (moisture migration staining)', 'Horizontal vs vertical crack classification'],
    accuracy: '81–89% for visible exterior cracks',
    limitations: ['Cannot assess below-grade conditions without interior scan', 'Pier spacing analysis requires floor level data', 'Soil shift patterns inferred, not directly observed'],
  },
  {
    id: 'moisture',
    label: 'Moisture',
    emoji: '💧',
    detects: ['Water stain mapping and age scoring', 'Mold probability zones', 'Ceiling and wall moisture gradients', 'Crawl space humidity indicators', 'Grading and drainage slope analysis'],
    accuracy: '79–86% for active or recent moisture events',
    limitations: ['Cannot replace thermal imaging for hidden leaks', 'Dry season scans may miss intermittent issues', 'Slab leaks are not detectable visually'],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    emoji: '❄️',
    detects: ['Unit age and model identification', 'Visible duct deterioration', 'Condenser coil obstruction scoring', 'Filter housing condition', 'Rust and corrosion on refrigerant lines'],
    accuracy: '84–91% for unit age and model ID',
    limitations: ['Cannot test refrigerant levels or airflow CFM', 'Ductwork inside walls not visible', 'Performance testing requires licensed technician'],
  },
  {
    id: 'electrical',
    label: 'Electrical',
    emoji: '⚡',
    detects: ['Panel brand and flagged recall models', 'Exposed or improper wiring in visible areas', 'Outlet condition and cover plate integrity', 'Junction box accessibility', 'Visible code violations in garages and attics'],
    accuracy: '76–83% for panel identification',
    limitations: ['Cannot assess load capacity or arc fault risk', 'Inside-wall wiring is not visible', 'Infrared thermography needed for hotspot detection'],
  },
];

export default function TrustyProAgentExplained() {
  const [selected, setSelected] = useState(zones[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>How TrustyPro AI Works</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            Visual scanning powered by computer vision — not sensors, not guesswork. Here's what the agent actually sees and how it scores your home.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '📸', title: 'Photo AI', desc: 'Analyzes uploaded photos using multi-model vision pipeline trained on 2M+ home inspection images' },
            { emoji: '🧊', title: '3D Modeling', desc: 'Photogrammetry from multiple angles creates a spatial map of the structure for dimensional analysis' },
            { emoji: '📊', title: 'Condition Scoring', desc: 'Each zone receives a 0–100 score weighted by defect severity, recency, and repair urgency' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.emoji}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{card.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Confidence Scores Explained</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>
            Every finding includes a confidence range. This reflects image quality, zone visibility, and model certainty — not whether a defect exists.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[['90–100%', '#22c55e', 'High confidence — clear visibility, strong model match'], ['75–89%', '#FACC15', 'Moderate — some occlusion or lighting variance'], ['Below 75%', '#ef4444', 'Low — recommend professional inspection to confirm']].map(([range, color, desc]) => (
              <div key={range} style={{ flex: '1 1 180px', background: '#050d1a', borderRadius: 10, padding: 16, borderLeft: `4px solid ${color}` }}>
                <div style={{ fontWeight: 700, color, marginBottom: 4 }}>{range}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Select a Home Zone</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {zones.map(z => (
              <button key={z.id} onClick={() => setSelected(z)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: selected.id === z.id ? '#4F46E5' : '#1e3a5f', color: '#fff' }}>
                {z.emoji} {z.label}
              </button>
            ))}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#FACC15' }}>What AI Detects — {selected.label}</h3>
          <ul style={{ marginBottom: 20, paddingLeft: 20 }}>
            {selected.detects.map(d => <li key={d} style={{ color: '#e2e8f0', fontSize: 15, marginBottom: 6 }}>{d}</li>)}
          </ul>
          <div style={{ background: '#050d1a', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <span style={{ color: '#4F46E5', fontWeight: 700 }}>Accuracy Range: </span>
            <span style={{ color: '#e2e8f0' }}>{selected.accuracy}</span>
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>⚠️ What It Can't See</div>
            <ul style={{ paddingLeft: 20 }}>
              {selected.limitations.map(l => <li key={l} style={{ color: '#64748b', fontSize: 14, marginBottom: 4 }}>{l}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
