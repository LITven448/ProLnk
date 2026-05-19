import { useState } from 'react';

const situations = [
  { id: 'cottonwood', label: '🌿 Cottonwood on condenser', action: 'Turn off unit. Use garden hose (low pressure) to rinse coil fins from inside out. Allow 30 min dry time before restart. Do not use pressure washer — bends fins.' },
  { id: 'attic-heat', label: '🔥 Attic over 150°F', action: 'Add ridge vent + soffit vent combo if missing. Radiant barrier on attic floor cuts HVAC load 8-12%. Check if existing vents are blocked by insulation.' },
  { id: 'duct-insulation', label: '🌡️ Duct insulation falling off', action: 'This is an emergency efficiency loss. Uninsulated ducts in 140°F attic lose 30%+ of cooling. Reattach with mastic sealant + R-8 wrap minimum. Call ProLnk Charter HVAC pro.' },
  { id: 'fall-tune', label: '📅 Planning fall tune-up', action: 'Book NOW — September slots fill by August 1 every year in DFW. Fall tune-up includes: heat exchanger inspection, refrigerant check, blower cleaning, thermostat calibration.' },
  { id: 'shade', label: '☀️ Considering condenser shade', action: 'Plant deciduous shrubs 18-24 inches away (not closer). A 10°F reduction in condenser ambient temp = ~5% efficiency gain. Never enclose — needs 2 ft clearance all sides.' },
];

export default function DFWHVACDFWSummer2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🌡️ DFW HVAC SUMMER 2026 — PART 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Advanced DFW Summer HVAC Actions</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Part 2 of the DFW summer HVAC guide. Attic temps regularly hit 140-160°F June through August. These actions address the less obvious but high-impact failure points.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 DFW Attic Rule of Thumb</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Attic temp should be no more than 30°F above outdoor temp. At 100°F outside, attic above 130°F = ventilation problem. Above 150°F = duct damage accumulating daily.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#112240',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#e2e8f0', lineHeight: 1.75, fontSize: 15 }}>{match.action}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>📋 DFW Summer HVAC Checklist</h3>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
            <li>Verify attic temp differential (should be ≤30°F over outdoor)</li>
            <li>Inspect all duct insulation — especially near boots and bends</li>
            <li>Clear cottonwood from condenser coil (DFW issue May–June)</li>
            <li>Book fall tune-up before August 1 availability window closes</li>
            <li>Assess condenser shade opportunity (south/west exposure priority)</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>⚡ ProLnk Charter HVAC pros available now in DFW</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk.io — Waitlist open, Charter slots limited to 500</p>
        </div>
      </div>
    </div>
  );
}