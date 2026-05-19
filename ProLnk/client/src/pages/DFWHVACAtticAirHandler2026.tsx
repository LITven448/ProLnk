import { useState } from 'react';

const situations = [
  { id: 'overheating', label: 'Unit running but house not cooling', guide: 'Check attic temp — if over 140°F, inspect insulation around air handler. Ensure refrigerant lines are insulated; sweating lines signal heat gain reducing efficiency by up to 30%.' },
  { id: 'drainage', label: 'Water dripping from ceiling near handler', guide: 'Secondary drain pan may be full. Primary drain line likely clogged with algae (common in DFW humidity). Flush with diluted bleach. Check pan float switch is functional.' },
  { id: 'noise', label: 'Banging or rattling from attic', guide: 'Vibration may indicate loose mounting straps or refrigerant line contact with framing. DFW thermal expansion cycles stress mounts — inspect and tighten annually.' },
  { id: 'efficiency', label: 'High energy bills despite running', guide: 'Attic hatch likely lacks insulation — conditioned air escapes around hatch perimeter. Add foam gasket and R-30+ insulation board to hatch cover. Also check duct connections at handler.' },
];

export default function DFWHVACAtticAirHandler2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Attic Air Handler Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Managing air handlers in 140°F DFW attics — what every homeowner must know</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', label: 'Attic temps exceed 140°F', note: 'June–Aug DFW peak' },
            { icon: '💧', label: 'Lines must be insulated', note: 'Humidity causes sweating' },
            { icon: '🚿', label: 'Secondary drain pan critical', note: 'Prevents ceiling damage' },
            { icon: '🚪', label: 'Insulate attic hatch', note: 'Stops conditioned air loss' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Describe Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  backgroundColor: selected === s.id ? '#F5E642′ : '#0A1628',
                  color: selected === s.id ? '#0A1628′ : '#fff',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >{s.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: '1.2rem', backgroundColor: '#0f172a', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          <p>ProLnk DFW HVAC Resource · Free homeowner guidance · 2026</p>
        </div>
      </div>
    </div>
  );
}