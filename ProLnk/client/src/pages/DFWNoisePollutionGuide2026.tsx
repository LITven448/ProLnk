import { useState } from 'react';

const sources = [
  { id: 'airport', label: '✈️ Airport / Flight Path', desc: 'DFW Airport 3rd busiest in world', solutions: ['Triple-pane windows (STC 40+ rating)', 'Acoustic laminated glass inserts', 'Solid-core exterior doors with weatherstrip', 'White noise machine in bedrooms', 'Attic insulation upgrade (R-49)'] },
  { id: 'highway', label: '🛣 Highway Noise', desc: 'I-635, I-35, SRT, I-30 corridors', solutions: ['Window inserts (secondary glazing)', 'Mass-loaded vinyl on shared walls', 'Dense pack insulation in exterior walls', 'Acoustic caulk all penetrations', 'Strategic landscaping / sound wall'] },
  { id: 'neighbors', label: '🏘 Neighbor / HOA Noise', desc: 'Shared walls, yards, parties', solutions: ['Acoustic panels on shared walls', 'Floor underlayment (IIC 65+)', 'Door sweeps on interior doors', 'HVAC duct silencers to block sound transfer', 'White noise at perimeter rooms'] },
  { id: 'traffic', label: '🚗 Street / Local Traffic', desc: 'Surface roads, construction', solutions: ['Window upgrades to STC 35+', 'Exterior door upgrade with acoustic threshold', 'Garage door insulation panel kit', 'Interior acoustic curtains', 'Landscaping berm if setback allows'] },
];

const ratings = [
  { label: 'Single-pane window', stc: 27, cost: 'Existing' },
  { label: 'Double-pane window', stc: 32, cost: '$400–800/window' },
  { label: 'Window insert (acoustic)', stc: 48, cost: '$200–500/window' },
  { label: 'Triple-pane window', stc: 40, cost: '$600–1200/window' },
  { label: 'Solid-core door', stc: 32, cost: '$300–800′ },
  { label: 'Mass-loaded vinyl (wall)', stc: 27, cost: '$1–2/sq ft' },
];

export default function DFWNoisePollutionGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = sources.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔇 DFW Noise Reduction Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>DFW Airport handles 73M+ passengers/year. Seven major highways cut through the Metroplex. If you're within 5 miles of a flight path or highway, noise impacts sleep, stress, and property value. Here’s what actually works.</p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📊 STC Ratings — What They Mean</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1C2E4A' }}>
                  {['Solution', 'STC Rating', 'Installed Cost'].map(h => <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#8899BB' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {ratings.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1C2E4A' }}>
                    <td style={{ padding: '8px 12px' }}>{r.label}</td>
                    <td style={{ padding: '8px 12px', color: '#F5E642', fontWeight: 700 }}>STC {r.stc}</td>
                    <td style={{ padding: '8px 12px', color: '#8899BB' }}>{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 My Noise Source → Solutions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {sources.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1C2E4A', color: selected === s.id ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: 14, cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>{s.desc}</div>
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>Top solutions for {active.label}:</div>
              {active.solutions.map((sol, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 14 }}>{sol}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Ready to soundproof your DFW home?</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>ProLnk connects you with window, insulation, and acoustic specialists across the Metroplex.</div>
        </div>
      </div>
    </div>
  );
}
