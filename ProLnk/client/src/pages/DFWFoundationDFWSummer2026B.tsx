import { useState } from 'react';

const situations = [
  { id: 'probe', label: '🔍 Soil moisture probe readings', action: 'Probe 6 inches deep — should feel like a wrung-out sponge. Too dry = crumbly, pulls away from probe. Too wet = muddy suction. DFW clay holds moisture unevenly — probe 4 spots per side.' },
  { id: 'south-west', label: '☀️ South + west sides drying fastest', action: 'Standard in DFW summers. South and west walls get 6-8 hrs direct sun. These sides need 40-60% more irrigation than north/east sides. Install drip line specifically for these exposures.' },
  { id: 'new-symptoms', label: '📸 Documenting new symptoms', action: 'Photo every crack with a coin for scale. Note: location, direction (horizontal vs diagonal = different causes), width change over 2 weeks. Horizontal = lateral pressure. Diagonal = differential settlement.' },
  { id: 'condensation', label: '💧 Condensation on slab edge', action: 'High water table indicator — unusual but present in low-lying DFW areas. Note on FEMA flood map. This means soil stays wetter than typical — adjust watering DOWN on those sides to prevent swelling pressure.' },
  { id: 'watering-schedule', label: '🌊 Building a watering schedule', action: 'DFW summer protocol: water every 3 days minimum. Cycle: 20 min soaker, wait 2 hrs, 20 min more (allows absorption without runoff). Adjust after rain — clay holds moisture 3-5 days after 1" rain.' },
];

export default function DFWFoundationDFWSummer2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW FOUNDATION SUMMER 2026 — PART 2
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Advanced DFW Summer Foundation Actions</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Part 2 advanced guide. DFW expansive clay moves 2-4 inches vertically with moisture change. Summer 2026 drought outlook means proactive monitoring is critical.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 DFW Clay Soil Science</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Montmorillonite clay (dominant in DFW) expands 8x when wet. Goal: maintain consistent moisture year-round — not wet, not dry. Consistency prevents differential movement. One dry corner causes more damage than uniform drought.
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
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>📋 Advanced Summer Foundation Checklist</h3>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
            <li>Probe soil every 3 days — 4 sides of home, 6 inches deep</li>
            <li>Increase water on south + west exposures 40-60% vs north/east</li>
            <li>Photo all cracks with scale reference every 2 weeks</li>
            <li>Check slab perimeter for condensation (high water table indicator)</li>
            <li>Adjust watering within 48 hrs of any rainfall over 0.5 inches</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏗️ ProLnk Charter foundation specialists in DFW</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk.io — Get matched with a vetted DFW foundation pro</p>
        </div>
      </div>
    </div>
  );
}