import { useState } from 'react';

const locations = [
  { id: 'bath', label: '🚿 Tub / Shower', caulk: 'Silicone (100%)', prep: 'Clean + dry 24 hrs', steps: ['Remove all old caulk with oscillating tool', 'Clean with rubbing alcohol', 'Dry completely (24 hours minimum)', 'Cut tube tip at 45° — max 1/4 inch opening', 'Apply steady bead in one continuous pass', 'Wet finger and smooth in one direction', 'Do not disturb for 24 hours'] },
  { id: 'sink', label: '🚰 Kitchen Sink', caulk: 'Silicone or Hybrid', prep: 'Degrease surface', steps: ['Remove old caulk and clean with degreaser', 'Dry completely', 'Tape both sides for clean lines', 'Cut tip at 45° — small opening', 'Apply bead, smooth with wet caulk tool', 'Remove tape immediately', 'Let cure 12–24 hours before water exposure'] },
  { id: 'baseboard', label: '🏠 Baseboard / Trim', caulk: 'Paintable Latex', prep: 'Dust and prime', steps: ['Fill gaps between baseboard and wall', 'Apply thin bead at joint', 'Smooth with wet finger in one pass', 'Wipe excess with damp cloth', 'Let dry 2 hours', 'Paint over when fully dry'] },
  { id: 'exterior', label: '🏗️ Exterior Gaps', caulk: 'Elastomeric / Silicone', prep: 'Weatherstrip clean', steps: ['Choose day between 50–80°F (DFW: early morning)', 'Avoid high humidity — wait after rain', 'Apply to clean, dry surface', 'Force caulk into gap with steady pressure', 'Smooth and tool immediately', 'Allow 48 hours cure before painting (latex only)'] },
];

export default function DFWCaulkApplicationGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const loc = locations.find(l => l.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Caulk Application Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Step-by-step caulking techniques for DFW homeowners — select your application location.</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 18, marginBottom: 24, border: '1px solid #334155' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 15 }}>🎯 Universal Caulking Rules</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#94a3b8', fontSize: 14 }}>
            <li style={{ marginBottom: 6 }}>Cut tip at 45° — never more than 1/4 inch opening (smaller = better control)</li>
            <li style={{ marginBottom: 6 }}>Apply in one continuous pass without stopping</li>
            <li style={{ marginBottom: 6 }}>Smooth immediately with wet finger or caulk tool in one direction only</li>
            <li style={{ marginBottom: 6 }}>DFW optimal temp: 50–80°F — avoid peak summer afternoons outdoors</li>
            <li>Never caulk over old caulk — always remove and start fresh</li>
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {locations.map(l => (
            <button key={l.id} onClick={() => setSelected(l.id)}
              style={{ background: selected === l.id ? '#F5E642' : '#1e293b', color: selected === l.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === l.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {l.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === l.id ? '#0A1628' : '#94a3b8' }}>Use: {l.caulk}</div>
            </button>
          ))}
        </div>

        {loc && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 4px' }}>{loc.label}</h2>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ background: '#0f172a', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#94a3b8' }}>🧴 {loc.caulk}</span>
              <span style={{ background: '#0f172a', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#94a3b8' }}>🧹 {loc.prep}</span>
            </div>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {loc.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: 10, color: '#e2e8f0', lineHeight: 1.5 }}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {!loc && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select an application location above to get the step-by-step guide.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}