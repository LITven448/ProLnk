import { useState } from 'react';

const symptoms = [
  { id: 'hot-rooms', label: 'One or more rooms not cooling', mode: 'Compression or Disconnection', guide: 'Compressed or kinked flex runs starve downstream rooms. DFW installers often leave excessive slack — coiled or sharply bent duct loses 40–60% airflow. Inspect attic runs for tight bends and re-route with proper support every 4 feet.' },
  { id: 'noise', label: 'Rustling or whooshing from vents', mode: 'Disconnection at Trunk', guide: 'Loose collar connection at main trunk box is the most common DFW flex duct failure. Vibration from start/stop cycles pulls clamps loose over time. Re-secure with approved clamp and mastic sealant — tape alone fails in DFW attic temps.' },
  { id: 'high-bills', label: 'Energy bills spiking unexpectedly', mode: 'Moisture Accumulation / Sag', guide: 'Sagging duct runs collect condensation — cooling efficiency drops and mold can form inside ductwork. Add intermediate supports to eliminate low points. Replace sections with visible moisture staining.' },
  { id: 'smell', label: 'Musty smell from vents', mode: 'Animal Damage / Moisture', guide: 'DFW rodents (rats, squirrels) commonly breach flex duct outer jacket in attics. Inner liner tears are harder to see — check with flashlight for droppings near vents. Full section replacement required when liner is compromised.' },
  { id: 'crumbling', label: 'Duct jacket cracking or brittle', mode: 'UV Degradation', guide: 'Flex duct exposed to attic light sources (solar tubes, gaps in roof) degrades in 5–8 years vs 20+ for protected runs. Replace exposed sections with UV-resistant jacket or add radiant barrier above to eliminate direct exposure.' },
];

export default function DFWHVACFlexDuctFails2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌀'</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Flex Duct Failure Modes 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>DFW attic conditions create unique flex duct failure patterns — identify yours below</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔄', label: 'Compression', note: 'Crimped runs from excess slack' },
            { icon: '🔌', label: 'Disconnection', note: 'Vibration pulls trunk collars loose' },
            { icon: '🐀', label: 'Animal damage', note: 'DFW rodents breach outer jacket' },
            { icon: '💧', label: 'Moisture sag', note: 'Condensation collects in low runs' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 Select Your Symptom</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  backgroundColor: selected === s.id ? '#F5E642' : '#0A1628',
                  color: selected === s.id ? '#0A1628' : '#fff',
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
            <div style={{ marginTop: '1.2rem' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#1d4ed8', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.8rem' }}>
                Failure Mode: {match.mode}
              </div>
              <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642' }}>
                <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>{match.guide}</p>
              </div>
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