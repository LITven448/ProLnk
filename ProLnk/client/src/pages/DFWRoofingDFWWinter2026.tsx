import { useState } from 'react';

const situations = [
  { id: 'fall-inspect', label: '🍂 Fall inspection (pre-rain)', guide: ['Inspect all flashing: chimney, pipe boots, skylights, wall-to-roof transitions — before November rains', 'Check pipe boot seals — cracked rubber boots are #1 source of DFW roof leaks', 'Look for lifted or missing shingles — DFW wind events (50+ mph gusts common) lift tab shingles', 'Check ridge cap integrity — ridge cap takes the most UV degradation in DFW’s 9-month sun season', 'Charter roofing pros do pre-winter inspections — schedule before first major rain system' ]},
  { id: 'gutters', label: '🌧️ Gutters before winter rains', guide: ['DFW winter rains are heavy and sudden — clogged gutters overflow and pour at foundation', 'Clean gutters in late October after pecan and oak leaf drop (DFW’s biggest leaf shedders)', 'Check gutter hangers — DFW heat cycles expand and contract aluminum, loosening hangers', 'Extend downspouts: water must discharge 4+ feet from foundation on DFW clay soil', 'Gutter overflow at foundation = foundation movement = expensive repair cascade' ]},
  { id: 'attic', label: '🌡️ Attic insulation check', guide: ['DFW attics need R-38 minimum — most older homes have R-19 or less', 'Inadequate insulation = condensation on cold roof deck during freezes = wood rot and mold', 'Check attic ventilation: soffit and ridge vents must be unobstructed — snow can block ridge vents', 'Any attic insulation touching roof deck traps moisture — maintain 1-inch air gap at eaves', 'Charter roofing pros can assess insulation adequacy during pre-winter roof inspection' ]},
  { id: 'ice-dam', label: '🧊 Ice dam risk (rare but real)', guide: ['DFW ice dams occur during extended freezes (Uri 2021 caused widespread ice dam damage)', 'Ice dams form when heat escapes through roof, melts snow, refreezes at cold eaves', 'Prevention: adequate attic insulation (R-38+) and proper ventilation are the only real fix', 'During an ice event: do NOT chop ice — risk of shingle and gutter damage', 'After any DFW ice event: inspect for lifted flashings and water staining on ceilings' ]},
];

export default function DFWRoofingDFWWinter2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏚️</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>DFW Roofing Winter Readiness Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>DFW winter rains are sudden and heavy — fall roof inspection is non-negotiable.</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>🔍 What is your DFW roofing winter situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🏚️ Your Roofing Winter Readiness Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E2D4A' }}>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.85rem', textAlign: 'center' }}>
            🏠 ProLnk Charter roofing pros in DFW — <span style={{ color: '#F5E642' }}>join waitlist for priority access</span>
          </p>
        </div>
      </div>
    </div>
  );
}